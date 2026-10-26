import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Redis } from 'ioredis';
import { CivicLogger } from '@civic-pulse/nest-common';

@Injectable()
export class RevocationRegistryService implements OnModuleInit, OnModuleDestroy {
  private redisClient: Redis | null = null;
  private isConnected = false;
  private connectionEpoch = 0;

  constructor(
    private readonly configService: ConfigService,
    private readonly logger: CivicLogger,
  ) {
    this.logger.setContext('Identity:RevocationRegistry');
  }

  async onModuleInit() {
    const host = this.configService.get<string>('REDIS_HOST') || 'localhost';
    const port = Number(this.configService.get<number>('REDIS_PORT') || 6380);
    const password = this.configService.get<string>('REDIS_PASSWORD');

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
        this.connectionEpoch++;
        this.logger.log(`Connected to Redis revocation store on ${host}:${port} (epoch: ${this.connectionEpoch})`);
      });

      this.redisClient.on('close', () => {
        this.isConnected = false;
        this.connectionEpoch++;
        this.logger.warn(`Redis connection closed (epoch advanced to ${this.connectionEpoch})`);
      });

      this.redisClient.on('error', (err) => {
        this.isConnected = false;
        this.logger.error(`Redis connection error: ${err.message}`);
      });
    } catch (err: any) {
      this.logger.error(`Failed to initialize Redis client: ${err.message}`);
    }
  }

  async onModuleDestroy() {
    if (this.redisClient) {
      try {
        await this.redisClient.quit();
      } catch {
        // Ignore disconnect error
      }
    }
  }

  /**
   * Helper to ensure acknowledged write has been durably flushed to AOF disk (fsync).
   * Uses Redis 7.2+ WAITAOF command: WAITAOF 1 0 timeoutMs.
   *
   * STRICT ACKNOWLEDGEMENT REQUIREMENTS:
   * 1. Must execute on the SAME live connection epoch as the preceding write.
   * 2. Must return an array where response[0] (local AOF fsync count) >= 1.
   * 3. Any timeout, unsupported response, [0, 0], malformed result, or error MUST throw
   *    so caller fails closed.
   */
  async syncToAof(preWriteEpoch?: number, timeoutMs = 1000): Promise<void> {
    if (!this.redisClient || !this.isConnected) {
      throw new Error('Revocation store unavailable: Redis client not connected for WAITAOF acknowledgement');
    }

    if (preWriteEpoch !== undefined && this.connectionEpoch !== preWriteEpoch) {
      throw new Error(
        `Redis connection lost or reconnected between revocation write and WAITAOF (pre: ${preWriteEpoch}, post: ${this.connectionEpoch})`,
      );
    }

    let rawResult: any;
    try {
      // WAITAOF numlocal numreplicas timeout
      // 1 local AOF sync, 0 replicas, 1000ms timeout
      rawResult = await this.redisClient.call('WAITAOF', '1', '0', timeoutMs.toString());
    } catch (err: any) {
      this.logger.error(`WAITAOF command execution failed: ${err.message}`);
      throw new Error(`Revocation durability failure: WAITAOF command rejected (${err.message})`);
    }

    // WAITAOF returns [numlocal, numreplicas], e.g. [1, 0]
    if (!Array.isArray(rawResult) || rawResult.length < 1) {
      throw new Error(
        `Revocation durability failure: invalid WAITAOF response format (${JSON.stringify(rawResult)})`,
      );
    }

    const localAofCount = Number(rawResult[0]);
    if (isNaN(localAofCount) || localAofCount < 1) {
      throw new Error(
        `Revocation durability failure: insufficient local AOF fsync acknowledgement (received ${localAofCount}, required >= 1). Response: ${JSON.stringify(rawResult)}`,
      );
    }

    // Re-verify connection did not close/reconnect during the WAITAOF roundtrip
    if (preWriteEpoch !== undefined && this.connectionEpoch !== preWriteEpoch) {
      throw new Error(
        `Redis connection closed during WAITAOF execution (epoch changed from ${preWriteEpoch} to ${this.connectionEpoch})`,
      );
    }
  }

  /**
   * Revoke all tokens issued for a user at or before the given timestamp (Unix seconds).
   * Throws if Redis write or WAITAOF durability fails so callers fail-closed.
   */
  async revokeUser(userId: string, revokedAtTimestampSeconds: number, ttlSeconds = 900): Promise<void> {
    if (!this.redisClient || !this.isConnected) {
      this.logger.error(`Redis client not connected; user revocation write failed for ${userId}`);
      throw new Error(`Revocation store unavailable: cannot write revocation for user ${userId}`);
    }
    const currentEpoch = this.connectionEpoch;
    try {
      const key = `revocation:user:${userId}`;
      await this.redisClient.set(key, revokedAtTimestampSeconds.toString(), 'EX', ttlSeconds);
      await this.syncToAof(currentEpoch);
      this.logger.log(`User ${userId} tokens revoked in Redis at epoch ${revokedAtTimestampSeconds} (TTL: ${ttlSeconds}s, durably synced)`);
    } catch (err: any) {
      this.logger.error(`Failed to set user revocation in Redis for ${userId}: ${err.message}`);
      throw new Error(`Revocation store write error for user ${userId}: ${err.message}`);
    }
  }

  /**
   * Revoke tokens for a user strictly below the new tokenVersion.
   * Throws if Redis write or WAITAOF durability fails so callers fail-closed.
   */
  async revokeUserVersion(userId: string, newMinVersion: number, ttlSeconds = 900): Promise<void> {
    if (!this.redisClient || !this.isConnected) {
      this.logger.error(`Redis client not connected; user version revocation write failed for ${userId}`);
      throw new Error(`Revocation store unavailable: cannot write version revocation for user ${userId}`);
    }
    const currentEpoch = this.connectionEpoch;
    try {
      const key = `revocation:uversion:${userId}`;
      await this.redisClient.set(key, newMinVersion.toString(), 'EX', ttlSeconds);
      await this.syncToAof(currentEpoch);
      this.logger.log(`User ${userId} tokenVersion set to ${newMinVersion} in Redis (TTL: ${ttlSeconds}s, durably synced)`);
    } catch (err: any) {
      this.logger.error(`Failed to set user version revocation in Redis for ${userId}: ${err.message}`);
      throw new Error(`Revocation store write error for user ${userId}: ${err.message}`);
    }
  }

  /**
   * Revoke a specific session immediately.
   * Throws if Redis write or WAITAOF durability fails so callers fail-closed.
   */
  async revokeSession(sessionId: string, ttlSeconds = 900): Promise<void> {
    if (!this.redisClient || !this.isConnected) {
      this.logger.error(`Redis client not connected; session revocation write failed for ${sessionId}`);
      throw new Error(`Revocation store unavailable: cannot write revocation for session ${sessionId}`);
    }
    const currentEpoch = this.connectionEpoch;
    try {
      const key = `revocation:session:${sessionId}`;
      await this.redisClient.set(key, '1', 'EX', ttlSeconds);
      await this.syncToAof(currentEpoch);
      this.logger.log(`Session ${sessionId} marked revoked in Redis (TTL: ${ttlSeconds}s, durably synced)`);
    } catch (err: any) {
      this.logger.error(`Failed to set session revocation in Redis for ${sessionId}: ${err.message}`);
      throw new Error(`Revocation store write error for session ${sessionId}: ${err.message}`);
    }
  }
}
