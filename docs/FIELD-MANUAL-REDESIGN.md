---
layout: page
title: Field Manual Redesign — Rollout Plan
---

# Field Manual Redesign — Rollout Plan

> **STATUS: IN PROGRESS.** Phases 1–4 shipped 2026-06-10: the shared assets,
> **the entire tool fleet** (20 tools + 6 concept-bridge pages), **the
> homepage**, and **all subpages** (sessions, tool landing pages, docs pages,
> link sheet, guides, packs). Phase 5 (worksheets, lm.css retirement,
> contract flip) is planned below. During the
> rollout the site intentionally runs two design systems side by side — see
> "Coexistence" — so each phase can ship independently without breaking
> unmigrated pages.

## What this is

A second-generation design language for the whole site, replacing the v1 dark
"lab" theme (`assets/lm.css`). The design came from a Claude Design handoff
bundle ("Design Language Refresh", 2026-06-10); the brief was that the dark
theme felt "too vibe-coded" for the project's goals and audience.

The new language is a **field manual / curriculum print** system built from the
project's own spine instead of dev-tool tropes:

- **Warm paper / printed ink** — hairline rules, square corners (2px radius),
  no glows, gradients, or box-shadows
- **Three tones** via `html[data-tone]`: `paper` (warm cream), `white`
  (default), `slate` (dark)
- **Two type voices** via `html[data-type]`: `field` (Newsreader serif
  display) and `signage` (Archivo grotesque, default); IBM Plex Mono for
  specimen labels everywhere
- **Four modality inks** as wayfinding, set by `html[data-mod]` or per-element
  classes: text → blue, image → rust, video → green, cross-session → violet;
  `html[data-ink="subtle"]` collapses them to ink for low-color contexts
- **Print idioms**: numbered § sections, "Fig." plates, stamps, ruled index
  rows instead of cards

## Design source

- Handoff bundle: `https://api.anthropic.com/v1/design/h/3EukPgi3n_DzvIbwhqVN1A`
  (tar.gz; includes prototypes, chat transcripts with intent, and screenshots).
  Handoff URLs are ephemeral, so everything needed for later phases was copied
  into the repo (below).
- The v1 dark-lab design's own handoff is archived context in
  `docs/archive/REDESIGN-PLAN.md`.

## Files in the repo

| File | Role | Used by |
|---|---|---|
| `assets/field.css` | Core system: tokens (tones/type/inks), base, nav, buttons, stamps, plates, index rows, doc lists, footer | All migrated pages |
| `assets/field-tool.css` | **Drop-in tool shim**: maps legacy `lm.css` token names onto Field tokens so tool internals restyle without a rewrite; standard `.tool-mast` + `.tool-notice` chrome; migration recipe in the header comment | Migrated tools |
| `assets/field-theme.js` | Applies persisted tone/type/ink before paint (`lm-tone`, `lm-type`, `lm-ink` localStorage keys) | All migrated pages |
| `assets/field-home.css` | Homepage-specific styles (hero plates, ledger strip, catalog index) | Phase 3 |
| `assets/field-sub.css` | Shared subpage patterns (session, tool-detail, docs templates) | Phase 4 |
| `assets/field-app.js` | Homepage app logic for the Field index (filters, search) | Phase 3 |

Prototype pages for Phases 3–4 live in the handoff bundle
(`Learning Machines.html`, `pages/session-text.html`, `pages/tool-tokenizer.html`,
`pages/docs-facilitation.html`); re-fetch the bundle or ask for a re-export if
the URL has expired by then.

## Per-tool migration recipe

From the `field-tool.css` header — each tool needs only this:

