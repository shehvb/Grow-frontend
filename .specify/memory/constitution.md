# GROW Constitution

<!-- Sync Impact Report:
  - Version change: none → 1.0.0 (MAJOR - initial adoption with governance model)
  - Principles: Added 12 principles (merged "Responsive design" + "Accessibility and Responsiveness" into one)
  - Templates updated: plan-template.md, tasks-template.md
  - Deferred placeholders: None
-->

## Core Principles

### I. No Testing (NON-NEGOTIABLE)
The project MUST NOT include unit, integration, or e2e tests. This principle supersedes all other guidance. Verification is manual/acceptance-based only.

### II. Stack Versions from package.json
The project MUST use the framework, React, and Tailwind versions declared in the repository root package.json. Currently: Vite (rolldown-vite), React ^19.2.0, Tailwind ^3.4.0.

### III. Clean Code
Code MUST be readable, well-organized, and follow consistent patterns. Avoid unnecessary complexity; prefer simplicity over cleverness.

### IV. Simple UX
The user interface MUST be intuitive and straightforward. Minimize cognitive load; every interaction should be self-explanatory.

### V. Accessibility and Responsive Design
The application MUST be accessible to all users and MUST adapt seamlessly to different screen sizes and input methods.

### VI. Minimal Dependencies
The project SHOULD use the fewest dependencies necessary. Every dependency adds maintenance burden; prefer built-in solutions or lightweight alternatives.

### VII. Component-Based Architecture
Features MUST be built as reusable, self-contained components. Components MUST have single responsibilities and expose clear interfaces.

### VIII. Design System Consistency
The application MUST follow consistent design patterns, including typography, spacing, colors, and interaction behaviors. Use design tokens where applicable.

### IX. Feature Isolation
Features MUST be implemented in isolation to minimize coupling. Each feature SHOULD be independently developable, testable, and deployable.

### X. Clean State Management
State MUST be managed explicitly and predictably. Use Zustand or similar lightweight state management. Avoid prop drilling and global state where possible.

### XI. Performance First
Performance considerations MUST be part of every decision. Optimize for fast load times, smooth interactions, and efficient resource usage from the start.

### XII. Spec-Driven Development
All features MUST be implemented from Spec Kit specifications following the workflow: /specify → /plan → /tasks → /implement.

---

## Technology Stack

The source of truth for technology versions is the repository root package.json.

- **Framework**: Vite (rolldown-vite)
- **UI Library**: React ^19.2.0
- **Styling**: Tailwind CSS ^3.4.0
- **Build Tooling**: As specified in package.json devDependencies

All new dependencies MUST comply with the Minimal Dependencies principle. Before adding any dependency, evaluate whether the functionality is truly necessary or can be implemented with existing tools.

---

## Development Workflow

The project follows a spec-driven development process:

1. **Specify** (`/speckit.spec`): Create feature specification with user stories, requirements, and acceptance scenarios
2. **Plan** (`/speckit.plan`): Generate implementation plan with technical context and project structure
3. **Tasks** (`/speckit.tasks`): Generate task list organized by user story
4. **Implement**: Execute tasks and verify manually

### Constitution Check

A Constitution Check MUST be performed:
- **Before Phase 0** (research): Verify the feature plan complies with all constitutional principles
- **After Phase 1** (design): Re-verify compliance before implementation begins

**Constitution Check Gates**:
- No test frameworks or test tasks in the plan
- Stack (React, Tailwind, build tooling) matches package.json
- Clean code, simple UX, responsive/accessible UI, minimal dependencies
- Component-based architecture, design system consistency, feature isolation
- State management uses Zustand or similar lightweight solution
- Performance considerations include lazy loading where appropriate
- Spec-driven workflow (/specify → /plan → /tasks → /implement) is followed

---

## Governance

### Amendment Process
Constitutional amendments require:
1. Proposed change documented with rationale
2. Review against core principles
3. Migration plan if changes affect existing features
4. Version bump following semantic versioning

### Semantic Versioning
The constitution follows MAJOR.MINOR.PATCH versioning:
- **MAJOR**: Governance model changes, principle additions/removals, backward-incompatible workflow changes
- **MINOR**: New principles, workflow enhancements, template updates
- **PATCH**: Clarifications, corrections, documentation updates

### Compliance Expectations
- All team members MUST verify Constitution Check before and after design phases
- Complexity MUST be justified against constitutional principles
- No test tasks or test tooling SHALL be added to any feature

### Supremacy
The **No Testing** principle (I) supersedes any conflicting guidance in this constitution, templates, or any other project documentation.

---

**Version**: 1.0.0 | **Ratified**: 2025-03-16 | **Last Amended**: 2025-03-16
