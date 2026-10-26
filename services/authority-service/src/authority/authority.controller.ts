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
} from '@civic-pulse/contracts';
import { AuthorityService } from './authority.service.js';
import {
  CreateAuthorityApplicationDto,
  ReviewAuthorityApplicationDto,
  CreateDepartmentDto,
  UpdateDepartmentDto,
  CreateReportAssignmentDto,
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
}
