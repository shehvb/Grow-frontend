// Conditionally export either mock or API based on environment or feature flag
import { assignmentServiceMock } from "./mock/assignmentServiceMock";
// import { assignmentServiceApi } from "./assignmentServiceApi";

export const assignmentService = assignmentServiceMock; // Swap to 'assignmentServiceApi' when backend is ready
