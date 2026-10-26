import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
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
  InternalServiceGuard,
} from '@civic-pulse/nest-common';
import {
  UserRole,
  JwtTokenPayload,
  CommentDto,
  EndorsementSummaryDto,
  CommunitySummaryDto,
  AbuseReportDto,
} from '@civic-pulse/contracts';
import { CommunityService } from './community.service.js';
import {
  CreateCommentDto,
  UpdateCommentDto,
  QueryCommentsDto,
  CreateAbuseReportDto,
  ModerateCommentDto,
} from '../dto/community.dto.js';

@ApiTags('Community')
@Controller()
export class CommunityController {
  constructor(private readonly communityService: CommunityService) {}

  // ===========================================================================
  // Endorsement Endpoints
  // ===========================================================================
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @Put('reports/:reportId/endorsement')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Endorse/support a civic report' })
  @SwaggerResponse({ status: 200, description: 'Report endorsed' })
  async endorseReport(
    @Param('reportId') reportId: string,
    @CurrentUser() user: JwtTokenPayload,
  ): Promise<EndorsementSummaryDto> {
    return this.communityService.endorseReport(reportId, user.sub);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @Delete('reports/:reportId/endorsement')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Remove endorsement for a civic report' })
  @SwaggerResponse({ status: 200, description: 'Endorsement removed' })
  async removeEndorsement(
    @Param('reportId') reportId: string,
    @CurrentUser() user: JwtTokenPayload,
  ): Promise<EndorsementSummaryDto> {
    return this.communityService.removeEndorsement(reportId, user.sub);
  }

  @Public()
  @Get('reports/:reportId/endorsement')
  @ApiOperation({ summary: 'Get report endorsement count and user endorsement state' })
  async getEndorsementState(
    @Param('reportId') reportId: string,
    @CurrentUser() user?: JwtTokenPayload,
  ): Promise<EndorsementSummaryDto> {
    return this.communityService.getEndorsementState(reportId, user?.sub);
  }

  @Public()
  @Get('reports/:reportId/community-summary')
  @ApiOperation({ summary: 'Get overall community participation summary for report' })
  async getCommunitySummary(
    @Param('reportId') reportId: string,
    @CurrentUser() user?: JwtTokenPayload,
  ): Promise<CommunitySummaryDto> {
    return this.communityService.getCommunitySummary(reportId, user?.sub);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.MODERATOR)
  @ApiBearerAuth('JWT-auth')
  @Post('reports/:reportId/stats/reconcile')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Reconcile cached community statistics with authoritative records (Admin/Moderator only)' })
  async reconcileReportStats(
    @Param('reportId') reportId: string,
  ) {
    return this.communityService.reconcileReportStats(reportId);
  }

  // ===========================================================================
  // Follow Endpoints
  // ===========================================================================
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @Put('reports/:reportId/follow')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Follow a civic report for updates' })
  async followReport(
    @Param('reportId') reportId: string,
    @CurrentUser() user: JwtTokenPayload,
  ): Promise<{ isFollowing: boolean }> {
    return this.communityService.followReport(reportId, user.sub);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @Delete('reports/:reportId/follow')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Unfollow a civic report' })
  async unfollowReport(
    @Param('reportId') reportId: string,
    @CurrentUser() user: JwtTokenPayload,
  ): Promise<{ isFollowing: boolean }> {
    return this.communityService.unfollowReport(reportId, user.sub);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @Get('reports/:reportId/follow')
  @ApiOperation({ summary: 'Check if caller follows a report' })
  async getFollowState(
    @Param('reportId') reportId: string,
    @CurrentUser() user: JwtTokenPayload,
  ): Promise<{ isFollowing: boolean }> {
    return this.communityService.getFollowState(reportId, user.sub);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @Get('me/followed-reports')
  @ApiOperation({ summary: 'List followed reports for current user' })
  async getFollowedReports(
    @CurrentUser() user: JwtTokenPayload,
    @Query('page') page?: number,
    @Query('limit') limit?: number,
  ) {
    return this.communityService.getFollowedReports(
      user.sub,
      page ? Number(page) : 1,
      limit ? Number(limit) : 20,
    );
  }

  // ===========================================================================
  // Comments Endpoints
  // ===========================================================================
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @Post('reports/:reportId/comments')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a comment or reply on a report' })
  async createComment(
    @Param('reportId') reportId: string,
    @CurrentUser() user: JwtTokenPayload,
    @Body() dto: CreateCommentDto,
  ): Promise<CommentDto> {
    return this.communityService.createComment(reportId, user.sub, dto);
  }

  @Public()
  @Get('reports/:reportId/comments')
  @ApiOperation({ summary: 'List top-level comments for a report' })
  async listComments(
    @Param('reportId') reportId: string,
    @Query() query: QueryCommentsDto,
  ) {
    return this.communityService.listComments(reportId, query);
  }

  @Public()
  @Get('comments/:commentId/replies')
  @ApiOperation({ summary: 'List replies for a specific comment' })
  async listReplies(@Param('commentId') commentId: string): Promise<CommentDto[]> {
    return this.communityService.listReplies(commentId);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @Patch('comments/:commentId')
  @ApiOperation({ summary: 'Edit own comment' })
  async updateComment(
    @Param('commentId') commentId: string,
    @CurrentUser() user: JwtTokenPayload,
    @Body() dto: UpdateCommentDto,
  ): Promise<CommentDto> {
    return this.communityService.updateComment(commentId, user.sub, dto);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @Delete('comments/:commentId')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Soft-delete a comment' })
  async deleteComment(
    @Param('commentId') commentId: string,
    @CurrentUser() user: JwtTokenPayload,
  ) {
    return this.communityService.deleteComment(commentId, user.sub, user.role);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.MODERATOR, UserRole.ADMIN)
  @ApiBearerAuth('JWT-auth')
  @Post('comments/:commentId/moderate')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Moderate comment visibility (moderator/admin only)' })
  async moderateComment(
    @Param('commentId') commentId: string,
    @CurrentUser() user: JwtTokenPayload,
    @Body() dto: ModerateCommentDto,
  ): Promise<CommentDto> {
    return this.communityService.moderateComment(commentId, user.sub, dto);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @Post('comments/:commentId/abuse-reports')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Report a comment for abuse' })
  async reportAbuse(
    @Param('commentId') commentId: string,
    @CurrentUser() user: JwtTokenPayload,
    @Body() dto: CreateAbuseReportDto,
  ): Promise<AbuseReportDto> {
    return this.communityService.reportAbuse(commentId, user.sub, dto);
  }

  @Post('internal/community/events/recover')
  @UseGuards(InternalServiceGuard)
  @ApiOperation({ summary: 'Recover and retry pending comment notification events (Internal S2S)' })
  async recoverPendingEvents(): Promise<{ scanned: number; recovered: number; failed: number }> {
    return this.communityService.recoverPendingEvents();
  }
}
