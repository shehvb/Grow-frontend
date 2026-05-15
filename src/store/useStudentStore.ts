import { create } from 'zustand';
import { studentService, type EnrolledStudent } from '../services/studentService';

interface StudentState {
  teacherStudents: EnrolledStudent[];
  isLoading: boolean;
  error: string | null;

  fetchTeacherStudents: () => Promise<void>;
}

export const useStudentStore = create<StudentState>((set) => ({
  teacherStudents: [],
  isLoading: false,
  error: null,

  fetchTeacherStudents: async () => {
    set({ isLoading: true, error: null });
    try {
      const students = await studentService.getTeacherStudents();
      set({ teacherStudents: students, isLoading: false });
    } catch (error: any) {
      set({ isLoading: false, error: error.message });
    }
  }
}));
