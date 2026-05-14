# Feature Specification: Session Management

**Feature Branch**: `015-session-management`  
**Created**: 2026-05-14  
**Status**: Draft  
**Input**: User description: "Implement robust session management for the Grow Educational Platform frontend covering role-specific JWT token refresh, concurrent refresh race condition prevention, inactivity idle timeout with warnings, proactive token refresh before expiry, tab visibility checks, and cross-tab synchronization for student, teacher, and parent roles."

---

## User Scenarios & Testing *(mandatory)*

### User Story 1 — Role-Specific Token Refresh (Priority: P1)

As a **teacher**, **student**, or **parent**, I want my session to be silently refreshed using the correct endpoint for my role so that my session never breaks due to a token expiry, regardless of which portal I am using.

The platform uses three different refresh endpoints:
- Student (standard login): `POST /api/v1/auth/token/refresh/` — body `{ refresh }`
- Student (OTP login): `POST /api/v1/auth/student/token/refresh/` — body `{ refresh_token }`
- Teacher: `POST /api/v1/teacher/auth/refresh/` — body `{ refresh }`
- Parent: uses the standard student endpoint

**Why this priority**: This is the most critical failure point. Teachers currently hit a broken refresh endpoint, which silently logs them out or causes API errors mid-session.

**Independent Test**: Log in as a teacher, wait for the access token to expire (or force a 401), and confirm the app silently continues without redirecting to login.

**Acceptance Scenarios**:

1. **Given** a teacher is authenticated and their access token expires, **When** any API request is made, **Then** the system automatically calls `POST /api/v1/teacher/auth/refresh/` and retries the original request with the new token — without any user-visible interruption.
2. **Given** a student authenticated via OTP is active and their token expires, **When** any API request is made, **Then** the system calls `POST /api/v1/auth/student/token/refresh/` with body `{ refresh_token }` and retries the request seamlessly.
3. **Given** a parent is authenticated and their token expires, **When** any API request is made, **Then** the system calls `POST /api/v1/auth/token/refresh/` and the session continues.
4. **Given** a refresh attempt fails (e.g., refresh token itself is expired), **When** the refresh endpoint returns an error, **Then** the user is logged out and redirected to the appropriate login page for their role.

---

### User Story 2 — Concurrent Refresh Race Condition Prevention (Priority: P1)

As a **user of any role**, I want the system to handle multiple simultaneous expired-token errors gracefully so that I am never unexpectedly logged out when navigating pages that make several API calls at once.

**Why this priority**: Without this, navigating to any dashboard that triggers 3+ simultaneous API calls can permanently invalidate the session as multiple refresh attempts rotate and blacklist the refresh token.

**Independent Test**: Load a page that triggers 5 simultaneous API calls while the access token is expired. Confirm only one refresh request is sent, and all 5 original requests succeed after the single refresh.

**Acceptance Scenarios**:

1. **Given** a user's access token has expired and the app makes 5 simultaneous API calls, **When** all 5 fail with an authentication error, **Then** only **one** token refresh request is sent to the backend; the other 4 calls are queued and retried with the new token.
2. **Given** a token refresh is already in progress, **When** a new API call is made and receives an auth error, **Then** that call waits for the in-progress refresh to complete before retrying — it does not trigger a second refresh.
3. **Given** the single refresh request fails, **When** the queue is notified, **Then** all queued requests are rejected, and the user is logged out once.

---

### User Story 3 — Inactivity Idle Timeout with Warning (Priority: P2)

As a **user of any role**, I want to be warned before I am automatically logged out due to inactivity so that I can choose to stay logged in or safely conclude my session.

**Why this priority**: An educational platform handles sensitive academic data. Unattended sessions on shared school computers pose a security risk.

**Independent Test**: Simulate 30 minutes of no mouse, keyboard, or scroll activity. Confirm a visible warning appears. Simulate a further 5 minutes of no activity. Confirm automatic logout occurs.

**Acceptance Scenarios**:

