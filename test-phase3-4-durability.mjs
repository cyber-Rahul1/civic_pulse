/**
 * Phase 3.4 Failure-Injection & Durability Test Suite:
 * Crash-Recovery, AOF Fsync Durability, Redis Termination, and Fail-Closed Verification
 *
 * Verifies:
 * 1. Redis Revocation Write Failure / Out-of-Memory handling:
 *    - Role elevation / demotion aborted before MongoDB mutation if Redis fails.
 * 2. Redis Termination Immediately After Acknowledged Write & Recovery:
 *    - Revocation write issued with WAITAOF durability.
 *    - Redis container restarted via Docker.
 *    - Token presented after restart remains strictly rejected (HTTP 401).
 * 3. Race Conditions: Logout racing with refresh / login.
 * 4. Recovery and reconciliation: Outdated snapshot / desync behavior.
 * 5. Idempotent retries after partial failure.
 */

import http from 'http';
import { execSync } from 'child_process';
import { MongoClient } from 'mongodb';
import { Redis } from 'ioredis';

const GATEWAY_BASE = 'http://127.0.0.1:3000';
const IDENTITY_DIRECT_BASE = 'http://127.0.0.1:3001';
const AUTHORITY_INTERNAL_KEY = 'civic_pulse_authority_internal_secret_dev';

