import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import {
  CivicLogger,
  HealthModule,
} from '@civic-pulse/nest-common';
import { ServiceName } from '@civic-pulse/contracts';
import { DatabaseService } from './database/database.service.js';
import { KeyProviderService } from './auth/key-provider.service.js';
import { AuthorityService } from './authority/authority.service.js';
import { AuthorityController } from './authority/authority.controller.js';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env', '../../.env'],
    }),
    HealthModule.register(ServiceName.AUTHORITY, '1.0.0'),
  ],
  controllers: [AuthorityController],
  providers: [
    CivicLogger,
    DatabaseService,
    KeyProviderService,
    AuthorityService,
  ],
})
export class AppModule {}
