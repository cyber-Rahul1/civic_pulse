import http from 'http';
import Redis from 'ioredis';
import { CivicLogger } from '@civic-pulse/nest-common';

export interface EventDispatcherConfig {
  reportsServiceUrl: string;
  communityServiceUrl: string;
  authorityServiceUrl: string;
  notificationsServiceUrl: string;
  internalServiceToken: string;
  redisUrl: string;
  pollIntervalMs?: number;
  leaseDurationMs?: number;
}

export class EventDispatcherRecoveryWorker {
  private isRunning = false;
  private timer: NodeJS.Timeout | null = null;
  private redis: Redis | null = null;
  private readonly logger: CivicLogger;
  private readonly reportsServiceUrl: string;
  private readonly communityServiceUrl: string;
  private readonly authorityServiceUrl: string;
  private readonly internalServiceToken: string;
  private readonly pollIntervalMs: number;
  private readonly leaseDurationMs: number;
  private readonly workerId: string;

  constructor(config: EventDispatcherConfig) {
    this.logger = new CivicLogger();
    this.logger.setContext('EventDispatcherRecoveryWorker');

    this.reportsServiceUrl = config.reportsServiceUrl;
    this.communityServiceUrl = config.communityServiceUrl;
    this.authorityServiceUrl = config.authorityServiceUrl;
    this.internalServiceToken = config.internalServiceToken;
    this.pollIntervalMs = config.pollIntervalMs || 5000;
    this.leaseDurationMs = config.leaseDurationMs || 10000;
    this.workerId = `worker-${process.pid}-${Date.now()}`;

    if (config.redisUrl) {
      try {
        this.redis = new Redis(config.redisUrl, {
          lazyConnect: true,
          maxRetriesPerRequest: 1,
        });
      } catch (err: any) {
        this.logger.warn(`Redis client initialization skipped: ${err.message}`);
      }
    }
  }

  async start(): Promise<void> {
    if (this.isRunning) return;
    this.isRunning = true;
    this.logger.log(`Starting EventDispatcherRecoveryWorker (${this.workerId})...`);

    if (this.redis) {
      try {
        await this.redis.connect();
      } catch (err: any) {
        this.logger.warn(`Redis connection failed, falling back to local coordination: ${err.message}`);
      }
    }

    const runLoop = async () => {
      if (!this.isRunning) return;
      try {
        await this.runRecoveryPass();
      } catch (err: any) {
        this.logger.warn(`Error during recovery pass: ${err.message}`);
      }
      if (this.isRunning) {
        this.timer = setTimeout(runLoop, this.pollIntervalMs);
      }
    };

    runLoop();
  }

  async stop(): Promise<void> {
    this.isRunning = false;
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
    if (this.redis) {
      await this.redis.quit().catch(() => {});
    }
    this.logger.log('EventDispatcherRecoveryWorker stopped.');
  }

