# CyberReady Acquisition Provenance Review Report

**Review type:** Owner-side technical asset, provenance, and transaction-package review.
**Not a legal opinion:** This report does not establish ownership, originality, licence scope, infringement, trademark rights, transferability, or freedom to operate.
**Repository baseline:** `final-acquisition-remediation` at `8ee27598b73bb0f7db1a4f2ba83aa5aa93739053`; `main` at `3dea7ed62955ea22c763effd342b6ecbd34fe242`; clean tree at review start.

## Executive summary

CyberReady has a clear technical product core: the Hall Monitor application, public website, CCRR/CEAM cybersecurity workflow, CAIRE/CAGR AI-governance workflow, tests, synthetic-demo process, and acquisition documentation. Current clean-history metadata consistently names Alex Lamb, and controlled Drive records provide separately named CCRR, CEAM, CAGR, and CAIRE technical specifications. These facts support a **candidate seller-created asset** classification, not legal clearance or a complete chain of title.

The principal provenance condition concerns embedded external-framework content rather than the application architecture. The active AI Governance UI imports and can render `aiRmfPlaybook.js`, whose header says it was generated from the NIST AI RMF Playbook and which contains lengthy reference content. `cagrData.js` also includes AI RMF-like subcategory language. Historic CCRE/Cybersecurity Rubric source/data and a legacy report generator remain in the tree for compatibility/provenance but are not active CCRR/CEAM cybersecurity functionality. Brand/media/domain and seed-label evidence is also incomplete.

The appropriate transaction posture is therefore: transfer clearly product-specific software and seller-authored-candidate materials subject to title confirmation; place external-source, historical, media, and sensitive provenance material into controlled diligence or owner/counsel review; never characterize third-party frameworks or playbook content as CyberReady-owned.

## Scope and method

Reviewed:

- Current tracked repository tree, source/data directories, package manifests and lockfiles, static assets, documentation, and current clean-history metadata.
- Existing architecture, acquisition, IP, security, transfer, limitation, terminology, and CCRR/CEAM implementation records.
- Controlled Drive folder supplied by the owner: CCRR canonical register, CCRR technical specification, CEAM methodology, CAGR technical specification, CAIRE methodology, supporting PNGs, CCRE logo/signature images, and acquisition-teaser files.
- Exact current references to CCRE, CoSN, Cybersecurity Rubric, CC4E, Cybersecurity Coalition, ClassLink, NIST, Anthropic, and active framework-source data.

Not reviewed: private/archive files outside the current checkout, external account ownership, contributor contracts, registrar/hosting accounts, external licence terms, live hosting, prior clones/forks, or customer data not present in the repository.

## Methodology provenance findings

| Methodology | Current technical implementation | Repository/controlled-record evidence | External boundary | Proposed handling |
| --- | --- | --- | --- | --- |
| **CCRR v1.0** | 18 domains in `ccrrData.js`; scoring/data/API/UI/tests | Code added by `2b83dfd`; controlled canonical register and technical spec describe the same 18-domain system and identify NIST mapping as external | NIST CSF 2.0 IDs/mappings are external references | Candidate transfer, subject to owner authorship/assignment evidence |
| **CEAM v1.0** | Evidence gate, validation statuses, confidence, gaps, roadmap, reassessment in client/server/database | Code in `2b83dfd`/`8ee2759`; controlled CEAM spec matches implementation | Does not claim ownership of NIST | Candidate transfer, subject to owner authorship/assignment evidence |
| **CAGR** | 19 categories, maturity/advancement data, AI Governance workflow | Clean history and controlled CAGR spec call it CyberReady; app uses it independently from cybersecurity CCRR | AI RMF references plus potentially source-like subcategory prose | Owner/counsel decision required before a clean exclusive-methodology representation |
| **CAIRE** | AI evidence/rating/roadmap approach in AI Governance workflow | Controlled CAIRE spec describes the relationship to CAGR and implementation evidence handling | NIST AI RMF is external reference architecture | Candidate transfer, subject to owner authorship/assignment and source-boundary confirmation |

