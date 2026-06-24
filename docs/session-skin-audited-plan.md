---
layout: page
title: Session Skin Audited Redesign Plan
---

# Session Skin Audited Redesign Plan

Status: **planning audit complete; implementation not started here**  
Date: **2026-06-12**  
Scope: every repo HTML, Markdown, CSS, and JS file found during audit, plus the
six external poster references supplied from `~/Downloads`.

This plan turns the newer risky poster directions into a full site skin system.
The goal is not a single visual reset. The goal is for each session and its
associated pages to have a distinct visual language while the Field Manual
navigation, readable content hierarchy, accessibility, and static/offline
constraints remain intact.

## Reference Directions

| Reference | Working skin | Best use |
|---|---|---|
| `EE _ Attention _terminal_` | **Terminal / Attention** | Session 1 text, token prediction, attention, confidence |
| `II _ Counting _signal_` | **Counting / Signal** | Session 1 probability bars, counting tools, token distributions |
| `FF _ Diffusion _spectrum_` | **Diffusion / Spectrum** | Session 2 image generation, denoising, defaults |
| `JJ _ VAE latent _nebula_` | **Latent / Nebula** | Session 2 advanced image mechanics, compression, latent space |
| `HH _ Light-box _slit-scan_` | **Light-box / Slit-scan** | Session 3 video, frames, drift, temporal coherence |
| `GG _ Forward pass _acid_` | **Forward Pass / Acid** | Advanced mechanics callouts, not a whole-session default |

## Skin Assignments

| Skin | Color / type / motion | Page families |
|---|---|---|
| **Home sampler** | Field Manual base with previews of every skin | Homepage and global indexes |
| **Text terminal** | dark CRT, phosphor green, scanlines, mono prompts, attention cells | Session 1 pages, text tools, text worksheets, text packs |
| **Counting signal** | vertical signal bars, probability bars, live distribution blocks | count/probability tools and Session 1 data panels |
| **Image spectrum** | pastel diffusion gradients, noisy pixel fields, denoising grids | Session 2 pages, image tools, image worksheets, image packs |
| **Latent nebula** | dark gradient, glowing latent nodes, compression diagrams, italic display moments | image-mechanics and advanced concept pages |
| **Video slit-scan** | dark light-box, cyan/magenta offsets, frame strips, onion-skin overlays | Session 3 pages, video tools, video worksheets, video packs |
| **Studio synthesis** | evidence tiles, mixed modality tags, poster-board grids, restrained multi-skin accents | Optional Showcase, cross-session tools, showcase pages |
| **Docs field** | mostly quiet Field Manual pages with occasional skin callout bands | facilitation, logistics, reading, access, policy, and planning pages |
| **Worksheet print** | printer-safe content first, with a single session-colored header/accent | worksheet HTML and Markdown mirrors |
| **Reference/archive** | no redesign work; preserve as provenance | `assets/archive`, `docs/archive`, `newdesignideas`, external downloads |

## Implementation Rules

- Keep canonical CSS/JS: `assets/field.css`, `assets/field-home.css`,
  `assets/field-sub.css`, `assets/field-tool.css`, `assets/field-theme.js`.
- Do not reintroduce `lm.css`, React, Babel, or new runtime dependencies.
- Add page-level hooks such as `data-skin="text-terminal"` or scoped classes
  before one-off page styling.
- Use reduced-motion fallbacks for scanlines, bar fills, denoising sweeps,
  forward-pass pulses, frame drift, and latent glow.
- Keep navigation visually stable across all skins.
- Do not copy the large generated poster HTML directly; translate the ideas
  into small reusable CSS/HTML primitives.
- Keep body copy readable. The risky effects belong in heroes, motifs, tool
  panels, callouts, and transition bands, not dense paragraphs.

## Public Route Coverage

### Global / Home / Indexes

