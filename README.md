# CyberReady

**K-12 Cybersecurity and AI Governance Platform**

CyberReady is currently being offered as a purpose-built K–12 cybersecurity and AI-governance asset package for strategic acquisition.

This repository represents a transfer-ready asset package, including a working prototype platform, governance frameworks, documentation, and a market-facing website.

CyberReady is a structured cyber governance evaluation system built for school districts. It gives superintendents, school boards, and district leaders the governance-level visibility they need to understand, measure, and improve cybersecurity and AI governance posture without requiring technical expertise.

Cybersecurity maturity uses the **CyberReady Cybersecurity Readiness Rubric (CCRR) v1.0** and **CyberReady Cybersecurity Evidence Assessment Methodology (CEAM) v1.0**, aligned to NIST CSF 2.0 as an external reference architecture. AI-governance maturity uses the CyberReady AI Governance Rubric (CAGR) and CAIRE evidence-review workflow mapped to NIST AI RMF 1.0. CyberReady does not claim ownership of NIST frameworks or third-party framework materials.

**Current Status: Functional Prototype / Transfer-Ready Asset Package**

CyberReady is suitable for controlled buyer diligence, local evaluation, MVP continuation, and operator-led go-to-market packaging. It is not yet production-hardened as a multi-tenant SaaS. Production hardening needs are listed below and in `KNOWN_LIMITATIONS.md`.

## Acquisition Positioning

CyberReady packages a market-facing brand, a working Hall Monitor platform, structured CCRR/CEAM and CAIRE assessment workflows, and buyer documentation in this public evaluation repository. A buyer receives a starting point for consulting, SaaS, managed-service, governance assessment, and board-reporting delivery models for school districts. See `PUBLIC_REPOSITORY_REMEDIATION.md` for the recommended public-versus-controlled diligence boundary.

## What A Buyer Receives

- Hall Monitor app: Express API, SQLite seed database, React/Vite dashboard, role-based district and admin views.
- CyberReady website: Next.js marketing site with platform, district, Hall Monitor, insights, and contact pages.
- CCRR/CEAM cybersecurity readiness assessment structure mapped to NIST CSF 2.0.
- CAIRE AI-governance self-assessment using the CAGR rubric mapped to NIST AI RMF 1.0.
- Executive-summary, indicative insurance-readiness, findings, compliance, and roadmap views.
- Buyer handoff and technical documentation. Standalone third-party/reference archives are deliberately excluded from this public sale package pending rights review.
- Candidate domain/brand assets, subject to seller title confirmation and written acquisition agreement.

The public repository is not by itself a complete transaction schedule. Controlled technical, IP, security, historical, and transfer materials should be shared only after appropriate diligence review and a written agreement.

## Transfer Model

CyberReady is being offered as a clean asset transfer.

The acquiring party receives:
- Full repository access
- Platform code and documentation
- Website and branding assets
- Seller-authored governance methodology and materials, subject to authorship confirmation
- Domain transfer, only if expressly included in a written agreement

No ongoing founder involvement is required unless separately negotiated.

## Ideal Acquirer

CyberReady is best suited for:
- Cybersecurity firms expanding into K-12
- Governance, risk, and compliance providers
- EdTech platforms
- AI governance organizations
- Technical founders seeking a structured market entry

The system is designed to accelerate time-to-market by providing a complete governance model and prototype platform.

## How To Evaluate CyberReady

Buyers can evaluate CyberReady in two ways:

1. Hosted demo walkthrough: recommended for initial review and acquisition conversations.
2. Local repository setup: recommended for technical diligence before transfer.

A hosted demo environment may be provided separately to qualified buyers. Full technical materials, repository access, and domain transfer remain subject to a written acquisition agreement.

### Hosted Demo Review

Qualified buyers may request access to a hosted Hall Monitor demo environment. Demo access is intended to show the platform experience, assessment workflows, executive reporting, and acquisition potential without requiring local setup.

### Local Technical Review

For technical diligence, buyers can run the system locally:

1. Read `SETUP.md` and `DEPLOYMENT.md`.
2. Run Hall Monitor from `hall-monitor/` with `npm run dev`.
3. Follow `DEMO_SETUP.md` to create an isolated local demo database and unique credentials.
4. Review the admin portfolio dashboard.
5. Sign in with the locally configured district account and review the district dashboard.
6. Open the CCRR/CEAM cybersecurity and CAIRE AI-governance assessment workspaces.
7. Review the executive summary, indicative insurance-readiness input, findings, and compliance.
8. Run the website from `website/` with `npm run dev` and open http://localhost:3000.