The canonical CCRR source document explicitly distinguishes the CyberReady domain taxonomy and assessment content from NIST mappings. This supports technical delineation but does not itself prove rights. The controlled Drive records’ metadata shows their existence and timing, not a verified author/assignment chain.

## Software provenance findings

- **Hall Monitor** is an integrated React/Vite + Express/SQLite product with RBAC, district scope, dashboards, assessment engines, evidence/finding/roadmap storage, and regression tests. Its product-specific implementation is a seller-created candidate subject to contributor-title confirmation.
- **CyberReady website** is a Next.js source package with acquisition/product copy, static previews, and visual assets. Product-specific components/copy are seller-created candidates; media and imagery are separately flagged.
- **CCRR/CEAM implementation** is technically distinct from retained legacy data. Active cyber assessment/reporting uses CCRR/CEAM and does not automatically convert historic CCRE/Cybersecurity Rubric scores.
- **AI workflow** is operationally separate from CCRR/CEAM and includes an active NIST AI RMF Playbook presentation layer. That source boundary is the material open packaging item.

## Dependency and licence findings

The repository has three npm lockfiles, all lockfile format 3. The root product packages identify themselves as `UNLICENSED`/proprietary. Direct package licence metadata is present in the lockfiles:

| Area | Direct production dependency inventory | Recorded direct licence pattern |
| --- | --- | --- |
| Hall Monitor server | `@anthropic-ai/sdk@0.89.0`, `bcryptjs@3.0.3`, `better-sqlite3@12.8.0`, `cors@2.8.6`, `docx@9.6.1`, `dotenv@17.3.1`, `express@5.2.1`, `express-rate-limit@8.3.1`, `express-session@1.19.0`, `mammoth@1.12.0`, `multer@2.1.1` | MIT except bcryptjs BSD-3-Clause and dotenv/Mammoth BSD-2-Clause |
| Hall Monitor client | `lucide-react@0.577.0`, `react@19.2.4`, `react-dom@19.2.4`, `react-router-dom@7.13.1`, `recharts@3.8.0` | Lucide ISC; remaining direct packages MIT |
| Website | `next@16.2.3`, `react@19.2.4`, `react-dom@19.2.4` | MIT |

Material direct development dependencies are recorded in the lockfiles: Vite/Tailwind/ESLint tools are primarily MIT; TypeScript is Apache-2.0. The transitive lockfiles include licence variants that need normal buyer SBOM/NOTICE review, including `jszip` `(MIT OR GPL-3.0-or-later)`, `lightningcss` MPL-2.0, and Sharp-platform dependencies with LGPL-3.0-or-later metadata. No interpretation of those terms is made here.

Anthropic is optional in the actual code: without a buyer-supplied API key, manual findings remain available. The SDK/API, account, data-processing terms, and credential are not seller-owned transfer assets.

## Historical CCRE / Cybersecurity Rubric findings

| Classification | Material | Finding | Proposed treatment |
| --- | --- | --- | --- |
| A — legitimate historical reference | Diligence and terminology documentation | Explains prior framework/credential context and public-package remediation | Retain with clear historical/provenance label |
| B — credential/reference statement | Website CCRE Practitioner wording; sidebar external CoSN form | Qualified person-specific statement/link; no evidence of course/mark/credential transfer rights in repo | Reference only; owner/counsel confirm wording |
| C — internal compatibility identifier | Legacy API comments/types/table values | Current source maps historic labels but active CCRR workflow does not use them | Retain only as compatibility/history |
| D — historical assessment metadata | Legacy self-assessments, assessment ratings, report structures | Prior score/report data is preserved and never score-converted to CCRR | Controlled historical archive |
| E — provenance/documentation reference | `CCRE_COSN_TERMINOLOGY_AUDIT.md`, `IP_OWNERSHIP_AND_LICENSES.md` | Documents exclusions/uncertainty | Retain as diligence record |
| F — third-party source material | `rubricData.js`, `cybersecurityAssessment.json`, `assessmentGuidance.js`, legacy report-generator content | Source-like CCRE/Cybersecurity Rubric material not imported by active cyber UI | Exclude from default transfer; controlled/archive pending review |
| G — unnecessary/dead material | Unrouted `Training.jsx`, legacy masterclass API/client helpers, source-only admin tab code | Source remains but current App routes/navigation do not render the in-app Masterclass workflow | Preserve for now; owner can later archive/remove only after compatibility review |
| H — unresolved | Any external CCRE/CoSN/CC4E/Coalition/ClassLink relationship or source archive | No supporting rights/relationship record in current repository | Owner/counsel review |

