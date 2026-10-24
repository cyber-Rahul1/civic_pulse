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
  previousStatus: string;
  newStatus: string;
  updatedByUserId: string;
  authorityDepartmentId?: string;
  reason?: string;
}
