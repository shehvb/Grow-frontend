import { create } from 'zustand';
import type { User, AuthTokens } from '../types/auth';
import { authApi } from '../services/authApi';

interface AuthState {
  user: User | null;
  tokens: AuthTokens | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;

  login: (credentials: any) => Promise<void>;
  register: (userData: any) => Promise<void>;
  logout: () => Promise<void>;
  updateUserProfile: (profileData: any) => Promise<void>;
  clearAuth: () => void;
  initialize: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  tokens: null,
  isAuthenticated: false,
  isLoading: true, // Start true until initialized
  error: null,

  initialize: async () => {
    try {
      set({ isLoading: true });
      const tokensStr = localStorage.getItem('auth_tokens');
      
      if (tokensStr) {
        const tokens: AuthTokens = JSON.parse(tokensStr);
        set({ tokens, isAuthenticated: true });
        
        // Fetch user profile to ensure token is valid and get latest data
        const user = await authApi.getProfile();
        set({ user });
      } else {
        set({ isAuthenticated: false, user: null, tokens: null });
      }
    } catch (error) {
      console.error('Failed to initialize auth', error);
      // Let the interceptor handle the refresh, or fail gracefully
      set({ isAuthenticated: false, user: null, tokens: null });
      localStorage.removeItem('auth_tokens');
    } finally {
      set({ isLoading: false });
    }
  },

  login: async (credentials) => {
    set({ isLoading: true, error: null });
    try {
      const response = await authApi.login(credentials);
      
      const tokens: AuthTokens = {
        access: response.access,
        refresh: response.refresh,
      };
      
      localStorage.setItem('auth_tokens', JSON.stringify(tokens));
      
      set({
        user: response.user,
        tokens,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      });
    } catch (error: any) {
      set({
        isLoading: false,
        error: error.response?.data?.detail || 'Login failed. Please check your credentials.',
        isAuthenticated: false,
      });
      throw error;
    }
  },

  register: async (userData) => {
    set({ isLoading: true, error: null });
    try {
      await authApi.register(userData);
      set({ isLoading: false, error: null });
      // Login must usually be called after register if the endpoint doesn't return tokens,
      // but if the user registers successfully, we can just throw them to login or auto-login depending on flow.
    } catch (error: any) {
      set({
        isLoading: false,
        error: error.response?.data?.detail || 'Registration failed.',
      });
      throw error;
    }
  },

  logout: async () => {
    set({ isLoading: true });
    try {
      const { tokens } = get();
      if (tokens?.refresh) {
        // Invalidate token on the backend
        await authApi.logout(tokens.refresh);
      }
    } catch (error) {
      console.error('Error during backend logout', error);
    } finally {
      // Always clear local state even if backend request fails
      get().clearAuth();
      set({ isLoading: false });
    }
  },

  updateUserProfile: async (profileData) => {
    set({ isLoading: true, error: null });
    try {
      const updatedUser = await authApi.updateProfile(profileData);
      set({ user: updatedUser, isLoading: false, error: null });
    } catch (error: any) {
      set({
        isLoading: false,
        error: error.response?.data?.detail || 'Failed to update profile.',
      });
      throw error;
    }
  },

  clearAuth: () => {
    localStorage.removeItem('auth_tokens');
    set({
      user: null,
      tokens: null,
      isAuthenticated: false,
      error: null,
    });
  },
}));

// Listen for global refresh failures emitted by the interceptor
window.addEventListener('auth_refresh_failed', () => {
  useAuthStore.getState().clearAuth();
});
