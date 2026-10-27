import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CivicLogger } from '@civic-pulse/nest-common';
import {
  NotificationEventType,
  NotificationType,
} from '@civic-pulse/contracts';
import { NotificationsService } from './notifications.service.js';
import { DatabaseService } from '../database/database.service.js';
import { FirebasePushAdapter } from '../push/push-adapter.service.js';
import { EventProcessingStatus } from '../models/notification.models.js';

describe('NotificationsService', () => {
  let service: NotificationsService;
  let mockNotificationsCol: any;
  let mockPreferencesCol: any;
  let mockProcessedEventsCol: any;
  let mockDeviceTokensCol: any;

  beforeEach(async () => {
    const notificationsStore: any[] = [];
    const preferencesStore: any[] = [];
    const processedEventsStore: any[] = [];

    mockNotificationsCol = {
      insertOne: jest.fn().mockImplementation(async (doc: any) => {
        // check compound uniqueness
        const duplicate = notificationsStore.find(
          (n) => n.eventId === doc.eventId && n.recipientUserId === doc.recipientUserId,
        );
        if (duplicate) {
          const err: any = new Error('Duplicate key');
          err.code = 11000;
          throw err;
        }
        notificationsStore.push(doc);
        return { insertedId: doc._id };
      }),
      find: jest.fn().mockImplementation((query: any) => ({
        sort: jest.fn().mockReturnThis(),
        skip: jest.fn().mockReturnThis(),
        limit: jest.fn().mockImplementation((limitCount: number) => ({
          toArray: jest.fn().mockResolvedValue(
            notificationsStore
              .filter((n) => {
                if (query.recipientUserId && n.recipientUserId !== query.recipientUserId) return false;
                if (query.createdAt?.$lt && !(n.createdAt < query.createdAt.$lt)) return false;
                return true;
              })
              .slice(0, limitCount),
          ),
        })),
      })),
      countDocuments: jest.fn().mockImplementation(async (query: any) => {
        return notificationsStore.filter((n) => {
          if (query.recipientUserId && n.recipientUserId !== query.recipientUserId) return false;
          if (query.isRead !== undefined && n.isRead !== query.isRead) return false;
          return true;
        }).length;
      }),
      findOne: jest.fn().mockImplementation(async (query: any) => {
        return notificationsStore.find((n) => {
          if (query._id && n._id !== query._id) return false;
          if (query.recipientUserId && n.recipientUserId !== query.recipientUserId) return false;
          return true;
        }) || null;
      }),
      updateOne: jest.fn().mockImplementation(async (filter: any, update: any) => {
        const item = notificationsStore.find(
          (n) => n._id === filter._id && n.recipientUserId === filter.recipientUserId,
        );
        if (item && update.$set) {
          Object.assign(item, update.$set);
          return { modifiedCount: 1 };
        }
        return { modifiedCount: 0 };
      }),
      updateMany: jest.fn().mockImplementation(async (filter: any, update: any) => {
        let count = 0;
        for (const item of notificationsStore) {
          if (item.recipientUserId === filter.recipientUserId && item.isRead === false) {
            Object.assign(item, update.$set);
            count++;
          }
        }
        return { modifiedCount: count };
      }),
    };

    mockPreferencesCol = {
      findOne: jest.fn().mockImplementation(async (query: any) => {
        return preferencesStore.find((p) => p.userId === query.userId) || null;
      }),
      insertOne: jest.fn().mockImplementation(async (doc: any) => {
        preferencesStore.push(doc);
        return { insertedId: doc._id };
      }),
      updateOne: jest.fn().mockImplementation(async (filter: any, update: any, options: any) => {
        const idx = preferencesStore.findIndex((p) => p.userId === filter.userId);
        if (idx >= 0) {
          Object.assign(preferencesStore[idx], update.$set);
        } else if (options?.upsert) {
          preferencesStore.push({ ...update.$setOnInsert, ...update.$set });
        }
        return { modifiedCount: 1 };
      }),
    };

    mockProcessedEventsCol = {
      findOne: jest.fn().mockImplementation(async (query: any) => {
        return processedEventsStore.find((e) => e.eventId === query.eventId) || null;
      }),
      insertOne: jest.fn().mockImplementation(async (doc: any) => {
        const duplicate = processedEventsStore.find((e) => e.eventId === doc.eventId);
        if (duplicate) {
          const err: any = new Error('Duplicate key');
          err.code = 11000;
          throw err;
        }
        processedEventsStore.push(doc);
        return { insertedId: doc._id };
      }),
      updateOne: jest.fn().mockImplementation(async (filter: any, update: any, options: any) => {
        const idx = processedEventsStore.findIndex((e) => e.eventId === filter.eventId);
        if (idx >= 0) {
          Object.assign(processedEventsStore[idx], update.$set);
        } else if (options?.upsert) {
          processedEventsStore.push({
            ...(update.$setOnInsert || {}),
            ...(update.$set || {}),
          });
        }
        return { modifiedCount: 1 };
      }),
    };

    mockDeviceTokensCol = {
      find: jest.fn().mockReturnValue({ toArray: jest.fn().mockResolvedValue([]) }),
      updateOne: jest.fn().mockResolvedValue({ modifiedCount: 1 }),
    };

    const mockDbService = {
      notifications: mockNotificationsCol,
      preferences: mockPreferencesCol,
      processedEvents: mockProcessedEventsCol,
      deviceTokens: mockDeviceTokensCol,
    };

    const mockConfigService = {
      get: jest.fn().mockReturnValue(''),
    };

    const mockLogger = {
      setContext: jest.fn(),
      log: jest.fn(),
      warn: jest.fn(),
      error: jest.fn(),
      debug: jest.fn(),
    };

    const mockPushAdapter = {
      isAvailable: jest.fn().mockReturnValue(false),
      sendPush: jest.fn().mockResolvedValue({ delivered: 0, failed: 0, removedTokens: [] }),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        NotificationsService,
        { provide: DatabaseService, useValue: mockDbService },
        { provide: ConfigService, useValue: mockConfigService },
        { provide: CivicLogger, useValue: mockLogger },
        { provide: FirebasePushAdapter, useValue: mockPushAdapter },
      ],
    }).compile();

    service = module.get<NotificationsService>(NotificationsService);
  });

  // ===========================================================================
  // Event Ingestion & Recipient Resolution
  // ===========================================================================
  describe('Event Ingestion & Recipient Resolution', () => {
    it('should create notification for report author when report status changes', async () => {
      const result = await service.ingestEvent({
        eventId: 'evt-100',
        eventType: NotificationEventType.REPORT_STATUS_CHANGED,
        aggregateId: 'rep-1',
        payload: {
          reportId: 'rep-1',
          reportTitle: 'Broken streetlight',
          authorId: 'resident-1',
          previousStatus: 'SUBMITTED',
          newStatus: 'IN_PROGRESS',
          updatedByUserId: 'admin-1',
        },
      });

      expect(result.processed).toBe(true);
      expect(result.createdCount).toBe(1);

      const unread = await service.getUnreadCount('resident-1');
      expect(unread.unreadCount).toBe(1);
    });

    it('should NOT notify actor about their own status change action', async () => {
      const result = await service.ingestEvent({
        eventId: 'evt-101',
        eventType: NotificationEventType.REPORT_STATUS_CHANGED,
        aggregateId: 'rep-1',
        payload: {
          reportId: 'rep-1',
          reportTitle: 'Pothole on Main St',
          authorId: 'admin-1',
          previousStatus: 'SUBMITTED',
          newStatus: 'UNDER_REVIEW',
          updatedByUserId: 'admin-1', // Author and updater are same
        },
      });

      expect(result.processed).toBe(true);
      expect(result.createdCount).toBe(0);
    });

    it('should respect disabled notification preferences', async () => {
      // User disables status change notifications
      await service.updatePreferences('resident-silent', {
        notifyOnStatusChange: false,
      });

      const result = await service.ingestEvent({
        eventId: 'evt-102',
        eventType: NotificationEventType.REPORT_STATUS_CHANGED,
        aggregateId: 'rep-2',
        payload: {
          reportId: 'rep-2',
          reportTitle: 'Water leakage',
          authorId: 'resident-silent',
          previousStatus: 'SUBMITTED',
          newStatus: 'IN_PROGRESS',
          updatedByUserId: 'staff-1',
        },
      });

      expect(result.processed).toBe(true);
      expect(result.createdCount).toBe(0);
    });

    it('should notify parent comment author on reply, excluding self-replies', async () => {
      // 1. Reply to another user's comment
      const result = await service.ingestEvent({
        eventId: 'evt-103',
        eventType: NotificationEventType.COMMENT_REPLY_ADDED,
        aggregateId: 'comment-reply-1',
        payload: {
          parentAuthorId: 'parent-author',
          replyAuthorId: 'replier-user',
          replyAuthorName: 'Alice',
          reportId: 'rep-1',
          reportTitle: 'Broken streetlight',
          contentSnippet: 'I saw them fixing it today!',
        },
      });

      expect(result.createdCount).toBe(1);

      // 2. Self reply (parentAuthorId === replyAuthorId)
      const selfResult = await service.ingestEvent({
        eventId: 'evt-104',
        eventType: NotificationEventType.COMMENT_REPLY_ADDED,
        aggregateId: 'comment-reply-2',
        payload: {
          parentAuthorId: 'parent-author',
          replyAuthorId: 'parent-author',
          replyAuthorName: 'Parent',
          reportId: 'rep-1',
          reportTitle: 'Broken streetlight',
          contentSnippet: 'An update from me',
        },
      });

      expect(selfResult.createdCount).toBe(0);
    });

    it('should notify applicant when authority verification application is reviewed', async () => {
      const result = await service.ingestEvent({
        eventId: 'evt-105',
        eventType: NotificationEventType.AUTHORITY_APPLICATION_REVIEWED,
        aggregateId: 'app-1',
        payload: {
          applicationId: 'app-1',
          applicantUserId: 'applicant-1',
          status: 'APPROVED',
          reviewedByUserId: 'super-admin',
          decisionNotes: 'Credentials verified',
        },
      });

      expect(result.createdCount).toBe(1);

      const notifications = await service.getNotifications('applicant-1', {});
      expect(notifications.items[0]!.type).toBe(NotificationType.AUTHORITY_APPLICATION_APPROVED);
    });
  });

  // ===========================================================================
  // Idempotency & Duplicate Prevention
  // ===========================================================================
  describe('Idempotency & Duplicate Prevention', () => {
    it('should be strictly idempotent: ingesting the same event twice creates 0 duplicate notifications', async () => {
      const event = {
        eventId: 'evt-dedup-1',
        eventType: NotificationEventType.REPORT_STATUS_CHANGED,
        aggregateId: 'rep-99',
        payload: {
          reportId: 'rep-99',
          reportTitle: 'Flooded road',
          authorId: 'resident-dedup',
          previousStatus: 'SUBMITTED',
          newStatus: 'RESOLVED',
          updatedByUserId: 'officer-1',
        },
      };

      // Ingest 1st time
      const firstResult = await service.ingestEvent(event);
      expect(firstResult.processed).toBe(true);
      expect(firstResult.createdCount).toBe(1);

      // Ingest 2nd time
      const secondResult = await service.ingestEvent(event);
      expect(secondResult.processed).toBe(true);
      expect(secondResult.createdCount).toBe(0);

      // Verify unread count remains exactly 1
      const count = await service.getUnreadCount('resident-dedup');
      expect(count.unreadCount).toBe(1);
    });

    it('should resume and complete an event that was interrupted in PROCESSING state', async () => {
      const event = {
        eventId: 'evt-interrupted-1',
        eventType: NotificationEventType.REPORT_STATUS_CHANGED,
        aggregateId: 'rep-100',
        payload: {
          reportId: 'rep-100',
          reportTitle: 'Water pipe leak',
          authorId: 'resident-resume',
          previousStatus: 'SUBMITTED',
          newStatus: 'IN_PROGRESS',
          updatedByUserId: 'admin-1',
        },
      };

      // Simulate partial state in processedEvents (event was marked PROCESSING, but worker crashed before COMPLETED)
      await mockProcessedEventsCol.updateOne(
        { eventId: event.eventId },
        {
          $set: {
            eventId: event.eventId,
            status: EventProcessingStatus.PROCESSING,
            startedAt: new Date(),
          },
        },
        { upsert: true },
      );

      // Retry event ingestion
      const result = await service.ingestEvent(event);
      expect(result.processed).toBe(true);
      expect(result.createdCount).toBe(1);

      // Verify event is now marked COMPLETED
      const record = await mockProcessedEventsCol.findOne({ eventId: event.eventId });
      expect(record.status).toBe(EventProcessingStatus.COMPLETED);
    });
  });

  // ===========================================================================
  // Read Status & Ownership Isolation
  // ===========================================================================
  describe('Read Status & Ownership Isolation', () => {
    it('should allow marking a notification as read and updating unread counts', async () => {
      await service.ingestEvent({
        eventId: 'evt-read-1',
        eventType: NotificationEventType.REPORT_STATUS_CHANGED,
        aggregateId: 'rep-10',
        payload: {
          reportId: 'rep-10',
          reportTitle: 'Pothole',
          authorId: 'resident-reader',
          previousStatus: 'SUBMITTED',
          newStatus: 'IN_PROGRESS',
          updatedByUserId: 'admin-1',
        },
      });

      const list = await service.getNotifications('resident-reader', {});
      const notifId = list.items[0]!.id;

      expect(list.unreadCount).toBe(1);

      const readNotif = await service.markAsRead(notifId, 'resident-reader');
      expect(readNotif.isRead).toBe(true);

      const countAfter = await service.getUnreadCount('resident-reader');
      expect(countAfter.unreadCount).toBe(0);
    });

    it('should strictly isolate notifications: User A cannot read or mark User B notifications', async () => {
      await service.ingestEvent({
        eventId: 'evt-iso-1',
        eventType: NotificationEventType.REPORT_STATUS_CHANGED,
        aggregateId: 'rep-11',
        payload: {
          reportId: 'rep-11',
          reportTitle: 'Park maintenance',
          authorId: 'user-A',
          previousStatus: 'SUBMITTED',
          newStatus: 'IN_PROGRESS',
          updatedByUserId: 'admin-1',
        },
      });

      const userAList = await service.getNotifications('user-A', {});
      const userANotifId = userAList.items[0]!.id;

      // User B tries to mark User A's notification as read
      await expect(service.markAsRead(userANotifId, 'user-B')).rejects.toThrow(
        NotFoundException,
      );

      // User B should see 0 notifications
      const userBList = await service.getNotifications('user-B', {});
      expect(userBList.items.length).toBe(0);
      expect(userBList.unreadCount).toBe(0);
    });

    it('should support mark-all-as-read for authenticated user', async () => {
      // Ingest 2 notifications for user
      await service.ingestEvent({
        eventId: 'evt-multi-1',
        eventType: NotificationEventType.REPORT_STATUS_CHANGED,
        aggregateId: 'rep-1',
        payload: {
          reportId: 'rep-1',
          reportTitle: 'rep-1',
          authorId: 'resident-bulk',
          previousStatus: 'SUBMITTED',
          newStatus: 'IN_PROGRESS',
          updatedByUserId: 'admin-1',
        },
      });
      await service.ingestEvent({
        eventId: 'evt-multi-2',
        eventType: NotificationEventType.REPORT_STATUS_CHANGED,
        aggregateId: 'rep-2',
        payload: {
          reportId: 'rep-2',
          reportTitle: 'rep-2',
          authorId: 'resident-bulk',
          previousStatus: 'SUBMITTED',
          newStatus: 'RESOLVED',
          updatedByUserId: 'admin-1',
        },
      });

      const before = await service.getUnreadCount('resident-bulk');
      expect(before.unreadCount).toBe(2);

      const markRes = await service.markAllAsRead('resident-bulk');
      expect(markRes.markedCount).toBe(2);

      const after = await service.getUnreadCount('resident-bulk');
      expect(after.unreadCount).toBe(0);
    });
  });
});
