# Research & Decisions: Teacher Dashboard & Settings API Integration

## Overview
This document records technical decisions made during Phase 0 for the Teacher Portal API Integration.

## Resolved Clarifications
There were no ambiguous requirements or `NEEDS CLARIFICATION` markers in the implementation plan. The provided API documentation (`Grow Educational Platform API.yaml`) and the strict constraint to avoid UI changes provided a completely clear path for implementation.

### API Mapping Strategy
- **Decision**: Directly map backend API JSON schemas to existing frontend React component state.
- **Rationale**: Fulfills the constraint of strictly enforcing "NO UI CHANGES". The frontend components expect specific shapes (e.g., arrays for `MOCK_STUDENTS`), and the service layer/hooks will parse the API response into these exact shapes.
- **Alternatives considered**: Rewriting frontend components to match backend schema names exactly. Rejected because it violates the "NO UI CHANGES" constraint and increases regression risk.

### Read-Only Fields in Settings
- **Decision**: Read-only backend fields (like `school_name` and `email` in `TeacherProfile`) will be pre-populated in the UI but excluded from the `PATCH /api/v1/teacher/settings/profile/update/` payload to avoid 400 errors.
- **Rationale**: The UI currently presents these as inputs. To prevent UI changes (e.g., adding `disabled` states), the fields will remain as they are in the component, but the service layer will simply drop them from the update payload.
- **Alternatives considered**: Disabling the inputs in `SettingsPage.tsx`. Rejected to strictly adhere to "NO UI CHANGES".
