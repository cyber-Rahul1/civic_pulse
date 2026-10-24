import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import {
  CivicLogger,
  HealthModule,
  HealthService,
} from '@civic-pulse/nest-common';
import { ServiceName } from '@civic-pulse/contracts';
import { DatabaseService } from './database/database.service.js';
import { TokenService } from './auth/token.service.js';
import { AuthService } from './auth/auth.service.js';
import { AuthController } from './auth/auth.controller.js';
import { IdentityJwtAuthGuard } from './auth/identity-jwt-auth.guard.js';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env', '../../.env'],
    }),
    HealthModule.register(ServiceName.IDENTITY, '1.0.0'),
  ],
  controllers: [AuthController],
  providers: [CivicLogger, DatabaseService, TokenService, AuthService, IdentityJwtAuthGuard],
  exports: [DatabaseService, TokenService, AuthService],
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
            ? 'Connected to logical database civic_identity'
            : 'Disconnected from MongoDB',
        };
      },
    });
  }
}
