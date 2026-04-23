export type CourseStatus = "not_started" | "in_progress" | "completed";

export interface Course {
  id: string;
  title: string;
  instructor: {
    id: string;
    name: string;
  };
  progress: number;
  status: CourseStatus;
}

export const coursesMock: Course[] = [
  {
    id: "1",
    title: "Introduction to Mathematics",
    instructor: { id: "1", name: "Dr. Sarah Johnson" },
    progress: 75,
    status: "in_progress",
  },
  {
    id: "2",
    title: "Physics Fundamentals",
    instructor: { id: "2", name: "Prof. Michael Chen" },
    progress: 30,
    status: "in_progress",
  },
  {
    id: "3",
    title: "English Literature",
    instructor: { id: "3", name: "Ms. Emily Williams" },
    progress: 100,
    status: "completed",
  },
  {
    id: "4",
    title: "Computer Science Basics",
    instructor: { id: "4", name: "Dr. James Anderson" },
    progress: 0,
    status: "not_started",
  },
  {
    id: "5",
    title: "Spanish Language",
    instructor: { id: "5", name: "Mrs. Lisa Martinez" },
    progress: 45,
    status: "in_progress",
  },
  {
    id: "6",
    title: "Chemistry Advanced",
    instructor: { id: "1", name: "Dr. Sarah Johnson" },
    progress: 60,
    status: "in_progress",
  },
  {
    id: "7",
    title: "World History",
    instructor: { id: "3", name: "Ms. Emily Williams" },
    progress: 90,
    status: "in_progress",
  },
  {
    id: "8",
    title: "Biology Essentials",
    instructor: { id: "2", name: "Prof. Michael Chen" },
    progress: 0,
    status: "not_started",
  },
];

export const getCourses = (): Course[] => {
  return coursesMock;
};

export const getCourseById = (id: string): Course | undefined => {
  return coursesMock.find(c => c.id === id);
};
