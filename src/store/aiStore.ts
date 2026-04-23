import { create } from "zustand";

export interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}

export interface Chat {
  id: string;
  title: string;
  messages: Message[];
  createdAt: number;
}

interface AIStore {
  chats: Chat[];
  activeChatId: string | null;
  searchQuery: string;
  
  // Actions
  newChat: () => void;
  setActiveChat: (id: string) => void;
  sendMessage: (content: string, responseCallback: (response: Message) => void) => void;
  setSearchQuery: (query: string) => void;
  deleteChat: (id: string) => void;
}

export const useAIStore = create<AIStore>((set, get) => ({
  chats: [
    {
      id: "initial-chat",
      title: "Photosynthesis Basics",
      createdAt: Date.now(),
      messages: [
        {
          id: "1",
          role: "assistant",
          content: "Hello Mazen! I'm your dedicated AI Tutor. Ready to tackle your learning goals today? We were last discussing the fundamentals of photosynthesis. Would you like to continue there or start something new?",
          timestamp: "9:41 AM",
        },
      ],
    }
  ],
  activeChatId: "initial-chat",
  searchQuery: "",

  newChat: () => {
    const newId = Date.now().toString();
    const newChat: Chat = {
      id: newId,
      title: "New Chat",
      messages: [
        {
          id: "welcome",
          role: "assistant",
          content: "Hello again! I've cleared our previous conversation. What would you like to learn about now?",
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        }
      ],
      createdAt: Date.now(),
    };
    set((state) => ({
      chats: [newChat, ...state.chats],
      activeChatId: newId,
    }));
  },

  setActiveChat: (id) => set({ activeChatId: id }),

  setSearchQuery: (query) => set({ searchQuery: query }),

  deleteChat: (id) => set((state) => ({
    chats: state.chats.filter(c => c.id !== id),
    activeChatId: state.activeChatId === id ? (state.chats[0]?.id || null) : state.activeChatId
  })),

  sendMessage: (content, responseCallback) => {
    const { activeChatId } = get();
    if (!activeChatId) return;

    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content,
      timestamp,
    };

    // Update state immediately with user message
    set((state) => ({
      chats: state.chats.map(chat => 
        chat.id === activeChatId 
          ? { 
              ...chat, 
              messages: [...chat.messages, userMessage],
              // Update title if it's still "New Chat"
              title: chat.title === "New Chat" ? content.substring(0, 30) + (content.length > 30 ? "..." : "") : chat.title
            }
          : chat
      )
    }));

    // Generate mock AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: `I've received your message: "${content}". How can I help you further with this topic?`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      set((state) => ({
        chats: state.chats.map(chat => 
          chat.id === activeChatId 
            ? { ...chat, messages: [...chat.messages, aiResponse] }
            : chat
        )
      }));
      
      responseCallback(aiResponse);
    }, 1000);
  }
}));
