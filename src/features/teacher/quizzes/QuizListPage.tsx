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
import { quizService } from "../../../services/quizService";
import { courseService } from "../../../services/courseService";
import type { Course } from "../../../types/course";

const MOCK_QUIZZES = [
  {
    id: "q1",
    title: "Linear Equations Quiz",
    course: "Algebra Fundamentals",
    status: "Active",
    questions: 10,
    duration: 30,
    xp: 200,
    completed: 42,
    totalStudents: 45,
    avgScore: 85
  },
  {
    id: "q2",
    title: "Triangle Properties",
    course: "Algebra Fundamentals",
    status: "Active",
    questions: 10,
    duration: 30,
    xp: 200,
    completed: 38,
    totalStudents: 42,
    avgScore: 78
  },
  {
    id: "q3",
    title: "Variables and Expressions",
    course: "Algebra Fundamentals",
    status: "Completed",
    questions: 10,
    duration: 30,
    xp: 200,
    completed: 45,
    totalStudents: 45,
    avgScore: 100
  }
];

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
    <div className="space-y-8 animate-fade-in pb-10">
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
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between h-32">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black text-slate-800 uppercase tracking-widest">Total Quizzes</span>
            <div className="w-8 h-8 rounded-lg bg-orange-100 text-orange-500 flex items-center justify-center">
              <span className="font-black text-[10px]">A+</span>
            </div>
          </div>
          <span className="text-4xl font-black text-slate-800">{quizzes.length}</span>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between h-32">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black text-slate-800 uppercase tracking-widest">Active Quizzes</span>
            <div className="w-8 h-8 rounded-lg bg-purple-100 text-purple-600 flex items-center justify-center">
              <FiClock />
            </div>
          </div>
          <span className="text-4xl font-black text-slate-800">{activeQuizzes}</span>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between h-32">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black text-slate-800 uppercase tracking-widest">Avg Score</span>
            <div className="w-8 h-8 rounded-lg bg-green-100 text-green-500 flex items-center justify-center">
              <FiTrendingUp />
            </div>
          </div>
          <span className="text-4xl font-black text-slate-800">{avgScore}%</span>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between h-32">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black text-slate-800 uppercase tracking-widest">Total XP</span>
            <div className="w-8 h-8 rounded-lg bg-pink-100 text-pink-500 flex items-center justify-center">
              <FiZap className="fill-pink-500" />
            </div>
          </div>
          <span className="text-4xl font-black text-slate-800">{totalXp.toLocaleString()}</span>
        </div>
      </div>

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
          <div className="space-y-4">
            {quizzes.map(quiz => {
              const completionRate = quiz.total_students ? Math.round((quiz.completed_count / quiz.total_students) * 100) : 0;
              const isActive = !quiz.is_locked;
              
              return (
                <div 
                  key={quiz.id} 
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
                      <div className="h-1.5 bg-slate-200 rounded-full overflow-hidden mb-1">
                        <div 
                          className={`h-full rounded-full ${isActive ? 'bg-orange-500' : 'bg-slate-400'}`} 
                          style={{ width: `${completionRate}%` }} 
                        />
                      </div>
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
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default QuizListPage;
