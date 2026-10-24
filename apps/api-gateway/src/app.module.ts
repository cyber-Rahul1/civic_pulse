import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import http from 'http';
import {
  CivicLogger,
  HealthModule,
  HealthService,
} from '@civic-pulse/nest-common';
import { ServiceName } from '@civic-pulse/contracts';
import { HttpProxyService } from './proxy/http-proxy.service.js';
import { ProxyController } from './proxy/proxy.controller.js';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env', '../../.env'],
    }),
    HealthModule.register(ServiceName.API_GATEWAY, '1.0.0'),
  ],
  controllers: [ProxyController],
  providers: [CivicLogger, HttpProxyService],
})
export class AppModule {
  constructor(
    private readonly healthService: HealthService,
    private readonly configService: ConfigService,
  ) {
    const identityUrl =
      this.configService.get<string>('IDENTITY_SERVICE_URL') || 'http://127.0.0.1:3001';
    const reportsUrl =
      this.configService.get<string>('REPORTS_SERVICE_URL') || 'http://127.0.0.1:3002';

    // Register dependency readiness indicator to check Identity Service health
    this.healthService.registerIndicator({
      name: 'identity-service',
      check: async () => {
        return new Promise<{ status: 'up' | 'down'; message?: string }>((resolve) => {
          const target = new URL('/api/v1/health', identityUrl);
          const req = http.get(target.href, { timeout: 3000 }, (res) => {
            if (res.statusCode && res.statusCode < 400) {
              resolve({ status: 'up', message: 'Identity Service is responsive' });
            } else {
              resolve({
                status: 'down',
                message: `Identity Service returned status ${res.statusCode}`,
              });
            }
          });
          req.on('error', (err) => {
            resolve({
              status: 'down',
              message: `Identity Service unreachable: ${err.message}`,
            });
          });
          req.on('timeout', () => {
            req.destroy();
            resolve({ status: 'down', message: 'Identity Service health check timed out' });
          });
        });
      },
    });

    // Register dependency readiness indicator to check Reports Service health
    this.healthService.registerIndicator({
      name: 'reports-service',
      check: async () => {
        return new Promise<{ status: 'up' | 'down'; message?: string }>((resolve) => {
          const target = new URL('/api/v1/health', reportsUrl);
          const req = http.get(target.href, { timeout: 3000 }, (res) => {
            if (res.statusCode && res.statusCode < 400) {
              resolve({ status: 'up', message: 'Reports Service is responsive' });
            } else {
              resolve({
                status: 'down',
                message: `Reports Service returned status ${res.statusCode}`,
              });
            }
          });
          req.on('error', (err) => {
            resolve({
              status: 'down',
              message: `Reports Service unreachable: ${err.message}`,
            });
          });
          req.on('timeout', () => {
            req.destroy();
            resolve({ status: 'down', message: 'Reports Service health check timed out' });
          });
        });
      },
    });
  }
}
