export interface User {
  id: number;
  username: string;
  email: string;
  first_name?: string;
  last_name?: string;
  full_name?: string;
  school?: string;
  grade?: string;
  student_id?: string;
  total_xp?: number;
  courses_count?: number;
  role: 'student' | 'teacher' | 'parent' | 'school_admin';
  phone?: string;
  avatar?: string;
  is_first_login?: boolean; // New field for parent onboarding
}

export interface AuthTokens {
  access: string;
  refresh: string;
  role?: 'student' | 'teacher' | 'parent' | 'school_admin';
  loginFlow?: 'standard' | 'otp'; // determines which student refresh endpoint to use
}

export interface LoginResponse {
  access: string;
  refresh: string;
  user: User;
  is_first_login?: boolean; // Included in some auth responses
}

export interface TokenRefreshResponse {
  access: string;
}

export interface School {
  id: number;
  name: string;
  school_code: string;
  type: string;
  slug: string;
}

export interface EnrollmentCode {
  id: number;
  code: string;
  is_used: boolean;
  is_revoked: boolean;
  created_at: string;
  used_by_user?: string;
}

export interface ParentProfile {
  id: number;
  parent: number;
  child: number;
  created_at: string;
}
