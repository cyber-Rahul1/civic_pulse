import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import {
  NotFoundException,
  BadRequestException,
  ForbiddenException,
  ConflictException,
} from '@nestjs/common';
import { CivicLogger } from '@civic-pulse/nest-common';
import { AbuseReportReason, CommentModerationStatus } from '@civic-pulse/contracts';
import { CommunityService } from './community.service';
import { DatabaseService } from '../database/database.service';

describe('CommunityService (Unit & Policy Tests)', () => {
  let service: CommunityService;

  // Mock in-memory collections
  const endorsements: any[] = [];
  const follows: any[] = [];
  const comments: any[] = [];
  const abuseReports: any[] = [];
  const stats: any[] = [];

  const mockDbService = {
    endorsements: {
      insertOne: jest.fn().mockImplementation(async (doc) => {
        // Enforce unique compound (reportId, userId)
        const dup = endorsements.find(
          (e) => e.reportId === doc.reportId && e.userId === doc.userId,
        );
        if (dup) {
          const err: any = new Error('Duplicate');
          err.code = 11000;
          throw err;
        }
        endorsements.push(doc);
        return { acknowledged: true };
      }),
      deleteOne: jest.fn().mockImplementation(async (filter) => {
        const idx = endorsements.findIndex(
          (e) => e.reportId === filter.reportId && e.userId === filter.userId,
        );
        if (idx >= 0) {
          endorsements.splice(idx, 1);
          return { deletedCount: 1 };
        }
        return { deletedCount: 0 };
      }),
      findOne: jest.fn().mockImplementation(async (filter) => {
        return (
          endorsements.find(
            (e) => e.reportId === filter.reportId && e.userId === filter.userId,
          ) || null
        );
      }),
      countDocuments: jest.fn().mockImplementation(async (filter) => {
        return endorsements.filter((e) => e.reportId === filter.reportId).length;
      }),
    },
    follows: {
      insertOne: jest.fn().mockImplementation(async (doc) => {
        const dup = follows.find(
          (f) => f.reportId === doc.reportId && f.userId === doc.userId,
        );
        if (dup) {
          const err: any = new Error('Duplicate');
          err.code = 11000;
          throw err;
        }
        follows.push(doc);
        return { acknowledged: true };
      }),
      deleteOne: jest.fn().mockImplementation(async (filter) => {
        const idx = follows.findIndex(
          (f) => f.reportId === filter.reportId && f.userId === filter.userId,
        );
        if (idx >= 0) {
          follows.splice(idx, 1);
          return { deletedCount: 1 };
        }
        return { deletedCount: 0 };
      }),
      findOne: jest.fn().mockImplementation(async (filter) => {
        return (
          follows.find(
            (f) => f.reportId === filter.reportId && f.userId === filter.userId,
          ) || null
        );
      }),
      find: jest.fn().mockReturnValue({
        sort: jest.fn().mockReturnThis(),
        skip: jest.fn().mockReturnThis(),
        limit: jest.fn().mockReturnThis(),
        toArray: jest.fn().mockImplementation(async () => follows),
      }),
      countDocuments: jest.fn().mockImplementation(async (filter) => {
        if (filter.reportId) {
          return follows.filter((f) => f.reportId === filter.reportId).length;
        }
        return follows.length;
      }),
    },
    comments: {
      insertOne: jest.fn().mockImplementation(async (doc) => {
        comments.push(doc);
        return { acknowledged: true };
      }),
      findOne: jest.fn().mockImplementation(async (filter) => {
        return comments.find((c) => c._id === filter._id) || null;
      }),
      find: jest.fn().mockImplementation((filter: any) => ({
        sort: jest.fn().mockReturnThis(),
        skip: jest.fn().mockReturnThis(),
        limit: jest.fn().mockReturnThis(),
        toArray: jest.fn().mockImplementation(async () => {
          if (filter.parentCommentId && filter.parentCommentId.$in) {
            return comments.filter((c) => !c.parentCommentId);
          }
          if (filter.parentCommentId) {
            return comments.filter((c) => c.parentCommentId === filter.parentCommentId);
          }
          return comments;
        }),
      })),
      countDocuments: jest.fn().mockImplementation(async (filter) => {
        return comments.filter((c) => c.reportId === filter.reportId).length;
      }),
      updateOne: jest.fn().mockImplementation(async (filter, update) => {
        const c = comments.find((item) => item._id === filter._id);
        if (c && update.$set) {
          Object.assign(c, update.$set);
        }
        if (c && update.$inc) {
          for (const key of Object.keys(update.$inc)) {
            c[key] = (c[key] || 0) + update.$inc[key];
          }
        }
        return { modifiedCount: 1 };
      }),
    },
    abuseReports: {
      insertOne: jest.fn().mockImplementation(async (doc) => {
        abuseReports.push(doc);
        return { acknowledged: true };
      }),
      findOne: jest.fn().mockImplementation(async (filter) => {
        return (
          abuseReports.find(
            (r) =>
              r.commentId === filter.commentId &&
              r.reporterUserId === filter.reporterUserId,
          ) || null
        );
      }),
    },
    stats: {
      findOne: jest.fn().mockImplementation(async (filter) => {
        return stats.find((item) => item._id === filter._id) || null;
      }),
      updateOne: jest.fn().mockImplementation(async (filter, update) => {
        let s = stats.find((item) => item._id === filter._id);
        if (!s) {
          s = { _id: filter._id, endorsementCount: 0, commentCount: 0, followerCount: 0 };
          stats.push(s);
        }
        if (update.$set) {
          Object.assign(s, update.$set);
        }
        if (update.$inc) {
          for (const key of Object.keys(update.$inc)) {
            s[key] = (s[key] || 0) + update.$inc[key];
          }
        }
        return { modifiedCount: 1 };
      }),
    },
  };

  const mockLogger = {
    setContext: jest.fn(),
    log: jest.fn(),
    warn: jest.fn(),
    error: jest.fn(),
    debug: jest.fn(),
  };

  beforeEach(async () => {
    endorsements.length = 0;
    follows.length = 0;
    comments.length = 0;
    abuseReports.length = 0;
    stats.length = 0;

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommunityService,
        { provide: DatabaseService, useValue: mockDbService },
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn((key: string) => {
              if (key === 'REPORTS_SERVICE_URL') return 'http://127.0.0.1:3002';
              return null;
            }),
          },
        },
        { provide: CivicLogger, useValue: mockLogger },
      ],
    }).compile();

    service = module.get<CommunityService>(CommunityService);

    // Mock verifyReportExists to return true by default
    jest.spyOn(service, 'verifyReportExists').mockImplementation(async (id: string) => {
      const exists = id !== 'non-existent-report';
      return { exists, authorId: 'author-1', title: 'Test Report' };
    });
  });

  // ===========================================================================
  // Endorsement Tests
  // ===========================================================================
  describe('Endorsements', () => {
    it('should allow a resident to endorse a valid report', async () => {
      const res = await service.endorseReport('rep-1', 'user-1');
      expect(res.reportId).toBe('rep-1');
      expect(res.endorsementCount).toBe(1);
      expect(res.isEndorsedByCaller).toBe(true);
    });

    it('should handle duplicate endorsement idempotently without increasing count', async () => {
      await service.endorseReport('rep-1', 'user-1');
      const res2 = await service.endorseReport('rep-1', 'user-1');
      expect(res2.endorsementCount).toBe(1);
      expect(res2.isEndorsedByCaller).toBe(true);
    });

    it('should reject endorsement on non-existent report', async () => {
      await expect(service.endorseReport('non-existent-report', 'user-1')).rejects.toThrow(
        NotFoundException,
      );
    });

    it('should allow resident to remove endorsement', async () => {
      await service.endorseReport('rep-1', 'user-1');
      const res = await service.removeEndorsement('rep-1', 'user-1');
      expect(res.endorsementCount).toBe(0);
      expect(res.isEndorsedByCaller).toBe(false);
    });

    it('should safely handle repeated removal of endorsement (idempotent)', async () => {
      const res = await service.removeEndorsement('rep-1', 'user-not-endorsed');
      expect(res.endorsementCount).toBe(0);
      expect(res.isEndorsedByCaller).toBe(false);
    });
  });

  // ===========================================================================
  // Follow Tests
  // ===========================================================================
  describe('Following', () => {
    it('should allow a resident to follow and unfollow a report', async () => {
      const f1 = await service.followReport('rep-1', 'user-1');
      expect(f1.isFollowing).toBe(true);

      const state1 = await service.getFollowState('rep-1', 'user-1');
      expect(state1.isFollowing).toBe(true);

      const f2 = await service.unfollowReport('rep-1', 'user-1');
      expect(f2.isFollowing).toBe(false);

      const state2 = await service.getFollowState('rep-1', 'user-1');
      expect(state2.isFollowing).toBe(false);
    });

    it('should prevent duplicate follow records idempotently', async () => {
      await service.followReport('rep-1', 'user-1');
      await service.followReport('rep-1', 'user-1');
      expect(follows.length).toBe(1);
    });
  });

  // ===========================================================================
  // Comments and Replies Tests
  // ===========================================================================
  describe('Comments & Replies', () => {
    it('should create a top-level comment on a report', async () => {
      const comment = await service.createComment('rep-1', 'user-1', {
        content: 'This pothole is hazardous for cyclists.',
      });

      expect(comment.id).toBeDefined();
      expect(comment.authorUserId).toBe('user-1');
      expect(comment.content).toBe('This pothole is hazardous for cyclists.');
      expect(comment.isEdited).toBe(false);
      expect(comment.isDeleted).toBe(false);
    });

    it('should create a valid reply to an existing comment', async () => {
      const parent = await service.createComment('rep-1', 'user-1', {
        content: 'Dangerous road condition',
      });

      const reply = await service.createComment('rep-1', 'user-2', {
        content: 'Agreed, saw another incident here yesterday.',
        parentCommentId: parent.id,
      });

      const updatedParent = comments.find((c) => c._id === parent.id);
      expect(reply.parentCommentId).toBe(parent.id);
      expect(updatedParent.replyCount).toBe(1);
    });

    it('should reject reply if parent belongs to another report', async () => {
      const parent = await service.createComment('rep-1', 'user-1', {
        content: 'Report 1 comment',
      });

      await expect(
        service.createComment('rep-2', 'user-2', {
          content: 'Replying under report 2 with report 1 parent',
          parentCommentId: parent.id,
        }),
      ).rejects.toThrow(BadRequestException);
    });

    it('should reject nested reply to a reply (1-level reply constraint)', async () => {
      const parent = await service.createComment('rep-1', 'user-1', {
        content: 'Top level',
      });

      const reply1 = await service.createComment('rep-1', 'user-2', {
        content: 'First reply',
        parentCommentId: parent.id,
      });

      // Attempting to reply to reply1
      await expect(
        service.createComment('rep-1', 'user-3', {
          content: 'Nested reply to reply',
          parentCommentId: reply1.id,
        }),
      ).rejects.toThrow(BadRequestException);
    });

    it('should allow author to edit their own comment and mark isEdited true', async () => {
      const c = await service.createComment('rep-1', 'user-1', {
        content: 'Original comment text',
      });

      const updated = await service.updateComment(c.id, 'user-1', {
        content: 'Updated comment text',
      });

      expect(updated.content).toBe('Updated comment text');
      expect(updated.isEdited).toBe(true);
    });

    it('should forbid user from editing another user comment', async () => {
      const c = await service.createComment('rep-1', 'user-1', {
        content: 'Original comment text',
      });

      await expect(
        service.updateComment(c.id, 'attacker-user-2', {
          content: 'Hacked comment text',
        }),
      ).rejects.toThrow(ForbiddenException);
    });

    it('should soft-delete comment when requested by author', async () => {
      const c = await service.createComment('rep-1', 'user-1', {
        content: 'Comment to delete',
      });

      const del = await service.deleteComment(c.id, 'user-1', 'resident');
      expect(del.message).toBe('Comment deleted successfully');

      const found = comments.find((item) => item._id === c.id);
      expect(found.isDeleted).toBe(true);
      expect(found.content).toBe('[Comment deleted by user]');
    });

    it('should allow moderator to hide comments', async () => {
      const c = await service.createComment('rep-1', 'user-1', {
        content: 'Inappropriate content',
      });

      const moderated = await service.moderateComment(c.id, 'mod-1', {
        status: CommentModerationStatus.HIDDEN,
        moderationNotes: 'Violates civil discourse rules',
      });

      expect(moderated.moderationStatus).toBe(CommentModerationStatus.HIDDEN);
      expect(moderated.content).toBe('[Comment hidden by moderator]');
    });

    it('should allow reporting a comment for abuse and prevent duplicate reports', async () => {
      const c = await service.createComment('rep-1', 'user-1', {
        content: 'Questionable comment',
      });

      const rep = await service.reportAbuse(c.id, 'reporter-user', {
        reason: AbuseReportReason.HARASSMENT,
        details: 'Targeted hostility',
      });

      expect(rep.commentId).toBe(c.id);
      expect(rep.reason).toBe(AbuseReportReason.HARASSMENT);

      // Duplicate report attempt
      await expect(
        service.reportAbuse(c.id, 'reporter-user', {
          reason: AbuseReportReason.SPAM,
        }),
      ).rejects.toThrow(ConflictException);
    });

    it('should reconcile drifted community stats with authoritative collections', async () => {
      // 1. Create 2 endorsements, 1 follow, 1 comment
      await service.endorseReport('rep-drift', 'user-1');
      await service.endorseReport('rep-drift', 'user-2');
      await service.followReport('rep-drift', 'user-1');
      await service.createComment('rep-drift', 'user-1', { content: 'Valid issue' });

      // 2. Artificially corrupt the stats counter cache (simulating worker crash or partial write)
      const cached = stats.find((s) => s._id === 'rep-drift');
      cached.endorsementCount = 999;
      cached.commentCount = 0;
      cached.followerCount = 42;

      // 3. Reconcile
      const reconciled = await service.reconcileReportStats('rep-drift');
      expect(reconciled.endorsementCount).toBe(2);
      expect(reconciled.commentCount).toBe(1);
      expect(reconciled.followerCount).toBe(1);
    });
  });
});
