---
layout: page
title: Site Identity Switcher Plan
---

# Site Identity Switcher Plan

Status: **implemented 2026-06-12; revised same day after review** — P0
plumbing, all three identities, and a 9-route × 3-identity mobile sweep
(0 overflow, 0 console errors) shipped in one pass. Review feedback folded
in: the menu-vs-tweaks-panel contradiction is resolved (one vanilla control
everywhere, React panel untouched), `data-skin` now mutes rather than zeroes
(modality cues survive via accent remap), and the font/stylesheet loading
decisions are recorded explicitly under P0. Remaining: the full 65-route
sweep per identity and AA contrast spot-checks (P4).
Date: 2026-06-12

Make the three bold poster skins — **EE terminal phosphor**, **FF spectrum
diffusion**, and **GG acid brutalist** — available as user-selectable,
site-wide identities, switchable from a simple menu on every page and
persistent across the whole visit. The Field Manual look stays the default;
the skins become opt-in ways the same site can speak.

Reference implementations: the three standalone demos
([terminal](../pages/tool-terminal.html) ·
[spectrum](../pages/doc-spectrum.html) ·
[acid](../pages/session-acid.html)) and the
[Subpages, Remixed](../pages/subpages-remixed.html) contact sheet.

## What already exists (and makes this cheap)

| Piece | Where | Why it matters |
|---|---|---|
| Theme loader | `assets/field-theme.js` | Already applies persisted `data-tone` / `data-type` / `data-ink` from `localStorage` onto `<html>` **before first paint**, on every page. The identity axis is the same mechanism. |
| Tweaks panel | `index.html` `#tweaks-root` | Existing user-facing menu dispatching `tweakchange` events the loader listens for. |
| Token discipline | `assets/field.css` | Every page styles itself through `--bg`, `--surface`, `--ink`, `--muted`, `--rule`, `--font-display/body/mono`. Re-mapping these tokens restyles all 65+ routes centrally. |
| Route skins | `html[data-skin]` | Per-route accent layer from the riskier identity pass. Orthogonal to identity: skin says what the page is about, identity says how the whole site dresses. |
| Skin demos | `pages/tool-terminal.html` etc. | Source of truth for each identity's tokens, motifs, and component treatments. |

## Architecture

**One new attribute, one new stylesheet, one new menu.**

1. **`html[data-identity="field" | "terminal" | "spectrum" | "acid"]`**
   - Persisted in `localStorage` as `lm-identity`, default `field`.
   - Applied in `assets/field-theme.js` alongside tone/type/ink (one-line
     extension of `KEYS`, `DEFAULTS`, and `apply()`), so there is no flash of
     unstyled identity.

2. **`assets/field-identity.css`** — loaded after `field.css` /
   `field-sub.css` / `field-tool.css` on every page. Three scoped blocks:
   - *Token remap*: each identity overrides the core tone tokens and font
     variables (e.g. terminal: `--bg:#070d09`, `--ink:#46ff7d`,
     `--font-display:"VT323"`; acid: `--bg:` acid yellow, display Anton,
     3px ink rules). Because the whole site reads tokens, this alone carries
     ~80% of the look.
   - *Component overrides*: the treatments tokens can't express — terminal
     scanline overlay (`body::before`), boot-log hero styling, spectrum
     sticker tags and wash, acid's hard borders/box-shadow buttons, square
     vs. pill stamps. Scoped per identity to the existing shared classes
     (`.nav`, `.sub-hero`, `.ix-row`, `.doc-row`, `.btn`, `.stamp`,
     `.prompt`, `.callout`, `.vis-card`, `.invest-card`, `.tool-mast`).
   - *Guard rails*, enforced both ways: every identity block lives inside
     `@media screen` so print always renders Field surfaces, **and**
     `html[data-skin="worksheet-print"]` is excluded from identity remaps so
     worksheet screen previews match their print output; reduced-motion
     disables scanline flicker, wash drift, and pulse animations (the demos
     already model these fallbacks).

3. **Identity menu** — vanilla JS (no React/Babel; the homepage tweaks panel
   predates that rule and should not be extended), rendered by
   `field-theme.js` itself so it appears on **every** page — including the
   homepage, where it lives outside and independent of the React tweaks
   panel. A small mono "Skin ▾" control that sets the identity and re-applies
   through the same code path as `tweakchange`. Suppress per-page with
   `data-no-identity-menu` on `<html>`.

### Interaction rules with existing axes

- **Identity beats tone.** `terminal` is inherently dark, `acid` inherently
  yellow; while a non-field identity is active, identity token remaps win the
  cascade over `data-tone`. The user's `lm-tone` stays untouched in
  `localStorage` and `data-tone` stays present on `<html>`, so returning to
  `field` restores their tone exactly.
