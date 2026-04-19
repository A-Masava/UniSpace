# UniSpace — Implementation Plan

## 1. Project Overview

**Project Name:** UniSpace  
**Goal:** Build a comprehensive educational platform that connects teachers and students, facilitating class management, schedule organization, real-time communication, and academic resource sharing.

Each user experience is tailored by role:
- **Teachers** can create classes, manage student enrollments (with ID range validation), view schedules, and manage course materials.
- **Students** can join classes, view their routines, access class info, and manage their profiles.
- **Both roles** have access to personalized dashboards, settings, real-time chat, and an archive for past classes.

This project focuses on providing a seamless, distraction-free environment for educational management, ensuring:
- Intuitive navigation with a dedicated UI color palette .
- Secure enrollment processes.
- Clear separation between teacher and student functionalities.

---

## 2. Core Product Vision

UniSpace is not just a classroom management tool. It should become:
- A **unified academic portal** for university spaces.
- A **streamlined administrative helper** for teachers to manage student batches.
- A **centralized learning hub** for students to track schedules and classes.
- A **reliable real-time communication platform** for course-related discussions.

---

## 3. Technology Stack

We use a robust, decoupled architecture with a focus on core web technologies for the frontend and a scalable Node.js backend.

### Frontend
- Pure HTML5, CSS3, and  JavaScript
- Axios (for RESTful API communication)
- Served statically using `serve`

### Backend
- Node.js
- Express.js (REST API framework)
- Socket.io (for real-time chat functionality)

### Database
- MongoDB (via Mongoose ODM)

### Authentication & Security
- Custom JWT-based authentication
- bcryptjs for password hashing
- `.env` for environment variable management

### Architecture Tooling
- Monorepo setup managing both `admin` and `local` (frontend/backend) environments

---

## 4. Important Architecture Decision

UniSpace employs a **decoupled architecture** within a **monorepo structure**. 

### Recommended practical approach
Use:
- ** HTML/JS frontend** for lightweight, framework-agnostic client rendering.
- **Express.js REST API** for robust backend logic.
- **Socket.io** alongside the REST API for real-time features like chat.

### Why
- **Simplicity & Performance:** Pure HTML/JS avoids the overhead of large frameworks while providing maximum control over the DOM.
- **Clear Separation:** Statically serving the frontend independently from the backend API enforces a strict separation of concerns.
- **Real-time Capabilities:** A traditional Express server is necessary to support long-running Socket.io connections for the chat functionality, which serverless environments handle poorly.

### Conclusion
The architecture leverages a persistent Node.js/Express backend to support WebSockets, paired with a lightweight, easily maintainable  JS frontend, all organized cleanly within a monorepo.

---

## 5. Development Philosophy

1. **Build role-centric experiences** (distinct flows for Teachers vs. Students).
2. **Prioritize secure workflows** (e.g., Student ID range validation).
3. **Maintain a consistent design system** (strict adherence to the  color scheme).
4. **Prefer native web APIs** and  JS over heavy client-side frameworks.
5. **Keep backend and frontend responsibilities clearly separated.**
6. **Ensure real-time features enhance, not distract from, core functionality.**
7. **Write code that is clean, modular, and easy to audit.**

---

## 6. Primary User Roles

### 1) Student
Can:
- Register/login
- View personalized dashboard
- Join classes (subject to ID validation)
- View enrolled classes and class info
- Access routine/schedule
- Use real-time chat
- Manage profile and settings
- Access archived classes

### 2) Teacher
Can:
- Register/login
- View personalized dashboard
- Create new classes
- Manage class students and ID range enrollments
- View and manage schedules
- Access class info
- Use real-time chat
- Manage profile and settings
- Archive past classes

### 3) Admin
Can:
- Access the dedicated Admin portal (`admin/frontend`, `admin/backend`)
- Oversee platform-wide metrics and user management

---

## 7. MVP Scope (Must Build First)

The core release focuses on the essential classroom lifecycle.

### Core Features
- User Registration & JWT Login
- Role-based routing and protection (Student vs. Teacher)
- Settings & Profile management (including secure Sign-Out modal flows)

