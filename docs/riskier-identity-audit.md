---
layout: page
title: Riskier Identity Page Audit
---

# Riskier Identity Page Audit

Status: **first implementation pass complete; visual screenshot QA still needed**  
Source: visual review after the first D/G/N poster identity pass.

The first riskier identity pass successfully brought the campaign language into
the homepage hero, Session 1, and the poster proofing page. The next pass should
carry more of the risky poster set's color, shape, and controlled motion into
lower page sections and quieter page families.

Implementation pass 1 added shared primitives, homepage lower-section signal
panels, session motifs, centered prompt-pack shells, concept-bridge refresh
hooks, and a stronger Count the Next Token tool shell.

## Design Direction

Use the Field Manual system as the base, but let campaign-facing and
tool-facing pages become more visibly machine-like below the hero:

- Stronger poster color washes in lower sections, not only mastheads.
- More visible registration marks, frame strips, token walls, noisy grids, and
  signal bands.
- Controlled motion where it explains the mechanism or gives campaign energy.
- Static reduced-motion fallbacks everywhere.
- Modality-specific motifs:
  - Text: token walls, temperature ladders, self-writing panels.
  - Images: noise grids, dissolve overlays, denoising bands.
  - Video: frame strips, slit-scan fragments, onion-skin overlays.
  - Cross-session: evidence tiles, poster-board grids, attention/map patterns.

## Shared CSS Added

Reusable primitives now exist before page-by-page one-offs:

| Class | Purpose |
|---|---|
| `.risk-section` | Lower-page section with stronger poster wash and registration shapes |
| `.risk-card` | Card/panel with controlled color wash, rule lines, and modality accent |
| `.risk-band` | Full-width or constrained color band for session/tool transitions |
| `.risk-grid` | Noisy pixel/grid field for image and data-default sections |
| `.risk-frame-strip` | Video-style frame sequence / onion-skin strip |
| `.risk-token-wall` | Text/tokenized phrase wall for text pages and prompt packs |
| `.risk-signal-panel` | Strong campaign panel for cross-session evidence, showcase, and tool index moments |

These live in the Field CSS layers, inherit existing tokens, and follow the same
reduced-motion contract as the current poster/riskier motif classes.

## Page-By-Page Audit

| Page / family | Current issue | Needed style change |
|---|---|---|
| `index.html` | Hero is strong, but Sessions and Tool Index return to plain ruled lists. | Add color-backed session rows, riskier hover washes, modality shape motifs, and a more visual tool-index header. |
| `pages/session-text.html` | Temperature ladder works, but only one riskier moment appears. | Add a token-wall or self-writing motif in Tools or Run of Show. |
| `pages/session-images.html` | Hero has wash, lower sections are too quiet for image generation. | Add noisy grid, dissolve overlay, denoising bands, and stronger image-rust color shapes. |
| `pages/session-video.html` | Uses Field patterns but lacks motion identity below hero. | Add slit-scan fragment, frame-strip accents, and drift overlays in pathway cards. |
| `pages/session-showcase.html` | Should feel more like a gallery/showcase. | Add evidence-wall tiles, poster-board previews, and cross-session color blocks. |
| `packs/text/index.html` | Content appears visually uncentered and very plain. | Fix centered pack shell; add token-wall accents and temperature mini-ladders per prompt family. |
| `packs/images/index.html` | Placeholder panels feel generic. | Fix shared pack layout; make image placeholders richer with dissolve/noise motifs and image modality color. |
| `packs/video/index.html` | Frame strips are functional but visually flat. | Fix shared pack layout; add onion-skin overlays, slit-scan bars, and drift labels. |
| `tools/count-the-next-token/index.html` | Screenshot shows a quiet worksheet-like tool. | Add stronger tool masthead, animated/count-color bars, token heat strip, and more visible arithmetic steps. |
| `tools/concept-bridges/index.html` | Bridge cards use older custom styling and pill tags. | Convert to shared bridge treatment with poster wash, motif thumbnails, and sharper card bands. |
| `tools/concept-bridges/*/index.html` | Individual bridge pages use hardcoded pastel colors and feel disconnected from the campaign. | Normalize into a shared concept-bridge template with stronger Field/risk motifs and tokenized/visual proof blocks. |
| `pages/tool-*.html` | Detail pages are consistent but restrained. | Add modality-specific preview panels: text tokens, image noise/dissolve, video frames, cross-session evidence grids. |
| Docs pages (`camp-2026`, facilitation docs, `no-ai-pathway`, `vocabulary-field-guide`, `hands-on`, `further-reading`) | Appropriate to be calmer, but several are too monochrome. | Add occasional color bands and poster-shape callouts; avoid glitch on body text or navigation. |

## Priority Order

1. **Shared primitives and pack centering**
   Build the new reusable risk classes and fix the prompt-pack shell first.
2. **Prompt packs**
   Apply centered layout plus modality-specific motifs to text, image, and video
   packs.
3. **Concept bridges**
   Normalize the bridge index and individual bridge pages away from older
   hardcoded pastel styling.
4. **Homepage lower sections and session pages**
   Carry the campaign identity below the hero on Sessions, Tool Index, and the
   session throughlines.
5. **Individual tools**
   Add stronger motif panels to tool interiors, starting with
   `count-the-next-token`.

## Acceptance Checks

- No page loses the Field Manual typography, nav, or square-corner discipline.
- Riskier motifs appear below the hero on priority pages.
- Prompt packs are centered at desktop, tablet, and phone widths.
- Motion is declared only inside `prefers-reduced-motion: no-preference`.
- Reduced-motion pages remain visually complete.
- No new runtime dependencies or live model calls.
- No body text is placed directly into pseudo-elements.
- Dark/slate, white, and paper tones remain legible.

Pending after implementation pass 1: screenshot QA at 360/390px, 768px, and
1280px once headless browser approval is available again.
