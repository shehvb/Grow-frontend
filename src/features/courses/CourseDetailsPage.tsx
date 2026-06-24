import { useState, useEffect } from "react";
import type { FC } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCourseStore } from "../../store/useCourseStore";
import { useLessonStore } from "../../store/useLessonStore";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
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
  FiZap,
  FiX,
  FiEye
} from "react-icons/fi";
import { PiGraduationCap } from "react-icons/pi";
import { assignmentService } from "../../services/assignmentService";
import { quizService } from "../../services/quizService";
import type { StudentAssignment } from "../../types";

type TabType = "lessons" | "quizzes" | "assignments";

const getRemainingTimeText = (dueDateStr?: string) => {
  if (!dueDateStr) return "No deadline";
  const diffMs = new Date(dueDateStr).getTime() - new Date().getTime();
  if (diffMs <= 0) return "Deadline passed";

  const diffSecs = Math.floor(diffMs / 1000);
  const days = Math.floor(diffSecs / 86400);
  const hours = Math.floor((diffSecs % 86400) / 3600);
  const minutes = Math.floor((diffSecs % 3600) / 60);

  let parts = [];
  if (days > 0) parts.push(`${days}d`);
  if (hours > 0) parts.push(`${hours}h`);
  if (minutes > 0) parts.push(`${minutes}m`);

  return `${parts.join(" ")} remaining`;
};

