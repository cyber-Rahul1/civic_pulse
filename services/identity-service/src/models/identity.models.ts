import { UserRole, AccountStatus, VerifiedCurrentLocationDto } from '@civic-pulse/contracts';

export interface UserDocument {
  _id: string; // uuid
  email: string; // normalized lowercased
  passwordHash: string;
  displayName: string;
  role: UserRole;
  status: AccountStatus;
  emailVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
  lastLoginAt?: Date;
  tokenVersion?: number;
  verifiedCurrentLocation?: VerifiedCurrentLocationDto;
}

export interface SessionDocument {
  _id: string; // sessionId (uuid)
  userId: string;
  createdAt: Date;
  updatedAt: Date;
  expiresAt: Date;
  isRevoked: boolean;
  revocationReason?: string;
  userAgent?: string;
  ipAddress?: string;
}

export interface RefreshTokenDocument {
  _id: string; // uuid
  sessionId: string;
  userId: string;
  tokenHash: string; // SHA-256 hash of opaque token
  familyId: string; // tracks rotation ancestry
  isUsed: boolean;
  isRevoked: boolean;
  createdAt: Date;
  expiresAt: Date;
  usedAt?: Date;
}