## Known Production Hardening Needed

- Migrate Hall Monitor from SQLite to Postgres for production SaaS use.
- Move file uploads from local disk to object storage.
- Add managed session storage for multi-instance deployments.
- Add CI, monitoring, error tracking, backup, and restore procedures.
- Add SSO, MFA, tenant provisioning, and billing if launching commercially.
- Confirm framework/brand and source-material rights before any buyer distributes or commercializes product-bound mappings.

---

## Repository Structure

```
CyberReady/
├── hall-monitor/        # The platform application (Express API + React dashboard)
│   ├── server/          # Node.js/Express backend
│   └── client/          # React + Vite frontend
├── website/             # Marketing website (Next.js)
└── sale-package/        # Buyer handoff documentation
```

---

Start with `ACQUISITION_BRIEF.md`, `TECHNICAL_ARCHITECTURE.md`, `PUBLIC_REPOSITORY_REMEDIATION.md`, and `FINAL_DILIGENCE_REVIEW.md` during diligence. Supplemental handoff materials are in `sale-package/`.

Key diligence records:

- `ACQUISITION_AUDIT.md` — repository inventory and baseline review
- `IP_OWNERSHIP_AND_LICENSES.md` — ownership/rights questions and proposed treatment
- `CCRR_CEAM_IMPLEMENTATION_REPORT.md` — canonical methodology, migration, validation, and acceptance-criteria record
- `CCRE_COSN_TERMINOLOGY_AUDIT.md` — CCRE/CoSN terminology classification and historical/provenance positioning
- `SECURITY_REVIEW.md` — source-security findings, corrections, and verification results
- `WEBSITE_ASSET_PROVENANCE.md` — static asset/media provenance questions
- `KNOWN_LIMITATIONS.md` and `TRANSFER_PLAN.md` — buyer opportunities and proposed transfer boundary

## Hall Monitor

Hall Monitor is the operational platform of CyberReady. It is the tool used by district IT staff and platform administrators to conduct self-assessments, manage findings, track compliance, and generate board-ready reports.

### Tech Stack

| Layer | Technology |
|---|---|
| Backend | Node.js · Express 5 · better-sqlite3 |
| Frontend | React 19 · Vite · Tailwind CSS 4 |
| Routing | React Router 7 (HashRouter) |
| Charts | Recharts |
| Icons | Lucide React |
| AI Analysis | Anthropic SDK (Claude) |
| File Parsing | Multer · Mammoth (DOCX) |

### Architecture

The app uses a monorepo structure with a shared `package.json` at `hall-monitor/`. The Express server serves both the API and (in production) the Vite-built client.

```
hall-monitor/
├── server/
│   ├── index.js           # Express API server (all routes)
│   ├── database.js        # SQLite schema, migrations, seed data
│   └── report-generator.js
├── client/
│   ├── src/
│   │   ├── pages/         # Routed page components
│   │   ├── components/    # Shared UI components
│   │   ├── context/       # Auth and Theme context providers
│   │   ├── utils/api.js   # API client layer
│   │   └── data/          # CCRR/CEAM and AI-governance data layers
│   └── public/
└── package.json
```

### Pages

| Route | Page | Roles |
|---|---|---|
| `/` | Dashboard | All |
| `/risks` | Findings & Recommendations | Admin, IT |
| `/compliance` | Governance Compliance | All |
| `/self-assessment` | Self-Assessment Audit | Admin, IT |
| `/assessment` | Cybersecurity governance assessment | All |
| `/ai-governance` | AI Governance Systems | Admin, IT, Superintendent |
| `/executive` | Executive Summary | All (district view only) |
| `/audit-log` | Evaluation History | Admin, IT |

### User Roles

- **`platform_admin`**: Cross-district overview. Manages all districts, manages CCRR/CEAM cybersecurity assessments, and reviews findings and assessment requests. No Executive Summary appears in admin overview mode (it renders the Admin Dashboard instead).
- **`district_it`**: District-level IT staff. Completes self-assessments, manages findings, and views their district's compliance and evaluation data.
- **`superintendent`**: Read-only governance view. Sees the executive summary, compliance status, and assessment results for their district.

