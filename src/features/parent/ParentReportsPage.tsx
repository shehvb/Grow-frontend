import type { FC } from "react";
import { FiDownload, FiShare2 } from "react-icons/fi";
import { useParentStore } from "../../store/parentStore";
import ReportMetricsRow from "./components/reports/ReportMetricsRow";
import AiAnalysisBanner from "./components/reports/AiAnalysisBanner";
import DetailedSubjectsGrid from "./components/reports/DetailedSubjectsGrid";

const ParentReportsPage: FC = () => {
  const { dashboardSummary } = useParentStore();

  if (!dashboardSummary || !dashboardSummary.reportMetrics) {
    return (
      <div className="flex items-center justify-center h-screen bg-[#F8F9FA]">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-slate-200 border-t-[#1600D5]"></div>
      </div>
    );
  }

  const { student, reportMetrics, aiLearningAnalysis, detailedSubjects } = dashboardSummary;

  return (
    <div className="max-w-full mx-auto pb-10 pt-6">
      <div className="mb-8 px-2">
        <h1 className="text-[36px] font-black text-[#1A1C1E] tracking-tight mb-1 leading-none">Monthly Reports</h1>
        <p className="text-[#9E9E9E] font-bold text-[16px]">
          January 2026
        </p>
      </div>

      <div className="bg-[#F3F3F3]/50 rounded-[32px] p-10 border border-slate-100 shadow-sm relative">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-10">
            <div>
              <h2 className="text-[42px] font-black text-[#1A1C1E] tracking-tighter leading-tight mb-2">Monthly Report: January 2026</h2>
              <p className="text-[#9E9E9E] font-medium text-[16px]">
                 Detailed academic performance analysis for {student.name}
              </p>
            </div>
            <div className="flex gap-4 self-center md:self-start">
              <button className="px-7 py-3.5 bg-white border border-slate-200 rounded-xl font-bold flex items-center gap-2 hover:bg-slate-50 transition-all text-[#1A1C1E] shadow-sm text-[15px]">
                <FiShare2 className="w-5 h-5" /> Share
              </button>
              <button className="px-7 py-3.5 bg-[#1600D5] text-white rounded-xl font-black flex items-center gap-2 hover:bg-blue-800 transition-all shadow-lg text-[15px]">
                <FiDownload className="w-5 h-5" /> Download Report
              </button>
            </div>
          </div>

          <ReportMetricsRow metrics={reportMetrics} />

          {aiLearningAnalysis && (
            <AiAnalysisBanner data={aiLearningAnalysis} />
          )}

          <div className="mb-8">
            <h2 className="text-[32px] font-black text-[#1A1C1E] tracking-tight">Subject Performance</h2>
          </div>

          {detailedSubjects && detailedSubjects.length > 0 && (
            <DetailedSubjectsGrid subjects={detailedSubjects} />
          )}
      </div>
    </div>
  );
};

export default ParentReportsPage;
