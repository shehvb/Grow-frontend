import apiClient from './apiClient';

import type { GradeSubmissionRequest } from '../types/teacher';
import type { StudentAssignment } from '../types';

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
    const response = await apiClient.put(`teacher/assignments/${id}/update/`, data, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  },

  deleteAssignment: async (id: number): Promise<void> => {
    await apiClient.delete(`teacher/assignments/${id}/`);
  },

  getSubmissions: async (assignmentId: number): Promise<any> => {
    const response = await apiClient.get(`teacher/assignments/${assignmentId}/results/`);
    return response.data;
  },

  gradeSubmission: async (submissionId: number, data: GradeSubmissionRequest): Promise<any> => {
    const scoreVal = data.raw_score !== undefined ? data.raw_score : (data.score !== undefined ? data.score.toString() : "0.00");
    const payload = {
      raw_score: scoreVal,
      feedback: data.feedback || ""
    };
    const response = await apiClient.post(`teacher/submissions/${submissionId}/grade/`, payload);
    return response.data;
  },

  // Student Actions
  getStudentAssignments: async (courseId: number | string): Promise<StudentAssignment[]> => {
    try {
      const response = await apiClient.get(`courses/${courseId}/assignments/`);
      const list: any[] = response.data.results || response.data;
      
      const details = await Promise.all(
        list.map(async (asg) => {
          try {
            const detailResponse = await apiClient.get(`student/assignments/${asg.id}/`);
            return {
              ...asg,
              ...detailResponse.data,
              deadline: detailResponse.data.deadline || asg.due_date,
              teacher_file_url: detailResponse.data.teacher_file_url || asg.teacher_file,
              submission_status: detailResponse.data.submission_status || "pending",
              score: detailResponse.data.score !== undefined ? detailResponse.data.score : (detailResponse.data.raw_score || null),
              feedback: detailResponse.data.feedback || null,
              xp_awarded: detailResponse.data.xp_awarded !== undefined ? detailResponse.data.xp_awarded : null
            };
          } catch (e) {
            console.warn(`Failed to fetch student details for assignment ${asg.id}`, e);
            return {
              ...asg,
              deadline: asg.due_date,
              teacher_file_url: asg.teacher_file,
              submission_status: "pending"
            };
          }
        })
      );
      return details;
    } catch (err) {
      console.warn("Failed to fetch assignments for course:", err);
      return [];
    }
  },

  submitStudentAssignment: async (id: number | string, file: File): Promise<any> => {
    const formData = new FormData();
    formData.append('file', file);
    const response = await apiClient.post(`student/assignments/${id}/submit/`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  }
};
