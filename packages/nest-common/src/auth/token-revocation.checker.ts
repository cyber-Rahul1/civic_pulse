import { Injectable, Optional } from '@nestjs/common';
import { Redis } from 'ioredis';
import { UserRole, JwtTokenPayload } from '@civic-pulse/contracts';

export interface TokenRevocationCheckerOptions {
  redisHost?: string;
  redisPort?: number;
  redisPassword?: string;
  failClosed?: boolean; // If true and Redis is unreachable during privileged role check, reject (default: true)
}

@Injectable()
export class TokenRevocationChecker {
  private redisClient: Redis | null = null;
  private isConnected = false;
  private readonly failClosed: boolean;

  constructor(@Optional() options?: TokenRevocationCheckerOptions) {
    const host = options?.redisHost || process.env.REDIS_HOST || 'localhost';
    const port = Number(options?.redisPort || process.env.REDIS_PORT || 6380);
    const password = options?.redisPassword || process.env.REDIS_PASSWORD;
    this.failClosed = options?.failClosed !== undefined ? options.failClosed : true;

    try {
      this.redisClient = new Redis({
        host,
        port,
        password: password || undefined,
        retryStrategy: (times) => {
          if (times > 3) return null;
          return Math.min(times * 200, 1000);
        },
        maxRetriesPerRequest: 2,
        enableOfflineQueue: false,
      });

      this.redisClient.on('connect', () => {
        this.isConnected = true;
      });

      this.redisClient.on('error', () => {
        this.isConnected = false;
      });
    } catch {
      this.isConnected = false;
    }
  }

  /**
   * Checks if an access token carrying privileged roles has been revoked.
   * Privileged roles: AUTHORITY, ADMIN, MODERATOR.
   *
   * Revocation criteria:
   * 1. Session revocation: key `revocation:session:${sessionId}` exists.
   * 2. User revocation: key `revocation:user:${userId}` exists with timestamp >= token.iat.
   *
   * Failure mode:
   * If Redis is down/unreachable:
   * - If role is privileged (AUTHORITY, ADMIN, MODERATOR) and failClosed is true: returns { isRevoked: true, reason: 'Revocation status cannot be verified (fail-closed)' }
   * - If role is unprivileged (RESIDENT): returns { isRevoked: false }
   */
  async checkTokenRevocation(
    payload: JwtTokenPayload,
    requiredRoles?: UserRole[],
  ): Promise<{ isRevoked: boolean; reason?: string }> {
    const isPrivilegedRole =
      payload.role === UserRole.AUTHORITY ||
      payload.role === UserRole.ADMIN ||
      payload.role === UserRole.MODERATOR;

    const requiresPrivilege =
      requiredRoles &&
      requiredRoles.some(
        (r) =>
          r === UserRole.AUTHORITY ||
          r === UserRole.ADMIN ||
          r === UserRole.MODERATOR,
      );

    // If neither the token nor the target endpoint requires privileged permissions,
    // standard resident tokens expire naturally according to short-lived 15m lifetime.
    if (!isPrivilegedRole && !requiresPrivilege) {
      return { isRevoked: false };
    }

    if (!this.redisClient || !this.isConnected) {
      if (this.failClosed) {
        return {
          isRevoked: true,
          reason: 'Revocation status store unavailable for privileged action (fail-closed)',
        };
      }
      return { isRevoked: false };
    }

    try {
      // 1. Check if specific session was revoked
      if (payload.sessionId) {
        const sessionRevoked = await this.redisClient.get(`revocation:session:${payload.sessionId}`);
        if (sessionRevoked) {
          return { isRevoked: true, reason: 'Session has been revoked' };
        }
      }

      // 2. Check if user tokenVersion has been incremented (monotonic version check eliminating same-second ambiguity)
      const userMinVersionStr = await this.redisClient.get(`revocation:uversion:${payload.sub}`);
      if (userMinVersionStr) {
        const minRequiredVersion = Number(userMinVersionStr);
        const tokenVersion = payload.tokenVersion ?? 1;
        if (tokenVersion < minRequiredVersion) {
          return {
            isRevoked: true,
            reason: `Token version (${tokenVersion}) superseded by revocation generation (${minRequiredVersion})`,
          };
        }
      }

      // 3. Fallback: Check if user tokens issued before epoch timestamp were revoked
      const userRevokedTimestampStr = await this.redisClient.get(`revocation:user:${payload.sub}`);
      if (userRevokedTimestampStr) {
        const revokedEpochSeconds = Number(userRevokedTimestampStr);
        const tokenIssuedAtSeconds = payload.iat || 0;
        // If token was issued strictly before the revocation event, it is revoked.
        if (tokenIssuedAtSeconds < revokedEpochSeconds) {
          return { isRevoked: true, reason: 'User tokens have been revoked due to role change or logout' };
        }
      }

      return { isRevoked: false };
    } catch {
      if (this.failClosed) {
        return {
          isRevoked: true,
          reason: 'Error establishing revocation status for privileged action (fail-closed)',
        };
      }
      return { isRevoked: false };
    }
  }

  async close(): Promise<void> {
    if (this.redisClient) {
      try {
        await this.redisClient.quit();
      } catch {
        // Ignore
      }
    }
  }
}
