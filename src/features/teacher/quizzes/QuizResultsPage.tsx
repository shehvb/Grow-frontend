import { useState, useEffect } from "react";
import type { FC } from "react";
import { Link, useParams } from "react-router-dom";
import { 
  FiArrowLeft,
  FiTrendingUp,
  FiCheckCircle,
  FiUsers,
  FiZap,
  FiBookOpen,
  FiClock,
  FiMessageSquare
} from "react-icons/fi";
import { BsFilter } from "react-icons/bs";
import { motion } from "framer-motion";
import { quizService } from "../../../services/quizService";
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
  visible: { transition: { staggerChildren: 0.05, delayChildren: 0.1 } },
};

const rowVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeOut" as any } },
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
        <p className="text-[10px] font-black uppercase tracking-wider text-slate-500 mb-1">{label}</p>
        <motion.span className="text-3xl font-black text-slate-800">{display}</motion.span>
      </div>
      <div className={`w-10 h-10 rounded-xl ${iconBg} ${iconColor} flex items-center justify-center`}>{icon}</div>
    </motion.div>
  );
};

interface UIMappedResult {
  id: string;
  studentName: string;
  class: string;
  isTopPerformer: boolean;
  score: number;
  status: string;
  timeTaken: string;
  xpEarned: number;
}

