import React, { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: ('student' | 'teacher' | 'parent' | 'school_admin')[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, allowedRoles }) => {
  const { isAuthenticated, isLoading, user, initialize } = useAuthStore();
  const location = useLocation();

  // On mount, if the store isn't populated but we have tokens in local storage, initialize it
  useEffect(() => {
    if (!isAuthenticated && !isLoading && localStorage.getItem('auth_tokens')) {
      initialize();
    }
  }, [isAuthenticated, isLoading, initialize]);

  // While checking the authentication state (e.g., waiting for profile fetch), show a loader
  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center gap-4">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-emerald-500 border-t-transparent" />
          <p className="text-gray-500 font-medium animate-pulse">Verifying session...</p>
        </div>
      </div>
    );
  }

  // If the user is definitely not authenticated, send them to login
  if (!isAuthenticated) {
    // We pass the current location so they can be redirected back after login if desired
    return <Navigate to="/login/student" state={{ from: location }} replace />;
  }

  // If the route requires specific roles, and the user's role is not included
  if (allowedRoles && allowedRoles.length > 0 && user) {
    if (!allowedRoles.includes(user.role)) {
      // Send them to an unauthorized or fallback page based on their role
      let fallbackRoute = '/';
      switch (user.role) {
        case 'student': fallbackRoute = '/student/dashboard'; break;
        case 'teacher': fallbackRoute = '/teacher/dashboard'; break;
        case 'parent': fallbackRoute = '/parent/dashboard'; break;
      }
      return <Navigate to={fallbackRoute} replace />;
    }
  }

  // If authenticated and role matches (or no specific roles required), render the route
  return <>{children}</>;
};

export default ProtectedRoute;
