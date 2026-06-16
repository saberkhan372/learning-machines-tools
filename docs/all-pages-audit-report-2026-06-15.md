---
layout: page
title: All Pages Audit Report — 2026-06-15
---

# All Pages Audit Report — 2026-06-15

Status: **audit complete; fix passes complete**
Plan used: [`docs/all-pages-audit-plan.md`](all-pages-audit-plan.html)

This pass checked the public static site surface after the Field Manual,
route-skin, identity-switcher, tiering, and advanced-tool updates.

## Summary

| Check | Result |
|---|---:|
| HTML routes opened locally | 97 |
| Browser checks | 291 route-width checks |
| Widths checked | 390, 768, 1280 |
| Local load failures | 0 |
| Real site console errors | 0 |
| Broken internal links | 0 |
| Missing internal anchors | 3 before fix; 0 after Fix Pass 1 |
| Routes with horizontal overflow | 16 before fix; 0 after Fix Pass 1 |
| Routes with nav-label contract exceptions | 4 before fix; 0 after Fix Pass 1 |
| Routes missing `h2` in browser | 2 before fix; 0 after Fix Pass 1 |
| Markdown front matter gaps | 8 before fix; 0 after Fix Pass 2 |
| Footer trio gaps | 22 before fix; 0 after Fix Pass 2, excluding intentional demos/worksheets |
| Tier 1 tools smoke-loaded | 12 / 12 |

## Fix Pass 1 — 2026-06-15

Completed immediately after the audit:

- Fixed shared nav/projection overflow by moving the injected `Project` button
  out of the nav flow on tablet and mobile widths.
- Fixed worksheet screen overflow by containing worksheet tables inside
  horizontally scrollable section bodies.
- Added missing vocabulary anchors for `#temperature`, `#diffusion`, and
  `#coherence`.
- Added semantic `h2` headings to both truth-sieve tools.
- Set both truth-sieve tools to `data-skin="studio-synthesis"` instead of an
  empty skin value.
- Standardized the four nav-label exceptions to include `Tool index` and
  `Sessions`.
- Updated `tools/README.md` from 21 to 25 launch-ready tools.

Post-fix verification:

| Check | Result |
|---|---:|
| Full browser verification | 97 routes × 3 widths |
| Widths checked | 390, 768, 1280 |
| Load / real console / nav / h2 / overflow problems | 0 |
| Identity mobile sweep | 97 routes × 4 identities |
| Identity sweep problems | 0 |

Remaining item: decide whether `pages/docs-facilitation.html` should stay a
minimal noindex redirect stub or get a tiny standard redirect template. It
already redirects to the canonical Session 1 facilitation page.

Notes:

- External font requests were blocked during browser sweeps to keep the audit
  offline-focused. Font-related console noise was filtered out.
- `_layouts/page.html` and `packs/_template.html` were treated as templates,
  not public routes.
- `pages/docs-facilitation.html` is a noindex redirect stub to
  `pages/docs-session-1-facilitation.html`; static contract checks flag it as
  missing Field chrome, but that is acceptable for a redirect page.

## Fix Pass 2 — 2026-06-15

Completed after Fix Pass 1:

- Added the standard `Home · Tool index · Materials` footer trio to the shared
  Markdown layout, homepage, standalone docs, prompt packs, support/reference
  pages, and two tool pages that already had simple footers.
- Added Jekyll front matter to the remaining Markdown docs that were intended
  to render on GitHub Pages.

Post-fix verification:

| Check | Result |
|---|---:|
| Full browser verification | 97 routes × 3 widths |
| Widths checked | 390, 768, 1280 |
| Load / real console / nav / h2 / overflow problems | 0 |
| Markdown front matter gaps | 0 |
| Footer gaps after explicit exceptions | 0 |

Explicit footer exceptions:

- `pages/doc-spectrum.html`, `pages/session-acid.html`, and
  `pages/tool-terminal.html` are frozen design-lab demo surfaces.
