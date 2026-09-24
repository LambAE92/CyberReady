# Proposed Transaction Asset Schedule

## Technical Draft for Owner/Counsel Review

This is a technical packaging proposal, not a purchase agreement, IP assignment, licence grant, or legal conclusion. The definitive transaction documents must identify the actual seller, buyer, assets, exclusions, rights, representations, conditions, accounts, and closing mechanics. An item is not confirmed transferable merely because it appears below.

**Baseline reviewed:** `final-acquisition-remediation` at `0e494f9cefe53a993685e38d30366120872effc0`.

**Evidence-pass update:** The current source snapshot contains (a) candidate CyberReady methodology/implementation content and (b) separately identified external-reference content. In particular, the active NIST AI RMF Playbook file and matching CAGR subcategory statements are not represented as seller-owned. A buyer delivery must be a fresh clone or commit archive without the seller working directory’s `.git` objects.

## 1. Proposed transferable software assets

Subject to confirmation of seller title, contributor assignments, and the exclusions below, the proposed product-code package is:

| Proposed asset | Scope | Proposed treatment | Closing evidence to request |
| --- | --- | --- | --- |
| Hall Monitor server source | `hall-monitor/server/`, including Express API, SQLite schema/seed workflow, CCRR/CEAM APIs, authentication/authorization, dashboard/reporting routes, and tests | **TRANSFER** | Source snapshot/commit hash, contributor confirmation, buyer clean-install acceptance |
| Hall Monitor client source | `hall-monitor/client/src/`, client public assets only as separately cleared, Vite configuration | **TRANSFER** | Source snapshot/commit hash, cleared asset list, buyer build acceptance |
| Hall Monitor product configuration | `hall-monitor/package*.json`, client package manifests/locks, `.env.example`, `Procfile`, setup documentation | **TRANSFER WITH LICENSE/NOTICE** | Dependency/SBOM/notice package; buyer-created credentials and accounts |
| CyberReady website source | `website/src/`, configuration, package manifests/locks, static preview components | **TRANSFER** | Source snapshot/commit hash, cleared media/brand schedule, buyer build acceptance |
| Automated test suite | `hall-monitor/tests/` and test instructions | **TRANSFER** | Test results recorded by buyer against buyer-controlled synthetic environment |

The transfer is of the seller’s interest, if any, in the product-specific source and configuration. It does not assign NIST, CoSN/CCRE, third-party npm packages, external accounts, media, or other separately classified material.

## 2. Proposed transferable CyberReady methodologies

| Proposed asset | Included technical form | Boundary | Proposed treatment |
| --- | --- | --- | --- |
| CCRR v1.0 | `ccrrData.js`, scoring helpers, database/API implementation, controlled canonical register and technical specification | NIST CSF identifiers are external mapping metadata. Repository evidence supports technical separation from legacy rubric data, but seller must confirm authorship/assignment for domain text and methodology documents. | **TRANSFER** |
| CEAM v1.0 | Evidence schema, gap taxonomy, evidence gate, findings, roadmap, reassessment implementation, controlled methodology specification | Does not transfer NIST/other external standards. Git/Drive records support a specification-to-code path, not legal title. | **TRANSFER** |
| CAGR v1.0 | `cagrData.js`, scoring and workflow implementation, controlled technical specification | The K–12 maturity/advancement/workflow layer is a candidate transfer asset. The same file also includes AI RMF-aligned subcategory statements that match the external Playbook dataset; it is a hybrid file requiring field-level review. | **OWNER/COUNSEL DECISION** |
| CAIRE v1.0 | AI Governance workflow, evidence/rating/roadmap handling, controlled methodology specification | Candidate CyberReady workflow. It does not transfer NIST AI RMF or its Playbook content; confirm its authorship/assignment and the product boundary. | **TRANSFER** |

Before closing, create a versioned methodology exhibit that identifies the exact included source files and controlled specification records, their hashes, a contributor/author confirmation, and the precise treatment of any externally-derived wording.

**Owner-confirmation update (2026-09-23):** The owner confirms that Alex Lamb created CCRR, CEAM, CAGR, and CAIRE with ChatGPT assistance and that there were no other human contributors. This satisfies the requested factual contributor confirmation for the current package; it does not replace the title, external-reference, notice, or definitive-agreement review described above.

## 3. Proposed transferable documentation

Subject to the same title and third-party-content qualifications, the seller-authored technical/documentation package may include:

