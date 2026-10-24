import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MongoClient, Db, Collection } from 'mongodb';
import { CivicLogger } from '@civic-pulse/nest-common';
import { ReportDocument, MediaUploadRecord } from '../models/report.models.js';

@Injectable()
export class DatabaseService implements OnModuleInit, OnModuleDestroy {
  private client: MongoClient | null = null;
  private db: Db | null = null;

  constructor(
    private readonly configService: ConfigService,
    private readonly logger: CivicLogger,
  ) {
    this.logger.setContext('Reports:DatabaseService');
  }

  async onModuleInit() {
    const uri = this.configService.get<string>('REPORTS_DB_URI');
    if (!uri) {
      throw new Error('REPORTS_DB_URI is not defined in configuration');
    }

    this.logger.log('Connecting to Reports logical MongoDB...');
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

  get reports(): Collection<ReportDocument> {
    return this.getDb().collection<ReportDocument>('reports');
  }

  get mediaUploads(): Collection<MediaUploadRecord> {
    return this.getDb().collection<MediaUploadRecord>('media_uploads');
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
      // 1. 2dsphere index for spherical geospatial distance calculations
      await this.reports.createIndex({ location: '2dsphere' });

      // 2. Query filter indexes: status, category, authorId, createdAt
      await this.reports.createIndex({ status: 1, createdAt: -1 });
      await this.reports.createIndex({ category: 1, createdAt: -1 });
      await this.reports.createIndex({ authorId: 1, createdAt: -1 });
      await this.reports.createIndex({ createdAt: -1 });

      // 3. Media uploads indexes
      await this.mediaUploads.createIndex({ userId: 1, reportId: 1 });

      this.logger.log('Reports database indexes (including 2dsphere) verified successfully.');
    } catch (err: any) {
      this.logger.error(`Error creating database indexes: ${err?.message}`, err?.stack);
    }
  }
}
