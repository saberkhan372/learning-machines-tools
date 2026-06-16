---
layout: page
title: All Pages Audit Plan
---

# All Pages Audit Plan

Status: **draft audit plan**
Date: 2026-06-15

Use this plan for a full-site page audit before publishing, promoting, or
starting a major redesign pass. It combines automated sweeps with a focused
human read-through so the site is checked as a teaching system, not just as a
set of HTML files.

## Scope

Audit every public route family:

- `index.html`
- `pages/*.html`
- `docs/*.html` generated from Markdown through Jekyll, plus standalone docs
  HTML such as `docs/pre-session-checkin.html`
- `tools/*/index.html`
- `tools/concept-bridges/*/index.html`
- `packs/*/index.html`
- `worksheets/*/index.html`

Treat `assets/archive/`, `docs/archive/`, `newdesignideas/`, and one-off source
materials as reference only unless they are linked from a public page.

## Outputs

Create these audit artifacts:

1. **Route inventory**: every public URL, page family, expected `data-skin`,
   modality/session, and whether it is launch-critical.
2. **Automated sweep report**: load status, console errors, broken links,
   missing stylesheets/scripts, horizontal overflow, missing headings, missing
   nav, missing footer links, and missing identity/projection controls where
   expected.
3. **Screenshot contact sheet**: mobile and desktop screenshots for each page
   family, with every launch-critical page captured individually.
4. **Issue table**: each finding classified as launch blocker, pilot caveat,
   later polish, or second-wave idea.
5. **Fix queue**: grouped by file owner/page family so repairs can be batched.

## Phase 1: Route Inventory

Build a fresh route list from the filesystem and classify each page.

Check:

- Route exists and can be opened locally.
- Route is either intentionally public or clearly marked as a design/demo route.
- Every public HTML route has exactly one `data-skin`, except frozen demo pages
  that are intentionally self-contained.
- Tools have `data-mod`.
- Markdown docs have front matter and render through `_layouts/page.html` on
  GitHub Pages.
- Tool count agrees across `assets/tools-data.js`, `README.md`,
  `tools/README.md`, homepage/catalog copy, and generated route lists.

Special attention:

- Demo pages such as `pages/tool-terminal.html`, `pages/doc-spectrum.html`, and
  `pages/session-acid.html` should stay noindex and design-lab-contained.
- The two live-network truth sieves should be marked as launch ready but not
  part of the live session spine.

## Phase 2: Static Contract Checks

Run fast source checks before opening browsers.

Check every public page for:

- Field Manual assets, not archived v1 assets:
  `field.css`, appropriate `field-sub.css` / `field-tool.css` /
  `field-home.css`, and `field-theme.js`.
- No live references to `assets/archive/lm.css`, `theme.js`, `home.css`,
  `sub.css`, `app.js`, or `hero.js`.
- Required nav labels: `Tool index` and `Sessions` in the first two nav slots
  wherever nav chrome appears.
- Footer link trio on standard subpages: `Home`, `Tool index`, `Materials`.
- At least one real `h2` on every public route.
- Meaningful images have `alt`.
- Worksheets include `worksheet-export.js` and the evidence footer fields.
- Tool detail pages and tool apps agree on names, sessions, and links.
- `ready` is treated as the baseline: catalog rows should not show redundant
  ready badges.

## Phase 3: Browser Load Sweep

Open every route in a browser at three widths:

- Mobile: `390 x 1100`
- Tablet: `768 x 1100`
- Desktop: `1280 x 900`

For each route, record:

- HTTP/load failure.
- Console errors from site code.
- Failed asset requests.
- Horizontal overflow.
- First major title appears within a reasonable mobile distance.
- Identity menu appears unless intentionally suppressed.
- Projection button appears on supported page families.
- Nav and footer links resolve.
- Body text remains readable over washes, skins, and identity effects.
- Reduced-motion mode has a complete static state.

Ignore browser-extension noise in the harness, but do not ignore site-thrown
exceptions.

## Phase 4: Visual Identity Matrix

Do a full automated sweep for overflow and console errors under all identities:

- Field
- Terminal
- Spectrum
- Acid

For visual review, use a smaller representative matrix:

