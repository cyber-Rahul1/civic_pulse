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
4. **Revocation & Logout**:
   - `/api/v1/auth/logout`: Revokes the specific active session and all its associated refresh tokens.
   - `/api/v1/auth/logout-all`: Revokes all active sessions for the user.
   - Access tokens remaining within their short 15-minute window expire naturally; for high-security actions or account suspension, services query a Redis revocation blacklist if required.
5. **Role-Based Access Control (RBAC)**:
   - Roles: `RESIDENT`, `AUTHORITY`, `MODERATOR`, `ADMIN`.
   - Public registration defaults strictly to `RESIDENT`. Privileged roles cannot be self-assigned during registration.

## Consequences
- **Positive**: Strict least privilege; private signing key is never exposed.
- **Positive**: High throughput; services verify access tokens locally without database bottlenecks.
- **Positive**: Single-use refresh token rotation with automated reuse detection prevents replay attacks.
- **Negative**: Requires key-pair management; handled by automated key-pair generation scripts for local development and secure secrets management in production.
