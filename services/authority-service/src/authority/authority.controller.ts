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
  ApiBearerAuth,
} from '@nestjs/swagger';
import {
  JwtAuthGuard,
  RolesGuard,
  Roles,
  CurrentUser,
  Public,
  InternalServiceGuard,
} from '@civic-pulse/nest-common';
import {
  UserRole,
  JwtTokenPayload,
  AuthorityApplicationDto,
  DepartmentDto,
  ReportAssignmentDto,
  PublicAssignmentViewDto,
  RepresentativeProfileDto,
  RepresentativeAccountabilitySummaryDto,
  ResolutionEvidenceDto,
  ProfileClaimRequestDto,
  RepresentativeImportSummaryDto,
  ProfileClaimStatus,
} from '@civic-pulse/contracts';
import { AuthorityService } from './authority.service.js';
import {
  CreateAuthorityApplicationDto,
  ReviewAuthorityApplicationDto,
  CreateDepartmentDto,
  UpdateDepartmentDto,
  CreateReportAssignmentDto,
  QueryRepresentativesDto,
  SubmitProfileClaimDtoClass,
  ReviewProfileClaimDtoClass,
  UpdateRepresentativeProfileDtoClass,
  SubmitResolutionEvidenceDtoClass,
  VerifyResolutionEvidenceDtoClass,
} from '../dto/authority.dto.js';

@ApiTags('Authority')
@Controller()
export class AuthorityController {
  constructor(private readonly authorityService: AuthorityService) {}