No current active source occurrence of Cybersecurity Coalition or ClassLink product functionality was found. Their remaining role is historical/provenance documentation. No CCRE/Cybersecurity Rubric score conversion is performed by the active CCRR application.

## NIST and external-framework boundary

The current acquisition narrative is correct for CCRR: NIST CSF identifiers are external mapping metadata, and no NIST certification/endorsement language was found. The AI boundary requires additional nuance:

- CAGR/CAIRE use the NIST AI RMF as an external architecture.
- `aiRmfPlaybook.js` is not merely identifier metadata. It is an actively imported, source-described NIST Playbook data set containing extensive prose/actions.
- `cagrData.js` should be reviewed at the field level to distinguish CyberReady K–12 maturity/advancement language from potentially externally-derived subcategory statements.

Accordingly, acquisition documents should not state broadly that every NIST reference is only metadata. They should say: **CCRR mappings are external metadata; the AI module also retains separately identified external Playbook/reference content that is not represented as seller-owned and requires an owner/counsel packaging decision.**

## Brand and media findings

| Asset family | Evidence | Proposed status |
| --- | --- | --- |
| CyberReady logo/banner | Three identical tracked copies for each asset across the website and Hall Monitor; no designer/source record | Owner/counsel confirmation required |
| CyberReady/Hall Monitor names and marketing copy | Used consistently in product/website; no trademark/domain record in tree | Owner/counsel confirmation required |
| Alex Lamb headshot | Tracked asset, no photographer licence or release | Controlled/owner decision |
| Homepage video and podcast audio | Tracked files, no author/participant/music/release evidence; audio not currently linked in source | Controlled diligence only pending review |
| Template SVGs/favicons/icons | Next-template origin likely for website SVGs; Hall Monitor icon origin undocumented | Exclude unused website SVGs by default; review Hall Monitor icon origin |
| Domain/hosting/accounts | Documentation is placeholder/TBD; no control evidence | Owner/counsel decision at closing |

## Demo and data findings

- No tracked runtime database, `.env`, private key, cloud credential, or high-confidence API token was found. Runtime paths are ignored.
- The seed workflow requires operators to supply unique credentials at initialization; no current default demo password is tracked.
- `DEMO_SETUP.md` describes the seed environment as synthetic. The code uses “Walkerville School District,” “Alex Lamb,” and “Valorie Frizzle” labels. The first is not explicitly identified as fictional in source and the second is a real-person name. Treat seed data as **documented synthetic but pending owner confirmation** before external demonstrations, screenshots, or transfer representations.
- The application can store district-specific evidence, uploads, names, email addresses, IP/log data, and AI-related records at runtime. Such data is excluded from the default asset package.

## Proposed asset-package summary

