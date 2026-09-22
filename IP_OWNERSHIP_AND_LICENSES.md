# Intellectual Property, Ownership, and License Review

**Prepared for acquisition diligence — not legal advice.** This document inventories repository materials and identifies questions for seller, buyer, and counsel. It does not determine ownership, copyright status, trademark rights, licence scope, transferability, or enforceability.

## Review standard

Repository presence is not proof that CyberReady owns, may sublicense, may redistribute, or may transfer an item. A buyer should obtain a signed asset schedule, seller IP representation, contributor/contractor assignment evidence, domain/brand records, and written rights confirmations for material retained in the transaction.

## Category A — Seller-owned CyberReady IP (presented as seller-created; verify title)

| Asset class | Repository evidence | Diligence status |
| --- | --- | --- |
| Hall Monitor source code | `hall-monitor/server/`, `hall-monitor/client/src/`, tests and package manifests | Original implementation is presented as CyberReady work; confirm all contributors and contractor assignments |
| Hall Monitor architecture and workflows | Express/SQLite/React implementation, district/role workflow, assessment/reporting routes | Seller-created integration/architecture appears likely; retain authorship records |
| User interface and experience | Dashboard/page components, charts, role views, website preview components | Original arrangement and visual work may be transferable, subject to asset provenance and third-party icon/font licences |
| CAIRE concept/workflow | Website, Hall Monitor AI-governance page, guidance and workflow language | Presented as CyberReady-created evidence-review methodology; obtain a concise authorship/provenance statement before sale |
| CAGR rubric implementation | `cagrData.js`, AI-system/rating schema, maturity UI and summaries | Presented as CyberReady-created and NIST-AI-RMF-aligned; confirm no copied third-party rubric language beyond permitted source material |
| Scoring, reporting, and remediation logic | Executive summary calculations, DOCX generator, risk/compliance dashboard logic | Original code is a candidate transferable asset; template-derived language/branding is separately flagged below |
| Original documentation and marketing copy | Seller-authored README/sale package/site source, subject to specific third-party excerpts | Candidate transferable work; verify that any cited, quoted, or copied sources are excluded/cleared |
| CyberReady and Hall Monitor branding | Logo/banner assets, site copy, product names | Treat as prospective transfer assets only after trademark, design-source, domain, and chain-of-title review |
| Buyer package and strategic materials | `sale-package/`, internally authored business/roadmap materials | Candidate transferable materials; split seller-authored items from externally sourced research before closing |

### Evidence to collect for Category A

- Seller assignment/creation statement covering source code, CAIRE, CAGR, reporting logic, copy, visual assets, and domains.
- Any employee, contractor, designer, or collaborator agreements and IP assignments.
- Original editable design/media source files where available.
- Brand/trademark searches, registrations (if any), domain registrar account evidence, and social/media account schedule.
- A list of pre-existing materials that the seller did not create and is not transferring.

## Category B — Third-party frameworks, standards, and dependencies

| Item | Repository location/use | Observed relationship | Status to describe in a sale packet |
| --- | --- | --- | --- |
| NIST Cybersecurity Framework 2.0 | Assessment categories, executive/compliance views, `hall-monitor/client/src/data/{rubricData.js,cybersecurityAssessment.json}`, NIST PDFs/JSON/XLSX | Referenced, mapped, and locally embedded/derived; source-like framework prose appears in active data files | Framework alignment, not NIST endorsement/certification; attribution/source review required |
| NIST AI Risk Management Framework 1.0 and Playbook | AI functions, `hall-monitor/client/src/data/{aiRmfPlaybook.js,cagrData.js}`, reference PDFs/JSON/XLSX | Referenced, mapped, and locally embedded/derived; the active playbook contains NIST-like source language | Alignment/mapping only; verify provenance, attribution and any redistribution conditions |
| CoSN Cybersecurity Readiness for Education (CCRE) / historical Cybersecurity Rubric 2.0 / CC4E | Active assessment data above, database compatibility labels, report generator, selected UI copy, historical resource folders | Referenced, mapped, embedded, and in places apparently copied or adapted | Third-party framework/brand; do not represent as CyberReady-owned or transferable without written rights review |
| CCRE certificates, badges, report templates, masterclass materials | Former CCRE resource directories, archived reports/certificates/badges and copied guidance | Excluded from the public package and retained only in a controlled private archive | Exclude from transfer representation pending owner permission/licence review |
| Cybersecurity Coalition / ClassLink references | Report template, training seed data/page, HTML resource copies | Referenced in product-facing and archive materials | Relationship/branding unknown; requires owner/affiliation review |
| CIS Controls and companion guides | Former reference/resources directories and Hall Monitor documentation copies | Excluded from the public package | Third-party publication; rights and redistribution status unknown |
| Vendor and publisher materials | Former files labelled Microsoft, Databricks, HubSpot, EC-Council/CEH, Flashpoint, and numerous external books/e-books/prompt packs | Excluded from the public package | Presumptive third-party material; not a default acquisition asset |
| Open-source packages | Root/package lock files for Hall Monitor and website | Installed by package manager at build time; no source vendoring observed | Licence and vulnerability scan required; lockfiles identify the dependency set but no SBOM/NOTICE exists |
| Anthropic SDK/Claude API | Hall Monitor package and optional upload-analysis code | Licensed SDK plus external API service | Buyer needs its own account, terms, key, DPA/data-processing assessment and cost decision |
| Fonts/icons/chart libraries | Lucide, Recharts, React ecosystem and static template icons | Referenced/installed | Include in dependency/licence/SBOM review; the website no longer needs a build-time Google Fonts request |
| Website/product brand and media assets | `website/public/images/`, `website/public/media/`, Hall Monitor public assets | Seller-created status is not evidenced by repository history alone | See `WEBSITE_ASSET_PROVENANCE.md`; confirm image/media/design rights, releases, and transfer scope |

