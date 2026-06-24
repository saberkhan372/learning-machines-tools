# Learning Machines — Agent Build Plan

> **STATUS: EXECUTED (historical).** Every task in this plan shipped except the
> optional note-predictor (B-T4, skipped) — final status table in
> `docs/BUILD-LOG.md`. The two-agent workflow it describes is kept as a record
> of how the site was built.
>
> **For current work, the live references are:**
> - `docs/SHARED-CONTRACT.md` — design tokens, nav chrome, multiplayer patterns, acceptance bar
> - `docs/DESIGN-SYSTEM.md` — CSS variables, component classes, copy standards
> - `docs/qa-checklist.md` — pre-publish QA run-through
>
> The conventions in §1–§2 below remain accurate; task tickets (§3–§9) are done.

**Based on:** `learning-machines-DESIGN.md` (the original task specification, not kept in this repo)
**Reconciled with:** completed redesign (`assets/lm.css` design system, Phase 1–7)

**Agent A = Claude Code (Integrator)** — touches existing files, aggregators, session pages
**Agent B = Codex (Builder)** — greenfield new tools only, never edits aggregator files

---

## 0. What is already done (do not redo)

The visual redesign is complete and verified:

| What | Where |
|---|---|
| Shared design system | `assets/lm.css`, `assets/home.css`, `assets/sub.css` |
| Theme loader (runs in `<head>`) | `assets/theme.js` |
| Hero animation | `assets/hero.js` |
| Tool browser + scroll reveal | `assets/app.js` |
| Tool catalog data | `assets/tools-data.js` |
| Tweaks panel (React) | `assets/tweaks-panel.jsx` |
| Homepage | `index.html` |
| Session 1 page | `pages/session-text.html` |
| Tokenizer tool detail page | `pages/tool-tokenizer.html` |
| Facilitation doc page | `pages/docs-facilitation.html` |
| Nav chrome on all 20 tools | `tools/*/index.html` (lm.css + theme.js linked, new nav) |

---

## 1. Design system — OVERRIDE to §3.1 of the spec

> **The canonical token source is `assets/lm.css`, not the tokenizer tool.**

The spec's §3.1 was written before the redesign. Ignore its instruction to copy tokens from `tools/tokenizer-temperature-visualizer/index.html`. That file's `:root` block contains **old values** that conflict with `lm.css`.

### Correct token source

```html
<!-- Every new tool's <head>, before any inline <style> -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600;9..40,700&family=IBM+Plex+Mono:wght@400;500;600&family=Instrument+Serif:ital@0;1&family=Hanken+Grotesk:wght@400;500;600;700;800&display=swap" rel="stylesheet">
<link rel="stylesheet" href="../../assets/lm.css">
<script src="../../assets/theme.js"></script>
```

The `../ ` depth is `../../` for anything at `tools/<slug>/` or `worksheets/<slug>/`. For `docs/` files it is `../`.

### Token quick-reference (lm.css)

| Token | Dark value | Paper value | Light value |
|---|---|---|---|
| `--bg` | `#0e0f13` | `#f3ecdd` | `#ffffff` |
| `--surface` | `#16181f` | `#fffaf1` | `#ffffff` |
| `--ink` | `#e8e6df` | `#20201d` | `#111418` |
| `--accent` | `#5eead4` (teal) | `#0f766e` | `#0d9488` |
| `--accent-2` | `#c084fc` (purple) | `#7c3aed` | `#7c3aed` |
| `--muted` | `#9197a3` | `#6f675b` | `#5b6573` |
| `--line` | `#2a2e39` | `#ddd0bb` | `#e4e7ec` |
| `--font-display` | Space Grotesk 600 | same | same |
| `--font-body` | DM Sans | same | same |
| `--font-mono` | IBM Plex Mono | same | same |

### New tool inline style rules

