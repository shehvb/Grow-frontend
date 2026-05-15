import type { FC } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { 
  FiPlus, 
  FiFileText, 
  FiCalendar, 
  FiUsers, 
  FiEdit3, 
  FiTrash2,
  FiChevronRight
} from "react-icons/fi";
import { useAssignmentStore } from "../../../../store/useAssignmentStore";
import { toast } from "react-hot-toast";

const AssignmentsPage: FC = () => {
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

  return (
    <div className="space-y-8 animate-fade-in pb-20">
      {/* Header Area */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <h1 className="text-4xl font-black text-slate-800 tracking-tight">
            Assignments <span className="text-blue-600">Hub</span>
          </h1>
          <p className="text-slate-500 font-bold text-sm uppercase tracking-widest">
            Manage tasks and evaluate student submissions
          </p>
        </div>
        
        <Link 
          to="/teacher/assignments/create"
          className="flex items-center justify-center gap-3 bg-blue-600 text-white px-8 py-4 rounded-[1.5rem] font-black hover:bg-blue-700 hover:-translate-y-1 transition-all shadow-xl shadow-blue-100 group"
        >
          <FiPlus className="group-hover:rotate-90 transition-transform" size={20} />
          Create Assignment
        </Link>
      </div>

      {/* Assignments Grid */}
      {isLoading && assignments.length === 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-64 bg-slate-50 rounded-[2.5rem] animate-pulse" />
          ))}
        </div>
      ) : assignments.length === 0 ? (
        <div className="bg-white p-16 rounded-[3rem] text-center border-2 border-dashed border-slate-100 space-y-6">
          <div className="w-24 h-24 bg-slate-50 rounded-[2rem] flex items-center justify-center mx-auto text-slate-300">
            <FiFileText size={48} />
          </div>
          <div className="space-y-2">
            <h3 className="text-2xl font-black text-slate-800">No assignments yet</h3>
            <p className="text-slate-500 font-bold">Start by creating your first task for your students</p>
          </div>
          <Link 
            to="/teacher/assignments/create"
            className="inline-flex items-center text-blue-600 font-black hover:gap-3 transition-all"
          >
            Create your first assignment <FiChevronRight className="ml-2" />
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {assignments.map((assignment) => (
            <div 
              key={assignment.id}
              className="group bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-2xl hover:border-blue-100 transition-all space-y-6 relative overflow-hidden"
            >
              {/* Background Accent */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-full -mr-16 -mt-16 opacity-0 group-hover:opacity-100 transition-opacity" />

              <div className="space-y-4 relative">
                <div className="flex items-start justify-between">
                  <div className="p-3 bg-blue-50 rounded-2xl text-blue-600 group-hover:scale-110 transition-transform">
                    <FiFileText size={24} />
                  </div>
                  <div className="flex gap-2">
                    <Link 
                      to={`/teacher/assignments/${assignment.id}/edit`}
                      className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all"
                    >
                      <FiEdit3 size={18} />
                    </Link>
                    <button 
                      onClick={() => handleDelete(assignment.id)}
                      className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                    >
                      <FiTrash2 size={18} />
                    </button>
                  </div>
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] font-black uppercase tracking-widest text-blue-500">
                    {assignment.course_title || 'Course Assignment'}
                  </span>
                  <h3 className="text-xl font-black text-slate-800 group-hover:text-blue-600 transition-colors line-clamp-1">
                    {assignment.title}
                  </h3>
                </div>

                <div className="flex items-center gap-4 py-2 border-y border-slate-50">
                  <div className="flex items-center gap-2 text-slate-500">
                    <FiCalendar size={14} className="text-slate-400" />
                    <span className="text-xs font-bold">
                      {new Date(assignment.due_date).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-500">
                    <FiUsers size={14} className="text-slate-400" />
                    <span className="text-xs font-bold">Review Needed</span>
                  </div>
                </div>

                <Link 
                  to={`/teacher/assignments/${assignment.id}/review`}
                  className="w-full flex items-center justify-center gap-2 bg-slate-50 text-slate-800 py-4 rounded-2xl font-black group-hover:bg-blue-600 group-hover:text-white transition-all"
                >
                  Review Submissions
                  <FiChevronRight className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AssignmentsPage;
