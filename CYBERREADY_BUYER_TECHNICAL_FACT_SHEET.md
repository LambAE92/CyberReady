# CyberReady Buyer Technical Fact Sheet

**Snapshot:** `final-acquisition-remediation` at `8ee27598b73bb0f7db1a4f2ba83aa5aa93739053`
**Positioning:** functional K–12 cybersecurity and AI-governance prototype/product foundation for strategic acquisition. It is not represented as production-hardened enterprise SaaS, a certified audit service, a NIST/CoSN-endorsed offering, or proof of customers, revenue, deployments, or market adoption.

## What CyberReady is

CyberReady combines the Hall Monitor web application, a K–12 cybersecurity readiness workflow, an AI-governance workflow, a public acquisition website, and technical/diligence documentation. Hall Monitor is the operational product: it records assessment inputs, evidence, maturity, findings, roadmaps, compliance/readiness context, and executive views.

## Architecture and deployment model

| Layer | Current implementation |
| --- | --- |
| Hall Monitor frontend | React 19, Vite, Tailwind, React Router, Recharts, Lucide |
| Hall Monitor backend | Node.js / Express 5 with role-aware, district-scoped APIs and session authentication |
| Database | Local SQLite through `better-sqlite3`; startup schema creation and seed workflow |
| Website | Next.js 16 static-export site with independently configured Hall Monitor link |
| Current deployment posture | Manual local/single-instance prototype; no committed production cloud account or live infrastructure configuration |
| Optional external service | Anthropic Claude finding extraction, enabled only when a buyer supplies its own `ANTHROPIC_API_KEY` |

## Cybersecurity methodology stack

```text
NIST CSF 2.0                 external reference architecture
        ↓
CCRR v1.0                    CyberReady K–12 readiness-rubric candidate
CEAM v1.0                    CyberReady evidence-assessment-method candidate
        ↓
Hall Monitor                  assessment, evidence, gaps, roadmap, dashboard, executive views
```

- CCRR has 18 readiness domains grouped across all six NIST CSF 2.0 Functions.
- CEAM records current and target maturity separately, qualitative confidence, evidence validation, seven gap types, critical-gap flags, sequential advancement actions, and reassessment linkage.
- Overall CCRR maturity equally weights the six Function scores. It is not a simple 18-domain average; confidence does not mathematically change maturity.
- NIST identifiers are external reference metadata. CyberReady does not claim NIST ownership, endorsement, or certification.

## AI-governance methodology stack

```text
NIST AI RMF 1.0              external reference architecture
        ↓
CAGR                         CyberReady AI-governance rubric candidate
CAIRE                         CyberReady AI evidence/risk-method candidate
        ↓
Hall Monitor                  AI-system inventory, ratings, evidence notes, guidance, dashboards
```

- The active AI workflow records AI systems, lifecycle stage, oversight mode, maturity ratings, notes/evidence, and function/overall views across GOVERN, MAP, MEASURE, and MANAGE.
- The current product includes 19 CAGR categories and active NIST AI RMF Playbook guidance. The playbook is external-reference content and should not be represented as CyberReady-owned or transferred without a separate rights/notice decision.
- CAIRE/CAGR methodology authorship and any external-source boundary remain subject to owner/counsel confirmation.

## Key implemented workflows

- Role-aware platform-admin, district-IT, and superintendent access.
- District-scoped dashboards, findings, compliance, training/phishing metrics, executive summary, audit history, and assessment requests.
- CCRR/CEAM cybersecurity assessment with evidence gate, structured findings, independent critical gaps, roadmap actions, and reassessment history.
- CAIRE/CAGR AI-governance assessment and AI-system inventory.
- Optional uploaded-document finding extraction when a buyer-controlled Anthropic key is configured; manual finding entry works without it.
- A controlled local synthetic demo workflow with operator-created credentials.

## Current technical maturity and limitations

- The product is a functional prototype with a single-process SQLite architecture and in-memory session store.
- It does not implement SSO, MFA, SCIM, billing, enterprise provisioning, production object storage, managed backups/restore, CI/CD, monitoring, alerting, or a full production support model.
- It does not ingest district security telemetry, SIEM, EDR, identity, or network-system feeds. Dashboard metrics and seed data are synthetic/demo content unless independently configured.
- CCRR reporting is implemented through dashboards, governance status, and executive summary; a downloadable CCRR-specific report generator is not implemented.

## Major dependencies

- **Server:** Express, better-sqlite3, bcryptjs, express-session, cors, express-rate-limit, Multer, Mammoth, docx, dotenv, and Anthropic SDK.
- **Client:** React, React Router, Recharts, Lucide, Tailwind, Vite.
- **Website:** Next.js, React, TypeScript, Tailwind.

Dependencies are third-party components governed by their own terms. Package lockfiles provide initial version/licence metadata; a buyer should generate a clean-install SBOM/NOTICE and vulnerability scan in its own environment.

## Demo availability

`DEMO_SETUP.md` describes how to generate an isolated synthetic local demo. The repository contains no current default demo password or runtime secret. Any buyer demonstration should use a dedicated instance, new credentials, a new session secret, and no real district data.

## Logical buyer expansion opportunities

- Adopt the workflows into an existing K–12 cybersecurity, GRC, MSSP/MSP, EdTech, or AI-governance platform.
- Replace SQLite/in-memory sessions with the buyer’s identity, database, storage, observability, and backup standards.
- Add buyer-selected evidence management, recurring reassessment, report exports, tenant provisioning, integrations, and commercial workflow.
- Decide whether to retain, replace, or separately license external-reference playbook content and historical materials.

For a detailed product/provenance boundary, see `ACQUISITION_IP_PROVENANCE_MATRIX.md`, `PROPOSED_TRANSACTION_ASSET_SCHEDULE.md`, and `ACQUISITION_PROVENANCE_REVIEW_REPORT.md`. These are technical diligence documents, not legal clearance.
