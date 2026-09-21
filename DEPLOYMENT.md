# CyberReady Deployment Guide

This deployment guide is intended for buyer diligence and post-acquisition handoff.

A hosted demo may be maintained separately by the seller for initial acquisition conversations. Buyers should use this guide to understand how the website and Hall Monitor platform can be redeployed under their own infrastructure after transfer.

CyberReady has two deployable surfaces:

- Hall Monitor: Express API, SQLite database, and built React/Vite client
- Website: Next.js marketing site

## Hall Monitor

Recommended platforms:

- Railway
- Render

The Hall Monitor server can serve the built React client in production.

### Build

```bash
cd hall-monitor
npm install
cd client
npm install
cd ..
npm run build
npm start
```

### Required Environment Variables

| Variable | Required | Notes |
|---|---:|---|
| `SESSION_SECRET` | Yes | Strong random string. Required in production. |
| `NODE_ENV` | Yes | Use `production` for hosted deployment. |
| `CORS_ORIGIN` | Yes | Public website or portal origin allowed by CORS. |
| `PORT` | Platform dependent | Railway and Render usually inject this. |
| `ANTHROPIC_API_KEY` | Optional | Enables AI-assisted finding extraction. |

### SQLite Production Note

SQLite is acceptable for the demo, MVP validation, and single-instance deployments. For a production SaaS or multi-tenant commercial launch, migrate the data layer to Postgres and add a formal migration workflow.

Recommended production hardening:

- Move from local SQLite files to managed Postgres.
- Move uploaded files from local disk to object storage.
- Configure secure session storage for multi-instance deployments.
- Add backup and restore procedures.
- Add monitoring, error tracking, and audit retention policies.

## Website

Recommended platforms:

- Netlify
- Vercel
- Cloudflare Pages

Netlify is recommended for the public acquisition landing page connected to the included domain. Vercel and Cloudflare Pages are acceptable alternatives for the Next.js website.

### Deploy

1. Import the repository into the selected hosting platform.
2. Set the project root directory to `website`.
3. Set `NEXT_PUBLIC_HALL_MONITOR_URL` to the hosted demo or buyer-controlled Hall Monitor portal.
4. Deploy.

### Required Environment Variables

| Variable | Required | Notes |
|---|---:|---|
| `NEXT_PUBLIC_HALL_MONITOR_URL` | Yes | Used by website buttons that open the hosted demo or buyer-controlled Hall Monitor portal. |

## Domain

The domain can point to the website hosting target first. A subdomain such as `app.yourdomain.com` can point to Hall Monitor. Exact DNS, registrar transfer, and ownership details should be handled in the written acquisition agreement.
