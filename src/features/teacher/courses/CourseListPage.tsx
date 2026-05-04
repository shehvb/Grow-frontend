import type { FC } from "react";
import { useState } from "react";
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
import { useEffect } from "react";
import CreateCourseModal from "./components/CreateCourseModal";

const MOCK_COURSES = [
  {
    id: "1",
    title: "Algebra Fundamentals",
    description: "Master the basics of algebraic expressions and equations",
    status: "published",
    lessonsCount: 12,
    studentsCount: 42,
    xpCount: 150
  },
  {
    id: "2",
    title: "Geometry Basics",
    description: "Introduction to shapes, angles, and spatial reasoning",
    status: "published",
    lessonsCount: 10,
    studentsCount: 44,
    xpCount: 200
  }
];

const CourseListPage: FC = () => {
  const [courses, setCourses] = useState<any[]>(() => {
    const saved = sessionStorage.getItem('teacher-courses');
    if (saved) return JSON.parse(saved);
    return MOCK_COURSES;
  });

  useEffect(() => {
    sessionStorage.setItem('teacher-courses', JSON.stringify(courses));
  }, [courses]);

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

  const handleSaveCourse = (data: { title: string; description: string }) => {
    if (editingCourse) {
      setCourses(prev => prev.map(c => c.id === editingCourse.id ? { ...c, ...data } : c));
    } else {
      const newCourse = {
        id: `c${Date.now()}`,
        title: data.title,
        description: data.description,
        status: "draft",
        lessonsCount: 0,
        studentsCount: 0,
        xpCount: 0
      };
      setCourses(prev => [...prev, newCourse]);
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
          {courses.map(course => (
            <Link 
              key={course.id} 
              to={`/teacher/courses/${course.id}`}
              className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-md transition-shadow cursor-pointer flex flex-col justify-between min-h-[220px]"
            >
              
              <div className="flex justify-between items-start mb-6">
                <div className="w-12 h-12 rounded-xl bg-orange-100 text-orange-500 flex items-center justify-center text-xl">
                  <FiBook />
                </div>
                <div className="flex items-center gap-2">
                  {course.status === 'published' ? (
                    <div className="flex items-center gap-1 bg-emerald-50 text-emerald-500 text-[10px] font-black uppercase tracking-wider px-2 py-1 rounded-md">
                      {course.status}
                      <FiChevronRight className="stroke-[3]" />
                    </div>
                  ) : (
                    <div className="flex items-center gap-1 bg-slate-100 text-slate-500 text-[10px] font-black uppercase tracking-wider px-2 py-1 rounded-md">
                      {course.status}
                    </div>
                  )}
                  <button 
                    onClick={(e) => handleOpenEdit(e, course)}
                    className="p-1.5 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition-all shadow-sm"
                    title="Edit Course"
                  >
                    <FiEdit2 size={14} />
                  </button>
                </div>
              </div>

              <div className="mb-6 flex-1">
                <h3 className="text-lg font-black text-slate-800 mb-2">{course.title}</h3>
                <p className="text-xs text-slate-400 font-medium leading-relaxed">{course.description}</p>
              </div>

              <div className="flex items-center gap-6 text-xs font-semibold text-slate-400">
                <div className="flex items-center gap-1.5">
                  <FiBook className="text-slate-300" />
                  {course.lessonsCount} lessons
                </div>
                <div className="flex items-center gap-1.5">
                  <FiUsers className="text-slate-300" />
                  {course.studentsCount}
                </div>
                <div className="flex items-center gap-1.5">
                  <FiZap className="text-orange-400" />
                  {course.xpCount}
                </div>
              </div>
              
            </Link>
          ))}
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
