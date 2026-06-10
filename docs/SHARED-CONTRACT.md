# Learning Machines — Shared Contract

> **STATUS: COMPLETE — this is the live contract for all tool and page work.** Last updated 2026-06-09.
>
> Agents and contributors read this file to resolve "how do I…" questions.
> If something is not covered here, raise it before inventing a local answer.

---

## 1. Design token source of truth

**Canonical file:** `assets/lm.css`

Do **not** copy tokens from any individual tool's `<style>` block — those contain tool-specific overrides, not the canonical values.

### Required `<head>` block for every new page (tools at `tools/<slug>/` depth)

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600;9..40,700&family=IBM+Plex+Mono:wght@400;500;600&family=Instrument+Serif:ital@0;1&family=Hanken+Grotesk:wght@400;500;600;700;800&display=swap" rel="stylesheet">
<link rel="stylesheet" href="../../assets/lm.css">
<script src="../../assets/theme.js"></script>
```

Adjust depth: `../../` for `tools/<slug>/`, `worksheets/<slug>/`, and `packs/<name>/`; `../` for `docs/` and `pages/`.

### `<html>` attributes

```html
<html lang="en" data-theme="dark" data-font="lab">
```

`theme.js` overrides these from `localStorage` immediately on load. The attributes are the fallback.

### Key tokens

| Token | Purpose |
|---|---|
| `--bg` | Page background |
| `--surface` | Card / panel background |
| `--ink` | Primary text |
| `--ink-dim` | Secondary text |
| `--muted` | Subdued text / labels |
| `--accent` | Teal — primary action color |
| `--accent-2` | Purple — secondary accent |
| `--line` | Borders |
| `--font-display` | Space Grotesk (headings) |
| `--font-body` | DM Sans (body) |
| `--font-mono` | IBM Plex Mono (code / labels) |

### Rules for inline `<style>` in tools

- **Do NOT** override `--bg`, `--ink`, `--accent`, `--muted`, `--line` in your `:root{}`.
- **Do NOT** set `body { background: ...; color: ...; font-family: ... }` — `lm.css` handles this.
- **You may** define tool-specific tokens (e.g. `--grid-cell-size`, `--playback-accent`).

---

## 2. Standard nav chrome

### For `tools/<slug>/` and `worksheets/<slug>/` (depth `../../`)

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

### For `docs/` pages (depth `../`)

```html
<nav class="nav">
  <div class="wrap nav-inner">
    <a class="brand" href="../index.html"><span class="mark"></span>Learning Machines</a>
    <div class="nav-links">
      <a href="../index.html#tools" class="hide-sm">Tools</a>
      <a href="../index.html#sessions" class="hide-sm">Sessions</a>
      <a class="btn btn-ghost btn-sm nav-cta" href="../index.html">← Home</a>
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

Style with `lm.css` chip/button tokens (add `.pathway-picker` to `assets/sub.css`).
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

Style in the worksheet's own `<style>` block using `lm.css` tokens.

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
- RGB values over hex in teaching/p5 code (tool-chrome CSS still uses `lm.css` hex tokens)
- Comments explain the *why*, briefly — not just what the line does

---

## 7. Acceptance bar (every tool / page)

A task is **done** only when all of these pass:

- [ ] Zero console errors on load
- [ ] Zero network calls for core function (teaching-critical data is inline)
- [ ] Responsive at 360px, 768px, 1280px
- [ ] All controls keyboard-operable with visible focus states
- [ ] Alt text on all meaningful images
- [ ] Dark / paper / light themes render correctly (no hardcoded colors that clash with theme switching)
- [ ] `<html data-theme="dark" data-font="lab">` present
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
