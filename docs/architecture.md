# CivicPulse System Architecture & Microservice Boundaries

## 1. Executive Summary

CivicPulse is an independently deployable microservices-based civic issue reporting, tracking, and municipal accountability platform. This document formally specifies the service boundaries, data ownership, integration protocols, and event-driven patterns.

---

## 2. Service Ownership Matrix

| Microservice | Bounded Context & Business Responsibility | Database Ownership | Downstream Event Publications |
|---|---|---|---|
| **Identity Service** | Citizen and official registration, authentication, RBAC (citizen, leader, staff, admin), profile management. | `civic_identity` | `civic.identity.events` (`UserRegistered`, `UserRoleChanged`) |
| **Reports Service** | Civic issue intake, lifecycle state machine (Submitted, Verified, In Triage, Assigned, In Progress, Resolved), geotagging, MongoDB Outbox dispatch. | `civic_reports` | `civic.reports.events` (`ReportCreated`, `ReportStatusUpdated`, `ReportEscalated`) |
| **Community Service** | Community engagement: report upvoting/verification endorsements, comments, public thread discussions. | `civic_community` | `civic.community.events` (`ReportEndorsed`, `CommentAdded`) |
| **Authority Service** | Municipal government integration: department directory, jurisdictional zones, SLA tracking, staff assignment, official resolution notes. | `civic_authority` | `civic.authority.events` (`ReportAssignedToDepartment`, `ResolutionSubmitted`) |
| **Media Service** | Secure media presigning, upload processing, image optimization, Cloudinary CDN asset management (Phase 2). | `civic_media` | `civic.media.events` (`MediaUploaded`, `MediaScanCompleted`) |
| **Notifications Service** | Multi-channel dispatch: Push (FCM), SMS, Email notifications driven by domain events. | `civic_notifications` | None (Terminal subscriber) |
| **AI Service** | Duplicate report clustering, category inference, automated severity assessment, offensive content detection. | Stateless / Vector index | `civic.ai.events` (`ReportClassified`, `DuplicateDetected`) |
| **Social Publishing Service** | Civic escalation: automated/manual syndication of unresolved issues to civic social channels (e.g. X/Twitter, FB). | `civic_social` | `civic.social.events` (`IssueSyndicated`) |
| **Moderation Service** | Community safety: report/comment moderation queues, inappropriate content flagging, audit log. | `civic_moderation` | `civic.moderation.events` (`ContentFlagged`, `ContentModerated`) |

---

## 3. Database Isolation Rules

1. **Strict Logical Isolation**: Every microservice owns a dedicated logical MongoDB database (e.g., `civic_identity`, `civic_reports`).
2. **Least-Privilege Scoped Credentials**: Each service connects with a dedicated MongoDB user who only possesses `readWrite` rights on their logical database.
3. **No Cross-Database Queries**: Direct queries across database names or cross-collection lookups are strictly blocked at the database authorization level and forbidden by architecture policy.
4. **Data Sync via Asynchronous Events**: Data required by other bounded contexts is replicated asynchronously through versioned domain events (`DomainEvent<T>`). No shared database models or shared ORM entities exist between services.

---

## 4. REST API Conventions

- **Version Prefix**: All public REST endpoints are explicitly prefixed with `/api/v1/`.
- **Envelope Standard**: All responses return a deterministic JSON envelope:
  ```json
  {
    "success": true,
    "statusCode": 200,
    "data": { ... },
    "error": null,
    "meta": {
      "timestamp": "2026-10-24T10:00:00.000Z",
      "correlationId": "8f8b8e0e-473d-4c54-b4a1-061bbfbb7a4f",
      "service": "identity-service",
      "version": "1.0.0"
    }
  }
  ```
- **Correlation ID Tracking**: Every request accepts or generates an `x-correlation-id` header that travels across logs, responses, error payloads, and outbox domain events.
- **OpenAPI / Swagger**: Every service automatically exposes OpenAPI v3 interactive docs at `/api/docs`.

---

