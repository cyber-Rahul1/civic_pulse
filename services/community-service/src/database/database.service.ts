import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MongoClient, Db, Collection } from 'mongodb';
import { CivicLogger } from '@civic-pulse/nest-common';
import {
  EndorsementDocument,
  FollowDocument,
  CommentDocument,
  AbuseReportDocument,
  ReportCommunityStatsDocument,
} from '../models/community.models.js';

@Injectable()
export class DatabaseService implements OnModuleInit, OnModuleDestroy {
  private client!: MongoClient;
  private db!: Db;

  public endorsements!: Collection<EndorsementDocument>;
  public follows!: Collection<FollowDocument>;
  public comments!: Collection<CommentDocument>;
  public abuseReports!: Collection<AbuseReportDocument>;
  public stats!: Collection<ReportCommunityStatsDocument>;

  constructor(
    private readonly configService: ConfigService,
    private readonly logger: CivicLogger,
  ) {
    this.logger.setContext('Community:DatabaseService');
  }

  async onModuleInit() {
    const uri =
      this.configService.get<string>('COMMUNITY_DB_URI') ||
      'mongodb://civic_community_user:community_dev_secret@localhost:27018/civic_community?authSource=civic_community';

    this.logger.log('Connecting to Community logical MongoDB...');
    this.client = new MongoClient(uri, {
      maxPoolSize: 20,
      minPoolSize: 2,
      serverSelectionTimeoutMS: 5000,
    });

    await this.client.connect();
    this.db = this.client.db();
    this.logger.log(`Connected successfully to database: ${this.db.databaseName}`);

    this.endorsements = this.db.collection<EndorsementDocument>('endorsements');
    this.follows = this.db.collection<FollowDocument>('follows');
    this.comments = this.db.collection<CommentDocument>('comments');
    this.abuseReports = this.db.collection<AbuseReportDocument>('abuse_reports');
    this.stats = this.db.collection<ReportCommunityStatsDocument>('report_stats');

    await this.ensureIndexes();
  }

  async onModuleDestroy() {
    if (this.client) {
      await this.client.close();
      this.logger.log('Community database connection pool closed.');
    }
  }

  getDb(): Db {
    return this.db;
  }

  private async ensureIndexes(): Promise<void> {
    // 1. Compound unique index on (reportId, userId) for idempotent endorsements
    await this.endorsements.createIndex(
      { reportId: 1, userId: 1 },
      { unique: true, name: 'uniq_report_user_endorsement' },
    );
    await this.endorsements.createIndex({ reportId: 1 });
    await this.endorsements.createIndex({ userId: 1 });

    // 2. Compound unique index on (reportId, userId) for idempotent follows
    await this.follows.createIndex(
      { reportId: 1, userId: 1 },
      { unique: true, name: 'uniq_report_user_follow' },
    );
    await this.follows.createIndex({ reportId: 1 });
    await this.follows.createIndex({ userId: 1, createdAt: -1 });

    // 3. Comments indexes: (reportId, createdAt), (parentCommentId, createdAt)
    await this.comments.createIndex(
      { reportId: 1, createdAt: 1 },
      { name: 'idx_comments_report_created' },
    );
    await this.comments.createIndex(
      { parentCommentId: 1, createdAt: 1 },
      { name: 'idx_comments_parent_created' },
    );
    await this.comments.createIndex({ authorUserId: 1 });

    // 4. Abuse reports indexes
    await this.abuseReports.createIndex({ commentId: 1 });
    await this.abuseReports.createIndex({ reporterUserId: 1, commentId: 1 });

    this.logger.log('Community database indexes verified successfully.');
  }
}