- **Identity respects modality inks.** The four semantic inks stay; each
  identity may re-tint them (phosphor-compatible variants for terminal) but
  never collapses their meaning.
- **`data-skin` mutes — but is not erased — under non-field identities.**
  Skin surfaces, glow, and poster washes turn off so only one atmosphere
  speaks, but each skin family's `--skin-accent` remaps to its modality ink
  (text/counting → `--m-text`, image/latent → `--m-image`, video →
  `--m-video`, studio → `--m-cross`), so session semantics stay visible
  inside every identity.

## Per-identity scope of work

| Identity | Token remap | Hard parts beyond tokens |
|---|---|---|
| EE Terminal | Dark bg, phosphor ink, VT323 display, mono body accents | Scanline/vignette overlays; AA contrast for dim text (`rgba(70,255,125,.5)` fails on long copy — body text needs a brighter tier); image/diagram tools on dark ground; embedded iframes keep their own identity (accept, frame as "windows"). |
| FF Spectrum | Cream paper, plum ink, Newsreader-led body, Rubik Glitch display | Glitch font is display-only — headings under ~34px and all body stay legible faces; sticker/wash motifs only on heroes; tables get the dark-header zine treatment. |
| GG Acid | Acid bg, near-black ink, Anton display, 3px rules | Anton is caps-only — long headings need length guards; hot-pink on acid fails AA for small text (accent-only); dense tool UIs need a paper-surface inset (`--surface:#f4f1e6`) so controls stay readable. |

## Implementation phases

1. **P0 — plumbing (small, no visual change).** Extend `field-theme.js`
   (`lm-identity`, apply, menu injection). **Decision:** the loader injects
   the `field-identity.css` link itself, deriving the path from its own
   `script.src` — explicit per-page `<link>` tags were considered (simpler,
   less magical) but rejected because pages sit at three different depths and
   any future page would silently miss the feature; injection guarantees
   coverage everywhere `field-theme.js` already loads. **Fonts decision:** the
   loader also injects one Google Fonts link for VT323 / Rubik Glitch / Anton
   on every page unconditionally — these families are not in the shared
   per-page font URL, and browsers only download font binaries when a
   rendered element uses the family, so field-identity visitors pay one small
   CSS fetch and no font bytes, while identity switches render without a
   fallback flash.
2. **P1 — terminal identity.** Token remap + overlays + dark-ground audits of
   the image/video tools. Ship behind the menu; field stays default.
3. **P2 — spectrum identity.** Token remap + zine components. Mostly token
   work; lowest risk.
4. **P3 — acid identity.** Token remap + brutalist components + contrast
   passes.
5. **P4 — QA sweep.** Re-run the 65-route browser sweep per identity at
   mobile + desktop (the audit tooling from the P0/P1 skin passes applies
   directly): overflow, console errors, late H1, AA spot-checks, print
   output, reduced-motion completeness.

Rough effort: P0 is an afternoon; each identity is roughly the size of the
shared P1 skin pass (a focused day each, dominated by tool-app audits, not
CSS volume); P4 is automatable. The whole feature is tractable precisely
because the redesign centralized everything into tokens — no per-page work
except the QA fixes it surfaces.

## Risks and open questions

- **Readability is the feature's enemy.** The demos are heroes-first; body
  copy across 65 routes is the real test. Rule: identities restyle chrome and
  display type aggressively, body text conservatively.
- **Tool usability.** The acceptance bar stays "tool pages remain usable
  first" — every interactive control must stay visible and keyboard-operable
  under all four identities, or that tool pins itself to field surfaces.
- **Maintenance.** Every future component needs four looks, or a documented
  default ("inherits tokens, no identity overrides"). Add an identity section
  to `docs/DESIGN-SYSTEM.md` when P0 lands.
- **Open:** should identity persist per-device only (current localStorage
  model) or also be shareable via a `?identity=` URL param for facilitators
  projecting a session? Param support is ~5 lines in the loader if wanted.

## Acceptance criteria

- A first-time visitor sees the unchanged Field Manual site.
- The menu appears on every public route; choosing an identity restyles the
  current page instantly and every page thereafter, surviving reload.
- No flash of wrong identity on navigation.
- All 65 routes pass the sweep under all four identities (no overflow, no
  console errors, AA body contrast, complete reduced-motion states).
- Print output and worksheets always render the field identity.
- The three demo pages and the contact sheet remain as the canonical
  reference for how far each identity may be pushed.