## 5. Phase 2: Reports & Media Microservice

### 5.1 Bounded Context & Architecture
The `reports-service` manages civic issue reports from intake through resolution, geospatial queries, and presigned media uploads. It connects exclusively to `civic_reports` using least-privilege credentials (`civic_reports_user`).

### 5.2 Report Lifecycle State Machine
Transition rules are enforced centrally:
```
SUBMITTED ────────► UNDER_REVIEW ──────► IN_PROGRESS ──────► RESOLVED
    │                     │                   │                 │
    ▼                     ▼                   ▼                 ▼
REJECTED              REJECTED            REJECTED          REOPENED
```
- **SUBMITTED**: Default initial status. Author may edit description, title, location, or attach media.
- **UNDER_REVIEW**: Municipal/moderator triaging.
- **IN_PROGRESS**: Municipal department active remediation.
- **RESOLVED**: Authority/admin verified closure with optional resolution notes and evidence media.
- **REJECTED**: Terminal state for spam, duplicate, or invalid reports.
- **REOPENED**: Re-activates a RESOLVED issue if defect recurs.

Every transition atomically generates an immutable audit record in `statusHistory` containing `transitionId`, `previousStatus`, `newStatus`, `actorUserId`, `actorRole`, `reason`, and `timestamp`.

### 5.3 Geospatial Strategy & Privacy Policy
- Coordinates are stored as GeoJSON `Point` objects: `{ type: 'Point', coordinates: [longitude, latitude] }`.
- Indexed via MongoDB `2dsphere` spatial index: `db.reports.createIndex({ location: '2dsphere' })`.
- Nearby queries use `$near` with `$maxDistance` capped at 50,000 meters (50km).
- Coordinates are truncated to 4 decimal places (~11 meters) to protect residential privacy while preserving navigation utility.

### 5.4 Presigned Cloudinary Media Upload Flow
1. Client calls `POST /api/v1/media/sign-upload` with authenticated JWT.
2. Server validates user session and derives scoped folder: `civic_pulse/uploads/{authorId}/`.
3. Server generates HMAC SHA-256 signature using `CLOUDINARY_API_SECRET` and returns short-lived signature, timestamp, and upload folder. Cloudinary API secrets never leave the server.
4. Client uploads media asset directly to Cloudinary.
5. Client attaches verified media metadata to `POST /api/v1/reports`.

### 5.5 Phase 2 Architecture Decision Records (ADRs)
- [ADR 0008: Report Lifecycle State Machine and Audit Log](adr/0008-report-lifecycle-state-machine.md)
- [ADR 0009: Cloudinary Presigned Media Upload Strategy](adr/0009-cloudinary-presigned-media-uploads.md)
- [ADR 0010: MongoDB Geospatial Indexing and Location Precision Policy](adr/0010-geospatial-query-and-privacy.md)

---

## 6. Phase 3: Community & Authority Workflows

### 6.1 Community Service (`services/community-service`)
- **Logical DB**: `civic_community` with isolated credentials `civic_community_user`.
- **Endorsements / Support**: Idempotent compound unique index on `(reportId, userId)`. Tracks community support counts and prevents duplicate votes.
- **Following**: Residents can follow reports to receive future notifications. Unique compound index on `(reportId, userId)`.
- **Discussions (Comments & Replies)**: Bounded 1-level reply nesting constraint to prevent deeply recursive trees. Soft deletion preserves conversation integrity.
- **Moderation & Abuse Reports**: Authorized moderators can hide/restore comments; rate-limited reporting for spam/harassment.
- **Cross-Service Validation**: Verifies report existence via Reports Service internal endpoint `GET /api/v1/internal/reports/:id/exists` without database sharing.

### 6.2 Authority Service (`services/authority-service`)
- **Logical DB**: `civic_authority` with isolated credentials `civic_authority_user`.
- **Authority Verification Workflow**:
  - Residents apply with municipal credentials (status: `PENDING`).
  - Strict anti-self-approval safeguard: applicant cannot review their own application.
  - Platform administrator reviews and approves.
  - On approval, Authority Service calls Identity Service internal S2S endpoint (`POST /api/v1/auth/internal/users/:id/role`) to safely elevate the user's role to `authority`.
