import apiClient from "../../../services/apiClient";
import type { TeacherNotification } from "../../../types/teacher";

class TeacherService {
  private static instance: TeacherService;

  private constructor() { }

  public static getInstance(): TeacherService {
    if (!TeacherService.instance) {
      TeacherService.instance = new TeacherService();
    }
    return TeacherService.instance;
  }

  public async getDashboardStats(): Promise<any> {
    const response = await apiClient.get('/teachers/dashboard/');
    return response.data;
  }

  public async getStudents(): Promise<any[]> {
    const response = await apiClient.get('/teachers/students/');
    return response.data;
  }

  public async getProfile(): Promise<any> {
    const response = await apiClient.get('/teachers/settings/profile/');
    return response.data;
  }

  public async updateProfile(data: any): Promise<any> {
    const response = await apiClient.patch('/teachers/settings/profile/update/', data);
    return response.data;
  }

  public async getNotifications(): Promise<any> {
    const response = await apiClient.get('/teachers/settings/notifications/');
    return response.data;
  }

  public async updateNotifications(data: any): Promise<any> {
    const response = await apiClient.patch('/teachers/settings/notifications/update/', data);
    return response.data;
  }

  public async getNotificationsFeed(): Promise<TeacherNotification[]> {
    const response = await apiClient.get('/teachers/notifications/');
    return response.data;
  }
}

export const teacherService = TeacherService.getInstance();
