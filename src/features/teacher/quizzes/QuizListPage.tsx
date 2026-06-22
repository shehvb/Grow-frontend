import type { FC } from "react";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { 
  FiPlus, 
  FiClock, 
  FiTrendingUp, 
  FiZap,
  FiBookOpen,
  FiLoader
} from "react-icons/fi";
import { motion } from "framer-motion";
import { quizService } from "../../../services/quizService";
import { courseService } from "../../../services/courseService";
import type { Course } from "../../../types/course";
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
  <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden mb-1">
    <motion.div
      className={`h-full rounded-full ${color}`}
      initial={{ width: "0%" }}
      animate={{ width: `${progress}%` }}
      transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1], delay: 0.2 }}
    />
  </div>
);

// ─── KPI Card with count-up ──────────────────────────────────────────────────

const KPICard: FC<{ label: string; value: number; icon: React.ReactNode; iconBg: string; iconColor: string; suffix?: string }> = (
  { label, value, icon, iconBg, iconColor, suffix = "" }
) => {
  const display = useCountUp(value, { suffix });
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


const QuizListPage: FC = () => {
  const navigate = useNavigate();
  const [quizzes, setQuizzes] = useState<any[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [quizzesData, coursesData] = await Promise.all([
          quizService.getTeacherQuizzes(),
          courseService.listCourses()
        ]);
        setQuizzes(quizzesData);
        setCourses(coursesData);
      } catch (error) {
        console.error("Failed to fetch quizzes:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const getCourseName = (courseId: number) => {
    return courses.find(c => c.id === courseId)?.title || `Course ${courseId}`;
  };

  const activeQuizzes = quizzes.filter(q => q.status === 'Active').length;
  const avgScore = quizzes.length ? Math.round(quizzes.reduce((acc, q) => acc + q.avgScore, 0) / quizzes.length) : 0;
  const totalXp = quizzes.reduce((acc, q) => acc + q.xp, 0);

  return (
    <motion.div variants={pageVariants} initial="hidden" animate="visible" className="space-y-8 pb-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-800 tracking-tight mb-1">Quizzes</h1>
          <p className="text-slate-400 font-medium">Create and manage student quizzes</p>
        </div>
        <button 
          onClick={() => navigate('/teacher/quizzes/new')}
          className="px-6 py-3 bg-[#FF8000] text-white font-bold rounded-xl shadow-lg shadow-orange-100 hover:bg-orange-600 hover:-translate-y-0.5 transition-all flex items-center gap-2 w-fit"
        >
          <FiPlus className="text-xl stroke-[3]" />
          <span>Create Quiz</span>
        </button>
      </div>

      {/* KPI Cards */}
      <motion.div variants={kpiContainerVariants} initial="hidden" animate="visible" className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard label="Total Quizzes" value={quizzes.length} icon={<span className="font-black text-[10px]">A+</span>} iconBg="bg-orange-100" iconColor="text-orange-500" />
        <KPICard label="Active Quizzes" value={activeQuizzes} icon={<FiClock />} iconBg="bg-purple-100" iconColor="text-purple-600" />
        <KPICard label="Avg Score" value={avgScore} icon={<FiTrendingUp />} iconBg="bg-green-100" iconColor="text-green-500" suffix="%" />
        <KPICard label="Total XP" value={totalXp} icon={<FiZap className="fill-pink-500" />} iconBg="bg-pink-100" iconColor="text-pink-500" />
      </motion.div>

      {/* Quizzes List */}
      <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100 min-h-[400px]">
        {loading ? (
          <div className="flex flex-col items-center justify-center h-[300px] text-slate-400">
            <FiLoader className="text-4xl animate-spin mb-4" />
            <p className="font-bold">Loading quizzes...</p>
          </div>
        ) : quizzes.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-[300px] text-slate-400">
            <FiBookOpen className="text-4xl mb-4 opacity-20" />
            <p className="font-bold">No quizzes found</p>
            <button 
              onClick={() => navigate('/teacher/quizzes/new')}
              className="mt-4 text-[#FF8000] font-black text-sm hover:underline"
            >
              Create your first quiz
            </button>
          </div>
        ) : (
          <motion.div variants={listContainerVariants} initial="hidden" animate="visible" className="space-y-4">
            {quizzes.map(quiz => {
              const completionRate = quiz.total_students ? Math.round((quiz.completed_count / quiz.total_students) * 100) : 0;
              const isActive = !quiz.is_locked;
              
              return (
                <motion.div 
                  key={quiz.id} 
                  variants={rowVariants}
                  whileHover={{ y: -4, boxShadow: "0 12px 24px -8px rgba(0,0,0,0.12)" }}
                  className="relative flex flex-col md:flex-row md:items-center justify-between gap-6 p-6 rounded-3xl bg-slate-50 border border-slate-100 overflow-hidden group hover:border-slate-200 transition-colors"
                >
                  {/* Vertical Indicator */}
                  <div className={`absolute left-0 top-0 bottom-0 w-1.5 ${isActive ? 'bg-orange-500' : 'bg-slate-300'}`} />
                  
                  <div className="flex-1 ml-2">
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="text-lg font-black text-slate-800">{quiz.title}</h3>
                      <span className={`px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider ${isActive ? 'bg-orange-100 text-orange-500' : 'bg-slate-100 text-slate-500'}`}>
                        {isActive ? 'Active' : 'Locked'}
                      </span>
                    </div>
                    <p className="text-xs font-bold text-slate-400 mb-3">{getCourseName(quiz.course_id)}</p>
                    
                    <div className="flex flex-wrap items-center gap-6 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                      <div className="flex items-center gap-1.5"><FiBookOpen /> {quiz.questions_count || 0} questions</div>
                      <div className="flex items-center gap-1.5"><FiClock /> {quiz.duration_minutes} min</div>
                      <div>{quiz.completed_count || 0}/{quiz.total_students || 0} completed</div>
                      <div className="text-blue-500 lowercase">+{quiz.xp_reward} Xp</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-8 md:w-[400px]">
                    <div className="text-center w-20">
                      <span className="text-xl font-black text-slate-800 block">{Math.round(quiz.avg_score_pct || 0)}%</span>
                      <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Avg Score</span>
                    </div>
                    
                    <div className="flex-1">
                      <ProgressBar progress={completionRate} color={isActive ? 'bg-orange-500' : 'bg-slate-400'} />
                      <div className="text-center text-[9px] font-bold text-slate-400 uppercase tracking-widest">
                        {completionRate}% completion
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <Link 
                        to={`/teacher/quizzes/${quiz.id}/results`}
                        className="px-4 py-2 bg-white border border-slate-200 text-slate-700 font-bold text-xs rounded-xl hover:bg-slate-50 transition-colors shadow-sm"
                      >
                        View Result
                      </Link>
                      <Link 
                        to={`/teacher/quizzes/${quiz.id}/edit`}
                        className="px-4 py-2 bg-white border border-slate-200 text-slate-700 font-bold text-xs rounded-xl hover:bg-slate-50 transition-colors shadow-sm"
                      >
                        Edit
                      </Link>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default QuizListPage;
