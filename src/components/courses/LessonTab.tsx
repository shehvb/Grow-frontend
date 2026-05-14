import React, { useState, useEffect } from "react";
import type { FC } from "react";
import type { StudentLesson } from "../../types/course";
import { CourseSidebar } from "../../features/student/courses/components/CourseSidebar";
import { LessonPlayer } from "../../features/student/courses/components/LessonPlayer";
import { CompletionButton } from "../../features/student/courses/components/CompletionButton";

interface LessonTabProps {
  lessons: StudentLesson[];
  isEnrolled: boolean;
}

const LessonTab: FC<LessonTabProps> = ({ lessons, isEnrolled }) => {
  const [activeLesson, setActiveLesson] = useState<StudentLesson | null>(null);

  // Auto-select the first uncompleted lesson, or the first lesson
  useEffect(() => {
    if (lessons.length > 0 && !activeLesson) {
      const firstUncompleted = lessons.find(l => !l.is_completed);
      setActiveLesson(firstUncompleted || lessons[0]);
    } else if (lessons.length === 0 && activeLesson) {
      setActiveLesson(null);
    }
  }, [lessons, activeLesson]);

  const handleNextLesson = () => {
    if (!activeLesson) return;
    const currentIndex = lessons.findIndex(l => l.id === activeLesson.id);
    if (currentIndex >= 0 && currentIndex < lessons.length - 1) {
      setActiveLesson(lessons[currentIndex + 1]);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6">
      {/* Sidebar - Course Content Navigation */}
      <CourseSidebar 
        lessons={lessons}
        activeLessonId={activeLesson?.id || null}
        onSelectLesson={setActiveLesson}
        isEnrolled={isEnrolled}
      />

      {/* Main Content Area - Video Player & Description */}
      <div className="flex-1 flex flex-col gap-6 min-w-0">
        <LessonPlayer lesson={activeLesson as any} />
        
        {/* Completion Actions (only shown if enrolled and a lesson is selected) */}
        {activeLesson && isEnrolled && (
          <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm flex items-center justify-between">
            <div>
              <h4 className="text-lg font-bold text-gray-900">Finished this lesson?</h4>
              <p className="text-gray-500 text-sm">Mark it as complete to earn XP and track your progress.</p>
            </div>
            <CompletionButton 
              lesson={activeLesson} 
              onNext={handleNextLesson} 
            />
          </div>
        )}

        {activeLesson && !isEnrolled && (
          <div className="bg-amber-50 rounded-3xl p-6 border border-amber-100 text-center">
            <h4 className="text-amber-800 font-bold mb-1">Enroll to save progress</h4>
            <p className="text-amber-600/80 text-sm">You must be enrolled in this course to earn XP and track completion.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LessonTab;
