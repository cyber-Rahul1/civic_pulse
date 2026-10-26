import { NotificationType, NotificationChannel } from '@civic-pulse/contracts';

export interface NotificationDocument {
  _id: string; // Notification ID
  recipientUserId: string;
  type: NotificationType;
  title: string;
  message: string;
  deepLink: string;
  channel: NotificationChannel;
  isRead: boolean;
  readAt?: Date;
  eventId?: string; // Originating event ID for idempotency/traceability
  metadata?: Record<string, any>;
  createdAt: Date;
  updatedAt: Date;
}

export interface NotificationPreferenceDocument {
  _id: string; // userId
  userId: string;
  emailNotifications: boolean;
  pushNotifications: boolean;
  notifyOnStatusChange: boolean;
  notifyOnComments: boolean;
  notifyOnAssignments: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export enum EventProcessingStatus {
  PENDING = 'PENDING',
  PROCESSING = 'PROCESSING',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',
}

export interface ProcessedEventDocument {
  _id: string; // eventId
  eventId: string;
  eventType: string;
  aggregateId: string;
  status: EventProcessingStatus;
  recipientCount: number;
  processedAt?: Date;
  startedAt: Date;
  updatedAt: Date;
  error?: string;
}

export interface DeviceTokenDocument {
  _id: string;
  userId: string;
  token: string;
  platform: 'ios' | 'android' | 'web';
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}
