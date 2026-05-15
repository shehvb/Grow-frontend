import apiClient from './apiClient';

import type { TeacherSubmission, GradeSubmissionRequest } from '../types/teacher';

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
  submissions?: number;
  totalStudents?: number;
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

  getSubmissions: async (assignmentId: number): Promise<TeacherSubmission[]> => {
    const response = await apiClient.get(`teacher/assignments/${assignmentId}/submissions/`);
    return response.data;
  },

  gradeSubmission: async (submissionId: number, data: GradeSubmissionRequest): Promise<TeacherSubmission> => {
    const response = await apiClient.patch(`teacher/submissions/${submissionId}/grade/`, data);
    return response.data;
  },

  // Student Actions
  uploadAssignmentFile: async (id: number | string, file: File): Promise<any> => {
    const formData = new FormData();
    formData.append('file', file);
    const response = await apiClient.post(`student/assignments/${id}/upload/`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  },

  submitAssignment: async (id: number | string, fileName: string): Promise<any> => {
    const response = await apiClient.post(`student/assignments/${id}/submit/`, { fileName });
    return response.data;
  }
};
