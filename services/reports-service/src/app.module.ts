import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import {
  CivicLogger,
  HealthModule,
  HealthService,
} from '@civic-pulse/nest-common';
import { ServiceName } from '@civic-pulse/contracts';
import { DatabaseService } from './database/database.service.js';
import { KeyProviderService } from './auth/key-provider.service.js';
import { MediaService } from './media/media.service.js';
import { ReportsService } from './reports/reports.service.js';
import { ReportsController } from './reports/reports.controller.js';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env', '../../.env'],
    }),
    HealthModule.register(ServiceName.REPORTS, '1.0.0'),
  ],
  controllers: [ReportsController],
  providers: [
    CivicLogger,
    DatabaseService,
    KeyProviderService,
    MediaService,
    ReportsService,
  ],
  exports: [DatabaseService, ReportsService, MediaService],
})
export class AppModule {
  constructor(
    private readonly healthService: HealthService,
    private readonly dbService: DatabaseService,
  ) {
    this.healthService.registerIndicator({
      name: 'database',
      check: async () => {
        const isUp = await this.dbService.ping();
        return {
          status: isUp ? 'up' : 'down',
          message: isUp
            ? 'Connected to logical database civic_reports'
            : 'Disconnected from MongoDB',
        };
      },
    });
  }
}
