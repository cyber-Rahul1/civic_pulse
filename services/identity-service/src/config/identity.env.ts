import { Type } from 'class-transformer';
import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';

export class IdentityEnvConfig {
  @IsEnum(['development', 'production', 'test'])
  @IsOptional()
  NODE_ENV: string = 'development';

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  IDENTITY_SERVICE_PORT: number = 3001;

  @IsString()
  @IsOptional()
  LOG_LEVEL: string = 'debug';

  @IsString()
  IDENTITY_DB_URI: string = 'mongodb://civic_identity_user:identity_dev_secret@localhost:27018/civic_identity?authSource=civic_identity';

  @IsString()
  @IsOptional()
  REDIS_HOST: string = 'localhost';

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  REDIS_PORT: number = 6380;

  @IsString()
  @IsOptional()
  REDIS_PASSWORD?: string = 'redis_dev_secret_password';

  @IsString()
  @IsOptional()
  JWT_PRIVATE_KEY_PEM?: string;

  @IsString()
  @IsOptional()
  JWT_PUBLIC_KEY_PEM?: string;

  @IsString()
  @IsOptional()
  JWT_ISSUER: string = 'civic-pulse:identity';

  @IsString()
  @IsOptional()
  JWT_AUDIENCE: string = 'civic-pulse:api';

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  JWT_ACCESS_EXPIRATION_SECONDS: number = 900; // 15 minutes

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  JWT_REFRESH_EXPIRATION_SECONDS: number = 604800; // 7 days

  @IsString()
  @IsOptional()
  INTERNAL_SERVICE_KEY: string = 'civic_pulse_internal_service_secret_dev';

  @IsString()
  @IsOptional()
  AUTHORITY_INTERNAL_KEY: string = 'civic_pulse_authority_internal_secret_dev';
}
