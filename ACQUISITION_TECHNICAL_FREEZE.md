# CyberReady Technical Acquisition Freeze

**Freeze date:** 2026-09-24  
**Status:** Technical acquisition freeze. This record is not legal clearance, a licence opinion, or a transaction agreement.

CyberReady entered technical acquisition freeze following completion of the documented remediation and validation process.

## Freeze baseline

- **Pre-merge remediation branch:** `final-acquisition-remediation`
- **Pre-merge remediation HEAD:** `5fd52e0ce4f9d9c1754acbee13abbc8c964bcb00`
- **Main baseline before merge:** `3dea7ed62955ea22c763effd342b6ecbd34fe242`
- **Methodology versions:** CCRR v1.0 and CEAM v1.0 for active cybersecurity assessment; CAGR and CAIRE for active AI-governance assessment/evidence workflows.
- **Active demo:** Pine Ridge Unified School District, an owner-confirmed fictional CyberReady demonstration/testing environment. The prior Walkerville concept is historical remediation context only and is not part of the approved active buyer/demo snapshot.

## Validated technical state

The following pre-merge validation completed successfully against disposable local test databases and local production build outputs:

| Validation | Command | Result |
| --- | --- | --- |
| CCRR/CEAM methodology | `node --test tests/ccrr.test.mjs` | PASS — 8/8 |
| CCRR API, migration, reassessment, evidence gate, and district isolation | `node --test tests/ccrr-api.test.mjs` with disposable `HALLMONITOR_DB_PATH` and temporary demo credentials | PASS — 5/5 |
| Hall Monitor smoke/regression, including authentication, role scope, CCRR/legacy compatibility, and CAIRE/CAGR regression | `node --test tests/smoke.test.mjs` with disposable `HALLMONITOR_DB_PATH` and temporary demo credentials | PASS — 24/24 |
| Hall Monitor production client build | `node node_modules/vite/bin/vite.js build` from `hall-monitor/client` | PASS — exit 0 |
| Website static production export | `node node_modules/next/dist/bin/next build --webpack` from `website` | PASS — exit 0; 24 static routes generated |

## Product boundaries confirmed at freeze

- Active cybersecurity assessment and reporting use CCRR/CEAM. Legacy CCRE/Cybersecurity Rubric scores are preserved for historical compatibility and are not automatically converted into CCRR scores.
- CCRR retains separate current and target maturity, and confidence does not mathematically change maturity. CEAM evidence validation gates remain active; legacy evidence must be reviewed/revalidated before it supports a CCRR determination.
- Active AI-governance workflows remain CAGR/CAIRE. The active NIST AI RMF Playbook content and hybrid CAGR fields remain separately classified external-reference/counsel-review material.
- Active runtime/demo source does not use Walkerville, *The Magic School Bus*, or the retired character-derived identities.
- Authentication, authorization, and district-scoping regression tests passed. No tracked secret values were identified in the approved source snapshot.
- No excluded historical/reference collection is required by the active runtime. Historic CCRE/Cybersecurity Rubric/CC4E material remains preserved only under the documented historical/controlled-diligence boundary.

## Known technical limitations

The existing disclosed limitations remain unchanged: SQLite/single-process storage, in-memory sessions, no enterprise SSO/MFA/SCIM, no managed object storage/backup/observability/CI, manual deployment, no live security telemetry ingestion, and optional Anthropic-based extraction that requires a buyer-controlled account/key and an approved data-handling approach. See `KNOWN_LIMITATIONS.md`, `SECURITY_REVIEW.md`, and `TECHNICAL_ARCHITECTURE.md`.

## Provenance and counsel items

The following remain transaction/legal questions and are not product-engineering blockers:

- NIST AI RMF Playbook and hybrid CAGR external-content treatment.
- Legacy CCRE/Cybersecurity Rubric/CC4E archive disposition.
- Brand/media source, tool/platform, licence, release, and transfer treatment.
- Definitive transaction representations and warranties.
- Domain-transfer closing mechanics, including registrar/DNS coordination.

The owner-confirmed methodology contributor, active demo, brand/media creation-context, and transaction-intent records remain in `ACQUISITION_IP_PROVENANCE_MATRIX.md`, `ACQUISITION_PROVENANCE_EVIDENCE_REGISTER.md`, and `DEMO_DATA_PROVENANCE.md`. They do not create legal clearance.

## Buyer-delivery and account boundary

The canonical repository is the clean post-remediation source repository. A buyer delivery is a fresh approved source snapshot or archive generated from the approved acquisition tag/commit; it is not a seller working-directory copy.

The buyer-delivery snapshot must exclude `.git`, unreachable Git objects, seller-local metadata, local environment files, credentials, secrets, databases, uploads, logs, retired credentials, excluded historical/reference collections, and counsel-only/negotiation material unless separately approved. Controlled-diligence material is supplied only according to `CONTROLLED_DILIGENCE_INDEX.md`; excluded/historical material is preserved separately by the seller and is not deleted by this freeze.

Buyer-controlled hosting must be recreated by the buyer. Seller hosting accounts and CyberReady email accounts are excluded. There are no CyberReady social accounts to transfer. `cyberreadyschools.com` is intended to transfer separately through appropriate domain-transfer procedures, with seller cooperation for DNS cutover; the repository does not promise a hosting-account transfer.

## Change control after freeze

Further product, methodology, configuration, documentation, or packaging changes after this point require explicit acquisition-related justification, review, validation proportionate to the change, and a new documented freeze decision. This freeze does not authorize deployment, a repository-visibility change, domain/DNS action, account transfer, history rewrite, or a push.
