# Known Limitations

CyberReady is a functional prototype and acquisition-ready product foundation. The following items should be understood before production launch or a definitive asset transfer. They are not claims of product failure.

## Production hardening

- Hall Monitor uses a local SQLite runtime database. A commercial multi-tenant deployment should adopt the buyer’s managed database and migration approach.
- Evidence/uploads are handled in memory and extracted text is stored in SQLite. Production needs managed object storage, malware controls, quotas, retention/deletion, and asynchronous processing.
- Sessions use an Express in-memory store. Multi-instance deployment needs a managed identity/session architecture.
- Billing, subscription, customer provisioning, invitations, password reset, SSO, MFA, SCIM, monitoring, alerting, CI/CD, IaC, and backup/restore are not implemented.
- The Hall Monitor client has a non-failing large-bundle warning. Performance work is a buyer opportunity.

## Security and data governance

- Controlled demos require buyer/operator-created credentials, a new session secret, synthetic data only, and rotation after use.
- The application can store sensitive district evidence, uploaded text, names, emails, IP/log data, and assessment records at runtime. The default transaction package excludes runtime data, uploads, databases, logs, and credentials.
- Optional Anthropic finding extraction requires a buyer-controlled API key and a buyer decision on privacy, consent, redaction, vendor terms, retention, and operational controls. Manual finding entry works without it.
- Enterprise identity, CSRF/security headers, centralized logging, SAST/SCA/SBOM, penetration testing, and production infrastructure review remain next-stage work.

## Product scope

- Hall Monitor provides assessment/governance workflow, evidence capture, findings, maturity scoring, roadmap, dashboard, and executive-summary capabilities. It does not independently validate controls, replace professional judgment, guarantee compliance, provide a certified audit, or ingest live SIEM/EDR/network/identity telemetry.
- Current CCRR reporting is dashboard/governance-status/executive-summary based. A downloadable CCRR-specific report generator remains a buyer opportunity.
- Website previews and seed metrics are static/synthetic demonstration content, not live district security telemetry.
- CAIRE/CAGR is an evidence and scoring workflow, not an automated external audit system.

## Provenance and transfer boundary

- CCRR, CEAM, CAIRE, and CAGR are presented as seller-created methodology candidates. Seller must confirm authorship/assignment and source boundaries before they are represented as exclusive proprietary IP.
- NIST CSF/AI RMF are external reference frameworks. The active AI module additionally includes a separately identified NIST AI RMF Playbook data set; it is not represented as CyberReady-owned and requires the controlled-diligence/owner decision in `ACQUISITION_IP_PROVENANCE_MATRIX.md`.
- Retained legacy CCRE/Cybersecurity Rubric/CC4E material is historical/provenance content, not the active CCRR/CEAM cybersecurity methodology. It should not be a default transfer asset without review.
- Brand/logo/banner, founder headshot, video/audio, domain, hosting, email, and social/account assets require a specific owner/counsel schedule. Repository presence is not ownership proof.

## Testing and operational notes

- The completed CCRR/CEAM review recorded passing methodology, API, smoke/regression, and production-build checks. Documentation-only provenance work does not replace those results.
- A clean buyer environment should reproduce dependency installation, tests, builds, SBOM/NOTICE, advisory checks, and demo operation before acceptance.
- Domain and hosting transfer notes remain placeholders until seller account/control evidence and buyer destination details are documented.

## Recommended buyer sequence

1. Confirm transferable, controlled, excluded, and owner/counsel-decision assets using the proposed schedule.
2. Reproduce the product in a buyer-controlled synthetic environment.
3. Select production identity, database, storage, monitoring, backup, and privacy/vendor controls.
4. Perform SBOM/SCA/secret-scanning, security, privacy, legal, accessibility, and load reviews against that production design.
5. Add commercial, integration, and operator workflows only where they fit the buyer’s operating model.
