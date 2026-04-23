export type ReactionType = "like" | "love" | "fire";

export interface Reactions {
  like: number;
  love: number;
  fire: number;
  userReaction: ReactionType | null;
}

export interface ChannelPost {
  id: string;
  teacherId: string;
  teacherName: string;
  title: string;
  content: string;
  createdAt: string;
  reactions: Reactions;
}

export interface ChannelInfo {
  id: string;
  name: string;
}

export interface ChannelApiResponse<T> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
  };
}

export interface ChannelReactRequest {
  reaction: ReactionType;
}
