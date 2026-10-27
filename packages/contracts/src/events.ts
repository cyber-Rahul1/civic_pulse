import { ServiceName } from './enums.js';

/**
 * Standard Domain Event envelope for cross-service asynchronous communication.
 * Microservices do NOT share DB models; they publish and subscribe to these versioned events.
 */
export interface DomainEvent<T = unknown> {
  eventId: string;
  eventType: string;
  aggregateId: string;
  aggregateType: string;
  version: number;
  occurredAt: string;
  sourceService: ServiceName;
  correlationId: string;
  causationId?: string;
  payload: T;
}

export enum EventTopic {
  IDENTITY_EVENTS = 'civic.identity.events',
  REPORTS_EVENTS = 'civic.reports.events',
  COMMUNITY_EVENTS = 'civic.community.events',
  AUTHORITY_EVENTS = 'civic.authority.events',
  MODERATION_EVENTS = 'civic.moderation.events',
  NOTIFICATIONS_DISPATCH = 'civic.notifications.dispatch',
}

export enum NotificationEventType {
  REPORT_CREATED = 'REPORT_CREATED',
  REPORT_STATUS_CHANGED = 'REPORT_STATUS_CHANGED',
  REPORT_COMMENT_ADDED = 'REPORT_COMMENT_ADDED',
  COMMENT_REPLY_ADDED = 'COMMENT_REPLY_ADDED',
  REPORT_ASSIGNED = 'REPORT_ASSIGNED',
  AUTHORITY_APPLICATION_REVIEWED = 'AUTHORITY_APPLICATION_REVIEWED',
  REPRESENTATIVE_NEW_REPORT = 'REPRESENTATIVE_NEW_REPORT',
  RESOLUTION_EVIDENCE_SUBMITTED = 'RESOLUTION_EVIDENCE_SUBMITTED',
  RESOLUTION_EVIDENCE_VERIFIED = 'RESOLUTION_EVIDENCE_VERIFIED',
  PROFILE_CLAIM_REVIEWED = 'PROFILE_CLAIM_REVIEWED',
}

/**
 * Domain Event Payloads
 */
export interface UserRegisteredEventPayload {
  userId: string;
  email: string;
  role: string;
  displayName: string;
}

export interface ReportCreatedEventPayload {
  reportId: string;
  title: string;
  description: string;
  category: string;
  location: {
    latitude: number;
    longitude: number;
    addressDescription?: string;
  };
  reporterId: string;
  mediaUrls: string[];
}

export interface ReportStatusUpdatedEventPayload {
  reportId: string;
  reportTitle: string;
  authorId: string;
  previousStatus: string;
  newStatus: string;
  updatedByUserId: string;
  authorityDepartmentId?: string;
  reason?: string;
}

export interface ReportCommentAddedEventPayload {
  commentId: string;
  reportId: string;
  reportTitle: string;
  reportAuthorId: string;
  commentAuthorId: string;
  commentAuthorName?: string;
  contentSnippet: string;
}

export interface CommentReplyAddedEventPayload {
  replyId: string;
  parentCommentId: string;
  parentAuthorId: string;
  reportId: string;
  reportTitle: string;
  replyAuthorId: string;
  replyAuthorName?: string;
  contentSnippet: string;
}

export interface ReportAssignedEventPayload {
  reportId: string;
  reportTitle: string;
  reportAuthorId: string;
  departmentId: string;
  departmentName: string;
  assignedByUserId: string;
  assignmentReason?: string;
}

export interface AuthorityApplicationReviewedEventPayload {
  applicationId: string;
  applicantUserId: string;
  status: 'APPROVED' | 'REJECTED';
  reviewedByUserId: string;
  decisionNotes?: string;
}
