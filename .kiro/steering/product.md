# Product Overview

Wedding Ecosystem Invitation is a digital wedding invitation web app. It renders personalized, mobile-first invitation pages for wedding guests.

## Core Functionality

- Dynamic invitation pages per event and guest (URL: `/{eventSlug}?to={guestSlug}`)
- RSVP confirmation (akad, resepsi, both, or decline)
- Guest messaging / wishes board with pagination
- Wedding gift / digital angpao section
- Countdown timer to event date
- Background music player
- Photo gallery and video embed
- Love story timeline
- OpenGraph metadata personalized per guest for social sharing

## Architecture

- Frontend-only Next.js app that consumes a separate backend API (`NEXT_PUBLIC_API_URL`)
- Data is fetched server-side at request time with ISR (60s revalidation)
- Guest personalization comes from `?to=` query param mapped to a guest slug
- Content is organized as composable section components rendered in sequence
- Mobile-first design constrained to max-width 448px (max-w-md), portrait orientation enforced

## Language

UI copy and user-facing text are in Bahasa Indonesia.
