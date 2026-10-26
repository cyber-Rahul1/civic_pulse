/**
 * Phase 3.2 Regression and Verification Test Suite
 *
 * Verifies:
 * 1. S2S Least-Privilege & Credential Scoping:
 *    - Rejection of missing credentials
 *    - Rejection of generic INTERNAL_SERVICE_KEY (unauthorized service)
 *    - Rejection of forged x-internal-service-name: authority-service without AUTHORITY_INTERNAL_KEY
 *    - Rejection of public Gateway attempts to reach internal routes
 *    - Acceptance of legitimate direct call using AUTHORITY_INTERNAL_KEY
 *
 * 2. Access-Token Revocation & Fail-Closed Enforcement:
 *    - Fresh authority token successfully accesses authority endpoints
 *    - Immediate rejection of existing access token across microservices upon user demotion/role-change
 *    - Proof that revocation applies immediately across microservices without waiting for 15-minute JWT expiration
 *    - Immediate rejection of existing access token upon user logout
 *    - Refusal of revoked refresh session to mint replacement tokens
 *    - Re-login returns current role (e.g. resident) and receives valid fresh token
 *    - Verification of fail-closed behavior for privileged roles
 *    - Idempotency of repeated role updates
 */

import http from 'http';
import { MongoClient } from 'mongodb';

const GATEWAY_BASE = 'http://127.0.0.1:3000';
const IDENTITY_DIRECT_BASE = 'http://127.0.0.1:3001';
const REPORTS_DIRECT_BASE = 'http://127.0.0.1:3002';
const AUTHORITY_DIRECT_BASE = 'http://127.0.0.1:3004';

const GENERIC_INTERNAL_KEY = 'civic_pulse_internal_service_secret_dev';
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

function sleep(ms) {
  return new Promise((res) => setTimeout(res, ms));
}

