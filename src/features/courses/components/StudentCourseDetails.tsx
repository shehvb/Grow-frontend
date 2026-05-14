import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCourseDetails } from '../hooks/useCourses';
import { fetchLessons } from '../api/lessons';
import { enrollInCourse } from '../api/studentActions';
import type { Lesson } from '../types';
import toast from 'react-hot-toast';
import { FiArrowLeft, FiCheckCircle } from 'react-icons/fi';
import { JoinLessonButton } from './JoinLessonButton';

export const StudentCourseDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const courseId = id ? parseInt(id, 10) : 0;
  const { course, loading: courseLoading, error: courseError } = useCourseDetails(courseId);
  const navigate = useNavigate();

  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [lessonsLoading, setLessonsLoading] = useState(true);
  const [enrolled, setEnrolled] = useState(false);
  const [enrollLoading, setEnrollLoading] = useState(false);

  useEffect(() => {
    if (courseId) {
      const loadLessons = async () => {
        try {
          const data = await fetchLessons(courseId);
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

  const handleEnroll = async () => {
    setEnrollLoading(true);
    try {
      await enrollInCourse(courseId);
      setEnrolled(true);
      toast.success('Successfully enrolled in the course!');
    } catch (err: any) {
      // Handle the case where they might already be enrolled
      if (err.response?.status === 400 || err.response?.status === 409) {
        setEnrolled(true);
        toast.success('You are already enrolled in this course.');
      } else {
        toast.error('Failed to enroll in the course.');
      }
    } finally {
      setEnrollLoading(false);
    }
  };

  if (courseLoading) {
    return <div className="p-8 text-center text-gray-500">Loading course details...</div>;
  }

  if (courseError || !course) {
    return <div className="p-8 text-center text-red-500">Error: {courseError || 'Course not found'}</div>;
  }

  return (
    <div className="container mx-auto p-6 max-w-[1320px]">
      <button 
        onClick={() => navigate('/student/courses')}
        className="flex items-center gap-2 text-gray-500 hover:text-gray-800 mb-6 transition"
      >
        <FiArrowLeft /> Back to Courses
      </button>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 mb-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">{course.title}</h1>
            <p className="text-gray-600 text-lg max-w-3xl">{course.description}</p>
          </div>
          <div>
            {!enrolled ? (
              <button 
                onClick={handleEnroll}
                disabled={enrollLoading}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium shadow-sm disabled:opacity-70"
              >
                {enrollLoading ? 'Enrolling...' : 'Enroll Now'}
              </button>
            ) : (
              <div className="flex items-center gap-2 px-6 py-3 bg-green-50 text-green-700 border border-green-200 rounded-lg font-medium">
                <FiCheckCircle /> Enrolled
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Course Lessons</h2>
        <p className="text-gray-500 mt-1">
          {!enrolled ? "Enroll in the course to join these lessons." : "Join the lessons below to participate."}
        </p>
      </div>

      {lessonsLoading ? (
        <div className="p-8 text-center text-gray-500">Loading curriculum...</div>
      ) : lessons.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
          <h3 className="text-xl text-gray-600 mb-2">Coming Soon</h3>
          <p className="text-gray-400">The instructor hasn't added any lessons to this course yet.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {lessons.map((lesson) => (
            <div key={lesson.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-4 transition hover:shadow-md">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-800 mb-1">
                  {lesson.order}. {lesson.title}
                </h3>
                <p className="text-gray-600 line-clamp-2">{lesson.content}</p>
              </div>
              <div className="shrink-0">
                <JoinLessonButton 
                  courseId={courseId} 
                  lessonId={lesson.id} 
                  disabled={!enrolled} 
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