- `README.md`, `SETUP.md`, `DEPLOYMENT.md`, `DEMO_SETUP.md`, `hall-monitor/README.md`, and `website/README.md`.
- `TECHNICAL_ARCHITECTURE.md`, `ACQUISITION_BRIEF.md`, `ACQUISITION_AUDIT.md`, `KNOWN_LIMITATIONS.md`, `SECURITY_REVIEW.md`, `CCRR_CEAM_IMPLEMENTATION_REPORT.md`, and buyer-demonstration materials.
- This provenance matrix, buyer fact sheet, controlled-diligence index, implementation history, and final acquisition-provenance review.
- Cleared portions of `sale-package/`, after the active CCRR/CEAM terminology and ownership boundaries are reviewed.

The buyer should not treat IP/provenance/security documents as representations or warranties. Owner/counsel-only and historical/third-party materials are handled below.

## 4. Proposed brand/commercial assets subject to ownership confirmation

| Asset | Current repository evidence | Proposed treatment |
| --- | --- | --- |
| CyberReady and Hall Monitor names, product copy, and UI presentation | Used consistently across code and website; no trademark registrations, designer agreements, or source-brand files are present | **OWNER/COUNSEL DECISION** |
| CyberReady logo and banner PNGs | Shared identical copies are tracked in website and Hall Monitor public directories; source/designer evidence absent | **OWNER/COUNSEL DECISION** |
| Domain, DNS, website/app hosting, acquisition inboxes, and social accounts | Referenced, but `DOMAIN_TRANSFER_NOTES.md` remains `TBD`; no account-control evidence is in the repository | **OWNER/COUNSEL DECISION** |
| Founder headshot | Tracked image with no release or photographer record | **OWNER/COUNSEL DECISION** |
| Homepage video and podcast audio | Tracked media with no credits/releases/source rights record | **CONTROLLED DILIGENCE ONLY** pending decision |

No brand, mark, domain, personality right, or external account should be represented as included until a closing schedule identifies it and the seller supplies evidence of control and permitted transfer.

**Owner-confirmation update (2026-09-23):** `cyberreadyschools.com` is intended for the proposed sale. CyberReady email accounts are excluded and no CyberReady social accounts exist to transfer. CyberReady branded media was assembled/created by Alex Lamb using AI generation, Canva, Adobe Express, and Google Notebook/NotebookLM. Registrar, DNS, hosting, account-control, underlying-element, and applicable tool/licence questions remain owner/counsel review items.

## 5. Third-party/open-source components used under applicable terms

The product relies on packages identified in the three package manifests and lockfiles. They are not seller-owned deliverables. The buyer receives configuration/source references subject to their applicable terms and should create a closing SBOM/NOTICE package.

- **Hall Monitor server:** Anthropic SDK, bcryptjs, better-sqlite3, cors, docx, dotenv, Express, express-rate-limit, express-session, Mammoth, Multer, and `concurrently`.
- **Hall Monitor client:** Lucide React, React, React DOM, React Router, Recharts, Tailwind/Vite/ESLint toolchain.
- **Website:** Next.js, React, React DOM, TypeScript, Tailwind/ESLint toolchain.
- **Recorded direct lockfile licences:** primarily MIT; notable direct records include bcryptjs BSD-3-Clause, dotenv and Mammoth BSD-2-Clause, Lucide ISC, and TypeScript Apache-2.0. The full lockfiles include transitive licence variants requiring normal buyer review.

## 6. External standards and reference frameworks — not CyberReady-owned

| Framework/reference | Current use | Proposed treatment |
| --- | --- | --- |
| NIST Cybersecurity Framework (CSF) 2.0 | CCRR traceability identifiers and high-level mapping | **TRANSFER WITH LICENSE/NOTICE** only as external-reference metadata; no ownership, endorsement, or certification representation |
| NIST AI Risk Management Framework (AI RMF) 1.0 | CAGR/CAIRE alignment identifiers and active playbook data | Mapping identifiers may accompany the implementation as external references. `aiRmfPlaybook.js` is active external-reference source content; the current UI imports it, so omitting it requires a future source change. Keep it **CONTROLLED DILIGENCE ONLY** pending a rights/notice decision. |
| CoSN Cybersecurity Readiness for Education (CCRE) | Qualified practitioner credential, historical context, external interest-form link | **HISTORICAL REFERENCE ONLY**; no programme asset, course, certification authority, or CoSN relationship is included |
| Cybersecurity Rubric, CC4E, ClassLink, Cybersecurity Coalition | Historical/provenance references only | **HISTORICAL REFERENCE ONLY** unless separately cleared |

## 7. Historical / controlled-diligence materials

These items should not form part of the default buyer-delivery repository package. Preserve them so the seller can tell the historical truth, but disclose them only through the proposed controlled process.

