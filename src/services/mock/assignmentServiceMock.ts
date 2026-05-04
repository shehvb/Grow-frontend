import type { Assignment, Submission } from "../../types";

const DELAY = 1000; // Simulated network delay

class AssignmentServiceMock {
  private assignments: Assignment[] = [
    {
      id: "a1",
      courseId: "c1",
      title: "Advanced Mathematics",
      deadline: new Date(new Date().getTime() + 48 * 60 * 60 * 1000).toISOString(), // 2 days from now
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
  ];

  private submissions: Submission[] = [];

  async getAssignment(assignmentId: string): Promise<Assignment | null> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const assignment = this.assignments.find((a) => a.id === assignmentId) || null;
        resolve(assignment);
      }, DELAY);
    });
  }

  async getAssignmentsByCourse(courseId: string): Promise<Assignment[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const result = this.assignments.filter((a) => a.courseId === courseId);
        resolve(result);
      }, DELAY);
    });
  }

  async uploadAssignmentFile(_assignmentId: string, file: File): Promise<{ success: boolean; message: string; fileName: string }> {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Return a simulated success
        resolve({
          success: true,
          message: "File uploaded successfully",
          fileName: file.name
        });
      }, DELAY);
    });
  }

  async submitAssignment(assignmentId: string, fileName: string): Promise<Submission> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const assignment = this.assignments.find((a) => a.id === assignmentId);
        const submittedAt = new Date().toISOString();
        let status: "pending" | "late" = "pending";
        let xpEarned = assignment ? assignment.xpReward : 0;

        if (assignment && new Date(submittedAt) > new Date(assignment.deadline)) {
          status = "late";
          xpEarned = Math.max(0, xpEarned - assignment.latePenalty);
        }

        const submission: Submission = {
          id: `sub_${Math.random().toString(36).substring(7)}`,
          assignmentId,
          fileName,
          submittedAt,
          status,
          xpEarned
        };

        this.submissions.push(submission);
        resolve(submission);
      }, DELAY);
    });
  }
}

export const assignmentServiceMock = new AssignmentServiceMock();
