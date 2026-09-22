# CyberReady Website

This is the public acquisition website for CyberReady. It presents the Hall Monitor prototype, CoSN Cybersecurity Readiness for Education (CCRE)-aligned cybersecurity-governance workflow, CyberReady-created CAIRE/CAGR methodology (subject to seller authorship confirmation), and buyer diligence materials.

## Run Locally

```bash
cd website
npm install
npm run dev
```

Open http://localhost:3000.

## Environment

Copy `.env.example` to `.env.local`.

```env
NEXT_PUBLIC_HALL_MONITOR_URL=http://localhost:5173
NEXT_PUBLIC_ACQUISITION_EMAIL=<monitored-acquisition-inquiry-email>
```

## Build

```bash
npm run build
npm start
```

## Deploy

Recommended platforms: Netlify, Vercel, or Cloudflare Pages.

Netlify is recommended for the public acquisition landing page connected to the included domain. Set the project root directory to `website`, configure `NEXT_PUBLIC_HALL_MONITOR_URL` to point at the hosted Hall Monitor demo or buyer-controlled portal, and set `NEXT_PUBLIC_ACQUISITION_EMAIL` to a monitored inquiry address. The static form opens the visitor's email client; it does not send or store submissions itself.

## License

Proprietary. All rights reserved. See the root `LICENSE.md`.
