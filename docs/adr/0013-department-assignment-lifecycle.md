# ADR 0013: Department Assignment Lifecycle and Cross-Service Consistency

## Status
Accepted

## Context
When civic issues are submitted, verified municipal authorities and administrators need to assign issues to specific departments (e.g., Department of Transportation, Public Works, Water Board) for resolution and triage.

Key concerns:
1. Cross-service database isolation (Authority Service cannot directly update the Reports database).
2. Report status lifecycle separation (assignment does not automatically resolve a report or violate the Reports state machine).
3. Accountability and historical assignment tracking.

## Decisions
1. **Department Data Ownership**:
   - The Authority Service owns municipal departments (`departments` collection in `civic_authority`).
   - Unique compound constraint on `(name, jurisdiction)`.
2. **Assignment Records**:
   - Stored in `report_assignments` collection in `civic_authority`.
   - When a report is assigned or reassigned, previous active assignments transition to `REASSIGNED`, preserving complete audit history.
   - Assignment requires either `authority` or `admin` role. Ordinary residents are strictly forbidden (`HTTP 403`).
3. **Cross-Service Validation**:
   - Authority Service calls Reports Service via internal HTTP endpoint `GET /api/v1/internal/reports/:id/exists` before accepting an assignment.
4. **Public Accountability View**:
   - `GET /reports/:id/assignments/public` returns sanitized current department information and assignment history count without leaking internal staff contact details or private notes.
5. **Separation from Report Resolution**:
   - Report status transitions remain exclusively governed by the Reports Service state machine (`SUBMITTED -> UNDER_REVIEW -> IN_PROGRESS -> RESOLVED`). Department assignment records routing responsibility without falsely claiming automatic closure.

## Consequences
- Clean separation of concerns between issue reporting and organizational routing.
- Reassignments maintain full historical accountability.
