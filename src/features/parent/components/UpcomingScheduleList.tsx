import type { FC } from "react";
import { Link } from "react-router-dom";
import { FiChevronRight } from "react-icons/fi";
import { motion } from "framer-motion";
import type { UpcomingScheduleEvent } from "../../../types/parent";

interface UpcomingScheduleListProps {
  schedule?: UpcomingScheduleEvent[] | null;
}

const UpcomingScheduleList: FC<UpcomingScheduleListProps> = ({ schedule }) => {
  // Use safe default if none provided
  const events = schedule || [];

  const getStatusStyles = (status: string) => {
    switch (status) {
      case "Upcoming":
        return "bg-orange-100 text-orange-600";
      case "Pending":
        return "bg-indigo-100 text-indigo-600";
      case "Completed":
        return "bg-green-100 text-green-600";
      case "Overdue":
        return "bg-red-100 text-red-600";
      default:
        return "bg-slate-100 text-slate-600";
    }
  };

  const containerVariants = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const rowVariants = {
    hidden: { y: 10, opacity: 0 },
    show: { y: 0, opacity: 1 }
  };

  const badgeVariants = {
    hidden: { scale: 0 },
    show: { scale: 1, transition: { type: "spring" as const, stiffness: 300, damping: 20 } }
  };

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      className="bg-white rounded-[24px] shadow-sm border border-slate-100 p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-extrabold text-slate-900">Upcoming Schedule</h3>
        <Link 
          to="/parent/analytics" 
          className="text-blue-600 font-bold text-sm flex items-center gap-1 hover:text-blue-700 transition-colors"
        >
          View All <FiChevronRight />
        </Link>
      </div>

      {events.length === 0 ? (
        <div className="text-center py-8 text-slate-500 font-medium text-sm">
          No upcoming schedule events.
        </div>
      ) : (
        <div className="w-full overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100">
                <th className="pb-3 text-[13px] font-bold text-slate-400 font-sans">Date</th>
                <th className="pb-3 text-[13px] font-bold text-slate-400 font-sans">Subject</th>
                <th className="pb-3 text-[13px] font-bold text-slate-400 font-sans">Type</th>
                <th className="pb-3 text-[13px] font-bold text-slate-400 font-sans">Title</th>
                <th className="pb-3 text-[13px] font-bold text-slate-400 font-sans text-right">Status</th>
              </tr>
            </thead>
            <tbody>
              {events.map((event) => (
                <motion.tr 
                  variants={rowVariants}
                  key={event.id} 
                  className="border-b border-slate-50 last:border-0 hover:bg-slate-50/50 transition-colors"
                >
                  <td className="py-4 text-[13px] font-medium text-slate-500">{event.date}</td>
                  <td className="py-4 text-[13px] font-bold text-slate-700">{event.subject}</td>
                  <td className="py-4 text-[13px] font-medium text-slate-500">{event.type}</td>
                  <td className="py-4 text-[13px] font-medium text-slate-600">{event.title}</td>
                  <td className="py-4 text-right">
                    <motion.span 
                      variants={badgeVariants}
                      className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-bold ${getStatusStyles(event.status)}`}
                    >
                      {event.status}
                    </motion.span>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </motion.div>
  );
};

export default UpcomingScheduleList;
