import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import {
  CivicLogger,
  HealthModule,
} from '@civic-pulse/nest-common';
import { ServiceName } from '@civic-pulse/contracts';
import { DatabaseService } from './database/database.service.js';
import { KeyProviderService } from './auth/key-provider.service.js';
import { CommunityService } from './community/community.service.js';
import { CommunityController } from './community/community.controller.js';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env', '../../.env'],
    }),
    HealthModule.register(ServiceName.COMMUNITY, '1.0.0'),
  ],
  controllers: [CommunityController],
  providers: [
    CivicLogger,
    DatabaseService,
    KeyProviderService,
    CommunityService,
  ],
})
export class AppModule {}
