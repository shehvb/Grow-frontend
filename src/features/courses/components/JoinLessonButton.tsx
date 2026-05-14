import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { joinLesson } from '../api/studentActions';
import { FiPlayCircle, FiCheckCircle } from 'react-icons/fi';

interface JoinLessonButtonProps {
  courseId: number;
  lessonId: number;
  disabled?: boolean;
}

export const JoinLessonButton: React.FC<JoinLessonButtonProps> = ({ courseId, lessonId, disabled = false }) => {
  const [loading, setLoading] = useState(false);
  const [joined, setJoined] = useState(false);

  const handleJoin = async () => {
    if (disabled) {
      toast.error('You must enroll in the course first.');
      return;
    }

    setLoading(true);
    try {
      await joinLesson(courseId, lessonId);
      setJoined(true);
      toast.success('Successfully joined the lesson. Your attendance is marked.');
    } catch (err: any) {
      toast.error(err.response?.data?.detail || 'Failed to join the lesson. It might not be active.');
    } finally {
      setLoading(false);
    }
  };

  if (joined) {
    return (
      <div className="flex items-center gap-2 px-4 py-2 bg-green-50 text-green-700 border border-green-200 rounded-lg font-medium text-sm">
        <FiCheckCircle /> Joined
      </div>
    );
  }

  return (
    <button
      onClick={handleJoin}
      disabled={disabled || loading}
      className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition ${
        disabled 
          ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
          : 'bg-blue-50 text-blue-600 hover:bg-blue-100 border border-blue-200'
      }`}
    >
      <FiPlayCircle className={loading ? 'animate-spin' : ''} />
      {loading ? 'Joining...' : 'Join Lesson'}
    </button>
  );
};
