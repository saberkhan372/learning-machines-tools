---
layout: page
title: Full Page Design Audit
---

# Full Page Design Audit

Status: **audit complete; P0 and shared P1 implementation passes complete**
Date: **2026-06-12**  
Scope: **65 public HTML routes** plus the shared templates that shape docs and
pack pages.

This audit checks whether every live page has a clear role in the redesign,
whether the new session skins are actually carrying through the page, and where
readability or layout issues should be fixed before pushing the visual system
harder.

## P0 Implementation Pass

Completed after the initial audit:

| Result | Status |
|---|---:|
| Public routes checked | 65 |
| Missing skin hooks | 0 |
| Mobile horizontal overflow | 0 |
| Desktop horizontal overflow | 0 |
| Late mobile H1s over audit threshold | 0 |
| Browser console errors | 0 |

Changes made:

- Added a `data-skin` assignment to every public HTML route.
- Added the missing `counting-signal`, `latent-nebula`, `docs-field`, and
  `worksheet-print` skin tokens to the shared CSS contract.
- Fixed concept bridge mobile overflow by constraining decorative pseudo-element
  bleed on mobile.
- Moved the Evidence Wall title above the consent banner so the tool identifies
  itself before the warning text.
- Tightened mobile hero rhythm on session/docs pages and moved the Confidence
  Explorer title ahead of its big-idea callout.

## Shared P1 Skin Pass

Completed after the P0 pass:

- Carried skin accents into section rules, navigation marks, index rows, doc
  rows, throughline cards, run-of-show rows, prompts, visible/investigation
  cards, callouts, prose blocks, docs tables, and prompt-pack cards.
- Pushed skin accent variables into migrated tool apps so panels, cards,
  controls, focus states, and primary buttons respond to the route skin.
- Kept `docs-field` and `worksheet-print` quieter so reference and print pages
  remain readable.
- Re-ran the 65-route browser sweep at mobile and desktop after the shared P1
  CSS changes: 0 overflow, 0 missing skin hooks, 0 late H1 warnings over the
  audit threshold, 0 console errors.

## Automated QA Sweep

Initial audit, checked at desktop `1280x900` and mobile `390x1100` against a
local static server.

| Finding | Result |
|---|---:|
| Public routes checked | 65 |
| Load failures | 0 |
| Site console errors | 0 |
| Desktop horizontal overflow | 0 |
| Mobile horizontal overflow | 6 routes |
| Routes with an explicit skin hook | 5 |
| Routes without an explicit skin hook | 60 |

Notes:

- Browser plugin / Statsig initialization warnings appeared in the test harness.
  These were not site errors.
- Current skin hooks appear on the homepage and four session pages only:
  `home-sampler`, `text-terminal`, `image-spectrum`, `video-slitscan`, and
  `studio-synthesis`.
- Most tool pages, tool-detail pages, packs, worksheets, docs, and concept
  bridges still render as Field Manual pages with limited or no session identity.

## Highest Priority Issues

| Priority | Issue | Affected pages | Fix direction |
|---|---|---|---|
| P0 | Mobile horizontal overflow | Six individual concept bridge pages | Fix shared bridge layout width/margins before more styling. |
| P0 | Missing skin hooks | 60 public routes | Add `data-skin` or equivalent route-family hook to every live page. |
| P0 | Late mobile page title | Session pages, vocabulary, no-AI, evidence wall | Reduce hero/top padding and avoid excess blank space before the H1. |
| P1 | Skins stop after the hero | Session pages | Carry motifs into section headers, tables, cards, and lower bands. |
| P1 | Tool-detail pages are too neutral | `pages/tool-*.html` | Match each detail page to the tool/session skin. |
| P1 | Actual tools are mostly unskinned | `tools/*/index.html` | Apply modality skins without compromising tool usability. |
| P2 | Print pages need light accents | Worksheets, packs, docs | Keep print-safe structure, add restrained skin headers and tags. |

## Mobile Overflow Failures

These are the only measured mobile overflow failures. All share the concept
bridge family, so this should be fixed once at the shared bridge CSS/page
pattern level.

