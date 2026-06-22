import { useState, useRef, useEffect } from "react";
import type { FC } from "react";
import { FiDownload, FiCalendar, FiLoader } from "react-icons/fi";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import { motion } from "framer-motion";
import { useParentStore } from "../../store/parentStore";
import AttendanceMetricsRow from "./components/attendance/AttendanceMetricsRow";
import ActivityCalendar from "./components/attendance/ActivityCalendar";
import ActionNeededCard from "./components/attendance/ActionNeededCard";
import AttendanceRecentActivity from "./components/attendance/AttendanceRecentActivity";

const AttendancePage: FC = () => {
  const { dashboardSummary, selectedStudentId, fetchAttendance } = useParentStore();
  const attendanceRef = useRef<HTMLDivElement>(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date(2026, 0, 1)); // Default to Jan 2026 as per mockup

  useEffect(() => {
    if (selectedStudentId) {
      fetchAttendance(selectedStudentId);
    }
  }, [selectedStudentId, fetchAttendance]);

  if (!dashboardSummary || !dashboardSummary.attendanceMetrics) {
    return (
      <div className="flex items-center justify-center h-screen bg-[#F8F9FA]">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-slate-200 border-t-[#0062FF]"></div>
      </div>
    );
  }

  const { student, attendanceMetrics, calendarEvents, actionNeeded, recentActivities } = dashboardSummary;

  const handleDownloadReport = async () => {
    if (!attendanceRef.current) return;
    
    setIsDownloading(true);
    try {
      const element = attendanceRef.current;
      
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: "#F8F9FA",
        windowWidth: 1440,
      });
      
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "px",
        format: [canvas.width / 2, canvas.height / 2],
      });
      
      pdf.addImage(imgData, "PNG", 0, 0, canvas.width / 2, canvas.height / 2);
      pdf.save(`${student.name.replace(/\s+/g, '_')}_Attendance_Report_Jan_2026.pdf`);
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("Failed to generate PDF. Please try again.");
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="w-full space-y-8 pb-10 mt-2 sm:mt-6 relative px-4 sm:px-6"
    >
      <div className="mb-4 sm:mb-6">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0F172A] tracking-tight">Attendance & Activity</h1>
        <p className="text-slate-500 font-medium text-sm sm:text-base mt-1">
          {student.name}
        </p>
      </div>

      <div ref={attendanceRef} className="bg-[#F8F9FA] rounded-[24px] sm:rounded-[32px] p-4 sm:p-8 border border-slate-100">
          <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-6 mb-8">
            <div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#0F172A] tracking-tight capitalize">
                {currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
              </h2>
              <p className="text-slate-500 font-medium text-sm sm:text-base mt-2">
                Monitor {student.name.split(' ')[0]}'s study sessions and platform engagement.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full xl:w-auto print:hidden">
              <button className="flex-1 sm:flex-none px-6 py-3 bg-white border border-slate-200 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-slate-50 transition-all text-slate-700 text-sm">
                <FiCalendar /> This Month
              </button>
              <motion.button 
                whileHover={{ scale: 1.05 }}
                onClick={handleDownloadReport}
                disabled={isDownloading}
                className="flex-1 sm:flex-none px-6 py-3 bg-[#0062FF] text-white rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-md text-sm disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isDownloading ? (
                  <FiLoader className="w-5 h-5 animate-spin" />
                ) : (
                  <FiDownload />
                )}
                {isDownloading ? 'Generating...' : 'Download Report'}
              </motion.button>
            </div>
          </div>

          <AttendanceMetricsRow metrics={attendanceMetrics} />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Calendar Section */}
            {calendarEvents && (
              <ActivityCalendar 
                events={calendarEvents} 
                currentDate={currentMonth}
                onPrevMonth={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1))}
                onNextMonth={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1))}
              />
            )}

            {/* Right Sidebar Section */}
            <div className="flex flex-col gap-8">
              {actionNeeded && (
                 <ActionNeededCard data={actionNeeded} />
              )}
              <AttendanceRecentActivity data={recentActivities as any} />
            </div>
          </div>
      </div>
    </motion.div>
  );
};

export default AttendancePage;