  // ===========================================================================
  // Authority Verification Applications
  // ===========================================================================
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @Post('authority/applications')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Submit an authority verification application' })
  async submitApplication(
    @CurrentUser() user: JwtTokenPayload,
    @Body() dto: CreateAuthorityApplicationDto,
  ): Promise<AuthorityApplicationDto> {
    return this.authorityService.submitApplication(user.sub, dto);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @Get('authority/applications/me')
  @ApiOperation({ summary: 'Get caller own authority verification application' })
  async getMyApplication(
    @CurrentUser() user: JwtTokenPayload,
  ): Promise<AuthorityApplicationDto | null> {
    return this.authorityService.getMyApplication(user.sub);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiBearerAuth('JWT-auth')
  @Get('authority/applications')
  @ApiOperation({ summary: 'List pending authority verification applications (Admin only)' })
  async listPendingApplications(): Promise<AuthorityApplicationDto[]> {
    return this.authorityService.listPendingApplications();
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiBearerAuth('JWT-auth')
  @Post('authority/applications/:id/review')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Approve or reject authority verification application (Admin only)' })
  async reviewApplication(
    @Param('id') applicationId: string,
    @CurrentUser() user: JwtTokenPayload,
    @Body() dto: ReviewAuthorityApplicationDto,
  ): Promise<AuthorityApplicationDto> {
    return this.authorityService.reviewApplication(applicationId, user.sub, dto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiBearerAuth('JWT-auth')
  @Post('authority/applications/reconcile-role-grants')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Reconcile pending/failed role grants for approved applications (Admin only)' })
  async reconcilePendingRoleGrants(): Promise<{
    scanned: number;
    reconciled: number;
    failed: number;
  }> {
    return this.authorityService.reconcilePendingRoleGrants();
  }

  // ===========================================================================
  // Departments Management
  // ===========================================================================
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiBearerAuth('JWT-auth')
  @Post('authority/departments')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new municipal department (Admin only)' })
  async createDepartment(
    @Body() dto: CreateDepartmentDto,
  ): Promise<DepartmentDto> {
    return this.authorityService.createDepartment(dto);
  }

  @Public()
  @Get('authority/departments')
  @ApiOperation({ summary: 'List municipal departments (public)' })
  async listDepartments(
    @Query('includeInactive') includeInactive?: boolean,
  ): Promise<DepartmentDto[]> {
    return this.authorityService.listDepartments(Boolean(includeInactive));
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiBearerAuth('JWT-auth')
  @Patch('authority/departments/:id')
  @ApiOperation({ summary: 'Update or deactivate a department (Admin only)' })
  async updateDepartment(
    @Param('id') id: string,
    @Body() dto: UpdateDepartmentDto,
  ): Promise<DepartmentDto> {
    return this.authorityService.updateDepartment(id, dto);
  }

  // ===========================================================================
  // Report Assignments
  // ===========================================================================
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.AUTHORITY, UserRole.ADMIN)
  @ApiBearerAuth('JWT-auth')
  @Post('reports/:reportId/assignments')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Assign civic report to department (Verified Authority/Admin only)' })
  async assignReport(
    @Param('reportId') reportId: string,
    @CurrentUser() user: JwtTokenPayload,
    @Body() dto: CreateReportAssignmentDto,
  ): Promise<ReportAssignmentDto> {
    return this.authorityService.assignReport(reportId, user.sub, dto);
  }

  @Public()
  @Get('reports/:reportId/assignments')
  @ApiOperation({ summary: 'Get report assignments history and current department' })
  async getReportAssignments(
    @Param('reportId') reportId: string,
  ): Promise<ReportAssignmentDto[]> {
    return this.authorityService.getReportAssignments(reportId);
  }

  @Public()
  @Get('reports/:reportId/assignments/public')
  @ApiOperation({ summary: 'Public safe accountability view of report assignment' })
  async getPublicAssignmentView(
    @Param('reportId') reportId: string,
  ): Promise<PublicAssignmentViewDto> {
    return this.authorityService.getPublicAssignmentView(reportId);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.AUTHORITY, UserRole.ADMIN)
  @ApiBearerAuth('JWT-auth')
  @Get('me/authority-assignments')
  @ApiOperation({ summary: 'List report assignments by current authority user' })
  async getMyAssignments(
    @CurrentUser() user: JwtTokenPayload,
  ): Promise<ReportAssignmentDto[]> {
    return this.authorityService.getMyAssignments(user.sub);
  }

  @Post('internal/authority/events/recover')
  @UseGuards(InternalServiceGuard)
  @ApiOperation({ summary: 'Recover and retry pending authority notification events (Internal S2S)' })
  async recoverPendingEvents(): Promise<{ scanned: number; recovered: number; failed: number }> {
    return this.authorityService.recoverPendingEvents();
  }

  // ===========================================================================
  // Feature A & H: Public Representatives Directory & Admin Management
  // ===========================================================================

  @Public()
  @Get('authority/representatives')
  @ApiOperation({ summary: 'Public list/search of elected representatives' })
  async listRepresentatives(@Query() query: QueryRepresentativesDto) {
    return this.authorityService.queryRepresentatives(query);
  }

  @Public()
  @Get('authority/representatives/coverage')
  @ApiOperation({ summary: 'Get official data source coverage report' })
  async getCoverageReport() {
    return this.authorityService.getCoverageReport();
  }

  @Public()
  @Get('authority/representatives/:id')
  @ApiOperation({ summary: 'Get public representative profile details' })
  async getRepresentativeById(@Param('id') id: string): Promise<RepresentativeProfileDto> {
    return this.authorityService.getRepresentativeById(id);
  }

  @Public()
  @Get('authority/representatives/:id/accountability')
  @ApiOperation({ summary: 'Get representative civic accountability metrics summary' })
  async getRepresentativeAccountability(
    @Param('id') id: string,
  ): Promise<RepresentativeAccountabilitySummaryDto> {
    return this.authorityService.getRepresentativeAccountabilitySummary(id);
  }

  @Public()
  @Get('authority/representatives/:id/reports')
  @ApiOperation({ summary: 'Get reports associated with representative jurisdiction' })
  async getRepresentativeReports(
    @Param('id') id: string,
    @Query('status') status?: string,
    @Query('page') page?: number,
    @Query('limit') limit?: number,
  ) {
    return this.authorityService.getRepresentativeReports(id, status, Number(page) || 1, Number(limit) || 20);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiBearerAuth('JWT-auth')
  @Post('authority/representatives/sync')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Trigger synchronization of official representative public data (Admin only)' })
  async syncRepresentatives(): Promise<RepresentativeImportSummaryDto> {
    return this.authorityService.syncOfficialRepresentativeData();
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @Patch('authority/representatives/:id')
  @ApiOperation({ summary: 'Update permitted profile fields (Claimed Representative or Admin only)' })
  async updateRepresentativeProfile(
    @Param('id') id: string,
    @CurrentUser() user: JwtTokenPayload,
    @Body() dto: UpdateRepresentativeProfileDtoClass,
  ): Promise<RepresentativeProfileDto> {
    return this.authorityService.updateRepresentativeProfile(id, { sub: user.sub, role: user.role }, dto);
  }

  // ===========================================================================
  // Feature F: Profile Claiming Workflow
  // ===========================================================================

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @Post('authority/representatives/:id/claims')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Submit claim request for representative profile' })
  async submitProfileClaim(
    @Param('id') id: string,
    @CurrentUser() user: JwtTokenPayload,
    @Body() dto: SubmitProfileClaimDtoClass,
  ): Promise<ProfileClaimRequestDto> {
    return this.authorityService.submitProfileClaim(id, user.sub, dto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiBearerAuth('JWT-auth')
  @Get('authority/claims')
  @ApiOperation({ summary: 'List profile claim requests for moderation (Admin only)' })
  async listProfileClaims(
    @Query('status') status?: ProfileClaimStatus,
  ): Promise<ProfileClaimRequestDto[]> {
    return this.authorityService.listProfileClaims(status);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiBearerAuth('JWT-auth')
  @Post('authority/claims/:id/review')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Approve or reject representative profile claim (Admin only)' })
  async reviewProfileClaim(
    @Param('id') id: string,
    @CurrentUser() user: JwtTokenPayload,
    @Body() dto: ReviewProfileClaimDtoClass,
  ): Promise<ProfileClaimRequestDto> {
    return this.authorityService.reviewProfileClaim(id, user.sub, dto);
  }

  // ===========================================================================
  // Feature E: Resolution Evidence
  // ===========================================================================

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @Post('reports/:reportId/evidence')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Submit resolution evidence (photo + notes) for a report' })
  async submitResolutionEvidence(
    @Param('reportId') reportId: string,
    @CurrentUser() user: JwtTokenPayload,
    @Body() dto: SubmitResolutionEvidenceDtoClass,
  ): Promise<ResolutionEvidenceDto> {
    return this.authorityService.submitResolutionEvidence(reportId, { sub: user.sub, role: user.role }, dto);
  }

  @Public()
  @Get('reports/:reportId/evidence')
  @ApiOperation({ summary: 'Get resolution evidence items (BEFORE & AFTER) for a report' })
  async getReportEvidence(
    @Param('reportId') reportId: string,
  ): Promise<ResolutionEvidenceDto[]> {
    return this.authorityService.getReportEvidence(reportId);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.MODERATOR, UserRole.AUTHORITY)
  @ApiBearerAuth('JWT-auth')
  @Post('authority/evidence/:id/verify')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Verify or reject proposed resolution evidence (Admin/Moderator/Authority)' })
  async verifyResolutionEvidence(
    @Param('id') id: string,
    @CurrentUser() user: JwtTokenPayload,
    @Body() dto: VerifyResolutionEvidenceDtoClass,
  ): Promise<ResolutionEvidenceDto> {
    return this.authorityService.verifyResolutionEvidence(id, user.sub, dto);
  }

  // ===========================================================================
  // Internal S2S: Match & Status Sync for Reports
  // ===========================================================================

  @Post('internal/reports/match-jurisdictions')
  @UseGuards(InternalServiceGuard)
  @ApiOperation({ summary: 'Match report location to jurisdictions and representatives (Internal S2S)' })
  async matchReportJurisdictions(@Body() body: any) {
    return this.authorityService.matchAndAssociateReport(body);
  }

  @Post('internal/reports/:reportId/status-sync')
  @UseGuards(InternalServiceGuard)
  @ApiOperation({ summary: 'Sync report status into representative association records (Internal S2S)' })
  async syncReportStatus(
    @Param('reportId') reportId: string,
    @Body('status') status: any,
  ) {
    return this.authorityService.updateReportStatusInAssociations(reportId, status);
  }
}