- Homepage
- One session page per session
- One Tier 1 tool per modality
- One cross-session/studio tool
- One worksheet
- One prompt pack
- One long docs/reference page
- One poster/design page

Check:

- Identity changes are visible but do not break readability.
- Print pages remain print-safe.
- Modality color remains meaningful under every identity.
- Skin and identity do not visually fight each other.
- No glitch or heavy motion appears on body copy, nav, or long instructions.

## Phase 5: Launch-Critical Tool QA

Run full interaction QA on Tier 1/session-essential tools first:

- Tokenizer + Temperature Visualizer
- Count the Next Token
- ELIZA Simulator
- Feature Extraction / Pixel Resolution
- Diffusion Step-Through Viewer
- Default Test Comparison Viewer
- Temporal Telephone
- Video Failure Gallery Viewer
- A/B/C Comparison Board
- Model Card Builder
- Classroom Activity Builder
- Evidence Wall

For each:

- Open at mobile, tablet, and desktop widths.
- Exercise the main controls.
- Confirm keyboard access and visible focus.
- Run visible self-tests where the tool provides them.
- Confirm no account, API key, build step, or live model is needed.
- Confirm copy/export/print behavior where present.
- Confirm the first screen makes the invisible mechanism visible.

Then run lighter smoke QA for Tier 2/explore tools.

## Phase 6: Session And Facilitation Read-Through

Read the participant path as if arriving cold:

- Homepage start-here band.
- Camp logistics.
- Session 1, 2, 3, and Optional Studio pages.
- Session link sheet.
- Materials directory.
- No-AI pathway and no-AI facilitation page.
- Vocabulary Field Guide.
- Further Reading, Hands-On, AI Access, Younger Learners.

Check:

- A first-time educator can find the run-of-show.
- A participant can find the direct-use, observe, teach, build, and no-AI paths.
- The featured/live tools are not buried under the full catalog.
- Jargon links to vocabulary on first contact.
- Ledes are short enough to scan on mobile.
- Consent and public sharing questions are explicit.
- Async/recording route is presented as a complete path, not a consolation.

## Phase 7: Worksheets, Packs, And Print

For each worksheet:

- Fill one field, reload, and confirm persistence.
- Use Copy as Markdown and confirm the evidence footer appears.
- Print / Save as PDF and confirm controls are hidden.
- Confirm identity skins are restrained on screen and Field-clean in print.

For each prompt pack:

- Confirm examples are static/frozen and need no live generation.
- Confirm placeholder media is clearly marked where still placeholder.
- Confirm image alt text is meaningful.
- Confirm video frame strips do not create excessive mobile height.
- Confirm pack layout is centered at mobile, tablet, and desktop widths.

## Phase 8: Network And Offline Checks

Confirm launch-critical pages work with only static assets:

- No live model calls.
- No account-only dependencies.
- No build step.
- No external scripts.
- Google Fonts may load, but pages must remain usable if fonts are blocked.
- The only intentional live API tools are the two truth sieves, and both need
  an in-tool network warning.

## Phase 9: Prioritization Rules

Classify every finding:

| Class | Meaning | Examples |
|---|---|---|
| Launch blocker | Must fix before a live session | Tool fails to load, console crash, broken session link, worksheet cannot save/export, unreadable mobile layout |
| Pilot caveat | Can run if facilitator knows | Nonessential tool has a visual rough edge, live-network tool needs a verbal warning |
| Later polish | Improves quality but does not block | Lede could be shorter, motif could be stronger, spacing could be tighter |
| Second-wave idea | New capability or larger redesign | New advanced tool, new prompt pack, extra identity mode |

Do not mix new feature ideas into launch-blocker work. A full audit should make
the site calmer, not open a dozen fresh build fronts.

## Done Criteria

The audit is complete when:

- Every public route is accounted for.
- Every launch-critical route has been loaded at mobile, tablet, and desktop
  widths.
- Every Tier 1 tool has been exercised manually.
- Every worksheet has persistence, Markdown export, and print verified.
- Every finding is classified and assigned to a fix batch.
- The remaining risks are explicit enough for a facilitator to run the session
  confidently.