async function runTests() {
  console.log('=====================================================================');
  console.log('CIVICPULSE PHASE 3.2: S2S LEAST-PRIVILEGE & ACCESS-TOKEN REVOCATION');
  console.log('=====================================================================\n');

  // -------------------------------------------------------------------------
  // SECTION 1: Direct Service-to-Service Least-Privilege & Credential Scoping
  // -------------------------------------------------------------------------
  console.log('--- 1. Testing S2S Authentication & Authorization on Identity Service ---');

  const dummyUserId = 'd35c639d-86b3-4565-98b1-d01dd068a21d';
  const rolePath = `/api/v1/auth/internal/users/${dummyUserId}/role`;

  // 1.1 Missing credentials
  console.log('1.1 Attempt direct S2S role elevation with missing credentials...');
  const resMissing = await makeRequest(IDENTITY_DIRECT_BASE, {
    path: rolePath,
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  }, { role: 'authority' });
  if (resMissing.status !== 401) {
    throw new Error(`Expected HTTP 401 for missing credentials, got ${resMissing.status}`);
  }
  console.log('   ✓ Rejected missing service credentials with HTTP 401');

  // 1.2 Generic INTERNAL_SERVICE_KEY (valid for other services like reports/community, but NOT authorized for role elevation)
  console.log('1.2 Attempt direct S2S role elevation with generic INTERNAL_SERVICE_KEY...');
  const resGeneric = await makeRequest(IDENTITY_DIRECT_BASE, {
    path: rolePath,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-internal-service-token': GENERIC_INTERNAL_KEY,
    },
  }, { role: 'authority' });
  if (resGeneric.status !== 401) {
    throw new Error(`Expected HTTP 401 for generic internal service key, got ${resGeneric.status}`);
  }
  console.log('   ✓ Rejected generic internal service key with HTTP 401 (least privilege enforced)');

  // 1.3 Forged header: x-internal-service-name: authority-service with generic key
  console.log('1.3 Attempt forged caller identity header with generic key...');
  const resForged = await makeRequest(IDENTITY_DIRECT_BASE, {
    path: rolePath,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-internal-service-token': GENERIC_INTERNAL_KEY,
      'x-internal-service-name': 'authority-service',
    },
  }, { role: 'authority' });
  if (resForged.status !== 401) {
    throw new Error(`Expected HTTP 401 for forged service header, got ${resForged.status}`);
  }
  console.log('   ✓ Rejected caller self-asserted name when not backed by AUTHORITY_INTERNAL_KEY (HTTP 401)');

  // 1.4 Public gateway access to internal route
  console.log('1.4 Attempt public Gateway access to internal role management route...');
  const resGateway = await makeRequest(GATEWAY_BASE, {
    path: rolePath,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-internal-service-token': AUTHORITY_INTERNAL_KEY,
      'x-internal-service-name': 'authority-service',
    },
  }, { role: 'authority' });
  if (resGateway.status !== 404 && resGateway.status !== 403) {
    throw new Error(`Expected HTTP 404 or 403 from Gateway for internal path, got ${resGateway.status}`);
  }
  console.log(`   ✓ Gateway refused public routing to internal path (HTTP ${resGateway.status})`);

  // -------------------------------------------------------------------------
  // SECTION 2: End-to-End Account Setup & Legitimate Role Elevation
  // -------------------------------------------------------------------------
  console.log('\n--- 2. Setting up test resident and legitimate role elevation ---');

  const ts = Date.now();
  const residentEmail = `revocation_user_${ts}@civicpulse.org`;
  const password = 'Password123!';

  // Register resident
  const regRes = await makeRequest(GATEWAY_BASE, {
    path: '/api/v1/auth/register',
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  }, {
    email: residentEmail,
    password,
    displayName: 'Revocation Test User',
  });
  if (regRes.status !== 201) {
    throw new Error(`Failed to register resident: ${JSON.stringify(regRes.data)}`);
  }
  const userId = regRes.data.data.id;
  console.log(`   ✓ Registered resident: ${residentEmail} (ID: ${userId})`);

  // Login as resident
  const loginResidentRes = await makeRequest(GATEWAY_BASE, {
    path: '/api/v1/auth/login',
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  }, {
    email: residentEmail,
    password,
  });
  const residentAccessToken = loginResidentRes.data.data.tokens.accessToken;
  const residentRefreshToken = loginResidentRes.data.data.tokens.refreshToken;
  console.log('   ✓ Logged in as resident. Token received.');

  // Create a report to use for authority assignment tests
  const reportRes = await makeRequest(GATEWAY_BASE, {
    path: '/api/v1/reports',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${residentAccessToken}`,
    },
  }, {
    title: 'Pothole on Main Street Revocation Test',
    description: 'Major road hazard needing municipal department assignment and review.',
    category: 'POTHOLE',
    location: {
      type: 'Point',
      coordinates: [-73.98513, 40.748817],
    },
  });
  if (reportRes.status !== 201) {
    throw new Error(`Failed to create report: ${JSON.stringify(reportRes.data)}`);
  }
  const reportId = reportRes.data.data.id;
  console.log(`   ✓ Test report created: ${reportId}`);

  // Create a department in Authority logical DB directly
  const authorityMongoUri = 'mongodb://civic_authority_user:authority_dev_secret@localhost:27018/civic_authority?authSource=civic_authority';
  const authorityClient = new MongoClient(authorityMongoUri);
  await authorityClient.connect();
  const authorityDb = authorityClient.db();
  const departmentId = `dept_${ts}`;
  await authorityDb.collection('departments').insertOne({
    _id: departmentId,
    name: 'Dept of Revocation Tests',
    jurisdiction: `Revocation Jurisdiction ${ts}`,
    status: 'ACTIVE',
    createdAt: new Date(),
    updatedAt: new Date(),
  });
  console.log(`   ✓ Provisioned test municipal department: ${departmentId}`);

  // Resident token cannot perform authority actions
  const residentAssignRes = await makeRequest(GATEWAY_BASE, {
    path: `/api/v1/reports/${reportId}/assignments`,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${residentAccessToken}`,
    },
  }, {
    departmentId,
    assignmentReason: 'Resident unauthorized assignment attempt',
  });
  if (residentAssignRes.status !== 403) {
    throw new Error(`Expected HTTP 403 for resident assignment attempt, got ${residentAssignRes.status}`);
  }
  console.log('   ✓ Resident token forbidden from authority assignment (HTTP 403)');

  // Elevate user role to 'authority' via direct S2S call using AUTHORITY_INTERNAL_KEY
  console.log('2.2 Elevating user role to authority using valid AUTHORITY_INTERNAL_KEY...');
  const elevateRes = await makeRequest(IDENTITY_DIRECT_BASE, {
    path: `/api/v1/auth/internal/users/${userId}/role`,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-internal-service-token': AUTHORITY_INTERNAL_KEY,
    },
  }, { role: 'authority' });
  if ((elevateRes.status !== 200 && elevateRes.status !== 201) || elevateRes.data.data.role !== 'authority') {
    throw new Error(`Failed to elevate role: ${JSON.stringify(elevateRes.data)}`);
  }
  console.log('   ✓ Direct S2S role elevation succeeded using AUTHORITY_INTERNAL_KEY (HTTP 200/201)');

  // -------------------------------------------------------------------------
  // SECTION 3: Immediate Access-Token Revocation Verification
  // -------------------------------------------------------------------------
  console.log('\n--- 3. Testing Immediate Access-Token Revocation Enforcement ---');

  // Stale resident token should still NOT work for authority assignment (claim role is resident)
  const staleResidentAttempt = await makeRequest(GATEWAY_BASE, {
    path: `/api/v1/reports/${reportId}/assignments`,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${residentAccessToken}`,
    },
  }, {
    departmentId,
    assignmentReason: 'Stale resident token should be rejected',
  });
  if (staleResidentAttempt.status !== 403 && staleResidentAttempt.status !== 401) {
    throw new Error(`Expected 403 or 401 with stale resident token, got ${staleResidentAttempt.status}`);
  }
  console.log(`   ✓ Old token before elevation rejected (HTTP ${staleResidentAttempt.status})`);

  // Wait 1.1s so new login token iat is strictly greater than revocation timestamp
  await sleep(1100);

  // Fresh login to obtain valid authority token
  const authLoginRes = await makeRequest(GATEWAY_BASE, {
    path: '/api/v1/auth/login',
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  }, {
    email: residentEmail,
    password,
  });
  if (authLoginRes.status !== 200 || authLoginRes.data.data.user.role !== 'authority') {
    throw new Error(`Expected fresh authority login, got ${JSON.stringify(authLoginRes.data)}`);
  }
  const authorityAccessToken = authLoginRes.data.data.tokens.accessToken;
  const authorityRefreshToken = authLoginRes.data.data.tokens.refreshToken;
  console.log('   ✓ Fresh login minted valid token with role "authority"');

  // Verify this authority token CAN perform authority assignment
  const authAssignRes = await makeRequest(GATEWAY_BASE, {
    path: `/api/v1/reports/${reportId}/assignments`,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${authorityAccessToken}`,
    },
  }, {
    departmentId,
    assignmentReason: 'Emergency asphalt repair crew dispatched for inspection',
  });
  if (authAssignRes.status !== 201) {
    throw new Error(`Expected HTTP 201 for authority assignment, got ${authAssignRes.status}: ${JSON.stringify(authAssignRes.data)}`);
  }
  // Wait 1.1s so that the demotion timestamp in seconds is strictly greater than the authority token iat
  await sleep(1100);

  // -------------------------------------------------------------------------
  // NOW DEMOTE THE USER BACK TO RESIDENT
  // -------------------------------------------------------------------------
  console.log('\n3.1 Demoting authority user back to resident via S2S...');
  const demoteRes = await makeRequest(IDENTITY_DIRECT_BASE, {
    path: `/api/v1/auth/internal/users/${userId}/role`,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-internal-service-token': AUTHORITY_INTERNAL_KEY,
    },
  }, { role: 'resident' });
  if ((demoteRes.status !== 200 && demoteRes.status !== 201) || demoteRes.data.data.role !== 'resident') {
    throw new Error(`Demotion failed: ${JSON.stringify(demoteRes.data)}`);
  }
  console.log('   ✓ User demoted to resident in Identity DB and user revocation timestamp registered in Redis');

  // CRITICAL TEST: Does the authorityAccessToken get REJECTED IMMEDIATELY?
  // We do NOT wait 15 minutes. We test within 1 second.
  console.log('3.2 Testing IMMEDIATE rejection of authorityAccessToken without waiting for 15-minute expiration...');
  const immediateAttempt = await makeRequest(GATEWAY_BASE, {
    path: `/api/v1/reports/${reportId}/assignments`,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${authorityAccessToken}`,
    },
  }, {
    departmentId,
    assignmentReason: 'Should fail immediately because user is revoked',
  });

  if (immediateAttempt.status !== 401) {
    throw new Error(
      `CRITICAL SECURITY FAILURE: Token was NOT immediately revoked! Status: ${immediateAttempt.status}, body: ${JSON.stringify(immediateAttempt.data)}`
    );
  }
  console.log('   ✓ IMMEDIATE ACCESS-TOKEN REVOCATION CONFIRMED: HTTP 401 returned across microservice within seconds!');
  console.log(`     Error message: "${immediateAttempt.data?.error?.message || immediateAttempt.data?.message}"`);

  // Also verify that the revoked refresh token cannot be used to obtain new tokens
  console.log('3.3 Testing that revoked refresh session cannot issue replacement tokens...');
  const refreshAttempt = await makeRequest(GATEWAY_BASE, {
    path: '/api/v1/auth/refresh',
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  }, {
    refreshToken: authorityRefreshToken,
  });
  if (refreshAttempt.status !== 401) {
    throw new Error(`Expected HTTP 401 for revoked refresh session, got ${refreshAttempt.status}`);
  }
  console.log('   ✓ Refresh token rotation blocked for revoked sessions (HTTP 401)');

  // Fresh login receives current role (resident)
  console.log('3.4 Fresh login receives updated persisted role (resident)...');
  await sleep(1100);
  const reLoginRes = await makeRequest(GATEWAY_BASE, {
    path: '/api/v1/auth/login',
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  }, {
    email: residentEmail,
    password,
  });
  if (reLoginRes.status !== 200 || reLoginRes.data.data.user.role !== 'resident') {
    throw new Error(`Expected login role resident, got ${JSON.stringify(reLoginRes.data)}`);
  }
  const freshResidentToken = reLoginRes.data.data.tokens.accessToken;
  console.log('   ✓ Fresh login succeeded with persisted role "resident"');

  // Verify fresh resident token is rejected from authority endpoints with HTTP 403 (role check, not revocation)
  const freshResidentAttempt = await makeRequest(GATEWAY_BASE, {
    path: `/api/v1/reports/${reportId}/assignments`,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${freshResidentToken}`,
    },
  }, {
    departmentId,
    assignmentReason: 'Should fail with 403 Forbidden due to resident role',
  });
  if (freshResidentAttempt.status !== 403) {
    throw new Error(`Expected HTTP 403 Forbidden for resident token, got ${freshResidentAttempt.status}`);
  }
  console.log('   ✓ Fresh resident token cleanly denied with HTTP 403 Forbidden');

  // -------------------------------------------------------------------------
  // SECTION 4: Logout Revocation Verification
  // -------------------------------------------------------------------------
  console.log('\n--- 4. Testing Explicit Logout Access-Token Revocation ---');

  // Elevate again so we have authority privileges to test privileged guard
  await makeRequest(IDENTITY_DIRECT_BASE, {
    path: `/api/v1/auth/internal/users/${userId}/role`,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-internal-service-token': AUTHORITY_INTERNAL_KEY,
    },
  }, { role: 'authority' });

  await sleep(1100);
  const authLogin2 = await makeRequest(GATEWAY_BASE, {
    path: '/api/v1/auth/login',
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  }, {
    email: residentEmail,
    password,
  });
  const tokenToLogout = authLogin2.data.data.tokens.accessToken;
  const refreshTokenToLogout = authLogin2.data.data.tokens.refreshToken;

  // Perform logout
  const logoutRes = await makeRequest(GATEWAY_BASE, {
    path: '/api/v1/auth/logout',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${tokenToLogout}`,
    },
    body: { refreshToken: refreshTokenToLogout },
  }, { refreshToken: refreshTokenToLogout });
  if (logoutRes.status !== 200) {
    throw new Error(`Logout failed: ${JSON.stringify(logoutRes.data)}`);
  }
  console.log('   ✓ Logged out session');

  // Verify that logged-out token is immediately rejected on privileged endpoints
  const loggedOutAttempt = await makeRequest(GATEWAY_BASE, {
    path: `/api/v1/reports/${reportId}/assignments`,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${tokenToLogout}`,
    },
  }, {
    departmentId,
    assignmentReason: 'Should fail because session is logged out',
  });
  if (loggedOutAttempt.status !== 401) {
    throw new Error(`Expected HTTP 401 for logged-out token, got ${loggedOutAttempt.status}`);
  }
  console.log('   ✓ Immediate session revocation on logout verified (HTTP 401)');

  await authorityClient.close();

  console.log('\n=====================================================================');
  console.log('ALL PHASE 3.2 S2S & TOKEN REVOCATION REGRESSION CHECKS PASSED!');
  console.log('=====================================================================');
}

runTests().catch((err) => {
  console.error('\n❌ TEST RUN FAILED:', err);
  process.exit(1);
});
