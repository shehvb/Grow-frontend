import React from 'react';
import { Link } from 'react-router-dom';
import { useCourses } from '../hooks/useCourses';
import { deleteCourse } from '../api/courses';
import toast from 'react-hot-toast';
import { FiEdit2, FiTrash2, FiPlus, FiEye } from 'react-icons/fi';

export const TeacherCourseList: React.FC = () => {
  const { courses, loading, error, reload } = useCourses();

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this course? This action cannot be undone.')) {
      try {
        await deleteCourse(id);
        toast.success('Course deleted successfully');
        reload();
      } catch (err) {
        toast.error('Failed to delete course');
      }
    }
  };

  if (loading) {
    return <div className="p-8 text-center text-gray-500">Loading courses...</div>;
  }

  if (error) {
    return <div className="p-8 text-center text-red-500">Error: {error}</div>;
  }

  return (
    <div className="container mx-auto p-6 max-w-[1320px]">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">My Courses</h1>
        <Link 
          to="/teacher/courses/new" 
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          <FiPlus /> Create Course
        </Link>
      </div>

      {courses.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
          <h3 className="text-xl text-gray-600 mb-2">No courses yet</h3>
          <p className="text-gray-400">Create your first course to get started.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map(course => (
            <div key={course.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition">
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{course.title}</h3>
                <p className="text-gray-600 text-sm line-clamp-3 mb-4">{course.description}</p>
                <div className="flex justify-between items-center pt-4 border-t border-gray-50">
                  <span className="text-xs text-gray-400">
                    Created: {new Date(course.created_at || new Date()).toLocaleDateString()}
                  </span>
                  <div className="flex gap-2">
                    <Link to={`/teacher/courses/${course.id}`} className="text-gray-500 hover:text-blue-600 p-2" title="View details">
                      <FiEye />
                    </Link>
                    <Link to={`/teacher/courses/${course.id}/edit`} className="text-gray-500 hover:text-green-600 p-2" title="Edit course">
                      <FiEdit2 />
                    </Link>
                    <button onClick={() => handleDelete(course.id)} className="text-gray-500 hover:text-red-600 p-2" title="Delete course">
                      <FiTrash2 />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
