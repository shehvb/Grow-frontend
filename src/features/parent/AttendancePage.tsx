import type { FC } from "react";
import { FiDownload, FiCalendar } from "react-icons/fi";
import { useParentStore } from "../../store/parentStore";
import AttendanceMetricsRow from "./components/attendance/AttendanceMetricsRow";
import ActivityCalendar from "./components/attendance/ActivityCalendar";
import ActionNeededCard from "./components/attendance/ActionNeededCard";
import AttendanceRecentActivity from "./components/attendance/AttendanceRecentActivity";

const AttendancePage: FC = () => {
  const { dashboardSummary } = useParentStore();

  if (!dashboardSummary || !dashboardSummary.attendanceMetrics) {
    return (
      <div className="flex items-center justify-center h-screen bg-[#F8F9FA]">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-slate-200 border-t-[#0062FF]"></div>
      </div>
    );
  }

  const { student, attendanceMetrics, calendarEvents, actionNeeded } = dashboardSummary;

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-10 mt-6 relative px-4 sm:px-6">
      <div className="mb-6">
        <h1 className="text-4xl font-extrabold text-[#0F172A] tracking-tight">Attendance & Activity</h1>
        <p className="text-slate-500 font-medium mt-1">
          {student.name}
        </p>
      </div>

      <div className="bg-[#F8F9FA] rounded-[32px] p-8 -mx-6 md:mx-0 border border-slate-100">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
              <h2 className="text-4xl font-black text-[#0F172A] tracking-tight">January 2026</h2>
              <p className="text-slate-500 font-medium mt-2">
                Monitor {student.name.split(' ')[0]}'s study sessions and platform engagement.
              </p>
            </div>
            <div className="flex gap-4">
              <button className="px-6 py-3 bg-white border border-slate-200 rounded-xl font-bold flex items-center gap-2 hover:bg-slate-50 transition-all text-slate-700">
                <FiCalendar /> This Month
              </button>
              <button className="px-6 py-3 bg-[#0062FF] text-white rounded-xl font-bold flex items-center gap-2 hover:bg-blue-700 transition-all shadow-md">
                <FiDownload /> Download Report
              </button>
            </div>
          </div>

          <AttendanceMetricsRow metrics={attendanceMetrics} />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Calendar Section */}
            {calendarEvents && (
              <ActivityCalendar events={calendarEvents} />
            )}

            {/* Right Sidebar Section */}
            <div className="flex flex-col gap-8">
              {actionNeeded && (
                 <ActionNeededCard data={actionNeeded} />
              )}
              <AttendanceRecentActivity />
            </div>
          </div>
      </div>
    </div>
  );
};

export default AttendancePage;
