# CLAUDE.md — Wedding Invitation Project Rules

> *Updated/Enhanced by onboarding agent on 2026-06-21*

## Tech Stack
- **Framework**: Next.js 15.5.19 (App Router, Turbopack in development)
- **Library**: React 19.0.0
- **Styling**: Tailwind CSS 4.0 (CSS-first config, no `tailwind.config.ts`)
- **Animations**: Framer Motion 12.9.2
- **UI Primitives**: Radix UI / shadcn/ui

## Development Commands
- **Dev Server**: `npm run dev` (starts on port 3001 with Turbopack)
- **Production Build**: `npm run build`
- **Production Run**: `npm run start`
- **Lint Check**: `npm run lint`
- **TypeScript Type-Check**: `npx tsc --noEmit`
- **Install Dependencies**: `npm install`

## Project Structure
- `app/` → App Router pages and custom styling (`globals.css`)
- `app/[eventSlug]/` → Main personalized invitation layout and rendering
- `app/api/revalidate/` → On-demand ISR cache purge endpoint
- `components/common/` → Functional features and sections of the wedding page
- `components/context/` → React state and scroll locking context providers
- `components/ui/` → Core UI elements (Radix/shadcn wrappers)
- `lib/` → Utilities and API client functions pointing to the monorepo backend

## Code Style & Patterns
- **Language**: English for code elements (variable/function names, comments, logs, types). Bahasa Indonesia for all user-facing UI labels, copies, and validation toasts.
- **File Naming**: kebab-case for component file names (e.g. `card-open-wedding.tsx`), standard camelCase/PascalCase exports.
- **Error Handling**: Native `try/catch` in UI actions, graceful fallbacks on API request failures.
- **CSS / Styling**: Tailwind CSS 4 (using CSS-first configuration via `@import` directives in `app/globals.css`).
- **Data Fetching**: Pure client-side or Next.js fetch calls in `lib/api.ts` pointing to `process.env.NEXT_PUBLIC_API_URL` (the Fastify monorepo backend on port 4000).

## Testing
- There is currently no local test runner or test suite configured in this repository.

## Critical Rules (DO NOT BREAK)
1. **Hydration Warnings**: Never initialize state utilizing `window` properties on load. Initial state in components (e.g., `useState`) must use static defaults (e.g. `800` and `600`) so server-side markup matches the client. Update to actual screen values in `useEffect` on mount.
2. **Focus Management**: Background interactive sections (`SectionKonfirmasi`, `SectionPesan`) must lock out keyboard navigation when the envelope is closed. Set `tabIndex={isInvitationOpen ? 0 : -1}` on all input, textarea, and button elements in these sections.
3. **Animations**: Do not alter, slow down, or delete visual animations (the slide-down envelope, minecraft loader, or rotating flower flip effects) unless explicitly requested.
4. **Selective Version Bumps**: DO NOT bump the version of any package or application that does not have any code changes during a hotfix or release cycle.

## Git & PR Conventions
- **Branch Naming**: Use the pattern `[type]/[short-description]` (e.g. `fix/design`, `fix/production-reliability`).
- **Commit Messages**: Conventional Commit formatting prefix followed by lowercase description (e.g., `style: increase font size responsiveness`, `fix(section-akad): update SVGPaths`).

## Cross-Repository Reference
- **Backend API & Database**: This project connects to the main `wedding-ecosystem` monorepo.
- **Paths resolution (Device-agnostic)**:
  - Check the absolute directory: `/home/mochrafi/wedding-ecosystem` (if on the main dev machine).
  - Check relative directories: `../../wedding-ecosystem` or sibling `../wedding-ecosystem` (if cloned side-by-side on another device).
- **Inspecting Schemas & API**: Look up monorepo types inside `{MONOREPO_PATH}/packages/shared/src/types/`, Prisma DB models inside `{MONOREPO_PATH}/packages/db/prisma/schema.prisma`, and API endpoints inside `{MONOREPO_PATH}/packages/api/src/routes/`.

## Release Report Generation (Mandatory — June 2026)
- **Version Bump Detection**: Whenever you detect a version bump in the `package.json` file of this repository or sibling packages in `wedding-ecosystem` during a commit preparation or release workflow:
  1. You **MUST** proactively ask the user: *"Saya melihat ada kenaikan versi aplikasi. Apakah Anda ingin saya membuat laporan pembaruan PDF otomatis untuk versi ini?"*
  2. If approved, execute the `wedding-report-generator` skill to generate the client update report.
