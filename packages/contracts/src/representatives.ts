import {
  RepresentativeOfficeType,
  RepresentativeVerificationStatus,
  RepresentativeTermStatus,
  ProfileClaimStatus,
  JurisdictionType,
  ReportRepresentativeRelationType,
  MatchingMethod,
  EvidenceType,
  EvidenceVerificationStatus,
  RepresentativeSourceProvenance,
} from './enums.js';
import { MediaAttachment } from './reports.js';

// ============================================================================
// Public Representatives & Jurisdictions Data Contracts
// ============================================================================

export interface JurisdictionDto {
  id: string; // e.g. 'ap_district_visakhapatnam', 'ap_mandal_gajuwaka', 'ap_constituency_bhimili'
  name: string;
  type: JurisdictionType;
  parentId?: string;
  districtId?: string;
  mandalId?: string;
  wardNumber?: number;
  center?: {
    latitude: number;
    longitude: number;
  };
  hasBoundaryGeometry: boolean;
  provenance: RepresentativeSourceProvenance;
  createdAt: string;
  updatedAt: string;
}

export interface PublicOfficeContact {
  officeAddress?: string;
  officialEmail?: string;
  officialPhone?: string;
  helplinePhone?: string;
  officialWebsite?: string;
  socialHandles?: {
    twitter?: string;
    facebook?: string;
  };
}

export interface RepresentativeProfileDto {
  id: string; // stable uuid
  publicName: string;
  officeType: RepresentativeOfficeType;
  officialDesignation: string; // e.g., "Member of Legislative Assembly (MLA)"
  partyAffiliation?: string; // e.g., "TDP", "YSRCP", "JSP", "Independent"
  biography?: string;
  photoUrl?: string; // Neutral placeholder if not verified
  isPhotoVerified: boolean;
  jurisdictionId: string;
  jurisdictionName: string;
  jurisdictionType: JurisdictionType;
  parentDistrictId?: string;
  parentDistrictName?: string;
  termStatus: RepresentativeTermStatus;
  termStartDate?: string;
  termEndDate?: string;
  verificationStatus: RepresentativeVerificationStatus;
  sourceProvenance: RepresentativeSourceProvenance;
  lastVerifiedAt: string;
  claimStatus: ProfileClaimStatus;
  claimedByUserId?: string;
  contactDetails?: PublicOfficeContact;
  createdAt: string;
  updatedAt: string;
}

export interface RepresentativeAccountabilitySummaryDto {
  representativeId: string;
  totalAssociatedReports: number;
  openReports: number;
  inProgressReports: number;
  resolvedReports: number;
  resolutionPercentage: number; // 0-100
  averageResolutionDays?: number | null; // calculated only if sufficient trustworthy resolved data exists
}

export interface ReportRepresentativeAssociationDto {
  id: string;
  reportId: string;
  representativeId: string;
  representativeName: string;
  officeType: RepresentativeOfficeType;
  officialDesignation?: string;
  partyAffiliation?: string;
  photoUrl?: string;
  isPhotoVerified?: boolean;
  verificationStatus?: RepresentativeVerificationStatus;
  jurisdictionId: string;
  jurisdictionName: string;
  relationshipType: ReportRepresentativeRelationType;
  matchingMethod: MatchingMethod;
  isActive: boolean;
  associatedAt: string;
}

export interface ResponsibilityRuleDto {
  id: string;
  category: string; // ReportCategory
  jurisdictionType: JurisdictionType;
  departmentName: string;
  departmentCode: string;
  fallbackNotes?: string;
  isVerified: boolean;
}

export interface ResolutionEvidenceDto {
  id: string;
  reportId: string;
  evidenceType: EvidenceType;
  media: MediaAttachment;
  description?: string;
  uploaderUserId: string;
  uploaderRole: string;
  uploaderName?: string;
  isOfficialRepresentativeSubmission: boolean;
  verificationStatus: EvidenceVerificationStatus;
  verifiedByUserId?: string;
  verifiedAt?: string;
  rejectionReason?: string;
  createdAt: string;
}

export interface ProfileClaimRequestDto {
  id: string;
  representativeId: string;
  representativeName: string;
  claimantUserId: string;
  officialEmailUsed: string;
  proofDetails: string;
  status: ProfileClaimStatus;
  reviewedByUserId?: string;
  reviewDecisionNotes?: string;
  reviewedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface RepresentativeImportSummaryDto {
  sourceName: string;
  totalRecordsProcessed: number;
  createdCount: number;
  updatedCount: number;
  unchangedCount: number;
  rejectedCount: number;
  reviewRequiredCount: number;
  timestamp: string;
  coverageReport: {
    totalStatewideDistricts: number;
    statewideDistrictsCovered: number;
    legislativeConstituenciesCovered: number;
    parliamentaryConstituenciesCovered: number;
    municipalBodiesCovered: number;
    wardsWithActualBoundariesCount: number;
    wardLevelExactMappingAvailable: boolean;
    wardLevelCoverageScope: 'PILOT_PARTIAL' | 'STATEWIDE_COMPLETE';
    totalRepresentatives?: number;
    activeRepresentatives?: number;
    verifiedOfficialRepresentativesCount?: number;
    flaggedForReviewRepresentativesCount?: number;
    publicRecordRepresentativesCount?: number;
    historicalRepresentativesCount?: number;
    dataCompletenessNotes: string;
  };
}

export interface SubmitProfileClaimDto {
  officialEmailUsed: string;
  proofDetails: string;
}

export interface ReviewProfileClaimDto {
  approved: boolean;
  decisionNotes: string;
}

export interface SubmitResolutionEvidenceDto {
  evidenceType: EvidenceType;
  media: {
    mediaId: string;
    publicId: string;
    url: string;
    secureUrl: string;
    format: string;
    resourceType: 'image' | 'video';
    bytes: number;
  };
  description?: string;
}

export interface VerifyResolutionEvidenceDto {
  verified: boolean;
  rejectionReason?: string;
}
