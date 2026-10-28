import {
  Injectable,
  NotFoundException,
  BadRequestException,
  ForbiddenException,
  ConflictException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { v4 as uuidv4 } from 'uuid';
import http from 'http';
import { CivicLogger, dispatchNotificationEvent } from '@civic-pulse/nest-common';
import {
  AuthorityApplicationDto,
  AuthorityApplicationStatus,
  DepartmentDto,
  DepartmentStatus,
  ReportAssignmentDto,
  AssignmentStatus,
  PublicAssignmentViewDto,
  UserRole,
  NotificationEventType,
} from '@civic-pulse/contracts';
import { DatabaseService } from '../database/database.service.js';
import {
  CreateAuthorityApplicationDto,
  ReviewAuthorityApplicationDto,
  CreateDepartmentDto,
  UpdateDepartmentDto,
  CreateReportAssignmentDto,
} from '../dto/authority.dto.js';
import {
  AuthorityApplicationDocument,
  DepartmentDocument,
  ReportAssignmentDocument,
  RepresentativeProfileDocument,
  JurisdictionDocument,
  ResolutionEvidenceDocument,
  ProfileClaimRequestDocument,
} from '../models/authority.models.js';
import {
  RepresentativeProfileDto,
  RepresentativeAccountabilitySummaryDto,
  ResolutionEvidenceDto,
  ProfileClaimRequestDto,
  RepresentativeImportSummaryDto,
  ReportRepresentativeAssociationDto,
  JurisdictionDto,
  RepresentativeOfficeType,
  RepresentativeTermStatus,
  RepresentativeVerificationStatus,
  ProfileClaimStatus,
  JurisdictionType,
  ReportRepresentativeRelationType,
  MatchingMethod,
  EvidenceType,
  EvidenceVerificationStatus,
  ReportStatus,
} from '@civic-pulse/contracts';
import {
  QueryRepresentativesDto,
  SubmitProfileClaimDtoClass,
  ReviewProfileClaimDtoClass,
  UpdateRepresentativeProfileDtoClass,
  SubmitResolutionEvidenceDtoClass,
  VerifyResolutionEvidenceDtoClass,
} from '../dto/authority.dto.js';
import {
  SEED_JURISDICTIONS,
  SEED_REPRESENTATIVES,
  SEED_RESPONSIBILITY_RULES,
  AP_PROVENANCE_GOI_ECI,
} from './representatives.data.js';

@Injectable()
export class AuthorityService {
  private readonly identityServiceUrl: string;
  private readonly reportsServiceUrl: string;
  private readonly notificationsServiceUrl: string;
  private readonly internalServiceKey: string;
  private readonly authorityInternalKey: string;
  private readonly notificationsInternalKey: string;

  constructor(
    private readonly db: DatabaseService,
    private readonly configService: ConfigService,
    private readonly logger: CivicLogger,
  ) {
    this.logger.setContext('Authority:AuthorityService');
    this.identityServiceUrl =
      this.configService.get<string>('IDENTITY_SERVICE_URL') ||
      'http://127.0.0.1:3001';
    this.reportsServiceUrl =
      this.configService.get<string>('REPORTS_SERVICE_URL') ||
      'http://127.0.0.1:3002';
    this.notificationsServiceUrl =
      this.configService.get<string>('NOTIFICATIONS_SERVICE_URL') ||
      'http://127.0.0.1:3005';
    this.internalServiceKey =
      this.configService.get<string>('INTERNAL_SERVICE_KEY') ||
      'civic_pulse_internal_service_secret_dev';
    this.authorityInternalKey =
      this.configService.get<string>('AUTHORITY_INTERNAL_KEY') ||
      'civic_pulse_authority_internal_secret_dev';
    this.notificationsInternalKey =
      this.configService.get<string>('NOTIFICATIONS_INTERNAL_KEY') ||
      'civic_pulse_notifications_internal_secret_dev';
  }

  async onModuleInit(): Promise<void> {
    try {
      this.logger.log('AuthorityService initialized. Running initial representative synchronization...');
      await this.syncOfficialRepresentativeData();
    } catch (err: any) {
      this.logger.error(`Initial representative synchronization failed: ${err.message}`, err.stack);
    }
  }

  // ===========================================================================
  // S2S Report Validation
  // ===========================================================================
  async verifyReportExists(
    reportId: string,
  ): Promise<{ exists: boolean; authorId?: string; title?: string }> {
    const targetUrl = new URL(
      `/api/v1/internal/reports/${encodeURIComponent(reportId)}/exists`,
      this.reportsServiceUrl,
    );

    return new Promise<{ exists: boolean; authorId?: string; title?: string }>((resolve) => {
      const req = http.get(
        targetUrl.href,
        {
          headers: {
            'x-internal-service-token': this.internalServiceKey,
            'x-internal-service-name': 'authority-service',
          },
          timeout: 4000,
        },
        (res) => {
          let body = '';
          res.on('data', (c) => (body += c));
          res.on('end', () => {
            try {
              const parsed = JSON.parse(body);
              const exists = parsed?.data?.exists ?? parsed?.exists ?? false;
              const authorId = parsed?.data?.authorId ?? parsed?.authorId;
              const title = parsed?.data?.title ?? parsed?.title;
              resolve({ exists: Boolean(exists), authorId, title });
            } catch {
              resolve({ exists: false });
            }
          });
        },
      );

      req.on('error', () => resolve({ exists: false }));
      req.on('timeout', () => {
        req.destroy();
        resolve({ exists: false });
      });
    });
  }

  // ===========================================================================
  // S2S Identity Role Promotion
  // ===========================================================================
  private async elevateUserRole(userId: string, newRole: UserRole): Promise<void> {
    const targetUrl = new URL(
      `/api/v1/auth/internal/users/${encodeURIComponent(userId)}/role`,
      this.identityServiceUrl,
    );

    const postData = JSON.stringify({
      role: newRole,
    });

    return new Promise<void>((resolve, reject) => {
      const req = http.request(
        {
          hostname: targetUrl.hostname,
          port: targetUrl.port,
          path: targetUrl.pathname,
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(postData),
            'x-internal-service-token': this.authorityInternalKey,
            'x-internal-service-name': 'authority-service',
          },
          timeout: 5000,
        },
        (res) => {
          let b = '';
          res.on('data', (c) => (b += c));
          res.on('end', () => {
            if (res.statusCode && res.statusCode >= 200 && res.statusCode < 300) {
              this.logger.log(`Elevated user ${userId} to role ${newRole} via Identity Service`);
              resolve();
            } else {
              this.logger.error(`Failed to elevate role for ${userId}: ${b}`);
              reject(
                new BadRequestException(
                  `Failed to update user role in Identity Service: ${b}`,
                ),
              );
            }
          });
        },
      );

      req.on('error', (err) => {
        this.logger.error(`Error communicating with Identity Service: ${err.message}`);
        reject(
          new BadRequestException(
            `Identity Service communication error: ${err.message}`,
          ),
        );
      });

      req.on('timeout', () => {
        req.destroy();
        reject(new BadRequestException('Identity Service role elevation timed out'));
      });

      req.write(postData);
      req.end();
    });
  }

  // ===========================================================================
  // Authority Verification Applications
  // ===========================================================================
  async submitApplication(
    userId: string,
    dto: CreateAuthorityApplicationDto,
  ): Promise<AuthorityApplicationDto> {
    // Check if user already has an active or pending application
    const existing = await this.db.applications.findOne({
      applicantUserId: userId,
      status: { $in: [AuthorityApplicationStatus.PENDING, AuthorityApplicationStatus.APPROVED] },
    });

    if (existing) {
      if (existing.status === AuthorityApplicationStatus.APPROVED) {
        throw new ConflictException('You are already an approved authority member');
      }
      throw new ConflictException(
        'You already have an authority verification application pending review',
      );
    }

    const now = new Date();
    const doc: AuthorityApplicationDocument = {
      _id: uuidv4(),
      applicantUserId: userId,
      organization: dto.organization.trim(),
      departmentRequested: dto.departmentRequested.trim(),
      officialRole: dto.officialRole.trim(),
      officialEmail: dto.officialEmail.trim().toLowerCase(),
      officialPhone: dto.officialPhone?.trim(),
      supportingNotes: dto.supportingNotes?.trim(),
      status: AuthorityApplicationStatus.PENDING,
      createdAt: now,
      updatedAt: now,
    };

    await this.db.applications.insertOne(doc);
    this.logger.log(`Authority application submitted: ${doc._id} by ${userId}`);

    return this.mapToApplicationDto(doc);
  }

  async getMyApplication(userId: string): Promise<AuthorityApplicationDto | null> {
    const doc = await this.db.applications
      .find({ applicantUserId: userId })
      .sort({ createdAt: -1 })
      .limit(1)
      .next();

    return doc ? this.mapToApplicationDto(doc) : null;
  }

  async listPendingApplications(): Promise<AuthorityApplicationDto[]> {
    const docs = await this.db.applications
      .find({ status: AuthorityApplicationStatus.PENDING })
      .sort({ createdAt: 1 })
      .toArray();

    return docs.map((d) => this.mapToApplicationDto(d));
  }

  async reviewApplication(
    applicationId: string,
    reviewerUserId: string,
    dto: ReviewAuthorityApplicationDto,
  ): Promise<AuthorityApplicationDto> {
    const app = await this.db.applications.findOne({ _id: applicationId });
    if (!app) {
      throw new NotFoundException(`Application "${applicationId}" not found`);
    }

    // Safeguard: Reviewer cannot be applicant
    if (app.applicantUserId === reviewerUserId) {
      throw new ForbiddenException(
        'Self-approval prohibited: you cannot review your own authority verification application',
      );
    }

    // If application was already approved and role was granted, prevent re-review
    if (app.status === AuthorityApplicationStatus.APPROVED && app.roleGranted !== false) {
      throw new BadRequestException(
        `Application is already in "${app.status}" state and cannot be re-reviewed`,
      );
    }

    if (app.status === AuthorityApplicationStatus.REJECTED) {
      throw new BadRequestException(
        `Application is already in "${app.status}" state and cannot be re-reviewed`,
      );
    }

    const now = new Date();

    if (dto.status === AuthorityApplicationStatus.REJECTED) {
      const eventId = `${applicationId}-review`;
      await this.db.applications.updateOne(
        { _id: applicationId },
        {
          $set: {
            status: AuthorityApplicationStatus.REJECTED,
            reviewedByUserId: reviewerUserId,
            reviewDecisionNotes: dto.reviewDecisionNotes?.trim(),
            reviewedAt: now,
            notificationDispatched: false,
            updatedAt: now,
          },
        },
      );

      // Dispatch rejection notification event with deterministic eventId
      dispatchNotificationEvent({
        notificationsServiceUrl: this.notificationsServiceUrl,
        internalServiceToken: this.notificationsInternalKey,
        eventId,
        eventType: NotificationEventType.AUTHORITY_APPLICATION_REVIEWED,
        aggregateId: applicationId,
        payload: {
          applicationId,
          applicantUserId: app.applicantUserId,
          status: 'REJECTED',
          reviewedByUserId: reviewerUserId,
          decisionNotes: dto.reviewDecisionNotes?.trim(),
        },
        logger: this.logger,
      })
        .then(async (delivered) => {
          if (delivered) {
            await this.db.applications.updateOne(
              { _id: applicationId },
              {
                $set: {
                  notificationDispatched: true,
                  notificationDispatchedAt: new Date(),
                },
              },
            );
          } else {
            await this.db.applications.updateOne(
              { _id: applicationId },
              {
                $set: {
                  notificationDispatched: false,
                  notificationDispatchError: 'Transient delivery failure',
                },
              },
            );
          }
        })
        .catch((err) => {
          this.logger.warn(`Failed to dispatch application rejection event: ${err.message}`);
        });

      const updated = await this.db.applications.findOne({ _id: applicationId });
      return this.mapToApplicationDto(updated!);
    }

    // Approval flow: Two-phase state transition
    let roleGranted = false;
    let roleGrantError: string | undefined = undefined;

    try {
      await this.elevateUserRole(app.applicantUserId, UserRole.AUTHORITY);
      roleGranted = true;
    } catch (err: any) {
      roleGranted = false;
      roleGrantError = err?.message || 'Failed to communicate with Identity Service';
      this.logger.error(
        `Application ${applicationId} approved but S2S role elevation failed: ${roleGrantError}`,
      );
    }

    const eventId = `${applicationId}-review`;
    await this.db.applications.updateOne(
      { _id: applicationId },
      {
        $set: {
          status: AuthorityApplicationStatus.APPROVED,
          roleGranted,
          roleGrantError,
          reviewedByUserId: reviewerUserId,
          reviewDecisionNotes: dto.reviewDecisionNotes?.trim(),
          reviewedAt: now,
          notificationDispatched: false,
          updatedAt: now,
        },
      },
    );

    // Dispatch approval notification event with deterministic eventId
    dispatchNotificationEvent({
      notificationsServiceUrl: this.notificationsServiceUrl,
      internalServiceToken: this.notificationsInternalKey,
      eventId,
      eventType: NotificationEventType.AUTHORITY_APPLICATION_REVIEWED,
      aggregateId: applicationId,
      payload: {
        applicationId,
        applicantUserId: app.applicantUserId,
        status: 'APPROVED',
        reviewedByUserId: reviewerUserId,
        decisionNotes: dto.reviewDecisionNotes?.trim(),
      },
      logger: this.logger,
    })
      .then(async (delivered) => {
        if (delivered) {
          await this.db.applications.updateOne(
            { _id: applicationId },
            {
              $set: {
                notificationDispatched: true,
                notificationDispatchedAt: new Date(),
              },
            },
          );
        } else {
          await this.db.applications.updateOne(
            { _id: applicationId },
            {
              $set: {
                notificationDispatched: false,
                notificationDispatchError: 'Transient delivery failure',
              },
            },
          );
        }
      })
      .catch((err) => {
        this.logger.warn(`Failed to dispatch application approval event: ${err.message}`);
      });

    const updated = await this.db.applications.findOne({ _id: applicationId });
    return this.mapToApplicationDto(updated!);
  }

  // ===========================================================================
  // Reconciliation for Pending / Failed Role Grants
  // ===========================================================================
  async reconcilePendingRoleGrants(): Promise<{
    scanned: number;
    reconciled: number;
    failed: number;
  }> {
    // Only query APPROVED applications where role grant failed or was interrupted
    const pendingApps = await this.db.applications
      .find({
        status: AuthorityApplicationStatus.APPROVED,
        roleGranted: false,
      })
      .toArray();

    let reconciled = 0;
    let failed = 0;

    for (const app of pendingApps) {
      try {
        await this.elevateUserRole(app.applicantUserId, UserRole.AUTHORITY);
        await this.db.applications.updateOne(
          { _id: app._id },
          {
            $set: {
              roleGranted: true,
              roleGrantError: undefined,
              updatedAt: new Date(),
            },
          },
        );
        reconciled++;
        this.logger.log(`Reconciled pending role grant for application ${app._id}`);
      } catch (err: any) {
        failed++;
        this.logger.error(
          `Reconciliation failed for application ${app._id}: ${err?.message}`,
        );
      }
    }

    return {
      scanned: pendingApps.length,
      reconciled,
      failed,
    };
  }

  // ===========================================================================
  // Departments Management
  // ===========================================================================
  async createDepartment(dto: CreateDepartmentDto): Promise<DepartmentDto> {
    const existing = await this.db.departments.findOne({
      name: { $regex: new RegExp(`^${dto.name.trim()}$`, 'i') },
      jurisdiction: { $regex: new RegExp(`^${dto.jurisdiction.trim()}$`, 'i') },
    });

    if (existing) {
      throw new ConflictException(
        `Department "${dto.name}" already exists in jurisdiction "${dto.jurisdiction}"`,
      );
    }

    const now = new Date();
    const doc: DepartmentDocument = {
      _id: uuidv4(),
      name: dto.name.trim(),
      jurisdiction: dto.jurisdiction.trim(),
      description: dto.description?.trim(),
      publicContactEmail: dto.publicContactEmail?.trim().toLowerCase(),
      publicContactPhone: dto.publicContactPhone?.trim(),
      status: DepartmentStatus.ACTIVE,
      createdAt: now,
      updatedAt: now,
    };

    await this.db.departments.insertOne(doc);
    return this.mapToDepartmentDto(doc);
  }

  async listDepartments(includeInactive = false): Promise<DepartmentDto[]> {
    const filter = includeInactive ? {} : { status: DepartmentStatus.ACTIVE };
    const docs = await this.db.departments.find(filter).sort({ name: 1 }).toArray();
    return docs.map((d) => this.mapToDepartmentDto(d));
  }

  async updateDepartment(
    id: string,
    dto: UpdateDepartmentDto,
  ): Promise<DepartmentDto> {
    const dept = await this.db.departments.findOne({ _id: id });
    if (!dept) {
      throw new NotFoundException(`Department "${id}" not found`);
    }

    const updateFields: any = { updatedAt: new Date() };
    if (dto.name !== undefined) updateFields.name = dto.name.trim();
    if (dto.jurisdiction !== undefined) updateFields.jurisdiction = dto.jurisdiction.trim();
    if (dto.description !== undefined) updateFields.description = dto.description.trim();
    if (dto.publicContactEmail !== undefined)
      updateFields.publicContactEmail = dto.publicContactEmail.trim().toLowerCase();
    if (dto.publicContactPhone !== undefined)
      updateFields.publicContactPhone = dto.publicContactPhone.trim();
    if (dto.status !== undefined) updateFields.status = dto.status;

    await this.db.departments.updateOne({ _id: id }, { $set: updateFields });
    const updated = await this.db.departments.findOne({ _id: id });
    return this.mapToDepartmentDto(updated!);
  }

  // ===========================================================================
  // Report Assignments
  // ===========================================================================
  async assignReport(
    reportId: string,
    assignerUserId: string,
    dto: CreateReportAssignmentDto,
  ): Promise<ReportAssignmentDto> {
    // 1. Verify report exists in ReportsService
    const reportExists = await this.verifyReportExists(reportId);
    if (!reportExists.exists) {
      throw new NotFoundException(`Report with ID "${reportId}" not found`);
    }

    // 2. Verify department exists and is ACTIVE
    const department = await this.db.departments.findOne({ _id: dto.departmentId });
    if (!department) {
      throw new NotFoundException(`Department "${dto.departmentId}" not found`);
    }
    if (department.status !== DepartmentStatus.ACTIVE) {
      throw new BadRequestException(
        `Department "${department.name}" is INACTIVE and cannot receive assignments`,
      );
    }

    const now = new Date();

    // 3. Mark previous active assignment as REASSIGNED (preserving history)
    await this.db.assignments.updateMany(
      { reportId, status: AssignmentStatus.ASSIGNED },
      { $set: { status: AssignmentStatus.REASSIGNED, updatedAt: now } },
    );

    // 4. Create new assignment record
    const doc: ReportAssignmentDocument = {
      _id: uuidv4(),
      reportId,
      departmentId: department._id,
      departmentName: department.name,
      assignedByUserId: assignerUserId,
      assignmentReason: dto.assignmentReason?.trim(),
      status: AssignmentStatus.ASSIGNED,
      notificationDispatched: false,
      assignedAt: now,
      updatedAt: now,
    };

    await this.db.assignments.insertOne(doc);
    this.logger.log(`Report ${reportId} assigned to department ${department.name}`);

    // Dispatch assignment event to Notifications Service
    if (reportExists.authorId) {
      dispatchNotificationEvent({
        notificationsServiceUrl: this.notificationsServiceUrl,
        internalServiceToken: this.notificationsInternalKey,
        eventId: doc._id,
        eventType: NotificationEventType.REPORT_ASSIGNED,
        aggregateId: reportId,
        payload: {
          assignmentId: doc._id,
          reportId,
          reportTitle: reportExists.title || 'Civic Issue',
          reportAuthorId: reportExists.authorId,
          departmentId: department._id,
          departmentName: department.name,
          assignedByUserId: assignerUserId,
          assignmentReason: doc.assignmentReason,
        },
        logger: this.logger,
      })
        .then(async (delivered) => {
          if (delivered) {
            await this.db.assignments.updateOne(
              { _id: doc._id },
              {
                $set: {
                  notificationDispatched: true,
                  notificationDispatchedAt: new Date(),
                },
              },
            );
          } else {
            await this.db.assignments.updateOne(
              { _id: doc._id },
              {
                $set: {
                  notificationDispatched: false,
                  notificationDispatchError: 'Transient delivery failure',
                },
              },
            );
          }
        })
        .catch((err) => {
          this.logger.warn(`Failed to dispatch report assignment notification event: ${err.message}`);
        });
    }

    return this.mapToAssignmentDto(doc);
  }

  async getReportAssignments(reportId: string): Promise<ReportAssignmentDto[]> {
    const docs = await this.db.assignments
      .find({ reportId })
      .sort({ assignedAt: -1 })
      .toArray();

    return docs.map((d) => this.mapToAssignmentDto(d));
  }

  async getPublicAssignmentView(reportId: string): Promise<PublicAssignmentViewDto> {
    const assignments = await this.db.assignments
      .find({ reportId })
      .sort({ assignedAt: -1 })
      .toArray();

    const current = assignments.find((a) => a.status === AssignmentStatus.ASSIGNED);
    let currentAssignment = undefined;

    if (current) {
      const dept = await this.db.departments.findOne({ _id: current.departmentId });
      currentAssignment = {
        departmentId: current.departmentId,
        departmentName: current.departmentName,
        jurisdiction: dept?.jurisdiction || 'Municipal',
        assignedAt: current.assignedAt.toISOString(),
      };
    }

    return {
      reportId,
      currentAssignment,
      assignmentHistoryCount: assignments.length,
    };
  }

  async getMyAssignments(
    userId: string,
  ): Promise<ReportAssignmentDto[]> {
    const docs = await this.db.assignments
      .find({ assignedByUserId: userId })
      .sort({ assignedAt: -1 })
      .toArray();

    return docs.map((d) => this.mapToAssignmentDto(d));
  }

  private mapToApplicationDto(doc: AuthorityApplicationDocument): AuthorityApplicationDto {
    return {
      id: doc._id,
      applicantUserId: doc.applicantUserId,
      organization: doc.organization,
      departmentRequested: doc.departmentRequested,
      officialRole: doc.officialRole,
      officialEmail: doc.officialEmail,
      officialPhone: doc.officialPhone,
      supportingNotes: doc.supportingNotes,
      status: doc.status,
      roleGranted: doc.roleGranted,
      roleGrantError: doc.roleGrantError,
      reviewedByUserId: doc.reviewedByUserId,
      reviewDecisionNotes: doc.reviewDecisionNotes,
      reviewedAt: doc.reviewedAt?.toISOString(),
      createdAt: doc.createdAt.toISOString(),
      updatedAt: doc.updatedAt.toISOString(),
    };
  }

  private mapToDepartmentDto(doc: DepartmentDocument): DepartmentDto {
    return {
      id: doc._id,
      name: doc.name,
      jurisdiction: doc.jurisdiction,
      description: doc.description,
      publicContactEmail: doc.publicContactEmail,
      publicContactPhone: doc.publicContactPhone,
      status: doc.status,
      createdAt: doc.createdAt.toISOString(),
      updatedAt: doc.updatedAt.toISOString(),
    };
  }

  private mapToAssignmentDto(doc: ReportAssignmentDocument): ReportAssignmentDto {
    return {
      id: doc._id,
      reportId: doc.reportId,
      departmentId: doc.departmentId,
      departmentName: doc.departmentName,
      assignedByUserId: doc.assignedByUserId,
      assignmentReason: doc.assignmentReason,
      status: doc.status,
      assignedAt: doc.assignedAt.toISOString(),
      updatedAt: doc.updatedAt.toISOString(),
    };
  }

  /**
   * Scans and recovers pending authority application reviews and report assignments.
   */
  async recoverPendingEvents(limit = 50): Promise<{ scanned: number; recovered: number; failed: number }> {
    let scanned = 0;
    let recovered = 0;
    let failed = 0;

    // 1. Recover pending application review events
    const pendingApps = await this.db.applications
      .find({ notificationDispatched: false, reviewedAt: { $exists: true } })
      .limit(limit)
      .toArray();

    for (const app of pendingApps) {
      scanned++;
      const delivered = await dispatchNotificationEvent({
        notificationsServiceUrl: this.notificationsServiceUrl,
        internalServiceToken: this.notificationsInternalKey,
        eventId: `${app._id}-review`,
        eventType: NotificationEventType.AUTHORITY_APPLICATION_REVIEWED,
        aggregateId: app._id,
        payload: {
          applicationId: app._id,
          applicantUserId: app.applicantUserId,
          status: app.status,
          reviewedByUserId: app.reviewedByUserId,
          decisionNotes: app.reviewDecisionNotes,
        },
        logger: this.logger,
      });

      if (delivered) {
        await this.db.applications.updateOne(
          { _id: app._id },
          {
            $set: {
              notificationDispatched: true,
              notificationDispatchedAt: new Date(),
              notificationDispatchError: undefined,
            },
          },
        );
        recovered++;
        this.logger.log(`Recovered and delivered pending event for application review ${app._id}`);
      } else {
        failed++;
      }
    }

    // 2. Recover pending report assignments
    const pendingAssignments = await this.db.assignments
      .find({ notificationDispatched: false })
      .limit(limit)
      .toArray();

    for (const assignment of pendingAssignments) {
      scanned++;
      const reportExists = await this.verifyReportExists(assignment.reportId);
      if (!reportExists.exists || !reportExists.authorId) {
        // Report was deleted or lacks author, mark handled
        await this.db.assignments.updateOne(
          { _id: assignment._id },
          { $set: { notificationDispatched: true, notificationDispatchError: 'Report author not found' } },
        );
        continue;
      }

      const delivered = await dispatchNotificationEvent({
        notificationsServiceUrl: this.notificationsServiceUrl,
        internalServiceToken: this.notificationsInternalKey,
        eventId: assignment._id,
        eventType: NotificationEventType.REPORT_ASSIGNED,
        aggregateId: assignment.reportId,
        payload: {
          assignmentId: assignment._id,
          reportId: assignment.reportId,
          reportTitle: reportExists.title || 'Civic Issue',
          reportAuthorId: reportExists.authorId,
          departmentId: assignment.departmentId,
          departmentName: assignment.departmentName,
          assignedByUserId: assignment.assignedByUserId,
          assignmentReason: assignment.assignmentReason,
        },
        logger: this.logger,
      });

      if (delivered) {
        await this.db.assignments.updateOne(
          { _id: assignment._id },
          {
            $set: {
              notificationDispatched: true,
              notificationDispatchedAt: new Date(),
              notificationDispatchError: undefined,
            },
          },
        );
        recovered++;
        this.logger.log(`Recovered and delivered pending event for report assignment ${assignment._id}`);
      } else {
        failed++;
      }
    }

    return { scanned, recovered, failed };
  }

  // ===========================================================================
  // Feature A & H: Representative Directory, Provenance & Admin Sync
  // ===========================================================================

  async syncOfficialRepresentativeData(): Promise<RepresentativeImportSummaryDto> {
    this.logger.log('Executing idempotent synchronization of official representative data...');
    const now = new Date();
    let createdCount = 0;
    let updatedCount = 0;
    let unchangedCount = 0;

    // 1. Upsert Jurisdictions
    for (const jur of SEED_JURISDICTIONS) {
      const existing = await this.db.jurisdictions.findOne({ _id: jur._id });
      if (!existing) {
        await this.db.jurisdictions.insertOne({
          ...jur,
          createdAt: now,
          updatedAt: now,
        });
      } else {
        await this.db.jurisdictions.updateOne(
          { _id: jur._id },
          {
            $set: {
              name: jur.name,
              type: jur.type,
              parentId: jur.parentId,
              districtId: jur.districtId,
              mandalId: jur.mandalId,
              wardNumber: jur.wardNumber,
              center: jur.center,
              hasBoundaryGeometry: jur.hasBoundaryGeometry,
              provenance: jur.provenance,
              updatedAt: now,
            },
          },
        );
      }
    }

    // 2. Upsert Responsibility Rules
    for (const rule of SEED_RESPONSIBILITY_RULES) {
      await this.db.responsibilityRules.updateOne(
        { category: rule.category, jurisdictionType: rule.jurisdictionType },
        {
          $setOnInsert: { _id: rule._id, createdAt: now },
          $set: {
            departmentName: rule.departmentName,
            departmentCode: rule.departmentCode,
            fallbackNotes: rule.fallbackNotes,
            isVerified: rule.isVerified,
            updatedAt: now,
          },
        },
        { upsert: true },
      );
    }

    // 3. Upsert Representative Profiles idempotently
    for (const rep of SEED_REPRESENTATIVES) {
      const existing = await this.db.representatives.findOne({
        publicName: rep.publicName,
        jurisdictionId: rep.jurisdictionId,
        officeType: rep.officeType,
      });

      if (!existing) {
        await this.db.representatives.insertOne({
          ...rep,
          createdAt: now,
          updatedAt: now,
        });
        createdCount++;
      } else {
        // Check if anything changed
        const hasChange =
          existing.officialDesignation !== rep.officialDesignation ||
          existing.termStatus !== rep.termStatus ||
          existing.partyAffiliation !== rep.partyAffiliation ||
          existing.jurisdictionName !== rep.jurisdictionName ||
          existing.verificationStatus !== rep.verificationStatus ||
          existing.sourceProvenance?.sourceUrl !== rep.sourceProvenance?.sourceUrl ||
          existing.termEndDate?.getTime() !== rep.termEndDate?.getTime();

        if (hasChange) {
          // If the profile has been modified by an administrator or claimed representative,
          // preserve user/admin edits (e.g. customized biography, verified photos, contact overrides, claim state)
          const isUserModified = existing.claimStatus === ProfileClaimStatus.CLAIMED_VERIFIED ||
            (existing.updatedAt && existing.createdAt && existing.updatedAt.getTime() > existing.createdAt.getTime());

          const preservedBiography = isUserModified && existing.biography ? existing.biography : (rep.biography || existing.biography);
          const preservedContactDetails = isUserModified && existing.contactDetails
            ? { ...rep.contactDetails, ...existing.contactDetails }
            : (rep.contactDetails || existing.contactDetails);
          const preservedPhotoUrl = existing.isPhotoVerified && existing.photoUrl ? existing.photoUrl : (rep.photoUrl || existing.photoUrl);
          const preservedPhotoVerified = existing.isPhotoVerified ?? rep.isPhotoVerified;

          await this.db.representatives.updateOne(
            { _id: existing._id },
            {
              $set: {
                officialDesignation: rep.officialDesignation,
                termStatus: rep.termStatus,
                partyAffiliation: rep.partyAffiliation,
                jurisdictionName: rep.jurisdictionName,
                verificationStatus: rep.verificationStatus,
                biography: preservedBiography,
                termStartDate: rep.termStartDate || existing.termStartDate,
                termEndDate: rep.termEndDate,
                sourceProvenance: rep.sourceProvenance,
                lastVerifiedAt: rep.lastVerifiedAt,
                contactDetails: preservedContactDetails,
                photoUrl: preservedPhotoUrl,
                isPhotoVerified: preservedPhotoVerified,
                claimStatus: existing.claimStatus || rep.claimStatus,
                claimedByUserId: existing.claimedByUserId,
                updatedAt: now,
              },
            },
          );
          updatedCount++;
        } else {
          unchangedCount++;
        }
      }
    }

    const coverageReport = await this.getCoverageReport();
    this.logger.log(
      `Representative sync completed: ${createdCount} created, ${updatedCount} updated, ${unchangedCount} unchanged`,
    );

    return {
      sourceName: AP_PROVENANCE_GOI_ECI.sourceName,
      totalRecordsProcessed: SEED_REPRESENTATIVES.length,
      createdCount,
      updatedCount,
      unchangedCount,
      rejectedCount: 0,
      reviewRequiredCount: coverageReport.flaggedForReviewRepresentativesCount || 0,
      timestamp: now.toISOString(),
      coverageReport,
    };
  }

  async getCoverageReport() {
    const [
      totalJurisdictions,
      districtsCount,
      pcsCount,
      acsCount,
      municipalitiesCount,
      wardsCount,
      totalRepresentatives,
      activeRepresentatives,
      verifiedOfficialCount,
      flaggedForReviewCount,
      publicRecordCount,
      historicalRepresentativesCount,
    ] = await Promise.all([
      this.db.jurisdictions.countDocuments(),
      this.db.jurisdictions.countDocuments({ type: JurisdictionType.DISTRICT }),
      this.db.jurisdictions.countDocuments({ type: JurisdictionType.PARLIAMENTARY_CONSTITUENCY }),
      this.db.jurisdictions.countDocuments({ type: JurisdictionType.ASSEMBLY_CONSTITUENCY }),
      this.db.jurisdictions.countDocuments({ type: JurisdictionType.MUNICIPALITY }),
      this.db.jurisdictions.countDocuments({ type: JurisdictionType.WARD }),
      this.db.representatives.countDocuments(),
      this.db.representatives.countDocuments({ termStatus: RepresentativeTermStatus.CURRENT }),
      this.db.representatives.countDocuments({ verificationStatus: RepresentativeVerificationStatus.VERIFIED_OFFICIAL }),
      this.db.representatives.countDocuments({ verificationStatus: RepresentativeVerificationStatus.FLAGGED_FOR_REVIEW }),
      this.db.representatives.countDocuments({ verificationStatus: RepresentativeVerificationStatus.PUBLIC_RECORD }),
      this.db.representatives.countDocuments({ termStatus: RepresentativeTermStatus.FORMER }),
    ]);

    return {
      totalStatewideDistricts: 28,
      statewideDistrictsCovered: districtsCount,
      legislativeConstituenciesCovered: acsCount,
      parliamentaryConstituenciesCovered: pcsCount,
      municipalBodiesCovered: municipalitiesCount,
      wardsWithActualBoundariesCount: wardsCount,
      wardLevelExactMappingAvailable: false, // Explicitly false for statewide to avoid implying complete coverage; exact mapping only exists in verified pilot wards
      wardLevelCoverageScope: 'PILOT_PARTIAL' as const,
      totalJurisdictions,
      totalRepresentatives,
      activeRepresentatives,
      verifiedOfficialRepresentativesCount: verifiedOfficialCount,
      flaggedForReviewRepresentativesCount: flaggedForReviewCount,
      publicRecordRepresentativesCount: publicRecordCount,
      historicalRepresentativesCount,
      dataCompletenessNotes:
        'Official coverage currently covers 5 of 28 Andhra Pradesh districts (Visakhapatnam, NTR, Guntur, Tirupati, Kurnool) and 3 pilot municipal wards. Ward boundaries require official CDMA GIS shapefiles; approximate boundaries are never inferred to prevent spurious ward councillor assignments.',
    };
  }

  async queryRepresentatives(query: QueryRepresentativesDto) {
    // Auto-seed if collection is currently empty
    const count = await this.db.representatives.countDocuments();
    if (count === 0) {
      await this.syncOfficialRepresentativeData();
    }

    const filter: any = {};

    if (query.officeType) {
      filter.officeType = query.officeType;
    }

    if (query.termStatus) {
      filter.termStatus = query.termStatus;
    }

    if (query.districtId) {
      filter.parentDistrictId = query.districtId;
    }

    if (query.jurisdictionId) {
      filter.jurisdictionId = query.jurisdictionId;
    }

    if (query.search && query.search.trim()) {
      const term = query.search.trim();
      filter.$or = [
        { publicName: { $regex: term, $options: 'i' } },
        { jurisdictionName: { $regex: term, $options: 'i' } },
        { partyAffiliation: { $regex: term, $options: 'i' } },
        { officialDesignation: { $regex: term, $options: 'i' } },
      ];
    }

    const page = Math.max(1, Number(query.page) || 1);
    const limit = Math.min(100, Math.max(1, Number(query.limit) || 20));
    const skip = (page - 1) * limit;

    const [total, docs] = await Promise.all([
      this.db.representatives.countDocuments(filter),
      this.db.representatives
        .find(filter)
        .sort({ termStatus: 1, publicName: 1 })
        .skip(skip)
        .limit(limit)
        .toArray(),
    ]);

    return {
      items: docs.map((d) => this.mapRepresentativeToDto(d)),
      meta: {
        page,
        limit,
        totalItems: total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async getRepresentativeById(id: string): Promise<RepresentativeProfileDto> {
    const doc = await this.db.representatives.findOne({ _id: id });
    if (!doc) {
      throw new NotFoundException(`Representative profile with id "${id}" not found`);
    }
    return this.mapRepresentativeToDto(doc);
  }

  async getRepresentativeAccountabilitySummary(
    representativeId: string,
  ): Promise<RepresentativeAccountabilitySummaryDto> {
    const rep = await this.db.representatives.findOne({ _id: representativeId });
    if (!rep) {
      throw new NotFoundException(`Representative profile with id "${representativeId}" not found`);
    }

    // Aggregate report associations linked to this representative
    // Exclude duplicates by distinct reportId
    const associations = await this.db.reportAssociations
      .find({ representativeId, isActive: true })
      .toArray();

    const uniqueReportMap = new Map<string, ReportStatus>();
    for (const a of associations) {
      uniqueReportMap.set(a.reportId, a.reportStatus);
    }

    let openReports = 0;
    let inProgressReports = 0;
    let resolvedReports = 0;

    for (const status of uniqueReportMap.values()) {
      if (status === ReportStatus.RESOLVED) {
        resolvedReports++;
      } else if (status === ReportStatus.IN_PROGRESS || status === ReportStatus.UNDER_REVIEW) {
        inProgressReports++;
      } else if (status === ReportStatus.SUBMITTED || status === ReportStatus.REOPENED) {
        openReports++;
      }
    }

    const total = uniqueReportMap.size;
    const resolutionPercentage = total > 0 ? Math.round((resolvedReports / total) * 100) : 0;

    return {
      representativeId,
      totalAssociatedReports: total,
      openReports,
      inProgressReports,
      resolvedReports,
      resolutionPercentage,
      averageResolutionDays: null, // Trustworthy data requirement per specification
    };
  }

  async getRepresentativeReports(
    representativeId: string,
    statusFilter?: string,
    page: number = 1,
    limit: number = 20,
  ) {
    const query: any = { representativeId, isActive: true };
    if (statusFilter && statusFilter !== 'ALL') {
      query.reportStatus = statusFilter;
    }

    const skip = (Math.max(1, page) - 1) * limit;

    const [total, associations] = await Promise.all([
      this.db.reportAssociations.countDocuments(query),
      this.db.reportAssociations
        .find(query)
        .sort({ associatedAt: -1 })
        .skip(skip)
        .limit(limit)
        .toArray(),
    ]);

    return {
      items: associations.map((a) => ({
        id: a._id,
        reportId: a.reportId,
        relationshipType: a.relationshipType,
        matchingMethod: a.matchingMethod,
        reportStatus: a.reportStatus,
        associatedAt: a.associatedAt.toISOString(),
      })),
      meta: {
        page,
        limit,
        totalItems: total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  // ===========================================================================
  // Feature B & D: Geographic Jurisdictions and Report Matching
  // ===========================================================================

  async matchAndAssociateReport(reportData: {
    reportId: string;
    coordinates?: [number, number]; // [lng, lat]
    administrativeContext?: {
      districtId: string;
      mandalId?: string;
      localityId?: string;
    };
    category: string;
    status: ReportStatus;
  }): Promise<{
    matchedJurisdictions: JurisdictionDto[];
    matchedRepresentatives: RepresentativeProfileDto[];
    responsibleDepartment?: { name: string; code: string };
    associationsCreated: number;
  }> {
    const now = new Date();
    const matchedJurisdictions: JurisdictionDocument[] = [];
    const matchedReps: Array<{
      rep: RepresentativeProfileDocument;
      relType: ReportRepresentativeRelationType;
      method: MatchingMethod;
    }> = [];

    // Ensure seed data is ready
    const repCount = await this.db.representatives.countDocuments();
    if (repCount === 0) {
      await this.syncOfficialRepresentativeData();
    }

    const { districtId, mandalId } = reportData.administrativeContext || {};

    // 1. Resolve District-level jurisdiction and MPs
    if (districtId) {
      const distJur = await this.db.jurisdictions.findOne({
        type: JurisdictionType.DISTRICT,
        districtId,
      });
      if (distJur) matchedJurisdictions.push(distJur);

      // Match MPs for this district
      const mps = await this.db.representatives
        .find({
          officeType: RepresentativeOfficeType.MP,
          parentDistrictId: districtId,
          termStatus: RepresentativeTermStatus.CURRENT,
        })
        .toArray();

      for (const mp of mps) {
        matchedReps.push({
          rep: mp,
          relType: ReportRepresentativeRelationType.CONSTITUENCY_REPRESENTATIVE,
          method: MatchingMethod.ADMIN_HIERARCHY,
        });
      }
    }

    // 2. Resolve Mandal / Assembly Constituency (MLAs)
    if (mandalId && districtId) {
      const acJur = await this.db.jurisdictions.findOne({
        type: JurisdictionType.ASSEMBLY_CONSTITUENCY,
        districtId,
        mandalId,
      });

      if (acJur) {
        matchedJurisdictions.push(acJur);

        const mlas = await this.db.representatives
          .find({
            officeType: RepresentativeOfficeType.MLA,
            jurisdictionId: acJur._id,
            termStatus: RepresentativeTermStatus.CURRENT,
          })
          .toArray();

        for (const mla of mlas) {
          matchedReps.push({
            rep: mla,
            relType: ReportRepresentativeRelationType.AREA_REPRESENTATIVE,
            method: MatchingMethod.ADMIN_HIERARCHY,
          });
        }
      }
    }

    // 3. Resolve Municipality & Ward level if coordinates or specific local body available
    if (districtId === 'visakhapatnam' || districtId === 'ntr' || districtId === 'guntur') {
      const muniId =
        districtId === 'visakhapatnam'
          ? 'jur_muni_gvmc'
          : districtId === 'ntr'
            ? 'jur_muni_vmc'
            : 'jur_muni_gmc';

      const muniJur = await this.db.jurisdictions.findOne({ _id: muniId });
      if (muniJur) {
        matchedJurisdictions.push(muniJur);

        // Match Mayor
        const mayors = await this.db.representatives
          .find({
            officeType: RepresentativeOfficeType.MAYOR,
            jurisdictionId: muniId,
            termStatus: RepresentativeTermStatus.CURRENT,
          })
          .toArray();

        for (const mayor of mayors) {
          matchedReps.push({
            rep: mayor,
            relType: ReportRepresentativeRelationType.AREA_REPRESENTATIVE,
            method: MatchingMethod.ADMIN_HIERARCHY,
          });
        }
      }

      // Check for exact ward match if coordinates provided and close to verified ward centers
      if (reportData.coordinates) {
        const [lng, lat] = reportData.coordinates;
        const wards = await this.db.jurisdictions
          .find({
            type: JurisdictionType.WARD,
            districtId,
          })
          .toArray();

        for (const ward of wards) {
          if (ward.center) {
            // Check rough Euclidean distance ~0.04 deg (approx 4km radius) for ward center
            const dLat = lat - ward.center.latitude;
            const dLng = lng - ward.center.longitude;
            const dist = Math.sqrt(dLat * dLat + dLng * dLng);

            if (dist < 0.04) {
              matchedJurisdictions.push(ward);

              const councillors = await this.db.representatives
                .find({
                  officeType: RepresentativeOfficeType.WARD_COUNCILLOR,
                  jurisdictionId: ward._id,
                  termStatus: RepresentativeTermStatus.CURRENT,
                })
                .toArray();

              for (const councillor of councillors) {
                matchedReps.push({
                  rep: councillor,
                  relType: ReportRepresentativeRelationType.AREA_REPRESENTATIVE,
                  method: MatchingMethod.EXACT_POLYGON,
                });
              }
              break;
            }
          }
        }
      }
    }

    // 4. Determine Responsible Department (Configurable Rules)
    const rule = await this.db.responsibilityRules.findOne({
      category: reportData.category,
      jurisdictionType: JurisdictionType.MUNICIPALITY,
    });

    let responsibleDepartment: { name: string; code: string } | undefined;
    if (rule) {
      responsibleDepartment = {
        name: rule.departmentName,
        code: rule.departmentCode,
      };
    }

    // 5. Persist associations idempotently (Strictly CURRENT representatives only; former officeholders excluded)
    let associationsCreated = 0;
    for (const match of matchedReps) {
      if (match.rep.termStatus !== RepresentativeTermStatus.CURRENT) {
        continue;
      }

      const associationId = `${reportData.reportId}_${match.rep._id}_${match.relType}`;

      const res = await this.db.reportAssociations.updateOne(
        {
          reportId: reportData.reportId,
          representativeId: match.rep._id,
          relationshipType: match.relType,
        },
        {
          $setOnInsert: {
            _id: associationId,
            reportId: reportData.reportId,
            representativeId: match.rep._id,
            representativeName: match.rep.publicName,
            officeType: match.rep.officeType,
            jurisdictionId: match.rep.jurisdictionId,
            jurisdictionName: match.rep.jurisdictionName,
            relationshipType: match.relType,
            matchingMethod: match.method,
            associatedAt: now,
          },
          $set: {
            reportStatus: reportData.status,
            isActive: true,
            updatedAt: now,
          },
        },
        { upsert: true },
      );

      if (res.upsertedCount > 0) {
        associationsCreated++;
      }
    }

    return {
      matchedJurisdictions: matchedJurisdictions.map((j) => this.mapJurisdictionToDto(j)),
      matchedRepresentatives: matchedReps.map((m) => this.mapRepresentativeToDto(m.rep)),
      responsibleDepartment,
      associationsCreated,
    };
  }

  async updateReportStatusInAssociations(reportId: string, newStatus: ReportStatus): Promise<number> {
    const res = await this.db.reportAssociations.updateMany(
      { reportId },
      {
        $set: {
          reportStatus: newStatus,
          updatedAt: new Date(),
        },
      },
    );
    return res.modifiedCount;
  }

  async getReportAssociations(reportId: string): Promise<ReportRepresentativeAssociationDto[]> {
    const associations = await this.db.reportAssociations
      .find({ reportId, isActive: true })
      .sort({ associatedAt: 1 })
      .toArray();

    if (associations.length === 0) {
      return [];
    }

    const repIds = associations.map((a) => a.representativeId);
    const reps = await this.db.representatives
      .find({ _id: { $in: repIds } })
      .toArray();
    const repMap = new Map(reps.map((r) => [r._id, r]));

    return associations.map((a) => {
      const rep = repMap.get(a.representativeId);
      return {
        id: a._id,
        reportId: a.reportId,
        representativeId: a.representativeId,
        representativeName: a.representativeName,
        officeType: a.officeType,
        officialDesignation: rep?.officialDesignation,
        partyAffiliation: rep?.partyAffiliation,
        photoUrl: rep?.photoUrl,
        isPhotoVerified: rep?.isPhotoVerified ?? false,
        verificationStatus: rep?.verificationStatus,
        jurisdictionId: a.jurisdictionId,
        jurisdictionName: a.jurisdictionName,
        relationshipType: a.relationshipType,
        matchingMethod: a.matchingMethod,
        isActive: a.isActive,
        associatedAt: a.associatedAt.toISOString(),
      };
    });
  }

  // ===========================================================================
  // Feature E: Resolution Evidence Submission, Verification & Display
  // ===========================================================================

  async submitResolutionEvidence(
    reportId: string,
    uploader: { sub: string; role: string; displayName?: string },
    dto: SubmitResolutionEvidenceDtoClass,
  ): Promise<ResolutionEvidenceDto> {
    const reportExists = await this.verifyReportExists(reportId);
    if (!reportExists.exists) {
      throw new NotFoundException(`Report with id "${reportId}" not found`);
    }

    const now = new Date();
    const evidenceId = uuidv4();

    // Check if uploader is verified claimed representative for this report's jurisdiction
    const claimedRep = await this.db.representatives.findOne({
      claimedByUserId: uploader.sub,
      claimStatus: ProfileClaimStatus.CLAIMED_VERIFIED,
    });

    const isOfficialRepresentativeSubmission = Boolean(claimedRep);

    // Initial verification status:
    // Authorized Admins or claimed profile holders submit with VERIFIED status.
    // Regular residents submit as PENDING until verified by moderator/admin.
    const isAutoVerified =
      uploader.role === UserRole.ADMIN ||
      uploader.role === UserRole.AUTHORITY ||
      isOfficialRepresentativeSubmission;

    const doc: ResolutionEvidenceDocument = {
      _id: evidenceId,
      reportId,
      evidenceType: dto.evidenceType as EvidenceType,
      media: {
        ...dto.media,
        uploadedByUserId: uploader.sub,
        createdAt: now,
      },
      description: dto.description?.trim(),
      uploaderUserId: uploader.sub,
      uploaderRole: uploader.role,
      uploaderName: uploader.displayName || 'Civic Participant',
      isOfficialRepresentativeSubmission,
      verificationStatus: isAutoVerified
        ? EvidenceVerificationStatus.VERIFIED
        : EvidenceVerificationStatus.PENDING,
      verifiedByUserId: isAutoVerified ? uploader.sub : undefined,
      verifiedAt: isAutoVerified ? now : undefined,
      createdAt: now,
      updatedAt: now,
    };

    await this.db.resolutionEvidence.insertOne(doc);
    this.logger.log(`Resolution evidence ${evidenceId} submitted for report ${reportId} by ${uploader.sub}`);

    // If submitted by an authority/admin, notify author
    if (reportExists.authorId && reportExists.authorId !== uploader.sub) {
      dispatchNotificationEvent({
        notificationsServiceUrl: this.notificationsServiceUrl,
        internalServiceToken: this.notificationsInternalKey,
        eventId: evidenceId,
        eventType: NotificationEventType.RESOLUTION_EVIDENCE_SUBMITTED,
        aggregateId: reportId,
        payload: {
          evidenceId,
          reportId,
          reportTitle: reportExists.title || 'Civic Issue',
          reportAuthorId: reportExists.authorId,
          uploaderRole: uploader.role,
          evidenceType: dto.evidenceType,
        },
        logger: this.logger,
      }).catch((err) => this.logger.warn(`Failed to dispatch evidence notification: ${err.message}`));
    }

    return this.mapEvidenceToDto(doc);
  }

  async getReportEvidence(reportId: string): Promise<ResolutionEvidenceDto[]> {
    const docs = await this.db.resolutionEvidence
      .find({ reportId })
      .sort({ createdAt: -1 })
      .toArray();

    return docs.map((d) => this.mapEvidenceToDto(d));
  }

  async verifyResolutionEvidence(
    evidenceId: string,
    verifierUserId: string,
    dto: VerifyResolutionEvidenceDtoClass,
  ): Promise<ResolutionEvidenceDto> {
    const existing = await this.db.resolutionEvidence.findOne({ _id: evidenceId });
    if (!existing) {
      throw new NotFoundException(`Evidence record with id "${evidenceId}" not found`);
    }

    const now = new Date();
    const newStatus = dto.verified
      ? EvidenceVerificationStatus.VERIFIED
      : EvidenceVerificationStatus.REJECTED;

    await this.db.resolutionEvidence.updateOne(
      { _id: evidenceId },
      {
        $set: {
          verificationStatus: newStatus,
          verifiedByUserId: verifierUserId,
          verifiedAt: now,
          rejectionReason: dto.rejectionReason?.trim(),
          updatedAt: now,
        },
      },
    );

    const updated = await this.db.resolutionEvidence.findOne({ _id: evidenceId });
    this.logger.log(`Evidence ${evidenceId} verified as ${newStatus} by ${verifierUserId}`);

    return this.mapEvidenceToDto(updated!);
  }

  // ===========================================================================
  // Feature F: Verified Profile Claiming Workflow
  // ===========================================================================

  async submitProfileClaim(
    representativeId: string,
    claimantUserId: string,
    dto: SubmitProfileClaimDtoClass,
  ): Promise<ProfileClaimRequestDto> {
    const rep = await this.db.representatives.findOne({ _id: representativeId });
    if (!rep) {
      throw new NotFoundException(`Representative profile with id "${representativeId}" not found`);
    }

    if (rep.claimStatus === ProfileClaimStatus.CLAIMED_VERIFIED) {
      throw new ConflictException('This representative profile is already verified and claimed.');
    }

    // Check if claimant already has a pending claim
    const pendingClaim = await this.db.profileClaims.findOne({
      representativeId,
      claimantUserId,
      status: ProfileClaimStatus.CLAIM_PENDING,
    });

    if (pendingClaim) {
      throw new BadRequestException('A pending claim request for this profile is already under administrative review.');
    }

    const claimId = uuidv4();
    const now = new Date();

    const doc: ProfileClaimRequestDocument = {
      _id: claimId,
      representativeId,
      representativeName: rep.publicName,
      claimantUserId,
      officialEmailUsed: dto.officialEmailUsed.trim().toLowerCase(),
      proofDetails: dto.proofDetails.trim(),
      status: ProfileClaimStatus.CLAIM_PENDING,
      createdAt: now,
      updatedAt: now,
    };

    await this.db.profileClaims.insertOne(doc);

    // Update representative profile status to CLAIM_PENDING
    await this.db.representatives.updateOne(
      { _id: representativeId },
      { $set: { claimStatus: ProfileClaimStatus.CLAIM_PENDING, updatedAt: now } },
    );

    this.logger.log(`Claim request ${claimId} submitted for rep ${representativeId} by user ${claimantUserId}`);
    return this.mapClaimToDto(doc);
  }

  async reviewProfileClaim(
    claimId: string,
    reviewerUserId: string,
    dto: ReviewProfileClaimDtoClass,
  ): Promise<ProfileClaimRequestDto> {
    const claim = await this.db.profileClaims.findOne({ _id: claimId });
    if (!claim) {
      throw new NotFoundException(`Claim request with id "${claimId}" not found`);
    }

    if (claim.status !== ProfileClaimStatus.CLAIM_PENDING) {
      throw new BadRequestException(`Claim request is already ${claim.status}`);
    }

    const now = new Date();
    const newStatus = dto.approved
      ? ProfileClaimStatus.CLAIMED_VERIFIED
      : ProfileClaimStatus.CLAIM_REJECTED;

    await this.db.profileClaims.updateOne(
      { _id: claimId },
      {
        $set: {
          status: newStatus,
          reviewedByUserId: reviewerUserId,
          reviewDecisionNotes: dto.decisionNotes.trim(),
          reviewedAt: now,
          updatedAt: now,
        },
      },
    );

    // If approved, link user account to representative profile
    if (dto.approved) {
      await this.db.representatives.updateOne(
        { _id: claim.representativeId },
        {
          $set: {
            claimStatus: ProfileClaimStatus.CLAIMED_VERIFIED,
            claimedByUserId: claim.claimantUserId,
            updatedAt: now,
          },
        },
      );
    } else {
      await this.db.representatives.updateOne(
        { _id: claim.representativeId },
        {
          $set: {
            claimStatus: ProfileClaimStatus.UNCLAIMED,
            claimedByUserId: undefined,
            updatedAt: now,
          },
        },
      );
    }

    this.logger.log(`Claim request ${claimId} resolved as ${newStatus} by admin ${reviewerUserId}`);

    // Dispatch notification to claimant
    dispatchNotificationEvent({
      notificationsServiceUrl: this.notificationsServiceUrl,
      internalServiceToken: this.notificationsInternalKey,
      eventId: claimId,
      eventType: NotificationEventType.PROFILE_CLAIM_REVIEWED,
      aggregateId: claim.representativeId,
      payload: {
        claimId,
        recipientUserId: claim.claimantUserId,
        representativeName: claim.representativeName,
        status: newStatus,
        decisionNotes: dto.decisionNotes.trim(),
      },
      logger: this.logger,
    }).catch((err) => this.logger.warn(`Failed to dispatch claim notification: ${err.message}`));

    const updated = await this.db.profileClaims.findOne({ _id: claimId });
    return this.mapClaimToDto(updated!);
  }

  async listProfileClaims(statusFilter?: ProfileClaimStatus): Promise<ProfileClaimRequestDto[]> {
    const filter = statusFilter ? { status: statusFilter } : {};
    const docs = await this.db.profileClaims
      .find(filter)
      .sort({ createdAt: -1 })
      .toArray();

    return docs.map((d) => this.mapClaimToDto(d));
  }

  async updateRepresentativeProfile(
    representativeId: string,
    updater: { sub: string; role: string },
    dto: UpdateRepresentativeProfileDtoClass,
  ): Promise<RepresentativeProfileDto> {
    const rep = await this.db.representatives.findOne({ _id: representativeId });
    if (!rep) {
      throw new NotFoundException(`Representative profile with id "${representativeId}" not found`);
    }

    // Permission check: Only admin or the verified claimed user can update permitted fields
    const isAdmin = updater.role === UserRole.ADMIN;
    const isClaimedOwner = rep.claimedByUserId === updater.sub && rep.claimStatus === ProfileClaimStatus.CLAIMED_VERIFIED;

    if (!isAdmin && !isClaimedOwner) {
      throw new ForbiddenException('You do not have permission to edit this representative profile.');
    }

    const updates: any = { updatedAt: new Date() };

    if (dto.biography !== undefined) {
      updates.biography = dto.biography.trim();
    }

    if (dto.contactDetails !== undefined) {
      updates.contactDetails = {
        ...rep.contactDetails,
        ...dto.contactDetails,
      };
    }

    if (dto.photoUrl !== undefined && isAdmin) {
      updates.photoUrl = dto.photoUrl;
      updates.isPhotoVerified = true;
    }

    await this.db.representatives.updateOne({ _id: representativeId }, { $set: updates });

    const updated = await this.db.representatives.findOne({ _id: representativeId });
    return this.mapRepresentativeToDto(updated!);
  }

  // ===========================================================================
  // Mappers
  // ===========================================================================

  private mapRepresentativeToDto(d: RepresentativeProfileDocument): RepresentativeProfileDto {
    return {
      id: d._id,
      publicName: d.publicName,
      officeType: d.officeType,
      officialDesignation: d.officialDesignation,
      partyAffiliation: d.partyAffiliation,
      biography: d.biography,
      photoUrl: d.photoUrl,
      isPhotoVerified: d.isPhotoVerified,
      jurisdictionId: d.jurisdictionId,
      jurisdictionName: d.jurisdictionName,
      jurisdictionType: d.jurisdictionType,
      parentDistrictId: d.parentDistrictId,
      parentDistrictName: d.parentDistrictName,
      termStatus: d.termStatus,
      termStartDate: d.termStartDate?.toISOString(),
      termEndDate: d.termEndDate?.toISOString(),
      verificationStatus: d.verificationStatus,
      sourceProvenance: d.sourceProvenance,
      lastVerifiedAt: d.lastVerifiedAt.toISOString(),
      claimStatus: d.claimStatus,
      claimedByUserId: d.claimedByUserId,
      contactDetails: d.contactDetails,
      createdAt: d.createdAt.toISOString(),
      updatedAt: d.updatedAt.toISOString(),
    };
  }

  private mapJurisdictionToDto(j: JurisdictionDocument): JurisdictionDto {
    return {
      id: j._id,
      name: j.name,
      type: j.type,
      parentId: j.parentId,
      districtId: j.districtId,
      mandalId: j.mandalId,
      wardNumber: j.wardNumber,
      center: j.center,
      hasBoundaryGeometry: j.hasBoundaryGeometry,
      provenance: j.provenance,
      createdAt: j.createdAt.toISOString(),
      updatedAt: j.updatedAt.toISOString(),
    };
  }

  private mapEvidenceToDto(e: ResolutionEvidenceDocument): ResolutionEvidenceDto {
    return {
      id: e._id,
      reportId: e.reportId,
      evidenceType: e.evidenceType,
      media: {
        mediaId: e.media.mediaId,
        publicId: e.media.publicId,
        url: e.media.url,
        secureUrl: e.media.secureUrl,
        format: e.media.format,
        resourceType: e.media.resourceType,
        bytes: e.media.bytes,
        uploadedByUserId: e.media.uploadedByUserId,
        createdAt: e.media.createdAt.toISOString(),
      },
      description: e.description,
      uploaderUserId: e.uploaderUserId,
      uploaderRole: e.uploaderRole,
      uploaderName: e.uploaderName,
      isOfficialRepresentativeSubmission: e.isOfficialRepresentativeSubmission,
      verificationStatus: e.verificationStatus,
      verifiedByUserId: e.verifiedByUserId,
      verifiedAt: e.verifiedAt?.toISOString(),
      rejectionReason: e.rejectionReason,
      createdAt: e.createdAt.toISOString(),
    };
  }

  private mapClaimToDto(c: ProfileClaimRequestDocument): ProfileClaimRequestDto {
    return {
      id: c._id,
      representativeId: c.representativeId,
      representativeName: c.representativeName,
      claimantUserId: c.claimantUserId,
      officialEmailUsed: c.officialEmailUsed,
      proofDetails: c.proofDetails,
      status: c.status,
      reviewedByUserId: c.reviewedByUserId,
      reviewDecisionNotes: c.reviewDecisionNotes,
      reviewedAt: c.reviewedAt?.toISOString(),
      createdAt: c.createdAt.toISOString(),
      updatedAt: c.updatedAt.toISOString(),
    };
  }
}

