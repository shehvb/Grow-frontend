// src/utils/authUtils.ts
// Utility functions for role-based auth routing and refresh endpoint resolution.

import type { AuthTokens } from '../types/auth';

/**
 * Returns the correct login route for the given user role.
 * Used for redirects after session expiry, idle logout, or refresh failure.
 */
export const getLoginRouteForRole = (role: string | undefined): string => {
  switch (role) {
    case 'school_admin':
      return '/login/admin';
    case 'teacher':
      return '/login/teacher';
    case 'parent':
      return '/login/parent';
    case 'student':
    default:
      return '/login/student';
  }
};

/**
 * Returns the correct refresh endpoint and request body for the given session.
 * Matches the backend API's role-specific refresh endpoint matrix.
 */
export const getRefreshConfig = (
  session: AuthTokens
): { endpoint: string; body: Record<string, string> } => {
  const role = session.role;
  const loginFlow = session.loginFlow ?? 'standard';
  const refresh = session.refresh;

  if (role === 'teacher') {
    return {
      endpoint: 'teachers/auth/refresh/',
      body: { refresh },
    };
  }

  if (role === 'student' && loginFlow === 'otp') {
    return {
      endpoint: 'auth/student/token/refresh/',
      body: { refresh_token: refresh },
    };
  }

  // student (standard), parent, school_admin — all use the generic endpoint
  return {
    endpoint: 'auth/token/refresh/',
    body: { refresh },
  };
};
