# CyberReady Website

This is the public marketing website for CyberReady. It presents CoSN CCRE-aligned cybersecurity assessment, the CAGR AI governance rubric, CAIRE workflow, and the Hall Monitor platform.

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
```

## Build

```bash
npm run build
npm start
```

## Deploy

Recommended platforms: Netlify, Vercel, or Cloudflare Pages.

Netlify is recommended for the public acquisition landing page connected to the included domain. Set the project root directory to `website` and configure `NEXT_PUBLIC_HALL_MONITOR_URL` to point at the hosted Hall Monitor demo or buyer-controlled portal.

## License

Proprietary. All rights reserved. See the root `LICENSE.md`.