| Material | Location/evidence | Proposed treatment |
| --- | --- | --- |
| Legacy Cybersecurity Rubric source/data | `hall-monitor/client/src/data/{rubricData.js,cybersecurityAssessment.json,assessmentGuidance.js}` | **HISTORICAL REFERENCE ONLY**; potentially third-party/source-derived, not active CCRR product content |
| Legacy CCRE report source and compatibility tables | `hall-monitor/server/report-generator.js`, legacy DB structures/routes | **CONTROLLED DILIGENCE ONLY**; preserve historic access/migration truth; no current report generation |
| NIST AI RMF Playbook data | `hall-monitor/client/src/data/aiRmfPlaybook.js` | **CONTROLLED DILIGENCE ONLY**; active source metadata says generated from NIST AI RMF Playbook |
| Controlled methodology source records | Drive-held CCRR/CEAM/CAGR/CAIRE specifications and source visual records | **CONTROLLED DILIGENCE ONLY** pending owner confirmation of authorship and final delivery scope |
| Detailed security/IP/transaction records | Security, provenance, limitations, public/private, and decision documents | **CONTROLLED DILIGENCE ONLY** or owner/counsel-only as designated in the data-room index |
| Local unreachable historical Git objects | Seller working directory `.git` database; includes historic reference corpus and retired demo credential records | **EXCLUDE** from buyer delivery; preserve separately, and provide only a fresh clone/commit archive if source is approved |

## 8. Proposed excluded materials

Unless expressly added to a signed schedule after evidence review, exclude:

- Credentials, API keys, runtime `.env` files, session secrets, runtime databases, uploads, logs, report contents, real customer/district information, and contact/prospect data.
- NIST, CoSN/CCRE, CC4E, Cybersecurity Rubric, ClassLink, Cybersecurity Coalition, vendor, publisher, course, badge, certificate, or framework content not specifically cleared for the transaction.
- The NIST AI RMF Playbook data and any copied/adapted external source content unless the owner/counsel decision permits its inclusion.
- Media, headshot, template/icon assets, domains, hosting, email, social accounts, payment/accounts, and brand registrations not expressly scheduled with evidence of rights.
- The seller working directory, its `.git` directory, and any unreachable historical objects. A source delivery must be a fresh clone or commit archive of the approved branch.
- Promised revenue, customers, deployments, certifications, services, support, founder time, or other commercial commitments not specified in the definitive agreement.

## 9. Assets requiring owner/counsel confirmation

1. Chain of title and contributor assignments for source code, CCRR, CEAM, CAGR, CAIRE, documentation, site copy, and designs.
2. The exact treatment of `aiRmfPlaybook.js` and AI RMF-like subcategory wording embedded in `cagrData.js`.
3. Any right to retain, disclose, or transfer legacy CCRE/Cybersecurity Rubric/CC4E materials and names.
4. Current accuracy and permitted wording of the CCRE Practitioner credential statement.
5. Ownership/transfer scope for CyberReady/Hall Monitor marks, logo, banner, founder image, video, audio, and website assets.
6. Domain/registrar/DNS/hosting/account control and closing mechanics.
7. Synthetic status and permitted use of seed labels, named-person records, screenshots, and any controlled demo.

The active seed identity is now the owner-confirmed fictional Pine Ridge Unified School District, documented in `DEMO_DATA_PROVENANCE.md`. The prior Walkerville concept was created for CyberReady but inspired by *The Magic School Bus* and is retired from the active buyer-delivery source snapshot. Pre-remediation screenshot/media use still requires review.

## 10. Post-closing / handoff dependencies

| Dependency | Proposed approach |
| --- | --- |
| Source control | Buyer receives an agreed immutable source snapshot/branch and verifies local builds/tests. |
| Demo/production credentials | Buyer creates new credentials, session secret, service accounts, and separate synthetic demo database. No seller secret is transferred in the repository. |
| Anthropic feature | Optional. Buyer decides whether to enable it, obtains its own account/key, and accepts the data-processing and operational design. |
| Domain/hosting | Transfer, recreate, or exclude each account only under the signed account/domain schedule. |
| Methodology source records | Deliver controlled specifications and version/hash record only after owner confirms inclusion. |
| Transition assistance | Separately negotiate scope, hours, response period, recipient, and acceptance criteria. |

**Packaging default:** transfer the clearly product-specific code and seller-authored candidate documentation; keep rights-sensitive framework-derived, legacy, media, account, and provenance materials in controlled diligence or owner/counsel review until an explicit closing decision is made.
