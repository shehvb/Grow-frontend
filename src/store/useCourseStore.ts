import { create } from 'zustand';
import type { Course, CourseWriteRequest, Enrollment } from '../types/course';
import { courseService } from '../services/courseService';

interface CourseState {
  courses: Course[];
  selectedCourse: Course | null;
  courseStudents: Enrollment[];
  lessons: any[];
  isLoading: boolean;
  error: string | null;

  listCourses: () => Promise<void>;
  getCourseById: (id: number) => Promise<void>;
  createCourse: (data: CourseWriteRequest) => Promise<void>;
  updateCourse: (id: number, data: CourseWriteRequest) => Promise<void>;
  deleteCourse: (id: number) => Promise<void>;
  enrollInCourse: (id: number) => Promise<void>;
  getCourseStudents: (id: number) => Promise<void>;
  listLessons: (id: number) => Promise<void>;
  clearError: () => void;
}

export const useCourseStore = create<CourseState>((set, get) => ({
  courses: [],
  selectedCourse: null,
  courseStudents: [],
  lessons: [],
  isLoading: false,
  error: null,

  clearError: () => set({ error: null }),

  listCourses: async () => {
    set({ isLoading: true, error: null });
    try {
      const courses = await courseService.listCourses();
      set({ courses, isLoading: false });
    } catch (error: any) {
      set({ isLoading: false, error: error.response?.data?.detail || 'Failed to list courses.' });
      throw error;
    }
  },

  getCourseById: async (id: number) => {
    set({ isLoading: true, error: null, selectedCourse: null });
    try {
      const course = await courseService.getCourseById(id);
      set({ selectedCourse: course, isLoading: false });
    } catch (error: any) {
      set({ isLoading: false, error: error.response?.data?.detail || 'Failed to get course details.' });
      throw error;
    }
  },

  createCourse: async (data: CourseWriteRequest) => {
    set({ isLoading: true, error: null });
    try {
      const newCourse = await courseService.createCourse(data);
      set((state) => ({ courses: [...state.courses, newCourse], isLoading: false }));
    } catch (error: any) {
      const status = error.response?.status;
      const errorData = error.response?.data;
      let errorMessage = `Failed to create course${status ? ` (${status})` : ''}.`;
      
      if (errorData) {
        if (typeof errorData === 'string') {
          errorMessage = errorData;
        } else if (errorData.detail) {
          errorMessage = errorData.detail;
        } else if (typeof errorData === 'object') {
          // Extract field-specific errors: { "title": ["error"], "grade": ["error"] }
          const fieldErrors = Object.entries(errorData)
            .map(([field, msgs]) => `${field}: ${Array.isArray(msgs) ? msgs.join(', ') : msgs}`)
            .join(' | ');
          if (fieldErrors) errorMessage = fieldErrors;
        }
      }
      
      set({ isLoading: false, error: errorMessage });
      throw error;
    }
  },

  updateCourse: async (id: number, data: CourseWriteRequest) => {
    set({ isLoading: true, error: null });
    try {
      const updatedCourse = await courseService.updateCourse(id, data);
      set((state) => ({
        courses: state.courses.map((c) => (c.id === id ? updatedCourse : c)),
        selectedCourse: state.selectedCourse?.id === id ? updatedCourse : state.selectedCourse,
        isLoading: false,
      }));
    } catch (error: any) {
      set({ isLoading: false, error: error.response?.data?.detail || 'Failed to update course.' });
      throw error;
    }
  },

  deleteCourse: async (id: number) => {
    set({ isLoading: true, error: null });
    try {
      await courseService.deleteCourse(id);
      set((state) => ({
        courses: state.courses.filter((c) => c.id !== id),
        selectedCourse: state.selectedCourse?.id === id ? null : state.selectedCourse,
        isLoading: false,
      }));
    } catch (error: any) {
      set({ isLoading: false, error: error.response?.data?.detail || 'Failed to delete course.' });
      throw error;
    }
  },

  enrollInCourse: async (id: number) => {
    set({ isLoading: true, error: null });
    try {
      await courseService.enrollInCourse(id);
      // Re-fetch courses to reflect enrollment
      await get().listCourses();
    } catch (error: any) {
      set({ isLoading: false, error: error.response?.data?.detail || 'Failed to enroll in course.' });
      throw error;
    }
  },

  getCourseStudents: async (id: number) => {
    set({ isLoading: true, error: null, courseStudents: [] });
    try {
      const students = await courseService.getCourseStudents(id);
      set({ courseStudents: students, isLoading: false });
    } catch (error: any) {
      set({ isLoading: false, error: error.response?.data?.detail || 'Failed to fetch enrolled students.' });
      throw error;
    }
  },

  listLessons: async (id: number) => {
    set({ isLoading: true, error: null, lessons: [] });
    try {
      const lessons = await courseService.listLessons(id);
      set({ lessons, isLoading: false });
    } catch (error: any) {
      set({ isLoading: false, error: error.response?.data?.detail || 'Failed to fetch lessons.' });
      throw error;
    }
  },
}));
