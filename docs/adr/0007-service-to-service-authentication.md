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
3. **Internal Service Authentication & Least-Privilege Role Elevation (Phase 3.2 Hardened)**:
   - Internal service-to-service calls require scoped credentials validated against permitted identity and operations:
     - General internal endpoints (e.g., report existence verification) use `INTERNAL_SERVICE_KEY`.
     - Highly sensitive operations (such as role elevation via `POST /internal/users/:id/role`) exclusively accept `AUTHORITY_INTERNAL_KEY`.
   - Identity Service rejects callers that possess `INTERNAL_SERVICE_KEY` or self-asserted `x-internal-service-name: authority-service` unless accompanied by the specific `AUTHORITY_INTERNAL_KEY`.
   - Production configuration rejects requests without configured secrets; no fallback to development secrets is allowed in production.
   - Public clients cannot route to `/internal/*` routes via the API Gateway (blocked with HTTP 404/403).
   - Direct service-to-service communication occurs directly over internal container/cluster networking without routing through public ingress.

4. **Credential Provisioning and Rotation**:
   - `AUTHORITY_INTERNAL_KEY` and `INTERNAL_SERVICE_KEY` are provisioned via secure secret managers (e.g. HashiCorp Vault, AWS Secrets Manager, or Kubernetes Secrets).
   - In development environments, secrets default to isolated dev values.
   - Rotation procedure:
     1. Deploy new credentials to Identity Service with a transition window accepting either old or new secret.
     2. Update calling services (Authority Service) with the new credential.
     3. Retire the old credential from Identity Service.

## Consequences
- **Positive**: Prevents header spoofing attacks from untrusted external clients.
- **Positive**: Strict decoupling—services verify cryptographic signatures rather than relying on perimeter security alone.
- **Positive**: Clear separation between public client authentication and internal service invocations.
- **Positive**: Least privilege enforced—compromise of standard `INTERNAL_SERVICE_KEY` does not permit unauthorized role elevation or account modification.
