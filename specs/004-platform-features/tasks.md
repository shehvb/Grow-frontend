# Tasks: Grow Learning Platform — Platform Features

**Input**: Design documents from `specs/004-platform-features/`  
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/

**Tests**: No test tasks — the constitution forbids unit, integration, and e2e tests. Verification is manual/acceptance-only.

**Organization**: Tasks are grouped by user story to enable independent implementation and verification.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: User story label (US1–US9) for story phases only
- Include exact file paths in descriptions

## Path Conventions

- Single project: `src/` at repository root (no tests/)
- Layout: `src/components/layout/`, `src/layouts/`
- Features: `src/features/<feature>/`
- Mock: `src/mock/`
- Services: `src/services/`, Hooks: `src/hooks/`

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project structure and tooling per plan; stack from package.json.

- [x] T001 Create folder structure per plan: `src/components/layout/`, `src/components/ui/`, `src/features/dashboard/`, `src/features/courses/`, `src/features/quiz/`, `src/features/tasks/`, `src/features/ai/`, `src/features/analytics/`, `src/features/reports/`, `src/layouts/`, `src/hooks/`, `src/services/`, `src/mock/`, `src/pages/`
- [x] T002 [P] Ensure Tailwind and React router are configured (Tailwind in `tailwind.config.*`, routes in `App.tsx` or router config); add only if missing per package.json
- [x] T003 [P] Configure linting and formatting for `src/` (ESLint/Prettier per existing project)

**Checkpoint**: Repo has required folders and runs; stack matches package.json.

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Global layout and student routing so all user story pages can render inside the same shell.

- [x] T004 Implement Sidebar in `src/components/layout/Sidebar.tsx` with nav items: Dashboard, Courses, Tasks, AI Tutor, Settings; use react-router links
- [x] T005 Implement Topbar in `src/components/layout/Topbar.tsx` (title/brand and optional actions per Figma)
- [x] T006 Implement PageContainer in `src/components/layout/PageContainer.tsx` to wrap main content area with consistent padding
- [x] T007 Implement StudentLayout in `src/layouts/StudentLayout.tsx` composing Sidebar + Topbar + PageContainer around outlet/children
- [x] T008 Wire student routes in `App.tsx` (or router) so student routes render inside StudentLayout; ensure nav links match routes

**Checkpoint**: Student layout and routing work; all story pages can be added under this shell.

---

## Phase 3: User Story 1 — Student Sees Learning Progress (Priority: P1) — MVP

**Goal**: Student dashboard showing daily mastery progress, total XP, daily streak, today’s tasks, and weekly target.

**Independent Test**: Student can open the dashboard and see daily mastery progress, total XP, streak, today’s tasks, and weekly target; values can come from mock data.

### Implementation for User Story 1

- [x] T009 [P] [US1] Add mock data for dashboard in `src/mock/dashboard.mock.ts` (e.g. dailyMasteryProgress, totalXp, streakDays, todayTasks, weeklyTarget) matching data-model shapes
- [x] T010 [P] [US1] Create XPCard (or equivalent) component in `src/features/dashboard/` or `src/components/ui/` to display total XP per Figma
- [x] T011 [P] [US1] Create streak/progress UI components (e.g. DailyMasteryProgressBar, StreakCounter, WeeklyGoalWidget) in `src/features/dashboard/` or `src/components/ui/` per Figma
- [x] T012 [US1] Create TodayTasksList (or equivalent) in `src/features/dashboard/` to show today's tasks from mock
- [x] T013 [US1] Implement student dashboard page in `src/features/dashboard/` (e.g. `DashboardPage.tsx`) composing XP, streak, mastery, weekly goal, and today's tasks; read from mock
- [x] T014 [US1] Register dashboard route under StudentLayout and add Dashboard nav link to Sidebar in `src/components/layout/Sidebar.tsx`

**Checkpoint**: Student dashboard is reachable and shows progress, XP, streak, tasks, and weekly target from mock data.

---

## Phase 4: User Story 2 — Student Studies Structured Courses (Priority: P2)

**Goal**: Course catalog with filter (All / In Progress / Completed), responsive grid, and course cards with progress; mock data only.

**Independent Test**: Student can open Courses, use filter tabs, see course cards with title, instructor, progress bar, and completion %; grid is responsive (1/2/4 columns).

