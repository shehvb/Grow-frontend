import apiClient from './apiClient';
import type { LoginResponse, User } from '../types/auth';

export const authApi = {
  // Core Auth
  login: async (credentials: any): Promise<LoginResponse> => {
    const response = await apiClient.post<LoginResponse>('auth/login/', credentials);
    return response.data;
  },

  register: async (userData: any): Promise<User> => {
    const response = await apiClient.post<User>('auth/register/', userData);
    return response.data;
  },

  // GET /api/v1/auth/me/ — fetch the current authenticated user's profile
  getProfile: async (): Promise<User> => {
    const response = await apiClient.get<User>('auth/me/');
    return response.data;
  },

  logout: async (refreshToken: string): Promise<void> => {
    await apiClient.post('auth/logout/', { refresh: refreshToken });
  },

  // OAuth — POST /api/v1/auth/oauth/ — social login for Parent accounts (Google/Facebook)
  oauthLogin: async (provider: 'google' | 'facebook', accessToken: string): Promise<LoginResponse> => {
    const response = await apiClient.post<LoginResponse>('auth/oauth/', {
      provider,
      access_token: accessToken,
    });
    return response.data;
  },

  // Advanced Auth
  changePassword: async (data: any): Promise<void> => {
    await apiClient.post('auth/change-password/', data);
  },

  forgotPassword: async (email: string): Promise<void> => {
    await apiClient.post('auth/forgot-password/', { email });
  },

  resetPassword: async (data: any): Promise<void> => {
    await apiClient.post('auth/reset-password/', data);
  },

  updateProfile: async (data: any): Promise<User> => {
    const response = await apiClient.put<User>('auth/profile/', data);
    return response.data;
  },

  linkParent: async (childId: number): Promise<void> => {
    await apiClient.post('auth/parent-profile/', { child_id: childId });
  },

  useEnrollmentCode: async (code: string): Promise<void> => {
    await apiClient.post('auth/enrollment-codes/use/', { code });
  },

  getSchool: async (): Promise<any> => {
    const response = await apiClient.get('auth/school/');
    return response.data;
  },

  getSchools: async (): Promise<any[]> => {
    const response = await apiClient.get('schools/');
    return response.data.results || response.data || [];
  },

  createSchool: async (data: any): Promise<any> => {
    const response = await apiClient.post('auth/school/', data);
    return response.data;
  }
};
