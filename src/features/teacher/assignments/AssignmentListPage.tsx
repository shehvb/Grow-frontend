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
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between h-32 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black text-slate-800 uppercase tracking-widest">Total Assignments</span>
            <div className="w-8 h-8 rounded-lg bg-[#FFEAD1] text-[#FF8000] flex items-center justify-center">
              <FiCheckSquare className="text-sm" />
            </div>
          </div>
          <span className="text-4xl font-black text-slate-800 tracking-tight">28</span>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between h-32 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black text-slate-800 uppercase tracking-widest">Active</span>
            <div className="w-8 h-8 rounded-lg bg-[#E2E1FF] text-[#1600D5] flex items-center justify-center">
              <FiClock className="text-sm" />
            </div>
          </div>
          <span className="text-4xl font-black text-slate-800 tracking-tight">3</span>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between h-32 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black text-slate-800 uppercase tracking-widest">Pending Review</span>
            <div className="w-8 h-8 rounded-lg bg-yellow-100 text-yellow-500 flex items-center justify-center">
              <FiUsers className="text-sm" />
            </div>
          </div>
          <span className="text-4xl font-black text-slate-800 tracking-tight">12</span>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between h-32 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black text-slate-800 uppercase tracking-widest">Completed</span>
            <div className="w-8 h-8 rounded-lg bg-green-100 text-green-500 flex items-center justify-center">
              <FiCheckCircle className="text-sm" />
            </div>
          </div>
          <span className="text-4xl font-black text-slate-800 tracking-tight">1</span>
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
                  <div className="flex-1 flex items-center gap-6">
                    <div>
                      <span className="text-sm font-black text-slate-800">{assignment.submissions}/{assignment.totalStudents}</span>
                      <p className="text-[8px] font-black text-slate-400 uppercase mt-0.5">Submissions</p>
                    </div>
                    <div className="flex-1 flex flex-col items-center gap-1.5">
                      <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full ${isActive ? 'bg-[#FF8000]' : 'bg-green-500'}`} 
                          style={{ width: `${progress}%` }} 
                        />
                      </div>
                      <span className="text-[10px] font-bold text-slate-800">{progress}%</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 shrink-0">
                    <div className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${isActive ? 'bg-orange-100 text-orange-500' : 'bg-green-100 text-green-600'}`}>
                      {assignment.status}
                    </div>
                    <Link 
                      to={`/teacher/assignments/${assignment.id}/review`}
                      className="px-6 py-2 bg-white border border-slate-200 text-slate-800 font-black text-[13px] rounded-full hover:bg-slate-50 hover:border-slate-300 transition-all shadow-sm"
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
