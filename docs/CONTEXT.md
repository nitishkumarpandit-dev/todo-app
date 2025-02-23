Build a full-stack Todo Web App with the following tech stack and requirements:

Tech Stack:

- Frontend: Next.js with TypeScript and Tailwind CSS.
- Backend: A Node.js/Express API.
- Database: MongoDB using Mongoose ODM.
- Authentication: Clerk for user management.
- Deployment: Vercel for the Next.js frontend and a compatible host (or Vercel’s serverless functions) for the API.

Requirements:

1. **App Structure and Flow:**

   - A modern dashboard with pages: Dashboard (showing today's tasks and stats), All Tasks, Completed Tasks, and Settings.
   - Responsive design with a sidebar navigation on desktop and a mobile hamburger menu.
   - Users can add, edit, delete, and mark tasks as complete.
   - Tasks should persist in the database with CRUD operations.
   - Authentication via Clerk should protect API endpoints and pages requiring user context.

2. **File and Folder Structure:**

   - **Root Folder:**
     - package.json, tsconfig.json, tailwind.config.js, postcss.config.js, next.config.js.
   - **Frontend (Next.js) Folder Structure (inside the root):**
     - `/pages`
       - `index.tsx` – Landing/dashboard page.
       - `tasks.tsx` – Page listing all tasks.
       - `completed.tsx` – Page for completed tasks.
       - `settings.tsx` – Settings page.
       - `/api` – (Proxy or fallback routes if needed; actual API will be in Express.)
     - `/components`
       - `Layout.tsx` – Main layout including header, sidebar, and responsive design.
       - `TaskCard.tsx` – Component for rendering an individual task.
       - `TaskForm.tsx` – Component for adding/editing a task.
       - Any additional shared UI components.
     - `/styles`
       - `globals.css` – Tailwind directives and custom global styles.
   - **Backend (Express API) Folder Structure (can be a separate folder or integrated using a monorepo structure):**
     - `/src`
       - `app.ts` – Main Express app initialization.
       - `/routes`
         - `tasks.ts` – Routes for task CRUD operations (e.g., GET, POST, PUT, DELETE).
       - `/controllers`
         - `taskController.ts` – Controller functions handling business logic.
       - `/models`
         - `Task.ts` – Mongoose schema and model for a Task.
       - `/middlewares`
         - `authMiddleware.ts` – Middleware to verify Clerk authentication tokens.
       - `/config`
         - `db.ts` – MongoDB connection setup.
     - package.json, tsconfig.json for the backend.

3. **API Routes and Database Schema:**

   - **Express API Routes (in `/src/routes/tasks.ts`):**
     - `GET /tasks` – Get all tasks for the authenticated user.
     - `GET /tasks/:id` – Get a single task by ID.
     - `POST /tasks` – Create a new task.
     - `PUT /tasks/:id` – Update a task.
     - `DELETE /tasks/:id` – Delete a task.
   - **Mongoose Schema (in `/src/models/Task.ts`):**
     - Fields:
       - `title` (String, required)
       - `description` (String, optional)
       - `status` (Enum: 'pending', 'completed', etc.; default: 'pending')
       - `dueDate` (Date, optional)
       - `userId` (String, required – to associate the task with the authenticated user)
       - `createdAt` (Date, default: Date.now)
       - `updatedAt` (Date, default: Date.now)
   - **Authentication Middleware:**
     - Use Clerk to protect routes by verifying the JWT sent from the frontend. Reject requests if the token is missing or invalid.

4. **Integration between Frontend and Backend:**

   - Frontend pages will use API calls (via fetch or axios) to interact with the Express API.
   - Ensure the frontend sends the Clerk user token (in Authorization headers) with every API request.
   - Set up CORS and secure API routes accordingly.

5. **Deployment:**

   - Deploy the Next.js frontend on Vercel.
   - Either deploy the Express API as Vercel Serverless Functions (or on a separate Node hosting service) and set the API base URL in the Next.js app.
   - Configure environment variables (MongoDB URI, Clerk API keys, etc.) in Vercel.

6. **Additional Instructions:**
   - Use TypeScript throughout both frontend and backend.
   - Write modular, well-commented code.
   - Include error handling and input validation in API endpoints.
   - Use Tailwind CSS classes to closely match the provided UI design with responsive and interactive elements.
   - Maintain clear separation of concerns between UI components, API routes, and business logic.
   - Provide clear documentation in README for setting up the development environment and deploying the app.

Build out this app with the described structure and flow.
