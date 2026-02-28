# AI CoFounder: Project Architecture & Technical Guide

This document serves as a comprehensive guide to understanding the AI CoFounder application. It covers the technology stack, the exact file and folder structure, the database architecture, and how data flows through the system. Use this guide to explain the technical foundation of the project.

---

## 1. The Technology Stack

The application is built using a modern, scalable, and highly performant JavaScript/TypeScript tech stack.

*   **Core Framework:** **Next.js (React)** 
    *   *Why:* Next.js is a "full-stack" framework. It handles both our Frontend UI (using React) and our Backend Server logic (using API Routes) inside a single, unified codebase.
*   **Frontend Routing:** **Next.js App Router (`src/app/`)**
    *   *Why:* Provides incredibly fast page loading, excellent SEO capabilities, and robust layout nesting (e.g., keeping a sidebar consistent while navigating between tools).
*   **Styling & UI:** **Tailwind CSS & Lucide React**
    *   *Why:* Tailwind CSS allows us to build complex, responsive SaaS components without writing slow, custom CSS files. `lucide-react` provides crisp, lightweight vector icons that scale perfectly.
*   **Database Engine:** **MongoDB (NoSQL)**
    *   *Why:* MongoDB stores data in flexible JSON-like documents. Since our AI generates highly variable data (ranging from 3-sentence ideas to 3-year financial models), this flexibility is essential over rigid SQL tables.
*   **Data Modeling:** **Mongoose (ODM)**
    *   *Why:* Mongoose acts as our strict "blueprint manager." It guarantees that before any data is saved to MongoDB, it absolutely must follow our predefined rules and structures.
*   **The "Brain":** **External AI LLM Integration**
    *   *Why:* The backend securely communicates with leading Large Language Models to generate business strategies, code, and financial models on the fly without ever exposing secret API keys to the browser.

---

## 2. File & Folder Structure

This defines exactly where every piece of code lives and what it does.

### 📁 The Root Directory (Configuration)
*   **`package.json`**: The "ID card" listing all dependencies (React, Next, Tailwind, Mongoose) and scripts (`npm run dev`).
*   **`.env.local`**: A highly secure, hidden file storing secret environment variables like the `MONGODB_URI` and `OPENAI_API_KEY`. It is never exposed to the browser or GitHub.

### 📁 `src/` (The Application Code)
This is where the custom code lives.
*   **📂 `src/app/` (Frontend Routes & Layouts)**
    *   Every folder here with a `page.js` file automatically becomes a web URL (e.g., `src/app/dashboard/page.js` becomes `/dashboard`).
    *   **`globals.css`**: The global stylesheet defining our custom "Soft Gray + Navy Blue SaaS" theme variables and utility classes (like `.btn-primary`).
    *   **`layout.js`**: The master wrapper that loads fonts and wraps every single page on the site.
*   **📂 `src/components/` (Reusable UI Blocks)**
    *   Holds reusable React pieces like **`Sidebar.js`** (navigation menu) and **`AppLayout.js`** (the layout wrapper ensuring the sidebar stays on the left). 
*   **📂 `src/utils/` (The Engine Room)**
    *   **`db.js`**: Contains the critical logic to securely connect to the MongoDB database.
    *   **`aiService.js`**: Contains the functions that talk securely to our external AI models to generate insights.

### 📁 `pages/api/` (The Backend Server Routes)
Every file inside `pages/api/` is a secure, independent serverless function running on Node.js. It never runs in the browser.
*   **`auth/signup.js` & `auth/login.js`**: Securely hashes passwords, checks the database, and creates secure user sessions.
*   **`ideation/generate.js`, `business-plan/create.js`, etc.**: The specific backend endpoints that receive a user's prompt, talk to the AI API via `aiService.js`, save the massive resulting data to the database, and send a success response back to the frontend UI.

### 📁 `models/` (The Database Structure / Mongoose Schemas)
These files dictate the strict blueprints for our data.
*   **`User.js`**: Defines a user's identity (email, hashed password, role like 'founder' or 'investor', and current startup stage).
*   **`BusinessPlan.js`**: A massive data structure designed to safely store the AI-generated outputs, including `marketAnalysis`, `competitiveAnalysis`, and 3-year `financialProjections`.
*   **`MVPFeature.js`**: Stores the technical architecture and code features generated for 'developer' roles.

### 📁 `public/` (Static Assets)
*   Holds global graphical assets like images (`hero-bg.png`) and SVG icons that are publicly accessible directly via URL.

---

## 3. Data Flow Example: "Generating a Startup Idea"

To understand how the entire stack connects, here is the lifecycle of a single user action:

1.  **User Action (Frontend):** A user is on the `/ideation` page (`src/app/ideation/page.js`). They type a prompt into the input field and click "Generate".
2.  **The Request (Connection):** The React frontend triggers a JavaScript `fetch()` network call. This sends an HTTP POST request containing the prompt to our secure backend endpoint at `/api/ideation/generate`.
3.  **Server Processing (Backend & Database):** 
    *   The `/api/ideation/generate.js` API route receives the request securely on the server.
    *   It imports `utils/db.js` to ensure a connection to the MongoDB database.
    *   It imports `utils/aiService.js`, formats a complex system prompt, and sends it to the AI Model.
    *   Once the AI returns a brilliant startup idea, the backend uses the `models/BusinessPlan.js` schema structure to permanently save the idea into the MongoDB database.
    *   Finally, it sends a "Success" JSON response back down the wire to the frontend.
4.  **UI Update (Frontend):** The frontend receives the JSON response. React instantly updates its state and dynamically renders the new AI-generated idea onto the user's screen inside a sleek, modern `card-saas` component.
