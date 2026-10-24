import {
  Controller,
  Get,
  Post,
  Patch,
  Body,
  Param,
  Query,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse as SwaggerResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import {
  JwtAuthGuard,
  RolesGuard,
  Roles,
  CurrentUser,
  Public,
} from '@civic-pulse/nest-common';
import {
  ReportDto,
  ReportStatus,
  UserRole,
  JwtTokenPayload,
  MediaSignatureResponseDto,
} from '@civic-pulse/contracts';
import { ReportsService } from './reports.service.js';
import { MediaService } from '../media/media.service.js';
import {
  CreateReportDto,
  UpdateReportDto,
  TransitionStatusDto,
  QueryReportsDto,
  NearbyReportsDto,
  SignUploadDto,
} from '../dto/reports.dto.js';

@ApiTags('Reports & Media')
@Controller()
export class ReportsController {
  constructor(
    private readonly reportsService: ReportsService,
    private readonly mediaService: MediaService,
  ) {}

  // ---------------------------------------------------------------------------
  // Media Upload Signing
  // ---------------------------------------------------------------------------
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @Post('media/sign-upload')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Generate short-lived presigned upload signature for Cloudinary' })
  @SwaggerResponse({ status: 200, description: 'Presigned parameters returned' })
  async signUpload(
    @CurrentUser() user: JwtTokenPayload,
    @Body() dto: SignUploadDto,
  ): Promise<MediaSignatureResponseDto> {
    return this.mediaService.generateUploadSignature(user.sub, dto);
  }

  // ---------------------------------------------------------------------------
  // Reports CRUD & Lifecycle Endpoints
  // ---------------------------------------------------------------------------
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @Post('reports')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new civic issue report' })
  @SwaggerResponse({ status: 201, description: 'Report created successfully' })
  async createReport(
    @CurrentUser() user: JwtTokenPayload,
    @Body() dto: CreateReportDto,
  ): Promise<ReportDto> {
    return this.reportsService.createReport(dto, user);
  }

  @Public()
  @Get('reports/nearby')
  @ApiOperation({ summary: 'Find reports within a specified geographic radius using 2dsphere index' })
  @SwaggerResponse({ status: 200, description: 'Nearby reports returned' })
  async getNearbyReports(@Query() query: NearbyReportsDto): Promise<ReportDto[]> {
    return this.reportsService.findNearby(query);
  }

  @Public()
  @Get('reports')
  @ApiOperation({ summary: 'Paginated list of reports with category and status filters' })
  @SwaggerResponse({ status: 200, description: 'Filtered report listing returned' })
  async listReports(@Query() query: QueryReportsDto) {
    return this.reportsService.queryReports(query);
  }

  @Public()
  @Get('reports/:id')
  @ApiOperation({ summary: 'Retrieve report details by ID' })
  @SwaggerResponse({ status: 200, description: 'Report found' })
  @SwaggerResponse({ status: 404, description: 'Report not found' })
  async getReport(@Param('id') id: string): Promise<ReportDto> {
    return this.reportsService.getReportById(id);
  }

  @Public()
  @Get('reports/:id/history')
  @ApiOperation({ summary: 'Retrieve immutable status transition history for a report' })
  @SwaggerResponse({ status: 200, description: 'Status history timeline' })
  async getReportHistory(@Param('id') id: string) {
    return this.reportsService.getReportHistory(id);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @Patch('reports/:id')
  @ApiOperation({ summary: 'Edit report details (permitted for author or moderator/admin)' })
  @SwaggerResponse({ status: 200, description: 'Report updated' })
  async updateReport(
    @Param('id') id: string,
    @CurrentUser() user: JwtTokenPayload,
    @Body() dto: UpdateReportDto,
  ): Promise<ReportDto> {
    return this.reportsService.updateReport(id, dto, user);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.MODERATOR, UserRole.RESIDENT)
  @ApiBearerAuth('JWT-auth')
  @Post('reports/:id/status')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Execute lifecycle status transition with audit log' })
  @SwaggerResponse({ status: 200, description: 'Status transitioned successfully' })
  async transitionStatus(
    @Param('id') id: string,
    @CurrentUser() user: JwtTokenPayload,
    @Body() dto: TransitionStatusDto,
  ): Promise<ReportDto> {
    return this.reportsService.transitionStatus(id, dto, user);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiBearerAuth('JWT-auth')
  @Post('reports/:id/resolve')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Explicit municipal resolution endpoint (verified administrative authority only)' })
  @SwaggerResponse({ status: 200, description: 'Report resolved' })
  async resolveReport(
    @Param('id') id: string,
    @CurrentUser() user: JwtTokenPayload,
    @Body() dto: { resolutionNotes?: string; resolutionEvidenceMedia?: any[] },
  ): Promise<ReportDto> {
    return this.reportsService.transitionStatus(
      id,
      {
        status: ReportStatus.RESOLVED,
        reason: 'Issue verified resolved by municipal authority',
        resolutionNotes: dto.resolutionNotes,
        resolutionEvidenceMedia: dto.resolutionEvidenceMedia,
      },
      user,
    );
  }
}