- **Do NOT** override `--bg`, `--ink`, `--accent`, `--muted`, `--line` in your tool's `:root{}`. Use them as-is from `lm.css`.
- **You may** define tool-specific tokens for internal UI (e.g. `--grid-cell-size`, `--playback-accent`).
- **Do NOT** set `body { background: ... }` or `body { color: ... }`. `lm.css` handles that and it must switch with the theme.
- **Do NOT** re-declare font families. Use `var(--font-body)`, `var(--font-mono)`, `var(--font-display)`.

### Standard nav chrome (copy verbatim into every new tool)

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
<!-- tool content starts here -->
```

For `docs/` pages the depth is `../` not `../../`.

---

## 2. Shared Contract (A-T0)

**Agent A creates `docs/SHARED-CONTRACT.md` before any parallel work begins.**

The contract is a single authoritative reference file. It must contain:

1. **Token source** — points to `assets/lm.css` as above; the old tokenizer `:root` is NOT the source.
2. **Nav chrome** — the exact snippet above for `tools/` and `docs/` depths.
3. **Pathway picker markup** (§3.3 of spec — copy verbatim):
   ```html
   <nav class="pathway-picker" aria-label="Choose your pathway">
     <a href="#use">Use</a>
     <a href="#observe">Observe / Critique</a>
     <a href="#teach">Teach / Design</a>
     <a href="#build">Build / Code</a>
     <a href="#critical">Critical / No-AI</a>
   </nav>
   ```
   Style: five equal-weight pill links. Use `lm.css` chip/button tokens. Critical/No-AI is **not** visually secondary.
4. **Worksheet evidence footer markup** (§3.4 of spec — copy verbatim):
   ```html
   <footer class="evidence-footer">
     <label>Human decision <textarea></textarea></label>
     <label>System factors <textarea></textarea></label>
     <label>Ethical concern <textarea></textarea></label>
     <label>Classroom adaptation <textarea></textarea></label>
   </footer>
   ```
5. **Multiplayer patterns** — paste-aggregation (default) and URL-hash state (see spec §3.5). Firebase and websockets are **never** allowed.
6. **Teaching-facing code style** — `let` not `var`; `if/else` not ternary; RGB over hex in teaching/p5 code; comments explain the *why* (spec §3.6).
7. **Acceptance bar** — zero console errors, zero network calls for core function, responsive at 360/768/1280, keyboard-operable, passes `docs/qa-checklist.md` (renders as `docs/qa-checklist.html` on GitHub Pages — spec §3.7).
8. **Integration queue** — Agent B appends entries to `docs/INTEGRATION-QUEUE.md` (the file is created by Agent A as part of A-T0 with an empty template); Agent A reads it and wires new paths into `index.html` and READMEs only. Agent B never edits `index.html` or `README.md`.

**Done when:** both agents can open this one file and answer "what token do I use?", "what does the nav look like?", "how do I do multiplayer?", "what does done mean?"

**Blocks all other tasks.**

---

## 3. Work partition (file ownership)

> **Core rule: one file = one owner per pass. Agent B never edits aggregator files.**

| Track | Owner | Files |
|---|---|---|
| Shared contract | **A** | `docs/SHARED-CONTRACT.md` |
| Homepage + README | **A** | `index.html`, `README.md`, `tools/README.md` |
| Build roadmap / QA checklist | **A** | `docs/build-roadmap.md`, `docs/qa-checklist.md` |
| Jekyll layouts + config | **A** | `_layouts/*`, `_config.yml` |
| Session pages (HTML) | **A** | `pages/session-text.html` + create `pages/session-images.html`, `pages/session-video.html`, `pages/session-showcase.html` |
| Docs pages (A-owned) | **A** | `docs/unplugged-human-as-model.html` |
| Pre-session check-in | **B** | `docs/pre-session-checkin.html` (new — greenfield, no aggregator edits) |
| Worksheet nav + footer | **A** | all 5 `worksheets/*/index.html` |
| Promote drafts | **A** | `tools/abc-comparison-board/index.html`, `tools/model-card-builder/index.html` |
| Text cluster tools | **A** | `tools/next-token-prediction-game/index.html`, `tools/count-the-next-token/index.html` (new) |
| Evidence wall | **B** | `tools/evidence-wall/index.html` (new) |
| Pack viewer + 3 packs | **B** | `packs/text/index.html`, `packs/images/index.html`, `packs/video/index.html` + `packs/_template.html` |
| Access tiers | **B** | `tools/access-tiers/index.html` (new) |
| Note predictor (optional) | **B** | `tools/note-predictor/index.html` (new) |
| Frame-by-frame viewer (optional) | **B** | `tools/frame-by-frame-coherence-viewer/index.html` (existing stub, build out) |
| Integration queue | **B reports, A wires** | `docs/INTEGRATION-QUEUE.md` |

**Branching:** one feature branch per task (`feat/shared-contract`, `feat/evidence-wall`, etc.). PRs per branch. Agent A reviews and merges B's PRs. Agents never push to the same branch.

---

## 4. Sequencing

```
Step 0  →  A ships SHARED-CONTRACT.md. B waits.

