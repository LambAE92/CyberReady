# CyberReady Technical Architecture

**As implemented at the acquisition-readiness audit snapshot.** This document distinguishes working code from prototype assumptions and future recommendations. It does not describe planned functionality as implemented.

## System overview

CyberReady has two independently deployable surfaces:

```text
CyberReady
├─ Website (Next.js static export)
│  └─ Buyer/district marketing pages and static Hall Monitor previews
└─ Hall Monitor (single Node.js process)
   ├─ React/Vite dashboard client
   ├─ Express API and session authentication
   ├─ SQLite runtime database
   ├─ CCRR/CEAM assessment and executive-summary views
   └─ Optional Anthropic-powered finding extraction
```

The website links to Hall Monitor through `NEXT_PUBLIC_HALL_MONITOR_URL`. The website does not call the Hall Monitor API or share a database with it.

## Implemented

### Hall Monitor frontend

- React 19 and Vite 8 SPA, using `HashRouter`.
- Tailwind CSS 4, Recharts, and Lucide React.
- Auth and theme contexts; authenticated fetch client uses same-origin `/api` calls and session cookies.
- Role-aware pages for dashboards, risks, compliance, CCRR/CEAM assessment, AI governance, executive summary, and audit log. The former Masterclass page is retained in source but is not routed, linked, or rendered.
- Platform-administrator overview and selectable district context; district and superintendent views.

### Hall Monitor backend

- Node.js CommonJS service using Express 5.
- JSON middleware, CORS constrained to `CORS_ORIGIN` (default local Vite origin), and `express-session` cookies.
- Bcrypt password-hash comparison and login-specific rate limiting.
- API routes for authentication, districts, metrics, risk status/notes, training, phishing metrics, compliance, CCRR/CEAM assessment, AI-system inventory/rating, historical report access, audit requests, audit log, findings uploads, and demo reset. Legacy Masterclass and CCRE/Cybersecurity Rubric API/data code remains for historical compatibility but is not exposed through the current assessment interface.
- Server-side role checks and district predicates on most scoped routes. The retained legacy masterclass completion update remains explicitly district-scoped after the acquisition-readiness fix.
- Production mode serves the built Vite client from the Express process.

### Database and data model

- SQLite via `better-sqlite3`; `hallmonitor.db` is created locally at first start.
- WAL journaling and foreign-key pragma enabled.
- Startup schema creation plus best-effort inline migrations.
- Data model supports districts, users/roles, dashboard metrics, risks, training, phishing simulations, compliance entries, CCRR assessments/domain assessments/evidence/findings/roadmap items, AI systems/ratings, historic reports, uploads, requests, and audit events.
- Seed workflow creates the fictional Pine Ridge Unified School District and associated CyberReady-created demo data when the database is empty. The active seeded demonstration identity is documented in `DEMO_DATA_PROVENANCE.md`.

### Assessment and reporting engine

- Cybersecurity workflow uses CCRR v1.0: 18 CyberReady Readiness Domains grouped into all six NIST CSF 2.0 Functions, with NIST identifiers as external reference metadata. CEAM v1.0 stores separate current/target maturity, qualitative confidence, structured evidence, seven gap types, independent critical gaps, sequential advancement actions, and linked reassessments. Overall maturity is the equal-weighted average of the six Function scores, not a simple 18-domain average.
- AI governance workflow records AI systems, lifecycle/oversight information and ratings across GOVERN, MAP, MEASURE, and MANAGE. The current data model contains 19 top-level AI governance categories with underlying prompts/guidance.
- Executive and dashboard views summarize CCRR Function maturity, findings, compliance, training, and selected insurance-readiness indicators. Current reporting uses CCRR/CEAM data; it is not a certification or control-validation output.
- The historic DOCX report generator and historic report BLOB access remain preserved for existing records, but new CCRE/Cybersecurity Rubric report generation is retired. A CCRR-specific downloadable report generator is not implemented.

### Optional AI-assisted finding extraction

- Users with the appropriate role can upload text, DOC/DOCX, or PDF files up to 10 MB in memory.
- DOCX is parsed with Mammoth; PDF handling is a basic text-layer fallback.
- If `ANTHROPIC_API_KEY` is configured, the service sends a capped portion of text plus district context to Anthropic Claude and persists returned findings. Without the key, the workflow remains usable for manual findings.

### Website

