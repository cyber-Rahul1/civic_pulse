import 'reflect-metadata';
import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { ConflictException, UnauthorizedException, ForbiddenException } from '@nestjs/common';
import { UserRole, AccountStatus } from '@civic-pulse/contracts';
import { CivicLogger } from '@civic-pulse/nest-common';
import { AuthService } from './auth.service';
import { TokenService } from './token.service';
import { RevocationRegistryService } from './revocation-registry.service';
import { DatabaseService } from '../database/database.service';

describe('AuthService Integration & Logic Tests', () => {
  let authService: AuthService;
  let tokenService: TokenService;
  let mockRevocation: any;

  // In-memory mock stores to test business logic and concurrency
  const usersStore = new Map<string, any>();
  const sessionsStore = new Map<string, any>();
  const refreshTokensStore = new Map<string, any>();

  const mockDbService = {
    users: {
      findOne: jest.fn(async (query: any) => {
        if (query.email) {
          for (const u of usersStore.values()) {
            if (u.email === query.email) return u;
          }
        }
        if (query._id) return usersStore.get(query._id) || null;
        return null;
      }),
      insertOne: jest.fn(async (doc: any) => {
        usersStore.set(doc._id, doc);
        return { insertedId: doc._id };
      }),
      updateOne: jest.fn(async (query: any, update: any) => {
        const u = usersStore.get(query._id);
        if (u && update.$set) {
          Object.assign(u, update.$set);
        }
        return { modifiedCount: 1 };
      }),
    },
    sessions: {
      findOne: jest.fn(async (query: any) => sessionsStore.get(query._id) || null),
      insertOne: jest.fn(async (doc: any) => {
        sessionsStore.set(doc._id, doc);
        return { insertedId: doc._id };
      }),
      updateOne: jest.fn(async (query: any, update: any) => {
        const s = sessionsStore.get(query._id);
        if (s && update.$set) {
          Object.assign(s, update.$set);
        }
        return { modifiedCount: 1 };
      }),
      updateMany: jest.fn(async (query: any, update: any) => {
        let count = 0;
        for (const s of sessionsStore.values()) {
          if (s.userId === query.userId && (query.isRevoked === undefined || s.isRevoked === query.isRevoked)) {
            if (update.$set) Object.assign(s, update.$set);
            count++;
          }
        }
        return { modifiedCount: count };
      }),
    },
    refreshTokens: {
      findOne: jest.fn(async (query: any) => {
        if (query.tokenHash) {
          for (const r of refreshTokensStore.values()) {
            if (r.tokenHash === query.tokenHash) return r;
          }
        }
        return null;
      }),
      insertOne: jest.fn(async (doc: any) => {
        refreshTokensStore.set(doc._id, doc);
        return { insertedId: doc._id };
      }),
      updateOne: jest.fn(async (query: any, update: any) => {
        let target = null;
        if (query._id) target = refreshTokensStore.get(query._id);
        if (query.tokenHash) {
          for (const r of refreshTokensStore.values()) {
            if (r.tokenHash === query.tokenHash) target = r;
          }
        }
        if (!target) return { modifiedCount: 0 };
        if (query.isUsed !== undefined && target.isUsed !== query.isUsed) {
          return { modifiedCount: 0 }; // Concurrency check failed
        }
        if (update.$set) {
          Object.assign(target, update.$set);
        }
        return { modifiedCount: 1 };
      }),
      updateMany: jest.fn(async (query: any, update: any) => {
        let count = 0;
        for (const r of refreshTokensStore.values()) {
          const matchFamily = query.familyId ? r.familyId === query.familyId : true;
          const matchSession = query.sessionId ? r.sessionId === query.sessionId : true;
          const matchUser = query.userId ? r.userId === query.userId : true;
          if (matchFamily && matchSession && matchUser) {
            if (update.$set) Object.assign(r, update.$set);
            count++;
          }
        }
        return { modifiedCount: count };
      }),
    },
  };

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        TokenService,
        CivicLogger,
        {
          provide: DatabaseService,
          useValue: mockDbService,
        },
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn((key: string) => {
              if (key === 'JWT_ACCESS_EXPIRATION_SECONDS') return 900;
              if (key === 'JWT_REFRESH_EXPIRATION_SECONDS') return 604800;
              return undefined;
            }),
          },
        },
        {
          provide: RevocationRegistryService,
          useValue: {
            revokeUser: jest.fn().mockResolvedValue(undefined),
            revokeUserVersion: jest.fn().mockResolvedValue(undefined),
            revokeSession: jest.fn().mockResolvedValue(undefined),
          },
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    tokenService = module.get<TokenService>(TokenService);
    mockRevocation = module.get<RevocationRegistryService>(RevocationRegistryService);
    tokenService.onModuleInit();
  });

  beforeEach(() => {
    usersStore.clear();
    sessionsStore.clear();
    refreshTokensStore.clear();
    jest.clearAllMocks();
  });

  describe('Registration & Role Restriction', () => {
    it('should register a new citizen with default RESIDENT role', async () => {
      const profile = await authService.register({
        email: 'Citizen1@CivicPulse.Org',
        password: 'Password123!',
        displayName: 'John Citizen',
      });

      expect(profile.email).toBe('citizen1@civicpulse.org'); // Normalized
      expect(profile.role).toBe(UserRole.RESIDENT);
      expect(profile.status).toBe(AccountStatus.ACTIVE);
      expect((profile as any).passwordHash).toBeUndefined(); // Never returns passwordHash
    });

    it('should disallow duplicate email registration with 409 Conflict', async () => {
      await authService.register({
        email: 'duplicate@example.com',
        password: 'Password123!',
        displayName: 'Original',
      });

      await expect(
        authService.register({
          email: 'duplicate@example.com',
          password: 'Password456!',
          displayName: 'Copy',
        }),
      ).rejects.toThrow(ConflictException);
    });

    it('should ignore attempted privileged role injection during registration', async () => {
      const profile = await authService.register({
        email: 'hacker@example.com',
        password: 'Password123!',
        displayName: 'Hacker',
        role: UserRole.ADMIN, // Attempt injection
      } as any);

      expect(profile.role).toBe(UserRole.RESIDENT);
    });
  });

  describe('Login & Token Issuance', () => {
    beforeEach(async () => {
      await authService.register({
        email: 'user@example.com',
        password: 'ValidPassword123!',
        displayName: 'Valid User',
      });
    });

    it('should log in successfully and return token pair and safe profile', async () => {
      const result = await authService.login({
        email: 'user@example.com',
        password: 'ValidPassword123!',
      });

      expect(result.user.email).toBe('user@example.com');
      expect((result.user as any).passwordHash).toBeUndefined();
      expect(result.tokens.accessToken).toBeDefined();
      expect(result.tokens.refreshToken).toBeDefined();
      expect(result.tokens.tokenType).toBe('Bearer');

      // Verify the issued access token with RS256 public key
      const payload = tokenService.verifyAccessToken(result.tokens.accessToken);
      expect(payload.email).toBe('user@example.com');
      expect(payload.role).toBe(UserRole.RESIDENT);
    });

    it('should fail login on invalid password with generic message', async () => {
      await expect(
        authService.login({
          email: 'user@example.com',
          password: 'WrongPassword!',
        }),
      ).rejects.toThrow(UnauthorizedException);
    });

    it('should fail login on suspended account with 403 Forbidden', async () => {
      const user = await mockDbService.users.findOne({ email: 'user@example.com' });
      user.status = AccountStatus.SUSPENDED;

      await expect(
        authService.login({
          email: 'user@example.com',
          password: 'ValidPassword123!',
        }),
      ).rejects.toThrow(ForbiddenException);
    });
  });

  describe('Refresh Token Rotation & Reuse Detection', () => {
    it('should rotate refresh token and issue a new single-use token', async () => {
      await authService.register({
        email: 'rotate@example.com',
        password: 'ValidPassword123!',
        displayName: 'Rotate User',
      });
      const loginRes = await authService.login({
        email: 'rotate@example.com',
        password: 'ValidPassword123!',
      });

      const firstRefreshToken = loginRes.tokens.refreshToken;

      // Rotate token
      const refreshRes1 = await authService.refresh({ refreshToken: firstRefreshToken });
      expect(refreshRes1.tokens.accessToken).toBeDefined();
      expect(refreshRes1.tokens.refreshToken).not.toBe(firstRefreshToken);

      // Verify first token is marked as used
      const oldTokenDoc = Array.from(refreshTokensStore.values()).find((r) => r.isUsed);
      expect(oldTokenDoc).toBeDefined();

      // REUSE DETECTION: Presenting the old first token again must trigger reuse detection
      await expect(
        authService.refresh({ refreshToken: firstRefreshToken }),
      ).rejects.toThrow('Refresh token reuse detected. Session has been revoked.');

      // The new refresh token should also now be revoked because family was compromised
      await expect(
        authService.refresh({ refreshToken: refreshRes1.tokens.refreshToken }),
      ).rejects.toThrow();
    });
  });

  describe('Logout & Logout-All', () => {
    it('should revoke session on logout', async () => {
      await authService.register({
        email: 'logout@example.com',
        password: 'ValidPassword123!',
        displayName: 'Logout User',
      });
      const loginRes = await authService.login({
        email: 'logout@example.com',
        password: 'ValidPassword123!',
      });

      const payload = tokenService.verifyAccessToken(loginRes.tokens.accessToken);
      await authService.logout(payload.sessionId, loginRes.tokens.refreshToken);

      // Session should be revoked
      const session = sessionsStore.get(payload.sessionId);
      expect(session.isRevoked).toBe(true);

      // Refresh attempt must fail
      await expect(
        authService.refresh({ refreshToken: loginRes.tokens.refreshToken }),
      ).rejects.toThrow(UnauthorizedException);
    });

    it('should revoke all active sessions on logoutAll', async () => {
      await authService.register({
        email: 'multidevice@example.com',
        password: 'ValidPassword123!',
        displayName: 'Multi Device',
      });
      const login1 = await authService.login({ email: 'multidevice@example.com', password: 'ValidPassword123!' });
      await authService.login({ email: 'multidevice@example.com', password: 'ValidPassword123!' });

      expect(sessionsStore.size).toBe(2);

      const logoutResult = await authService.logoutAll(login1.user.id);
      expect(logoutResult.sessionsRevokedCount).toBe(2);

      for (const s of sessionsStore.values()) {
        expect(s.isRevoked).toBe(true);
      }
    });

    it('should revoke active sessions and refresh tokens when user role changes', async () => {
      const reg = await authService.register({
        email: 'rolechange@example.com',
        password: 'ValidPassword123!',
        displayName: 'Role Change Test',
      });
      const loginRes = await authService.login({
        email: 'rolechange@example.com',
        password: 'ValidPassword123!',
      });

      expect(loginRes.user.role).toBe(UserRole.RESIDENT);

      // Elevate role to AUTHORITY
      const updated = await authService.updateUserRole(reg.id, UserRole.AUTHORITY);
      expect(updated.role).toBe(UserRole.AUTHORITY);

      // Previous session must be revoked
      const payload = tokenService.verifyAccessToken(loginRes.tokens.accessToken);
      const session = sessionsStore.get(payload.sessionId);
      expect(session.isRevoked).toBe(true);
      expect(session.revocationReason).toContain('role changed');

      // Refresh using old token must now fail
      await expect(
        authService.refresh({ refreshToken: loginRes.tokens.refreshToken }),
      ).rejects.toThrow(UnauthorizedException);

      // Verify that revocation registry published user revocation timestamp and incremented tokenVersion
      expect(mockRevocation.revokeUser).toHaveBeenCalledWith(
        reg.id,
        expect.any(Number),
        900,
      );
      expect(mockRevocation.revokeUserVersion).toHaveBeenCalledWith(
        reg.id,
        2,
        900,
      );
    });
  });
});
