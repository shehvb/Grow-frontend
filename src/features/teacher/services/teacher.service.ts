import { MOCK_TEACHER_STATS, MOCK_STUDENTS } from "./teacher.mock";
import type { TeacherStats, ClassroomStudent } from "../../../types/teacher";

class TeacherService {
  private static instance: TeacherService;

  private constructor() {}

  public static getInstance(): TeacherService {
    if (!TeacherService.instance) {
      TeacherService.instance = new TeacherService();
    }
    return TeacherService.instance;
  }

  // Simulations of API calls
  public async getDashboardStats(): Promise<TeacherStats> {
    return new Promise((resolve) => {
      setTimeout(() => resolve(MOCK_TEACHER_STATS), 500);
    });
  }

  public async getStudents(): Promise<ClassroomStudent[]> {
    return new Promise((resolve) => {
      setTimeout(() => resolve(MOCK_STUDENTS), 500);
    });
  }
}

export const teacherService = TeacherService.getInstance();
