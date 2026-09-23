# CyberReady Controlled Diligence Index

**Purpose:** Proposed technical data-room structure for qualified buyer diligence.
**Status:** Packaging design only. No file is moved, deleted, made private, shared, or reclassified in the repository by this document.
**Legal note:** Access level reflects technical/provenance sensitivity, not a legal privilege determination.

The current repository is public. This index identifies a more conservative buyer-delivery boundary to use before broader outreach or source-level review. Keep a record of recipient, version/commit, date, access terms, and any right/provenance exception for every controlled delivery.

## 01_Executive

| Access | Material |
| --- | --- |
| **PUBLIC / NON-CONFIDENTIAL** | `README.md`, `ACQUISITION_BRIEF.md`, `CYBERREADY_BUYER_TECHNICAL_FACT_SHEET.md`, approved website pages, approved synthetic product previews |
| **NDA / CONTROLLED DILIGENCE** | `sale-package/BUYER_OVERVIEW.md`, `sale-package/DEMO_SCRIPT.md`, `ACQUISITION_AUDIT.md`, current demo walkthrough/URL only if separately provisioned |
| **OWNER/COUNSEL ONLY** | Negotiation notes, unapproved valuation materials, buyer-specific correspondence, any prospective-buyer records |

## 02_Product

| Access | Material |
| --- | --- |
| **PUBLIC / NON-CONFIDENTIAL** | High-level Hall Monitor capability description, approved static screenshots, public website source only if the seller accepts the existing public boundary |
| **NDA / CONTROLLED DILIGENCE** | `hall-monitor/client/src/`, `hall-monitor/server/`, `hall-monitor/tests/`, `hall-monitor/README.md`, `DEMO_SETUP.md`, `SETUP.md`, `DEPLOYMENT.md`, package manifests/lockfiles, buyer-controlled synthetic demo instructions |
| **OWNER/COUNSEL ONLY** | Any runtime database, buyer credentials, real uploaded evidence, logs, service-account configuration, unapproved product roadmap |

## 03_Technical_Architecture

| Access | Material |
| --- | --- |
| **PUBLIC / NON-CONFIDENTIAL** | High-level architecture in `CYBERREADY_BUYER_TECHNICAL_FACT_SHEET.md` and approved portions of `TECHNICAL_ARCHITECTURE.md` |
| **NDA / CONTROLLED DILIGENCE** | `TECHNICAL_ARCHITECTURE.md`, `CCRR_CEAM_IMPLEMENTATION_REPORT.md`, API/schema/source walkthrough, build and test records |
| **OWNER/COUNSEL ONLY** | Infrastructure account exports, internal network topology, deployment credentials, security-testing results obtained outside the repository |

## 04_Methodologies

| Access | Material |
| --- | --- |
| **PUBLIC / NON-CONFIDENTIAL** | High-level statement that CCRR/CEAM and CAIRE/CAGR are CyberReady methodology candidates aligned to external NIST frameworks; no external source text or legal ownership representation |
| **NDA / CONTROLLED DILIGENCE** | `CCRR_CEAM_IMPLEMENTATION_REPORT.md`, `hall-monitor/client/src/data/ccrrData.js`, `ccrrAssessment.js`, `ccrr.js`, `cagrData.js`, relevant AI-governance workflow source, controlled copies of CCRR/CEAM/CAGR/CAIRE source specifications once approved |
| **OWNER/COUNSEL ONLY** | Methodology author/assignment evidence, source drafts, revision records, originality/provenance analysis, any unreviewed external-framework comparison |

## 05_IP_and_Provenance

| Access | Material |
| --- | --- |
| **PUBLIC / NON-CONFIDENTIAL** | `LICENSE.md` and a concise approved rights-boundary statement |
| **NDA / CONTROLLED DILIGENCE** | `ACQUISITION_IP_PROVENANCE_MATRIX.md`, `IP_OWNERSHIP_AND_LICENSES.md`, `WEBSITE_ASSET_PROVENANCE.md`, `CCRE_COSN_TERMINOLOGY_AUDIT.md`, package manifests/lockfiles, selected asset hashes |
| **OWNER/COUNSEL ONLY** | `ACQUISITION_OWNER_DECISION_MEMO.md`, contributor assignments, licence receipts, rights correspondence, trademark/domain account evidence, media releases, controlled Drive source-document metadata |

