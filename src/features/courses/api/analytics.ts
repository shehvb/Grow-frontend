import apiClient from '../../../services/apiClient';

export interface TaskSummary {
  completed: number;
  pending: number;
  total: number;
}

export interface ProgressData {
  student_id: number;
  student_name: string;
  progress_percentage: number;
}

export const fetchTaskSummary = async (courseId: number): Promise<TaskSummary> => {
  const response = await apiClient.get(`courses/${courseId}/task-summary/`);
  return response.data;
};

export const fetchCourseProgress = async (courseId: number): Promise<ProgressData[]> => {
  const response = await apiClient.get(`courses/${courseId}/progress/`);
  return response.data;
};
