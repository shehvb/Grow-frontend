import { useState, useEffect } from "react";
import type { FC } from "react";
import { useParentStore } from "../../store/parentStore";
import AIInsightBanner from "./components/AIInsightBanner";
import AcademicTrendCard from "./components/AcademicTrendCard";
import AnalyticsMetricCard from "./components/AnalyticsMetricCard";
import SubjectBreakdownCard from "./components/SubjectBreakdownCard";
import { FiClock, FiCheckSquare, FiArrowRight } from "react-icons/fi";

const AnalyticsPage: FC = () => {
  const { dashboardSummary, selectedStudentId, fetchDashboardSummary } = useParentStore();
  const [period, setPeriod] = useState<"weekly" | "monthly">("weekly");

  useEffect(() => {
    if (selectedStudentId) {
      fetchDashboardSummary(selectedStudentId);
    }
  }, [selectedStudentId, fetchDashboardSummary]);

  if (!dashboardSummary || !dashboardSummary.analyticsData) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-slate-200 border-t-[#1600D5]"></div>
      </div>
    );
  }

  const { analyticsData } = dashboardSummary;
  const trendData = period === "weekly" ? analyticsData.weeklyTrend : analyticsData.monthlyTrend;

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-10 mt-6 relative px-4 sm:px-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mt-2">
        <div>
          <h1 className="text-4xl font-extrabold text-[#0F172A] tracking-tight">Student Analytics</h1>
          <p className="text-slate-400 font-medium text-base mt-1">
            Detailed performance breakdown for <span className="text-[#1600D5] font-extrabold">{dashboardSummary.student.name}</span>.
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
        <div className="lg:col-span-1 grid grid-cols-1 gap-6">
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
          <AnalyticsMetricCard 
            title="Assignments Completed"
            value={analyticsData.assignmentsCompleted.count}
            subtitle={`/${analyticsData.assignmentsCompleted.total}`}
            changeLabel={analyticsData.assignmentsCompleted.completionLabel}
            icon={<FiCheckSquare className="w-6 h-6" />}
            iconBg="bg-orange-50"
            iconColor="text-[#FF8000]"
            progressPercentage={(analyticsData.assignmentsCompleted.count / analyticsData.assignmentsCompleted.total) * 100}
            progressColor="bg-[#FF8000]"
          />
        </div>
      </div>

      {/* Subject Breakdown Section */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
           <h2 className="text-3xl font-black text-slate-800 tracking-tight">Subject Breakdown</h2>
           <button className="flex items-center gap-2 text-[#1600D5] font-black text-xs uppercase tracking-widest hover:underline decoration-2 underline-offset-4">
              View Full Report <FiArrowRight className="w-3 h-3" />
           </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
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
        </div>
      </section>
    </div>
  );
};

export default AnalyticsPage;
