# Learning Machines — Build Log

Phase-by-phase record of what was built and the key decisions made.

---

## Phase 0 — Original tools (pre-redesign)

Eleven single-file HTML interactive tools in `tools/*/index.html`. Each tool was self-contained with its own inline CSS using a warm cream/paper palette (`#f5f3ee` background, `#1a1a2e` text). No shared CSS; no common nav.

---

## Phase 1–7 — Visual redesign

*Full plan archived at `docs/archive/REDESIGN-PLAN.md`.*

Introduced `assets/` with a shared design system (`lm.css`, `home.css`, `sub.css`, `theme.js`, `hero.js`, `app.js`, `tools-data.js`, `tweaks-panel.jsx`). Key decisions:

- **Dark-first theme** with `data-theme="dark"` as the default. Three switchable themes (dark, paper, light) and three font pairings (lab, editorial, plain) persist in `localStorage`.
- **Homepage replaced** (`index.html`) with animated hero stage, tool browser with filter/search, session arc strip, and a floating Tweaks panel (React/Babel, no build step).
- **Tool pages wrapped** — each `tools/*/index.html` received the new nav chrome and `lm.css` link. Original interactive content unchanged.
- **Pages directory created** — `pages/session-text.html` and three tool detail pages (`pages/tool-tokenizer.html`, `pages/docs-facilitation.html`).

---

## A-1 — Legacy tool retheme (4 tools)

*Completed in session starting ~2026-06-04.*

Four tools had `data-theme="dark"` and linked `lm.css` but their inline `<style>` blocks declared hardcoded cream/light hex values that overrode the inherited dark vars.

**Tools rethemed:**

| Tool | Strategy |
|---|---|
| `eliza-simulator` | Replaced `:root{}` block — remapped local var names (`--cream`, `--card`, `--border`, `--text`) to dark theme vars. Additional targeted fixes for semantic color elements (notice, keyword-chip, weight-badge, reflection-who, compare-rule-tag). |
| `diffusion-step-through-viewer` | Replaced all hardcoded hex values with CSS vars directly. Semantic strips use rgba tints. |
| `feature-extraction-pixel-resolution` | Same approach. Semantic chips (info/recog) use rgba tints. |
| `temporal-telephone` | Same approach. Drawing canvas `background: #fffef9` intentionally preserved (functional white surface). |

**Key decision:** For tools that used their own CSS var layer (ELIZA), remapping the `:root{}` block was cleaner. For tools using raw hex throughout, direct substitution was used. An intermediate "append override block at end of `<style>`" approach was tried and later merged into the base rules.

---

## A-2 — Tool detail page copy improvements (11 pages)

*Completed in same session.*

Audited all 11 `pages/tool-*.html` files for generic copy. Three problem patterns found and fixed:

1. **Generic "Use it in context" doc-rows** — all 11 pages had identical or near-identical descriptions ("Activity and debrief", "Facilitation notes", "Worksheet"). Replaced with tool-specific descriptions naming the actual activity content.

2. **Abstract invest-card `eg` examples** — several pages had meta-descriptions instead of concrete data. Fixed pages: tokenizer, count-next-token, prediction-game. Examples now use token names, percentages, and specific observable data.

3. **Generic vis-card copy** — evidence-wall and access-tiers had vague or over-abstract vis-card text. Rewrote all three vis-cards for evidence-wall; rewrote vis-card 01 for access-tiers.

---

## A-3 / A-4 — Documentation and memory (current)

*In progress ~2026-06-05.*

Created:
- `docs/DESIGN-SYSTEM.md` — CSS vars, component classes, copy standards for future agent work
- `docs/BUILD-LOG.md` — this file
- Memory files at `~/.claude/projects/C--Users-mrkha-Documents-coding-learningmachines/memory/`

---

## AGENTS.md task plan — final status (verified 2026-06-10)

| Item | Status |
|---|---|
| A-T0: `docs/SHARED-CONTRACT.md` | Done — complete, live contract |
| A-T1: Pathway pickers + session pages 2–4 | Done — all four session pages exist |
| A-T2: Worksheet nav chrome + evidence footer | Done — all 5 worksheets |
| A-T3: Promote abc-board + model-card-builder | Done — both `status: "ready"` |
| A-T4: next-token-prediction-game build-out | Done — Zoom paste version with self-tests |
| A-T5: count-the-next-token new tool | Done |
| A-T6: human-as-model unplugged card | Done — `docs/unplugged-human-as-model.html` |
| B-T1: evidence-wall | Done — consent banner, URL-hash export |
| B-T2: pack viewer + 3 packs | Done — `packs/text`, `packs/images`, `packs/video` |
| B-T3: access-tiers | Done |
| B-T4: note-predictor (optional) | Skipped — not built |
| B-T5: frame-by-frame-coherence-viewer (optional) | Done |
| B-T6: pre-session-checkin | Done |

---

## Launch prep — 2026-06-10

Pre-camp hardening pass driven by an external review of the site against the
registered cohort:

- **Zoom parser fix** — both `parsePaste()` functions (Next-Token Prediction
  Game, Evidence Wall) now handle Zoom's real saved/copied chat format
  (`HH:MM:SS From Name to Everyone:` header + indented message), the older
  same-line variant, DMs, and multi-line messages, and skip reaction/reply
  metadata. Evidence Wall attributes messages to the name captured from the
  header. Self-tests extended with real-format fixtures.
- **Canonical tool links** — session pages and the catalog now link every tool
  directly at `tools/<slug>/`; landing pages remain the facilitator-context
  route. New `pages/session-links.html` lists each session's links in
  run-of-show order with per-session copy buttons.
