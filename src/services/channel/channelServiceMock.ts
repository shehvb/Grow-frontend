import type { ChannelPost, ChannelApiResponse, ChannelReactRequest, ChannelInfo } from "../../types/channel";

export const mockChannels: ChannelInfo[] = [
  { id: "c1", name: "math-class" },
  { id: "c2", name: "Physics-announcements" },
  { id: "c3", name: "homework-updates" }
];

const mockPostsStore: Record<string, ChannelPost[]> = {
  "c1": [
    {
      id: "p1",
      teacherId: "t1",
      teacherName: "Mahmoud Khaled",
      title: "Homework Reminder",
      content: "Complete Assignment 4 before Thursday. Focus on equations from Chapter 5.",
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(), // 3 hours ago
      reactions: { like: 24, love: 8, fire: 12, userReaction: "like" }
    },
    {
      id: "p2",
      teacherId: "t1",
      teacherName: "Mahmoud Khaled",
      title: "Quiz Next Week",
      content: "We will have a quiz on Algebra next Tuesday. Please review Lessons 3-5.",
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 day ago
      reactions: { like: 18, love: 5, fire: 7, userReaction: null }
    }
  ],
  "c2": [
    {
      id: "p3",
      teacherId: "t2",
      teacherName: "Sarah Ahmed",
      title: "Lab Report Guidelines",
      content: "Please ensure your physics lab report follows the standard template provided.",
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
      reactions: { like: 10, love: 2, fire: 1, userReaction: null }
    }
  ]
};

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const channelServiceMock = {
  getChannels: async (): Promise<ChannelApiResponse<ChannelInfo[]>> => {
    await delay(300);
    return { success: true, data: mockChannels };
  },

  getPosts: async (channelId: string): Promise<ChannelApiResponse<ChannelPost[]>> => {
    await delay(600);
    if (Math.random() < 0.05) {
      return { success: false, error: { code: "FETCH_ERR", message: "Failed to fetch posts" } };
    }
    const posts = mockPostsStore[channelId] || [];
    return { success: true, data: JSON.parse(JSON.stringify(posts)) };
  },

  reactToPost: async (postId: string, req: ChannelReactRequest): Promise<ChannelApiResponse<{ success: boolean }>> => {
    await delay(500);
    
    if (Math.random() < 0.1) {
      // Simulate random error 10% of time to test rollback
      return { success: false, error: { code: "NETWORK_ERR", message: "Reaction failed, try again." } };
    }

    // Update locally in mock storage for consistency
    for (const ch in mockPostsStore) {
      const post = mockPostsStore[ch].find(p => p.id === postId);
      if (post) {
        // Simple logic for toggle
        if (post.reactions.userReaction === req.reaction) {
          post.reactions[req.reaction] = Math.max(0, post.reactions[req.reaction] - 1);
          post.reactions.userReaction = null;
        } else {
          if (post.reactions.userReaction) {
            post.reactions[post.reactions.userReaction] = Math.max(0, post.reactions[post.reactions.userReaction] - 1);
          }
          post.reactions[req.reaction] += 1;
          post.reactions.userReaction = req.reaction;
        }
        break;
      }
    }
    return { success: true, data: { success: true } };
  }
};
