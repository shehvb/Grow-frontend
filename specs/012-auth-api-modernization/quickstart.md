# Quickstart: Auth API Modernization

## 🛠️ Developer Setup

1. **Environment Variables**: Ensure `VITE_API_URL` is set to `https://edugrow.pythonanywhere.com/api/v1`.
2. **Local Store**: Clear your local storage to avoid stale tokens: `localStorage.removeItem('auth_tokens')`.

## 🧪 Manual Verification Steps

### 1. Registration & Login
1. Navigate to `/login/student`.
2. Enter credentials and click "Sign In".
3. Verify that you are redirected to `/student/dashboard` and your name appears in the header.
4. Check the "Network" tab to ensure a Bearer token is attached to subsequent requests.

### 2. Parent Quick Signup
1. Navigate to `/signup/parent`.
2. Complete the form.
3. Verify that you are **automatically logged in** and redirected to the parent onboarding page (`is_first_login` path).

### 3. School Admin Onboarding
1. Register a new account as a `School Admin`.
2. Log in and navigate to `/admin/school/setup`.
3. Create a school.
4. Generate a batch of enrollment codes.
5. Copy a code and try using it on a new Student account to verify the membership link.

## ⚠️ Important Notes
- **Access Tokens** expire in 60 minutes.
- **Refresh Tokens** persist for 7 days.
- **Errors**: Check the browser console and Toast notifications for 400 (Validation) or 500 (Server) errors.
