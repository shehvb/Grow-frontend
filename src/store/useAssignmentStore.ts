import { create } from 'zustand';
import { assignmentService, type Assignment, type Submission } from '../services/assignmentService';

interface AssignmentState {
  assignments: Assignment[];
  currentSubmissions: Submission[];
  isLoading: boolean;
  error: string | null;

  fetchAssignments: () => Promise<void>;
  createAssignment: (data: FormData) => Promise<void>;
  updateAssignment: (id: number, data: FormData) => Promise<void>;
  deleteAssignment: (id: number) => Promise<void>;
  fetchSubmissions: (assignmentId: number) => Promise<void>;
  gradeSubmission: (submissionId: number, data: { grade: number; feedback: string }) => Promise<void>;
}

export const useAssignmentStore = create<AssignmentState>((set, get) => ({
  assignments: [],
  currentSubmissions: [],
  isLoading: false,
  error: null,

  fetchAssignments: async () => {
    set({ isLoading: true, error: null });
    try {
      const assignments = await assignmentService.listAssignments();
      set({ assignments, isLoading: false });
    } catch (error: any) {
      set({ isLoading: false, error: error.message });
    }
  },

  createAssignment: async (data: FormData) => {
    set({ isLoading: true, error: null });
    try {
      await assignmentService.createAssignment(data);
      await get().fetchAssignments();
    } catch (error: any) {
      set({ isLoading: false, error: error.message });
      throw error;
    }
  },

  updateAssignment: async (id: number, data: FormData) => {
    set({ isLoading: true, error: null });
    try {
      await assignmentService.updateAssignment(id, data);
      await get().fetchAssignments();
    } catch (error: any) {
      set({ isLoading: false, error: error.message });
      throw error;
    }
  },

  deleteAssignment: async (id: number) => {
    set({ isLoading: true, error: null });
    try {
      await assignmentService.deleteAssignment(id);
      set((state) => ({
        assignments: state.assignments.filter((a) => a.id !== id),
        isLoading: false
      }));
    } catch (error: any) {
      set({ isLoading: false, error: error.message });
      throw error;
    }
  },

  fetchSubmissions: async (assignmentId: number) => {
    set({ isLoading: true, error: null });
    try {
      const submissions = await assignmentService.getSubmissions(assignmentId);
      set({ currentSubmissions: submissions, isLoading: false });
    } catch (error: any) {
      set({ isLoading: false, error: error.message });
    }
  },

  gradeSubmission: async (submissionId: number, data: { grade: number; feedback: string }) => {
    set({ isLoading: true, error: null });
    try {
      await assignmentService.gradeSubmission(submissionId, data);
      // We don't necessarily need to re-fetch all submissions, just update the one
      set((state) => ({
        currentSubmissions: state.currentSubmissions.map((s) =>
          s.id === submissionId ? { ...s, grade: data.grade, feedback: data.feedback, status: 'graded' as const } : s
        ),
        isLoading: false
      }));
    } catch (error: any) {
      set({ isLoading: false, error: error.message });
      throw error;
    }
  }
}));