- **Worksheet export** — shared `assets/worksheet-export.js` adds Copy-as-Markdown
  to all five worksheets; evidence-footer fields gained `data-key` so they now
  persist to localStorage (previously silently unsaved).
- **Homepage cleanup** — React/ReactDOM/Babel dev builds gated behind
  `?tweaks=1` (participants load zero of it); duplicate hero stat removed; tool
  counts fill from `tools-data.js` at runtime; universal "Launch ready" badge
  suppressed (only non-ready statuses render a badge); simulation-first equity
  claim moved into the hero lede.
- **Docs pass** — QA checklist updated to match (badge rule, fonts caveat, five
  missing tool entries, worksheet QA); session scripts now call for the
  prediction game in the Session 1 unplugged block and the Evidence Wall in
  debriefs and the showcase reflection; session docs link the interactive
  worksheets; SHARED-CONTRACT marked complete with current footer markup.

---

## Field Manual design language — Phase 1 — 2026-06-10

Second-generation design language from a Claude Design handoff ("Design
Language Refresh"): a **field manual / curriculum print** system — warm
paper/white tones, hairline rules, square corners, Newsreader/Archivo/IBM Plex
Mono, four modality inks as wayfinding — replacing the v1 dark "lab" theme
over a phased rollout. Full plan: `docs/FIELD-MANUAL-REDESIGN.md`.

Shipped in this phase:

- Six shared assets copied from the handoff bundle into `assets/`:
  `field.css` (core tokens + components), `field-tool.css` (drop-in shim that
  remaps legacy `lm.css` token names so tool internals restyle without a
  rewrite; migration recipe in its header), `field-theme.js` (tone/type/ink
  loader), plus `field-home.css`, `field-sub.css`, `field-app.js` staged for
  Phases 3–4.
- **Tokenizer + Temperature Visualizer migrated** as the worked example —
  the handoff's own scope. Head swap to Field assets and fonts, `data-mod="text"`
  modality ink, `--radius: 2px`, hardcoded blues/shadows/`#fff` removed
  (this clears the pre-redesign `:root` values AGENTS.md had flagged), Field
  nav chrome with repo-correct links, `.tool-mast` masthead + `.tool-notice`
  teaching-model disclosure.
- Verified in-browser: both tabs work, 7/7 self-tests pass, zero console
  errors, zero failed requests.

**Key decision:** the two systems coexist during rollout. Migrated pages key
off `data-tone/type/ink` (`field-theme.js`); unmigrated pages keep
`data-theme/font` (`theme.js`). Different localStorage namespaces, no
collisions. SHARED-CONTRACT governs unmigrated pages until Phase 5 flips the
canonical system.

---

## Field Manual design language — Phase 2 — 2026-06-10

**The whole tool fleet is now on Field Manual**: the remaining 19 tools plus
the six concept-bridge pages migrated in one scripted pass (25 files).

- Scripted per-file swaps: `data-tone/type/ink/mod` attributes (modality from
  `tools-data.js`; bridge pages carry their session's ink), Newsreader/Archivo/
  Plex Mono fonts, `field.css` + `field-tool.css` + `field-theme.js` links,
  Field nav chrome (Tool index · session link · Tool notes where a landing
  page exists), and literal `border-radius` values ≥3px squared to 2px while
  keeping functional pills and circles.
- The fleet was cleaner than expected: zero `:root` token overrides anywhere
  (the tokenizer had been the only violator) and box-shadows already rode
  `var(--shadow*)`, which the shim zeroes.
- **Shim extended** after a token audit found 15 legacy `lm.css` tokens the
  tools consume that `field.css` doesn't define: `--on-accent`, `--faint`,
  `--code-bg`, `--grid-line`, `--shadow-sm`, plus semantic colors remapped
  into the print palette (`--warm` → rust, `--teal/--teal-dim` → green,
  `--purple` → violet, tag palette `--t0…--t5` → modality tints). After the
  extension, zero `var()` references resolve undefined across the fleet.
- Verified in-browser: all 25 files render white-tone Archivo with the correct
  modality ink; all 9 self-test suites pass; Evidence Wall exercised
  end-to-end (real Zoom-format paste → tiles attributed by name) in the new
  system.
- Masthead unification (`.tool-mast` + numbered eyebrow) deferred to a
  tool-by-tool polish pass — headers use heterogeneous markup and already
  restyle correctly through the token shim.

---

## Field Manual design language — Phase 3 — 2026-06-10

**The homepage is now on Field Manual**, rebuilt from the handoff prototype
(`Learning Machines.html`) with all repo content carried over.

- Structure per the design: question hero with three "Fig." plates (sequential
  / spatial / spatiotemporal), ledger strip, § 01 session rows, § 02 ruled
  tool index with filters + search, § 03 method loop, § 04 pathways,
  § 05 materials, colophon.
- Preserved from the old homepage: `tools-data.js` drives the index (20
  canonical links), runtime counts (`data-tool-total` + live filter count),
  the simulation-first equity line bold in the hero lede, the full materials
  inventory (5 worksheets, 10 facilitation docs incl. the session link sheet,
  3 prompt packs), and the `?tweaks=1` gate for the React tweaks panel — now
  driving tone / type-voice / ink instead of theme / font / hero.
- `field-app.js` hardening: baseline "ready" tools render no stamp (only
  non-ready statuses do), `session: "studio"` labels as "Studio", and tool
  totals fill from data so they can't go stale.
- Prototype bug fixed: the Fig. 02 pixel grid (24 cells, fixed 96px plate)
  overflowed its caption at narrow widths — capped at 360px with two rows of
  eight so the three plates keep equal print rhythm at every width.
- Verified in-browser: filters (video → 3), search ("zoom" → 2), counts,
  session links, zero failed requests, zero React/Babel on the participant
  path, tweaks panel mounts and opens on the author path.
