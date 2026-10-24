# ADR 003: Reliable Asynchronous Job Processing via Outbox and BullMQ

## Status
Accepted

## Context
When microservices publish domain events, dual-writes between the database and the message broker can fail. Furthermore, Redis is an in-memory data store with optional persistence, and must not be the sole durable record of critical business state changes.

## Decision
1. **Transactional Outbox Pattern**: Services persist their internal entity mutations and outgoing domain events atomically within a single MongoDB transaction into a service-local `outbox` collection.
2. **BullMQ over Redis**: An asynchronous dispatcher worker reads pending outbox events and pushes them into Redis BullMQ queues.
3. **At-Least-Once Delivery & Idempotency**: Consumers verify processed event IDs to prevent duplicate processing. Redis serves as an ephemeral transport and scheduling broker, while MongoDB remains the durable system of record.

## Consequences
- **Positive**: Guaranteed delivery of domain events without dual-write inconsistencies.
- **Positive**: Resilient to Redis restarts and network partitions.
- **Negative**: Slight eventual consistency latency between write transaction and event publication.
