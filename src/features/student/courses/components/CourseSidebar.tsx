import { type FC } from 'react';
import { PlayCircle, CheckCircle2, Lock } from 'lucide-react';
import type { StudentLesson } from '../../../../types/course';

interface CourseSidebarProps {
  lessons: StudentLesson[];
  activeLessonId: number | null;
  onSelectLesson: (lesson: StudentLesson) => void;
  isEnrolled: boolean;
}

export const CourseSidebar: FC<CourseSidebarProps> = ({ 
  lessons, 
  activeLessonId, 
  onSelectLesson,
  isEnrolled 
}) => {
  return (
    <div className="w-full lg:w-80 shrink-0 bg-white border border-gray-100 rounded-3xl overflow-hidden shadow-sm flex flex-col h-[600px]">
      <div className="p-6 bg-indigo-50 border-b border-indigo-100">
        <h3 className="text-lg font-black text-indigo-900">Course Content</h3>
        <p className="text-sm font-medium text-indigo-600/80 mt-1">
          {lessons.filter(l => l.is_completed).length} of {lessons.length} completed
        </p>
      </div>
      
      <div className="flex-1 overflow-y-auto p-3 space-y-2">
        {lessons.length === 0 ? (
          <p className="text-sm text-gray-500 text-center p-4">No lessons available yet.</p>
        ) : (
          lessons.map((lesson, index) => {
            const isActive = activeLessonId === lesson.id;
            const isCompleted = lesson.is_completed;
            const isLocked = !isEnrolled && index > 0; // Just as an example, first lesson might be free, others locked if not enrolled
            
            return (
              <button
                key={lesson.id}
                onClick={() => !isLocked && onSelectLesson(lesson)}
                disabled={isLocked}
                className={`w-full text-left p-4 rounded-2xl flex items-start gap-3 transition-all ${
                  isActive 
                    ? 'bg-indigo-600 text-white shadow-md' 
                    : isLocked 
                      ? 'opacity-50 cursor-not-allowed bg-gray-50 text-gray-500' 
                      : 'hover:bg-indigo-50 text-gray-700'
                }`}
              >
                <div className="shrink-0 mt-0.5">
                  {isLocked ? (
                    <Lock size={18} className="text-gray-400" />
                  ) : isCompleted ? (
                    <CheckCircle2 size={18} className={isActive ? 'text-indigo-200' : 'text-emerald-500'} />
                  ) : (
                    <PlayCircle size={18} className={isActive ? 'text-white' : 'text-indigo-600'} />
                  )}
                </div>
                <div>
                  <span className="text-xs font-black tracking-wider uppercase opacity-80 mb-1 block">
                    Lesson {index + 1}
                  </span>
                  <span className={`text-sm font-bold leading-tight block ${isActive ? 'text-white' : 'text-gray-900'}`}>
                    {lesson.title}
                  </span>
                </div>
              </button>
            );
          })
        )}
      </div>
    </div>
  );
};
