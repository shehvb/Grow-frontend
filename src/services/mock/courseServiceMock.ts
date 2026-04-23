import type { Course, CourseDetails, Lesson, QuizSummary } from "../../types";

const mockLessons: Record<string, Lesson[]> = {
  "1": [
    { id: "l1", title: "Introduction to Algebra", duration: "15 min", status: "completed", description: "Learn the basics of algebra.", videoUrl: "https://example.com/vid1" },
    { id: "l2", title: "Linear Equations", duration: "20 min", status: "in_progress", description: "Deep dive into linear equations." },
    { id: "l3", title: "Quadratic Equations", duration: "25 min", status: "locked", description: "Advanced quadratic equations." }
  ],
  "2": [
    { id: "l4", title: "Kinematics", duration: "18 min", status: "completed" },
    { id: "l5", title: "Newton's Laws", duration: "22 min", status: "locked" }
  ]
};

const mockQuizzes: Record<string, QuizSummary[]> = {
  "1": [
    { id: "q1", title: "Algebra Basics Quiz", questionCount: 5, durationMinutes: 10 },
    { id: "q2", title: "Linear Equations Test", questionCount: 10, durationMinutes: 20 }
  ]
};

const mockAssignments: Record<string, any[]> = {
  "1": [
    {
      id: "a1",
      courseId: "1",
      title: "Advanced Mathematics",
      deadline: new Date(new Date().getTime() + 48 * 60 * 60 * 1000).toISOString(),
      xpReward: 150,
      latePenalty: 20,
      fileUrl: "#",
      fileName: "Advanced_Mathematics_Assignment.pdf",
      instructions: [
        "Download the assignment PDF uploaded by your teacher.",
        "Complete the exercises as per instructions.",
        "Upload your completed assignment as a PDF or Word document in the area below.",
        "After uploading, press the \"Submit Assignment\" button to finalize submission and earn full XP."
      ]
    }
  ]
};

export const coursesMock: Course[] = [
  {
    id: "1",
    title: "Introduction to Mathematics",
    instructor: { id: "1", name: "Dr. Sarah Johnson" },
    progress: 75,
    status: "in_progress",
    lessonsCount: 12
  },
  {
    id: "2",
    title: "Physics Fundamentals",
    instructor: { id: "2", name: "Prof. Michael Chen" },
    progress: 30,
    status: "in_progress",
    lessonsCount: 8
  },
  {
    id: "3",
    title: "English Literature",
    instructor: { id: "3", name: "Ms. Emily Williams" },
    progress: 100,
    status: "completed",
    lessonsCount: 15
  },
  {
    id: "4",
    title: "Computer Science Basics",
    instructor: { id: "4", name: "Dr. James Anderson" },
    progress: 0,
    status: "not_started",
    lessonsCount: 10
  },
  {
    id: "6",
    title: "Chemistry Advanced",
    instructor: { id: "1", name: "Dr. Sarah Johnson" },
    progress: 60,
    status: "in_progress",
    lessonsCount: 20
  }
];

export const getMockCourses = (): Course[] => coursesMock;

export const getMockCourseById = (id: string): CourseDetails | undefined => {
  const course = coursesMock.find(c => c.id === id);
  if (!course) return undefined;

  return {
    ...course,
    lessons: mockLessons[id] || [],
    quizzes: mockQuizzes[id] || [],
    assignments: mockAssignments[id] || []
  };
};
