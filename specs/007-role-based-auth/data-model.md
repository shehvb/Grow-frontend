# Data Model: Role-Based Authentication (Extended)

## 1. User Entity
```typescript
interface User {
  id: number;
  username: string;
  email: string;
  first_name?: string;
  last_name?: string;
  role: 'student' | 'teacher' | 'parent' | 'school_admin';
  phone?: string;
  avatar?: string;
}
```

## 2. Auth Tokens & Zustand Store
```typescript
interface AuthTokens {
  access: string;
  refresh: string;
}

interface AuthState {
  user: User | null;
  tokens: AuthTokens | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  
  // Core Session
  login: (credentials: LoginRequest) => Promise<void>;
  register: (data: RegisterRequest) => Promise<void>;
  logout: () => Promise<void>;
  refreshSession: () => Promise<void>;
  setTokens: (tokens: AuthTokens) => void;
  clearAuth: () => void;
  
  // Extended Profile
  updateUserProfile: (data: ProfileUpdateRequest) => Promise<void>;
}
```

## 3. Extended API Request/Response Types
```typescript
interface ForgotPasswordRequest { email: string; }
interface ResetPasswordRequest { token: string; new_password: string; }
interface ChangePasswordRequest { old_password: string; new_password: string; }

interface ProfileUpdateRequest {
  first_name?: string;
  last_name?: string;
  phone?: string;
  avatar?: string;
}

interface ParentProfileRequest { child_id: number; }

interface School {
  id: number;
  name: string;
  slug: string;
}
interface SchoolCreateRequest { name: string; }
```