Wave 1  →  A: A-T1 (session pages + pathway pickers)
           A: A-T2 (worksheet nav + footer)
           A: A-T3 (promote abc-board + model-card-builder)
           B: B-T1 (evidence-wall) ← highest priority
           B: B-T6 (pre-session-checkin)   [greenfield, no conflict]

Wave 2  →  A: A-T4 (next-token-prediction-game build-out)
           A: A-T5 (count-the-next-token, new tool)
           A: A-T6 (human-as-model card)
           B: B-T2 (pack viewer + 3 packs)
           B: B-T3 (access-tiers)

Wave 3  →  B: B-T4 (note-predictor, optional)
           B: B-T5 (frame-by-frame, optional)

Final   →  A runs integration wiring (§6 of spec)
           A full QA pass
```

---

## 5. Task tickets — Agent A

### A-T0 · Shared Contract *(blocks everything)*

**File:** `docs/SHARED-CONTRACT.md` (create)
**Done when:** contains all 8 items listed in §2 above; both agents can resolve any "how do I…" question from it without looking elsewhere.

---

### A-T1 · Pathway pickers + session pages

**Files touched:**
- `pages/session-text.html` — add pathway picker + anchor IDs to existing activity sections
- `pages/session-images.html` — CREATE (follows same structure as `session-text.html`; content from `docs/session-2-*.md`)
- `pages/session-video.html` — CREATE (follows same structure; content from `docs/session-3-*.md`)
- `pages/session-showcase.html` — CREATE (Optional Showcase)
- `index.html` — update session arc links from `pages/session-text.html` to correct pages for sessions 2–4

**Picker spec:** 5 equal-weight pill buttons anchoring to `#use`, `#observe`, `#teach`, `#build`, `#critical` sections on the same page. Use `lm.css` chip/button tokens. Style in `assets/sub.css` (add `.pathway-picker` rule there).

**Done when:** each session page shows all five pathways; each pill jumps to its track; Critical/No-AI is visually equal weight to "Use"; sessions 2–4 pages exist and are linked from the homepage arc.

---

### A-T2 · Worksheet nav chrome + evidence footer

**Files:** all 5 `worksheets/*/index.html`
- `worksheets/ai-use-consent-checklist/index.html`
- `worksheets/text-experiment-board/index.html`
- `worksheets/image-default-test-board/index.html`
- `worksheets/video-test-report/index.html`
- `worksheets/model-investigation-journal/index.html`

**Changes per file:**
1. Add `data-theme="dark" data-font="lab"` to `<html>` tag
2. In `<head>`, add before existing `<style>`: Google Fonts link, `../../assets/lm.css` link, `../../assets/theme.js` script
3. Add standard nav chrome (from §1 of this doc, depth `../../`) at top of `<body>`
4. Add the evidence footer at bottom of `<body>` (exact markup from §2 of this doc)
5. **Do not** change any existing worksheet content, styles, or logic

