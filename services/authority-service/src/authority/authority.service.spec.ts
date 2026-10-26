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
});
