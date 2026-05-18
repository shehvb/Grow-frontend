import apiClient from './apiClient';

export interface EnrolledStudent {
  id: number;
  student_id: number;
  student_name: string;
  email: string;
  enrolled_at: string;
  course_title: string;
}

export const studentService = {
  getTeacherStudents: async (): Promise<EnrolledStudent[]> => {
    const response = await apiClient.get('teacher/students/');
    const data = response.data;
    return Array.isArray(data) ? data : (data.students || []);
  },
  
  getSettings: async (): Promise<any> => {
    const response = await apiClient.get('student/settings/');
    return response.data;
  }
};
