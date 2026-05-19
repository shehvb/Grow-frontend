import apiClient from './apiClient';

export interface TeacherProfile {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  bio?: string;
  profile_picture?: string;
}

export interface NotificationPrefs {
  email_notifications: boolean;
  submission_alerts: boolean;
}

export const teacherService = {
  getProfile: async (): Promise<TeacherProfile> => {
    const response = await apiClient.get('teachers/settings/profile/');
    return response.data;
  },

  updateProfile: async (data: FormData): Promise<TeacherProfile> => {
    const response = await apiClient.patch('teachers/settings/profile/update/', data, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  },

  getNotificationPrefs: async (): Promise<NotificationPrefs> => {
    const response = await apiClient.get('teachers/settings/notifications/');
    return response.data;
  },

  updateNotificationPrefs: async (data: NotificationPrefs): Promise<NotificationPrefs> => {
    const response = await apiClient.patch('teachers/settings/notifications/update/', data);
    return response.data;
  }
};