| File | Skin | Planned treatment |
|---|---|---|
| `index.html` | Home sampler | Session rows become skin previews: terminal, spectrum, slit-scan, studio synthesis. Tool index gets modality-specific micro-motifs. |
| `pages/session-links.html` | Home sampler / docs field | Grouped link sheet gets small skin badges and row accents by session. Keep copy/paste utility quiet. |
| `pages/camp-2026.html` | Home sampler / docs field | Logistics page gets restrained campaign bands and session-skin date cards. |
| `pages/camp-poster.html` | Reference gallery / poster lab | Keep as proofing surface; add the six new directions as inspiration notes only if needed. |
| `pages/vocabulary-field-guide.html` | Docs field with mixed motifs | Vocabulary entries can carry tiny modality glyphs; avoid heavy animation. |

### Session 1: Text / Prediction

| File | Skin | Planned treatment |
|---|---|---|
| `pages/session-text.html` | Text terminal + counting signal | Stronger terminal hero, token wall, signal/probability band in lower sections. |
| `pages/docs-facilitation.html` | Text terminal, quieter | Facilitation guide gets terminal section labels and one attention/counting motif. |
| `pages/tool-tokenizer.html` | Text terminal | Detail page gets token-strip preview and temperature/counting bars. |
| `pages/tool-eliza.html` | Text terminal | Detail page gets rule terminal transcript motif. |
| `pages/tool-prediction-game.html` | Counting signal | Detail page gets distribution bar preview. |
| `pages/tool-count-next-token.html` | Counting signal | Detail page gets “count -> divide -> predict” signal panel. |
| `tools/tokenizer-temperature-visualizer/index.html` | Text terminal + counting signal | Tool shell gets CRT accents, active token glow, probability bars that match poster language. |
| `tools/eliza-simulator/index.html` | Text terminal | Transcript UI becomes terminal-like without harming readability. |
| `tools/next-token-prediction-game/index.html` | Counting signal | Paste aggregation and model top-k panels use signal bars and distribution striping. |
| `tools/count-the-next-token/index.html` | Counting signal | Priority tool: stronger masthead, counted-live strips, animated/progressive arithmetic bars. |
| `packs/text/index.html` | Text terminal | Frozen examples get terminal prompt panels, token strips, and restrained scanline accents. |
| `worksheets/text-experiment-board/index.html` | Worksheet print + text terminal | Printer-safe worksheet with text-colored header and optional token-strip accent. |
| `worksheets/text-experiment-board.md` | Worksheet print | Mirror content only; note skin pairing in front matter or comments if needed. |
| `docs/session-1-text.md` | Docs field + text terminal notes | Source script remains readable; add design note if screenshots are updated. |
| `docs/session-1-facilitation.md` | Docs field + text terminal notes | Source facilitation doc remains quiet. |
| `docs/session-1-slides.md` | Text terminal / counting signal | Future slide styling should use terminal and signal motifs. |

### Session 2: Images / Diffusion / Latent Space

| File | Skin | Planned treatment |
|---|---|---|
| `pages/session-images.html` | Image spectrum | Stronger diffusion field below hero, denoising grid motif in tool list. |
| `pages/docs-session-2-facilitation.html` | Image spectrum, quieter | Facilitation guide gets pastel/noise callouts and image-default bands. |
| `pages/tool-diffusion.html` | Image spectrum | Detail page gets denoising grid preview. |
| `pages/tool-feature-extraction.html` | Image spectrum | Detail page gets pixel-resolution grid and feature threshold motif. |
| `tools/diffusion-step-through-viewer/index.html` | Image spectrum | Stepper gets denoising sweep, noise-to-image cells, spectrum background accents. |
| `tools/feature-extraction-pixel-resolution/index.html` | Image spectrum | Pixel grid and feature views adopt spectrum palette. |
| `tools/default-test-comparison-viewer/index.html` | Image spectrum | Comparison panels get default/revision color bands. |
| `tools/prompt-guidance-word-by-word/index.html` | Image spectrum | Prompt reveal gets denoising and word-guidance bands. |
| `tools/latent-space-explorer/index.html` | Latent nebula | Use dark gradient, glowing nodes, encode/decode visual vocabulary. |
| `tools/dataset-balance-simulator/index.html` | Image spectrum + latent nebula | Dataset mix gets spectrum blocks; model-space result gets nebula glow. |
| `packs/images/index.html` | Image spectrum | Frozen examples get richer dissolve/noise panels and image modality color. |
| `worksheets/image-default-test-board/index.html` | Worksheet print + image spectrum | Printer-safe worksheet with spectrum header and default-grid accent. |
| `worksheets/image-default-test-board.md` | Worksheet print | Mirror content only; note skin pairing if needed. |
| `docs/session-2-images.md` | Docs field + image spectrum notes | Source script remains readable. |
| `docs/session-2-facilitation.md` | Docs field + image spectrum notes | Source facilitation doc remains quiet. |
| `docs/session-2-slides.md` | Image spectrum + latent nebula | Future slide styling should use diffusion and latent motifs. |

