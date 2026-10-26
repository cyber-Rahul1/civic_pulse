export enum AuthorityApplicationStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
}

export enum DepartmentStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
}

export enum AssignmentStatus {
  ASSIGNED = 'ASSIGNED',
  REASSIGNED = 'REASSIGNED',
  UNASSIGNED = 'UNASSIGNED',
}

export interface AuthorityApplicationDto {
  id: string;
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
  reviewedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface DepartmentDto {
  id: string;
  name: string;
  jurisdiction: string;
  description?: string;
  publicContactEmail?: string;
  publicContactPhone?: string;
  status: DepartmentStatus;
  createdAt: string;
  updatedAt: string;
}

export interface ReportAssignmentDto {
  id: string;
  reportId: string;
  departmentId: string;
  departmentName?: string;
  assignedByUserId: string;
  assignmentReason?: string;
  status: AssignmentStatus;
  assignedAt: string;
  updatedAt: string;
}

export interface PublicAssignmentViewDto {
  reportId: string;
  currentAssignment?: {
    departmentId: string;
    departmentName: string;
    jurisdiction: string;
    assignedAt: string;
  };
  assignmentHistoryCount: number;
}