| Route | Measured overflow | Likely cause | Next action |
|---|---:|---|---|
| `tools/concept-bridges/confidence-is-not-truth/index.html` | 36px | Fixed-width shell/card or horizontal margins | Repair shared bridge mobile layout. |
| `tools/concept-bridges/current-is-not-known/index.html` | 36px | Fixed-width shell/card or horizontal margins | Repair shared bridge mobile layout. |
| `tools/concept-bridges/default-is-a-design-decision/index.html` | 36px | Fixed-width shell/card or horizontal margins | Repair shared bridge mobile layout. |
| `tools/concept-bridges/prediction-is-not-understanding/index.html` | 36px | Fixed-width shell/card or horizontal margins | Repair shared bridge mobile layout. |
| `tools/concept-bridges/time-makes-failure-visible/index.html` | 36px | Fixed-width shell/card or horizontal margins | Repair shared bridge mobile layout. |
| `tools/concept-bridges/what-does-the-machine-see/index.html` | 36px | Fixed-width shell/card or horizontal margins | Repair shared bridge mobile layout. |

## Mobile Title Position Warnings

These routes load successfully and do not overflow, but the first major title
lands too low on mobile. The issue is visual pacing: too much blank or chrome
space before the page announces itself.

| Route | Approx. H1 top | Recommendation |
|---|---:|---|
| `tools/evidence-wall/index.html` | 388px | Compress intro/hero and move primary tool affordance higher. |
| `pages/session-text.html` | 266px | Reduce mobile hero top/bottom padding. |
| `pages/session-images.html` | 266px | Reduce mobile hero top/bottom padding. |
| `pages/session-video.html` | 267px | Reduce mobile hero top/bottom padding. |
| `pages/session-showcase.html` | 267px | Reduce mobile hero top/bottom padding. |
| `pages/no-ai-pathway.html` | 267px | Shorter docs hero. |
| `pages/vocabulary-field-guide.html` | 267px | Shorter docs hero. |
| `tools/confidence-is-not-truth-explorer/index.html` | 264px | Tighten tool intro spacing. |

## Skin Coverage Model

| Skin | Intended route family | Current coverage | Gap |
|---|---|---|---|
| Home sampler | Homepage, global indexes | Homepage only | Global indexes still neutral. |
| Text terminal | Session 1, text tools, text packs, text worksheets | Session 1 page only | Tools/details/packs/worksheets need the skin. |
| Counting signal | Probability/counting tools and panels | Motifs only | Needs route-level use on prediction/counting tools. |
| Image spectrum | Session 2, image tools, image packs, image worksheets | Session 2 page only | Tool/detail/pack coverage missing. |
| Latent nebula | Advanced image mechanics, latent/compression pages | Not live as page skin | Use selectively for latent-space and advanced image pages. |
| Video slit-scan | Session 3, video tools, video packs, video worksheets | Session 3 page only | Tool/detail/pack coverage missing. |
| Studio synthesis | Optional Showcase and cross-session tools | Optional Showcase page only | Cross-session tools still neutral. |
| Docs field | Logistics, facilitation, references | Mostly neutral | Needs quiet but intentional section accents. |
| Worksheet print | Worksheets | Neutral print pages | Need session-colored headers without hurting print. |

## Page-by-Page Audit

### Home, Global, and Index Pages

| Route | Current status | Skin target | Issue | Next action |
|---|---|---|---|---|
| `index.html` | Skinned | Home sampler | Strong upper page; lower sections better, but still need tighter mobile rhythm. | Keep sampler; refine mobile hero height and lower-section motif consistency. |
| `pages/camp-2026.html` | Unskinned | Docs field / campaign | Logistics page does not inherit campaign color language. | Add campaign date cards, small poster bands, quiet session-color tags. |
| `pages/camp-poster.html` | Unskinned | Poster lab | Poster board page is useful but visually separate from the new skin rollout. | Keep as lab/proofing surface; add reference notes for current skin system. |
| `pages/session-links.html` | Unskinned | Home sampler / docs field | Utility page lacks grouping by skin/session. | Add session skin badges and compact grouped rows. |
| `pages/hands-on.html` | Unskinned | Docs field / studio | Practical pathway page reads generic. | Add studio synthesis callout band and pathway tags. |
| `pages/no-ai-pathway.html` | Unskinned; late mobile H1 | Docs field / studio | Too much top space; low visual identity. | Shorten hero and add no-AI/studio accent strip. |
| `pages/vocabulary-field-guide.html` | Unskinned; late mobile H1 | Docs field / mixed motifs | Vocabulary list is useful but visually flat. | Add modality markers and shorter mobile hero. |
| `pages/further-reading.html` | Unskinned | Docs field | Reading list lacks hierarchy and skin connection. | Add quiet section bands by text/images/video/studio. |
| `pages/younger-learners.html` | Unskinned | Docs field / accessibility | Needs gentler adaptation cues and readable hierarchy. | Add light accents, age-band tags, and print-safe callouts. |