### Session 3: Video / Time / Coherence

| File | Skin | Planned treatment |
|---|---|---|
| `pages/session-video.html` | Video slit-scan | Stronger light-box hero, frame strips, channel offsets in pathway/tool sections. |
| `pages/docs-session-3-facilitation.html` | Video slit-scan, quieter | Facilitation guide gets frame-strip section headers and temporal callouts. |
| `pages/tool-temporal-telephone.html` | Video slit-scan | Detail page gets drift/onion-skin preview. |
| `tools/temporal-telephone/index.html` | Video slit-scan | Timeline panels get frame labels, drift overlays, and light-box styling. |
| `tools/video-failure-gallery-viewer/index.html` | Video slit-scan | Failure examples get frame-strip and channel-offset treatment. |
| `tools/frame-by-frame-coherence-viewer/index.html` | Video slit-scan | Priority video page: onion-skin controls and diff panel should look like the poster language. |
| `packs/video/index.html` | Video slit-scan | Frozen examples get richer frame strips, `t0/t1/t2` labels, and slit-scan bars. |
| `worksheets/video-test-report/index.html` | Worksheet print + video slit-scan | Printer-safe worksheet with frame-strip header. |
| `worksheets/video-test-report.md` | Worksheet print | Mirror content only; note skin pairing if needed. |
| `docs/session-3-video.md` | Docs field + video notes | Source script remains readable. |
| `docs/session-3-facilitation.md` | Docs field + video notes | Source facilitation doc remains quiet. |
| `docs/session-3-slides.md` | Video slit-scan | Future slide styling should use light-box/frame-strip motifs. |

### Optional Studio / Cross-Session

| File | Skin | Planned treatment |
|---|---|---|
| `pages/session-showcase.html` | Studio synthesis | Evidence wall tiles, mixed modality bands, gallery energy. |
| `pages/docs-showcase-facilitation.html` | Studio synthesis, quieter | Facilitation guide gets evidence-board callouts and mixed-session tags. |
| `pages/tool-abc-comparison-board.html` | Studio synthesis | Detail page gets A/B/C poster-board preview. |
| `pages/tool-model-card-builder.html` | Studio synthesis | Detail page gets model-card evidence grid preview. |
| `pages/tool-access-tiers.html` | Studio synthesis | Detail page gets tier comparison signal blocks. |
| `pages/tool-evidence-wall.html` | Studio synthesis | Detail page gets evidence-tile gallery preview. |
| `pages/tool-confidence-truth.html` | Studio synthesis + text terminal | Detail page gets confidence/evidence contrast motif. |
| `tools/abc-comparison-board/index.html` | Studio synthesis | Board cards get mixed-modality color rails and evidence tags. |
| `tools/model-card-builder/index.html` | Studio synthesis | Form sections get evidence-grid and claim/status accents. |
| `tools/classroom-activity-builder/index.html` | Studio synthesis | Builder output uses pathway colors and mixed-session badges. |
| `tools/confidence-is-not-truth-explorer/index.html` | Studio synthesis + text terminal | Confidence bars and evidence panels should visually separate fluency from proof. |
| `tools/access-tiers/index.html` | Studio synthesis | Tier columns get strong cross-session comparison styling. |
| `tools/evidence-wall/index.html` | Studio synthesis | Primary treatment: poster-board wall, consent badge, mixed evidence tiles. |
| `worksheets/ai-use-consent-checklist/index.html` | Worksheet print + studio synthesis | Consent checklist remains print-safe with access/consent badges and a calm cross-session header. |
| `worksheets/ai-use-consent-checklist.md` | Worksheet print | Mirror content only; note skin pairing if needed. |
| `worksheets/model-investigation-journal/index.html` | Worksheet print + studio synthesis | Cross-session journal gets mixed modality header accents. |
| `worksheets/model-investigation-journal.md` | Worksheet print | Mirror content only; note skin pairing if needed. |
| `docs/showcase-script.md` | Docs field + studio notes | Source script remains readable. |
| `docs/showcase-slides.md` | Studio synthesis | Future slide styling should use evidence-wall/gallery motifs. |

