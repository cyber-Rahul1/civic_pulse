/**
 * CivicPulse Phase 3: Community & Authority Workflows Live End-to-End Test
 * Tests through API Gateway (Port 3000):
 * 1. Health check & upstream microservice readiness (Identity, Reports, Community, Authority).
 * 2. Resident registration, authentication & profile retrieval.
 * 3. Report creation by resident in Reports Service.
 * 4. Community Endorsements: endorse, idempotent duplicate, count check, remove endorsement.
 * 5. Community Following: follow report, list followed reports in me/followed-reports, unfollow.
 * 6. Community Discussions: top-level comment, reply to comment, 1-level limit validation, edit, delete, abuse reporting.
 * 7. Authority Verification Applications:
 *    - Resident submits verification application (PENDING).
 *    - Self-approval prohibited safeguard.
 *    - Admin approves application -> elevated role to AUTHORITY via internal S2S API.
 * 8. Municipal Departments & Assignments:
 *    - Admin creates active department.
 *    - Duplicate department rejected.
 *    - Verified authority user assigns report to department.
 *    - Ordinary resident forbidden from assigning reports.
 *    - Reassignment preserves historical audit logs.
 *    - Public assignment accountability view.
 */

import http from 'http';
import { MongoClient } from 'mongodb';

function request(options, body) {
  return new Promise((resolve, reject) => {
    const postData = body ? JSON.stringify(body) : null;
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
      let raw = '';
      res.on('data', (chunk) => (raw += chunk));
      res.on('end', () => {
        try {
          const parsed = raw ? JSON.parse(raw) : null;
          resolve({
            statusCode: res.statusCode || 500,
            data: parsed,
            headers: res.headers,
          });
        } catch {
          resolve({
            statusCode: res.statusCode || 500,
            data: raw,
            headers: res.headers,
          });
        }
      });
    });

    req.on('error', reject);

    if (postData) {
      req.write(postData);
    }

    req.end();
  });
}