- **Department Management**:
  - Admin-governed municipal departments with unique compound index on `(name, jurisdiction)`.
  - Public directory protects private staff contact details.
- **Report Assignments**:
  - Verified authorities/admins route civic reports to active municipal departments.
  - Historical reassignment records preserved with full audit trail.
  - Public accountability view (`/api/v1/reports/:id/assignments/public`) displays department and history count without exposing internal staff notes.
  - Does NOT automatically transition report to `RESOLVED` (preserves report state machine independence).

### 6.3 Phase 3 Architecture Decision Records (ADRs)
- [ADR 0011: Community Service Data Boundaries, Idempotent Support, and Discussion Hierarchy](adr/0011-community-service-data-boundaries.md)
- [ADR 0012: Authority Verification Workflow and Controlled Role Elevation](adr/0012-authority-verification-and-role-elevation.md)
- [ADR 0013: Department Assignment Lifecycle and Cross-Service Consistency](adr/0013-department-assignment-lifecycle.md)

---

## 7. Phase 4 & 4.1: Durable Event-Driven Notifications & Idempotent Processing

### 7.1 Single-Document Outbox Pattern (Standalone MongoDB Resilience)
Because local development and standalone MongoDB instances do not support multi-document replica-set transactions, notification publication intent is stored **atomically within the source mutation document**:
- **Reports Service**: `statusHistory.$.notificationDispatched` (boolean) and `statusHistory.$.notificationDispatchedAt` (Date) on `reports`.
- **Community Service**: `notificationDispatched` and `notificationDispatchedAt` on `comments`.
- **Authority Service**: `notificationDispatched` on `authority_applications` and `report_assignments`.

This guarantees that an event's publication intent is committed atomically with the source mutation in a single single-document write without distributed transactions.

### 7.2 Deterministic Event Identifiers
Event IDs are generated once and persisted with the originating entity, ensuring that all retry and recovery attempts preserve the exact same identifier:
- **Report Status Transitions**: `transitionRecord.transitionId` (generated once at transition and stored in `statusHistory`).
- **Comments and Replies**: `commentDoc._id` (persisted on comment document).
- **Authority Application Reviews**: `${applicationId}-review` (derived deterministically from application ID).
- **Report Assignments**: `assignmentDoc._id` (persisted on assignment document).

### 7.3 Receiver-Side Partial Processing Recovery
The Notifications Service tracks processed events with explicit four-state lifecycle transitions:
`PENDING` -> `PROCESSING` -> `COMPLETED` / `FAILED`
1. Before generating recipient notifications, the event record is upserted with status `PROCESSING`.
2. As recipient notifications are written, compound unique indexes `{ eventId: 1, recipientUserId: 1 }` guarantee strict deduplication.
3. If processing crashes or restarts after partial writes, subsequent retries resume and skip already-created notifications.
4. Only when all recipient notifications are successfully created is the event marked `COMPLETED` and acknowledged to the caller.

### 7.4 Recoverable Dispatch & Background Worker Coordination
The `event-dispatcher-worker` runs an autonomous recovery loop:
1. **Redis Distributed Lease**: Acquires `lock:event_dispatcher_recovery` via `SET key val PX leaseDuration NX` to ensure single-worker execution across multiple worker replicas.
2. **Authenticated S2S Polling**: Calls internal service-owned endpoints protected by `InternalServiceGuard`:
   - `POST /api/v1/internal/reports/events/recover`
   - `POST /api/v1/internal/community/events/recover`
   - `POST /api/v1/internal/authority/events/recover`
3. **Delivery Acknowledgement**: An event is marked `notificationDispatched: true` only after Notifications Service returns HTTP 200 with `{ received: true, processed: true }`.
4. **Crash Recovery**: Pending un-dispatched events survive worker terminations, application restarts, and notification-service outages.


