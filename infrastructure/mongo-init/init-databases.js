/**
 * CivicPulse MongoDB Logical Databases and Users Initialization
 */

const services = [
  { db: 'civic_identity', user: 'civic_identity_user', pwd: 'identity_dev_secret' },
  { db: 'civic_reports', user: 'civic_reports_user', pwd: 'reports_dev_secret' },
  { db: 'civic_community', user: 'civic_community_user', pwd: 'community_dev_secret' },
  { db: 'civic_authority', user: 'civic_authority_user', pwd: 'authority_dev_secret' },
  { db: 'civic_moderation', user: 'civic_moderation_user', pwd: 'moderation_dev_secret' }
];

services.forEach((s) => {
  const targetDb = db.getSiblingDB(s.db);
  print(`[CivicPulse Init] Creating logical database and user for: ${s.db}`);

  targetDb.createUser({
    user: s.user,
    pwd: s.pwd,
    roles: [
      { role: 'readWrite', db: s.db }
    ]
  });

  // Create an initial collection to materialize the logical database
  targetDb.createCollection('_meta');
  targetDb._meta.insertOne({
    service: s.db,
    initializedAt: new Date().toISOString(),
    schemaVersion: '1.0.0'
  });
});

print('[CivicPulse Init] Completed isolated database and user initialization.');
