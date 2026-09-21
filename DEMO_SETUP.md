# Safe Demo Setup

This procedure creates an **isolated, synthetic local demo** for technical diligence. It intentionally does not publish credential values. Do not use it with real district data, a production database, or a public internet-facing instance without the additional hardening in `SECURITY_REVIEW.md` and `KNOWN_LIMITATIONS.md`.

## 1. Start with an isolated copy

Use a clean local checkout and confirm that `hall-monitor/hallmonitor.db` does not contain real data. The database is ignored by Git and is created on first start. Do not reset or delete a database until you have confirmed it is the isolated demo database and not a real-data environment.

## 2. Create local configuration

Copy `hall-monitor/.env.example` to `hall-monitor/.env`. The `.env` file is ignored by Git and must never be committed, emailed, attached to a buyer packet, or pasted into documentation.

Set at least the following values to unique secrets/usernames created for this specific demo:

```env
SESSION_SECRET=<unique-long-random-value>
NODE_ENV=development
PORT=3001
CORS_ORIGIN=http://localhost:5173

DEMO_ADMIN_USER=<unique-demo-admin-username>
DEMO_ADMIN_PASS=<unique-demo-admin-password>
DEMO_DISTRICT_IT_USER=<unique-demo-district-it-username>
DEMO_DISTRICT_IT_PASS=<unique-demo-district-it-password>
DEMO_SUPERINTENDENT_USER=<unique-demo-superintendent-username>
DEMO_SUPERINTENDENT_PASS=<unique-demo-superintendent-password>

# Optional. Leave blank to keep AI extraction disabled for the demo.
ANTHROPIC_API_KEY=
```

All three seed roles are required. The values above are read only when a new demo database is seeded. Configure them before the first run or before resetting the isolated demo database; Hall Monitor intentionally refuses to create a new demo database when any value is missing or still a placeholder.

## 3. Install and run locally

```bash
cd hall-monitor
npm install
cd client
npm install
cd ..
npm run dev
```

Open the local Hall Monitor URL and sign in using the unique values you set in `.env`. Do not record those values in demo scripts, screenshots, email, or public documents.

To run the smoke test, expose the same administrator values to the test process in your shell, then run it while the API is running. For PowerShell:

```powershell
$env:DEMO_ADMIN_USER = '<the local demo administrator username>'
$env:DEMO_ADMIN_PASS = '<the local demo administrator password>'
$env:DEMO_DISTRICT_IT_USER = '<the local demo district IT username>'
$env:DEMO_DISTRICT_IT_PASS = '<the local demo district IT password>'
$env:DEMO_SUPERINTENDENT_USER = '<the local demo superintendent username>'
$env:DEMO_SUPERINTENDENT_PASS = '<the local demo superintendent password>'
node --test tests/smoke.test.mjs
```

To run the marketing site separately:

```bash
cd website
npm install
npm run dev
```

Set `NEXT_PUBLIC_HALL_MONITOR_URL` in `website/.env.local` to the local Hall Monitor URL if needed. Do not put secrets in `NEXT_PUBLIC_*` values; they are exposed to the browser at build time.

## 4. Verify synthetic data

The seed workflow uses the Walkerville demo district, risk/training/compliance data, example AI systems and sample user names. Before sharing a demo, confirm that all retained data is synthetic or cleared for use. Do not upload customer documents or student/staff PII. Leaving `ANTHROPIC_API_KEY` blank prevents document content from being sent to the optional external AI service.

## 5. Controlled buyer demonstration

For a shared buyer demo, use a separate instance and a new set of credentials for each buyer or diligence group. At minimum:

- Restrict network access and use TLS.
- Use a unique production-grade `SESSION_SECRET` and a buyer/group-specific credential set.
- Display a visible “Demo Environment — Synthetic Data Only” notice.
- Keep the Anthropic integration disabled unless the buyer has approved the data flow and supplied a buyer-controlled key.
- Do not reuse seller, developer, production, or previously circulated demo credentials.
- Reset only the known isolated demo database after each demo group; verify the target before any deletion.

## 6. Rotate and retire

After a buyer demo, rotate the demo credentials and session secret, invalidate or redeploy the demo instance as appropriate, remove uploaded demo files/data, and review access logs if the instance was accessible over a network. A documentation cleanup does not invalidate any credential that has already been observed.

## Troubleshooting

- If configuration changes do not appear to take effect, stop the local server, verify the `.env` file is in `hall-monitor/`, and confirm you are using a new isolated database.
- If an existing isolated demo was created before the credentials were configured, reset only that verified demo database so the seed operation reads the new values.
- If AI analysis is unavailable, that is expected when `ANTHROPIC_API_KEY` is blank; manual finding entry remains available.
- For production or real-data operation, do not treat this guide as sufficient. Use the production-readiness work in `KNOWN_LIMITATIONS.md` and `SECURITY_REVIEW.md`.
