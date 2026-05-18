# Data Model & TypeScript Contracts

This document records the exact client-side TypeScript data interfaces, mapping schemes, and payload contracts between the parent portal and backend Django API endpoints.

---

## 1. Student Verification payload
Used to link a student profile to the authenticated parent account.

### TypeScript Interface: `ParentLinkRequest`
```typescript
export interface ParentLinkRequest {
  school_id: number;
  full_name: string;
  enrollment_code: string;
  grade_id: number;
}
```

---

## 2. Linked Student Profile
Represents a student child nested within the parent's roster.

### TypeScript Interface: `Student`
```typescript
export interface Student {
  id: string;
  name: string;
  gradeLevel: number;
  avatar: string;
}
```

---

## 3. Dashboard Metrics
Holds current KPIs for the selected student.

### TypeScript Interface: `DashboardSummary`
```typescript
export interface DashboardSummary {
  student: Student;
  grades: Grade[];
  attendanceRate: number;
  attendanceRecords: AttendanceRecord[];
  latestInsight: AIInsight | null;
  analyticsData: AnalyticsData | null;
  metrics: DashboardMetrics;
  recentActivities: RecentActivity[];
  gpaTrend: GPATrendPoint[];
  topSubjects: SubjectPerformance[];
  upcomingSchedule: CalendarEvent[];
  attendanceMetrics: AttendanceMetrics;
  calendarEvents: CalendarEvent[];
  actionNeeded: ActionNeededItem[];
  reportMetrics: ReportMetrics;
  aiLearningAnalysis: AILearningAnalysis;
  detailedSubjects: DetailedSubjectGrade[];
  parentProfile: ParentProfile;
  linkedStudents: Student[];
  notificationPrefs: NotificationPrefs;
  aiTutorSettings: AITutorSettings;
}
```

---

## 4. Academic History (12 Months)
Stores the historical progression points loaded on the Area Chart card.

### TypeScript Interface: `GPATrendPoint`
```typescript
export interface GPATrendPoint {
  label: string; // e.g. "Jan", "Feb" ... "Dec"
  grade: number; // 0-100 range
}
```
