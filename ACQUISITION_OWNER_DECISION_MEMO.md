# CyberReady Acquisition Owner Decision Memo

**Internal technical memo — owner/counsel review requested.**
**Baseline:** `final-acquisition-remediation` at `8ee27598b73bb0f7db1a4f2ba83aa5aa93739053`.

This memo lists decisions supported by the repository review. It does not determine legal ownership, licence scope, infringement, trademark rights, or transferability.

## Decision 1 — Confirm the seller-created methodology package

| Item | Detail |
| --- | --- |
| **Issue** | CCRR, CEAM, CAGR, and CAIRE are presented in product and controlled Drive specifications as CyberReady-created methodology, but the repository does not contain signed authorship/assignment or source-creation records. |
| **Relevant assets** | `ccrrData.js`, `ccrrAssessment.js`, `server/ccrr.js`, `cagrData.js`, AI Governance UI; controlled Drive CCRR/CEAM/CAGR/CAIRE DOCX specifications. |
| **Repository evidence** | Current clean history identifies Alex Lamb as the author of the relevant commits; the Drive specifications describe CyberReady methodology and their relationship to NIST. This evidence is helpful but not chain-of-title proof. |
| **Practical alternatives** | (a) confirm all four as proposed seller methodology assets with author/assignment support; (b) transfer software implementation only and make methodology non-exclusive/limited; (c) defer method rights from the transaction pending review. |
| **Technical consequence** | (a) supports a clean methodology exhibit; (b)/(c) requires the buyer fact sheet and product copy to narrow exclusivity/proprietary claims. |
| **Conservative packaging default** | Offer the source and method records as **candidate transfer assets**, subject to owner confirmation; do not call them legally cleared proprietary IP. |
| **Counsel review** | Appropriate. |

## Decision 2 — Set treatment for active NIST AI RMF Playbook content

| Item | Detail |
| --- | --- |
| **Issue** | `hall-monitor/client/src/data/aiRmfPlaybook.js` says it is generated from the NIST AI RMF Playbook (NIST AI 100-1), contains 72 lengthy entries, and is actively rendered as “NIST Playbook Actions.” `cagrData.js` also includes AI RMF-like subcategory prose. |
| **Repository evidence** | File header, content structure, and imports in `AIGovernance.jsx` and `UnifiedAssessmentTabs.jsx`. |
| **Practical alternatives** | (a) retain with an approved external-source/notice position; (b) place the file outside the default buyer transfer and retain only as controlled reference; (c) later replace/rewrite it with independently authored guidance after an approved process; (d) remove it from runtime after preserving a historical copy. |
| **Technical consequence** | (a) keeps current AI guidance; (b) requires the buyer to decide how to operate that UI feature; (c)/(d) is product work and was intentionally not performed in this review. |
| **Conservative packaging default** | **Controlled diligence only**. Do not represent it as seller-owned or schedule it as an unrestricted transfer asset. |
| **Counsel review** | Appropriate and material before broad buyer distribution. |

## Decision 3 — Resolve the legacy CCRE/Cybersecurity Rubric boundary

| Item | Detail |
| --- | --- |
| **Issue** | Legacy data/source remains in `rubricData.js`, `cybersecurityAssessment.json`, `assessmentGuidance.js`, and `report-generator.js`. It includes CCRE/Cybersecurity Rubric language and is retained for historical/compatibility truth. |
| **Repository evidence** | Active CCRR routes/UI do not import these files; legacy report generation for new use returns `410`; terminology audit identifies them as rights-sensitive. |
| **Practical alternatives** | (a) preserve in an owner-only historical archive; (b) give qualified buyers a controlled historical copy; (c) retain it in the product only after rights review; (d) remove it from a future transferable repository after first preserving the historical record. |
| **Technical consequence** | The active CCRR/CEAM product does not require the files. Removing/moving them later may affect historic report/compatibility access and requires a planned migration decision. |
| **Conservative packaging default** | **Historical reference only / controlled diligence**; exclude from the default seller-owned schedule. |
| **Counsel review** | Appropriate. |

## Decision 4 — Confirm the CCRE Practitioner statement and external form treatment

| Item | Detail |
| --- | --- |
| **Issue** | The website identifies Alex Lamb as a CoSN CCRE Practitioner, and the Hall Monitor sidebar links to a Google-hosted CoSN Masterclass interest form. |
| **Repository evidence** | `website/src/app/about/page.tsx`; `Sidebar.jsx`; `CCRE_COSN_TERMINOLOGY_AUDIT.md`. No certificate, permission, course-delivery right, or CoSN account/control evidence is in the repository. |
| **Practical alternatives** | (a) confirm the wording and keep it; (b) use only neutral historical language; (c) remove the external form/credential reference later if unsupported. |
| **Technical consequence** | The link is an external navigation item, not required for CCRR/CEAM operation. |
| **Conservative packaging default** | Credential/link are **reference-only**, not a transfer asset and not a claimed relationship with CoSN. |
| **Counsel review** | Appropriate. |

