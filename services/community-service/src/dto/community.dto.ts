import { IsString, IsNotEmpty, IsOptional, MaxLength, MinLength, IsEnum, IsNumber, Min, Max } from 'class-validator';
import { Type } from 'class-transformer';
import { AbuseReportReason, CommentModerationStatus } from '@civic-pulse/contracts';

export class CreateCommentDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(2, { message: 'Comment content must be at least 2 characters' })
  @MaxLength(1000, { message: 'Comment content cannot exceed 1000 characters' })
  content!: string;

  @IsOptional()
  @IsString()
  parentCommentId?: string;
}

export class UpdateCommentDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(2, { message: 'Comment content must be at least 2 characters' })
  @MaxLength(1000, { message: 'Comment content cannot exceed 1000 characters' })
  content!: string;
}

export class QueryCommentsDto {
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  page?: number = 1;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  @Max(100)
  limit?: number = 20;
}

export class CreateAbuseReportDto {
  @IsEnum(AbuseReportReason)
  reason!: AbuseReportReason;

  @IsOptional()
  @IsString()
  @MaxLength(500)
  details?: string;
}

export class ModerateCommentDto {
  @IsEnum(CommentModerationStatus)
  status!: CommentModerationStatus;

  @IsOptional()
  @IsString()
  @MaxLength(300)
  moderationNotes?: string;
}
