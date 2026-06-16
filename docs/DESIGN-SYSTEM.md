---
layout: page
title: Learning Machines Design System
---

# Learning Machines — Design System Reference

> **Field Manual system (canonical as of 2026-06-10).** The full rollout
> record, migration recipe, and provenance live in
> `docs/FIELD-MANUAL-REDESIGN.md`. The v1 dark-lab system (`lm.css` and
> friends) is archived in `assets/archive/`; legacy token names still resolve
> through the `assets/field-tool.css` shim so old inline styles don't break.

Quick lookup for agents and contributors. The canonical source is `assets/field.css`.

---

## HTML conventions

Every page must have:

```html
<html lang="en" data-tone="white" data-type="signage" data-ink="full">
```

Tools and worksheets add `data-mod="text|image|video|cross"` for the modality
ink. `assets/field-theme.js` overrides tone/type/ink from `localStorage` on
load — always run it in `<head>`.

Route families also carry `data-skin` so the riskier campaign layer can follow
users from session pages into tool notes, tools, packs, worksheets, and docs.
The skin is intentionally separate from `data-mod`: modality says what the
content is about; skin says which visual world should frame it.

| `data-skin` | Use |
|---|---|
| `home-sampler` | Homepage and broad campaign index moments |
| `text-terminal` | Session 1 text, tokenization, ELIZA, text facilitation, text packs |
| `counting-signal` | Next-token counting, probability, pasted distributions |
| `image-spectrum` | Session 2 image/default/diffusion pages and tools |
| `latent-nebula` | Latent-space and compression mechanics |
| `video-slitscan` | Session 3 video, frame, drift, and temporal coherence pages |
| `studio-synthesis` | Session 4, evidence, model cards, comparison, cross-session studio tools |
| `docs-field` | Logistics, access, reading, reference, and quieter support pages |
| `worksheet-print` | Worksheets and print-first artifacts |

Every public HTML route should have exactly one `data-skin`. Markdown pages that
render through `_layouts/page.html` can remain quiet unless they need a custom
skin hook.

### Navigation contract

Every top navigation uses a stable pair first, then contextual links:

1. `Tool index` points to the homepage tool index.
2. `Sessions` points to the homepage sessions arc.
3. The third slot is the page-family home or context (`Method`, `Materials`,
   `Session 1`, `Tool notes`, etc.).
4. The final slot, when present, is the page action (`Launch tool`,
   `Register`, `Print`, `Back home`).

Use the exact labels `Tool index` and `Sessions`; avoid the shorter `Tools`
label in nav chrome.

---

## Tones (`html[data-tone]`)

| Token | paper | white (default) | slate |
|---|---|---|---|
| `--bg` | `#f2ebdc` | `#fcfcfa` | `#1a1b1e` |
| `--surface` | `#f9f4e7` | `#ffffff` | `#202125` |
| `--surface-2` | `#ece4d2` | `#f1f1ec` | `#28292e` |
| `--ink` | `#23201a` | `#191a1c` | `#e9e6dd` |
| `--ink-soft` | `#454034` | `#3c3e42` | `#c9c6bc` |
| `--muted` | `#6e6757` | `#67696e` | `#94917f` |
| `--rule` | `#cfc2a6` | `#d4d4cc` | `#45443d` |
| `--rule-soft` | `#ddd2ba` | `#e4e4dd` | `#34332e` |

## Modality inks

| Token | Hue | Used for |
|---|---|---|
| `--m-text` | printed blue | Session 1 / text tools |
| `--m-image` | printed rust | Session 2 / image tools |
| `--m-video` | printed green | Session 3 / video tools |
| `--m-cross` | printed violet | Cross-session & studio |

Each has a `-tint` variant for backgrounds. `html[data-ink="subtle"]`
collapses all four to ink. On tools, `--accent` derives from `data-mod`
via `field-tool.css`.

**Rules for the editorial shell** (nav, `.section`, `.plate`, `.ix-row`,
`.doc-row`, tool-detail `pages/tool-*.html`, docs, packs, the homepage):
- Do NOT override `--bg`, `--ink`, `--accent`, `--muted`, `--rule`/`--line` in `:root{}`.
- Do NOT set `body { background/color/font-family }` — `field.css` handles those.
- Square corners: `--radius: 2px`; no box-shadows (the shim zeroes `--shadow*`).
- You MAY define tool-specific tokens that don't clash (e.g. `--grid-cell-size`).

