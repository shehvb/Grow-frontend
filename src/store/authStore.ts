import { create } from 'zustand';
import axios from 'axios';
import type { User, AuthTokens } from '../types/auth';
import { authApi } from '../services/authApi';
import { getRefreshConfig, getLoginRouteForRole } from '../utils/authUtils';
import { isTokenExpired, scheduleProactiveRefresh } from '../utils/tokenUtils';

const BASE_URL = import.meta.env.VITE_API_URL || 'https://ahmeddali.pythonanywhere.com/api/v1';

// T013: Proactive refresh timer handle stored outside the store to persist across re-renders
let proactiveRefreshTimer: ReturnType<typeof setTimeout> | null = null;

// T018: Flags to prevent duplicate listener registration if initialize() is called multiple times
let visibilityChangeAttached = false;
// T028: Cross-tab sync listener flag
let storageListenerAttached = false;

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

// T014: silentRefresh — refreshes the access token without going through apiClient
// Uses raw axios to avoid triggering the 401 interceptor in a loop.
const silentRefresh = async () => {
  const tokensStr = localStorage.getItem('auth_tokens');
  if (!tokensStr) return;

  try {
    const session: AuthTokens = JSON.parse(tokensStr);
    if (!session.refresh) return;

    const { endpoint, body } = getRefreshConfig(session);
    const response = await axios.post(`${BASE_URL}/${endpoint}`, body);
    const newAccess: string = response.data.access;

    const updatedTokens: AuthTokens = { ...session, access: newAccess };
    localStorage.setItem('auth_tokens', JSON.stringify(updatedTokens));
    useAuthStore.setState({ tokens: updatedTokens });

    // T015/T016: Reschedule the next proactive refresh cycle
    if (proactiveRefreshTimer) clearTimeout(proactiveRefreshTimer);
    proactiveRefreshTimer = scheduleProactiveRefresh(newAccess, silentRefresh);
  } catch {
    // Silent refresh failed — clear session and redirect
    localStorage.removeItem('auth_tokens');
    useAuthStore.getState().clearAuth();
    const tokensStr2 = localStorage.getItem('auth_tokens');
    let role: string | undefined;
    try { role = tokensStr2 ? JSON.parse(tokensStr2)?.role : undefined; } catch { /* */ }
    window.location.replace(getLoginRouteForRole(role));
  }
};

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

        // T015: Schedule proactive refresh after restoring session
        if (proactiveRefreshTimer) clearTimeout(proactiveRefreshTimer);
        proactiveRefreshTimer = scheduleProactiveRefresh(tokens.access, silentRefresh);
      } else {
        set({ isAuthenticated: false, user: null, tokens: null });
      }
    } catch (error) {
      console.error('Failed to initialize auth', error);
      set({ isAuthenticated: false, user: null, tokens: null });
      localStorage.removeItem('auth_tokens');
    } finally {
      set({ isLoading: false });
    }

    // T019: Tab visibility check — silently re-initialize when the user returns to the tab
    if (!visibilityChangeAttached) {
      visibilityChangeAttached = true;
      document.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'visible') {
          const tokensStr = localStorage.getItem('auth_tokens');
          if (!tokensStr) return;
          try {
            const session: AuthTokens = JSON.parse(tokensStr);
            if (isTokenExpired(session.access)) {
              silentRefresh();
            }
          } catch { /* ignore malformed tokens */ }
        }
      });
    }

    // T029: Cross-tab sync — propagate logout and token refresh across tabs
    if (!storageListenerAttached) {
      storageListenerAttached = true;
      window.addEventListener('storage', (event) => {
        if (event.key !== 'auth_tokens') return;

        if (!event.newValue) {
          // Tokens removed in another tab (logout or refresh failure) → log out this tab
          const currentTokens = get().tokens;
          const role = currentTokens?.role;
          useAuthStore.getState().clearAuth();
          window.location.replace(getLoginRouteForRole(role));
        } else if (event.oldValue !== event.newValue) {
          // Tokens refreshed in another tab → adopt the new token here
          try {
            const newTokens: AuthTokens = JSON.parse(event.newValue);
            useAuthStore.setState({ tokens: newTokens });
          } catch { /* ignore */ }
        }
      });
    }
  },

  login: async (credentials) => {
    set({ isLoading: true, error: null });
    try {
      const loginFlow: 'standard' | 'otp' = credentials.otp ? 'otp' : 'standard';
      let userObj: User;
      let tokens: AuthTokens;

      if (credentials.role === 'school_admin') {
        // Dedicated school admin login flow
        const response = await authApi.schoolAdminLogin({
          username: credentials.username || credentials.email, // Allow either
          password: credentials.password
        });

        userObj = {
          id: response.user_id,
          username: response.username,
          email: '', // Not returned by schools/login/ but required by type User
          role: 'school_admin',
        };

        tokens = {
          access: response.access,
          refresh: response.refresh,
          role: 'school_admin',
          loginFlow: 'standard',
        };
      } else if (credentials.role === 'teacher') {
        const response = await authApi.teacherLogin({
          school_id: credentials.school_id,
          email: credentials.email,
          password: credentials.password
        });
        userObj = {
          id: response.user_id,
          role: response.role || 'teacher',
          email: credentials.email,
          username: credentials.email,
        } as User;
        tokens = {
          access: response.access,
          refresh: response.refresh,
          role: response.role || 'teacher',
          loginFlow,
        };
      } else {
        const response = await authApi.login(credentials);
        userObj = response.user;
        tokens = {
          access: response.access,
          refresh: response.refresh,
          role: response.user?.role,
          loginFlow,
        };
      }

      localStorage.setItem('auth_tokens', JSON.stringify(tokens));

      // T016: Schedule proactive refresh after login
      if (proactiveRefreshTimer) clearTimeout(proactiveRefreshTimer);
      proactiveRefreshTimer = scheduleProactiveRefresh(tokens.access, silentRefresh);

      set({
        user: userObj,
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
      if (userData.role === 'teacher') {
        const response = await authApi.teacherSignup(userData) as any;
        // The backend teacherSignup actually returns tokens in the response.
        // We can consume them immediately to bypass calling login() again.
        if (response.access && response.refresh) {
          const tokens = { access: response.access, refresh: response.refresh };
          localStorage.setItem('auth_tokens', JSON.stringify(tokens));

          if (proactiveRefreshTimer) clearTimeout(proactiveRefreshTimer);
          proactiveRefreshTimer = scheduleProactiveRefresh(tokens.access, silentRefresh);

          set({
            user: {
              id: response.user_id,
              role: response.role || 'teacher',
              email: userData.email,
              first_name: userData.full_name,
              last_name: '',
              username: userData.email,
            },
            tokens,
            isAuthenticated: true,
            isLoading: false,
            error: null,
          });
          return; // Skip the rest, user is fully logged in
        }
      } else {
        await authApi.register(userData);
      }
      set({ isLoading: false, error: null });
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
        await authApi.logout(tokens.refresh);
      }
    } catch (error) {
      console.error('Error during backend logout', error);
    } finally {
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

  // T017: clearAuth cancels the proactive refresh timer before clearing state
  clearAuth: () => {
    if (proactiveRefreshTimer) {
      clearTimeout(proactiveRefreshTimer);
      proactiveRefreshTimer = null;
    }
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