## Category C — Material requiring legal or licence review

These items may not be transferrable, sublicenseable, or appropriate for redistribution. The list is intentionally conservative.

| Material / claim | Why it requires review | Recommended treatment pending review |
| --- | --- | --- |
| “CCRE,” “CC4E,” “Certified Cybersecurity Rubric Evaluator,” and claims that CyberReady conducts/owns CCRE evaluations | Framework, credential, brand, and service-claim implications; historical terminology is mixed with current positioning | Use only qualified current positioning: **CoSN Cybersecurity Readiness for Education (CCRE)**; do not say CyberReady owns the programme |
| Any claim that Alex Lamb is a current “CCRE Evaluator” | Credential/authority claim has not been independently verified in this audit | Use the seller-specified description **CoSN Cybersecurity Readiness for Education (CCRE) Practitioner** only after seller confirmation; counsel should review public bio claims |
| CCRE certificate, badge, rubric, masterclass, report and interview templates | May be branded, copyrighted, course/certification content, or subject to programme terms | Retain as restricted diligence archive; do not market, redistribute, alter, or transfer as owned IP pending permission |
| “Sponsored by the Cybersecurity Coalition” wording and `Cybersecurity Coalition` provider values | Implies affiliation/sponsorship and may use another organisation's marks | Remove or quarantine from buyer/customer-facing outputs after documenting; seek written basis if retention is desired |
| ClassLink Audit Center references | May imply a relationship, integration, product use, or brand permission | Treat as historical reference only unless relationship and use rights are documented |
| NIST source files and copied/derived playbook data | Government-source status does not eliminate attribution, integrity, or downstream cited-material questions | Preserve provenance; clearly label as reference/mapping, not owned content or certification |
| CIS, Microsoft, Databricks, HubSpot, EC-Council, Flashpoint and externally labelled PDFs/PPTX/DOCX/XLSX | Titles and publisher names strongly indicate third-party source materials | Inventory by file, retain only with documented rights, otherwise exclude from closing data room or transfer schedule |
| Reference library AI books, newsletters, prompt packs, market reports and media | Large volume of third-party-looking content and potential personal/proprietary data | Isolate in a “reference materials — rights pending” schedule; review individually before buyer delivery |
| Founder headshot, named-person content, podcast/audio/video, and any prospect data | Personality, privacy, database, media, consent, and licensing questions | Confirm consent, source, intended use, and transfer rights; see `WEBSITE_ASSET_PROVENANCE.md` and likely use a separate transaction schedule |
| Privacy policy, terms, Kentucky-law and compliance statements | Legal representations may exceed implemented product/data practices | Counsel review before web publication or reliance; do not treat as confirmed legal compliance |
| Domain, website hosting, email addresses and external accounts | Repository references are not ownership records | Seller must supply registrar/host/account ownership and transfer process separately |

## Recommended asset classification for transaction scheduling

| Transaction bucket | Suggested contents |
| --- | --- |
| **Transferable, subject to seller title confirmation** | Hall Monitor and website code, original copy, original CAIRE/CAGR work, CyberReady/Hall Monitor branding, original reporting/workflow logic, seller-authored buyer docs |
| **Subject to third-party licence** | Open-source packages, NIST mapping/source material, any cleared framework content, third-party fonts/icons/services |
| **Excluded pending rights review** | CCRE/CC4E certificate/badge/rubric/course/report-template assets, vendor publications, externally titled books/e-books/prompt packs, third-party media, prospecting data, and duplicate reference libraries |
| **Requires specific closing documentation** | Domain, trademark/brand rights, founder likeness, external accounts, seller credentials, contributor assignments, hosting/configuration accounts, any license or affiliation rights |

## Buyer-facing language to use now

- CyberReady is **aligned to** or **maps to** named frameworks where the implementation supports that statement.
- CyberReady does **not** own the CoSN CCRE programme, NIST frameworks, ClassLink, or third-party reference materials.
- No standalone reference library is included in this public package; a controlled archive is not a blanket representation of transferable IP.
- Framework alignment is not a certification, endorsement, affiliation, or assurance of regulatory compliance.

## Immediate legal worklist

1. Create a file-by-file rights register for the controlled private archive before any item is shared with a buyer.
2. Obtain written programme/brand guidance for CCRE/CoSN, historical CC4E names, certificates, badges, reports, masterclass content, Cybersecurity Coalition references, and ClassLink references.
3. Confirm authorship/assignment for CAIRE, CAGR, Hall Monitor, website code/copy, designs, logos, media, and buyer materials.
4. Have counsel replace or approve privacy, terms, credential, sponsorship, certification, domain, and transaction language.
5. Produce an SBOM and third-party licence notice from a clean dependency installation before closing. The package-install check in this remediation is not legal licence clearance.
