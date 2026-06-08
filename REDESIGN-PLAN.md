# Learning Machines Redesign — Implementation Plan

> **For:** Claude Code / Codex agents executing this redesign
> **Design source:** `https://api.anthropic.com/v1/design/h/7xHPbVrz4h3k_Cld_PHTRQ` (extracted to the design bundle at `C:\Users\mrkha\.claude\projects\C--Users-mrkha-Documents-coding-learningmachines\7f4cf85d-c29a-4df4-a11b-3a37df5b78f5\design-bundle\learning-machines\project\`)
> **Target repo:** `C:\Users\mrkha\Documents\coding\learningmachines\learning-machines-tools\`

---

## What the design is

A full visual redesign of the Learning Machines site — homepage + subpages. The design moves from a static warm-paper look to a **dark "lab" theme** with teal/purple accents, animated hero, scroll-reveal, and a shared CSS design system. Three switchable themes (dark, paper, light) and three font pairings (Lab, Serif, Plain) persist via `localStorage`. A floating Tweaks panel (React) lets users switch at will.

**Design principle preserved from the original:** *every tool makes something invisible visible.*

---

## File structure to create

All new shared assets go into a new `assets/` folder at the repo root. Do NOT put them inside `tools/`.

```
learning-machines-tools/
├── index.html                  ← REPLACE (new homepage)
├── assets/                     ← CREATE (new folder)
│   ├── lm.css                  ← CREATE (shared design system)
│   ├── home.css                ← CREATE (homepage-specific styles)
│   ├── sub.css                 ← CREATE (subpage-specific styles)
│   ├── theme.js                ← CREATE (theme loader, runs in <head>)
│   ├── hero.js                 ← CREATE (animated hero stage)
│   ├── app.js                  ← CREATE (tool browser, scroll reveal)
│   ├── tools-data.js           ← CREATE (tool catalog data)
│   └── tweaks-panel.jsx        ← CREATE (React tweaks panel component)
├── pages/                      ← CREATE (new folder)
│   ├── session-text.html       ← CREATE (Session 1 page)
│   ├── tool-tokenizer.html     ← CREATE (Tokenizer tool detail page)
│   └── docs-facilitation.html ← CREATE (Session 1 facilitation doc)
└── tools/                      ← EXISTING — wrap with new nav chrome
    └── */index.html            ← UPDATE nav + add lm.css link (see Phase 4)
```

---

## Implementation phases

### Phase 1 — Copy asset files verbatim

Copy the following files **exactly as-is** from the design bundle into `assets/`. Do not modify them — they are complete.

| Source path (design bundle) | Destination |
|---|---|
| `assets/lm.css` | `assets/lm.css` |
| `assets/home.css` | `assets/home.css` |
| `assets/sub.css` | `assets/sub.css` |
| `assets/theme.js` | `assets/theme.js` |
| `assets/hero.js` | `assets/hero.js` |
| `assets/app.js` | `assets/app.js` |
| `assets/tools-data.js` | `assets/tools-data.js` |
| `assets/tweaks-panel.jsx` | `assets/tweaks-panel.jsx` |

**Design bundle base path:**
```
C:\Users\mrkha\.claude\projects\C--Users-mrkha-Documents-coding-learningmachines\7f4cf85d-c29a-4df4-a11b-3a37df5b78f5\design-bundle\learning-machines\project\
```

---

### Phase 2 — Replace `index.html` (homepage)

Replace the current `index.html` with the new homepage. Copy from the design bundle's `Learning Machines.html`, but **fix all relative paths** so they work from the repo root:

| Path in design bundle | Corrected path for repo |
|---|---|
| `assets/lm.css` | `assets/lm.css` ✓ |
| `assets/home.css` | `assets/home.css` ✓ |
| `assets/theme.js` | `assets/theme.js` ✓ |
| `assets/tools-data.js` | `assets/tools-data.js` ✓ |
| `assets/hero.js` | `assets/hero.js` ✓ |
| `assets/app.js?v=4` | `assets/app.js?v=4` ✓ |
| `assets/tweaks-panel.jsx` | `assets/tweaks-panel.jsx` ✓ |
| `Learning Machines.html` (brand link) | `index.html` |
| `pages/session-text.html` | `pages/session-text.html` ✓ |
| `tools/concept-bridges/` | `tools/concept-bridges/` ✓ |
| Worksheet hrefs (`worksheets/...`) | `worksheets/...` ✓ |
| Docs hrefs (`docs/...`) | `docs/...` (these are `.md` files — see note) |
| `pages/docs-facilitation.html` | `pages/docs-facilitation.html` ✓ |

**Note on `docs/` links:** The existing repo uses `.md` files in `docs/`. The design links to `.html` versions (e.g. `docs/pilot-checklist.html`). For now, point these to the `.md` files or leave the href as-is — the docs pages are out of scope for this redesign sprint. Add `<!-- TODO: create docs HTML page -->` inline comments.

**TWEAK_DEFAULTS:** In the inline `<script type="text/babel">` block near the bottom of `index.html`, the `TWEAK_DEFAULTS.theme` is `"light"` in the design bundle. Change this to `"dark"` to match the intended dark-first default (the `html` element has `data-theme="dark"` and the intent is dark by default).

```js
const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "theme": "dark",   // ← change from "light" to "dark"
  "font": "lab",
  "hero": "tokens"
}/*EDITMODE-END*/;
```

---

### Phase 3 — Create subpages in `pages/`

Create the `pages/` directory and copy the three subpages, fixing their relative paths (one level deeper than root → prefix with `../`).

#### `pages/session-text.html`

Copy from `pages/session-text.html` in the design bundle. All paths already use `../` prefix correctly except:

- Brand link: `../Learning Machines.html` → `../index.html`
- Nav links: `../Learning Machines.html#tools` → `../index.html#tools`, etc.
- All `../tools/`, `../worksheets/`, `../assets/` paths ✓ (already correct relative to `pages/`)

