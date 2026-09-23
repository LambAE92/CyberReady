# HallMonitor

**K-12 Cybersecurity and AI Governance Operations Dashboard by CyberReady**

Hall Monitor is CyberReady's prototype K–12 cybersecurity and AI-governance operating platform. It records governance assessments, evidence, findings, maturity scoring, remediation planning, and executive-reporting views over time. It does not ingest real-time security telemetry from district SIEM, EDR, network, or identity systems.

Its active cybersecurity workflow implements CyberReady's **CCRR v1.0** and **CEAM v1.0**, with NIST CSF 2.0 identifiers retained solely as external reference metadata. Its separate CAIRE AI-governance evidence-review workflow uses the CAGR rubric mapped to NIST AI RMF 1.0. Historical CCRE/Cybersecurity Rubric records and source remain preserved for compatibility and provenance; they are not converted into CCRR scores or used by current cybersecurity dashboards.

## Features

- **Dashboard**: CCRR cybersecurity maturity across six equally weighted NIST CSF 2.0 Function scores, separate CAIRE/CAGR AI maturity, findings, compliance, and roadmap views. Metric values are application data, not direct security telemetry.
- **Risks & Vulnerabilities**: Track and manage cybersecurity findings with severity/status filtering, status changes, recommended actions, and notes.
- **Training & Phishing Metrics**: Record/view staff training completion and phishing-simulation trends by department; buyers must validate or configure any live data source separately. The former in-app Masterclass workflow is intentionally omitted; the sidebar links to CoSN's external interest form.
- **Compliance & Reporting**: Governance-readiness tracking, CCRR/CEAM executive-summary views, and historical-report access. Outputs are not independent validation, legal advice, or a certification. The legacy CCRE/Cybersecurity Rubric DOCX generator is intentionally retired for new assessments.
- **CCRR/CEAM Assessment**: Evaluate cybersecurity maturity across 18 CyberReady Readiness Domains and all six NIST CSF 2.0 Function groupings. The workflow records independent current and target maturity, non-mathematical confidence, structured evidence, seven gap types, critical gaps, and sequential advancement actions.
- **Executive Summary**: Governance overview with CCRR Function maturity, top priority risks, progress tracking, and recommended next steps. It is not an independently validated board report.
- **Dark Mode**: Full light/dark theme support across all pages.

## Tech Stack

| Layer    | Technology                                              |
|----------|---------------------------------------------------------|
| Frontend | React 19, Vite 8, Tailwind CSS 4, Recharts, Lucide     |
| Backend  | Express 5, Node.js                                      |
| Database | SQLite (better-sqlite3) with WAL mode                   |
| Auth     | Session-based with bcrypt password hashing               |

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Installation

```bash
git clone https://github.com/LambAE92/hall-monitor.git
cd hall-monitor

# Install server dependencies
npm install

# Install client dependencies
cd client && npm install && cd ..
```

### Development

```bash
npm run dev
```

This starts both the Express API server (port 3001) and the Vite dev server (port 5173) concurrently.

### Production

```bash
npm run build
npm start
```

Builds the React client and serves everything from the Express server.

### Local demo access

For an isolated local demo, follow the repository-level `DEMO_SETUP.md`. It uses operator-created synthetic seed credentials rather than published values. Never expose or reuse synthetic demo credentials in a hosted environment.

## Project Structure

```
hall-monitor/
├── client/                  # React frontend
│   └── src/
│       ├── components/      # Sidebar, ScoreGauge, StatusCard
│       ├── context/         # AuthContext, ThemeContext
│       ├── data/            # CCRR/CEAM and CAIRE/CAGR methodology data
│       ├── pages/           # Dashboard, Risks, Compliance, CCRR/CEAM, AI governance, Executive, and retained legacy compatibility pages
│       └── utils/           # API client
├── server/
│   ├── index.js             # Express API routes
│   └── database.js          # SQLite schema and seed data
└── public/                  # Static assets
```

## Environment Variables

| Variable           | Description                      | Default            |
|--------------------|----------------------------------|--------------------|
| `PORT`             | API server port                  | 3001               |
| `SESSION_SECRET`   | Express session secret           | Development fallback only; required unique value in production |
| `CORS_ORIGIN` | Allowed browser origin | Required in production; do not use a wildcard |
| `DEMO_ADMIN_USER`  | Local demo administrator username | Set explicitly for controlled demos |
| `DEMO_ADMIN_PASS`  | Local demo administrator password | Set explicitly for controlled demos |
| `DEMO_DISTRICT_IT_USER` | Local demo district-IT username | Set explicitly for controlled demos |
| `DEMO_DISTRICT_IT_PASS` | Local demo district-IT password | Set explicitly for controlled demos |
| `DEMO_SUPERINTENDENT_USER` | Local demo superintendent username | Set explicitly for controlled demos |
| `DEMO_SUPERINTENDENT_PASS` | Local demo superintendent password | Set explicitly for controlled demos |
| `DEMO_RESET_ENABLED` | Enables synthetic demo reset route | `false`; use only for a verified disposable demo database |

## Demo Data

The database auto-seeds on first run with a fictional portfolio. Pine Ridge Unified School District is the primary demo used for CCRR/CEAM and CAIRE/CAGR workflows. Its district identity, people, records, and example data are created solely for CyberReady demonstration/testing; see the repository-level `DEMO_DATA_PROVENANCE.md`. It includes prototype data such as:

- 6 NIST-aligned health score categories
- 15 cybersecurity risk findings across all severity levels
- Training completion data for 9 departments
- 7 phishing simulation campaigns
- 20 compliance requirements across 3 frameworks
- 8 dashboard metrics (not live telemetry)

## License

Proprietary. All rights reserved. See the root `LICENSE.md`.
