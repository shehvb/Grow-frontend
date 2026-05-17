import apiClient from "../../../services/apiClient";
import type { StudentDashboard } from "../../../types/student";

export const studentService = {
  getDashboardData: async (): Promise<StudentDashboard> => {
    const response = await apiClient.get<StudentDashboard>('/student/dashboard/');
    return response.data;
  },

  getTasks: async (): Promise<any[]> => {
    const response = await apiClient.get<any[]>('/student/tasks/');
    return response.data;
  }
};