- `worksheets/*/index.html` use worksheet evidence footers rather than the
  site footer trio to preserve their print/export role.

## Good News

- Every checked HTML route loaded locally at all three widths.
- No real JavaScript console errors appeared after filtering blocked-font
  noise.
- No internal file links are broken.
- All Tier 1 tools loaded at mobile width with headings, controls, and no real
  console errors.
- The full tool count is correct in `assets/tools-data.js`, `README.md`,
  `index.html`, and `pages/tools.html`: **25 tools**.
- The three frozen identity demo pages remain intentionally contained:
  `pages/tool-terminal.html`, `pages/doc-spectrum.html`,
  `pages/session-acid.html`.

## Launch Blockers

None found in this pass.

No page failed to load, no launch-critical tool crashed, no internal route was
broken, and the Tier 1 tools smoke-loaded cleanly.

## Pilot Caveats Resolved In Fix Pass 1

These were worth fixing before a highly polished public run. They were resolved
in Fix Pass 1 and verified by browser sweeps.

### 1. Mobile/tablet horizontal overflow

The largest issue cluster is horizontal overflow, mostly caused by crowded nav
links plus the injected `Project` control. Worksheets also have wide tables.

| Route | Overflow observed |
|---|---|
| `worksheets/*/index.html` | 142px at 390; 28px at 768 |
| `pages/session-video.html` | 36px at 390; 128px at 768 |
| `pages/session-showcase.html` | 29px at 390; 120px at 768 |
| `pages/session-text.html` | 19px at 390; 143px at 768 |
| `pages/session-images.html` | 19px at 390; 143px at 768 |
| `tools/network-grounded-truth-sieve/index.html` | 40px at 390; 52px at 768 |
| `pages/docs-session-4-facilitation.html` | 26px at 390; 27px at 768 |
| `pages/younger-learners.html` | 6px at 390; 36px at 768 |
| `pages/no-ai-pathway-facilitation.html` | 6px at 390; 3px at 768 |
| `pages/tool-terminal.html` | 13px at 390 |
| `tools/relational-co-occurrence-sieve/index.html` | 3px at 768 |
| `index.html` | 17px at 768 |

Targeted overflow probe:

- On session/docs/tool pages, the widest element is usually `.nav-links`,
  specifically the injected `.lm-project-btn`.
- On worksheets, `.nav-links` and the worksheet tables both overflow.
- On `pages/tool-terminal.html`, the custom demo nav launch link overflows.

Fix applied:

- The injected `Project` button is fixed to the lower-right corner at
  `max-width: 900px`, so it no longer participates in nav layout.
- Worksheet section bodies scroll horizontally on screen, so print-sized tables
  no longer widen the route.
- Rechecked all 97 routes at 390, 768, and 1280: zero horizontal overflow.

### 2. Nav-label contract exceptions

Four pages have nav chrome, but the first pair is not the current
`Tool index` / `Sessions` contract.

| Route | Current nav text |
|---|---|
| `pages/build-story.html` | Learning Machines · Colophon · Vocabulary · Sessions · Back home |
| `pages/colophon.html` | Learning Machines · Vocabulary · Sessions · Run console · Back home |
| `pages/redesigns-index.html` | Learning Machines · Back home |
| `pages/this-saturday.html` | Learning Machines · Run console · All sessions · Vocabulary · Back home |

Fix applied:

- All four pages now include `Tool index` and `Sessions` in the nav.

### 3. Missing vocabulary anchors

No internal files are missing, but three session links point to anchors that do
not exist on `pages/vocabulary-field-guide.html`.

| Source | Missing anchor |
|---|---|
| `pages/session-text.html` | `vocabulary-field-guide.html#temperature` |
| `pages/session-images.html` | `vocabulary-field-guide.html#diffusion` |
| `pages/session-video.html` | `vocabulary-field-guide.html#coherence` |

