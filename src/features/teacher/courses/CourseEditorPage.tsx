import type { FC } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import {
  FiArrowLeft,
  FiPlus,
  FiPlay,
  FiZap,
  FiInfo,
  FiEdit3,
  FiTrash2,
  FiLock,
  FiUnlock,
  FiClock,
} from "react-icons/fi";
import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import { useCourseStore } from "../../../store/useCourseStore";
import { useLessonStore } from "../../../store/useLessonStore";
import { useCountUp } from "../hooks/useCountUp";

// ─── Variant Dictionaries ────────────────────────────────────────────────────

const pageVariants = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" as any } },
};

const lessonRowVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.32, ease: "easeOut" as any } },
  exit: { opacity: 0, height: 0, marginBottom: 0, transition: { duration: 0.22 } },
};

const sidebarCardVariants = {
  hidden: { opacity: 0, x: 16 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: "easeOut" as any, delay: 0.15 } },
};

// ─── Count-Up Stat Row ───────────────────────────────────────────────────────

const StatRow: FC<{ label: string; value: number; suffix?: string; icon?: React.ReactNode }> = ({
  label,
  value,
  suffix = "",
  icon,
}) => {
  const displayValue = useCountUp(value, { suffix, duration: 1.2, delay: 0.3 });
  return (
    <div>
      <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-1">{label}</p>
      <div className="flex items-center gap-2 text-3xl font-black text-slate-800 tracking-tight">
        {icon}
        <motion.span>{displayValue}</motion.span>
      </div>
    </div>
  );
};

// ─── Component ───────────────────────────────────────────────────────────────

