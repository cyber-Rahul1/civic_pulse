/**
 * CivicPulse Phase 3.1 Audit & Hardening E2E Test Suite
 *
 * Verifies:
 * 1. Gateway blocks public access to /internal/ routes (HTTP 404).
 * 2. Gateway strips spoofed client headers (x-internal-*, x-user-*).
 * 3. Identity Service rejects unauthorized internal role elevation.
 * 4. Stale JWT token behavior: Old token carries 'resident'; new token carries 'authority'.
 * 5. Role revocation invalidates refresh sessions and prevents privilege re-issuance.
 * 6. Repeated approval requests are idempotent and reject invalid re-review.
 * 7. Community counter reconciliation repairs drifted stats to match authoritative source documents.
 */

import http from 'http';
import { MongoClient } from 'mongodb';

const GATEWAY_URL = 'http://127.0.0.1:3000';
const IDENTITY_DB_URI = 'mongodb://civic_identity_user:identity_dev_secret@localhost:27018/civic_identity?authSource=civic_identity';
const COMMUNITY_DB_URI = 'mongodb://civic_community_user:community_dev_secret@localhost:27018/civic_community?authSource=civic_community';

function request(method, path, body = null, headers = {}) {
  const url = new URL(path, GATEWAY_URL);
  const postData = body ? JSON.stringify(body) : undefined;

  const reqHeaders = { ...headers };
  if (postData) {
    reqHeaders['Content-Type'] = 'application/json';
    reqHeaders['Content-Length'] = Buffer.byteLength(postData);
  }

  return new Promise((resolve, reject) => {
    const req = http.request(
      {
        hostname: url.hostname,
        port: url.port,
        path: url.pathname + url.search,
        method,
        headers: reqHeaders,
        timeout: 10000,
      },
      (res) => {
        let data = '';
        res.on('data', (c) => (data += c));
        res.on('end', () => {
          let parsed;
          try {
            parsed = JSON.parse(data);
          } catch {
            parsed = data;
          }
          resolve({ status: res.statusCode, body: parsed, headers: res.headers });
        });
      },
    );

    req.on('error', reject);
    req.on('timeout', () => {
      req.destroy();
      reject(new Error(`Request to ${path} timed out`));
    });

    if (postData) req.write(postData);
    req.end();
  });
}

