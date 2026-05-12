# Quickstart: Role-Based Authentication

## Getting Started

The authentication module exposes a global `useAuthStore` hook that provides access to the current session, tokens, and role.

### 1. Check Authentication Status
Wrap your protected components with the `<ProtectedRoute>` wrapper.

```tsx
import ProtectedRoute from '@/components/auth/ProtectedRoute';

function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route 
        path="/teacher/dashboard" 
        element={
          <ProtectedRoute allowedRoles={['teacher']}>
            <TeacherDashboard />
          </ProtectedRoute>
        } 
      />
    </Routes>
  );
}
```

### 2. Access the Current User
Use the Zustand hook anywhere in your components.

```tsx
import { useAuthStore } from '@/store/authStore';

const Navbar = () => {
  const { user, logout } = useAuthStore();
  
  if (!user) return null;
  
  return (
    <nav>
      <span>Welcome, {user.first_name} ({user.role})</span>
      <button onClick={logout}>Sign Out</button>
    </nav>
  );
};
```

### 3. API Requests
You do not need to manually attach the token to every request. Use the pre-configured `apiClient`.

```tsx
import apiClient from '@/services/apiClient';

const fetchCourses = async () => {
  // Token is automatically attached via interceptors
  // 401s are automatically caught and refreshed
  const response = await apiClient.get('/api/v1/courses/');
  return response.data;
};
```
