import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import {
  NotificationType,
  NotificationChannel,
  NotificationDto,
  NotificationPreferencesDto,
  PaginatedNotificationsDto,
  NotificationEventType,
} from '@civic-pulse/contracts';
import { CivicLogger } from '@civic-pulse/nest-common';
import { DatabaseService } from '../database/database.service.js';
import {
  NotificationDocument,
  NotificationPreferenceDocument,
  EventProcessingStatus,
} from '../models/notification.models.js';
import {
  UpdatePreferencesDto,
  QueryNotificationsDto,
  IngestEventDto,
  RegisterDeviceTokenDto,
} from '../dto/notifications.dto.js';
import { FirebasePushAdapter } from '../push/push-adapter.service.js';

@Injectable()
export class NotificationsService {
  constructor(
    private readonly db: DatabaseService,
    private readonly pushAdapter: FirebasePushAdapter,
    private readonly logger: CivicLogger,
  ) {
    this.logger.setContext('Notifications:Service');
  }

  // ===========================================================================
  // User Notifications Queries & Mutations
  // ===========================================================================

  async getNotifications(
    userId: string,
    query: QueryNotificationsDto,
  ): Promise<PaginatedNotificationsDto> {
    const filter: any = { recipientUserId: userId };

    if (query.unreadOnly) {
      filter.isRead = false;
    }

    if (query.cursor) {
      filter.createdAt = { $lt: new Date(query.cursor) };
    }

    const limit = Math.min(100, Math.max(1, Number(query.limit) || 20));

    const [items, unreadCount, total] = await Promise.all([
      this.db.notifications
        .find(filter)
        .sort({ createdAt: -1 })
        .limit(limit + 1)
        .toArray(),
      this.db.notifications.countDocuments({ recipientUserId: userId, isRead: false }),
      this.db.notifications.countDocuments({ recipientUserId: userId }),
    ]);

    const hasMore = items.length > limit;
    const returnItems = hasMore ? items.slice(0, limit) : items;
    const lastItem = returnItems[returnItems.length - 1];
    const nextCursor =
      hasMore && lastItem
        ? lastItem.createdAt.toISOString()
        : undefined;

    return {
      items: returnItems.map((n) => this.mapToDto(n)),
      unreadCount,
      total,
      cursor: nextCursor,
      hasMore,
    };
  }

  async getUnreadCount(userId: string): Promise<{ unreadCount: number }> {
    const unreadCount = await this.db.notifications.countDocuments({
      recipientUserId: userId,
      isRead: false,
    });
    return { unreadCount };
  }

  async markAsRead(notificationId: string, userId: string): Promise<NotificationDto> {
    const notification = await this.db.notifications.findOne({
      _id: notificationId,
      recipientUserId: userId,
    });

    if (!notification) {
      throw new NotFoundException(`Notification "${notificationId}" not found`);
    }

    if (!notification.isRead) {
      const now = new Date();
      await this.db.notifications.updateOne(
        { _id: notificationId, recipientUserId: userId },
        { $set: { isRead: true, readAt: now, updatedAt: now } },
      );
      notification.isRead = true;
      notification.readAt = now;
      notification.updatedAt = now;
    }

    return this.mapToDto(notification);
  }

  async markAllAsRead(userId: string): Promise<{ markedCount: number }> {
    const now = new Date();
    const result = await this.db.notifications.updateMany(
      { recipientUserId: userId, isRead: false },
      { $set: { isRead: true, readAt: now, updatedAt: now } },
    );
    return { markedCount: result.modifiedCount };
  }

  // ===========================================================================
  // Notification Preferences
  // ===========================================================================

