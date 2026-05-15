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
          recentActivity: (data.recent_student_activity || []).map((a: any) => ({
            id: a.id || Math.random(),
            initials: (a.student_name || "??").substring(0, 2).toUpperCase(),
            name: a.student_name || "Unknown",
            task: a.details || "Activity",
            status: a.action || "COMPLETED",
            grade: a.score ? `${a.score}%` : "---",
            time: "Recently", // You can format a.timestamp if provided
            color: "bg-blue-100 text-blue-600",
            statusColor: "bg-emerald-100 text-emerald-600"
          }))
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
