import type { ChatMessage, ChatApiResponse, ChatSendRequest, ChatTeacher } from "../../types/chat";

// Mock Data
export const mockTeachers: ChatTeacher[] = [
  { id: "t1", name: "Mahmoud Khaled", subject: "Mathematics Teacher", isOnline: true },
  { id: "t2", name: "Sarah Ahmed", subject: "Physics Teacher", isOnline: false },
  { id: "t3", name: "Omar Hassan", subject: "Chemistry Teacher", isOnline: false },
];

const mockMessagesStore: Record<string, ChatMessage[]> = {
  "t1": [
    {
      id: "m1",
      senderId: "t1",
      receiverId: "student1",
      content: "Ahmed, I noticed your score in algebra is lower than expected.",
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 day ago
      status: "sent"
    },
    {
      id: "m2",
      senderId: "t1",
      receiverId: "student1",
      content: "You should review Lesson 3 before the next quiz.",
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 23).toISOString(),
      status: "sent"
    },
    {
      id: "m3",
      senderId: "student1",
      receiverId: "t1",
      content: "Okay teacher, I will review it today.",
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
      status: "sent"
    },
    {
      id: "m4",
      senderId: "t1",
      receiverId: "student1",
      content: "That's great! Let me know if you need any help with specific topics.",
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
      status: "sent"
    },
    {
      id: "m5",
      senderId: "student1",
      receiverId: "t1",
      content: "Thank you! I will reach out if I need clarification.",
      createdAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
      status: "sent"
    }
  ]
};

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const chatServiceMock = {
  getTeachers: async (): Promise<ChatApiResponse<ChatTeacher[]>> => {
    await delay(500);
    return { success: true, data: mockTeachers };
  },

  getMessages: async (teacherId: string): Promise<ChatApiResponse<ChatMessage[]>> => {
    await delay(600);
    // Simulate random error 10% of the time (pure randomness sometimes gets annoying, disabled by user preference usually but let's do 5%)
    if (Math.random() < 0.05) {
      return { success: false, error: { code: "FETCH_ERR", message: "Failed to fetch messages" } };
    }
    const messages = mockMessagesStore[teacherId] || [];
    return { success: true, data: [...messages] }; // Return a copy
  },

  sendMessage: async (teacherId: string, req: ChatSendRequest): Promise<ChatApiResponse<ChatMessage>> => {
    await delay(800);
    if (!req.content.trim()) {
      return { success: false, error: { code: "VALIDATION_ERR", message: "Message cannot be empty" } };
    }
    
    // Simulate error 5% of the time
    if (Math.random() < 0.05) {
      return { success: false, error: { code: "NETWORK_ERR", message: "Network error while sending message" } };
    }

    const newMessage: ChatMessage = {
      id: "m_" + Date.now().toString(),
      senderId: "student1",
      receiverId: teacherId,
      content: req.content,
      createdAt: new Date().toISOString(),
      status: "sent"
    };
    
    if (!mockMessagesStore[teacherId]) {
      mockMessagesStore[teacherId] = [];
    }
    mockMessagesStore[teacherId].push(newMessage);

    return { success: true, data: newMessage };
  }
};