#### `pages/tool-tokenizer.html`

Copy from `pages/tool-tokenizer.html` in the design bundle. Same path fixes:

- `../Learning Machines.html` → `../index.html`
- The "Launch the tool" button href `../tools/tokenizer-temperature-visualizer/` ✓

#### `pages/docs-facilitation.html`

Copy from `pages/docs-facilitation.html` in the design bundle. Same fixes:

- `../Learning Machines.html` → `../index.html`

---

### Phase 4 — Update `tools-data.js` hrefs

The `tools-data.js` in the design bundle uses relative hrefs like `pages/tool-tokenizer.html` and `tools/eliza-simulator/`. These are relative to `index.html` in the repo root — **they are already correct**. No changes needed.

Verify the 15 tool entries match the actual directories in `tools/`. All 15 are already present:
- `tools/tokenizer-temperature-visualizer/` ✓
- `tools/eliza-simulator/` ✓
- `tools/diffusion-step-through-viewer/` ✓
- `tools/feature-extraction-pixel-resolution/` ✓
- `tools/temporal-telephone/` ✓
- `tools/default-test-comparison-viewer/` ✓
- `tools/video-failure-gallery-viewer/` ✓
- `tools/abc-comparison-board/` ✓
- `tools/model-card-builder/` ✓
- `tools/concept-bridges/` ✓
- `tools/next-token-prediction-game/` ✓
- `tools/prompt-guidance-word-by-word/` ✓
- `tools/latent-space-explorer/` ✓
- `tools/dataset-balance-simulator/` ✓
- `tools/frame-by-frame-coherence-viewer/` ✓

---

### Phase 5 — Wrap existing tools with new nav chrome

Each file in `tools/*/index.html` currently has its own inline `<style>` block and nav. We need to add the new shared nav and CSS link **without breaking the tool's interactive content**.

**For each `tools/*/index.html`:**

1. In `<head>`, add these lines **before** any existing `<style>` tag:

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600;9..40,700&family=IBM+Plex+Mono:wght@400;500;600&family=Instrument+Serif:ital@0;1&family=Hanken+Grotesk:wght@400;500;600;700;800&display=swap" rel="stylesheet">
<link rel="stylesheet" href="../../assets/lm.css">
<script src="../../assets/theme.js"></script>
```

2. Replace the existing `<body>` open tag (or wherever the current nav starts) with this nav block, then the rest of the original body content:

```html
<body>
  <nav class="nav">
    <div class="wrap nav-inner">
      <a class="brand" href="../../index.html"><span class="mark"></span>Learning Machines</a>
      <div class="nav-links">
        <a href="../../index.html#tools" class="hide-sm">Tools</a>
        <a href="../../index.html#sessions" class="hide-sm">Sessions</a>
        <a class="btn btn-ghost btn-sm nav-cta" href="../../index.html">← All tools</a>
      </div>
    </div>
  </nav>
  <!-- original tool content continues here -->
