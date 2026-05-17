import { create } from 'zustand';
import { notificationService } from '../services/notificationService';
import type { Notification } from '../features/notifications/types';

interface NotificationState {
  notifications: Notification[];
  isLoading: boolean;
  error: string | null;

  fetchNotifications: () => Promise<void>;
  markAsRead: (id: string) => Promise<void>;
  markAllAsRead: () => Promise<void>;
}

export const useNotificationStore = create<NotificationState>((set) => ({
  notifications: [],
  isLoading: false,
  error: null,

  fetchNotifications: async () => {
    set({ isLoading: true, error: null });
    try {
      const data = await notificationService.getNotifications();
      const notifsArray = Array.isArray(data) ? data : (data as any).results || [];
      set({ notifications: notifsArray, isLoading: false, error: null });
    } catch (error: any) {
      set({
        isLoading: false,
        error: error.response?.data?.detail || error.message || 'Failed to fetch notifications.'
      });
    }
  },

  markAsRead: async (id: string) => {
    try {
      await notificationService.markAsRead(id);
      set((state) => ({
        notifications: state.notifications.map((n) =>
          n.id === id ? { ...n, isUnread: false } : n
        )
      }));
    } catch (error: any) {
      console.error('Failed to mark notification as read', error);
    }
  },

  markAllAsRead: async () => {
    try {
      await notificationService.markAllAsRead();
      set((state) => ({
        notifications: state.notifications.map((n) => ({ ...n, isUnread: false }))
      }));
    } catch (error: any) {
      console.error('Failed to mark all notifications as read', error);
    }
  }
}));
