---
layout: page
title: Learning Machines Shared Contract
---

# Learning Machines — Shared Contract

> **STATUS: COMPLETE — this is the live contract for all tool and page work.** Last updated 2026-06-10.
>
> Agents and contributors read this file to resolve "how do I…" questions.
> If something is not covered here, raise it before inventing a local answer.

---

## 1. Design token source of truth

> **Field Manual (2026-06-10): the rollout is complete.** Every served page is
> on the Field system; the v1 assets (`lm.css`, `theme.js`, `home.css`,
> `sub.css`, `app.js`, `hero.js`) are archived in `assets/archive/`. Rollout
> record: `docs/FIELD-MANUAL-REDESIGN.md`.

**Canonical file:** `assets/field.css` (+ `assets/field-tool.css` shim for
tools/worksheets, `assets/field-sub.css` for subpages,
`assets/field-home.css` for the homepage)

Do **not** copy tokens from any individual tool's `<style>` block — those contain tool-specific overrides, not the canonical values.

### Required `<head>` block for every new page (tools at `tools/<slug>/` depth)

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,400;0,6..72,500;0,6..72,600;1,6..72,400;1,6..72,500&family=Archivo:wght@400;500;600;700;800&family=IBM+Plex+Mono:wght@400;500;600&display=swap" rel="stylesheet">
<link rel="stylesheet" href="../../assets/field.css">
<link rel="stylesheet" href="../../assets/field-tool.css">
<script src="../../assets/field-theme.js"></script>
```

Adjust depth: `../../` for `tools/<slug>/`, `worksheets/<slug>/`, and `packs/<name>/`; `../` for `docs/` and `pages/`.

### `<html>` attributes

```html
<html lang="en" data-tone="white" data-type="signage" data-ink="full"
      data-mod="text|image|video|cross">
```

`data-mod` sets the tool's modality ink (text blue · image rust · video green ·
cross violet). `field-theme.js` overrides tone/type/ink from `localStorage`
immediately on load; the attributes are the fallback.

### Key tokens

| Token | Purpose |
|---|---|
| `--bg` | Page background (tone-aware: paper / white / slate) |
| `--surface` | Card / panel background |
| `--ink` | Primary text |
| `--ink-soft` | Secondary text |
| `--muted` | Subdued text / labels |
| `--rule` / `--rule-soft` | Hairline borders |
| `--accent` | Modality ink, derived from `data-mod` (via field-tool.css) |
| `--m-text` / `--m-image` / `--m-video` / `--m-cross` | Modality inks + `-tint` variants |
| `--font-display` | Newsreader serif (field voice) / Archivo (signage, default) |
| `--font-body` | Archivo |
| `--font-mono` | IBM Plex Mono (specimen labels) |

Legacy `lm.css` token names (`--line`, `--ink-dim`, `--warm`, `--teal`,
`--t0…--t5`, …) keep resolving through the `field-tool.css` shim, so older
inline styles don't break — but new code should use the Field names.

### Rules for inline `<style>` in tools

- **Do NOT** override `--bg`, `--ink`, `--accent`, `--muted`, `--line` in your `:root{}`.
- **Do NOT** set `body { background: ...; color: ...; font-family: ... }` — `field.css` handles this.
- **You may** define tool-specific tokens (e.g. `--grid-cell-size`, `--playback-accent`).

---

## 2. Standard nav chrome

### For `tools/<slug>/` and `worksheets/<slug>/` (depth `../../`)

```html
<nav class="nav">
  <div class="wrap nav-inner">
    <a class="brand" href="../../index.html"><span class="mark"></span>Learning Machines</a>
    <div class="nav-links">
      <a href="../../index.html#tools" class="hide-sm">Tool index</a>
      <a href="../../pages/session-text.html" class="hide-sm">Session 1</a>
      <a class="btn btn-sm" href="../../pages/tool-<slug>.html">Tool notes</a>
    </div>
  </div>
</nav>
```

Point the middle link at the tool's session page; include the "Tool notes"
button only when a landing page exists in `pages/`.

### For `docs/` pages (depth `../`)

```html
<nav class="nav">
  <div class="wrap nav-inner">
    <a class="brand" href="../index.html"><span class="mark"></span>Learning Machines</a>
    <div class="nav-links">
      <a href="../index.html#tools" class="hide-sm">Tool index</a>
      <a href="../index.html#sessions" class="hide-sm">Sessions</a>
      <a class="btn btn-sm" href="../index.html">Back home</a>
    </div>
  </div>
