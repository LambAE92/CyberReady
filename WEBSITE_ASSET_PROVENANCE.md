# Website and Product Asset Provenance Review

**Review date:** 2026-09-22  
**Scope:** public website and Hall Monitor static assets currently tracked in the repository. This is an inventory for diligence, not licence clearance.

| Asset / location | Observed use | Classification | Required action before transfer representation |
| --- | --- | --- | --- |
| `website/public/images/cyberready-logo.png`; duplicate `hall-monitor/{public,client/public}/logo.png` | Website/header/footer and Hall Monitor branding | **Unknown provenance / human review required**; identical copies were observed | Seller should confirm original creation, designer assignment, source file, trademark status, and whether all copies are intended to transfer. |
| `website/public/images/cyberready-banner.png`; duplicate `hall-monitor/{public,client/public}/banner.png` | Product branding asset | **Unknown provenance / human review required**; identical copies were observed | Confirm creation/licence/assignment and include only if cleared. |
| `website/public/images/alex-lamb-headshot.jpg` | Founder/personality image | **Human review required** | Confirm the subject's consent, photographer/licence rights, intended marketing use, and whether buyer use is transferable. |
| `website/public/media/modernizing-cyber-governance.mp4` | Homepage embedded media | **Unknown provenance / human review required** | Confirm producer, music/voice/image rights, releases, and whether the file may be publicly redistributed and transferred. |
| `website/public/media/cybersecurity-boardroom-podcast.m4a` | Tracked media; no current source reference found in this review | **Unknown provenance / human review required** | Confirm recording participants, music, guest releases, and distribution/transfer rights before use or sharing. |
| `website/public/{next,vercel,window,globe,file}.svg` | Template/static SVGs; no current product-page source reference found in this review | **Open-source/template-origin likely; human confirmation recommended** | Verify the originating Next.js template licence/version or remove from the future public package if unused. No removal was made here. |
| `hall-monitor/client/public/{favicon,icons}.svg` | Client static icon assets | **Unknown provenance / human review required** | Confirm whether seller-created, library-derived, or template-derived; retain attribution/licence information if third-party. |
| Lucide icons, Recharts, Geist/Google-font references, React/Next/Vite ecosystem | Runtime/source dependencies rather than packaged media | **Third-party open-source / service terms apply** | Include in SBOM/licence review; do not schedule as seller-owned artwork. |

## Findings

- The website asset scan found no active external photo-CDN or stock-image URL in source.
- The visible website uses the CyberReady logo and one embedded video; public deployment should only use media cleared for public distribution.
- Duplicate logo/banner hashes across website and Hall Monitor suggest a shared brand asset, not independent ownership evidence.
- No asset was removed in this remediation because the repository alone cannot prove source or rights. The uncertainty should be disclosed to buyers rather than guessed away.
