---
layout: page
title: UI Controls Audit — 2026-06-15
---

# UI Controls Audit — 2026-06-15

Scope: Look menu, Project button, projection behavior, and page-family visual
drift after manual review flagged inconsistent controls.

## Method

- Static sweep of 102 HTML routes, excluding `newdesignideas/`.
- Browser probe on representative public pages plus every interactive tool and
  concept bridge at 1280px width.
- Checks: `field-theme.js` presence, `.lm-skin-toggle`, `.lm-project-btn`,
  `data-projection` toggling, inferred `data-project-layout`, title-size
  changes, nav hiding, horizontal overflow, and console errors.

No console errors appeared in the probed routes.

## Remediation Status

Applied after the audit:

- Removed accidental `data-no-projection data-no-identity-menu` flags from the
  six production pages listed in C1. Static re-sweep now reports no live
  `field-theme.js` page with those opt-outs.
- Strengthened `assets/projection.css` for legacy tool headers, fallback Project
  buttons, and worksheet headers/tables. Browser probes confirmed ELIZA,
  diffusion, temporal telephone, access tiers, run console, and the text
  worksheet all expose Look + Project and resize their primary heading to the
  projection title ramp.
- Re-aliased worksheet-local color tokens to the shared Field tokens so Look
  identities style the worksheet family instead of fighting private page
  colors.
- Marked `pages/tool-terminal.html` as an intentional frozen demo opt-out,
  matching `doc-spectrum` and `session-acid` instead of leaving it in a mixed
  fallback-control state.

Remaining decisions:

- C4 remains a product-boundary question: raw export galleries may stay outside
  the full shell if they are clearly treated as deliverables rather than
  production pages.

## Findings

### C1 — Production pages explicitly opt out of both controls

These pages have `data-no-projection data-no-identity-menu`, so they render with
no Look menu and no Project button:

- `pages/run-console.html`
- `pages/this-saturday.html`
- `pages/build-story.html`
- `pages/vocabulary-field-guide.html`
- `pages/colophon.html`
- `pages/redesigns-index.html`

This exactly explains the missing controls seen on `run-console.html`.

**Severity:** High, because the site now presents Look + Project as global
chrome and these pages look like normal production pages, not frozen exports.

**Recommended fix:** Remove the opt-out flags from production pages, then patch
any specific data-viz blocks that misbehave under identity/projection. Keep
opt-outs only for true frozen design demos or raw exports.

### C2 — Project toggles on older tools, but the visible transformation is weak

The button technically works: it sets `html[data-projection="on"]`, updates the
URL to `?project=1`, changes the button to "Exit projection", and hides normal
nav links. But several older tool shells do not visibly resize or simplify
enough, so Project can feel like it did nothing.

Most affected:

- `tools/diffusion-step-through-viewer/` — h1 stays 22px
- `tools/eliza-simulator/` — h1 stays 28px
- `tools/feature-extraction-pixel-resolution/` — h1 stays 22px
- `tools/temporal-telephone/` — h1 stays 22px
- `tools/next-token-prediction-game/` — h1 stays 38.4px

Partial / weaker transform:

- `tools/abc-comparison-board/`
- `tools/confidence-is-not-truth-explorer/`
- `tools/count-the-next-token/`
- `tools/model-card-builder/`
- `tools/concept-bridges/*`

Newer tool pages using `.tool-hero` / `.tool-title` generally respond better.

**Severity:** High for Zoom/classroom use.

**Root cause:** Projection CSS targets the newer shell classes
(`.tool-hero`, `.tool-title`, `.tool-mast`, `.wall-title`) more reliably than
the older bespoke tool headers. Internal tool CSS can also out-rank the
projection selectors.

**Recommended fix:** Either normalize older tool mastheads to shared classes or
broaden `projection.css` with stronger tool-header selectors for legacy shells.

### C3 — Frozen design-lab pages intentionally look different, but the boundary is blurry

These pages are noindex/frozen design demos and are not held to the production
shell contract:

- `pages/doc-spectrum.html`
- `pages/session-acid.html`
- `pages/tool-terminal.html`

`doc-spectrum` and `session-acid` have no Field shell, no Look menu, and no
Project button. `tool-terminal.html` is stranger: it loads `field-theme.js`, so
it gets Look and a fallback Project button, but it has no standard nav and its
projection state barely changes the custom demo.

**Severity:** Medium.

**Recommended fix:** Make the boundary explicit. Either keep all three as frozen
demo surfaces with `data-no-projection data-no-identity-menu` and a clear return
link, or bring them into the standard shell. Avoid the mixed state currently on
`tool-terminal.html`.

### C4 — Linked export gallery is outside the shared shell

`export/Animated Posters.html` is now linked from Materials and the poster lab.
It has working local links and no console errors, but it is not in the Field
shell and has no Look/Project controls.

**Severity:** Medium if exports are treated as site pages; Low if treated as raw
deliverables.

**Recommended fix:** If it remains linked in the Materials directory, wrap it in
the standard nav/theme/projection shell or label it plainly as a raw export
surface. The standalone export files can stay raw.

### C5 — Worksheet pages are intentionally print-first, but Project mode is weak

Worksheets do show Look + Project. Project hides controls and nav links, but
the worksheet header/title remains small and the page still reads more like a
print form than a projection view.

Example checked: `worksheets/text-experiment-board/`.

**Severity:** Medium.

**Recommended fix:** Add worksheet-specific projection rules for the worksheet
header/title and first content block. Keep print CSS unchanged.

## Clean Checks

- Home, tool index, materials, session pages, packs, poster lab, and newer tools
  all show Look + Project.
- Project toggling works mechanically on pages with the button.
- No horizontal overflow appeared in the sampled 1280px browser probes.
- No console errors appeared in the probed routes.

## Fix Queue

1. Remove accidental opt-outs from production docs/data pages.
2. Strengthen projection selectors for legacy interactive tool headers.
3. Decide and document the frozen-demo contract for `doc-spectrum`,
   `session-acid`, and `tool-terminal`.
4. Bring `export/Animated Posters.html` into the standard shell or mark it as a
   raw export page.
5. Improve worksheet projection typography without affecting print output.
