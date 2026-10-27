import {
  AuthorityApplicationStatus,
  DepartmentStatus,
  AssignmentStatus,
} from '@civic-pulse/contracts';

export interface AuthorityApplicationDocument {
  _id: string; // uuid
  applicantUserId: string;
  organization: string;
  departmentRequested: string;
  officialRole: string;
  officialEmail: string;
  officialPhone?: string;
  supportingNotes?: string;
  status: AuthorityApplicationStatus;
  roleGranted?: boolean;
  roleGrantError?: string;
  reviewedByUserId?: string;
  reviewDecisionNotes?: string;
  reviewedAt?: Date;
  notificationDispatched?: boolean;
  notificationDispatchError?: string;
  notificationDispatchedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface DepartmentDocument {
  _id: string; // uuid
  name: string;
  jurisdiction: string;
  description?: string;
  publicContactEmail?: string;
  publicContactPhone?: string;
  status: DepartmentStatus;
  createdAt: Date;
  updatedAt: Date;
}

export interface ReportAssignmentDocument {
  _id: string; // uuid
  reportId: string;
  departmentId: string;
  departmentName: string;
  assignedByUserId: string;
  assignmentReason?: string;
  status: AssignmentStatus;
  notificationDispatched?: boolean;
  notificationDispatchError?: string;
  notificationDispatchedAt?: Date;
  assignedAt: Date;
  updatedAt: Date;
}

// ============================================================================
// Public Representatives & Civic Accountability Models
// ============================================================================

export interface JurisdictionDocument {
  _id: string; // stable id e.g. 'ap_district_visakhapatnam'
  name: string;
  type: import('@civic-pulse/contracts').JurisdictionType;
  parentId?: string;
  districtId?: string;
  mandalId?: string;
  wardNumber?: number;
  center?: {
    latitude: number;
    longitude: number;
  };
  hasBoundaryGeometry: boolean;
  provenance: import('@civic-pulse/contracts').RepresentativeSourceProvenance;
  createdAt: Date;
  updatedAt: Date;
}

export interface RepresentativeProfileDocument {
  _id: string; // stable uuid
  publicName: string;
  officeType: import('@civic-pulse/contracts').RepresentativeOfficeType;
  officialDesignation: string;
  partyAffiliation?: string;
  biography?: string;
  photoUrl?: string;
  isPhotoVerified: boolean;
  jurisdictionId: string;
  jurisdictionName: string;
  jurisdictionType: import('@civic-pulse/contracts').JurisdictionType;
  parentDistrictId?: string;
  parentDistrictName?: string;
  termStatus: import('@civic-pulse/contracts').RepresentativeTermStatus;
  termStartDate?: Date;
  termEndDate?: Date;
  verificationStatus: import('@civic-pulse/contracts').RepresentativeVerificationStatus;
  sourceProvenance: import('@civic-pulse/contracts').RepresentativeSourceProvenance;
  lastVerifiedAt: Date;
  claimStatus: import('@civic-pulse/contracts').ProfileClaimStatus;
  claimedByUserId?: string;
  contactDetails?: import('@civic-pulse/contracts').PublicOfficeContact;
  createdAt: Date;
  updatedAt: Date;
}

export interface ReportProfileAssociationDocument {
  _id: string; // uuid
  reportId: string;
  representativeId: string;
  representativeName: string;
  officeType: import('@civic-pulse/contracts').RepresentativeOfficeType;
  jurisdictionId: string;
  jurisdictionName: string;
  relationshipType: import('@civic-pulse/contracts').ReportRepresentativeRelationType;
  matchingMethod: import('@civic-pulse/contracts').MatchingMethod;
  reportStatus: import('@civic-pulse/contracts').ReportStatus;
  isActive: boolean;
  associatedAt: Date;
  updatedAt: Date;
}

export interface ResponsibilityRuleDocument {
  _id: string; // uuid
  category: string;
  jurisdictionType: import('@civic-pulse/contracts').JurisdictionType;
  departmentName: string;
  departmentCode: string;
  fallbackNotes?: string;
  isVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface ResolutionEvidenceDocument {
  _id: string; // uuid
  reportId: string;
  evidenceType: import('@civic-pulse/contracts').EvidenceType;
  media: {
    mediaId: string;
    publicId: string;
    url: string;
    secureUrl: string;
    format: string;
    resourceType: 'image' | 'video';
    bytes: number;
    uploadedByUserId: string;
    createdAt: Date;
  };
  description?: string;
  uploaderUserId: string;
  uploaderRole: string;
  uploaderName?: string;
  isOfficialRepresentativeSubmission: boolean;
  verificationStatus: import('@civic-pulse/contracts').EvidenceVerificationStatus;
  verifiedByUserId?: string;
  verifiedAt?: Date;
  rejectionReason?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ProfileClaimRequestDocument {
  _id: string; // uuid
  representativeId: string;
  representativeName: string;
  claimantUserId: string;
  officialEmailUsed: string;
  proofDetails: string;
  status: import('@civic-pulse/contracts').ProfileClaimStatus;
  reviewedByUserId?: string;
  reviewDecisionNotes?: string;
  reviewedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

