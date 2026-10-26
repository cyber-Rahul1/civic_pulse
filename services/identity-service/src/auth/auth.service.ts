import {
  Injectable,
  ConflictException,
  UnauthorizedException,
  ForbiddenException,
  NotFoundException,
  Optional,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { v4 as uuidv4 } from 'uuid';
import {
  hashPassword,
  verifyPassword,
  hashToken,
  generateOpaqueToken,
  CivicLogger,
} from '@civic-pulse/nest-common';
import {
  UserRole,
  AccountStatus,
  UserProfileDto,
  AuthResponseData,
  AuthTokens,
} from '@civic-pulse/contracts';
import { DatabaseService } from '../database/database.service.js';
import { TokenService } from './token.service.js';
import { RevocationRegistryService } from './revocation-registry.service.js';
import { RegisterDto, LoginDto, RefreshTokenDto } from '../dto/auth.dto.js';
import {
  UserDocument,
  SessionDocument,
  RefreshTokenDocument,
} from '../models/identity.models.js';

@Injectable()
export class AuthService {
  private readonly refreshExpirationSeconds: number;
  private readonly accessExpirationSeconds: number;

  constructor(
    private readonly db: DatabaseService,
    private readonly tokenService: TokenService,
    private readonly configService: ConfigService,
    private readonly logger: CivicLogger,
    @Optional() private readonly revocationRegistry?: RevocationRegistryService,
  ) {
    this.logger.setContext('Identity:AuthService');
    this.accessExpirationSeconds = Number(
      this.configService.get<number>('JWT_ACCESS_EXPIRATION_SECONDS') || 900,
    );
    this.refreshExpirationSeconds = Number(
      this.configService.get<number>('JWT_REFRESH_EXPIRATION_SECONDS') || 604800,
    );
  }

  async register(dto: RegisterDto): Promise<UserProfileDto> {
    const normalizedEmail = dto.email.trim().toLowerCase();

    const existingUser = await this.db.users.findOne({ email: normalizedEmail });
    if (existingUser) {
      throw new ConflictException('An account with this email address already exists');
    }

    const passwordHash = await hashPassword(dto.password);
    const now = new Date();

    const newUser: UserDocument = {
      _id: uuidv4(),
      email: normalizedEmail,
      passwordHash,
      displayName: dto.displayName.trim(),
      role: UserRole.RESIDENT, // Strictly default to RESIDENT; never privileged
      status: AccountStatus.ACTIVE,
      emailVerified: false,
      createdAt: now,
      updatedAt: now,
    };

    await this.db.users.insertOne(newUser);
    this.logger.log(`New user registered successfully: ${newUser._id}`);

    return this.mapToProfile(newUser);
  }

  async login(dto: LoginDto, meta?: { userAgent?: string; ipAddress?: string }): Promise<AuthResponseData> {
    const normalizedEmail = dto.email.trim().toLowerCase();
    const user = await this.db.users.findOne({ email: normalizedEmail });

    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    if (user.status === AccountStatus.SUSPENDED) {
      throw new ForbiddenException('Account has been suspended. Please contact civic support.');
    }

    const passwordValid = await verifyPassword(dto.password, user.passwordHash);
    if (!passwordValid) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const now = new Date();
    await this.db.users.updateOne(
      { _id: user._id },
      { $set: { lastLoginAt: now, updatedAt: now } },
    );

    // Create session and issue initial tokens
    const sessionId = uuidv4();
    const sessionExpiresAt = new Date(now.getTime() + this.refreshExpirationSeconds * 1000);

    const session: SessionDocument = {
      _id: sessionId,
      userId: user._id,
      createdAt: now,
      updatedAt: now,
      expiresAt: sessionExpiresAt,
      isRevoked: false,
      userAgent: meta?.userAgent,
      ipAddress: meta?.ipAddress,
    };
    await this.db.sessions.insertOne(session);

    const tokens = await this.issueTokenPair(user, sessionId);
    this.logger.log(`User logged in: ${user._id}, session created: ${sessionId}`);

    return {
      user: this.mapToProfile({ ...user, lastLoginAt: now }),
      tokens,
    };
  }

  async refresh(dto: RefreshTokenDto): Promise<AuthResponseData> {
    const incomingTokenHash = hashToken(dto.refreshToken.trim());

    // 1. Find the refresh token record by tokenHash
    const tokenRecord = await this.db.refreshTokens.findOne({ tokenHash: incomingTokenHash });

    if (!tokenRecord) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    // 2. Reuse Detection: If the token was already used, trigger token family revocation
    if (tokenRecord.isUsed) {
      this.logger.warn(
        `🚨 REUSE DETECTED for familyId ${tokenRecord.familyId}, session ${tokenRecord.sessionId}. Revoking family.`,
      );
      // Revoke the entire session and all associated tokens in the family
      await this.db.sessions.updateOne(
        { _id: tokenRecord.sessionId },
        { $set: { isRevoked: true, revocationReason: 'Refresh token reuse detected' } },
      );
      await this.db.refreshTokens.updateMany(
        { familyId: tokenRecord.familyId },
        { $set: { isRevoked: true } },
      );
      throw new UnauthorizedException('Refresh token reuse detected. Session has been revoked.');
    }

    // 3. Check expiration and revocation
    const now = new Date();
    if (tokenRecord.isRevoked || tokenRecord.expiresAt < now) {
      throw new UnauthorizedException('Refresh token has expired or is revoked');
    }

    // 4. Verify parent session
    const session = await this.db.sessions.findOne({ _id: tokenRecord.sessionId });
    if (!session || session.isRevoked || session.expiresAt < now) {
      throw new UnauthorizedException('Session is expired or has been revoked');
    }

    // 5. Verify user
    const user = await this.db.users.findOne({ _id: tokenRecord.userId });
    if (!user || user.status === AccountStatus.SUSPENDED) {
      throw new ForbiddenException('User account is invalid or suspended');
    }

    // 6. Safe Single-Use Invalidation: Mark current token as used atomically
    const updateResult = await this.db.refreshTokens.updateOne(
      { _id: tokenRecord._id, isUsed: false },
      { $set: { isUsed: true, usedAt: now } },
    );

    if (updateResult.modifiedCount === 0) {
      // Race condition / concurrent refresh attempt detected
      this.logger.warn(`Concurrent refresh collision on token ${tokenRecord._id}`);
      throw new UnauthorizedException('Concurrent refresh attempt detected. Please retry.');
    }

    // 7. Rotate: Generate new refresh token and preserve familyId
    const newOpaqueRefresh = generateOpaqueToken();
    const newRefreshHash = hashToken(newOpaqueRefresh);
    const newRefreshDoc: RefreshTokenDocument = {
      _id: uuidv4(),
      sessionId: session._id,
      userId: user._id,
      tokenHash: newRefreshHash,
      familyId: tokenRecord.familyId,
      isUsed: false,
      isRevoked: false,
      createdAt: now,
      expiresAt: new Date(now.getTime() + this.refreshExpirationSeconds * 1000),
    };
    await this.db.refreshTokens.insertOne(newRefreshDoc);

    const accessToken = this.tokenService.createAccessToken(
      { id: user._id, email: user.email, role: user.role, tokenVersion: user.tokenVersion ?? 1 },
      session._id,
    );

    return {
      user: this.mapToProfile(user),
      tokens: {
        accessToken,
        refreshToken: newOpaqueRefresh,
        tokenType: 'Bearer',
        expiresInSeconds: this.accessExpirationSeconds,
      },
    };
  }

  async logout(sessionId: string, refreshToken?: string): Promise<{ message: string }> {
    const now = new Date();
    // 1. Invalidate in Redis FIRST so access tokens cannot be used
    if (this.revocationRegistry) {
      await this.revocationRegistry.revokeSession(sessionId, this.accessExpirationSeconds);
    }

    // 2. Persist in DB
    await this.db.sessions.updateOne(
      { _id: sessionId },
      { $set: { isRevoked: true, revocationReason: 'User logged out', updatedAt: now } },
    );

    await this.db.refreshTokens.updateMany(
      { sessionId },
      { $set: { isRevoked: true } },
    );

    if (refreshToken) {
      const hashed = hashToken(refreshToken.trim());
      await this.db.refreshTokens.updateOne(
        { tokenHash: hashed },
        { $set: { isRevoked: true } },
      );
    }

    this.logger.log(`Session ${sessionId} logged out and revoked.`);
    return { message: 'Logged out successfully' };
  }

  async logoutAll(userId: string): Promise<{ message: string; sessionsRevokedCount: number }> {
    const now = new Date();
    const epochSeconds = Math.floor(now.getTime() / 1000);

    // 1. Fetch current user to obtain and increment tokenVersion
    const user = await this.db.users.findOne({ _id: userId });
    const currentVersion = user?.tokenVersion ?? 1;
    const newVersion = currentVersion + 1;

    // 2. Invalidate in Redis FIRST (fail-closed if Redis write fails)
    if (this.revocationRegistry) {
      await this.revocationRegistry.revokeUser(userId, epochSeconds, this.accessExpirationSeconds);
      await this.revocationRegistry.revokeUserVersion(userId, newVersion, this.accessExpirationSeconds);
    }

    // 3. Atomically update user tokenVersion and sessions in DB
    await this.db.users.updateOne(
      { _id: userId },
      { $set: { tokenVersion: newVersion, updatedAt: now } },
    );

    const result = await this.db.sessions.updateMany(
      { userId, isRevoked: false },
      { $set: { isRevoked: true, revocationReason: 'User executed logout-all', updatedAt: now } },
    );

    await this.db.refreshTokens.updateMany(
      { userId, isRevoked: false },
      { $set: { isRevoked: true } },
    );

    this.logger.log(`Revoked all sessions for userId: ${userId} (count: ${result.modifiedCount}, version: ${newVersion})`);
    return {
      message: 'All active sessions have been revoked',
      sessionsRevokedCount: result.modifiedCount,
    };
  }

  async getProfile(userId: string): Promise<UserProfileDto> {
    const user = await this.db.users.findOne({ _id: userId });
    if (!user) {
      throw new NotFoundException('User profile not found');
    }
    return this.mapToProfile(user);
  }

  private async issueTokenPair(
    user: { _id: string; email: string; role: UserRole; tokenVersion?: number },
    sessionId: string,
  ): Promise<AuthTokens> {
    const now = new Date();
    const opaqueRefresh = generateOpaqueToken();
    const tokenHash = hashToken(opaqueRefresh);

    const refreshDoc: RefreshTokenDocument = {
      _id: uuidv4(),
      sessionId,
      userId: user._id,
      tokenHash,
      familyId: uuidv4(), // Initial family root
      isUsed: false,
      isRevoked: false,
      createdAt: now,
      expiresAt: new Date(now.getTime() + this.refreshExpirationSeconds * 1000),
    };
    await this.db.refreshTokens.insertOne(refreshDoc);

    const accessToken = this.tokenService.createAccessToken(
      { id: user._id, email: user.email, role: user.role, tokenVersion: user.tokenVersion ?? 1 },
      sessionId,
    );

    return {
      accessToken,
      refreshToken: opaqueRefresh,
      tokenType: 'Bearer',
      expiresInSeconds: this.accessExpirationSeconds,
    };
  }

  async updateUserRole(userId: string, newRole: UserRole): Promise<UserProfileDto> {
    const user = await this.db.users.findOne({ _id: userId });
    if (!user) {
      throw new NotFoundException(`User with ID "${userId}" not found`);
    }

    const previousRole = user.role;
    const now = new Date();
    const epochSeconds = Math.floor(now.getTime() / 1000);

    // If role changed (promoted or revoked/demoted), increment tokenVersion and revoke in Redis FIRST
    if (previousRole !== newRole) {
      const currentVersion = user.tokenVersion ?? 1;
      const newVersion = currentVersion + 1;

      // 1. Write revocation to Redis FIRST
      // If Redis fails, this throws and aborts without mutating DB or granting unrevoked role
      if (this.revocationRegistry) {
        await this.revocationRegistry.revokeUser(userId, epochSeconds, this.accessExpirationSeconds);
        await this.revocationRegistry.revokeUserVersion(userId, newVersion, this.accessExpirationSeconds);
      }

      // 2. Persist role update and incremented tokenVersion in DB
      await this.db.users.updateOne(
        { _id: userId },
        { $set: { role: newRole, tokenVersion: newVersion, updatedAt: now } },
      );
      this.logger.log(`User role updated: ${userId} -> ${newRole} (version: ${newVersion})`);

      // 3. Revoke existing refresh sessions
      await this.db.sessions.updateMany(
        { userId, isRevoked: false },
        {
          $set: {
            isRevoked: true,
            revocationReason: `User role changed from ${previousRole} to ${newRole}`,
            updatedAt: now,
          },
        },
      );
      await this.db.refreshTokens.updateMany(
        { userId, isRevoked: false },
        { $set: { isRevoked: true } },
      );
      this.logger.log(`Revoked existing sessions for user ${userId} due to role change`);
    } else {
      await this.db.users.updateOne(
        { _id: userId },
        { $set: { role: newRole, updatedAt: now } },
      );
    }

    const updated = await this.db.users.findOne({ _id: userId });
    return this.mapToProfile(updated!);
  }

  private mapToProfile(user: UserDocument): UserProfileDto {
    return {
      id: user._id,
      email: user.email,
      displayName: user.displayName,
      role: user.role,
      status: user.status,
      emailVerified: user.emailVerified,
      createdAt: user.createdAt.toISOString(),
      lastLoginAt: user.lastLoginAt?.toISOString(),
    };
  }
}
