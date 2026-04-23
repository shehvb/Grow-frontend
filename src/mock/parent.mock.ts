import type { Parent, Student, CourseGrade, AttendanceRecord, AIInsight, AnalyticsData, DashboardMetrics, RecentActivity, GpaTrendPoint, SubjectPerformance } from "../types/parent";

export const MOCK_PARENTS: Parent[] = [
  {
    id: "p1",
    name: "Mohamed Ali",
    email: "mohamed.ali@example.com",
    studentIds: ["s1", "s2"],
  },
];

export const MOCK_STUDENTS: Student[] = [
  {
    id: "s1",
    name: "Mazen Ali",
    gradeLevel: 10,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mazen",
  },
  {
    id: "s2",
    name: "Sondos Ali",
    gradeLevel: 8,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sondos",
  },
];

export const MOCK_GRADES: CourseGrade[] = [
  // Mazen (s1)
  { id: "g1", studentId: "s1", courseName: "Advanced Mathematics", currentGrade: 85, letterGrade: "A", lastUpdated: "2024-03-25" },
  { id: "g2", studentId: "s1", courseName: "Physics", currentGrade: 78, letterGrade: "B+", lastUpdated: "2024-03-24" },
  { id: "g3", studentId: "s1", courseName: "History", currentGrade: 92, letterGrade: "A+", lastUpdated: "2024-03-20" },
  // Laila (s2)
  { id: "g4", studentId: "s2", courseName: "Biology", currentGrade: 88, letterGrade: "A-", lastUpdated: "2024-03-25" },
  { id: "g5", studentId: "s2", courseName: "English Literature", currentGrade: 95, letterGrade: "A+", lastUpdated: "2024-03-22" },
];

export const MOCK_ATTENDANCE: AttendanceRecord[] = [
  // Mazen (s1)
  { id: "a1", studentId: "s1", date: "2024-03-27", status: "Present" },
  { id: "a2", studentId: "s1", date: "2024-03-26", status: "Present" },
  { id: "a3", studentId: "s1", date: "2024-03-25", status: "Late" },
  // Laila (s2)
  { id: "a4", studentId: "s2", date: "2024-03-27", status: "Present" },
  { id: "a5", studentId: "s2", date: "2024-03-26", status: "Present" },
];

export const MOCK_INSIGHTS: AIInsight[] = [
  {
    id: "i1",
    studentId: "s1",
    insightText: "Mazen is showing great progress in Mathematics, but his Physics scores have dipped slightly this week. Consider reviewing the Kinematics chapter together.",
    type: "NeedsAttention",
    dateGenerated: "2024-03-27",
  },
  {
    id: "i2",
    studentId: "s2",
    insightText: "Laila is consistently excelling in English Literature. Her attendance is perfect this month!",
    type: "Positive",
    dateGenerated: "2024-03-27",
  },
];

