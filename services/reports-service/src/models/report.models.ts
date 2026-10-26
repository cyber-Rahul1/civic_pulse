import { ReportCategory, ReportStatus } from '@civic-pulse/contracts';

export interface GeoPointDoc {
  type: 'Point';
  coordinates: [number, number]; // [longitude, latitude]
}

export interface MediaAttachmentDoc {
  mediaId: string;
  publicId: string;
  url: string;
  secureUrl: string;
  format: string;
  resourceType: 'image' | 'video';
  bytes: number;
  uploadedByUserId: string;
  createdAt: Date;
}

export interface StatusTransitionDoc {
  transitionId: string;
  previousStatus: ReportStatus | null;
  newStatus: ReportStatus;
  actorUserId: string;
  actorRole: string;
  reason?: string;
  timestamp: Date;
  notificationDispatched?: boolean;
  notificationDispatchError?: string;
  notificationDispatchedAt?: Date;
}

export interface AdministrativeContextDoc {
  districtId: string;
  mandalId?: string;
  localityId?: string;
}

export interface ReporterLocationDoc {
  coordinates: [number, number]; // [longitude, latitude]
  eligibilityStatus: 'INSIDE_AP' | 'OUTSIDE_AP' | 'UNVERIFIED';
  accuracyMeters?: number;
}

export interface ReportDocument {
  _id: string; // uuid
  authorId: string;
  title: string;
  description: string;
  category: ReportCategory;
  urgency?: 'low' | 'medium' | 'high' | 'critical';
  urgencyConfirmedBy?: string;
  urgencyConfirmedAt?: Date;
  urgencyConfirmationReason?: string;
  location?: GeoPointDoc;
  locationDescription?: string;
  administrativeContext?: AdministrativeContextDoc;
  reporterLocation?: ReporterLocationDoc;
  media: MediaAttachmentDoc[];
  status: ReportStatus;
  statusHistory: StatusTransitionDoc[];
  resolutionNotes?: string;
  resolutionEvidenceMedia?: MediaAttachmentDoc[];
  resolvedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface MediaUploadRecord {
  _id: string; // publicId
  mediaId: string;
  userId: string;
  reportId?: string;
  uploadFolder: string;
  resourceType: 'image' | 'video';
  allowedFormats: string[];
  maxFileSizeBytes: number;
  signature: string;
  timestamp: number;
  bytes?: number;
  format?: string;
  url?: string;
  secureUrl?: string;
  isAttached: boolean;
  attachedToReportId?: string;
  expiresAt: Date;
  createdAt: Date;
}