### Concept Bridges

| File | Skin | Planned treatment |
|---|---|---|
| `tools/concept-bridges/index.html` | Studio synthesis | Index cards become bridge tiles with per-concept skin thumbnails. |
| `tools/concept-bridges/prediction-is-not-understanding/index.html` | Text terminal | Terminal prompt/output contrast, attention/counting motif. |
| `tools/concept-bridges/confidence-is-not-truth/index.html` | Text terminal + studio synthesis | Confidence/evidence contrast with terminal proof panel. |
| `tools/concept-bridges/what-does-the-machine-see/index.html` | Image spectrum | Pixel/feature/noise visual proof blocks. |
| `tools/concept-bridges/default-is-a-design-decision/index.html` | Image spectrum | Default/revision spectrum blocks and image comparison bands. |
| `tools/concept-bridges/time-makes-failure-visible/index.html` | Video slit-scan | Frame strip, onion-skin, temporal labels. |
| `tools/concept-bridges/current-is-not-known/index.html` | Studio synthesis | Evidence/status board treatment with restrained warning color. |

### General Participant / Access / Support Pages

| File | Skin | Planned treatment |
|---|---|---|
| `pages/hands-on.html` | Docs field + mixed motifs | Tool sections get small modality motifs; keep practical links quiet. |
| `pages/no-ai-pathway.html` | Docs field + studio synthesis | No-AI route gets evidence/pathway cards with calm mixed accents. |
| `pages/further-reading.html` | Docs field | Reading lists stay calm; add modest section color bands only. |
| `pages/younger-learners.html` | Docs field + mixed motifs | Per-session adaptation cards get small skin accents. |
| `docs/pre-session-checkin.html` | Docs field + studio synthesis | Check-in questions get pathway badges and access-tier accents. |
| `docs/unplugged-human-as-model.html` | Text terminal, quiet | Printable activity gets role cards with terminal/counting accents. |

## Source Markdown / Planning Coverage

These files are not public styled HTML routes by themselves in local static
viewing, but they produce or describe public material. They should not receive
heavy visual treatment directly; instead, they should name the intended skin
when relevant.

