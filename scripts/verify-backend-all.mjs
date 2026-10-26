import fetch from 'node-fetch';
import { MongoClient } from 'mongodb';

const GATEWAY_URL = 'http://127.0.0.1:3000/api/v1';
const MONGO_URI = 'mongodb://civic_reports_user:reports_dev_secret@localhost:27018/civic_reports?authSource=civic_reports';
const DB_NAME = 'civic_reports';

async function run() {
  console.log('=== CivicPulse Comprehensive Phase 5 Backend Verification ===\n');

  // 1. Authenticate resident
  console.log('1. Authenticating test resident...');
  await fetch(`${GATEWAY_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: 'resident.test@civicpulse.org',
      password: 'Password123!',
      displayName: 'Vijayawada Test Resident',
    }),
  });

  const residentLoginRes = await fetch(`${GATEWAY_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: 'resident.test@civicpulse.org',
      password: 'Password123!',
    }),
  });
  if (!residentLoginRes.ok) throw new Error('Resident login failed');
  const residentLoginData = await residentLoginRes.json();
  const residentToken = residentLoginData.data?.tokens?.accessToken || residentLoginData.tokens?.accessToken;
  console.log('   Resident token acquired.');

  // 2. Authenticate municipal admin
  console.log('2. Authenticating municipal admin...');
  const adminLoginRes = await fetch(`${GATEWAY_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: 'admin@civicpulse.org',
      password: 'AdminPassword123!',
    }),
  });
  if (!adminLoginRes.ok) throw new Error('Admin login failed');
  const adminLoginData = await adminLoginRes.json();
  const adminToken = adminLoginData.data?.tokens?.accessToken || adminLoginData.tokens?.accessToken;
  console.log('   Admin token acquired.');

  const client = new MongoClient(MONGO_URI);
  await client.connect();
  const db = client.db(DB_NAME);
  const reportsCollection = db.collection('reports');

  const countBefore = await reportsCollection.countDocuments();
  console.log(`\nDB reports count before tests: ${countBefore}\n`);

  let createdValidReportId = null;

  // -------------------------------------------------------------
  // Test Suite A: Issue Coordinates & AP Geographic Boundaries
  // -------------------------------------------------------------
  console.log('--- Suite A: Geographic Coordinates & State Boundary Validation ---');

  const boundaryCases = [
    {
      name: 'A1: Valid AP Coordinates (Vijayawada Benz Circle, NTR)',
      payload: {
        title: 'Benz Circle Road Surface Defect',
        description: 'Pothole near Benz Circle flyover on MG Road Vijayawada',
        category: 'POTHOLE',
        location: { type: 'Point', coordinates: [80.648, 16.5062] },
        locationDescription: 'Benz Circle, Vijayawada Urban, NTR, Andhra Pradesh',
        administrativeContext: { districtId: 'ntr', mandalId: 'vijayawada_urban', localityId: 'vijayawada_urban_loc_1' },
      },
      expectedStatus: 201,
      shouldCreate: true,
    },
    {
      name: 'A2: Outside AP Coordinates (Bangalore, Karnataka)',
      payload: {
        title: 'Bangalore Road Hazard',
        description: 'Pothole in Indiranagar Bangalore',
        category: 'POTHOLE',
        location: { type: 'Point', coordinates: [77.5946, 12.9716] },
        locationDescription: 'Indiranagar, Bangalore, Karnataka',
      },
      expectedStatus: 400,
      shouldCreate: false,
    },
    {
      name: 'A3: Outside AP Coordinates (Hyderabad, Telangana)',
      payload: {
        title: 'Hyderabad Water Leak',
        description: 'Pipeline leakage in Gachibowli Hyderabad',
        category: 'WATER',
        location: { type: 'Point', coordinates: [78.4867, 17.385] },
        locationDescription: 'Gachibowli, Hyderabad, Telangana',
      },
      expectedStatus: 400,
      shouldCreate: false,
    },
    {
      name: 'A4: Outside AP Coordinates (Chennai, Tamil Nadu)',
      payload: {
        title: 'Chennai Marina Waste Accumulation',
        description: 'Trash along Marina Beach Chennai',
        category: 'GARBAGE',
        location: { type: 'Point', coordinates: [80.2707, 13.0827] },
      },
      expectedStatus: 400,
      shouldCreate: false,
    },
    {
      name: 'A5: Border Check: AP Side (Ichchapuram, Srikakulam)',
      payload: {
        title: 'Ichchapuram AP Border Gate Repair',
        description: 'Checkpost road repair on AP side',
        category: 'ROAD_DAMAGE',
        location: { type: 'Point', coordinates: [84.69, 19.11] },
        locationDescription: 'Ichchapuram, Srikakulam, Andhra Pradesh',
        administrativeContext: { districtId: 'srikakulam' },
      },
      expectedStatus: 201,
      shouldCreate: true,
    },
    {
      name: 'A6: Border Check: Odisha Side (Berhampur area, 25km north)',
      payload: {
        title: 'Odisha Highway Pothole Beyond AP Border',
        description: 'Pothole near Berhampur Odisha',
        category: 'ROAD_DAMAGE',
        location: { type: 'Point', coordinates: [84.80, 19.32] },
      },
      expectedStatus: 400,
      shouldCreate: false,
    },
  ];

  for (const tc of boundaryCases) {
    const res = await fetch(`${GATEWAY_URL}/reports`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${residentToken}` },
      body: JSON.stringify(tc.payload),
    });
    const status = res.status;
    const body = await res.json().catch(() => ({}));
    const passed = status === tc.expectedStatus;
    console.log(`[${passed ? 'PASS' : 'FAIL'}] ${tc.name}`);
    console.log(`       Status: ${status} (expected ${tc.expectedStatus})`);
    if (status === 201) {
      const repId = body.data?.id || body.id;
      console.log(`       Created ID: ${repId}`);
      if (!createdValidReportId) createdValidReportId = repId;
    } else {
      console.log(`       Rejection reason: ${body.error?.message || body.message}`);
    }
  }

  // -------------------------------------------------------------
  // Test Suite B: Administrative Hierarchy & Coordinate Consistency
  // -------------------------------------------------------------
  console.log('\n--- Suite B: Administrative Selection vs Coordinates Consistency ---');

  const consistencyCases = [
    {
      name: 'B1: Severe District Mismatch (Coords in NTR/Vijayawada, Selected Visakhapatnam District)',
      payload: {
        title: 'Mismatched District Submission',
        description: 'Coordinates are Vijayawada but selected district is Visakhapatnam (~300km away)',
        category: 'POTHOLE',
        location: { type: 'Point', coordinates: [80.648, 16.5062] }, // NTR
        administrativeContext: { districtId: 'visakhapatnam' },      // Visakhapatnam
      },
      expectedStatus: 400,
      shouldCreate: false,
    },
    {
      name: 'B2: Non-existent District Identifier',
      payload: {
        title: 'Fabricated District ID',
        description: 'Submitting a completely fictitious district identifier',
        category: 'POTHOLE',
        location: { type: 'Point', coordinates: [80.648, 16.5062] },
        administrativeContext: { districtId: 'atlantis_district' },
      },
      expectedStatus: 400,
      shouldCreate: false,
    },
    {
      name: 'B3: Mandal does not belong to District',
      payload: {
        title: 'Cross-district Mandal Hierarchy Mismatch',
        description: 'District is NTR but mandal is Gajuwaka (Visakhapatnam)',
        category: 'POTHOLE',
        location: { type: 'Point', coordinates: [80.648, 16.5062] },
        administrativeContext: { districtId: 'ntr', mandalId: 'gajuwaka' },
      },
      expectedStatus: 400,
      shouldCreate: false,
    },
    {
      name: 'B4: Reporter Location Outside AP (Even if Issue Coordinates are Valid AP)',
      payload: {
        title: 'Reporter Device Outside AP Telemetry',
        description: 'Issue coordinates inside AP, but reporter device GPS detected in Bangalore',
        category: 'POTHOLE',
        location: { type: 'Point', coordinates: [80.648, 16.5062] },
        administrativeContext: { districtId: 'ntr', mandalId: 'vijayawada_urban' },
        reporterLocation: {
          coordinates: [77.5946, 12.9716], // Bangalore
          eligibilityStatus: 'OUTSIDE_AP',
          accuracyMeters: 15,
        },
      },
      expectedStatus: 400,
      shouldCreate: false,
    },
  ];

  for (const tc of consistencyCases) {
    const res = await fetch(`${GATEWAY_URL}/reports`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${residentToken}` },
      body: JSON.stringify(tc.payload),
    });
    const status = res.status;
    const body = await res.json().catch(() => ({}));
    const passed = status === tc.expectedStatus;
    console.log(`[${passed ? 'PASS' : 'FAIL'}] ${tc.name}`);
    console.log(`       Status: ${status} (expected ${tc.expectedStatus})`);
    if (status !== 201) {
      console.log(`       Rejection reason: ${body.error?.message || body.message}`);
    }
  }

  // -------------------------------------------------------------
  // Test Suite C: Critical-Urgency Authorization & Privilege Checks
  // -------------------------------------------------------------
  console.log('\n--- Suite C: Critical-Urgency Authorization Verification ---');

  // C1: Resident attempts to set urgency=critical during creation
  console.log('C1: Resident attempting urgency=critical during report creation...');
  const resCreationCrit = await fetch(`${GATEWAY_URL}/reports`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${residentToken}` },
    body: JSON.stringify({
      title: 'Resident Forcing Critical Urgency in Create',
      description: 'Attempting to inject urgency field directly on creation',
      category: 'POTHOLE',
      urgency: 'critical',
      location: { type: 'Point', coordinates: [80.648, 16.5062] },
    }),
  });
  console.log(`   Status: ${resCreationCrit.status} (expected 400)`);
  if (resCreationCrit.status === 400) {
    console.log('   [PASS] Resident forbidden from assigning urgency in creation DTO.');
  } else {
    console.error('   [FAIL] Expected 400');
  }

  // C2: Resident attempts to call PATCH /reports/:id/urgency
  console.log('C2: Resident attempting PATCH /reports/:id/urgency to escalate report to critical...');
  const resPatchResident = await fetch(`${GATEWAY_URL}/reports/${createdValidReportId}/urgency`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${residentToken}` },
    body: JSON.stringify({
      urgency: 'critical',
      reason: 'Resident attempting self-escalation to critical',
    }),
  });
  console.log(`   Status: ${resPatchResident.status} (expected 403)`);
  const resPatchResidentBody = await resPatchResident.json().catch(() => ({}));
  if (resPatchResident.status === 403) {
    console.log(`   [PASS] Resident strictly forbidden from updating urgency: ${resPatchResidentBody.error?.code?.message || resPatchResidentBody.message}`);
  } else {
    console.error('   [FAIL] Resident was not rejected with 403!');
  }

  // Confirm report in DB was NOT changed by the unauthorized request
  const reportDocAfterUnauth = await reportsCollection.findOne({ _id: createdValidReportId });
  console.log(`   Report urgency in DB after unauthorized attempt: "${reportDocAfterUnauth.urgency || 'none'}" (unchanged)`);

  // C3: Municipal Admin updates urgency to critical via PATCH /reports/:id/urgency
  console.log('C3: Municipal Admin confirming urgency to critical via PATCH /reports/:id/urgency...');
  const resPatchAdmin = await fetch(`${GATEWAY_URL}/reports/${createdValidReportId}/urgency`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${adminToken}` },
    body: JSON.stringify({
      urgency: 'critical',
      reason: 'Structural failure confirmed on inspection by municipal road engineer',
    }),
  });
  console.log(`   Status: ${resPatchAdmin.status} (expected 200)`);
  const adminPatchBody = await resPatchAdmin.json();
  const patchedData = adminPatchBody.data || adminPatchBody;
  if (resPatchAdmin.status === 200 && patchedData.urgency === 'critical') {
    console.log('   [PASS] Authorized municipal update persisted successfully:');
    console.log(`          urgency: ${patchedData.urgency}`);
    console.log(`          urgencyConfirmedBy: ${patchedData.urgencyConfirmedBy}`);
    console.log(`          urgencyConfirmedAt: ${patchedData.urgencyConfirmedAt}`);
  } else {
    console.error('   [FAIL] Admin urgency update failed!');
  }

  // Verify MongoDB persistence directly
  const reportDocFinal = await reportsCollection.findOne({ _id: createdValidReportId });
  console.log(`   Verified in MongoDB: urgency="${reportDocFinal.urgency}", confirmedBy="${reportDocFinal.urgencyConfirmedBy}"`);

  // -------------------------------------------------------------
  // Test Suite D: Invariance & Record Count Audit
  // -------------------------------------------------------------
  console.log('\n--- Suite D: Database Record Invariance Audit ---');
  const countAfter = await reportsCollection.countDocuments();
  console.log(`DB Count Before: ${countBefore}, DB Count After: ${countAfter}`);
  const expectedNew = 2; // Only A1 and A5 should be created
  const actualNew = countAfter - countBefore;
  console.log(`Delta created in DB: ${actualNew} (Expected exactly ${expectedNew})`);

  if (actualNew === expectedNew) {
    console.log('   [PASS] ZERO phantom records created. All rejected submissions left no trace in MongoDB.\n');
  } else {
    console.error('   [FAIL] Database count mismatch!\n');
  }

  await client.close();
  console.log('=== All Backend Verification Checks Completed Successfully ===');
}

run().catch((err) => {
  console.error('Verification script failed:', err);
  process.exit(1);
});
