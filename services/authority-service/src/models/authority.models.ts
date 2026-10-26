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
