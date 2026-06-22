import { type FC, useState, useEffect } from "react";
import { teacherService } from "../services/teacher.service";
import { 
  FiTrendingUp, 
  FiCheckCircle, 
  FiUsers, 
  FiAlertCircle,
  FiSearch,
  FiChevronDown,
  FiMessageSquare,
  FiUser
} from "react-icons/fi";
import { motion } from "framer-motion";
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
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: "easeOut" as any } },
};

// ─── KPI Card with count-up ──────────────────────────────────────────────────

const KPIStat: FC<{ label: string; value: number; icon: React.ReactNode; iconBg: string; iconColor: string; suffix?: string }> = (
  { label, value, icon, iconBg, iconColor, suffix = "" }
) => {
  const display = useCountUp(value, { suffix });
  return (
    <motion.div
      variants={kpiCardVariants}
      className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between"
    >
      <div>
        <p className="text-[10px] font-black uppercase tracking-wider text-slate-800 mb-1">{label}</p>
        <motion.span className="text-3xl font-black text-slate-800">{display}</motion.span>
      </div>
      <div className={`w-10 h-10 rounded-xl ${iconBg} ${iconColor} flex items-center justify-center`}>{icon}</div>
    </motion.div>
  );
};

const StudentsPage: FC = () => {
  const [students, setStudents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedClass, setSelectedClass] = useState("All Classes");
  const [avgPerformanceState, setAvgPerformanceState] = useState<number | null>(null);
  const [avgAttendanceState, setAvgAttendanceState] = useState<number | null>(null);
  const [needAttentionState, setNeedAttentionState] = useState<number | null>(null);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        setLoading(true);
        const data = await teacherService.getStudents() as any;
        const studentsList = Array.isArray(data) ? data : (data.students || []);

        if (data && !Array.isArray(data)) {
          if (data.avg_performance !== undefined && data.avg_performance !== null) {
            setAvgPerformanceState(Math.round(Number(data.avg_performance)));
          }
          if (data.avg_attendance !== undefined && data.avg_attendance !== null) {
            setAvgAttendanceState(Math.round(Number(data.avg_attendance)));
          }
          if (data.need_attention !== undefined && data.need_attention !== null) {
            setNeedAttentionState(Number(data.need_attention));
          }
        }

        const mappedStudents = studentsList.map((student: any) => {
          let formattedStatus = "Average";
          if (student.status === "needs_attention") {
            formattedStatus = "Needs Attention";
          } else if (student.status === "excellent") {
            formattedStatus = "Excellent";
          } else if (student.status) {
            formattedStatus = student.status.charAt(0).toUpperCase() + student.status.slice(1).replace("_", " ");
          }

          return {
            id: (student.student_id || student.id || Math.random()).toString(),
            name: student.student_name || student.name || "Unknown Student",
            class: student.class || student.class_name || "Class A",
            xp: student.total_xp !== undefined ? student.total_xp : (student.xp || 0),
            avgScore: student.avg_score_pct !== undefined ? Math.round(Number(student.avg_score_pct)) : (student.avgScore || student.average_score || 0),
            attendance: student.attendance_rate !== undefined ? Math.round(Number(student.attendance_rate)) : (student.attendance || student.attendance_rate || 0),
            status: formattedStatus
          };
        });
        setStudents(mappedStudents);
      } catch (error) {
        console.error("Failed to load students", error);
      } finally {
        setLoading(false);
      }
    };
    fetchStudents();
  }, []);

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         student.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesClass = selectedClass === "All Classes" || student.class === selectedClass;
    return matchesSearch && matchesClass;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // Calculate dynamic KPIs from the fetched student data
  const totalStudents = students.length;
  const avgPerformance = avgPerformanceState !== null 
    ? avgPerformanceState 
    : (totalStudents > 0 
      ? Math.round(students.reduce((sum, s) => sum + (s.avgScore || 0), 0) / totalStudents)
      : 0);
  const avgAttendance = avgAttendanceState !== null
    ? avgAttendanceState
    : (totalStudents > 0 
      ? Math.round(students.reduce((sum, s) => sum + (s.attendance || 0), 0) / totalStudents)
      : 0);
  const needsAttentionCount = needAttentionState !== null
    ? needAttentionState
    : students.filter(s => s.status === 'Needs Attention').length;

  return (
    <motion.div variants={pageVariants} initial="hidden" animate="visible" className="space-y-8 pb-10">
      {/* Header Area */}
      <div className="space-y-1">
        <h1 className="text-3xl font-black text-slate-800 tracking-tight">View & Manage Students</h1>
        <div className="flex items-center text-slate-400 font-medium">
          <span className="text-slate-800 font-black mr-2">&lt; Students</span>
          View and manage your students
        </div>
      </div>

      {/* KPI Stats */}
      <motion.div variants={kpiContainerVariants} initial="hidden" animate="visible" className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        <KPIStat label="Avg Performance" value={avgPerformance} icon={<FiTrendingUp className="text-xl stroke-[3]" />} iconBg="bg-green-100" iconColor="text-green-500" suffix="%" />
        <KPIStat label="Avg Attendance" value={avgAttendance} icon={<FiCheckCircle className="text-xl stroke-[3]" />} iconBg="bg-blue-100" iconColor="text-blue-500" suffix="%" />
        <KPIStat label="Total Students" value={totalStudents} icon={<FiUsers className="text-xl" />} iconBg="bg-pink-100" iconColor="text-pink-500" />
        <KPIStat label="Need Attention" value={needsAttentionCount} icon={<FiAlertCircle className="text-xl stroke-[3]" />} iconBg="bg-red-100" iconColor="text-red-500" />
      </motion.div>

      {/* Filter Bar */}
      <div className="bg-white p-4 rounded-3xl border border-slate-100 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:flex-1">
          <FiSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 stroke-[3]" />
          <input 
            type="text" 
            placeholder="Search students by name or ID..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-50 border border-slate-100 rounded-2xl pl-12 pr-5 py-3.5 text-sm font-bold text-slate-600 outline-none focus:border-orange-400 transition-all placeholder:text-slate-400"
          />
        </div>
        
        <div className="relative w-full md:w-64 shrink-0">
          <select 
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
            className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-3.5 text-sm font-bold text-slate-800 focus:border-orange-400 outline-none transition-all appearance-none cursor-pointer hover:bg-slate-100"
          >
            <option value="All Classes">All Classes</option>
            <option value="Class A">Class A</option>
            <option value="Class B">Class B</option>
            <option value="Class C">Class C</option>
          </select>
          <FiChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none stroke-[3]" />
        </div>
      </div>

      {/* Students List */}
      <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100">
        <motion.div variants={listContainerVariants} initial="hidden" animate="visible" className="space-y-4">
          {filteredStudents.length > 0 ? (
            filteredStudents.map((student) => {
              const initials = student.name ? student.name.split(' ').map((n: string) => n[0]).join('') : "??";
              
              const getStatusColor = (status: string) => {
                switch(status) {
                  case 'Excellent': return 'bg-green-100 text-green-500';
                  case 'Needs Attention': return 'bg-red-100 text-red-500';
                  case 'Average': return 'bg-yellow-100 text-yellow-600';
                  default: return 'bg-slate-100 text-slate-500';
                }
              };

              return (
                <motion.div 
                  key={student.id} 
                  variants={rowVariants}
                  className="flex flex-col xl:flex-row xl:items-center justify-between gap-6 p-6 rounded-3xl bg-slate-50 border border-slate-100 hover:border-slate-200 transition-colors"
                >
                  <div className="flex items-center gap-5 w-full xl:w-auto">
                    <div className="w-14 h-14 rounded-full bg-[#FF8000] text-white flex items-center justify-center font-black tracking-widest text-xl shrink-0">
                      {initials}
                    </div>
                    <div>
                      <h3 className="text-base font-black text-slate-800 mb-1">{student.name}</h3>
                      <div className="flex items-center gap-4 text-xs font-bold text-slate-400">
                        <span>{student.class}</span>
                        <span className="flex items-center gap-1.5"><FiUser /> {student.id}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap md:flex-nowrap items-center gap-8 xl:gap-12 w-full xl:w-auto justify-between xl:justify-end">
                    <div className="text-center min-w-[60px]">
                      <span className="text-2xl font-black text-blue-500 block mb-0.5">{student.xp}</span>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Xp</span>
                    </div>
                    
                    <div className="text-center min-w-[60px]">
                      <span className="text-2xl font-black text-slate-800 block mb-0.5">{student.avgScore}%</span>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Avg Score</span>
                    </div>
                    
                    <div className="text-center min-w-[60px]">
                      <span className="text-2xl font-black text-slate-800 block mb-0.5">{student.attendance}%</span>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Attendance</span>
                    </div>

                    <div className="shrink-0 min-w-[120px] text-center md:text-right">
                      <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider ${getStatusColor(student.status)}`}>
                        {student.status}
                      </span>
                    </div>

                    <button className="shrink-0 flex items-center gap-2 px-6 py-3 bg-white border border-slate-200 text-slate-700 font-bold text-xs rounded-2xl hover:bg-slate-50 transition-colors shadow-sm w-full md:w-auto justify-center">
                      <FiMessageSquare className="fill-current" />
                      Message
                    </button>
                  </div>
                </motion.div>
              );
            })
          ) : (
            <div className="text-center py-20 bg-slate-50 rounded-3xl border border-dashed border-slate-200">
              <FiSearch className="mx-auto text-4xl text-slate-300 mb-4" />
              <p className="text-slate-500 font-bold">No students found matching your filters.</p>
              <button 
                onClick={() => { setSearchQuery(""); setSelectedClass("All Classes"); }}
                className="mt-4 text-orange-500 font-black text-sm hover:underline"
              >
                Clear all filters
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default StudentsPage;
