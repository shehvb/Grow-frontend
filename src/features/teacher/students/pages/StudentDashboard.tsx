import type { FC } from "react";
import { useEffect } from "react";
import { 
  FiUsers, 
  FiMail, 
  FiCalendar, 
  FiBook, 
  FiSearch,
  FiFilter
} from "react-icons/fi";
import { useStudentStore } from "../../../../store/useStudentStore";

const StudentDashboard: FC = () => {
  const { teacherStudents, fetchTeacherStudents, isLoading } = useStudentStore();

  useEffect(() => {
    fetchTeacherStudents();
  }, [fetchTeacherStudents]);

  return (
    <div className="space-y-8 animate-fade-in pb-20">
      {/* Header Area */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <h1 className="text-4xl font-black text-slate-800 tracking-tight">
            My <span className="text-blue-600">Students</span>
          </h1>
          <p className="text-slate-500 font-bold text-sm uppercase tracking-widest">
            Overview of all students enrolled in your courses
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search students..."
              className="bg-white border border-slate-100 rounded-2xl pl-12 pr-6 py-3 text-sm font-bold text-slate-800 focus:border-blue-400 outline-none transition-all shadow-sm w-64"
            />
          </div>
          <button className="p-3 bg-white border border-slate-100 rounded-2xl text-slate-400 hover:text-blue-600 hover:border-blue-100 transition-all shadow-sm">
            <FiFilter size={20} />
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-4">
          <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600">
            <FiUsers size={24} />
          </div>
          <div>
            <h4 className="text-3xl font-black text-slate-800">{teacherStudents.length}</h4>
            <p className="text-xs font-black text-slate-400 uppercase tracking-widest mt-1">Total Enrolled</p>
          </div>
        </div>
        {/* Additional stats could go here */}
      </div>

      {/* Students List */}
      <div className="bg-white rounded-[3rem] shadow-sm border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50/50">
              <tr>
                <th className="px-8 py-6 text-left text-xs font-black text-slate-400 uppercase tracking-widest">Student</th>
                <th className="px-8 py-6 text-left text-xs font-black text-slate-400 uppercase tracking-widest">Course</th>
                <th className="px-8 py-6 text-left text-xs font-black text-slate-400 uppercase tracking-widest">Enrolled Date</th>
                <th className="px-8 py-6 text-right text-xs font-black text-slate-400 uppercase tracking-widest">Contact</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {isLoading ? (
                [1, 2, 3].map(i => (
                  <tr key={i} className="animate-pulse">
                    <td colSpan={4} className="px-8 py-6"><div className="h-12 bg-slate-50 rounded-2xl" /></td>
                  </tr>
                ))
              ) : teacherStudents.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-8 py-20 text-center">
                    <div className="space-y-4">
                      <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-200 mx-auto">
                        <FiUsers size={32} />
                      </div>
                      <p className="text-slate-400 font-black tracking-tight">No students found</p>
                    </div>
                  </td>
                </tr>
              ) : (
                teacherStudents.map((student) => {
                  const studentName = student.student_name || "Unknown Student";
                  const initialChar = studentName.charAt(0).toUpperCase();
                  const courseTitle = student.course_title || "N/A";
                  const displayDate = student.enrolled_at 
                    ? new Date(student.enrolled_at).toLocaleDateString() 
                    : "N/A";
                  const mailHref = student.email ? `mailto:${student.email}` : "#";

                  return (
                    <tr key={student.id || student.student_id} className="hover:bg-slate-50/30 transition-colors group">
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-slate-100 rounded-[1.25rem] flex items-center justify-center text-slate-400 font-black text-lg group-hover:bg-blue-600 group-hover:text-white transition-all">
                            {initialChar}
                          </div>
                          <div className="space-y-0.5">
                            <p className="font-black text-slate-800">{studentName}</p>
                            <p className="text-xs font-bold text-slate-400">ID: #{student.student_id || student.id || "N/A"}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-2">
                          <div className="p-1.5 bg-blue-50 rounded-lg text-blue-500">
                            <FiBook size={12} />
                          </div>
                          <span className="text-sm font-black text-slate-600">{courseTitle}</span>
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-2 text-slate-500">
                          <FiCalendar size={14} className="text-slate-300" />
                          <span className="text-sm font-bold">
                            {displayDate}
                          </span>
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <div className="flex items-center justify-end gap-2">
                          <a 
                            href={mailHref}
                            className="flex items-center gap-2 bg-slate-50 text-slate-600 px-4 py-2 rounded-xl text-xs font-black hover:bg-blue-50 hover:text-blue-600 transition-all"
                          >
                            <FiMail size={14} />
                            Message
                          </a>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
