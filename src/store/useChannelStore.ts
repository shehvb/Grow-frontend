import { create } from 'zustand';
import type { ChannelPost, ChannelInfo, ReactionType } from '../types/channel';
import { channelService } from '../services/channel/channelService';

interface ChannelState {
  channels: ChannelInfo[];
  posts: Record<string, ChannelPost[]>;
  activeChannelId: string | null;
  isLoadingChannels: boolean;
  isLoadingPosts: boolean;
  isReacting: Record<string, boolean>; // postId -> isReacting
  error: string | null;

  fetchChannels: () => Promise<void>;
  setActiveChannel: (channelId: string | null) => void;
  fetchPosts: (channelId: string) => Promise<void>;
  toggleReaction: (channelId: string, postId: string, reaction: ReactionType) => Promise<void>;
}

export const useChannelStore = create<ChannelState>((set, get) => ({
  channels: [],
  posts: {},
  activeChannelId: null,
  isLoadingChannels: false,
  isLoadingPosts: false,
  isReacting: {},
  error: null,

  fetchChannels: async () => {
    set({ isLoadingChannels: true, error: null });
    const res = await channelService.getChannels();
    if (res.success && res.data) {
      set({ channels: res.data, isLoadingChannels: false });
    } else {
      set({ error: res.error?.message || "Failed to load channels", isLoadingChannels: false });
    }
  },

  setActiveChannel: (channelId) => {
    set({ activeChannelId: channelId, error: null });
    if (channelId) {
      get().fetchPosts(channelId);
    }
  },

  fetchPosts: async (channelId) => {
    set({ isLoadingPosts: true, error: null });
    const res = await channelService.getPosts(channelId);
    if (res.success && res.data) {
      set((state) => ({
        posts: { ...state.posts, [channelId]: res.data! },
        isLoadingPosts: false
      }));
    } else {
      set({ error: res.error?.message || "Failed to load posts", isLoadingPosts: false });
    }
  },

  toggleReaction: async (channelId, postId, reaction) => {
    const state = get();
    if (state.isReacting[postId]) return; // block rapid clicks

    const currentChannelPosts = state.posts[channelId] || [];
    const postIndex = currentChannelPosts.findIndex(p => p.id === postId);
    if (postIndex === -1) return;

    const originalPost = currentChannelPosts[postIndex];
    // Create optimistic post
    const optimisticPost = JSON.parse(JSON.stringify(originalPost)) as ChannelPost;
    
    // Toggle logic for optimistic UI
    if (optimisticPost.reactions.userReaction === reaction) {
      optimisticPost.reactions[reaction] = Math.max(0, optimisticPost.reactions[reaction] - 1);
      optimisticPost.reactions.userReaction = null;
    } else {
      if (optimisticPost.reactions.userReaction) {
        optimisticPost.reactions[optimisticPost.reactions.userReaction] = Math.max(0, optimisticPost.reactions[optimisticPost.reactions.userReaction] - 1);
      }
      optimisticPost.reactions[reaction] += 1;
      optimisticPost.reactions.userReaction = reaction;
    }

    // Apply optimistic UI and set reacting state
    set((s) => {
      const newPosts = [...(s.posts[channelId] || [])];
      newPosts[postIndex] = optimisticPost;
      return {
        posts: { ...s.posts, [channelId]: newPosts },
        isReacting: { ...s.isReacting, [postId]: true },
        error: null
      };
    });

    const res = await channelService.reactToPost(postId, { reaction });

    if (res.success) {
      // Keep optimistic update, just clear reacting state
      set((s) => ({
        isReacting: { ...s.isReacting, [postId]: false }
      }));
    } else {
      // Rollback
      set((s) => {
        const revertedPosts = [...(s.posts[channelId] || [])];
        const revertIndex = revertedPosts.findIndex(p => p.id === postId);
        if (revertIndex !== -1) {
          revertedPosts[revertIndex] = originalPost;
        }
        return {
          posts: { ...s.posts, [channelId]: revertedPosts },
          isReacting: { ...s.isReacting, [postId]: false },
          error: res.error?.message || "Failed to record reaction"
        };
      });
    }
  }
}));
