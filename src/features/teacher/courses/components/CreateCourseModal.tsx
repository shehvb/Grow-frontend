import type { FC } from "react";


import { useState, useEffect } from "react";

interface CreateCourseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: { title: string; description: string }) => void;
  courseToEdit?: { title: string; description: string } | null;
}

const CreateCourseModal: FC<CreateCourseModalProps> = ({ isOpen, onClose, onSave, courseToEdit }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (isOpen) {
      setTitle(courseToEdit?.title || "");
      setDescription(courseToEdit?.description || "");
    }
  }, [isOpen, courseToEdit]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ title, description });
    onClose();
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
          
          <div className="flex items-center gap-4 pt-4">
            <button 
              type="submit"
              className="flex-1 bg-[#FF8000] text-white font-bold py-3.5 rounded-xl shadow-lg shadow-orange-100 hover:bg-orange-600 hover:-translate-y-0.5 transition-all"
            >
              {courseToEdit ? "Save Changes" : "Create Course"}
            </button>
            <button 
              type="button"
              onClick={onClose}
              className="flex-1 bg-slate-100 text-slate-800 font-bold py-3.5 rounded-xl hover:bg-slate-200 transition-all"
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
