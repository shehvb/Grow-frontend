import apiClient from '../../../services/apiClient';

export const enrollInCourse = async (courseId: number): Promise<void> => {
  await apiClient.post(`courses/${courseId}/enroll/`);
};

export const joinLesson = async (_courseId: number, lessonId: number): Promise<void> => {
  // Join the lesson to mark attendance
  await apiClient.post(`lessons/${lessonId}/join/`);
};
