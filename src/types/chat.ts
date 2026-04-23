export type MessageStatus = "sent" | "pending" | "failed";

export interface ChatMessage {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  createdAt: string;
  status: MessageStatus;
}

export interface ChatTeacher {
  id: string;
  name: string;
  subject: string;
  isOnline: boolean;
  avatarUrl?: string;
  lastMessageTime?: string;
  lastMessagePreview?: string;
}

export interface ChatApiResponse<T> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
  };
}

export interface ChatSendRequest {
  content: string;
}
