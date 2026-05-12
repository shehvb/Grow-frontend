import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL || 'https://ahmeddali.pythonanywhere.com/api/v1';

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor: Attach access token
apiClient.interceptors.request.use(
  (config) => {
    const tokensStr = localStorage.getItem('auth_tokens');
    if (tokensStr) {
      try {
        const tokens = JSON.parse(tokensStr);
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

// Response Interceptor: Handle 401 and Refresh Token
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Normalize non-JSON error bodies (e.g. Django 500 HTML page)
    // so downstream catch blocks always see a consistent shape.
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

    // If 401 and not already retrying, and not on the login endpoint itself
    const isLoginEndpoint = originalRequest?.url?.includes('/auth/login/');
    if (error.response?.status === 401 && !originalRequest._retry && !isLoginEndpoint) {
      originalRequest._retry = true;

      const tokensStr = localStorage.getItem('auth_tokens');
      if (tokensStr) {
        try {
          const tokens = JSON.parse(tokensStr);
          if (tokens.refresh) {
            // Attempt to refresh
            const refreshResponse = await axios.post(`${BASE_URL}/auth/token/refresh/`, {
              refresh: tokens.refresh,
            });

            if (refreshResponse.status === 200) {
              const newAccess = refreshResponse.data.access;
              // Update local storage
              const updatedTokens = { ...tokens, access: newAccess };
              localStorage.setItem('auth_tokens', JSON.stringify(updatedTokens));

              // Update the failed request and retry
              originalRequest.headers.Authorization = `Bearer ${newAccess}`;
              return apiClient(originalRequest);
            }
          }
        } catch (e) {
          console.error('Token refresh failed', e);
          // If refresh fails, clear tokens so user is forced to log in
          localStorage.removeItem('auth_tokens');
          // Trigger Zustand store cleanup via custom event
          window.dispatchEvent(new Event('auth_refresh_failed'));
        }
      }
    }

    return Promise.reject(error);
  }
);

export default apiClient;
