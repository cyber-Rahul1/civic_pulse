/**
 * MongoDB Transactional Outbox Pattern Schema Specification
 *
 * Microservices persist domain state mutations and domain event messages atomically
 * in the same MongoDB transaction within the service's own logical database.
 * An asynchronous dispatcher (such as BullMQ worker or change stream tailer) reads
 * unpublished events and pushes them to Redis BullMQ queues with reliable delivery.
 */

export enum OutboxStatus {
  PENDING = 'pending',
  PUBLISHED = 'published',
  FAILED = 'failed',
}

export interface OutboxRecord<T = unknown> {
  _id: string; // Typically UUID or ObjectId
  topic: string;
  eventType: string;
  aggregateId: string;
  aggregateType: string;
  payload: T;
  correlationId: string;
  causationId?: string;
  status: OutboxStatus;
  retryCount: number;
  lastError?: string;
  createdAt: Date;
  updatedAt: Date;
  publishedAt?: Date;
}
