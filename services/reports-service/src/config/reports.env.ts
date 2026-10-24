import { Type } from 'class-transformer';
import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';

export class ReportsEnvConfig {
  @IsEnum(['development', 'production', 'test'])
  @IsOptional()
  NODE_ENV: string = 'development';

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  REPORTS_SERVICE_PORT: number = 3002;

  @IsString()
  @IsOptional()
  LOG_LEVEL: string = 'debug';

  @IsString()
  REPORTS_DB_URI: string =
    'mongodb://civic_reports_user:reports_dev_secret@localhost:27018/civic_reports?authSource=civic_reports';

  @IsString()
  @IsOptional()
  IDENTITY_SERVICE_URL: string = 'http://127.0.0.1:3001';

  @IsString()
  @IsOptional()
  JWT_PUBLIC_KEY_PEM?: string;

  @IsString()
  @IsOptional()
  JWT_ISSUER: string = 'civic-pulse:identity';

  @IsString()
  @IsOptional()
  JWT_AUDIENCE: string = 'civic-pulse:api';

  @IsString()
  @IsOptional()
  INTERNAL_SERVICE_KEY: string = 'civic_pulse_internal_service_secret_dev';

  // Cloudinary credentials (must be valid in production; missing triggers ServiceUnavailableException)
  @IsString()
  @IsOptional()
  CLOUDINARY_CLOUD_NAME?: string;

  @IsString()
  @IsOptional()
  CLOUDINARY_API_KEY?: string;

  @IsString()
  @IsOptional()
  CLOUDINARY_API_SECRET?: string;
}