1. `<html lang="en" data-tone="white" data-type="signage" data-ink="full"
   data-mod="text|image|video|cross">` (match the tool's modality)
2. Swap the Google Fonts link to Newsreader + Archivo + IBM Plex Mono.
3. Replace the `lm.css`/`theme.js` links with `../../assets/field.css`,
   `../../assets/field-tool.css`, `../../assets/field-theme.js`.
4. In the tool's own `:root{}`: set `--radius: 2px`, remove hardcoded accent
   shades (the shim derives `--accent`, `--accent-soft`, `--accent-dark` from
   `data-mod`), and drop box-shadows.
5. Swap the nav block for the Field nav chrome (brand → `../../index.html`,
   "Tool index" → `../../index.html#tools`, session link, "Tool notes" →
   the tool's landing page) and the header for `.tool-mast` + `.tool-notice`.
6. Sweep inline styles for hardcoded `#fff` / `box-shadow` and replace with
   `var(--bg)` / nothing.
7. Verify: both modes work, self-tests pass, zero console errors, all three
   tones render (`?` flip `data-tone` in devtools), responsive at 360/768/1280.

## Rollout phases

### Phase 1 — Shared assets + worked example ✅ 2026-06-10

- [x] Six `assets/field-*` files copied into the repo
- [x] `tools/tokenizer-temperature-visualizer/` migrated (the handoff's worked
      example, nav hrefs corrected to repo paths)
- [x] Verified: both tabs work, 7/7 self-tests pass, no console errors, no
      failed requests, Field chrome renders (white tone, Archivo, text-blue ink)

### Phase 2 — Remaining 19 tools ✅ 2026-06-10

Recipe applied per tool (scripted head/attr/link/nav swaps + literal radii
squared to 2px, keeping functional pills/circles). `data-mod` per tool follows
`tools-data.js` modality; the six bridge pages carry their own session's ink.

- [x] Session 1 (text): eliza-simulator, next-token-prediction-game,
      count-the-next-token
- [x] Session 2 (image): diffusion-step-through-viewer,
      feature-extraction-pixel-resolution, default-test-comparison-viewer,
      prompt-guidance-word-by-word, latent-space-explorer,
      dataset-balance-simulator
- [x] Session 3 (video): temporal-telephone, video-failure-gallery-viewer,
      frame-by-frame-coherence-viewer
- [x] Cross/studio: abc-comparison-board, model-card-builder,
      classroom-activity-builder, confidence-is-not-truth-explorer,
      access-tiers, evidence-wall, concept-bridges (index + six bridge pages)
- [x] Shim extended: `--shadow-sm` plus the semantic legacy tokens the fleet
      consumes (`--on-accent`, `--faint`, `--code-bg`, `--grid-line`, `--warm`
      → printed rust, `--teal` → printed green, tag palette `--t0…--t5` →
      modality tints) — audited so zero `var()` references resolve undefined
- [x] Verified: all 25 files render white/Archivo with the correct modality
      ink; all 9 self-test suites pass; Evidence Wall exercised end-to-end
      (Zoom paste → attributed tiles) in the new system

**Deferred to a polish pass:** unifying tool mastheads onto `.tool-mast` with
the numbered eyebrow ("Tool NN · Session N · Modality"). Headers across the 19
tools use heterogeneous markup (`tool-hero`, plain `header`, none) — they
restyle correctly through the token shim, so the unification is cosmetic and
safer done tool-by-tool than scripted.

### Phase 3 — Homepage ✅ 2026-06-10

- [x] Rebuilt `index.html` on `field.css` + `field-home.css` + `field-app.js`
      from the bundle's `Learning Machines.html` prototype
- [x] Preserved everything the old homepage did right: `tools-data.js` drives
      the ruled index (20 canonical tool links), counts fill at runtime
      (`data-tool-total` + live filter count), the equity line sits bold in
      the hero lede, and the tweaks panel stays gated behind `?tweaks=1`
      (re-pointed at tone/type/ink)
- [x] Carried over the full materials inventory (5 worksheets, 10 facilitation
      docs incl. the session link sheet, 3 prompt packs), correct session-row
      links, "3+ / 20 / 3 / 5" ledger, and the colophon credits
- [x] `field-app.js` fixes: no stamp for baseline "ready" status, "Studio"
      session label, stale-proof tool totals
- [x] Prototype bug fixed: the Fig. 02 pixel grid overflowed its fixed-height
      plate at narrow widths — capped at 360px / two rows so all three plates
      keep equal print rhythm
- [x] Verified: filters, search, counts, session links, zero failed requests,
      zero React/Babel on the participant path, tweaks panel works opt-in

### Phase 4 — Subpages ✅ 2026-06-10

- [x] Bundle exemplars installed with repo-correct links: `tool-tokenizer.html`
      (with the live iframe preview) and `docs-facilitation.html` (run-of-show
      synced with the prediction-game paste move)
- [x] 11 remaining tool landing pages script-transformed onto the tool-detail
      template (sec-rules, Fig. numbers, modality inks, preview frames)
- [x] Session pages: `session-text` and `session-images` rebuilt on the session
      template with current content (ix-row tool lists, updated run-of-shows,
      facilitator prompts); `session-video` and `session-showcase` are
      content-rich (538/673 lines) so they migrated via a documented **v1
      compat layer** appended to `field-sub.css` (tool-card / pathway markup
      rendered in the Field idiom) rather than lossy template surgery
- [x] Docs pages ×3 (sessions 2–4 facilitation) transformed; chips/stamps
      replace the v1 mono glyphs
- [x] Bespoke self-styled pages (vocab guide, no-AI pathway, link sheet,
      pre-session check-in, unplugged activity, 3 prompt packs) migrated via
      the token shim, keeping their own layouts
- [x] Fleet-wide audits: every class on every page styled, every internal
      link resolves, all 28 migrated pages verify white-tone/Archivo in-browser

**Deferred polish:** move `session-video` / `session-showcase` tool cards to
ix-rows and retire the v1 compat block in `field-sub.css`; `packs/_template.html`
(dev reference, not user-facing) still carries v1 markup.

### Phase 5 — Worksheets, packs, and adoption

- [ ] Worksheets + prompt packs migrate last (print styles need care)
- [ ] Flip canonical: update `docs/SHARED-CONTRACT.md` and
      `docs/DESIGN-SYSTEM.md` so Field tokens are the documented source of
      truth; retire `lm.css`/`theme.js` from served pages; archive v1 assets
- [ ] Full `docs/qa-checklist.md` pass across tones

## Coexistence during rollout

- Migrated pages use `html[data-tone/type/ink]` + `field-theme.js`
  (localStorage keys `lm-tone`, `lm-type`, `lm-ink`). Unmigrated pages keep
  `html[data-theme/font]` + `theme.js` (keys `lm-theme`, `lm-font`,
  `lm-hero`). The key namespaces don't collide, so a participant moving
  between migrated and unmigrated pages sees each system's own persisted
  choice — acceptable mid-rollout, resolved at Phase 5.
- `docs/SHARED-CONTRACT.md` §1 governs unmigrated pages; this document
  governs migrated ones. New tools should be built on Field directly.

## Open decisions

- **Default tone** — the handoff locked `white` as default (user's saved
  tweak). Confirm `white` vs `paper` before Phase 3 makes it the homepage face.
- **Phase 2 timing vs. camp dates** — migrating tools mid-cohort changes what
  participants see between Saturdays; either finish Phase 2 before Session 1
  or freeze until after the camp.
- **Hero treatment** — the bundle homepage replaces the animated token hero
  with three "Fig." plates with quiet diagram animations; decide whether any
  of the v1 hero survives.
