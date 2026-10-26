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
    const communityUrl =
      this.configService.get<string>('COMMUNITY_SERVICE_URL') || 'http://127.0.0.1:3003';
    const authorityUrl =
      this.configService.get<string>('AUTHORITY_SERVICE_URL') || 'http://127.0.0.1:3004';
    const notificationsUrl =
      this.configService.get<string>('NOTIFICATIONS_SERVICE_URL') || 'http://127.0.0.1:3005';

    const createHttpCheck = (name: string, baseUrl: string) => async () => {
      return new Promise<{ status: 'up' | 'down'; message?: string }>((resolve) => {
        const target = new URL('/api/v1/health', baseUrl);
        const req = http.get(target.href, { timeout: 3000 }, (res) => {
          if (res.statusCode && res.statusCode < 400) {
            resolve({ status: 'up', message: `${name} is responsive` });
          } else {
            resolve({
              status: 'down',
              message: `${name} returned status ${res.statusCode}`,
            });
          }
        });
        req.on('error', (err) => {
          resolve({
            status: 'down',
            message: `${name} unreachable: ${err.message}`,
          });
        });
        req.on('timeout', () => {
          req.destroy();
          resolve({ status: 'down', message: `${name} health check timed out` });
        });
      });
    };

    this.healthService.registerIndicator({
      name: 'identity-service',
      check: createHttpCheck('Identity Service', identityUrl),
    });

    this.healthService.registerIndicator({
      name: 'reports-service',
      check: createHttpCheck('Reports Service', reportsUrl),
    });

    this.healthService.registerIndicator({
      name: 'community-service',
      check: createHttpCheck('Community Service', communityUrl),
    });

    this.healthService.registerIndicator({
      name: 'authority-service',
      check: createHttpCheck('Authority Service', authorityUrl),
    });

    this.healthService.registerIndicator({
      name: 'notifications-service',
      check: createHttpCheck('Notifications Service', notificationsUrl),
    });
  }
}
