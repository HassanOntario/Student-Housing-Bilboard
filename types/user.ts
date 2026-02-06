export type ApprovalStatus = 'pending' | 'approved' | 'rejected';

export type UserRole = 'student' | 'admin';

export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  studentNumber: string;
  phone: string;
  role: UserRole;
  approvalStatus: ApprovalStatus;
  registrationComplete: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserRegistrationData {
  displayName: string;
  studentNumber: string;
  phone: string;
}