**Interactive tool canvas exception** (the self-contained apps under
`tools/<slug>/` and `tools/concept-bridges/<slug>/`):
A tool's working surface is its own canvas and MAY diverge from the square/flat
shell where the interaction calls for it. Specifically allowed:
- Rounded corners (commonly `8–10px` cards, `999px` pills/chips/tabs).
- Self-styling `body { background/color/font-family }` for a full-bleed app
  shell — but reach for `var(--font-body)` / token values rather than new
  hardcoded ones, so identity/tone switching still works.
- `box-shadow` for focus rings and depth cues (prefer `inset` focus indicators).
Keep the shared nav, footer, and any `.section`/`.plate`/`.ix-row` chrome on a
tool page square and token-driven — the exception covers the *app*, not the
site furniture around it.

**Worksheet print exception** (`worksheets/<slug>/`, `data-skin="worksheet-print"`):
Worksheets are print-first artifacts and MAY override `--bg`/`--ink`/`--accent`/
`--muted` in `:root{}` and restyle `body` to lock a paper-clean print surface
independent of screen tone. Keep on-screen identity restrained and print output
Field-clean.

**Documented tone exception:** `tools/latent-space-compressor/` intentionally
pins `data-tone="slate"` for its dark latent-space canvas.

---

## Type voices (`html[data-type]`)

| `data-type` | `--font-display` | `--font-body` | `--font-mono` |
|---|---|---|---|
| `field` | Newsreader 500 (serif) | Archivo | IBM Plex Mono |
| `signage` (default) | Archivo 700 | Archivo | IBM Plex Mono |

Google Fonts link (put in every `<head>`, before `field.css`):

```html
<link href="https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,400;0,6..72,500;0,6..72,600;1,6..72,400;1,6..72,500&family=Archivo:wght@400;500;600;700;800&family=IBM+Plex+Mono:wght@400;500;600&display=swap" rel="stylesheet">
```

---

## Stylesheet roles & asset depth

| File | Role |
|---|---|
| `assets/field.css` | Core: tokens, base, nav, buttons, stamps, plates, index rows, doc lists, footer |
| `assets/field-tool.css` | Tool/worksheet shim: legacy token map, modality accent, `.tool-mast`, `.tool-notice` |
| `assets/field-sub.css` | Subpage templates: session, tool-detail, docs (+ v1 compat block) |
| `assets/field-home.css` | Homepage: hero plates, ledger, catalog |
| `assets/field-theme.js` | Tone/type/ink loader (localStorage keys `lm-tone`, `lm-type`, `lm-ink`) |
| `assets/field-app.js` | Homepage tool index: rows, filters, search, counts |

| File location | Asset prefix | Home link |
|---|---|---|
| `tools/<slug>/`, `worksheets/<slug>/`, `packs/<name>/` | `../../assets/` | `../../index.html` |
| `tools/concept-bridges/<slug>/` | `../../../assets/` | `../../../index.html` |
| `pages/`, `docs/` | `../assets/` | `../index.html` |

---

## Key CSS classes

| Class | Purpose |
|---|---|
| `.wrap` | `min(1160px, 100% - 48px)` centered container |
| `.section` / `.section-tight` | Vertical rhythm |
| `.sec-rule` + `.sec-no` + `.sec-note` | Ruled § section heads |
| `.eyebrow` | Mono uppercase label |
| `.btn` / `.btn-primary` / `.btn-sm` | Mono uppercase buttons, square |
| `.stamp` (`.ready` `.draft` `.future`) | Bordered mono status stamps — ready is the baseline and renders **no** stamp on catalog rows |
| `.modsq` (`.text` `.image` `.video` `.cross`) | 9px modality squares |
| `.plate` + `.plate-cap` + `.plate-claim` | "Fig." figure plates |
| `.ix-row` (`.ix-no` `.ix-name` `.ix-blurb` `.ix-mod`) | Ruled index rows (catalog + session tool lists) |
| `.doc-row` / `.doc-list` / `.doc-cols` | Ruled document lists |
| `.sub-hero` + `.crumb` + `.sess-*` | Subpage heroes |
| `.throughline` / `.ros` / `.prompts` | Session-page patterns |
| `.vis-card` / `.invest-card` | Tool-detail "Fig." panels + investigation cards |
| `.tool-mast` / `.tool-notice` | Tool masthead + teaching-model disclosure |

