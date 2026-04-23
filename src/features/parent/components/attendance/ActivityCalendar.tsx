import type { FC } from "react";
import { FiChevronLeft, FiChevronRight, FiAlertTriangle } from "react-icons/fi";
import type { CalendarDayEvent } from "../../../../types/parent";

interface ActivityCalendarProps {
  events: CalendarDayEvent[];
}

const ActivityCalendar: FC<ActivityCalendarProps> = ({ events }) => {
  const daysOfWeek = ["TUE", "WED", "THU", "FRI", "SAT", "SUN", "MON"];
  
  // Hardcoded for Jan 2026 to match the exact mockup
  const calendarGrid = [
    [30, 31, 1, 2, 3, 4, 5],
    [6, 7, 8, 9, 10, 11, 12],
    [13, 14, 15, 16, 17, 18, 19],
    [20, 21, 22, 23, 24, 25, 26],
    [27, 28, 29, 30, 31, 1, 2]
  ];

  const isCurrentMonth = (rowIdx: number, day: number) => {
    if (rowIdx === 0 && day > 15) return false;
    if (rowIdx === 4 && day < 15) return false;
    return true;
  };

  const getDayEvents = (day: number, isCurrent: boolean) => {
    if (!isCurrent) return [];
    // Assuming events map to dates like "2026-01-08" -> day 8.
    const paddedDay = day.toString().padStart(2, '0');
    return events.filter(e => e.date === `2026-01-${paddedDay}`);
  };

  return (
    <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm col-span-2">
      <div className="flex justify-between items-center mb-8">
        <h3 className="text-2xl font-black text-slate-800 tracking-tight">Activity Calendar</h3>
        <div className="flex gap-4">
          <button className="p-2 text-slate-400 hover:text-slate-800 transition-colors pointer"><FiChevronLeft size={24} /></button>
          <button className="p-2 text-slate-400 hover:text-slate-800 transition-colors pointer"><FiChevronRight size={24} /></button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-4 mb-4">
        {daysOfWeek.map(dayStr => (
          <div key={dayStr} className="text-center text-xs font-black text-slate-400 uppercase tracking-widest pb-4">
            {dayStr}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-4">
        {calendarGrid.map((row, rowIdx) => (
          row.map((day, colIdx) => {
            const isCurrent = isCurrentMonth(rowIdx, day);
            const dayEvents = getDayEvents(day, isCurrent);
            const isMissed = dayEvents.some(e => e.status === "Missed");
            const isToday = day === 22 && isCurrent;

            let bgClass = "bg-slate-50 border border-slate-100 text-slate-400 opacity-50";
            let textClass = "font-medium text-slate-400";
            
            if (isCurrent) {
                bgClass = "bg-white border text-slate-800 border-slate-200 hover:border-[#0062FF]/30 hover:shadow-sm transition-all relative";
                textClass = "font-bold";
            }
            if (isMissed) {
                bgClass = "bg-orange-50 border-orange-200 relative";
            }
            if (isToday) {
                bgClass = "bg-indigo-50 border-[#0062FF]/20 relative";
                textClass = "font-black text-white bg-[#0062FF] w-6 h-6 flex items-center justify-center rounded-full text-xs mt-1 ml-1";
            }

            return (
              <div key={`${rowIdx}-${colIdx}`} className={`h-24 rounded-2xl p-2 flex flex-col ${bgClass}`}>
                <div className="flex justify-between items-start">
                    <span className={`text-sm ${textClass}`}>
                        {day}
                    </span>
                    {isToday && <span className="text-[#0062FF] text-xs font-bold absolute bottom-2 left-3">Today</span>}
                    {isMissed && <FiAlertTriangle className="text-orange-400 absolute bottom-3 right-3" size={16} />}
                </div>

                {isCurrent && !isMissed && dayEvents.length > 0 && (
                    <div className="mt-auto space-y-1 w-full px-1 mb-1">
                        {dayEvents.map((ev, i) => {
                            if (ev.status === "Completed") {
                                return <div key={i} className="h-1.5 w-full bg-[#0062FF] rounded-full" />;
                            }
                            if (ev.status === "Extra Credit") {
                                return <div key={i} className="h-1.5 w-3/4 bg-purple-500 rounded-full" />;
                            }
                            return null;
                        })}
                    </div>
                )}
              </div>
            );
          })
        ))}
      </div>

      <div className="flex items-center gap-6 mt-8 pt-4 border-t border-slate-100">
         <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#0062FF]" />
            <span className="text-xs font-bold text-slate-500">Completed</span>
         </div>
         <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-purple-500" />
            <span className="text-xs font-bold text-slate-500">Extra Credit</span>
         </div>
         <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-orange-500" />
            <span className="text-xs font-bold text-slate-500">Missed</span>
         </div>
      </div>
    </div>
  );
};

export default ActivityCalendar;
