import { ReportCategory, ReportStatus } from './enums.js';

export interface GeoPoint {
  type: 'Point';
  coordinates: [number, number]; // [longitude, latitude]
}

export interface MediaAttachment {
  mediaId: string;
  publicId: string;
  url: string;
  secureUrl: string;
  format: string;
  resourceType: 'image' | 'video';
  bytes: number;
  uploadedByUserId: string;
  createdAt: string;
}

export interface StatusTransitionRecord {
  transitionId: string;
  previousStatus: ReportStatus | null;
  newStatus: ReportStatus;
  actorUserId: string;
  actorRole: string;
  reason?: string;
  timestamp: string;
}

export interface ReportDto {
  id: string;
  authorId: string;
  title: string;
  description: string;
  category: ReportCategory;
  location: GeoPoint;
  locationDescription?: string;
  media: MediaAttachment[];
  status: ReportStatus;
  statusHistory: StatusTransitionRecord[];
  resolutionNotes?: string;
  resolutionEvidenceMedia?: MediaAttachment[];
  resolvedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface MediaSignatureRequestDto {
  reportId?: string;
  resourceType?: 'image' | 'video';
  allowedFormats?: string[];
}

export interface MediaSignatureResponseDto {
  signature: string;
  timestamp: number;
  apiKey: string;
  cloudName: string;
  uploadFolder: string;
  publicId: string;
  allowedFormats: string[];
  maxFileSizeBytes: number;
}
