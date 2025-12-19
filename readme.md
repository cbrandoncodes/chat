# Realtime Chat Application (Monorepo)

A modern **real‑time chat application** built as a **TypeScript monorepo**, featuring a WebSocket‑powered backend, a Next.js frontend, and a shared database layer powered by Drizzle ORM. The project is designed for scalability, low‑latency messaging, and clean separation of concerns across apps and packages.

The system supports real‑time messaging, persistent chat history, typed events, and a shared schema across frontend and backend.

---

## Tech Stack

- **Runtime:** Node.js (v20+)
- **Language:** TypeScript
- **Frontend:** Next.js (App Router)
- **Realtime Transport:** WebSockets
- **State Management:** Redux Toolkit
- **Database:** PostgreSQL / MySQL (via Drizzle)
- **ORM:** Drizzle ORM
- **Validation:** Zod
- **Styling:** CSS Modules / Tailwind (frontend)
- **Tooling:** ESLint, Prettier, Yarn Workspaces

---

## Setup & Installation

### 1. Prerequisites

Make sure you have the following installed:

- **Node.js** v20+
- **Yarn** (required – workspace based)
- **A running SQL database** (Postgres or MySQL)

---

### 2. Clone and Install

```bash
git clone <repo-url>
cd <project>

yarn install
```

This installs dependencies for **all apps and shared packages** in the monorepo.

---

### 3. Environment Variables

### 1. Create a .env file in the project root

```env
DATABASE_URL=postgresql://postgres:password@localhost:5432/chat
```

### 2. Create a .env file in the apps/next

```env
NEXT_PUBLIC_BASE_URL=http://localhost:3030
NEXT_PUBLIC_ROOT_DOMAIN=localhost:3030
NEXT_PUBLIC_API_URL=http://localhost:3030/api
NEXT_PUBLIC_SERVER_BASE_URL=http://localhost:5050
NEXT_PUBLIC_SERVER_API_URL=http://localhost:5050/api
DATABASE_URL=postgresql://postgres:password@localhost:5432/chat

# Google
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
```

### 3. Create a .env file in the apps/server

```env
PORT=5050
BASE_URL=http://localhost:5050
CLIENT_URL=http://localhost:3030
DATABASE_URL=postgresql://postgres:password@localhost:5432/chat

# better-auth
BETTER_AUTH_SECRET=

# AWS
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_REGION=
AWS_SES_SENDER=
TO_EMAIL=

# Google
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
```

---

### 4. Database Migration

The database schema is shared across apps via Drizzle.

```bash
yarn migrate
```

This will:

- Apply schema definitions from the shared DB package
- Keep frontend & backend types in sync

---

### 5. Run the Project

This project is a **monorepo** with separate frontend and backend applications. Each app must be started **independently** in its own terminal.

### 1. Start the Backend (Express + Socket.IO)

```bash
cd apps/server
yarn dev
```

### 2. Start the Frontend (Next.js)

```bash
cd apps/next
yarn dev
```

---

## Running Tests

```bash
yarn test
```

Tests focus on:

- WebSocket event handling
- Message persistence
- Schema & validation logic

---

## Monorepo Structure

The project uses a **workspace‑based monorepo** to share types, schema, and utilities.

```text
chat/
├── apps/
│   ├── next/           # Next.js frontend (chat UI)
│   └── server/         # WebSocket server (realtime messaging)
├── packages/
│   ├── shared/         # Shared types, constants & queries
├── drizzle.config.ts
├── migrate.ts
├── package.json
├── tsconfig.json
└── yarn.lock
```

---

## WebSocket Architecture

The application uses a **typed WebSocket protocol** for real‑time communication.

### Connection Flow

1. Client connects to WebSocket server
2. Server authenticates & registers the socket
3. Client subscribes to a chat room
4. Messages are broadcast to all room participants
5. Messages are persisted to the database

---

## Authentication

Authentication is handled using **better-auth**, providing a modern, secure, and passwordless-first auth experience shared across the monorepo.

### Supported Auth Methods

- **Magic Link Authentication**
  - Users sign in via a one-time email link
  - No passwords to manage or store

- **Google OAuth**
  - One-click sign-in with Google
  - Secure OAuth flow managed by better-auth

### Auth Architecture

- Auth logic lives in a dedicated backend module
- Session and user state are shared with the frontend
- WebSocket connections are authenticated using the active session
- User identity is attached to every message event

This ensures:

- Only authenticated users can connect to chat rooms
- Messages are always associated with a verified user
- A consistent auth model across HTTP and WebSocket layers

---

## Realtime Features

### 1. Live Messaging

- Instant message delivery via WebSockets
- Room‑based broadcasting
- Optimistic UI updates

---

### 2. Persistent Chat History

- Messages stored in SQL database
- Automatically loaded when a room is opened
- Shared schema between frontend and backend

---

### 3. Scalable by Design

- Stateless WebSocket handlers
- Easy horizontal scaling
- Shared schema and validation logic

---

## Frontend (Next.js)

The frontend lives in `apps/next` and includes:

- Chat UI
- Room navigation
- Message history rendering
- Real‑time updates via WebSocket client

---

## Database Layer

The database schema is defined once and reused everywhere:

```text
packages/db/
├── schema.ts
├── index.ts
└── migrations/
```

Benefits:

- Single source of truth
- No schema drift
- Strong typing across the stack

---