| Bucket | Summary |
| --- | --- |
| **Proposed transfer** | Product-specific Hall Monitor/website code; CCRR/CEAM source and technical documentation; CAIRE/CAGR candidate elements subject to boundary confirmation; tests; seller-authored-candidate buyer/technical documentation |
| **Transfer with licence/notice** | Product configuration and third-party open-source dependency references; NIST mapping identifiers only as external metadata; buyer-supplied optional Anthropic integration code |
| **Controlled diligence** | Full source-level review, methodology source records, security/IP/limitations documents, NIST AI RMF Playbook data, legacy CCRE/Cybersecurity Rubric data/report source, media/headshot pending review, detailed historical records |
| **Excluded by default** | Runtime secrets/data/uploads/logs/DBs, unreviewed external framework/course/badge/certificate content, external accounts/domains not expressly scheduled, unreviewed media/personality assets, claims/commitments outside a definitive agreement |

## Owner/counsel decisions

The owner should resolve the eight decisions in `ACQUISITION_OWNER_DECISION_MEMO.md`, especially methodology assignment evidence, active NIST AI RMF Playbook treatment, legacy CCRE/Cybersecurity Rubric archive disposition, credential wording, brand/media/domain scope, seed-data confirmation, public/controlled data-room boundary, and optional Anthropic enablement.

## Technical limitations relevant to the transaction

The previously disclosed prototype limitations remain: SQLite/single-process architecture, in-memory sessions, no SSO/MFA/SCIM, no managed production storage/backup/observability/CI, manual deployment, and no real-time security telemetry integrations. The present review made no product change and does not alter the completed CCRR/CEAM test/build results.

## Final acquisition-package review

1. **Can a buyer distinguish CyberReady-created candidates from external materials?** Yes, using the matrix and proposed schedule, with the AI Playbook and methodology title caveats clearly highlighted.
2. **Can a buyer identify proposed software/methodology transfer assets?** Yes, subject to the schedule’s explicit title and external-content conditions.
3. **Are historic CCRE materials separated from active CCRR/CEAM?** Yes technically and in the documentation; they remain retained source/history rather than deleted.
4. **Are NIST mappings clearly reference-only?** Yes for CCRR/CSF. The AI Playbook is called out as a separate embedded external-reference exception.
5. **Are dependencies documented for initial diligence?** Yes: direct production/development dependencies and lockfile licence observations are captured; a closing SBOM/notice is still needed.
6. **Are uncertain brand/media assets flagged?** Yes.
7. **Are demo/data risks identified?** Yes: synthetic assertion, label/personality uncertainty, and runtime-data exclusion are documented.
8. **Are technical limitations disclosed consistently?** Yes; this review relies on `KNOWN_LIMITATIONS.md` and the implementation/security reports.
9. **Do transaction documents match the repository?** The new package documents do. Stale active CCRE wording found in `sale-package/` is corrected in this documentation commit.
10. **Is anything represented as transferable without repository support?** The schedule treats all methodology, brand, media, accounts, and external-reference boundaries conservatively; no unqualified transfer representation remains in the new package documents.

## Did this review identify any technical/provenance issue that should prevent CyberReady from proceeding to acquisition packaging?

**CONDITIONAL.** The review found no defect that prevents CyberReady from preparing and sharing a controlled acquisition package today. However, a buyer-facing claim of a clean, exclusively seller-owned methodology/media package should wait for the owner/counsel decisions on (1) active NIST AI RMF Playbook content and CAGR source boundaries, (2) legacy CCRE/Cybersecurity Rubric materials, (3) methodology authorship/assignment evidence, and (4) brand/media/domain/demo-label evidence.

This is a packaging/provenance condition, not a legal-clearance conclusion and not a reason to alter the working product during this documentation pass.

## Recommended next step

Owner and counsel should review `ACQUISITION_IP_PROVENANCE_MATRIX.md`, `PROPOSED_TRANSACTION_ASSET_SCHEDULE.md`, and `ACQUISITION_OWNER_DECISION_MEMO.md`; designate the NIST AI RMF Playbook and legacy CCRE/Cybersecurity Rubric assets as approved, controlled, archived, or excluded; then issue a versioned buyer data-room manifest from `CONTROLLED_DILIGENCE_INDEX.md` before sharing code-level diligence materials.
