import { EventTopic, DomainEvent } from '@civic-pulse/contracts';

/**
 * BullMQ Worker Dispatcher Foundation
 * In Phase 1+, this worker polls/tails the MongoDB outbox collection
 * and reliably dispatches domain events to Redis queues.
 */
export interface DispatcherJobData {
  topic: EventTopic;
  event: DomainEvent;
}

export const WORKER_NAME = 'CivicEventDispatcherWorker';
