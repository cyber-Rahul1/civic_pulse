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
