# Phase 0: Research & Clarifications

## Resolved Clarifications

1. **Handling Multiple Students per Parent (from FR-007)**
   - **Decision**: Global dropdown selector in the dashboard header to switch active student context.
   - **Rationale**: Provides a clean UI and minimizes cognitive load (Constitution Principle IV: Simple UX). It ensures the parent views data for one child at a time without cluttering the interface on mobile devices (Principle V).
   - **Alternatives considered**: Side-by-side widgets (rejected because UI becomes overly complex and crowded on small screens).

2. **Backend & AI Architecture**
   - **Decision**: Frontend will communicate with a RESTful API backend. The AI insights will be generated server-side by calling an LLM service and served to the frontend as text.
   - **Rationale**: Keeps the frontend lightweight (Principle XI) and secures AI API keys.
   - **Alternatives considered**: Directly calling LLM from browser (rejected due to security risks of exposing API keys).

3. **State Management**
   - **Decision**: Zustand for global state (tracking the currently selected student and cached dashboard data).
   - **Rationale**: Mandated by Constitution Principle X (Clean State Management).
   - **Alternatives considered**: React Context (rejected as Zustand is preferred for lightweight predictable state).
