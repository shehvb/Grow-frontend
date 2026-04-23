export type TaskStatus = "pending" | "overdue" | "completed";
export type TaskCategory = "today" | "upcoming" | "overdue";

export interface Task {
  id: string;
  title: string;
  dueDate: string;
  status: TaskStatus;
  category: TaskCategory;
}

export const tasksMock: Task[] = [
  { id: "1", title: "Complete Math Quiz", dueDate: "2025-03-16", status: "pending", category: "today" },
  { id: "2", title: "Read Science Chapter 5", dueDate: "2025-03-16", status: "pending", category: "today" },
  { id: "3", title: "Practice Spanish Vocabulary", dueDate: "2025-03-16", status: "completed", category: "today" },
  { id: "4", title: "History Essay Draft", dueDate: "2025-03-18", status: "pending", category: "upcoming" },
  { id: "5", title: "Physics Lab Report", dueDate: "2025-03-20", status: "pending", category: "upcoming" },
  { id: "6", title: "English Reading", dueDate: "2025-03-22", status: "pending", category: "upcoming" },
  { id: "7", title: "Old Math Assignment", dueDate: "2025-03-10", status: "overdue", category: "overdue" },
  { id: "8", title: "Missed Science Quiz", dueDate: "2025-03-12", status: "overdue", category: "overdue" },
];

export const getTasks = (): Task[] => tasksMock;
