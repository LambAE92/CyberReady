# Known Limitations

CyberReady is a functional prototype and transfer-ready asset package. The following items should be understood before acquisition or production launch.

## Production Hardening

- SQLite is used for the Hall Monitor runtime database. This is acceptable for demos and MVP validation. A production SaaS should migrate to Postgres.
- File uploads are stored locally. Production should move uploads to object storage such as S3-compatible storage.
- Sessions use Express session storage. Multi-instance production deployment should use a managed session store.
- There is no billing, subscription, or customer provisioning workflow.
- There is no formal tenant onboarding workflow.
- There is no production monitoring, alerting, or error tracking configured.
- The Hall Monitor client currently builds as a large JavaScript chunk. This is acceptable for demo use, but production should add route-level code splitting.

## Security And Access

- Demo credentials are included for evaluation and should be rotated before public deployment.
- Hosted demo access should be manually controlled and provided only to qualified acquisition prospects.
- Hosted demo should contain only synthetic or seeded data.
- Hosted demo environments should include a visible banner indicating "Demo Environment — Synthetic Data Only".
- Demo environments should not contain real district or organizational data.
- Demo credentials should be rotated or reset periodically during buyer outreach.
- The app uses role-based access, but it does not include SSO, MFA, SCIM, or enterprise identity federation.
- The repository includes reference documents that should be reviewed for third-party usage rights before resale or public distribution.
- Local `.env` files are ignored and not included. Buyers must create their own deployment secrets.

## Product Scope

- Hall Monitor is demo-ready and MVP-oriented. Some workflows are designed to show the buyer opportunity rather than represent fully automated enterprise operations.
- AI-assisted finding analysis requires `ANTHROPIC_API_KEY`. Without it, manual finding entry still works.
- The website includes static preview components rather than live Hall Monitor data.
- CAIRE/CAGR assessment is implemented as an evidence and scoring workflow, not a fully automated external audit system.
- Domain transfer details are placeholders until registrar and buyer details are finalized.

## Testing Notes

- Hall Monitor smoke tests require the API server to be running on port 3001.
- The test suite validates core auth, district scoping, executive summary, assessment, self-assessment, notification, audit log, and role access behavior.
- Browser testing should be repeated after deployment because local CORS and hosted CORS differ.

## Recommended Next Fixes

- Add a production migration plan from SQLite to Postgres.
- Add automated CI for builds and smoke tests.
- Add deployment-specific health checks.
- Add backup and restore documentation.
- Add a formal privacy and data handling review before real district data is used.
