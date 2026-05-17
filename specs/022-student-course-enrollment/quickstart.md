# Quickstart: Testing the Student Course List and Enrollment

Follow these steps to manually verify the implementation:

## Prerequisites
1. Ensure the Django backend is running (`python manage.py runserver` or use the PythonAnywhere live URL).
2. Ensure you have a registered **Student** account with an assigned Grade (to avoid backend 500 errors).

## Step 1: Verify "My Courses"
1. Log in to the frontend as the student.
2. Click on the "Courses" tab in the sidebar (`/student/courses`).
3. You should see a list of courses. If you haven't enrolled in any, you should see the Empty State UI.

## Step 2: Verify Enrollment
1. Find a course you are not enrolled in.
2. Click the "Enroll" or "Join" button.
3. The button should show a loading state, and then update to show you are enrolled.
4. Refresh the page. The course should still appear in your "My Courses" list.

## Step 3: Verify Lesson Details
1. Click on the course card you just enrolled in.
2. You should be navigated to `/student/courses/:id`.
3. The page should fetch and display the course title and a list of lessons.
4. If the course has no lessons, an empty state should be displayed instead of an error or infinite spinner.
