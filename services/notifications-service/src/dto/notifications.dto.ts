import { IsBoolean, IsOptional, IsString, IsNotEmpty, IsObject, IsNumber, Min, Max } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class UpdatePreferencesDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  emailNotifications?: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  pushNotifications?: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  notifyOnStatusChange?: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  notifyOnComments?: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  notifyOnAssignments?: boolean;
}

export class QueryNotificationsDto {
  @ApiPropertyOptional({ default: 1 })
  @IsOptional()
  @IsNumber()
  @Min(1)
  page?: number = 1;

  @ApiPropertyOptional({ default: 20 })
  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(100)
  limit?: number = 20;

  @ApiPropertyOptional({ description: 'Filter unread only' })
  @IsOptional()
  @IsBoolean()
  unreadOnly?: boolean;

  @ApiPropertyOptional({ description: 'Cursor for cursor-based pagination (ISO date)' })
  @IsOptional()
  @IsString()
  cursor?: string;
}

export class IngestEventDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  eventId!: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  eventType!: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  aggregateId!: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  aggregateType?: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsObject()
  payload!: Record<string, any>;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  topic?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  timestamp?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  correlationId?: string;
}

export class RegisterDeviceTokenDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  token!: string;

  @ApiProperty({ enum: ['ios', 'android', 'web'] })
  @IsNotEmpty()
  @IsString()
  platform!: 'ios' | 'android' | 'web';
}
