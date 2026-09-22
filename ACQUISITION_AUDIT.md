# CyberReady Acquisition Audit

**Audit date:** 2026-09-21  
**Repository snapshot:** `787814630745fce17cf8bedd077d2ae0a4baa958` (main at audit start)  
**Working branch:** `main` (curated public sale-package history)  
**Scope:** Current worktree, 13 reachable Git revisions, configuration, source, package manifests/locks, user-facing documentation, and repository asset inventory. Secret values are intentionally not reproduced.

## Executive view

CyberReady is a credible **transfer-ready prototype and asset package**, not a production SaaS. Its principal technical asset is **Hall Monitor**, a working K–12 cyber-governance dashboard with role-based views, assessment workflows, reporting, and a separately deployable marketing website. The strongest buyer-diligence value is the combination of working product structure, K–12-oriented workflows, reporting UX, AI-governance workflow, and a curated technical/acquisition document set.

The principal diligence risks are not evidence that the product lacks value. They are: (1) third-party framework/reference material and historical CCRE branding, (2) static demo credentials and a small authorization-scoping defect, (3) prototype deployment/data controls, and (4) legal and privacy claims that need counsel review before public reliance.

At the audit snapshot the repository contains **295 tracked files** totaling approximately **658 MB**: `hall-monitor/`, `website/`, `reference/`, `ccre-resources/`, and `sale-package/`. The codebase itself is compact; the reference library accounts for most of the size. During acquisition readiness, the standalone CCRE/CC4E, NIST, vendor, publisher, and other mixed reference collections were excluded from the clean public sale package and retained only in a controlled private archive. The snapshot count and original paths are retained here as audit evidence.

## 1. Repository structure

| Area | Contents | Audit characterization |
| --- | --- | --- |
| `hall-monitor/` | Express API, SQLite schema/seed data, React/Vite client, smoke test, documents/resources | Core product prototype |
| `website/` | Static-export Next.js marketing and acquisition website | Buyer-facing marketing surface |
| Controlled private archive (not in this public tree) | Former `reference/`, CCRE/CC4E, NIST, vendor, publisher, media and other mixed reference collections | Excluded pending rights, privacy, and transfer review |
| `sale-package/` | Buyer overview, roadmap, demo script, limitations, handoff/domain placeholders | Existing transaction support material |
| Root documentation | README, setup, deployment, proprietary license | Technical and acquisition overview |

## 2. Major applications and components

### Hall Monitor — implemented prototype

Hall Monitor is the core asset. It provides platform-admin, district-IT, and superintendent views; cyber and AI governance assessment screens; findings and remediation tracking; training and compliance views; executive dashboards; generated reports; and audit logging. It is suitable for local demo/diligence and as a starting point for a buyer's next-stage platform work.

### CyberReady website — implemented static site

The Next.js site is configured for static export. It contains platform, Hall Monitor, district, workforce, insight, about, terms, privacy, and acquisition-inquiry pages. Its dashboard views are visual previews, not live application data. In the final remediation branch, the inquiry form opens a prefilled email draft only when a public acquisition-email environment value is configured; it does **not** send, store, or confirm an inquiry itself.

### Reference and sale materials — mixed asset class

The repository holds strategy, market, NIST, CCRE, AI, and vendor-published materials. They are useful diligence context but must not be represented wholesale as seller-owned or automatically transferable.

## 3. Frontend architecture

| Surface | Actual implementation |
| --- | --- |
| Hall Monitor client | React 19, Vite 8, React Router HashRouter, Tailwind CSS 4, Recharts, Lucide React |
| Client organization | Routed page components, reusable dashboard components, `AuthContext`/`ThemeContext`, `utils/api.js`, static rubric and AI-RMF data |
| Auth UX | Session-cookie API calls with `credentials: include`; client route guards are supplementary to server-side role checks |
| Website | Next.js 16 App Router, React 19, TypeScript, Tailwind CSS 4, static export (`output: "export"`) |
| Website integration | `NEXT_PUBLIC_HALL_MONITOR_URL` is the outbound portal link; no live data or inquiry API is implemented |

## 4. Backend architecture

Hall Monitor has a single Node.js/Express 5 process. `server/index.js` contains the API, session and CORS middleware, authentication, authorization, all feature routes, upload handling, AI integration, and production static-file serving. `server/database.js` initializes SQLite tables, applies lightweight `ALTER TABLE` migrations, and inserts demo data. `server/report-generator.js` creates DOCX reports with the `docx` package.

