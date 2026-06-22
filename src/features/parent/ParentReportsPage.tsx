import { useState, useRef, useEffect } from "react";
import type { FC } from "react";
import { FiDownload, FiShare2, FiLoader } from "react-icons/fi";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import { motion } from "framer-motion";
import { useParentStore } from "../../store/parentStore";
import ReportMetricsRow from "./components/reports/ReportMetricsRow";
import AiAnalysisBanner from "./components/reports/AiAnalysisBanner";
import DetailedSubjectsGrid from "./components/reports/DetailedSubjectsGrid";

const ParentReportsPage: FC = () => {
  const { dashboardSummary, selectedStudentId, fetchReports } = useParentStore();
  const reportRef = useRef<HTMLDivElement>(null);
  const [isDownloading, setIsDownloading] = useState(false);

  useEffect(() => {
    if (selectedStudentId) {
      fetchReports(selectedStudentId);
    }
  }, [selectedStudentId, fetchReports]);

  if (!dashboardSummary || !dashboardSummary.reportMetrics) {
    return (
      <div className="flex items-center justify-center h-screen bg-[#F8F9FA]">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-slate-200 border-t-[#1600D5]"></div>
      </div>
    );
  }

  const { student, reportMetrics, aiLearningAnalysis, detailedSubjects } = dashboardSummary;

  const handleDownloadReport = async () => {
    if (!reportRef.current) return;
    
    setIsDownloading(true);
    try {
      const element = reportRef.current;
      
      // Capture the element
      const canvas = await html2canvas(element, {
        scale: 2, // Higher quality
        useCORS: true,
        logging: false,
        backgroundColor: "#F8F9FA", // Match app background
        windowWidth: 1440, // Ensure desktop layout
      });
      
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "px",
        format: [canvas.width / 2, canvas.height / 2], // Keep original aspect ratio
      });
      
      pdf.addImage(imgData, "PNG", 0, 0, canvas.width / 2, canvas.height / 2);
      pdf.save(`${student.name.replace(/\s+/g, '_')}_Report_Jan_2026.pdf`);
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("Failed to generate PDF. Please try again.");
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="w-full space-y-8 pb-10 mt-6 relative px-4 sm:px-6">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="mb-8"
      >
        <h1 className="text-[36px] font-black text-[#1A1C1E] tracking-tight mb-1 leading-none">Monthly Reports</h1>
        <p className="text-[#9E9E9E] font-bold text-[16px]">
          January 2026
        </p>
      </motion.div>

      <div ref={reportRef} className="space-y-8 pb-10 mt-6 relative">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-8"
        >
              <div>
                <h2 className="text-[42px] font-black text-[#1A1C1E] tracking-tighter leading-tight mb-2">Monthly Report: January 2026</h2>
                <p className="text-[#9E9E9E] font-medium text-[16px]">
                   Detailed academic performance analysis for {student.name}
                </p>
              </div>
              <div className="flex gap-4 self-center md:self-start print:hidden">
                <button className="px-7 py-3.5 bg-white border border-slate-200 rounded-xl font-bold flex items-center gap-2 hover:bg-slate-50 transition-all text-[#1A1C1E] shadow-sm text-[15px]">
                  <FiShare2 className="w-5 h-5" /> Share
                </button>
                <button 
                  onClick={handleDownloadReport}
                  disabled={isDownloading}
                  className="px-7 py-3.5 bg-[#1600D5] text-white rounded-xl font-black flex items-center gap-2 hover:bg-blue-800 transition-all shadow-lg text-[15px] disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isDownloading ? (
                    <FiLoader className="w-5 h-5 animate-spin" />
                  ) : (
                    <FiDownload className="w-5 h-5" />
                  )}
                  {isDownloading ? 'Generating...' : 'Download Report'}
                </button>
              </div>
            </motion.div>

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
