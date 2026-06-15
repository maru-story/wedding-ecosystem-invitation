# Tech Stack

## Framework & Runtime

- **Next.js 15** (App Router) with Turbopack for dev
- **React 19** with Server Components (RSC enabled)
- **TypeScript 5** (strict mode)

## Styling

- **Tailwind CSS 4** via `@tailwindcss/postcss`
- **tw-animate-css** for animation utilities
- CSS variables for theming (`tailwind.cssVariables: true`)
- `cn()` utility (clsx + tailwind-merge) in `lib/utils.ts`

## UI Components

- **shadcn/ui** (new-york style) — components in `components/ui/`
- **Radix UI** primitives (dialog, alert-dialog, radio-group, tabs, label, slot)
- **Framer Motion** for scroll-triggered and flip animations
- **Embla Carousel** for image carousels
- **Lucide React** for icons
- **Sonner** for toast notifications
- **Vaul** for drawer components

## Code Quality

- **ESLint** (flat config) extending `next/core-web-vitals` and `next/typescript`
- **Prettier** with tailwind plugin (sorts classes via clsx/tw/cva functions)
  - No semicolons
  - Single quotes
  - Trailing commas: es5
  - 2-space indent

## Package Management

- npm (package-lock.json present)
- Yarn config (.yarnrc.yml) also present — prefer npm based on lock file

## Deployment

- **Vercel** (vercel.json config present)
- Remote images allowed from `storage.googleapis.com`

## Common Commands

```bash
# Development (uses Turbopack)
npm run dev

# Production build
npm run build

# Start production server
npm run start

# Lint
npm run lint
```

## Environment Variables

- `NEXT_PUBLIC_API_URL` — Backend API base URL (default: `http://localhost:4000`)
- `INVITATION_ORIGIN` — Public origin for OG image URLs (default: `https://maruplanner.com`)
