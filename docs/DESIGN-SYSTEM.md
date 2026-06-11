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

**Rules for tool inline styles:**
- Do NOT override `--bg`, `--ink`, `--accent`, `--muted`, `--rule`/`--line` in a tool's `:root{}`.
- Do NOT set `body { background/color/font-family }` — `field.css` handles those.
- Square corners: `--radius: 2px`; no box-shadows (the shim zeroes `--shadow*`).
- You MAY define tool-specific tokens that don't clash (e.g. `--grid-cell-size`).

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
