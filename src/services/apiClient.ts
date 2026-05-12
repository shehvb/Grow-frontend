import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL || 'https://edugrow.pythonanywhere.com/api/v1';

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

    // If 401 and not already retrying
    if (error.response?.status === 401 && !originalRequest._retry) {
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
          // Optional: trigger a custom event or Zustand action to update state
          window.dispatchEvent(new Event('auth_refresh_failed'));
        }
      }
    }

    return Promise.reject(error);
  }
);

export default apiClient;
