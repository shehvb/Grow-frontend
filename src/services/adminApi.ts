/**
 * Admin Dashboard API Service
 * Connects to backend endpoints:
 *   GET /api/v1/dashboard/overview/      → KPIs, alerts, charts
 *   GET /api/v1/dashboard/classes/       → Class list with health metrics
 *   GET /api/v1/dashboard/classes/:id/   → Class detail (leaderboard, teachers, distribution)
 *   POST /api/v1/dashboard/insights/:id/dismiss/ → Dismiss an alert
 */

import type {
  SchoolKPIs,
  Alert,
  ClassSummary,
  Student,
  Teacher,
} from "../features/admin/admin.mock";
import {
  mockSchoolKPIs,
  mockGlobalAlerts,
  mockClassSummaries,
  mockClass9AStudents,
  mockClass9AAlerts,
  mockClass9ATeachers,
} from "../features/admin/admin.mock";

const BASE_URL = "https://ahmeddali.pythonanywhere.com/api/v1";

async function fetchWithAuth(url: string, options: RequestInit = {}) {
  let token: string | null = null;

  // Try auth_tokens first (used by unified login flow)
  const tokensStr = localStorage.getItem('auth_tokens');
  if (tokensStr) {
    try {
      const tokens = JSON.parse(tokensStr);
      token = tokens.access || null;
    } catch { /* ignore */ }
  }

  // Fallback to legacy keys
  if (!token) {
    const userStr = localStorage.getItem("user");
    if (userStr) {
      try {
        const parsed = JSON.parse(userStr);
        token = parsed.access || parsed.token || null;
      } catch {
        /* ignore */
      }
    }
  }

  if (!token) {
    token = localStorage.getItem("access_token");
  }

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string>),
  };
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const res = await fetch(`${BASE_URL}${url}`, { ...options, headers });
  if (!res.ok) {
    console.warn(`Admin API ${url} returned ${res.status}`);
    return null;
  }
  return res.json();
}

// ──────────────────────────────────────────────
//  Dashboard Overview  →  KPIs + Alerts
// ──────────────────────────────────────────────
export async function fetchDashboardOverview(): Promise<{
  kpis: SchoolKPIs;
  alerts: Alert[];
}> {
  const fallback = { kpis: mockSchoolKPIs, alerts: mockGlobalAlerts };

  try {
    const data = await fetchWithAuth("/dashboard/overview/");
    if (!data) return fallback;

    // --- Map KPIs ---
    const rawKpis = data.kpis || {};
    const kpis: SchoolKPIs = {
      totalStudents:
        rawKpis.total_students ?? rawKpis.totalStudents ?? fallback.kpis.totalStudents,
      studentGrowthPercent:
        rawKpis.student_growth_percent ??
        rawKpis.studentGrowthPercent ??
        fallback.kpis.studentGrowthPercent,
      totalTeachers:
        rawKpis.total_teachers ?? rawKpis.totalTeachers ?? fallback.kpis.totalTeachers,
      newHires: rawKpis.new_hires ?? rawKpis.newHires ?? fallback.kpis.newHires,
      totalClasses:
        rawKpis.total_classes ?? rawKpis.totalClasses ?? fallback.kpis.totalClasses,
      gradesSpanned:
        rawKpis.grades_spanned ?? rawKpis.gradesSpanned ?? fallback.kpis.gradesSpanned,
    };

    // --- Map Alerts ---
    let alerts: Alert[] = fallback.alerts;
    if (Array.isArray(data.alerts) && data.alerts.length > 0) {
      alerts = data.alerts.map((a: any, i: number) => ({
        id: String(a.id ?? `alert-${i}`),
        severity: a.severity === "critical" ? "critical" : "warning",
        message: a.description || a.message || a.title || "",
        context: a.title || a.insight_type || a.context || "System Alert",
        targetId: a.target_id ? String(a.target_id) : undefined,
      }));
    }

    return { kpis, alerts };
  } catch (e) {
    console.warn("Failed to fetch admin dashboard overview, using mock", e);
    return fallback;
  }
}

