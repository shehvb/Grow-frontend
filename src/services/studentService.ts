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
    return response.data;
  }
};
