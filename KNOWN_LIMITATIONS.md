# Known Limitations and Buyer Opportunities

CyberReady is a functional prototype and transfer-ready asset package. The items below are normal next-stage engineering, operating, and legal work for a buyer with an established platform, delivery organisation, or go-to-market engine. They are not presented as failures or as evidence of non-functionality.

## Product and architecture opportunities

| Area | Current state | Buyer opportunity |
| --- | --- | --- |
| Runtime database | Local SQLite with lightweight startup migrations | Migrate to managed Postgres and a versioned migration process for a multi-tenant or high-availability product |
| File/report storage | Extracted document text and historic DOCX report records reside in SQLite; uploads are memory-handled | Use encrypted object storage, virus scanning, lifecycle controls, durable metadata, and a buyer-designed CCRR report export |
| Sessions | In-process Express session store | Use a managed shared session/identity architecture for horizontally scaled deployments |
| Identity | Local username/password roles only | Add SSO, MFA, SCIM, invitations, password reset, account lifecycle and enterprise access review |
| Multi-tenancy | District scoping and roles exist in one database | Add tenant provisioning, isolation testing, administration controls, and commercial tenancy policy |
| Scale/performance | No queue, cache, load test, performance budget, or operational baseline | Add asynchronous report/upload processing, cache strategy, capacity testing and service objectives |
| Operations | No IaC, container, CI/CD, monitoring, alerting, or health endpoint | Operationalise on the buyer's standard infrastructure and observability stack |
| Backup/recovery | No documented/proven restore procedure | Implement encrypted backups, restore drills, RPO/RTO, data-retention and incident runbooks |
| Billing | No subscription, entitlement, invoicing or payments | Integrate the buyer's commercial/billing model if a SaaS route is selected |
| Contact/inquiry workflow | Static website form opens a prefilled email draft only when `NEXT_PUBLIC_ACQUISITION_EMAIL` is configured | Connect to a buyer-approved CRM, form service, consent record and routing workflow if a tracked lead process is required |

## Security and data-governance opportunities

- Static seed accounts are suitable only for controlled local evaluation. Use unique, rotated credentials and a fresh session secret for every shared demo; never expose a default seed account on the internet.
- The optional Anthropic feature can send uploaded finding text and district context to an external provider. A production buyer should define consent, redaction, vendor/DPA, retention, model-use, error, and opt-out controls before enabling it with real data.
- Upload handling needs malware scanning, stricter content validation, durable storage, quotas, and asynchronous processing.
- Security headers, CSRF controls, broader rate limits, centralized logs, secret management, SCA/SBOM, SAST, dependency auditing, and penetration testing are not evidenced in the repository.
- Audit logs are useful MVP evidence but need a formal event model, durable retention, export/review, access controls, and privacy treatment.
- The privacy policy and terms need counsel validation against the actual data flows and deployment configuration before production reliance.

## Assessment and reporting scope

- Hall Monitor implements CCRR/CEAM guided scoring, structured evidence capture, calculations, dashboard/executive-summary reporting, and a sequential roadmap. It does not independently validate cybersecurity controls, replace professional judgment, guarantee regulatory compliance, or constitute a certified external audit. A CCRR-specific downloadable report remains buyer next-stage work.
- CCRE/CC4E-related names, materials, reports, badges, certificates, and masterclass content are retained historical/reference material subject to third-party framework/brand rights review. They are not the active Hall Monitor cybersecurity methodology and must not be represented as CyberReady-owned.
- CAIRE and CAGR are implemented workflow/rubric assets presented as seller-created. The buyer should obtain authorship, provenance, and source-material confirmation before treating them as exclusive proprietary IP.
- Website dashboard previews and most seeded metrics are static/synthetic demonstration content, not connected to a live security telemetry ecosystem.

## Transfer and legal opportunities

- The original repository included a large archive of material that appears to come from NIST, CoSN/CCRE, CIS, Microsoft, Databricks, HubSpot, EC-Council, Flashpoint, and other publishers. It is excluded from this public sale package and is not a blanket transferable product asset.
- The domain, registrar, hosting, trademarks, founder likeness, media assets, email addresses, social accounts, and external service accounts need a specific asset schedule and closing checklist.
- The prior repository contained duplicated resource collections and at least one path that needed Git long-path support on Windows. The public package now excludes standalone reference/archive collections; a buyer may request a controlled rights-reviewed data room separately.

## Testing and release opportunities

- One API smoke suite exists but requires a running application and seed data. CI, browser tests, accessibility checks, performance tests, deployment tests, and a formal test matrix are absent.
- This remediation completed a website dependency install and production build, a Hall Monitor server dependency install, and server syntax checks. Hall Monitor client build/smoke results and package-audit results are recorded in `SECURITY_REVIEW.md` and `FINAL_DILIGENCE_REVIEW.md`; neither is represented as a production deployment test.

## Practical next-stage sequence

1. Finalise IP/brand/licence boundaries and clean buyer data-room contents.
2. Establish controlled demo credentials and a buyer-owned hosting/secrets approach.
3. Add CI/SBOM/SCA/secret scanning, reproduce builds, and run the existing smoke suite.
4. Select production identity, database, storage, observability, and backup architecture.
5. Run security, privacy, legal, UX/accessibility, and load reviews against the chosen production design.
6. Add commercial workflow only if it supports the buyer's selected operating model.
