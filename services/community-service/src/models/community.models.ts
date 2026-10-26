import { CommentModerationStatus, AbuseReportReason } from '@civic-pulse/contracts';

export interface EndorsementDocument {
  _id: string; // uuid
  reportId: string;
  userId: string;
  createdAt: Date;
}

export interface FollowDocument {
  _id: string; // uuid
  reportId: string;
  userId: string;
  createdAt: Date;
}

export interface CommentDocument {
  _id: string; // uuid
  reportId: string;
  authorUserId: string;
  parentCommentId?: string;
  content: string;
  moderationStatus: CommentModerationStatus;
  moderatedByUserId?: string;
  moderationNotes?: string;
  moderatedAt?: Date;
  isEdited: boolean;
  isDeleted: boolean;
  replyCount: number;
  notificationDispatched?: boolean;
  notificationDispatchError?: string;
  notificationDispatchedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface AbuseReportDocument {
  _id: string; // uuid
  commentId: string;
  reporterUserId: string;
  reason: AbuseReportReason;
  details?: string;
  status: 'PENDING' | 'RESOLVED' | 'DISMISSED';
  createdAt: Date;
}

export interface ReportCommunityStatsDocument {
  _id: string; // reportId
  endorsementCount: number;
  commentCount: number;
  followerCount: number;
  updatedAt: Date;
}