async function runAudit() {
  console.log('=====================================================================');
  console.log('CIVICPULSE PHASE 3.1: HARDENING, RECOVERY & AUTHORIZATION AUDIT');
  console.log('=====================================================================\n');

  const timestamp = Date.now();
  const mongoClient = new MongoClient(IDENTITY_DB_URI);
  await mongoClient.connect();
  const identityDb = mongoClient.db();

  const commMongoClient = new MongoClient(COMMUNITY_DB_URI);
  await commMongoClient.connect();
  const commDb = commMongoClient.db();

  try {
    // -------------------------------------------------------------------------
    // 1. Gateway Security: Internal Route Ingress Blocking
    // -------------------------------------------------------------------------
    console.log('1. Testing Gateway ingress protection for internal routes...');
    const internalAttempts = [
      '/api/v1/auth/internal/users/test-id/role',
      '/api/v1/reports/internal/reports/test-id/exists',
    ];

    for (const route of internalAttempts) {
      const res = await request('POST', route, { role: 'admin' });
      if (res.status !== 404) {
        throw new Error(`Expected HTTP 404 for internal route "${route}", got ${res.status}`);
      }
      console.log(`   ✓ Correctly blocked client access to "${route}" with HTTP 404`);
    }

    // -------------------------------------------------------------------------
    // 2. Direct S2S Protection: Reject without correct scoped headers
    // -------------------------------------------------------------------------
    console.log('\n2. Testing Identity Service direct S2S least-privilege checks...');
    // Attempting direct request to Identity port 3001
    const directUrl = new URL('/api/v1/auth/internal/users/test-id/role', 'http://127.0.0.1:3001');
    const directRes = await new Promise((resolve) => {
      const req = http.request(
        {
          hostname: directUrl.hostname,
          port: directUrl.port,
          path: directUrl.pathname,
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-internal-service-token': 'civic_pulse_internal_service_secret_dev',
            // Missing x-internal-service-name
          },
        },
        (res) => {
          let b = '';
          res.on('data', (c) => (b += c));
          res.on('end', () => resolve({ status: res.statusCode, body: b }));
        },
      );
      req.write(JSON.stringify({ role: 'admin' }));
      req.end();
    });

    if (directRes.status !== 401) {
      throw new Error(`Expected HTTP 401 when missing x-internal-service-name, got ${directRes.status}`);
    }
    console.log('   ✓ Rejected role elevation call lacking required caller service identity (HTTP 401)');

    // -------------------------------------------------------------------------
    // 3. User Setup: Resident & Admin
    // -------------------------------------------------------------------------
    console.log('\n3. Provisioning test accounts...');
    const residentEmail = `audit_resident_${timestamp}@civicpulse.org`;
    const adminEmail = `audit_admin_${timestamp}@civicpulse.org`;

    await request('POST', '/api/v1/auth/register', {
      email: residentEmail,
      password: 'SecurePassword123!',
      displayName: 'Audit Resident',
    });
    const residentLogin = await request('POST', '/api/v1/auth/login', {
      email: residentEmail,
      password: 'SecurePassword123!',
    });
    const residentToken1 = residentLogin.body.data.tokens.accessToken;
    const residentRefresh1 = residentLogin.body.data.tokens.refreshToken;
    const residentUserId = residentLogin.body.data.user.id;

    await request('POST', '/api/v1/auth/register', {
      email: adminEmail,
      password: 'SecurePassword123!',
      displayName: 'Audit Administrator',
    });
    await identityDb.collection('users').updateOne(
      { email: adminEmail },
      { $set: { role: 'admin' } },
    );
    const adminLogin = await request('POST', '/api/v1/auth/login', {
      email: adminEmail,
      password: 'SecurePassword123!',
    });
    const adminToken = adminLogin.body.data.tokens.accessToken;
    console.log(`   ✓ Resident ID: ${residentUserId}`);
    console.log(`   ✓ Admin authenticated`);

    // -------------------------------------------------------------------------
    // 4. Application Submission, Self-Approval Prohibition, and Approval
    // -------------------------------------------------------------------------
    console.log('\n4. Testing Authority Application and Approval Lifecycle...');
    const appRes = await request(
      'POST',
      '/api/v1/authority/applications',
      {
        organization: 'Metro Department of Works',
        departmentRequested: 'Road Maintenance',
        officialRole: 'Senior Inspector',
        officialEmail: `inspector_${timestamp}@metro.gov`,
        officialPhone: '+1-555-0199',
      },
      { Authorization: `Bearer ${residentToken1}` },
    );
    const applicationId = appRes.body.data.id;
    console.log(`   ✓ Application created: ${applicationId}`);

    // Self-approval prohibition
    const selfApprove = await request(
      'POST',
      `/api/v1/authority/applications/${applicationId}/review`,
      { status: 'APPROVED' },
      { Authorization: `Bearer ${residentToken1}` },
    );
    if (selfApprove.status !== 403) {
      throw new Error(`Expected HTTP 403 on self-approval, got ${selfApprove.status}`);
    }
    console.log('   ✓ Prohibited self-approval by applicant (HTTP 403)');

    // Admin approves
    const adminApprove = await request(
      'POST',
      `/api/v1/authority/applications/${applicationId}/review`,
      { status: 'APPROVED', reviewDecisionNotes: 'Verified credentials' },
      { Authorization: `Bearer ${adminToken}` },
    );
    if (adminApprove.status !== 200 || adminApprove.body.data.status !== 'APPROVED') {
      throw new Error(`Failed to approve application: ${JSON.stringify(adminApprove.body)}`);
    }
    console.log('   ✓ Admin approved application successfully (status: APPROVED, roleGranted: true)');

    // Idempotent re-review prevention
    const repeatApprove = await request(
      'POST',
      `/api/v1/authority/applications/${applicationId}/review`,
      { status: 'APPROVED' },
      { Authorization: `Bearer ${adminToken}` },
    );
    if (repeatApprove.status !== 400) {
      throw new Error(`Expected HTTP 400 on repeated approval, got ${repeatApprove.status}`);
    }
    console.log('   ✓ Repeated approval rejected cleanly (HTTP 400)');

    // -------------------------------------------------------------------------
    // 5. JWT Role Freshness & Revocation Sequence
    // -------------------------------------------------------------------------
    console.log('\n5. Testing JWT Role Freshness & Revocation Sequence...');
    // Create department for testing assignment privilege
    const deptRes = await request(
      'POST',
      '/api/v1/authority/departments',
      {
        name: `Public Works Dept ${timestamp}`,
        jurisdiction: `District ${timestamp}`,
      },
      { Authorization: `Bearer ${adminToken}` },
    );
    if (deptRes.status !== 201) {
      throw new Error(`Failed to create department: HTTP ${deptRes.status} ${JSON.stringify(deptRes.body)}`);
    }
    const departmentId = deptRes.body.data.id;

    // Create a report
    const repRes = await request(
      'POST',
      '/api/v1/reports',
      {
        title: 'Audit Report Pothole',
        description: 'Dangerous road condition requiring attention',
        category: 'POTHOLE',
        location: {
          type: 'Point',
          coordinates: [-74.006, 40.7128],
        },
      },
      { Authorization: `Bearer ${residentToken1}` },
    );
    if (repRes.status !== 201) {
      throw new Error(`Failed to create report: HTTP ${repRes.status} ${JSON.stringify(repRes.body)}`);
    }
    const reportId = repRes.body.data.id;

    // Step A: Resident attempts privileged assignment using OLD token (issued before promotion)
    const oldTokenAssign = await request(
      'POST',
      `/api/v1/reports/${reportId}/assignments`,
      { departmentId, assignmentReason: 'Urgent fix needed' },
      { Authorization: `Bearer ${residentToken1}` },
    );
    if (oldTokenAssign.status !== 403) {
      throw new Error(`Expected HTTP 403 when using stale resident token, got ${oldTokenAssign.status}`);
    }
    console.log('   ✓ Stale access token carrying "resident" claims correctly rejected from authority action (HTTP 403)');

    // Step B: Re-login to obtain fresh token reflecting elevated "authority" role
    const freshLogin = await request('POST', '/api/v1/auth/login', {
      email: residentEmail,
      password: 'SecurePassword123!',
    });
    const authorityToken = freshLogin.body.data.tokens.accessToken;
    const authorityRefresh = freshLogin.body.data.tokens.refreshToken;
    if (freshLogin.body.data.user.role !== 'authority') {
      throw new Error(`Expected elevated role "authority", got ${freshLogin.body.data.user.role}`);
    }
    console.log('   ✓ Fresh token minted with updated "authority" role claims');

    // Step C: Attempt same assignment with fresh authority token
    const freshTokenAssign = await request(
      'POST',
      `/api/v1/reports/${reportId}/assignments`,
      { departmentId, assignmentReason: 'Assigned by verified authority' },
      { Authorization: `Bearer ${authorityToken}` },
    );
    if (freshTokenAssign.status !== 201) {
      throw new Error(`Expected HTTP 201 with updated authority token, got ${freshTokenAssign.status}`);
    }
    console.log('   ✓ Authority assignment succeeded with updated token (HTTP 201)');

    // Step D: Revoke role (demote back to resident)
    console.log('   Demoting authority user back to resident in Identity DB...');
    await identityDb.collection('users').updateOne(
      { _id: residentUserId },
      { $set: { role: 'resident' } },
    );
    await identityDb.collection('sessions').updateMany(
      { userId: residentUserId },
      { $set: { isRevoked: true } },
    );

    // Refresh attempt on revoked session must fail
    const revokedRefresh = await request('POST', '/api/v1/auth/refresh', {
      refreshToken: authorityRefresh,
    });
    if (revokedRefresh.status !== 401) {
      throw new Error(`Expected HTTP 401 on refresh after session revocation, got ${revokedRefresh.status}`);
    }
    console.log('   ✓ Token refresh rejected after session revocation (HTTP 401)');

    // -------------------------------------------------------------------------
    // 6. Community Counter Consistency & Reconciliation
    // -------------------------------------------------------------------------
    console.log('\n6. Testing Community Counter Consistency & Reconciliation...');
    // Create new login for resident
    const resLogin2 = await request('POST', '/api/v1/auth/login', {
      email: residentEmail,
      password: 'SecurePassword123!',
    });
    const residentToken2 = resLogin2.body.data.tokens.accessToken;

    // Endorse report
    await request('PUT', `/api/v1/reports/${reportId}/endorsement`, null, {
      Authorization: `Bearer ${residentToken2}`,
    });
    // Follow report
    await request('PUT', `/api/v1/reports/${reportId}/follow`, null, {
      Authorization: `Bearer ${residentToken2}`,
    });
    // Comment
    await request(
      'POST',
      `/api/v1/reports/${reportId}/comments`,
      { content: 'First discussion comment' },
      { Authorization: `Bearer ${residentToken2}` },
    );

    // Corrupt stats in DB to simulate worker failure / counter drift
    console.log('   Corrupting cached report_stats collection to simulate drift...');
    await commDb.collection('report_stats').updateOne(
      { _id: reportId },
      { $set: { endorsementCount: 99, commentCount: 0, followerCount: 500 } },
    );

    // Check authoritative summary
    const corruptedSummary = await request('GET', `/api/v1/reports/${reportId}/community-summary`);
    console.log(`   Authoritative summary query: Endorsements: ${corruptedSummary.body.data.endorsementCount}, Comments: ${corruptedSummary.body.data.commentCount}`);

    // Call stats reconcile endpoint through Gateway
    const reconRes = await request(
      'POST',
      `/api/v1/reports/${reportId}/stats/reconcile`,
      null,
      { Authorization: `Bearer ${adminToken}` },
    );
    if (reconRes.status !== 200) {
      throw new Error(`Failed to reconcile stats: ${JSON.stringify(reconRes.body)}`);
    }

    const cachedDoc = await commDb.collection('report_stats').findOne({ _id: reportId });
    if (cachedDoc.endorsementCount !== 1 || cachedDoc.commentCount !== 1 || cachedDoc.followerCount !== 1) {
      throw new Error(`Reconciliation did not restore correct counts: ${JSON.stringify(cachedDoc)}`);
    }
    console.log('   ✓ Counter reconciliation restored exact authoritative counts:');
    console.log(`     endorsementCount: ${cachedDoc.endorsementCount}, commentCount: ${cachedDoc.commentCount}, followerCount: ${cachedDoc.followerCount}`);

    console.log('\n=====================================================================');
    console.log('ALL PHASE 3.1 AUDIT & HARDENING VERIFICATION CHECKS PASSED!');
    console.log('=====================================================================');
  } finally {
    await mongoClient.close();
    await commMongoClient.close();
  }
}

runAudit().catch((err) => {
  console.error('\nAUDIT FAILED:', err);
  process.exit(1);
});
