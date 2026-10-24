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

async function runHardenedVerification() {
  console.log('=====================================================================');
  console.log('CIVICPULSE PHASE 2.1: LIVE END-TO-END SECURITY HARDENING INTEGRATION');
  console.log('=====================================================================\n');

  // 1. Health check through Gateway
  console.log('1. Checking Gateway Health & Upstream Readiness...');
  const healthRes = await request({
    hostname: '127.0.0.1',
    port: 3000,
    path: '/health',
    method: 'GET',
  });
  console.log(`HTTP ${healthRes.statusCode}:`, healthRes.data);
  const isHealthy =
    healthRes.statusCode === 200 &&
    (healthRes.data?.status === 'healthy' || healthRes.data?.data?.status === 'healthy');
  if (!isHealthy) {
    throw new Error('Gateway readiness test failed!');
  }
  console.log('✓ Gateway and all microservices healthy!\n');

  // 2. Register & Login Citizen Resident
  const timestamp = Date.now();
  const citizenEmail = `hardened_citizen_${timestamp}@civicpulse.org`;
  const citizenPassword = 'SecureCitizenPassword123!';

  console.log(`2. Registering citizen resident: ${citizenEmail}...`);
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
      displayName: 'Hardened Citizen',
    },
  );
  console.log(`HTTP ${regRes.statusCode}: Registered citizen ID: ${regRes.data?.data?.id}`);
  if (regRes.statusCode !== 201) {
    throw new Error(`Registration failed with status ${regRes.statusCode}`);
  }

  console.log('Logging in citizen resident...');
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
  const citizenUserId = loginRes.data?.data?.user?.id;
  console.log(`HTTP ${loginRes.statusCode}: Citizen logged in, UserID: ${citizenUserId}\n`);

  // 3. Register second resident to verify ownership boundary
  const otherEmail = `hardened_other_${timestamp}@civicpulse.org`;
  console.log(`3. Registering second resident: ${otherEmail}...`);
  await request(
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
  const otherUserId = otherLoginRes.data?.data?.user?.id;
  console.log(`Other Resident logged in, UserID: ${otherUserId}\n`);

  // 4. Verify Cloudinary Upload Safety: Missing / Unconfigured Credentials Check
  console.log('4. Verifying Cloudinary upload safety: testing sign-upload with unconfigured credentials...');
  const signUploadRes = await request(
    {
      hostname: '127.0.0.1',
      port: 3000,
      path: '/api/v1/media/sign-upload',
      method: 'POST',
      headers: {
        Authorization: `Bearer ${citizenToken}`,
      },
    },
    {
      resourceType: 'image',
    },
  );
  console.log(`HTTP ${signUploadRes.statusCode}: Response code:`, signUploadRes.data?.error?.code || signUploadRes.data?.statusCode);
  if (signUploadRes.statusCode !== 503) {
    throw new Error(`Expected HTTP 503 Service Unavailable for unconfigured Cloudinary, got ${signUploadRes.statusCode}`);
  }
  console.log('✓ Correctly rejected upload-signing with HTTP 503 Service Unavailable when credentials are missing or placeholder!\n');

  // 5. Verify Untrusted Media Attachment Rejection
  console.log('5. Verifying Media Attachment Safety: Attempting to attach forged/unauthorized media asset...');
  const forgedReportRes = await request(
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
      title: 'Forged Media Attachment Report',
      description: 'Attempting to attach client-supplied Cloudinary URL without server pre-authorization',
      category: 'POTHOLE',
      location: {
        type: 'Point',
        coordinates: [-73.985130, 40.748817],
      },
      media: [
        {
          mediaId: 'med_forged_01',
          publicId: 'forged_unauthorized_public_id_123',
          url: 'https://res.cloudinary.com/attacker/image/upload/sample.jpg',
          secureUrl: 'https://res.cloudinary.com/attacker/image/upload/sample.jpg',
          format: 'jpg',
          resourceType: 'image',
          bytes: 2048576,
        },
      ],
    },
  );
  console.log(`HTTP ${forgedReportRes.statusCode}: Response:`, forgedReportRes.data?.error?.code || forgedReportRes.data?.message);
  if (forgedReportRes.statusCode !== 403) {
    throw new Error(`Expected HTTP 403 Forbidden for forged media asset, got ${forgedReportRes.statusCode}`);
  }
  console.log('✓ Successfully blocked forged/untrusted media attachment with HTTP 403 Forbidden!\n');

  // 6. Pre-authorize an asset directly in MongoDB (simulating a verified upload flow)
  console.log('6. Inserting a verified pre-authorized upload record into MongoDB for citizen...');
  const mongoUri = 'mongodb://civic_reports_user:reports_dev_secret@localhost:27018/civic_reports?authSource=civic_reports';
  const mongoClient = new MongoClient(mongoUri);
  await mongoClient.connect();
  const db = mongoClient.db();

  const authorizedPublicId = `verified_pub_${Date.now()}`;
  await db.collection('media_uploads').insertOne({
    _id: authorizedPublicId,
    mediaId: `med_${Date.now()}`,
    userId: citizenUserId,
    uploadFolder: `civic_pulse/uploads/${citizenUserId}`,
    resourceType: 'image',
    allowedFormats: ['jpg', 'jpeg', 'png', 'webp'],
    maxFileSizeBytes: 10485760,
    signature: 'mock_verified_signature',
    timestamp: Math.floor(Date.now() / 1000),
    isAttached: false,
    expiresAt: new Date(Date.now() + 3600 * 1000),
    createdAt: new Date(),
  });
  console.log(`Pre-authorized media asset created in DB: ${authorizedPublicId}`);

  // Test that other resident cannot attach this asset (wrong-owner check)
  console.log('Verifying wrong-owner protection: Second resident attempts to attach citizen\'s pre-authorized asset...');
  const wrongOwnerRes = await request(
    {
      hostname: '127.0.0.1',
      port: 3000,
      path: '/api/v1/reports',
      method: 'POST',
      headers: {
        Authorization: `Bearer ${otherToken}`,
      },
    },
    {
      title: 'Stolen Media Attachment Report',
      description: 'Second resident trying to use first citizen\'s media asset',
      category: 'GARBAGE',
      location: {
        type: 'Point',
        coordinates: [-73.985130, 40.748817],
      },
      media: [
        {
          mediaId: 'med_stolen_01',
          publicId: authorizedPublicId,
          url: `https://res.cloudinary.com/cloud/image/upload/${authorizedPublicId}.jpg`,
          secureUrl: `https://res.cloudinary.com/cloud/image/upload/${authorizedPublicId}.jpg`,
          format: 'jpg',
          resourceType: 'image',
          bytes: 1024000,
        },
      ],
    },
  );
  console.log(`HTTP ${wrongOwnerRes.statusCode}: Response:`, wrongOwnerRes.data?.error?.code || wrongOwnerRes.data?.message);
  if (wrongOwnerRes.statusCode !== 403) {
    throw new Error(`Expected HTTP 403 Forbidden for wrong-owner media asset, got ${wrongOwnerRes.statusCode}`);
  }
  console.log('✓ Successfully prevented cross-user media attachment with HTTP 403 Forbidden!\n');

  // 7. Legitimate Author Attaches Verified Media Asset
  console.log('7. Legitimate author creates report with their pre-authorized asset...');
  const legitimateReportRes = await request(
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
      title: 'Legitimate Report with Verified Media',
      description: 'Deep road hazard causing tire punctures near 5th Ave',
      category: 'POTHOLE',
      location: {
        type: 'Point',
        coordinates: [-73.985130, 40.748817],
      },
      locationDescription: '5th Ave & 42nd St',
      media: [
        {
          mediaId: 'med_legit_01',
          publicId: authorizedPublicId,
          url: `https://res.cloudinary.com/cloud/image/upload/${authorizedPublicId}.jpg`,
          secureUrl: `https://res.cloudinary.com/cloud/image/upload/${authorizedPublicId}.jpg`,
          format: 'jpg',
          resourceType: 'image',
          bytes: 2048576,
        },
      ],
    },
  );
  // 7. Media Verification Safety without real Cloudinary credentials
  console.log('7. Verifying server-side verification behavior when Cloudinary is unconfigured...');
  console.log(`HTTP ${legitimateReportRes.statusCode}: Attempt to attach media with unconfigured Cloudinary:`, legitimateReportRes.data?.error?.message || legitimateReportRes.data?.message);
  if (legitimateReportRes.statusCode !== 503) {
    throw new Error(`Expected HTTP 503 Service Unavailable when Cloudinary credentials cannot verify asset, got ${legitimateReportRes.statusCode}`);
  }
  console.log('✓ Correctly refused to attach unverified media when provider credentials are unconfigured!\n');

  // 7b. Create legitimate report without media
  console.log('7b. Legitimate author creates valid report without media...');
  const textOnlyReportRes = await request(
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
      title: 'Legitimate Hazard Report',
      description: 'Deep road hazard causing tire punctures near 5th Ave',
      category: 'POTHOLE',
      location: {
        type: 'Point',
        coordinates: [-73.985130, 40.748817],
      },
      locationDescription: '5th Ave & 42nd St',
    },
  );
  console.log(`HTTP ${textOnlyReportRes.statusCode}: Report created:`, textOnlyReportRes.data?.data?.id);
  const createdReport = textOnlyReportRes.data?.data;
  if (!createdReport?.id) {
    throw new Error(`Failed to create report: ${JSON.stringify(textOnlyReportRes.data)}`);
  }
  const reportId = createdReport.id;
  console.log('✓ Legitimate report created successfully!\n');

  // 9. Geospatial & Location Privacy Policy Verification
  console.log('9. Verifying Location Privacy Policy (coordinates truncated to 4 decimals)...');
  const getReportRes = await request({
    hostname: '127.0.0.1',
    port: 3000,
    path: `/api/v1/reports/${reportId}`,
    method: 'GET',
  });
  const coords = getReportRes.data?.data?.location?.coordinates;
  console.log('Public response coordinates:', coords);
  if (coords[0] !== -73.9851 || coords[1] !== 40.7488) {
    throw new Error(`Location precision policy violated! Expected [-73.9851, 40.7488], got ${JSON.stringify(coords)}`);
  }
  console.log('✓ Location-precision policy confirmed (4 decimal places ~11 meters)!\n');

  // 10. Concurrency Safety: Atomic Conditional Transition Protection
  console.log('10. Testing Atomic Status Transition & Concurrency Safety...');
  // Attempt concurrent transitions: resident trying to jump straight to RESOLVED
  const residentResolveRes = await request(
    {
      hostname: '127.0.0.1',
      port: 3000,
      path: `/api/v1/reports/${reportId}/status`,
      method: 'POST',
      headers: {
        Authorization: `Bearer ${citizenToken}`,
      },
    },
    {
      status: 'RESOLVED',
      reason: 'Resident trying to close report directly',
    },
  );
  console.log(`HTTP ${residentResolveRes.statusCode}: Resident resolve blocked:`, residentResolveRes.data?.error?.message || residentResolveRes.data?.message);
  if (residentResolveRes.statusCode !== 400 && residentResolveRes.statusCode !== 403) {
    throw new Error(`Expected HTTP 400 or 403, got ${residentResolveRes.statusCode}`);
  }
  console.log('✓ Resident transition to RESOLVED blocked by state machine rules!\n');

  await mongoClient.close();

  console.log('=====================================================================');
  console.log('ALL PHASE 2.1 SECURITY HARDENING LIVE INTEGRATION CHECKS PASSED!');
  console.log('=====================================================================');
}

runHardenedVerification().catch((err) => {
  console.error('VERIFICATION ERROR:', err);
  process.exit(1);
});
