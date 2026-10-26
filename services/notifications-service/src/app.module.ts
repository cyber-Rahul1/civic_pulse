import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import {
  CivicLogger,
  HealthModule,
} from '@civic-pulse/nest-common';
import { ServiceName } from '@civic-pulse/contracts';
import { DatabaseService } from './database/database.service.js';
import { KeyProviderService } from './auth/key-provider.service.js';
import { FirebasePushAdapter } from './push/push-adapter.service.js';
import { NotificationsService } from './notifications/notifications.service.js';
import { NotificationsController } from './notifications/notifications.controller.js';
import { InternalNotificationGuard } from './auth/internal-notification.guard.js';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env', '../../.env'],
    }),
    HealthModule.register(ServiceName.NOTIFICATIONS, '1.0.0'),
  ],
  controllers: [NotificationsController],
  providers: [
    CivicLogger,
    DatabaseService,
    KeyProviderService,
    FirebasePushAdapter,
    NotificationsService,
    InternalNotificationGuard,
  ],
})
export class AppModule {}
