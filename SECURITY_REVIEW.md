# CyberReady Security Review

**Assessment type:** source/configuration/history review for acquisition diligence.  
**Not performed:** penetration test, external live-host review, malware scan, external-account review, legal licence clearance, or production infrastructure test.
**Secret policy:** no secret values are reproduced.

## Summary

No committed `.env`, private key, cloud credential, or high-confidence API-token pattern was found in the current source or reachable clean-history revision. The repository is appropriately configured to ignore runtime databases, uploads, and `.env` files.

The material risks are prototype control gaps, historic demo exposure, external AI data processing, and missing production security operations. The current remediation also corrected production CORS fail-closed behavior, upload rate limiting, an opt-in-only demo reset route, and the prior cross-district masterclass-completion scoping defect. These fixes need broader regression coverage in buyer-selected production infrastructure.

## Findings

| ID | Priority | Finding | Evidence | Disposition |
| --- | --- | --- | --- | --- |
| SEC-01 | High | Fixed demo-account credentials existed in prior source, tests, and public history | `hall-monitor/server/database.js`, smoke test, pre-remediation history | The clean package requires operator-supplied seed credentials and its smoke test reads them from environment variables. Rotate/reset any internet-accessible demo; existing clones/forks may retain historic values |
| SEC-02 | High | A district user could update a masterclass-completion record belonging to another district by ID | Previous `PUT /api/masterclass/completions/:id` update lacked `district_id` predicate | **Fixed locally:** update now scopes by active district and returns 404 when no scoped record exists |
| SEC-03 | High | Uploaded findings content can be transmitted to Anthropic when the optional API key is configured | `extractFindingsWithAI` sends capped document text and district context | Require a buyer-controlled data-processing, consent, redaction, retention, and vendor-configuration decision before real district data is enabled |
| SEC-04 | Medium | Sessions use the default in-memory store | `express-session` setup in `server/index.js` | Replace with a managed shared store before multi-instance/production use |
| SEC-05 | Medium | No enterprise identity or account lifecycle | No SSO, MFA, SCIM, invite, password reset, or managed provisioning implementation found | Treat as next-stage engineering; do not position as enterprise identity-ready |
| SEC-06 | Medium | CSRF and broad security-header hardening are not evident | Session-cookie API; no CSRF middleware or security-header package/configuration found | Add deployment-aware CSRF protections, security headers, CSP, origin policy testing, and secure proxy configuration |
| SEC-07 | Medium | Upload pipeline is memory-based and relies partly on file name/type checks; PDF extraction is simplistic | Multer memory storage, 10 MB cap, name/mime filter, basic PDF byte-to-text fallback | Use durable storage, malware scanning, content-type verification, async processing, quotas and restrictive retention controls |
| SEC-08 | Medium | Runtime data can contain sensitive organizational information and PII | Audit log IP/user fields, uploads, assessment evidence, reports, masterclass requests, SQLite BLOB/text storage | Define encryption, access, retention, deletion, backup, incident, and privacy controls before production |
| SEC-09 | Medium | Audit event coverage is useful but incomplete and local | SQLite `audit_log`; some state-changing routes do not create an audit event | Define auditable events, immutable/centralized retention, export, review, and privacy handling |
| SEC-10 | Low | Development permits a fallback session secret; production exits without a secret | `SESSION_SECRET` handling in server code | Ensure each environment injects a unique managed secret; do not expose a demo instance with development settings |
| SEC-11 | Low | No CI, SBOM, current SCA result, monitoring, backup/restore verification, or public health endpoint | Repository/configuration inspection | Add before customer deployment; a package vulnerability audit could not be run here because npm was unavailable and pnpm requires its own lockfile |
| SEC-12 | Medium | A production deployment could previously start without an explicit CORS allow-list if configuration were omitted | `hall-monitor/server/index.js` prior behavior | **Fixed in this branch:** production now exits unless `CORS_ORIGIN` is configured; CORS remains credentialed and constrained to that configured origin |
| SEC-13 | Medium | Findings upload/AI extraction route had file-size limits but no route-specific throttling | `POST /api/findings/upload` | **Fixed in this branch:** route now has a 15-minute limiter (10 production / 50 local requests). This does not replace storage, malware, quota, or abuse controls. |
| SEC-14 | Medium | Authenticated platform administrators could invoke the demo-reset route whenever it was deployed | `POST /api/demo/reset` | **Fixed in this branch:** route is unavailable unless `DEMO_RESET_ENABLED=true`; it also requires the configured administrator identity. Enable only for a disposable synthetic demo. |
| SEC-15 | Medium | Current package manifests have npm lockfiles, but this environment only supplied pnpm and pnpm refuses `audit` without a pnpm lockfile | `website/package-lock.json`, `hall-monitor/package-lock.json`, `hall-monitor/client/package-lock.json`; attempted `pnpm audit --json` | **Unresolved process gap:** clean installs/builds were completed, but no package-advisory result was produced. Buyer should run `npm ci` and `npm audit` (or adopt a single lockfile/package-manager policy) in its controlled environment. |