## Decision 5 — Confirm brand, domain, media, and founder-likeness scope

| Item | Detail |
| --- | --- |
| **Issue** | CyberReady/Hall Monitor branding is used in source, but there are no design assignments, trademark records, registrar records, photographer licences, media releases, or account-control records in the repository. |
| **Relevant assets** | Logo/banner copies, headshot, `modernizing-cyber-governance.mp4`, `cybersecurity-boardroom-podcast.m4a`, domain/hosting notes. |
| **Repository evidence** | Identical logo/banner hashes show shared brand copies, not ownership. The media/headshot are tracked with no credit/source records. Domain notes are `TBD`. |
| **Practical alternatives** | (a) include only cleared brand files and domain/accounts; (b) include code/copy but license/rebrand brand/media to buyer; (c) exclude uncertain media/headshot/template icons. |
| **Technical consequence** | The website currently renders the logo and video; a future buyer may need substitute assets or a revised marketing build if assets are excluded. |
| **Conservative packaging default** | Brand/domain/headshot/media are **owner/counsel decision**. Exclude uncertain video/audio/headshot from default transaction delivery. |
| **Counsel review** | Appropriate. |

## Decision 6 — Confirm demo-label and real-person data treatment

| Item | Detail |
| --- | --- |
| **Issue** | The local seed workflow is documented as synthetic but uses the labels “Walkerville School District,” “Alex Lamb,” and “Valorie Frizzle.” |
| **Repository evidence** | `database.js`; `DEMO_SETUP.md` labels the seed database synthetic. The source does not expressly establish that every label is fictional or released. |
| **Practical alternatives** | (a) owner confirms labels are synthetic/cleared; (b) later substitute neutral labels; (c) distribute only the seed logic in controlled demos. |
| **Technical consequence** | No current secret is embedded; operators create credentials. Changing labels later would be a small product/data change, not needed for this documentation review. |
| **Conservative packaging default** | Treat as **controlled synthetic demo data pending confirmation**; do not include runtime data or screenshots without owner approval. |
| **Counsel review** | Appropriate for named-person or customer-like label use. |

## Decision 7 — Approve the public versus controlled transaction boundary

| Item | Detail |
| --- | --- |
| **Issue** | The present repository is public, yet it contains implementation source and detailed diligence records. The recommended transaction model is more restrictive for buyer materials. |
| **Repository evidence** | `PUBLIC_REPOSITORY_REMEDIATION.md`, current public clean history, and `CONTROLLED_DILIGENCE_INDEX.md`. |
| **Practical alternatives** | (a) retain current public sale package and release only approved controlled materials separately; (b) create a future curated public overview and separate controlled buyer copy; (c) keep a single public repository while accepting disclosure/exclusivity trade-offs. |
| **Technical consequence** | No hosting/product behavior changes. Choice affects data-room process, not the Hall Monitor runtime. |
| **Conservative packaging default** | Freeze this branch as the review snapshot; use the controlled index for serious buyer diligence and do not widen access to historical/rights-sensitive material. |
| **Counsel review** | Appropriate for transaction and trade-secret posture. |

## Decision 8 — Define the optional Anthropic handoff

| Item | Detail |
| --- | --- |
| **Issue** | Hall Monitor can send uploaded finding text and district context to Anthropic when a buyer configures an API key. |
| **Repository evidence** | `server/index.js`, `package.json`, `DEMO_SETUP.md`, `SECURITY_REVIEW.md`. |
| **Practical alternatives** | (a) transfer feature as disabled-by-default; (b) buyer enables it using buyer account/data rules; (c) exclude it from the buyer product plan. |
| **Technical consequence** | Manual finding entry works without the integration. |
| **Conservative packaging default** | Transfer code as an **optional integration**, with no seller key/account/commitment. Buyer decides enablement and data handling. |
| **Counsel review** | Appropriate for data processing, privacy, and vendor terms. |

## Owner action sequence

1. Assemble author/contributor, domain/account, brand/media, and credential evidence outside the repository.
2. Decide the NIST AI RMF Playbook and legacy CCRE/Cybersecurity Rubric treatment before offering a clean proprietary-IP schedule.
3. Confirm the seed/demo labels and approved public media/screenshots.
4. Approve the public/controlled data-room boundary and use the proposed asset schedule as the starting point for counsel.
5. Have counsel convert approved decisions into definitive transaction documents; do not treat this memo as such a document.
