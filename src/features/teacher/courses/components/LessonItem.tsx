import { type FC } from 'react';
import { Pencil, Trash2, GripVertical, FileText, Video } from 'lucide-react';
import type { TeacherLesson } from '../../../../types/course';

interface LessonItemProps {
  lesson: TeacherLesson;
  onEdit: (lesson: TeacherLesson) => void;
  onDelete: (id: number) => void;
}

export const LessonItem: FC<LessonItemProps> = ({ lesson, onEdit, onDelete }) => {
  return (
    <div className="flex items-center justify-between p-4 mb-3 bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition-shadow group">
      <div className="flex items-center gap-4 flex-1">
        <div className="cursor-grab text-gray-400 hover:text-gray-600">
          <GripVertical size={20} />
        </div>
        
        <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-indigo-50 text-indigo-600 font-semibold">
          {lesson.order}
        </div>

        <div className="flex-1">
          <h4 className="text-sm font-semibold text-gray-900">{lesson.title}</h4>
          <div className="flex items-center gap-3 mt-1 text-xs text-gray-500">
            <span className="flex items-center gap-1">
              {lesson.video_url ? <Video size={14} className="text-blue-500" /> : <FileText size={14} className="text-gray-400" />}
              {lesson.video_url ? 'Video Lesson' : 'Text Lesson'}
            </span>
            <span>•</span>
            <span className="font-medium text-amber-600">{lesson.xp_reward} XP</span>
            {lesson.bonus_xp > 0 && (
              <>
                <span>•</span>
                <span className="font-medium text-emerald-600">+{lesson.bonus_xp} Bonus</span>
              </>
            )}
            <span>•</span>
            <span className={`capitalize ${lesson.status === 'published' ? 'text-green-600' : 'text-gray-400'}`}>
              {lesson.status}
            </span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          onClick={() => onEdit(lesson)}
          className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
          title="Edit Lesson"
        >
          <Pencil size={18} />
        </button>
        <button
          onClick={() => onDelete(lesson.id)}
          className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          title="Delete Lesson"
        >
          <Trash2 size={18} />
        </button>
      </div>
    </div>
  );
};