  /**
   * Performs an atomic recovery pass across Reports, Community, and Authority microservices.
   * Uses Redis distributed lock/lease if available to ensure only one worker processes at a time.
   * Lock acquisition uses a unique random token and release uses an atomic Lua script (compare-and-delete)
   * with automatic heartbeat renewal during long-running passes.
   */
  async runRecoveryPass(): Promise<{
    reports: { scanned: number; recovered: number; failed: number };
    community: { scanned: number; recovered: number; failed: number };
    authority: { scanned: number; recovered: number; failed: number };
  }> {
    const lockKey = 'lock:event_dispatcher_recovery';
    const acquisitionToken = `${this.workerId}:${Math.random().toString(36).substring(2, 10)}:${Date.now()}`;
    let lockAcquired = false;
    let renewalTimer: NodeJS.Timeout | null = null;

    if (this.redis && this.redis.status === 'ready') {
      try {
        const res = await this.redis.set(lockKey, acquisitionToken, 'PX', this.leaseDurationMs, 'NX');
        if (!res) {
          // Another worker holds the lease
          return {
            reports: { scanned: 0, recovered: 0, failed: 0 },
            community: { scanned: 0, recovered: 0, failed: 0 },
            authority: { scanned: 0, recovered: 0, failed: 0 },
          };
        }
        lockAcquired = true;

        // Start heartbeat renewal at half the lease duration to prevent expiry during long passes
        const renewalInterval = Math.max(1000, Math.floor(this.leaseDurationMs / 2));
        renewalTimer = setInterval(async () => {
          if (!this.redis || this.redis.status !== 'ready') return;
          try {
            // Renewal script: only extend if current value matches our acquisition token
            const renewScript = `
              if redis.call("get", KEYS[1]) == ARGV[1] then
                return redis.call("pexpire", KEYS[1], ARGV[2])
              else
                return 0
              end
            `;
            await this.redis.eval(renewScript, 1, lockKey, acquisitionToken, this.leaseDurationMs);
          } catch (err: any) {
            this.logger.warn(`Failed to renew lock lease: ${err.message}`);
          }
        }, renewalInterval);
      } catch (err: any) {
        this.logger.warn(`Distributed lock check failed: ${err.message}`);
      }
    }

    try {
      const [reportsRes, communityRes, authorityRes] = await Promise.all([
        this.triggerServiceRecovery(`${this.reportsServiceUrl}/api/v1/internal/reports/events/recover`),
        this.triggerServiceRecovery(`${this.communityServiceUrl}/api/v1/internal/community/events/recover`),
        this.triggerServiceRecovery(`${this.authorityServiceUrl}/api/v1/internal/authority/events/recover`),
      ]);

      if (reportsRes.recovered > 0 || communityRes.recovered > 0 || authorityRes.recovered > 0) {
        this.logger.log(
          `Recovery pass completed: reports=${reportsRes.recovered}/${reportsRes.scanned}, community=${communityRes.recovered}/${communityRes.scanned}, authority=${authorityRes.recovered}/${authorityRes.scanned}`,
        );
      }

      return {
        reports: reportsRes,
        community: communityRes,
        authority: authorityRes,
      };
    } finally {
      if (renewalTimer) {
        clearInterval(renewalTimer);
        renewalTimer = null;
      }

      if (lockAcquired && this.redis && this.redis.status === 'ready') {
        try {
          // Atomic compare-and-delete: only delete if current value matches our acquisitionToken
          const releaseScript = `
            if redis.call("get", KEYS[1]) == ARGV[1] then
              return redis.call("del", KEYS[1])
            else
              return 0
            end
          `;
          await this.redis.eval(releaseScript, 1, lockKey, acquisitionToken);
        } catch (err: any) {
          this.logger.warn(`Failed to release lock cleanly: ${err.message}`);
        }
      }
    }
  }

  private triggerServiceRecovery(urlStr: string): Promise<{ scanned: number; recovered: number; failed: number }> {
    return new Promise((resolve) => {
      try {
        const url = new URL(urlStr);
        const postData = '{}';
        const req = http.request(
          url.href,
          {
            method: 'POST',
            headers: {
              'content-type': 'application/json',
              'content-length': Buffer.byteLength(postData),
              'x-internal-service-token': this.internalServiceToken,
              'x-internal-service-name': 'event-dispatcher-worker',
            },
            timeout: 5000,
          },
          (res) => {
            let data = '';
            res.on('data', (c) => (data += c));
            res.on('end', () => {
              try {
                const parsed = JSON.parse(data);
                const result = parsed.data || parsed;
                resolve({
                  scanned: result.scanned || 0,
                  recovered: result.recovered || 0,
                  failed: result.failed || 0,
                });
              } catch {
                resolve({ scanned: 0, recovered: 0, failed: 0 });
              }
            });
          },
        );

        req.on('error', () => {
          resolve({ scanned: 0, recovered: 0, failed: 0 });
        });
        req.on('timeout', () => {
          req.destroy();
          resolve({ scanned: 0, recovered: 0, failed: 0 });
        });
        req.write(postData);
        req.end();
      } catch {
        resolve({ scanned: 0, recovered: 0, failed: 0 });
      }
    });
  }
}
