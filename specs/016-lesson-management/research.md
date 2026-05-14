# Phase 0: Research & Discovery

## Technical Context Unknowns

The specification provided a complete definition of the technology stack and functional requirements. 
- **Tech Stack**: React + Vite + Zustand + Axios + TailwindCSS
- **API Spec**: Existing `Grow Educational Platform API.yaml` defines the exact request/response schemas.

There are no `NEEDS CLARIFICATION` markers in the specification.

## Decisions

### 1. State Management
- **Decision**: Use Zustand for the lesson list and active lesson state.
- **Rationale**: Complies with Constitution Principle X (Clean State Management).
- **Alternatives**: React Context (more boilerplate, unnecessary re-renders), Redux (too heavy).

### 2. Styling
- **Decision**: Use the existing Tailwind CSS setup and `index.css`.
- **Rationale**: Complies with the prompt constraints and Constitution Principle II.

### 3. API Client
- **Decision**: Extend `courseService.ts` or create `lessonService.ts` using the existing `apiClient` instance.
- **Rationale**: Maintains consistency with the Course Management implementation.
