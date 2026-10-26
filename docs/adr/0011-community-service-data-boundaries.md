# ADR 0011: Community Service Data Boundaries, Idempotent Support, and Discussion Hierarchy

## Status
Accepted

## Context
Phase 3 introduces community participation features:
1. Endorsement / support of civic reports by verified residents.
2. Discussions (comments and replies).
3. Following reports to receive progress updates.
4. Abuse reporting and comment moderation.

A core requirement is to preserve strict database isolation without coupling Reports Service directly to community discussions, and without unbounded document growth (such as storing arrays of thousands of user IDs directly in a report document).

## Decisions
1. **Isolated Logical Database**:
   - The Community Service owns `civic_community` and connects using `civic_community_user`.
   - It maintains collections for `endorsements`, `follows`, `comments`, `abuse_reports`, and `report_stats`.
2. **Idempotent Endorsements and Follows & Authoritative Counters**:
   - Unique compound indexes on `(reportId, userId)` guarantee that duplicate requests cannot create multiple records or corrupt counts.
   - Idempotent endpoints (`PUT /reports/:id/endorsement`, `DELETE /reports/:id/endorsement`) return consistent state.
   - Summary and status endpoints count directly from authoritative source collections (`endorsements`, `follows`, `comments`).
   - The cached `report_stats` collection is guarded with `$gt: 0` constraints and conditional logic to prevent negative counts under all circumstances.
   - A deterministic, idempotent counter reconciliation endpoint (`POST /api/v1/reports/:reportId/stats/reconcile`) recalculates cached statistics from authoritative source collections to heal any drift caused by transient process failures.
3. **Report Existence Verification via Internal S2S API**:
   - Before allowing endorsements, follows, or comments on a report, Community Service verifies that the report exists in Reports Service via an internal endpoint `GET /api/v1/internal/reports/:id/exists`. Community Service never queries the `civic_reports` database directly.
4. **Bounded 1-Level Comment Hierarchy**:
   - To prevent unbounded recursive tree traversals and poor mobile rendering performance, comments support exactly one level of replies (`parentCommentId` referencing a top-level comment). Replies cannot themselves have child replies.
5. **Soft Deletion & Moderation**:
   - Comments deleted by users or hidden by moderators are preserved as soft-deleted to maintain reply integrity and moderation audit logs.
   - Deleting a comment correctly decrements the visible comment count in `report_stats`.

## Consequences
- Reports Service remains clean, fast, and focused on core issue reporting and lifecycle.
- Community participation scales independently.
- Discussion trees are predictable and safe for mobile clients.
- Single-instance MongoDB deployments without multi-document transactions cannot leave counters permanently desynchronized.
