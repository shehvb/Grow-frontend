import axios from 'axios';
import { getRefreshConfig, getLoginRouteForRole } from '../utils/authUtils';
import type { AuthTokens } from '../types/auth';

const BASE_URL = import.meta.env.VITE_API_URL || 'https://ahmeddali.pythonanywhere.com/api/v1';

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// ─── Concurrent Refresh Lock (T009) ─────────────────────────────────────────
// Prevents multiple simultaneous 401 responses from triggering multiple refresh
// requests. Additional 401s queue here and resolve once the single refresh completes.
let isRefreshing = false;
let refreshQueue: Array<(token: string) => void> = [];
let refreshRejectQueue: Array<(err: unknown) => void> = [];

const processQueue = (newToken: string) => {
  refreshQueue.forEach(resolve => resolve(newToken));
  refreshQueue = [];
  refreshRejectQueue = [];
};

const rejectQueue = (err: unknown) => {
  refreshRejectQueue.forEach(reject => reject(err));
  refreshQueue = [];
  refreshRejectQueue = [];
};
// ─────────────────────────────────────────────────────────────────────────────

// Request Interceptor: Attach access token
apiClient.interceptors.request.use(
  (config) => {
    const tokensStr = localStorage.getItem('auth_tokens');
    if (tokensStr) {
      try {
        const tokens: AuthTokens = JSON.parse(tokensStr);
        if (tokens.access) {
          config.headers.Authorization = `Bearer ${tokens.access}`;
        }
      } catch (e) {
        console.error('Error parsing auth tokens from local storage', e);
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor: Handle errors + Role-Specific Token Refresh (T010–T012)
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Normalize non-JSON error bodies (e.g. Django 500 HTML page)
    if (error.response && error.response.status >= 500) {
      if (typeof error.response.data === 'string' && error.response.data.includes('<!DOCTYPE')) {
        error.response.data = { detail: `Server error (${error.response.status}). Our team has been notified. Please try again later.` };
      } else if (!error.response.data || typeof error.response.data !== 'object') {
        error.response.data = { detail: 'A server error occurred. Please try again later.' };
      }
    }

    // Handle 429 Too Many Requests
    if (error.response?.status === 429) {
      error.response.data = { detail: 'Too many requests. Please wait a moment before trying again.' };
    }

    const isLoginEndpoint = originalRequest?.url?.includes('auth/login/') ||
      originalRequest?.url?.includes('auth/refresh/') ||
      originalRequest?.url?.includes('token/refresh/');

    if (error.response?.status === 401 && !originalRequest._retry && !isLoginEndpoint) {
      originalRequest._retry = true;

      // If a refresh is already in progress, queue this request (T009 — race condition fix)
      if (isRefreshing) {
        return new Promise<string>((resolve, reject) => {
          refreshQueue.push(resolve);
          refreshRejectQueue.push(reject);
        }).then((newToken) => {
          originalRequest.headers.Authorization = `Bearer ${newToken}`;
          return apiClient(originalRequest);
        });
      }

      // Start the single refresh (T010 — role-specific endpoint)
      isRefreshing = true;
      const tokensStr = localStorage.getItem('auth_tokens');

      if (tokensStr) {
        try {
          const session: AuthTokens = JSON.parse(tokensStr);

          if (session.refresh) {
            // Use the role-aware refresh config (getRefreshConfig from authUtils.ts)
            const { endpoint, body } = getRefreshConfig(session);

            const refreshResponse = await axios.post(`${BASE_URL}/${endpoint}`, body);

            if (refreshResponse.status === 200) {
              const newAccess: string = refreshResponse.data.access;
              const updatedTokens: AuthTokens = { ...session, access: newAccess };
              localStorage.setItem('auth_tokens', JSON.stringify(updatedTokens));

              // Update the failed request header and notify the queue (T009)
              originalRequest.headers.Authorization = `Bearer ${newAccess}`;
              isRefreshing = false;
              processQueue(newAccess);
              return apiClient(originalRequest);
            }
          }
        } catch (refreshError) {
          // T012 — refresh failure: reject queue, clear session, redirect to correct login
          isRefreshing = false;
          rejectQueue(refreshError);

          let role: string | undefined;
          try {
            const session: AuthTokens = JSON.parse(tokensStr ?? '{}');
            role = session.role;
          } catch { /* ignore */ }

          localStorage.removeItem('auth_tokens');
          window.dispatchEvent(new Event('auth_refresh_failed'));
          window.location.replace(getLoginRouteForRole(role));
        }
      }

      isRefreshing = false;
    }

    return Promise.reject(error);
  }
);

export default apiClient;