---

## Copy standards (unchanged from v1)

### vis-card copy
Body text must describe what the tool screen literally shows — not what the
concept is in the abstract. Reference the specific UI element, count, label,
or visual pattern.

### invest-card `eg`
The `.eg` field must contain a concrete data example from the tool: a token
name with a percentage, a frame number with a failure category, a specific
prompt string. Not a meta-description.

### doc-row "Use it in context"
Each doc-row must name the specific activity content for that tool — not a
generic phrase that would apply to any tool on the site.

---

## Semantic colors

States ride the modality inks (mapped in `field-tool.css`): success/ok →
`--m-video` green, warm/warning → `--m-image` rust, cross-purpose accents →
`--m-cross` violet. Tag/chip palettes use the `-tint` variants. Avoid
introducing new hues for **semantic** purposes — the four inks carry meaning.

---

## Poster accent layer (atmospheric, non-semantic)

A decorative color/motion layer sampled from a compressed-GIF reference
palette (source material in the untracked `samples/` directory). It carries
**no meaning** — it is atmosphere behind heroes and mastheads; the four
modality inks remain the only semantic colors.

**Tokens** (`field.css`): sixteen `--poster-*` hues (sky, periwinkle, cyan,
mint, lime, acid, violet, lavender, orchid, hot-pink, coral, rose-clay, sun,
peach, green, muted-teal), plus tone-aware controls — `--poster-wash-opacity`
(paper 0.42 / white 0.34 / slate 0.24), `--poster-stroke-opacity`, and
`--poster-blend` (`multiply` on light tones, `screen` on slate).

**Classes**:

| Class | Effect | Where used |
|---|---|---|
| `.poster-wash` | Soft multi-radial color wash (`::before`) | Homepage hero + 4 session heroes |
| `.poster-register` | Faint registration strokes/rings (`::after`) | Same |
| `.poster-drift` | Slow drift animation on both layers | Same |
| `.poster-static` | Escape hatch — forces `animation: none` | As needed |

**Automatic quiet variants** (no classes needed): `.sub-hero:not(.poster-wash)`
gets a much fainter wash (0.11/0.07) on all other subpages
(`field-sub.css`); tool mastheads/shells get a soft top wash
(`field-tool.css`).

**Rules**: washes render in `::before`/`::after` at `z-index: 0` with content
lifted above — never put text in the pseudo-elements. All animation is
declared inside `@media (prefers-reduced-motion: no-preference)` and
force-disabled under `reduce` (and `print` for tools). Don't raise the
opacities — body text must stay AA-readable over the wash in every tone.

### Riskier campaign motifs

The campaign layer may use three sharper motifs from the 2026 poster study,
but they should stay controlled and sparse:

| Class | Purpose |
|---|---|
| `.risk-glitch` + `.is-live` | Dropped-keyframe title echo; use on one short phrase only |
| `.temperature-ladder` + `.temp-row` | Temperature/sampling ladder for Session 1 teaching moments |
| `.self-write-panel` + `.sw-*` | Compact token-by-token writing panel for campaign previews |

These classes live in `assets/field.css` and inherit Field Manual tokens.
They are identity/teaching motifs, not semantic state colors. All motion has
static reduced-motion fallbacks. Use them on campaign-facing pages, Session 1
temperature explanations, and the poster proofing page; avoid applying glitch
treatments to ordinary body text or navigation.

### Riskier expansion primitives

The first expansion pass is tracked in
[`docs/riskier-identity-audit.md`](riskier-identity-audit.html). It extends the
campaign identity into quieter lower-page sections and page families before
one-off page styling begins.

Reusable primitives:

