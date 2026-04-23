import { create } from 'zustand';
import type { ChatMessage, ChatTeacher } from '../types/chat';
import { chatService } from '../services/chat/chatService';

interface ChatState {
  teachers: ChatTeacher[];
  messages: Record<string, ChatMessage[]>;
  activeTeacherId: string | null;
  isLoadingTeachers: boolean;
  isLoadingMessages: boolean;
  isSending: boolean;
  error: string | null;

  fetchTeachers: () => Promise<void>;
  setActiveTeacher: (teacherId: string) => void;
  fetchMessages: (teacherId: string) => Promise<void>;
  sendMessage: (teacherId: string, content: string) => Promise<void>;
}

export const useChatStore = create<ChatState>((set, get) => ({
  teachers: [],
  messages: {},
  activeTeacherId: null,
  isLoadingTeachers: false,
  isLoadingMessages: false,
  isSending: false,
  error: null,

  fetchTeachers: async () => {
    set({ isLoadingTeachers: true, error: null });
    const res = await chatService.getTeachers();
    if (res.success && res.data) {
      set({ teachers: res.data, isLoadingTeachers: false });
    } else {
      set({ error: res.error?.message || "Failed to load teachers", isLoadingTeachers: false });
    }
  },

  setActiveTeacher: (teacherId) => {
    set({ activeTeacherId: teacherId, error: null });
    get().fetchMessages(teacherId);
  },

  fetchMessages: async (teacherId) => {
    set({ isLoadingMessages: true, error: null });
    const res = await chatService.getMessages(teacherId);
    if (res.success && res.data) {
      set((state) => ({
        messages: { ...state.messages, [teacherId]: res.data! },
        isLoadingMessages: false
      }));
    } else {
      set({ error: res.error?.message || "Failed to load messages", isLoadingMessages: false });
    }
  },

  sendMessage: async (teacherId, content) => {
    if (!content.trim()) return;
    
    set({ isSending: true, error: null });
    
    // Optimistic Update
    const tempId = "temp_" + Date.now();
    const optimisticMessage: ChatMessage = {
      id: tempId,
      senderId: "student1", // Assume student1 is the current user since this is a student app
      receiverId: teacherId,
      content,
      createdAt: new Date().toISOString(),
      status: "pending"
    };

    set((state) => {
      const currentMessages = state.messages[teacherId] || [];
      return {
        messages: {
          ...state.messages,
          [teacherId]: [...currentMessages, optimisticMessage]
        }
      };
    });

    const res = await chatService.sendMessage(teacherId, { content });
    
    set((state) => {
      const currentMessages = state.messages[teacherId] || [];
      if (res.success && res.data) {
        // Replace temp message with actual message
        const updatedMessages = currentMessages.map(m => 
          m.id === tempId ? res.data! : m
        );
        return { messages: { ...state.messages, [teacherId]: updatedMessages }, isSending: false };
      } else {
        // Mark as failed instead of removing, to show retry (or just remove it. Let's mark failed)
        const updatedMessages = currentMessages.map(m => 
          m.id === tempId ? { ...m, status: "failed" as const } : m
        );
        return { 
          messages: { ...state.messages, [teacherId]: updatedMessages }, 
          isSending: false,
          error: res.error?.message || "Failed to send message"
        };
      }
    });
  }
}));
