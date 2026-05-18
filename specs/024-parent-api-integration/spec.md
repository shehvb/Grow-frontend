# Feature Specification: Parent Portal Backend API Integration

**Feature Branch**: `024-parent-api-integration`  
**Created**: 2026-05-18  
**Status**: Draft  
**Input**: User description: "We need to connect all views, state stores, and service layers of the Parent Portal to the real backend APIs defined in `Grow Educational Platform API.yaml` without altering or breaking any existing UI layouts, premium design aesthetics, or custom widgets."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Linking & Verification of Students (Priority: P1)

As a parent, I want to securely link my children's profiles to my parent account using verification details so that I can see their academic and attendance progress.

**Why this priority**: It is the gateway requirement. Without linking students, a parent has no children to monitor and cannot view any other pages.

**Independent Test**:
Can be fully tested by submitting a mock student linkage payload through the parent interface, and verifying that the backend link request succeeds when valid details are supplied and returns clear mismatch validation states when invalid.

**Acceptance Scenarios**:

1. **Given** a parent has navigated to the Add Student verification page, **When** they submit valid details (full name, grade, school, and active enrollment code), **Then** the student is successfully linked and added to the parent's roster.
2. **Given** a parent submits incorrect verification details, **When** the request is sent, **Then** the interface displays "Information does not match any student" with zero frontend application crashes.

---

### User Story 2 - Real-Time Dashboard Summary & Metrics (Priority: P1)

As a parent, I want to view my selected child's active academic KPIs, XP counts, and recent school activities in real-time on my dashboard.

**Why this priority**: It is the core landing view of the parent portal and represents the main source of daily active value for parents.

**Independent Test**:
Selecting a student from the parent roster immediately updates the dashboard's GPA, study hours, AI insights, recent activities list, and the "Missing Assignments" alert card from backend endpoints.

**Acceptance Scenarios**:

1. **Given** a parent switches the active student, **When** the dashboard loads, **Then** all widgets (KPI metrics, AI Insights, Missing Assignments card, and Activity lists) reflect the newly selected student's real-time backend data.
2. **Given** certain non-mandatory fields are missing from the backend response, **When** mapping occurs, **Then** the application merges appropriate mock fallbacks to keep all widgets rendered cleanly.

---

### User Story 3 - Academic Trends & Monthly History (Priority: P2)

As a parent, I want to toggle between weekly and 12-month monthly views of my child's academic grades to track long-term progress.

**Why this priority**: Provides critical educational analytics, helping parents observe long-term trends and identify subjects needing immediate attention.

**Independent Test**:
Toggling the period switch to "Monthly" renders a complete 12-month data series on the area chart widget with correct grade percentage constraints (0-100%).

**Acceptance Scenarios**:

1. **Given** the Academic Trend card is visible, **When** the monthly filter is activated, **Then** the chart displays academic grades across 12 distinct months (Jan-Dec) fetched from the backend.
2. **Given** any grade values in the backend exceed standard bounds (e.g. 100%), **When** rendering, **Then** the client restricts visual bounds appropriately to keep rendering authentic.

---

### User Story 4 - Detailed Attendance Calendar (Priority: P2)

As a parent, I want to see my child's daily calendar logs (Completed, Missed, Extra Credit) and streaks to verify active participation.

**Why this priority**: Attendance is highly correlated with academic performance and is a key driver for parent peace of mind.

**Independent Test**:
Switching to the Attendance view loads calendar events and highlights present, late, or missed days correctly based on historical dates.

**Acceptance Scenarios**:

1. **Given** the parent is on the Attendance page, **When** daily logs load, **Then** each calendar cell is styled with matching statuses (Completed, Missed, Extra Credit) from the backend.

---

### User Story 5 - Comprehensive Academic Reports (Priority: P3)

As a parent, I want a complete gradebook breakdown, late submission trackers, and subject performance metrics to prepare for school reviews.

**Why this priority**: Essential for deeper dives, but secondary to the high-level daily dashboard and real-time alerts.

**Independent Test**:
Navigating to the Reports view correctly renders the Overall Average, Assignments, and Attendance metrics panels with shifted icons for premium layouts.

**Acceptance Scenarios**:

1. **Given** the parent loads the Reports view, **When** metrics fetch, **Then** the grade tables populate dynamically with subjects, scores, and letter grades.

---

### Edge Cases

- **Partial Response Schema**: Backend returns empty values or misses new fields (e.g. `teacher_file_url` or optional XP structures). The store MUST use safe object spreading and fallback state.
- **Unlinked Account state**: A newly registered parent has no linked students. The system must automatically prompt the Add Student view rather than displaying empty dashboards or throwing null references.
- **Slow/Intermittent Network**: During state refresh when switching students, standard premium loader spinners must activate.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST fetch parent profile details and linked child rosters via `GET /api/v1/auth/profile/`.
- **FR-002**: System MUST link a student to a parent using multi-field verification via `POST /api/v1/parent/add-student/` mapping to `ParentLinkRequest`.
- **FR-003**: System MUST load student KPIs, AI insights, activities, and missing assignment states via `GET /api/v1/parent/dashboard/{student_id}/`.
- **FR-004**: System MUST fetch monthly historical trend points spanning 12 months for the Academic Trend widget.
- **FR-005**: System MUST fetch detailed attendance metrics, streak data, and calendar states via parent attendance service layer.
- **FR-006**: System MUST fetch course lists, assignment details, and subject letter grades via `GET /api/v1/parent/reports/{student_id}/`.
- **FR-007**: System MUST use Zustand stores (`parentStore.ts`) to manage dashboard summary, selected students, and linking workflows, decoupled from UI rendering structures.

### Key Entities

- **Parent**: The authenticated user, containing an ID, profile details, and linked student identifiers.
- **Student**: The child, containing name, grade level, avatar, linked school, and enrollment details.
- **DashboardSummary**: Aggregated data object including metrics (GPA, XP, study hours), latest AI insights, recent activities, and subject lists.
- **AcademicTrendPoint**: A historical milestone containing a text label (e.g., month name) and a grade percentage value (0-100).
- **CalendarEvent**: A specific date record with status properties (Completed, Missed, Extra Credit).

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: 100% of parent sections load their real-time state from backend endpoints without any UI regression or rendering delay.
- **SC-002**: Verification linkages submit correctly in under 1 second on average over modern networks.
- **SC-003**: Switching active student profiles in the store updates all dependent components synchronously in under 200ms.
- **SC-004**: The application maintains a 100% successful build rate with zero TS compiler warnings or broken runtime interfaces.
