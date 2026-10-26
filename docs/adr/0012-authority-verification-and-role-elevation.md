# ADR 0012: Authority Verification Workflow and Controlled Role Elevation

## Status
Accepted

## Context
A user claiming to represent a municipal department or government agency cannot be granted authority privileges automatically upon registration or via client-supplied request bodies. Privileged roles (`authority`, `admin`, `moderator`) must be strictly governed to protect municipal integrity.

## Decisions
1. **Two-Phase Authority Onboarding**:
   - Step 1: Resident submits an authority verification application (`POST /api/v1/authority/applications`) with organization, department requested, official role, official email, and credentials. Application begins in `PENDING` status.
   - Step 2: An authorized platform administrator reviews the application (`POST /api/v1/authority/applications/:id/review`).
2. **Safeguard Against Self-Approval & Idempotency**:
   - The reviewing administrator cannot be the applicant (`applicantUserId !== reviewerUserId`), returning HTTP 403 Forbidden.
   - Re-review of already approved or rejected applications is prohibited (HTTP 400).
3. **Least-Privilege Scoped S2S Role Elevation**:
   - The internal role elevation endpoint (`POST /api/v1/auth/internal/users/:id/role`) enforces caller service identity (`x-internal-service-name: authority-service`) in addition to `x-internal-service-token`.
   - The API Gateway strictly forbids client ingress to any `/internal/` route (HTTP 404) and strips untrusted client-supplied headers.
4. **Failure Recovery and Reconciliation (Phase 3.1)**:
   - When an application is approved, the Authority Service records `roleGranted: boolean` and optional `roleGrantError: string`.
   - If the downstream Identity Service call fails or times out, the application records `status: APPROVED, roleGranted: false` without losing review state.
   - A safe, idempotent reconciliation mechanism (`reconcilePendingRoleGrants()`, exposed via `POST /api/v1/authority/applications/reconcile-role-grants`) retries failed role grants without granting roles to rejected or ineligible applicants.
5. **JWT Role Freshness & Invalidation**:
   - Existing 15-minute access tokens carry their originally signed role claims (`resident`).
   - Role updates in `identity-service` automatically invalidate existing refresh sessions, requiring users to authenticate or refresh to mint new tokens carrying elevated claims or enforcing demotion.

## Consequences
- No private RS256 signing keys are shared with the Authority Service.
- Gateway blocks public ingress to internal endpoints; request-body secrets cannot bypass authentication.
- Single-instance / standalone MongoDB failure scenarios between microservices are safely reconcilable.
- An immutable audit trail of who reviewed each application, when, and role grant status is persisted.
