# Agent Instructions — Wedding Invitation Client

> This file provides project-specific context and instructions for AI coding agents (Gemini CLI, Claude Code, Cursor, Copilot, etc.) working on this repository. Read this FIRST before making changes.

---

## Project Identity

**Wedding Invitation Client** — The public-facing, responsive web application for digital wedding invitations, customized for the Indonesian market. It is a lightweight, frontend-only Next.js app.

**Repository**: Standalone repository located at `/home/mochrafi/wedding-project/wedding-ecosystem-invitation`
**Local Port**: `3001` (Dev server runs on port 3001 to avoid conflict with the dashboard on port 3000)

---

## Architecture & Integration

This app is **completely frontend-only**. It contains no local database, no admin routes, and no local API handlers. It communicates exclusively with the Fastify REST backend of the `wedding-ecosystem` monorepo located at `/home/mochrafi/wedding-ecosystem`.

```
┌─────────────────────────────────┐
│  Wedding Invitation Client      │
│  (Next.js 15.3.1 - Port: 3001)  │
└───────────────┬─────────────────┘
                │
                │ REST API Fetches (Port: 4000)
                ▼
┌─────────────────────────────────┐
│     Fastify Backend API         │
│  (wedding-ecosystem - Port 4000)│
└─────────────────────────────────┘
```

### 🔗 Cross-Repository References
This project links to the main `wedding-ecosystem` monorepo.
* **Paths resolution (Device-agnostic)**:
  - Check the absolute directory: `/home/mochrafi/wedding-ecosystem` (if on the main dev machine).
  - Check relative directories: `../../wedding-ecosystem` or sibling `../wedding-ecosystem` (if cloned side-by-side on another device).
* **Shared Types & Zod Schemas**: Inspect `{MONOREPO_PATH}/packages/shared/src/types/` for data shapes.
* **Prisma Schema**: Database models live inside `{MONOREPO_PATH}/packages/db/prisma/schema.prisma`.
* **API Handlers**: Backend endpoints are defined inside `{MONOREPO_PATH}/packages/api/src/routes/`.

---

## Tech Stack

| Layer | Technology | Version | Rationale |
|---|---|---|---|
| Frontend | Next.js | 15.3.1 | App Router, SSR/ISR page rendering |
| UI | React | ^19.0.0 | React 19 Client components |
| Styling | TailwindCSS | ^4 | CSS-first configuration, no `tailwind.config.ts` |
| Components | shadcn/ui | latest | Radix-based UI building blocks (Button, Input, etc.) |
| Animation | Framer Motion | ^12.9.2 | GPU-accelerated micro-animations |
| Language | TypeScript | ^5 | Typed codebase |

---

## Route Map

1. **`/[eventSlug]?to=[guestSlug]`** (Dynamic Route)
   - The primary invitation page.
   - Fetches wedding config, theme, and guest personalization details in `generateMetadata` (for SEO / social share thumbnails) and the page components.
   - Renders sections sequentially: Home/Cover, Pengantin, Story, Doa, Bride, Groom, Countdown, Akad, RSVP, Attire, Photo, Video, Gift, Pesan, Penutup.
2. **`/`** (Root Route)
   - Triggers Next.js `notFound()` immediately since direct non-personalized entry is disallowed.

---

## API Connection ([lib/api.ts](file:///home/mochrafi/wedding-project/wedding-ecosystem-invitation/lib/api.ts))

- **Base URL**: Configured via `process.env.NEXT_PUBLIC_API_URL` (defaults to `http://localhost:4000`).
- **Fetch Invitation**: `fetchInvitationData(eventSlug, guestSlug)`
  - Hits `${API_BASE_URL}/invitations/${eventSlug}/${guestSlug}`
  - Used for dynamic page generation and metadata headers.
- **Submit RSVP**: `submitRsvp(payload)`
  - Hits `POST ${API_BASE_URL}/rsvp`
- **Messages / Wishes**:
  - `fetchMessages(eventId, page, limit)` hits `GET ${API_BASE_URL}/messages/${eventId}`
  - `submitMessage(payload)` hits `POST ${API_BASE_URL}/messages`

---

## Core UI & Animation Rules (MUST NOT VIOLATE)

1. **Do Not Alter Visual Animations (CRITICAL)**:
   - The opening envelope slide-down, Minecraft-style progress bar, and rotating flower flip animations are core to the aesthetic. Do not modify or replace their visual behavior or timing without explicit instruction.
2. **Hydration Warning Safety**:
   - Initial component rendering must use static default dimensions (e.g., in `FlowersCardWedding`). Do not query `window` properties directly in `useState` initializers. Let the values update dynamically inside `useEffect` on mount.
3. **Keyboard Focus Trap (a11y)**:
   - Form inputs and submit buttons in background sections (`SectionKonfirmasi`, `SectionPesan`) must have `tabIndex={isInvitationOpen ? 0 : -1}`. This blocks keyboard navigation from focusing hidden elements while the envelope card is closed.
4. **UI Consistency**:
   - Always use standard shadcn/ui wrapping elements (`Button`, `Input`, `Textarea`, `Label`, `RadioGroup`) rather than raw HTML tags.
5. **Language & Locale**:
   - **UI Copy / Text**: All user-facing labels and dialogs must be in **Bahasa Indonesia**.
   - **Code / Comments**: Variables, functions, comments, and logs must be in **English**.

---

## Common Commands

```bash
npm install        # Install dependencies
npm run dev        # Run local dev server (default port 3001)
npm run build      # Build production bundle
npm run lint       # Run lint check
npx tsc --noEmit   # Compile-check TypeScript type-safety
```

---

## Rules for AI Agents (Release Report Generation)

Whenever you detect a version bump in the `package.json` file of this repository or sibling packages in `wedding-ecosystem` during a commit preparation or release workflow:
1. You **MUST** proactively ask the user: *"Saya melihat ada kenaikan versi aplikasi. Apakah Anda ingin saya membuat laporan pembaruan PDF otomatis untuk versi ini?"*
2. If the user agrees, execute the `wedding-report-generator` skill to draft the report from git logs, run the Playwright screenshot tests (using the monorepo test suite), update the JSON file, and compile the final PDF.
3. **Selective Version Bumps**: DO NOT bump the version of any package or application that does not have any code changes during a hotfix or release.