### Implementation for User Story 2

- [x] T015 [P] [US2] Create `src/mock/instructors.mock.ts` exporting array of `{ id, name }` per data-model and contracts
- [x] T016 [P] [US2] Create `src/mock/courses.mock.ts` exporting array of course objects with id, title, instructor (ref or name), progress (0–100), status (not_started | in_progress | completed) per contracts/courses-api.md
- [x] T017 [US2] Add course filter types/helpers in `src/features/courses/courseFilters.ts` (e.g. filter by status: all | in_progress | completed)
- [x] T018 [P] [US2] Implement ProgressBar component in `src/components/ui/ProgressBar.tsx` showing completion percentage; style per Figma
- [x] T019 [P] [US2] Implement FilterBar (tabs: All Courses, In Progress, Completed) in `src/components/ui/FilterBar.tsx` or `src/features/courses/FilterBar.tsx`; accept active filter and onChange
- [x] T020 [P] [US2] Implement CourseCard in `src/features/courses/CourseCard.tsx` (or `src/components/ui/CourseCard.tsx`) displaying title, instructor name, ProgressBar, completion %; click navigates to course detail or placeholder; style per Figma
- [x] T021 [US2] Implement CoursesGrid in `src/features/courses/CoursesGrid.tsx` responsive grid (1 col mobile, 2 tablet, 4 desktop) rendering CourseCard list
- [x] T022 [US2] Implement courseService in `src/services/courseService.ts` to return courses from `src/mock/courses.mock.ts` (and optionally instructors from `src/mock/instructors.mock.ts`); shape per contracts
- [x] T023 [US2] Implement useCourses hook in `src/hooks/useCourses.ts` to load courses via courseService and expose filtered list
- [x] T024 [US2] Implement CoursesPage in `src/features/courses/CoursesPage.tsx`: FilterBar + CoursesGrid; filter state drives filtered courses from useCourses; wire to mock data
- [x] T025 [US2] Register Courses route under StudentLayout and ensure Courses nav link points to it in `src/components/layout/Sidebar.tsx`

**Checkpoint**: Courses page shows filterable course cards with progress; layout and data align with Figma and contracts.

---

## Phase 5: User Story 3 — Student Completes Quizzes (Priority: P3)

**Goal**: Quiz flow with question navigation, timer, progress, and score/result on submit.

**Independent Test**: Student can start a quiz, move through questions, see timer and progress, submit, and see score/result.

### Implementation for User Story 3

- [x] T026 [P] [US3] Add mock quiz data (questions, options, correct answer) in `src/mock/quiz.mock.ts` for at least one quiz
- [x] T027 [US3] Implement QuizContainer and QuestionCard/AnswerOptions in `src/features/quiz/` (e.g. `QuizContainer.tsx`, `QuestionCard.tsx`); display one question at a time with navigation
- [x] T028 [US3] Add Timer and ProgressIndicator in `src/features/quiz/` for quiz time and question progress
- [x] T029 [US3] Implement submit logic and ResultModal (or result view) in `src/features/quiz/` to show score/result after submit
- [x] T030 [US3] Create quiz page and route under StudentLayout; add Quiz or link from courses if applicable

**Checkpoint**: Student can complete a quiz and see score/result.

---

## Phase 6: User Story 4 — Student Manages Tasks (Priority: P4)

**Goal**: Task view with categories Today, Upcoming, Overdue; task cards show status and deadline.

**Independent Test**: Student can open task view, switch tabs/categories, and see tasks with deadline and status.

### Implementation for User Story 4

- [x] T031 [P] [US4] Add mock tasks in `src/mock/tasks.mock.ts` with id, title, dueDate, status, category (today | upcoming | overdue) per data-model
- [x] T032 [US4] Implement TaskCard and TaskStatusTabs (Today, Upcoming, Overdue) in `src/features/tasks/` (e.g. `TaskCard.tsx`, `TaskStatusTabs.tsx`)
- [x] T033 [US4] Implement TaskBoard in `src/features/tasks/TaskBoard.tsx` to display tasks by category; add DeadlineIndicator on TaskCard
- [x] T034 [US4] Create tasks page and route under StudentLayout; add Tasks nav link if not already present

