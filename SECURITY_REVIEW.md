# CyberReady Security Review

**Assessment type:** source/configuration/history review for acquisition diligence.  
**Not performed:** penetration test, live deployment review, dependency installation/audit, malware scan, external account review, or production infrastructure test.  
**Secret policy:** no secret values are reproduced.

## Summary

No committed `.env`, private key, cloud credential, or high-confidence API-token pattern was found in the current source or 13 reachable Git revisions. The repository is appropriately configured to ignore runtime databases, uploads, and `.env` files.

The material risks are prototype control gaps, fixed demo seeds, external AI data processing, and one authorization-scoping defect found during review. The cross-district masterclass completion update has been corrected in the current sale package; it still needs automated regression coverage.

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

## Controls observed

- `bcryptjs` password hashes rather than plaintext user-password storage.
- Production session cookie configuration includes `secure`, `httpOnly`, `SameSite=Lax`, and a 24-hour lifetime.
- Production startup fails when `SESSION_SECRET` is absent.
- CORS uses one configured origin with credentials rather than a wildcard.
- Login route has rate limiting (10 attempts/15 minutes in production).
- Most API resources use server-side role checks and district scoping, not just client route guards.
- Runtime `.env`, database, log, build, upload, and node-module paths are ignored.
- SQLite foreign keys and WAL are enabled.

## Secret and history checks

| Check | Result |
| --- | --- |
| Current tracked environment/private-key/database paths | Only `hall-monitor/.env.example` is tracked; no runtime DB, `.env`, or private-key file was found |
| Current tree common credential patterns | No high-confidence private-key, AWS-key, GitHub-token, or Anthropic-key pattern found; ordinary key-name placeholders and NIST reference data generated false-positive names |
| Reachable Git revisions | 13 revisions reviewed for common token/private-key patterns; no high-confidence secret was found |
| Demo credentials | Present historically and in seed/test code; handled as demo-account risk, not treated as a public API secret |

If any demo account was ever internet-accessible, rotate its password and session secret outside the repository, invalidate active sessions, and review hosting access logs. Do not assume that removing documentation invalidates previously observed credentials.

## PII and sensitive-data handling

The code can store names, usernames, email addresses, organization/role, IP addresses, district context, findings, evidence, uploaded document text, notes, assessment data, and report documents. Excluded private reference archives may also contain personal/prospecting information. Demo/synthetic status for every seed asset should be confirmed before buyer sharing.

The privacy policy makes statements that go beyond the specific controls evidenced in this code audit (for example, analytics, processing, legal compliance, and security measures). It requires counsel and privacy-owner review before it is treated as an operational policy.

## Required pre-production security work

1. Complete the SEC-02 regression test and full role/tenant authorization test matrix.
2. Replace fixed demo seed account defaults with a controlled provisioning/bootstrap approach; rotate all exposed demo credentials.
3. Implement managed identity, MFA, SSO/SCIM where required, password lifecycle, and a managed session store.
4. Move data to managed Postgres and files/reports to encrypted object storage with backup/restore testing.
5. Establish upload threat controls and an explicit Anthropic/data-processing governance model.
6. Add security headers, CSRF protection, centralized structured logs, monitoring, alerting, SAST/SCA/secret scanning, SBOM, and CI.
7. Conduct an authenticated penetration test and independent privacy/legal review after a production architecture is selected.
