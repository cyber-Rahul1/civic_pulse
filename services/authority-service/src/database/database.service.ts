import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MongoClient, Db, Collection } from 'mongodb';
import { CivicLogger } from '@civic-pulse/nest-common';
import {
  AuthorityApplicationDocument,
  DepartmentDocument,
  ReportAssignmentDocument,
  JurisdictionDocument,
  RepresentativeProfileDocument,
  ReportProfileAssociationDocument,
  ResponsibilityRuleDocument,
  ResolutionEvidenceDocument,
  ProfileClaimRequestDocument,
} from '../models/authority.models.js';

@Injectable()
export class DatabaseService implements OnModuleInit, OnModuleDestroy {
  private client!: MongoClient;
  private db!: Db;

  public applications!: Collection<AuthorityApplicationDocument>;
  public departments!: Collection<DepartmentDocument>;
  public assignments!: Collection<ReportAssignmentDocument>;
  public jurisdictions!: Collection<JurisdictionDocument>;
  public representatives!: Collection<RepresentativeProfileDocument>;
  public reportAssociations!: Collection<ReportProfileAssociationDocument>;
  public responsibilityRules!: Collection<ResponsibilityRuleDocument>;
  public resolutionEvidence!: Collection<ResolutionEvidenceDocument>;
  public profileClaims!: Collection<ProfileClaimRequestDocument>;

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
    this.jurisdictions = this.db.collection<JurisdictionDocument>('jurisdictions');
    this.representatives = this.db.collection<RepresentativeProfileDocument>('representatives');
    this.reportAssociations = this.db.collection<ReportProfileAssociationDocument>('report_associations');
    this.responsibilityRules = this.db.collection<ResponsibilityRuleDocument>('responsibility_rules');
    this.resolutionEvidence = this.db.collection<ResolutionEvidenceDocument>('resolution_evidence');
    this.profileClaims = this.db.collection<ProfileClaimRequestDocument>('profile_claims');

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

    // 4. Jurisdictions indexes
    await this.jurisdictions.createIndex({ type: 1, parentId: 1 });
    await this.jurisdictions.createIndex({ districtId: 1 });

    // 5. Representatives indexes
    await this.representatives.createIndex(
      { jurisdictionId: 1, officeType: 1, termStatus: 1 },
      { name: 'idx_rep_jurisdiction_term' },
    );
    await this.representatives.createIndex(
      { publicName: 1, jurisdictionId: 1, officeType: 1 },
      { unique: true, name: 'uniq_rep_name_jurisdiction_office' },
    );
    await this.representatives.createIndex({ officeType: 1, termStatus: 1 });
    await this.representatives.createIndex({ claimedByUserId: 1 });

    // 6. Report Associations unique compound index: (reportId, representativeId, relationshipType)
    await this.reportAssociations.createIndex(
      { reportId: 1, representativeId: 1, relationshipType: 1 },
      { unique: true, name: 'uniq_report_rep_relationship' },
    );
    await this.reportAssociations.createIndex(
      { representativeId: 1, reportStatus: 1, associatedAt: -1 },
      { name: 'idx_rep_reports_status' },
    );
    await this.reportAssociations.createIndex({ reportId: 1 });

    // 7. Responsibility Rules
    await this.responsibilityRules.createIndex(
      { category: 1, jurisdictionType: 1 },
      { unique: true, name: 'uniq_responsibility_category_jurisdiction' },
    );

    // 8. Resolution Evidence indexes: (reportId, createdAt)
    await this.resolutionEvidence.createIndex(
      { reportId: 1, createdAt: -1 },
      { name: 'idx_evidence_report' },
    );
    await this.resolutionEvidence.createIndex({ uploaderUserId: 1 });
    await this.resolutionEvidence.createIndex({ verificationStatus: 1 });

    // 9. Profile Claims indexes
    await this.profileClaims.createIndex(
      { representativeId: 1, claimantUserId: 1 },
      { name: 'idx_claim_rep_user' },
    );
    await this.profileClaims.createIndex({ status: 1, createdAt: -1 });

    this.logger.log('Authority database indexes (including representatives and evidence) verified successfully.');
  }
}

