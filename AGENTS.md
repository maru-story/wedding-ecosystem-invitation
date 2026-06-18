# AGENTS.md — Invitation Project Directory & Architecture Map

> This document details the code layout, key directories, entry points, and common development patterns for agents.

---

## Directory Map

```
app/
├── [eventSlug]/
│   ├── layout.tsx     → Event-level layout (loads InvitationProvider, Toaster, OrientationLock)
│   └── page.tsx       → Personalization entry (fetches data, generates dynamic metadata)
├── favicon.ico
├── globals.css        → Tailwind 4 directives and custom local @font-face loaders
├── layout.tsx         → HTML and Body root wrapper tags (ISR & 404 safe)
├── not-found.tsx      → 404 fallback page
└── page.tsx           → Root redirect (calls notFound() directly)

components/
├── assets/            → Static images and local SVG vector assets (flowers, frames)
├── common/            → Features/sections of the wedding invitation page
│   ├── card-open-wedding.tsx        → Invitation cover page
│   ├── section-home-with-loading.tsx → Minecraft loader and cover container
│   ├── section-konfirmasi.tsx       → Attendance form (RSVP)
│   ├── section-pesan.tsx            → Wishes submit and list component
│   └── orientation-lock.tsx         → Landscape lock modal
├── context/
│   └── provider.tsx   → Global invitation state (isInvitationOpen, progress, loading)
└── ui/                → Tailwind 4 compatible shadcn/Radix components

lib/
├── api.ts             → Fetch handlers, endpoints mapping, interface models
└── utils.ts           → Utility helper functions (clsx, tailwind-merge)
```

---

## Key Entry Points

| Task | Location |
|---|---|
| Modifying dynamic layouts | [`app/[eventSlug]/page.tsx`](file:///home/mochrafi/wedding-project/wedding-ecosystem-invitation/app/[eventSlug]/page.tsx) |
| Adding API endpoints or data types | [`lib/api.ts`](file:///home/mochrafi/wedding-project/wedding-ecosystem-invitation/lib/api.ts) |
| Editing custom styles or global CSS rules | [`app/globals.css`](file:///home/mochrafi/wedding-project/wedding-ecosystem-invitation/app/globals.css) |
| Adjusting state transitions or scroll hooks | [`components/context/provider.tsx`](file:///home/mochrafi/wedding-project/wedding-ecosystem-invitation/components/context/provider.tsx) |
| Editing individual page sections | [`components/common/`](file:///home/mochrafi/wedding-project/wedding-ecosystem-invitation/components/common/) |

---

## Core Gotchas & Quirks

1. **Standalone Status**: This app is disconnected from any local database. Never import Prisma or attempt to call database query APIs locally. Use fetch functions in `lib/api.ts` pointing to the monorepo backend.
2. **Revalidation**: Fetch requests in `lib/api.ts` (like `fetchInvitationData` and `fetchEventBySlug`) are set to revalidate every 60 seconds (`next: { revalidate: 60 }`) for Incremental Static Regeneration.
3. **Minecraft Loading Progress**: The progress simulation inside `SectionHome` checks for `IS_VISITED` in `localStorage` to bypass loading animations on subsequent page reloads.
4. **Orientation Lock**: The `OrientationLock` component runs on client side and locks landscape orientation on mobile screen API change events.
5. **Cross-Repository References**: The API endpoints, shared Zod validations, and Prisma database schema definitions reside inside the main `wedding-ecosystem` monorepo.
   - On the primary dev machine, the path is `/home/mochrafi/wedding-ecosystem`.
   - On other devices, check `../../wedding-ecosystem` or sibling `../wedding-ecosystem`.
   - Access monorepo files directly using these relative/absolute paths to inspect data shapes or code when working on the invitation repo.
