import { useState, useEffect } from "react";
import type { FC } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { courseService } from "../../services/courseService";
import type { CourseDetails } from "../../types";
import CourseTabs, { type TabType } from "../../components/courses/CourseTabs";
import LessonTab from "../../components/courses/LessonTab";
import QuizTab from "../../components/courses/QuizTab";
import AssignmentTab from "../../components/courses/AssignmentTab";

const CourseDetailsPage: FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const [course, setCourse] = useState<CourseDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<TabType>("lessons");

  useEffect(() => {
    const fetchCourse = async () => {
      if (!id) return;
      setLoading(true);
      try {
        const data = await courseService.getCourseById(id);
        if (data) setCourse(data);
      } catch (error) {
        console.error("Failed to load course details", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchCourse();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full min-h-[300px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#1600D5]"></div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold text-slate-800">Course not found</h2>
        <button 
          onClick={() => navigate('/student/courses')}
          className="mt-4 px-6 py-2 bg-[#1600D5] text-white rounded-lg font-bold"
        >
          Back to Courses
        </button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-10 pb-20">
      {/* Header section Card */}
      <div className="bg-white rounded-[24px] p-6 sm:p-8 md:p-10 mb-8 shadow-sm relative overflow-hidden flex flex-col justify-between items-start">
        
        {/* If not lessons tab, show abstract shape on top right */}
        {activeTab !== "lessons" && (
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#C7C2FF55] rounded-bl-full pointer-events-none"></div>
        )}

        <div className="relative z-10 w-full flex flex-col md:flex-row justify-between items-start gap-6">
          <div className="flex flex-col gap-3 sm:gap-4">
            <div className="flex items-center gap-2 text-[#1600D5] font-extrabold text-xs sm:text-sm">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2.12-1.15L23 9l-11-6zm-6.84 8.78L12 15.5l6.84-3.72L12 8.05l-6.84 3.73zM18 16.5l-6 3.27-6-3.27v-3.77l6 3.27 6-3.27v3.77z"/>
              </svg>
              <span>Course Details</span>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-[40px] font-extrabold text-[#000000] tracking-tight mb-0 md:mb-2 leading-tight">
              {course.title}
            </h1>
          </div>
          
          {/* Progress Section (Always visible but stacks) */}
          {activeTab === "lessons" && (
            <div className="flex flex-col shrink-0 w-full md:w-auto md:min-w-[200px] mt-2 md:mt-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] sm:text-xs font-black text-slate-900">Course Progress</span>
                <span className="text-xs sm:text-sm font-black text-[#1600D5]">{course.progress}%</span>
              </div>
              <div className="w-full h-2.5 bg-[#E2E2E2] rounded-full overflow-hidden mb-2">
                <div 
                  className="h-full rounded-full bg-[#1600D5]" 
                  style={{ width: `${course.progress}%` }}
                ></div>
              </div>
              <span className="text-[10px] sm:text-xs font-bold text-[#1600D5]">
                {course.lessons.filter(l => l.status === 'completed').length} of {course.lessonsCount || course.lessons.length} lessons completed
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Tabs */}
      <CourseTabs activeTab={activeTab} onTabChange={setActiveTab} />
      
      {/* Content */}
      <div className="animate-fade-up">
        {activeTab === "lessons" && <LessonTab lessons={course.lessons} />}
        {activeTab === "quizzes" && <QuizTab courseId={course.id} quizzes={course.quizzes} />}
        {activeTab === "assignments" && (
          <AssignmentTab assignments={course.assignments} />
        )}
      </div>
    </div>
  );
};

export default CourseDetailsPage;
