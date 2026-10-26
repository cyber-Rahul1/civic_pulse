export enum CommentModerationStatus {
  VISIBLE = 'VISIBLE',
  HIDDEN = 'HIDDEN',
  FLAGGED = 'FLAGGED',
  DELETED = 'DELETED',
}

export enum AbuseReportReason {
  SPAM = 'SPAM',
  HARASSMENT = 'HARASSMENT',
  HATE_SPEECH = 'HATE_SPEECH',
  OFF_TOPIC = 'OFF_TOPIC',
  MISINFORMATION = 'MISINFORMATION',
  OTHER = 'OTHER',
}

export interface CommentDto {
  id: string;
  reportId: string;
  authorUserId: string;
  parentCommentId?: string;
  content: string;
  moderationStatus: CommentModerationStatus;
  isEdited: boolean;
  isDeleted: boolean;
  replyCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface EndorsementSummaryDto {
  reportId: string;
  endorsementCount: number;
  isEndorsedByCaller: boolean;
}

export interface CommunitySummaryDto {
  reportId: string;
  endorsementCount: number;
  commentCount: number;
  followerCount: number;
  isEndorsedByCaller: boolean;
  isFollowedByCaller: boolean;
}

export interface FollowReportDto {
  reportId: string;
  userId: string;
  followedAt: string;
}

export interface AbuseReportDto {
  id: string;
  commentId: string;
  reporterUserId: string;
  reason: AbuseReportReason;
  details?: string;
  createdAt: string;
}

export interface CreateCommentDto {
  content: string;
  parentCommentId?: string;
}
