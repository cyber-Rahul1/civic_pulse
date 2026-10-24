import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Optional,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import jwt from 'jsonwebtoken';
import { JwtTokenPayload } from '@civic-pulse/contracts';
import { IS_PUBLIC_KEY } from '../decorators/roles.decorator.js';

export interface JwtGuardOptions {
  publicKey?: string;
  issuer?: string;
  audience?: string;
}

@Injectable()
export class JwtAuthGuard implements CanActivate {
  private readonly publicKey: string;
  private readonly issuer: string;
  private readonly audience: string;

  constructor(
    private readonly reflector: Reflector,
    @Optional() options?: JwtGuardOptions,
  ) {
    this.publicKey =
      options?.publicKey ||
      process.env.JWT_PUBLIC_KEY_PEM ||
      process.env.JWT_PUBLIC_KEY ||
      '';
    this.issuer = options?.issuer || process.env.JWT_ISSUER || 'civic-pulse:identity';
    this.audience = options?.audience || process.env.JWT_AUDIENCE || 'civic-pulse:api';
  }

  canActivate(context: ExecutionContext): boolean {
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

    if (!this.publicKey) {
      // In Identity Service context, check if TokenService is available on request context
      const tokenService = (request as any).tokenService;
      if (tokenService && typeof tokenService.getPublicKey === 'function') {
        (this as any).cachedDynamicKey = tokenService.getPublicKey();
      }
    }

    const verificationKey =
      this.publicKey ||
      (this as any).cachedDynamicKey ||
      process.env.JWT_PUBLIC_KEY_PEM ||
      process.env.JWT_PUBLIC_KEY;

    if (!verificationKey) {
      throw new UnauthorizedException('JWT public verification key is not configured');
    }

    try {
      const decoded = jwt.verify(token, verificationKey, {
        algorithms: ['RS256'],
        issuer: this.issuer,
        audience: this.audience,
      }) as JwtTokenPayload;

      request.user = decoded;
      return true;
    } catch (err: any) {
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
