# CyberReady Transfer Plan

This plan is an acquisition-handoff framework, not a purchase agreement. Final assets, ownership, rights, conditions, exclusions, representations, transition support, and timing must be set in definitive transaction documents.

## Proposed transfer inventory

| Asset | Status | Transfer notes |
| --- | --- | --- |
| Hall Monitor application source, configuration templates, tests and documentation | Transferable subject to seller title confirmation | Includes Express API, React/Vite client, SQLite seed workflow, reporting logic and local run instructions |
| CyberReady website source and static assets | Transferable subject to seller title confirmation | Includes Next.js site, original copy/components and product-preview UI; verify individual image/media provenance |
| CyberReady and Hall Monitor names, logos, visual assets and marketing copy | Requires specific review | Confirm trademark/design ownership, source files, domains and permitted use before scheduling |
| CAIRE concept/workflow, CAGR implementation and original scoring/reporting logic | Transferable subject to authorship/provenance confirmation | Excludes NIST/CCRE/other third-party source language or materials unless separately cleared |
| Seller-authored buyer materials | Transferable subject to authorship confirmation | Include final version of audit, architecture, limitations, demo and handoff documentation |
| Current public source history | Transferable subject to seller title confirmation | Curated sale-package root history only; the pre-remediation history/archive is excluded unless specifically scheduled under controlled diligence |
| Domain and DNS | Requires specific closing documentation | Registrar, renewal, account holder, authorization code, DNS export and buyer destination must be named |
| Hosted application/site, email and external service accounts | Requires specific closing documentation | Transfer, migrate, recreate or expressly exclude each account; repository references do not prove ownership |
| Transition assistance | Negotiated | Define scope, hours, method, acceptance criteria, response window and compensation in the agreement |

## Assets subject to licence or review

| Class | Examples | Proposed handling |
| --- | --- | --- |
| Framework/standard references | NIST CSF/AI RMF, CoSN CCRE, historical CC4E | Describe as references or mappings only; include only as permitted by their rights owners and counsel |
| CCRE programme materials | Rubrics, badges, certificates, masterclass/course/report templates, evaluator language | Excluded from owned-IP schedule pending written permission/rights review |
| Publisher/vendor material | CIS, Microsoft, Databricks, HubSpot, EC-Council, Flashpoint, books/e-books, prompt packs, research reports | Exclude or provide in a restricted reference schedule only after file-by-file rights review |
| Open-source dependencies | Packages listed in npm manifests/locks | Not assigned as proprietary IP; buyer receives source configuration subject to third-party licence terms |
| Anthropic integration | SDK and optional API feature | Buyer obtains its own contract/account/key; seller should not transfer credentials |
| Personal/prospect/media assets | Founder headshot, prospect spreadsheet, audio/video, named-person material | Include only with explicit consent, purpose and transfer-right confirmation |

## Excluded unless expressly added

- Real customer/district data, active credentials, API keys, secrets, managed database contents, logs, and uploaded documents.
- Personal accounts, payment/billing accounts, email inboxes, hardware, licenses, social accounts, domains, or hosting accounts not expressly scheduled.
- CCRE/CoSN/CC4E certificates, badges, courses, report templates, marks, claims of certification/affiliation, or other third-party materials lacking written transfer/usage rights.
- Any externally published reference, research, media, book, prompt pack, dataset, or vendor collateral lacking documented rights.
- Promised revenue, customers, production deployments, certifications, market adoption, support, or founder services not stated in a signed agreement.

## Closing workplan

### 1. Pre-signing diligence

1. Provide the buyer a controlled repository/data room and the acquisition-readiness documents.
2. Confirm legal ownership and contributor assignment for seller-created code, methodology, copy, designs and brand assets.
3. Create a third-party IP/rights register and mark each retained reference item as cleared, licensed, excluded, or unresolved.
4. Redact/replace fixed demo credentials and share a controlled, isolated demo only.
5. Agree whether a separately controlled pre-remediation archive is needed for diligence; do not treat it as part of the default asset transfer.

### 2. Signing and closing

1. Execute an asset schedule and IP assignment/licence provisions.
2. Transfer or mirror the chosen source repository to buyer control; preserve an immutable seller closing archive if agreed.
3. Deliver seller-owned source/artwork/documentation and the mutually approved cleared-reference schedule.
4. Rotate all secrets and create buyer-owned accounts for hosting, DNS, analytics/CRM (if any), Anthropic (if used), database/storage and monitoring.
5. Transfer the domain via registrar process only after confirming the buyer destination and DNS rollback plan.

### 3. Acceptance and transition

1. Buyer performs a clean local build/run and verifies Hall Monitor and website against `DEMO_SETUP.md`.
2. Buyer confirms receipt of source, documentation, asset schedule, domain/DNS records (if included), and credentials through a secure channel.
3. Seller provides only the transition assistance expressly agreed in writing.
4. Buyer assumes operations only after its own infrastructure, identity, data-handling and production acceptance checks are complete.

## Buyer acceptance checklist

- [ ] Repository source is present on a buyer-controlled branch/account.
- [ ] Buyer can create an isolated demo database and log in with buyer-created credentials.
- [ ] Hall Monitor and website build/run documentation has been validated in the buyer's environment.
- [ ] All transferred assets are listed, and all exclusions/third-party materials are expressly identified.
- [ ] Domain/DNS/hosting/account transfers have owners, dates and rollback contacts.
- [ ] Buyer-owned secrets replace all shared-demo or seller-controlled secrets.
- [ ] License, framework, trademark, privacy and data-processing decisions are documented.
- [ ] Transition assistance and final acceptance are recorded.
