import type { FC } from "react";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { 
  FiPlus, 
  FiCalendar, 
  FiCheckCircle, 
  FiClock, 
  FiUsers, 
  FiCheckSquare
} from "react-icons/fi";

const MOCK_ASSIGNMENTS = [
  {
    id: "a1",
    title: "Algebraic Expressions Worksheet",
    dueDate: "Apr 10, 2026",
    course: "Algebra Fundamentals",
    xp: 150,
    submissions: 38,
    totalStudents: 45,
    status: "Active"
  },
  {
    id: "a2",
    title: "Solving Linear Equations",
    dueDate: "Apr 10, 2026",
    course: "Algebra Fundamentals",
    xp: 150,
    submissions: 38,
    totalStudents: 45,
    status: "Active"
  },
  {
    id: "a3",
    title: "Geometry Problem Set",
    dueDate: "Apr 10, 2026",
    course: "Algebra Fundamentals",
    xp: 150,
    submissions: 45,
    totalStudents: 45,
    status: "Completed"
  }
];

const AssignmentListPage: FC = () => {
  const navigate = useNavigate();
  const [assignments] = useState<any[]>(() => {
    const saved = sessionStorage.getItem('teacher-assignments');
    if (saved) return JSON.parse(saved);
    return MOCK_ASSIGNMENTS;
  });

  useEffect(() => {
    sessionStorage.setItem('teacher-assignments', JSON.stringify(assignments));
  }, [assignments]);

  return (
    <div className="space-y-8 animate-fade-in pb-10">
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
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between">
          <span className="text-4xl font-black text-slate-800 tracking-tight">{assignments.length}</span>
          <div className="w-10 h-10 rounded-xl bg-orange-100 text-orange-500 flex items-center justify-center">
            <FiCheckSquare className="text-xl" />
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between">
          <span className="text-4xl font-black text-slate-800 tracking-tight">
            {assignments.filter(a => a.status === 'Active').length}
          </span>
          <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center">
            <FiClock className="text-xl" />
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between">
          <span className="text-4xl font-black text-slate-800 tracking-tight">12</span>
          <div className="w-10 h-10 rounded-xl bg-yellow-100 text-yellow-600 flex items-center justify-center">
            <FiUsers className="text-xl" />
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between">
          <span className="text-4xl font-black text-slate-800 tracking-tight">
            {assignments.filter(a => a.status === 'Completed').length}
          </span>
          <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-500 flex items-center justify-center">
            <FiCheckCircle className="text-xl" />
          </div>
        </div>
      </div>

      {/* Assignments List */}
      <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100">
        <div className="space-y-4">
          {assignments.map(assignment => {
            const progress = Math.round((assignment.submissions / assignment.totalStudents) * 100);
            const isActive = assignment.status === 'Active';
            
            return (
              <div 
                key={assignment.id} 
                className={`relative flex flex-col md:flex-row md:items-center justify-between gap-6 p-6 rounded-3xl bg-slate-50 border border-slate-100 overflow-hidden group hover:border-slate-200 transition-colors`}
              >
                {/* Status indicator line */}
                <div className={`absolute left-0 top-0 bottom-0 w-1.5 ${isActive ? 'bg-orange-500' : 'bg-green-500'}`} />
                
                <div className="flex-1 ml-2">
                  <h3 className="text-lg font-black text-slate-800 mb-3">{assignment.title}</h3>
                  <div className="flex flex-wrap items-center gap-6 text-xs font-bold text-slate-400">
                    <div className="flex items-center gap-1.5">
                      <FiCalendar size={14} />
                      Due: {assignment.dueDate}
                    </div>
                    <div>{assignment.course}</div>
                    <div className="text-blue-500">+{assignment.xp} Xp</div>
                  </div>
                </div>

                <div className="flex items-center gap-8 md:w-[450px]">
                  <div className="flex-1">
                    <div className="flex justify-between items-end mb-2">
                      <div>
                        <span className="text-sm font-black text-slate-800">{assignment.submissions}/{assignment.totalStudents}</span>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Submissions</p>
                      </div>
                      <span className="text-xs font-bold text-slate-800">{progress}%</span>
                    </div>
                    <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full ${isActive ? 'bg-orange-500' : 'bg-green-500'}`} 
                        style={{ width: `${progress}%` }} 
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-4 shrink-0">
                    <div className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${isActive ? 'bg-orange-100 text-orange-500' : 'bg-green-100 text-green-600'}`}>
                      {assignment.status}
                    </div>
                    <Link 
                      to={`/teacher/assignments/${assignment.id}/review`}
                      className="px-6 py-2.5 bg-white border border-slate-200 text-slate-700 font-bold text-sm rounded-xl hover:bg-slate-50 transition-colors shadow-sm"
                    >
                      Review
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AssignmentListPage;
