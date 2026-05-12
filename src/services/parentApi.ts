import {
  MOCK_PARENTS,
  MOCK_STUDENTS,
  MOCK_GRADES,
  MOCK_ATTENDANCE,
  MOCK_INSIGHTS,
  MOCK_ANALYTICS,
  MOCK_DASHBOARD_METRICS,
  MOCK_RECENT_ACTIVITIES,
  MOCK_GPA_TREND,
  MOCK_TOP_SUBJECTS,
  MOCK_ATTENDANCE_METRICS,
  MOCK_CALENDAR_EVENTS,
  MOCK_ACTION_NEEDED,
  MOCK_REPORT_METRICS,
  MOCK_AI_LEARNING_ANALYSIS,
  MOCK_DETAILED_SUBJECTS,
  MOCK_PARENT_PROFILE,
  MOCK_LINKED_STUDENTS,
  MOCK_NOTIFICATION_PREFS,
  MOCK_AI_TUTOR_SETTINGS,
  MOCK_UPCOMING_SCHEDULE
} from "../mock/parent.mock";
import type { Student, DashboardSummary } from "../types/parent";

const BASE_URL = 'https://ahmeddali.pythonanywhere.com/api/v1';

async function fetchWithAuth(url: string, options: RequestInit = {}) {
  // Use localStorage tokens (check both 'token' and 'access_token' depending on how auth is implemented)
  const userStr = localStorage.getItem('user');
  let token = null;
  if (userStr) {
    try {
      const user = JSON.parse(userStr);
      token = user.access || user.token;
    } catch (e) { }
  }
  if (!token) {
    token = localStorage.getItem('token') || localStorage.getItem('access_token');
  }

  const headers = new Headers(options.headers || {});
  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }
  headers.set('Content-Type', 'application/json');

  const response = await fetch(`${BASE_URL}${url}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    throw new Error(`API error: ${response.statusText}`);
  }

  return response.json();
}

class ParentApiService {
  async getStudents(parentId: string): Promise<Student[]> {
    try {
      // Try to fetch real data from backend
      const data = await fetchWithAuth('/auth/profile/');

      // Attempt to map backend response. Assumes backend returns a `children` array or similar.
      const children = data.children || data.students || data.linked_students;

      if (children && Array.isArray(children) && children.length > 0) {
        return children.map((child: any) => ({
          id: String(child.id || child.student_id),
          name: child.name || `${child.first_name || ''} ${child.last_name || ''}`.trim() || child.username || "Student",
          gradeLevel: child.grade_level || child.grade || 0,
          avatar: child.profile_picture || `https://api.dicebear.com/7.x/avataaars/svg?seed=${child.username || child.name || 'Student'}`
        }));
      }
    } catch (e) {
      console.warn("Failed to fetch live students, falling back to mock", e);
    }

    // Fallback to mock data
    return new Promise((resolve) => {
      setTimeout(() => {
        const parent = MOCK_PARENTS.find(p => p.id === parentId) || MOCK_PARENTS[0];
        const students = MOCK_STUDENTS.filter(s => parent.studentIds.includes(s.id));
        resolve(students);
      }, 500);
    });
  }

  async getDashboardSummary(studentId: string): Promise<DashboardSummary | null> {
    try {
      // Try to fetch real dashboard summary
      const data = await fetchWithAuth(`/parent/dashboard/${studentId}/`);

      // If the backend returns a successful dashboard summary, map it.
      // We will merge it with mock data to ensure the UI doesn't break if some fields are missing.
      if (data && Object.keys(data).length > 0) {
        console.log("Live dashboard data received:", data);

        // This is a naive mapping. A full mapping would require knowing the exact backend schema.
        // We will return the merged data.
        return {
          student: data.student || MOCK_STUDENTS.find(s => s.id === studentId) || MOCK_STUDENTS[0],
          grades: data.grades || MOCK_GRADES.filter(g => g.studentId === studentId),
          attendanceRate: data.attendanceRate || data.attendance_rate || 100,
          attendanceRecords: data.attendanceRecords || data.attendance_records || MOCK_ATTENDANCE.filter(a => a.studentId === studentId),
          latestInsight: data.latestInsight || data.latest_insight || MOCK_INSIGHTS.find(i => i.studentId === studentId) || null,
          analyticsData: data.analyticsData || data.analytics_data || MOCK_ANALYTICS[studentId] || null,
          metrics: data.metrics || MOCK_DASHBOARD_METRICS[studentId],
          recentActivities: data.recentActivities || data.recent_activities || MOCK_RECENT_ACTIVITIES[studentId] || [],
          gpaTrend: data.gpaTrend || data.gpa_trend || MOCK_GPA_TREND[studentId] || [],
          topSubjects: data.topSubjects || data.top_subjects || MOCK_TOP_SUBJECTS[studentId] || [],
          upcomingSchedule: data.upcomingSchedule || data.upcoming_schedule || MOCK_UPCOMING_SCHEDULE[studentId] || [],
          attendanceMetrics: data.attendanceMetrics || data.attendance_metrics || MOCK_ATTENDANCE_METRICS[studentId],
          calendarEvents: data.calendarEvents || data.calendar_events || MOCK_CALENDAR_EVENTS[studentId] || [],
          actionNeeded: data.actionNeeded || data.action_needed || MOCK_ACTION_NEEDED[studentId],
          reportMetrics: data.reportMetrics || data.report_metrics || MOCK_REPORT_METRICS[studentId],
          aiLearningAnalysis: data.aiLearningAnalysis || data.ai_learning_analysis || MOCK_AI_LEARNING_ANALYSIS[studentId],
          detailedSubjects: data.detailedSubjects || data.detailed_subjects || MOCK_DETAILED_SUBJECTS[studentId] || [],
          parentProfile: data.parentProfile || data.parent_profile || MOCK_PARENT_PROFILE,
          linkedStudents: data.linkedStudents || data.linked_students || MOCK_LINKED_STUDENTS,
          notificationPrefs: data.notificationPrefs || data.notification_prefs || MOCK_NOTIFICATION_PREFS,
          aiTutorSettings: data.aiTutorSettings || data.ai_tutor_settings || MOCK_AI_TUTOR_SETTINGS
        };
      }
    } catch (e) {
      console.warn("Failed to fetch live dashboard summary, falling back to mock", e);
    }

    // Fallback to mock data
    return new Promise((resolve) => {
      setTimeout(() => {
        const student = MOCK_STUDENTS.find(s => s.id === studentId);
        if (!student) return resolve(null);

        const grades = MOCK_GRADES.filter(g => g.studentId === studentId);
        const attendanceRecords = MOCK_ATTENDANCE.filter(a => a.studentId === studentId);
        const latestInsight = MOCK_INSIGHTS.find(i => i.studentId === studentId) || null;

        const presentCount = attendanceRecords.filter(a => a.status === 'Present').length;
        const totalRecords = attendanceRecords.length;
        const attendanceRate = totalRecords > 0 ? (presentCount / totalRecords) * 100 : 0;
        const analyticsData = MOCK_ANALYTICS[studentId] || null;

        const metrics = MOCK_DASHBOARD_METRICS[studentId];
        const recentActivities = MOCK_RECENT_ACTIVITIES[studentId] || [];
        const gpaTrend = MOCK_GPA_TREND[studentId] || [];
        const topSubjects = MOCK_TOP_SUBJECTS[studentId] || [];
        const upcomingSchedule = MOCK_UPCOMING_SCHEDULE[studentId] || [];

        const attendanceMetrics = MOCK_ATTENDANCE_METRICS[studentId];
        const calendarEvents = MOCK_CALENDAR_EVENTS[studentId] || [];
        const actionNeeded = MOCK_ACTION_NEEDED[studentId];

        const reportMetrics = MOCK_REPORT_METRICS[studentId];
        const aiLearningAnalysis = MOCK_AI_LEARNING_ANALYSIS[studentId];
        const detailedSubjects = MOCK_DETAILED_SUBJECTS[studentId] || [];

        const parentProfile = MOCK_PARENT_PROFILE;
        const linkedStudents = MOCK_LINKED_STUDENTS;
        const notificationPrefs = MOCK_NOTIFICATION_PREFS;
        const aiTutorSettings = MOCK_AI_TUTOR_SETTINGS;

        resolve({
          student,
          grades,
          attendanceRate,
          attendanceRecords,
          latestInsight,
          analyticsData,
          metrics,
          recentActivities,
          gpaTrend,
          topSubjects,
          upcomingSchedule,
          attendanceMetrics,
          calendarEvents,
          actionNeeded,
          reportMetrics,
          aiLearningAnalysis,
          detailedSubjects,
          parentProfile,
          linkedStudents,
          notificationPrefs,
          aiTutorSettings
        });
      }, 500);
    });
  }

  async getReports(studentId: string): Promise<any[]> {
    try {
      const data = await fetchWithAuth(`/parent/reports/${studentId}/`);
      if (data && Array.isArray(data)) {
        return data;
      } else if (data && data.reports) {
        return data.reports;
      }
    } catch (e) {
      console.warn("Failed to fetch live reports, falling back to mock", e);
    }

    // Placeholder for reports functionality
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([]);
      }, 500);
    });
  }
}

export const parentApi = new ParentApiService();
