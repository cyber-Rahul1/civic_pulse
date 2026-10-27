import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsEmail,
  IsEnum,
  MaxLength,
  MinLength,
} from 'class-validator';
import {
  AuthorityApplicationStatus,
  DepartmentStatus,
} from '@civic-pulse/contracts';

export class CreateAuthorityApplicationDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(100)
  organization!: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(100)
  departmentRequested!: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(100)
  officialRole!: string;

  @IsEmail()
  @IsNotEmpty()
  officialEmail!: string;

  @IsOptional()
  @IsString()
  @MaxLength(30)
  officialPhone?: string;

  @IsOptional()
  @IsString()
  @MaxLength(1000)
  supportingNotes?: string;
}

export class ReviewAuthorityApplicationDto {
  @IsEnum(AuthorityApplicationStatus)
  status!: AuthorityApplicationStatus;

  @IsOptional()
  @IsString()
  @MaxLength(500)
  reviewDecisionNotes?: string;
}

export class CreateDepartmentDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(100)
  name!: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(100)
  jurisdiction!: string;

  @IsOptional()
  @IsString()
  @MaxLength(500)
  description?: string;

  @IsOptional()
  @IsEmail()
  publicContactEmail?: string;

  @IsOptional()
  @IsString()
  @MaxLength(30)
  publicContactPhone?: string;
}

export class UpdateDepartmentDto {
  @IsOptional()
  @IsString()
  @MinLength(2)
  @MaxLength(100)
  name?: string;

  @IsOptional()
  @IsString()
  @MinLength(2)
  @MaxLength(100)
  jurisdiction?: string;

  @IsOptional()
  @IsString()
  @MaxLength(500)
  description?: string;

  @IsOptional()
  @IsEmail()
  publicContactEmail?: string;

  @IsOptional()
  @IsString()
  @MaxLength(30)
  publicContactPhone?: string;

  @IsOptional()
  @IsEnum(DepartmentStatus)
  status?: DepartmentStatus;
}

export class CreateReportAssignmentDto {
  @IsString()
  @IsNotEmpty()
  departmentId!: string;

  @IsOptional()
  @IsString()
  @MaxLength(500)
  assignmentReason?: string;
}

// ============================================================================
// Public Representatives & Evidence Validation DTOs
// ============================================================================

export class QueryRepresentativesDto {
  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @IsString()
  officeType?: string;

  @IsOptional()
  @IsString()
  jurisdictionId?: string;

  @IsOptional()
  @IsString()
  districtId?: string;

  @IsOptional()
  @IsString()
  termStatus?: string;

  @IsOptional()
  page?: number | string;

  @IsOptional()
  limit?: number | string;
}

export class SubmitProfileClaimDtoClass {
  @IsEmail()
  @IsNotEmpty()
  officialEmailUsed!: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(10)
  @MaxLength(1000)
  proofDetails!: string;
}

export class ReviewProfileClaimDtoClass {
  approved!: boolean;

  @IsString()
  @IsNotEmpty()
  @MaxLength(500)
  decisionNotes!: string;
}

export class UpdateRepresentativeProfileDtoClass {
  @IsOptional()
  @IsString()
  @MaxLength(1000)
  biography?: string;

  @IsOptional()
  @IsString()
  photoUrl?: string;

  @IsOptional()
  contactDetails?: {
    officeAddress?: string;
    officialEmail?: string;
    officialPhone?: string;
    helplinePhone?: string;
    officialWebsite?: string;
    socialHandles?: {
      twitter?: string;
      facebook?: string;
    };
  };
}

export class SubmitResolutionEvidenceDtoClass {
  @IsString()
  @IsNotEmpty()
  evidenceType!: 'BEFORE' | 'AFTER';

  @IsNotEmpty()
  media!: {
    mediaId: string;
    publicId: string;
    url: string;
    secureUrl: string;
    format: string;
    resourceType: 'image' | 'video';
    bytes: number;
  };

  @IsOptional()
  @IsString()
  @MaxLength(500)
  description?: string;
}

export class VerifyResolutionEvidenceDtoClass {
  verified!: boolean;

  @IsOptional()
  @IsString()
  @MaxLength(500)
  rejectionReason?: string;
}

