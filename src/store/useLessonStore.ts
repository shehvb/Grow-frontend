import { create } from 'zustand';
import { courseService } from '../services/courseService';


interface LessonState {
  lessons: any[]; // Using any to handle both TeacherLesson and StudentLesson flexibly depending on the view
  activeLesson: any | null;
  isLoading: boolean;
  error: string | null;

  // Actions
  fetchLessons: (courseId: number) => Promise<void>;
  setActiveLesson: (lesson: any) => void;
  createLesson: (courseId: number, data: any) => Promise<void>;
  updateLesson: (lessonId: number, data: any) => Promise<void>;
  deleteLesson: (lessonId: number) => Promise<void>;
  markComplete: (lessonId: number) => Promise<void>;
}

export const useLessonStore = create<LessonState>((set, get) => ({
  lessons: [],
  activeLesson: null,
  isLoading: false,
  error: null,

  fetchLessons: async (courseId: number) => {
    set({ isLoading: true, error: null });
    try {
      const lessons = await courseService.listLessons(courseId);
      set({ lessons, isLoading: false });
    } catch (error: any) {
      set({ error: error.message || 'Failed to fetch lessons', isLoading: false });
    }
  },

  setActiveLesson: (lesson: any) => {
    set({ activeLesson: lesson });
  },

  createLesson: async (courseId: number, data: any) => {
    set({ isLoading: true, error: null });
    try {
      const newLesson = await courseService.createLesson(courseId, data);
      set((state) => ({
        lessons: [...state.lessons, newLesson],
        isLoading: false,
      }));
    } catch (error: any) {
      set({ error: error.message || 'Failed to create lesson', isLoading: false });
      throw error;
    }
  },

  updateLesson: async (lessonId: number, data: any) => {
    set({ isLoading: true, error: null });
    try {
      const updatedLesson = await courseService.updateLesson(lessonId, data);
      set((state) => ({
        lessons: state.lessons.map((l) => (l.id === lessonId ? updatedLesson : l)),
        isLoading: false,
      }));
      // Update active lesson if it's the one being edited
      if (get().activeLesson?.id === lessonId) {
        set({ activeLesson: updatedLesson });
      }
    } catch (error: any) {
      set({ error: error.message || 'Failed to update lesson', isLoading: false });
      throw error;
    }
  },

  deleteLesson: async (lessonId: number) => {
    set({ isLoading: true, error: null });
    try {
      await courseService.deleteLesson(lessonId);
      set((state) => ({
        lessons: state.lessons.filter((l) => l.id !== lessonId),
        isLoading: false,
      }));
      if (get().activeLesson?.id === lessonId) {
        set({ activeLesson: null });
      }
    } catch (error: any) {
      set({ error: error.message || 'Failed to delete lesson', isLoading: false });
      throw error;
    }
  },

  markComplete: async (lessonId: number) => {
    // Optimistic Update
    const previousLessons = get().lessons;
    set((state) => ({
      lessons: state.lessons.map((l) =>
        l.id === lessonId ? { ...l, is_completed: true } : l
      ),
    }));

    try {
      await courseService.markLessonComplete(lessonId);
    } catch (error: any) {
      // Revert on failure
      set({ lessons: previousLessons, error: error.message || 'Failed to mark complete' });
      throw error;
    }
  },
}));
