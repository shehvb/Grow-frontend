import { useState, useEffect } from "react";
import type { FC } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCourseStore } from "../../store/useCourseStore";
import { useLessonStore } from "../../store/useLessonStore";
import toast from "react-hot-toast";
import { 
  FiArrowLeft, 
  FiBookOpen, 
  FiLock, 
  FiCheck, 
  FiStar, 
  FiDownload, 
  FiPlay, 
  FiFileText,
  FiClock,
  FiZap
} from "react-icons/fi";
import { PiGraduationCap } from "react-icons/pi";

type TabType = "lessons" | "quizzes" | "assignments";

const CourseDetailsPage: FC = () => {
  const { id } = useParams<{ id: string }>();
  const courseId = id ? parseInt(id, 10) : 0;
  const navigate = useNavigate();
  
  const { selectedCourse: apiCourse, isLoading: isCourseLoading, getCourseById } = useCourseStore();
  const { lessons: apiLessons, fetchLessons, markComplete } = useLessonStore();
  
  const [activeTab, setActiveTab] = useState<TabType>("lessons");
  const [selectedLesson, setSelectedLesson] = useState<any | null>(null);
  const [markingComplete, setMarkingComplete] = useState(false);

  const [videoProgress, setVideoProgress] = useState(0);
  const [hasDownloadedFile, setHasDownloadedFile] = useState(false);

  useEffect(() => {
    setVideoProgress(0);
    setHasDownloadedFile(false);
  }, [selectedLesson?.id]);

  useEffect(() => {
    if (courseId) {
      getCourseById(courseId);
      fetchLessons(courseId).catch((err: any) => {
        console.error("Failed to fetch lessons", err);
      });
    }
  }, [courseId, getCourseById, fetchLessons]);

  // Set the default selected lesson once lessons are fetched
  useEffect(() => {
    if (apiLessons.length > 0 && !selectedLesson) {
      const sorted = [...apiLessons].sort((a, b) => (a.order || 0) - (b.order || 0));
      const firstIncomplete = sorted.find(l => !l.is_completed);
      setSelectedLesson(firstIncomplete || sorted[0]);
    }
  }, [apiLessons, selectedLesson]);

  const handleMarkComplete = async (lessonId: number) => {
    setMarkingComplete(true);
    try {
      await markComplete(lessonId);
      toast.success("Lesson marked as completed! Keep up the great work!");
      
      // Update local selected lesson completion status
      if (selectedLesson && selectedLesson.id === lessonId) {
        setSelectedLesson((prev: any) => ({ ...prev, is_completed: true }));
      }
      
      // Refresh course data to update the course progress
      getCourseById(courseId);
    } catch (err) {
      toast.error("Failed to complete lesson");
    } finally {
      setMarkingComplete(false);
    }
  };

  if (isCourseLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-slate-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1600D5]"></div>
      </div>
    );
  }

  if (!apiCourse && apiLessons.length === 0) {
    return (
      <div className="p-8 text-center text-red-500 bg-slate-50 min-h-screen">
        <div className="max-w-md mx-auto bg-white p-8 rounded-3xl shadow-sm border border-slate-100 mt-20">
          <h3 className="text-xl font-bold text-slate-800 mb-2">Course Not Found</h3>
          <p className="text-slate-500 font-medium mb-6">We couldn't retrieve the details for this course.</p>
          <button 
            onClick={() => navigate("/student/courses")} 
            className="px-6 py-3 bg-[#1600D5] text-white rounded-xl font-bold transition-all hover:bg-blue-700"
          >
            Back to Courses
          </button>
        </div>
      </div>
    );
  }

  const courseTitle = apiCourse 
    ? ((apiCourse as any).course_name || apiCourse.title || "Untitled Course") 
    : "Course Lessons";
  
  // Calculate completed count and total lessons count safely
  const completedCount = apiLessons.filter(l => l.is_completed).length;
  const totalCount = apiLessons.length || 1;
  const progress = apiCourse ? Math.round((completedCount / totalCount) * 100) : 0;

  const sortedLessons = [...apiLessons].sort((a, b) => (a.order || 0) - (b.order || 0));

  const getLessonStatus = (lesson: any) => {
    if (lesson.is_completed) return "completed";
    
    const index = sortedLessons.findIndex(l => l.id === lesson.id);
    const isFirst = index === 0;
    const prevLesson = sortedLessons[index - 1];
    const isPrevCompleted = prevLesson?.is_completed;
    
    if (isFirst || isPrevCompleted) return "in_progress";
    
    return "locked";
  };

  const hasVideo = !!(selectedLesson?.video_url || selectedLesson?.video_file);
  const hasPdf = !!selectedLesson?.pdf_file;
  
  const canMarkComplete = 
    selectedLesson?.is_completed || 
    (hasVideo && videoProgress >= 75) || 
    (!hasVideo && hasPdf && hasDownloadedFile) || 
    (!hasVideo && !hasPdf);

  const getMediaUrl = (path: string | null | undefined) => {
    if (!path) return "";
    if (path.startsWith("http://") || path.startsWith("https://")) return path;
    const apiBase = import.meta.env.VITE_API_URL || 'https://ahmeddali.pythonanywhere.com/api/v1';
    const domain = apiBase.replace(/\/api\/v1\/?$/, '');
    
    // Add /media prefix if it's a relative path from the database (Django standard)
    const normalizedPath = path.startsWith('/') ? path : `/${path}`;
    const mediaPath = normalizedPath.startsWith('/media/') ? normalizedPath : `/media${normalizedPath}`;
    
    return `${domain}${mediaPath}`;
  };

  return (
    <div className="min-h-screen bg-[#F3F3F3] pb-16 font-sans">
      <div className="w-full max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        
        {/* Breadcrumbs navigation */}
        <button 
          onClick={() => navigate("/student/courses")}
          className="flex items-center gap-2 text-slate-400 hover:text-slate-600 mb-6 font-bold text-sm transition-all"
        >
          <FiArrowLeft className="stroke-[2.5]" />
          Back to Courses
        </button>

        {/* Course Progress Card */}
        <div className="bg-white rounded-[24px] p-8 shadow-sm border border-slate-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8 relative overflow-hidden">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 text-[#1600D5] text-sm font-bold tracking-wide">
              <PiGraduationCap className="text-[20px] stroke-[2.5]" />
              Course Details
            </div>
            <h1 className="text-3xl md:text-[32px] font-black text-slate-900 tracking-tight leading-none">
              {courseTitle}
            </h1>
          </div>

          <div className="w-full md:w-80 space-y-2 shrink-0">
            <div className="flex justify-between items-end mb-1">
              <span className="text-[12px] font-bold text-slate-900">Course Progress</span>
              <span className="text-[12px] font-bold text-[#1600D5]">{progress}%</span>
            </div>
            <div className="h-2.5 w-full bg-slate-100 rounded-full overflow-hidden">
              <div 
                className="h-full bg-blue-600 rounded-full transition-all duration-1000 ease-out" 
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <p className="text-[12px] font-bold text-[#1600D5]">
              {completedCount} of {totalCount} lessons completed
            </p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-2xl px-6 pt-4 shadow-sm border border-slate-100 flex gap-8 mb-8">
          <button 
            onClick={() => setActiveTab("lessons")}
            className={`flex items-center gap-2 pb-4 font-black text-sm transition-all border-b-[4px] -mb-[2px] ${
              activeTab === "lessons" 
                ? "border-blue-600 text-blue-700" 
                : "border-transparent text-slate-400 hover:text-slate-600"
            }`}
          >
            <FiBookOpen className="text-lg stroke-[3]" />
            <span className="text-base">Lessons</span>
          </button>
          <button 
            onClick={() => setActiveTab("quizzes")}
            className={`flex items-center gap-2 pb-4 font-black text-sm transition-all border-b-[4px] -mb-[2px] ${
              activeTab === "quizzes" 
                ? "border-blue-600 text-blue-700" 
                : "border-transparent text-slate-400 hover:text-slate-600"
            }`}
          >
            <FiStar className="text-lg stroke-[3]" />
            <span className="text-base">Quizzes</span>
          </button>
          <button 
            onClick={() => setActiveTab("assignments")}
            className={`flex items-center gap-2 pb-4 font-black text-sm transition-all border-b-[4px] -mb-[2px] ${
              activeTab === "assignments" 
                ? "border-blue-600 text-blue-700" 
                : "border-transparent text-slate-400 hover:text-slate-600"
            }`}
          >
            <FiFileText className="text-lg stroke-[3]" />
            <span className="text-base">Assignments</span>
          </button>
        </div>

        {/* Lessons Tab Content */}
        {activeTab === "lessons" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Left 2 Columns: Video Player & Lesson Details */}
            <div className="lg:col-span-2 space-y-8">
              {selectedLesson ? (
                <>
                  <div className="relative bg-slate-950 aspect-video rounded-[32px] overflow-hidden group shadow-lg border border-slate-900 flex items-center justify-center">
                    {selectedLesson?.video_url || selectedLesson?.video_file ? (
                      <video 
                        className="w-full h-full object-cover" 
                        controls
                        controlsList="nodownload"
                        src={getMediaUrl(selectedLesson.video_url || selectedLesson.video_file)}
                        onTimeUpdate={(e) => {
                          const video = e.currentTarget;
                          setVideoProgress((video.currentTime / video.duration) * 100);
                        }}
                      />
                    ) : (
                      <div className="text-slate-500 font-bold flex flex-col items-center gap-4">
                        <FiPlay className="text-4xl text-slate-700" />
                        No video available for this lesson
                      </div>
                    )}
                  </div>

                  {/* Selected Lesson Details card */}
                  <div className="bg-white rounded-[24px] p-8 shadow-sm border border-slate-100 space-y-6">
                    <div className="space-y-4">
                      <h2 className="text-[28px] font-black text-slate-900 leading-tight">
                        Lesson {selectedLesson.order || 1}: {selectedLesson.title}
                      </h2>
                      <div className="text-slate-600 font-medium text-[15px] leading-relaxed whitespace-pre-line">
                        {selectedLesson.content || "No detailed content provided for this lesson."}
                      </div>
                    </div>

                    <div className="pt-6 border-t border-slate-200">
                      <div className="flex items-center gap-6 mb-6">
                        <span className="flex items-center gap-1.5 text-xs font-bold text-slate-400">
                          <FiClock className="text-sm stroke-[2.5]" /> 20 min
                        </span>
                        <span className="flex items-center gap-1.5 text-xs font-bold text-orange-500">
                          <FiZap className="text-sm fill-current" /> Earn {selectedLesson.xp_reward || 50} Xp
                        </span>
                      </div>
                      
                      <button 
                        onClick={() => handleMarkComplete(selectedLesson.id)}
                        disabled={selectedLesson.is_completed || markingComplete || !canMarkComplete}
                        title={(!selectedLesson.is_completed && !canMarkComplete) ? "Watch 75% of the video or download resources to complete." : ""}
                        className={`w-full py-3.5 rounded-xl font-black text-sm transition-all flex items-center justify-center gap-2 ${
                          selectedLesson.is_completed 
                            ? "bg-emerald-50 text-emerald-600 border border-emerald-200 cursor-default" 
                            : markingComplete || !canMarkComplete
                              ? "bg-slate-200 text-slate-400 cursor-not-allowed border border-slate-200"
                              : "bg-[#3B82F6] text-white hover:bg-blue-600 active:scale-[0.99] shadow-sm disabled:opacity-50"
                        }`}
                      >
                        {selectedLesson.is_completed ? (
                          <>
                            <FiCheck className="stroke-[3] text-base" />
                            Completed
                          </>
                        ) : markingComplete ? (
                          "Completing..."
                        ) : !canMarkComplete ? (
                          hasVideo ? "Watch 75% of video to complete" : "Download file to complete"
                        ) : (
                          "Mark as Complete"
                        )}
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="bg-white rounded-3xl p-12 text-center shadow-sm border border-slate-100">
                  <FiBookOpen className="text-5xl text-slate-300 mx-auto mb-4" />
                  <h3 className="text-lg font-bold text-slate-700">No Lesson Available</h3>
                  <p className="text-slate-400 text-sm">Please wait for the teacher to add lessons to this course.</p>
                </div>
              )}
            </div>

            {/* Right Column: Course Syllabus & Resources */}
            <div className="space-y-8">
              
              {/* Course Syllabus Card */}
              <div className="bg-white rounded-[24px] p-6 shadow-sm border border-slate-100 space-y-6">
                <h3 className="text-[17px] font-black text-slate-900">Course Syllabus:</h3>
                
                <div className={`space-y-3 pr-2 ${sortedLessons.length > 4 ? "max-h-[350px] overflow-y-auto custom-scrollbar" : ""}`}>
                  {sortedLessons.map((lesson, index) => {
                    const status = getLessonStatus(lesson);
                    const isSelected = selectedLesson?.id === lesson.id;
                    
                    return (
                      <div 
                        key={lesson.id}
                        onClick={() => {
                          if (status !== "locked") setSelectedLesson(lesson);
                        }}
                        className={`p-4 rounded-[16px] transition-all duration-200 cursor-pointer flex gap-4 items-center border border-transparent hover:border-slate-200 ${
                          isSelected
                            ? "bg-[#EAEBFA] shadow-sm border-blue-200"
                            : status === "completed" || status === "in_progress"
                              ? "bg-white shadow-[0_2px_8px_rgba(0,0,0,0.04)]"
                              : "bg-slate-50 opacity-80"
                        }`}
                      >
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                          status === "completed" || status === "in_progress"
                            ? "bg-[#1600D5] text-white shadow-sm" 
                            : "bg-slate-100 text-slate-400"
                        }`}>
                          {status === "completed" || status === "in_progress" ? (
                            <FiCheck className="stroke-[4] text-sm" />
                          ) : (
                            <FiLock className="text-sm stroke-[2.5]" />
                          )}
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <h4 className="text-[15px] font-black text-slate-900 truncate">
                            {lesson.order || (index + 1)}. {lesson.title}
                          </h4>
                          <span className="text-[12px] font-medium text-slate-500 tracking-wide mt-0.5 block">
                            {status === "completed" ? "Completed" : status === "in_progress" ? "In Progress" : "Locked"}
                          </span>
                        </div>
                      </div>
                    );
                  })}

                  {apiLessons.length === 0 && (
                    <p className="text-sm text-slate-400 text-center font-medium py-4">No lessons added yet.</p>
                  )}

                  {/* Aesthetic Static Mock Quiz Row */}
                  <div className="p-4 rounded-[16px] bg-[#FFF3E6] border border-orange-100/50 flex gap-4 items-center opacity-90 cursor-not-allowed shadow-sm">
                    <div className="w-9 h-9 rounded-xl bg-[#FF8C00] text-white flex items-center justify-center shrink-0 shadow-sm shadow-orange-200">
                      <FiStar className="text-base fill-current" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-[15px] font-black text-[#E67E22] truncate">Mid-Term Quiz</h4>
                      <span className="text-[12px] font-bold text-orange-400 mt-0.5 block">Available after L15</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Downloadable Resources Card */}
              <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 space-y-6">
                <div className="flex items-center gap-3 text-slate-800">
                  <div className="text-[22px] text-[#FF8C00]">📁</div>
                  <h3 className="text-lg font-black">Downloadable Resources</h3>
                </div>

                <div className="space-y-4">
                  {/* Dynamic files linked to selected lesson */}
                  {selectedLesson?.pdf_file ? (
                    <div className="flex items-center justify-between p-4 bg-white rounded-2xl border border-slate-100 shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:shadow-md transition-shadow">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-red-50/50 flex items-center justify-center shrink-0">
                          <span className="text-red-500 text-lg font-black leading-none">📄</span>
                        </div>
                        <div>
                          <h4 className="text-[13px] font-black text-slate-900 max-w-[150px] truncate">
                            {selectedLesson?.title || "Lesson"} Notes.pdf
                          </h4>
                          <span className="text-[11px] font-bold text-slate-400 mt-0.5 block">Document</span>
                        </div>
                      </div>
                      <a 
                        href={getMediaUrl(selectedLesson.pdf_file)}
                        target="_blank"
                        rel="noreferrer"
                        onClick={() => setHasDownloadedFile(true)}
                        className="text-slate-400 hover:text-[#1600D5] transition-colors p-2 cursor-pointer"
                      >
                        <FiDownload size={16} className="stroke-[2.5]" />
                      </a>
                    </div>
                  ) : (
                    <div className="text-slate-400 text-sm font-medium">
                      No downloadable resources available.
                    </div>
                  )}
                </div>
              </div>

            </div>

          </div>
        )}

        {/* Quizzes Tab Content */}
        {activeTab === "quizzes" && (
          <div className="bg-white rounded-3xl p-12 text-center shadow-sm border border-slate-100">
            <FiStar className="text-5xl text-orange-400 mx-auto mb-4" />
            <h3 className="text-2xl font-black text-slate-800 mb-2">Quizzes</h3>
            <p className="text-slate-500 max-w-md mx-auto mb-6">
              Complete quizzes assigned by your teacher to test your knowledge and earn extra XP!
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
              {(apiCourse?.quizzes || []).length > 0 ? (
                apiCourse?.quizzes?.map((quiz: any) => (
                  <div key={quiz.id} className="p-6 bg-slate-50 border border-slate-100 rounded-2xl text-left flex justify-between items-center">
                    <div>
                      <h4 className="font-black text-slate-800">{quiz.title}</h4>
                      <p className="text-slate-400 text-xs mt-1">{quiz.questions_count || 10} Questions</p>
                    </div>
                    <button className="px-4 py-2 bg-[#1600D5] text-white font-bold text-xs rounded-xl shadow-sm">
                      Start Quiz
                    </button>
                  </div>
                ))
              ) : (
                <div className="col-span-2 text-slate-400 font-medium py-4 text-center">No quizzes available for this course yet.</div>
              )}
            </div>
          </div>
        )}

        {/* Assignments Tab Content */}
        {activeTab === "assignments" && (
          <div className="bg-white rounded-3xl p-12 text-center shadow-sm border border-slate-100">
            <FiFileText className="text-5xl text-blue-500 mx-auto mb-4" />
            <h3 className="text-2xl font-black text-slate-800 mb-2">Assignments</h3>
            <p className="text-slate-500 max-w-md mx-auto mb-6">
              Track and submit homework or projects assigned to this class.
            </p>
            <div className="space-y-4 max-w-3xl mx-auto text-left">
              {(apiCourse?.assignments || []).length > 0 ? (
                apiCourse?.assignments?.map((asg: any) => (
                  <div key={asg.id} className="p-6 bg-slate-50 border border-slate-100 rounded-2xl flex justify-between items-center">
                    <div>
                      <h4 className="font-black text-slate-800">{asg.title}</h4>
                      <p className="text-slate-400 text-xs mt-1">Due Date: {new Date(asg.due_date).toLocaleDateString()}</p>
                    </div>
                    <button className="px-5 py-2.5 bg-[#1600D5] text-white font-bold text-xs rounded-xl shadow-sm">
                      View Assignment
                    </button>
                  </div>
                ))
              ) : (
                <div className="text-center text-slate-400 font-medium py-4">No assignments assigned yet.</div>
              )}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default CourseDetailsPage;
