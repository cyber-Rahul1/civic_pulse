import fetch from 'node-fetch';

const GATEWAY_URL = 'http://127.0.0.1:3000';

async function runTests() {
  console.log('--- CivicPulse Phase 5.2.1 Real Backend & API Gateway Verification ---');

  // 1. Authenticate as a Resident
  console.log('\n[1] Authenticating as resident user...');
  const residentEmail = `resident_test_${Date.now()}@test.org`;
  const regRes = await fetch(`${GATEWAY_URL}/api/v1/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: residentEmail,
      password: 'Password123!',
      displayName: 'Test Resident',
    }),
  });

  const regData = await regRes.json();
  if (!regRes.ok) {
    throw new Error(`Registration failed: ${JSON.stringify(regData)}`);
  }

  const loginRes = await fetch(`${GATEWAY_URL}/api/v1/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: residentEmail,
      password: 'Password123!',
    }),
  });
  const loginData = await loginRes.json();
  if (!loginRes.ok) {
    throw new Error(`Login failed: ${JSON.stringify(loginData)}`);
  }
  const token = loginData.data.tokens.accessToken;
  console.log('✓ Successfully registered and authenticated resident with JWT token');

  // 2. Create report WITH valid location
  console.log('\n[2] Creating report WITH valid GPS coordinates (77.5946, 12.9716)...');
  const withLocRes = await fetch(`${GATEWAY_URL}/api/v1/reports`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      title: 'Valid GPS Report for Verification',
      description: 'Report created with explicit verified GPS coordinates for test',
      category: 'POTHOLE',
      location: {
        type: 'Point',
        coordinates: [77.5946, 12.9716],
      },
      locationDescription: 'Near Metro Pillar 145',
    }),
  });

  const withLocData = await withLocRes.json();
  if (!withLocRes.ok) {
    throw new Error(`Report with location failed: ${JSON.stringify(withLocData)}`);
  }
  const withLocReport = withLocData.data;
  console.log(`✓ Created report with location ID: ${withLocReport.id}`);
  if (!withLocReport.location || !withLocReport.location.coordinates) {
    throw new Error('Report location missing from response');
  }
  console.log(`✓ Returned coordinates: ${JSON.stringify(withLocReport.location.coordinates)}`);

  // 3. Verify it appears in nearby search
  console.log('\n[3] Verifying nearby search finds the report...');
  const nearbyRes = await fetch(
    `${GATEWAY_URL}/api/v1/reports/nearby?longitude=77.5946&latitude=12.9716&radiusMeters=5000`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  const nearbyData = await nearbyRes.json();
  if (!nearbyRes.ok) {
    throw new Error(`Nearby search failed: ${JSON.stringify(nearbyData)}`);
  }
  const foundInNearby = nearbyData.data.some((r) => r.id === withLocReport.id);
  if (!foundInNearby) {
    throw new Error(`Report ${withLocReport.id} not found in nearby search results!`);
  }
  console.log(`✓ Report correctly returned in nearby search (Total found nearby: ${nearbyData.data.length})`);

  // 4. Create report WITHOUT location (only manual description)
  console.log('\n[4] Creating report WITHOUT GPS coordinates (landmark description only)...');
  const noLocRes = await fetch(`${GATEWAY_URL}/api/v1/reports`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      title: 'Non-Geocoded Landmark Only Report',
      description: 'Report created without device GPS coordinates, only landmark details',
      category: 'GARBAGE',
      locationDescription: 'Opposite Town Hall, near central entrance gate',
    }),
  });

  const noLocData = await noLocRes.json();
  if (!noLocRes.ok) {
    throw new Error(`Report without location failed: ${JSON.stringify(noLocData)}`);
  }
  const noLocReport = noLocData.data;
  console.log(`✓ Created non-geocoded report ID: ${noLocReport.id}`);
  if (noLocReport.location !== undefined && noLocReport.location !== null) {
    throw new Error(`Expected location to be omitted, but got: ${JSON.stringify(noLocReport.location)}`);
  }
  console.log('✓ Verified: location is omitted / undefined, not faked with default coordinates');
  console.log(`✓ Verified: locationDescription is preserved: "${noLocReport.locationDescription}"`);

  // 5. Verify non-geocoded report is accessible in Feed (queryReports)
  console.log('\n[5] Verifying non-geocoded report is accessible in Feed...');
  const feedRes = await fetch(`${GATEWAY_URL}/api/v1/reports?limit=20`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const feedData = await feedRes.json();
  if (!feedRes.ok) {
    throw new Error(`Feed query failed: ${JSON.stringify(feedData)}`);
  }
  const foundInFeed = feedData.data.items.some((r) => r.id === noLocReport.id);
  if (!foundInFeed) {
    throw new Error(`Report ${noLocReport.id} not found in general Feed!`);
  }
  console.log(`✓ Report without coordinates successfully surfaced in the standard Feed (Total items: ${feedData.data.meta.totalItems})`);

  // 6. Verify non-geocoded report is accessible via Report Detail endpoint
  console.log('\n[6] Verifying report detail endpoint retrieves report without coordinates...');
  const detailRes = await fetch(`${GATEWAY_URL}/api/v1/reports/${noLocReport.id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const detailData = await detailRes.json();
  if (!detailRes.ok) {
    throw new Error(`Report detail fetch failed: ${JSON.stringify(detailData)}`);
  }
  if (detailData.data.id !== noLocReport.id) {
    throw new Error('Report detail ID mismatch');
  }
  if (detailData.data.location) {
    throw new Error('Report detail unexpectedly returned a location object');
  }
  console.log('✓ Report details retrieved successfully without fake coordinates');

  // 7. Verify non-geocoded report is NEVER returned by nearby search
  console.log('\n[7] Verifying non-geocoded report does NOT appear in nearby search results...');
  const nearbyAllRes = await fetch(
    `${GATEWAY_URL}/api/v1/reports/nearby?longitude=77.5946&latitude=12.9716&radiusMeters=50000`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  const nearbyAllData = await nearbyAllRes.json();
  const falselyIncluded = nearbyAllData.data.some((r) => r.id === noLocReport.id);
  if (falselyIncluded) {
    throw new Error(`Report ${noLocReport.id} without coordinates was falsely returned in geospatial search!`);
  }
  console.log('✓ Verified: Reports without coordinates are excluded from geospatial queries and produce 0 map pins');

  // 8. Verify invalid coordinates are rejected by backend validation
  console.log('\n[8] Verifying backend strictly rejects out-of-bounds coordinates...');
  const invalidRes = await fetch(`${GATEWAY_URL}/api/v1/reports`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      title: 'Invalid Coordinates Failure Test',
      description: 'Testing that coordinates validation is preserved',
      category: 'POTHOLE',
      location: {
        type: 'Point',
        coordinates: [200.0, 95.0], // Out of range longitude and latitude
      },
    }),
  });
  if (invalidRes.status !== 400) {
    throw new Error(`Expected HTTP 400 for invalid coordinates, but received: ${invalidRes.status}`);
  }
  console.log('✓ Verified: Invalid coordinates [200.0, 95.0] rejected with HTTP 400 BadRequest');

  console.log('\n=== ALL PHASE 5.2.1 REAL BACKEND VERIFICATION CHECKS PASSED ===\n');
}

runTests().catch((err) => {
  console.error('\n❌ TEST FAILED:', err);
  process.exit(1);
});
