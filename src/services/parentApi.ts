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
import type { Student, DashboardSummary, ParentLinkRequest } from "../types/parent";

const BASE_URL = 'https://ahmeddali.pythonanywhere.com/api/v1';

async function fetchWithAuth(url: string, options: RequestInit = {}) {
  const userStr = localStorage.getItem('user');
  let token = null;
  if (userStr) {
    try {
      const user = JSON.parse(userStr);
      token = user.access || user.token;
    } catch (e) { }
  }
  if (!token) {
    const authTokensStr = localStorage.getItem('auth_tokens');
    if (authTokensStr) {
      try {
        const tokens = JSON.parse(authTokensStr);
        token = tokens.access;
      } catch (e) { }
    }
  }
  if (!token) {
    token = localStorage.getItem('token') || localStorage.getItem('access_token');
  }

  const headers = new Headers(options.headers || {});
  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }
  if (!headers.has('Content-Type') && !(options.body instanceof FormData)) {
    headers.set('Content-Type', 'application/json');
  }

  const response = await fetch(`${BASE_URL}${url}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    let errorDetail = response.statusText;
    try {
      const errJson = await response.json();
      errorDetail = errJson.detail || errJson.message || JSON.stringify(errJson);
    } catch (e) { }
    throw new Error(errorDetail || `API error: ${response.status}`);
  }

  // Handle empty responses safely
  const contentType = response.headers.get('content-type');
  if (contentType && contentType.includes('application/json')) {
    const text = await response.text();
    return text ? JSON.parse(text) : {};
  }
  return {};
}


class ParentApiService {
  async getStudents(parentId: string): Promise<Student[]> {
    try {
      const data = await fetchWithAuth('/parent/students/');
      if (data && Array.isArray(data) && data.length > 0) {
        return data.map((child: any) => ({
          id: String(child.id || child.student_id || child.studentId),
          name: child.full_name || child.name || "Student",
          gradeLevel: child.grade_name || child.grade || 0,
          avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${child.full_name || 'Student'}`
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
    const student = MOCK_STUDENTS.find(s => s.id === studentId) || MOCK_STUDENTS[0];
    const fallback: DashboardSummary = {
      student,
      grades: MOCK_GRADES.filter(g => g.studentId === studentId),
      attendanceRate: 100,
      attendanceRecords: MOCK_ATTENDANCE.filter(a => a.studentId === studentId),
      latestInsight: MOCK_INSIGHTS.find(i => i.studentId === studentId) || null,
      analyticsData: MOCK_ANALYTICS[studentId] || null,
      metrics: MOCK_DASHBOARD_METRICS[studentId],
      recentActivities: MOCK_RECENT_ACTIVITIES[studentId] || [],
      gpaTrend: MOCK_GPA_TREND[studentId] || [],
      topSubjects: MOCK_TOP_SUBJECTS[studentId] || [],
      upcomingSchedule: MOCK_UPCOMING_SCHEDULE[studentId] || [],
      attendanceMetrics: MOCK_ATTENDANCE_METRICS[studentId],
      calendarEvents: MOCK_CALENDAR_EVENTS[studentId] || [],
      actionNeeded: MOCK_ACTION_NEEDED[studentId],
      reportMetrics: MOCK_REPORT_METRICS[studentId],
      aiLearningAnalysis: MOCK_AI_LEARNING_ANALYSIS[studentId],
      detailedSubjects: MOCK_DETAILED_SUBJECTS[studentId] || [],
      parentProfile: MOCK_PARENT_PROFILE,
      linkedStudents: MOCK_LINKED_STUDENTS,
      notificationPrefs: MOCK_NOTIFICATION_PREFS,
      aiTutorSettings: MOCK_AI_TUTOR_SETTINGS
    };

    try {
      const data = await fetchWithAuth(`/parent/dashboard/${studentId}/`);
      if (data && Object.keys(data).length > 0) {
        console.log("Live dashboard data received:", data);

        const liveMetrics = {
          gpa: {
            value: data.gpa?.value ?? fallback.metrics?.gpa?.value ?? 0,
            changePercentage: data.gpa?.change ?? fallback.metrics?.gpa?.changePercentage ?? 0,
            trend: fallback.metrics?.gpa?.trend ?? "Stable"
          },
          studyHours: {
            value: data.study_hours?.total ?? fallback.metrics?.studyHours?.value ?? 0,
            changeLabel: fallback.metrics?.studyHours?.changeLabel ?? "",
            trend: fallback.metrics?.studyHours?.trend ?? "Stable"
          },
          studentXp: {
            value: data.xp?.total ?? fallback.metrics?.studentXp?.value ?? 0,
            changeLabel: fallback.metrics?.studentXp?.changeLabel ?? "",
            trend: fallback.metrics?.studentXp?.trend ?? "Stable"
          }
        };

        const liveRecentActivities = (data.recent_activity && data.recent_activity.length > 0) ? data.recent_activity.map((a: any, i: number) => ({
          id: `ra-${i}`,
          type: a.type === 'submission' ? 'Completed' : 'Started',
          title: a.title,
          subtitle: a.timestamp ? new Date(a.timestamp).toLocaleDateString() : "",
          timeAgo: "Recently"
        })) : fallback.recentActivities;

        const liveTopSubjects = (data.subject_performance && data.subject_performance.length > 0) ? data.subject_performance.slice(0, 3).map((s: any, i: number) => ({
          id: `sub-${i}`,
          name: s.name,
          grade: s.average,
          letterGrade: s.grade,
          status: 'Good'
        })) : fallback.topSubjects;

        const liveUpcomingSchedule = (data.upcoming_schedule && data.upcoming_schedule.length > 0) ? data.upcoming_schedule.map((u: any, i: number) => ({
          id: `us-${i}`,
          date: u.date || "",
          subject: u.subject || "",
          type: u.type || "Assignment",
          title: u.title || "",
          status: "Upcoming"
        })) : fallback.upcomingSchedule;

        return {
          ...fallback,
          student: { ...fallback.student, id: String(studentId) },
          metrics: liveMetrics,
          recentActivities: liveRecentActivities,
          topSubjects: liveTopSubjects,
          upcomingSchedule: liveUpcomingSchedule
        };
      }
    } catch (e) {
      console.warn("Failed to fetch live dashboard summary, falling back to mock", e);
    }

    return {
      ...fallback,
      student: { ...fallback.student, id: String(studentId) }
    };
  }

  async getAnalytics(studentId: string): Promise<any> {
    const fallback = MOCK_ANALYTICS[studentId] || MOCK_ANALYTICS["s1"];
    try {
      const liveAnalytics = await fetchWithAuth(`/parent/analytics/${studentId}/`);
      if (liveAnalytics) {
        let totalStudyHours = fallback.totalStudyHours;
        if (Array.isArray(liveAnalytics.study_hours)) {
          totalStudyHours = {
            hours: Math.floor(liveAnalytics.study_hours.reduce((acc: number, val: any) => acc + (val.hours || 0), 0)),
            minutes: Math.floor((liveAnalytics.study_hours.reduce((acc: number, val: any) => acc + (val.hours || 0), 0) % 1) * 60),
            changeLabel: fallback.totalStudyHours.changeLabel
          };
        } else if (typeof liveAnalytics.study_hours === 'object' && liveAnalytics.study_hours !== null) {
          totalStudyHours = {
            hours: liveAnalytics.study_hours.total || liveAnalytics.study_hours.hours || fallback.totalStudyHours.hours,
            minutes: liveAnalytics.study_hours.minutes || fallback.totalStudyHours.minutes,
            changeLabel: fallback.totalStudyHours.changeLabel
          };
        } else if (typeof liveAnalytics.study_hours === 'number') {
          totalStudyHours = {
            hours: Math.floor(liveAnalytics.study_hours),
            minutes: Math.floor((liveAnalytics.study_hours % 1) * 60),
            changeLabel: fallback.totalStudyHours.changeLabel
          };
        }

        let subjectBreakdown = fallback.subjectBreakdown;
        if (Array.isArray(liveAnalytics.subject_breakdown)) {
          subjectBreakdown = liveAnalytics.subject_breakdown.map((sub: any, idx: number) => ({
            id: String(idx + 1),
            name: sub.subject_name || sub.name || "Unknown",
            grade: typeof sub.average === 'number' ? sub.average : (sub.grade || 0),
            percentageChange: sub.percentage_change || sub.percentageChange || 0,
            status: sub.status || "On Track",
            upcomingEvent: sub.upcoming_event || sub.upcomingEvent || ""
          }));
        }

        let weeklyTrend = fallback.weeklyTrend;
        let monthlyTrend = fallback.monthlyTrend;
        let averageGrade = fallback.averageGrade;
        let changePercentage = fallback.changePercentage;

        if (liveAnalytics.overall_academic_trend && typeof liveAnalytics.overall_academic_trend === 'object') {
          const trendObj = liveAnalytics.overall_academic_trend;
          
          if (typeof trendObj.average === 'number') averageGrade = trendObj.average;
          if (typeof trendObj.change === 'number') changePercentage = trendObj.change;
          
          if (Array.isArray(trendObj.weekly) && trendObj.weekly.length > 0) {
            weeklyTrend = trendObj.weekly.map((item: any) => ({
              label: item.period || "Week",
              value: typeof item.average === 'number' ? item.average : 0
            }));
          }
          
          if (Array.isArray(trendObj.monthly) && trendObj.monthly.length > 0) {
            monthlyTrend = trendObj.monthly.map((item: any) => ({
              label: item.period || "Month",
              value: typeof item.average === 'number' ? item.average : 0
            }));
          }
        }

        return {
          ...fallback,
          averageGrade,
          changePercentage,
          weeklyTrend,
          monthlyTrend,
          totalStudyHours,
          subjectBreakdown
        };
      }
    } catch (e) {
      console.warn("Failed to fetch live analytics, falling back to mock", e);
    }
    return fallback;
  }

  async getAttendance(studentId: string): Promise<any> {
    const fallback = {
      attendanceRate: 100,
      attendanceMetrics: MOCK_ATTENDANCE_METRICS[studentId] || MOCK_ATTENDANCE_METRICS["s1"],
      calendarEvents: MOCK_CALENDAR_EVENTS[studentId] || MOCK_CALENDAR_EVENTS["s1"],
      actionNeeded: MOCK_ACTION_NEEDED[studentId] || MOCK_ACTION_NEEDED["s1"],
      recentActivities: []
    };
    try {
      const liveAttendance = await fetchWithAuth(`/parent/attendance/${studentId}/`);
      if (liveAttendance) {
        const attendanceMetrics = {
          totalStudyHours: {
            ...fallback.attendanceMetrics.totalStudyHours,
            value: (liveAttendance.total_study_hours && typeof liveAttendance.total_study_hours === 'object') 
                   ? liveAttendance.total_study_hours.total 
                   : (liveAttendance.total_study_hours || fallback.attendanceMetrics.totalStudyHours.value),
            changeLabel: (liveAttendance.total_study_hours && typeof liveAttendance.total_study_hours === 'object' && liveAttendance.total_study_hours.change)
                   ? `${liveAttendance.total_study_hours.change >= 0 ? '+' : ''}${liveAttendance.total_study_hours.change}%` 
                   : fallback.attendanceMetrics.totalStudyHours.changeLabel
          },
          studyStreak: {
            ...fallback.attendanceMetrics.studyStreak,
            days: (liveAttendance.study_streak && typeof liveAttendance.study_streak === 'object')
                  ? liveAttendance.study_streak.total
                  : (liveAttendance.study_streak || fallback.attendanceMetrics.studyStreak.days)
          },
          attendanceRate: {
            ...fallback.attendanceMetrics.attendanceRate,
            value: (liveAttendance.attendance_rate && typeof liveAttendance.attendance_rate === 'object')
                   ? liveAttendance.attendance_rate.total
                   : (liveAttendance.attendance_rate || fallback.attendanceMetrics.attendanceRate.value)
          }
        };
        let calendarEvents = fallback.calendarEvents;
        const cal = liveAttendance.activity_calendar || liveAttendance.activityCalendar;
        if (Array.isArray(cal)) {
          calendarEvents = cal.map((day: any) => ({
            date: day.date,
            status: day.status === 'present' ? 'Completed' : day.status === 'absent' ? 'Missed' : 'Late',
            type: day.status === 'present' ? 'Session' : 'Activity',
            duration: day.duration || ""
          }));
        }

        let recentActivities: any[] = [];
        if (Array.isArray(liveAttendance.recent_activity)) {
          recentActivities = liveAttendance.recent_activity.map((a: any, i: number) => ({
            id: `ra-${i}`,
            title: a.title || "Activity",
            date: a.timestamp ? new Date(a.timestamp).toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }) : "Recently",
            type: a.type || "submission"
          }));
        }

        return {
          attendanceRate: (liveAttendance.attendance_rate && typeof liveAttendance.attendance_rate === 'object') 
                          ? liveAttendance.attendance_rate.total 
                          : (liveAttendance.attendance_rate ?? fallback.attendanceRate),
          attendanceMetrics,
          calendarEvents,
          actionNeeded: fallback.actionNeeded,
          recentActivities
        };
      }
    } catch (e) {
      console.warn("Failed to fetch live attendance, falling back to mock", e);
    }
    return fallback;
  }

  async getSettings(): Promise<any> {
    const fallback = {
      parentProfile: MOCK_PARENT_PROFILE,
      linkedStudents: MOCK_LINKED_STUDENTS,
      notificationPrefs: MOCK_NOTIFICATION_PREFS,
      aiTutorSettings: MOCK_AI_TUTOR_SETTINGS
    };
    try {
      const liveSettings = await fetchWithAuth('/parent/settings/');
      if (liveSettings) {
        return {
          parentProfile: {
            fullName: liveSettings.full_name || liveSettings.name || fallback.parentProfile.fullName,
            email: liveSettings.email || fallback.parentProfile.email,
            phone: fallback.parentProfile.phone
          },
          linkedStudents: (liveSettings.linked_students || liveSettings.linkedStudents || []).map((student: any) => ({
            id: String(student.id || student.student_id),
            name: student.full_name || student.name || "",
            grade: student.grade_name || student.grade || 0,
            school: student.school_name || ""
          })),
          notificationPrefs: {
            emailSummaries: liveSettings.notifications_enabled !== undefined ? liveSettings.notifications_enabled : fallback.notificationPrefs.emailSummaries,
            realtimeAlerts: fallback.notificationPrefs.realtimeAlerts,
            aiRecommendations: fallback.notificationPrefs.aiRecommendations
          },
          aiTutorSettings: fallback.aiTutorSettings
        };
      }
    } catch (e) {
      console.warn("Failed to fetch live settings, falling back to mock", e);
    }
    return fallback;
  }

  async getReports(studentId: string): Promise<any[]> {
    try {
      const data = await fetchWithAuth(`/parent/report/${studentId}/?month=2026-05`);
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

  async getReportsData(studentId: string): Promise<any> {
    const fallback = {
      reportMetrics: MOCK_REPORT_METRICS[studentId] || MOCK_REPORT_METRICS["s1"],
      aiLearningAnalysis: MOCK_AI_LEARNING_ANALYSIS[studentId] || MOCK_AI_LEARNING_ANALYSIS["s1"],
      detailedSubjects: MOCK_DETAILED_SUBJECTS[studentId] || MOCK_DETAILED_SUBJECTS["s1"]
    };
    try {
      const liveReport = await fetchWithAuth(`/parent/report/${studentId}/?month=2026-05`);
      if (liveReport) {
        // Map overall_average (nested object)
        const overallAvg = liveReport.overall_average;
        const attendance = liveReport.attendance;
        const assignmentSummary = liveReport.assignment_summary;

        const reportMetrics = {
          overallAverage: {
            percentage: Math.round(
              (overallAvg && typeof overallAvg === 'object' ? overallAvg.total : overallAvg) 
              ?? fallback.reportMetrics.overallAverage.percentage
            ),
            grade: (overallAvg && typeof overallAvg === 'object' ? overallAvg.grade : null) 
                   ?? fallback.reportMetrics.overallAverage.grade,
            change: (overallAvg && typeof overallAvg === 'object' ? overallAvg.change : 0) 
                    ?? fallback.reportMetrics.overallAverage.change
          },
          assignments: {
            total: (assignmentSummary && typeof assignmentSummary === 'object' ? assignmentSummary.submitted : 0) 
                   ?? fallback.reportMetrics.assignments.total,
            lateSubmission: (assignmentSummary && typeof assignmentSummary === 'object' ? assignmentSummary.missing : 0) 
                            ?? fallback.reportMetrics.assignments.lateSubmission
          },
          attendance: {
            percentage: Math.round(
              (attendance && typeof attendance === 'object' ? attendance.total : attendance) 
              ?? fallback.reportMetrics.attendance.percentage
            ),
            perfectStreakDays: (attendance && typeof attendance === 'object' ? attendance.streak : 0) 
                               ?? fallback.reportMetrics.attendance.perfectStreakDays
          }
        };

        // Map subject_performance array
        let detailedSubjects = fallback.detailedSubjects;
        if (Array.isArray(liveReport.subject_performance) && liveReport.subject_performance.length > 0) {
          detailedSubjects = liveReport.subject_performance.map((s: any, i: number) => {
            // Parse submissions like "3/5" into numbers
            const parts = typeof s.submissions === 'string' ? s.submissions.split('/') : ['0', '0'];
            return {
              id: `sub-${i}`,
              name: s.name || "Unknown",
              score: typeof s.total_percent === 'number' ? Math.round(s.total_percent) : 0,
              trend: typeof s.change === 'number' ? s.change : 0,
              grade: s.grade || "N/A",
              assignmentsCompleted: parseInt(parts[0]) || 0,
              assignmentsTotal: parseInt(parts[1]) || 0,
              labsAvg: typeof s.total_percent === 'number' ? Math.round(s.total_percent) : 0
            };
          });
        }

        return { reportMetrics, aiLearningAnalysis: fallback.aiLearningAnalysis, detailedSubjects };
      }
    } catch (e) {
      console.warn("Failed to fetch live report data, falling back to mock", e);
    }
    return fallback;
  }

  async addStudent(request: ParentLinkRequest): Promise<any> {
    return fetchWithAuth('/parent/add-student/', {
      method: 'POST',
      body: JSON.stringify(request)
    });
  }

  async updateSettings(fullName: string, notificationsEnabled: boolean): Promise<any> {
    return fetchWithAuth('/parent/settings/', {
      method: 'PATCH',
      body: JSON.stringify({
        full_name: fullName,
        notifications_enabled: notificationsEnabled
      })
    });
  }
}

export const parentApi = new ParentApiService();
