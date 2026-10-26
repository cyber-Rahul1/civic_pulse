import { MongoClient } from 'mongodb';
import { hashPassword } from '@civic-pulse/nest-common';

async function seedAdmin() {
  const c = new MongoClient('mongodb://civic_identity_user:identity_dev_secret@localhost:27018/civic_identity?authSource=civic_identity');
  await c.connect();
  const db = c.db('civic_identity');
  const hash = await hashPassword('AdminPassword123!');
  await db.collection('users').updateOne(
    { email: 'admin@civicpulse.org' },
    {
      $set: {
        _id: 'civic-pulse-super-admin-01',
        email: 'admin@civicpulse.org',
        passwordHash: hash,
        displayName: 'CivicPulse Municipal Admin',
        role: 'admin',
        status: 'active',
        emailVerified: true,
        updatedAt: new Date(),
        createdAt: new Date(),
      },
    },
    { upsert: true }
  );
  console.log('Admin account ready: admin@civicpulse.org / AdminPassword123!');
  await c.close();
}

seedAdmin().catch(console.error);