```

3. **Do NOT** remove the existing `<style>` blocks — the tools have their own visual styles for their interactive content. The `lm.css` variables will cascade in and the nav will look consistent; the tool body will use its own styles.

4. Update `html` tag to include theme attributes so `theme.js` works:

```html
<html lang="en" data-theme="dark" data-font="lab">
```

**Priority order** (do launch-ready tools first):
1. `tools/tokenizer-temperature-visualizer/index.html`
2. `tools/eliza-simulator/index.html`
3. `tools/diffusion-step-through-viewer/index.html`
4. `tools/feature-extraction-pixel-resolution/index.html`
5. `tools/temporal-telephone/index.html`
6. All remaining tools

---

### Phase 6 — Update `_config.yml`

The Jekyll config currently has `baseurl: /learning-machines-tools`. This is correct. No change needed.

However, verify the `index.html` does NOT start with YAML front matter (`---`). The new homepage is pure HTML and should not have Jekyll front matter.

---

### Phase 7 — Smoke test checklist

After implementation, verify:

- [ ] `index.html` loads and shows the dark lab theme by default
- [ ] The hero stage animates (tokens → probability bars appear in sequence)
- [ ] Theme switcher (Tweaks panel) appears when triggered and persists across page reloads
- [ ] Tool browser filters work (All / Text / Images / Video / Cross-session)
- [ ] Tool browser search filters the grid
- [ ] Session arc cards link to `pages/session-text.html`
- [ ] `pages/session-text.html` renders and links back home
- [ ] `pages/tool-tokenizer.html` renders and the "Launch the tool" button links to the actual tool
- [ ] `pages/docs-facilitation.html` renders with the docs layout (sticky TOC sidebar)
- [ ] An existing tool (e.g. `tools/tokenizer-temperature-visualizer/`) shows the new nav bar
- [ ] `prefers-reduced-motion` disables animations (check in browser dev tools)
- [ ] Mobile breakpoints: stats strip goes 2×2, tool grid goes 1-col, nav hides links

---

## Design system reference (quick lookup)

### Theme tokens (dark default)

| Token | Value |
|---|---|
| `--bg` | `#0e0f13` |
| `--surface` | `#16181f` |
| `--ink` | `#e8e6df` |
| `--accent` (teal) | `#5eead4` |
| `--accent-2` (purple) | `#c084fc` |
| `--muted` | `#9197a3` |

### Font pairings

| `data-font` | Display | Body | Mono |
|---|---|---|---|
| `lab` (default) | Space Grotesk 600 | DM Sans | IBM Plex Mono |
| `editorial` | Instrument Serif 400 | DM Sans | IBM Plex Mono |
| `plain` | Hanken Grotesk 700 | Hanken Grotesk | IBM Plex Mono |

### Key CSS classes

| Class | Purpose |
|---|---|
| `.wrap` | `min(1200px, 100%-48px)` centered container |
| `.section` | `clamp(48px, 8vw, 96px)` vertical padding |
| `.reveal` | Scroll-reveal — starts `opacity:0; translateY(14px)`, gets `.in` via JS |
| `.btn.btn-primary` | Teal filled button |
| `.btn.btn-ghost` | Bordered ghost button |
| `.card` | Surface + border + border-radius:16px |
| `.chip` | Mono label pill |
| `.status.ready` | Green dot + "Launch ready" |
| `.status.draft` | Legacy warm-dot nonlaunch chip |
| `.status.future` | Legacy faint-dot roadmap chip |
| `.tok.c0`–`.tok.c5` | Colored token chips (6-color rotating palette) |
| `.mono` | IBM Plex Mono font class |
| `.eyebrow` | Mono uppercase label with leading line |

### Hero concepts (`data-hero` attribute on `<html>`)

| Value | What it shows |
|---|---|
| `tokens` | Text → tokens → next-token probability bars (default) |
| `pixels` | Canvas: image degrades from 2×2 blocks to sharp |
| `question` | "What is the machine actually doing?" fades in word-by-word |

---

## What NOT to change

- **Tool interactive content:** The `<style>` blocks and JS inside each `tools/*/index.html` implement the actual educational tools. Do not rewrite them — only wrap with the new nav chrome.
- **`worksheets/`:** These have their own styled pages. Phase 5 nav-wrapping is optional stretch work; do not touch worksheet content.
- **`_layouts/`:** Jekyll layout files. Leave as-is.
- **`docs/*.md`:** Facilitation markdown files. Leave as-is; the HTML versions in `pages/` replace them for browser use.
- **`_config.yml`:** Leave as-is.

---

## Stretch goals (do after the core phases)

1. **Worksheet nav-wrapping** — same Phase 5 treatment for `worksheets/*/index.html`
2. **Sessions 2–4 pages** — `pages/session-images.html`, `pages/session-video.html`, `pages/session-showcase.html` (follow the same pattern as `session-text.html`)
3. **Tool detail pages for remaining launch-ready tools** — `pages/tool-eliza.html`, `pages/tool-diffusion.html`, `pages/tool-pixels.html`, `pages/tool-temporal.html`
4. **Docs pages** — `pages/docs-pilot-checklist.html`, `pages/docs-project-brief.html` following the docs layout in `sub.css`
5. **Active nav highlighting** — small JS to `.classList.add("active")` on nav links matching `location.pathname`
6. **TOC scroll spy** — for docs pages, update `.toc a.active` as the user scrolls through sections
