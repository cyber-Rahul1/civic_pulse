# ADR 002: Service-Owned Logical MongoDB Databases and Isolation

## Status
Accepted

## Context
A major anti-pattern in distributed architectures is the "distributed monolith", where separate services connect directly to a single shared database or query tables owned by another service. This causes database schema coupling and race conditions.

## Decision
1. **Isolated Logical Databases**: Each microservice strictly owns a separate logical database (e.g. `civic_identity`, `civic_reports`).
2. **Least-Privilege Scoped Credentials**: Each service connects with dedicated credentials authorized only for its own logical database. Cross-database queries are rejected at the MongoDB authorization layer.
3. **No Cross-Service Database Sharing**: No service may read or write directly to another service's database collections.
4. **Data Sync via Events**: Data replication occurs exclusively via typed domain events (`DomainEvent<T>`). Shared database models or ORM entities in shared packages are forbidden.

## Consequences
- **Positive**: Complete loose coupling. Any service can evolve or refactor its internal schema without coordinating with or breaking other services.
- **Positive**: Security boundary enforcement prevents data leakage.
- **Negative**: Queries requiring cross-context aggregations require event-driven projection tables or API composition.
