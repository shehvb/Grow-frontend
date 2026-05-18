# Parent Portal Integration Quickstart

This guide explains how to quickly configure, verify, and run the Parent Portal during and after the backend API integration phase.

---

## 1. Local Development Setup

To run the application locally on your system, execute the following commands from the repository root:

```bash
# Install package dependencies
npm install

# Start the local development web server
npm run dev
```

The app will start at `http://localhost:5173` (or similar active port displayed in your terminal).

---

## 2. Authentication & Authorization

All parent requests are authenticated using a JSON Web Token (JWT) cached inside your local storage:

```javascript
// Access token resides inside the nested "user" object:
const userObj = JSON.parse(localStorage.getItem("user"));
const token = userObj.access; // Loaded in fetchWithAuth automatically
```

To test linked student actions:
1. Log in to the application as a registered Parent user.
2. Ensure you have standard authentication credentials valid on `https://ahmeddali.pythonanywhere.com`.

---

## 3. Verifying Student Linkage

To add a new student with verification code:
1. Navigate to the **Add Student** panel.
2. Select your child's active **School** and **Grade**.
3. Supply their **Full Name** and **Verification Enrollment Code**.
4. Press submit to trigger `POST /api/v1/parent/add-student/`.