const CourseEditorPage: FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { selectedCourse: course, courseStudents, getCourseById, getCourseStudents } = useCourseStore();
  const { lessons, fetchLessons, deleteLesson, updateLesson, reorderLessons, isLoading: lessonsLoading } = useLessonStore();
  const [isDeleting, setIsDeleting] = useState<number | null>(null);

  const getEmbedUrl = (url: string): string | null => {
    if (!url) return null;
    let safeUrl = url.trim();
    if (!/^https?:\/\//i.test(safeUrl)) {
      safeUrl = "https://" + safeUrl;
    }
    try {
      const parsed = new URL(safeUrl);
      if (parsed.hostname.includes("youtu.be")) {
        const videoId = parsed.pathname.substring(1);
        return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
      }
      if (parsed.hostname.includes("youtube.com")) {
        if (parsed.pathname.startsWith("/embed/")) return safeUrl;
        const videoId = parsed.searchParams.get("v");
        return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
      }
      if (parsed.hostname.includes("vimeo.com")) {
        const parts = parsed.pathname.split("/");
        const videoId = parts[parts.length - 1];
        return videoId ? `https://player.vimeo.com/video/${videoId}` : null;
      }
    } catch (e) {
      console.error("Failed to parse video URL:", e);
    }
    return url;
  };

  const previewLesson = [...lessons]
    .sort((a, b) => (a.order || 0) - (b.order || 0))
    .find((l) => l.video_url);

  const embedUrl = previewLesson ? getEmbedUrl(previewLesson.video_url) : null;
  const totalXP = lessons.reduce(
    (sum, lesson) => sum + (lesson.xp_reward || 0) + (lesson.bonus_xp || 0),
    0
  );

  const toggleLessonStatus = async (lesson: any) => {
    const newStatus = lesson.status === "published" ? "draft" : "published";
    const formData = new FormData();
    formData.append("status", newStatus);
    try {
      await updateLesson(lesson.id, formData);
      toast.success(`Lesson set to ${newStatus}`);
    } catch (error) {
      toast.error("Failed to update status");
    }
  };

  const handleReorder = async (draggedId: number, targetId: number) => {
    if (draggedId === targetId) return;

    const sortedLessons = [...lessons].sort((a, b) => {
      if (a.order !== b.order) return (a.order || 0) - (b.order || 0);
      return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
    });

    const draggedIndex = sortedLessons.findIndex((l) => l.id === draggedId);
    const targetIndex = sortedLessons.findIndex((l) => l.id === targetId);

    if (draggedIndex === -1 || targetIndex === -1) return;

    const updatedList = [...sortedLessons];
    const [draggedItem] = updatedList.splice(draggedIndex, 1);
    updatedList.splice(targetIndex, 0, draggedItem);

    const orderedIds = updatedList.map((l) => l.id);

    try {
      if (id) {
        await reorderLessons(parseInt(id, 10), orderedIds);
        toast.success("Lessons reordered successfully!");
      }
    } catch (error) {
      toast.error("Failed to reorder lessons");
      if (id) fetchLessons(parseInt(id, 10));
    }
  };

  useEffect(() => {
    if (id) {
      const courseId = parseInt(id, 10);
      getCourseById(courseId);
      getCourseStudents(courseId);
      fetchLessons(courseId);
    }
  }, [id, getCourseById, getCourseStudents, fetchLessons]);

  useEffect(() => {
    if (!lessonsLoading && lessons.length === 0 && id) {
      navigate(`/teacher/courses/${id}/lessons/new`);
    }
  }, [lessons, lessonsLoading, id, navigate]);

  return (
    <motion.div
      variants={pageVariants}
      initial="hidden"
      animate="visible"
      className="space-y-8 pb-20"
    >
      {/* Header Area */}
      <div className="space-y-4">
        <Link
          to="/teacher/courses"
          className="flex items-center text-slate-400 font-medium text-sm hover:text-slate-600 transition-colors w-fit"
        >
          <FiArrowLeft className="mr-2" />
          Back to Courses
        </Link>

        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <h1 className="text-3xl font-black text-slate-800 tracking-tight">
                {course?.title || "Loading..."}
              </h1>
              <span className="bg-emerald-50 text-emerald-500 text-[10px] font-black uppercase tracking-wider px-2 py-1 rounded-md">
                published
              </span>
            </div>
            <p className="text-slate-400 font-medium">
              {course?.description || "No description available"}
            </p>
          </div>

          <Link
            to={`/teacher/courses/${id}/lessons/new`}
            className="px-6 py-3 bg-[#FF8000] text-white font-black rounded-xl shadow-lg shadow-orange-100 hover:bg-orange-600 hover:-translate-y-0.5 transition-all flex items-center gap-2"
          >
            <FiPlus className="text-xl" />
            <span>Add Lesson</span>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content Area */}
        <div className="lg:col-span-2 space-y-8">
          {/* Course Preview Video */}
          <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100">
            <h3 className="text-xl font-black text-slate-800 mb-6">
              Course Preview
            </h3>
            <div className="relative aspect-video rounded-3xl overflow-hidden bg-slate-900 group">
              {embedUrl ? (
                embedUrl.includes("youtube.com") ||
                embedUrl.includes("vimeo.com") ? (
                  <iframe
                    src={embedUrl}
                    title="Course Preview"
                    className="absolute inset-0 w-full h-full"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                ) : (
                  <video
                    src={embedUrl}
                    controls
                    className="absolute inset-0 w-full h-full object-contain"
                  />
                )
              ) : (
                <>
                  <img
                    src="https://images.unsplash.com/photo-1511367461989-f85a21fda167?q=80&w=2000&auto=format&fit=crop"
                    alt="Course Preview Thumbnail"
                    className="w-full h-full object-cover opacity-60"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="flex flex-col items-center gap-3">
                      <div className="w-20 h-20 bg-slate-700/50 rounded-full flex items-center justify-center text-white/50 backdrop-blur-md">
                        <FiPlay size={32} />
                      </div>
                      <p className="text-white/50 text-[10px] font-black uppercase tracking-widest">
                        No Lesson Videos Available
                      </p>
                    </div>
                  </div>
                </>
              )}
            </div>
            <p className="text-center text-slate-400 text-xs font-medium mt-6 leading-relaxed">
              {previewLesson
                ? `Currently showing preview from Lesson: ${previewLesson.title}`
                : "This is how students will see the course introduction. Add a video to any lesson to set it as the preview."}
            </p>
          </div>

          {/* Course Content - Lessons List */}
          <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100 space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-black text-slate-800">
                Course Content
              </h3>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                {lessons.length} Lessons
              </span>
            </div>

            <div className="space-y-4">
              {lessons.length === 0 ? (
                <div className="text-center py-12 border-2 border-dashed border-slate-100 rounded-3xl">
                  <p className="text-slate-400 font-medium">
                    No lessons yet. Click "Add Lesson" to get started!
                  </p>
                </div>
              ) : (
                <AnimatePresence>
                  {lessons
                    .sort((a, b) => {
                      if (a.order !== b.order)
                        return (a.order || 0) - (b.order || 0);
                      return (
                        new Date(a.created_at).getTime() -
                        new Date(b.created_at).getTime()
                      );
                    })
                    .map((lesson, index) => (
                      <motion.div
                        key={lesson.id}
                        layout
                        variants={lessonRowVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        draggable
                        onDragStart={(e) =>
                          (e as any).dataTransfer.setData(
                            "lessonId",
                            lesson.id.toString()
                          )
                        }
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={async (e) => {
                          e.preventDefault();
                          const draggedId = parseInt(
                            (e as any).dataTransfer.getData("lessonId"),
                            10
                          );
                          if (draggedId === lesson.id) return;
                          handleReorder(draggedId, lesson.id);
                        }}
                        className="group flex items-center justify-between p-6 rounded-[2rem] border border-slate-50 bg-slate-50/30 hover:bg-white hover:border-blue-100 hover:shadow-xl transition-all"
                      >
                        <div className="flex items-center gap-5">
                          <div className="px-3 h-12 rounded-[1.25rem] bg-white shadow-sm border border-slate-100 flex items-center justify-center text-[10px] font-black text-slate-400 group-hover:text-blue-600 transition-colors shrink-0 whitespace-nowrap">
                            LESSON {index + 1}
                          </div>
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <span
                                className={`text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-md ${
                                  lesson.status === "published"
                                    ? "bg-emerald-50 text-emerald-500"
                                    : "bg-slate-100 text-slate-400"
                                }`}
                              >
                                {lesson.status || "draft"}
                              </span>
                              <h4 className="text-sm font-black text-slate-800 group-hover:text-blue-600 transition-colors leading-tight">
                                {lesson.title}
                              </h4>
                            </div>
                            <div className="flex items-center gap-3">
                              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1">
                                <FiClock className="text-xs" />
                                20 min
                              </span>
                              <span className="w-1 h-1 bg-slate-200 rounded-full"></span>
                              <span className="text-[10px] font-bold text-orange-500 uppercase tracking-widest flex items-center gap-1">
                                <FiZap className="text-xs" />
                                {lesson.xp_reward} XP
                              </span>
                              {lesson.bonus_xp > 0 && (
                                <>
                                  <span className="w-1 h-1 bg-slate-200 rounded-full"></span>
                                  <span className="text-[10px] font-bold text-blue-500 uppercase tracking-widest">
                                    +{lesson.bonus_xp} bonus
                                  </span>
                                </>
                              )}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-all">
                          <button
                            onClick={() => toggleLessonStatus(lesson)}
                            className={`p-2 rounded-xl transition-all ${
                              lesson.status === "published"
                                ? "text-emerald-500 hover:bg-emerald-50"
                                : "text-slate-400 hover:text-slate-600 hover:bg-slate-100"
                            }`}
                            title={
                              lesson.status === "published"
                                ? "Unpublish"
                                : "Publish"
                            }
                          >
                            {lesson.status === "published" ? (
                              <FiUnlock size={18} />
                            ) : (
                              <FiLock size={18} />
                            )}
                          </button>
                          <Link
                            to={`/teacher/courses/${id}/lessons/${lesson.id}`}
                            className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all"
                            title="Edit Lesson"
                          >
                            <FiEdit3 size={18} />
                          </Link>
                          <button
                            onClick={async () => {
                              if (
                                window.confirm(
                                  "Are you sure you want to delete this lesson?"
                                )
                              ) {
                                setIsDeleting(lesson.id);
                                try {
                                  await deleteLesson(lesson.id);
                                  fetchLessons(parseInt(id!, 10));
                                  toast.success(
                                    "Lesson deleted and list reordered"
                                  );
                                } catch (error) {
                                  toast.error("Failed to delete lesson");
                                } finally {
                                  setIsDeleting(null);
                                }
                              }
                            }}
                            disabled={isDeleting === lesson.id}
                            className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all disabled:opacity-50"
                            title="Delete Lesson"
                          >
                            {isDeleting === lesson.id ? (
                              <div className="w-4 h-4 border-2 border-red-500 border-t-transparent rounded-full animate-spin" />
                            ) : (
                              <FiTrash2 size={18} />
                            )}
                          </button>
                        </div>
                      </motion.div>
                    ))}
                </AnimatePresence>
              )}
            </div>
          </div>
        </div>

        {/* Sidebar Area */}
        <div className="space-y-8">
          {/* Course Stats Card */}
          <motion.div
            variants={sidebarCardVariants}
            initial="hidden"
            animate="visible"
            className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100"
          >
            <h3 className="text-lg font-black text-slate-800 mb-6">
              Course Stats
            </h3>
            <div className="space-y-6">
              <StatRow
                label="Total Lessons"
                value={course?.lesson_count ?? lessons.length}
              />
              <StatRow
                label="Enrolled Students"
                value={courseStudents.length}
              />
              <StatRow
                label="Total XP"
                value={totalXP}
                icon={<FiZap className="text-orange-500" />}
              />
            </div>
          </motion.div>

          {/* Enrolled Students List */}
          <motion.div
            variants={sidebarCardVariants}
            initial="hidden"
            animate="visible"
            className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100"
          >
            <h3 className="text-lg font-black text-slate-800 mb-6">
              Students
            </h3>
            {courseStudents.length === 0 ? (
              <p className="text-sm text-slate-400 font-medium">
                No students enrolled yet.
              </p>
            ) : (
              <div className="space-y-4">
                {courseStudents.map((enrollment) => (
                  <div key={enrollment.id} className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-500">
                      {enrollment.student?.username?.charAt(0).toUpperCase() ||
                        "S"}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-800">
                        {enrollment.student?.first_name}{" "}
                        {enrollment.student?.last_name}
                      </p>
                      <p className="text-xs text-slate-400">
                        {enrollment.student?.username ||
                          enrollment.student?.email}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </motion.div>

          {/* Teacher Controls Info Box */}
          <motion.div
            variants={sidebarCardVariants}
            initial="hidden"
            animate="visible"
            className="bg-blue-100/50 p-8 rounded-[2.5rem] border border-blue-200/50"
          >
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
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default CourseEditorPage;