export const MOCK_ANALYTICS: Record<string, AnalyticsData> = {
  "s1": {
    weeklyTrend: [
      { label: "Week 1", value: 78 },
      { label: "Week 2", value: 85 },
      { label: "Week 3", value: 62 },
      { label: "Week 4", value: 88 },
    ],
    monthlyTrend: [
      { label: "Sep", value: 72 },
      { label: "Oct", value: 78 },
      { label: "Nov", value: 44 },
      { label: "Dec", value: 120 },
    ],
    averageGrade: 88,
    changePercentage: 2.4,
    totalStudyHours: {
      hours: 12,
      minutes: 45,
      changeLabel: "+2h vs last month"
    },
    assignmentsCompleted: {
      count: 15,
      total: 15,
      completionLabel: "100% completion"
    },
    aiInsight: {
      title: "Biology Support Needed",
      description: "Mazen's Scores in Photosynthesis dropped by 15% this week. Our AI analysis suggests he might be struggling with the core concepts.",
      actionRequired: true
    },
    subjectBreakdown: [
      {
        id: "sb1",
        name: "Math",
        grade: 85,
        percentageChange: -4,
        status: "Needs attention",
        upcomingEvent: { name: "Upcoming Test", date: "Nov 12" }
      },
      {
        id: "sb2",
        name: "Science",
        grade: 99,
        percentageChange: 2,
        status: "Excellent",
        upcomingEvent: { name: "Lab Report", status: "submitted" }
      },
      {
        id: "sb3",
        name: "English",
        grade: 80,
        percentageChange: 0,
        status: "Good",
        upcomingEvent: { name: "Essay", status: "Due Tomorrow" }
      },
      {
        id: "sb4",
        name: "History",
        grade: 85,
        percentageChange: 5,
        status: "Improving",
        upcomingEvent: { name: "Project", status: "Started" }
      }
    ]
  },
  "s2": {
    weeklyTrend: [
      { label: "Week 1", value: 90 },
      { label: "Week 2", value: 92 },
      { label: "Week 3", value: 95 },
      { label: "Week 4", value: 98 },
    ],
    monthlyTrend: [
      { label: "Sep", value: 94 },
      { label: "Oct", value: 95 },
      { label: "Nov", value: 96 },
      { label: "Dec", value: 98 },
    ],
    averageGrade: 98,
    changePercentage: 1.5,
    totalStudyHours: {
      hours: 18,
      minutes: 30,
      changeLabel: "+5h vs last month"
    },
    assignmentsCompleted: {
      count: 22,
      total: 24,
      completionLabel: "92% completion"
    },
    aiInsight: {
      title: "Excellent Science Progress",
      description: "Laila's Scores in Biology are consistently high. She is excelling in core concepts.",
      actionRequired: false
    },
    subjectBreakdown: [
      {
        id: "sb1",
        name: "Math",
        grade: 95,
        percentageChange: 1,
        status: "Excellent"
      },
      {
        id: "sb2",
        name: "Biology",
        grade: 100,
        percentageChange: 2,
        status: "Excellent"
      }
    ]
  }
};

export const MOCK_DASHBOARD_METRICS: Record<string, DashboardMetrics> = {
  "s1": {
    gpa: { value: 3.8, changePercentage: 2.4, trend: "from last term" },
    studyHours: { value: 12.5, changeLabel: "+1.5 hrs", trend: "vs Weekly goal" },
    engagementRate: { value: 92, badge: "Excellent", subtitle: "Top 5% of class" }
  },
  "s2": {
    gpa: { value: 3.9, changePercentage: 1.2, trend: "from last term" },
    studyHours: { value: 14.0, changeLabel: "+2.0 hrs", trend: "vs Weekly goal" },
    engagementRate: { value: 96, badge: "Excellent", subtitle: "Top 2% of class" }
  }
};

export const MOCK_RECENT_ACTIVITIES: Record<string, RecentActivity[]> = {
  "s1": [
    { id: "ra1", type: "Completed", title: "Physics Quiz", subtitle: "Score: 92/100", timeAgo: "2 hours ago" },
    { id: "ra2", type: "Started", title: "History Chapter 4", subtitle: "Pyramid Builders", timeAgo: "5 hours ago" }
  ],
  "s2": [
    { id: "ra3", type: "Completed", title: "Biology Lab", subtitle: "Grade: A+", timeAgo: "1 hour ago" },
    { id: "ra4", type: "Started", title: "Math Assignment", subtitle: "Calculus Limits", timeAgo: "3 hours ago" }
  ]
};

export const MOCK_GPA_TREND: Record<string, GpaTrendPoint[]> = {
  "s1": [
    { month: "Jan", value: 3.2 }, { month: "Feb", value: 3.1 }, { month: "Mar", value: 3.4 }, 
    { month: "Apr", value: 3.3 }, { month: "May", value: 3.6 }, { month: "Jun", value: 3.65 }, 
    { month: "Jul", value: 3.7 }, { month: "Aug", value: 3.8 }, { month: "Sep", value: 3.75 }, 
    { month: "Oct", value: 3.9 }, { month: "Nov", value: 3.85 }, { month: "Dec", value: 3.8 }
  ],
  "s2": [
    { month: "Jan", value: 3.5 }, { month: "Feb", value: 3.6 }, { month: "Mar", value: 3.6 }, 
    { month: "Apr", value: 3.7 }, { month: "May", value: 3.8 }, { month: "Jun", value: 3.85 }, 
    { month: "Jul", value: 3.9 }, { month: "Aug", value: 3.9 }, { month: "Sep", value: 3.85 }, 
    { month: "Oct", value: 3.95 }, { month: "Nov", value: 3.9 }, { month: "Dec", value: 3.9 }
  ]
};