### Session and Facilitation Pages

| Route | Current status | Skin target | Issue | Next action |
|---|---|---|---|---|
| `pages/session-text.html` | Skinned; late mobile H1 | Text terminal + counting signal | Hero is strong, but lower sections still feel pasted onto Field Manual. | Add terminal/signal section headers, integrate token wall and temperature ladder into tool/run sections. |
| `pages/session-images.html` | Skinned; late mobile H1 | Image spectrum + latent nebula | Hero palette works; lower page still too flat and sparse. | Carry denoising grids, pixel fields, and latent-node accents through tools/materials. |
| `pages/session-video.html` | Skinned; late mobile H1 | Video slit-scan | Hero/motif work; lower tool/pathway sections need frame language. | Add frame strips, onion-skin accents, and darker light-box cards for video evidence. |
| `pages/session-showcase.html` | Skinned; late mobile H1 | Studio synthesis | Hero is distinct; lower sections are ordinary lists. | Use evidence tile rhythm and mixed-modality tags throughout showcase supports. |
| `pages/docs-facilitation.html` | Unskinned | Text terminal, quiet | Session 1 guide does not visually match Session 1. | Add terminal section labels and one counting/attention motif. |
| `pages/docs-session-2-facilitation.html` | Unskinned | Image spectrum, quiet | Session 2 guide lacks denoising/defaults language. | Add pastel spectrum header, pixel/default cards, and image-session tags. |
| `pages/docs-session-3-facilitation.html` | Unskinned | Video slit-scan, quiet | Session 3 guide lacks frame/coherence identity. | Add frame-strip headers and temporal-coherence callouts. |
| `pages/docs-showcase-facilitation.html` | Unskinned | Studio synthesis, quiet | Optional Showcase guide lacks evidence/showcase identity. | Add evidence-wall support cards and consent/claim tags. |

### Tool Detail Pages

| Route | Current status | Skin target | Issue | Next action |
|---|---|---|---|---|
| `pages/tool-tokenizer.html` | Unskinned | Text terminal | Detail page does not match the tokenizer/session visual system. | Add token strip, terminal labels, and temperature ladder preview. |
| `pages/tool-prediction-game.html` | Unskinned | Counting signal | Needs probability/distribution identity. | Add signal bars and next-token distribution preview. |
| `pages/tool-count-next-token.html` | Unskinned | Counting signal | Detail page should mirror count-to-probability path. | Add count/divide/probability micro-diagram. |
| `pages/tool-eliza.html` | Unskinned | Text terminal | Rule-matching page is visually too neutral. | Add terminal transcript panel and rule card strip. |
| `pages/tool-feature-extraction.html` | Unskinned | Image spectrum | Needs pixels/features visual hook. | Add pixel-resolution field and feature highlight motif. |
| `pages/tool-diffusion.html` | Unskinned | Image spectrum | Needs denoising sequence identity. | Add diffusion grid strip and pastel noise band. |
| `pages/tool-confidence-truth.html` | Unskinned | Studio synthesis / text terminal | Confidence concept lacks warning/evidence identity. | Add evidence-vs-fluency comparison motif. |
| `pages/tool-temporal-telephone.html` | Unskinned | Video slit-scan | Temporal drift identity missing. | Add frame sequence strip and coherence accent. |
| `pages/tool-abc-comparison-board.html` | Unskinned | Studio synthesis | Comparison/evidence tool needs studio language. | Add A/B/C evidence cards and modality tags. |
| `pages/tool-model-card-builder.html` | Unskinned | Studio synthesis | Model card page can carry reflection/evidence system. | Add claim/default/failure bands. |
| `pages/tool-access-tiers.html` | Unskinned | Docs field / studio | Equity/access page needs clearer comparative visual structure. | Add tier comparison accents and print-safe exclusion panel styling. |
| `pages/tool-evidence-wall.html` | Unskinned | Studio synthesis | Detail page should look like the Optional Showcase aggregation tool. | Add tile-wall preview and consent tag treatment. |

### Tool Apps

