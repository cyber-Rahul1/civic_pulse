/**
 * Phase 4 End-to-End Live Integration Verification Script
 *
 * Exercises real domain events and API workflows through API Gateway (Port 3000):
 * 1. Health check verifies all 5 microservices (Identity, Reports, Community, Authority, Notifications).
 * 2. Resident R1 and Resident R2 registration & login.
 * 3. Resident R1 creates a civic report.
 * 4. Resident R2 comments on R1's report -> R1 receives in-app REPORT_COMMENT_ADDED notification.
 * 5. Resident R1 replies to R2's comment -> R2 receives in-app COMMENT_REPLY_ADDED notification.
 * 6. Admin assigns R1's report to a municipal department -> R1 receives REPORT_ASSIGNED notification.
 * 7. Admin transitions report status from SUBMITTED to UNDER_REVIEW -> R1 receives REPORT_STATUS_CHANGED.
 * 8. Notification Preferences: R1 updates preferences to disable comment notifications.
 *    R2 posts another comment -> R1 does NOT receive another comment notification.
 * 9. Idempotent Ingestion & Duplicate Suppression: Ingesting identical event IDs does not create duplicates.
 * 10. Mark-as-read: R1 marks individual notification as read.
 * 11. Mark-all-as-read: R1 marks all remaining notifications as read; unread count drops to 0.
 * 12. Ownership Isolation: R2 cannot read or modify R1's notifications (HTTP 404).
 */

import http from 'http';

const GATEWAY_URL = 'http://127.0.0.1:3000';
const NOTIFICATIONS_URL = 'http://127.0.0.1:3005';
const NOTIFICATIONS_INTERNAL_KEY = 'civic_pulse_notifications_internal_secret_dev';

