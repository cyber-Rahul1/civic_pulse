# ADR 004: Standardized REST APIs, OpenAPI Contracts and Observability

## Status
Accepted

## Context
A heterogeneous microservices landscape without strict communication and tracing standards results in inconsistent response models, untraceable errors across distributed calls, and out-of-sync documentation.

## Decision
1. **Standardized Response Envelope**: All REST endpoints return the `ApiResponse<T>` envelope containing `success`, `statusCode`, `data`, `error`, and `meta`.
2. **Correlation ID Tracing**: An `x-correlation-id` header is attached at the Edge Gateway and propagated through all Fastify requests, Pino structured logs, error responses, and domain events.
3. **Automated OpenAPI / Swagger**: Every service mounts interactive OpenAPI documentation at `/api/docs`.
4. **Structured Logging**: Services utilize Pino for low-overhead JSON-structured logging with context and timestamps.

## Consequences
- **Positive**: Frontends (React Native mobile app) and API Gateways handle unified error and data envelopes.
- **Positive**: End-to-end distributed tracing across microservices.
- **Positive**: OpenAPI specifications can be used to generate client SDKs automatically.
