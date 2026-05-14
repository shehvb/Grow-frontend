// src/utils/tokenUtils.ts
// Pure utility functions for JWT token introspection and proactive refresh scheduling.

/**
 * Decodes the JWT payload and returns the token expiry as epoch milliseconds.
 * Returns null if the token is malformed or cannot be decoded.
 */
export const getTokenExpiryMs = (token: string): number | null => {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    if (typeof payload.exp === 'number') {
      return payload.exp * 1000; // convert seconds → ms
    }
    return null;
  } catch {
    return null;
  }
};

/**
 * Returns true if the given JWT access token has already expired.
 */
export const isTokenExpired = (token: string): boolean => {
  const expiryMs = getTokenExpiryMs(token);
  if (expiryMs === null) return true; // treat malformed tokens as expired
  return expiryMs < Date.now();
};

/**
 * Schedules a proactive token refresh 5 minutes before the access token expires.
 * Only schedules if the delay is positive and the browser tab is currently visible.
 * Returns the setTimeout handle so the caller can cancel it on logout.
 */
export const scheduleProactiveRefresh = (
  accessToken: string,
  onRefresh: () => Promise<void>
): ReturnType<typeof setTimeout> | null => {
  const expiryMs = getTokenExpiryMs(accessToken);
  if (!expiryMs) return null;

  const REFRESH_BEFORE_MS = 5 * 60 * 1000; // 5 minutes
  const delay = expiryMs - Date.now() - REFRESH_BEFORE_MS;

  if (delay <= 0) {
    // Token expires in less than 5 min or already expired — refresh immediately
    onRefresh().catch(() => {
      // silentRefresh handles its own error/logout logic
    });
    return null;
  }

  const handle = setTimeout(() => {
    // Only refresh when tab is visible to avoid unnecessary background requests
    if (document.visibilityState === 'visible') {
      onRefresh().catch(() => {});
    }
  }, delay);

  return handle;
};
