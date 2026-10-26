import 'reflect-metadata';
import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestException, ForbiddenException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  ReportCategory,
  ReportStatus,
  UserRole,
  JwtTokenPayload,
} from '@civic-pulse/contracts';
import { CivicLogger } from '@civic-pulse/nest-common';
import { ReportsService } from './reports.service';
import { MediaService } from '../media/media.service';
import { DatabaseService } from '../database/database.service';

describe('ReportsService Unit & Lifecycle Tests', () => {
  let reportsService: ReportsService;
  const reportsStore = new Map<string, any>();

  const residentUser: JwtTokenPayload = {
    sub: 'user-resident-1',
    email: 'resident@example.com',
    role: UserRole.RESIDENT,
    sessionId: 'session-1',
    iss: 'civic-pulse:identity',
    aud: 'civic-pulse:api',
  };

  const authorityUser: JwtTokenPayload = {
    sub: 'user-admin-1',
    email: 'officer@city.gov',
    role: UserRole.ADMIN, // Verified administrative authority
    sessionId: 'session-2',
    iss: 'civic-pulse:identity',
    aud: 'civic-pulse:api',
  };

  const otherResidentUser: JwtTokenPayload = {
    sub: 'user-resident-2',
    email: 'other@example.com',
    role: UserRole.RESIDENT,
    sessionId: 'session-3',
    iss: 'civic-pulse:identity',
    aud: 'civic-pulse:api',
  };

  const unverifiedAuthorityUser: JwtTokenPayload = {
    sub: 'user-unverified-authority-1',
    email: 'unverified@city.gov',
    role: UserRole.AUTHORITY, // Unverified authority role without admin grant
    sessionId: 'session-4',
    iss: 'civic-pulse:identity',
    aud: 'civic-pulse:api',
  };

  const mockDbService = {
    reports: {
      insertOne: jest.fn(async (doc: any) => {
        reportsStore.set(doc._id, doc);
        return { insertedId: doc._id };
      }),
      findOne: jest.fn(async (query: any) => {
        return reportsStore.get(query._id) || null;
      }),
      updateOne: jest.fn(async (query: any, update: any) => {
        const item = reportsStore.get(query._id);
        if (!item) return { modifiedCount: 0 };
        // If conditional update on status fails
        if (query.status && item.status !== query.status) {
          return { modifiedCount: 0 };
        }
        if (update.$set) Object.assign(item, update.$set);
        if (update.$push?.statusHistory) {
          item.statusHistory.push(update.$push.statusHistory);
        }
        return { modifiedCount: 1 };
      }),
      find: jest.fn((query: any) => {
        let results = Array.from(reportsStore.values());
        if (query?.location?.$near) {
          const [qLng, qLat] = query.location.$near.$geometry.coordinates;
          const maxDist = query.location.$near.$maxDistance;
          results = results.filter((r) => {
            const [lng, lat] = r.location.coordinates;
            const dLng = (lng - qLng) * 111000 * Math.cos((qLat * Math.PI) / 180);
            const dLat = (lat - qLat) * 111000;
            const dist = Math.sqrt(dLng * dLng + dLat * dLat);
            return dist <= maxDist;
          });
        }
        return {
          sort: () => ({
            skip: () => ({
              limit: () => ({
                toArray: async () => results,
              }),
            }),
          }),
          limit: () => ({
            toArray: async () => results,
          }),
        };
      }),
      countDocuments: jest.fn(async () => reportsStore.size),
    },
    mediaUploads: {},
  };

  const mockMediaService = {
    validateAndSanitizeMedia: jest.fn(async (media: any[], userId: string) => {
      if (!media) return [];
      return media.map((m) => ({
        ...m,
        uploadedByUserId: userId,
        createdAt: new Date(),
      }));
    }),
    mapMediaDocsToDto: jest.fn((docs: any[]) => {
      if (!docs) return [];
      return docs.map((d) => ({
        ...d,
        createdAt: d.createdAt?.toISOString ? d.createdAt.toISOString() : new Date().toISOString(),
      }));
    }),
  };

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ReportsService,
        CivicLogger,
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn().mockReturnValue(''),
          },
        },
        {
          provide: DatabaseService,
          useValue: mockDbService,
        },
        {
          provide: MediaService,
          useValue: mockMediaService,
        },
      ],
    }).compile();

    reportsService = module.get<ReportsService>(ReportsService);
  });

  beforeEach(() => {
    reportsStore.clear();
    jest.clearAllMocks();
  });

  describe('Report Creation & Author Binding', () => {
    it('should create a report with SUBMITTED status and bind author from auth context', async () => {
      const report = await reportsService.createReport(
        {
          title: 'Deep pothole on 8th Ave',
          description: 'Causing traffic block and near misses for two-wheelers',
          category: ReportCategory.POTHOLE,
          location: {
            type: 'Point',
            coordinates: [80.6480, 16.5062],
          },
          locationDescription: 'Opposite Central Park Gate',
        },
        residentUser,
      );

      expect(report.id).toBeDefined();
      expect(report.authorId).toBe(residentUser.sub);
      expect(report.status).toBe(ReportStatus.SUBMITTED);
      expect(report.statusHistory).toHaveLength(1);
      expect(report.statusHistory[0]?.newStatus).toBe(ReportStatus.SUBMITTED);
      expect(report.location?.coordinates).toEqual([80.6480, 16.5062]);
    });

    it('should create a report without location when coordinates are omitted', async () => {
      const report = await reportsService.createReport(
        {
          title: 'Unpinned Civic Report',
          description: 'Citizen reporting general municipal issue without device GPS fix',
          category: ReportCategory.GARBAGE,
          locationDescription: 'Corner of 4th block near post office',
        },
        residentUser,
      );

      expect(report.id).toBeDefined();
      expect(report.status).toBe(ReportStatus.SUBMITTED);
      expect(report.location).toBeUndefined();
      expect(report.locationDescription).toBe('Corner of 4th block near post office');
    });

    it('should throw BadRequestException on invalid latitude coordinates', async () => {
      await expect(
        reportsService.createReport(
          {
            title: 'Invalid Coordinates Issue',
            description: 'Testing coordinates validation',
            category: ReportCategory.GARBAGE,
            location: {
              type: 'Point',
              coordinates: [80.6480, 195.0], // Out of bounds latitude
            },
          },
          residentUser,
        ),
      ).rejects.toThrow(BadRequestException);
    });

    it('should reject coordinates outside Andhra Pradesh jurisdiction', async () => {
      await expect(
        reportsService.createReport(
          {
            title: 'Out of State Issue',
            description: 'Issue reported from outside Andhra Pradesh',
            category: ReportCategory.GARBAGE,
            location: {
              type: 'Point',
              coordinates: [77.5946, 12.9716], // Bangalore (Karnataka)
            },
          },
          residentUser,
        ),
      ).rejects.toThrow(/outside Andhra Pradesh jurisdiction/);
    });
  });

  describe('Report Update & Ownership Authorization', () => {
    let reportId: string;

    beforeEach(async () => {
      const rep = await reportsService.createReport(
        {
          title: 'Broken Streetlight',
          description: 'Streetlight pole 42 not functional for 3 days',
          category: ReportCategory.STREETLIGHT,
          location: {
            type: 'Point',
            coordinates: [80.6480, 16.5062],
          },
        },
        residentUser,
      );
      reportId = rep.id;
    });

    it('should permit author to update description while SUBMITTED', async () => {
      const updated = await reportsService.updateReport(
        reportId,
        { description: 'Streetlight pole 42 sparking and dark' },
        residentUser,
      );
      expect(updated.description).toBe('Streetlight pole 42 sparking and dark');
    });

    it('should reject edit by another resident with 403 Forbidden', async () => {
      await expect(
        reportsService.updateReport(
          reportId,
          { description: 'Tampering with another report' },
          otherResidentUser,
        ),
      ).rejects.toThrow(ForbiddenException);
    });
  });

  describe('Status Transitions & Lifecycle Rules', () => {
    let reportId: string;

    beforeEach(async () => {
      const rep = await reportsService.createReport(
        {
          title: 'Open Drainage Pit',
          description: 'Dangerous open manhole near primary school',
          category: ReportCategory.DRAINAGE,
          location: {
            type: 'Point',
            coordinates: [80.6480, 16.5062],
          },
        },
        residentUser,
      );
      reportId = rep.id;
    });

    it('should reject resident trying to transition directly to RESOLVED with 400', async () => {
      await expect(
        reportsService.transitionStatus(
          reportId,
          { status: ReportStatus.RESOLVED },
          residentUser,
        ),
      ).rejects.toThrow(BadRequestException); // SUBMITTED -> RESOLVED is illegal state transition
    });

    it('should reject unverified authority role from transitioning status without admin authorization', async () => {
      await expect(
        reportsService.transitionStatus(
          reportId,
          { status: ReportStatus.UNDER_REVIEW },
          unverifiedAuthorityUser,
        ),
      ).rejects.toThrow(ForbiddenException);
    });

    it('should execute legal progression: SUBMITTED -> UNDER_REVIEW -> IN_PROGRESS -> RESOLVED by verified Admin', async () => {
      // 1. UNDER_REVIEW
      const r1 = await reportsService.transitionStatus(
        reportId,
        { status: ReportStatus.UNDER_REVIEW, reason: 'Assigned to field inspector' },
        authorityUser,
      );
      expect(r1.status).toBe(ReportStatus.UNDER_REVIEW);

      // 2. IN_PROGRESS
      const r2 = await reportsService.transitionStatus(
        reportId,
        { status: ReportStatus.IN_PROGRESS, reason: 'Repair crew dispatched' },
        authorityUser,
      );
      expect(r2.status).toBe(ReportStatus.IN_PROGRESS);

      // 3. RESOLVED
      const r3 = await reportsService.transitionStatus(
        reportId,
        {
          status: ReportStatus.RESOLVED,
          reason: 'Drainage cover installed and sealed',
          resolutionNotes: 'Standard cast iron cover installed',
        },
        authorityUser,
      );
      expect(r3.status).toBe(ReportStatus.RESOLVED);
      expect(r3.resolvedAt).toBeDefined();
      expect(r3.resolutionNotes).toBe('Standard cast iron cover installed');
      expect(r3.statusHistory).toHaveLength(4);
    });

    it('should reject concurrent status transition race condition with 400 Conflict', async () => {
      // Simulate two concurrent requests attempting incompatible transitions from SUBMITTED
      // Request 1: SUBMITTED -> UNDER_REVIEW
      // Request 2: SUBMITTED -> REJECTED
      const req1 = reportsService.transitionStatus(
        reportId,
        { status: ReportStatus.UNDER_REVIEW, reason: 'Req 1 wins' },
        authorityUser,
      );

      const r1 = await req1;
      expect(r1.status).toBe(ReportStatus.UNDER_REVIEW);

      // Subsequent attempt against the old SUBMITTED status fails with conflict
      mockDbService.reports.updateOne.mockImplementationOnce(async () => ({
        modifiedCount: 0, // Concurrent collision
      }));

      await expect(
        reportsService.transitionStatus(
          reportId,
          { status: ReportStatus.REJECTED, reason: 'Req 2 arrives late' },
          authorityUser,
        ),
      ).rejects.toThrow(BadRequestException);
    });

    it('should reject illegal status skip like SUBMITTED -> IN_PROGRESS with 400', async () => {
      await expect(
        reportsService.transitionStatus(
          reportId,
          { status: ReportStatus.IN_PROGRESS },
          authorityUser,
        ),
      ).rejects.toThrow(BadRequestException);
    });

    it('should allow author or authority to REOPEN a RESOLVED report', async () => {
      await reportsService.transitionStatus(
        reportId,
        { status: ReportStatus.UNDER_REVIEW },
        authorityUser,
      );
      await reportsService.transitionStatus(
        reportId,
        { status: ReportStatus.IN_PROGRESS },
        authorityUser,
      );
      await reportsService.transitionStatus(
        reportId,
        { status: ReportStatus.RESOLVED },
        authorityUser,
      );

      const reopened = await reportsService.transitionStatus(
        reportId,
        { status: ReportStatus.REOPENED, reason: 'Cover broke again next day' },
        residentUser, // Original author
      );
      expect(reopened.status).toBe(ReportStatus.REOPENED);
    });
  });

  describe('Geospatial Radius Queries', () => {
    it('should return nearby reports within radius and filter out distant reports', async () => {
      // Point A: Vijayawada Benz Circle [80.6480, 16.5062]
      await reportsService.createReport(
        {
          title: 'Nearby Pothole in Vijayawada',
          description: 'Near Benz Circle',
          category: ReportCategory.POTHOLE,
          location: { type: 'Point', coordinates: [80.6480, 16.5062] },
        },
        residentUser,
      );

      // Point B: Visakhapatnam RK Beach [83.2185, 17.6868] (~350 km away)
      await reportsService.createReport(
        {
          title: 'Distant Pothole in Visakhapatnam',
          description: 'Far away on beach road',
          category: ReportCategory.POTHOLE,
          location: { type: 'Point', coordinates: [83.2185, 17.6868] },
        },
        residentUser,
      );

      // Search with 10 km radius around Vijayawada Benz Circle
      const nearby = await reportsService.findNearby({
        longitude: 80.6480,
        latitude: 16.5062,
        radiusMeters: 10000,
        limit: 10,
      });

      expect(nearby).toHaveLength(1);
      expect(nearby[0]?.title).toBe('Nearby Pothole in Vijayawada');
    });
  });
});
