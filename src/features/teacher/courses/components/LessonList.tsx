import { useEffect, useState, type FC } from 'react';
import { Plus, BookOpen } from 'lucide-react';
import { useLessonStore } from '../../../../store/useLessonStore';
import { LessonItem } from './LessonItem';
import { CreateLessonModal } from './CreateLessonModal';
import type { TeacherLesson } from '../../../../types/course';

interface LessonListProps {
  courseId: number;
}

export const LessonList: FC<LessonListProps> = ({ courseId }) => {
  const { lessons, isLoading, error, fetchLessons, deleteLesson } = useLessonStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingLesson, setEditingLesson] = useState<TeacherLesson | undefined>(undefined);

  useEffect(() => {
    if (courseId) {
      fetchLessons(courseId);
    }
  }, [courseId, fetchLessons]);

  const handleCreate = () => {
    setEditingLesson(undefined);
    setIsModalOpen(true);
  };

  const handleEdit = (lesson: TeacherLesson) => {
    setEditingLesson(lesson);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this lesson?')) {
      await deleteLesson(id);
    }
  };

  if (isLoading && lessons.length === 0) {
    return (
      <div className="flex items-center justify-center p-8 bg-white rounded-2xl shadow-sm border border-gray-100 mt-6">
        <div className="w-8 h-8 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="mt-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-indigo-50 text-indigo-600 rounded-xl">
            <BookOpen size={24} />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900">Course Lessons</h3>
            <p className="text-sm text-gray-500">Manage the content and structure of your course</p>
          </div>
        </div>
        
        <button
          onClick={handleCreate}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-xl hover:bg-indigo-700 transition-colors"
        >
          <Plus size={18} />
          Add Lesson
        </button>
      </div>

      {error && (
        <div className="p-4 text-sm text-red-600 bg-red-50 rounded-xl">
          {error}
        </div>
      )}

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        {lessons.length === 0 ? (
          <div className="text-center py-12">
            <div className="inline-flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-gray-50 text-gray-400">
              <BookOpen size={32} />
            </div>
            <h3 className="text-lg font-medium text-gray-900">No lessons yet</h3>
            <p className="mt-1 text-gray-500">Get started by creating your first lesson.</p>
            <button
              onClick={handleCreate}
              className="mt-6 inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-indigo-600 bg-indigo-50 rounded-xl hover:bg-indigo-100 transition-colors"
            >
              <Plus size={18} />
              Add First Lesson
            </button>
          </div>
        ) : (
          <div className="space-y-1">
            {lessons
              .sort((a, b) => a.order - b.order)
              .map((lesson) => (
              <LessonItem
                key={lesson.id}
                lesson={lesson}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </div>

      <CreateLessonModal
        courseId={courseId}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialData={editingLesson}
      />
    </div>
  );
};
