import 'reflect-metadata';
import { ExecutionContext, UnauthorizedException, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import jwt from 'jsonwebtoken';
import { UserRole } from '@civic-pulse/contracts';
import {
  generateRsaKeyPair,
  hashPassword,
  verifyPassword,
  hashToken,
  generateOpaqueToken,
} from './crypto.utils';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { RolesGuard } from './guards/roles.guard';
import { InternalServiceGuard } from './guards/internal-service.guard';

describe('Auth & Crypto Utilities', () => {
  let keyPair: { privateKey: string; publicKey: string };

  beforeAll(() => {
    keyPair = generateRsaKeyPair();
  });

  describe('Password Hashing', () => {
    it('should hash and verify passwords correctly', async () => {
      const password = 'StrongPassword123!';
      const hash = await hashPassword(password);

      expect(hash).toContain(':');
      expect(await verifyPassword(password, hash)).toBe(true);
      expect(await verifyPassword('WrongPassword', hash)).toBe(false);
    });
  });

  describe('Token Hashing & Opaque Tokens', () => {
    it('should generate opaque tokens and hash them with sha256', () => {
      const token = generateOpaqueToken();
      expect(token).toHaveLength(64);

      const hash1 = hashToken(token);
      const hash2 = hashToken(token);
      expect(hash1).toBe(hash2);
      expect(hash1).toHaveLength(64);
    });
  });

  describe('JwtAuthGuard (RS256)', () => {
    const reflector = new Reflector();
    let guard: JwtAuthGuard;

    beforeEach(() => {
      guard = new JwtAuthGuard(reflector, {
        publicKey: keyPair.publicKey,
        issuer: 'civic-pulse:identity',
        audience: 'civic-pulse:api',
      });
    });

    function createMockContext(authHeader?: string): ExecutionContext {
      const req = {
        headers: authHeader ? { authorization: authHeader } : {},
        user: undefined,
      };
      return {
        getHandler: () => ({}),
        getClass: () => ({}),
        switchToHttp: () => ({
          getRequest: () => req,
        }),
      } as unknown as ExecutionContext;
    }

    it('should authenticate valid RS256 token', () => {
      const token = jwt.sign(
        {
          sub: 'user-123',
          email: 'citizen@example.com',
          role: UserRole.RESIDENT,
          sessionId: 'session-456',
        },
        keyPair.privateKey,
        {
          algorithm: 'RS256',
          issuer: 'civic-pulse:identity',
          audience: 'civic-pulse:api',
          expiresIn: '15m',
        },
      );

      const context = createMockContext(`Bearer ${token}`);
      expect(guard.canActivate(context)).toBe(true);
      const req = context.switchToHttp().getRequest();
      expect(req.user.sub).toBe('user-123');
      expect(req.user.role).toBe(UserRole.RESIDENT);
    });

    it('should reject missing Authorization header', () => {
      const context = createMockContext();
      expect(() => guard.canActivate(context)).toThrow(UnauthorizedException);
    });

    it('should reject expired token', () => {
      const expiredToken = jwt.sign(
        { sub: 'user-123', role: UserRole.RESIDENT },
        keyPair.privateKey,
        {
          algorithm: 'RS256',
          issuer: 'civic-pulse:identity',
          audience: 'civic-pulse:api',
          expiresIn: '-1s',
        },
      );

      const context = createMockContext(`Bearer ${expiredToken}`);
      expect(() => guard.canActivate(context)).toThrow('Access token has expired');
    });

    it('should reject incorrectly signed token', () => {
      const otherKeys = generateRsaKeyPair();
      const forgedToken = jwt.sign(
        { sub: 'attacker', role: UserRole.ADMIN },
        otherKeys.privateKey,
        {
          algorithm: 'RS256',
          issuer: 'civic-pulse:identity',
          audience: 'civic-pulse:api',
        },
      );

      const context = createMockContext(`Bearer ${forgedToken}`);
      expect(() => guard.canActivate(context)).toThrow('invalid signature');
    });

    it('should reject incorrect issuer or audience', () => {
      const invalidIssuerToken = jwt.sign(
        { sub: 'user-123', role: UserRole.RESIDENT },
        keyPair.privateKey,
        {
          algorithm: 'RS256',
          issuer: 'wrong-issuer',
          audience: 'civic-pulse:api',
        },
      );

      const context = createMockContext(`Bearer ${invalidIssuerToken}`);
      expect(() => guard.canActivate(context)).toThrow(UnauthorizedException);
    });
  });

  describe('RolesGuard', () => {
    const reflector = new Reflector();
    const guard = new RolesGuard(reflector);

    function createMockRoleContext(user?: any, requiredRoles?: UserRole[]): ExecutionContext {
      jest.spyOn(reflector, 'getAllAndOverride').mockReturnValue(requiredRoles);
      const req = { user };
      return {
        getHandler: () => ({}),
        getClass: () => ({}),
        switchToHttp: () => ({
          getRequest: () => req,
        }),
      } as unknown as ExecutionContext;
    }

    it('should permit access when user possesses the required role', () => {
      const ctx = createMockRoleContext(
        { sub: 'admin-1', role: UserRole.ADMIN },
        [UserRole.ADMIN],
      );
      expect(guard.canActivate(ctx)).toBe(true);
    });

    it('should reject with 403 Forbidden when user does not have required role', () => {
      const ctx = createMockRoleContext(
        { sub: 'resident-1', role: UserRole.RESIDENT },
        [UserRole.ADMIN, UserRole.AUTHORITY],
      );
      expect(() => guard.canActivate(ctx)).toThrow(ForbiddenException);
    });
  });

  describe('InternalServiceGuard', () => {
    const guard = new InternalServiceGuard('secret-internal-key-999');

    it('should permit requests matching internal token', () => {
      const ctx = {
        switchToHttp: () => ({
          getRequest: () => ({
            headers: { 'x-internal-service-token': 'secret-internal-key-999' },
          }),
        }),
      } as unknown as ExecutionContext;

      expect(guard.canActivate(ctx)).toBe(true);
    });

    it('should reject missing or mismatched internal token with 401', () => {
      const ctx = {
        switchToHttp: () => ({
          getRequest: () => ({
            headers: { 'x-internal-service-token': 'wrong-key' },
          }),
        }),
      } as unknown as ExecutionContext;

      expect(() => guard.canActivate(ctx)).toThrow(UnauthorizedException);
    });
  });
});
