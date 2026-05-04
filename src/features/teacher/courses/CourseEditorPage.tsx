import type { FC } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { 
  FiArrowLeft, 
  FiPlus, 
  FiPlay, 
  FiEdit2, 
  FiLock, 
  FiUnlock,
  FiTrash2,
  FiGrid,
  FiZap,
  FiInfo,
  FiClock,
  FiPause,
  FiVolume2
} from "react-icons/fi";
import { useState, useEffect } from "react";

const MOCK_LESSONS = [
  {
    id: "l1",
    number: 1,
    title: "Introduction to Variables",
    status: "published",
    duration: "20 min",
    xp: 50,
    bonusXp: 10,
    isLocked: false
  },
  {
    id: "l2",
    number: 2,
    title: "Solving Linear Equations",
    status: "published",
    duration: "25 min",
    xp: 50,
    bonusXp: 0,
    isLocked: false
  }
];

const CourseEditorPage: FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [lessons, setLessons] = useState<any[]>(() => {
    const saved = sessionStorage.getItem(`course-${id}-lessons`);
    if (saved) return JSON.parse(saved);
    return MOCK_LESSONS;
  });

  useEffect(() => {
    sessionStorage.setItem(`course-${id}-lessons`, JSON.stringify(lessons));
  }, [lessons, id]);

  const toggleLock = (lessonId: string) => {
    setLessons(prev => prev.map(l => l.id === lessonId ? { ...l, isLocked: !l.isLocked } : l));
  };

  const deleteLesson = (lessonId: string) => {
    if (window.confirm("Are you sure you want to delete this lesson?")) {
      setLessons(prev => prev.filter(l => l.id !== lessonId));
    }
  };

  return (
    <div className="space-y-8 animate-fade-in pb-20">
      {/* Header Area */}
      <div className="space-y-4">
        <Link to="/teacher/courses" className="flex items-center text-slate-400 font-medium text-sm hover:text-slate-600 transition-colors w-fit">
          <FiArrowLeft className="mr-2" />
          Back to Courses
        </Link>
        
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <h1 className="text-3xl font-black text-slate-800 tracking-tight">Algebra Fundamentals</h1>
              <span className="bg-emerald-50 text-emerald-500 text-[10px] font-black uppercase tracking-wider px-2 py-1 rounded-md">
                published
              </span>
            </div>
            <p className="text-slate-400 font-medium">Master the basics of algebraic expressions and equations</p>
          </div>
          
          <button 
            onClick={() => navigate(`/teacher/courses/${id}/lessons/new`)}
            className="px-6 py-3 bg-[#FF8000] text-white font-bold rounded-xl shadow-lg shadow-orange-100 hover:bg-orange-600 hover:-translate-y-0.5 transition-all flex items-center gap-2 w-fit"
          >
            <FiPlus className="text-xl stroke-[3]" />
            <span>Add Lesson</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content Area */}
        <div className="lg:col-span-2 space-y-8">
          {/* Course Preview Video */}
          <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100">
            <h3 className="text-xl font-black text-slate-800 mb-6">Course Preview</h3>
            <div className="relative aspect-video rounded-3xl overflow-hidden bg-slate-900 group">
              <img 
                src="https://images.unsplash.com/photo-1511367461989-f85a21fda167?q=80&w=2000&auto=format&fit=crop" 
                alt="Course Preview Thumbnail" 
                className="w-full h-full object-cover opacity-60"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <button className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center text-white shadow-2xl hover:scale-110 transition-transform">
                  <FiPlay size={32} className="ml-1" />
                </button>
              </div>
              {/* Fake Video Player Controls */}
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                <div className="h-1.5 bg-slate-600/50 rounded-full mb-4 overflow-hidden">
                  <div className="w-[60%] h-full bg-blue-500 rounded-full relative">
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full shadow-md" />
                  </div>
                </div>
                <div className="flex items-center justify-between text-white/90">
                  <div className="flex items-center gap-4">
                    <FiPause size={18} />
                    <FiVolume2 size={18} />
                    <span className="text-xs font-bold">08:42 / 12:30</span>
                  </div>
                  <div className="text-[10px] font-black border-2 border-white/40 px-1.5 py-0.5 rounded tracking-wider">HD</div>
                </div>
              </div>
            </div>
            <p className="text-center text-slate-400 text-xs font-medium mt-6 leading-relaxed">
              This is how students will see the course introduction. Upload a preview video to help them understand what they'll learn.
            </p>
          </div>

          {/* Course Content - Lessons List */}
          <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100">
            <h3 className="text-xl font-black text-slate-800 mb-8">Course Content</h3>
            <div className="space-y-4">
              {lessons.map((lesson) => (
                <div key={lesson.id} className="flex items-center gap-4 p-5 rounded-3xl bg-slate-50/50 border border-slate-100 hover:border-blue-200 transition-all group">
                  <div className="text-slate-300 cursor-grab active:cursor-grabbing">
                    <FiGrid />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Lesson {lesson.number}</span>
                      <span className="bg-emerald-100 text-emerald-600 text-[9px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded-md">
                        {lesson.status}
                      </span>
                    </div>
                    <h4 className="font-bold text-slate-800">{lesson.title}</h4>
                    <div className="flex items-center gap-4 mt-2">
                      <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400">
                        <FiClock size={12} />
                        {lesson.duration}
                      </div>
                      <div className="flex items-center gap-1.5 text-[10px] font-bold text-orange-500">
                        <FiZap size={12} />
                        {lesson.xp} XP
                      </div>
                      {lesson.bonusXp > 0 && (
                        <div className="flex items-center gap-1.5 text-[10px] font-bold text-blue-500">
                          <FiZap size={12} />
                          +{lesson.bonusXp} Bonus
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => navigate(`/teacher/courses/${id}/lessons/${lesson.id}`)}
                      className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all shadow-sm"
                      title="Edit Lesson"
                    >
                      <FiEdit2 size={14} />
                    </button>
                    <button 
                      onClick={() => toggleLock(lesson.id)}
                      className={`p-2 rounded-lg transition-all shadow-sm ${lesson.isLocked ? 'bg-slate-500 text-white hover:bg-slate-600' : 'bg-[#FF8000] text-white hover:bg-orange-600'}`}
                      title={lesson.isLocked ? "Unlock Lesson" : "Lock Lesson"}
                    >
                      {lesson.isLocked ? <FiLock size={14} /> : <FiUnlock size={14} />}
                    </button>
                    <button 
                      onClick={() => deleteLesson(lesson.id)}
                      className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all shadow-sm"
                      title="Delete Lesson"
                    >
                      <FiTrash2 size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar Area */}
        <div className="space-y-8">
          {/* Course Stats Card */}
          <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100">
            <h3 className="text-lg font-black text-slate-800 mb-6">Course Stats</h3>
            <div className="space-y-6">
              <div>
                <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-1">Total Lessons</p>
                <p className="text-3xl font-black text-slate-800 tracking-tight">12</p>
              </div>
              <div>
                <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-1">Enrolled Students</p>
                <p className="text-3xl font-black text-slate-800 tracking-tight">42</p>
              </div>
              <div>
                <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-1">Total XP</p>
                <div className="flex items-center gap-2 text-3xl font-black text-slate-800 tracking-tight">
                  <FiZap className="text-orange-500" />
                  100
                </div>
              </div>
            </div>
          </div>

          {/* Course Syllabus Card */}
          <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100">
            <h3 className="text-lg font-black text-slate-800 mb-1">Course Syllabus</h3>
            <p className="text-slate-400 text-xs font-medium mb-6">This is what students see in their course view</p>
            <div className="space-y-4">
              {lessons.map((lesson) => (
                <div key={lesson.id} className="p-4 bg-slate-50/50 rounded-2xl flex items-center gap-4">
                  <div className="w-8 h-8 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center text-xs font-black">
                    {lesson.number}
                  </div>
                  <div>
                    <h5 className="text-sm font-black text-slate-800 leading-tight">{lesson.title}</h5>
                    <p className="text-[10px] text-slate-400 font-bold mt-0.5">{lesson.duration} • {lesson.xp} XP</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Teacher Controls Info Box */}
          <div className="bg-blue-100/50 p-8 rounded-[2.5rem] border border-blue-200/50">
            <h3 className="text-lg font-black text-slate-800 mb-4 flex items-center gap-2">
              <FiInfo className="text-blue-600" />
              Teacher Controls
            </h3>
            <ul className="space-y-3 text-sm font-bold text-slate-600">
              <li className="flex items-start gap-2">
                <span className="mt-1.5 w-1.5 h-1.5 bg-slate-800 rounded-full shrink-0" />
                Drag lessons to reorder
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 w-1.5 h-1.5 bg-slate-800 rounded-full shrink-0" />
                Lock lessons to prevent student access
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 w-1.5 h-1.5 bg-slate-800 rounded-full shrink-0" />
                Students see published lessons only
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 w-1.5 h-1.5 bg-slate-800 rounded-full shrink-0" />
                XP is awarded upon completion
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseEditorPage;