This is intentionally simple prototype architecture. There is no separate service layer, background job system, API versioning, schema migration framework, webhook worker, or public health endpoint.

## 5. Database architecture

`better-sqlite3` creates `hallmonitor.db` beside Hall Monitor at runtime, enables WAL and foreign keys, and excludes runtime DB files from Git. Principal tables include:

- `districts`, `users`, `audit_log`
- `health_categories`, `dashboard_metrics`, `risks`, `training`, `phishing_sims`, `compliance`
- `assessments`, `assessment_ratings`, `assessment_checklist`, `interview_responses`, `self_assessments`, `assessment_reports`, `audit_requests`
- `ai_systems`, `cagr_ratings`
- `masterclass_modules`, `masterclass_completions`, `masterclass_requests`, `finding_documents`

The schema models district scoping but is not a full multi-tenant isolation system. Data lifecycle, backup, retention, encryption-at-rest, migration rollback, and production restore operations are not implemented.

## 6. Authentication and authorization

**Implemented:** bcrypt password hashes; `express-session`; HTTP-only, `SameSite=Lax` cookies; secure cookies in production; login rate limiting; role middleware; district selection for `platform_admin`; server-side district predicates on most resource routes; audit records with role and IP address.

**Roles:** `platform_admin`, `district_it`, and `superintendent`. The platform administrator may view cross-district information and choose an active district. District users are normally scoped to their assigned district.

**Diligence observation:** the `PUT /api/masterclass/completions/:id` route authorizes a district user but does not constrain the update by that user's district. An authenticated district user who knows another completion ID could modify it. This is a contained, fixable cross-tenant authorization issue and should be corrected before any shared deployment.

**Not implemented:** SSO, MFA, SCIM, user provisioning/invitation lifecycle, password reset, account lockout beyond login rate limiting, managed session store, CSRF strategy, comprehensive security headers, or enterprise audit retention controls.

## 7. Assessment functionality

**Implemented cyber-assessment workflow:**

- Six NIST CSF 2.0 function groupings: Govern, Identify, Protect, Detect, Respond, Recover.
- 22 governance category structure in the generated-report module.
- Five-level maturity scoring, evidence and notes, interview-response capture, checklist capture, snapshots, status progression, and per-function/overall calculations.
- Role-restricted assessment creation, rating, completion, and report generation.
- District self-assessment and platform-admin assessment workflow are distinct UI/API paths.

**Implemented AI-governance workflow:** AI system inventory, lifecycle stage, human oversight model, third-party component field, evidence/notes, and 1–5 maturity ratings across GOVERN, MAP, MEASURE, and MANAGE. The client includes a CAIRE-labelled guided evidence workflow and CAGR-labelled rubric data.

**Prototype caveat:** scoring is application logic and seed/demo data; it is not an independently certified audit, an automated control test, or a guarantee of a district's compliance or security posture.

## 8. Reporting functionality

Hall Monitor provides executive summary data (maturity, cyber/AI function views, risks, training, compliance, insurance-readiness display, and next steps), browser-printable views, and DOCX assessment report generation. Generated reports are stored as BLOBs in SQLite and downloaded through authenticated routes.

The report generator has useful, buyer-relevant implementation value. Its historical CCRE/Cybersecurity Coalition labels and template-derived language require legal/brand review before it is used as a customer-facing report.

## 9. AI governance functionality

The AI implementation is governance workflow—not a model-hosting system. Hall Monitor records AI systems and evidence, displays the four NIST AI RMF-aligned functions, calculates maturity summaries, offers guided prompts/advancement steps, and tracks board-facing posture.

For optional finding extraction, uploaded `.txt`, `.doc`, `.docx`, or `.pdf` content is parsed and, when configured, up to 15,000 characters plus the district name are sent to Anthropic's Claude API. Parsed text (up to 50,000 characters) and extracted findings are retained in SQLite. This is real external processing and requires a buyer-selected privacy, vendor, consent, retention, and redaction design before real district data is used.

## 10. NIST integrations and mappings

