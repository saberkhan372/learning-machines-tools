# Learning Machines — Design System Reference

Quick lookup for agents and contributors. The canonical source is `assets/lm.css`.

---

## HTML conventions

Every page (tools, pages, worksheets) must have:

```html
<html lang="en" data-theme="dark" data-font="lab">
```

`assets/theme.js` overrides these from `localStorage` on load — always run it in `<head>`.

---

## Dark theme CSS custom properties

Defined in `assets/lm.css` under `:root, html[data-theme="dark"]`.

| Token | Dark | Paper | Light |
|---|---|---|---|
| `--bg` | `#0e0f13` | `#f3ecdd` | `#ffffff` |
| `--bg-2` | `#121319` | `#f7f0e3` | `#f9fafb` |
| `--surface` | `#16181f` | `#fffaf1` | `#ffffff` |
| `--surface-2` | `#1c1f28` | `#f5edde` | `#f3f4f6` |
| `--line` | `#2a2e39` | `#ddd0bb` | `#e4e7ec` |
| `--line-soft` | `#21242d` | `#e8dccc` | `#eef0f3` |
| `--ink` | `#e8e6df` | `#20201d` | `#111418` |
| `--ink-dim` | `#c6c5bd` | `#3a3830` | `#3a3d45` |
| `--muted` | `#9197a3` | `#6f675b` | `#5b6573` |
| `--accent` | `#5eead4` | `#0f766e` | `#0d9488` |
| `--accent-2` | `#c084fc` | `#7c3aed` | `#7c3aed` |

**Rules for tool inline styles:**
- Do NOT override `--bg`, `--ink`, `--accent`, `--muted`, or `--line` in a tool's `:root{}`.
- Do NOT set `body { background: ... }` or `body { color: ... }` — `lm.css` handles those.
- Do NOT re-declare font families. Use `var(--font-display)`, `var(--font-body)`, `var(--font-mono)`.
- You MAY define tool-specific tokens that don't clash (e.g. `--grid-cell-size`).

---

## Font pairings

| `data-font` | `--font-display` | `--font-body` | `--font-mono` |
|---|---|---|---|
| `lab` (default) | Space Grotesk 600 | DM Sans | IBM Plex Mono |
| `editorial` | Instrument Serif 400 | DM Sans | IBM Plex Mono |
| `plain` | Hanken Grotesk 700 | Hanken Grotesk | IBM Plex Mono |

Google Fonts link (put in every `<head>`, before `lm.css`):

```html
<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600;9..40,700&family=IBM+Plex+Mono:wght@400;500;600&family=Instrument+Serif:ital@0;1&family=Hanken+Grotesk:wght@400;500;600;700;800&display=swap" rel="stylesheet">
```

---

## Asset depth by file location

| File location | Asset path prefix | Home link |
|---|---|---|
| `tools/<slug>/index.html` | `../../assets/` | `../../index.html` |
| `worksheets/<slug>/index.html` | `../../assets/` | `../../index.html` |
| `pages/*.html` | `../assets/` | `../index.html` |
| `docs/*.html` | `../assets/` | `../index.html` |

---

## Standard nav chrome

For `tools/` and `worksheets/` (depth `../../`):

```html
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
```

---

## Key CSS classes (lm.css + sub.css)

| Class | Purpose |
|---|---|
| `.wrap` | `min(1200px, 100%-48px)` centered container |
| `.section` | `clamp(48px,8vw,96px)` vertical padding |
| `.section-tight` | Smaller vertical padding |
| `.reveal` → `.reveal.in` | Scroll-reveal (JS adds `.in`) |
| `.btn.btn-primary` | Teal filled button |
| `.btn.btn-ghost` | Bordered ghost button |
| `.btn.btn-sm` | Small variant |
| `.card` | Surface + border + 16px border-radius |
| `.chip` | Mono label pill |
| `.status.ready` | Green dot + "Launch ready" chip |
| `.status.draft` | Legacy warm-dot nonlaunch chip |
| `.status.future` | Legacy faint-dot roadmap chip |
| `.eyebrow` | Mono uppercase label with leading rule |
| `.mono` | IBM Plex Mono font class |
| `.tok.c0`–`.tok.c5` | 6-color rotating token chips |

---

## Tool detail page structure (pages/tool-*.html)

Sections in order:

1. `<nav class="nav">` — site nav
2. `<header class="sub-hero">` — `.crumb` + `.tool-hero-grid` (hero + iframe preview)
3. Section A `.section-tight` — `.visible-grid` of `.vis-card` — "What it makes visible" (3 cards)
4. Section B `.section` — `.invest` of `.invest-card` — "How to investigate it" (4 cards)
5. Section C `.section-tight` — `.prompts` of `.prompt` — "Debrief questions" (4 items)
6. `.section-tight` — `.doc-cols` with two `.doc-group` / `.doc-list` / `.doc-row` groups
7. `.section-tight` — `.pager` (prev/next)
8. `<footer class="footer">`

### vis-card copy standard
Body text must describe what the tool screen literally shows — not what the concept is in the abstract. Reference the specific UI element, count, label, or visual pattern.

### invest-card `eg` standard
The `.eg` field must contain a concrete data example from the tool: a token name with a percentage, a frame number with a failure category, a specific prompt string. Not a meta-description.

### doc-row "Use it in context" standard
Each of the three doc-rows (session, facilitation, worksheet) must name the specific activity content for that tool — not a generic phrase that would apply to any tool on the site.

---

## Semantic color tints for dark mode

Do not use `var(--surface)` for cards that need to communicate a semantic category (error, warning, info). Use rgba tints:

| Category | Background | Text color |
|---|---|---|
| Red / error | `rgba(220,38,38,0.12)` | `#fca5a5` |
| Amber / warning | `rgba(245,158,11,0.12)` | `#fcd34d` |
| Blue / info | `rgba(37,99,235,0.12)` | `#93c5fd` |
| Green / success | `rgba(22,163,74,0.12)` | `#6ee7b7` |
| Purple | `rgba(124,58,237,0.12)` | `#c4b5fd` |
