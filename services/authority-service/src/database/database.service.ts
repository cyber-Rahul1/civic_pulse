import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MongoClient, Db, Collection } from 'mongodb';
import { CivicLogger } from '@civic-pulse/nest-common';
import {
  AuthorityApplicationDocument,
  DepartmentDocument,
  ReportAssignmentDocument,
} from '../models/authority.models.js';

@Injectable()
export class DatabaseService implements OnModuleInit, OnModuleDestroy {
  private client!: MongoClient;
  private db!: Db;

  public applications!: Collection<AuthorityApplicationDocument>;
  public departments!: Collection<DepartmentDocument>;
  public assignments!: Collection<ReportAssignmentDocument>;

  constructor(
    private readonly configService: ConfigService,
    private readonly logger: CivicLogger,
  ) {
    this.logger.setContext('Authority:DatabaseService');
  }

  async onModuleInit() {
    const uri =
      this.configService.get<string>('AUTHORITY_DB_URI') ||
      'mongodb://civic_authority_user:authority_dev_secret@localhost:27018/civic_authority?authSource=civic_authority';

    this.logger.log('Connecting to Authority logical MongoDB...');
    this.client = new MongoClient(uri, {
      maxPoolSize: 20,
      minPoolSize: 2,
      serverSelectionTimeoutMS: 5000,
    });

    await this.client.connect();
    this.db = this.client.db();
    this.logger.log(`Connected successfully to database: ${this.db.databaseName}`);

    this.applications = this.db.collection<AuthorityApplicationDocument>('authority_applications');
    this.departments = this.db.collection<DepartmentDocument>('departments');
    this.assignments = this.db.collection<ReportAssignmentDocument>('report_assignments');

    await this.ensureIndexes();
  }

  async onModuleDestroy() {
    if (this.client) {
      await this.client.close();
      this.logger.log('Authority database connection pool closed.');
    }
  }

  getDb(): Db {
    return this.db;
  }

  private async ensureIndexes(): Promise<void> {
    // 1. Applications indexes: (applicantUserId, status), status
    await this.applications.createIndex({ applicantUserId: 1 });
    await this.applications.createIndex({ status: 1, createdAt: -1 });

    // 2. Departments unique compound index on (name, jurisdiction)
    await this.departments.createIndex(
      { name: 1, jurisdiction: 1 },
      { unique: true, name: 'uniq_dept_name_jurisdiction' },
    );
    await this.departments.createIndex({ status: 1 });

    // 3. Assignments indexes: (reportId, assignedAt), (departmentId, status)
    await this.assignments.createIndex(
      { reportId: 1, assignedAt: -1 },
      { name: 'idx_assignment_report_date' },
    );
    await this.assignments.createIndex({ departmentId: 1, status: 1 });
    await this.assignments.createIndex({ assignedByUserId: 1 });

    this.logger.log('Authority database indexes verified successfully.');
  }
}
