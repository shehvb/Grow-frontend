import type { FC } from "react";
import { FiChevronLeft, FiChevronRight, FiAlertTriangle } from "react-icons/fi";
import { motion } from "framer-motion";
import type { CalendarDayEvent } from "../../../../types/parent";

interface ActivityCalendarProps {
  events: CalendarDayEvent[];
  currentDate: Date;
  onPrevMonth: () => void;
  onNextMonth: () => void;
}

const ActivityCalendar: FC<ActivityCalendarProps> = ({ events, currentDate, onPrevMonth, onNextMonth }) => {
  const daysOfWeek = ["TUE", "WED", "THU", "FRI", "SAT", "SUN", "MON"];
  
  // Calculate dynamic grid
  const generateGrid = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    
    // First day of current month
    const firstDay = new Date(year, month, 1);
    // JS Day: 0 (Sun) - 6 (Sat)
    // Our target day 0 is Tuesday (2 in JS)
    let startDayIdx = firstDay.getDay() - 2;
    if (startDayIdx < 0) startDayIdx += 7; // Adjust if it's Sun/Mon
    
    const grid: { day: number; month: 'prev' | 'curr' | 'next' }[] = [];
    
    // Previous month days
    const prevMonthLast = new Date(year, month, 0).getDate();
    for (let i = startDayIdx - 1; i >= 0; i--) {
      grid.push({ day: prevMonthLast - i, month: 'prev' });
    }
    
    // Current month days
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    for (let i = 1; i <= daysInMonth; i++) {
      grid.push({ day: i, month: 'curr' });
    }
    
    // Next month days
    let nextDay = 1;
    while (grid.length < 35) { // 5 rows of 7
      grid.push({ day: nextDay++, month: 'next' });
    }
    
    // Group into rows
    const rows = [];
    for (let i = 0; i < grid.length; i += 7) {
      rows.push(grid.slice(i, i + 7));
    }
    return rows;
  };

  const calendarRows = generateGrid();

  const getDayEvents = (day: number, monthType: 'prev' | 'curr' | 'next') => {
    if (monthType !== 'curr') return [];
    
    const year = currentDate.getFullYear();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    const paddedDay = day.toString().padStart(2, '0');
    const dateStr = `${year}-${month}-${paddedDay}`;
    
    return events.filter(e => e.date === dateStr);
  };

  return (
    <motion.div 
      initial={{ scale: 0.98, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="bg-white rounded-3xl p-4 sm:p-8 border border-slate-100 shadow-sm col-span-full lg:col-span-2 overflow-hidden"
    >
      <div className="flex justify-between items-center mb-6 sm:mb-8">
        <div className="flex flex-col">
          <h3 className="text-xl sm:text-2xl font-black text-slate-800 tracking-tight">Activity Calendar</h3>
          <p className="text-slate-400 font-bold text-xs sm:text-sm">
            {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
          </p>
        </div>
        <div className="flex gap-4">
          <button 
            onClick={onPrevMonth}
            className="p-2 text-slate-400 hover:text-slate-800 transition-colors pointer"
          >
            <FiChevronLeft size={24} />
          </button>
          <button 
            onClick={onNextMonth}
            className="p-2 text-slate-400 hover:text-slate-800 transition-colors pointer"
          >
            <FiChevronRight size={24} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-1 sm:gap-4 mb-4">
        {daysOfWeek.map(dayStr => (
          <div key={dayStr} className="text-center text-[10px] sm:text-xs font-black text-slate-400 uppercase tracking-widest pb-2 sm:pb-4">
            {dayStr}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1 sm:gap-4">
        {calendarRows.map((row, rowIdx) => (
          row.map((item, colIdx) => {
            const isCurrent = item.month === 'curr';
            const dayEvents = getDayEvents(item.day, item.month);
            const isMissed = dayEvents.some(e => e.status === "Missed");
            
            // Check if it's today
            const today = new Date();
            const isToday = isCurrent && 
                           item.day === today.getDate() && 
                           currentDate.getMonth() === today.getMonth() && 
                           currentDate.getFullYear() === today.getFullYear();

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
                textClass = "font-black text-white bg-[#0062FF] w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center rounded-full text-[10px] sm:text-xs mt-0.5 sm:mt-1 ml-0.5 sm:ml-1";
            }

            return (
              <div key={`${rowIdx}-${colIdx}`} className={`h-16 sm:h-24 rounded-lg sm:rounded-2xl p-1 sm:p-2 flex flex-col ${bgClass}`}>
                <div className="flex justify-between items-start">
                    <span className={`text-xs sm:text-sm ${textClass}`}>
                        {item.day}
                    </span>
                    {isToday && <span className="text-[#0062FF] text-[8px] sm:text-xs font-bold absolute bottom-1 sm:bottom-2 left-1 sm:left-3 hidden xs:block">Today</span>}
                    {isMissed && <FiAlertTriangle className="text-orange-400 absolute bottom-1 sm:bottom-3 right-1 sm:right-3 w-3 h-3 sm:w-4 sm:h-4" />}
                </div>

                {isCurrent && !isMissed && dayEvents.length > 0 && (
                    <div className="mt-auto space-y-1 w-full px-1 mb-1">
                        {dayEvents.map((ev, i) => {
                            if (ev.status === "Completed") {
                                return (
                                  <motion.div 
                                    key={i} 
                                    initial={{ scaleX: 0 }}
                                    animate={{ scaleX: 1 }}
                                    transition={{ duration: 0.8, ease: "easeOut" }}
                                    style={{ transformOrigin: "center" }}
                                    className="h-1.5 w-full bg-[#0062FF] rounded-full" 
                                  />
                                );
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

      <div className="flex flex-wrap items-center gap-4 sm:gap-6 mt-6 sm:mt-8 pt-4 border-t border-slate-100">
         <div className="flex items-center gap-2">
            <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-[#0062FF]" />
            <span className="text-[10px] sm:text-xs font-bold text-slate-500">Completed</span>
         </div>

         <div className="flex items-center gap-2">
            <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-orange-500" />
            <span className="text-[10px] sm:text-xs font-bold text-slate-500">Missed</span>
         </div>
      </div>
    </motion.div>
  );
};

export default ActivityCalendar;