export const MOCK_TOP_SUBJECTS: Record<string, SubjectPerformance[]> = {
  "s1": [
    { id: "sub1", name: "Arabic", grade: 92, letterGrade: "A", status: "Excellent" },
    { id: "sub2", name: "English", grade: 80, letterGrade: "B", status: "Good" },
    { id: "sub3", name: "Science", grade: 99, letterGrade: "A+", status: "Excellent" },
    { id: "sub4", name: "Mathematics", grade: 85, letterGrade: "B", status: "Improving" }
  ],
  "s2": [
    { id: "sub5", name: "Mathematics", grade: 95, letterGrade: "A", status: "Excellent" },
    { id: "sub6", name: "Biology", grade: 100, letterGrade: "A+", status: "Excellent" },
    { id: "sub7", name: "English", grade: 92, letterGrade: "A-", status: "Good" },
  ]
};

// --- Attendance Mock Data ---
export const MOCK_ATTENDANCE_METRICS: Record<string, any> = {
  "s1": {
    totalStudyHours: { value: 32.5, changePercentage: 5, trendLabel: "vs last month" },
    studyStreak: { days: 12, bestStreak: 2, trendLabel: "best streak!" },
    attendanceRate: { value: 92, missedDays: 2, trendLabel: "this month" }
  },
  "s2": {
    totalStudyHours: { value: 45.0, changePercentage: 8, trendLabel: "vs last month" },
    studyStreak: { days: 15, bestStreak: 4, trendLabel: "best streak!" },
    attendanceRate: { value: 98, missedDays: 0, trendLabel: "this month" }
  }
};

export const MOCK_CALENDAR_EVENTS: Record<string, any[]> = {
  "s1": [
    { date: "2026-01-01", status: "Completed" },
    { date: "2026-01-03", status: "Completed" },
    { date: "2026-01-04", status: "Completed" },
    { date: "2026-01-06", status: "Completed" },
    { date: "2026-01-08", status: "Completed" },
    { date: "2026-01-11", status: "Completed" },
    { date: "2026-01-14", status: "Completed" },
    { date: "2026-01-17", status: "Completed" },
    { date: "2026-01-19", status: "Completed" },
    { date: "2026-01-08", status: "Extra Credit" },
    { date: "2026-01-11", status: "Extra Credit" },
    { date: "2026-01-07", status: "Missed" },
    { date: "2026-01-18", status: "Missed" },
  ],
  "s2": [
    { date: "2026-01-01", status: "Completed" },
    { date: "2026-01-02", status: "Completed" },
    { date: "2026-01-03", status: "Completed" },
    { date: "2026-01-04", status: "Completed" },
    { date: "2026-01-05", status: "Completed" },
    { date: "2026-01-11", status: "Extra Credit" },
  ]
};

export const MOCK_ACTION_NEEDED: Record<string, any> = {
  "s1": {
    title: "Action Needed",
    message: "Mazen missed 2 sessions this month. We recommend scheduling a make-up session this weekend.",
    actionText: "Schedule Make-up"
  },
  "s2": null // No action needed for Sondos
};

// --- Reports Mock Data ---
export const MOCK_REPORT_METRICS: Record<string, any> = {
  "s1": {
    overallAverage: { percentage: 92, grade: "A-", change: 2.4 },
    assignments: { total: 12, lateSubmission: 1 },
    attendance: { percentage: 98, perfectStreakDays: 12 }
  },
  "s2": {
    overallAverage: { percentage: 98, grade: "A+", change: 1.5 },
    assignments: { total: 24, lateSubmission: 0 },
    attendance: { percentage: 100, perfectStreakDays: 30 }
  }
};

