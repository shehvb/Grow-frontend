import apiClient from './apiClient';

export interface Assignment {
  id: number;
  course: number;
  course_title?: string;
  title: string;
  content: string;
  max_marks: number;
  due_date: string;
  attachment?: string;
  created_at: string;
}

export interface Submission {
  id: number;
  assignment: number;
  student: number;
  student_name: string;
  file: string;
  submitted_at: string;
  status: 'submitted' | 'graded' | 'late';
  grade?: number;
  feedback?: string;
}

export const assignmentService = {
  listAssignments: async (): Promise<Assignment[]> => {
    const response = await apiClient.get('teacher/assignments/');
    return response.data;
  },

  createAssignment: async (data: FormData): Promise<Assignment> => {
    const response = await apiClient.post('teacher/assignments/create/', data, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  },

  updateAssignment: async (id: number, data: FormData): Promise<Assignment> => {
    const response = await apiClient.patch(`teacher/assignments/${id}/update/`, data, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  },

  deleteAssignment: async (id: number): Promise<void> => {
    await apiClient.delete(`teacher/assignments/${id}/delete/`);
  },

  getSubmissions: async (assignmentId: number): Promise<Submission[]> => {
    const response = await apiClient.get(`teacher/assignments/${assignmentId}/review/`);
    return response.data;
  },

  gradeSubmission: async (submissionId: number, data: { grade: number; feedback: string }): Promise<Submission> => {
    const response = await apiClient.post(`teacher/submissions/${submissionId}/grade/`, data);
    return response.data;
  }
};
