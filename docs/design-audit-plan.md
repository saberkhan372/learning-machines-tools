---
layout: page
title: Design / Display / Text / Layout Audit Plan
---

# Design / Display / Text / Layout Audit Plan

Status: **approved plan**
Date: 2026-06-15

This is the **qualitative** pass: it measures every page against the
[Design System Reference](DESIGN-SYSTEM.html) for consistency and craft. It is
distinct from, and does not repeat, the
[All Pages Audit](all-pages-audit-report-2026-06-15.html), which already cleared
correctness (loads, console, links, overflow, nav contract, footers, front
matter, headings — 0 blockers). That pass explicitly deferred "later polish";
this pass is that polish, done systematically.

## Coverage model

**Systematic-all + deep-sample.**

- **Systematic (all ~97 routes):** automated source sweeps for every lens —
  token/colour drift, inline-style rule violations, skin/modality/type presence,
  asset depth, copy-pattern heuristics, tool-name agreement.
- **Deep (representative sample):** hands-on visual + editorial review of one
  page per family at three widths and across identities.

Route families: `index.html`, `pages/*.html` (55), `tools/*/index.html` (25),
`tools/concept-bridges/*/index.html` (6), `packs/*/index.html` (3),
`worksheets/*/index.html` (5), `docs/*.html` (2) + `docs/*.md` (36).

Frozen design-lab demos (`pages/tool-terminal.html`, `pages/doc-spectrum.html`,
`pages/session-acid.html`) are reviewed as references, not held to consistency
rules.

## Deliverable

**Report first, then fix on approval.** This pass produces the findings report
and a batched fix queue. Fixes are applied in a later pass, in batches the owner
approves — matching the prior plan → report → fix-pass rhythm.

## The four lenses

### 1. Design — system fidelity

- Correct `data-tone` / `data-type` / `data-ink` / `data-mod` / `data-skin` per
  family, cross-checked against the skin table.
- No hardcoded hex/rgb where a token exists.
- Tool inline-style rules honoured: no overriding `--bg` / `--ink` / `--accent`
  / `--muted` / `--rule`; no `body { background/color/font-family }`;
  `--radius: 2px`; no box-shadows.
- Modality ink used semantically; no new hues for semantic purposes.
- Field Manual assets, not archived v1 (`assets/archive/*`); correct `../` asset
  depth per file location.
- Shared components (`.btn`, `.stamp`, `.eyebrow`, `.ix-row`, `.plate`,
  `.sec-rule`) reused vs bespoke reimplementations.

### 2. Display — how it renders

- Visual hierarchy: clear h1 → h2 → body; eyebrow / `§` section-rule rhythm.
- Body-text contrast over skins, washes, identity effects, and `-tint`
  backgrounds (spot WCAG-style checks on representative text).
- Identity modes (Field, Terminal, Spectrum, Acid) + slate tone + reduced-motion
  + projection: readable, skins do not fight content.
- Responsive reflow **quality** at 390 / 768 / 1280 — cramped grids, orphaned
  headings, awkward wraps, not just overflow (overflow is already clean).
- Figures/images: meaningful `alt`, placeholders marked, no layout shift.

### 3. Text — editorial

- Voice consistency: the demystifying-auditor voice. Flag pages still in the
  older voice.
- Copy standards from the Design System:
  - vis-card body describes what the tool screen literally shows.
  - invest-card `.eg` is a concrete data example (token + %, frame + failure).
  - doc-row "use it in context" names the specific activity, not a generic line.
- Lede length / mobile scannability; jargon links to the Vocabulary Field Guide
  on first contact.
- Heading clarity, casing consistency, terminology consistency; tool names agree
  across `tools-data.js`, catalog, tool-detail, and the tool app.
- Typos, grammar, dead/placeholder copy; no redundant "ready" language.
- Consent / public-sharing language explicit where relevant.

### 4. Layout — spatial

- Vertical rhythm via `.section` / `.section-tight` clamps; no ad-hoc margins.
- Container discipline (`.wrap` ≤ 1160); consistent gutters and alignment.
- Grid consistency (`throughline`, `prompts`, `tile-grid`, `card-grid`,
  `bridge-grid`) and graceful reflow.
- Figure/plate placement and caption alignment.
- White-space balance: not cramped, not sparse.

## Method

**Phase A — Systematic source sweeps (all routes).** Scripted grep/AST-light
checks for: hardcoded colours vs tokens, tool inline-style violations, presence
and correctness of `data-*` attributes and `data-skin`, asset-prefix depth,
archived-asset references, copy-pattern heuristics (vis-card / `.eg` / doc-row),
and tool-name agreement against `assets/tools-data.js`.

**Phase B — Visual review (deep sample).** Preview server. Representative set:
homepage; one page per session; one Tier-1 tool per modality; one cross/studio
tool; one worksheet; one prompt pack; one long doc; one concept-bridge; the
poster/design page. Each at 390 / 768 / 1280, in Field + one alt identity +
slate tone + reduced-motion. Screenshots + computed-style contrast spot-checks.

**Phase C — Editorial read-through.** The participant path read cold, plus
copy-standard checks on tool-detail pages.

## Classification

Every finding is tagged by **type** and **severity**.

| Type | Meaning |
|---|---|
| System drift | Diverges from a documented token / component / contract |
| Readability | Contrast, hierarchy, or reflow harms reading |
| Editorial | Voice, copy-standard, jargon, or clarity issue |
| Polish | Refinement that improves craft but breaks no rule |

| Severity | Meaning |
|---|---|
| High | Breaks readability or system integrity on a real route |
| Med | Visible inconsistency / editorial weakness, secondary pages |
| Low | Refinement |

## Outputs

- `docs/design-audit-plan.md` — this plan.
- `docs/design-audit-report-2026-06-15.md` — findings table per lens, each
  tagged type × severity, plus a fix queue grouped by CSS layer / page family so
  repairs batch cleanly.

## Out of scope

- Re-running technical/contract checks (done in the prior audit).
- New features, tools, identities, or packs (second-wave).
- Holding frozen design-lab demos to consistency rules.