- Next.js 16 / React 19 / TypeScript / Tailwind CSS 4.
- Static export (`output: "export"`) with unoptimized images and trailing-slash URLs.
- Marketing pages, insight articles, policy/terms pages, product positioning, and static dashboard previews.
- The acquisition-inquiry form opens a prefilled `mailto:` draft only when public `NEXT_PUBLIC_ACQUISITION_EMAIL` is configured. It has no server-side submission, CRM, database, consent-capture, or delivery confirmation.

## Prototype characteristics

| Area | Current behavior | Consequence |
| --- | --- | --- |
| Database | Single local SQLite file | Suitable for demo/single-instance use; not a production multi-instance data layer |
| Sessions | Default `express-session` memory store | Sessions do not share across instances and are not durable on restart |
| File storage | Text/extracted findings stored in SQLite; uploads handled in memory | No object-store, malware scanning, retention policy, or durable file lifecycle |
| Data | Synthetic seed data and static site previews | Not evidence of production customers, live telemetry, or real district operation |
| Reporting | Current CCRR/CEAM dashboard and executive-summary views; historic DOCX report BLOB access | A CCRR-specific downloadable report and production file-storage strategy remain buyer opportunities |
| Website contact | Static `mailto:` draft configured by public environment variable | No server-side lead delivery, CRM, database, consent capture, or delivery confirmation |
| Deployment | Manual-host instructions | No CI/CD, IaC, container, health endpoint, observability, or backup automation |

## Planned or not evidenced as implemented

The repository does **not** demonstrate billing/subscription management, customer provisioning, invitations, password reset, SSO/MFA/SCIM, managed multi-tenancy, live device/security-tool integrations, scheduled reassessment, automated evidence collection, continuous monitoring feeds, insurance-carrier integrations, CRM capture, production backup/restore, alerting, or a formal support operation.

References to hosting providers (Railway, Render, Netlify, Vercel, Cloudflare Pages) are deployment options in documentation, not committed infrastructure configuration or proof of a live deployment.

## Recommended for production

1. Replace SQLite with managed Postgres and a versioned migration workflow.
2. Use managed, encrypted object storage for evidence and generated reports; add anti-malware, content validation, quotas, retention, and deletion workflows.
3. Replace the memory session store with a managed store; add enterprise identity, MFA, invitation/provisioning, and role/tenant authorization tests.
4. Add CSRF protection appropriate to the deployment topology, baseline security headers, trusted-proxy configuration validation, centralized secret management, and rate limiting beyond login.
5. Define AI-data transmission controls, consent, redaction, vendor configuration, error handling, retention, and opt-in behavior before processing real district content.
6. Add CI for lockfile-based dependency installation, lint/build/test, SCA/SBOM, secret scanning, and deployment checks.
7. Add structured logging, error tracking, health/readiness endpoints, monitoring, backup/restore tests, incident runbooks, and capacity testing.
8. The public package excludes standalone reference/archive materials; obtain rights review for product-bound framework mappings and maintain approved framework/brand language in reports and marketing.

## Major dependencies

| Layer | Dependencies |
| --- | --- |
| Server | Express, better-sqlite3, express-session, bcryptjs, cors, express-rate-limit, multer, mammoth, docx, dotenv, Anthropic SDK |
| Hall Monitor client | React, React Router, Vite, Tailwind, Recharts, Lucide |
| Website | Next.js, React, TypeScript, Tailwind |

Package manifests and npm lockfiles are present. An SBOM, dependency-licence inventory, and reproducible clean-install audit should be created before closing.

## Deployment model

```text
Static website host
  └─ CyberReady website export
       └─ link via NEXT_PUBLIC_HALL_MONITOR_URL

Node host (single Hall Monitor instance)
  ├─ Express API + built Vite assets
  ├─ session memory in process
  ├─ local SQLite file
  └─ optional outbound Anthropic API request
```

This is a simple buyer-evaluation/MVP deployment model. A buyer may retain it for isolated demonstrations while designing production infrastructure separately.

## Scaling limitations

- SQLite write concurrency and local-disk persistence constrain multi-instance scale.
- In-process sessions prevent horizontal scaling without a shared store.
- In-memory 10 MB uploads can add memory pressure; parsing/AI requests occur in the request path.
- Report BLOBs and extracted text enlarge the operational database.
- No async job queue, cache, CDN strategy, background processing, performance baselines, or load tests are present.
- Large reference assets and a long Windows path can complicate cloning/checkouts; Git long-path support was required for this audit checkout.
