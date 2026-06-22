import type { FC } from "react";
import { useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import {
  FiArrowLeft,
  FiSave,
  FiUploadCloud,
  FiZap,
  FiClock,
  FiEye,
  FiEdit3,
  FiPlay,
  FiChevronDown,
} from "react-icons/fi";
import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLessonStore } from "../../../store/useLessonStore";
import { toast } from "react-hot-toast";
import { useCountUp } from "../hooks/useCountUp";

// ─── Variant Dictionaries ────────────────────────────────────────────────────

const pageVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" as any } },
};

// Preview text cross-fade — exits upward, enters from below
const previewTextVariants = {
  initial: { opacity: 0, y: 6 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.25, ease: "easeOut" as any } },
  exit: { opacity: 0, y: -6, transition: { duration: 0.18 } },
};

// Dropzone active state scale for icon
const dropzoneIconVariants = {
  idle: { scale: 1 },
  active: { scale: 1.12, transition: { type: "spring" as any, stiffness: 300, damping: 18 } },
};

// ─── Animated Dropzone ───────────────────────────────────────────────────────

interface DropzoneProps {
  label: string;
  accept: string;
  inputId: string;
  fileName?: string;
  onFile: (file: File) => void;
}

const AnimatedDropzone: FC<DropzoneProps> = ({
  label,
  accept,
  inputId,
  fileName,
  onFile,
}) => {
  const [isDragOver, setIsDragOver] = useState(false);

  return (
    <>
      <motion.div
        animate={isDragOver ? "active" : "idle"}
        onClick={() => document.getElementById(inputId)?.click()}
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragOver(true);
        }}
        onDragLeave={() => setIsDragOver(false)}
        onDrop={(e) => {
          e.preventDefault();
          setIsDragOver(false);
          const file = e.dataTransfer.files?.[0];
          if (file) onFile(file);
        }}
        className={`border-2 rounded-3xl p-10 flex flex-col items-center justify-center gap-3 cursor-pointer transition-colors ${
          isDragOver
            ? "border-blue-400 bg-blue-50/40"
            : "border-dashed border-slate-200 hover:border-blue-300 bg-slate-50/30"
        }`}
      >
        <motion.div
          variants={dropzoneIconVariants}
          className="bg-blue-50 p-4 rounded-2xl text-blue-500"
        >
          <FiUploadCloud size={32} />
        </motion.div>
        <div className="text-center">
          <p className="text-sm font-black text-slate-800">
            {fileName || label}
          </p>
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-1">
            {accept.includes("video") ? "MP4, MOV, AVI up to 500MB" : "PDF, DOC, PPT up to 50MB"}
          </p>
        </div>
      </motion.div>
      <input
        id={inputId}
        type="file"
        accept={accept}
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) onFile(file);
        }}
      />
    </>
  );
};

// ─── Main Component ──────────────────────────────────────────────────────────

