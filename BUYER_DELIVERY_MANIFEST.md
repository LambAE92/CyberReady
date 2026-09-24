# Buyer Delivery Manifest

**Status:** Technical delivery boundary and packaging manifest. It is not a definitive asset-purchase schedule, legal clearance, licence opinion, or transfer instrument.

## Canonical acquisition source

- **Canonical acquisition tag:** `cyberready-acquisition-v1.0`
- **Canonical main commit:** `257dd0b68fd575a0aa35eefa6431279ce8f54ea1`
- **Source-delivery rule:** Generate a fresh source snapshot from the tag using `sale-package/New-BuyerDeliverySnapshot.ps1`; do not deliver a seller working directory or any `.git` directory.

## Included source families

Subject to the approved packaging mode and transaction documents, the code-complete source snapshot includes:

- Hall Monitor React/Vite client, Express API, SQLite schema/seed logic, authentication/authorization, tests, package manifests, lockfiles, and local build instructions.
- CyberReady Next.js website source, static public assets subject to the separate media/asset boundary, package manifests, lockfile, and build instructions.
- CCRR/CEAM cybersecurity implementation, including the 18-domain register implementation, scoring, evidence gates, findings, roadmap, reassessment, and reporting/dashboard paths.
- CAGR/CAIRE AI-governance implementation, including AI system inventory, ratings, evidence/review workflow, and roadmap paths.

## Included documentation

The clean delivery workflow preserves the operational documentation needed for source evaluation and setup, including `README.md`, `SETUP.md`, `DEMO_SETUP.md`, `DEPLOYMENT.md`, `ACQUISITION_TECHNICAL_FREEZE.md`, Hall Monitor/website READMEs, package manifests/lockfiles, and the approved product/methodology implementation documentation.

Controlled technical/security/provenance documentation is supplied separately only as approved under `CONTROLLED_DILIGENCE_INDEX.md`.

## Methodology and external-framework boundary

CCRR/CEAM and the candidate CyberReady-authored portions of CAGR/CAIRE are part of the technical product package subject to the definitive transaction documentation. NIST CSF 2.0 and NIST AI RMF 1.0 are external reference frameworks; no NIST endorsement, certification, or ownership is represented.

`hall-monitor/client/src/data/aiRmfPlaybook.js` is active external-reference source content. The delivery script requires an explicit owner/counsel approval switch before a buyer-mode code package includes it. Controlled methodology specifications held outside the repository may be added only after their transfer scope is approved and recorded.

## Excluded from the default buyer snapshot

- `.git`, unreachable Git objects, seller working-directory metadata, local environment files, seller credentials, secrets, databases, uploads, logs, runtime reports, and unrelated personal files.
- Retired credentials, retired Walkerville demo identity material, and pre-remediation historical records except where separately approved as controlled historical context.
- Legacy CCRE/Cybersecurity Rubric/CC4E source files and legacy report-generator source identified in the delivery script.
- Counsel-only/provenance/negotiation material identified by the delivery script, unless separately approved through controlled diligence.
- Seller hosting accounts, CyberReady email accounts, and any account not expressly scheduled at closing.

## Controlled diligence only

The following categories require the controlled process and are not represented as seller-owned transfer assets by this manifest: active NIST AI RMF Playbook content and hybrid CAGR external wording; legacy framework/archive materials; detailed security/provenance records; brand/media source and rights records; controlled Drive specifications; and transaction/closing records.

## Commercial and account boundary

- **Domain:** `cyberreadyschools.com` is intended to transfer separately through appropriate domain-transfer procedures.
- **Hosting:** Buyer recreates hosting in a buyer-controlled environment. Seller hosting accounts are excluded.
- **Email:** CyberReady email accounts are excluded.
- **Social accounts:** No CyberReady social accounts are represented as transfer assets.
- **Open-source dependencies:** Delivery retains manifests and lockfiles. Dependencies remain subject to their applicable terms; a buyer should generate its own environment-specific SBOM/NOTICE and vulnerability review.

## Buyer setup requirements

The buyer supplies its own hosting, environment variables, session secret, demo/production credentials, databases/storage, DNS configuration, monitoring, and any optional Anthropic account/key. See `DEMO_SETUP.md`, `DEPLOYMENT.md`, `KNOWN_LIMITATIONS.md`, and `ACQUISITION_TECHNICAL_FREEZE.md`.
