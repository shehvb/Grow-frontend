import { create } from 'zustand';
import { studentService as teacherStudentService, type EnrolledStudent } from '../services/studentService';
import { studentService as studentPortalService } from '../features/student/services/student.service';
import type { StudentDashboard } from '../types/student';

interface StudentState {
  teacherStudents: EnrolledStudent[];
  dashboard: StudentDashboard | null;
  tasks: any[];
  summaryBar: { current_streak: number; total_xp_today: number; daily_master_percentage: number } | null;
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
  summaryBar: null,
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
      const data = await studentPortalService.getTasks() as any;
      let tasksArray: any[] = [];
      let summaryBarData: any = null;

      if (data) {
        if (Array.isArray(data)) {
          tasksArray = data;
        } else {
          // Object with past_due and todays_missions
          const pastDue = (data.past_due || []).map((t: any, idx: number) => ({
            ...t,
            id: t.id || `past_${idx}`,
            title: t.title || "Past Due Task",
            context: t.subject || "No Subject",
            xp: t.xp_reward || 100,
            checked: t.is_completed || false,
            status: 'overdue',
            category: 'overdue'
          }));

          const todaysMissions = (data.todays_missions || []).map((t: any, idx: number) => ({
            ...t,
            id: t.id || `today_${idx}`,
            title: t.title || "Today's Mission",
            context: t.subject || "No Subject",
            xp: t.xp_reward || 100,
            checked: t.is_completed || false,
            isBlue: true,
            status: 'today',
            category: 'today'
          }));

          tasksArray = [...pastDue, ...todaysMissions];
          summaryBarData = data.summary_bar || null;
        }
      }

      set({ tasks: tasksArray, summaryBar: summaryBarData, isLoading: false, error: null });
    } catch (error: any) {
      set({
        isLoading: false,
        error: error.response?.data?.detail || error.message || 'Failed to fetch tasks.'
      });
    }
  },

  clearDashboard: () => {
    set({ dashboard: null, tasks: [], summaryBar: null, error: null });
  }
}));