### Admin Dashboard

When a `platform_admin` has no district selected, every sidebar link routes to the **Admin Dashboard**, a tabbed interface with six views:

| Tab | Description |
|---|---|
| Dashboard | KPI cards, portfolio maturity ring, findings by priority, districts table |
| Findings & Recommendations | Aggregate finding counts by priority, per-district findings sorted by severity |
| Governance Learning | Sample completion status per district and pending learning requests |
| Governance Compliance | Overall compliance rate, per-district compliance bars |
| Self-Assessment Audit | District self-assessment status, audit request tracking, scheduling |
| Evaluation History | Cybersecurity-governance assessments recorded across all districts |

Clicking any district in the table calls `switchDistrict()` and reloads the page, rendering the full district IT layout.

### Cybersecurity assessment

Hall Monitor's active cybersecurity assessment workflow implements **CCRR v1.0** and **CEAM v1.0** across **6 NIST CSF 2.0 alignment functions** and **18 CyberReady Readiness Domains** on a **five-level maturity scale** (Ad Hoc, Developing, Established, Measured, Resilient). NIST identifiers remain external reference metadata; CCRR/CEAM are not a NIST certification or independently certified audit.

| Level | Label | Color |
|---|---|---|
| L1 | Ad Hoc | Red |
| L2 | Developing | Orange |
| L3 | Established | Amber |
| L4 | Measured | Blue |
| L5 | Resilient | Green |

Each CCRR domain has structured guided questions, five maturity criteria, evidence expectations, common gaps, and canonical advancement actions. The implemented workflow records and supports:
- Separate current and target maturity (1–5), with confidence stored as a qualitative assessment rather than a score multiplier
- Six Function scores and an overall score calculated as an equal-weighted average of the six Function scores once all are represented
- CEAM evidence records, seven CEAM gap types, independent critical-gap indicators, and sequential roadmap transitions
- A district/platform dashboard and executive-summary API view; a new CCRR-specific downloadable report generator is not implemented

### CAIRE And CAGR AI Governance

CyberReady also includes AI-governance assessment coverage. CAGR is the CyberReady AI Governance Rubric. CAIRE is CyberReady's evidence-review workflow for documenting AI-governance maturity through interviews, notes, evidence, and board-ready findings. Hall Monitor scores AI governance across the NIST AI RMF 1.0 functions: GOVERN, MAP, MEASURE, and MANAGE. Seller authorship and ownership of CAIRE/CAGR should be confirmed for the transaction schedule.

### Findings & Recommendations

District IT staff can upload findings documents (`.txt`, `.docx`, `.pdf`) which are parsed and optionally analyzed by Claude AI to extract structured findings with NIST function tags and priority levels (Critical / High / Medium / Low). Findings can also be created manually. When `ANTHROPIC_API_KEY` is set, AI analysis is enabled; otherwise the app falls back gracefully to manual entry.

### Running Locally

```bash
# Install dependencies
cd hall-monitor
npm install
cd client && npm install && cd ..

# Start development (API + frontend concurrently)
npm run dev

# API runs on http://localhost:3001
# Frontend runs on http://localhost:5173
```

**Environment variables** (create `hall-monitor/.env`):

```env
SESSION_SECRET=your-secret-here
ANTHROPIC_API_KEY=<buyer-provided-key>   # Optional, enables AI findings analysis
PORT=3001
```

Set the required synthetic-demo role values before first run; use `DEMO_SETUP.md` rather than placing credentials in this file.

### Database

SQLite via `better-sqlite3`. The database file (`hallmonitor.db`) is auto-created on first run. Schema migrations run automatically on startup, no manual migration steps needed.

Key active methodology tables: `ccrr_assessments`, `ccrr_domain_assessments`, `ccrr_evidence`, `ccrr_findings`, and `ccrr_roadmap_items`. Legacy `self_assessments`, `assessments`, and related CCRE/Cybersecurity Rubric tables remain preserved for historical compatibility; they are neither altered nor automatically score-converted. Legacy masterclass tables also remain for historical compatibility but are not exposed in the Hall Monitor interface.

---

## Website

The CyberReady marketing and public-facing website. Built with Next.js App Router and Tailwind CSS 4.

### Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| React | React 19 |
| Styling | Tailwind CSS 4 · Geist font |
| Rendering | Static (all pages pre-rendered) |