  async getPreferences(userId: string): Promise<NotificationPreferencesDto> {
    const existing = await this.db.preferences.findOne({ userId });
    if (existing) {
      return this.mapPreferencesToDto(existing);
    }

    // Default preferences
    const defaultDoc: NotificationPreferenceDocument = {
      _id: userId,
      userId,
      emailNotifications: true,
      pushNotifications: true,
      notifyOnStatusChange: true,
      notifyOnComments: true,
      notifyOnAssignments: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    try {
      await this.db.preferences.insertOne(defaultDoc);
      return this.mapPreferencesToDto(defaultDoc);
    } catch (err: any) {
      if (err?.code === 11000) {
        const found = await this.db.preferences.findOne({ userId });
        if (found) return this.mapPreferencesToDto(found);
      }
      throw err;
    }
  }

  async updatePreferences(
    userId: string,
    dto: UpdatePreferencesDto,
  ): Promise<NotificationPreferencesDto> {
    const now = new Date();
    const updateFields: any = { updatedAt: now };

    if (dto.emailNotifications !== undefined) updateFields.emailNotifications = dto.emailNotifications;
    if (dto.pushNotifications !== undefined) updateFields.pushNotifications = dto.pushNotifications;
    if (dto.notifyOnStatusChange !== undefined) updateFields.notifyOnStatusChange = dto.notifyOnStatusChange;
    if (dto.notifyOnComments !== undefined) updateFields.notifyOnComments = dto.notifyOnComments;
    if (dto.notifyOnAssignments !== undefined) updateFields.notifyOnAssignments = dto.notifyOnAssignments;

    const setOnInsert: any = {
      _id: userId,
      userId,
      createdAt: now,
    };
    if (dto.emailNotifications === undefined) setOnInsert.emailNotifications = true;
    if (dto.pushNotifications === undefined) setOnInsert.pushNotifications = true;
    if (dto.notifyOnStatusChange === undefined) setOnInsert.notifyOnStatusChange = true;
    if (dto.notifyOnComments === undefined) setOnInsert.notifyOnComments = true;
    if (dto.notifyOnAssignments === undefined) setOnInsert.notifyOnAssignments = true;

    await this.db.preferences.updateOne(
      { userId },
      {
        $set: updateFields,
        $setOnInsert: setOnInsert,
      },
      { upsert: true },
    );

    const updated = await this.db.preferences.findOne({ userId });
    return this.mapPreferencesToDto(updated!);
  }

  // ===========================================================================
  // Device Token Registration
  // ===========================================================================

  async registerDeviceToken(
    userId: string,
    dto: RegisterDeviceTokenDto,
  ): Promise<{ registered: boolean }> {
    const now = new Date();
    await this.db.deviceTokens.updateOne(
      { userId, token: dto.token },
      {
        $set: {
          platform: dto.platform,
          isActive: true,
          updatedAt: now,
        },
        $setOnInsert: {
          _id: uuidv4(),
          userId,
          token: dto.token,
          createdAt: now,
        },
      },
      { upsert: true },
    );
    return { registered: true };
  }

  // ===========================================================================
  // Event Ingestion & Recipient Resolution
  // ===========================================================================

  async ingestEvent(dto: IngestEventDto): Promise<{ processed: boolean; createdCount: number }> {
    const now = new Date();

    // 1. Idempotency & state recovery check:
    const existingRecord = await this.db.processedEvents.findOne({ eventId: dto.eventId });
    if (existingRecord?.status === EventProcessingStatus.COMPLETED) {
      this.logger.log(`Idempotent skip: Event ${dto.eventId} is already COMPLETED.`);
      return { processed: true, createdCount: 0 };
    }

    // 2. Persist incoming event as PENDING or PROCESSING before creating notifications
    try {
      await this.db.processedEvents.updateOne(
        { eventId: dto.eventId },
        {
          $set: {
            status: EventProcessingStatus.PROCESSING,
            updatedAt: now,
          },
          $setOnInsert: {
            _id: dto.eventId,
            eventId: dto.eventId,
            eventType: dto.eventType,
            aggregateId: dto.aggregateId,
            recipientCount: 0,
            startedAt: now,
          },
        },
        { upsert: true },
      );
    } catch (err: any) {
      this.logger.warn(`Failed to set event ${dto.eventId} to PROCESSING: ${err.message}`);
    }

    // 3. Resolve recipients and generate notifications based on event type
    const notificationsToCreate: NotificationDocument[] = [];

    switch (dto.eventType) {
      case NotificationEventType.REPORT_STATUS_CHANGED: {
        const { reportId, reportTitle, authorId, previousStatus, newStatus, updatedByUserId, reason } =
          dto.payload;

        // Rule: Do not notify actor of their own action
        if (authorId && authorId !== updatedByUserId) {
          const userPref = await this.getPreferences(authorId);
          if (userPref.notifyOnStatusChange) {
            let notificationType = NotificationType.REPORT_STATUS_CHANGED;
            if (newStatus === 'RESOLVED') notificationType = NotificationType.REPORT_RESOLVED;
            if (newStatus === 'REJECTED') notificationType = NotificationType.REPORT_REJECTED;
            if (newStatus === 'REOPENED') notificationType = NotificationType.REPORT_REOPENED;

            notificationsToCreate.push({
              _id: uuidv4(),
              recipientUserId: authorId,
              type: notificationType,
              title: `Report status updated to ${newStatus}`,
              message: `Your report "${reportTitle || 'Civic Issue'}" changed from ${previousStatus} to ${newStatus}.${reason ? ` Reason: ${reason}` : ''}`,
              deepLink: `/reports/${reportId}`,
              channel: NotificationChannel.IN_APP,
              isRead: false,
              eventId: dto.eventId,
              metadata: { reportId, previousStatus, newStatus },
              createdAt: now,
              updatedAt: now,
            });
          }
        }
        break;
      }

      case NotificationEventType.REPORT_COMMENT_ADDED: {
        const { reportId, reportTitle, reportAuthorId, commentAuthorId, commentAuthorName, contentSnippet } =
          dto.payload;

        // Rule: Don't notify the commenter themselves
        if (reportAuthorId && reportAuthorId !== commentAuthorId) {
          const authorPref = await this.getPreferences(reportAuthorId);
          if (authorPref.notifyOnComments) {
            notificationsToCreate.push({
              _id: uuidv4(),
              recipientUserId: reportAuthorId,
              type: NotificationType.REPORT_COMMENT_ADDED,
              title: `New comment on: ${reportTitle || 'your report'}`,
              message: `${commentAuthorName || 'A resident'} commented: "${contentSnippet || '...'}"`,
              deepLink: `/reports/${reportId}`,
              channel: NotificationChannel.IN_APP,
              isRead: false,
              eventId: dto.eventId,
              metadata: { reportId, reportTitle },
              createdAt: now,
              updatedAt: now,
            });
          }
        }
        break;
      }

      case NotificationEventType.COMMENT_REPLY_ADDED: {
        const { parentAuthorId, replyAuthorId, replyAuthorName, reportId, reportTitle, contentSnippet } =
          dto.payload;

        // Rule: Don't notify replier of their own reply
        if (parentAuthorId && parentAuthorId !== replyAuthorId) {
          const parentPref = await this.getPreferences(parentAuthorId);
          if (parentPref.notifyOnComments) {
            notificationsToCreate.push({
              _id: uuidv4(),
              recipientUserId: parentAuthorId,
              type: NotificationType.COMMENT_REPLY_ADDED,
              title: `New reply on: ${reportTitle || 'your comment'}`,
              message: `${replyAuthorName || 'A user'} replied: "${contentSnippet || '...'}"`,
              deepLink: `/reports/${reportId}`,
              channel: NotificationChannel.IN_APP,
              isRead: false,
              eventId: dto.eventId,
              metadata: { reportId, reportTitle },
              createdAt: now,
              updatedAt: now,
            });
          }
        }
        break;
      }

      case NotificationEventType.REPORT_ASSIGNED: {
        const { reportId, reportTitle, reportAuthorId, departmentName, assignedByUserId, assignmentReason } =
          dto.payload;

        if (reportAuthorId && reportAuthorId !== assignedByUserId) {
          const authorPref = await this.getPreferences(reportAuthorId);
          if (authorPref.notifyOnAssignments) {
            notificationsToCreate.push({
              _id: uuidv4(),
              recipientUserId: reportAuthorId,
              type: NotificationType.REPORT_ASSIGNED,
              title: `Report assigned to department`,
              message: `Your report "${reportTitle || 'Civic Issue'}" was assigned to ${departmentName}.${assignmentReason ? ` Reason: ${assignmentReason}` : ''}`,
              deepLink: `/reports/${reportId}`,
              channel: NotificationChannel.IN_APP,
              isRead: false,
              eventId: dto.eventId,
              metadata: { reportId, departmentName },
              createdAt: now,
              updatedAt: now,
            });
          }
        }
        break;
      }

      case NotificationEventType.AUTHORITY_APPLICATION_REVIEWED: {
        const { applicantUserId, status, reviewedByUserId, decisionNotes } = dto.payload;

        if (applicantUserId && applicantUserId !== reviewedByUserId) {
          const isApproved = status === 'APPROVED';
          notificationsToCreate.push({
            _id: uuidv4(),
            recipientUserId: applicantUserId,
            type: isApproved
              ? NotificationType.AUTHORITY_APPLICATION_APPROVED
              : NotificationType.AUTHORITY_APPLICATION_REJECTED,
            title: isApproved ? 'Authority Application Approved' : 'Authority Application Update',
            message: isApproved
              ? 'Your authority verification application has been approved! You now have authority permissions.'
              : `Your authority application was rejected.${decisionNotes ? ` Reason: ${decisionNotes}` : ''}`,
            deepLink: '/authority/applications/me',
            channel: NotificationChannel.IN_APP,
            isRead: false,
            eventId: dto.eventId,
            metadata: { status },
            createdAt: now,
            updatedAt: now,
          });
        }
        break;
      }

      default:
        this.logger.warn(`Unhandled notification event type: ${dto.eventType}`);
    }

    // 3. Deduplicate recipients
    const uniqueNotifications: NotificationDocument[] = [];
    const seenRecipients = new Set<string>();

    for (const notif of notificationsToCreate) {
      if (!seenRecipients.has(notif.recipientUserId)) {
        seenRecipients.add(notif.recipientUserId);
        uniqueNotifications.push(notif);
      }
    }

    // 4. Insert notifications (with try/catch for compound unique index race conditions)
    let createdCount = 0;
    try {
      for (const notif of uniqueNotifications) {
        try {
          await this.db.notifications.insertOne(notif);
          createdCount++;

          // Trigger optional push notification adapter asynchronously (does not block in-app persistence)
          this.dispatchPushIfEnabled(notif).catch((err) => {
            this.logger.warn(`Push dispatch failed for notification ${notif._id}: ${err.message}`);
          });
        } catch (err: any) {
          if (err.code === 11000) {
            this.logger.debug(
              `Idempotent duplicate notification suppressed for user ${notif.recipientUserId} on event ${dto.eventId}`,
            );
          } else {
            throw err;
          }
        }
      }

      // 5. Mark event COMPLETED only after all intended notifications are durably written
      await this.db.processedEvents.updateOne(
        { eventId: dto.eventId },
        {
          $set: {
            status: EventProcessingStatus.COMPLETED,
            recipientCount: createdCount,
            processedAt: new Date(),
            updatedAt: new Date(),
          },
        },
        { upsert: true },
      );

      this.logger.log(`Ingested event ${dto.eventId} (${dto.eventType}): ${createdCount} notifications created.`);
      return { processed: true, createdCount };
    } catch (err: any) {
      await this.db.processedEvents.updateOne(
        { eventId: dto.eventId },
        {
          $set: {
            status: EventProcessingStatus.FAILED,
            error: err.message,
            updatedAt: new Date(),
          },
        },
      ).catch(() => {});
      throw err;
    }
  }

  private async dispatchPushIfEnabled(notif: NotificationDocument): Promise<void> {
    if (!this.pushAdapter.isAvailable()) return;

    const userPref = await this.getPreferences(notif.recipientUserId);
    if (!userPref.pushNotifications) return;

    const activeTokens = await this.db.deviceTokens
      .find({ userId: notif.recipientUserId, isActive: true })
      .toArray();

    if (activeTokens.length === 0) return;

    await this.pushAdapter.sendPush({
      recipientUserId: notif.recipientUserId,
      deviceTokens: activeTokens.map((t) => t.token),
      title: notif.title,
      body: notif.message,
      data: { deepLink: notif.deepLink },
    });
  }

  // ===========================================================================
  // Helpers
  // ===========================================================================

  private mapToDto(doc: NotificationDocument): NotificationDto {
    return {
      id: doc._id,
      recipientUserId: doc.recipientUserId,
      type: doc.type,
      title: doc.title,
      message: doc.message,
      deepLink: doc.deepLink,
      isRead: doc.isRead,
      createdAt: doc.createdAt.toISOString(),
      readAt: doc.readAt ? doc.readAt.toISOString() : undefined,
      metadata: doc.metadata,
    };
  }

  private mapPreferencesToDto(doc: NotificationPreferenceDocument): NotificationPreferencesDto {
    return {
      userId: doc.userId,
      emailNotifications: doc.emailNotifications,
      pushNotifications: doc.pushNotifications,
      notifyOnStatusChange: doc.notifyOnStatusChange,
      notifyOnComments: doc.notifyOnComments,
      notifyOnAssignments: doc.notifyOnAssignments,
      updatedAt: doc.updatedAt.toISOString(),
    };
  }
}
