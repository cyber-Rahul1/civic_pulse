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
} from '../models/authority.models.js';

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
}
