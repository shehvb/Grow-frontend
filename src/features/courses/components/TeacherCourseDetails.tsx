import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useCourseDetails } from '../hooks/useCourses';
import { fetchLessons } from '../api/lessons';
import type { Lesson } from '../types';
import toast from 'react-hot-toast';
import { FiArrowLeft, FiPlus, FiBook } from 'react-icons/fi';

export const TeacherCourseDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const courseId = id ? parseInt(id, 10) : 0;
  const { course, loading: courseLoading, error: courseError } = useCourseDetails(courseId);
  const navigate = useNavigate();

  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [lessonsLoading, setLessonsLoading] = useState(true);

  useEffect(() => {
    if (courseId) {
      const loadLessons = async () => {
        try {
          const data = await fetchLessons(courseId);
          // Assuming the backend returns ordered lessons, but we can sort just in case
          setLessons(data.sort((a, b) => a.order - b.order));
        } catch (err) {
          toast.error('Failed to load lessons');
        } finally {
          setLessonsLoading(false);
        }
      };
      loadLessons();
    }
  }, [courseId]);

  if (courseLoading) {
    return <div className="p-8 text-center text-gray-500">Loading course details...</div>;
  }

  if (courseError || !course) {
    return <div className="p-8 text-center text-red-500">Error: {courseError || 'Course not found'}</div>;
  }

  return (
    <div className="container mx-auto p-6 max-w-[1320px]">
      <button 
        onClick={() => navigate('/teacher/courses')}
        className="flex items-center gap-2 text-gray-500 hover:text-gray-800 mb-6 transition"
      >
        <FiArrowLeft /> Back to Courses
      </button>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">{course.title}</h1>
        <p className="text-gray-600 text-lg mb-6">{course.description}</p>
        <div className="flex gap-4">
          <Link 
            to={`/teacher/courses/${course.id}/edit`}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition"
          >
            Edit Course Details
          </Link>
        </div>
      </div>

      <div className="mb-6 flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Curriculum (Lessons)</h2>
        <Link 
          to={`/teacher/courses/${course.id}/lessons/new`}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          <FiPlus /> Add Lesson
        </Link>
      </div>

      {lessonsLoading ? (
        <div className="p-8 text-center text-gray-500">Loading lessons...</div>
      ) : lessons.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
          <h3 className="text-xl text-gray-600 mb-2">No lessons added</h3>
          <p className="text-gray-400">Start building your course curriculum.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {lessons.map((lesson) => (
            <div key={lesson.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-start gap-4 hover:shadow-md transition">
              <div className="bg-blue-50 text-blue-600 p-3 rounded-lg">
                <FiBook className="text-xl" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-800 mb-1">
                  {lesson.order}. {lesson.title}
                </h3>
                <p className="text-gray-600 line-clamp-2">{lesson.content}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
