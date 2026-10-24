# MongoDB Transactional Outbox & BullMQ Dispatcher Pattern

## 1. Problem Statement

In a microservices architecture, a service frequently needs to mutate its local database (e.g., store a new civic issue report in `civic_reports`) and publish a notification event to other services (e.g., `civic.reports.events`).

Directly writing to MongoDB and then publishing to Redis/BullMQ creates a classic **dual-write problem**:
- If the database write succeeds but the queue push fails (or the app crashes in between), other microservices will never know of the event.
- If Redis is updated first and the database transaction fails, downstream services process phantom data.
- Redis cannot serve as the durable system of record for critical state transitions.

---

## 2. Solution: The Transactional Outbox Pattern

```
[ HTTP Request: POST /api/v1/reports ]
                │
                ▼
      ┌─────────────────────────────┐
      │       Reports Service       │
      │  (MongoDB Client Session)   │
      └──────────────┬──────────────┘
                     │  Atomic Transaction:
                     │  1. Insert into 'reports'
                     │  2. Insert into 'outbox'
                     ▼
      ┌─────────────────────────────┐
      │   Logical MongoDB Database   │
      │   (Database: civic_reports) │
      │   ├── reports collection    │
      │   └── outbox collection     │
      └──────────────┬──────────────┘
                     │
                     │ (Poll / Change Stream)
                     ▼
      ┌─────────────────────────────┐
      │   Event Dispatcher Worker   │
      └──────────────┬──────────────┘
                     │
                     │ Reliable Queue Enqueue
                     ▼
      ┌─────────────────────────────┐
      │      Redis / BullMQ         │
      │  Queues: civic.reports.*    │
      └──────────────┬──────────────┘
                     │
                     ▼
  [ Downstream Consumers: Notifications, AI, Community ]
```

---

## 3. MongoDB Outbox Collection Schema

The `outbox` collection resides inside each service's own logical database:

```typescript
export interface OutboxRecord<T = unknown> {
  _id: string;              // UUIDv4
  topic: string;            // e.g. 'civic.reports.events'
  eventType: string;        // e.g. 'ReportCreated'
  aggregateId: string;      // e.g. reportId
  aggregateType: string;    // 'Report'
  payload: T;               // Strongly-typed event data
  correlationId: string;    // x-correlation-id for distributed tracing
  causationId?: string;     // ID of the event that caused this action
  status: 'pending' | 'published' | 'failed';
  retryCount: number;
  lastError?: string;
  createdAt: Date;
  updatedAt: Date;
  publishedAt?: Date;
}
```

### MongoDB Indexes for the Outbox Collection:
```javascript
db.outbox.createIndex({ status: 1, createdAt: 1 });
db.outbox.createIndex({ aggregateId: 1 });
```

---

## 4. Dispatcher Execution Lifecycle

1. **Transactional Insertion**:
   ```typescript
   const session = client.startSession();
   try {
     await session.withTransaction(async () => {
       await reportsCollection.insertOne(reportData, { session });
       await outboxCollection.insertOne(outboxRecord, { session });
     });
   } finally {
     await session.endSession();
   }
   ```
2. **Asynchronous Polling / Change Stream Dispatch**:
   The dispatcher worker periodically scans for `status: 'pending'` records with a concurrency lock (or consumes MongoDB Change Streams).
3. **Queue Publishing**:
   The dispatcher adds a BullMQ job to the Redis queue corresponding to `outboxRecord.topic`.
4. **Idempotency & Ack**:
   Once the BullMQ job is confirmed enqueued, the outbox record status is updated to `published` with `publishedAt = new Date()`.
   If a failure occurs, `retryCount` is incremented and an exponential backoff schedule is applied.
5. **Idempotent Consumers**:
   Downstream workers record processed `eventId`s in their local store to guarantee **at-least-once delivery with end-to-end idempotency**.
