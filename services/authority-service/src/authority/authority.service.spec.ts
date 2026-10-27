import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import {
  NotFoundException,
  BadRequestException,
  ForbiddenException,
  ConflictException,
} from '@nestjs/common';
import { CivicLogger } from '@civic-pulse/nest-common';
import {
  AuthorityApplicationStatus,
  DepartmentStatus,
  AssignmentStatus,
  UserRole,
} from '@civic-pulse/contracts';
import { AuthorityService } from './authority.service';
import { DatabaseService } from '../database/database.service';

describe('AuthorityService (Unit & Policy Tests)', () => {
  let service: AuthorityService;

  const applications: any[] = [];
  const departments: any[] = [];
  const assignments: any[] = [];

  const mockDbService = {
    applications: {
      insertOne: jest.fn().mockImplementation(async (doc) => {
        applications.push(doc);
        return { acknowledged: true };
      }),
      findOne: jest.fn().mockImplementation(async (filter) => {
        if (filter._id) {
          return applications.find((a) => a._id === filter._id) || null;
        }
        if (filter.applicantUserId) {
          return (
            applications.find(
              (a) =>
                a.applicantUserId === filter.applicantUserId &&
                (!filter.status || filter.status.$in.includes(a.status)),
            ) || null
          );
        }
        return null;
      }),
      find: jest.fn().mockImplementation((filter: any) => ({
        sort: jest.fn().mockReturnThis(),
        limit: jest.fn().mockReturnThis(),
        next: jest.fn().mockImplementation(async () => {
          return applications.find((a) => a.applicantUserId === filter.applicantUserId) || null;
        }),
        toArray: jest.fn().mockImplementation(async () => {
          let res = applications;
          if (filter.status) {
            res = res.filter((a) => a.status === filter.status);
          }
          if (filter.roleGranted !== undefined) {
            res = res.filter((a) => a.roleGranted === filter.roleGranted);
          }
          return res;
        }),
      })),
      updateOne: jest.fn().mockImplementation(async (filter, update) => {
        const app = applications.find((a) => a._id === filter._id);
        if (app && update.$set) {
          Object.assign(app, update.$set);
        }
        return { modifiedCount: 1 };
      }),
    },
    departments: {
      insertOne: jest.fn().mockImplementation(async (doc) => {
        departments.push(doc);
        return { acknowledged: true };
      }),
      findOne: jest.fn().mockImplementation(async (filter) => {
        if (filter._id) {
          return departments.find((d) => d._id === filter._id) || null;
        }
        if (filter.name) {
          return (
            departments.find((d) => {
              const nameMatch =
                filter.name?.$regex instanceof RegExp
                  ? filter.name.$regex.test(d.name)
                  : d.name.toLowerCase() === filter.name.toString().toLowerCase();
              const jurMatch =
                filter.jurisdiction?.$regex instanceof RegExp
                  ? filter.jurisdiction.$regex.test(d.jurisdiction)
                  : d.jurisdiction.toLowerCase() === filter.jurisdiction.toString().toLowerCase();
              return nameMatch && jurMatch;
            }) || null
          );
        }
        return null;
      }),
      find: jest.fn().mockImplementation((filter: any) => ({
        sort: jest.fn().mockReturnThis(),
        toArray: jest.fn().mockImplementation(async () => {
          if (filter.status) {
            return departments.filter((d) => d.status === filter.status);
          }
          return departments;
        }),
      })),
      updateOne: jest.fn().mockImplementation(async (filter, update) => {
        const dept = departments.find((d) => d._id === filter._id);
        if (dept && update.$set) {
          Object.assign(dept, update.$set);
        }
        return { modifiedCount: 1 };
      }),
    },
    assignments: {
      insertOne: jest.fn().mockImplementation(async (doc) => {
        assignments.push(doc);
        return { acknowledged: true };
      }),
      find: jest.fn().mockImplementation((filter: any) => ({
        sort: jest.fn().mockReturnThis(),
        toArray: jest.fn().mockImplementation(async () => {
          if (filter.reportId) {
            return assignments.filter((a) => a.reportId === filter.reportId);
          }
          if (filter.assignedByUserId) {
            return assignments.filter((a) => a.assignedByUserId === filter.assignedByUserId);
          }
          return assignments;
        }),
      })),
      updateMany: jest.fn().mockImplementation(async (filter, update) => {
        let count = 0;
        for (const a of assignments) {
          if (a.reportId === filter.reportId && a.status === filter.status) {
            if (update.$set) Object.assign(a, update.$set);
            count++;
          }
        }
        return { modifiedCount: count };
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
    applications.length = 0;
    departments.length = 0;
    assignments.length = 0;

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthorityService,
        { provide: DatabaseService, useValue: mockDbService },
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn((key: string) => {
              if (key === 'IDENTITY_SERVICE_URL') return 'http://127.0.0.1:3001';
              if (key === 'REPORTS_SERVICE_URL') return 'http://127.0.0.1:3002';
              if (key === 'INTERNAL_SERVICE_KEY') return 'civic_pulse_internal_service_secret_dev';
              if (key === 'AUTHORITY_INTERNAL_KEY') return 'civic_pulse_authority_internal_secret_dev';
              return null;
            }),
          },
        },
        { provide: CivicLogger, useValue: mockLogger },
      ],
    }).compile();

    service = module.get<AuthorityService>(AuthorityService);

    // Mock verifyReportExists
    jest.spyOn(service, 'verifyReportExists').mockImplementation(async (id: string) => {
      const exists = id !== 'non-existent-report';
      return { exists, authorId: 'author-1', title: 'Test Report' };
    });

    // Mock elevateUserRole S2S call
    (service as any).elevateUserRole = jest.fn().mockResolvedValue(undefined);
  });

  // ===========================================================================
  // Authority Verification Application Tests
  // ===========================================================================
  describe('Authority Verification Applications', () => {
    it('should submit an authority verification application with PENDING status', async () => {
      const app = await service.submitApplication('applicant-1', {
        organization: 'City of Metro',
        departmentRequested: 'Department of Transportation',
        officialRole: 'Civil Engineer Inspector',
        officialEmail: 'inspector@metro.gov',
        officialPhone: '+1-555-0199',
        supportingNotes: 'Badge #4921',
      });

      expect(app.id).toBeDefined();
      expect(app.applicantUserId).toBe('applicant-1');
      expect(app.status).toBe(AuthorityApplicationStatus.PENDING);
    });

    it('should reject duplicate pending application from the same user', async () => {
      await service.submitApplication('applicant-1', {
        organization: 'City of Metro',
        departmentRequested: 'Transportation',
        officialRole: 'Engineer',
        officialEmail: 'eng@metro.gov',
      });

      await expect(
        service.submitApplication('applicant-1', {
          organization: 'City of Metro',
          departmentRequested: 'Transportation',
          officialRole: 'Engineer',
          officialEmail: 'eng@metro.gov',
        }),
      ).rejects.toThrow(ConflictException);
    });

    it('should prohibit self-approval (applicant cannot review their own application)', async () => {
      const app = await service.submitApplication('applicant-1', {
        organization: 'City of Metro',
        departmentRequested: 'Transportation',
        officialRole: 'Engineer',
        officialEmail: 'eng@metro.gov',
      });

      await expect(
        service.reviewApplication(app.id, 'applicant-1', {
          status: AuthorityApplicationStatus.APPROVED,
          reviewDecisionNotes: 'Self approving',
        }),
      ).rejects.toThrow(ForbiddenException);
    });

    it('should approve application by administrator and call Identity role elevation', async () => {
      const app = await service.submitApplication('applicant-1', {
        organization: 'City of Metro',
        departmentRequested: 'Transportation',
        officialRole: 'Engineer',
        officialEmail: 'eng@metro.gov',
      });

      const reviewed = await service.reviewApplication(app.id, 'admin-user', {
        status: AuthorityApplicationStatus.APPROVED,
        reviewDecisionNotes: 'Municipal credentials verified with HR',
      });

      expect(reviewed.status).toBe(AuthorityApplicationStatus.APPROVED);
      expect(reviewed.roleGranted).toBe(true);
      expect(reviewed.reviewedByUserId).toBe('admin-user');
      expect((service as any).elevateUserRole).toHaveBeenCalledWith(
        'applicant-1',
        UserRole.AUTHORITY,
      );
    });

    it('should handle role elevation failure gracefully and record pending role grant state', async () => {
      (service as any).elevateUserRole = jest
        .fn()
        .mockRejectedValue(new BadRequestException('Identity Service network timeout'));

      const app = await service.submitApplication('applicant-2', {
        organization: 'City of Metro',
        departmentRequested: 'Transportation',
        officialRole: 'Engineer',
        officialEmail: 'eng2@metro.gov',
      });

      const reviewed = await service.reviewApplication(app.id, 'admin-user', {
        status: AuthorityApplicationStatus.APPROVED,
        reviewDecisionNotes: 'Approved during transient network partition',
      });

      expect(reviewed.status).toBe(AuthorityApplicationStatus.APPROVED);
      expect(reviewed.roleGranted).toBe(false);
      expect(reviewed.roleGrantError).toContain('Identity Service network timeout');
    });

    it('should reconcile pending role grants idempotently when S2S becomes available', async () => {
      // First submission failed
      (service as any).elevateUserRole = jest
        .fn()
        .mockRejectedValueOnce(new BadRequestException('Identity Service down'))
        .mockResolvedValue(undefined); // Subsequent calls succeed

      const app = await service.submitApplication('applicant-3', {
        organization: 'City of Metro',
        departmentRequested: 'Transportation',
        officialRole: 'Engineer',
        officialEmail: 'eng3@metro.gov',
      });

      await service.reviewApplication(app.id, 'admin-user', {
        status: AuthorityApplicationStatus.APPROVED,
      });

      const unrecon = applications.find((a) => a._id === app.id);
      expect(unrecon.roleGranted).toBe(false);

      // Run reconciliation
      const result = await service.reconcilePendingRoleGrants();
      expect(result.scanned).toBe(1);
      expect(result.reconciled).toBe(1);
      expect(result.failed).toBe(0);

      const reconciledApp = applications.find((a) => a._id === app.id);
      expect(reconciledApp.roleGranted).toBe(true);
      expect(reconciledApp.roleGrantError).toBeUndefined();

      // Running reconciliation again should scan 0 pending
      const rerun = await service.reconcilePendingRoleGrants();
      expect(rerun.scanned).toBe(0);
      expect(rerun.reconciled).toBe(0);
    });
  });

  // ===========================================================================
  // Department Management Tests
  // ===========================================================================
  describe('Department Management', () => {
    it('should create a department in active status', async () => {
      const dept = await service.createDepartment({
        name: 'Public Works',
        jurisdiction: 'Metro District 1',
        description: 'Roadways and infrastructure maintenance',
        publicContactEmail: 'publicworks@metro.gov',
      });

      expect(dept.id).toBeDefined();
      expect(dept.name).toBe('Public Works');
      expect(dept.status).toBe(DepartmentStatus.ACTIVE);
    });

    it('should reject duplicate department in the same jurisdiction', async () => {
      await service.createDepartment({
        name: 'Public Works',
        jurisdiction: 'Metro District 1',
      });

      await expect(
        service.createDepartment({
          name: 'Public Works',
          jurisdiction: 'Metro District 1',
        }),
      ).rejects.toThrow(ConflictException);
    });

    it('should allow department status update to INACTIVE', async () => {
      const dept = await service.createDepartment({
        name: 'Sanitation',
        jurisdiction: 'Metro District 1',
      });

      const updated = await service.updateDepartment(dept.id, {
        status: DepartmentStatus.INACTIVE,
      });

      expect(updated.status).toBe(DepartmentStatus.INACTIVE);
    });
  });

  // ===========================================================================
  // Report Assignments Tests
  // ===========================================================================
  describe('Report Assignments', () => {
    it('should assign a report to an active department', async () => {
      const dept = await service.createDepartment({
        name: 'Streets Department',
        jurisdiction: 'Metro Center',
      });

      const assignment = await service.assignReport('report-101', 'authority-user-1', {
        departmentId: dept.id,
        assignmentReason: 'High priority pothole requiring asphalt patching',
      });

      expect(assignment.id).toBeDefined();
      expect(assignment.reportId).toBe('report-101');
      expect(assignment.departmentId).toBe(dept.id);
      expect(assignment.departmentName).toBe('Streets Department');
      expect(assignment.status).toBe(AssignmentStatus.ASSIGNED);
    });

    it('should reject assignment if report does not exist in ReportsService', async () => {
      const dept = await service.createDepartment({
        name: 'Traffic Control',
        jurisdiction: 'Metro Center',
      });

      await expect(
        service.assignReport('non-existent-report', 'authority-user-1', {
          departmentId: dept.id,
        }),
      ).rejects.toThrow(NotFoundException);
    });

    it('should reject assignment to an INACTIVE department', async () => {
      const dept = await service.createDepartment({
        name: 'Decommissioned Unit',
        jurisdiction: 'Metro Center',
      });
      await service.updateDepartment(dept.id, { status: DepartmentStatus.INACTIVE });

      await expect(
        service.assignReport('report-101', 'authority-user-1', {
          departmentId: dept.id,
        }),
      ).rejects.toThrow(BadRequestException);
    });

    it('should preserve reassignment history when reassigning report to another department', async () => {
      const dept1 = await service.createDepartment({
        name: 'Initial Triage',
        jurisdiction: 'Metro',
      });
      const dept2 = await service.createDepartment({
        name: 'Heavy Engineering',
        jurisdiction: 'Metro',
      });

      // First assignment
      await service.assignReport('report-101', 'authority-user-1', {
        departmentId: dept1.id,
        assignmentReason: 'Initial intake',
      });

      // Second assignment (reassignment)
      await service.assignReport('report-101', 'authority-user-2', {
        departmentId: dept2.id,
        assignmentReason: 'Escalated to heavy engineering team',
      });

      const history = await service.getReportAssignments('report-101');
      expect(history.length).toBe(2);

      const reassigned = history.find((a) => a.departmentId === dept1.id);
      const current = history.find((a) => a.departmentId === dept2.id);

      expect(reassigned?.status).toBe(AssignmentStatus.REASSIGNED);
      expect(current?.status).toBe(AssignmentStatus.ASSIGNED);
    });
  });

  // ===========================================================================
  // Representative Directory, Matching, Evidence & Claims Tests
  // ===========================================================================
  describe('Representative Directory & Geographic Matching', () => {
    const jurisdictions: any[] = [];
    const representatives: any[] = [];
    const reportAssociations: any[] = [];
    const responsibilityRules: any[] = [];
    const resolutionEvidence: any[] = [];
    const profileClaims: any[] = [];

    beforeEach(() => {
      jurisdictions.length = 0;
      representatives.length = 0;
      reportAssociations.length = 0;
      responsibilityRules.length = 0;
      resolutionEvidence.length = 0;
      profileClaims.length = 0;

      // Attach collections to mockDbService
      (mockDbService as any).jurisdictions = {
        insertOne: jest.fn().mockImplementation(async (doc) => {
          jurisdictions.push(doc);
          return { acknowledged: true };
        }),
        updateOne: jest.fn().mockImplementation(async (filter, update, opts) => {
          let j = jurisdictions.find((x) => x._id === filter._id);
          if (!j && opts?.upsert) {
            j = { _id: filter._id, ...update.$setOnInsert, ...update.$set };
            jurisdictions.push(j);
          } else if (j && update.$set) {
            Object.assign(j, update.$set);
          }
          return { upsertedCount: j ? 1 : 0 };
        }),
        find: jest.fn().mockImplementation(() => ({
          toArray: jest.fn().mockResolvedValue(jurisdictions),
        })),
        findOne: jest.fn().mockImplementation(async (f) => jurisdictions.find((x) => x._id === f._id) || null),
        countDocuments: jest.fn().mockImplementation(async (filter: any) => {
          let res = jurisdictions;
          if (filter?.type) res = res.filter((x) => x.type === filter.type);
          if (filter?.hasBoundaryGeometry !== undefined) res = res.filter((x) => x.hasBoundaryGeometry === filter.hasBoundaryGeometry);
          return res.length;
        }),
      };

      (mockDbService as any).representatives = {
        insertOne: jest.fn().mockImplementation(async (doc) => {
          representatives.push(doc);
          return { acknowledged: true };
        }),
        updateOne: jest.fn().mockImplementation(async (filter, update, opts) => {
          let r = representatives.find((x) => x._id === filter._id);
          if (!r && opts?.upsert) {
            r = { _id: filter._id, ...update.$setOnInsert, ...update.$set };
            representatives.push(r);
          } else if (r && update.$set) {
            Object.assign(r, update.$set);
          }
          return { upsertedCount: r ? 1 : 0 };
        }),
        findOne: jest.fn().mockImplementation(async (f) => {
          if (f._id) return representatives.find((x) => x._id === f._id) || null;
          if (f.publicName && f.jurisdictionId && f.officeType) {
            return (
              representatives.find(
                (x) =>
                  x.publicName === f.publicName &&
                  x.jurisdictionId === f.jurisdictionId &&
                  x.officeType === f.officeType,
              ) || null
            );
          }
          if (f.claimedByUserId) {
            return representatives.find((x) => x.claimedByUserId === f.claimedByUserId) || null;
          }
          return null;
        }),
        find: jest.fn().mockImplementation((filter: any) => ({
          sort: jest.fn().mockReturnThis(),
          skip: jest.fn().mockReturnThis(),
          limit: jest.fn().mockReturnThis(),
          toArray: jest.fn().mockImplementation(async () => {
            let res = representatives;
            if (filter.officeType) res = res.filter((x) => x.officeType === filter.officeType);
            if (filter.termStatus) res = res.filter((x) => x.termStatus === filter.termStatus);
            if (filter.jurisdictionId?.$in) res = res.filter((x) => filter.jurisdictionId.$in.includes(x.jurisdictionId));
            return res;
          }),
        })),
        countDocuments: jest.fn().mockImplementation(async () => representatives.length),
      };

      (mockDbService as any).reportAssociations = {
        updateOne: jest.fn().mockImplementation(async (filter, update, opts) => {
          let a = reportAssociations.find(
            (x) =>
              x.reportId === filter.reportId &&
              x.representativeId === filter.representativeId &&
              x.relationshipType === filter.relationshipType,
          );
          let wasUpserted = false;
          if (!a && opts?.upsert) {
            a = {
              _id: `assoc-${Date.now()}-${Math.random()}`,
              reportId: filter.reportId,
              representativeId: filter.representativeId,
              relationshipType: filter.relationshipType,
              ...update.$setOnInsert,
              ...update.$set,
            };
            reportAssociations.push(a);
            wasUpserted = true;
          } else if (a && update.$set) {
            Object.assign(a, update.$set);
          }
          return { upsertedCount: wasUpserted ? 1 : 0 };
        }),
        updateMany: jest.fn().mockImplementation(async (filter, update) => {
          let count = 0;
          for (const a of reportAssociations) {
            if (a.reportId === filter.reportId) {
              if (update.$set) Object.assign(a, update.$set);
              count++;
            }
          }
          return { modifiedCount: count };
        }),
        find: jest.fn().mockImplementation((filter: any) => ({
          sort: jest.fn().mockReturnThis(),
          skip: jest.fn().mockReturnThis(),
          limit: jest.fn().mockReturnThis(),
          toArray: jest.fn().mockImplementation(async () => {
            let res = reportAssociations;
            if (filter.reportId) res = res.filter((x) => x.reportId === filter.reportId);
            if (filter.representativeId) res = res.filter((x) => x.representativeId === filter.representativeId);
            if (filter.reportStatus) res = res.filter((x) => x.reportStatus === filter.reportStatus);
            return res;
          }),
        })),
        countDocuments: jest.fn().mockImplementation(async (filter: any) => {
          let res = reportAssociations;
          if (filter.reportId) res = res.filter((x) => x.reportId === filter.reportId);
          if (filter.representativeId) res = res.filter((x) => x.representativeId === filter.representativeId);
          if (filter.reportStatus) res = res.filter((x) => x.reportStatus === filter.reportStatus);
          return res.length;
        }),
      };

      (mockDbService as any).responsibilityRules = {
        updateOne: jest.fn().mockImplementation(async (filter, update, opts) => {
          let r = responsibilityRules.find(
            (x) => x.category === filter.category && x.jurisdictionType === filter.jurisdictionType,
          );
          if (!r && opts?.upsert) {
            r = {
              category: filter.category,
              jurisdictionType: filter.jurisdictionType,
              ...update.$setOnInsert,
              ...update.$set,
            };
            responsibilityRules.push(r);
          } else if (r && update.$set) {
            Object.assign(r, update.$set);
          }
          return { upsertedCount: r ? 1 : 0 };
        }),
        find: jest.fn().mockImplementation(() => ({
          toArray: jest.fn().mockResolvedValue(responsibilityRules),
        })),
        findOne: jest.fn().mockImplementation(async (filter: any) => {
          return (
            responsibilityRules.find(
              (r) =>
                r.category === filter.category &&
                (!filter.jurisdictionType || r.jurisdictionType === filter.jurisdictionType),
            ) || null
          );
        }),
      };

      (mockDbService as any).resolutionEvidence = {
        insertOne: jest.fn().mockImplementation(async (doc) => {
          resolutionEvidence.push(doc);
          return { acknowledged: true };
        }),
        find: jest.fn().mockImplementation((filter: any) => ({
          sort: jest.fn().mockReturnThis(),
          toArray: jest.fn().mockImplementation(async () => {
            return resolutionEvidence.filter((e) => e.reportId === filter.reportId);
          }),
        })),
        findOne: jest.fn().mockImplementation(async (filter: any) => {
          return resolutionEvidence.find((e) => e._id === filter._id) || null;
        }),
        updateOne: jest.fn().mockImplementation(async (filter: any, update: any) => {
          const e = resolutionEvidence.find((x) => x._id === filter._id);
          if (e && update.$set) Object.assign(e, update.$set);
          return { modifiedCount: 1 };
        }),
      };

      (mockDbService as any).profileClaims = {
        insertOne: jest.fn().mockImplementation(async (doc) => {
          profileClaims.push(doc);
          return { acknowledged: true };
        }),
        findOne: jest.fn().mockImplementation(async (filter: any) => {
          return (
            profileClaims.find(
              (c) =>
                (!filter.representativeId || c.representativeId === filter.representativeId) &&
                (!filter.claimantUserId || c.claimantUserId === filter.claimantUserId) &&
                (!filter._id || c._id === filter._id),
            ) || null
          );
        }),
        updateOne: jest.fn().mockImplementation(async (filter: any, update: any) => {
          const c = profileClaims.find((x) => x._id === filter._id);
          if (c && update.$set) Object.assign(c, update.$set);
          return { modifiedCount: 1 };
        }),
      };
    });

    it('1. should sync verified official public representatives and prevent duplicates', async () => {
      const summary1 = await service.syncOfficialRepresentativeData();
      expect(summary1.createdCount).toBeGreaterThan(0);
      expect(summary1.rejectedCount).toBe(0);

      const count1 = representatives.length;
      // Second sync must be idempotent
      const summary2 = await service.syncOfficialRepresentativeData();
      expect(summary2.unchangedCount).toBe(count1);
      expect(representatives.length).toBe(count1);
    });

    it('2. should match report coordinates and location hierarchy to multiple representative tiers', async () => {
      await service.syncOfficialRepresentativeData();

      // Submit report in Visakhapatnam, Bheemili, Ward 12
      const matchResult = await service.matchAndAssociateReport({
        reportId: 'rep-geo-101',
        category: 'POTHOLE',
        coordinates: [83.37, 17.79], // [lng, lat]
        administrativeContext: {
          districtId: 'visakhapatnam',
          mandalId: 'bheemunipatnam',
        },
        status: 'OPEN' as any,
      });

      expect(matchResult.associationsCreated).toBeGreaterThanOrEqual(2);
      expect(matchResult.responsibleDepartment?.name).toBe('Roads & Infrastructure Maintenance Division');

      const repAssocs = await (mockDbService as any).reportAssociations
        .find({ reportId: 'rep-geo-101' })
        .toArray();
      expect(repAssocs.some((a: any) => a.relationshipType === 'CONSTITUENCY_REPRESENTATIVE')).toBe(true);
      expect(repAssocs.some((a: any) => a.relationshipType === 'AREA_REPRESENTATIVE')).toBe(true);
    });

    it('3. should distinguish responsible department from representative profile', async () => {
      await service.syncOfficialRepresentativeData();

      const match = await service.matchAndAssociateReport({
        reportId: 'rep-elec-202',
        category: 'STREETLIGHT',
        coordinates: [83.21, 17.68],
        administrativeContext: {
          districtId: 'visakhapatnam',
        },
        status: 'OPEN' as any,
      });

      expect(match.responsibleDepartment?.name).toBe('Municipal Electrical & Lighting Wing');
    });

    it('4. should submit and verify resolution evidence separately from immutable before photo', async () => {
      const ev = await service.submitResolutionEvidence(
        'rep-geo-101',
        { sub: 'resident-user-1', role: UserRole.RESIDENT, displayName: 'Resident Rao' },
        {
          evidenceType: 'AFTER' as any,
          media: {
            mediaId: 'med-99',
            publicId: 'res-after-99',
            url: 'https://cloudinary.com/after99.jpg',
            secureUrl: 'https://cloudinary.com/after99.jpg',
            format: 'jpg',
            resourceType: 'image',
            bytes: 40000,
          },
          description: 'Road patch laid and rolled',
        },
      );

      expect(ev.id).toBeDefined();
      expect(ev.verificationStatus).toBe('PENDING'); // Resident uploads are PENDING until verified

      const verified = await service.verifyResolutionEvidence(
        ev.id,
        'moderator-1',
        {
          verified: true,
          rejectionReason: undefined,
        },
      );

      expect(verified.verificationStatus).toBe('VERIFIED');
      expect(verified.verifiedByUserId).toBe('moderator-1');
    });

    it('5. should handle profile claiming lifecycle cleanly without granting premature privileges', async () => {
      await service.syncOfficialRepresentativeData();
      const rep = representatives[0];

      const claim = await service.submitProfileClaim(rep._id, 'claimant-user-1', {
        officialEmailUsed: 'office@representative.gov.in',
        proofDetails: 'Gazette notification of election certificate #104',
      });

      expect(claim.status).toBe('CLAIM_PENDING');

      // Admin approves claim
      const reviewed = await service.reviewProfileClaim(
        claim.id,
        'admin-supervisor',
        {
          approved: true,
          decisionNotes: 'Election certificate verified against ECI records',
        },
      );

      expect(reviewed.status).toBe('CLAIMED_VERIFIED');
      expect(rep.claimStatus).toBe('CLAIMED_VERIFIED');
    });

    it('6. should report accurate statewide coverage metrics without implying full ward coverage', async () => {
      await service.syncOfficialRepresentativeData();
      const coverage = await service.getCoverageReport();

      expect(coverage.totalStatewideDistricts).toBe(28);
      expect(coverage.statewideDistrictsCovered).toBe(5);
      expect(coverage.wardLevelExactMappingAvailable).toBe(false);
      expect(coverage.wardLevelCoverageScope).toBe('PILOT_PARTIAL');
      expect(coverage.dataCompletenessNotes).toContain('covers 5 of 28 Andhra Pradesh districts');
    });

    it('7. should deduplicate report associations idempotently on repeated matching calls', async () => {
      await service.syncOfficialRepresentativeData();

      const reportPayload: {
        reportId: string;
        category: string;
        coordinates: [number, number];
        administrativeContext: {
          districtId: string;
          mandalId: string;
        };
        status: any;
      } = {
        reportId: 'rep-dedup-test-999',
        category: 'POTHOLE',
        coordinates: [83.334, 17.742],
        administrativeContext: {
          districtId: 'visakhapatnam',
          mandalId: 'visakhapatnam_urban',
        },
        status: 'SUBMITTED' as any,
      };

      const match1 = await service.matchAndAssociateReport(reportPayload);
      expect(match1.associationsCreated).toBeGreaterThan(0);

      const match2 = await service.matchAndAssociateReport(reportPayload);
      expect(match2.associationsCreated).toBe(0); // 0 new associations created on repeat call

      const assocs = await (mockDbService as any).reportAssociations
        .find({ reportId: 'rep-dedup-test-999' })
        .toArray();
      const uniqueKeys = new Set(assocs.map((a: any) => `${a.representativeId}_${a.relationshipType}`));
      expect(uniqueKeys.size).toBe(assocs.length); // strictly unique
    });

    it('8. should sync report resolution status to representative associations and recalculate accountability', async () => {
      await service.syncOfficialRepresentativeData();

      // Associate report with representative
      await service.matchAndAssociateReport({
        reportId: 'rep-status-sync-1',
        category: 'POTHOLE',
        administrativeContext: {
          districtId: 'visakhapatnam',
        },
        status: 'IN_PROGRESS' as any,
      });

      // Status sync
      const modified = await service.updateReportStatusInAssociations('rep-status-sync-1', 'RESOLVED' as any);
      expect(modified).toBeGreaterThan(0);

      // Verify accountability summary updates
      const summary = await service.getRepresentativeAccountabilitySummary('rep_mp_sribharat');
      expect(summary.totalAssociatedReports).toBeGreaterThanOrEqual(1);
      expect(summary.resolvedReports).toBeGreaterThanOrEqual(1);
    });
  });
});
