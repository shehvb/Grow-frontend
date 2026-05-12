# Research: School Admin Module

## Overview
This document records technical decisions made during the planning phase for the School Admin frontend module.

## Decisions

### 1. Data Mocking Strategy
- **Decision**: Create a dedicated `admin.mock.ts` file within the feature directory to simulate API responses for KPI stats, class details, student statuses, and teachers.
- **Rationale**: The user explicitly requested frontend implementation only. A centralized mock file allows the frontend to be fully built and validated without backend dependencies, making future API integration a simple swap of imports.
- **Alternatives considered**: Hardcoding data inside components (rejected due to poor maintainability and violation of separation of concerns).

### 2. State & Filtering
- **Decision**: Use standard React localized state (`useState`) for the Report Configuration filters (Class dropdown, Timeframe toggles).
- **Rationale**: The state is localized to a single form component and does not need to be shared globally across the application. This aligns with the "Clean State Management" constitutional principle.
- **Alternatives considered**: Zustand global state (rejected because the report form state is ephemeral and component-scoped).
