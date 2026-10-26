import fetch from 'node-fetch';
import { MongoClient } from 'mongodb';

const GATEWAY_URL = 'http://127.0.0.1:3000/api/v1';
const MONGO_URI = 'mongodb://civic_reports_user:reports_dev_secret@localhost:27018/civic_reports?authSource=civic_reports';
const DB_NAME = 'civic_reports';

async function run() {
  console.log('=== CivicPulse API Gateway & Geo Validation Verification ===\n');

  // 1. Authenticate resident (register if needed)
  console.log('1. Authenticating test resident...');
  const regRes = await fetch(`${GATEWAY_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: 'resident.test@civicpulse.org',
      password: 'Password123!',
      displayName: 'Vijayawada Test Resident',
    }),
  });

  const loginRes = await fetch(`${GATEWAY_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: 'resident.test@civicpulse.org',
      password: 'Password123!',
    }),
  });

  if (!loginRes.ok) {
    throw new Error(`Login failed: ${loginRes.status} ${await loginRes.text()}`);
  }

  const loginData = await loginRes.json();
  const accessToken = loginData.data?.tokens?.accessToken || loginData.tokens?.accessToken || loginData.accessToken;
  console.log('Resident authenticated successfully. Token acquired.');

  const client = new MongoClient(MONGO_URI);
  await client.connect();
  const db = client.db(DB_NAME);
  const reportsCollection = db.collection('reports');

  const countBefore = await reportsCollection.countDocuments();
  console.log(`Current DB reports count before tests: ${countBefore}\n`);

  const testCases = [
    {
      name: 'Test 1: Valid AP Coordinates (Vijayawada Benz Circle)',
      payload: {
        title: 'Benz Circle Pothole Issue Verification',
        description: 'Road damage and potholes near Benz Circle flyover pillar 12',
        category: 'POTHOLE',
        location: {
          type: 'Point',
          coordinates: [80.648, 16.5062], // [lng, lat] inside AP
        },
        locationDescription: 'Benz Circle, Vijayawada Urban, NTR Dist, Andhra Pradesh',
      },
      expectedStatus: 201,
      shouldCreate: true,
    },
    {
      name: 'Test 2: Outside AP Coordinates (Bangalore, Karnataka)',
      payload: {
        title: 'Bangalore Road Damage Out of Scope',
        description: 'Pothole in Indiranagar Bangalore outside AP bounds',
        category: 'POTHOLE',
        location: {
          type: 'Point',
          coordinates: [77.5946, 12.9716], // [lng, lat] Bangalore
        },
        locationDescription: 'Indiranagar, Bangalore, Karnataka',
      },
      expectedStatus: 400,
      shouldCreate: false,
    },
    {
      name: 'Test 3: Outside AP Coordinates (Hyderabad, Telangana)',
      payload: {
        title: 'Hyderabad Water Leakage Issue',
        description: 'Water pipeline leak near Gachibowli Hyderabad',
        category: 'WATER',
        location: {
          type: 'Point',
          coordinates: [78.4867, 17.385], // [lng, lat] Hyderabad
        },
        locationDescription: 'Gachibowli, Hyderabad, Telangana',
      },
      expectedStatus: 400,
      shouldCreate: false,
    },
    {
      name: 'Test 4: Outside AP Coordinates (Chennai, Tamil Nadu)',
      payload: {
        title: 'Chennai Marina Beach Waste Issue',
        description: 'Garbage accumulation on Marina Beach promenade',
        category: 'GARBAGE',
        location: {
          type: 'Point',
          coordinates: [80.2707, 13.0827], // [lng, lat] Chennai
        },
        locationDescription: 'Marina Beach, Chennai, Tamil Nadu',
      },
      expectedStatus: 400,
      shouldCreate: false,
    },
    {
      name: 'Test 5: Border Validation - AP Side (Ichchapuram, Srikakulam)',
      payload: {
        title: 'Ichchapuram Border Gate Road Repair',
        description: 'Road damage near Ichchapuram AP checkpost border point',
        category: 'ROAD_DAMAGE',
        location: {
          type: 'Point',
          coordinates: [84.69, 19.11], // [lng, lat] AP border town
        },
        locationDescription: 'Checkpost Road, Ichchapuram, Srikakulam Dist, Andhra Pradesh',
      },
      expectedStatus: 201,
      shouldCreate: true,
    },
    {
      name: 'Test 6: Border Validation - Odisha Side across border (Berhampur / Gopalpur area)',
      payload: {
        title: 'Odisha Highway Pothole Beyond AP Border',
        description: 'Highway section 25km north of Ichchapuram inside Odisha',
        category: 'ROAD_DAMAGE',
        location: {
          type: 'Point',
          coordinates: [84.80, 19.32], // [lng, lat] Odisha side
        },
        locationDescription: 'National Highway near Berhampur, Odisha',
      },
      expectedStatus: 400,
      shouldCreate: false,
    },
    {
      name: 'Test 7: Invalid Latitude Out of Range (> 90)',
      payload: {
        title: 'Invalid Extreme Latitude Value',
        description: 'Testing server validation with latitude 95 degrees',
        category: 'OTHER',
        location: {
          type: 'Point',
          coordinates: [80.648, 95.0],
        },
      },
      expectedStatus: 400,
      shouldCreate: false,
    },
    {
      name: 'Test 8: Invalid Longitude Out of Range (> 180)',
      payload: {
        title: 'Invalid Extreme Longitude Value',
        description: 'Testing server validation with longitude 195 degrees',
        category: 'OTHER',
        location: {
          type: 'Point',
          coordinates: [195.0, 16.5],
        },
      },
      expectedStatus: 400,
      shouldCreate: false,
    },
    {
      name: 'Test 9: Invalid Malformed Coordinate Array',
      payload: {
        title: 'Malformed Location Coordinate Array',
        description: 'Testing server validation with 3 coordinates instead of 2',
        category: 'OTHER',
        location: {
          type: 'Point',
          coordinates: [80.648, 16.5, 50.0],
        },
      },
      expectedStatus: 400,
      shouldCreate: false,
    },
    {
      name: 'Test 10: Unauthorized Resident Escalation (Attempting CRITICAL urgency in creation)',
      payload: {
        title: 'Resident Attempting Direct Critical Urgency',
        description: 'Trying to force urgency field to critical as standard resident',
        category: 'POTHOLE',
        urgency: 'critical',
        location: {
          type: 'Point',
          coordinates: [80.648, 16.5062],
        },
      },
      expectedStatus: 400, // Rejection: class-validator forbids unauthorized extra fields
      shouldCreate: false,
    },
  ];

  let createdReportIds = [];

  for (const tc of testCases) {
    const res = await fetch(`${GATEWAY_URL}/reports`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(tc.payload),
    });

    const status = res.status;
    const body = await res.json().catch(() => ({}));
    const reportData = body.data || body;
    const reportId = reportData?.id;

    const passed = status === tc.expectedStatus;
    console.log(`[${passed ? 'PASS' : 'FAIL'}] ${tc.name}`);
    console.log(`       Status: ${status} (expected ${tc.expectedStatus})`);
    if (status !== 201) {
      console.log(`       Response error message: ${body.error?.message || body.message || JSON.stringify(body)}`);
    } else {
      console.log(`       Created Report ID: ${reportId}`);
      createdReportIds.push(reportId);
    }
    console.log('');
  }

  // Verify MongoDB database record count:
  const countAfter = await reportsCollection.countDocuments();
  console.log(`DB Count Before: ${countBefore}, DB Count After: ${countAfter}`);
  console.log(`Delta created in DB: ${countAfter - countBefore} (Expected exactly 2: Test 1 and Test 5)`);

  if (countAfter - countBefore === 2) {
    console.log('CONFIRMED: All rejected submissions created NO records in the database.\n');
  } else {
    console.error('FAILED: Extra records were created in the database for rejected submissions!\n');
  }

  // 11. Test resident attempting status update to UNDER_REVIEW directly (Permitted stage transition, but forbidden role)
  console.log('11. Testing Resident attempting unauthorized status change to UNDER_REVIEW...');
  const testRepId = createdReportIds[0];
  const updateRes = await fetch(`${GATEWAY_URL}/reports/${testRepId}/status`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      status: 'UNDER_REVIEW',
      reason: 'Resident attempting to self-escalate status',
    }),
  });
  console.log(`Status update response status: ${updateRes.status} (expected 403)`);
  const updateBody = await updateRes.json().catch(() => ({}));
  console.log(`Response error message: ${updateBody.error?.code?.message || updateBody.message || JSON.stringify(updateBody)}`);
  if (updateRes.status === 403) {
    console.log('CONFIRMED: Ordinary resident CANNOT update/escalate report status (403 Forbidden strictly enforced).\n');
  }

  await client.close();
  console.log('=== Backend API Verification Complete ===');
}

run().catch((err) => {
  console.error('Verification script failed:', err);
  process.exit(1);
});
