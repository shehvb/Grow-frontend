import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createLesson } from '../api/lessons';
import toast from 'react-hot-toast';
import { FiArrowLeft } from 'react-icons/fi';

export const LessonForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const courseId = id ? parseInt(id, 10) : 0;
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [order, setOrder] = useState<number>(1);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      toast.error('Title and content are required');
      return;
    }

    setLoading(true);
    try {
      await createLesson(courseId, { title, content, order });
      toast.success('Lesson added successfully');
      navigate(`/teacher/courses/${courseId}`);
    } catch (err) {
      toast.error('Failed to add lesson');
      setLoading(false);
    }
  };

  if (!courseId) {
    return <div className="p-8 text-center text-red-500">Invalid course ID</div>;
  }

  return (
    <div className="container mx-auto p-6 max-w-[1320px]">
      <button 
        onClick={() => navigate(`/teacher/courses/${courseId}`)}
        className="flex items-center gap-2 text-gray-500 hover:text-gray-800 mb-6 transition"
      >
        <FiArrowLeft /> Back to Course
      </button>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 max-w-2xl">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          Add New Lesson
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Lesson Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
              placeholder="e.g. Chapter 1: The Cell"
              disabled={loading}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Order
            </label>
            <input
              type="number"
              min="1"
              value={order}
              onChange={(e) => setOrder(parseInt(e.target.value, 10))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
              disabled={loading}
            />
            <p className="text-xs text-gray-500 mt-1">Controls the sequence of the lessons.</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Lesson Content
            </label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={8}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition resize-y"
              placeholder="Enter the lesson content here..."
              disabled={loading}
            />
          </div>

          <div className="flex justify-end gap-4 pt-4 border-t border-gray-100">
            <button
              type="button"
              onClick={() => navigate(`/teacher/courses/${courseId}`)}
              className="px-6 py-2 text-gray-600 hover:text-gray-800 font-medium transition"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-70"
            >
              {loading ? 'Adding...' : 'Add Lesson'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
