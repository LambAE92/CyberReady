# HallMonitor

**K-12 Cybersecurity and AI Governance Operations Dashboard by CyberReady**

Hall Monitor is CyberReady's prototype K–12 cybersecurity and AI-governance operating platform. It records governance assessments, evidence, findings, maturity scoring, remediation planning, and executive-reporting views over time. It does not ingest real-time security telemetry from district SIEM, EDR, network, or identity systems.

It includes a CoSN Cybersecurity Readiness for Education (CCRE)-aligned cybersecurity-governance workflow mapped to NIST CSF 2.0 and a CAIRE AI-governance evidence-review workflow using the CAGR rubric mapped to NIST AI RMF 1.0. CyberReady does not claim ownership, certification authority, endorsement, or affiliation for CCRE.

## Features

- **Dashboard**: Governance-health score with weighted category breakdown, prototype metrics, and editable category scores. Metric values are application data, not direct security telemetry.
- **Risks & Vulnerabilities**: Track and manage cybersecurity findings with severity/status filtering, status changes, recommended actions, and notes.
- **Training & Phishing**: Record/view staff training completion and phishing-simulation trends by department; buyers must validate or configure any live data source separately.
- **Compliance & Reporting**: Governance-readiness tracking against NIST CSF-aligned and policy-readiness frameworks with printable executive reports. Outputs are not independent validation, legal advice, or a certification.
- **Self-Assessment**: Evaluate cybersecurity maturity across all 6 NIST functions and 22 categories using the implemented CCRE-aligned assessment workflow. Includes an interview guide with checklist tracking, interview questions by maturity level, and embedded assessment guidance.
- **Executive Summary**: Board-ready overview with posture score, top priority risks, progress since last review, recommended next steps, and exportable HTML reports.
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
│       ├── data/            # Rubric data (NIST functions, interview questions, training guide)
│       ├── pages/           # Dashboard, Risks, Training, Compliance, Assessment, Executive
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

The database auto-seeds on first run with a synthetic portfolio. Walkerville School District is the primary demo used for CCRE-aligned and CAIRE workflows. It includes prototype data such as:

- 6 NIST-aligned health score categories
- 15 cybersecurity risk findings across all severity levels
- Training completion data for 9 departments
- 7 phishing simulation campaigns
- 20 compliance requirements across 3 frameworks
- 8 dashboard metrics (not live telemetry)

## License

Proprietary. All rights reserved. See the root `LICENSE.md`.