export const MOCK_AI_LEARNING_ANALYSIS: Record<string, any> = {
  "s1": {
    improvementPercentage: 15,
    subject: "Algebra",
    insight: "He seems to respond well to visual problem-solving exercises.",
    suggestedFocus: "Geometry proofs.",
    focusReason: "We noticed slight hesitation in assignments involving theorem applications. Consider a quick 15-min review session."
  },
  "s2": {
    improvementPercentage: 20,
    subject: "Biology",
    insight: "She shows an exceptional grasp of evolutionary concepts.",
    suggestedFocus: "Advanced Genetics.",
    focusReason: "She is ready to tackle harder assignments given her consistent 100% scores in Life Sciences."
  }
};

export const MOCK_DETAILED_SUBJECTS: Record<string, any[]> = {
  "s1": [
    { id: "ds1", name: "Math", score: 85, trend: -4, grade: "B+", assignmentsCompleted: 6, assignmentsTotal: 7, labsAvg: 90 },
    { id: "ds2", name: "Science", score: 99, trend: 2, grade: "A+", assignmentsCompleted: 8, assignmentsTotal: 8, testsAvg: 100, labsAvg: 0 },
    { id: "ds3", name: "English", score: 80, trend: 0, grade: "B", assignmentsCompleted: 5, assignmentsTotal: 7, labsAvg: 88 },
    { id: "ds4", name: "History", score: 85, trend: 5, grade: "B+", assignmentsCompleted: 6, assignmentsTotal: 7, labsAvg: 90 },
    { id: "ds5", name: "Arabic", score: 80, trend: 0, grade: "B", assignmentsCompleted: 5, assignmentsTotal: 7, labsAvg: 88 },
    { id: "ds6", name: "Art", score: 85, trend: 5, grade: "B+", assignmentsCompleted: 6, assignmentsTotal: 7, labsAvg: 90 }
  ],
  "s2": [
    { id: "ds7", name: "Math", score: 95, trend: 1, grade: "A", assignmentsCompleted: 5, assignmentsTotal: 5, labsAvg: 95 },
    { id: "ds8", name: "Biology", score: 100, trend: 2, grade: "A+", assignmentsCompleted: 10, assignmentsTotal: 10, testsAvg: 100, labsAvg: 100 },
    { id: "ds9", name: "English", score: 92, trend: 1, grade: "A-", assignmentsCompleted: 9, assignmentsTotal: 9, labsAvg: 94 }
  ]
};

// --- Settings Mock Data ---
export const MOCK_PARENT_PROFILE: any = {
  fullName: "Sarah Ahmed",
  email: "Sarah.Ahmed@example.com",
  phone: "+20 1111111123"
};

export const MOCK_LINKED_STUDENTS: any[] = [
  { id: "s1", name: "Mazen Ali", grade: 5, school: "St. Mary's Elementary" },
  { id: "s2", name: "Sondos Ali", grade: 8, school: "Westside Middle" }
];

export const MOCK_NOTIFICATION_PREFS: any = {
  emailSummaries: true,
  realtimeAlerts: true,
  aiRecommendations: false
};

export const MOCK_AI_TUTOR_SETTINGS: any = {
  homeworkHelperEnabled: true
};

// --- Student Settings Mock Data ---
export const MOCK_STUDENT_PROFILE_DATA: Record<string, any> = {
  "s1": {
    bio: "Passionate about AI ethics and machine learning. Currently focusing on Python-based data analysis and building smart educational tools.",
    totalXp: 9750,
    coursesCount: 6,
    phone: "+20 1254684364",
    email: "663254",
    preferredLanguage: "English (United States)"
  },
  "s2": {
    bio: "Love reading and creative writing! Aspiring author exploring fantasy worlds.",
    totalXp: 12450,
    coursesCount: 8,
    phone: "+20 1254684365",
    email: "663255",
    preferredLanguage: "English (United States)"
  }
};

export const MOCK_STUDENT_LEARNING_PREFS: Record<string, any> = {
  "s1": {
    emailNotifications: true,
    aiProactivity: false,
    darkMode: false
  },
  "s2": {
    emailNotifications: true,
    aiProactivity: true,
    darkMode: true
  }
};
