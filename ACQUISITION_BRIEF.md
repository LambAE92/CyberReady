# CyberReady Acquisition Brief

## What CyberReady is

CyberReady is a K–12 cybersecurity and AI-governance platform asset package designed to help education organisations assess, govern, report on, and improve cybersecurity and AI-governance maturity.

Its core operational asset is **Hall Monitor**: a working prototype dashboard that brings structured cybersecurity and AI-governance assessment, evidence notes, findings/remediation workflows, executive reporting, and district/platform views into one interface.

CyberReady is best understood as a transfer-ready product and methodology foundation. It is not represented as a production-hardened enterprise SaaS, a certified audit service, or evidence of documented revenue, customers, production deployments, certifications, or market adoption.

## What exists today

- Hall Monitor: Express API, React/Vite dashboard, SQLite seed database, role-based district and platform-admin views.
- Cybersecurity maturity workflow mapped to the six NIST CSF 2.0 functions, with 22 governance categories, evidence/notes, interview/checklist capture, maturity scoring, and DOCX/leadership reporting.
- AI-governance workflow: AI system inventory, evidence capture, 19-category maturity structure across the NIST AI RMF functions GOVERN, MAP, MEASURE and MANAGE, plus CAIRE-labelled guided workflow and CAGR rubric implementation.
- Findings/remediation, compliance, training, phishing, executive-summary, audit-log and assessment-request screens.
- An optional Claude-assisted finding-extraction capability that is disabled unless a buyer supplies its own Anthropic API key.
- Static Next.js marketing site, platform narrative, buyer-facing pages, insight articles and Hall Monitor previews.
- Buyer and technical documentation, subject to the rights/accuracy qualifiers in this repository.

## Differentiators

| Differentiator | Buyer relevance |
| --- | --- |
| K–12 specialisation | Product, workflow and language are oriented to school district leadership, governance, student-data context, vendor risk and board communication |
| Cybersecurity maturity assessment | Six NIST CSF 2.0 function groups, 22-category scoring workflow, evidence/notes and prioritized improvement context |
| Executive reporting | Leadership-facing maturity, risk, training, compliance and improvement views; generated report capability |
| Findings and remediation workflow | Structured priorities, status, recommended action and evidence/notes provide an operational bridge from assessment to action |
| AI governance | AI inventory, lifecycle/oversight data, maturity workflow, NIST AI RMF mapping, CAIRE guidance and CAGR implementation |
| CAIRE and CAGR | Repository presents these as original CyberReady workflow/rubric assets; buyer should obtain provenance/assignment confirmation at closing |
| NIST alignment | Clear CSF 2.0 and AI RMF 1.0 mappings, while avoiding a claim of NIST certification or endorsement |
| Multiple governance audiences | Platform administrator, district IT and superintendent views support a superintendent/district/platform framing |

## CCRE positioning

CyberReady uses the current positioning **CoSN Cybersecurity Readiness for Education (CCRE)-aligned**. CyberReady does not own the CCRE programme and should not be marketed as issuing CCRE certification, sponsorship or evaluation authority. Historic CCRE/CC4E resource materials, badges, certificates, report templates and masterclass content require separate legal/rights review and are not assumed transferable.

When referring to Alex Lamb personally, the approved positioning for this package is **CoSN Cybersecurity Readiness for Education (CCRE) Practitioner**. No claim that Alex is a current CCRE Evaluator is made in this brief.

## Acquisition thesis

CyberReady can be most valuable to an established:

- K–12 cybersecurity provider
- MSSP/MSP
- EdTech company
- education technology integrator
- GRC provider
- AI-governance provider
- cybersecurity company expanding into education

Such a buyer may be able to apply its existing infrastructure, sales organisation, customer relationships, security capabilities, and distribution to commercialise the asset materially faster than building a comparable K–12 governance foundation from scratch. The asset can support different buyer strategies: assessment accelerator, managed-service workflow, product MVP, board-reporting layer, consulting implementation, or education-sector expansion foundation.

The value proposition is the integration of the currently implemented code, workflow, market positioning and original methodology—not an assertion of existing commercial traction.

## Seller positioning

The seller's proposed acquisition positioning is an **asking price of approximately $495,000**, with a potential strategic transaction range of **approximately $350,000–$600,000**, depending on buyer fit and diligence. This is seller positioning, not an independent valuation, fairness opinion, revenue forecast, or guarantee of transaction value.

## What a buyer should validate

1. Clean local setup and demo operation using `DEMO_SETUP.md`.
2. Product fit for the buyer's sales, delivery and data-handling model.
3. Chain of title for code, CAIRE/CAGR work, visual assets, domain and branding.
4. Rights boundaries for CCRE/CoSN/CC4E, NIST/reference materials, badges/certificates/templates, vendor publications and third-party media.
5. Production architecture plan: Postgres, object storage, managed identity/session, security controls, monitoring and backup/restore.
6. Current public source-history scope and any separately controlled archive requested under a signed diligence process.

## Next-stage buyer opportunities

- Use the buyer's existing identity, cloud, security and customer-success infrastructure to move beyond the local SQLite prototype.
- Connect evidence and workflow to existing GRC, SIEM, MSSP, ticketing, CRM, district onboarding or managed-service operations.
- Add recurring reassessment, longitudinal analytics, evidence management, operator tooling, billing/entitlements and enterprise administration where commercially justified.
- Convert cleared methodology and reporting workflows into buyer-owned delivery packages, while retaining only third-party materials that are licensed or otherwise approved.

## Transaction posture

CyberReady should be sold as a clearly scoped asset transfer with an explicit seller-owned asset schedule, licence/review schedule, excluded-material schedule, account/domain schedule and agreed transition assistance. `TRANSFER_PLAN.md`, `IP_OWNERSHIP_AND_LICENSES.md`, `SECURITY_REVIEW.md`, and `KNOWN_LIMITATIONS.md` are intended to support that diligence conversation.
