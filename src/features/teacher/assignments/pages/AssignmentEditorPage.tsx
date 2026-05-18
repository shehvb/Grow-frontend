import type { FC } from "react";
import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { 
  FiArrowLeft, 
  FiSave, 
  FiUploadCloud, 
  FiCalendar, 
  FiTarget,
  FiChevronDown
} from "react-icons/fi";
import { useAssignmentStore } from "../../../../store/useAssignmentStore";
import { useCourseStore } from "../../../../store/useCourseStore";
import { toast } from "react-hot-toast";

const AssignmentEditorPage: FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = !!id;

  const [assignmentData, setAssignmentData] = useState({
    title: "",
    description: "",
    courseId: "",
    maxMarks: 100,
    dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
  });
  const [attachment, setAttachment] = useState<File | null>(null);

  const { createAssignment, updateAssignment, assignments, isLoading } = useAssignmentStore();
  const { courses, listCourses } = useCourseStore();

  useEffect(() => {
    listCourses();
    if (isEditMode) {
      const existing = assignments.find(a => a.id.toString() === id);
      if (existing) {
        setAssignmentData({
          title: existing.title,
          description: existing.content || "",
          courseId: existing.course.toString(),
          maxMarks: existing.max_marks || 100,
          dueDate: new Date(existing.due_date).toISOString().split('T')[0]
        });
      }
    }
  }, [id, isEditMode, assignments, listCourses]);

  const handleSave = async () => {
    if (!assignmentData.title || !assignmentData.courseId) {
      toast.error("Please fill in the title and select a course");
      return;
    }

    try {
      const formData = new FormData();
      formData.append('title', assignmentData.title);
      formData.append('content', assignmentData.description);
      formData.append('description', assignmentData.description);
      formData.append('course_id', assignmentData.courseId);
      formData.append('max_marks', assignmentData.maxMarks.toString());
      formData.append('max_score', assignmentData.maxMarks.toString());
      formData.append('due_date', assignmentData.dueDate);
      
      if (attachment) {
        formData.append('attachment', attachment);
        formData.append('teacher_file', attachment);
      }

      if (isEditMode) {
        await updateAssignment(parseInt(id!, 10), formData);
        toast.success("Assignment updated!");
      } else {
        await createAssignment(formData);
        toast.success("Assignment created!");
      }
      navigate("/teacher/assignments");
    } catch (error) {
      toast.error("Failed to save assignment");
    }
  };

  return (
    <div className="space-y-8 animate-fade-in pb-20">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Link 
            to="/teacher/assignments"
            className="w-12 h-12 bg-white rounded-2xl border border-slate-100 flex items-center justify-center text-slate-400 hover:text-blue-600 hover:border-blue-100 transition-all shadow-sm"
          >
            <FiArrowLeft size={20} />
          </Link>
          <div className="space-y-1">
            <h1 className="text-3xl font-black text-slate-800 tracking-tight">
              {isEditMode ? "Edit" : "New"} <span className="text-blue-600">Assignment</span>
            </h1>
            <p className="text-slate-500 font-bold text-xs uppercase tracking-widest">
              Setup task requirements and resources
            </p>
          </div>
        </div>

        <button 
          onClick={handleSave}
          disabled={isLoading}
          className="flex items-center gap-3 bg-blue-600 text-white px-8 py-4 rounded-[1.5rem] font-black hover:bg-blue-700 hover:-translate-y-1 transition-all shadow-xl shadow-blue-100 disabled:opacity-70"
        >
          <FiSave size={20} />
          {isLoading ? "Saving..." : "Save Assignment"}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white p-10 rounded-[3rem] shadow-sm border border-slate-100 space-y-8">
            <div className="space-y-2">
              <label className="text-xs font-black text-slate-500 uppercase tracking-widest ml-1">Assignment Title *</label>
              <input 
                type="text" 
                value={assignmentData.title}
                onChange={e => setAssignmentData({...assignmentData, title: e.target.value})}
                placeholder="e.g., Final Project: Creative Writing"
                className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-5 text-lg font-bold text-slate-800 focus:bg-white focus:border-blue-400 outline-none transition-all placeholder:text-slate-300"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-black text-slate-500 uppercase tracking-widest ml-1">Description & Instructions</label>
              <textarea 
                value={assignmentData.description}
                onChange={e => setAssignmentData({...assignmentData, description: e.target.value})}
                placeholder="Describe what students need to do..."
                rows={10}
                className="w-full bg-slate-50 border border-slate-100 rounded-[2rem] px-6 py-5 text-sm font-bold text-slate-700 focus:bg-white focus:border-blue-400 outline-none transition-all placeholder:text-slate-300 resize-none"
              />
            </div>
          </div>

          {/* Resource Upload */}
          <div className="bg-white p-10 rounded-[3rem] shadow-sm border border-slate-100 space-y-6">
            <h3 className="text-xl font-black text-slate-800">Resources</h3>
            <div 
              onClick={() => document.getElementById('file-upload')?.click()}
              className="border-2 border-dashed border-slate-100 rounded-[2rem] p-12 flex flex-col items-center justify-center gap-4 group hover:border-blue-300 transition-colors cursor-pointer bg-slate-50/50"
            >
              <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-500 group-hover:scale-110 transition-transform">
                <FiUploadCloud size={32} />
              </div>
              <div className="text-center">
                <p className="text-lg font-black text-slate-800">
                  {attachment ? attachment.name : "Upload Instructions or Template"}
                </p>
                <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mt-1">PDF, DOCX, or ZIP up to 50MB</p>
              </div>
              <input 
                id="file-upload"
                type="file" 
                className="hidden" 
                onChange={e => setAttachment(e.target.files?.[0] || null)}
              />
            </div>
          </div>
        </div>

        {/* Sidebar Settings */}
        <div className="space-y-8">
          <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100 space-y-8">
            <h3 className="text-xl font-black text-slate-800">Settings</h3>
            
            {/* Course Selector */}
            <div className="space-y-2">
              <label className="text-xs font-black text-slate-500 uppercase tracking-widest ml-1">Select Course *</label>
              <div className="relative">
                <select 
                  value={assignmentData.courseId}
                  onChange={e => setAssignmentData({...assignmentData, courseId: e.target.value})}
                  className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 text-sm font-black text-slate-800 appearance-none focus:bg-white focus:border-blue-400 outline-none transition-all"
                >
                  <option value="" disabled>Choose a course</option>
                  {courses.map(course => (
                    <option key={course.id} value={course.id}>{course.title}</option>
                  ))}
                </select>
                <FiChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
              </div>
            </div>

            {/* Max Marks */}
            <div className="space-y-2">
              <label className="text-xs font-black text-slate-500 uppercase tracking-widest ml-1">Max Marks</label>
              <div className="relative">
                <FiTarget className="absolute left-5 top-1/2 -translate-y-1/2 text-blue-500" />
                <input 
                  type="number" 
                  value={assignmentData.maxMarks}
                  onChange={e => setAssignmentData({...assignmentData, maxMarks: parseInt(e.target.value)})}
                  className="w-full bg-slate-50 border border-slate-100 rounded-2xl pl-14 pr-6 py-4 text-sm font-black text-slate-800 focus:bg-white focus:border-blue-400 outline-none transition-all"
                />
              </div>
            </div>

            {/* Due Date */}
            <div className="space-y-2">
              <label className="text-xs font-black text-slate-500 uppercase tracking-widest ml-1">Due Date</label>
              <div className="relative">
                <FiCalendar className="absolute left-5 top-1/2 -translate-y-1/2 text-orange-500" />
                <input 
                  type="date" 
                  value={assignmentData.dueDate}
                  onChange={e => setAssignmentData({...assignmentData, dueDate: e.target.value})}
                  className="w-full bg-slate-50 border border-slate-100 rounded-2xl pl-14 pr-6 py-4 text-sm font-black text-slate-800 focus:bg-white focus:border-blue-400 outline-none transition-all"
                />
              </div>
            </div>
          </div>

          <div className="bg-blue-600 p-8 rounded-[2.5rem] text-white shadow-xl shadow-blue-100 space-y-4">
            <h4 className="text-lg font-black tracking-tight">Pro Tip 💡</h4>
            <p className="text-sm font-bold text-blue-100 leading-relaxed">
              Clear instructions and a template file help students submit better quality work!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssignmentEditorPage;
