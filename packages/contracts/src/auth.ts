import { UserRole } from './enums.js';

export enum AccountStatus {
  ACTIVE = 'active',
  SUSPENDED = 'suspended',
  PENDING_VERIFICATION = 'pending_verification',
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  tokenType: 'Bearer';
  expiresInSeconds: number;
}

export interface UserProfileDto {
  id: string;
  email: string;
  displayName: string;
  role: UserRole;
  status: AccountStatus;
  emailVerified: boolean;
  createdAt: string;
  lastLoginAt?: string;
}

export interface AuthResponseData {
  user: UserProfileDto;
  tokens: AuthTokens;
}

export interface JwtTokenPayload {
  sub: string;
  email: string;
  role: UserRole;
  sessionId: string;
  iss: string;
  aud: string;
  iat?: number;
  exp?: number;
}
