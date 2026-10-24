import { Controller, Get, Injectable } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse as SwaggerResponse } from '@nestjs/swagger';
import { ServiceHealthStatus } from '@civic-pulse/contracts';

export interface HealthCheckIndicator {
  name: string;
  check: () => Promise<{ status: 'up' | 'down'; message?: string }>;
}

@Injectable()
export class HealthService {
  private indicators: HealthCheckIndicator[] = [];
  private readonly startTime = Date.now();

  constructor(
    private readonly serviceName: string,
    private readonly serviceVersion: string,
  ) {}

  registerIndicator(indicator: HealthCheckIndicator) {
    this.indicators.push(indicator);
  }

  async getHealth(): Promise<ServiceHealthStatus> {
    const checks: Record<string, { status: 'up' | 'down'; message?: string }> = {};
    let isHealthy = true;

    for (const indicator of this.indicators) {
      try {
        const result = await indicator.check();
        checks[indicator.name] = result;
        if (result.status === 'down') {
          isHealthy = false;
        }
      } catch (err: any) {
        isHealthy = false;
        checks[indicator.name] = {
          status: 'down',
          message: err?.message || 'Check failed with an unhandled exception',
        };
      }
    }

    return {
      service: this.serviceName,
      version: this.serviceVersion,
      status: isHealthy ? 'healthy' : 'degraded',
      timestamp: new Date().toISOString(),
      uptimeSeconds: Math.floor((Date.now() - this.startTime) / 1000),
      environment: process.env.NODE_ENV || 'development',
      checks,
    };
  }
}

@ApiTags('Health')
@Controller('health')
export class HealthController {
  constructor(private readonly healthService: HealthService) {}

  @Get()
  @ApiOperation({ summary: 'Liveness and readiness check for this microservice' })
  @SwaggerResponse({
    status: 200,
    description: 'Service is operational',
  })
  async checkHealth(): Promise<ServiceHealthStatus> {
    return this.healthService.getHealth();
  }
}