### Pages

| Route | Description |
|---|---|
| `/` | Home: hero, problem/solution, How It Works (4 steps), Hall Monitor preview, differentiators, platform background, insights preview, CTA |
| `/platform` | CCRR/CEAM methodology, NIST alignment, reporting outputs, Hall Monitor features, governance cycle |
| `/for-school-districts` | District-specific value proposition |
| `/workforce-pathway` | K-12 cybersecurity career pipeline |
| `/insights` | Articles and analysis on K-12 cyber governance |
| `/about` | Platform background and development context |
| `/contact` | Acquisition inquiry and access request form |
| `/privacy-policy` | Privacy policy |
| `/terms-of-use` | Terms of use |

### Hall Monitor Preview Components

The website includes interactive mock dashboard components that mirror the actual Hall Monitor app UI:

- `DashboardPreview`: Full district view: maturity ring, L1–L5 scale strip, 6 NIST function cards, Q1 roadmap preview
- `ScoreGauge`: Standalone maturity ring (0–5 scale)
- `NistFunctionBar`: Per-function maturity bars
- `MaturityCard`: Level segment display

These use the same color palette and layout as the live app so prospective buyers can understand the platform experience quickly.

### Running Locally

```bash
cd website
npm install
npm run dev
# Runs on http://localhost:3000
```

```bash
npm run build   # Production build
npm start       # Serve production build
```

---

## Deployment

### Hall Monitor

Recommended platform: Railway

1. From the hall-monitor/ directory:
   cd hall-monitor
   railway init
   railway up

2. Set these environment variables in the Railway dashboard:
   SESSION_SECRET    A strong random string (required)
   NODE_ENV          production
   CORS_ORIGIN       https://your-website-domain.com

3. The SQLite database (`hallmonitor.db`) is created automatically on first startup. The reset route is disabled unless `DEMO_RESET_ENABLED=true` and must only be used for a verified synthetic demo database. Never reset a real-data instance from the application.

For an isolated local demo, use the credential process in `DEMO_SETUP.md`. Do not publish or reuse seed credentials in an internet-accessible environment.

### Website

Recommended platforms: Netlify, Vercel, or Cloudflare Pages.

Netlify is recommended for a low-cost public acquisition landing page connected to the included domain. Vercel or Cloudflare Pages are also suitable for the Next.js website.

1. Import the repository into the hosting platform.
2. Set the root directory to: website
3. Set `NEXT_PUBLIC_HALL_MONITOR_URL` to the hosted Hall Monitor demo or buyer-controlled deployment.
4. Set `NEXT_PUBLIC_ACQUISITION_EMAIL` to a monitored acquisition-inquiry email address.
5. Deploy. The hosting platform should detect the Next.js website configuration.

---

## External-framework and credential provenance

CyberReady's active cybersecurity workflow is CCRR/CEAM. NIST CSF 2.0 identifiers are external reference metadata and are not a NIST certification, endorsement, or product integration. CCRE-related material retained in the repository is historical, credential, provenance, or compatibility material subject to separate rights review; CyberReady does not claim ownership, certification authority, endorsement, or programme affiliation.

| Function | Focus |
|---|---|
| **Govern** | Organizational governance, policy, and oversight |
| **Identify** | Asset management, risk assessment, and organizational context |
| **Protect** | Identity management, data security, and platform protection |
| **Detect** | District monitoring and anomaly-analysis practices (assessed; not a Hall Monitor telemetry feed) |
| **Respond** | Incident response planning and execution |
| **Recover** | Recovery planning and business continuity |

Each Function includes one or more CCRR domains. Maturity is rated L1–L5. Hall Monitor supports structured evidence review; qualification, certification, or external-validation claims must be independently substantiated outside the application.

---

## Origin

CyberReady was developed by an educator and **CoSN Cybersecurity Readiness for Education (CCRE) Practitioner** with experience in K-12 governance, cybersecurity, and AI systems.

The system was designed to bridge the gap between technical cybersecurity controls and executive-level governance visibility for school districts.

CyberReady is now being offered as a transfer-ready asset for acquisition by an organization positioned to develop and scale it.

---

## License

Proprietary. All rights reserved. See `LICENSE.md`.

CyberReady is positioned as a transfer-ready system for an operator or organization prepared to execute and scale within the K–12 cybersecurity and AI governance market.
