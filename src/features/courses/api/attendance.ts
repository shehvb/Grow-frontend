import apiClient from '../../../services/apiClient';
import type { AttendanceRecord } from '../types';

export const fetchCourseAttendance = async (courseId: number): Promise<AttendanceRecord[]> => {
  const response = await apiClient.get('/api/v1/attendance/', {
    params: { course: courseId }
  });
  return response.data;
};

export const fetchStudentAttendance = async (studentId: number): Promise<AttendanceRecord[]> => {
  const response = await apiClient.get('/api/v1/attendance/', {
    params: { student: studentId }
  });
  return response.data;
};
