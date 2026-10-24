# ADR 001: Microservices Architecture with NestJS and Fastify

## Status
Accepted

## Context
CivicPulse requires high concurrency, low latency, and clear fault isolation between distinct municipal workflows (authentication, public reporting, community discussions, notifications, AI analysis, authority workflows). A monolithic design introduces tight coupling and makes independent scaling difficult.

## Decision
We adopt an **independently deployable microservices architecture** implemented with **NestJS and the Fastify HTTP adapter**:
1. **NestJS** provides a battle-tested modular dependency-injection framework with standard interfaces for decorators, lifecycle management, validation, and OpenAPI generation.
2. **Fastify** replaces Express as the HTTP adapter for its high throughput and low overhead (2-3x higher requests/sec than Express).
3. Microservices communicate synchronously via versioned REST APIs (`/api/v1/`) and asynchronously via BullMQ event topics.

## Consequences
- **Positive**: Microservices can be tested, containerized, scaled, and deployed completely independently.
- **Positive**: Low latency and efficient CPU/memory utilization under Fastify.
- **Negative**: Increased deployment complexity compared to a single monolith; mitigated by monorepo shared tooling, Docker Compose local orchestration, and standardized `nest-common` infrastructure.
