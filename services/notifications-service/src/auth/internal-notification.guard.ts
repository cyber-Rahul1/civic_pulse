import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  ForbiddenException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class InternalNotificationGuard implements CanActivate {
  private readonly allowedTokens: string[];

  constructor(private readonly configService: ConfigService) {
    const internalKey =
      this.configService.get<string>('NOTIFICATIONS_INTERNAL_KEY') ||
      'civic_pulse_notifications_internal_secret_dev';
    const genericInternalKey =
      this.configService.get<string>('INTERNAL_SERVICE_KEY') ||
      'civic_pulse_internal_service_secret_dev';

    this.allowedTokens = [internalKey, genericInternalKey];
  }

  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest();
    const token =
      req.headers['x-internal-service-token'] ||
      req.headers['x-internal-service-key'];

    if (!token) {
      throw new UnauthorizedException('Missing internal service authentication');
    }

    if (!this.allowedTokens.includes(token)) {
      throw new ForbiddenException('Invalid internal service token');
    }

    return true;
  }
}
