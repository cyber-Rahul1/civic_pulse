import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MongoClient, Db, Collection } from 'mongodb';
import { CivicLogger } from '@civic-pulse/nest-common';
import {
  NotificationDocument,
  NotificationPreferenceDocument,
  ProcessedEventDocument,
  DeviceTokenDocument,
} from '../models/notification.models.js';

@Injectable()
export class DatabaseService implements OnModuleInit, OnModuleDestroy {
  private client!: MongoClient;
  private db!: Db;

  public notifications!: Collection<NotificationDocument>;
  public preferences!: Collection<NotificationPreferenceDocument>;
  public processedEvents!: Collection<ProcessedEventDocument>;
  public deviceTokens!: Collection<DeviceTokenDocument>;

  constructor(
    private readonly configService: ConfigService,
    private readonly logger: CivicLogger,
  ) {
    this.logger.setContext('Notifications:DatabaseService');
  }

  async onModuleInit() {
    const uri =
      this.configService.get<string>('NOTIFICATIONS_DB_URI') ||
      'mongodb://civic_notifications_user:notifications_dev_secret@localhost:27018/civic_notifications?authSource=civic_notifications';

    this.logger.log('Connecting to Notifications logical MongoDB...');
    this.client = new MongoClient(uri, {
      maxPoolSize: 20,
      minPoolSize: 2,
      serverSelectionTimeoutMS: 5000,
    });

    await this.client.connect();
    this.db = this.client.db();
    this.logger.log(`Connected successfully to database: ${this.db.databaseName}`);

    this.notifications = this.db.collection<NotificationDocument>('notifications');
    this.preferences = this.db.collection<NotificationPreferenceDocument>('notification_preferences');
    this.processedEvents = this.db.collection<ProcessedEventDocument>('processed_events');
    this.deviceTokens = this.db.collection<DeviceTokenDocument>('device_tokens');

    await this.ensureIndexes();
  }

  async onModuleDestroy() {
    if (this.client) {
      await this.client.close();
      this.logger.log('Notifications database connection pool closed.');
    }
  }

  getDb(): Db {
    return this.db;
  }

  private async ensureIndexes(): Promise<void> {
    // 1. Notifications: recipient index for pagination and read status
    await this.notifications.createIndex(
      { recipientUserId: 1, createdAt: -1 },
      { name: 'idx_recipient_created_desc' },
    );
    await this.notifications.createIndex(
      { recipientUserId: 1, isRead: 1 },
      { name: 'idx_recipient_is_read' },
    );
    // Compound unique index for idempotency: one notification per (eventId, recipientUserId)
    await this.notifications.createIndex(
      { eventId: 1, recipientUserId: 1 },
      { unique: true, sparse: true, name: 'uniq_event_recipient' },
    );

    // 2. Preferences: Unique index on userId
    await this.preferences.createIndex(
      { userId: 1 },
      { unique: true, name: 'uniq_user_preferences' },
    );

    // 3. Processed events: Unique index on eventId, index on status
    await this.processedEvents.createIndex(
      { eventId: 1 },
      { unique: true, name: 'uniq_processed_event_id' },
    );
    await this.processedEvents.createIndex(
      { status: 1, updatedAt: -1 },
      { name: 'idx_processed_event_status' },
    );

    // 4. Device tokens: unique compound index on (userId, token)
    await this.deviceTokens.createIndex(
      { userId: 1, token: 1 },
      { unique: true, name: 'uniq_user_device_token' },
    );
    await this.deviceTokens.createIndex({ userId: 1, isActive: 1 });

    this.logger.log('Notifications database indexes verified successfully.');
  }
}
