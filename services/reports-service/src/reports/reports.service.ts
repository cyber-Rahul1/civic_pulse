import {
  Injectable,
  NotFoundException,
  ForbiddenException,
  BadRequestException,
} from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import http from 'http';
import { Filter } from 'mongodb';
import { CivicLogger, dispatchNotificationEvent } from '@civic-pulse/nest-common';
import { ConfigService } from '@nestjs/config';
import {
  ReportDto,
  ReportStatus,
  ReportUrgency,
  UserRole,
  JwtTokenPayload,
  NotificationEventType,
  isCoordinateInAndhraPradesh,
  validateAdministrativeConsistency,
  GpsEligibilityStatus,
} from '@civic-pulse/contracts';
import { DatabaseService } from '../database/database.service.js';
import { MediaService } from '../media/media.service.js';
import {
  CreateReportDto,
  UpdateReportDto,
  UpdateReportUrgencyDto,
  TransitionStatusDto,
  QueryReportsDto,
  NearbyReportsDto,
} from '../dto/reports.dto.js';
import {
  ReportDocument,
  StatusTransitionDoc,
} from '../models/report.models.js';

@Injectable()
export class ReportsService {
  private readonly notificationsServiceUrl: string;
  private readonly authorityServiceUrl: string;
  private readonly internalServiceKey: string;

  constructor(
    private readonly db: DatabaseService,
    private readonly mediaService: MediaService,
    private readonly configService: ConfigService,
    private readonly logger: CivicLogger,
  ) {
    this.logger.setContext('Reports:ReportsService');
    this.notificationsServiceUrl =
      this.configService.get<string>('NOTIFICATIONS_SERVICE_URL') ||
      'http://127.0.0.1:3005';
    this.authorityServiceUrl =
      this.configService.get<string>('AUTHORITY_SERVICE_URL') ||
      'http://127.0.0.1:3004';
    this.internalServiceKey =
      this.configService.get<string>('INTERNAL_SERVICE_KEY') ||
      this.configService.get<string>('NOTIFICATIONS_INTERNAL_KEY') ||
      'civic_pulse_internal_service_secret_dev';
  }

  // --- Permitted Transition Matrix ---
  private readonly legalTransitions: Record<ReportStatus, ReportStatus[]> = {
    [ReportStatus.SUBMITTED]: [ReportStatus.UNDER_REVIEW, ReportStatus.REJECTED],
    [ReportStatus.UNDER_REVIEW]: [ReportStatus.IN_PROGRESS, ReportStatus.REJECTED],
    [ReportStatus.IN_PROGRESS]: [ReportStatus.RESOLVED, ReportStatus.REJECTED],
    [ReportStatus.RESOLVED]: [ReportStatus.REOPENED],
    [ReportStatus.REOPENED]: [ReportStatus.UNDER_REVIEW, ReportStatus.IN_PROGRESS],
    [ReportStatus.REJECTED]: [ReportStatus.UNDER_REVIEW],
  };

