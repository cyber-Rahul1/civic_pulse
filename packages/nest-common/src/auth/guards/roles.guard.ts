import {
  CanActivate,
  ExecutionContext,
  Injectable,
  ForbiddenException,
  UnauthorizedException,
  Optional,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserRole, JwtTokenPayload } from '@civic-pulse/contracts';
import { ROLES_KEY } from '../decorators/roles.decorator.js';
import { TokenRevocationChecker } from '../token-revocation.checker.js';

@Injectable()
export class RolesGuard implements CanActivate {
  private revocationChecker: TokenRevocationChecker;

  constructor(
    private readonly reflector: Reflector,
    @Optional() revocationChecker?: TokenRevocationChecker,
  ) {
    this.revocationChecker = revocationChecker || new TokenRevocationChecker();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<UserRole[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles || requiredRoles.length === 0) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user as JwtTokenPayload | undefined;

    if (!user || !user.role) {
      throw new ForbiddenException('User context is missing; authentication required');
    }

    const hasRole = requiredRoles.includes(user.role);
    if (!hasRole) {
      throw new ForbiddenException(
        `Access forbidden: required role [${requiredRoles.join(', ')}], current role is [${user.role}]`,
      );
    }

    // Privileged role operations (AUTHORITY, ADMIN, MODERATOR) enforce revocation checking
    const revocationResult = await this.revocationChecker.checkTokenRevocation(user, requiredRoles);
    if (revocationResult.isRevoked) {
      throw new UnauthorizedException(
        `Access denied: ${revocationResult.reason || 'Token has been revoked'}`,
      );
    }

    return true;
  }
}