| Framework | Actual use | Classification |
| --- | --- | --- |
| NIST CSF 2.0 | Six-function structure, 22-category assessment/report taxonomy, compliance and executive views | Implemented mapping; not an official NIST certification or integration |
| NIST AI RMF 1.0 | Four-function AI system/rating model, browser guidance/playbook data, website displays | Implemented mapping with embedded/derived reference content; not an official NIST assessment |
| NIST reference library | Former PDFs, JSON, XLSX, and other reference files in the controlled private archive | Excluded from the public package; rights/attribution review still required before controlled delivery |

## 11. CCRE-related functionality and cleanup classification

The worktree has **234 textual matches in 45 files** for the requested historical terms and **61 CCRE/CC4E/rubric/masterclass-related asset paths**. The following grouping covers every textual occurrence by path family; duplicate resource copies are deliberately grouped rather than treated as distinct product features.

| Classification | Occurrence families | Required treatment |
| --- | --- | --- |
| Current/appropriate only when qualified | Generic CCRE/CC4E labels in Hall Monitor assessment UI, data, API names, README, site pages, and sale-package docs | Retain functional mappings but describe them as **CoSN Cybersecurity Readiness for Education (CCRE)-aligned**; do not say CyberReady owns CCRE |
| Outdated terminology | Website/README statements calling CCRE “Certified Cybersecurity Rubric Evaluator”; assertions that a “certified evaluator” conducts each assessment; historical CC4E labels | Replace public-facing claims with the approved current positioning. Do not describe Alex Lamb as a current CCRE Evaluator without independent verification; the requested safe form is **CoSN Cybersecurity Readiness for Education (CCRE) Practitioner** |
| Historical/archive | Former CCRE/CC4E resource directories, report/certificate/badge assets, and copied HTML guidance are in the controlled private archive, not this public package | Preserve pending rights review; label/segregate for archive or diligence only rather than treating as a product entitlement |
| Potential third-party IP | CCRE certificate/badge, rubric spreadsheets, masterclass materials, “Sponsored by the Cybersecurity Coalition” report text, `Cybersecurity Coalition` training provider value, CCRE Academy/ClassLink references | Do not delete automatically. Exclude from buyer transfer representation unless rights/permission are documented |
| Needs human/legal review | Any claim of evaluator status, affiliation, sponsorship, certification, training authority, ClassLink relationship, or ability to issue CCRE-labelled reports/certificates | Obtain written owner/brand and counsel review before external sale, hosting, or reuse |

## 12. Documentation

Existing documentation is unusually useful for an MVP: README, setup and deployment guides, proprietary license, Hall Monitor README, website README, and a buyer handoff folder. However, several documents expose demo credentials; some CCRE/ownership assertions and legal/privacy statements need correction or legal review; domain information remains placeholder-only. This sprint adds the dedicated acquisition-readiness documents requested by the seller.

## 13. Tests

One Node smoke suite (`hall-monitor/tests/smoke.test.mjs`) covers login, role access, district switching, executive summary, assessment CRUD, self-assessment, notifications, and audit log behavior. It requires a running API and uses the demo seed accounts.

Server-file syntax checks passed with the bundled Node runtime. The smoke suite and package vulnerability audit were **not executed** because no npm executable or installed dependency tree was available in this environment; pnpm cannot audit an npm-lock-only project without generating another lockfile. No test result is claimed beyond this static verification.

## 14. Deployment configuration

- Hall Monitor: `Procfile` runs the Express process. Docs mention Railway and Render. Production serves the built Vite client through Express.
- Website: static Next.js export, suitable for static hosting such as Netlify, Vercel, or Cloudflare Pages.
- Environment configuration: `SESSION_SECRET`, `NODE_ENV`, `PORT`, `CORS_ORIGIN`, optional `ANTHROPIC_API_KEY`, and website `NEXT_PUBLIC_HALL_MONITOR_URL`.

There is no infrastructure-as-code, container definition, CI workflow, deployment pipeline, health check endpoint, backup definition, managed database configuration, or deployment-specific monitoring configuration.

## 15. Third-party dependencies

Runtime package manifests list: Express, express-session, express-rate-limit, cors, better-sqlite3, bcryptjs, multer, mammoth, docx, dotenv, and the Anthropic SDK; frontend dependencies include React, Vite, React Router, Recharts, Lucide, Tailwind, and Next.js.

No SBOM, dependency-license inventory, or repository-wide third-party notices file is present. Package-level licenses and current security advisories must be resolved by the buyer from the lockfiles and a controlled dependency install/audit.