**Checkpoint**: Student can view tasks by Today, Upcoming, Overdue with deadlines and status.

---

## Phase 7: User Story 5 — Student Uses AI Tutor (Priority: P5)

**Goal**: AI tutor chat UI; student can send messages and see responses (streaming or single response).

**Independent Test**: Student can open AI tutor, type and send a message, and see a response in a chat-style UI.

### Implementation for User Story 5

- [x] T035 [P] [US5] Implement AIChatInterface shell in `src/features/ai/` (MessageList, InputField, send action); optional ResponseCard for message bubbles
- [x] T036 [US5] Wire input to a mock or placeholder responder (e.g. echo or static response) so the UI shows request/response flow; prepare for future backend/streaming
- [x] T037 [US5] Create AI Tutor route under StudentLayout; add AI Tutor nav link in Sidebar

**Checkpoint**: Student can open AI tutor, send a message, and see a response in the chat UI.

---

## Phase 8: User Story 6 — Parent Sees Academic Overview (Priority: P6)

**Goal**: Parent dashboard with GPA, study hours, engagement rate, GPA trend, subject performance, recent activity for linked students.

**Independent Test**: Parent can open parent dashboard and see GPA, study hours, engagement, trend chart, subject performance, and recent activity (mock).

### Implementation for User Story 6

- [ ] T038 [P] [US6] Add mock parent dashboard data in `src/mock/parentDashboard.mock.ts` (GPA, studyHours, engagementRate, gpaTrend, subjectPerformance, recentActivity) for at least one linked student
- [ ] T039 [US6] Implement ParentDashboardLayout and summary cards (GPACard, StudyHoursCard, EngagementRateCard) in `src/features/dashboard/` or `src/features/analytics/` (parent section)
- [ ] T040 [US6] Implement PerformanceChart (GPA trend) and SubjectPerformanceCards in parent dashboard area; use mock data
- [ ] T041 [US6] Implement RecentActivityFeed in parent dashboard; add parent route and role-based entry (parent layout or route guard) so only parents see this dashboard

**Checkpoint**: Parent can open dashboard and see academic overview for linked student(s) from mock.

---

## Phase 9: User Story 7 — Parent Uses Analytics and Insights (Priority: P7)

**Goal**: Analytics view with trends, assignment completion, study time, and AI insights.

**Independent Test**: Parent can open analytics and see trends, completion, study time, and any AI insight alerts.

### Implementation for User Story 7

- [ ] T042 [P] [US7] Add mock analytics data in `src/mock/analytics.mock.ts` (trends, averageGrade, studyHours, assignmentCompletion, subjectBreakdown, aiInsights)
- [ ] T043 [US7] Implement AnalyticsDashboard with TrendChart, AverageGradeWidget, StudyHoursWidget, AssignmentCompletionCard, SubjectBreakdownCards in `src/features/analytics/`
- [ ] T044 [US7] Add AIInsightAlert (or equivalent) when mock includes AI insights; create analytics route for parent role

**Checkpoint**: Parent can view analytics with trends, completion, study time, and insights.

---

## Phase 10: User Story 8 — Parent Monitors Attendance and Reports (Priority: P8)

**Goal**: Attendance view (calendar/feed with attended, missed, extra credit) and reports (overall average, attendance, completion, subject performance).

**Independent Test**: Parent can view attendance and a report summary for linked student(s).

### Implementation for User Story 8

- [ ] T045 [P] [US8] Add mock attendance and report data in `src/mock/attendance.mock.ts` and `src/mock/reports.mock.ts` per data-model
- [ ] T046 [US8] Implement AttendanceCalendar or ActivityFeed with AttendanceLegend in `src/features/analytics/` or dedicated attendance/reports feature folder
- [ ] T047 [US8] Implement ReportSummary (AttendanceStats, PerformanceTable, MonthlyComparison) in reports area; wire to mock; add parent routes for attendance and reports

**Checkpoint**: Parent can view attendance and reports from mock data.

---

## Phase 11: User Story 9 — Role-Specific Settings (Priority: P9)

**Goal**: Student settings (profile, password, XP options); parent settings (profile, linked students, notifications).

**Independent Test**: Student can change profile/password/XP; parent can change profile, manage linked students, and notifications.

### Implementation for User Story 9

