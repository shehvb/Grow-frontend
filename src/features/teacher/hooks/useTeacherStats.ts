import { useState, useEffect } from "react";
import { teacherService } from "../services/teacher.service";

export interface DashboardStats {
  totalStudents: number;
  totalCourses: number;
  activeAssignments: number;
  activeQuizzes: number;
  performanceTrend: { date: string; avgScore: number; engagement: number }[];
  topPerformance: any[];
  needReview: any[];
  recentActivity: any[];
}

export const useTeacherStats = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const data = await teacherService.getDashboardStats();
        
        // Map backend API response to frontend state
        setStats({
          totalStudents: data.total_students || 0,
          totalCourses: data.total_courses || 0,
          activeAssignments: data.assignments_created || 0,
          activeQuizzes: data.active_quizzes || 0,
          performanceTrend: data.performanceTrend || [], // Assuming fallback if not provided
          topPerformance: (data.top_performance || []).map((p: any) => ({
            id: p.student_id || Math.random(),
            name: p.student_name || "Unknown",
            score: `${p.avg_score || 0}% avg score`
          })),
          needReview: (data.need_review || []).map((p: any) => ({
            id: p.student_id || Math.random(),
            name: p.student_name || "Unknown",
            score: `${p.avg_score || 0}% avg score`
          })),
          recentActivity: (data.recent_student_activity || []).map((a: any, idx: number) => {
            const studentDisplay = a.student_name || a.student__username || "Unknown Student";
            const cleanNameForInitials = studentDisplay.includes("@") ? studentDisplay.split("@")[0] : studentDisplay;
            const initials = cleanNameForInitials
              .split(/[\s._-]+/)
              .map((n: string) => n[0])
              .join("")
              .substring(0, 2)
              .toUpperCase() || "US";

            const rawStatus = a.status ? a.status.toLowerCase() : "pending";
            const statusColor = rawStatus === "graded" 
              ? "bg-emerald-100 text-emerald-600" 
              : "bg-orange-100 text-orange-600";
              
            let displayTime = "Recently";
            if (a.submitted_at) {
              const dateObj = new Date(a.submitted_at);
              displayTime = dateObj.toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit"
              });
            }

            return {
              id: a.id || idx,
              initials,
              name: studentDisplay,
              task: a.assignment__title ? `Assignment: ${a.assignment__title}` : "Assignment Submission",
              status: rawStatus.toUpperCase(),
              grade: a.score ? `${a.score}%` : "---",
              time: displayTime,
              color: "bg-blue-100 text-blue-600",
              statusColor
            };
          })
        });
      } catch (err) {
        setError("Failed to load dashboard statistics");
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return { stats, loading, error };
};