const getFileName = (urlOrPath?: string) => {
  if (!urlOrPath) return "file.pdf";
  const parts = urlOrPath.split("/");
  const lastPart = parts[parts.length - 1];
  return decodeURIComponent(lastPart.split("?")[0] || lastPart);
};

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

  const [selectedAssignment, setSelectedAssignment] = useState<StudentAssignment | null>(null);
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const [assignments, setAssignments] = useState<StudentAssignment[]>([]);
  const [quizzes, setQuizzes] = useState<any[]>([]);
  const [isLoadingAssessments, setIsLoadingAssessments] = useState(false);

  const handleAssignmentSubmit = async () => {
    if (!selectedAssignment || !uploadFile) return;

    if (uploadFile.size > 5 * 1024 * 1024) {
      toast.error("File is too large. Maximum allowed size is 5MB.");
      return;
    }

    setIsUploading(true);
    try {
      await assignmentService.submitStudentAssignment(selectedAssignment.id, uploadFile);
      toast.success("Assignment submitted successfully!");
      setSelectedAssignment(null);
      setUploadFile(null);
      // Re-fetch assignments to show updated state
      const asgData = await assignmentService.getStudentAssignments(courseId);
      setAssignments(asgData);
    } catch (err) {
      toast.error("Failed to submit assignment");
    } finally {
      setIsUploading(false);
    }
  };

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

      const loadAssessments = async () => {
        setIsLoadingAssessments(true);
        try {
          const [asgData, quizData] = await Promise.all([
            assignmentService.getStudentAssignments(courseId),
            quizService.getCourseQuizzes(courseId)
          ]);
          setAssignments(asgData);
          setQuizzes(quizData);
        } catch (err) {
          console.error("Failed to load assessments:", err);
        } finally {
          setIsLoadingAssessments(false);
        }
      };
      loadAssessments();
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

  const getEmbedUrl = (url?: string): string | null => {
    if (!url) return null;
    let safeUrl = url.trim();
    if (!/^https?:\/\//i.test(safeUrl)) {
      safeUrl = 'https://' + safeUrl;
    }
    try {
      const parsed = new URL(safeUrl);
      if (parsed.hostname.includes('youtu.be')) {
        const videoId = parsed.pathname.substring(1);
        return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
      }
      if (parsed.hostname.includes('youtube.com')) {
        if (parsed.pathname.startsWith('/embed/')) {
          return safeUrl;
        }
        const videoId = parsed.searchParams.get('v');
        return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
      }
      if (parsed.hostname.includes('vimeo.com')) {
        const parts = parsed.pathname.split('/');
        const videoId = parts[parts.length - 1];
        return videoId ? `https://player.vimeo.com/video/${videoId}` : null;
      }
    } catch (e) {
      console.error("Failed to parse video URL:", e);
    }
    return null;
  };

  const hasVideo = !!(selectedLesson?.video_url || selectedLesson?.video_file);
  const hasPdf = !!selectedLesson?.pdf_file;
  const isExternalVideo = !!(selectedLesson?.video_url && getEmbedUrl(selectedLesson.video_url));

  const canMarkComplete =
    selectedLesson?.is_completed ||
    (hasVideo && isExternalVideo) ||
    (hasVideo && !isExternalVideo && videoProgress >= 75) ||
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
            className={`flex items-center gap-2 pb-4 font-black text-sm transition-all border-b-[4px] -mb-[2px] ${activeTab === "lessons"
                ? "border-blue-600 text-blue-700"
                : "border-transparent text-slate-400 hover:text-slate-600"
              }`}
          >
            <FiBookOpen className="text-lg stroke-[3]" />
            <span className="text-base">Lessons</span>
          </button>
          <button
            onClick={() => setActiveTab("quizzes")}
            className={`flex items-center gap-2 pb-4 font-black text-sm transition-all border-b-[4px] -mb-[2px] ${activeTab === "quizzes"
                ? "border-blue-600 text-blue-700"
                : "border-transparent text-slate-400 hover:text-slate-600"
              }`}
          >
            <FiStar className="text-lg stroke-[3]" />
            <span className="text-base">Quizzes</span>
          </button>
          <button
            onClick={() => setActiveTab("assignments")}
            className={`flex items-center gap-2 pb-4 font-black text-sm transition-all border-b-[4px] -mb-[2px] ${activeTab === "assignments"
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
                    {selectedLesson?.video_url && getEmbedUrl(selectedLesson.video_url) ? (
                      <iframe
                        src={getEmbedUrl(selectedLesson.video_url)!}
                        title={selectedLesson.title}
                        className="absolute inset-0 w-full h-full"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      ></iframe>
                    ) : selectedLesson?.video_url || selectedLesson?.video_file ? (
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
                        className={`w-full py-3.5 rounded-xl font-black text-sm transition-all flex items-center justify-center gap-2 ${selectedLesson.is_completed
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
                  <AnimatePresence initial={false}>
                    {sortedLessons.map((lesson, index) => {
                      const status = getLessonStatus(lesson);
                      const isSelected = selectedLesson?.id === lesson.id;

                      return (
                        <motion.div
                          key={lesson.id}
                          layout
                          onClick={() => {
                            if (status !== "locked") setSelectedLesson(lesson);
                          }}
                          className={`p-4 rounded-[16px] transition-all duration-200 cursor-pointer flex gap-4 items-center border border-transparent hover:border-slate-200 relative overflow-hidden ${isSelected
                              ? "bg-[#EAEBFA] shadow-sm border-blue-200"
                              : status === "completed" || status === "in_progress"
                                ? "bg-white shadow-[0_2px_8px_rgba(0,0,0,0.04)]"
                                : "bg-slate-50 opacity-80"
                            }`}
                        >
                          {isSelected && status === "in_progress" && (
                            <motion.div 
                              className="absolute left-0 top-0 bottom-0 w-1 bg-blue-600"
                              layoutId="activeLessonGlow"
                              animate={{ opacity: [0.4, 1, 0.4] }}
                              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                            />
                          )}

                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${status === "completed" || status === "in_progress"
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
                            <motion.div 
                              className="overflow-hidden"
                              initial={false}
                              animate={{ height: isSelected ? "auto" : "20px" }}
                            >
                              <span className="text-[12px] font-medium text-slate-500 tracking-wide mt-0.5 block">
                                {status === "completed" ? "Completed" : status === "in_progress" ? "In Progress" : "Locked"}
                              </span>
                              {isSelected && lesson.content && (
                                <p className="text-[11px] text-slate-400 font-medium mt-1 leading-normal">
                                  {lesson.content.substring(0, 60)}...
                                </p>
                              )}
                            </motion.div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </AnimatePresence>

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
                      <motion.a
                        href={getMediaUrl(selectedLesson.pdf_file)}
                        target="_blank"
                        rel="noreferrer"
                        onClick={() => setHasDownloadedFile(true)}
                        className="text-slate-400 hover:text-[#1600D5] transition-colors p-2 cursor-pointer"
                        whileHover={{ y: [0, 4, 0] }}
                        transition={{ duration: 0.6, repeat: Infinity }}
                      >
                        <FiDownload size={16} className="stroke-[2.5]" />
                      </motion.a>
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
        {/* Quizzes Tab Content */}
        {activeTab === "quizzes" && (
          <div className="w-full">
            {isLoadingAssessments ? (
              <div className="bg-white rounded-3xl p-12 text-center shadow-sm border border-slate-100 max-w-md mx-auto">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#1600D5] mx-auto mb-4"></div>
                <div className="text-slate-400 font-bold text-sm">Loading quizzes...</div>
              </div>
            ) : quizzes.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {quizzes.map((quiz: any, index: number) => {
                  const duration = quiz.duration_minutes || (quiz.time_limit_seconds ? Math.floor(quiz.time_limit_seconds / 60) : 20);
                  const qCount = quiz.questions?.length || 12;
                  const isCompleted = quiz.is_completed === true;

                  return (
                    <div
                      key={quiz.id}
                      className={`bg-white rounded-[24px] border overflow-hidden shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col w-full font-['Nunito'] ${isCompleted ? 'border-green-100' : 'border-slate-100'
                        }`}
                    >
                      {/* Banner Section */}
                      <div className={`relative h-[160px] flex items-center justify-center overflow-hidden shrink-0 select-none transition-colors duration-300 ${isCompleted ? 'bg-[#D1F7D6]' : 'bg-[#C7C2FF]'
                        }`}>
                        {/* Module Tag */}
                        <div className={`absolute top-5 left-5 text-white px-3 py-1 rounded-[8px] text-[10px] font-black uppercase tracking-wider transition-colors duration-300 ${isCompleted ? 'bg-[#0ED600]' : 'bg-[#1600D5]'
                          }`}>
                          Module {index + 1}
                        </div>

                        {/* Completed Badge on top right */}
                        {isCompleted && (
                          <div className="absolute top-5 right-5 bg-[#0ED600] text-white px-2.5 py-1 rounded-[8px] text-[10px] font-black uppercase tracking-wider flex items-center gap-1 select-none">
                            <FiCheck className="stroke-[3] text-[11px]" />
                            <span>Completed</span>
                          </div>
                        )}

                        {/* Math Vector Graphic overlay */}
                        <div className={`absolute bottom-[-15px] right-2 font-black text-[110px] leading-none pointer-events-none select-none font-sans italic transition-colors duration-300 ${isCompleted ? 'text-[#0ED600]/15' : 'text-[#1600D5]/15'
                          }`}>
                          √x
                        </div>
                      </div>

                      {/* Content Section */}
                      <div className="p-6 flex flex-col flex-1 text-left">
                        <h4 className="text-xl md:text-[22px] font-black text-slate-900 leading-tight">
                          {quiz.title}
                        </h4>
                        <p className="text-slate-400 text-[13px] font-bold leading-relaxed mb-6 mt-2 flex-1">
                          {quiz.description || "Test your understanding of basic arithmetic operations and number sets in algebra."}
                        </p>

                        {/* Metadata Row */}
                        <div className="flex items-center gap-6 mb-6">
                          {/* Questions count */}
                          <div className="flex items-center gap-2 text-sm font-bold text-slate-500">
                            <div className="w-[22px] h-[22px] rounded-[6px] border-2 border-slate-300 flex items-center justify-center font-black text-slate-400 text-[10px]">
                              ?
                            </div>
                            <span className="text-slate-500 font-extrabold text-[13px]">2 QS</span>
                          </div>

                          {/* Time Limit */}
                          <div className="flex items-center gap-2 text-sm font-bold text-slate-500">
                            <FiClock className="text-slate-400 text-lg stroke-[2.5]" />
                            <span className="text-slate-500 font-extrabold text-[13px]">{duration} Mins</span>
                          </div>
                        </div>

                        {/* Action Button */}
                        <button
                          onClick={() => navigate(`/student/courses/${courseId}/quiz/${quiz.id}`)}
                          className={`w-full py-4 active:scale-[0.98] transition-all text-white  text-sm rounded-xl flex items-center justify-center gap-2 shadow-sm font-bold ${isCompleted ? 'bg-[#0ED600] hover:bg-green-600' : 'bg-[#1600D5] hover:bg-blue-700'
                            }`}
                        >
                          <span>{isCompleted ? 'Retake Quiz' : 'Start Quiz'}</span>
                          <span className="text-[10px] leading-none">►</span>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="bg-white rounded-3xl p-12 text-center shadow-sm border border-slate-100 max-w-md mx-auto">
                <FiStar className="text-5xl text-orange-400 mx-auto mb-4" />
                <h3 className="text-2xl font-black text-slate-800 mb-2">Quizzes</h3>
                <p className="text-slate-500 max-w-sm mx-auto">No quizzes available for this course yet.</p>
              </div>
            )}
          </div>
        )}

        {/* Assignments Tab Content */}
        {activeTab === "assignments" && (
          selectedAssignment ? (
            <div className="w-full text-left bg-white rounded-3xl p-8 md:p-10 border border-slate-100 shadow-sm animate-fade-in font-['Nunito']">
              {/* Back Button */}
              <button
                onClick={() => {
                  setSelectedAssignment(null);
                  setUploadFile(null);
                }}
                className="mb-8 flex items-center gap-2 text-slate-500 hover:text-[#1600D5] font-black text-sm transition-colors"
              >
                <FiArrowLeft className="stroke-[2.5]" />
                <span>Back to Assignments</span>
              </button>

              {/* Title Header */}
              <div className="mb-8">
                <span className="text-[#1600D5] text-xs font-black tracking-widest uppercase mb-1 block">ASSIGNMENT DETAILS</span>
                <h2 className="text-3xl font-black text-slate-900 leading-tight">{selectedAssignment.title}</h2>
              </div>

              {/* Metric Boxes Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {/* Deadline Box */}
                <div className="bg-[#EEF2FF] border border-[#1600D5]/10 rounded-[20px] p-5 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center shrink-0 shadow-sm">
                    <FiClock className="text-[#1600D5] text-2xl stroke-[2.5]" />
                  </div>
                  <div>
                    <span className="text-slate-400 text-[11px] font-black uppercase tracking-widest block">Deadline</span>
                    <span className="text-slate-800 font-extrabold text-sm md:text-base mt-0.5 block">
                      {(selectedAssignment.due_date || selectedAssignment.deadline)
                        ? new Date(selectedAssignment.due_date || selectedAssignment.deadline!).toLocaleString()
                        : "No deadline"}
                    </span>
                    <span className="text-[#1600D5] text-xs font-extrabold mt-0.5 block">
                      {getRemainingTimeText(selectedAssignment.due_date || selectedAssignment.deadline)}
                    </span>
                  </div>
                </div>

                {/* XP Rewards Box */}
                <div className="bg-[#FFEED9] border border-[#FF8000]/10 rounded-[20px] p-5 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center shrink-0 shadow-sm">
                    <FiZap className="text-[#FF8000] text-2xl stroke-[2.5]" />
                  </div>
                  <div>
                    <span className="text-slate-400 text-[11px] font-black uppercase tracking-widest block">XP Rewards</span>
                    <span className="text-[#FF8000] font-black text-[20px] mt-0.5 block">
                      +{selectedAssignment.xp_reward || 150} XP
                    </span>
                    <span className="text-red-500 text-xs font-extrabold mt-0.5 block">
                      ▲ -{selectedAssignment.late_penalty_xp || 20} XP if late
                    </span>
                  </div>
                </div>
              </div>

              {/* Teacher Upload Instructions PDF Container */}
              {(selectedAssignment.teacher_file || selectedAssignment.teacher_file_url) && (
                <div className="bg-[#F8F9FA] border border-slate-100 rounded-2xl p-6 mb-8 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-sm">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-xl bg-[#E6E5FA] flex items-center justify-center shrink-0 select-none">
                      <FiFileText className="text-[#1600D5] text-2xl stroke-[2.5]" />
                    </div>
                    <div>
                      <h4 className="text-slate-800 font-black text-base leading-tight">Assignment File (Teacher Upload)</h4>
                      <p className="text-slate-400 text-xs font-bold mt-1 max-w-[450px] leading-relaxed">
                        Download the assignment PDF uploaded by your teacher to view the questions and requirements.
                      </p>
                      {/* File details below description */}
                      <span className="text-[11px] font-bold text-slate-400 mt-2 block select-none">
                        📄 {getFileName(selectedAssignment.teacher_file || selectedAssignment.teacher_file_url || undefined)}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <a
                      href={getMediaUrl(selectedAssignment.teacher_file || selectedAssignment.teacher_file_url!)}
                      target="_blank"
                      rel="noreferrer"
                      className="border border-[#1600D5] text-[#1600D5] hover:bg-blue-50 px-4 py-3 rounded-xl text-xs font-black flex items-center gap-2 shadow-sm transition-all"
                    >
                      <FiEye className="stroke-[2.5] text-sm" />
                      <span>View Assignment</span>
                    </a>
                    <a
                      href={getMediaUrl(selectedAssignment.teacher_file || selectedAssignment.teacher_file_url!)}
                      download
                      target="_blank"
                      rel="noreferrer"
                      className="bg-[#1600D5] hover:bg-blue-700 text-white px-4 py-3 rounded-xl text-xs font-black flex items-center gap-2 shadow-sm transition-all"
                    >
                      <FiDownload className="stroke-[2.5] text-sm" />
                      <span>Download PDF</span>
                    </a>
                  </div>
                </div>
              )}

              {/* Instructions for Student */}
              <div className="mb-8">
                <h3 className="text-lg font-black text-slate-900 mb-4 uppercase tracking-wider">Instructions for Student:</h3>
                <div className="bg-slate-50 border border-slate-100 rounded-2xl p-6 space-y-4 font-bold text-slate-600 text-[15px]">
                  <div className="flex gap-2">
                    <span className="text-[#1600D5] font-black">1.</span>
                    <p>Download the assignment PDF uploaded by your teacher.</p>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-[#1600D5] font-black">2.</span>
                    <p>Complete the exercises as per instructions.</p>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-[#1600D5] font-black">3.</span>
                    <p>Upload your completed assignment as a PDF or Word document in the area below.</p>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-[#1600D5] font-black">4.</span>
                    <p>After uploading, press the "Submit Assignment" button to finalize submission and earn full XP.</p>
                  </div>
                </div>
              </div>

              {/* Upload Assignment Area */}
              <div className="mb-8">
                <h3 className="text-lg  text-slate-900 mb-4 uppercase tracking-wider font-bold">Upload Assignment</h3>

                {(selectedAssignment.submission_status === 'pending' || selectedAssignment.submission_status === 'missing' || !selectedAssignment.submission_status) ? (
                  <div className="space-y-4">
                    {/* Drag and Drop Zone */}
                    <motion.div 
                      className="border-2 border-dashed border-slate-300 rounded-[16px] p-10 bg-[#F8F9FA] hover:bg-slate-100/50 transition-all text-center flex flex-col items-center justify-center cursor-pointer relative overflow-hidden"
                      whileHover={{ 
                        borderColor: "#1600D5",
                        backgroundColor: "rgba(22, 0, 213, 0.02)"
                      }}
                    >
                      <input
                        type="file"
                        id="file-upload"
                        className="hidden"
                        onChange={(e) => setUploadFile(e.target.files ? e.target.files[0] : null)}
                      />
                      <label htmlFor="file-upload" className="cursor-pointer flex flex-col items-center w-full h-full justify-center">
                        <motion.div
                          animate={{ y: [0, -8, 0] }}
                          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                        >
                          <FiFileText className="text-5xl text-slate-300 mb-3" />
                        </motion.div>
                        <span className="text-slate-700 font-bold text-[15px]">Drag & drop your assignment here or click to upload</span>
                        <span className="text-xs text-slate-400 mt-1 font-bold">PDF, DOC, DOCX up to 5MB</span>
                      </label>
                    </motion.div>

                    {/* File Selected Badge */}
                    {uploadFile && (
                      <div className="bg-[#EEFDF0] border border-[#0ED600]/20 rounded-xl p-4 flex items-center justify-between text-[#0ED600] font-bold text-sm w-full max-w-xl mx-auto">
                        <div className="flex items-center gap-2">
                          <FiCheck className="stroke-[3]" />
                          <span>Selected: {uploadFile.name}</span>
                        </div>
                        <button
                          onClick={() => setUploadFile(null)}
                          className="p-1 text-[#0ED600] hover:bg-[#EEFDF0] hover:text-[#0C9F00] rounded-full transition-colors"
                        >
                          <FiX size={16} />
                        </button>
                      </div>
                    )}

                    {/* Wide Submit Button */}
                    <button
                      onClick={handleAssignmentSubmit}
                      disabled={!uploadFile || isUploading}
                      className="w-full max-w-xl mx-auto mt-6 py-4 bg-[#1600D5] hover:bg-blue-700 active:scale-[0.98] transition-all text-white  text-[17px] rounded-xl flex items-center justify-center shadow-md disabled:opacity-50 disabled:pointer-events-none gap-2 font-bold"
                    >
                      {isUploading ? (
                        <>
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                          <span>Submitting...</span>
                        </>
                      ) : (
                        <span>Submit</span>
                      )}
                    </button>
                  </div>
                ) : selectedAssignment.submission_status === 'graded' ? (
                  <div className="space-y-6">
                    <div className="bg-[#EEFDF0] border border-[#0ED600]/20 text-[#0ED600] p-6 rounded-2xl flex items-center gap-3 font-black text-base shadow-sm">
                      <div className="w-8 h-8 rounded-full bg-[#0ED600] text-white flex items-center justify-center shrink-0">
                        <FiCheck className="stroke-[3] text-lg" />
                      </div>
                      <div>
                        <span>Assignment has been successfully graded!</span>
                        <p className="text-xs text-[#0ED600]/80 font-bold mt-0.5">Check your feedback and score below.</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Score Result Box */}
                      <div className="bg-[#F4FDF4] border border-[#0ED600]/10 rounded-[20px] p-6 flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center shrink-0 shadow-sm border border-slate-100">
                          <span className="text-[#0ED600] font-black text-[22px]">%</span>
                        </div>
                        <div>
                          <span className="text-slate-400 text-[11px] font-black uppercase tracking-widest block">Grade Score</span>
                          <span className="text-slate-800 font-black text-2xl mt-0.5 block">
                            {selectedAssignment.score ? `${Number(selectedAssignment.score).toFixed(0)}%` : "100%"}
                          </span>
                        </div>
                      </div>

                      {/* XP Earned Box */}
                      <div className="bg-[#FFEED9] border border-[#FF8000]/10 rounded-[20px] p-6 flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center shrink-0 shadow-sm border border-slate-100">
                          <FiZap className="text-[#FF8000] text-2xl stroke-[2.5]" />
                        </div>
                        <div>
                          <span className="text-slate-400 text-[11px] font-black uppercase tracking-widest block">XP Earned</span>
                          <span className="text-[#FF8000] font-black text-2xl mt-0.5 block">
                            +{selectedAssignment.xp_awarded || selectedAssignment.xp_reward || 150} XP
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Teacher Feedback Block */}
                    {selectedAssignment.feedback && (
                      <div className="bg-[#F8F9FA] border border-slate-100 rounded-2xl p-6">
                        <h4 className="text-slate-800 font-black text-xs uppercase tracking-wider mb-2">Teacher's Feedback:</h4>
                        <p className="text-slate-600 font-extrabold text-[15px] leading-relaxed italic bg-white border border-slate-100 p-4 rounded-xl">
                          "{selectedAssignment.feedback}"
                        </p>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="bg-[#EEFDF0] border border-[#0ED600]/20 text-[#0ED600] p-6 rounded-2xl flex items-center gap-3 font-black text-base shadow-sm">
                    <div className="w-8 h-8 rounded-full bg-[#0ED600] text-white flex items-center justify-center shrink-0">
                      <FiCheck className="stroke-[3] text-lg" />
                    </div>
                    <div>
                      <span>Assignment has been successfully submitted!</span>
                      <p className="text-xs text-[#0ED600]/80 font-bold mt-0.5">Your work is received and awaiting teacher grading.</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            // Assignment List view
            <div className="w-full">
              {isLoadingAssessments ? (
                <div className="bg-white rounded-3xl p-12 text-center shadow-sm border border-slate-100 max-w-md mx-auto">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#1600D5] mx-auto mb-4"></div>
                  <div className="text-slate-400 font-bold text-sm">Loading assignments...</div>
                </div>
              ) : assignments.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-left">
                  {assignments.map((asg: StudentAssignment, index: number) => {
                    const rawDueDate = asg.due_date || asg.deadline;
                    const formattedDate = rawDueDate ? new Date(rawDueDate).toLocaleDateString() : "No deadline";
                    const isSubmitted = asg.submission_status === 'submitted' || asg.submission_status === 'graded';

                    return (
                      <div
                        key={asg.id}
                        className="bg-white rounded-[24px] border border-slate-100 overflow-hidden shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col w-full font-['Nunito']"
                      >
                        {/* Lavender Banner Section */}
                        <div className="relative h-[160px] bg-[#C7C2FF] flex items-center justify-center overflow-hidden shrink-0 select-none">
                          {/* Module Tag */}
                          <div className="absolute top-5 left-5 bg-[#1600D5] text-white px-3 py-1 rounded-[8px] text-[10px] font-black uppercase tracking-wider">
                            Module {index + 1}
                          </div>

                          {/* Math Curve outline overlay */}
                          <div className="absolute bottom-[-15px] right-2 text-[#1600D5]/15 font-black text-[110px] leading-none pointer-events-none select-none font-sans italic">
                            √x
                          </div>
                        </div>

                        {/* Content Section */}
                        <div className="p-6 flex flex-col flex-1 text-left">
                          <h4 className="text-xl md:text-[22px] font-black text-slate-900 leading-tight">
                            {asg.title}
                          </h4>
                          <p className="text-slate-400 text-[13px] font-bold leading-relaxed mb-6 mt-2 flex-1 line-clamp-2">
                            {asg.description || "Complete this assignment to demonstrate your understanding of this module's topics."}
                          </p>

                          {/* Metadata Row */}
                          <div className="flex items-center gap-6 mb-6">
                            {/* Deadline Date */}
                            <div className="flex items-center gap-2 text-sm font-bold text-slate-500">
                              <FiClock className="text-slate-400 text-lg stroke-[2.5]" />
                              <span className="text-slate-500 font-extrabold text-[13px]">{formattedDate}</span>
                            </div>

                            {/* Reward XP */}
                            <div className="flex items-center gap-2 text-sm font-bold text-slate-500">
                              <FiZap className="text-orange-400 text-lg stroke-[2.5]" />
                              <span className="text-slate-500 font-extrabold text-[13px]">{asg.xp_reward || 150} XP</span>
                            </div>
                          </div>

                          {/* Submission Status overlay indicator */}
                          <div className="mb-4 flex items-center justify-between">
                            <span className={`text-[11px] font-black uppercase tracking-wider px-2.5 py-1 rounded-md ${asg.submission_status === 'graded' ? 'bg-[#D1F7D6] text-[#0ED600]' :
                                isSubmitted ? 'bg-[#EEFDF0] text-[#0ED600]' :
                                  'bg-orange-50 text-orange-500'
                              }`}>
                              {asg.submission_status === 'graded' ? 'graded' : (asg.submission_status || 'pending')}
                            </span>

                            {asg.submission_status === 'graded' && asg.score && (
                              <span className="text-[#0ED600] font-black text-sm font-sans">
                                Score: {Number(asg.score).toFixed(0)}%
                              </span>
                            )}
                          </div>

                          {/* Action Button */}
                          <button
                            onClick={() => setSelectedAssignment(asg)}
                            className={`w-full py-4 active:scale-[0.98] transition-all text-white text-sm rounded-xl flex items-center justify-center gap-2 shadow-sm font-bold ${asg.submission_status === 'graded' ? 'bg-[#0ED600] hover:bg-green-600' : 'bg-[#1600D5] hover:bg-blue-700'
                              }`}
                          >
                            <span>{asg.submission_status === 'graded' ? 'View Feedback' : 'View Assignment'}</span>
                            <span className="text-[10px] leading-none">►</span>
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="bg-white rounded-3xl p-12 text-center shadow-sm border border-slate-100 max-w-md mx-auto">
                  <FiFileText className="text-5xl text-blue-500 mx-auto mb-4" />
                  <h3 className="text-2xl font-black text-slate-800 mb-2">Assignments</h3>
                  <p className="text-slate-500 max-w-sm mx-auto">No assignments assigned yet.</p>
                </div>
              )}
            </div>
          )
        )}

      </div>

      {/* Legacy Assignment Modal Removed */}
    </div>
  );
};

export default CourseDetailsPage;
