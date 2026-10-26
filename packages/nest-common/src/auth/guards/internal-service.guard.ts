import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
  Optional,
} from '@nestjs/common';

@Injectable()
export class InternalServiceGuard implements CanActivate {
  private readonly configuredKey?: string;

  constructor(@Optional() internalServiceKey?: string) {
    this.configuredKey = internalServiceKey;
  }

  canActivate(context: ExecutionContext): boolean {
    const expectedKey = this.configuredKey || process.env.INTERNAL_SERVICE_KEY || '';
    const request = context.switchToHttp().getRequest();
    const token =
      (request.headers['x-internal-service-token'] as string | undefined) ||
      (request.headers['x-internal-service-key'] as string | undefined);

    if (!expectedKey) {
      throw new UnauthorizedException('Internal service key is not configured');
    }

    if (!token || token !== expectedKey) {
      throw new UnauthorizedException('Invalid or missing internal service credentials');
    }

    return true;
  }
}
