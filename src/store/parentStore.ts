import { create } from "zustand";
import type { Student, DashboardSummary, ParentLinkRequest } from "../types/parent";
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
  linkStudent: (request: ParentLinkRequest) => Promise<boolean>;
  updateSettings: (fullName: string, notificationsEnabled: boolean) => Promise<boolean>;
  fetchAnalytics: (studentId: string) => Promise<void>;
  fetchAttendance: (studentId: string) => Promise<void>;
  fetchSettings: () => Promise<void>;
  fetchReports: (studentId: string) => Promise<void>;
}

export const useParentStore = create<ParentState>((set, get) => ({
  students: [],
  selectedStudentId: null,
  dashboardSummary: null,
  loading: true, // Start with loading true
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

  linkStudent: async (request: ParentLinkRequest) => {
    set({ loading: true, error: null });
    try {
      await parentApi.addStudent(request);
      // Roster might have updated, fetch students again (use "p1" or ignore as token is used)
      const students = await parentApi.getStudents("p1");
      set({ students, loading: false });
      return true;
    } catch (err: any) {
      set({ error: err.message || "Failed to link student", loading: false });
      throw err;
    }
  },

  updateSettings: async (fullName: string, notificationsEnabled: boolean) => {
    set({ loading: true, error: null });
    try {
      await parentApi.updateSettings(fullName, notificationsEnabled);
      const currentStudentId = get().selectedStudentId;
      if (currentStudentId) {
        await get().fetchDashboardSummary(currentStudentId);
      }
      set({ loading: false });
      return true;
    } catch (err: any) {
      set({ error: err.message || "Failed to update settings", loading: false });
      return false;
    }
  },

  fetchAnalytics: async (studentId: string) => {
    try {
      const analytics = await parentApi.getAnalytics(studentId);
      set((state) => ({
        dashboardSummary: state.dashboardSummary ? {
          ...state.dashboardSummary,
          analyticsData: analytics
        } : null
      }));
    } catch (err) {
      console.warn("Failed to fetch analytics live", err);
    }
  },

  fetchAttendance: async (studentId: string) => {
    try {
      const attendance = await parentApi.getAttendance(studentId);
      set((state) => ({
        dashboardSummary: state.dashboardSummary ? {
          ...state.dashboardSummary,
          attendanceRate: attendance.attendanceRate,
          attendanceMetrics: attendance.attendanceMetrics,
          calendarEvents: attendance.calendarEvents,
          actionNeeded: attendance.actionNeeded,
          recentActivities: attendance.recentActivities?.length > 0 ? attendance.recentActivities : state.dashboardSummary.recentActivities
        } : null
      }));
    } catch (err) {
      console.warn("Failed to fetch attendance live", err);
    }
  },

  fetchSettings: async () => {
    try {
      const settings = await parentApi.getSettings();
      set((state) => ({
        dashboardSummary: state.dashboardSummary ? {
          ...state.dashboardSummary,
          parentProfile: settings.parentProfile,
          linkedStudents: settings.linkedStudents,
          notificationPrefs: settings.notificationPrefs,
          aiTutorSettings: settings.aiTutorSettings
        } : null
      }));
    } catch (err) {
      console.warn("Failed to fetch settings live", err);
    }
  },

  fetchReports: async (studentId: string) => {
    try {
      const reports = await parentApi.getReportsData(studentId);
      set((state) => ({
        dashboardSummary: state.dashboardSummary ? {
          ...state.dashboardSummary,
          reportMetrics: reports.reportMetrics,
          aiLearningAnalysis: reports.aiLearningAnalysis,
          detailedSubjects: reports.detailedSubjects
        } : null
      }));
    } catch (err) {
      console.warn("Failed to fetch reports live", err);
    }
  },
}));

