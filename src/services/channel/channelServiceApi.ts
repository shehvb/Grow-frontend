import type { ChannelPost, ChannelApiResponse, ChannelReactRequest, ChannelInfo } from "../../types/channel";

const API_BASE = "http://localhost:8000/api";

export const channelServiceApi = {
  getChannels: async (): Promise<ChannelApiResponse<ChannelInfo[]>> => {
    try {
        const res = await fetch(`${API_BASE}/channels`, {
          headers: {
            "Authorization": `Bearer ${localStorage.getItem('token')}`
          }
        });
        const data = await res.json();
        return data;
      } catch (e: any) {
        return { success: false, error: { code: "API_ERROR", message: "Failed to load channels" } };
      }
  },

  getPosts: async (channelId: string): Promise<ChannelApiResponse<ChannelPost[]>> => {
    try {
      const res = await fetch(`${API_BASE}/channels/${channelId}/posts`, {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem('token')}`
        }
      });
      const data = await res.json();
      return data;
    } catch (e: any) {
       return { success: false, error: { code: "API_ERROR", message: "Failed to load posts" } };
    }
  },

  reactToPost: async (postId: string, req: ChannelReactRequest): Promise<ChannelApiResponse<{ success: boolean }>> => {
     try {
       const res = await fetch(`${API_BASE}/channels/${postId}/react`, {
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
       return { success: false, error: { code: "API_ERROR", message: "Failed to react" } };
     }
  }
};
