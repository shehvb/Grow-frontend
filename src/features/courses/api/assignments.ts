import apiClient from '../../../services/apiClient';
import type { Assignment, AssignmentWriteRequest } from '../types';

export const fetchAssignments = async (courseId: number): Promise<Assignment[]> => {
  const response = await apiClient.get(`courses/${courseId}/assignments/`);
  return response.data;
};

// Teacher specific endpoints
export const createAssignment = async (courseId: number, data: AssignmentWriteRequest): Promise<Assignment> => {
  const response = await apiClient.post(`courses/${courseId}/assignments/`, data);
  return response.data;
};

export const updateAssignment = async (courseId: number, assignmentId: number, data: AssignmentWriteRequest): Promise<Assignment> => {
  const response = await apiClient.put(`courses/${courseId}/assignments/${assignmentId}/`, data);
  return response.data;
};

export const deleteAssignment = async (courseId: number, assignmentId: number): Promise<void> => {
  await apiClient.delete(`courses/${courseId}/assignments/${assignmentId}/`);
};
