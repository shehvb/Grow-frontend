import { useState, useEffect, type FC } from 'react';
import { createPortal } from 'react-dom';
import { X, Save, FileVideo, AlignLeft, Award } from 'lucide-react';
import type { TeacherLesson, TeacherLessonWriteRequest } from '../../../../types/course';
import { useLessonStore } from '../../../../store/useLessonStore';

interface CreateLessonModalProps {
  courseId: number;
  isOpen: boolean;
  onClose: () => void;
  initialData?: TeacherLesson; // If provided, we are in edit mode
}

export const CreateLessonModal: FC<CreateLessonModalProps> = ({ 
  courseId, 
  isOpen, 
  onClose, 
  initialData 
}) => {
  const [formData, setFormData] = useState<TeacherLessonWriteRequest>({
    title: '',
    content: '',
    order: 1,
    status: 'draft',
    video_url: '',
    xp_reward: 10,
    bonus_xp: 0,
  });

  const { createLesson, updateLesson, isLoading, error } = useLessonStore();
  const [localError, setLocalError] = useState<string | null>(null);

  useEffect(() => {
    if (initialData && isOpen) {
      setFormData({
        title: initialData.title,
        content: initialData.content,
        order: initialData.order,
        status: initialData.status,
        video_url: initialData.video_url || '',
        xp_reward: initialData.xp_reward,
        bonus_xp: initialData.bonus_xp,
      });
    } else if (isOpen) {
      setFormData({
        title: '',
        content: '',
        order: 1,
        status: 'draft',
        video_url: '',
        xp_reward: 10,
        bonus_xp: 0,
      });
    }
    setLocalError(null);
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? Number(value) : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError(null);

    // Validate
    if (!formData.title || !formData.content) {
      setLocalError("Title and content are required.");
      return;
    }

    try {
      // The API expects FormData because of potential file uploads, 
      // but we can send JSON if we aren't uploading files according to the schema (it supports json/form-data).
      // If we use JSON, we don't include File objects.
      
      const payload = {
        ...formData,
        video_url: formData.video_url ? formData.video_url : undefined
      };

      if (initialData) {
        await updateLesson(initialData.id, payload);
      } else {
        await createLesson(courseId, payload);
      }
      onClose();
    } catch (err: any) {
      setLocalError(err.message || "Failed to save lesson.");
    }
  };

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm">
      <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl">
        <div className="sticky top-0 z-10 flex items-center justify-between p-6 bg-white border-b border-gray-100">
          <h2 className="text-xl font-bold text-gray-900">
            {initialData ? 'Edit Lesson' : 'Create New Lesson'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 transition-colors rounded-full hover:bg-gray-100 hover:text-gray-600"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {(error || localError) && (
            <div className="p-4 text-sm text-red-600 bg-red-50 rounded-xl">
              {localError || error}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="col-span-1 md:col-span-2">
              <label className="block mb-2 text-sm font-medium text-gray-700">Lesson Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g. Introduction to Variables"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none"
                required
              />
            </div>

            <div className="col-span-1 md:col-span-2">
              <label className=" mb-2 text-sm font-medium text-gray-700 flex items-center gap-2">
                <AlignLeft size={16} className="text-gray-400" />
                Lesson Content
              </label>
              <textarea
                name="content"
                value={formData.content}
                onChange={handleChange}
                placeholder="Write your lesson content here..."
                rows={5}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none resize-y"
                required
              />
            </div>

            <div>
              <label className=" mb-2 text-sm font-medium text-gray-700 flex items-center gap-2">
                <FileVideo size={16} className="text-gray-400" />
                Video URL (Optional)
              </label>
              <input
                type="url"
                name="video_url"
                value={formData.video_url}
                onChange={handleChange}
                placeholder="https://youtube.com/..."
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none"
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">Sequence Order</label>
              <input
                type="number"
                name="order"
                value={formData.order}
                onChange={handleChange}
                min="0"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none"
                required
              />
            </div>

            <div>
              <label className=" mb-2 text-sm font-medium text-gray-700 flex items-center gap-2">
                <Award size={16} className="text-amber-500" />
                XP Reward
              </label>
              <input
                type="number"
                name="xp_reward"
                value={formData.xp_reward}
                onChange={handleChange}
                min="0"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none"
                required
              />
            </div>

            <div>
              <label className=" mb-2 text-sm font-medium text-gray-700 flex items-center gap-2">
                <Award size={16} className="text-emerald-500" />
                Bonus XP
              </label>
              <input
                type="number"
                name="bonus_xp"
                value={formData.bonus_xp}
                onChange={handleChange}
                min="0"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none"
                required
              />
            </div>
            
            <div className="col-span-1 md:col-span-2">
              <label className="block mb-2 text-sm font-medium text-gray-700">Status</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none bg-white"
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-6 border-t border-gray-100">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2.5 text-sm font-medium text-gray-700 bg-gray-50 border border-gray-200 rounded-xl hover:bg-gray-100 transition-colors"
              disabled={isLoading}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="flex items-center gap-2 px-6 py-2.5 text-sm font-medium text-white bg-indigo-600 rounded-xl hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Save size={18} />
              {isLoading ? 'Saving...' : 'Save Lesson'}
            </button>
          </div>
        </form>
      </div>
    </div>,
    document.body
  );
};
