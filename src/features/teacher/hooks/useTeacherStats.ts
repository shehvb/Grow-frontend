import { useState, useEffect } from "react";
import { teacherService } from "../services/teacher.service";
import type { TeacherStats } from "../../../types/teacher";

export const useTeacherStats = () => {
  const [stats, setStats] = useState<TeacherStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const data = await teacherService.getDashboardStats();
        setStats(data);
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
