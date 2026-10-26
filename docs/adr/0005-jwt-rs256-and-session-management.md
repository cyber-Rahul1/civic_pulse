# ADR 005: Asymmetric RS256 JWT Authentication, Session Management and Token Rotation

## Status
Accepted

## Context
In CivicPulse, users authenticate at the API Gateway / Identity Service and subsequently interact with multiple microservices. 
Using symmetric secrets (e.g. HS256) requires distributing the shared secret to all verifying microservices, creating high exposure risk: if any downstream service is compromised, malicious actors can forge valid tokens for any user or role.
Furthermore, persistent logins require a mechanism to obtain new access tokens without requiring the user to constantly enter credentials, but long-lived access tokens represent an intolerable risk if leaked.

## Decision
1. **Asymmetric RS256 JWTs**:
   - The **Identity Service** exclusively owns and retains the private RSA key (`PRIVATE_KEY_PEM`), which is never shared, committed to Git, or exposed to the gateway or other services.
   - Downstream services (and the API Gateway) verify tokens locally using the corresponding public RSA key (`PUBLIC_KEY_PEM`) or JWKS endpoint.
   - Every token contains a Key ID (`kid`), issuer (`civic-pulse:identity`), and audience (`civic-pulse:api`).
2. **Short-Lived Access Tokens**:
   - Access tokens have a lifetime of **15 minutes** (configurable via `JWT_ACCESS_EXPIRATION_SECONDS=900`).
   - Verification is performed purely locally via cryptographic public-key validation (signature, expiry, audience, issuer) without per-request database lookups.
3. **Cryptographically Secure Refresh Token Rotation**:
   - Refresh tokens are 256-bit cryptographically secure random opaque strings (using `crypto.randomBytes(32).toString('hex')`).
   - Refresh tokens are stored **exclusively in SHA-256 hashed form** in the Identity Service's database (`session_tokens` collection) along with an associated `sessionId` and token family tracker. Plaintext tokens are never stored.
   - Refresh tokens are strictly single-use. When `/api/v1/auth/refresh` is called:
     - The current refresh token is marked as consumed/rotated.
     - A new refresh token is issued and its hash is persisted.
     - If a previously rotated or revoked refresh token is presented (reuse detection), the entire session family is instantly revoked, mitigating token theft and replay attacks.
4. **Revocation & Logout (Phase 3.3 & 3.4 Hardened)**:
   - **Distinction of Guarantees**:
     1. **Refresh Token / Session Revocation**: Immediate. All active refresh tokens belonging to the session (on logout) or user (on logout-all, role elevation, or role demotion) are marked revoked in MongoDB and rejected on refresh attempts.
     2. **Privileged Access-Token Invalidation**: Immediate (sub-second) across all microservices. When a user role changes (promotion or demotion), `logoutAll` is triggered, or explicit `logout` occurs:
        - Revocation markers are security state and MUST NOT be silently evicted under memory pressure. The dedicated Redis revocation instance is configured with `maxmemory-policy: noeviction` and append-only persistence (`--appendonly yes`).
        - Revocation is ordered **Redis-first**: Identity Service writes revocation markers to Redis before mutating permissions in MongoDB. If the Redis write fails, the operation aborts and fails closed (HTTP 500), preventing unrevocable permission grants.
        - **Durable Write Guarantee via WAITAOF (Phase 3.4)**: Under standard `appendfsync everysec`, acknowledged Redis writes reside in an OS write buffer for up to 1 second prior to fsync, risking loss during abrupt hardware/container crashes. Identity Service's `RevocationRegistryService` invokes `WAITAOF 1 0 1000` (Redis 7.2+) immediately after recording revocation markers (`revocation:user:*`, `revocation:uversion:*`, `revocation:sess:*`). This ensures revocation markers are durably synchronized to the persistent disk log (AOF on Docker persistent volume `civic_pulse_redis_data`) before the operation completes.
        - **Deployment Topology Limitation**: The current container environment runs a single Redis 7.2 instance (`role:master`, `connected_slaves:0`). Replication failover does not exist in local standalone Docker Compose; production deployments requiring HA must deploy Redis Sentinel or Redis Cluster with replica quorum.
        - **Eliminating Same-Second Ambiguity**: JWT access tokens carry a monotonic `tokenVersion` claim alongside `iat`. On user role modification or `logoutAll`, `tokenVersion` is incremented and written to Redis as `revocation:uversion:${userId}`. Any token with `token.tokenVersion < minRequiredVersion` is immediately rejected, completely eliminating timestamp granularity collisions when token issuance and revocation happen within the same integer second.
        - Every microservice validating privileged actions (`AUTHORITY`, `ADMIN`, `MODERATOR`) invokes `TokenRevocationChecker` (integrated within `RolesGuard` and `IdentityJwtAuthGuard`).
        - If `token.tokenVersion < minVersion`, `token.iat < revocationTimestamp`, or the specific `sessionId` is marked revoked, the request is immediately rejected with HTTP 401 Unauthorized.
     3. **Unprivileged Resident Access Tokens**: Expire naturally according to their short-lived 15-minute window (`JWT_ACCESS_EXPIRATION_SECONDS=900`), avoiding Redis round-trips for standard high-volume resident read traffic while maintaining high throughput. For resident tokens, logout revokes the server session and refresh token immediately, preventing new tokens from being issued, while existing stateless access tokens cannot be used for any privileged action and lapse upon expiration.
     4. **Fail-Closed Availability Policy**:
        - If Redis becomes unavailable, restarts, or fails to respond, all privileged endpoints (`AUTHORITY`, `ADMIN`, `MODERATOR`) **fail-closed** and reject requests with HTTP 401 Unauthorized (`Revocation status store unavailable for privileged action`).
        - Unprivileged resident requests continue operating via local stateless cryptographic RS256 validation.

5. **Role-Based Access Control (RBAC)**:
   - Roles: `RESIDENT`, `AUTHORITY`, `MODERATOR`, `ADMIN`.
   - Public registration defaults strictly to `RESIDENT`. Privileged roles cannot be self-assigned during registration.

## Consequences
- **Positive**: Strict least privilege; private signing key is never exposed.
- **Positive**: High throughput; unprivileged resident traffic verifies access tokens statelessly without database bottlenecks.
- **Positive**: Zero revocation delay for privileged actions; demoted authorities or compromised accounts lose administrative access immediately.
- **Positive**: Security state is protected against cache eviction via `noeviction` policy and verified AOF durability across abrupt container restarts.
- **Positive**: Same-second revocation ambiguity is eliminated through monotonic `tokenVersion` checking.
- **Positive**: Fail-closed security architecture prevents unauthorized operations during infrastructure outages or Redis write failures.
- **Positive**: Single-use refresh token rotation with automated reuse detection prevents replay attacks.
- **Negative**: Requires key-pair management; handled by automated key-pair generation scripts for local development and secure secrets management in production.
- **Constraint**: In standalone Redis deployments (dev/single-node), durability relies on local disk fsync via `WAITAOF 1 0`. Zero-loss multi-node failover requires Redis 7.2+ replication with `WAIT` / `WAITAOF` configured for replica acknowledgment.
