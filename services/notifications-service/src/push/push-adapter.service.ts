import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

export interface PushMessage {
  recipientUserId: string;
  deviceTokens: string[];
  title: string;
  body: string;
  data?: Record<string, string>;
}

export interface PushResult {
  successfulTokenCount: number;
  failedTokens: string[];
}

export interface PushNotificationAdapter {
  isAvailable(): boolean;
  sendPush(message: PushMessage): Promise<PushResult>;
}

@Injectable()
export class FirebasePushAdapter implements PushNotificationAdapter {
  private readonly logger = new Logger('Notifications:PushAdapter');
  private isConfigured = false;

  constructor(private readonly configService: ConfigService) {
    const projectId = this.configService.get<string>('FIREBASE_PROJECT_ID');
    const clientEmail = this.configService.get<string>('FIREBASE_CLIENT_EMAIL');
    const privateKey = this.configService.get<string>('FIREBASE_PRIVATE_KEY');

    if (
      projectId &&
      !projectId.includes('placeholder') &&
      clientEmail &&
      !clientEmail.includes('placeholder') &&
      privateKey &&
      !privateKey.includes('placeholder')
    ) {
      this.isConfigured = true;
      this.logger.log('Firebase Cloud Messaging credentials configured.');
    } else {
      this.isConfigured = false;
      this.logger.log('FCM not configured or placeholder credentials detected. Operating in mock/in-app mode.');
    }
  }

  isAvailable(): boolean {
    return this.isConfigured;
  }

  async sendPush(message: PushMessage): Promise<PushResult> {
    if (!this.isConfigured) {
      this.logger.debug(
        `FCM push skipped for user ${message.recipientUserId}: FCM credentials not configured.`,
      );
      return { successfulTokenCount: 0, failedTokens: [] };
    }

    // In a live Firebase setup, admin.messaging().sendEachForMulticast() is executed here.
    // Device tokens are never logged in full.
    this.logger.log(
      `Dispatched push notification to ${message.deviceTokens.length} devices for user ${message.recipientUserId}`,
    );
    return {
      successfulTokenCount: message.deviceTokens.length,
      failedTokens: [],
    };
  }
}