</nav>
```

### For `packs/<name>/` pages (depth `../../`)

Same as `tools/<slug>/` above — two levels deep.

---

## 3. Pathway picker

Add to all session pages. Five options, equal visual weight. Critical/No-AI is **not** secondary.

```html
<nav class="pathway-picker" aria-label="Choose your pathway">
  <a href="#use">Use</a>
  <a href="#observe">Observe / Critique</a>
  <a href="#teach">Teach / Design</a>
  <a href="#build">Build / Code</a>
  <a href="#critical">Critical / No-AI</a>
</nav>
```

Style with the `.pathway-picker` rules in `assets/field-sub.css`.
Each `href` must anchor to a matching section with `id="use"`, `id="observe"`, etc., on the same page.

---

## 4. Worksheet evidence footer

Add to all 5 `worksheets/*/index.html` pages. Must be byte-identical across all five.
The `data-key` attributes make the fields persist through each worksheet's existing
`[data-key]` localStorage save logic and appear in the Markdown export.

```html
<footer class="evidence-footer">
  <label>Human decision <textarea data-key="ev-human" aria-label="Evidence footer human decision"></textarea></label>
  <label>System factors <textarea data-key="ev-system" aria-label="Evidence footer system factors"></textarea></label>
  <label>Ethical concern <textarea data-key="ev-ethics" aria-label="Evidence footer ethical concern"></textarea></label>
  <label>Classroom adaptation <textarea data-key="ev-classroom" aria-label="Evidence footer classroom adaptation"></textarea></label>
</footer>
```

Style in the worksheet's own `<style>` block using Field tokens.

Every worksheet also links the shared export script before `</body>`:

```html
<script src="../../assets/worksheet-export.js"></script>
```

It injects a "Copy as Markdown" button into the `.controls` row and exports all
`[data-key]` fields (textareas, checkboxes, radios) plus the evidence footer.

---

## 5. Multiplayer patterns (no backend)

Two approved patterns. Pick one per tool and state it in-tool.

**Paste-aggregation (default):**
Facilitator collects submissions (from Zoom chat, etc.), pastes the block into a `<textarea>`, tool parses and renders. Good for synchronous sessions.

**URL-hash state:**
Tool serializes state to `location.hash`. Sharing the URL reproduces the view. Good for async / time-zone gaps.

**Never allowed:** Firebase, websockets, any server, `fetch()` for core function, `localStorage` as a cross-participant sync mechanism.

---

## 6. Teaching-facing code style

Applies to any code shown to or executed for learners (tool internals, not tool chrome):

- `let` over `var`
- `if/else` blocks, **no ternaries**
- RGB values over hex in teaching/p5 code (tool-chrome CSS uses Field tokens)
- Comments explain the *why*, briefly — not just what the line does

---

## 7. Acceptance bar (every tool / page)

A task is **done** only when all of these pass:

- [ ] Zero console errors on load
- [ ] Zero network calls for core function (teaching-critical data is inline)
- [ ] Responsive at 360px, 768px, 1280px
- [ ] All controls keyboard-operable with visible focus states
- [ ] Alt text on all meaningful images
- [ ] Paper / white / slate tones render correctly (no hardcoded colors that clash with tone switching)
- [ ] `<html data-tone="white" data-type="signage" data-ink="full">` present (+ `data-mod` on tools)
- [ ] Nav chrome present and all links resolve
- [ ] Passes `docs/qa-checklist.md` (rendered as `docs/qa-checklist.html` on GitHub Pages)

---

## 8. Integration queue

Agent B **never** edits `index.html`, `README.md`, or `tools/README.md`.

After completing any task, Agent B appends an entry to `docs/INTEGRATION-QUEUE.md`:

```markdown
## <tool-name>

- **Path:** tools/<slug>/index.html  (or docs/ or packs/)
- **Session:** <1 | 2 | 3 | 4 | cross>
- **Modality:** <text | image | video | cross>
- **tools-data.js entry:**
  ```js
  { name: "...", session: "...", modality: "...", status: "ready", statusLabel: "Launch ready",
    blurb: "...", tags: ["..."], href: "tools/<slug>/" }
  ```
- **Session page link:** `<a href="../tools/<slug>/">Tool Name</a>` — add to `pages/session-X.html` section Y
- **index.html note:** <any special wiring needed, or "none">
```

Agent A reads the queue and wires entries during the final integration pass (§6 of AGENTS.md).
