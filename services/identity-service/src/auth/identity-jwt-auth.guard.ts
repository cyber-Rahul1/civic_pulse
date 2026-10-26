import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
  Optional,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY, TokenRevocationChecker } from '@civic-pulse/nest-common';
import { TokenService } from './token.service.js';

@Injectable()
export class IdentityJwtAuthGuard implements CanActivate {
  private readonly revocationChecker: TokenRevocationChecker;

  constructor(
    private readonly reflector: Reflector,
    private readonly tokenService: TokenService,
    @Optional() revocationChecker?: TokenRevocationChecker,
  ) {
    this.revocationChecker = revocationChecker || new TokenRevocationChecker();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers['authorization'] as string | undefined;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('Missing or invalid Authorization header');
    }

    const token = authHeader.substring(7).trim();
    if (!token) {
      throw new UnauthorizedException('Bearer token is empty');
    }

    try {
      const decoded = this.tokenService.verifyAccessToken(token);

      // Check session or user revocation
      const revocation = await this.revocationChecker.checkTokenRevocation(decoded);
      if (revocation.isRevoked) {
        throw new UnauthorizedException(revocation.reason || 'Token has been revoked');
      }

      request.user = decoded;
      return true;
    } catch (err: any) {
      if (err instanceof UnauthorizedException) {
        throw err;
      }
      if (err.name === 'TokenExpiredError') {
        throw new UnauthorizedException('Access token has expired');
      }
      if (err.name === 'JsonWebTokenError') {
        throw new UnauthorizedException(`Invalid access token: ${err.message}`);
      }
      throw new UnauthorizedException('Token verification failed');
    }
  }
}