const LessonEditorPage: FC = () => {
  const { id, lessonId } = useParams();
  const navigate = useNavigate();
  const isEditMode = !!lessonId;

  const [lessonData, setLessonData] = useState({
    title: "",
    description: "",
    status: "Draft",
    videoType: "File",
    videoUrl: "",
    rewardXp: 50,
    bonusXp: 0,
    order: 1,
  });
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [videoPreview, setVideoPreview] = useState<string | null>(null);
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [pdfPreview, setPdfPreview] = useState<string | null>(null);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);

  // Count-up values for the live preview XP badges
  const rewardXpDisplay = useCountUp(lessonData.rewardXp, { suffix: " XP", duration: 0.6 });
  const bonusXpDisplay = useCountUp(lessonData.bonusXp, { suffix: " XP", duration: 0.6 });

  const getEmbedUrl = (url: string): string | null => {
    if (!url) return null;
    let safeUrl = url.trim();
    if (!/^https?:\/\//i.test(safeUrl)) safeUrl = "https://" + safeUrl;
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

  const { createLesson, updateLesson, isLoading, lessons, fetchLessons } = useLessonStore();

  useEffect(() => {
    if (id) fetchLessons(parseInt(id, 10));
  }, [id, fetchLessons]);

  useEffect(() => {
    if (isEditMode && lessons.length > 0) {
      const existing = lessons.find((l: any) => l.id.toString() === lessonId);
      if (existing) {
        setLessonData({
          title: existing.title,
          description: existing.content || "",
          status: existing.status
            ? existing.status.charAt(0).toUpperCase() + existing.status.slice(1)
            : "Draft",
          videoType: existing.video_url ? "Link" : "File",
          videoUrl: existing.video_url || "",
          rewardXp: existing.xp_reward || 0,
          bonusXp: existing.bonus_xp || 0,
          order: existing.order || 1,
        });
        if (existing.video_file && !videoFile) setVideoPreview(existing.video_file);
        if (existing.pdf_file && !pdfFile) {
          setPdfPreview(existing.pdf_file.split("/").pop() || "Resource PDF");
          const fullPdfUrl = existing.pdf_file.startsWith("http")
            ? existing.pdf_file
            : `https://ahmeddali.pythonanywhere.com${existing.pdf_file.startsWith("/") ? "" : "/"}${existing.pdf_file}`;
          setPdfUrl(fullPdfUrl);
        }
      }
    } else if (!isEditMode && lessons.length >= 0) {
      setLessonData((prev) => ({ ...prev, order: lessons.length + 1 }));
    }
  }, [isEditMode, lessons, lessonId, videoFile, pdfFile]);

  useEffect(() => {
    if (videoFile) {
      const objectUrl = URL.createObjectURL(videoFile);
      setVideoPreview(objectUrl);
      return () => URL.revokeObjectURL(objectUrl);
    } else {
      setVideoPreview(null);
    }
  }, [videoFile]);

  useEffect(() => {
    if (pdfFile) {
      setPdfPreview(pdfFile.name);
      const objectUrl = URL.createObjectURL(pdfFile);
      setPdfUrl(objectUrl);
      return () => URL.revokeObjectURL(objectUrl);
    } else {
      setPdfPreview(null);
      setPdfUrl(null);
    }
  }, [pdfFile]);

  const handleSave = async () => {
    if (!lessonData.title) {
      toast.error("Please enter a lesson title");
      return;
    }
    try {
      const formData = new FormData();
      formData.append("title", lessonData.title);
      formData.append("content", lessonData.description);
      formData.append("order", lessonData.order.toString());
      formData.append("status", lessonData.status.toLowerCase());
      formData.append("xp_reward", lessonData.rewardXp.toString());
      formData.append("bonus_xp", lessonData.bonusXp.toString());
      if (lessonData.videoType === "Link" && lessonData.videoUrl)
        formData.append("video_url", lessonData.videoUrl);
      if (videoFile && lessonData.videoType === "File")
        formData.append("video_file", videoFile);
      if (pdfFile) formData.append("pdf_file", pdfFile);
      if (isEditMode) {
        await updateLesson(parseInt(lessonId!, 10), formData);
        toast.success("Lesson updated successfully!");
      } else {
        await createLesson(parseInt(id!, 10), formData);
        toast.success("Lesson created successfully!");
      }
      navigate(`/teacher/courses/${id}`);
    } catch (error: any) {
      toast.error(error.message || "Failed to save lesson");
    }
  };

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
          to={`/teacher/courses/${id}`}
          className="flex items-center text-slate-400 font-medium text-sm hover:text-slate-600 transition-colors w-fit"
        >
          <FiArrowLeft className="mr-2" />
          Back to Courses
        </Link>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <h1 className="text-3xl font-black text-slate-800 tracking-tight">
            {isEditMode ? "Edit Lesson" : "Create New Lesson"}
          </h1>
          <button
            onClick={handleSave}
            disabled={isLoading}
            className="px-6 py-3 bg-[#FF8000] text-white font-bold rounded-xl shadow-lg shadow-orange-100 hover:bg-orange-600 hover:-translate-y-0.5 transition-all flex items-center gap-2 w-fit disabled:opacity-50"
          >
            <FiSave className="text-xl" />
            <span>{isLoading ? "Saving..." : "Save Lesson"}</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column - Form (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Teacher Input Box */}
          <div className="bg-orange-50/50 p-6 rounded-2xl border border-orange-100 flex items-start gap-4">
            <div className="bg-orange-100 p-2.5 rounded-xl text-orange-600">
              <FiEdit3 size={20} />
            </div>
            <div>
              <h4 className="text-sm font-black text-slate-800">Teacher Input</h4>
              <p className="text-xs text-orange-600 font-bold mt-0.5 tracking-tight">
                Fill in the lesson details below
              </p>
            </div>
          </div>

          {/* Basic Information */}
          <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100 space-y-6">
            <h3 className="text-lg font-black text-slate-800">Basic Information</h3>

            <div className="space-y-2">
              <label className="text-xs font-black text-slate-500 uppercase tracking-widest">
                Lesson Title *
              </label>
              <input
                type="text"
                placeholder="e.g., Introduction to Variables"
                value={lessonData.title}
                onChange={(e) =>
                  setLessonData({ ...lessonData, title: e.target.value })
                }
                className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 text-sm font-bold text-slate-800 focus:bg-white focus:border-blue-400 focus:ring-4 focus:ring-blue-50 outline-none transition-all"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-black text-slate-500 uppercase tracking-widest">
                Description
              </label>
              <textarea
                rows={4}
                placeholder="Describe what students will learn..."
                value={lessonData.description}
                onChange={(e) =>
                  setLessonData({ ...lessonData, description: e.target.value })
                }
                className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 text-sm font-bold text-slate-800 focus:bg-white focus:border-blue-400 focus:ring-4 focus:ring-blue-50 outline-none transition-all resize-none"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-black text-slate-500 uppercase tracking-widest">
                Status
              </label>
              <div className="relative">
                <select
                  className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 text-sm font-bold text-slate-800 focus:bg-white focus:border-blue-400 outline-none transition-all appearance-none"
                  value={lessonData.status}
                  onChange={(e) =>
                    setLessonData({ ...lessonData, status: e.target.value })
                  }
                >
                  <option>Draft</option>
                  <option>Published</option>
                </select>
                <FiChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Video Upload */}
          <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100 space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-black text-slate-800">Video</h3>
              <div className="bg-slate-100 p-1 rounded-xl flex gap-1">
                <button
                  onClick={() =>
                    setLessonData({ ...lessonData, videoType: "File" })
                  }
                  className={`px-4 py-1.5 rounded-lg text-xs font-black transition-all ${
                    lessonData.videoType === "File"
                      ? "bg-blue-600 text-white shadow-sm"
                      : "text-slate-500"
                  }`}
                >
                  File
                </button>
                <button
                  onClick={() =>
                    setLessonData({ ...lessonData, videoType: "Link" })
                  }
                  className={`px-4 py-1.5 rounded-lg text-xs font-black transition-all ${
                    lessonData.videoType === "Link"
                      ? "bg-blue-600 text-white shadow-sm"
                      : "text-slate-500"
                  }`}
                >
                  Link
                </button>
              </div>
            </div>

            <div className="space-y-4">
              {lessonData.videoType === "File" ? (
                <>
                  <p className="text-xs font-black text-slate-500 uppercase tracking-widest">
                    Upload Video
                  </p>
                  <AnimatedDropzone
                    label="Upload video"
                    accept="video/*"
                    inputId="video-input"
                    fileName={videoFile?.name}
                    onFile={setVideoFile}
                  />
                  <button
                    onClick={() => document.getElementById("video-input")?.click()}
                    className="w-full bg-[#FF8000] text-white font-black py-4 rounded-2xl hover:bg-orange-600 transition-all shadow-lg shadow-orange-100"
                  >
                    {videoFile ? "Change Video" : "Select Video"}
                  </button>
                </>
              ) : (
                <>
                  <p className="text-xs font-black text-slate-500 uppercase tracking-widest">
                    Video Link
                  </p>
                  <div className="space-y-3">
                    <input
                      type="url"
                      placeholder="e.g., https://www.youtube.com/watch?v=..."
                      value={lessonData.videoUrl}
                      onChange={(e) =>
                        setLessonData({ ...lessonData, videoUrl: e.target.value })
                      }
                      className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 text-sm font-bold text-slate-800 focus:bg-white focus:border-blue-400 outline-none transition-all"
                    />
                    {lessonData.videoUrl &&
                      !lessonData.videoUrl.match(
                        /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be|vimeo\.com)\/.+$/
                      ) && (
                        <p className="text-[10px] text-red-500 font-bold px-1">
                          ⚠️ Please enter a valid YouTube or Vimeo link for
                          embedding.
                        </p>
                      )}
                    <p className="text-[10px] text-slate-400 font-bold px-1">
                      Supports YouTube and Vimeo links for direct embedding.
                    </p>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Resources Upload */}
          <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100 space-y-6">
            <h3 className="text-lg font-black text-slate-800">Resources</h3>
            <div className="space-y-4">
              <p className="text-xs font-black text-slate-500 uppercase tracking-widest">
                Upload Files
              </p>
              <AnimatedDropzone
                label="Upload Files"
                accept=".pdf,.doc,.docx,.ppt,.pptx"
                inputId="pdf-input"
                fileName={pdfFile?.name}
                onFile={setPdfFile}
              />
              <button
                onClick={() => document.getElementById("pdf-input")?.click()}
                className="w-full bg-[#FF8000] text-white font-black py-4 rounded-2xl hover:bg-orange-600 transition-all shadow-lg shadow-orange-100"
              >
                {pdfFile ? "Change File" : "Select File"}
              </button>
            </div>
          </div>

          {/* XP Settings */}
          <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100 space-y-6">
            <h3 className="text-lg font-black text-slate-800">XP Settings</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-black text-slate-500 uppercase tracking-widest">
                  Reward XP *
                </label>
                <div className="relative">
                  <div className="absolute left-5 top-1/2 -translate-y-1/2 text-orange-500">
                    <FiZap size={18} />
                  </div>
                  <input
                    type="number"
                    value={lessonData.rewardXp}
                    onChange={(e) =>
                      setLessonData({
                        ...lessonData,
                        rewardXp: parseInt(e.target.value),
                      })
                    }
                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl pl-12 pr-5 py-4 text-sm font-bold text-slate-800 focus:bg-white focus:border-blue-400 outline-none transition-all"
                  />
                </div>
                <p className="text-[10px] text-slate-400 font-bold">
                  Students earn this XP after completing the lesson
                </p>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-black text-slate-500 uppercase tracking-widest">
                  Bonus XP (Optional)
                </label>
                <div className="relative">
                  <div className="absolute left-5 top-1/2 -translate-y-1/2 text-blue-500">
                    <FiZap size={18} />
                  </div>
                  <input
                    type="number"
                    value={lessonData.bonusXp}
                    onChange={(e) =>
                      setLessonData({
                        ...lessonData,
                        bonusXp: parseInt(e.target.value),
                      })
                    }
                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl pl-12 pr-5 py-4 text-sm font-bold text-slate-800 focus:bg-white focus:border-blue-400 outline-none transition-all"
                  />
                </div>
                <p className="text-[10px] text-slate-400 font-bold">
                  Extra XP for completing additional tasks
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Live Student Preview (5 cols) */}
        <div className="lg:col-span-5 sticky top-8">
          <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100 flex items-start gap-4 mb-6">
            <div className="bg-blue-100 p-2.5 rounded-xl text-blue-600">
              <FiEye size={20} />
            </div>
            <div>
              <h4 className="text-sm font-black text-slate-800">Student Preview</h4>
              <p className="text-xs text-blue-600 font-bold mt-0.5 tracking-tight">
                This is exactly what students will see
              </p>
            </div>
          </div>

          <div className="bg-white rounded-[2.5rem] shadow-xl border border-slate-100 overflow-hidden">
            {/* Video preview area */}
            <div className="aspect-video bg-slate-900 flex items-center justify-center relative">
              {lessonData.videoType === "Link" &&
              getEmbedUrl(lessonData.videoUrl) ? (
                <iframe
                  src={getEmbedUrl(lessonData.videoUrl)!}
                  title="Video Preview"
                  className="absolute inset-0 w-full h-full"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              ) : lessonData.videoType === "File" && videoPreview ? (
                <video
                  src={videoPreview}
                  controls
                  className="absolute inset-0 w-full h-full object-contain"
                />
              ) : (
                <>
                  <div className="absolute inset-0 bg-slate-800 opacity-40"></div>
                  <div className="flex flex-col items-center gap-3 relative z-10">
                    <button className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white shadow-2xl">
                      <FiPlay size={24} className="ml-1" />
                    </button>
                    <p className="text-white/50 text-[10px] font-black uppercase tracking-widest">
                      No Video Selected
                    </p>
                  </div>
                </>
              )}
            </div>

            {/* Mirrored text content with cross-fade */}
            <div className="p-8 space-y-6">
              <div>
                {/* Title cross-fade */}
                <div className="overflow-hidden min-h-[2rem] mb-2">
                  <AnimatePresence mode="wait">
                    <motion.h3
                      key={lessonData.title || "__empty_title__"}
                      variants={previewTextVariants}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      className="text-2xl font-black text-slate-800"
                    >
                      {lessonData.title || "Lesson Title"}
                    </motion.h3>
                  </AnimatePresence>
                </div>

                {/* Description cross-fade */}
                <div className="overflow-hidden min-h-[3rem]">
                  <AnimatePresence mode="wait">
                    <motion.p
                      key={lessonData.description || "__empty_desc__"}
                      variants={previewTextVariants}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      className="text-sm font-medium text-slate-400 leading-relaxed"
                    >
                      {lessonData.description ||
                        "Lesson description will appear here..."}
                    </motion.p>
                  </AnimatePresence>
                </div>
              </div>

              {/* XP badges with count-up */}
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
                <div className="flex items-center gap-1.5 text-xs font-bold text-slate-400">
                  <FiClock />
                  20 min
                </div>
                <div className="flex items-center gap-1.5 text-xs font-bold text-orange-500">
                  <FiZap className="fill-orange-500 text-orange-500" />
                  Earn <motion.span className="ml-1">{rewardXpDisplay}</motion.span>
                </div>
                {!!lessonData.bonusXp && lessonData.bonusXp > 0 && (
                  <div className="flex items-center gap-1.5 text-xs font-bold text-blue-500">
                    <FiZap className="fill-blue-500 text-blue-500" />
                    +{" "}
                    <motion.span className="ml-1">{bonusXpDisplay}</motion.span>{" "}
                    Bonus
                  </div>
                )}
              </div>

              {pdfPreview && (
                <div
                  className={`bg-slate-50 border border-slate-100 rounded-2xl p-4 flex items-center justify-between ${
                    pdfUrl ? "cursor-pointer hover:bg-slate-100 transition-colors" : ""
                  }`}
                  onClick={() => pdfUrl && window.open(pdfUrl, "_blank")}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-red-50 text-red-500 rounded-xl flex items-center justify-center">
                      <FiUploadCloud size={20} />
                    </div>
                    <div>
                      <p
                        className={`text-xs font-black line-clamp-1 ${
                          pdfUrl
                            ? "text-slate-800 hover:text-blue-600 transition-colors"
                            : "text-slate-800"
                        }`}
                      >
                        {pdfPreview}
                      </p>
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                        PDF Resource
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <button className="w-full bg-[#FF8000] text-white font-black py-4 rounded-2xl shadow-lg shadow-orange-100 hover:bg-orange-600 transition-all cursor-default pointer-events-none">
                Mark as Complete
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default LessonEditorPage;
