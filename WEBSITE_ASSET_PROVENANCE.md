# Website and Product Asset Provenance Review

**Review date:** 2026-09-23
**Scope:** public website and Hall Monitor static assets currently tracked in the repository. This is an inventory for diligence, not licence clearance.

| Asset / location | Observed use | Classification | Required action before transfer representation |
| --- | --- | --- | --- |
| `website/public/images/cyberready-logo.png`; duplicate `hall-monitor/{public,client/public}/logo.png` | Website/header/footer and Hall Monitor favicon branding | **Unknown provenance / human review required**; identical copies were observed and the files first appear in the available local initial commit attributed to Alex Lamb | Seller should confirm original creation, designer assignment, source file, trademark status, and whether all copies are intended to transfer. Replacing the logo is technically straightforward but changes visible product/website branding. |
| `website/public/images/cyberready-banner.png`; duplicate `hall-monitor/{public,client/public}/banner.png` | Tracked brand asset; no active source reference found in this review | **Unknown provenance / human review required**; identical copies were observed and the files first appear in the available local initial commit attributed to Alex Lamb | Confirm creation/licence/assignment and include only if cleared. Exclusion would not change current active source behavior. |
| `website/public/images/alex-lamb-headshot.jpg` | Tracked founder/personality image; no active source reference found in this review | **Human review required** | Confirm the subject's consent, photographer/licence rights, intended marketing use, and whether buyer use is transferable. Exclusion would not change current active source behavior. |
| `website/public/media/modernizing-cyber-governance.mp4` | Homepage embedded media; first appears in the available local initial commit attributed to Alex Lamb | **Unknown provenance / human review required** | Confirm producer, music/voice/image rights, releases, and whether the file may be publicly redistributed and transferred. Replacing or omitting it requires a small website-content change only. |
| `website/public/media/cybersecurity-boardroom-podcast.m4a` | Tracked media; no current source reference found in this review | **Unknown provenance / human review required** | Confirm recording participants, music, guest releases, and distribution/transfer rights before use or sharing. Exclusion would not change current active source behavior. |
| `website/public/{next,vercel,window,globe,file}.svg` | Template/static SVGs; no current product-page source reference found in this review | **Open-source/template-origin likely; human confirmation recommended** | Verify the originating Next.js template licence/version or exclude from the future public package if unused. No removal was made here. |
| `hall-monitor/client/public/{favicon,icons}.svg` | Tracked static icon assets; no current source reference found in this review | **Unknown provenance / human review required** | Confirm whether seller-created, library-derived, or template-derived; retain attribution/licence information if third-party. Exclusion would not change current active source behavior. |
| Lucide icons, Recharts, Geist/Google-font references, React/Next/Vite ecosystem | Runtime/source dependencies rather than packaged media | **Third-party open-source / service terms apply** | Include in SBOM/licence review; do not schedule as seller-owned artwork. |

## Findings

- The website asset scan found no active external photo-CDN or stock-image URL in source.
- The visible website uses the CyberReady logo and one embedded video; public deployment should only use media cleared for public distribution.
- The available local object history attributes first addition of the listed media/brand files to Alex Lamb, but Git attribution is not an assignment, licence, or ownership record.
- Duplicate logo/banner hashes across website and Hall Monitor suggest a shared brand asset, not independent ownership evidence.
- No asset was removed in this remediation because the repository alone cannot prove source or rights. The uncertainty should be disclosed to buyers rather than guessed away.

## Owner-confirmation update — 2026-09-23

The owner confirms that CyberReady branded media was assembled/created by Alex Lamb using tools/services including AI generation, Canva, Adobe Express, and Google Notebook/NotebookLM. This provides factual creation context for the branded-media inventory; it does not establish ownership, exclusivity, licence scope, provenance of underlying elements, or transferability. The source/licence/release actions in the table remain applicable.

The current active application/website demo identity has been changed to the owner-confirmed fictional Pine Ridge Unified School District. No tracked static screenshot was identified as a required runtime dependency for the retired demo identity. The homepage video remains an active, separately flagged media asset whose visual content and rights require owner review before buyer/public use.
