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
  MOCK_AI_TUTOR_SETTINGS
} from "../mock/parent.mock";
import type { Student, DashboardSummary } from "../types/parent";

class ParentApiService {
  async getStudents(parentId: string): Promise<Student[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const parent = MOCK_PARENTS.find(p => p.id === parentId);
        if (!parent) return resolve([]);
        const students = MOCK_STUDENTS.filter(s => parent.studentIds.includes(s.id));
        resolve(students);
      }, 500);
    });
  }

  async getDashboardSummary(studentId: string): Promise<DashboardSummary | null> {
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

  async getReports(_studentId: string): Promise<any[]> {
    // Placeholder for reports functionality
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([]);
      }, 500);
    });
  }
}

export const parentApi = new ParentApiService();
