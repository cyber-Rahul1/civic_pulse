import { UserRole, LocationVerificationStatus } from './enums.js';

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

export interface VerifiedCurrentLocationDto {
  status: LocationVerificationStatus;
  state: string;
  districtId?: string;
  districtName?: string;
  cityOrTown?: string;
  mandalId?: string;
  mandalName?: string;
  coordinates?: [number, number]; // [longitude, latitude]
  accuracyMeters?: number;
  verifiedAt?: string;
  verificationSource: 'GPS_DEVICE';
}

export interface VerifyCurrentLocationDto {
  coordinates: [number, number]; // [longitude, latitude]
  accuracyMeters?: number;
  timestamp?: number;
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
  verifiedCurrentLocation?: VerifiedCurrentLocationDto;
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
  tokenVersion?: number;
  iss: string;
  aud: string;
  iat?: number;
  exp?: number;
}

export interface RegisterDto {
  email: string;
  password: string;
  displayName: string;
}

export interface LoginDto {
  email: string;
  password: string;
}

export interface RefreshTokenDto {
  refreshToken: string;
}
