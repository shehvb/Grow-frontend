# Auth Integration Audit Report

**Feature**: Auth API Integration (`011-auth-api-integration`)
**Generated**: 2026-05-12
**Auditor**: speckit-implement
**API Spec**: `Grow Educational Platform API copy.yaml`

---

## Summary

| Status | Count |
|--------|-------|
| ✅ Connected | 7 |
| ⚠️ Partial (SDK Required) | 1 |
| ❌ Missing / Not in API Spec | 2 |

---

## Endpoint Audit Table

| Endpoint | Method | Status | Frontend Component / Service |
|----------|--------|--------|------------------------------|
| `/api/v1/auth/login/` | POST | ✅ Connected | `authApi.login()` → `authStore.login()` → `LoginStudent.tsx`, `LoginTeacher.tsx`, `LoginParent.tsx` |
| `/api/v1/auth/logout/` | POST | ✅ Connected | `authApi.logout()` → `authStore.logout()` → Sidebar logout buttons |
| `/api/v1/auth/token/refresh/` | POST | ✅ Connected | `apiClient.ts` response interceptor (auto-refresh on 401) |
| `/api/v1/auth/register/` | POST | ✅ Connected | `authApi.register()` → `authStore.register()` → `Signup.tsx` |
| `/api/v1/auth/me/` | GET | ✅ Connected | `authApi.getProfile()` → `authStore.initialize()` + `ProtectedRoute.tsx` |
| `/api/v1/auth/profile/` | PUT | ✅ Connected | `authApi.updateProfile()` → `authStore.updateUserProfile()` → Settings pages |
| `/api/v1/auth/oauth/` | POST | ⚠️ Partial | `authApi.oauthLogin()` implemented; `LoginParent.tsx` buttons wired. **Requires Google/Facebook SDK** (`@react-oauth/google` or `react-facebook-login`) to provide the `access_token`. Backend endpoint is ready. |
| `/api/v1/auth/forgot-password/` | POST | ✅ Connected | `authApi.forgotPassword()` → `ForgotPassword.tsx` (Step 1) |
| `/api/v1/auth/reset-password/` | POST | ✅ Connected | `authApi.resetPassword()` → `ForgotPassword.tsx` (Step 3) |
| `/api/v1/auth/change-password/` | POST | ✅ Available | `authApi.changePassword()` defined; UI hook available via `authStore`. Can be called from Settings page. |

---

## Session & State Management

| Feature | Status | Implementation |
|---------|--------|----------------|
| Token storage | ✅ Secure | `localStorage` key `auth_tokens`, never logged to console |
| Token attachment | ✅ Active | `apiClient.ts` request interceptor injects `Bearer <access>` |
| Auto-refresh on 401 | ✅ Active | `apiClient.ts` response interceptor, with async retry queue |
| Refresh failure handling | ✅ Active | Dispatches `auth_refresh_failed` event → `authStore.clearAuth()` clears storage + state |
| Session persistence | ✅ Active | `authStore.initialize()` reads tokens from localStorage on app start; called in `ProtectedRoute.tsx` |
| Role-based redirection | ✅ Active | `ProtectedRoute.tsx` reads `user.role` and redirects to `/student/dashboard`, `/teacher/dashboard`, `/parent/dashboard` |

---

## Role-Based Access Control

| Role | Login Portal | Protected Route | Dashboard |
|------|-------------|-----------------|-----------|
| `student` | `/login/student` → `LoginStudent.tsx` | `allowedRoles={['student']}` | `/student/dashboard` |
| `teacher` | `/login/teacher` → `LoginTeacher.tsx` | `allowedRoles={['teacher']}` | `/teacher/dashboard` |
| `parent` | `/login/parent` → `LoginParent.tsx` | `allowedRoles={['parent']}` | `/parent/dashboard` |

---

## Error Handling Strategy

| Error Type | Strategy | Implementation |
|------------|----------|----------------|
| Form validation errors (wrong password, email) | Inline error in form | `setError(msg)` in Login/ForgotPassword components |
| Session expired / refresh failed | Toast notification | `window.dispatchEvent('auth_refresh_failed')` → `authStore.clearAuth()` |
| Network failures | Toast notification | `react-hot-toast` global `Toaster` in `main.tsx` |
| Role mismatch | Inline error + auto-logout | `if (user.role !== expectedRole)` check + `authStore.logout()` |

---

## Gaps & Recommendations

### 1. OAuth SDK Integration (Priority: Medium)
- **Gap**: Google/Facebook OAuth buttons in `LoginParent.tsx` are wired to `authApi.oauthLogin()` but need a social provider SDK to get the initial `access_token`.
- **Action**: Install `@react-oauth/google` and call `useGoogleLogin()` inside `handleOAuthLogin`. The backend endpoint `/api/v1/auth/oauth/` is ready.

### 2. Verify Code Endpoint (Priority: Low)
- **Gap**: The `ForgotPassword.tsx` "Verify Code" step (Step 2) is simulated — the API spec does not expose a standalone verify-code endpoint.
- **Action**: If the backend implements a code-based verify endpoint in the future, update `handleVerify` to call it.

### 3. `school_admin` Role (Out of Scope)
- **Decision**: Per clarification session 2026-05-12, the `school_admin` role was excluded from this integration. The `AdminLayout` route in `App.tsx` has no `ProtectedRoute` wrapper with role enforcement.
- **Recommendation**: Add `<ProtectedRoute allowedRoles={['school_admin']}>` to the `/admin` route when this role is ready.

---

## Files Modified / Created

| File | Change |
|------|--------|
| `src/services/authApi.ts` | Fixed `getProfile` endpoint (`/auth/me/`); added `oauthLogin()` |
| `src/services/apiClient.ts` | ✅ No change needed (already complete) |
| `src/store/authStore.ts` | ✅ No change needed (already complete) |
| `src/types/auth.ts` | ✅ No change needed (already complete) |
| `src/hooks/useAuth.ts` | **NEW** — convenience hook wrapping authStore |
| `src/main.tsx` | Added global `<Toaster />` from react-hot-toast |
| `src/components/auth/ForgotPassword.tsx` | Connected to `authApi.forgotPassword()` and `authApi.resetPassword()`; removed all `setTimeout` simulations |
| `src/components/auth/LoginParent.tsx` | Added `handleOAuthLogin()`; wired Google/Facebook buttons with loading state |
| `src/components/auth/ProtectedRoute.tsx` | ✅ No change needed (already complete) |
| `src/App.tsx` | ✅ No change needed (role-based routes already complete) |
