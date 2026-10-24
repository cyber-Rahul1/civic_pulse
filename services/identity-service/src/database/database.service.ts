import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MongoClient, Db, Collection } from 'mongodb';
import { CivicLogger } from '@civic-pulse/nest-common';
import {
  UserDocument,
  SessionDocument,
  RefreshTokenDocument,
} from '../models/identity.models.js';

@Injectable()
export class DatabaseService implements OnModuleInit, OnModuleDestroy {
  private client: MongoClient | null = null;
  private db: Db | null = null;

  constructor(
    private readonly configService: ConfigService,
    private readonly logger: CivicLogger,
  ) {
    this.logger.setContext('Identity:DatabaseService');
  }

  async onModuleInit() {
    const uri = this.configService.get<string>('IDENTITY_DB_URI');
    if (!uri) {
      throw new Error('IDENTITY_DB_URI is not defined in configuration');
    }

    this.logger.log('Connecting to Identity logical MongoDB...');
    this.client = new MongoClient(uri, {
      serverSelectionTimeoutMS: 5000,
      connectTimeoutMS: 5000,
    });

    await this.client.connect();
    this.db = this.client.db();
    this.logger.log(`Connected successfully to database: ${this.db.databaseName}`);

    await this.createIndexes();
  }

  async onModuleDestroy() {
    if (this.client) {
      this.logger.log('Closing MongoDB client connection...');
      await this.client.close();
      this.logger.log('MongoDB client disconnected.');
    }
  }

  getDb(): Db {
    if (!this.db) {
      throw new Error('Database is not initialized yet');
    }
    return this.db;
  }

  get users(): Collection<UserDocument> {
    return this.getDb().collection<UserDocument>('users');
  }

  get sessions(): Collection<SessionDocument> {
    return this.getDb().collection<SessionDocument>('sessions');
  }

  get refreshTokens(): Collection<RefreshTokenDocument> {
    return this.getDb().collection<RefreshTokenDocument>('refresh_tokens');
  }

  async ping(): Promise<boolean> {
    try {
      if (!this.db) return false;
      await this.db.command({ ping: 1 });
      return true;
    } catch {
      return false;
    }
  }

  private async createIndexes() {
    try {
      // 1. Users Indexes: unique normalized email, role
      await this.users.createIndex({ email: 1 }, { unique: true });
      await this.users.createIndex({ role: 1 });

      // 2. Sessions Indexes: userId, expiresAt TTL
      await this.sessions.createIndex({ userId: 1, isRevoked: 1 });
      await this.sessions.createIndex({ expiresAt: 1 }, { expireAfterSeconds: 0 });

      // 3. Refresh Tokens Indexes: tokenHash (unique), sessionId, familyId, expiresAt TTL
      await this.refreshTokens.createIndex({ tokenHash: 1 }, { unique: true });
      await this.refreshTokens.createIndex({ sessionId: 1, isRevoked: 1 });
      await this.refreshTokens.createIndex({ familyId: 1 });
      await this.refreshTokens.createIndex({ expiresAt: 1 }, { expireAfterSeconds: 0 });

      this.logger.log('Identity database indexes verified successfully.');
    } catch (err: any) {
      this.logger.error(`Error creating database indexes: ${err?.message}`, err?.stack);
    }
  }
}