| Class | Purpose |
|---|---|
| `.risk-section` | Lower-page section with stronger poster wash and registration shapes |
| `.risk-card` | Card/panel with controlled color wash, rule lines, and modality accent |
| `.risk-band` | Full-width or constrained color band for session/tool transitions |
| `.risk-grid` | Noisy pixel/grid field for image and data-default sections |
| `.risk-frame-strip` | Video-style frame sequence / onion-skin strip |
| `.risk-token-wall` | Text/tokenized phrase wall for text pages and prompt packs |
| `.risk-signal-panel` | Campaign panel for cross-session evidence, showcase, and tool index moments |

Implementation rules: inherit Field tokens, preserve square-corner discipline,
keep semantic color tied to modality inks, and declare any motion inside
`prefers-reduced-motion: no-preference` with complete static fallbacks.

### Site identities (user-selectable skins)

Implemented per [`docs/site-identity-switcher-plan.md`](site-identity-switcher-plan.html).
`assets/field-theme.js` persists `lm-identity` (`field` default · `terminal` ·
`spectrum` · `acid`), sets `html[data-identity]` before paint, injects
`assets/field-identity.css` plus the display fonts (VT323 / Rubik Glitch /
Anton) on every page, and renders the fixed "Look ▾" menu (suppress with
`data-no-identity-menu` on `<html>`).

Rules:

- Identity remaps the core tone/font tokens and a small set of shared
  components inside `@media screen`; print always renders the field manual.
  `worksheet-print` routes get restrained screen-only identity treatments so
  the Look menu visibly works while printable output stays clean.
- Identity beats tone; while non-field, the route `data-skin` accent layer
  and poster washes are muted (skin tokens re-map to identity tokens) so only
  one voice speaks.
- Identities restyle chrome and display type aggressively, body text
  conservatively. New components need either an identity treatment in
  `field-identity.css` or token-only styling (which inherits for free).

The shared P1 skin pass also styles common lower-page structures through
`html[data-skin]`: section rules, nav marks, `.ix-row`, `.doc-row`,
`.throughline`, `.ros-row`, `.prompt`, `.visible-grid`, `.invest-card`,
`.callout`, prose blocks, docs tables, prompt-pack cards, and migrated tool
panels/cards. Prefer these shared hooks before adding page-specific CSS.
Reference and print-first pages should stay restrained through `docs-field`
and `worksheet-print`; restrained does not mean unskinned on screen.

## Data-display layer — `assets/field-data.css` (core-adjacent)

Editorial data components shared across content/editorial pages. Built on the
core tokens; resolves `--accent` / `--m-*` per skin. **Load after
`field-sub.css`; never inside `tools/`.**

Components: `.fm-stats` (stat grid), `.fm-cardgrid`/`.fm-card` (accent-topped
cards; `[data-mod]` tints by modality), `.fm-ribbon` (proportional segment
bar), `.fm-bars` (labeled bars), `.fm-claim` (editorial callout; `--boxed`),
`.fm-rail`/`.fm-rail-row` (meta-rail timeline; per-row `--fm-accent`),
`.fm-legend`. Knobs: `--fm-cols`, `--fm-ribbon-h`, `--fm-rail-w`,
`--fm-bar-label`, `--fm-bar-val`.

**Conventions.** Encode categories with the modality inks via
`.fm-card[data-mod="text|image|video|cross"]`. A *sequence/narrative* palette
(e.g. build-story acts) is **data** — keep it in the page's data file
(`build-history.js` / `session-runs.js`) and apply inline via `--fm-accent`,
not in this CSS. Data pages follow: small JS data file → render viz into
`[data-*]` mount points (see `build-history.js`, `session-runs.js`).

**Exemplar:** `pages/build-story.html` is the kitchen-sink page.

**Migrated onto this layer (2026-06-14):** build-story, run-console,
this-saturday, colophon, vocabulary-field-guide, redesigns-index. Deliberate
keep-local exceptions where a component is one-off or stateful: build-story
swatches/commit-chart/footprint/lineage rail, run-console session-switcher &
launch UI, this-saturday `.ts-arc` node grid + focus card + countdown
typography, the colophon constraint table + method-loop SVG, and the vocab
glossary table + viz demos.
