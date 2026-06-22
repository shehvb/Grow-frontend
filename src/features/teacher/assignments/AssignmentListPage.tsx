import type { FC } from "react";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { 
  FiPlus, 
  FiCalendar, 
  FiCheckCircle, 
  FiClock, 
  FiUsers, 
  FiCheckSquare,
  FiEdit3,
  FiTrash2
} from "react-icons/fi";
import { motion } from "framer-motion";
import { useAssignmentStore } from "../../../store/useAssignmentStore";
import { toast } from "react-hot-toast";
import { useCountUp } from "../hooks/useCountUp";

// ─── Variant Dictionaries ────────────────────────────────────────────────────

const pageVariants = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" as any } },
};

const kpiContainerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.05 } },
};

const kpiCardVariants = {
  hidden: { opacity: 0, y: 12, scale: 0.97 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.35, ease: "easeOut" as any } },
};

const listContainerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06, delayChildren: 0.1 } },
};

const rowVariants = {
  hidden: { opacity: 0, x: -12 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.35, ease: "easeOut" as any } },
};

// ─── Animated Progress Bar ───────────────────────────────────────────────────

const ProgressBar: FC<{ progress: number; color: string }> = ({ progress, color }) => (
  <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
    <motion.div
      className={`h-full rounded-full ${color}`}
      initial={{ width: "0%" }}
      animate={{ width: `${progress}%` }}
      transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1], delay: 0.2 }}
    />
  </div>
);

// ─── KPI Card with count-up ──────────────────────────────────────────────────

const KPICard: FC<{ label: string; value: number; icon: React.ReactNode; iconBg: string; iconColor: string }> = (
  { label, value, icon, iconBg, iconColor }
) => {
  const display = useCountUp(value);
  return (
    <motion.div
      variants={kpiCardVariants}
      className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between h-32 hover:shadow-md transition-shadow"
    >
      <div className="flex items-center justify-between">
        <span className="text-xs font-black text-slate-800 uppercase tracking-widest">{label}</span>
        <div className={`w-8 h-8 rounded-lg ${iconBg} ${iconColor} flex items-center justify-center`}>{icon}</div>
      </div>
      <motion.span className="text-4xl font-black text-slate-800 tracking-tight">{display}</motion.span>
    </motion.div>
  );
};

