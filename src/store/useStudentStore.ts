import { create } from 'zustand';
import { studentService as teacherStudentService, type EnrolledStudent } from '../services/studentService';
import { studentService as studentPortalService } from '../features/student/services/student.service';
import type { StudentDashboard } from '../types/student';

interface StudentState {
  teacherStudents: EnrolledStudent[];
  dashboard: StudentDashboard | null;
  tasks: any[];
  isLoading: boolean;
  error: string | null;

  fetchTeacherStudents: () => Promise<void>;
  fetchDashboardData: () => Promise<void>;
  fetchTasks: () => Promise<void>;
  clearDashboard: () => void;
}

export const useStudentStore = create<StudentState>((set) => ({
  teacherStudents: [],
  dashboard: null,
  tasks: [],
  isLoading: false,
  error: null,

  fetchTeacherStudents: async () => {
    set({ isLoading: true, error: null });
    try {
      const students = await teacherStudentService.getTeacherStudents();
      set({ teacherStudents: students, isLoading: false });
    } catch (error: any) {
      set({ isLoading: false, error: error.message });
    }
  },

  fetchDashboardData: async () => {
    set({ isLoading: true, error: null });
    try {
      const data = await studentPortalService.getDashboardData();
      set({ dashboard: data, isLoading: false, error: null });
    } catch (error: any) {
      set({ 
        isLoading: false, 
        error: error.response?.data?.detail || error.message || 'Failed to fetch dashboard data.' 
      });
    }
  },

  fetchTasks: async () => {
    set({ isLoading: true, error: null });
    try {
      const data = await studentPortalService.getTasks();
      // Ensure data is an array (handle DRF pagination if present)
      const tasksArray = Array.isArray(data) ? data : (data as any).results || [];
      set({ tasks: tasksArray, isLoading: false, error: null });
    } catch (error: any) {
      set({
        isLoading: false,
        error: error.response?.data?.detail || error.message || 'Failed to fetch tasks.'
      });
    }
  },

  clearDashboard: () => {
    set({ dashboard: null, tasks: [], error: null });
  }
}));
