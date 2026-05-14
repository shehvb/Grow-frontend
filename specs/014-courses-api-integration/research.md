# Phase 0: Research & Decisions

All technical approaches and integrations are clear based on the existing `package.json` dependencies and the explicit OpenAPI specification.

## Decisions

- **Decision:** Use `axios` for all API calls.
  - **Rationale:** `axios` is already installed and handles JSON parsing and error handling gracefully. We will create API wrapper functions inside `src/features/courses/api/`.
  - **Alternatives considered:** Native `fetch` API. Rejected because `axios` is already in the project dependencies and simplifies header management (e.g., JWT authorization).

- **Decision:** Use React state and `useEffect` for basic data fetching; use `zustand` if complex client-side caching is required.
  - **Rationale:** The application does not use `react-query`. We must adhere to the constitution's minimal dependency rule and use existing tools. For simple lists, component state is sufficient.
  - **Alternatives considered:** Adding `react-query` or `SWR`. Rejected due to Principle VI: Minimal Dependencies.

- **Decision:** Use `react-hot-toast` for API error/success notifications.
  - **Rationale:** It is already installed and provides a consistent UX for handling success/error states (e.g., 403 Forbidden, 404 Not Found) as required by the success criteria.