## 06_Security_and_Limitations

| Access | Material |
| --- | --- |
| **PUBLIC / NON-CONFIDENTIAL** | High-level prototype/production limitations from buyer fact sheet and approved website claims |
| **NDA / CONTROLLED DILIGENCE** | `SECURITY_REVIEW.md`, `KNOWN_LIMITATIONS.md`, `FINAL_DILIGENCE_REVIEW.md`, `DEMO_SETUP.md`, security-relevant source/configuration review |
| **OWNER/COUNSEL ONLY** | Any previously exposed credential investigation, hosting logs, penetration-test output, actual incident records, remediation evidence, external-account security material |

## 07_Demo

| Access | Material |
| --- | --- |
| **PUBLIC / NON-CONFIDENTIAL** | Approved static screenshots/video that the owner has confirmed are synthetic and cleared |
| **NDA / CONTROLLED DILIGENCE** | `DEMO_SETUP.md`, synthetic seed workflow, `sale-package/DEMO_SCRIPT.md`, a separately created buyer/group-specific demo account if approved |
| **OWNER/COUNSEL ONLY** | Runtime demo credentials, reset instructions tied to a hosted instance, access logs, uploaded files, any data provenance record for seed labels/screen captures |

## 08_Transaction_Assets

| Access | Material |
| --- | --- |
| **PUBLIC / NON-CONFIDENTIAL** | General statement that an asset transfer is contemplated, subject to definitive agreement |
| **NDA / CONTROLLED DILIGENCE** | `PROPOSED_TRANSACTION_ASSET_SCHEDULE.md`, `TRANSFER_PLAN.md`, `sale-package/HANDOFF_CHECKLIST.md`, `sale-package/DOMAIN_TRANSFER_NOTES.md` |
| **OWNER/COUNSEL ONLY** | Definitive asset schedule, account/domain transfer records, purchase agreement, consideration, tax records, closing checklist, buyer contact and negotiation records |

## 09_Historical_and_Restricted

| Access | Material |
| --- | --- |
| **PUBLIC / NON-CONFIDENTIAL** | A short statement that historic third-party framework materials are not active methodology and require review |
| **NDA / CONTROLLED DILIGENCE** | Only material that the seller/counsel has individually approved: legacy report-generator explanation, legacy data-file inventory, and migration history |
| **OWNER/COUNSEL ONLY** | `hall-monitor/client/src/data/{rubricData.js,cybersecurityAssessment.json,assessmentGuidance.js}`, `hall-monitor/server/report-generator.js`, `aiRmfPlaybook.js`, any pre-remediation archive, CCRE/CC4E/certificate/badge/course material, vendor/publisher/reference archive, rights correspondence |

## 10_Legal_Review_Pending

| Access | Material |
| --- | --- |
| **PUBLIC / NON-CONFIDENTIAL** | None by default |
| **NDA / CONTROLLED DILIGENCE** | Only an approved issue summary that does not disclose privileged, sensitive, or unverified material |
| **OWNER/COUNSEL ONLY** | `ACQUISITION_OWNER_DECISION_MEMO.md`, unresolved portions of `ACQUISITION_PROVENANCE_REVIEW_REPORT.md`, ownership evidence, credential/affiliation support, media/design licences, NIST/CoSN usage analysis, personal-data review |

## Delivery controls

1. Deliver a tagged commit hash and a file manifest from a fresh clone or commit archive, never an uncontrolled working directory or its `.git` folder. The local object database contains unreachable historic reference material that is not part of the approved branch snapshot.
2. Exclude all `.env`, databases, uploads, logs, runtime reports, credentials, and buyer/group demo accounts from repository delivery.
3. Identify every controlled document by version/date and record whether its status is candidate, cleared, excluded, or pending review.
4. Do not deliver the NIST AI RMF Playbook data, legacy CCRE/Cybersecurity Rubric source material, media, or controlled Drive methodology records as seller-owned assets absent an explicit owner/counsel decision.
5. Preserve an immutable seller-side closing snapshot and the original restricted archive separately from any buyer working copy.
