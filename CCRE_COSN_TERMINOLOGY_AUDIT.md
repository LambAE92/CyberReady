# CCRE / CoSN Terminology Audit

**Review date:** 2026-09-22  
**Scope:** tracked repository source, JSON/data files, Markdown, website copy, Hall Monitor UI/report output, configuration, comments, templates, static-asset names, and public website content reviewed at `https://cyberreadyschools.com/`.  
**Method:** case-insensitive searches for `CCRE`, `Certified Cybersecurity Rubric Evaluator`, `Cybersecurity Rubric Evaluator`, `certified evaluator`, `evaluator certification`, `Cybersecurity Rubric`, `CoSN`, `CC4E`, `ClassLink`, `Cybersecurity Coalition`, `certification`, `certified`, `sponsorship`, `sponsored`, `endorsement`, `endorsed`, `affiliated`, and `affiliation`, followed by contextual review.  
**Legal note:** this is a product/claims inventory, not a legal conclusion about ownership, credential status, trademark use, or transferability.

## Approved current positioning

- **Alex Lamb — CoSN Cybersecurity Readiness for Education (CCRE) Practitioner**
- **CyberReady cybersecurity workflow — CoSN Cybersecurity Readiness for Education (CCRE)-aligned**

CyberReady must not be described as owning/administering CCRE, certifying districts under CCRE, being an official CoSN product, holding CCRE certification authority, or being endorsed/sponsored/affiliated by CoSN unless separately documented in writing.

## Classification register

| Classification | Occurrences / locations reviewed | Current disposition |
| --- | --- | --- |
| **1. Current and appropriate** | `website/src/app/about/page.tsx` identifies Alex Lamb as a CCRE Practitioner; `website/src/app/{page,platform,hall-monitor,for-school-districts}/page.tsx`, `README.md`, `hall-monitor/README.md`, Hall Monitor assessment/dashboard/executive UI, and generated report output use CCRE only as qualified alignment | Retained with qualification. These statements do not claim programme ownership, current evaluator status, certification authority, or endorsement. |
| **2. Historical reference** | `ACQUISITION_AUDIT.md`, `IP_OWNERSHIP_AND_LICENSES.md`, `TRANSFER_PLAN.md`, `SELLER_CHANGELOG.md`, and `PUBLIC_REPOSITORY_REMEDIATION.md` describe historical CC4E/CCRE, certificate, badge, Cybersecurity Coalition, and ClassLink material | Retained only to make the diligence record accurate. The prior collections are excluded from the public package and remain rights-review items. |
| **3. CyberReady alignment statement** | Website methodology/product pages; Hall Monitor labels such as “CCRE-aligned cybersecurity-governance assessment”; report disclaimer mapping the workflow to NIST CSF 2.0 | Retained. The wording identifies an implementation/mapping, not a licensed integration or official programme relationship. |
| **4. Third-party intellectual property** | `hall-monitor/client/src/data/cybersecurityAssessment.json`, `hall-monitor/client/src/data/rubricData.js`, `hall-monitor/client/src/data/aiRmfPlaybook.js`; NIST/CCRE terminology and source-like assessment/playbook prose; historical archive descriptions in IP docs | Not removed because it may be functionally valuable and requires provenance review. Treat CCRE/CC4E/CoSN, NIST, ClassLink, Cybersecurity Coalition, and copied/adapted rubric/playbook language as third-party or rights-uncertain until counsel confirms use rights. |
| **5. Potentially misleading credential statement** | Prior/live-site formulations equivalent to “a certified CCRE evaluator conducts…” and “Developed by a Certified Cybersecurity Rubric Evaluator”; prior `Masterclass`/evaluator copy; test name `Self-Assessment (CC4E)` | Remediated in source. The website uses Practitioner language; the workflow describes a trained practitioner; Hall Monitor no longer presents a certification/evaluator service; test label was renamed. Existing deployed content stays unchanged until this branch is deployed. |
| **6. Potential endorsement/affiliation implication** | Prior global footer wording “Built on the Cybersecurity Rubric framework” and link to `cybersecurityrubric.org`; historical “Sponsored by Cybersecurity Coalition”/ClassLink references and CCRE badges | Footer is now neutral NIST-alignment language; global CoSN/CCRE badge/link implication removed. Historical material is documented as excluded/review-required. |
| **7. Human/legal review required** | CAIRE/CAGR authorship and source-language provenance; all active CCRE/rubric/playbook data; CCRE name/mark use; Alex Lamb Practitioner designation; CyberReady/Hall Monitor brand, founder likeness, media, domain, and any former Cybersecurity Coalition/ClassLink relationship | No ownership or permission is assumed. Obtain seller evidence and appropriate programme/brand/counsel review before sale representations or commercial distribution. |

## Residual internal terminology

The following internal identifiers remain because they are data-compatibility or implementation names, not public credential claims: `CCRE_STRUCTURE`, `generateCCREReport`, database values such as `CCRE Audit`, and client state/tab identifiers. User-facing labels map these to “Cybersecurity Governance Assessment (CCRE-aligned).” A future buyer may rename them during a versioned migration after determining rights and data-compatibility needs.

## Remediation made in this branch

- Replaced website evaluator/certification-era text with trained-practitioner and CCRE-aligned workflow language.
- Removed global framework-branding language and external footer link that could imply affiliation; retained qualified methodology explanation on product pages.
- Reframed the Hall Monitor sample training request as a prototype workflow rather than an official course, masterclass, certification, facilitator commitment, or third-party service.
- Added report-output disclaimers stating the workflow is not a CoSN certification, endorsement, or independent control validation.
- Replaced user-facing `CCRE Audit` labels where practical without changing stored assessment values.

## Required follow-up before asserting transferability

1. Confirm Alex Lamb's permitted current designation and any approved language with the relevant programme owner.
2. Inventory active framework-derived text at the field/file level and determine whether it is original, licensed, publicly reusable, adapted, or should be replaced.
3. Confirm that CAIRE and CAGR are seller-created and identify any contributor assignments or pre-existing material.
4. Do not revive historical badges, certificates, report templates, sponsorship language, ClassLink references, or CCRE/CC4E programme materials without written rights review.
