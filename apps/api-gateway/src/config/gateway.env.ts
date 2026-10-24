import { Type } from 'class-transformer';
import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';

export class GatewayEnvConfig {
  @IsEnum(['development', 'production', 'test'])
  @IsOptional()
  NODE_ENV: string = 'development';

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  API_GATEWAY_PORT: number = 3000;

  @IsString()
  @IsOptional()
  LOG_LEVEL: string = 'debug';

  @IsString()
  @IsOptional()
  IDENTITY_SERVICE_URL: string = 'http://127.0.0.1:3001';

  @IsString()
  @IsOptional()
  REPORTS_SERVICE_URL: string = 'http://127.0.0.1:3002';

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  GATEWAY_TIMEOUT_MS: number = 10000;

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  RATE_LIMIT_MAX: number = 60; // 60 requests per minute

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  RATE_LIMIT_AUTH_MAX: number = 10; // 10 auth requests per minute

  @IsString()
  @IsOptional()
  CORS_ORIGIN: string = 'http://localhost:3000,http://localhost:8081,http://localhost:19006';

  @IsString()
  @IsOptional()
  INTERNAL_SERVICE_KEY: string = 'civic_pulse_internal_service_secret_dev';
}
