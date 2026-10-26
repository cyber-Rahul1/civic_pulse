import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ReportCategory, ReportStatus } from '@civic-pulse/contracts';

export class GeoPointDto {
  @ApiProperty({ example: 'Point', enum: ['Point'] })
  @IsString()
  type: 'Point' = 'Point';

  @ApiProperty({
    example: [77.5946, 12.9716],
    description: '[longitude, latitude] in degrees. Longitude: -180 to 180, Latitude: -90 to 90',
  })
  @IsArray()
  @IsNumber({}, { each: true })
  coordinates!: [number, number];
}

export class MediaAttachmentInputDto {
  @ApiProperty({ example: 'med_abc123' })
  @IsString()
  @IsNotEmpty()
  mediaId!: string;

  @ApiProperty({ example: 'civic_pulse/reports/rep_1/sample' })
  @IsString()
  @IsNotEmpty()
  publicId!: string;

  @ApiProperty({ example: 'https://res.cloudinary.com/...' })
  @IsString()
  @IsNotEmpty()
  url!: string;

  @ApiProperty({ example: 'https://res.cloudinary.com/...' })
  @IsString()
  @IsNotEmpty()
  secureUrl!: string;

  @ApiProperty({ example: 'jpg' })
  @IsString()
  @IsNotEmpty()
  format!: string;

  @ApiProperty({ example: 'image', enum: ['image', 'video'] })
  @IsEnum(['image', 'video'])
  resourceType!: 'image' | 'video';

  @ApiProperty({ example: 1048576, description: 'Size in bytes' })
  @IsNumber()
  @Min(1)
  @Max(52428800) // 50MB max
  bytes!: number;
}

export class AdministrativeContextInputDto {
  @ApiProperty({ example: 'ntr' })
  @IsString()
  @IsNotEmpty()
  districtId!: string;

  @ApiPropertyOptional({ example: 'vijayawada_urban' })
  @IsOptional()
  @IsString()
  mandalId?: string;

  @ApiPropertyOptional({ example: 'benz_circle' })
  @IsOptional()
  @IsString()
  localityId?: string;
}

export class ReporterLocationInputDto {
  @ApiProperty({
    example: [80.648, 16.5062],
    description: 'Current device [longitude, latitude]',
  })
  @IsArray()
  @IsNumber({}, { each: true })
  coordinates!: [number, number];

  @ApiProperty({ enum: ['INSIDE_AP', 'OUTSIDE_AP', 'UNVERIFIED'] })
  @IsEnum(['INSIDE_AP', 'OUTSIDE_AP', 'UNVERIFIED'])
  eligibilityStatus!: 'INSIDE_AP' | 'OUTSIDE_AP' | 'UNVERIFIED';

  @ApiPropertyOptional({ example: 12.5 })
  @IsOptional()
  @IsNumber()
  accuracyMeters?: number;
}

export class UpdateReportUrgencyDto {
  @ApiProperty({ enum: ['low', 'medium', 'high', 'critical'], example: 'critical' })
  @IsEnum(['low', 'medium', 'high', 'critical'])
  urgency!: 'low' | 'medium' | 'high' | 'critical';

  @ApiProperty({ example: 'Life safety hazard confirmed on site by municipal engineering team' })
  @IsString()
  @MinLength(5)
  @MaxLength(500)
  reason!: string;
}

export class CreateReportDto {
  @ApiProperty({ example: 'Large pothole on 5th Main Road', minLength: 5, maxLength: 120 })
  @IsString()
  @MinLength(5)
  @MaxLength(120)
  title!: string;

  @ApiProperty({ example: 'Deep pothole causing traffic backup and bike accidents', minLength: 10, maxLength: 2000 })
  @IsString()
  @MinLength(10)
  @MaxLength(2000)
  description!: string;

  @ApiProperty({ enum: ReportCategory, example: ReportCategory.POTHOLE })
  @IsEnum(ReportCategory)
  category!: ReportCategory;

  @ApiPropertyOptional({ type: GeoPointDto })
  @IsOptional()
  @ValidateNested()
  @Type(() => GeoPointDto)
  location?: GeoPointDto;

  @ApiPropertyOptional({ example: 'Near Metro Pillar 140' })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  locationDescription?: string;