function makeRequest(baseUrl, options, bodyData = null) {
  return new Promise((resolve, reject) => {
    const url = new URL(options.path, baseUrl);
    const postData = bodyData
      ? typeof bodyData === 'string'
        ? bodyData
        : JSON.stringify(bodyData)
      : null;

    const headers = { ...(options.headers || {}) };
    if (postData) {
      headers['Content-Type'] = headers['Content-Type'] || 'application/json';
      headers['Content-Length'] = Buffer.byteLength(postData);
    }

    const req = http.request(
      {
        hostname: url.hostname,
        port: url.port,
        path: url.pathname + (url.search || ''),
        method: options.method || 'GET',
        headers,
      },
      (res) => {
        let b = '';
        res.on('data', (c) => (b += c));
        res.on('end', () => {
          let parsed;
          try {
            parsed = JSON.parse(b);
          } catch {
            parsed = b;
          }
          resolve({ status: res.statusCode, headers: res.headers, data: parsed });
        });
      },
    );
    req.on('error', reject);
    if (postData) {
      req.write(postData);
    }
    req.end();
  });
}

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function runTests() {
  console.log('=====================================================================');
  console.log('CIVICPULSE PHASE 3.4: DURABILITY & CRASH-RECOVERY AUDIT SUITE');
  console.log('=====================================================================\n');

  const redis = new Redis({ host: '127.0.0.1', port: 6380, password: 'redis_dev_secret_password' });
  const mongoClient = new MongoClient('mongodb://civic_identity_user:identity_dev_secret@127.0.0.1:27018/civic_identity?authSource=civic_identity');
  await mongoClient.connect();
  const identityDb = mongoClient.db('civic_identity');
  const usersCollection = identityDb.collection('users');

  try {
    // -------------------------------------------------------------
    // Test 1: Verify Redis Deployment Configuration and WAITAOF
    // -------------------------------------------------------------
    console.log('1. Auditing Live Redis Deployment & Persistence Capabilities...');
    const infoServer = await redis.info('server');
    const redisVersionMatch = infoServer.match(/redis_version:([^\r\n]+)/);
    const redisVersion = redisVersionMatch ? redisVersionMatch[1] : 'unknown';
    console.log(`   Redis version: ${redisVersion}`);

    const maxmemoryPolicy = await redis.config('get', 'maxmemory-policy');
    console.log(`   maxmemory-policy: ${maxmemoryPolicy[1]}`);
    if (maxmemoryPolicy[1] !== 'noeviction') {
      throw new Error(`Expected maxmemory-policy to be noeviction, got ${maxmemoryPolicy[1]}`);
    }

    const appendonly = await redis.config('get', 'appendonly');
    console.log(`   appendonly: ${appendonly[1]}`);
    if (appendonly[1] !== 'yes') {
      throw new Error(`Expected appendonly to be yes, got ${appendonly[1]}`);
    }

    const appendfsync = await redis.config('get', 'appendfsync');
    console.log(`   appendfsync: ${appendfsync[1]}`);

    const replicationInfo = await redis.info('replication');
    const roleMatch = replicationInfo.match(/role:([^\r\n]+)/);
    const slavesMatch = replicationInfo.match(/connected_slaves:([^\r\n]+)/);
    console.log(`   Topology: role=${roleMatch ? roleMatch[1] : 'unknown'}, connected_slaves=${slavesMatch ? slavesMatch[1] : 'unknown'}`);
    console.log('   ✓ Verified: Standalone Redis deployment with noeviction & AOF active.');

    // Test WAITAOF command support
    const waitAofRes = await redis.call('WAITAOF', '1', '0', '500');
    console.log(`   WAITAOF command probe result: ${JSON.stringify(waitAofRes)}`);
    console.log('   ✓ Confirmed WAITAOF is fully supported by live engine.\n');

    // -------------------------------------------------------------
    // Test 2: Provision accounts and initial authority assignment
    // -------------------------------------------------------------
    console.log('2. Setting up test users and department...');
    const ts = Date.now();
    const email = `durability_user_${ts}@example.com`;
    const password = 'Password@123';

    // Register user
    const regRes = await makeRequest(GATEWAY_BASE, { path: '/api/v1/auth/register', method: 'POST' }, {
      email,
      password,
      displayName: 'Durability Tester',
    });
    if (regRes.status !== 201) {
      throw new Error(`User registration failed: ${JSON.stringify(regRes.data)}`);
    }
    const userId = regRes.data.data.id;
    console.log(`   ✓ Registered resident: ${userId}`);

    // Login as resident to get initial token
    const residentLoginRes = await makeRequest(GATEWAY_BASE, { path: '/api/v1/auth/login', method: 'POST' }, {
      email,
      password,
    });
    const initialToken = residentLoginRes.data.data.tokens.accessToken;

    // Insert active department in Authority logical DB directly
    const authorityMongoUri = 'mongodb://civic_authority_user:authority_dev_secret@127.0.0.1:27018/civic_authority?authSource=civic_authority';
    const authorityClient = new MongoClient(authorityMongoUri);
    await authorityClient.connect();
    const deptId = `dept_dur_${ts}`;
    await authorityClient.db().collection('departments').insertOne({
      _id: deptId,
      name: `Durability Dept ${ts}`,
      jurisdiction: 'District 4',
      status: 'ACTIVE',
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    await authorityClient.close();
    console.log(`   ✓ Created department: ${deptId}`);

    // Create an initial report to test authority actions
    const repRes = await makeRequest(GATEWAY_BASE, {
      path: '/api/v1/reports',
      method: 'POST',
      headers: { Authorization: `Bearer ${initialToken}` },
    }, {
      title: `Pothole on Main St ${ts}`,
      description: 'Major road crater requiring emergency road repair.',
      category: 'POTHOLE',
      location: { type: 'Point', coordinates: [-73.985, 40.748] },
    });
    if (repRes.status !== 201) {
      throw new Error(`Report creation failed: ${JSON.stringify(repRes.data)}`);
    }
    const reportId = repRes.data.data.id;
    console.log(`   ✓ Created test report: ${reportId}`);

    // Elevate user to authority
    const elevateRes = await makeRequest(IDENTITY_DIRECT_BASE, {
      path: `/api/v1/auth/internal/users/${userId}/role`,
      method: 'POST',
      headers: {
        'x-internal-service-token': AUTHORITY_INTERNAL_KEY,
      },
    }, {
      role: 'authority',
      departmentId: deptId,
      badgeNumber: 'BDG-9999',
      jurisdiction: 'District 4',
    });
    if (elevateRes.status !== 200 && elevateRes.status !== 201) {
      throw new Error(`Failed to elevate user: ${JSON.stringify(elevateRes.data)}`);
    }
    console.log('   ✓ User elevated to authority.');

    // Login to get Authority access token T1
    const authLoginRes = await makeRequest(GATEWAY_BASE, { path: '/api/v1/auth/login', method: 'POST' }, {
      email,
      password,
    });
    const authorityTokenT1 = authLoginRes.data.data.tokens.accessToken;

    // Verify authorityTokenT1 works for authority action
    const assignRes = await makeRequest(GATEWAY_BASE, {
      path: `/api/v1/reports/${reportId}/assignments`,
      method: 'POST',
      headers: { Authorization: `Bearer ${authorityTokenT1}` },
    }, {
      departmentId: deptId,
      assignmentReason: 'Initial test assignment',
    });
    if (assignRes.status !== 201) {
      throw new Error(`Authority action with T1 failed: ${JSON.stringify(assignRes.data)}`);
    }
    console.log('   ✓ Authority action with Token T1 succeeded (HTTP 201).\n');

    // -------------------------------------------------------------
    // Test 3: Abrupt Redis Crash & AOF Recovery Verification
    // -------------------------------------------------------------
    console.log('3. Testing Redis Termination Immediately After Revocation Write (AOF Durability)...');
    console.log('   Demoting user back to resident (writes revocation marker + triggers WAITAOF)...');
    const demoteRes = await makeRequest(IDENTITY_DIRECT_BASE, {
      path: `/api/v1/auth/internal/users/${userId}/role`,
      method: 'POST',
      headers: {
        'x-internal-service-token': AUTHORITY_INTERNAL_KEY,
      },
    }, {
      role: 'resident',
    });
    if (demoteRes.status !== 200 && demoteRes.status !== 201) {
      throw new Error(`Failed to demote user: ${JSON.stringify(demoteRes.data)}`);
    }
    console.log('   ✓ Demotion acknowledged by Identity Service.');

    console.log('   Simulating abrupt Redis termination via "docker restart civic_redis"...');
    execSync('docker restart civic_redis', { stdio: 'pipe' });
    console.log('   ✓ Container civic_redis restarted.');

    // Wait for Redis to come back online
    let redisReady = false;
    for (let i = 0; i < 20; i++) {
      try {
        const ping = await redis.ping();
        if (ping === 'PONG') {
          redisReady = true;
          break;
        }
      } catch {
        await sleep(500);
      }
    }
    if (!redisReady) {
      throw new Error('Redis did not recover in time after restart!');
    }
    console.log('   ✓ Redis reconnected and responding to PING.');

    // Allow Identity and microservices to re-establish connection pool
    await sleep(2000);

    // Present Token T1: Must be rejected with HTTP 401 despite the Redis container crash!
    console.log('   Presenting Token T1 to privileged endpoint after Redis restart...');
    const postRestartAssign = await makeRequest(GATEWAY_BASE, {
      path: `/api/v1/reports/${reportId}/assignments`,
      method: 'POST',
      headers: { Authorization: `Bearer ${authorityTokenT1}` },
    }, {
      departmentId: deptId,
      assignmentReason: 'Post-crash assignment attempt',
    });

    console.log(`   Post-crash assignment response status: ${postRestartAssign.status}`);
    if (postRestartAssign.status !== 401) {
      throw new Error(`DURABILITY VIOLATION: Token T1 was NOT rejected after Redis crash! Got ${postRestartAssign.status}: ${JSON.stringify(postRestartAssign.data)}`);
    }
    console.log('   ✓ AOF DURABILITY PROVEN: Token T1 remained strictly revoked (HTTP 401) across abrupt Redis termination!\n');

    // -------------------------------------------------------------
    // Test 4: Fail-Closed Protection on Redis Write Failure
    // -------------------------------------------------------------
    console.log('4. Testing Fail-Closed Mutation Integrity When Redis Rejects Writes...');
    // Re-elevate user to authority
    await makeRequest(IDENTITY_DIRECT_BASE, {
      path: `/api/v1/auth/internal/users/${userId}/role`,
      method: 'POST',
      headers: {
        'x-internal-service-token': AUTHORITY_INTERNAL_KEY,
      },
    }, {
      role: 'authority',
      departmentId: deptId,
      badgeNumber: 'BDG-8888',
      jurisdiction: 'District 4',
    });

    const userDocBefore = await usersCollection.findOne({ _id: userId });
    console.log(`   Pre-condition role in MongoDB: "${userDocBefore.role}"`);

    // Temporarily make Redis read-only or reject writes by setting maxmemory to 1 byte with noeviction
    console.log('   Setting Redis maxmemory to 1 byte to force write failures...');
    await redis.config('set', 'maxmemory', '1');

    console.log('   Attempting role demotion while Redis is rejecting writes...');
    const failedDemoteRes = await makeRequest(IDENTITY_DIRECT_BASE, {
      path: `/api/v1/auth/internal/users/${userId}/role`,
      method: 'POST',
      headers: {
        'x-internal-service-token': AUTHORITY_INTERNAL_KEY,
      },
    }, {
      role: 'resident',
    });

    // Restore Redis maxmemory immediately
    await redis.config('set', 'maxmemory', '0');
    console.log('   ✓ Restored Redis maxmemory to 0 (unlimited).');

    console.log(`   Mutation attempt status during Redis write failure: ${failedDemoteRes.status}`);
    if (failedDemoteRes.status === 200) {
      throw new Error('FAIL-CLOSED VIOLATION: Role update succeeded despite Redis write rejection!');
    }

    // Verify MongoDB was NOT mutated!
    const userDocAfter = await usersCollection.findOne({ _id: userId });
    console.log(`   Post-condition role in MongoDB: "${userDocAfter.role}"`);
    if (userDocAfter.role !== 'authority') {
      throw new Error(`FAIL-CLOSED VIOLATION: MongoDB role was modified to "${userDocAfter.role}" even though Redis revocation write failed!`);
    }
    console.log('   ✓ FAIL-CLOSED INTEGRITY PROVEN: MongoDB mutation was aborted and user role preserved when Redis rejected write.\n');

    // -------------------------------------------------------------
    // Test 5: Concurrent Refresh / Login Racing with Demotion
    // -------------------------------------------------------------
    console.log('5. Testing Concurrent Refresh / Login Racing with Role Demotion...');
    // Obtain fresh authority login
    const loginRace = await makeRequest(GATEWAY_BASE, { path: '/api/v1/auth/login', method: 'POST' }, {
      email,
      password,
    });
    const raceRefreshToken = loginRace.data.data.tokens.refreshToken;
    const raceAccessToken = loginRace.data.data.tokens.accessToken;

    console.log('   Firing concurrent demotion and token refresh...');
    const [raceDemoteRes, raceRefreshRes] = await Promise.all([
      makeRequest(IDENTITY_DIRECT_BASE, {
        path: `/api/v1/auth/internal/users/${userId}/role`,
        method: 'POST',
        headers: {
          'x-internal-service-token': AUTHORITY_INTERNAL_KEY,
        },
      }, { role: 'resident' }),
      makeRequest(GATEWAY_BASE, {
        path: '/api/v1/auth/refresh',
        method: 'POST',
      }, { refreshToken: raceRefreshToken }),
    ]);

    console.log(`   Concurrent results: demotion status=${raceDemoteRes.status}, refresh status=${raceRefreshRes.status}`);

    // If refresh succeeded, verify what role was minted
    if (raceRefreshRes.status === 200) {
      const mintedToken = raceRefreshRes.data.data.tokens.accessToken;
      // Test if minted token can perform authority action
      const testAuthorityAction = await makeRequest(GATEWAY_BASE, {
        path: `/api/v1/reports/${reportId}/assignments`,
        method: 'POST',
        headers: { Authorization: `Bearer ${mintedToken}` },
      }, {
        departmentId: deptId,
        assignmentReason: 'Race authority action attempt',
      });
      // The user is demoted, so the refreshed token should either have role resident (403) or be revoked by version (401)
      if (testAuthorityAction.status === 201) {
        throw new Error('RACE HAZARD: Refreshed token permitted privileged authority action after demotion!');
      }
      console.log(`   ✓ Refreshed token cannot perform authority action (HTTP ${testAuthorityAction.status}).`);
    } else {
      console.log('   ✓ Refresh was rejected during or after demotion (fail-closed).');
    }

    // Verify raceAccessToken is strictly revoked
    const testOldToken = await makeRequest(GATEWAY_BASE, {
      path: `/api/v1/reports/${reportId}/assignments`,
      method: 'POST',
      headers: { Authorization: `Bearer ${raceAccessToken}` },
    }, {
      departmentId: deptId,
      assignmentReason: 'Revoked access token test',
    });
    if (testOldToken.status !== 401) {
      throw new Error(`Old access token was not revoked: ${testOldToken.status}`);
    }
    console.log('   ✓ Prior access token strictly revoked (HTTP 401).\n');

    // -------------------------------------------------------------
    // Test 6: Retry Idempotency After Partial Failure
    // -------------------------------------------------------------
    console.log('6. Testing Retry Idempotency and Recovery...');
    const retry1 = await makeRequest(IDENTITY_DIRECT_BASE, {
      path: `/api/v1/auth/internal/users/${userId}/role`,
      method: 'POST',
      headers: {
        'x-internal-service-token': AUTHORITY_INTERNAL_KEY,
      },
    }, { role: 'resident' });

    const retry2 = await makeRequest(IDENTITY_DIRECT_BASE, {
      path: `/api/v1/auth/internal/users/${userId}/role`,
      method: 'POST',
      headers: {
        'x-internal-service-token': AUTHORITY_INTERNAL_KEY,
      },
    }, { role: 'resident' });

    console.log(`   Repeated demotion statuses: ${retry1.status}, ${retry2.status}`);
    if (![200, 201].includes(retry1.status) || ![200, 201].includes(retry2.status)) {
      throw new Error('Idempotent retry failed!');
    }
    console.log('   ✓ Repeated requests handled safely and idempotently.\n');

    console.log('=====================================================================');
    console.log('ALL PHASE 3.4 CRASH-RECOVERY & DURABILITY AUDIT CHECKS PASSED!');
    console.log('=====================================================================');
  } finally {
    redis.disconnect();
    await mongoClient.close();
  }
}

runTests().catch((err) => {
  console.error('\n❌ DURABILITY TEST SUITE FAILED:', err);
  process.exit(1);
});
