import apiClient from '../../../services/apiClient';
import type { Submission, SubmissionCreateRequest, SubmissionGradeRequest } from '../types';

// Student specific endpoint
export const submitAssignment = async (courseId: number, assignmentId: number, data: SubmissionCreateRequest): Promise<Submission> => {
  const response = await apiClient.post(`courses/${courseId}/assignments/${assignmentId}/submissions/submit/`, data);
  return response.data;
};

// Teacher specific endpoints
export const fetchSubmissions = async (courseId: number, assignmentId: number): Promise<Submission[]> => {
  const response = await apiClient.get(`courses/${courseId}/assignments/${assignmentId}/submissions/`);
  return response.data;
};

export const gradeSubmission = async (courseId: number, assignmentId: number, submissionId: number, data: SubmissionGradeRequest): Promise<Submission> => {
  const response = await apiClient.post(`courses/${courseId}/assignments/${assignmentId}/submissions/${submissionId}/grade/`, data);
  return response.data;
};
