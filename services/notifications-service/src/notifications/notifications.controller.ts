import {
  Controller,
  Get,
  Patch,
  Post,
  Body,
  Param,
  Query,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import {
  JwtAuthGuard,
  CurrentUser,
} from '@civic-pulse/nest-common';
import {
  NotificationDto,
  NotificationPreferencesDto,
  PaginatedNotificationsDto,
  JwtTokenPayload,
} from '@civic-pulse/contracts';
import { NotificationsService } from './notifications.service.js';
import {
  UpdatePreferencesDto,
  QueryNotificationsDto,
  IngestEventDto,
  RegisterDeviceTokenDto,
} from '../dto/notifications.dto.js';
import { InternalNotificationGuard } from '../auth/internal-notification.guard.js';

@ApiTags('Notifications')
@Controller()
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  // ===========================================================================
  // User Notification APIs (Authenticated)
  // ===========================================================================

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @Get('me/notifications')
  @ApiOperation({ summary: 'Get paginated notifications for current user' })
  @ApiResponse({ status: 200, description: 'Paginated list of notifications' })
  async getNotifications(
    @CurrentUser() user: JwtTokenPayload,
    @Query() query: QueryNotificationsDto,
  ): Promise<PaginatedNotificationsDto> {
    return this.notificationsService.getNotifications(user.sub, query);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @Get('me/notifications/unread-count')
  @ApiOperation({ summary: 'Get unread notification count for current user' })
  @ApiResponse({ status: 200, description: 'Unread count' })
  async getUnreadCount(
    @CurrentUser() user: JwtTokenPayload,
  ): Promise<{ unreadCount: number }> {
    return this.notificationsService.getUnreadCount(user.sub);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @Patch('me/notifications/:id/read')
  @ApiOperation({ summary: 'Mark a specific notification as read' })
  @ApiResponse({ status: 200, description: 'Notification marked as read' })
  async markAsRead(
    @Param('id') id: string,
    @CurrentUser() user: JwtTokenPayload,
  ): Promise<NotificationDto> {
    return this.notificationsService.markAsRead(id, user.sub);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @Patch('me/notifications/read-all')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Mark all notifications as read for current user' })
  @ApiResponse({ status: 200, description: 'All notifications marked as read' })
  async markAllAsRead(
    @CurrentUser() user: JwtTokenPayload,
  ): Promise<{ markedCount: number }> {
    return this.notificationsService.markAllAsRead(user.sub);
  }

  // ===========================================================================
  // Notification Preferences APIs (Authenticated)
  // ===========================================================================

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @Get('me/notification-preferences')
  @ApiOperation({ summary: 'Get notification preferences for current user' })
  @ApiResponse({ status: 200, description: 'Notification preferences' })
  async getPreferences(
    @CurrentUser() user: JwtTokenPayload,
  ): Promise<NotificationPreferencesDto> {
    return this.notificationsService.getPreferences(user.sub);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @Patch('me/notification-preferences')
  @ApiOperation({ summary: 'Update notification preferences for current user' })
  @ApiResponse({ status: 200, description: 'Updated notification preferences' })
  async updatePreferences(
    @CurrentUser() user: JwtTokenPayload,
    @Body() dto: UpdatePreferencesDto,
  ): Promise<NotificationPreferencesDto> {
    return this.notificationsService.updatePreferences(user.sub, dto);
  }

  // ===========================================================================
  // Push Notification Device Token Registration (Authenticated)
  // ===========================================================================

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @Post('me/device-tokens')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Register a device push token for the current user' })
  async registerDeviceToken(
    @CurrentUser() user: JwtTokenPayload,
    @Body() dto: RegisterDeviceTokenDto,
  ): Promise<{ registered: boolean }> {
    return this.notificationsService.registerDeviceToken(user.sub, dto);
  }

  // ===========================================================================
  // Internal Event Ingestion API (Protected via Internal S2S Guard)
  // ===========================================================================

  @UseGuards(InternalNotificationGuard)
  @Post('internal/notifications/events')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Ingest domain event and generate notifications (Internal S2S only)' })
  async ingestEvent(
    @Body() dto: IngestEventDto,
  ): Promise<{ processed: boolean; createdCount: number }> {
    return this.notificationsService.ingestEvent(dto);
  }
}