**Done when:** all 5 worksheets show the nav bar matching the rest of the site; each has the 4-field evidence footer; `model-investigation-journal` footer is byte-identical to the other four (it has a similar section already — unify, don't duplicate).

---

### A-T3 · Promote abc-comparison-board + model-card-builder

**Files:**
- `tools/abc-comparison-board/index.html`
- `tools/model-card-builder/index.html`

**Changes:**
1. Keep both tools inheriting core color, type, line, and shadow tokens from `lm.css`. Tool-specific semantic colors are fine when they do not override global tokens.
2. Keep page backgrounds on shared tokens such as `var(--bg)`, `var(--surface)`, and `var(--surface-2)`.
3. Fix any input/textarea/button base styles that hardcode `#fffdf8` — replace with `var(--surface)` and `var(--ink)`.
4. Update any in-tool nonlaunch status labels to "Launch ready" (match `lm.css` `.status.ready` chip pattern).
5. Run acceptance bar: zero console errors, responsive 360/768/1280, keyboard-operable.

**Also update:**
- `assets/tools-data.js` — make sure both tools use `status: "ready"` and `statusLabel: "Launch ready"`.

**Done when:** both tools render correctly in dark/paper/light themes; status chips on the homepage show "Launch ready"; acceptance bar passes.

---

### A-T4 · next-token-prediction-game (build out existing stub)

**File:** `tools/next-token-prediction-game/index.html`

**What to build:**
- Textarea that accepts a pasted Zoom-chat block of "next word guesses" (one guess per line, or chat-log format)
- Parser that tallies the guess distribution
- Side-by-side render: participant guesses (bar chart or word cloud) vs. a small precomputed model top-k for the same prompt
- 4–6 precomputed prompts built into the page (no network call)
- Paste-aggregation pattern (§3.5 / SHARED-CONTRACT)

**Pairs with:** `tools/tokenizer-temperature-visualizer/` in Session 1.

**Teaching code style:** `let` not `var`, `if/else` not ternary, RGB in teaching sections, comments explain *why*.

**Done when:** paste → distribution renders; zero network calls; works offline; responsive; keyboard-operable.

---

### A-T5 · count-the-next-token (new tool)

**File:** `tools/count-the-next-token/index.html` (create new directory)

**What to build:**
- Built-in tiny corpus (50–100 sentences, inline JS array — no network call)
- UI: user picks a context word/phrase; tool shows the bigram/frequency table for that context
- Step-by-step arithmetic panel: count → divide → probability → prediction
- The count→probability path must be fully visible — this answers "is the model doing math / counting?"
- Temperature control optional but encouraged

**Teaching code style enforced** (spec §3.6).

**Done when:** full count→probability→prediction chain visible in UI; zero network calls; responsive; keyboard-operable; passes acceptance bar.

---

### A-T6 · human-as-model unplugged card

**File:** `docs/unplugged-human-as-model.html` (create)

**What to build:** a printable/readable activity card (not interactive tool). Sections:
- Roles (model, prompter, evaluator)
- Step-by-step instructions for running the role-play on a Zoom call
- Debrief prompts
- Tagged: Critical/No-AI + Teach/Design

Use the docs page layout (`assets/sub.css` `.docs-layout`, `.prose`, `.callout`). Depth = `../` for asset paths.

**Done when:** runnable from the page alone on a Zoom call; no software needed; linked from `pages/session-text.html` Low-AI section.

---

## 6. Task tickets — Agent B

> **Before starting any task:** confirm `docs/SHARED-CONTRACT.md` exists. If it doesn't, stop and message Agent A.
>
> **After completing any task:** add an entry to `docs/INTEGRATION-QUEUE.md`:
> ```
> ## <tool-name>
> - Path: tools/<slug>/index.html
> - Session: <1|2|3|4|cross>
> - Modality: <text|image|video|cross>
> - Nav snippet: <exact `<a>` tag to add to the session page or index>
> - tools-data.js entry: <full JS object to paste>
> ```

---

### B-T1 · evidence-wall *(highest priority)*

**File:** `tools/evidence-wall/index.html` (create new directory)

**What to build:**
- Paste-aggregation textarea: facilitator pastes a block of submissions (text lines, image URLs, or links)
- Parser tiles them into a responsive CSS grid (min 200px columns)
- Each tile: content display + one-line caption textarea
- URL-hash export: serialize wall state to `location.hash`; loading a link with that hash reproduces the wall
- Consent reminder: visible in-tool note that pasted participant work needs affirmative share consent before public display

**Use cases:** breakout group regroup AND Optional Showcase.

**Multiplayer pattern:** paste-aggregation + URL-hash state (both, per spec §3.5).

**lm.css integration:** use `--surface`, `--line`, `--ink`, `--accent`; nav chrome at `../../` depth.

**Done when:** paste → grid renders; URL-hash export reproduces wall on reload; consent reminder visible; no backend; responsive 360/768/1280; keyboard-operable; passes acceptance bar.

---

### B-T2 · pack-viewer template + 3 packs

**Files:**
- `packs/_template.html` (shared template)
- `packs/text/index.html`
- `packs/images/index.html`
- `packs/video/index.html`

**Note on location:** packs live at top-level `packs/` (not nested under session docs). Each pack page is at depth `packs/<name>/index.html` — **two levels** from repo root, so asset depth is `../../assets/` and the nav home link is `../../index.html`.

**What to build (template):**
- Header: pack title, session tag, brief framing
- Example cards: each has prompt log, annotations (observed default / revision), empty space for participant notes
- Video pack adds: frame-strip thumbnails (static images), `.vtt` captions div (display only), transcript accordion
- Image pack: alt text on every image
- All frozen/static — no live generation

**Content scope:** 3–4 prompt families per pack minimum. Text and images should be content-complete (use placeholder copy where Saber hasn't supplied final media, clearly marked `<!-- PLACEHOLDER -->`). Video may ship with more placeholders.

**lm.css integration:** asset depth `../../assets/`; nav links back to `../../index.html`.

**Done when:** all three pack pages render using the same template; image/video accessibility passes; no live network calls for content; responsive; linked from INTEGRATION-QUEUE.

---

### B-T3 · access-tiers

**File:** `tools/access-tiers/index.html` (create new directory)

**What to build:**
- Same task/prompt shown at three tiers side-by-side:
  - Frontier paid (GPT-4o / Claude Sonnet)
  - Free-tier (GPT-3.5 / smaller models)
  - Unplugged / local (no AI)
- For each tier: what you can do, what's lost, who's excluded
- "Exclusion panel" that is editable and printable (simple textareas + print CSS)
- Pairs with `model-card-builder`

**lm.css integration:** standard nav at `../../`; use `lm.css` tokens throughout.

**Done when:** three tiers comparable side-by-side; exclusion panel editable and print-friendly; zero network calls; responsive; keyboard-operable.

---

### B-T4 · note-predictor *(optional — Wave 3)*

**File:** `tools/note-predictor/index.html` (create new directory)

**What to build:**
- Step-sequencer: user builds a short note sequence (8–12 steps)
- Tiny Markov chain trained on a built-in corpus of note sequences (inline data, no network)
- "Next note" prediction displayed with probability bars (mirrors the token probability UI)
- Temperature/randomness control that changes prediction behavior
- Web Audio API (no library) — graceful degradation if audio is blocked

**Done when:** sequence plays; prediction visible; temperature changes behavior; works offline; no library required.

---

### B-T5 · frame-by-frame-coherence-viewer *(optional — Wave 3)*

**File:** `tools/frame-by-frame-coherence-viewer/index.html` (existing stub — build out)

**What to build:**
- Step through a set of sample frames (bundled as base64 data URIs or inline SVGs — no network)
- Consecutive-frame overlay: blend two frames with opacity slider to highlight drift
- Frame diff panel: show what changed between frame N and N+1
- Label panel: user can tag a frame with a failure mode (drift / physics break / identity shift / camera inconsistency)
- Optional: file upload for user's own frame sequence

**Done when:** frame stepping + overlay works offline on sample frames; upload optional but present; no live generation; responsive.

---

### B-T6 · pre-session-checkin *(Wave 1, greenfield)*

**File:** `docs/pre-session-checkin.html` (create)

**What to build:** static reference page presenting the full pre-session intake question set:
- Pathway preference (which of the 5 paths?)
- Device type
- Account access (which AI tools?)
- Filters / bandwidth considerations
- Caption / transcript needs
- Transfer audience (who are you designing for?)
- Fourth-session interest

This is a reference mirror — the live form lives in Google Forms. This page is for facilitators to review or adapt. Use the docs layout (`assets/sub.css`). Depth = `../`.

**Done when:** full question set presented cleanly; no form submission; printable; linked from INTEGRATION-QUEUE.

---

## 7. Integration wiring (Agent A — final pass)

Run only after all Wave 1–3 PRs are merged.

1. **`assets/tools-data.js`** — add entries for all B-built tools (`evidence-wall`, `access-tiers`, `note-predictor`, `frame-by-frame`); update `count-the-next-token` as new entry; confirm `abc-comparison-board` and `model-card-builder` show `status: "ready"`.

2. **`index.html`** — add packs row near Worksheets/Docs section; add evidence-wall link to Optional Showcase area; add pre-session-checkin link in the docs strip. The tool grid updates automatically from `tools-data.js`.

3. **`pages/session-text.html`** — add link to `count-the-next-token` and `evidence-wall` in the tools section; add link to `docs/unplugged-human-as-model.html` in the Low-AI pathway callout.

4. **`pages/session-video.html`** — add link to `frame-by-frame-coherence-viewer` (once built).

5. **`pages/session-showcase.html`** — add link to `evidence-wall` as the primary Optional Showcase aggregation tool.

6. **`README.md`** — reclassify `abc-comparison-board` + `model-card-builder` as launch-supported; register new tools with status tags.

7. **Full QA pass** — open every new/changed page at 360px / 768px / 1280px; check dark + paper + light themes; verify zero console errors; run `docs/qa-checklist.md` criteria.

8. **Consent check** — confirm `evidence-wall` shows the affirmative-consent reminder; confirm no participant data is persisted server-side (there is no server).

---

## 8. Acceptance bar (every task — quick reference)

From SHARED-CONTRACT (spec §3.7):

- [ ] Zero console errors on load
- [ ] Zero network calls for core function (all teaching-critical data is inline)
- [ ] Responsive: usable at 360px, 768px, 1280px
- [ ] Keyboard-operable: all controls reachable and activatable by keyboard
- [ ] Visible focus states on interactive elements
- [ ] Alt text on all meaningful images
- [ ] Dark / paper / light themes all render correctly (lm.css tokens used, no hardcoded colors that clash)
- [ ] `<html>` has `data-theme="dark" data-font="lab"` (theme.js will override from localStorage)
- [ ] Nav chrome present and links resolve
- [ ] Passes `docs/qa-checklist.md` (source); viewed as `docs/qa-checklist.html` on GitHub Pages

---

## 9. Open decisions (resolve before the gated task starts)

| Decision | Gates |
|---|---|
| Optional Showcase confirmed vs. demand-contingent | priority of `session-showcase.html` / evidence-wall showcase wiring |
| Build both optional tools (note-predictor, frame-by-frame) or just access-tiers? | B-T4, B-T5 |
| Pack depth — how many prompt families per pack? (floor = 3) | B-T2 content scope |
| Saber supplies pack media — which format / how handed off? | B-T2 image + video content |
| `count-the-next-token` — new directory or merge into `next-token-prediction-game`? | A-T5 (assumed: new directory, separate tool) |