| Route | Current status | Skin target | Issue | Next action |
|---|---|---|---|---|
| `tools/tokenizer-temperature-visualizer/index.html` | Unskinned | Text terminal + counting signal | Functional but not fully in Session 1 skin family. | Add terminal shell, stronger temperature ladder, reduced-motion scanline. |
| `tools/next-token-prediction-game/index.html` | Unskinned | Counting signal | Needs stronger live-count/distribution identity. | Add signal bars, compact comparison panel, and clearer pasted-data state. |
| `tools/count-the-next-token/index.html` | Unskinned | Counting signal | Page content is good; design can be more vivid. | Add counted-live bars and step arithmetic panel styling. |
| `tools/eliza-simulator/index.html` | Unskinned | Text terminal | Should feel like a rule terminal. | Add CRT transcript framing and rule-match highlights. |
| `tools/confidence-is-not-truth-explorer/index.html` | Unskinned; late mobile H1 | Text terminal / studio | Intro spacing is tall; visual warning language is light. | Tighten hero and add confidence/evidence contrast system. |
| `tools/feature-extraction-pixel-resolution/index.html` | Unskinned | Image spectrum | Pixel mechanics need stronger image-session look. | Add feature/pixel field and spectrum palette. |
| `tools/diffusion-step-through-viewer/index.html` | Unskinned | Image spectrum | Should anchor the denoising visual language. | Add denoising sweep, noise field, and pastel grid. |
| `tools/default-test-comparison-viewer/index.html` | Unskinned | Image spectrum / studio | Defaults critique needs clearer visual contrast. | Add before/after default cards and pink/cyan accent bands. |
| `tools/prompt-guidance-word-by-word/index.html` | Unskinned | Image spectrum | Needs prompt-as-control visual. | Add word-by-word guidance rail and image/default tags. |
| `tools/latent-space-explorer/index.html` | Unskinned | Latent nebula | Best candidate for full dark latent skin. | Add glow nodes, compression map, and dark gradient panel. |
| `tools/dataset-balance-simulator/index.html` | Unskinned | Image spectrum / latent nebula | Balance mechanics are visually quiet. | Add colored distribution fields and latent/balance accents. |
| `tools/temporal-telephone/index.html` | Unskinned | Video slit-scan | Needs temporal drift identity. | Add frame strip, onion-skin overlay, and dark light-box panel. |
| `tools/video-failure-gallery-viewer/index.html` | Unskinned | Video slit-scan | Gallery should feel like failure evidence lab. | Add frame cards, drift/failure tags, and scanline accent. |
| `tools/frame-by-frame-coherence-viewer/index.html` | Unskinned | Video slit-scan | Core video tool should drive the skin. | Add light-box dark panels, cyan/magenta offsets, and frame diff styling. |
| `tools/abc-comparison-board/index.html` | Unskinned | Studio synthesis | Evidence comparison can be more poster-board-like. | Add A/B/C evidence cards and mixed-modality accents. |
| `tools/model-card-builder/index.html` | Unskinned | Studio synthesis | Needs stronger reflective artifact identity. | Add model-card grid, claim/failure/default bands. |
| `tools/classroom-activity-builder/index.html` | Unskinned | Studio synthesis | Studio builder is visually generic. | Add pathway tiles, print-card accents, and mixed skin tags. |
| `tools/access-tiers/index.html` | Unskinned | Docs field / studio | Important page but restrained to the point of flatness. | Add clear three-tier contrast, printable exclusion panel, and access tags. |
| `tools/evidence-wall/index.html` | Unskinned; very late mobile H1 | Studio synthesis | Primary tool content begins too low; visual identity should lead. | Compress intro and bring tile wall/consent controls higher. |
| `tools/concept-bridges/index.html` | Unskinned | Studio synthesis / docs field | Index is structurally useful but visually neutral. | Add bridge cards with mixed modality accents. |

### Concept Bridge Detail Pages

| Route | Current status | Skin target | Issue | Next action |
|---|---|---|---|---|
| `tools/concept-bridges/prediction-is-not-understanding/index.html` | Mobile overflow | Text terminal | Layout overflow; concept could use terminal/prediction skin. | Fix bridge CSS, then add terminal evidence panel. |
| `tools/concept-bridges/confidence-is-not-truth/index.html` | Mobile overflow | Studio synthesis | Layout overflow; needs confidence/evidence contrast. | Fix bridge CSS, then add warning/evidence color system. |
| `tools/concept-bridges/default-is-a-design-decision/index.html` | Mobile overflow | Image spectrum | Layout overflow; should connect to image defaults. | Fix bridge CSS, then add default-test motif. |
| `tools/concept-bridges/time-makes-failure-visible/index.html` | Mobile overflow | Video slit-scan | Layout overflow; should use temporal frame language. | Fix bridge CSS, then add frame drift strip. |
| `tools/concept-bridges/what-does-the-machine-see/index.html` | Mobile overflow | Image spectrum / latent nebula | Layout overflow; visual perception concept is too neutral. | Fix bridge CSS, then add pixel/latent motif. |
| `tools/concept-bridges/current-is-not-known/index.html` | Mobile overflow | Docs field / studio | Layout overflow; knowledge-limit page needs better caution styling. | Fix bridge CSS, then add current/known evidence callouts. |