  async createReport(
    dto: CreateReportDto,
    author: JwtTokenPayload,
  ): Promise<ReportDto> {
    // 1. Validate coordinates range and state boundary if location is provided
    let locationDoc: ReportDocument['location'] = undefined;
    if (dto.location) {
      this.validateCoordinates(dto.location.coordinates);
      locationDoc = {
        type: 'Point',
        coordinates: [dto.location.coordinates[0], dto.location.coordinates[1]],
      };
    }

    // 2. Validate Administrative Hierarchy Selection & Coordinate Consistency
    if (dto.administrativeContext) {
      const consistency = validateAdministrativeConsistency(
        dto.administrativeContext.districtId,
        dto.administrativeContext.mandalId,
        dto.administrativeContext.localityId,
        dto.location?.coordinates
      );
      if (!consistency.isValid) {
        throw new BadRequestException(
          `Administrative hierarchy mismatch: ${consistency.error}`
        );
      }
    }

    // 3. Validate Reporter Location Policy if provided
    let reporterLocationDoc: ReportDocument['reporterLocation'] = undefined;
    if (dto.reporterLocation) {
      if (
        !Array.isArray(dto.reporterLocation.coordinates) ||
        dto.reporterLocation.coordinates.length !== 2
      ) {
        throw new BadRequestException('Reporter coordinates must be [longitude, latitude]');
      }
      const [rLng, rLat] = dto.reporterLocation.coordinates;
      const isReporterInsideAP = isCoordinateInAndhraPradesh(rLat, rLng);

      // Verify declared status matches calculated coordinates
      if (!isReporterInsideAP || dto.reporterLocation.eligibilityStatus === GpsEligibilityStatus.OUTSIDE_AP) {
        throw new BadRequestException(
          `Detected reporter location [${rLng}, ${rLat}] is outside Andhra Pradesh jurisdiction. Submissions from outside the state are prohibited.`
        );
      }

      reporterLocationDoc = {
        coordinates: [rLng, rLat],
        eligibilityStatus: isReporterInsideAP ? 'INSIDE_AP' : 'OUTSIDE_AP',
        accuracyMeters: dto.reporterLocation.accuracyMeters,
      };
    }

    const now = new Date();
    const reportId = uuidv4();

    // Sanitize and verify media attachments server-side against authorized uploads
    const validatedMedia = await this.mediaService.validateAndSanitizeMedia(
      dto.media,
      author.sub,
      reportId,
    );

    const initialTransition: StatusTransitionDoc = {
      transitionId: uuidv4(),
      previousStatus: null,
      newStatus: ReportStatus.SUBMITTED,
      actorUserId: author.sub,
      actorRole: author.role,
      reason: 'Initial report submission by resident',
      timestamp: now,
    };

    const doc: ReportDocument = {
      _id: reportId,
      authorId: author.sub, // Strictly obtain author from JWT context
      title: dto.title.trim(),
      description: dto.description.trim(),
      category: dto.category,
      location: locationDoc,
      locationDescription: dto.locationDescription?.trim(),
      administrativeContext: dto.administrativeContext
        ? {
            districtId: dto.administrativeContext.districtId,
            mandalId: dto.administrativeContext.mandalId,
            localityId: dto.administrativeContext.localityId,
          }
        : undefined,
      reporterLocation: reporterLocationDoc,
      media: validatedMedia,
      status: ReportStatus.SUBMITTED,
      statusHistory: [initialTransition],
      createdAt: now,
      updatedAt: now,
    };

    await this.db.reports.insertOne(doc);
    this.logger.log(`Created report ${reportId} for author ${author.sub}`);

    // Deterministically trigger S2S jurisdiction & representative matching
    this.matchReportJurisdictionsAsync({
      reportId,
      coordinates: locationDoc ? locationDoc.coordinates : undefined,
      administrativeContext: dto.administrativeContext,
      category: dto.category,
      status: ReportStatus.SUBMITTED,
    });

    return this.mapToDto(doc);
  }

  async getReportById(id: string): Promise<ReportDto> {
    const doc = await this.db.reports.findOne({ _id: id });
    if (!doc) {
      throw new NotFoundException(`Report with id "${id}" not found`);
    }
    return this.mapToDto(doc);
  }

  async getReportHistory(id: string) {
    const doc = await this.db.reports.findOne({ _id: id });
    if (!doc) {
      throw new NotFoundException(`Report with id "${id}" not found`);
    }
    return doc.statusHistory.map((s) => ({
      transitionId: s.transitionId,
      previousStatus: s.previousStatus,
      newStatus: s.newStatus,
      actorUserId: s.actorUserId,
      actorRole: s.actorRole,
      reason: s.reason,
      timestamp: s.timestamp.toISOString(),
    }));
  }

