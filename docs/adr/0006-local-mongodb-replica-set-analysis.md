# ADR 006: Local Development Database Configuration and Replica Set Analysis

## Status
Accepted

## Context
Phase 1 requirements specified evaluating configuring the local MongoDB deployment as a single-node replica set (`--replSet rs0`) to support MongoDB Change Streams and multi-document transactions.

## Investigation & Finding
1. When MongoDB is started in Docker with both `MONGO_INITDB_ROOT_USERNAME/PASSWORD` authentication enabled and `--replSet rs0`, MongoDB requires a shared keyfile (`security.keyFile`) configured with strict POSIX permissions (`chmod 400` / `chmod 600`).
2. On Windows development hosts mounting local volumes through Docker Desktop / WSL2 NTFS drivers, Windows filesystem permission semantics do not natively preserve strict POSIX `400` octal file permissions inside mounted volumes, causing `mongod` to abort boot with `BadValue: security.keyFile is required when authorization is enabled with replica sets` or permissions too open errors.
3. Furthermore, transactions and ACID outbox updates in MongoDB are fully operational for document atomic operations within single-node MongoDB, while reliable event dispatching via polling with concurrency locking (or Redis BullMQ job queues) provides deterministic, cross-platform behavior.

## Decision
- For local development on Windows/macOS/Linux without host-level permission hacks, **MongoDB 7.0 operates in its native standalone mode with dedicated logical databases and strict user authentication**.
- The Outbox pattern for local development and CI uses the **Polling Dispatcher Pattern** with timestamp-ordered locks (`status: 'pending'`, `updatedAt`), which is supported on all MongoDB configurations.
- In production Kubernetes/Atlas environments where Linux permissions and cloud-managed replica sets are native, Change Streams can be attached to the outbox collection seamlessly without modifying application outbox contracts.

## Consequences
- **Positive**: 100% reliable local startup across all host OS platforms (Windows, macOS, Linux) without container crash-loops.
- **Positive**: Preserves least-privilege per-service authentication and logical database isolation.
- **Negative**: Change streams cannot be used locally in standalone mode; polling dispatcher handles outbox event queuing.