### Prompt Packs

| Route | Current status | Skin target | Issue | Next action |
|---|---|---|---|---|
| `packs/text/index.html` | Unskinned | Text terminal + counting signal | Has pack structure but not full Session 1 identity. | Add `data-skin`, terminal headers, and token/probability strips. |
| `packs/images/index.html` | Unskinned | Image spectrum | Needs stronger image/default/diffusion palette. | Add `data-skin`, pixel grids, and denoising/default cards. |
| `packs/video/index.html` | Unskinned | Video slit-scan | Needs frame-strip and temporal coherence identity. | Add `data-skin`, frame rails, and dark light-box callouts. |

### Docs Pages

| Route | Current status | Skin target | Issue | Next action |
|---|---|---|---|---|
| `docs/pre-session-checkin.html` | Unskinned | Docs field / access | Good utility page, but not visually integrated. | Add access/check-in tags and quiet campaign header. |
| `docs/unplugged-human-as-model.html` | Unskinned | Text terminal / no-AI | Needs relation to Session 1 and no-AI pathway. | Add low-tech terminal prompt cards and printable role tags. |

### Worksheets

| Route | Current status | Skin target | Issue | Next action |
|---|---|---|---|---|
| `worksheets/text-experiment-board/index.html` | Unskinned | Worksheet print / text terminal | Print-safe but visually detached from Session 1. | Add small terminal header and token tags, preserve print clarity. |
| `worksheets/image-default-test-board/index.html` | Unskinned | Worksheet print / image spectrum | Print-safe but visually detached from Session 2. | Add spectrum header and default-test accent chips. |
| `worksheets/video-test-report/index.html` | Unskinned | Worksheet print / video slit-scan | Print-safe but visually detached from Session 3. | Add frame-strip header and failure-mode tags. |
| `worksheets/model-investigation-journal/index.html` | Unskinned | Worksheet print / studio synthesis | Needs studio/evidence identity. | Add evidence-header and claim/default/failure tags. |
| `worksheets/ai-use-consent-checklist/index.html` | Unskinned | Worksheet print / docs field | Consent page should be readable and serious. | Add restrained access/consent accent, avoid heavy motion. |

## Template Audit

| Template | Current role | Issue | Next action |
|---|---|---|---|
| `_layouts/page.html` | Jekyll layout for Markdown docs | Markdown docs cannot easily express skin without layout support. | Allow optional front matter skin/class hooks if Markdown docs need skins. |
| `packs/_template.html` | Shared prompt-pack template | Template lacks session skin integration. | Add pack-level skin hook and reusable motif slots. |

## Recommended Implementation Order

1. Fix concept bridge mobile overflow.
2. Add route-family skin hooks across all public pages.
3. Reduce mobile hero/title spacing on session pages, evidence wall, no-AI,
   vocabulary, and confidence explorer.
4. Extend lower-page session skins: section headers, cards, tables, tool rows,
   and material blocks.
5. Skin tool-detail pages before individual tool apps so users see coherent
   transitions from index to detail to tool.
6. Skin actual tools by modality while keeping dense UI readable and
   keyboard-operable.
7. Add print-safe worksheet and docs accents.
8. Update `docs/DESIGN-SYSTEM.md` with the final `data-skin` contract after
   implementation.

## Acceptance Criteria for the Next Pass

- Every public route has an intentional skin assignment, even if that assignment
  is the quiet `docs-field` treatment.
- The six concept bridge pages have no mobile horizontal overflow.
- The homepage and all four session pages remain readable at 390px, 768px, and
  1280px.
- Text terminal, image spectrum, video slit-scan, and studio synthesis are
  visible beyond each hero section.
- Tool pages remain usable first: no effect should obscure controls, tables, or
  teaching text.
- Motion has reduced-motion fallbacks.
- Print-oriented pages keep clean print output.