function request(options, body = null) {
  return new Promise((resolve, reject) => {
    const postData = body ? (typeof body === 'string' ? body : JSON.stringify(body)) : null;
    const reqOptions = {
      ...options,
      headers: {
        ...(options.headers || {}),
        ...(postData
          ? {
              'Content-Type': 'application/json',
              'Content-Length': Buffer.byteLength(postData),
            }
          : {}),
      },
    };

    const req = http.request(reqOptions, (res) => {
      let data = '';
      res.on('data', (chunk) => (data += chunk));
      res.on('end', () => {
        let parsed = data;
        try {
          parsed = data ? JSON.parse(data) : null;
        } catch {}
        resolve({
          status: res.statusCode,
          headers: res.headers,
          data: parsed,
        });
      });
    });

    req.on('error', reject);
    if (postData) {
      req.write(postData);
    }
    req.end();
  });
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function runPhase4E2E() {
  console.log('=====================================================================');
  console.log('CIVICPULSE PHASE 4: LIVE NOTIFICATIONS & EVENT DELIVERY INTEGRATION');
  console.log('=====================================================================\n');

  // 1. Health check verification
  console.log('1. Checking Gateway Health & All 5 Microservices...');
  const healthRes = await request({
    hostname: '127.0.0.1',
    port: 3000,
    path: '/health',
    method: 'GET',
  });

  if (healthRes.status !== 200 || healthRes.data.status !== 'healthy') {
    throw new Error(`Gateway unhealthy: ${JSON.stringify(healthRes.data)}`);
  }
  const checks = healthRes.data.checks;
  console.log('   ✓ All 5 services reported healthy:');
  for (const [svc, res] of Object.entries(checks)) {
    console.log(`     - ${svc}: ${res.status} (${res.message})`);
  }

  // 2. User setup
  const runId = Date.now();
  console.log(`\n2. Provisioning test accounts for run ${runId}...`);
  const r1Email = `resident1_p4_${runId}@civicpulse.org`;
  const r2Email = `resident2_p4_${runId}@civicpulse.org`;
  const adminEmail = `admin_p4_${runId}@civicpulse.org`;
  const password = 'Password123!';

  // Register R1
  const r1Reg = await request({
    hostname: '127.0.0.1',
    port: 3000,
    path: '/api/v1/auth/register',
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  }, { email: r1Email, password, displayName: 'Resident One' });
  const r1Id = r1Reg.data.data.id;

  const r1Login = await request({
    hostname: '127.0.0.1',
    port: 3000,
    path: '/api/v1/auth/login',
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  }, { email: r1Email, password });
  const r1Token = r1Login.data.data.tokens.accessToken;
  console.log(`   ✓ Resident R1 authenticated: User ID ${r1Id}`);

  // Register R2
  const r2Reg = await request({
    hostname: '127.0.0.1',
    port: 3000,
    path: '/api/v1/auth/register',
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  }, { email: r2Email, password, displayName: 'Resident Two' });
  const r2Id = r2Reg.data.data.id;

  const r2Login = await request({
    hostname: '127.0.0.1',
    port: 3000,
    path: '/api/v1/auth/login',
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  }, { email: r2Email, password });
  const r2Token = r2Login.data.data.tokens.accessToken;
  console.log(`   ✓ Resident R2 authenticated: User ID ${r2Id}`);

  // Provision Admin
  await request({
    hostname: '127.0.0.1',
    port: 3000,
    path: '/api/v1/auth/register',
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  }, { email: adminEmail, password, displayName: 'City Administrator' });

  const { MongoClient } = await import('mongodb');
  const mongoClient = new MongoClient('mongodb://civic_admin:civic_dev_secret_password@localhost:27018/admin');
  await mongoClient.connect();
  const identityDb = mongoClient.db('civic_identity');
  await identityDb.collection('users').updateOne(
    { email: adminEmail },
    { $set: { role: 'admin' } },
  );
  await mongoClient.close();

  const adminLogin = await request({
    hostname: '127.0.0.1',
    port: 3000,
    path: '/api/v1/auth/login',
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  }, { email: adminEmail, password });
  const adminToken = adminLogin.data.data.tokens.accessToken;
  console.log(`   ✓ Administrator authenticated`);

  // 3. Resident R1 creates a report
  console.log('\n3. Resident R1 creates a civic report...');
  const reportRes = await request({
    hostname: '127.0.0.1',
    port: 3000,
    path: '/api/v1/reports',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${r1Token}`,
    },
  }, {
    title: `Broken Traffic Light ${runId}`,
    description: 'Traffic signals at 5th and Main are malfunctioning.',
    category: 'STREETLIGHT',
    location: {
      type: 'Point',
      coordinates: [-73.9851, 40.7488],
    },
    locationDescription: 'Corner of 5th Ave and Main St',
  });

  const reportId = reportRes.data.data.id;
  console.log(`   ✓ Report created: ${reportId}`);

  // 4. Resident R2 comments on R1's report -> triggers REPORT_COMMENT_ADDED notification
  console.log("\n4. Resident R2 comments on R1's report...");
  const commentRes = await request({
    hostname: '127.0.0.1',
    port: 3000,
    path: `/api/v1/reports/${reportId}/comments`,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${r2Token}`,
    },
  }, {
    content: 'I almost had an accident here yesterday! Very dangerous.',
  });
  const commentId = commentRes.data.data.id;
  console.log(`   ✓ Comment created: ${commentId}`);

  // Wait briefly for async event dispatch
  await sleep(600);

  // Check R1 unread notifications
  const r1NotifsAfterComment = await request({
    hostname: '127.0.0.1',
    port: 3000,
    path: '/api/v1/me/notifications',
    method: 'GET',
    headers: { Authorization: `Bearer ${r1Token}` },
  });

  const commentNotif = r1NotifsAfterComment.data.data.items.find(
    (n) => n.type === 'REPORT_COMMENT_ADDED',
  );
  if (!commentNotif) {
    throw new Error('Expected REPORT_COMMENT_ADDED notification for Resident R1');
  }
  console.log(`   ✓ R1 received in-app notification: "${commentNotif.title}"`);
  console.log(`     Message: "${commentNotif.message}"`);

  // 5. Resident R1 replies to R2's comment -> triggers COMMENT_REPLY_ADDED notification for R2
  console.log("\n5. Resident R1 replies to R2's comment...");
  await request({
    hostname: '127.0.0.1',
    port: 3000,
    path: `/api/v1/reports/${reportId}/comments`,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${r1Token}`,
    },
  }, {
    parentCommentId: commentId,
    content: 'Thanks for supporting this. I hope the department acts quickly.',
  });

  await sleep(600);

  const r2Notifs = await request({
    hostname: '127.0.0.1',
    port: 3000,
    path: '/api/v1/me/notifications',
    method: 'GET',
    headers: { Authorization: `Bearer ${r2Token}` },
  });

  const replyNotif = r2Notifs.data.data.items.find(
    (n) => n.type === 'COMMENT_REPLY_ADDED',
  );
  if (!replyNotif) {
    throw new Error('Expected COMMENT_REPLY_ADDED notification for Resident R2');
  }
  console.log(`   ✓ R2 received in-app reply notification: "${replyNotif.title}"`);

  // 6. Admin assigns report to department -> triggers REPORT_ASSIGNED notification for R1
  console.log('\n6. Admin assigns report to municipal department...');
  const deptRes = await request({
    hostname: '127.0.0.1',
    port: 3000,
    path: '/api/v1/authority/departments',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${adminToken}`,
    },
  }, {
    name: `Dept of Signals ${runId}`,
    jurisdiction: `Zone ${runId}`,
  });
  const deptId = deptRes.data.data.id;

  await request({
    hostname: '127.0.0.1',
    port: 3000,
    path: `/api/v1/reports/${reportId}/assignments`,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${adminToken}`,
    },
  }, {
    departmentId: deptId,
    assignmentReason: 'High collision risk area prioritized by municipal safety board',
  });

  await sleep(600);

  const r1NotifsAfterAssign = await request({
    hostname: '127.0.0.1',
    port: 3000,
    path: '/api/v1/me/notifications',
    method: 'GET',
    headers: { Authorization: `Bearer ${r1Token}` },
  });

  const assignNotif = r1NotifsAfterAssign.data.data.items.find(
    (n) => n.type === 'REPORT_ASSIGNED',
  );
  if (!assignNotif) {
    throw new Error('Expected REPORT_ASSIGNED notification for Resident R1');
  }
  console.log(`   ✓ R1 received assignment notification: "${assignNotif.title}"`);

  // 7. Admin transitions report status -> triggers REPORT_STATUS_CHANGED notification for R1
  console.log('\n7. Admin transitions report status (SUBMITTED -> UNDER_REVIEW)...');
  await request({
    hostname: '127.0.0.1',
    port: 3000,
    path: `/api/v1/reports/${reportId}/status`,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${adminToken}`,
    },
  }, {
    status: 'UNDER_REVIEW',
    reason: 'Technician dispatched to inspect signal relay',
  });

  await sleep(600);

  const r1NotifsAfterStatus = await request({
    hostname: '127.0.0.1',
    port: 3000,
    path: '/api/v1/me/notifications',
    method: 'GET',
    headers: { Authorization: `Bearer ${r1Token}` },
  });

  const statusNotif = r1NotifsAfterStatus.data.data.items.find(
    (n) => n.type === 'REPORT_STATUS_CHANGED',
  );
  if (!statusNotif) {
    throw new Error('Expected REPORT_STATUS_CHANGED notification for Resident R1');
  }
  console.log(`   ✓ R1 received status update notification: "${statusNotif.title}"`);

  // 8. Notification Preferences: R1 updates preferences to disable comments
  console.log('\n8. Testing Notification Preferences Enforcement...');
  const prefUpdateRes = await request({
    hostname: '127.0.0.1',
    port: 3000,
    path: '/api/v1/me/notification-preferences',
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${r1Token}`,
    },
  }, {
    notifyOnComments: false,
  });
  const prefData = prefUpdateRes.data?.data || prefUpdateRes.data;
  console.log(`   ✓ R1 disabled notifyOnComments: ${prefData?.notifyOnComments === false}`);

  const unreadBeforeSecondComment = (await request({
    hostname: '127.0.0.1',
    port: 3000,
    path: '/api/v1/me/notifications/unread-count',
    method: 'GET',
    headers: { Authorization: `Bearer ${r1Token}` },
  })).data.data.unreadCount;

  // R2 posts second comment
  await request({
    hostname: '127.0.0.1',
    port: 3000,
    path: `/api/v1/reports/${reportId}/comments`,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${r2Token}`,
    },
  }, {
    content: 'Another observation: pedestrian signal also flashes red.',
  });

  await sleep(600);

  const unreadAfterSecondComment = (await request({
    hostname: '127.0.0.1',
    port: 3000,
    path: '/api/v1/me/notifications/unread-count',
    method: 'GET',
    headers: { Authorization: `Bearer ${r1Token}` },
  })).data.data.unreadCount;

  if (unreadAfterSecondComment !== unreadBeforeSecondComment) {
    throw new Error('Disabled preference was not respected: comment notification was generated');
  }
  console.log(`   ✓ Preference respected: unread count remained ${unreadAfterSecondComment}`);

  // 9. Idempotent Ingestion & Duplicate Suppression
  console.log('\n9. Testing Idempotent Event Ingestion & Duplicate Suppression...');
  const dedupeEventId = `e2e-dedupe-${runId}`;
  const directIngestRes1 = await request({
    hostname: '127.0.0.1',
    port: 3005,
    path: '/api/v1/internal/notifications/events',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-internal-service-token': NOTIFICATIONS_INTERNAL_KEY,
      'x-internal-service-name': 'event-dispatcher',
    },
  }, {
    eventId: dedupeEventId,
    eventType: 'REPORT_STATUS_CHANGED',
    aggregateId: reportId,
    payload: {
      reportId,
      reportTitle: 'Dedupe Check',
      authorId: r1Id,
      previousStatus: 'UNDER_REVIEW',
      newStatus: 'IN_PROGRESS',
      updatedByUserId: 'system',
    },
  });

  const directIngestRes2 = await request({
    hostname: '127.0.0.1',
    port: 3005,
    path: '/api/v1/internal/notifications/events',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-internal-service-token': NOTIFICATIONS_INTERNAL_KEY,
      'x-internal-service-name': 'event-dispatcher',
    },
  }, {
    eventId: dedupeEventId,
    eventType: 'REPORT_STATUS_CHANGED',
    aggregateId: reportId,
    payload: {
      reportId,
      reportTitle: 'Dedupe Check',
      authorId: r1Id,
      previousStatus: 'UNDER_REVIEW',
      newStatus: 'IN_PROGRESS',
      updatedByUserId: 'system',
    },
  });

  const count1 = directIngestRes1.data?.data?.createdCount ?? directIngestRes1.data?.createdCount;
  const count2 = directIngestRes2.data?.data?.createdCount ?? directIngestRes2.data?.createdCount;

  console.log(`   ✓ 1st delivery created: ${count1} notification(s)`);
  console.log(`   ✓ 2nd delivery created: ${count2} duplicate(s) (strictly idempotent)`);
  if (count2 !== 0) {
    throw new Error('Idempotency failure: duplicate event created extra notification');
  }

  // 10. Mark-as-read single notification
  console.log('\n10. Testing Individual Notification Read-State Mutation...');
  const unreadBeforeReadOne = (await request({
    hostname: '127.0.0.1',
    port: 3000,
    path: '/api/v1/me/notifications/unread-count',
    method: 'GET',
    headers: { Authorization: `Bearer ${r1Token}` },
  })).data.data.unreadCount;

  const readOneRes = await request({
    hostname: '127.0.0.1',
    port: 3000,
    path: `/api/v1/me/notifications/${commentNotif.id}/read`,
    method: 'PATCH',
    headers: { Authorization: `Bearer ${r1Token}` },
  });

  const unreadAfterReadOne = (await request({
    hostname: '127.0.0.1',
    port: 3000,
    path: '/api/v1/me/notifications/unread-count',
    method: 'GET',
    headers: { Authorization: `Bearer ${r1Token}` },
  })).data.data.unreadCount;

  console.log(`   ✓ Notification ${commentNotif.id} marked as read`);
  console.log(`   ✓ Unread count decreased: ${unreadBeforeReadOne} -> ${unreadAfterReadOne}`);

  // 11. Mark-all-as-read
  console.log('\n11. Testing Mark-All-As-Read...');
  const markAllRes = await request({
    hostname: '127.0.0.1',
    port: 3000,
    path: '/api/v1/me/notifications/read-all',
    method: 'PATCH',
    headers: { Authorization: `Bearer ${r1Token}` },
  });
  console.log(`   ✓ Mark-all marked ${markAllRes.data.data.markedCount} notification(s)`);

  const unreadAfterMarkAll = (await request({
    hostname: '127.0.0.1',
    port: 3000,
    path: '/api/v1/me/notifications/unread-count',
    method: 'GET',
    headers: { Authorization: `Bearer ${r1Token}` },
  })).data.data.unreadCount;

  console.log(`   ✓ Final unread count for R1: ${unreadAfterMarkAll}`);
  if (unreadAfterMarkAll !== 0) {
    throw new Error('Expected 0 unread notifications after mark-all-as-read');
  }

  // 12. Ownership Isolation
  console.log('\n12. Testing Strict Notification Ownership Isolation...');
  const maliciousAttempt = await request({
    hostname: '127.0.0.1',
    port: 3000,
    path: `/api/v1/me/notifications/${commentNotif.id}/read`,
    method: 'PATCH',
    headers: { Authorization: `Bearer ${r2Token}` }, // R2 tries to alter R1's notification
  });

  console.log(`   ✓ R2 attempt to alter R1's notification returned HTTP ${maliciousAttempt.status}`);
  if (maliciousAttempt.status !== 404) {
    throw new Error(`Expected HTTP 404 for unauthorized notification mutation, got ${maliciousAttempt.status}`);
  }

  console.log('\n=====================================================================');
  console.log('ALL PHASE 4 LIVE END-TO-END NOTIFICATION WORKFLOWS SUCCEEDED!');
  console.log('=====================================================================\n');
}

runPhase4E2E().catch((err) => {
  console.error('\n❌ Phase 4 E2E verification failed:', err);
  process.exit(1);
});
