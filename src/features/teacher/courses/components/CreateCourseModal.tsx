import type { FC } from "react";
import { useState, useEffect } from "react";
import { useCourseStore } from "../../../../store/useCourseStore";
import { FiChevronDown } from "react-icons/fi";
import { courseService, type SchoolGrade } from "../../../../services/courseService";

interface CreateCourseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: { title: string; description: string; grade?: number | null }) => Promise<void>;
  courseToEdit?: { title: string; description: string; grade?: number | null } | null;
}

const CreateCourseModal: FC<CreateCourseModalProps> = ({ isOpen, onClose, onSave, courseToEdit }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [gradeId, setGradeId] = useState<number | "">(""); 
  const [grades, setGrades] = useState<SchoolGrade[]>([]);
  const { error, isLoading, clearError } = useCourseStore();

  useEffect(() => {
    if (isOpen) {
      setTitle(courseToEdit?.title || "");
      setDescription(courseToEdit?.description || "");
      setGradeId(courseToEdit?.grade || "");
      clearError();
      
      // Fetch available grades for the dropdown
      courseService.getGrades()
        .then(res => setGrades(res.results || []))
        .catch(err => console.error("Failed to load grades", err));
    }
  }, [isOpen, courseToEdit, clearError]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload: any = { title, description, is_published: true };
      
      if (gradeId !== "") {
        payload.grade = Number(gradeId);
      } else {
        payload.grade = null;
      }
      
      await onSave(payload);
      onClose();
    } catch (err) {
      // Error is handled by store and displayed below
    }
  };

  return (
    <>
      <div 
        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 animate-fade-in"
        onClick={onClose}
      />
      
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-3xl w-full max-w-xl z-50 shadow-2xl p-8 animate-slide-up">
        <h2 className="text-3xl font-black text-slate-800 mb-8">
          {courseToEdit ? "Edit Course" : "Create New Course"}
        </h2>
        
        {error && (
          <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-xl text-sm font-medium border border-red-100">
            {error}
          </div>
        )}

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-600 block">
              Course Name <span className="text-slate-400">*</span>
            </label>
            <input 
              type="text" 
              placeholder="e.g., Algebra Fundamentals" 
              value={title}
              onChange={e => setTitle(e.target.value)}
              required
              className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium text-slate-700 outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-50 transition-all placeholder:text-slate-300"
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-600 block">
              Description
            </label>
            <textarea 
              placeholder="Describe What Students Will Learn....." 
              rows={5}
              value={description}
              onChange={e => setDescription(e.target.value)}
              className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium text-slate-700 outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-50 transition-all placeholder:text-slate-300 resize-none"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-600 block">
              Grade
            </label>
            <div className="relative">
              <select 
                value={gradeId}
                onChange={e => setGradeId(e.target.value ? Number(e.target.value) : "")}
                className={`w-full border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-50 transition-all appearance-none bg-white cursor-pointer ${
                  !gradeId ? 'text-slate-300' : 'text-slate-700'
                }`}
              >
                <option value="" disabled>Choose Grade</option>
                {grades.map(g => (
                  <option key={g.id} value={g.id}>{g.name}</option>
                ))}
              </select>
              <FiChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={20} />
            </div>
          </div>
          
          <div className="flex items-center gap-4 pt-4">
            <button 
              type="submit"
              disabled={isLoading}
              className="flex-1 bg-[#FF8000] text-white font-bold py-3.5 rounded-xl shadow-lg shadow-orange-100 hover:bg-orange-600 hover:-translate-y-0.5 transition-all disabled:opacity-70 disabled:hover:translate-y-0"
            >
              {isLoading ? "Saving..." : courseToEdit ? "Save Changes" : "Create Course"}
            </button>
            <button 
              type="button"
              onClick={onClose}
              disabled={isLoading}
              className="flex-1 bg-slate-100 text-slate-800 font-bold py-3.5 rounded-xl hover:bg-slate-200 transition-all disabled:opacity-70"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default CreateCourseModal;
