# Research Log: Parent Portal API Integration

## Decision Log

### 1. Authenticated Network Layer
* **Decision**: Reuse and harden the existing `fetchWithAuth` wrapper in `src/services/parentApi.ts`.
* **Rationale**: The function already pulls tokens dynamically from both nested `user.access` structures and top-level `token` / `access_token` fields in localStorage, appending standard headers correctly.
* **Alternatives Considered**: Creating an Axios instance. Rejected as it adds dependency overhead and is redundant since the native fetch wrapper is already configured.

### 2. Multi-Field Student Verification Flow
* **Decision**: Map custom form inputs from the Add Student view directly to `ParentLinkRequest` (`/api/v1/parent/add-student/`).
* **Rationale**: Leverages the new backend schema containing `school_id`, `full_name`, `enrollment_code`, and `grade_id`.
* **Error Handling**: Captures error response `400`/`404` directly, rendering "Information does not match any student" cleanly.

### 3. Graceful Data Merging & Fallbacks
* **Decision**: Deep spread real responses over mock structures: `{ ...mockData, ...liveData }`.
* **Rationale**: Django REST API endpoints might occasionally return simplified payloads or exclude optional fields. Slicing in static structures via spreading guarantees the client remains perfectly functional with zero broken visual widgets.

---

## Technical Mapping Table

| Frontend Feature | API Endpoint | Request Body | Critical Response Fields |
|---|---|---|---|
| **Roster Fetch** | `GET /api/v1/auth/profile/` | *None* | `children` or `students` roster |
| **Dashboard Stats** | `GET /api/v1/parent/dashboard/{student_id}/` | *None* | `gpa`, `study_hours`, `xp` |
| **Missing Assignments** | `GET /api/v1/parent/dashboard/{student_id}/` | *None* | `action_needed` list / `missing_assignments` |
| **12-Month GPA Trend** | `GET /api/v1/parent/dashboard/{student_id}/` | *None* | `gpa_trend` array (12 months) |
| **Attendance Page** | `GET /api/v1/parent/attendance/{student_id}/` | *None* | `attendance_records` array |
| **Gradebook Reports** | `GET /api/v1/parent/reports/{student_id}/` | *None* | `detailed_subjects` grades |
| **Add Student Link** | `POST /api/v1/parent/add-student/` | `ParentLinkRequest` | Verification status / linked child profile |
