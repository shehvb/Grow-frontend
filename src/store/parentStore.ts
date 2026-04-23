import { create } from "zustand";
import type { Student, DashboardSummary } from "../types/parent";
import { parentApi } from "../services/parentApi";

interface ParentState {
  students: Student[];
  selectedStudentId: string | null;
  dashboardSummary: DashboardSummary | null;
  loading: boolean;
  error: string | null;

  // Actions
  fetchStudents: (parentId: string) => Promise<void>;
  selectStudent: (studentId: string) => Promise<void>;
  fetchDashboardSummary: (studentId: string) => Promise<void>;
}

export const useParentStore = create<ParentState>((set, get) => ({
  students: [],
  selectedStudentId: null,
  dashboardSummary: null,
  loading: false,
  error: null,

  fetchStudents: async (parentId: string) => {
    set({ loading: true, error: null });
    try {
      const students = await parentApi.getStudents(parentId);
      set({ students, loading: false });
      
      // Select the first student by default if none selected
      if (students.length > 0 && !get().selectedStudentId) {
        get().selectStudent(students[0].id);
      }
    } catch (err) {
      set({ error: "Failed to fetch students", loading: false });
    }
  },

  selectStudent: async (studentId: string) => {
    set({ selectedStudentId: studentId });
    await get().fetchDashboardSummary(studentId);
  },

  fetchDashboardSummary: async (studentId: string) => {
    set({ loading: true, error: null });
    try {
      const summary = await parentApi.getDashboardSummary(studentId);
      set({ dashboardSummary: summary, loading: false });
    } catch (err) {
      set({ error: "Failed to fetch dashboard summary", loading: false });
    }
  },
}));