1. **Given** a user is authenticated and has not interacted with the platform for 30 minutes, **When** the idle threshold is reached, **Then** a clearly visible warning is displayed informing the user their session will expire in 5 minutes.
2. **Given** the idle warning is showing, **When** the user moves the mouse, clicks, types, or scrolls, **Then** the idle timer resets, the warning disappears, and no logout occurs.
3. **Given** the idle warning is showing and the user takes no action, **When** 5 additional minutes pass (35 minutes total), **Then** the user is automatically logged out and redirected to their role's login page with a friendly message explaining the reason.
4. **Given** a user is on a page with an active form (e.g., writing an assignment), **When** they are idle, **Then** the same idle rules apply — they receive the same warning and logout behavior.

---

### User Story 4 — Proactive Token Refresh Before Expiry (Priority: P2)

As a **user of any role**, I want the system to silently renew my access token before it expires so that I never experience a failed or delayed action caused by token expiry mid-task.

**Why this priority**: Reactive refresh (on 401 failure) causes a brief but noticeable delay and can occasionally result in a lost request. Proactive refresh eliminates this entirely.

**Independent Test**: Log in, decode the access token's expiry timestamp, and confirm a silent refresh call is made approximately 5 minutes before that timestamp — without any user action.

**Acceptance Scenarios**:

1. **Given** a user is authenticated and their access token will expire in 5 minutes, **When** the scheduled proactive refresh fires, **Then** a new access token is silently obtained and stored — with no user-visible action or interruption.
2. **Given** a new access token is obtained proactively, **When** the new token is stored, **Then** a new proactive refresh is scheduled for 5 minutes before the new token's expiry.
3. **Given** the proactive refresh fails (e.g., refresh token has expired), **When** the failure occurs, **Then** the user is notified and redirected to login — not silently left in a broken state.

---

### User Story 5 — Tab Visibility Session Check (Priority: P2)

As a **user of any role**, I want the app to verify my session is still valid when I return to a tab I left open so that I do not encounter confusing errors when I resume work.

**Why this priority**: Users frequently switch tabs in a school environment. Returning to a long-backgrounded tab without a validity check leads to a broken UI with unexplained API errors.

**Independent Test**: Log in, switch away from the tab for a duration longer than the access token's lifetime (60 min), return to the tab, and confirm the session is silently validated or refreshed before any user action triggers an API call.

**Acceptance Scenarios**:

1. **Given** a user has the app open in a browser tab that has been backgrounded for over 60 minutes, **When** the user switches back to that tab, **Then** the system checks whether the access token has expired and silently refreshes it if needed — before any user-triggered API call is made.
2. **Given** the tab becomes visible again and the refresh token is also expired, **When** the session check occurs, **Then** the user is shown a message that their session has expired and is redirected to the login page.
3. **Given** the tab becomes visible again and the token is still valid, **When** the session check occurs, **Then** no action is taken and the user continues normally.

---

### User Story 6 — Cross-Tab Session Synchronization (Priority: P3)

As a **user of any role** who has the platform open in multiple browser tabs, I want session state changes in one tab to be immediately reflected in all other tabs so that I do not encounter inconsistent UI states.

**Why this priority**: While less critical than correctness concerns, inconsistent multi-tab state (e.g., logged out in one tab but still "active" in another) leads to confusing behavior and potential security lapses.

**Independent Test**: Open the app in two tabs. Log out in Tab A. Confirm that Tab B also reflects the logged-out state within seconds without requiring a manual refresh.

**Acceptance Scenarios**:

1. **Given** a user is logged in across two tabs, **When** they log out in Tab A, **Then** Tab B automatically redirects to the login page without requiring any manual action.
2. **Given** a user's token is silently refreshed in Tab A (proactive or reactive), **When** the new token is stored, **Then** Tab B adopts the new token for its subsequent API calls without needing its own refresh.
3. **Given** a user's session is cleared due to an idle timeout in Tab A, **When** the timeout fires, **Then** all other open tabs also log out the user.

---

### Edge Cases

- What happens when the device clock is incorrect and the token expiry calculation is off?
- What happens when the user loses internet connection during a token refresh?
- What happens when a refresh token has been blacklisted server-side (e.g., admin force-logout)?
- How does the system behave when a user has the same account open in two different browsers (not just tabs)?
- What happens if the user's browser blocks `localStorage` (e.g., private/incognito mode with strict settings)?
- What happens during a proactive refresh if the browser tab is hidden (to avoid unnecessary network activity)?
- What happens if the user logs in as one role in Tab A and a different role in Tab B (same browser)?

