# CyberReady Setup Guide

This setup guide is intended for buyer evaluation and technical diligence.

A hosted demo environment may be provided separately to qualified acquisition prospects for initial review.

Local setup is preserved so buyers can verify transferability, inspect implementation, and confirm that the system can be operated independently after acquisition.

This guide helps a buyer or evaluator run the CyberReady asset package locally.

## Prerequisites

- Node.js 20 or newer recommended
- npm 10 or newer
- Git
- A modern browser

Optional:

- Anthropic API key for AI-assisted finding analysis in Hall Monitor
- Railway, Render, or similar Node hosting account for deployment testing
- Netlify, Vercel, or Cloudflare Pages account for website deployment testing

## Repository Layout

```text
CyberReady/
  hall-monitor/      Express API, SQLite database, React/Vite dashboard
  website/           Next.js marketing website
  sale-package/      Buyer handoff documentation
```

## Run Hall Monitor Locally

```bash
cd hall-monitor
npm install
cd client
npm install
cd ..
npm run dev
```

Local URLs:

- Hall Monitor frontend: http://localhost:5173
- Hall Monitor API: http://localhost:3001

The SQLite database file `hallmonitor.db` is created automatically on first startup. Seed data is inserted automatically when the database is empty.

## Run The Website Locally

```bash
cd website
npm install
npm run dev
```

Local URL:

- Website: http://localhost:3000

The website uses `NEXT_PUBLIC_HALL_MONITOR_URL` to link to the Hall Monitor portal. For local evaluation, use `http://localhost:5173`.

## Environment Variables

Create `hall-monitor/.env` from `hall-monitor/.env.example`.

```env
SESSION_SECRET=replace-with-a-strong-random-string
NODE_ENV=development
PORT=3001
CORS_ORIGIN=http://localhost:5173
ANTHROPIC_API_KEY=

# Required before a new synthetic demo database can be seeded. Use unique values; do not commit them.
DEMO_ADMIN_USER=<unique-demo-admin-username>
DEMO_ADMIN_PASS=<unique-demo-admin-password>
DEMO_DISTRICT_IT_USER=<unique-demo-district-it-username>
DEMO_DISTRICT_IT_PASS=<unique-demo-district-it-password>
DEMO_SUPERINTENDENT_USER=<unique-demo-superintendent-username>
DEMO_SUPERINTENDENT_PASS=<unique-demo-superintendent-password>
DEMO_RESET_ENABLED=false
```

Create `website/.env.local` from `website/.env.example`.

```env
NEXT_PUBLIC_HALL_MONITOR_URL=http://localhost:5173
NEXT_PUBLIC_ACQUISITION_EMAIL=<monitored-acquisition-inquiry-email>
```

## Demo setup

Use `DEMO_SETUP.md` to create an isolated local demo database and credentials. Do not publish, reuse, or rely on repository seed-account credentials for a hosted or buyer-accessible environment.

The platform administrator starts in portfolio overview mode. District users start in their assigned district view.

## Common Troubleshooting

### Port already in use

Stop the existing process or change `PORT` for the API. Vite defaults to port 5173 and Next.js defaults to port 3000.

### Login does not show seed data

Delete the local SQLite runtime files and restart the API:

```bash
cd hall-monitor
rm -f hallmonitor.db hallmonitor.db-shm hallmonitor.db-wal
npm run dev
```

On Windows PowerShell:

```powershell
Remove-Item hallmonitor.db,hallmonitor.db-shm,hallmonitor.db-wal -ErrorAction SilentlyContinue
npm run dev
```

### AI finding analysis is unavailable

Set `ANTHROPIC_API_KEY` in `hall-monitor/.env`. The app still works without it and falls back to manual finding entry.

### Website links to the wrong portal

Set `NEXT_PUBLIC_HALL_MONITOR_URL` in `website/.env.local`, then restart the Next.js dev server.