  @ApiPropertyOptional({
    description: 'Hierarchical administrative place identifiers (districtId, mandalId, localityId)',
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => AdministrativeContextInputDto)
  administrativeContext?: AdministrativeContextInputDto;

  @ApiPropertyOptional({
    description: 'Reporter current physical GPS location and eligibility status (distinguished from issue coordinates)',
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => ReporterLocationInputDto)
  reporterLocation?: ReporterLocationInputDto;

  @ApiPropertyOptional({ type: [MediaAttachmentInputDto] })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => MediaAttachmentInputDto)
  media?: MediaAttachmentInputDto[];
}

export class UpdateReportDto {
  @ApiPropertyOptional({ example: 'Updated title' })
  @IsOptional()
  @IsString()
  @MinLength(5)
  @MaxLength(120)
  title?: string;

  @ApiPropertyOptional({ example: 'Updated description' })
  @IsOptional()
  @IsString()
  @MinLength(10)
  @MaxLength(2000)
  description?: string;

  @ApiPropertyOptional({ example: 'Near Metro Pillar 142' })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  locationDescription?: string;

  @ApiPropertyOptional({ type: [MediaAttachmentInputDto] })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => MediaAttachmentInputDto)
  media?: MediaAttachmentInputDto[];
}

export class TransitionStatusDto {
  @ApiProperty({ enum: ReportStatus, example: ReportStatus.UNDER_REVIEW })
  @IsEnum(ReportStatus)
  status!: ReportStatus;

  @ApiPropertyOptional({ example: 'Investigating with water supply team' })
  @IsOptional()
  @IsString()
  @MaxLength(500)
  reason?: string;

  @ApiPropertyOptional({ example: 'Pothole filled with asphalt' })
  @IsOptional()
  @IsString()
  @MaxLength(1000)
  resolutionNotes?: string;

  @ApiPropertyOptional({ type: [MediaAttachmentInputDto] })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => MediaAttachmentInputDto)
  resolutionEvidenceMedia?: MediaAttachmentInputDto[];
}

export class QueryReportsDto {
  @ApiPropertyOptional({ enum: ReportCategory })
  @IsOptional()
  @IsEnum(ReportCategory)
  category?: ReportCategory;

  @ApiPropertyOptional({ enum: ReportStatus })
  @IsOptional()
  @IsEnum(ReportStatus)
  status?: ReportStatus;

  @ApiPropertyOptional({ example: '2026-10-01T00:00:00Z' })
  @IsOptional()
  @IsString()
  fromDate?: string;

  @ApiPropertyOptional({ example: '2026-10-31T23:59:59Z' })
  @IsOptional()
  @IsString()
  toDate?: string;

  @ApiPropertyOptional({ example: 1, default: 1 })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  page: number = 1;

  @ApiPropertyOptional({ example: 20, default: 20 })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  @Max(100) // Sensible max query limit
  limit: number = 20;
}

export class NearbyReportsDto {
  @ApiProperty({ example: 77.5946, description: 'Longitude (-180 to 180)' })
  @Type(() => Number)
  @IsNumber()
  @Min(-180)
  @Max(180)
  longitude!: number;

  @ApiProperty({ example: 12.9716, description: 'Latitude (-90 to 90)' })
  @Type(() => Number)
  @IsNumber()
  @Min(-90)
  @Max(90)
  latitude!: number;

  @ApiPropertyOptional({ example: 5000, description: 'Search radius in meters (max 50,000)' })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(10)
  @Max(50000) // 50km max radius
  radiusMeters: number = 5000;

  @ApiPropertyOptional({ example: 50, default: 50 })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  @Max(100)
  limit: number = 50;

  @ApiPropertyOptional({ enum: ReportCategory, description: 'Optional category filter' })
  @IsOptional()
  @IsEnum(ReportCategory)
  category?: ReportCategory;

  @ApiPropertyOptional({ enum: ReportStatus, description: 'Optional status filter' })
  @IsOptional()
  @IsEnum(ReportStatus)
  status?: ReportStatus;
}

export class SignUploadDto {
  @ApiPropertyOptional({ example: 'rep_12345' })
  @IsOptional()
  @IsString()
  reportId?: string;

  @ApiPropertyOptional({ example: 'image', enum: ['image', 'video'] })
  @IsOptional()
  @IsEnum(['image', 'video'])
  resourceType: 'image' | 'video' = 'image';
}
