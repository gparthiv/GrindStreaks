# GrindStreaks

**GrindStreaks** is a high-performance visual streak, habit, and study timetable tracker. Designed to cut the noise and help you grind toward success, it features a distraction-free aesthetic, powerful analytics, and an AI Coach named Streako to keep you accountable.

## Key Features

- **Distraction-Free Dashboard**: A clean, modern UI designed to keep you focused on your daily tasks without unnecessary gamification or clutter.
- **Resilient Offline-First Architecture**: Built to work completely offline, persisting your progress securely in your browser's local storage.
- **Consistency Heatmap**: Visualize your history with a GitHub-style contribution graph. Instantly see your completed tasks, active durations, and daily performance metrics.
- **AI Coach "Streako"**: Integrated with Google's Gemini API (server-side) to analyze your study patterns, provide actionable insights, and generate custom productivity roadmaps.
- **Advanced Streak Tracking**: True consistency tracking with smart logic that accounts for missed days without unfairly penalizing your momentum.
- **Custom Habit Management**: Full CRUD capabilities for creating and tracking custom habits and study sessions that matter to you.
- **Seamless Data Portability**: Export your history as CSV, generate beautiful PDF reports, and seamlessly import/export JSON backups.
- **Dark Mode Optimization**: A sleek dark mode designed to reduce eye strain during late-night coding or study sessions.

## Tech Stack

- **Frontend**: React 18+, TypeScript, Vite, Tailwind CSS v4
- **Backend**: Express (Node.js) to securely proxy AI requests
- **Animations**: Native CSS Transitions and Keyframes
- **Icons**: Lucide React
- **Charts**: Recharts

## Project Structure

```text
src/
├── components/
│   ├── analytics/        # Analytics, charts, and AI Coach insights
│   ├── dashboard/        # Main dashboard, heatmap, hero stats, custom tasks
│   ├── layout/           # Sticky Header, navigation
│   ├── settings/         # Backup tools, theme toggle, and reset panels
│   └── shared/           # Animated Modals and generic UI components
├── hooks/
│   └── useTaskEngine.ts  # Main task engine, CRUD operations, timer logic
├── services/
│   ├── ai.ts             # Client service to fetch AI Coach insights
│   ├── export.ts         # CSV and PDF export utilities
│   └── storage.ts        # Resilient local storage and daily reset logic
├── types/
│   └── index.ts          # Central TypeScript interfaces
├── App.tsx               # Primary layout router and state manager
├── index.css             # Tailwind config and global styles
└── main.tsx              # App initialization entrypoint
```

## Local Development

### Prerequisites
- Node.js (v18+)
- npm

### 1. Install Dependencies

Clone the repository and install the dependencies:

```bash
npm install
```

### 2. Environment Variables

Create a `.env` file in the root directory (based on `.env.example`) and add your Gemini API Key for the Streako AI Coach feature:

```env
GEMINI_API_KEY="your_api_key_here"
```

### 3. Run the Development Server

Launch the full-stack server (Express + Vite):

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deployment

GrindStreaks is built with a custom Express backend to securely handle Gemini API calls while serving a compiled React frontend.

### 1. Build for Production

Compile the React SPA and the Express backend:

```bash
npm run build
```

This compiles the static assets into `dist/` and bundles the Express API backend into a CJS server file under `dist/server.cjs`.

### 2. Start the Production Server

Launch the compiled full-stack server:

```bash
npm run start
```

The server listens on port `3000` (or your configured `$PORT`) and serves both the API endpoints and the frontend static files.
