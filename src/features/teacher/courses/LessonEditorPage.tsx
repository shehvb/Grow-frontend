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
  FiPause,
  FiVolume2
} from "react-icons/fi";
import { useEffect } from "react";
import { useLessonStore } from "../../../store/useLessonStore";
import { toast } from "react-hot-toast";

const LessonEditorPage: FC = () => {
  const { id, lessonId } = useParams();
  const navigate = useNavigate();
  const isEditMode = !!lessonId;

  const [lessonData, setLessonData] = useState({
    title: "",
    description: "",
    status: "Draft",
    videoType: "File",
    rewardXp: 50,
    bonusXp: 0,
    order: 1
  });
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [pdfFile, setPdfFile] = useState<File | null>(null);

  const { createLesson, updateLesson, isLoading, lessons, fetchLessons } = useLessonStore();

  useEffect(() => {
    if (id) {
      fetchLessons(parseInt(id, 10));
    }
  }, [id, fetchLessons]);

  useEffect(() => {
    if (isEditMode && lessons.length > 0) {
      const existing = lessons.find((l: any) => l.id.toString() === lessonId);
      if (existing) {
        setLessonData({
          title: existing.title,
          description: existing.content || "",
          status: existing.status ? (existing.status.charAt(0).toUpperCase() + existing.status.slice(1)) : "Draft",
          videoType: existing.video_url ? "Link" : "File",
          rewardXp: existing.xp_reward || 0,
          bonusXp: existing.bonus_xp || 0,
          order: existing.order || 1
        });
      }
    } else if (!isEditMode && lessons.length >= 0) {
      setLessonData(prev => ({ ...prev, order: lessons.length + 1 }));
    }
  }, [isEditMode, lessons, lessonId]);

  const handleSave = async () => {
    if (!lessonData.title) {
      toast.error("Please enter a lesson title");
      return;
    }

    try {
      const formData = new FormData();
      formData.append('title', lessonData.title);
      formData.append('content', lessonData.description);
      formData.append('order', lessonData.order.toString());
      formData.append('status', lessonData.status.toLowerCase());
      formData.append('xp_reward', lessonData.rewardXp.toString());
      formData.append('bonus_xp', lessonData.bonusXp.toString());

      if (videoFile) formData.append('video_file', videoFile);
      if (pdfFile) formData.append('pdf_file', pdfFile);

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
    <div className="space-y-8 animate-fade-in pb-20">
      {/* Header Area */}
      <div className="space-y-4">
        <Link to={`/teacher/courses/${id}`} className="flex items-center text-slate-400 font-medium text-sm hover:text-slate-600 transition-colors w-fit">
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
              <p className="text-xs text-orange-600 font-bold mt-0.5 tracking-tight">Fill in the lesson details below</p>
            </div>
          </div>

          {/* Basic Information */}
          <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100 space-y-6">
            <h3 className="text-lg font-black text-slate-800">Basic Information</h3>
            
            <div className="space-y-2">
              <label className="text-xs font-black text-slate-500 uppercase tracking-widest">Lesson Title *</label>
              <input 
                type="text" 
                placeholder="e.g., Introduction to Variables" 
                value={lessonData.title}
                onChange={(e) => setLessonData({...lessonData, title: e.target.value})}
                className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 text-sm font-bold text-slate-800 focus:bg-white focus:border-blue-400 focus:ring-4 focus:ring-blue-50 outline-none transition-all"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-black text-slate-500 uppercase tracking-widest">Description</label>
              <textarea 
                rows={4}
                placeholder="Describe what students will learn..." 
                value={lessonData.description}
                onChange={(e) => setLessonData({...lessonData, description: e.target.value})}
                className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 text-sm font-bold text-slate-800 focus:bg-white focus:border-blue-400 focus:ring-4 focus:ring-blue-50 outline-none transition-all resize-none"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-black text-slate-500 uppercase tracking-widest">Status</label>
              <div className="relative">
                <select 
                  className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 text-sm font-bold text-slate-800 focus:bg-white focus:border-blue-400 outline-none transition-all appearance-none"
                  value={lessonData.status}
                  onChange={(e) => setLessonData({...lessonData, status: e.target.value})}
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
                  onClick={() => setLessonData({...lessonData, videoType: 'File'})}
                  className={`px-4 py-1.5 rounded-lg text-xs font-black transition-all ${lessonData.videoType === 'File' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-500'}`}
                >
                  File
                </button>
                <button 
                  onClick={() => setLessonData({...lessonData, videoType: 'Link'})}
                  className={`px-4 py-1.5 rounded-lg text-xs font-black transition-all ${lessonData.videoType === 'Link' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-500'}`}
                >
                  Link
                </button>
              </div>
            </div>

            <div className="space-y-4">
              <p className="text-xs font-black text-slate-500 uppercase tracking-widest">Upload Video</p>
              <div 
                onClick={() => document.getElementById('video-input')?.click()}
                className="border-2 border-dashed border-slate-200 rounded-3xl p-10 flex flex-col items-center justify-center gap-3 group hover:border-blue-300 transition-colors cursor-pointer bg-slate-50/30"
              >
                <div className="bg-blue-50 p-4 rounded-2xl text-blue-500 group-hover:scale-110 transition-transform">
                  <FiUploadCloud size={32} />
                </div>
                <div className="text-center">
                  <p className="text-sm font-black text-slate-800">
                    {videoFile ? videoFile.name : "Upload video"}
                  </p>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-1">MP4, MOV, AVI up to 500MB</p>
                </div>
              </div>
              <input 
                id="video-input"
                type="file" 
                accept="video/*"
                className="hidden"
                onChange={(e) => setVideoFile(e.target.files?.[0] || null)}
              />
              <button 
                onClick={() => document.getElementById('video-input')?.click()}
                className="w-full bg-[#FF8000] text-white font-black py-4 rounded-2xl hover:bg-orange-600 transition-all shadow-lg shadow-orange-100"
              >
                {videoFile ? "Change Video" : "Select Video"}
              </button>
            </div>
          </div>

          {/* Resources Upload */}
          <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100 space-y-6">
            <h3 className="text-lg font-black text-slate-800">Resources</h3>
            <div className="space-y-4">
              <p className="text-xs font-black text-slate-500 uppercase tracking-widest">Upload Files</p>
              <div 
                onClick={() => document.getElementById('pdf-input')?.click()}
                className="border-2 border-dashed border-slate-200 rounded-3xl p-10 flex flex-col items-center justify-center gap-3 group hover:border-blue-300 transition-colors cursor-pointer bg-slate-50/30"
              >
                <div className="bg-blue-50 p-4 rounded-2xl text-blue-500 group-hover:scale-110 transition-transform">
                  <FiUploadCloud size={32} />
                </div>
                <div className="text-center">
                  <p className="text-sm font-black text-slate-800">
                    {pdfFile ? pdfFile.name : "Upload Files"}
                  </p>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-1">PDF, DOC, PPT up to 50MB</p>
                </div>
              </div>
              <input 
                id="pdf-input"
                type="file" 
                accept=".pdf,.doc,.docx,.ppt,.pptx"
                className="hidden"
                onChange={(e) => setPdfFile(e.target.files?.[0] || null)}
              />
              <button 
                onClick={() => document.getElementById('pdf-input')?.click()}
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
                <label className="text-xs font-black text-slate-500 uppercase tracking-widest">Reward XP *</label>
                <div className="relative">
                  <div className="absolute left-5 top-1/2 -translate-y-1/2 text-orange-500">
                    <FiZap size={18} />
                  </div>
                  <input 
                    type="number" 
                    value={lessonData.rewardXp}
                    onChange={(e) => setLessonData({...lessonData, rewardXp: parseInt(e.target.value)})}
                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl pl-12 pr-5 py-4 text-sm font-bold text-slate-800 focus:bg-white focus:border-blue-400 outline-none transition-all"
                  />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 flex flex-col">
                    <button className="text-slate-400 hover:text-slate-800"><FiChevronDown className="rotate-180" size={12} /></button>
                    <button className="text-slate-400 hover:text-slate-800"><FiChevronDown size={12} /></button>
                  </div>
                </div>
                <p className="text-[10px] text-slate-400 font-bold">Students earn this XP after completing the lesson</p>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-black text-slate-500 uppercase tracking-widest">Bonus XP (Optional)</label>
                <div className="relative">
                  <div className="absolute left-5 top-1/2 -translate-y-1/2 text-blue-500">
                    <FiZap size={18} />
                  </div>
                  <input 
                    type="number" 
                    value={lessonData.bonusXp}
                    onChange={(e) => setLessonData({...lessonData, bonusXp: parseInt(e.target.value)})}
                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl pl-12 pr-5 py-4 text-sm font-bold text-slate-800 focus:bg-white focus:border-blue-400 outline-none transition-all"
                  />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 flex flex-col">
                    <button className="text-slate-400 hover:text-slate-800"><FiChevronDown className="rotate-180" size={12} /></button>
                    <button className="text-slate-400 hover:text-slate-800"><FiChevronDown size={12} /></button>
                  </div>
                </div>
                <p className="text-[10px] text-slate-400 font-bold">Extra XP for completing additional tasks</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Preview (5 cols) */}
        <div className="lg:col-span-5 sticky top-8">
          <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100 flex items-start gap-4 mb-6">
            <div className="bg-blue-100 p-2.5 rounded-xl text-blue-600">
              <FiEye size={20} />
            </div>
            <div>
              <h4 className="text-sm font-black text-slate-800">Student Preview</h4>
              <p className="text-xs text-blue-600 font-bold mt-0.5 tracking-tight">This is exactly what students will see</p>
            </div>
          </div>

          <div className="bg-white rounded-[2.5rem] shadow-xl border border-slate-100 overflow-hidden">
            <div className="aspect-video bg-slate-900 flex items-center justify-center relative">
              <div className="absolute inset-0 bg-slate-800 opacity-40"></div>
              <button className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white relative z-10 shadow-2xl">
                <FiPlay size={24} className="ml-1" />
              </button>
              {/* Fake Video Controls */}
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                <div className="h-1 bg-slate-600/50 rounded-full mb-3 overflow-hidden">
                  <div className="w-[40%] h-full bg-blue-500 rounded-full relative">
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-white rounded-full shadow-md" />
                  </div>
                </div>
                <div className="flex items-center justify-between text-white/90 text-[10px] font-bold">
                  <div className="flex items-center gap-3">
                    <FiPause size={12} />
                    <FiVolume2 size={12} />
                    <span>08:42 / 12:30</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-8 space-y-6">
              <div>
                <h3 className="text-2xl font-black text-slate-800 mb-2">
                  {lessonData.title || "Lesson Title"}
                </h3>
                <p className="text-sm font-medium text-slate-400 leading-relaxed">
                  {lessonData.description || "Lesson description will appear here..."}
                </p>
              </div>

              <div className="flex items-center gap-6">
                <div className="flex items-center gap-1.5 text-xs font-bold text-slate-400">
                  <FiClock />
                  20 min
                </div>
                <div className="flex items-center gap-1.5 text-xs font-bold text-orange-500">
                  <FiZap />
                  Earn {lessonData.rewardXp + (lessonData.bonusXp || 0)} XP
                </div>
              </div>

              <button className="w-full bg-[#FF8000] text-white font-black py-4 rounded-2xl shadow-lg shadow-orange-100 hover:bg-orange-600 transition-all cursor-default pointer-events-none">
                Mark as Complete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LessonEditorPage;
