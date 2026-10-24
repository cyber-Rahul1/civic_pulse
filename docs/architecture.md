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

