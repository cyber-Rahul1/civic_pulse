export enum ServiceName {
  API_GATEWAY = 'api-gateway',
  IDENTITY = 'identity-service',
  REPORTS = 'reports-service',
  COMMUNITY = 'community-service',
  AUTHORITY = 'authority-service',
  MEDIA = 'media-service',
  NOTIFICATIONS = 'notifications-service',
  AI = 'ai-service',
  SOCIAL_PUBLISHING = 'social-publishing-service',
  MODERATION = 'moderation-service',
  WORKER_EVENT_DISPATCHER = 'event-dispatcher-worker',
}

export enum UserRole {
  RESIDENT = 'resident',
  AUTHORITY = 'authority',
  MODERATOR = 'moderator',
  ADMIN = 'admin',
}

export enum ReportCategory {
  POTHOLE = 'POTHOLE',
  GARBAGE = 'GARBAGE',
  STREETLIGHT = 'STREETLIGHT',
  DRAINAGE = 'DRAINAGE',
  WATER = 'WATER',
  ROAD_DAMAGE = 'ROAD_DAMAGE',
  PUBLIC_SAFETY = 'PUBLIC_SAFETY',
  OTHER = 'OTHER',
}

export enum ReportStatus {
  SUBMITTED = 'SUBMITTED',
  UNDER_REVIEW = 'UNDER_REVIEW',
  IN_PROGRESS = 'IN_PROGRESS',
  RESOLVED = 'RESOLVED',
  REJECTED = 'REJECTED',
  REOPENED = 'REOPENED',
}

export enum ReportUrgency {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  CRITICAL = 'critical',
}

export enum GpsEligibilityStatus {
  INSIDE_AP = 'INSIDE_AP',
  OUTSIDE_AP = 'OUTSIDE_AP',
  UNVERIFIED = 'UNVERIFIED',
}
