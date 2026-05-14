import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useAuthStore } from '../store/authStore';
import { getLoginRouteForRole } from '../utils/authUtils';

// T021: Idle timeout thresholds — easy to adjust in one place
const IDLE_WARN_MS = 30 * 60 * 1000;   // 30 minutes → show warning
const IDLE_LOGOUT_MS = 35 * 60 * 1000; // 35 minutes → force logout

// Throttle helper — limits how often resetTimers fires on high-frequency events (e.g. mousemove)
const throttle = (fn: () => void, limitMs: number) => {
  let lastCall = 0;
  return () => {
    const now = Date.now();
    if (now - lastCall >= limitMs) {
      lastCall = now;
      fn();
    }
  };
};

/**
 * useIdleTimeout
 *
 * Detects user inactivity. After IDLE_WARN_MS (30 min), shows a toast warning.
 * After IDLE_LOGOUT_MS (35 min) with no interaction, logs the user out and
 * redirects to their role's login page.
 *
 * Call once inside each authenticated layout (TeacherLayout, StudentLayout, ParentLayout).
 */
const useIdleTimeout = () => {
  const navigate = useNavigate();
  const logout = useAuthStore((s) => s.logout);
  const user = useAuthStore((s) => s.user);
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  // T020: Timer handles and toast ID stored in refs to survive re-renders
  const warnTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const logoutTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const toastIdRef = useRef<string | undefined>(undefined);

  useEffect(() => {
    if (!isAuthenticated) return;

    // T023: Force logout after idle logout threshold
    const forceLogout = () => {
      if (warnTimerRef.current) clearTimeout(warnTimerRef.current);
      if (logoutTimerRef.current) clearTimeout(logoutTimerRef.current);
      toast.dismiss(toastIdRef.current);

      logout().then(() => {
        toast.error('You were logged out due to inactivity.', { duration: 6000 });
        navigate(getLoginRouteForRole(user?.role));
      });
    };

    // T022: Show idle warning toast
    const showWarning = () => {
      toastIdRef.current = toast(
        '⚠️ Your session will expire in 5 minutes due to inactivity. Move your mouse or press any key to stay logged in.',
        {
          duration: IDLE_LOGOUT_MS - IDLE_WARN_MS, // stays visible for the remaining 5 min
          icon: '⏰',
        }
      ) as string;
    };

    // T021: Reset both timers and dismiss any active warning on user activity
    const resetTimers = () => {
      if (warnTimerRef.current) clearTimeout(warnTimerRef.current);
      if (logoutTimerRef.current) clearTimeout(logoutTimerRef.current);
      toast.dismiss(toastIdRef.current);
      toastIdRef.current = undefined;

      warnTimerRef.current = setTimeout(showWarning, IDLE_WARN_MS);
      logoutTimerRef.current = setTimeout(forceLogout, IDLE_LOGOUT_MS);
    };

    // T024: Attach throttled event listeners for user activity detection
    const handleActivity = throttle(resetTimers, 1000);

    const events: (keyof WindowEventMap)[] = [
      'mousemove',
      'keydown',
      'click',
      'scroll',
      'touchstart',
    ];

    events.forEach((e) => window.addEventListener(e, handleActivity, { passive: true }));

    // Start the timers immediately on mount
    resetTimers();

    // Cleanup on unmount
    return () => {
      events.forEach((e) => window.removeEventListener(e, handleActivity));
      if (warnTimerRef.current) clearTimeout(warnTimerRef.current);
      if (logoutTimerRef.current) clearTimeout(logoutTimerRef.current);
      toast.dismiss(toastIdRef.current);
    };
  }, [isAuthenticated, logout, navigate, user?.role]);
};

export default useIdleTimeout;