  async queryReports(query: QueryReportsDto) {
    const filter: Filter<ReportDocument> = {};

    if (query.category) {
      filter.category = query.category;
    }

    if (query.status) {
      filter.status = query.status;
    }

    if (query.fromDate || query.toDate) {
      filter.createdAt = {};
      if (query.fromDate) filter.createdAt.$gte = new Date(query.fromDate);
      if (query.toDate) filter.createdAt.$lte = new Date(query.toDate);
    }

    const page = Math.max(1, Number(query.page) || 1);
    const limit = Math.min(100, Math.max(1, Number(query.limit) || 20));
    const skip = (page - 1) * limit;

    const [total, items] = await Promise.all([
      this.db.reports.countDocuments(filter),
      this.db.reports
        .find(filter)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .toArray(),
    ]);

    return {
      items: items.map((i) => this.mapToDto(i)),
      meta: {
        page,
        limit,
        totalItems: total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findNearby(query: NearbyReportsDto): Promise<ReportDto[]> {
    this.validateCoordinates([query.longitude, query.latitude]);
    const maxRadius = Math.min(50000, Number(query.radiusMeters) || 5000);
    const limit = Math.min(100, Number(query.limit) || 50);

    const filter: any = {
      location: {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [Number(query.longitude), Number(query.latitude)],
          },
          $maxDistance: maxRadius,
        },
      },
    };

    if (query.category) {
      filter.category = query.category;
    }
    if (query.status) {
      filter.status = query.status;
    }

    const docs = await this.db.reports
      .find(filter)
      .limit(limit)
      .toArray();

    return docs.map((d) => this.mapToDto(d));
  }

  async updateReport(
    id: string,
    dto: UpdateReportDto,
    currentUser: JwtTokenPayload,
  ): Promise<ReportDto> {
    const existing = await this.db.reports.findOne({ _id: id });
    if (!existing) {
      throw new NotFoundException(`Report with id "${id}" not found`);
    }

    // Authorization: Only the author, an admin, or moderator can edit
    const isAuthor = existing.authorId === currentUser.sub;
    const isStaff =
      currentUser.role === UserRole.ADMIN ||
      currentUser.role === UserRole.MODERATOR;

    if (!isAuthor && !isStaff) {
      throw new ForbiddenException('You do not have permission to edit this report');
    }

    // Residents can only edit if report is still in SUBMITTED status
    if (isAuthor && !isStaff && existing.status !== ReportStatus.SUBMITTED) {
      throw new BadRequestException(
        `Reports in status "${existing.status}" cannot be edited by residents`,
      );
    }

    const updates: Partial<ReportDocument> = {
      updatedAt: new Date(),
    };

    if (dto.title) updates.title = dto.title.trim();
    if (dto.description) updates.description = dto.description.trim();
    if (dto.locationDescription !== undefined) {
      updates.locationDescription = dto.locationDescription.trim();
    }

    if (dto.media) {
      updates.media = await this.mediaService.validateAndSanitizeMedia(
        dto.media,
        currentUser.sub,
        id,
      );
    }

    await this.db.reports.updateOne({ _id: id }, { $set: updates });
    const updated = await this.db.reports.findOne({ _id: id });
    return this.mapToDto(updated!);
  }

  async transitionStatus(
    id: string,
    dto: TransitionStatusDto,
    actor: JwtTokenPayload,
  ): Promise<ReportDto> {
    const report = await this.db.reports.findOne({ _id: id });
    if (!report) {
      throw new NotFoundException(`Report with id "${id}" not found`);
    }

    const currentStatus = report.status;
    const targetStatus = dto.status;

    // 1. Verify state machine legal transition
    const allowedTargets = this.legalTransitions[currentStatus] || [];
    if (!allowedTargets.includes(targetStatus)) {
      throw new BadRequestException(
        `Invalid status transition: cannot transition from "${currentStatus}" to "${targetStatus}". Permitted: [${allowedTargets.join(', ')}]`,
      );
    }

    // 2. Role Permissions on Transition:
    // Only administrative roles (ADMIN) or verified authority staff can transition municipal stages
    // Until an external verified authority onboarding workflow exists, only ADMIN or MODERATOR possess verified municipal execution permissions
    const isAuthorizedStaff =
      actor.role === UserRole.ADMIN ||
      actor.role === UserRole.MODERATOR;

    if (targetStatus === ReportStatus.REOPENED) {
      // Reopen can be done by original author or authority/admin
      const isAuthor = report.authorId === actor.sub;
      if (!isAuthor && !isAuthorizedStaff && actor.role !== UserRole.AUTHORITY) {
        throw new ForbiddenException(
          'Only the report author or an authorized administrator can reopen a resolved report',
        );
      }
    } else {
      if (!isAuthorizedStaff) {
        throw new ForbiddenException(
          `Only authorized administrators or moderators have verified authority to transition reports to "${targetStatus}". Unverified authority roles cannot execute state changes until authorized by municipal governance.`,
        );
      }
    }

    const now = new Date();
    const transitionRecord: StatusTransitionDoc = {
      transitionId: uuidv4(),
      previousStatus: currentStatus,
      newStatus: targetStatus,
      actorUserId: actor.sub,
      actorRole: actor.role,
      reason: dto.reason?.trim(),
      timestamp: now,
      notificationDispatched: false,
    };

    const updateFields: any = {
      status: targetStatus,
      updatedAt: now,
    };

    if (targetStatus === ReportStatus.RESOLVED) {
      updateFields.resolvedAt = now;
      if (dto.resolutionNotes) {
        updateFields.resolutionNotes = dto.resolutionNotes.trim();
      }
      if (dto.resolutionEvidenceMedia) {
        updateFields.resolutionEvidenceMedia =
          await this.mediaService.validateAndSanitizeMedia(
            dto.resolutionEvidenceMedia,
            actor.sub,
            id,
          );
      }
    }

    // Atomic conditional update to guard against concurrent requests
    // Update succeeds ONLY if current status in the database still matches the expected currentStatus
    const result = await this.db.reports.updateOne(
      { _id: id, status: currentStatus },
      {
        $set: updateFields,
        $push: { statusHistory: transitionRecord } as any,
      },
    );

    if (result.modifiedCount === 0) {
      // Status was changed concurrently by another request
      this.logger.warn(
        `Status transition race condition detected for report ${id}. Expected status: ${currentStatus}`,
      );
      throw new BadRequestException(
        `Status transition conflict: report "${id}" status was modified concurrently. Please refresh and retry.`,
      );
    }

    this.logger.log(
      `Report ${id} transitioned atomically from ${currentStatus} to ${targetStatus} by ${actor.sub} (${actor.role})`,
    );

    // Sync updated status to representative associations
    this.syncReportStatusToAuthorityAsync(id, targetStatus);

    // Dispatch status change event and atomically record acknowledgement
    try {
      const delivered = await dispatchNotificationEvent({
        notificationsServiceUrl: this.notificationsServiceUrl,
        internalServiceToken: this.internalServiceKey,
        eventId: transitionRecord.transitionId,
        eventType: NotificationEventType.REPORT_STATUS_CHANGED,
        aggregateId: id,
        payload: {
          reportId: id,
          reportTitle: report.title,
          authorId: report.authorId,
          previousStatus: currentStatus,
          newStatus: targetStatus,
          updatedByUserId: actor.sub,
          reason: dto.reason?.trim(),
        },
        logger: this.logger,
      });

      if (delivered) {
        await this.db.reports.updateOne(
          { _id: id, 'statusHistory.transitionId': transitionRecord.transitionId },
          {
            $set: {
              'statusHistory.$.notificationDispatched': true,
              'statusHistory.$.notificationDispatchedAt': new Date(),
            },
          },
        );
      } else {
        await this.db.reports.updateOne(
          { _id: id, 'statusHistory.transitionId': transitionRecord.transitionId },
          {
            $set: {
              'statusHistory.$.notificationDispatched': false,
              'statusHistory.$.notificationDispatchError': 'Transient delivery failure',
            },
          },
        );
      }
    } catch (err: any) {
      this.logger.warn(`Failed to dispatch status event for report ${id}: ${err.message}`);
    }

    const updated = await this.db.reports.findOne({ _id: id });
    return this.mapToDto(updated!);
  }

  private validateCoordinates(coords: [number, number]) {
    if (!Array.isArray(coords) || coords.length !== 2) {
      throw new BadRequestException('Coordinates must be an array of [longitude, latitude]');
    }
    const [lng, lat] = coords;
    if (typeof lng !== 'number' || lng < -180 || lng > 180) {
      throw new BadRequestException(`Longitude must be between -180 and 180. Received: ${lng}`);
    }
    if (typeof lat !== 'number' || lat < -90 || lat > 90) {
      throw new BadRequestException(`Latitude must be between -90 and 90. Received: ${lat}`);
    }
    if (!isCoordinateInAndhraPradesh(lat, lng)) {
      throw new BadRequestException(
        `Issue coordinates [${lng}, ${lat}] are outside Andhra Pradesh jurisdiction. CivicPulse strictly accepts reports within Andhra Pradesh.`
      );
    }
  }

  async updateReportUrgency(
    id: string,
    dto: UpdateReportUrgencyDto,
    currentUser: JwtTokenPayload,
  ): Promise<ReportDto> {
    const report = await this.db.reports.findOne({ _id: id });
    if (!report) {
      throw new NotFoundException(`Report with id "${id}" not found`);
    }

    // Strictly authorize: Only verified administrative authority staff or admins can update urgency
    const isAuthorizedStaff =
      currentUser.role === UserRole.ADMIN ||
      currentUser.role === UserRole.MODERATOR;

    if (!isAuthorizedStaff) {
      throw new ForbiddenException(
        `Only authorized municipal administrators or moderators can update report urgency to "${dto.urgency}". Residents cannot assign or escalate issue urgency.`
      );
    }

    const now = new Date();
    await this.db.reports.updateOne(
      { _id: id },
      {
        $set: {
          urgency: dto.urgency as any,
          urgencyConfirmedBy: currentUser.sub,
          urgencyConfirmedAt: now,
          urgencyConfirmationReason: dto.reason.trim(),
          updatedAt: now,
        },
      }
    );

    this.logger.log(
      `Report ${id} urgency updated to ${dto.urgency} by ${currentUser.sub} (${currentUser.role})`
    );

    const updated = await this.db.reports.findOne({ _id: id });
    return this.mapToDto(updated!);
  }

  private mapToDto(doc: ReportDocument): ReportDto {
    return {
      id: doc._id,
      authorId: doc.authorId,
      title: doc.title,
      description: doc.description,
      category: doc.category,
      urgency: doc.urgency ? (doc.urgency as ReportUrgency) : undefined,
      urgencyConfirmedBy: doc.urgencyConfirmedBy,
      urgencyConfirmedAt: doc.urgencyConfirmedAt?.toISOString(),
      urgencyConfirmationReason: doc.urgencyConfirmationReason,
      location: doc.location
        ? {
            type: 'Point',
            // 4 decimal places location-precision policy (~11 meters) for privacy
            coordinates: [
              Math.round(doc.location.coordinates[0] * 10000) / 10000,
              Math.round(doc.location.coordinates[1] * 10000) / 10000,
            ],
          }
        : undefined,
      locationDescription: doc.locationDescription,
      administrativeContext: doc.administrativeContext,
      reporterLocation: doc.reporterLocation
        ? {
            coordinates: doc.reporterLocation.coordinates,
            eligibilityStatus: doc.reporterLocation.eligibilityStatus as any,
            accuracyMeters: doc.reporterLocation.accuracyMeters,
          }
        : undefined,
      media: this.mediaService.mapMediaDocsToDto(doc.media),
      status: doc.status,
      statusHistory: (doc.statusHistory || []).map((s) => ({
        transitionId: s.transitionId,
        previousStatus: s.previousStatus,
        newStatus: s.newStatus,
        actorUserId: s.actorUserId,
        actorRole: s.actorRole,
        reason: s.reason,
        timestamp: s.timestamp.toISOString(),
      })),
      resolutionNotes: doc.resolutionNotes,
      resolutionEvidenceMedia: this.mediaService.mapMediaDocsToDto(
        doc.resolutionEvidenceMedia,
      ),
      resolvedAt: doc.resolvedAt?.toISOString(),
      createdAt: doc.createdAt.toISOString(),
      updatedAt: doc.updatedAt.toISOString(),
    };
  }

  /**
   * Scans and recovers pending status transitions whose notification delivery was interrupted or failed.
   */
  async recoverPendingEvents(limit = 50): Promise<{ scanned: number; recovered: number; failed: number }> {
    const reportsWithPending = await this.db.reports
      .find({
        statusHistory: {
          $elemMatch: {
            notificationDispatched: false,
          },
        },
      })
      .limit(limit)
      .toArray();

    let scanned = 0;
    let recovered = 0;
    let failed = 0;

    for (const report of reportsWithPending) {
      for (const transition of report.statusHistory) {
        if (transition.notificationDispatched === false) {
          scanned++;
          const delivered = await dispatchNotificationEvent({
            notificationsServiceUrl: this.notificationsServiceUrl,
            internalServiceToken: this.internalServiceKey,
            eventId: transition.transitionId,
            eventType: NotificationEventType.REPORT_STATUS_CHANGED,
            aggregateId: report._id,
            payload: {
              reportId: report._id,
              reportTitle: report.title,
              authorId: report.authorId,
              previousStatus: transition.previousStatus,
              newStatus: transition.newStatus,
              updatedByUserId: transition.actorUserId,
              reason: transition.reason,
            },
            logger: this.logger,
          });

          if (delivered) {
            await this.db.reports.updateOne(
              { _id: report._id, 'statusHistory.transitionId': transition.transitionId },
              {
                $set: {
                  'statusHistory.$.notificationDispatched': true,
                  'statusHistory.$.notificationDispatchedAt': new Date(),
                  'statusHistory.$.notificationDispatchError': undefined,
                },
              },
            );
            recovered++;
            this.logger.log(`Recovered and delivered pending event for transition ${transition.transitionId}`);
          } else {
            failed++;
          }
        }
      }
    }

    return { scanned, recovered, failed };
  }

  // ===========================================================================
  // S2S Representative & Jurisdiction Sync Helpers
  // ===========================================================================

  private matchReportJurisdictionsAsync(payload: {
    reportId: string;
    coordinates?: [number, number];
    administrativeContext?: {
      districtId: string;
      mandalId?: string;
      localityId?: string;
    };
    category: string;
    status: ReportStatus;
  }): void {
    const postData = JSON.stringify(payload);
    const targetUrl = new URL('/api/v1/internal/reports/match-jurisdictions', this.authorityServiceUrl);

    const req = http.request(
      targetUrl.href,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(postData),
          'x-internal-service-token': this.internalServiceKey,
          'x-internal-service-name': 'reports-service',
        },
        timeout: 5000,
      },
      (res) => {
        if (res.statusCode && res.statusCode >= 200 && res.statusCode < 300) {
          this.logger.log(`Successfully matched jurisdictions for report ${payload.reportId}`);
        } else {
          this.logger.warn(`Jurisdiction match returned status ${res.statusCode} for report ${payload.reportId}`);
        }
      },
    );

    req.on('error', (err) => {
      this.logger.warn(`Failed to dispatch match jurisdictions for report ${payload.reportId}: ${err.message}`);
    });

    req.write(postData);
    req.end();
  }

  private syncReportStatusToAuthorityAsync(reportId: string, newStatus: ReportStatus): void {
    const postData = JSON.stringify({ status: newStatus });
    const targetUrl = new URL(`/api/v1/internal/reports/${encodeURIComponent(reportId)}/status-sync`, this.authorityServiceUrl);

    const req = http.request(
      targetUrl.href,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(postData),
          'x-internal-service-token': this.internalServiceKey,
          'x-internal-service-name': 'reports-service',
        },
        timeout: 5000,
      },
      (res) => {
        if (res.statusCode && res.statusCode >= 200 && res.statusCode < 300) {
          this.logger.log(`Synced status ${newStatus} to authority associations for report ${reportId}`);
        }
      },
    );

    req.on('error', (err) => {
      this.logger.warn(`Failed to sync status to authority for report ${reportId}: ${err.message}`);
    });

    req.write(postData);
    req.end();
  }
}