---

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The system MUST call the correct token refresh endpoint based on the authenticated user's role and login flow (teacher, student standard, student OTP, parent).
- **FR-002**: The system MUST queue all API requests that fail with an authentication error while a token refresh is in progress, and retry them with the new token once the refresh completes.
- **FR-003**: The system MUST ensure that no more than one token refresh request is sent at any one time, regardless of how many simultaneous authentication failures occur.
- **FR-004**: The system MUST display a visible session-expiry warning to the user after 30 consecutive minutes of inactivity (no mouse movement, keyboard input, scroll, or touch events).
- **FR-005**: The system MUST automatically log out the user and redirect them to their role's login page if no user interaction occurs within 5 minutes of the idle warning being shown (35 minutes total idle time).
- **FR-006**: The system MUST reset the idle countdown whenever the user interacts with the platform (mouse move, click, keypress, scroll, or touch).
- **FR-007**: The system MUST proactively refresh the access token approximately 5 minutes before it is due to expire, without any user interaction required.
- **FR-008**: The system MUST schedule a new proactive refresh cycle after each successful token refresh.
- **FR-009**: The system MUST check session validity when a browser tab regains visibility after being backgrounded, and silently refresh the token if it has expired.
- **FR-010**: The system MUST propagate logout events across all open browser tabs in the same browser session within 2 seconds of the logout occurring.
- **FR-011**: The system MUST propagate token refresh events across all open browser tabs so all tabs use the most current access token.
- **FR-012**: The system MUST redirect the user to the correct login page for their role (not always the generic/student login) when a session expires or is terminated.
- **FR-013**: The system MUST display a user-friendly explanation when a user is automatically logged out (idle timeout, expired refresh token, or admin revocation).

### Key Entities

- **Session**: Represents a user's authenticated state. Key attributes: access token, refresh token, token expiry time, user role, login flow type (standard or OTP).
- **Idle Timer**: A client-side timer tracking time since last user interaction. Attributes: last-activity timestamp, warning threshold (30 min), logout threshold (35 min).
- **Refresh Lock**: A client-side mechanism ensuring only one token refresh is in-flight at any time. Attributes: in-progress flag, queue of pending requests.
- **User Role**: One of `student`, `teacher`, or `parent`. Determines which refresh endpoint and login page are used.

---

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Users of all roles never experience an unexpected logout caused by token expiry during normal, continuous use of the platform.
- **SC-002**: When multiple simultaneous requests encounter an expired token, exactly one refresh request reaches the backend — verified by network inspection.
- **SC-003**: Users receive a visible idle warning at or before the 30-minute inactivity mark, with no more than a 5-second margin of error.
- **SC-004**: Users are automatically logged out no later than 35 minutes after their last recorded interaction, with no more than a 10-second margin of error.
- **SC-005**: Tab B reflects a logout performed in Tab A within 2 seconds, without requiring a page refresh.
- **SC-006**: No user-visible delay or error occurs when a proactive token refresh fires — the user continues their task without interruption.
- **SC-007**: When a user returns to a backgrounded tab with an expired token, the session is silently restored (or gracefully terminated) before the first user-triggered API call.
- **SC-008**: Zero instances of a user being silently stuck in a broken state — every session failure results in a clear message and a redirect to login.

---

## Assumptions

- The backend correctly implements token rotation and blacklisting on the logout endpoints.
- The `role` field is stored alongside auth tokens in `localStorage` under a key accessible to the session manager (e.g., as part of the stored user object).
- The idle timeout thresholds (30 min warn, 35 min logout) are acceptable defaults; they may be configurable in a future version.
- Proactive refresh is only attempted when the browser tab is visible (to avoid unnecessary background network requests).
- Cross-tab synchronization is limited to the same browser on the same device (not across different browsers or devices).
- The platform does not support concurrent logins of different roles in the same browser (a user is either a teacher or a student in a given session).

## Dependencies

- Existing `src/services/apiClient.ts` (Axios instance with interceptors)
- Existing `src/store/authStore.ts` (Zustand auth store)
- Existing `src/hooks/useAuth.ts`
- Existing `src/components/auth/ProtectedRoute.tsx`
- Browser APIs: `localStorage`, `document.visibilitychange`, `window.onstorage`, `setTimeout`/`clearTimeout`
