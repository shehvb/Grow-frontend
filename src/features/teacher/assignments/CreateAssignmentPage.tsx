import type { FC } from "react";
import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { 
  FiArrowLeft, 
  FiFile, 
  FiZap,
  FiChevronDown
} from "react-icons/fi";
import { useAssignmentStore } from "../../../store/useAssignmentStore";
import { useCourseStore } from "../../../store/useCourseStore";
import { toast } from "react-hot-toast";

const CreateAssignmentPage: FC = () => {
  const { id } = useParams();
  const isEditMode = !!id;
  const navigate = useNavigate();

  const { createAssignment, updateAssignment, assignments, isLoading } = useAssignmentStore();
  const { courses, listCourses } = useCourseStore();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    courseId: "",
    deadline: "",
    rewardXp: 150,
    latePenalty: 20
  });
  const [attachment, setAttachment] = useState<File | null>(null);

  useEffect(() => {
    listCourses();
    if (isEditMode) {
      const existing = assignments.find(a => a.id.toString() === id);
      if (existing) {
        setFormData({
          title: existing.title,
          description: existing.content || "",
          courseId: existing.course.toString(),
          deadline: new Date(existing.due_date).toISOString().split('T')[0],
          rewardXp: existing.max_marks || 150,
          latePenalty: 20
        });
      }
    }
  }, [id, isEditMode, assignments, listCourses]);

  const handleSave = async () => {
    if (!formData.title || !formData.courseId || !formData.deadline) {
      toast.error("Please fill in the title, course, and deadline.");
      return;
    }

    try {
      const payload = new FormData();
      payload.append('title', formData.title);
      payload.append('content', formData.description);
      payload.append('course_id', formData.courseId);
      payload.append('max_marks', formData.rewardXp.toString());
      payload.append('due_date', formData.deadline);
      
      if (attachment) {
        payload.append('attachment', attachment);
      }

      if (isEditMode) {
        await updateAssignment(parseInt(id!, 10), payload);
        toast.success("Assignment updated!");
      } else {
        await createAssignment(payload);
        toast.success("Assignment created!");
      }
      navigate("/teacher/assignments");
    } catch (error) {
      toast.error("Failed to save assignment");
    }
  };

  return (
    <div className="space-y-8 animate-fade-in pb-20">
      {/* Header Area */}
      <div className="space-y-2">
        <Link to="/teacher/assignments" className="flex items-center text-slate-800 font-black text-2xl hover:text-blue-600 transition-colors w-fit">
          <FiArrowLeft className="mr-3 text-xl" />
          {isEditMode ? "Edit Assignment" : "Create New Assignment"}
        </Link>
        <p className="text-slate-400 font-medium ml-9">Set up a new assignment for your students</p>
      </div>

      <div className="max-w-4xl space-y-6">
        {/* Assignment Details Form */}
        <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100 space-y-6">
          <h3 className="text-lg font-black text-slate-800">Assignment Details</h3>
          
          <div className="space-y-2">
            <label className="text-xs font-black text-slate-500 uppercase tracking-widest">Assignment Title</label>
            <input 
              type="text" 
              placeholder="e.g., Algebra Fundamentals" 
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              className="w-full bg-white border border-slate-200 rounded-xl px-5 py-4 text-sm font-bold text-slate-800 focus:border-blue-400 focus:ring-4 focus:ring-blue-50 outline-none transition-all placeholder:text-slate-300"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-black text-slate-500 uppercase tracking-widest">Description</label>
            <textarea 
              rows={4}
              placeholder="Describe What Students Will Learn....." 
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              className="w-full bg-white border border-slate-200 rounded-xl px-5 py-4 text-sm font-bold text-slate-800 focus:border-blue-400 focus:ring-4 focus:ring-blue-50 outline-none transition-all resize-none placeholder:text-slate-300"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-black text-slate-500 uppercase tracking-widest">Select Course</label>
            <div className="relative">
              <select 
                className="w-full bg-white border border-slate-200 rounded-xl px-5 py-4 text-sm font-bold text-slate-800 focus:border-blue-400 outline-none transition-all appearance-none"
                value={formData.courseId}
                onChange={(e) => setFormData({...formData, courseId: e.target.value})}
              >
                <option value="" disabled>Choose a Course...</option>
                {courses.map(course => (
                  <option key={course.id} value={course.id}>{course.title}</option>
                ))}
              </select>
              <FiChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none stroke-[3]" />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-black text-slate-500 uppercase tracking-widest">Deadline</label>
            <input 
              type="date" 
              value={formData.deadline}
              onChange={(e) => setFormData({...formData, deadline: e.target.value})}
              className="w-full bg-white border border-slate-200 rounded-xl px-5 py-4 text-sm font-bold focus:border-blue-400 focus:ring-4 focus:ring-blue-50 outline-none transition-all text-slate-400 uppercase tracking-wider"
            />
          </div>
        </div>

        {/* File Upload section */}
        <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100 space-y-6">
          <h3 className="text-lg font-black text-slate-800">Resources</h3>
          
          <div 
            onClick={() => document.getElementById('assignment-attachment')?.click()}
            className="border-2 border-dashed border-slate-200 rounded-3xl p-10 flex flex-col items-center justify-center gap-3 group hover:border-blue-300 transition-colors cursor-pointer"
          >
            <div className="text-slate-300 group-hover:text-blue-500 group-hover:scale-110 transition-all">
              <FiFile size={40} className="fill-current" />
            </div>
            <div className="text-center mt-2">
              <p className="text-sm font-black text-slate-800">
                {attachment ? attachment.name : "Upload assignment worksheet or instructions"}
              </p>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">PDF, DOC, DOCX up to 50MB</p>
            </div>
            <input 
              id="assignment-attachment" 
              type="file" 
              hidden 
              onChange={e => setAttachment(e.target.files?.[0] || null)}
            />
          </div>
        </div>

        {/* XP Rewards */}
        <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100 space-y-6">
          <h3 className="text-lg font-black text-slate-800 flex items-center gap-2">
            <FiZap className="text-orange-500 fill-orange-500" />
            XP Rewards & Marks
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className="text-xs font-black text-slate-800 tracking-wider">Max Marks (XP)</label>
              <input 
                type="number" 
                value={formData.rewardXp}
                onChange={(e) => setFormData({...formData, rewardXp: parseInt(e.target.value) || 0})}
                className="w-full bg-slate-50 border border-slate-100 rounded-xl px-5 py-3.5 text-sm font-bold text-slate-400 outline-none transition-all"
              />
              <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest mt-1">XP earned for completing the assignment</p>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-black text-slate-800 tracking-wider">Late Penalty (XP)</label>
              <div className="relative">
                <input 
                  type="number" 
                  value={formData.latePenalty}
                  onChange={(e) => setFormData({...formData, latePenalty: parseInt(e.target.value) || 0})}
                  className="w-full bg-slate-50 border border-slate-100 rounded-xl pl-5 pr-12 py-3.5 text-sm font-bold text-slate-400 outline-none transition-all"
                />
                <FiZap className="absolute right-4 top-1/2 -translate-y-1/2 text-red-500 fill-red-500" />
              </div>
              <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest mt-1">XP reduction for late submissions</p>
            </div>
          </div>

          <div className="bg-blue-50/50 border border-blue-200 rounded-xl p-4 mt-6">
            <p className="text-xs text-blue-600 font-bold tracking-wide">
              Students will earn up to {formData.rewardXp} marks for completing this assignment on time.
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-4 pt-4">
          <button 
            onClick={handleSave}
            disabled={isLoading}
            className="px-8 py-3.5 bg-[#FF8000] text-white font-bold rounded-xl shadow-lg shadow-orange-100 hover:bg-orange-600 hover:-translate-y-0.5 transition-all text-sm disabled:opacity-70"
          >
            {isLoading ? "Saving..." : (isEditMode ? "Save Changes" : "Create Assignment")}
          </button>
          <button 
            onClick={() => navigate('/teacher/assignments')}
            className="px-8 py-3.5 bg-white border border-slate-200 text-slate-700 font-bold rounded-xl hover:bg-slate-50 transition-all text-sm shadow-sm"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateAssignmentPage;
