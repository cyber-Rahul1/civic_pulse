import { MongoClient } from 'mongodb';

async function update() {
  const uri = 'mongodb://civic_reports_user:reports_dev_secret@localhost:27018/civic_reports?authSource=civic_reports';
  const client = new MongoClient(uri);
  await client.connect();
  const db = client.db('civic_reports');

  // Visakhapatnam report -> RESOLVED (Green)
  const res1 = await db.collection('reports').updateOne(
    { _id: '930251b6-bca1-4135-a371-e71e73370d04' },
    { $set: { status: 'RESOLVED', updatedAt: new Date(), resolvedAt: new Date() } }
  );
  console.log('Visakhapatnam report RESOLVED:', res1.modifiedCount);

  // Kurnool public safety report -> 48h old (Red overdue critical)
  const twoDaysAgo = new Date(Date.now() - 48 * 3600 * 1000);
  const res2 = await db.collection('reports').updateOne(
    { _id: '02143c07-1e1e-4586-bbda-57ce12953193' },
    { $set: { createdAt: twoDaysAgo, updatedAt: twoDaysAgo } }
  );
  console.log('Kurnool report made 48h overdue:', res2.modifiedCount);

  await client.close();
}

update().catch(console.error);