const AssignmentListPage: FC = () => {
  const navigate = useNavigate();
  const { assignments, fetchAssignments, deleteAssignment, isLoading } = useAssignmentStore();

  useEffect(() => {
    fetchAssignments();
  }, [fetchAssignments]);

  const handleDelete = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this assignment?")) {
      try {
        await deleteAssignment(id);
        toast.success("Assignment deleted successfully");
      } catch (error) {
        toast.error("Failed to delete assignment");
      }
    }
  };

  const totalAssignments = assignments.length;
  const activeAssignments = assignments.filter(a => new Date(a.due_date) >= new Date()).length;
  const completedAssignments = assignments.filter(a => new Date(a.due_date) < new Date()).length;
  const pendingReview = 0;

  return (
    <motion.div variants={pageVariants} initial="hidden" animate="visible" className="space-y-8 pb-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-800 tracking-tight mb-1">Assignments</h1>
          <p className="text-slate-400 font-medium">Create and manage student assignments</p>
        </div>
        <button 
          onClick={() => navigate('/teacher/assignments/new')}
          className="px-6 py-3 bg-[#FF8000] text-white font-bold rounded-xl shadow-lg shadow-orange-100 hover:bg-orange-600 hover:-translate-y-0.5 transition-all flex items-center gap-2 w-fit"
        >
          <FiPlus className="text-xl stroke-[3]" />
          <span>Create New Assignment</span>
        </button>
      </div>

      {/* KPI Cards */}
      <motion.div variants={kpiContainerVariants} initial="hidden" animate="visible" className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard label="Total Assignments" value={totalAssignments} icon={<FiCheckSquare className="text-sm" />} iconBg="bg-[#FFEAD1]" iconColor="text-[#FF8000]" />
        <KPICard label="Active" value={activeAssignments} icon={<FiClock className="text-sm" />} iconBg="bg-[#E2E1FF]" iconColor="text-[#1600D5]" />
        <KPICard label="Pending Review" value={pendingReview} icon={<FiUsers className="text-sm" />} iconBg="bg-yellow-100" iconColor="text-yellow-500" />
        <KPICard label="Completed" value={completedAssignments} icon={<FiCheckCircle className="text-sm" />} iconBg="bg-green-100" iconColor="text-green-500" />
      </motion.div>

      {/* Assignments List */}
      <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100">
        <motion.div variants={listContainerVariants} initial="hidden" animate="visible" className="space-y-4">
          {isLoading && assignments.length === 0 ? (
            <div className="text-center py-10 text-slate-400 font-bold">Loading assignments...</div>
          ) : assignments.length === 0 ? (
            <div className="text-center py-10 text-slate-400 font-bold">No assignments found.</div>
          ) : assignments.map(assignment => {
            const dueDate = new Date(assignment.due_date);
            const isCompleted = dueDate < new Date();
            const status = isCompleted ? 'Completed' : 'Active';
            const isActive = status === 'Active';
            const submissions = assignment.submissions || 0;
            const totalStudents = assignment.totalStudents || Math.max(submissions, 1);
            const progress = Math.round((submissions / totalStudents) * 100);
            
            return (
              <motion.div 
                key={assignment.id}
                variants={rowVariants}
                className={`relative flex flex-col md:flex-row md:items-center justify-between gap-6 p-6 rounded-3xl bg-slate-50 border border-slate-100 overflow-hidden group hover:border-slate-200 transition-colors`}
              >
                {/* Status indicator line */}
                <div className={`absolute left-0 top-0 bottom-0 w-1.5 ${isActive ? 'bg-orange-500' : 'bg-green-500'}`} />
                
                <div className="flex-1 ml-2">
                  <h3 className="text-lg font-black text-slate-800 mb-3">{assignment.title}</h3>
                  <div className="flex flex-wrap items-center gap-6 text-xs font-bold text-slate-400">
                    <div className="flex items-center gap-1.5">
                      <FiCalendar size={14} />
                      Due: {dueDate.toLocaleDateString()}
                    </div>
                    <div>{assignment.course_title || 'General Course'}</div>
                    <div className="text-blue-500">Max Marks: {assignment.max_marks || 100}</div>
                  </div>
                </div>

                <div className="flex items-center gap-8 md:w-[450px]">
                  <div className="flex-1 flex items-center gap-6">
                    <div>
                      <span className="text-sm font-black text-slate-800">{submissions}/{totalStudents}</span>
                      <p className="text-[8px] font-black text-slate-400 uppercase mt-0.5">Submissions</p>
                    </div>
                    <div className="flex-1 flex flex-col items-center gap-1.5">
                      <ProgressBar progress={progress} color={isActive ? 'bg-[#FF8000]' : 'bg-green-500'} />
                      <span className="text-[10px] font-bold text-slate-800">{progress}%</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <div className={`px-3 py-1 mr-2 rounded-full text-[10px] font-black uppercase tracking-wider ${isActive ? 'bg-orange-100 text-orange-500' : 'bg-green-100 text-green-600'}`}>
                      {status}
                    </div>
                    <Link 
                      to={`/teacher/assignments/${assignment.id}/edit`}
                      className="p-2 text-slate-400 hover:text-blue-600 bg-white border border-slate-200 rounded-full hover:bg-blue-50 transition-all"
                      title="Edit Assignment"
                    >
                      <FiEdit3 size={16} />
                    </Link>
                    <button 
                      onClick={() => handleDelete(assignment.id)}
                      className="p-2 text-slate-400 hover:text-red-500 bg-white border border-slate-200 rounded-full hover:bg-red-50 transition-all"
                      title="Delete Assignment"
                    >
                      <FiTrash2 size={16} />
                    </button>
                    <Link 
                      to={`/teacher/assignments/${assignment.id}/review`}
                      className="px-6 py-2 bg-white border border-slate-200 text-slate-800 font-black text-[13px] rounded-full hover:bg-slate-50 hover:border-slate-300 transition-all shadow-sm"
                    >
                      Review
                    </Link>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default AssignmentListPage;