## 16. External services and APIs

| Service/reference | Current state |
| --- | --- |
| Anthropic Claude API | Optional, code-integrated AI finding extraction; buyer supplies key |
| Railway/Render | Documentation-only hosting recommendations; no committed deployment account/configuration |
| Netlify/Vercel/Cloudflare Pages | Documentation-only static website host options |
| NIST, CoSN/CCRE, ClassLink, cybersecurityrubric.org | Framework/reference/branding mentions; not code integrations |
| OpenAI, Google Vertex AI, Microsoft Azure AI | Mentioned only in synthetic AI-system seed data, not an application integration |

## 17. Potential secrets

No committed `.env`, private key, cloud-key, or high-confidence API-token pattern was found in the current tree or in the 13 reachable revisions. `hall-monitor/.env.example` is a placeholder and is properly ignored.

At the audit snapshot, the repository contained **fixed demo-account credentials in source, tests, and prior documentation**. They were a security issue for any accessible demo, not evidence of an accidentally committed third-party API key. Values are omitted here. The clean package requires operator-supplied demo credentials for a new seed database; production exits if `SESSION_SECRET` is not supplied.

## 18. Potential personally identifiable information

No runtime database is tracked. The demo seed data includes names, email-shaped user fields, district details, operational metrics, and synthetic risk/AI-system scenarios; their factual/synthetic status should be confirmed before external distribution. The application can store user names, emails, organization/role, IP addresses, audit log details, uploaded document text, assessment evidence, and report BLOBs. The repository also contains a founder headshot, named-author material, a district prospecting spreadsheet, and potentially personal information in reference files.

## 19. Potential third-party intellectual property

Material requiring review includes CCRE/CC4E rubrics, certificates, badges, report and masterclass templates, CoSN/ClassLink/Cybersecurity Coalition references, NIST documents/playbook data, CIS materials, Microsoft/Databricks/HubSpot/EC-Council/Flashpoint and other vendor publications, externally titled books/e-books/prompt packs, and third-party media/source materials. These standalone collections are excluded from the public package. See `IP_OWNERSHIP_AND_LICENSES.md` for a categorized inventory.

## 20. Seller-owned/proprietary functionality (subject to proof of title)

The repository presents the following as CyberReady-created: Hall Monitor source code and architecture; React/Vite and Next.js implementations; K–12-oriented dashboard UX; workflow orchestration; executive and remediation views; CAIRE concept/workflow; CAGR rubric implementation; original site copy; CyberReady/Hall Monitor naming and visual assets; buyer package documents; and original reporting logic. These should be supported with seller authorship, contributor, contractor, assignment, and trademark/domain records before closing.

## 21. Known technical limitations

- SQLite/local filesystem/in-memory session prototype topology.
- Static demo seeds and fixed seed-account defaults.
- No formal user lifecycle, billing, provisioning, SSO/MFA/SCIM, monitoring, backup/restore, CI, or IaC.
- Large repository with duplicated reference artifacts and a Windows long-path checkout constraint.
- Simplistic PDF text extraction; memory-based upload handling; no malware scanning or durable file store.
- No contact-form submission integration; static web previews.
- No evidence of production load, security, browser, accessibility, or deployment testing in this audit.
- CCRE/CoSN/third-party materials and branded report output require rights validation.

## 22. Recommended acquisition cleanup

1. **Before controlled archive delivery:** establish a rights/transfer schedule; keep third-party reference folders, badges, certificates, templates, and copied publications excluded unless cleared in writing.
2. **Before shared demo:** remove credential values from public docs; use unique demo credentials/secrets; label demo data synthetic; fix the masterclass completion district-scope authorization issue.
3. **Before customer use:** move to managed Postgres, object storage, managed sessions, backup/restore, logging/monitoring, malware-safe upload pipeline, security headers/CSRF strategy, and enterprise identity.
4. **Before marketing claims:** counsel-review the privacy policy, terms, trademark/ownership wording, CCRE language, founder credential language, domain statements, and any statement of affiliation/certification/sponsorship.
5. **For buyer engineering diligence:** provide a repeatable clean-room build, SBOM/license scan, npm audit, CI workflow, architecture decision record, deployment runbook, and data-handling/vendor documentation.

No potentially valuable functionality or repository asset was deleted during this audit.
