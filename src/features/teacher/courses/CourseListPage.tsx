import type { FC } from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { 
  FiArrowLeft, 
  FiPlus, 
  FiBook, 
  FiUsers, 
  FiZap,
  FiChevronRight,
  FiEdit2
} from "react-icons/fi";
import { MdBookmark } from "react-icons/md";
import { PiGraduationCap } from "react-icons/pi";
import CreateCourseModal from "./components/CreateCourseModal";
import { useCourseStore } from "../../../store/useCourseStore";

const CourseListPage: FC = () => {
  const { courses, listCourses, createCourse, updateCourse } = useCourseStore();

  useEffect(() => {
    listCourses();
  }, [listCourses]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState<any>(null);

  const handleOpenEdit = (e: React.MouseEvent, course: any) => {
    e.preventDefault();
    e.stopPropagation();
    setEditingCourse(course);
    setIsModalOpen(true);
  };

  const handleOpenCreate = () => {
    setEditingCourse(null);
    setIsModalOpen(true);
  };

  const handleSaveCourse = async (data: { title: string; description: string }) => {
    if (editingCourse) {
      await updateCourse(editingCourse.id, data);
    } else {
      await createCourse(data);
    }
  };

  return (
    <div className="space-y-8 animate-fade-in pb-10">
      {/* Header Area */}
      <div className="space-y-4">
        <Link to="/teacher/dashboard" className="flex items-center text-slate-400 font-medium text-sm hover:text-slate-600 transition-colors w-fit">
          <FiArrowLeft className="mr-2" />
          Back to Dashboard
        </Link>
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-black text-slate-800 tracking-tight mb-1">Course Management</h1>
            <p className="text-slate-400 font-medium">Create and manage your mathematics courses</p>
          </div>
          
          <button 
            onClick={handleOpenCreate}
            className="px-6 py-3 bg-[#FF8000] text-white font-bold rounded-xl shadow-lg shadow-orange-100 hover:bg-orange-600 hover:-translate-y-0.5 transition-all flex items-center gap-2 w-fit"
          >
            <FiPlus className="text-xl stroke-[3]" />
            <span>Create Course</span>
          </button>
        </div>
      </div>

      {/* Courses List */}
      <div>
        <h2 className="text-xl font-black text-slate-800 mb-6">
          Published Courses <span className="text-slate-400 font-medium text-base ml-1">({courses.length})</span>
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.length > 0 ? (
            courses.map(course => (
              <Link 
                key={course.id} 
                to={`/teacher/courses/${course.id}`}
                className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-md transition-shadow cursor-pointer flex flex-col justify-between min-h-[220px]"
              >
                
                <div className="flex justify-between items-start mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-[#FFEAD1] text-[#FF8000] flex items-center justify-center text-2xl">
                    <MdBookmark />
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1 bg-emerald-100 text-emerald-500 text-[12px] font-bold px-3 py-1.5 rounded-full">
                      published
                    </div>
                    <FiChevronRight className="text-slate-400 text-lg" />
                    <button 
                      onClick={(e) => handleOpenEdit(e, course)}
                      className="p-1.5 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition-all shadow-sm"
                      title="Edit Course"
                    >
                      <FiEdit2 size={14} />
                    </button>
                  </div>
                </div>

                <div className="mb-8 flex-1">
                  <h3 className="text-2xl font-black text-slate-800 mb-2">{course.title || "Algebra Fundamentals"}</h3>
                  <p className="text-sm text-slate-400 font-medium leading-relaxed max-w-[90%]">
                    {course.description || "Master the basics of algebraic expressions and equations"}
                  </p>
                </div>

                <div className="relative flex items-center gap-8 text-xs font-bold text-slate-500">
                  <div className="flex items-center gap-2">
                    <FiBook className="text-lg text-slate-400" />
                    <span>{course.lessonsCount || 12} lessons</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FiUsers className="text-lg text-slate-400" />
                    <span>{course.studentsCount || 42}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FiZap className="text-lg text-[#FF8000]" />
                    <span>{course.xpCount || 100}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <PiGraduationCap className="text-lg text-slate-400" />
                    <span>Grade 9</span>
                  </div>

                  {/* Small profile icon overlapping */}
                  <div className="absolute -top-4 right-0">
                     <div className="w-8 h-8 rounded-full border-2 border-white shadow-md bg-slate-200 overflow-hidden">
                        <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Teacher" alt="Teacher" />
                     </div>
                  </div>
                </div>
                
              </Link>
            ))
          ) : (
            <div className="col-span-full bg-slate-50 border-2 border-dashed border-slate-200 rounded-3xl p-12 text-center space-y-4">
              <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center mx-auto shadow-sm text-3xl">
                📚
              </div>
              <div>
                <h3 className="text-lg font-black text-slate-800">No courses yet</h3>
                <p className="text-slate-400 text-sm max-w-xs mx-auto">Start by creating your first course to share your knowledge with students.</p>
              </div>
              <button 
                onClick={handleOpenCreate}
                className="inline-flex items-center gap-2 text-orange-500 font-bold hover:text-orange-600 transition-colors"
              >
                <FiPlus />
                Create your first course
              </button>
            </div>
          )}
        </div>
      </div>

      <CreateCourseModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSave={handleSaveCourse}
        courseToEdit={editingCourse}
      />
    </div>
  );
};

export default CourseListPage;
