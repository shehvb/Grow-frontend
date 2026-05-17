# Tasks: Student Dashboard API Integration

**Input**: Design documents from `/specs/021-student-dashboard-api/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md

## Phase 1: Setup

**Purpose**: Project initialization and basic structure

- [ ] T001 [P] Define `StudentDashboard`, `TodaysTask`, `DailyMaster`, and `LeaderboardEntry` interfaces in `src/types/student.ts`
- [ ] T002 Create `src/features/student/services/student.service.ts` with `getDashboardData` skeleton

---

## Phase 2: Foundational

**Purpose**: Core infrastructure for state management

- [ ] T003 Create `src/store/useStudentStore.ts` with Zustand to manage dashboard state, loading, and error states

---

## Phase 3: User Story 1 - Dashboard Core Stats (Priority: P1)

**Goal**: View real-time XP, streak, and daily mastery progress

**Independent Test**: Login as student, verify XP total, streak days, and mastery % match API response from `GET /api/v1/student/dashboard/`.

- [ ] T004 [US1] Implement `getDashboardData` in `src/features/student/services/student.service.ts` to call the backend endpoint
- [ ] T005 [US1] Update `useStudentStore.ts` with `fetchDashboardData` action to populate core stats
- [ ] T006 [US1] Refactor `src/features/dashboard/DashboardPage.tsx` to fetch data on mount using the new store
- [ ] T007 [US1] Update `src/features/dashboard/XPCard.tsx` and `src/features/dashboard/StreakCounter.tsx` to accept real data props
- [ ] T008 [US1] Update `src/features/dashboard/DailyMasteryProgressBar.tsx` to use `daily_master.completion_percentage`

---

## Phase 4: User Story 2 - Daily Tasks & Missions (Priority: P2)

**Goal**: View today's tasks and missions list

**Independent Test**: Verify that the "Today's Tasks" section displays correct task titles and rewards from the API.

- [ ] T009 [US2] Update `useStudentStore.ts` to include `todays_tasks` in the dashboard state
- [ ] T010 [US2] Refactor `src/features/dashboard/TodayTasksList.tsx` to map over the live tasks array from the store

---

## Phase 5: User Story 3 - Social Motivation (Leaderboard) (Priority: P3)

**Goal**: View standing on the social leaderboard

**Independent Test**: Verify the leaderboard widget reflects the ranking data returned by the API.

- [ ] T011 [US3] Update `useStudentStore.ts` to include `leaderboard` data in the dashboard state
- [ ] T012 [US3] Refactor `src/features/dashboard/LeaderboardWidget.tsx` to display live rankings

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [ ] T013 [P] Implement loading skeleton states in `DashboardPage.tsx` for a smoother initial load
- [ ] T014 Implement error fallback UI in `DashboardPage.tsx` if the API call fails
- [ ] T015 Verify responsive design remains intact across all integrated widgets

---

## Dependencies & Execution Order

1. **Setup (Phase 1)**: Must define types before service/store implementation.
2. **Foundational (Phase 2)**: Store is needed for all user stories.
3. **User Story 1 (P1)**: Highest priority, provides the base dashboard fetch.
4. **User Story 2 & 3 (P2-P3)**: Can be implemented once US1 base integration is stable.

## Parallel Opportunities

- T001 (Types) can be done while T002 (Service skeleton) is prepared.
- T007, T008 (UI Component updates) can be done in parallel once T006 (Page integration) is ready.
- T013 (Loading states) can be started as soon as the store structure is defined.
