export interface Parent {
  id: string;
  name: string;
  email: string;
  studentIds: string[];
}

export interface Student {
  id: string;
  name: string;
  gradeLevel: number;
  avatar?: string;
}

export interface CourseGrade {
  id: string;
  studentId: string;
  courseName: string;
  currentGrade: number;
  letterGrade: string;
  lastUpdated: string;
}

export interface QuizScore {
  id: string;
  studentId: string;
  courseName: string;
  quizName: string;
  score: number;
  maxScore: number;
  date: string;
}

export interface AttendanceRecord {
  id: string;
  studentId: string;
  date: string;
  status: 'Present' | 'Absent' | 'Late' | 'Excused';
}

export interface AIInsight {
  id: string;
  studentId: string;
  insightText: string;
  type: 'Positive' | 'NeedsAttention' | 'Neutral';
  dateGenerated: string;
}

export interface AcademicTrendPoint {
  label: string;
  value: number;
}

export interface SubjectPerformance {
  id: string;
  name: string;
  grade: number; // or average %
  letterGrade?: string; // Add letter grade (A, B, A+)
  percentageChange?: number;
  status: 'Excellent' | 'Good' | 'Improving' | 'Needs attention';
  upcomingEvent?: {
    name: string;
    date?: string;
    status?: string;
  };
}

export interface DashboardMetrics {
  gpa: {
    value: number;
    changePercentage: number;
    trend: string;
  };
  studyHours: {
    value: number;
    changeLabel: string;
    trend: string;
  };
  studentXp: {
    value: number;
    changeLabel: string;
    trend: string;
  };
}

export interface RecentActivity {
  id: string;
  type: 'Completed' | 'Started';
  title: string;
  subtitle: string;
  timeAgo: string;
}

export interface GpaTrendPoint {
  month: string;
  value: number;
}

export interface UpcomingScheduleEvent {
  id: string;
  date: string;
  subject: string;
  type: string;
  title: string;
  status: 'Upcoming' | 'Pending' | 'Completed' | 'Overdue';
}

export interface AnalyticsData {
  weeklyTrend: AcademicTrendPoint[];
  monthlyTrend: AcademicTrendPoint[];
  averageGrade: number;
  changePercentage: number;
  totalStudyHours: {
    hours: number;
    minutes: number;
    changeLabel: string;
  };
  assignmentsCompleted: {
    count: number;
    total: number;
    completionLabel: string;
  };
  subjectBreakdown: SubjectPerformance[];
  aiInsight: {
    title: string;
    description: string;
    actionRequired: boolean;
  };
}

export interface DashboardSummary {
  student: Student;
  grades: CourseGrade[];
  attendanceRate: number;
  attendanceRecords: AttendanceRecord[];
  latestInsight: AIInsight | null;
  analyticsData?: AnalyticsData;
  metrics?: DashboardMetrics;
  recentActivities?: RecentActivity[];
  gpaTrend?: GpaTrendPoint[];
  topSubjects?: SubjectPerformance[];
  upcomingSchedule?: UpcomingScheduleEvent[];
  
  // New section aggregates (mocked together for ease of frontend wiring)
  attendanceMetrics?: AttendanceMetrics;
  calendarEvents?: CalendarDayEvent[];
  actionNeeded?: ActionNeededContext;
  
  reportMetrics?: ReportMetrics;
  aiLearningAnalysis?: AiLearningAnalysis;
  detailedSubjects?: DetailedSubjectPerformance[];
  
  parentProfile?: ParentProfile;
  linkedStudents?: LinkedStudent[];
  notificationPrefs?: NotificationPreferences;
  aiTutorSettings?: AiTutorSettings;
  
  studentProfileData?: StudentProfileData;
  studentLearningPreferences?: StudentLearningPreferences;
}

// --- Attendance Section Types ---
export interface AttendanceMetrics {
  totalStudyHours: {
    value: number;
    changePercentage: number;
    trendLabel: string;
  };
  studyStreak: {
    days: number;
    bestStreak: number;
    trendLabel: string;
  };
  attendanceRate: {
    value: number;
    missedDays: number;
    trendLabel: string;
  };
}

export interface CalendarDayEvent {
  date: string; // YYYY-MM-DD
  status: 'Completed' | 'Extra Credit' | 'Missed';
}

export interface ActionNeededContext {
  title: string;
  message: string;
  actionText: string;
}

// --- Reports Section Types ---
export interface ReportMetrics {
  overallAverage: {
    percentage: number;
    grade: string;
    change: number;
  };
  assignments: {
    total: number;
    lateSubmission: number;
  };
  attendance: {
    percentage: number;
    perfectStreakDays: number;
  };
}

export interface AiLearningAnalysis {
  improvementPercentage: number;
  subject: string;
  insight: string;
  suggestedFocus: string;
  focusReason: string;
}

export interface DetailedSubjectPerformance {
  id: string;
  name: string;
  score: number;
  trend: number;
  grade: string;
  assignmentsCompleted: number;
  assignmentsTotal: number;
  labsAvg: number;
  testsAvg?: number; // Optional if there are tests instead of labs
}

// --- Settings Section Types ---
export interface ParentProfile {
  fullName: string;
  email: string;
  phone: string;
}

export interface LinkedStudent {
  id: string;
  name: string;
  grade: number;
  school: string;
}

export interface NotificationPreferences {
  emailSummaries: boolean;
  realtimeAlerts: boolean;
  aiRecommendations: boolean;
}

export interface AiTutorSettings {
  homeworkHelperEnabled: boolean;
}

export interface StudentProfileData {
  bio: string;
  totalXp: number;
  coursesCount: number;
  phone: string;
  email: string;
  preferredLanguage: string;
}

export interface StudentLearningPreferences {
  emailNotifications: boolean;
  aiProactivity: boolean;
  darkMode: boolean;
}
