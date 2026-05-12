# Quickstart: School Admin Module

## Overview
This module provides the frontend views for the School Administrator portal, including high-level dashboards, specific class metrics, and report generation tools.

## Key Components

1. **`AdminDashboardPage.tsx`**
   - The primary entry point.
   - Renders `KPIStats.tsx`, `ClassGrid.tsx`, and `AlertsSidebar.tsx`.
   - Fetches global admin data from `admin.mock.ts`.

2. **`ClassDetailsPage.tsx`**
   - Detailed view for a specific class (e.g., Class 9A).
   - Renders `TopPerformers.tsx`, `StudentStatusSidebar.tsx`, and `AssignedTeachersGrid.tsx`.
   - Uses URL parameters (e.g., `/admin/class/:id`) to determine which class data to render from the mock store.

3. **`ReportsAnalyticsPage.tsx`**
   - Standalone page for generating reports.
   - Contains `ReportConfigurationForm.tsx` to handle user selection of report type, class filters, and timeframes.
   - Triggers a mock download action upon submission.

## Development Workflow

1. Create the `admin.mock.ts` file with robust test data covering all entities.
2. Build out the atomic UI components (Cards, Sidebars, Forms) utilizing Tailwind CSS for styling.
3. Assemble the components into the three main page structures.
4. Wire the components to the mock data to verify dynamic rendering.
5. Setup routing in the main application to navigate between the Admin views.