### Teacher Features
- Teacher Dashboard UI
- Create Class flow
- Manage Students (ID range validation logic)
- Schedule management UI

### Student Features
- Student Dashboard UI
- Join Class flow
- View Classes and Routine UI

### Shared Features
- Basic Real-time Chat layout
- Class Info pages
- Archive functionality

---

## 8. Phase-wise Delivery Plan

## Phase 1 — Project Foundation
Goal: Set up the monorepo, backend skeleton, and frontend serving.
- Initialize `package.json` with `concurrently` scripts.
- Set up Node/Express backend with Mongoose.
- Set up static frontend serving.

## Phase 2 — Authentication & Roles
Goal: Secure the application and route users correctly.
- Design User schemas.
- Implement register/login API with JWT & bcrypt.
- Build `login.html` and `signup.html`.
- Implement role-based redirects.

## Phase 3 — Teacher Workspace
Goal: Allow teachers to create and manage the educational environment.
- Build Teacher Dashboard (`dashboard.html`).
- Implement `create-class.html` and backend endpoints.
- Build `class-students.html` with Student ID range validation logic.
- Implement `schedule.html`.

## Phase 4 — Student Workspace
Goal: Allow students to consume the educational environment.
- Build Student Dashboard (`dashboard.html`).
- Implement `join-class.html` (validating against teacher's ID rules).
- Build `classes.html` and `routine.html`.

## Phase 5 — Real-time & Polish
Goal: Add communication and finalize UI/UX.
- Implement `chat.html` using Socket.io.
- Standardize the UI (apply `#587c8d` branding consistently).
- Refine Settings pages (e.g., standardizing the confirmation modal for sign-out).
- Implement Class Archive features.

---

## 9. Optional Phase 2+ Features

These should be enhanced after the MVP is fully stable.
- Advanced file/attachment sharing within classes.
- Assignment submission and grading system.
- Push notifications for chat and class updates.
- Advanced Admin analytics dashboard.
- Video conferencing integration.

---

## 10. Recommended Folder Structure

```txt
d:\UniSpace\
├─ admin/
│  ├─ backend/
│  └─ frontend/
├─ local/
│  ├─ backend/
│  │  ├─ src/
│  │  │  ├─ app.js
│  │  │  ├─ controllers/
│  │  │  ├─ models/
│  │  │  ├─ routes/
│  │  │  └─ utils/
│  │  ├─ .env
│  │  └─ package.json
│  └─ frontend/
│     ├─ public/
│     │  ├─ pages/
│     │  │  ├─ student/
│     │  │  │  ├─ dashboard.html
│     │  │  │  ├─ classes.html
│     │  │  │  ├─ join-class.html
│     │  │  │  ├─ routine.html
│     │  │  │  └─ ...
│     │  │  ├─ teacher/
│     │  │  │  ├─ dashboard.html
│     │  │  │  ├─ create-class.html
│     │  │  │  ├─ class-students.html
│     │  │  │  ├─ schedule.html
│     │  │  │  └─ ...
│     │  │  ├─ index.html
│     │  │  ├─ login.html
│     │  │  ├─ signup.html
│     │  │  └─ chat.html
│     │  ├─ css/
│     │  └─ js/
│     └─ package.json
├─ package.json (Monorepo root)
└─ README.md
```

---

## 11. Core Data Models

## User
```ts
{
  name,
  email,
  passwordHash,
  role, // 'student' | 'teacher' | 'admin'
  studentId, // If role is student
  department,
  profileImage,
  createdAt,
  updatedAt
}
```

## Class
```ts
{
  title,
  courseCode,
  description,
  teacher: ObjectId, // Reference to User
  allowedStudentIdRanges: [
    { start: String, end: String }
  ],
  enrolledStudents: [ObjectId], // References to Users
  schedule: [],
  isArchived: Boolean,
  createdAt,
  updatedAt
}
```

---

## 12. Minimum API Plan

### Authentication APIs
- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/me`

### Class Management APIs (Teacher)
- `POST /api/classes` (Create class)
- `GET /api/classes/teacher` (List teacher's classes)
- `PATCH /api/classes/:id/id-ranges` (Update allowed student IDs)
- `PATCH /api/classes/:id/archive`

### Class APIs (Student)
- `POST /api/classes/join` (Join class - requires ID range validation)
- `GET /api/classes/student` (List enrolled classes)
- `GET /api/classes/:id/routine`

### Real-time (Socket.io)
- `connection`
- `join_room` (class ID)
- `send_message`
- `receive_message`

---

## 13. Key Pages Built

### Public / Auth
1. Landing Page (`index.html`)
2. Login (`login.html`)
3. Signup (`signup.html`)

### Student
4. Dashboard (`student/dashboard.html`)
5. Classes (`student/classes.html`)
6. Join Class (`student/join-class.html`)
7. Routine (`student/routine.html`)
8. Class Info (`student/class-info.html`)
9. Profile & Settings (`student/profile.html`, `student/settings.html`)

### Teacher
10. Dashboard (`teacher/dashboard.html`)
11. Create Class (`teacher/create-class.html`)
12. Manage Students (`teacher/class-students.html`)
13. Schedule (`teacher/schedule.html`)
14. Profile & Settings (`teacher/profile.html`, `teacher/settings.html`)

### Shared
15. Real-time Chat (`chat.html`)

---

## 14. Dashboard UI Plan

**Teacher Dashboard:**
- Overview of active classes.
- Quick action to "Create New Class".
- Recent notifications/messages.
- Sidebar navigation using the `#587c8d` theme.

**Student Dashboard:**
- Overview of enrolled classes.
- Upcoming routine/schedule summary.
- Quick action to "Join Class".
- Sidebar navigation using the `#587c8d` theme.

---

## 15. Student Enrollment Workflow

1. Teacher creates a class.
2. Teacher defines valid Student ID ranges (e.g., 20-10000 to 20-19999).
3. Student logs in and navigates to "Join Class".
4. Student enters the class code.
5. Backend validates the Student's ID against the Teacher's defined ranges.
6. If valid: Student is enrolled.
7. If invalid: Student receives "Contact with your teacher" error message.

---

## 16. UI/UX & Security Rules

- **Design Consistency:** All dashboards and settings pages must utilize the central `#587c8d` color.
- **Sign-Out Flow:** All sign-out buttons must trigger a confirmation modal before redirecting to `index.html`. No immediate destructive actions.
- **Form Validation:** Client-side Vanilla JS validation paired with strict Server-side validation.
- **Authorization:** Backend must verify JWT and Role on every protected API route.

---

## 17. Environment Variables

Expected variables in `local/backend/.env`:

```env
PORT=
MONGODB_URI=
JWT_SECRET=
NODE_ENV=
```

---

## 18. Execution Strategy for Further Development

When modifying or expanding UniSpace, follow these rules:
1. Respect the monorepo structure. Run `npm run dev` from the root to start both backend and frontend.
2. Maintain the Vanilla HTML/JS stack. Do not introduce React/Vue unless explicitly deciding on a massive refactor.
3. Keep the UI aligned with the existing CSS rules and color palettes.
4. Always implement confirmation modals for destructive actions (Delete, Archive, Sign Out).
5. Ensure robust error handling for API requests via Axios.

---

## 19. Summary

> **Note:** UniSpace is currently a work in progress and is not fully developed yet.

UniSpace is designed to be a **distraction-free, highly organized educational platform** tailored for university classroom management. 

The correct strategy moving forward is:
- Keep the architecture decoupled but contained within the monorepo.
- Build in phases, ensuring the Student and Teacher workflows are secure before expanding features.
- Connect the existing Vanilla JS frontend mockups to the Express API using Axios.
- Finalize the core Student ID Range enrollment logic.
- Polish the UI and Real-time chat only after core routing and auth are complete.

This will ensure the project remains:
- Fast and lightweight.
- Easy to manage and run locally.
- Secure and role-specific for educational use.
