# MSFS Pilot Portal

Full-stack web app for MSFS pilots: duty clock, XP/class system, SimBrief, dispatch generator, live map, fleet maintenance, and toasts.

## Stack

- **Next.js** (App Router), **TypeScript**, **Tailwind CSS**
- **Lucide React** icons, **react-leaflet** for map
- Aviation dark theme (`#0a0a0a`), glassmorphism cards, white sidebar

## Setup

```bash
cd msfs-pilot-portal
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Features

- **Login/Register** — Full-screen auth with glass card (no backend; form only).
- **Sidebar** — Dashboard, Dispatch, Live Map, Fleet, Admin.
- **Duty** — Klok in/uit with live timer; state in localStorage.
- **XP & class** — `calculateXP(fpm)`: Butter (500), Firm (200), Hard (50 + alert). Levels unlock aircraft classes A–E.
- **SimBrief** — Fetch route, fuel, ETD by username; delay tracker (On-Time / Delayed).
- **Dispatch** — Random route by aircraft class with min runway check (e.g. D ≥ 2500 m).
- **Live Map** — World map (OpenStreetMap); Panic (7700) with red pulse and optional mayday sound.
- **Fleet** — Aircraft health; hard landings reduce health; &lt; 20% → In Maintenance, excluded from generator.
- **Toasts** — XP, promotions, system; optional ding sound (`public/sounds/ding.mp3`, `mayday.mp3`).

## Optional audio

Place in `public/sounds/`:

- `ding.mp3` — toast notifications
- `mayday.mp3` — panic alert

See `public/sounds/README.txt`.
