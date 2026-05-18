import type { StudentAssignment, Submission } from "../../types";

type Assignment = StudentAssignment;

const DELAY = 1000; // Simulated network delay

class AssignmentServiceMock {
  private assignments: Assignment[] = [
    {
      id: 1,
      title: "Advanced Mathematics",
      due_date: new Date(new Date().getTime() + 48 * 60 * 60 * 1000).toISOString(), // 2 days from now
      xp_reward: 150,
      teacher_file: "#",
      submission_status: "pending"
    }
  ];

  private submissions: Submission[] = [];

  async getAssignment(assignmentId: string): Promise<Assignment | null> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const assignment = this.assignments.find((a) => a.id.toString() === assignmentId) || null;
        resolve(assignment);
      }, DELAY);
    });
  }

  async getAssignmentsByCourse(_courseId: string): Promise<Assignment[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(this.assignments);
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

  async submitAssignment(assignmentId: string, _fileName: string): Promise<Submission> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const submittedAt = new Date().toISOString();
        const submission: Submission = {
          id: Math.floor(Math.random() * 100000),
          assignment: Number(assignmentId) || 1,
          student: 66,
          status: "pending",
          submitted_at: submittedAt
        };

        this.submissions.push(submission);
        resolve(submission);
      }, DELAY);
    });
  }
}

export const assignmentServiceMock = new AssignmentServiceMock();