Fix applied:

- Added the three missing IDs to the matching vocabulary rows.

### 4. Two truth-sieve tools are missing `h2`

Both pages load and work, but they do not satisfy the semantic heading sweep.

| Route |
|---|
| `tools/network-grounded-truth-sieve/index.html` |
| `tools/relational-co-occurrence-sieve/index.html` |

Fix applied:

- Promoted existing mini-labels to `h2` elements.

## Later Polish Resolved

### Footer trio gaps — resolved except explicit exceptions

Fix Pass 2 added the standard footer trio to the public docs, packs, support
pages, homepage, and the tool pages that already had simple informational
footers.

The remaining routes without the trio are intentional exceptions:

- `pages/doc-spectrum.html`, `pages/session-acid.html`, and
  `pages/tool-terminal.html` are frozen design-lab demo surfaces.
- all five `worksheets/*/index.html` use worksheet evidence footers to preserve
  their print/export workflow.

### Markdown front matter gaps — resolved

Fix Pass 2 added Jekyll front matter to:

- `docs/BUILD-LOG.md`
- `docs/DESIGN-SYSTEM.md`
- `docs/INTEGRATION-QUEUE.md`
- `docs/SHARED-CONTRACT.md`
- `docs/session-1-text.md`
- `docs/session-2-images.md`
- `docs/session-3-video.md`
- `docs/session-4-showcase.md`

Static verification now reports zero Markdown front matter gaps.

### `tools/README.md` stale count — resolved

Fix Pass 1 updated `tools/README.md` from `Launch-Ready Tools (21)` to
`Launch-Ready Tools (25)` and added:

- Latent Space Compressor
- Metronome Frame-Scrubber
- Network-Grounded Truth Sieve
- Relational Co-Occurrence Sieve

## Identity Sweep

The mobile identity sweep checked all 97 HTML routes under:

- Field
- Terminal
- Spectrum
- Acid

Result:

- Real console errors: 0
- Routes with mobile overflow before Fix Pass 1: 15
- Routes with mobile overflow after Fix Pass 1: 0

The overflow routes were the same cluster as the Field sweep, with terminal and
acid sometimes increasing the measured overflow by 10-16px. Fix Pass 1 resolved
the shared nav and worksheet/table causes and the identity sweep now passes.

## Tier 1 Tool Smoke Pass

Checked at 390px:

| Tool | Result |
|---|---|
| Tokenizer + Temperature Visualizer | Loaded; controls present; no real console errors |
| Count the Next Token | Loaded; controls present; no real console errors |
| ELIZA Simulator | Loaded; controls present; no real console errors |
| Feature Extraction / Pixel Resolution | Loaded; controls present; no real console errors |
| Diffusion Step-Through Viewer | Loaded; controls present; no real console errors |
| Default Test Comparison Viewer | Loaded; controls present; no real console errors |
| Temporal Telephone | Loaded; controls present; no real console errors |
| Video Failure Gallery Viewer | Loaded; controls present; no real console errors |
| A/B/C Comparison Board | Loaded; controls present; starter buttons clickable; no real console errors |
| Model Card Builder | Loaded; controls present; no real console errors |
| Classroom Activity Builder | Loaded; controls present; no real console errors |
| Evidence Wall | Loaded; controls present; no real console errors |

This was a smoke pass, not a full human interaction pass. Before a live session,
still manually exercise each Tier 1 tool using `docs/qa-checklist.md`.

## Recommended Fix Order

1. **Decide redirect-stub contract** — leave `pages/docs-facilitation.html` as
   a minimal noindex redirect, or give redirect stubs their own explicit audit
   exemption.

## Raw Artifacts

Raw browser JSON was written during the audit to:

- `/private/tmp/lm-audit-browser.json`
- `/private/tmp/lm-audit-identity.json`

These are temporary local artifacts, not committed project files.
