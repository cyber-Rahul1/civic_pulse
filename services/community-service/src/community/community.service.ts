import {
  Injectable,
  NotFoundException,
  BadRequestException,
  ForbiddenException,
  ConflictException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { v4 as uuidv4 } from 'uuid';
import http from 'http';
import { CivicLogger, dispatchNotificationEvent } from '@civic-pulse/nest-common';
import {
  CommentDto,
  EndorsementSummaryDto,
  CommunitySummaryDto,
  FollowReportDto,
  AbuseReportDto,
  CommentModerationStatus,
  UserRole,
  NotificationEventType,
} from '@civic-pulse/contracts';
import { DatabaseService } from '../database/database.service.js';
import {
  CreateCommentDto,
  UpdateCommentDto,
  QueryCommentsDto,
  CreateAbuseReportDto,
  ModerateCommentDto,
} from '../dto/community.dto.js';
import {
  CommentDocument,
  ReportCommunityStatsDocument,
} from '../models/community.models.js';

@Injectable()
export class CommunityService {
  private readonly reportsServiceUrl: string;
  private readonly notificationsServiceUrl: string;
  private readonly internalServiceKey: string;

  constructor(
    private readonly db: DatabaseService,
    private readonly configService: ConfigService,
    private readonly logger: CivicLogger,
  ) {
    this.logger.setContext('Community:CommunityService');
    this.reportsServiceUrl =
      this.configService.get<string>('REPORTS_SERVICE_URL') ||
      'http://127.0.0.1:3002';
    this.notificationsServiceUrl =
      this.configService.get<string>('NOTIFICATIONS_SERVICE_URL') ||
      'http://127.0.0.1:3005';
    this.internalServiceKey =
      this.configService.get<string>('NOTIFICATIONS_INTERNAL_KEY') ||
      'civic_pulse_notifications_internal_secret_dev';
  }

  // ===========================================================================
  // Cross-Service Report Validation
  // ===========================================================================
  async verifyReportExists(
    reportId: string,
  ): Promise<{ exists: boolean; authorId?: string; title?: string }> {
    const targetUrl = new URL(
      `/api/v1/internal/reports/${encodeURIComponent(reportId)}/exists`,
      this.reportsServiceUrl,
    );

    return new Promise<{ exists: boolean; authorId?: string; title?: string }>((resolve) => {
      const req = http.get(
        targetUrl.href,
        {
          timeout: 4000,
        },
        (res) => {
          let body = '';
          res.on('data', (c) => (body += c));
          res.on('end', () => {
            try {
              const parsed = JSON.parse(body);
              const exists = parsed?.data?.exists ?? parsed?.exists ?? false;
              const authorId = parsed?.data?.authorId ?? parsed?.authorId;
              const title = parsed?.data?.title ?? parsed?.title;
              resolve({ exists: Boolean(exists), authorId, title });
            } catch {
              resolve({ exists: false });
            }
          });
        },
      );

      req.on('error', () => resolve({ exists: false }));
      req.on('timeout', () => {
        req.destroy();
        resolve({ exists: false });
      });
    });
  }

  // ===========================================================================
  // Report Endorsements / Support
  // ===========================================================================
  async endorseReport(
    reportId: string,
    userId: string,
  ): Promise<EndorsementSummaryDto> {
    const reportExists = await this.verifyReportExists(reportId);
    if (!reportExists.exists) {
      throw new NotFoundException(`Report with ID "${reportId}" not found`);
    }

    try {
      await this.db.endorsements.insertOne({
        _id: uuidv4(),
        reportId,
        userId,
        createdAt: new Date(),
      });

      // Update cached count
      await this.db.stats.updateOne(
        { _id: reportId },
        {
          $inc: { endorsementCount: 1 },
          $setOnInsert: { commentCount: 0, followerCount: 0 },
          $set: { updatedAt: new Date() },
        },
        { upsert: true },
      );
    } catch (err: any) {
      if (err.code === 11000) {
        // Idempotent duplicate: already endorsed
        this.logger.debug(
          `Idempotent duplicate endorsement for report ${reportId} by user ${userId}`,
        );
      } else {
        throw err;
      }
    }

    return this.getEndorsementState(reportId, userId);
  }

  async removeEndorsement(
    reportId: string,
    userId: string,
  ): Promise<EndorsementSummaryDto> {
    const result = await this.db.endorsements.deleteOne({ reportId, userId });

    if (result.deletedCount > 0) {
      await this.db.stats.updateOne(
        { _id: reportId, endorsementCount: { $gt: 0 } },
        { $inc: { endorsementCount: -1 }, $set: { updatedAt: new Date() } },
      );
    }

    return this.getEndorsementState(reportId, userId);
  }

  async getEndorsementState(
    reportId: string,
    userId?: string,
  ): Promise<EndorsementSummaryDto> {
    const totalCount = await this.db.endorsements.countDocuments({ reportId });
    let isEndorsedByCaller = false;

    if (userId) {
      const existing = await this.db.endorsements.findOne({ reportId, userId });
      isEndorsedByCaller = !!existing;
    }

    return {
      reportId,
      endorsementCount: totalCount,
      isEndorsedByCaller,
    };
  }

  async getCommunitySummary(
    reportId: string,
    userId?: string,
  ): Promise<CommunitySummaryDto> {
    const [endorsementCount, commentCount, followerCount] = await Promise.all([
      this.db.endorsements.countDocuments({ reportId }),
      this.db.comments.countDocuments({
        reportId,
        moderationStatus: { $ne: CommentModerationStatus.DELETED },
      }),
      this.db.follows.countDocuments({ reportId }),
    ]);

    let isEndorsedByCaller = false;
    let isFollowedByCaller = false;

    if (userId) {
      const [e, f] = await Promise.all([
        this.db.endorsements.findOne({ reportId, userId }),
        this.db.follows.findOne({ reportId, userId }),
      ]);
      isEndorsedByCaller = !!e;
      isFollowedByCaller = !!f;
    }

    return {
      reportId,
      endorsementCount,
      commentCount,
      followerCount,
      isEndorsedByCaller,
      isFollowedByCaller,
    };
  }

  // ===========================================================================
  // Report Following
  // ===========================================================================
  async followReport(reportId: string, userId: string): Promise<{ isFollowing: boolean }> {
    const reportExists = await this.verifyReportExists(reportId);
    if (!reportExists.exists) {
      throw new NotFoundException(`Report with ID "${reportId}" not found`);
    }

    try {
      await this.db.follows.insertOne({
        _id: uuidv4(),
        reportId,
        userId,
        createdAt: new Date(),
      });

      await this.db.stats.updateOne(
        { _id: reportId },
        {
          $inc: { followerCount: 1 },
          $setOnInsert: { endorsementCount: 0, commentCount: 0 },
          $set: { updatedAt: new Date() },
        },
        { upsert: true },
      );
    } catch (err: any) {
      if (err.code !== 11000) {
        throw err;
      }
    }

    return { isFollowing: true };
  }

  async unfollowReport(reportId: string, userId: string): Promise<{ isFollowing: boolean }> {
    const result = await this.db.follows.deleteOne({ reportId, userId });
    if (result.deletedCount > 0) {
      await this.db.stats.updateOne(
        { _id: reportId, followerCount: { $gt: 0 } },
        { $inc: { followerCount: -1 }, $set: { updatedAt: new Date() } },
      );
    }

    return { isFollowing: false };
  }

  async getFollowState(reportId: string, userId: string): Promise<{ isFollowing: boolean }> {
    const existing = await this.db.follows.findOne({ reportId, userId });
    return { isFollowing: !!existing };
  }

  async getFollowedReports(
    userId: string,
    page = 1,
    limit = 20,
  ): Promise<{ items: FollowReportDto[]; total: number; page: number; limit: number }> {
    const skip = (page - 1) * limit;
    const [docs, total] = await Promise.all([
      this.db.follows
        .find({ userId })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .toArray(),
      this.db.follows.countDocuments({ userId }),
    ]);

    return {
      items: docs.map((d) => ({
        reportId: d.reportId,
        userId: d.userId,
        followedAt: d.createdAt.toISOString(),
      })),
      total,
      page,
      limit,
    };
  }

  // ===========================================================================
  // Comments and Replies
  // ===========================================================================
  async createComment(
    reportId: string,
    userId: string,
    dto: CreateCommentDto,
  ): Promise<CommentDto> {
    const reportExists = await this.verifyReportExists(reportId);
    if (!reportExists.exists) {
      throw new NotFoundException(`Report with ID "${reportId}" not found`);
    }

    // If this is a reply, validate parent comment
    if (dto.parentCommentId) {
      const parent = await this.db.comments.findOne({ _id: dto.parentCommentId });
      if (!parent) {
        throw new NotFoundException(
          `Parent comment "${dto.parentCommentId}" not found`,
        );
      }
      if (parent.reportId !== reportId) {
        throw new BadRequestException(
          'Parent comment does not belong to this civic report',
        );
      }
      if (parent.parentCommentId) {
        // Enforce 1-level reply constraint (no arbitrary nesting trees)
        throw new BadRequestException(
          'CivicPulse discussions support 1-level replies. Cannot reply to a reply.',
        );
      }
      if (parent.moderationStatus === CommentModerationStatus.DELETED) {
        throw new BadRequestException('Cannot reply to a deleted comment');
      }

      // Increment parent replyCount
      await this.db.comments.updateOne(
        { _id: dto.parentCommentId },
        { $inc: { replyCount: 1 } },
      );
    }

    const now = new Date();
    const commentDoc: CommentDocument = {
      _id: uuidv4(),
      reportId,
      authorUserId: userId,
      parentCommentId: dto.parentCommentId,
      content: dto.content.trim(),
      moderationStatus: CommentModerationStatus.VISIBLE,
      isEdited: false,
      isDeleted: false,
      replyCount: 0,
      notificationDispatched: false,
      createdAt: now,
      updatedAt: now,
    };

    await this.db.comments.insertOne(commentDoc);

    // Update community stats
    await this.db.stats.updateOne(
      { _id: reportId },
      {
        $inc: { commentCount: 1 },
        $setOnInsert: { endorsementCount: 0, followerCount: 0 },
        $set: { updatedAt: now },
      },
      { upsert: true },
    );

    // Dispatch event to Notifications Service
    if (dto.parentCommentId) {
      const parent = await this.db.comments.findOne({ _id: dto.parentCommentId });
      if (parent && parent.authorUserId !== userId) {
        dispatchNotificationEvent({
          notificationsServiceUrl: this.notificationsServiceUrl,
          internalServiceToken: this.internalServiceKey,
          eventId: commentDoc._id,
          eventType: NotificationEventType.COMMENT_REPLY_ADDED,
          aggregateId: commentDoc._id,
          payload: {
            commentId: commentDoc._id,
            parentCommentId: dto.parentCommentId,
            parentAuthorId: parent.authorUserId,
            replyAuthorId: userId,
            replyAuthorName: 'A resident',
            reportId,
            reportTitle: reportExists.title || 'Civic Issue',
            contentSnippet: commentDoc.content.slice(0, 100),
          },
          logger: this.logger,
        })
          .then(async (delivered) => {
            if (delivered) {
              await this.db.comments.updateOne(
                { _id: commentDoc._id },
                {
                  $set: {
                    notificationDispatched: true,
                    notificationDispatchedAt: new Date(),
                  },
                },
              );
            } else {
              await this.db.comments.updateOne(
                { _id: commentDoc._id },
                {
                  $set: {
                    notificationDispatched: false,
                    notificationDispatchError: 'Transient delivery failure',
                  },
                },
              );
            }
          })
          .catch((err) => {
            this.logger.warn(`Failed to dispatch reply notification event: ${err.message}`);
          });
      }
    } else {
      // Top-level comment -> notify report author
      if (reportExists.authorId && reportExists.authorId !== userId) {
        dispatchNotificationEvent({
          notificationsServiceUrl: this.notificationsServiceUrl,
          internalServiceToken: this.internalServiceKey,
          eventId: commentDoc._id,
          eventType: NotificationEventType.REPORT_COMMENT_ADDED,
          aggregateId: commentDoc._id,
          payload: {
            commentId: commentDoc._id,
            reportId,
            reportTitle: reportExists.title || 'Civic Issue',
            reportAuthorId: reportExists.authorId,
            commentAuthorId: userId,
            commentAuthorName: 'A resident',
            contentSnippet: commentDoc.content.slice(0, 100),
          },
          logger: this.logger,
        })
          .then(async (delivered) => {
            if (delivered) {
              await this.db.comments.updateOne(
                { _id: commentDoc._id },
                {
                  $set: {
                    notificationDispatched: true,
                    notificationDispatchedAt: new Date(),
                  },
                },
              );
            } else {
              await this.db.comments.updateOne(
                { _id: commentDoc._id },
                {
                  $set: {
                    notificationDispatched: false,
                    notificationDispatchError: 'Transient delivery failure',
                  },
                },
              );
            }
          })
          .catch((err) => {
            this.logger.warn(`Failed to dispatch comment notification event: ${err.message}`);
          });
      }
    }

    return this.mapToCommentDto(commentDoc);
  }

  async listComments(
    reportId: string,
    query: QueryCommentsDto,
  ): Promise<{ items: CommentDto[]; total: number; page: number; limit: number }> {
    const page = query.page || 1;
    const limit = query.limit || 20;
    const skip = (page - 1) * limit;

    // List top-level comments (parentCommentId is undefined/null/not exists)
    const filter: any = {
      reportId,
      parentCommentId: { $in: [null, undefined] },
      moderationStatus: { $ne: CommentModerationStatus.HIDDEN },
    };

    const [docs, total] = await Promise.all([
      this.db.comments
        .find(filter)
        .sort({ createdAt: 1 })
        .skip(skip)
        .limit(limit)
        .toArray(),
      this.db.comments.countDocuments(filter),
    ]);

    return {
      items: docs.map((d) => this.mapToCommentDto(d)),
      total,
      page,
      limit,
    };
  }

  async listReplies(
    parentCommentId: string,
  ): Promise<CommentDto[]> {
    const parent = await this.db.comments.findOne({ _id: parentCommentId });
    if (!parent) {
      throw new NotFoundException(`Parent comment "${parentCommentId}" not found`);
    }

    const replies = await this.db.comments
      .find({
        parentCommentId,
        moderationStatus: { $ne: CommentModerationStatus.HIDDEN },
      })
      .sort({ createdAt: 1 })
      .toArray();

    return replies.map((d) => this.mapToCommentDto(d));
  }

  async updateComment(
    commentId: string,
    userId: string,
    dto: UpdateCommentDto,
  ): Promise<CommentDto> {
    const comment = await this.db.comments.findOne({ _id: commentId });
    if (!comment) {
      throw new NotFoundException(`Comment "${commentId}" not found`);
    }

    if (comment.authorUserId !== userId) {
      throw new ForbiddenException('You can only edit your own comments');
    }

    if (comment.isDeleted || comment.moderationStatus === CommentModerationStatus.DELETED) {
      throw new BadRequestException('Cannot edit a deleted comment');
    }

    const now = new Date();
    await this.db.comments.updateOne(
      { _id: commentId },
      {
        $set: {
          content: dto.content.trim(),
          isEdited: true,
          updatedAt: now,
        },
      },
    );

    const updated = await this.db.comments.findOne({ _id: commentId });
    return this.mapToCommentDto(updated!);
  }

  async deleteComment(
    commentId: string,
    userId: string,
    userRole: string,
  ): Promise<{ message: string }> {
    const comment = await this.db.comments.findOne({ _id: commentId });
    if (!comment) {
      throw new NotFoundException(`Comment "${commentId}" not found`);
    }

    const isAuthor = comment.authorUserId === userId;
    const isModeratorOrAdmin =
      userRole === UserRole.MODERATOR || userRole === UserRole.ADMIN;

    if (!isAuthor && !isModeratorOrAdmin) {
      throw new ForbiddenException('You do not have permission to delete this comment');
    }

    // Soft delete to preserve conversation hierarchy
    const now = new Date();
    await this.db.comments.updateOne(
      { _id: commentId },
      {
        $set: {
          content: '[Comment deleted by user]',
          isDeleted: true,
          moderationStatus: CommentModerationStatus.DELETED,
          updatedAt: now,
        },
      },
    );

    // Update community stats (decrement visible comment count)
    await this.db.stats.updateOne(
      { _id: comment.reportId, commentCount: { $gt: 0 } },
      { $inc: { commentCount: -1 }, $set: { updatedAt: now } },
    );

    return { message: 'Comment deleted successfully' };
  }

  // ===========================================================================
  // Community Counters Reconciliation
  // ===========================================================================
  async reconcileReportStats(reportId: string): Promise<ReportCommunityStatsDocument> {
    const reportExists = await this.verifyReportExists(reportId);
    if (!reportExists) {
      throw new NotFoundException(`Report with ID "${reportId}" not found`);
    }

    const [endorsementCount, commentCount, followerCount] = await Promise.all([
      this.db.endorsements.countDocuments({ reportId }),
      this.db.comments.countDocuments({
        reportId,
        moderationStatus: { $ne: CommentModerationStatus.DELETED },
      }),
      this.db.follows.countDocuments({ reportId }),
    ]);

    const now = new Date();
    await this.db.stats.updateOne(
      { _id: reportId },
      {
        $set: {
          endorsementCount: Math.max(0, endorsementCount),
          commentCount: Math.max(0, commentCount),
          followerCount: Math.max(0, followerCount),
          updatedAt: now,
        },
      },
      { upsert: true },
    );

    const doc = await this.db.stats.findOne({ _id: reportId });
    return doc!;
  }

  async moderateComment(
    commentId: string,
    moderatorUserId: string,
    dto: ModerateCommentDto,
  ): Promise<CommentDto> {
    const comment = await this.db.comments.findOne({ _id: commentId });
    if (!comment) {
      throw new NotFoundException(`Comment "${commentId}" not found`);
    }

    const now = new Date();
    await this.db.comments.updateOne(
      { _id: commentId },
      {
        $set: {
          moderationStatus: dto.status,
          moderatedByUserId: moderatorUserId,
          moderationNotes: dto.moderationNotes,
          moderatedAt: now,
          updatedAt: now,
        },
      },
    );

    this.logger.log(
      `Comment ${commentId} moderated to ${dto.status} by ${moderatorUserId}`,
    );

    const updated = await this.db.comments.findOne({ _id: commentId });
    return this.mapToCommentDto(updated!);
  }

  async reportAbuse(
    commentId: string,
    reporterUserId: string,
    dto: CreateAbuseReportDto,
  ): Promise<AbuseReportDto> {
    const comment = await this.db.comments.findOne({ _id: commentId });
    if (!comment) {
      throw new NotFoundException(`Comment "${commentId}" not found`);
    }

    const existingReport = await this.db.abuseReports.findOne({
      commentId,
      reporterUserId,
    });
    if (existingReport) {
      throw new ConflictException('You have already reported this comment');
    }

    const now = new Date();
    const doc = {
      _id: uuidv4(),
      commentId,
      reporterUserId,
      reason: dto.reason,
      details: dto.details?.trim(),
      status: 'PENDING' as const,
      createdAt: now,
    };

    await this.db.abuseReports.insertOne(doc);

    return {
      id: doc._id,
      commentId: doc.commentId,
      reporterUserId: doc.reporterUserId,
      reason: doc.reason,
      details: doc.details,
      createdAt: doc.createdAt.toISOString(),
    };
  }

  private mapToCommentDto(doc: CommentDocument): CommentDto {
    return {
      id: doc._id,
      reportId: doc.reportId,
      authorUserId: doc.authorUserId,
      parentCommentId: doc.parentCommentId,
      content:
        doc.moderationStatus === CommentModerationStatus.HIDDEN
          ? '[Comment hidden by moderator]'
          : doc.content,
      moderationStatus: doc.moderationStatus,
      isEdited: doc.isEdited,
      isDeleted: doc.isDeleted,
      replyCount: doc.replyCount || 0,
      createdAt: doc.createdAt.toISOString(),
      updatedAt: doc.updatedAt.toISOString(),
    };
  }

  /**
   * Scans and recovers pending comments whose notification delivery was interrupted or failed.
   */
  async recoverPendingEvents(limit = 50): Promise<{ scanned: number; recovered: number; failed: number }> {
    const pendingComments = await this.db.comments
      .find({ notificationDispatched: false })
      .limit(limit)
      .toArray();

    let scanned = 0;
    let recovered = 0;
    let failed = 0;

    for (const comment of pendingComments) {
      scanned++;
      const reportExists = await this.verifyReportExists(comment.reportId);
      if (!reportExists.exists) {
        // Report was deleted or nonexistent, mark handled to avoid poison loop
        await this.db.comments.updateOne(
          { _id: comment._id },
          { $set: { notificationDispatched: true, notificationDispatchError: 'Report not found' } },
        );
        continue;
      }

      let delivered = false;
      if (comment.parentCommentId) {
        const parent = await this.db.comments.findOne({ _id: comment.parentCommentId });
        if (parent && parent.authorUserId !== comment.authorUserId) {
          delivered = await dispatchNotificationEvent({
            notificationsServiceUrl: this.notificationsServiceUrl,
            internalServiceToken: this.internalServiceKey,
            eventId: comment._id,
            eventType: NotificationEventType.COMMENT_REPLY_ADDED,
            aggregateId: comment._id,
            payload: {
              commentId: comment._id,
              parentCommentId: comment.parentCommentId,
              parentAuthorId: parent.authorUserId,
              replyAuthorId: comment.authorUserId,
              replyAuthorName: 'A resident',
              reportId: comment.reportId,
              reportTitle: reportExists.title || 'Civic Issue',
              contentSnippet: comment.content.slice(0, 100),
            },
            logger: this.logger,
          });
        } else {
          delivered = true; // No notification needed for self-reply
        }
      } else {
        if (reportExists.authorId && reportExists.authorId !== comment.authorUserId) {
          delivered = await dispatchNotificationEvent({
            notificationsServiceUrl: this.notificationsServiceUrl,
            internalServiceToken: this.internalServiceKey,
            eventId: comment._id,
            eventType: NotificationEventType.REPORT_COMMENT_ADDED,
            aggregateId: comment._id,
            payload: {
              commentId: comment._id,
              reportId: comment.reportId,
              reportTitle: reportExists.title || 'Civic Issue',
              reportAuthorId: reportExists.authorId,
              commentAuthorId: comment.authorUserId,
              commentAuthorName: 'A resident',
              contentSnippet: comment.content.slice(0, 100),
            },
            logger: this.logger,
          });
        } else {
          delivered = true; // No notification needed for self-comment
        }
      }

      if (delivered) {
        await this.db.comments.updateOne(
          { _id: comment._id },
          {
            $set: {
              notificationDispatched: true,
              notificationDispatchedAt: new Date(),
              notificationDispatchError: undefined,
            },
          },
        );
        recovered++;
        this.logger.log(`Recovered and delivered pending event for comment ${comment._id}`);
      } else {
        failed++;
      }
    }

    return { scanned, recovered, failed };
  }
}
