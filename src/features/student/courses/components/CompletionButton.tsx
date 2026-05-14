import { useState, type FC } from 'react';
import { CheckCircle2, Award } from 'lucide-react';
import { useLessonStore } from '../../../../store/useLessonStore';
import type { StudentLesson } from '../../../../types/course';

interface CompletionButtonProps {
  lesson: StudentLesson;
  onNext?: () => void;
}

export const CompletionButton: FC<CompletionButtonProps> = ({ lesson, onNext }) => {
  const { markComplete } = useLessonStore();
  const [isMarking, setIsMarking] = useState(false);

  const isCompleted = lesson.is_completed;

  const handleComplete = async () => {
    if (isCompleted || isMarking) return;
    
    setIsMarking(true);
    try {
      await markComplete(lesson.id);
      // If there's an onNext callback, wait a moment and trigger it
      if (onNext) {
        setTimeout(onNext, 1500);
      }
    } catch (error) {
      // Error is handled by the store, but we catch it here to reset local loading state if needed
      console.error(error);
    } finally {
      setIsMarking(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-3">
      <button
        onClick={handleComplete}
        disabled={isCompleted || isMarking}
        className={`flex items-center gap-2 px-8 py-4 rounded-2xl font-bold text-lg transition-all ${
          isCompleted
            ? 'bg-emerald-50 text-emerald-600 cursor-default'
            : 'bg-indigo-600 text-white hover:bg-indigo-700 hover:shadow-lg hover:-translate-y-0.5'
        }`}
      >
        {isMarking ? (
          <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
        ) : (
          <CheckCircle2 size={24} className={isCompleted ? 'text-emerald-500' : ''} />
        )}
        {isCompleted ? 'Completed' : isMarking ? 'Marking...' : 'Mark as Complete'}
      </button>

      {isCompleted && (
        <div className="flex items-center gap-1.5 text-sm font-bold text-amber-500 animate-fade-in">
          <Award size={18} />
          <span>XP Awarded</span>
        </div>
      )}
    </div>
  );
};
