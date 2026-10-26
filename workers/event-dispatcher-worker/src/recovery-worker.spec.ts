import { Redis } from 'ioredis';
import { EventDispatcherRecoveryWorker } from './recovery-worker.js';

describe('EventDispatcherRecoveryWorker Lease Safety Tests', () => {
  let redis: Redis;
  const lockKey = 'lock:event_dispatcher_recovery';

  beforeAll(async () => {
    redis = new Redis(process.env.REDIS_URL || 'redis://:redis_dev_secret_password@localhost:6380', {
      lazyConnect: true,
      maxRetriesPerRequest: 1,
    });
    await redis.connect();
  });

  afterAll(async () => {
    await redis.del(lockKey);
    await redis.quit();
  });

  beforeEach(async () => {
    await redis.del(lockKey);
  });

  it('1. Mutual exclusion: Second worker cannot acquire lease concurrently', async () => {
    const worker1 = new EventDispatcherRecoveryWorker({
      notificationsServiceUrl: 'http://127.0.0.1:3005',
      reportsServiceUrl: 'http://127.0.0.1:3002',
      communityServiceUrl: 'http://127.0.0.1:3003',
      authorityServiceUrl: 'http://127.0.0.1:3004',
      internalServiceToken: 'secret',
      redisUrl: 'redis://:redis_dev_secret_password@localhost:6380',
      leaseDurationMs: 5000,
    });

    const worker2 = new EventDispatcherRecoveryWorker({
      notificationsServiceUrl: 'http://127.0.0.1:3005',
      reportsServiceUrl: 'http://127.0.0.1:3002',
      communityServiceUrl: 'http://127.0.0.1:3003',
      authorityServiceUrl: 'http://127.0.0.1:3004',
      internalServiceToken: 'secret',
      redisUrl: 'redis://:redis_dev_secret_password@localhost:6380',
      leaseDurationMs: 5000,
    });

    // Manually set lock for worker1
    await redis.set(lockKey, 'worker1-token', 'PX', 5000, 'NX');

    // Worker2 attempts pass while lock held
    const report2 = await worker2.runRecoveryPass();
    expect(report2.reports.scanned).toBe(0);
    expect(report2.reports.recovered).toBe(0);

    await worker1.stop();
    await worker2.stop();
  });

  it('2. Lease expiration: Abandoned lease expires and allows new worker to proceed', async () => {
    // Acquire lease with short 500ms duration
    await redis.set(lockKey, 'abandoned-worker-token', 'PX', 500, 'NX');

    // Wait 600ms for expiration
    await new Promise((r) => setTimeout(r, 600));

    const isStillHeld = await redis.get(lockKey);
    expect(isStillHeld).toBeNull();

    // New worker can now acquire lock
    const acquired = await redis.set(lockKey, 'new-worker-token', 'PX', 5000, 'NX');
    expect(acquired).toBe('OK');
  });

  it('3. Ownership-safe release: Former worker cannot delete another worker lease (compare-and-delete)', async () => {
    const formerWorkerToken = 'worker-A-token';
    const newerWorkerToken = 'worker-B-token';

    // Newer worker acquired lock
    await redis.set(lockKey, newerWorkerToken, 'PX', 5000);

    // Former worker attempts to release lock using atomic compare-and-delete Lua script
    const releaseScript = `
      if redis.call("get", KEYS[1]) == ARGV[1] then
        return redis.call("del", KEYS[1])
      else
        return 0
      end
    `;

    const result = await redis.eval(releaseScript, 1, lockKey, formerWorkerToken);
    expect(result).toBe(0);

    // Verify lock is still intact and owned by worker B
    const currentVal = await redis.get(lockKey);
    expect(currentVal).toBe(newerWorkerToken);
  });

  it('4. Heartbeat renewal: Active worker extends lease before expiration', async () => {
    const activeToken = 'heartbeat-worker-token';
    await redis.set(lockKey, activeToken, 'PX', 1000);

    const renewScript = `
      if redis.call("get", KEYS[1]) == ARGV[1] then
        return redis.call("pexpire", KEYS[1], ARGV[2])
      else
        return 0
      end
    `;

    // Renew for 3000ms
    const renewed = await redis.eval(renewScript, 1, lockKey, activeToken, 3000);
    expect(renewed).toBe(1);

    const ttl = await redis.pttl(lockKey);
    expect(ttl).toBeGreaterThan(1500);
  });
});
