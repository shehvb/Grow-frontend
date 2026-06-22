import type { FC } from "react";
import { useAuthStore } from "../../../store/authStore";
import {
  FiUsers,
  FiBookOpen,
  FiCheckSquare,
  FiAward,
} from "react-icons/fi";
import { motion } from "framer-motion";
import KPIStatCard from "../components/KPIStatCard";
import { useTeacherStats } from "../hooks/useTeacherStats";
import PerformanceChart from "./components/PerformanceChart";
import StudentPerformers from "./components/StudentPerformers";
import RecentActivityTable from "./components/RecentActivityTable";
import NewFeatureBanner from "./components/NewFeatureBanner";

// ─── Variant Dictionaries ────────────────────────────────────────────────────

const pageVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.3,
      staggerChildren: 0.08,
      when: "beforeChildren",
    },
  },
};

const sectionVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: "easeOut" as any },
  },
};

// ─── Component ───────────────────────────────────────────────────────────────

const TeacherDashboardPage: FC = () => {
  const { stats, loading } = useTeacherStats();
  const { user } = useAuthStore();

  if (loading || !stats) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <motion.div
      variants={pageVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6 pb-10"
    >
      {/* Welcome Header */}
      <motion.div variants={sectionVariants}>
        <h1 className="text-3xl font-black text-slate-800 tracking-tight">
          Welcome back,{" "}
          {user?.first_name
            ? `${user.first_name} ${user.last_name || ""}`
            : "Teacher"}
        </h1>
      </motion.div>

      {/* KPI Cards — each card manages its own entrance via delay prop */}
      <motion.div
        variants={sectionVariants}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        <KPIStatCard
          label="Total Students"
          value={stats.totalStudents}
          icon={<FiUsers className="text-xl" />}
          trend={{ value: "+2% from Last month", isUp: true }}
          iconBgColor="bg-indigo-100"
          iconTextColor="text-indigo-600"
          delay={0}
        />
        <KPIStatCard
          label="Total Courses"
          value={stats.totalCourses}
          icon={<FiBookOpen className="text-xl" />}
          iconBgColor="bg-orange-100"
          iconTextColor="text-orange-500"
          delay={0.08}
        />
        <KPIStatCard
          label="Assignments Created"
          value={stats.activeAssignments}
          icon={<FiCheckSquare className="text-xl" />}
          trend={{ value: "+12% this week", isUp: true }}
          iconBgColor="bg-pink-100"
          iconTextColor="text-pink-500"
          delay={0.16}
        />
        <KPIStatCard
          label="Active Quizzes"
          value={stats.activeQuizzes}
          icon={<FiAward className="text-xl" />}
          trend={{ value: "-1% vs yesterday", isUp: false }}
          iconBgColor="bg-red-100"
          iconTextColor="text-red-500"
          delay={0.24}
        />
      </motion.div>

      <motion.div
        variants={sectionVariants}
        className="grid grid-cols-1 lg:grid-cols-3 gap-6"
      >
        <PerformanceChart data={stats.performanceTrend} />
        <StudentPerformers
          topPerformance={stats.topPerformance}
          needReview={stats.needReview}
        />
      </motion.div>

      {/* Bottom Row */}
      <motion.div
        variants={sectionVariants}
        className="grid grid-cols-1 lg:grid-cols-3 gap-6"
      >
        <RecentActivityTable recentActivity={stats.recentActivity} />
        <NewFeatureBanner />
      </motion.div>
    </motion.div>
  );
};

export default TeacherDashboardPage;
