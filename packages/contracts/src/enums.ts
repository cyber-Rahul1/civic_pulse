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

export enum RepresentativeOfficeType {
  WARD_COUNCILLOR = 'WARD_COUNCILLOR',
  SARPANCH = 'SARPANCH',
  MAYOR = 'MAYOR',
  MLA = 'MLA',
  MP = 'MP',
  OTHER_ELECTED = 'OTHER_ELECTED',
}

export enum RepresentativeVerificationStatus {
  VERIFIED_OFFICIAL = 'VERIFIED_OFFICIAL',
  PUBLIC_RECORD = 'PUBLIC_RECORD',
  UNVERIFIED = 'UNVERIFIED',
  FLAGGED_FOR_REVIEW = 'FLAGGED_FOR_REVIEW',
}

export enum RepresentativeTermStatus {
  CURRENT = 'CURRENT',
  FORMER = 'FORMER',
  UNKNOWN = 'UNKNOWN',
}

export enum ProfileClaimStatus {
  UNCLAIMED = 'UNCLAIMED',
  CLAIM_PENDING = 'CLAIM_PENDING',
  CLAIMED_VERIFIED = 'CLAIMED_VERIFIED',
  CLAIM_REJECTED = 'CLAIM_REJECTED',
  CLAIM_REVOKED = 'CLAIM_REVOKED',
}

export enum JurisdictionType {
  STATE = 'STATE',
  DISTRICT = 'DISTRICT',
  PARLIAMENTARY_CONSTITUENCY = 'PARLIAMENTARY_CONSTITUENCY',
  ASSEMBLY_CONSTITUENCY = 'ASSEMBLY_CONSTITUENCY',
  MANDAL = 'MANDAL',
  MUNICIPALITY = 'MUNICIPALITY',
  WARD = 'WARD',
  GRAM_PANCHAYAT = 'GRAM_PANCHAYAT',
}

export enum ReportRepresentativeRelationType {
  AREA_REPRESENTATIVE = 'AREA_REPRESENTATIVE',
  CONSTITUENCY_REPRESENTATIVE = 'CONSTITUENCY_REPRESENTATIVE',
  RESPONSIBLE_AUTHORITY = 'RESPONSIBLE_AUTHORITY',
  RESPONSIBLE_DEPARTMENT = 'RESPONSIBLE_DEPARTMENT',
}

export enum MatchingMethod {
  EXACT_POLYGON = 'EXACT_POLYGON',
  ADMIN_HIERARCHY = 'ADMIN_HIERARCHY',
  FALLBACK_DISTRICT = 'FALLBACK_DISTRICT',
  MANUAL_OVERRIDE = 'MANUAL_OVERRIDE',
}

export enum EvidenceType {
  BEFORE = 'BEFORE',
  AFTER = 'AFTER',
}

export enum EvidenceVerificationStatus {
  PENDING = 'PENDING',
  VERIFIED = 'VERIFIED',
  REJECTED = 'REJECTED',
}

export interface RepresentativeSourceProvenance {
  sourceName: string;
  sourceUrl: string;
  license: string;
  importTimestamp: string;
  verificationDate: string;
  notes?: string;
}

