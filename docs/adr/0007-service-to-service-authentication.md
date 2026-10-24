# ADR 007: Service-to-Service Authentication Foundation and Internal Header Sanitization

## Status
Accepted

## Context
In a microservices architecture, incoming client requests pass through the API Gateway before reaching downstream services. Additionally, microservices occasionally invoke each other.
Risks:
1. Malicious clients forging internal trust headers (e.g. `x-user-id`, `x-user-role`, `x-internal-service`).
2. Blindly trusting requests merely because they arrived over a local network or bridge interface.
3. Propagating raw citizen JWTs indiscriminately to internal-only endpoints.

## Decision
1. **API Gateway Ingress Sanitization**:
   - The API Gateway aggressively strips any incoming client headers matching `x-internal-*`, `x-user-id`, or `x-user-role` before proxying requests upstream.
   - Only the gateway's verified authentication and correlation middleware can set downstream contextual headers.
2. **Asymmetric RS256 Public Verification**:
   - For user-context endpoints, services verify the JWT locally using the Identity Service's public key (`PUBLIC_KEY_PEM`). The verified JWT claims (`sub`, `role`) are used—never untrusted headers.
3. **Internal Service Authentication (Phase 1 Foundation)**:
   - Internal service-to-service calls use a dedicated shared internal service secret (`INTERNAL_SERVICE_KEY`) passed in the `x-internal-service-token` header, verified by an `InternalServiceGuard`.
   - Downstream services check this guard on internal endpoints (such as health aggregation or admin sync).
   - In future phases, this will evolve to mTLS or short-lived service-to-service signed JWTs.

## Consequences
- **Positive**: Prevents header spoofing attacks from untrusted external clients.
- **Positive**: Strict decoupling—services verify cryptographic signatures rather than relying on perimeter security alone.
- **Positive**: Clear separation between public client authentication and internal service invocations.