## Controls observed

- `bcryptjs` password hashes rather than plaintext user-password storage.
- Production session cookie configuration includes `secure`, `httpOnly`, `SameSite=Lax`, and a 24-hour lifetime.
- Production startup fails when `SESSION_SECRET` is absent.
- CORS uses one configured origin with credentials rather than a wildcard.
- Login route has rate limiting (10 attempts/15 minutes in production).
- Findings upload route has a separate production-aware rate limit.
- The destructive demo-reset route is disabled by default and must be explicitly enabled for a disposable synthetic demo.
- Most API resources use server-side role checks and district scoping, not just client route guards.
- Runtime `.env`, database, log, build, upload, and node-module paths are ignored.
- SQLite foreign keys and WAL are enabled.

## Secret and history checks

| Check | Result |
| --- | --- |
| Current tracked environment/private-key/database paths | Only `hall-monitor/.env.example` is tracked; no runtime DB, `.env`, or private-key file was found |
| Current tree common credential patterns | No high-confidence private-key, AWS-key, GitHub-token, or Anthropic-key pattern found; ordinary key-name placeholders and NIST reference data generated false-positive names |
| Reachable Git revisions | Clean public history was reviewed for common token/private-key patterns; no high-confidence secret was found |
| Demo credentials | Present historically and in seed/test code; handled as demo-account risk, not treated as a public API secret |

If any demo account was ever internet-accessible, rotate its password and session secret outside the repository, invalidate active sessions, and review hosting access logs. Do not assume that removing documentation invalidates previously observed credentials.

## PII and sensitive-data handling

The code can store names, usernames, email addresses, organization/role, IP addresses, district context, findings, evidence, uploaded document text, notes, assessment data, and report documents. Excluded private reference archives may also contain personal/prospecting information. Demo/synthetic status for every seed asset should be confirmed before buyer sharing.

The public privacy policy was narrowed in this branch to distinguish the static website from the Hall Monitor prototype and to avoid unsupported legal-compliance assertions. It still requires counsel and privacy-owner review before it is treated as an operational policy.

## Verification performed in this remediation

| Check | Result |
| --- | --- |
| Website dependency installation and production build | Passed with bundled Node 24 / pnpm environment after removing build-time Google Fonts dependency; 24 static/SSG routes generated successfully |
| Hall Monitor server dependency installation | Completed; `better-sqlite3` required a local rebuild for this Node runtime |
| Hall Monitor client production build | Passed after fixing a missing import from `ccreAssessment.json` to the tracked `cybersecurityAssessment.json`; Vite warned that one minified JS chunk exceeds 500 kB |
| Hall Monitor smoke suite | Superseded by the 2026-09-23 completion run: 24 tests passed across authentication, district scoping, executive summary, CAIRE/CAGR, legacy compatibility, notifications, audit log, and role access using a fresh synthetic database and disposable local credentials |
| Package advisory check | Not completed: pnpm `audit` rejected each project because no `pnpm-lock.yaml` exists; npm was unavailable in this environment. This is not a clean advisory result. |
| Secret-pattern / tracked-runtime-path check | No high-confidence secret pattern or tracked runtime `.env`/database/upload/private-key file found; only `hall-monitor/.env.example` is tracked |

### CCRR/CEAM completion verification — 2026-09-23

The final implementation pass added deterministic in-process API tests (the server now exports its configured Express app for test use but starts normally when run directly). No deployment behavior changed. Results: 8 CCRR/CEAM unit tests, 5 CCRR/CEAM API integration tests, and 24 smoke/regression tests passed against disposable SQLite databases with environment-only synthetic credentials. The API tests cover evidence gating, all seven gap types, reassessment preservation, no legacy score conversion, and cross-district record isolation. Hall Monitor's Vite production build and the website's Next.js production build also passed; the Hall Monitor build retains a non-failing bundle-size warning. See `CCRR_CEAM_IMPLEMENTATION_REPORT.md`.

## Required pre-production security work

1. Add regression coverage for the completed cross-district, CORS, upload-limit, demo-reset, and full role/tenant authorization matrix.
2. Replace fixed demo seed account defaults with a controlled provisioning/bootstrap approach; rotate all exposed demo credentials.
3. Implement managed identity, MFA, SSO/SCIM where required, password lifecycle, and a managed session store.
4. Move data to managed Postgres and files/reports to encrypted object storage with backup/restore testing.
5. Establish upload threat controls and an explicit Anthropic/data-processing governance model.
6. Add security headers, CSRF protection, centralized structured logs, monitoring, alerting, SAST/SCA/secret scanning, SBOM, and CI.
7. Conduct an authenticated penetration test and independent privacy/legal review after a production architecture is selected.