| File | Role in redesign plan |
|---|---|
| `README.md` | Add a short pointer to this audited plan once implementation starts. |
| `tools/README.md` | Keep canonical tool list; optionally add skin family column later. |
| `AGENTS.md` | Historical/build instructions; no redesign treatment. |
| `docs/session-skin-audited-plan.md` | This audit and rollout plan; update as implementation changes scope. |
| `docs/DESIGN-SYSTEM.md` | Update after implementation with skin tokens and motif classes. |
| `docs/SHARED-CONTRACT.md` | Update only if skin hooks become required conventions. |
| `docs/build-roadmap.md` | Add session-skin phase after plan approval. |
| `docs/qa-checklist.md` | Add skin QA: reduced motion, theme contrast, route skin coverage. |
| `docs/riskier-identity-audit.md` | Superseded by this full-file audit for the next pass; keep as prior pass record. |
| `docs/advanced-concept-extensions.md` | Use `Forward Pass / Acid` and `Latent / Nebula` for future advanced tools. |
| `docs/FIELD-MANUAL-REDESIGN.md` | Historical redesign record; no direct treatment. |
| `docs/BUILD-LOG.md` | Append implementation notes after work ships. |
| `docs/INTEGRATION-QUEUE.md` | No visual treatment; update only for new routes. |
| `docs/project-brief.md` | Program source copy; no visual treatment. |
| `docs/program-copy.md` | Marketing copy source; no visual treatment. |
| `docs/consent-recap-protocol.md` | Docs field if rendered; keep calm and legible. |
| `docs/guest-speaker-showcase-plan.md` | Docs field if rendered; studio synthesis accents if later styled. |
| `docs/interest-form.md` | Docs field if rendered; minimal accents. |
| `docs/pilot-agenda.md` | Docs field if rendered; minimal accents. |
| `docs/pilot-checklist.md` | Docs field if rendered; minimal accents. |
| `docs/pilot-feedback-form.md` | Docs field if rendered; minimal accents. |
| `docs/session-1-text.md` | Text terminal source script. |
| `docs/session-1-facilitation.md` | Text terminal facilitation source. |
| `docs/session-1-slides.md` | Text terminal / counting signal slide source. |
| `docs/session-2-images.md` | Image spectrum source script. |
| `docs/session-2-facilitation.md` | Image spectrum facilitation source. |
| `docs/session-2-slides.md` | Image spectrum / latent nebula slide source. |
| `docs/session-3-video.md` | Video slit-scan source script. |
| `docs/session-3-facilitation.md` | Video slit-scan facilitation source. |
| `docs/session-3-slides.md` | Video slit-scan slide source. |
| `docs/showcase-script.md` | Studio synthesis source script. |
| `docs/showcase-slides.md` | Studio synthesis slide source. |
| `docs/archive/REDESIGN-PLAN.md` | Historical archive; no redesign treatment. |
| `samples/video-color-motion/README.md` | Sample/reference material; no skin work unless linked publicly later. |
| `samples/video-color-motion-gif/README.md` | Sample/reference material; no skin work unless linked publicly later. |

## Asset / Runtime Coverage

| File | Role in redesign plan |
|---|---|
| `assets/field.css` | Add global skin tokens and shared primitives here. |
| `assets/field-home.css` | Homepage sampler and session preview treatments. |
| `assets/field-sub.css` | Session, docs, pack, and detail-page skin layouts. |
| `assets/field-tool.css` | Tool-shell skin adapters and legacy inline-style bridges. |
| `assets/tool-lab.css` | Apply only if a lab/tool page uses it; align with skin variables. |
| `assets/field-theme.js` | Preserve tone/font switching; do not add skin behavior unless needed. |
| `assets/field-app.js` | Preserve filters/search; add skin classes only if needed for home index. |
| `assets/tools-data.js` | Optional: add `skin` field later for homepage/tool-index previews. |
| `assets/worksheet-export.js` | No visual skin work except print-safe exported labels if needed. |
| `_layouts/page.html` | Jekyll markdown layout; only update if docs need shared skin class support. |
| `assets/archive/app.js` | Archive/reference; no redesign work. |
| `assets/archive/hero.js` | Archive/reference; no redesign work. |
| `assets/archive/home.css` | Archive/reference; no redesign work. |
| `assets/archive/lm.css` | Archive/reference; do not revive. |
| `assets/archive/sub.css` | Archive/reference; no redesign work. |
| `assets/archive/theme.js` | Archive/reference; no redesign work. |

## Packs / Templates

| File | Skin | Planned treatment |
|---|---|---|
| `packs/_template.html` | Template | Update after pack skins are implemented so future packs inherit the pattern. |
| `packs/text/index.html` | Text terminal | See Session 1 table. |
| `packs/images/index.html` | Image spectrum | See Session 2 table. |
| `packs/video/index.html` | Video slit-scan | See Session 3 table. |

## Reference / Generated Design Files

These are accounted for as references, not implementation targets.

