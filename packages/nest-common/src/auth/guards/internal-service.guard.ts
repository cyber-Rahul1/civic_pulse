import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

@Injectable()
export class InternalServiceGuard implements CanActivate {
  private readonly expectedKey: string;

  constructor(internalServiceKey?: string) {
    this.expectedKey = internalServiceKey || process.env.INTERNAL_SERVICE_KEY || '';
  }

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const token = request.headers['x-internal-service-token'] as string | undefined;

    if (!this.expectedKey) {
      throw new UnauthorizedException('Internal service key is not configured');
    }

    if (!token || token !== this.expectedKey) {
      throw new UnauthorizedException('Invalid or missing internal service credentials');
    }

    return true;
  }
}
