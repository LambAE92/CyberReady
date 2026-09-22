# Public Repository Remediation

## Purpose

This public repository is a curated CyberReady sale package: the implemented Hall Monitor and website source, seller-authorship-qualified documentation, and acquisition-diligence materials. It is not a public data room for every item that appeared in the original development repository.

## Public-package boundary

The package intentionally excludes standalone CCRE/CC4E, CoSN, ClassLink, Cybersecurity Coalition, NIST, vendor, publisher, research, media, and other mixed reference archives pending rights review. Their prior presence is documented in `ACQUISITION_AUDIT.md` and `IP_OWNERSHIP_AND_LICENSES.md`; absence from this tree does not imply a legal conclusion about any item.

The remaining product source implements framework mappings and prototype workflows. It does not represent CyberReady as owning a third-party framework, issuing a third-party certification, providing evaluator services, or having third-party sponsorship or affiliation.

## History and credential remediation

The previous repository history was preserved in a controlled private archive before this clean public history was created. It is excluded from the default transaction package. The former history included fixed demo-account values and mixed reference materials; deleting a file from a current tree alone would not remove it from prior public commits.

Any internet-accessible demo that could use former fixed credentials must have its passwords and session secret rotated outside the repository. A history rewrite cannot remove material from previously cloned or forked copies. See `SECURITY_REVIEW.md` and `DEMO_SETUP.md`.

## Buyer-delivery rule

Provide any excluded archive only through a controlled diligence process after file-by-file rights, privacy, and transfer review. The definitive asset schedule—not repository presence—controls what transfers.

## Recommended two-layer acquisition structure

The current public repository is useful as an evaluation package, but it contains more implementation detail than a long-term public marketing repository normally needs. No move, deletion, privacy change, or new repository is made by this recommendation. The seller and counsel should decide the final boundary before broad buyer outreach.

| Layer | Suitable material | Current treatment / action to decide |
| --- | --- | --- |
| **Public acquisition materials** | High-level `README.md`, acquisition overview, product screenshots or approved synthetic preview, capability summary, high-level tech stack/architecture, product website source, and a controlled diligence/contact instruction | The current public repository already provides much of this. Keep it free of credentials, real district data, copied third-party materials, detailed security findings, and private transfer records. |
| **Controlled/private diligence materials** | Full Hall Monitor source if a buyer needs it, proprietary CAIRE/CAGR implementation details, detailed architecture/security/IP documents, known limitations, dependency/SBOM outputs, historical remediation archive, full Git history, detailed transfer plan, domain/hosting/account records, contributor assignments, and any buyer-specific configuration | Share only with qualified prospects under the seller's chosen process and appropriate agreement. A buyer data room or private repository is preferable once code-level diligence begins. |

### Items that should not be left in an unrestricted public package

- Runtime `.env` files, credentials, session secrets, API keys, database files, uploads, logs, real district data, audit logs, buyer contact data, and configuration exports.
- Unreviewed CCRE/CC4E, CoSN, ClassLink, Cybersecurity Coalition, NIST, vendor, publisher, research, media, book, dataset, badge, certificate, or course materials.
- Founder identity/contact records or media without consent and transfer-right confirmation.
- Detailed security findings, penetration-test results, source-history archives, private account records, and closing schedules unless the seller deliberately accepts the disclosure risk.

### Release controls before broad outreach

1. Set `NEXT_PUBLIC_ACQUISITION_EMAIL` on the website host to a monitored acquisition inbox; the static form cannot deliver an inquiry without it.
2. Confirm every public screenshot/video uses only approved synthetic data and has no browser/session/credential disclosure.
3. Confirm rights/provenance for the CyberReady/Hall Monitor visual assets, founder likeness, and media before marketing them as transferable.
4. Establish a controlled data-room checklist for the items listed above, including recipient, date, version/hash, rights status, and whether an NDA or other agreement applies.
5. Keep the present clean public branch immutable once the transaction package is approved; retain a controlled closing snapshot separately.