// ──────────────────────────────────────────────
//  Class List
// ──────────────────────────────────────────────
export async function fetchClassList(): Promise<ClassSummary[]> {
  try {
    const data = await fetchWithAuth("/dashboard/classes/");
    if (Array.isArray(data) && data.length > 0) {
      return data.map((c: any) => ({
        id: String(c.id),
        name: c.title || c.name || "Unnamed Class",
        studentCount: c.enrollment_count ?? c.studentCount ?? 0,
        teacherCount: c.teacher ? 1 : 0, // API returns single teacher object
        activeAlerts:
          c.health_status === "critical"
            ? 2
            : c.health_status === "warning"
            ? 1
            : undefined,
      }));
    }
  } catch (e) {
    console.warn("Failed to fetch class list, using mock", e);
  }
  return mockClassSummaries;
}

// ──────────────────────────────────────────────
//  Class Detail  →  leaderboard, teachers, stats
// ──────────────────────────────────────────────
export interface ClassDetailData {
  className: string;
  totalStudents: number;
  totalTeachers: number;
  activeStudents: number;
  topStudents: Student[];
  alerts: Alert[];
  teachers: Teacher[];
}

export async function fetchClassDetail(classId: string): Promise<ClassDetailData> {
  const fallback: ClassDetailData = {
    className: "Class 9A",
    totalStudents: 38,
    totalTeachers: 4,
    activeStudents: 7,
    topStudents: mockClass9AStudents,
    alerts: mockClass9AAlerts,
    teachers: mockClass9ATeachers,
  };

  try {
    const data = await fetchWithAuth(`/dashboard/classes/${classId}/`);
    if (!data) return fallback;

    const classInfo = data.class_info || {};

    // Map leaderboard
    let topStudents: Student[] = fallback.topStudents;
    if (Array.isArray(data.leaderboard) && data.leaderboard.length > 0) {
      topStudents = data.leaderboard.map((s: any, i: number) => ({
        id: String(s.student_id ?? s.id ?? `s${i}`),
        name: s.username || s.name || s.student_name || `Student ${i + 1}`,
        score: s.gpa ?? s.score ?? s.average ?? 0,
        maxScore: 100,
        rank: s.rank ?? i + 1,
      }));
    }

    // Map teacher performance
    let teachers: Teacher[] = fallback.teachers;
    const teacherPerf = data.teacher_performance;
    if (teacherPerf) {
      // Could be an object with fields or an array
      if (Array.isArray(teacherPerf) && teacherPerf.length > 0) {
        teachers = teacherPerf.map((t: any, i: number) => ({
          id: String(t.id ?? `t${i}`),
          name: t.name || t.username || `Teacher ${i + 1}`,
          subject: t.subject || "General",
          rating: t.rating ?? t.average_gpa ?? 4.5,
          maxRating: 5,
          trend: t.trend === "declining" ? "declining" : t.trend === "improving" ? "improving" : "stable",
          avatarInitials: (t.name || "T")
            .split(" ")
            .map((w: string) => w[0])
            .join("")
            .toUpperCase()
            .slice(0, 3),
        }));
      } else if (typeof teacherPerf === "object" && teacherPerf.name) {
        teachers = [
          {
            id: String(teacherPerf.id ?? "t1"),
            name: teacherPerf.name || "Teacher",
            subject: teacherPerf.subject || "General",
            rating: teacherPerf.rating ?? 4.5,
            maxRating: 5,
            trend: "stable",
            avatarInitials: (teacherPerf.name || "T")
              .split(" ")
              .map((w: string) => w[0])
              .join("")
              .toUpperCase()
              .slice(0, 3),
          },
        ];
      }
    }

    return {
      className: classInfo.title || classInfo.name || fallback.className,
      totalStudents: classInfo.enrollment_count ?? classInfo.total_students ?? fallback.totalStudents,
      totalTeachers: classInfo.total_teachers ?? (teachers.length || fallback.totalTeachers),
      activeStudents: classInfo.active_students ?? topStudents.length,
      topStudents,
      alerts: fallback.alerts, // alerts not in class detail endpoint
      teachers,
    };
  } catch (e) {
    console.warn("Failed to fetch class detail, using mock", e);
    return fallback;
  }
}

// ──────────────────────────────────────────────
//  Dismiss Alert / Insight
// ──────────────────────────────────────────────
export async function dismissInsight(insightId: string): Promise<boolean> {
  try {
    const result = await fetchWithAuth(`/dashboard/insights/${insightId}/dismiss/`, {
      method: "POST",
    });
    return !!result;
  } catch {
    return false;
  }
}
