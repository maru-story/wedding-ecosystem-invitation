# Project Structure

```
├── app/                        # Next.js App Router
│   ├── layout.tsx              # Root layout (html/body)
│   ├── page.tsx                # Landing / root page
│   ├── not-found.tsx           # 404 page
│   ├── globals.css             # Global styles & Tailwind imports
│   ├── [eventSlug]/            # Dynamic event route
│   │   ├── layout.tsx          # Event layout (max-w-md, providers, toaster)
│   │   └── page.tsx            # Main invitation page (composes all sections)
│   └── invoice/                # Invoice page
│       └── page.tsx
├── components/
│   ├── common/                 # Wedding section components (section-*.tsx)
│   ├── ui/                     # shadcn/ui primitives (button, input, dialog, etc.)
│   ├── context/                # React context providers
│   │   └── provider.tsx        # InvitationProvider (wraps event pages)
│   └── assets/                 # Static assets organized by section
│       └── images/
│           ├── section-gift/
│           ├── section-konfirmasi/
│           └── ...
├── lib/
│   ├── api.ts                  # API client (fetch invitations, RSVP, messages)
│   ├── utils.ts                # cn() utility
│   └── models/                 # Data model types (currently empty)
├── hooks/                      # Custom React hooks (currently empty)
├── constant/                   # Constants/config data (currently empty)
└── public/                     # Static public assets
```

## Conventions

- **Section components**: Named `section-{name}.tsx` in `components/common/`. Each represents a full-viewport section of the invitation.
- **UI components**: Generated via shadcn/ui CLI into `components/ui/`. Do not manually edit these.
- **Assets**: SVG and image assets colocated under `components/assets/images/section-{name}/`.
- **Path aliases**: `@/*` maps to project root (e.g., `@/components/ui/button`).
- **Client components**: Mark with `'use client'` directive when using hooks, state, or browser APIs.
- **Server components**: Default for pages and layouts. Data fetching happens server-side.
- **API layer**: All backend calls go through `lib/api.ts`. No direct fetch calls in components.
