import {
  Injectable,
  NotFoundException,
  ForbiddenException,
  BadRequestException,
} from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { Filter } from 'mongodb';
import { CivicLogger } from '@civic-pulse/nest-common';
import {
  ReportDto,
  ReportStatus,
  UserRole,
  JwtTokenPayload,
} from '@civic-pulse/contracts';
import { DatabaseService } from '../database/database.service.js';
import { MediaService } from '../media/media.service.js';
import {
  CreateReportDto,
  UpdateReportDto,
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
  constructor(
    private readonly db: DatabaseService,
    private readonly mediaService: MediaService,
    private readonly logger: CivicLogger,
  ) {
    this.logger.setContext('Reports:ReportsService');
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
    // Validate coordinates range
    this.validateCoordinates(dto.location.coordinates);

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
      location: {
        type: 'Point',
        coordinates: [dto.location.coordinates[0], dto.location.coordinates[1]],
      },
      locationDescription: dto.locationDescription?.trim(),
      media: validatedMedia,
      status: ReportStatus.SUBMITTED,
      statusHistory: [initialTransition],
      createdAt: now,
      updatedAt: now,
    };

    await this.db.reports.insertOne(doc);
    this.logger.log(`Created report ${reportId} for author ${author.sub}`);

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

    const docs = await this.db.reports
      .find({
        location: {
          $near: {
            $geometry: {
              type: 'Point',
              coordinates: [Number(query.longitude), Number(query.latitude)],
            },
            $maxDistance: maxRadius,
          },
        },
      })
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
  }

  private mapToDto(doc: ReportDocument): ReportDto {
    return {
      id: doc._id,
      authorId: doc.authorId,
      title: doc.title,
      description: doc.description,
      category: doc.category,
      location: {
        type: 'Point',
        // 4 decimal places location-precision policy (~11 meters) for privacy
        coordinates: [
          Math.round(doc.location.coordinates[0] * 10000) / 10000,
          Math.round(doc.location.coordinates[1] * 10000) / 10000,
        ],
      },
      locationDescription: doc.locationDescription,
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
}
