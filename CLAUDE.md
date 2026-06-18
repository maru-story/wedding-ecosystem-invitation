# CLAUDE.md — Wedding Invitation Project Rules

## Development Commands
- **Dev Server**: `npm run dev` (starts on port 3001)
- **Production Build**: `npm run build`
- **Lint Check**: `npm run lint`
- **TypeScript Type-Check**: `npx tsc --noEmit`
- **Install Dependencies**: `npm install`

## Code Style & Patterns
- **Language**: English for code elements (variable/function names, comments, logs, types). Bahasa Indonesia for all user-facing UI labels, copies, and validation toasts.
- **Components**: Group UI elements under `components/ui/` (using Radix/shadcn wrappers). Business sections reside under `components/common/`.
- **CSS / Styling**: Tailwind CSS 4 (using CSS-first configuration via `@import` directives, no `tailwind.config.ts`).
- **Data Fetching**: Pure client-side or Next.js fetch calls in `lib/api.ts` pointing to `process.env.NEXT_PUBLIC_API_URL` (the Fastify monorepo backend on port 4000).

## Critical Rules (DO NOT BREAK)
1. **Hydration Warnings**: Never initialize state utilizing `window` properties on load. Initial state in components (e.g., `useState`) must use static defaults (e.g. `800` and `600`) so server-side markup matches the client. Update to actual screen values in `useEffect` on mount.
2. **Focus Management**: Background interactive sections (`SectionKonfirmasi`, `SectionPesan`) must lock out keyboard navigation when the envelope is closed. Set `tabIndex={isInvitationOpen ? 0 : -1}` on all input, textarea, and button elements in these sections.
3. **Animations**: Do not alter, slow down, or delete visual animations (the slide-down envelope, minecraft loader, or rotating flower flip effects) unless explicitly requested.

## Cross-Repository Reference
- **Backend API & Database**: This project connects to the main `wedding-ecosystem` monorepo.
- **Paths resolution (Device-agnostic)**:
  - Check the absolute directory: `/home/mochrafi/wedding-ecosystem` (if on the main dev machine).
  - Check relative directories: `../../wedding-ecosystem` or sibling `../wedding-ecosystem` (if cloned side-by-side on another device).
- **Inspecting Schemas & API**: Look up monorepo types inside `{MONOREPO_PATH}/packages/shared/src/types/`, Prisma DB models inside `{MONOREPO_PATH}/packages/db/prisma/schema.prisma`, and API endpoints inside `{MONOREPO_PATH}/packages/api/src/routes/`.