const QuizResultsPage: FC = () => {
  const { id } = useParams<{ id: string }>();
  const [results, setResults] = useState<UIMappedResult[]>([]);
  const [loading, setLoading] = useState(true);
  const [avgScoreState, setAvgScoreState] = useState<number | null>(null);
  const [completionRateState, setCompletionRateState] = useState<number | null>(null);
  
  // In a real app we'd fetch the quiz details by ID. For now, mock it.
  const quizDetails = {
    title: "Linear Equations Quiz",
    course: "Algebra Fundamentals",
    status: "Active",
    questions: 10,
    duration: 30,
    xp: 200
  };

  const [selectedClass, setSelectedClass] = useState<string>("All");

  useEffect(() => {
    if (!id) return;
    const fetchResults = async () => {
      try {
        setLoading(true);
        const data = await quizService.getQuizResults(id) as any;
        
        // Handle backend returning an object {avg_score_pct, completion_rate, results: [...]} or directly array
        const resultsArray = Array.isArray(data) ? data : (data.results || []);
        
        if (data && !Array.isArray(data)) {
          if (data.avg_score_pct !== undefined && data.avg_score_pct !== null) {
            setAvgScoreState(Math.round(Number(data.avg_score_pct)));
          }
          if (data.completion_rate !== undefined && data.completion_rate !== null) {
            setCompletionRateState(Math.round(Number(data.completion_rate)));
          }
        }

        const mapped = resultsArray.map((r: any, idx: number) => {
          const rawScore = r.normalized_score !== undefined ? r.normalized_score : (r.score !== undefined ? r.score : 0);
          const formattedStatus = r.status 
            ? (r.status.charAt(0).toUpperCase() + r.status.slice(1).toLowerCase()) 
            : 'Pending';
            
          return {
            id: (r.id || r.student_id || idx).toString() + "_" + idx,
            studentName: r.student_name || 'Unknown Student',
            class: 'All', // API does not provide class yet
            isTopPerformer: r.is_top_performer || (rawScore >= 80) || false,
            score: Math.round(Number(rawScore)),
            status: formattedStatus,
            timeTaken: r.time_taken_minutes ? `${r.time_taken_minutes} min` : '-',
            xpEarned: r.xp_earned || 0
          };
        });
        setResults(mapped);
      } catch (err) {
        console.error("Failed to fetch quiz results", err);
      } finally {
        setLoading(false);
      }
    };
    fetchResults();
  }, [id]);

  const classes = ["All", ...Array.from(new Set(results.map(r => r.class)))];
  const filteredResults = results.filter(r => selectedClass === "All" || r.class === selectedClass);

  // Calculate stats
  const completedResults = results.filter(r => r.status === 'Completed');
  const avgScore = avgScoreState !== null 
    ? avgScoreState 
    : (completedResults.length > 0 
      ? Math.round(completedResults.reduce((sum, r) => sum + r.score, 0) / completedResults.length) 
      : 0);
  const completionRate = completionRateState !== null
    ? completionRateState
    : (results.length > 0 
      ? Math.round((completedResults.length / results.length) * 100) 
      : 0);
  const totalXp = results.reduce((sum, r) => sum + r.xpEarned, 0);

  return (
    <motion.div variants={pageVariants} initial="hidden" animate="visible" className="space-y-8 pb-20">
      {/* Header Area */}
      <div className="flex items-start justify-between">
        <div className="space-y-3">
          <Link to="/teacher/quizzes" className="flex items-center text-slate-800 font-black text-2xl hover:text-blue-600 transition-colors w-fit">
            <FiArrowLeft className="mr-3 text-xl" />
            {quizDetails.title}
            <span className="ml-3 px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider bg-orange-100 text-orange-500 relative -top-0.5">
              {quizDetails.status}
            </span>
          </Link>
          <div className="flex flex-wrap items-center gap-6 text-[10px] font-bold text-slate-400 uppercase tracking-wider ml-9">
            <div>{quizDetails.course}</div>
            <div className="flex items-center gap-1.5"><FiBookOpen /> {quizDetails.questions} questions</div>
            <div className="flex items-center gap-1.5"><FiClock /> {quizDetails.duration} min</div>
            <div className="text-blue-500 lowercase">+{quizDetails.xp} Xp</div>
          </div>
        </div>
        
        <div className="relative flex items-center">
          <div className="flex items-center bg-white border border-slate-200 rounded-xl px-4 py-2 shadow-sm cursor-pointer hover:border-slate-300 transition-colors">
            <BsFilter className="text-slate-500 mr-2 text-lg" />
            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="bg-transparent text-sm font-bold text-slate-700 outline-none cursor-pointer appearance-none pr-4"
            >
              {classes.map(c => (
                <option key={c} value={c}>{c === "All" ? "All Classes" : c}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* KPI Stats */}
      <motion.div variants={kpiContainerVariants} initial="hidden" animate="visible" className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        <KPIStat label="Average Score" value={avgScore} icon={<FiTrendingUp className="text-xl stroke-[3]" />} iconBg="bg-green-50" iconColor="text-green-500" suffix="%" />
        <KPIStat label="Completion Rate" value={completionRate} icon={<FiCheckCircle className="text-xl stroke-[3]" />} iconBg="bg-blue-50" iconColor="text-blue-500" suffix="%" />
        <KPIStat label="Total Students" value={results.length} icon={<FiUsers className="text-xl" />} iconBg="bg-pink-50" iconColor="text-pink-500" />
        <KPIStat label="Total XP Earned" value={totalXp} icon={<FiZap className="text-xl fill-orange-500" />} iconBg="bg-orange-50" iconColor="text-orange-500" />
      </motion.div>

      {/* Student Results Table */}
      <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100 space-y-6">
        <h3 className="text-lg font-black text-slate-800">Student Results</h3>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="text-[10px] font-black text-slate-800 uppercase tracking-widest border-b border-slate-100">
                <th className="pb-4 pl-4">Student Name</th>
                <th className="pb-4">Score</th>
                <th className="pb-4">Status</th>
                <th className="pb-4">Time Taken</th>
                <th className="pb-4">XP Earned</th>
                <th className="pb-4 text-right pr-4">Actions</th>
              </tr>
            </thead>
            <motion.tbody
              variants={listContainerVariants}
              initial="hidden"
              animate="visible"
            >
              {loading ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-slate-500 font-medium">Loading results...</td>
                </tr>
              ) : filteredResults.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-slate-500 font-medium">No results found.</td>
                </tr>
              ) : filteredResults.map((result, idx) => {
                const initials = result.studentName ? result.studentName.split(' ').map(n => n[0]).join('') : '?';
                const isTopPerformer = result.isTopPerformer;
                const isCompleted = result.status === 'Completed';
                const scoreColor = result.score >= 80 ? 'text-green-500' : result.score > 0 ? 'text-red-500' : 'text-slate-800';
                
                return (
                  <motion.tr 
                    key={result.id} 
                    variants={rowVariants}
                    className={`${isTopPerformer ? 'bg-green-50/50' : 'bg-transparent'} ${idx !== filteredResults.length - 1 ? 'border-b border-slate-50' : ''}`}
                  >
                    <td className="py-4 pl-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-[#FF8000] text-white flex items-center justify-center font-black tracking-widest text-sm shrink-0">
                          {initials}
                        </div>
                        <div>
                          <h4 className="text-sm font-black text-slate-800">{result.studentName}</h4>
                          {isTopPerformer && (
                            <motion.p 
                              initial={{ scale: 0.8 }}
                              animate={{ scale: [0.8, 1.06, 1] }}
                              transition={{ type: "spring", stiffness: 400, damping: 15 }}
                              className="text-[9px] font-bold text-green-500 flex items-center gap-1 uppercase tracking-wider mt-0.5"
                            >
                              ⭐ Top Performer
                            </motion.p>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="py-4">
                      <span className={`text-xl font-black ${scoreColor}`}>{result.score}%</span>
                    </td>
                    <td className="py-4">
                      <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-wider flex items-center gap-1 w-fit ${
                        isCompleted ? 'bg-green-100 text-green-600' : 'bg-yellow-100 text-yellow-600'
                      }`}>
                        {isCompleted ? <FiCheckCircle size={10} /> : <FiClock size={10} />}
                        {result.status}
                      </span>
                    </td>
                    <td className="py-4">
                      <span className="text-xs font-bold text-slate-800">{result.timeTaken}</span>
                    </td>
                    <td className="py-4">
                      <span className="text-xs font-bold text-blue-500">+{result.xpEarned} Xp</span>
                    </td>
                    <td className="py-4 text-right pr-4">
                      <button className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-700 font-bold text-[10px] uppercase tracking-wider rounded-xl hover:bg-slate-50 transition-colors shadow-sm">
                        <FiMessageSquare className="fill-current" />
                        Message
                      </button>
                    </td>
                  </motion.tr>
                );
              })}
            </motion.tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
};

export default QuizResultsPage;
