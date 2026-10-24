# ADR 009: Cloudinary Presigned Media Uploads and Security

## Status
Accepted

## Context
Civic reports require visual evidence (photos/videos of potholes, broken lights, trash heaps). Uploading binary media through microservice application servers exhausts network bandwidth and CPU cycles, while untrusted uploads expose infrastructure to arbitrary file executions and storage abuse.

## Decision
1. **Server-Generated Presigned Signatures**:
   - The Reports & Media service acts as the trusted signing authority.
   - Clients request a presigned signature from `POST /api/v1/media/sign-upload`.
   - The service calculates a SHA-1/SHA-256 HMAC signature using the server's private `CLOUDINARY_API_SECRET` and short expiration timestamp (max 10 minutes).
   - The client uploads directly to Cloudinary CDN using the signature.
2. **Strict Validation & Metadata Attachment**:
   - Allowed file formats: `jpg`, `jpeg`, `png`, `webp`, `mp4`.
   - Maximum upload size: 10MB per image, 50MB per video.
   - Upload folder prefix: `civic_pulse/reports/{reportId}`.
   - When attaching media to reports, the service validates that the media metadata belongs to the authenticated user and matches the authorized folder path before persisting in MongoDB.
3. **Phase 2.1 Hardening & No Mock Credentials in Production**:
   - Deterministic and placeholder development signatures are strictly prohibited from posing as valid production credentials.
   - If Cloudinary credentials (`CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`) are missing or use placeholders, `POST /api/v1/media/sign-upload` returns an explicit `HTTP 503 Service Unavailable`.
   - Unit tests must use an explicit mock provider (`IMediaProvider`), preventing fake credentials from leaking into production.
4. **Server-Side Pre-Authorization Tracking & Ownership Verification**:
   - Every issued upload signature is persisted in `media_uploads` with the caller's `userId`, `uploadFolder`, `allowedFormats`, `maxFileSizeBytes`, and `expiresAt` (1 hour).
   - Before attaching media to a report, the server queries `media_uploads` to verify:
     1. The `publicId` was actually issued by the service.
     2. The asset belongs to the authenticated caller (`userId` match).
     3. The upload has not expired.
     4. Format, size, and HTTPS protocol strictly conform to pre-authorized limits.
   - Forged `publicId` or wrong-owner attempts are rejected with `HTTP 403 Forbidden`.

## Consequences
- **Positive**: Zero binary bandwidth on application nodes.
- **Positive**: API secrets never leave the server; clients receive only short-lived signed tokens.
- **Positive**: Impossible for one user to attach another user's or arbitrary external Cloudinary assets to their report.
- **Positive**: Clear separation between unit test mock providers and production Cloudinary credentials.