| File / location | Plan |
|---|---|
| `newdesignideas/Learning Machines.html` | Reference only; do not wire into live site. |
| `newdesignideas/Learning Machines (v1 dark lab).html` | Reference only; do not wire into live site. |
| `newdesignideas/pages/session-text.html` | Reference only; superseded by live page. |
| `newdesignideas/pages/tool-tokenizer.html` | Reference only; superseded by live page. |
| `newdesignideas/pages/docs-facilitation.html` | Reference only; superseded by live page. |
| `newdesignideas/tools/tokenizer-temperature-visualizer/index.html` | Reference only; superseded by live tool. |
| `newdesignideas/assets/app.js` | Reference bundle only; do not wire into live site. |
| `newdesignideas/assets/field-app.js` | Reference bundle only; do not wire into live site. |
| `newdesignideas/assets/field-home.css` | Reference bundle only; do not wire into live site. |
| `newdesignideas/assets/field-sub.css` | Reference bundle only; do not wire into live site. |
| `newdesignideas/assets/field-theme.js` | Reference bundle only; do not wire into live site. |
| `newdesignideas/assets/field-tool.css` | Reference bundle only; do not wire into live site. |
| `newdesignideas/assets/field.css` | Reference bundle only; do not wire into live site. |
| `newdesignideas/assets/hero.js` | Reference bundle only; do not wire into live site. |
| `newdesignideas/assets/home.css` | Reference bundle only; do not wire into live site. |
| `newdesignideas/assets/lm.css` | Reference bundle only; do not restore old `lm.css`. |
| `newdesignideas/assets/sub.css` | Reference bundle only; do not wire into live site. |
| `newdesignideas/assets/theme.js` | Reference bundle only; do not wire into live site. |
| `newdesignideas/assets/tools-data.js` | Reference bundle only; do not wire into live site. |
| `newdesignideas/poster/Camp Poster 2026.html` | Poster reference only. |
| `newdesignideas/poster/poster-styles.css` | Poster reference only. |
| `newdesignideas/export/Camp Poster 2026 (standalone).html` | Poster reference only. |
| `newdesignideas/export/src/poster/Camp Poster 2026.html` | Poster source reference only. |
| `newdesignideas/export/src/poster/poster-styles.css` | Poster source reference only. |
| `~/Downloads/EE _ Attention _terminal_.html/.png` | External reference for text terminal. |
| `~/Downloads/II _ Counting _signal_.html/.png` | External reference for counting signal. |
| `~/Downloads/FF _ Diffusion _spectrum_.html/.png` | External reference for image spectrum. |
| `~/Downloads/JJ _ VAE latent _nebula_.html/.png` | External reference for latent nebula. |
| `~/Downloads/HH _ Light-box _slit-scan_.html/.png` | External reference for video slit-scan. |
| `~/Downloads/GG _ Forward pass _acid_.html/.png` | External reference for advanced acid mechanics. |

## Recommended Work Order

1. **Add skin hooks and tokens**
   - Add `data-skin` conventions and shared variables.
   - Add reusable primitives for terminal, signal, spectrum, nebula, slit-scan,
     acid, and studio synthesis.

2. **Pilot the four session pages**
   - `pages/session-text.html`
   - `pages/session-images.html`
   - `pages/session-video.html`
   - `pages/session-showcase.html`

3. **Update homepage as the sampler**
   - Let each session row preview its skin.
   - Keep the homepage legible and not locked to a single aesthetic.

4. **Roll into tools by session**
   - Text tools first, because terminal/counting skins are the clearest.
   - Image tools second.
   - Video tools third.
   - Studio/cross tools last.

5. **Update packs and worksheets**
   - Packs can be more expressive.
   - Worksheets must remain print-safe.

6. **Update concept bridges and detail pages**
   - Concept bridges should become small teaching posters.
   - Detail pages should show a preview motif for the associated tool/session.

7. **Refresh docs and QA references**
   - Update `docs/DESIGN-SYSTEM.md`, `docs/build-roadmap.md`, and
     `docs/qa-checklist.md` after implementation.

## Acceptance Checks

- Every public HTML route has an assigned skin or an explicit quiet/docs role.
- Every Markdown/CSS/JS file has a support, source, or archive role.
- No archive/reference file is treated as a live implementation target.
- No generated poster HTML is copied wholesale into the live site.
- All motion is disabled or harmless under `prefers-reduced-motion`.
- Core pages remain usable at 360/390px, 768px, and 1280px.
- Dark/slate, paper, and light tones remain legible.
- Print-oriented worksheets remain printable.
- No new runtime dependencies.
- No live model or account dependency is introduced.
