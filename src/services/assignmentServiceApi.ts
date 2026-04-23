import type { Assignment, Submission } from "../types";

class AssignmentServiceApi {
  private getAuthHeaders() {
    const token = localStorage.getItem("access_token");
    return {
      "Authorization": `Bearer ${token}`
    };
  }

  async getAssignment(assignmentId: string): Promise<Assignment | null> {
    const res = await fetch(`http://127.0.0.1:8000/api/v1/assignments/${assignmentId}`, {
      headers: this.getAuthHeaders()
    });
    if (!res.ok) throw new Error("Failed to fetch assignment");
    return res.json();
  }

  async getAssignmentsByCourse(courseId: string): Promise<Assignment[]> {
    const res = await fetch(`http://127.0.0.1:8000/api/v1/courses/${courseId}/assignments`, {
      headers: this.getAuthHeaders()
    });
    if (!res.ok) throw new Error("Failed to fetch course assignments");
    return res.json();
  }

  async uploadAssignmentFile(assignmentId: string, file: File): Promise<{ success: boolean; message: string; fileName: string }> {
    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch(`http://127.0.0.1:8000/api/v1/assignments/${assignmentId}/upload`, {
      method: "POST",
      headers: {
        ...this.getAuthHeaders()
      },
      body: formData
    });
    if (!res.ok) throw new Error("File upload failed");
    return res.json();
  }

  async submitAssignment(assignmentId: string, fileName: string): Promise<Submission> {
    const res = await fetch(`http://127.0.0.1:8000/api/v1/assignments/${assignmentId}/submit`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...this.getAuthHeaders()
      },
      body: JSON.stringify({ fileName })
    });
    if (!res.ok) throw new Error("Failed to submit assignment");
    return res.json();
  }
}

export const assignmentServiceApi = new AssignmentServiceApi();
