# ADR 008: Report Lifecycle State Machine and Authorization Rules

## Status
Accepted

## Context
Civic issue reports follow a strict lifecycle from initial citizen submission to official municipal resolution. Allowing arbitrary status changes causes confusion, permits unauthorized claim of resolution, and undermines accountability.

## Decision
1. **Explicit State Transitions**:
   - `SUBMITTED`: Initial status when created by an authenticated resident.
   - `UNDER_REVIEW`: Triage by an authority or moderator.
   - `IN_PROGRESS`: Assigned to department workers and remediation is underway.
   - `RESOLVED`: Work completed; must be verified by authority personnel with optional resolution notes/evidence.
   - `REJECTED`: Invalid, duplicate, or out-of-jurisdiction issue (authority/moderator action).
   - `REOPENED`: Resident or authority reopening an issue if resolution was inadequate.

2. **Transition Matrix**:
   - `SUBMITTED` -> `UNDER_REVIEW`, `REJECTED`
   - `UNDER_REVIEW` -> `IN_PROGRESS`, `REJECTED`
   - `IN_PROGRESS` -> `RESOLVED`, `REJECTED`
   - `RESOLVED` -> `REOPENED`
   - `REOPENED` -> `UNDER_REVIEW`, `IN_PROGRESS`
   - `REJECTED` -> `UNDER_REVIEW`

3. **Role-Based Transition Authorization**:
   - **Residents**: Can create reports (`SUBMITTED`), edit permitted fields (title, description, location description, media) while report is in `SUBMITTED`, and request `REOPENED` if a resolved issue recurs. Normal residents **cannot** move reports to `IN_PROGRESS`, `RESOLVED`, or `REJECTED`.
   - **Authority Verification Safeguard**: Until an external, verified authority onboarding and municipal credentialing workflow is implemented in Phase 4, privileged resolution and municipal stage transitions are restricted to verified administrative staff (`ADMIN` or `MODERATOR`). Unverified `AUTHORITY` tokens cannot unilaterally trigger privileged state changes.
   - **Atomic Conditional Updates & Concurrency Safety**:
     - Status updates use an atomic conditional database operation: `updateOne({ _id: id, status: expectedCurrentStatus }, { $set: ..., $push: { statusHistory: ... } })`.
     - If two concurrent requests attempt transitions from the same initial state, only one can match the status condition and succeed (`modifiedCount === 1`). The competing request receives a concurrency collision error (`HTTP 400 Bad Request`), preventing split-brain or incompatible state progressions.
   - **Audit Storage Guarantees & Limitations**:
     - Every status transition atomically appends an immutable record to `statusHistory` containing `transitionId`, `previousStatus`, `newStatus`, `actorUserId`, `actorRole`, `timestamp`, and `reason`.
     - *Security Notice*: Application-level append-only constraints protect against normal API misuse, but do not by themselves constitute tamper-proof or cryptographically sealed storage against direct administrative database access.

## Consequences
- **Positive**: Concurrency-safe transitions with zero possibility of split-brain status progressions.
- **Positive**: Complete audit trail of every status change linked to verified actor IDs.
- **Positive**: Unverified authority accounts cannot claim municipal resolution powers.
- **Negative**: Strict validation requires client awareness of legal next states and handling concurrency retry logic.
