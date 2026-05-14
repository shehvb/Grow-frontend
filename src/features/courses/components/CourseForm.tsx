import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createCourse, updateCourse, fetchCourseDetails } from '../api/courses';
import toast from 'react-hot-toast';
import { FiArrowLeft } from 'react-icons/fi';

export const CourseForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const isEditing = Boolean(id);
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(isEditing);

  useEffect(() => {
    if (isEditing && id) {
      const loadCourse = async () => {
        try {
          const course = await fetchCourseDetails(parseInt(id, 10));
          setTitle(course.title);
          setDescription(course.description);
        } catch (err) {
          toast.error('Failed to load course details');
          navigate('/teacher/courses');
        } finally {
          setLoading(false);
        }
      };
      loadCourse();
    }
  }, [id, isEditing, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) {
      toast.error('Title and description are required');
      return;
    }

    setLoading(true);
    try {
      if (isEditing && id) {
        await updateCourse(parseInt(id, 10), { title, description });
        toast.success('Course updated successfully');
      } else {
        await createCourse({ title, description });
        toast.success('Course created successfully');
      }
      navigate('/teacher/courses');
    } catch (err) {
      toast.error(isEditing ? 'Failed to update course' : 'Failed to create course');
      setLoading(false);
    }
  };

  if (loading && isEditing) {
    return <div className="p-8 text-center text-gray-500">Loading course...</div>;
  }

  return (
    <div className="container mx-auto p-6 max-w-[1320px]">
      <button 
        onClick={() => navigate('/teacher/courses')}
        className="flex items-center gap-2 text-gray-500 hover:text-gray-800 mb-6 transition"
      >
        <FiArrowLeft /> Back to Courses
      </button>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 max-w-2xl">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          {isEditing ? 'Edit Course' : 'Create New Course'}
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Course Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
              placeholder="e.g. Introduction to Biology"
              disabled={loading}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={5}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition resize-none"
              placeholder="Describe what students will learn..."
              disabled={loading}
            />
          </div>

          <div className="flex justify-end gap-4 pt-4 border-t border-gray-100">
            <button
              type="button"
              onClick={() => navigate('/teacher/courses')}
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
              {loading ? 'Saving...' : isEditing ? 'Save Changes' : 'Create Course'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