- [x] T048 [P] [US9] Create Settings page shell in `src/features/settings/` or `src/pages/Settings.tsx` with role-based sections (student vs parent)
- [x] T049 [US9] Implement student settings section: profile info, password change, XP visibility (or placeholder); show only for student role
- [x] T050 [US9] Implement parent settings section: profile, linked students list/manage, notifications; show only for parent role
- [x] T051 [US9] Wire Settings route under appropriate layout(s); ensure Settings nav link points to it

**Checkpoint**: Students and parents can access role-appropriate settings.

---

## Phase 12: Polish & Cross-Cutting Concerns

**Purpose**: Responsiveness, accessibility, and consistency across the app.

- [ ] T052 [P] Verify responsive breakpoints for courses grid (1/2/4 columns), dashboard, and key pages per plan; fix layout issues
- [ ] T053 [P] Add basic a11y: semantic markup, focus states, and labels for key interactive elements (filters, cards, forms)
- [ ] T054 Add animations or UI polish per Figma (e.g. hover on CourseCard, progress bar fill) where specified
- [ ] T055 Run quickstart validation: ensure app runs, student can reach dashboard and courses, parent can reach parent dashboard (or placeholder)

---

## Phase: Authentication Upgrade

### 1. Update User Model
* Add role field (student, parent, teacher)

### 2. Update Login UI
* Convert login into tab-based interface
* Tabs: Student | Parent | Teacher
* Ensure switching tabs updates form behavior

### 3. Update Login Logic
* Include role in authentication request
* Validate role before login success

### 4. Signup Implementation
* Create signup screen
* Support Parent and Student signup
* Link signup from login page

### 5. Forgot Password Flow
* Create forgot password page
* Create reset password page
* Link from login page

### 6. Routing
* Connect all routes properly
* Ensure correct navigation between login/signup/forgot/reset

### 7. Backend Readiness
* Prepare API call structure (no hardcoded logic)
* Add placeholders for integration

### Rules
* Tasks must be small and executable
* Must not break existing student dashboard

---

## Dependencies & Execution Order

### Phase Dependencies

- **Phase 1 (Setup)**: No dependencies — start first.
- **Phase 2 (Foundational)**: Depends on Phase 1 — blocks all user stories.
- **Phases 3–11 (User Stories)**: Depend on Phase 2; can be done in priority order (US1 → US2 → …) or in parallel if staffed.
- **Phase 12 (Polish)**: After desired user stories are done.

### User Story Order

- **US1 (Dashboard)**: First story after foundation — MVP.
- **US2 (Courses)**: Can run in parallel with US1 after Phase 2; plan’s first slice emphasizes Courses + layout.
- **US3–US9**: Each can start after Phase 2; dependencies are minimal (shared layout and routing only).

### Within Each User Story

- Mock data and types first where applicable; then services/hooks; then UI components; then page and route.

### Parallel Opportunities

- T002, T003 (Setup); T009–T011 (US1 mock and small components); T015, T016, T018, T019, T020 (US2 mock and UI); T026, T031, T038, T042, T045 (mock files across stories); T048 (Settings shell); T052, T053 (Polish).

---

## Implementation Strategy

### MVP First (User Story 1)

1. Complete Phase 1 (Setup) and Phase 2 (Foundational).
2. Complete Phase 3 (US1 — Student Dashboard).
3. Validate: student can open dashboard and see progress, XP, streak, tasks, weekly goal.
4. Deploy or demo.

### First Slice (Layout + Courses)

1. Complete Phase 1 and Phase 2.
2. Complete Phase 4 (US2 — Courses): mock data, FilterBar, CourseCard, CoursesGrid, CoursesPage, filter logic.
3. Validate: student can open Courses, filter by status, see responsive grid of course cards.
4. Then add US1 (dashboard) or continue with other stories.

### Incremental Delivery

- After Phase 2, add one user story at a time; verify each independently before moving on.
- No test tasks — verify manually per constitution.

---

## Notes

- [P] = parallelizable; [USn] = user story for traceability.
- No test tasks per constitution — verification is manual/acceptance-only.
- All file paths are under repo root; use paths as given (e.g. `src/features/courses/CoursesPage.tsx`).
- Commit after each task or logical group; stop at checkpoints to validate.
