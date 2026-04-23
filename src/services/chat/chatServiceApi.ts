import type { ChatMessage, ChatApiResponse, ChatSendRequest, ChatTeacher } from "../../types/chat";

const API_BASE = "http://localhost:8000/api";

export const chatServiceApi = {
  getTeachers: async (): Promise<ChatApiResponse<ChatTeacher[]>> => {
    try {
      const res = await fetch(`${API_BASE}/chat/teachers`, {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem('token')}`
        }
      });
      const data = await res.json();
      return data;
    } catch (e: any) {
      return { success: false, error: { code: "API_ERROR", message: "Failed to load teachers" } };
    }
  },

  getMessages: async (teacherId: string): Promise<ChatApiResponse<ChatMessage[]>> => {
    try {
      const res = await fetch(`${API_BASE}/chat/${teacherId}/messages`, {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem('token')}`
        }
      });
      const data = await res.json();
      return data;
    } catch (e: any) {
       return { success: false, error: { code: "API_ERROR", message: "Failed to load messages" } };
    }
  },

  sendMessage: async (teacherId: string, req: ChatSendRequest): Promise<ChatApiResponse<ChatMessage>> => {
     try {
       const res = await fetch(`${API_BASE}/chat/${teacherId}/send`, {
         method: "POST",
         headers: {
           "Content-Type": "application/json",
           "Authorization": `Bearer ${localStorage.getItem('token')}`
         },
         body: JSON.stringify(req)
       });
       const data = await res.json();
       return data;
     } catch (e: any) {
       return { success: false, error: { code: "API_ERROR", message: "Failed to send message" } };
     }
  }
};
