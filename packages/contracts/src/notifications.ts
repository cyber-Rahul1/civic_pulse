/**
 * CivicPulse Notification Contracts and DTOs
 */

export enum NotificationType {
  REPORT_STATUS_CHANGED = 'REPORT_STATUS_CHANGED',
  REPORT_RESOLVED = 'REPORT_RESOLVED',
  REPORT_REJECTED = 'REPORT_REJECTED',
  REPORT_REOPENED = 'REPORT_REOPENED',
  REPORT_COMMENT_ADDED = 'REPORT_COMMENT_ADDED',
  COMMENT_REPLY_ADDED = 'COMMENT_REPLY_ADDED',
  REPORT_ASSIGNED = 'REPORT_ASSIGNED',
  AUTHORITY_APPLICATION_APPROVED = 'AUTHORITY_APPLICATION_APPROVED',
  AUTHORITY_APPLICATION_REJECTED = 'AUTHORITY_APPLICATION_REJECTED',
}

export enum NotificationChannel {
  IN_APP = 'IN_APP',
  PUSH = 'PUSH',
}

export interface NotificationDto {
  id: string;
  recipientUserId: string;
  type: NotificationType;
  title: string;
  message: string;
  deepLink: string;
  isRead: boolean;
  createdAt: string;
  readAt?: string;
  metadata?: Record<string, any>;
}

export interface NotificationPreferencesDto {
  userId: string;
  emailNotifications: boolean;
  pushNotifications: boolean;
  notifyOnStatusChange: boolean;
  notifyOnComments: boolean;
  notifyOnAssignments: boolean;
  updatedAt: string;
}

export interface UpdateNotificationPreferencesDto {
  emailNotifications?: boolean;
  pushNotifications?: boolean;
  notifyOnStatusChange?: boolean;
  notifyOnComments?: boolean;
  notifyOnAssignments?: boolean;
}

export interface PaginatedNotificationsDto {
  items: NotificationDto[];
  unreadCount: number;
  total: number;
  cursor?: string;
  hasMore: boolean;
}
