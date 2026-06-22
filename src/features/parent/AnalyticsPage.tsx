import { useState, useEffect } from "react";
import type { FC } from "react";
import { useParentStore } from "../../store/parentStore";
import AIInsightBanner from "./components/AIInsightBanner";
import AcademicTrendCard from "./components/AcademicTrendCard";
import AnalyticsMetricCard from "./components/AnalyticsMetricCard";
import SubjectBreakdownCard from "./components/SubjectBreakdownCard";
import { FiClock, FiArrowRight, FiAlertTriangle } from "react-icons/fi";
import { motion } from "framer-motion";

const AnalyticsPage: FC = () => {
  const { dashboardSummary, selectedStudentId, fetchAnalytics, students } = useParentStore();
  const [period, setPeriod] = useState<"weekly" | "monthly">("weekly");

  useEffect(() => {
    if (selectedStudentId) {
      fetchAnalytics(selectedStudentId);
    }
  }, [selectedStudentId, fetchAnalytics]);

  if (!dashboardSummary || !dashboardSummary.analyticsData) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-slate-200 border-t-[#1600D5]"></div>
      </div>
    );
  }

  const { analyticsData } = dashboardSummary;
  const trendData = period === "weekly" ? analyticsData.weeklyTrend : analyticsData.monthlyTrend;

  const currentStudent = students.find(s => String(s.id) === String(selectedStudentId));
  const studentName = currentStudent ? currentStudent.name : (dashboardSummary.student?.name || "Student");

  return (
    <div className="w-full space-y-8 pb-10 mt-6 relative px-4 sm:px-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mt-2">
        <div>
          <h1 className="text-4xl font-extrabold text-[#0F172A] tracking-tight">Student Analytics</h1>
          <p className="text-slate-400 font-medium text-base mt-1">
            Detailed performance breakdown for <span className="text-[#1600D5] font-extrabold">{studentName}</span>.
          </p>
        </div>
      </div>

      {/* AI Insight Section */}
      <AIInsightBanner 
        title={analyticsData.aiInsight.title}
        description={analyticsData.aiInsight.description}
        actionRequired={analyticsData.aiInsight.actionRequired}
      />

      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <AcademicTrendCard 
            data={trendData}
            average={analyticsData.averageGrade}
            changePercentage={analyticsData.changePercentage}
            period={period}
            onPeriodChange={setPeriod}
          />
        </div>
        <motion.div 
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="lg:col-span-1 grid grid-cols-1 gap-6"
        >
          <AnalyticsMetricCard 
            title="Total Study Hours"
            value={analyticsData.totalStudyHours.hours}
            subtitle={`${analyticsData.totalStudyHours.minutes}m`}
            changeLabel={analyticsData.totalStudyHours.changeLabel}
            icon={<FiClock className="w-6 h-6" />}
            iconBg="bg-blue-50"
            iconColor="text-[#1600D5]"
            progressPercentage={analyticsData.totalStudyHours.hours > 0 ? 80 : 0} 
          />

          {/* Missing Assignments Card */}
          <div className="bg-white rounded-[32px] p-6 shadow-sm border border-slate-100 flex flex-col justify-between group hover:shadow-md transition-shadow relative overflow-hidden h-[210px]">
            <div className="absolute -right-6 top-1/2 -translate-y-1/2 w-28 h-28 bg-[#FFF0F0] rounded-full z-0 pointer-events-none" />
            <div className="relative z-10 flex flex-col justify-between h-full">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-full bg-[#FFF0F0] flex items-center justify-center text-[#FF5A5A]">
                  <FiAlertTriangle className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-black text-[#FF7070] tracking-tight leading-tight">Missing Assignments</h3>
                  <p className="text-sm font-bold text-[#FFA0A0] mt-1">3 Requires attention</p>
                </div>
              </div>
              <div className="border-t border-[#FFE5E5] w-3/4 my-2" />
              <div className="space-y-0.5">
                <p className="text-sm font-bold text-[#FFA0A0]">Math: 1 missing</p>
                <p className="text-sm font-bold text-[#FFA0A0]">Science: 2 missing</p>
              </div>
            </div>
          </div>


        </motion.div>
      </div>

      {/* Subject Breakdown Section */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
           <h2 className="text-3xl font-black text-slate-800 tracking-tight">Subject Breakdown</h2>
           <button className="flex items-center gap-2 text-[#1600D5] font-black text-xs uppercase tracking-widest hover:underline decoration-2 underline-offset-4">
              View Full Report <FiArrowRight className="w-3 h-3" />
           </button>
        </div>
        
        <motion.div 
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={{
            hidden: { opacity: 0 },
            show: { opacity: 1, transition: { staggerChildren: 0.1 } }
          }}
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6"
        >
          {analyticsData.subjectBreakdown.map((subject) => (
             <SubjectBreakdownCard 
                key={subject.id}
                name={subject.name}
                grade={subject.grade}
                percentageChange={subject.percentageChange || 0}
                status={subject.status}
                upcomingEvent={subject.upcomingEvent}
             />
          ))}
        </motion.div>
      </section>
    </div>
  );
};

export default AnalyticsPage;
