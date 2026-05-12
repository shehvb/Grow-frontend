import { useAuthStore } from '../store/authStore';

/**
 * useAuth — a simplified hook for accessing the auth store.
 *
 * Usage:
 *   const { user, isAuthenticated, isLoading, login, logout } = useAuth();
 */
export const useAuth = () => {
  const user = useAuthStore((state) => state.user);
  const tokens = useAuthStore((state) => state.tokens);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const isLoading = useAuthStore((state) => state.isLoading);
  const error = useAuthStore((state) => state.error);
  const login = useAuthStore((state) => state.login);
  const register = useAuthStore((state) => state.register);
  const logout = useAuthStore((state) => state.logout);
  const updateUserProfile = useAuthStore((state) => state.updateUserProfile);
  const clearAuth = useAuthStore((state) => state.clearAuth);
  const initialize = useAuthStore((state) => state.initialize);

  return {
    user,
    tokens,
    isAuthenticated,
    isLoading,
    error,
    login,
    register,
    logout,
    updateUserProfile,
    clearAuth,
    initialize,
  };
};

export default useAuth;