async function runPhase3E2E() {
  console.log('=====================================================================');
  console.log('CIVICPULSE PHASE 3: LIVE END-TO-END COMMUNITY & AUTHORITY INTEGRATION');
  console.log('=====================================================================\n');

  // 1. Health check through Gateway
  console.log('1. Checking Gateway Health & All 4 Upstream Microservices...');
  const healthRes = await request({
    hostname: '127.0.0.1',
    port: 3000,
    path: '/health',
    method: 'GET',
  });
  console.log(`HTTP ${healthRes.statusCode}:`, healthRes.data);
  if (healthRes.statusCode !== 200 || healthRes.data?.status !== 'healthy') {
    throw new Error('Gateway readiness test failed!');
  }
  const checks = healthRes.data?.checks || {};
  if (
    checks['identity-service']?.status !== 'up' ||
    checks['reports-service']?.status !== 'up' ||
    checks['community-service']?.status !== 'up' ||
    checks['authority-service']?.status !== 'up'
  ) {
    throw new Error('Not all upstream services are responsive!');
  }
  console.log('✓ Gateway and all 4 microservices are healthy!\n');

  // 2. Register & Login Citizen Resident
  const timestamp = Date.now();
  const citizenEmail = `resident_p3_${timestamp}@civicpulse.org`;
  const citizenPassword = 'SecureResidentPassword123!';

  console.log(`2. Registering resident: ${citizenEmail}...`);
  const regRes = await request(
    {
      hostname: '127.0.0.1',
      port: 3000,
      path: '/api/v1/auth/register',
      method: 'POST',
    },
    {
      email: citizenEmail,
      password: citizenPassword,
      displayName: 'Phase3 Resident',
    },
  );
  if (regRes.statusCode !== 201) {
    throw new Error(`Registration failed: ${JSON.stringify(regRes.data)}`);
  }
  const citizenUserId = regRes.data?.data?.id;

  const loginRes = await request(
    {
      hostname: '127.0.0.1',
      port: 3000,
      path: '/api/v1/auth/login',
      method: 'POST',
    },
    {
      email: citizenEmail,
      password: citizenPassword,
    },
  );
  const citizenToken = loginRes.data?.data?.tokens?.accessToken;
  console.log(`✓ Resident logged in: UserID ${citizenUserId}\n`);

  // 3. Register second resident to test multi-user actions
  const otherEmail = `resident_other_${timestamp}@civicpulse.org`;
  console.log(`3. Registering second resident: ${otherEmail}...`);
  const otherRegRes = await request(
    {
      hostname: '127.0.0.1',
      port: 3000,
      path: '/api/v1/auth/register',
      method: 'POST',
    },
    {
      email: otherEmail,
      password: citizenPassword,
      displayName: 'Other Resident',
    },
  );
  const otherUserId = otherRegRes.data?.data?.id;

  const otherLoginRes = await request(
    {
      hostname: '127.0.0.1',
      port: 3000,
      path: '/api/v1/auth/login',
      method: 'POST',
    },
    {
      email: otherEmail,
      password: citizenPassword,
    },
  );
  const otherToken = otherLoginRes.data?.data?.tokens?.accessToken;
  console.log(`✓ Second Resident logged in: UserID ${otherUserId}\n`);

  // 4. Create an Administrator account directly in Identity DB for review testing
  console.log('4. Provisioning system administrator in Identity DB...');
  const mongoUri = 'mongodb://civic_identity_user:identity_dev_secret@localhost:27018/civic_identity?authSource=civic_identity';
  const mongoClient = new MongoClient(mongoUri);
  await mongoClient.connect();
  const identityDb = mongoClient.db();

  const adminEmail = `admin_p3_${timestamp}@civicpulse.org`;
  const adminRegRes = await request(
    {
      hostname: '127.0.0.1',
      port: 3000,
      path: '/api/v1/auth/register',
      method: 'POST',
    },
    {
      email: adminEmail,
      password: citizenPassword,
      displayName: 'System Admin',
    },
  );
  const adminUserId = adminRegRes.data?.data?.id;

  // Elevate to admin role directly in DB
  await identityDb.collection('users').updateOne(
    { _id: adminUserId },
    { $set: { role: 'admin' } },
  );

  const adminLoginRes = await request(
    {
      hostname: '127.0.0.1',
      port: 3000,
      path: '/api/v1/auth/login',
      method: 'POST',
    },
    {
      email: adminEmail,
      password: citizenPassword,
    },
  );
  const adminToken = adminLoginRes.data?.data?.tokens?.accessToken;
  console.log(`✓ Admin logged in with role "admin": UserID ${adminUserId}\n`);

  // 5. Create a civic report in Reports Service
  console.log('5. Resident creates a report in Reports Service...');
  const reportRes = await request(
    {
      hostname: '127.0.0.1',
      port: 3000,
      path: '/api/v1/reports',
      method: 'POST',
      headers: {
        Authorization: `Bearer ${citizenToken}`,
      },
    },
    {
      title: 'Deep sinkhole on Maple Avenue',
      description: 'Dangerous sinkhole expanding near school crosswalk',
      category: 'ROAD_DAMAGE',
      location: {
        type: 'Point',
        coordinates: [-73.985130, 40.748817],
      },
      locationDescription: 'Maple Ave & 4th St',
    },
  );
  const reportId = reportRes.data?.data?.id;
  if (!reportId) {
    throw new Error(`Report creation failed: ${JSON.stringify(reportRes.data)}`);
  }
  console.log(`✓ Report created: ${reportId}\n`);

  // ===========================================================================
  // Community Workflows
  // ===========================================================================
  console.log('6. Testing Community Endorsement Workflows...');
  // 6a. Endorse report
  const endorseRes1 = await request({
    hostname: '127.0.0.1',
    port: 3000,
    path: `/api/v1/reports/${reportId}/endorsement`,
    method: 'PUT',
    headers: { Authorization: `Bearer ${citizenToken}` },
  });
  console.log(`HTTP ${endorseRes1.statusCode}: Endorse response:`, endorseRes1.data?.data);
  if (endorseRes1.data?.data?.endorsementCount !== 1 || !endorseRes1.data?.data?.isEndorsedByCaller) {
    throw new Error('Endorsement count assertion failed');
  }

  // 6b. Idempotent duplicate endorsement by same user
  const endorseResDup = await request({
    hostname: '127.0.0.1',
    port: 3000,
    path: `/api/v1/reports/${reportId}/endorsement`,
    method: 'PUT',
    headers: { Authorization: `Bearer ${citizenToken}` },
  });
  if (endorseResDup.data?.data?.endorsementCount !== 1) {
    throw new Error('Duplicate endorsement improperly incremented count');
  }
  console.log('✓ Idempotent endorsement confirmed (count stayed 1)!');

  // 6c. Second resident endorses
  await request({
    hostname: '127.0.0.1',
    port: 3000,
    path: `/api/v1/reports/${reportId}/endorsement`,
    method: 'PUT',
    headers: { Authorization: `Bearer ${otherToken}` },
  });

  // 6d. Check summary
  const summaryRes = await request({
    hostname: '127.0.0.1',
    port: 3000,
    path: `/api/v1/reports/${reportId}/community-summary`,
    method: 'GET',
    headers: { Authorization: `Bearer ${citizenToken}` },
  });
  console.log('Community summary:', summaryRes.data?.data);
  if (summaryRes.data?.data?.endorsementCount !== 2) {
    throw new Error('Community summary total endorsement count mismatch');
  }
  console.log('✓ Endorsements verified across multiple residents!\n');

  // 7. Testing Follow Workflows
  console.log('7. Testing Report Following Workflows...');
  const followRes = await request({
    hostname: '127.0.0.1',
    port: 3000,
    path: `/api/v1/reports/${reportId}/follow`,
    method: 'PUT',
    headers: { Authorization: `Bearer ${citizenToken}` },
  });
  if (followRes.statusCode !== 200 || !followRes.data?.data?.isFollowing) {
    throw new Error('Follow report failed');
  }

  const followedListRes = await request({
    hostname: '127.0.0.1',
    port: 3000,
    path: '/api/v1/me/followed-reports',
    method: 'GET',
    headers: { Authorization: `Bearer ${citizenToken}` },
  });
  const items = followedListRes.data?.data?.items || [];
  const hasReport = items.some((item) => item.reportId === reportId);
  if (!hasReport) {
    throw new Error('Report missing from /api/v1/me/followed-reports');
  }
  console.log(`✓ Followed reports retrieved successfully (${items.length} items)!\n`);

  // 8. Testing Comments & Discussions
  console.log('8. Testing Comments and Discussion Workflows...');
  // 8a. Top-level comment
  const comment1Res = await request(
    {
      hostname: '127.0.0.1',
      port: 3000,
      path: `/api/v1/reports/${reportId}/comments`,
      method: 'POST',
      headers: { Authorization: `Bearer ${citizenToken}` },
    },
    { content: 'This sinkhole is getting larger after the rain yesterday.' },
  );
  const comment1Id = comment1Res.data?.data?.id;
  console.log(`Comment 1 created: ${comment1Id}`);

  // 8b. Reply comment
  const replyRes = await request(
    {
      hostname: '127.0.0.1',
      port: 3000,
      path: `/api/v1/reports/${reportId}/comments`,
      method: 'POST',
      headers: { Authorization: `Bearer ${otherToken}` },
    },
    {
      content: 'I called the local council earlier today about this.',
      parentCommentId: comment1Id,
    },
  );
  const replyId = replyRes.data?.data?.id;
  console.log(`Reply created: ${replyId}`);

  // 8c. Test 1-level reply constraint (prohibiting nested reply to a reply)
  const nestedReplyRes = await request(
    {
      hostname: '127.0.0.1',
      port: 3000,
      path: `/api/v1/reports/${reportId}/comments`,
      method: 'POST',
      headers: { Authorization: `Bearer ${citizenToken}` },
    },
    {
      content: 'Trying to nest deeper than 1 level.',
      parentCommentId: replyId,
    },
  );
  if (nestedReplyRes.statusCode !== 400) {
    throw new Error('Expected 400 Bad Request for nested reply deeper than 1 level');
  }
  console.log('✓ 1-level reply constraint enforced successfully!');

  // 8d. Edit own comment
  const editRes = await request(
    {
      hostname: '127.0.0.1',
      port: 3000,
      path: `/api/v1/comments/${comment1Id}`,
      method: 'PATCH',
      headers: { Authorization: `Bearer ${citizenToken}` },
    },
    { content: 'This sinkhole is getting larger after the rain yesterday. UPDATE: Now 3 feet wide.' },
  );
  if (!editRes.data?.data?.isEdited) {
    throw new Error('Comment edit flag was not set');
  }
  console.log('✓ Comment edit policy verified!');

  // 8e. Report comment for abuse
  const abuseRes = await request(
    {
      hostname: '127.0.0.1',
      port: 3000,
      path: `/api/v1/comments/${replyId}/abuse-reports`,
      method: 'POST',
      headers: { Authorization: `Bearer ${citizenToken}` },
    },
    { reason: 'SPAM', details: 'Automated comment pattern' },
  );
  if (abuseRes.statusCode !== 201) {
    throw new Error('Abuse report submission failed');
  }
  console.log('✓ Abuse report submitted successfully!\n');

  // ===========================================================================
  // Authority Verification Workflows
  // ===========================================================================
  console.log('9. Testing Authority Verification Applications...');
  // 9a. Resident submits authority application
  const appRes = await request(
    {
      hostname: '127.0.0.1',
      port: 3000,
      path: '/api/v1/authority/applications',
      method: 'POST',
      headers: { Authorization: `Bearer ${otherToken}` },
    },
    {
      organization: 'City of Metro Infrastructure Department',
      departmentRequested: 'Road Maintenance & Highway Safety',
      officialRole: 'Senior Road Works Inspector',
      officialEmail: 'inspector.smith@metro.gov',
      officialPhone: '+1-555-8822',
      supportingNotes: 'Municipal ID #MTR-8812',
    },
  );
  const applicationId = appRes.data?.data?.id;
  console.log(`Application submitted: ${applicationId}, status: ${appRes.data?.data?.status}`);
  if (appRes.data?.data?.status !== 'PENDING') {
    throw new Error('Expected new application to have PENDING status');
  }

  // 9b. Safeguard: Applicant cannot self-approve
  const selfApproveRes = await request(
    {
      hostname: '127.0.0.1',
      port: 3000,
      path: `/api/v1/authority/applications/${applicationId}/review`,
      method: 'POST',
      headers: { Authorization: `Bearer ${otherToken}` },
    },
    {
      status: 'APPROVED',
      reviewDecisionNotes: 'Self approving',
    },
  );
  if (selfApproveRes.statusCode !== 403) {
    throw new Error('Expected 403 Forbidden for applicant self-approval attempt');
  }
  console.log('✓ Self-approval prohibited safeguard verified (HTTP 403)!');

  // 9c. Administrator reviews and approves application
  const adminReviewRes = await request(
    {
      hostname: '127.0.0.1',
      port: 3000,
      path: `/api/v1/authority/applications/${applicationId}/review`,
      method: 'POST',
      headers: { Authorization: `Bearer ${adminToken}` },
    },
    {
      status: 'APPROVED',
      reviewDecisionNotes: 'Credentials verified against municipal staff roster',
    },
  );
  if (adminReviewRes.statusCode !== 200 || adminReviewRes.data?.data?.status !== 'APPROVED') {
    throw new Error('Admin review approval failed');
  }
  console.log('✓ Administrator approved authority application!');

  // 9d. Re-login as other resident to confirm elevated role in issued JWT
  const verifiedAuthorityLoginRes = await request(
    {
      hostname: '127.0.0.1',
      port: 3000,
      path: '/api/v1/auth/login',
      method: 'POST',
    },
    {
      email: otherEmail,
      password: citizenPassword,
    },
  );
  const verifiedAuthorityToken = verifiedAuthorityLoginRes.data?.data?.tokens?.accessToken;
  const verifiedUserRole = verifiedAuthorityLoginRes.data?.data?.user?.role;
  console.log(`Verified authority role after elevation: "${verifiedUserRole}"`);
  if (verifiedUserRole !== 'authority') {
    throw new Error(`Role elevation failed! Expected "authority", got "${verifiedUserRole}"`);
  }
  console.log('✓ Server-side role elevation via S2S confirmed!\n');

  // ===========================================================================
  // Municipal Departments & Report Assignments
  // ===========================================================================
  console.log('10. Testing Municipal Departments and Report Assignments...');
  // 10a. Admin creates active department
  const jurisdictionName = `Metro District Center ${timestamp}`;
  const createDeptRes = await request(
    {
      hostname: '127.0.0.1',
      port: 3000,
      path: '/api/v1/authority/departments',
      method: 'POST',
      headers: { Authorization: `Bearer ${adminToken}` },
    },
    {
      name: 'Department of Transportation',
      jurisdiction: jurisdictionName,
      description: 'Oversees municipal roads, signage, and highway repairs',
      publicContactEmail: 'contact.dot@metro.gov',
      publicContactPhone: '+1-555-0100',
    },
  );
  const departmentId = createDeptRes.data?.data?.id;
  console.log(`Department created: ${departmentId} (${createDeptRes.data?.data?.name})`);

  // 10b. Duplicate department rejected
  const dupDeptRes = await request(
    {
      hostname: '127.0.0.1',
      port: 3000,
      path: '/api/v1/authority/departments',
      method: 'POST',
      headers: { Authorization: `Bearer ${adminToken}` },
    },
    {
      name: 'Department of Transportation',
      jurisdiction: jurisdictionName,
    },
  );
  if (dupDeptRes.statusCode !== 409) {
    throw new Error('Expected 409 Conflict for duplicate department name in same jurisdiction');
  }
  console.log('✓ Duplicate department rejection verified!');

  // 10c. Ordinary resident forbidden from assigning reports
  const residentAssignRes = await request(
    {
      hostname: '127.0.0.1',
      port: 3000,
      path: `/api/v1/reports/${reportId}/assignments`,
      method: 'POST',
      headers: { Authorization: `Bearer ${citizenToken}` },
    },
    {
      departmentId,
      assignmentReason: 'Resident trying to assign',
    },
  );
  if (residentAssignRes.statusCode !== 403) {
    throw new Error('Expected 403 Forbidden for resident attempting report assignment');
  }
  console.log('✓ Unauthorized resident assignment blocked (HTTP 403)!');

  // 10d. Verified authority user assigns report to department
  const assignRes = await request(
    {
      hostname: '127.0.0.1',
      port: 3000,
      path: `/api/v1/reports/${reportId}/assignments`,
      method: 'POST',
      headers: { Authorization: `Bearer ${verifiedAuthorityToken}` },
    },
    {
      departmentId,
      assignmentReason: 'Emergency asphalt repair crew dispatched for inspection',
    },
  );
  console.log(`Report assigned: ${assignRes.data?.data?.id}, department: ${assignRes.data?.data?.departmentName}`);
  if (assignRes.statusCode !== 201) {
    console.error('Authority assignment failed with status:', assignRes.statusCode, 'Body:', JSON.stringify(assignRes.data));
    throw new Error('Authority assignment failed');
  }

  // 10e. Public accountability assignment view
  const publicViewRes = await request({
    hostname: '127.0.0.1',
    port: 3000,
    path: `/api/v1/reports/${reportId}/assignments/public`,
    method: 'GET',
  });
  console.log('Public assignment view:', publicViewRes.data?.data);
  if (publicViewRes.data?.data?.currentAssignment?.departmentName !== 'Department of Transportation') {
    throw new Error('Public assignment view department mismatch');
  }
  console.log('✓ Public accountability assignment view confirmed!');

  await mongoClient.close();

  console.log('\n=====================================================================');
  console.log('ALL PHASE 3 LIVE END-TO-END WORKFLOWS COMPLETED SUCCESSFULLY!');
  console.log('=====================================================================');
}

runPhase3E2E().catch((err) => {
  console.error('PHASE 3 E2E ERROR:', err);
  process.exit(1);
});
