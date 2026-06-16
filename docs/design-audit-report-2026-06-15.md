---
layout: page
title: Design / Display / Text / Layout Audit Report — 2026-06-15
---

# Design / Display / Text / Layout Audit Report — 2026-06-15

Status: **findings ready; Decision B applied; batch 2 (contrast) applied & verified**
Plan used: [`docs/design-audit-plan.md`](design-audit-plan.html)

This is the qualitative pass against the
[Design System Reference](DESIGN-SYSTEM.html). The
[All Pages Audit](all-pages-audit-report-2026-06-15.html) already cleared
correctness; nothing here repeats it.

## Coverage and honesty note

- **Phase A (systematic, all 97 routes): complete.** Source sweeps for the
  `data-*` contract, colour/token drift, the tool inline-style rules, archived
  assets, asset depth, and editorial placeholders.
- **Phase B (deep visual sample): done where it matters.** Full-page screenshots
  were unreliable (capture-size bug), but contrast — the substantive risk — is
  now measured with an **oklab-aware, alpha-compositing** checker (resolves any
  colour format via canvas) across **all four identities** plus the white-tone
  baseline. The prior audit already confirmed 0 horizontal overflow at
  390/768/1280 across identities.
- **Phase C (editorial read-through): done for copy standards + voice sample.**
  All 26 tool-detail pages checked for the `.eg` standard; non-tool voice
  sampled across sessions/docs/packs/support.

**Reviewer corrections folded in (2026-06-15):** tool-count bucket clarified
(24 interactive + 1 bridge-index landing); the "concept-bridge titles render
serif" consequence was **retracted** after a browser check (h1 computes to
Archivo sans; the `body` override is `var(--font-body)`); the placeholder claim
was corrected to surface the pack placeholder-media comments.

Treat the systematic findings as solid and the visual/editorial sections as
"checked where tooling allowed, plus a recommended manual follow-up."

## Summary

| Check | Result |
|---|---:|
| Routes swept (Phase A) | 97 |
| `data-skin` present | 96 / 97 (only the redirect stub lacks it) |
| `data-tone` / `data-type` / `data-ink` present | all except 3 frozen demos + 1 stub |
| Tools with `data-mod` | 25 / 25 |
| Archived / v1 asset references | 0 |
| Hardcoded colours duplicating a token value (real pages) | 0 |
| Placeholder / TODO / lorem in visible copy | 0 |
| Placeholder **media** comments | `packs/images` ×3, `packs/video` ×3 (assets not yet final) |
| Tool inline-style **rule divergences** | widespread — see Design lens |
| White-tone body-text contrast | 10:1–20:1 (well above AA) |

## Headline finding: the doc and the code disagree on tool styling

The Design System Reference states for tool inline styles: **square corners
(`--radius: 2px`), no box-shadows, do not restyle `body`, do not override
`--bg`/`--ink`/`--accent`/`--muted`/`--rule`.** In practice the tool layer
diverges.

**Bucket note:** `tools/*/index.html` returns 25 files, but one
(`tools/concept-bridges/index.html`) is the bridge *landing page*, not an
interactive tool. The honest split is **24 interactive tools + 1 bridge-index
landing**, plus the 6 bridge tools under `concept-bridges/*/`.

Counts below are from inline `<style>` + `style=""`, **rounded** = any
`border-radius` >2px *or* a `%` value, **pill/circle** = `≥100px` *or* `≥50%`.
Per-tool auditable:

| Divergence | Interactive tools (24) | Concept-bridges (6) | Worksheets (5) |
|---|---:|---:|---:|
| Rounded corners | 12 | 6 | 1 |
| Pill / circle corners | 8 | 6 | 1 |
| `body{}` restyles background/color/font | 10 | 6 | 5 |
| `:root{}` overrides core tokens | 0 | 0 | 5 |

The 12 rounded tools: cfg-scale-visualizer, latent-space-compressor,
metronome-frame-scrubber, network-grounded-truth-sieve (10px each);
confidence-is-not-truth-explorer, dataset-balance-simulator, evidence-wall,
next-token-prediction-game, relational-co-occurrence-sieve,
tokenizer-temperature-visualizer (`999px` pills); **eliza-simulator** and
**temporal-telephone** (`border-radius: 50%` circles). The 8 pill/circle tools
are those last six `999px` ones plus the two `50%` ones. Including the
bridge-index landing the totals are 13 rounded / 9 pill / 11 body.

*Correction:* an earlier draft reported 10/6 because the detector only counted
`px` values and missed the `50%` circles in eliza-simulator and
temporal-telephone; the numbers above are corrected and reproduce the
independent review's 12/8.

**Decision: (B) — the softer tool aesthetic is intentional.** So the fix is to
**update DESIGN-SYSTEM.md** to carve out an explicit "interactive tool canvas"
exception (rounded corners, `body`/`:root` self-styling for self-contained
apps, focus-ring shadows), and to document the worksheet print exception — so
the contract stops disagreeing with the shipped site. The code is not changed to
chase the old rule.

## Findings by lens

Each tagged **type** (System drift / Readability / Editorial / Polish) ×
**severity** (High / Med / Low).

### Design — system fidelity

- **D1 — Square-corner rule diverged.** 12/24 interactive tools and all 6
  concept-bridges use rounded corners; 8 tools + 6 bridges use pill/circle
  corners (`≥100px` or `50%`) — see the named list and bucket note above.
  *System drift · Med.* Visually
  restrained on the pages sampled (the bridge pills read as ordinary tabs), so
  this is consistency, not breakage. → Resolved by Decision B (document it).
- **D2 — `body{}` restyling.** 10 interactive tools, all 6 bridges, all 5
  worksheets set `body` background/color/font-family, which `field.css` is
  supposed to own. **Correction to the earlier draft:** this does *not* cause a
  visible type-voice change. The bridges' `body{font-family}` is
  `var(--font-body)` — the same token the system already uses — so on
  `prediction-is-not-understanding` the h1 computes to
  `Archivo … sans-serif`, not serif. The override is redundant, not harmful.
  *System drift · Low.* Under Decision B, document that self-contained tools may
  self-style `body`.
- **D3 — Worksheets override core tokens.** All 5 worksheets override
  `--bg`/`--ink`/`--accent`/`--muted` in `:root`. Likely a deliberate
  print-first choice, but undocumented and against the rule. *System drift ·
  Med.* → Document the worksheet exception, or route through tokens.
- **D4 — Decorative box-shadows.** A few tools carry non-focus box-shadows
  (e.g. the tokenizer's drop shadow) against the "no shadows" rule. Most other
  shadows are legitimate `inset` focus rings — leave those. *System drift · Low.*
- **D5 — One tool pins `data-tone="slate"`** (`latent-space-compressor`).
  Appears intentional (dark latent-space canvas); confirm and note it as an
  allowed exception. *Polish · Low.*
- **Clean:** `data-*` contract uniform across real routes; **0** archived/v1
  asset references; **0** token-value duplications in real content pages
  (camp-poster only *displays* the palette as swatches).

### Display — how it renders

- **Di1 — White-tone contrast is excellent.** hero-lede 10.4:1, h1 17:1, body
  20:1, links 17:1, blurbs 10.4:1. *Good.*
- **Di2 — Low-contrast accent meta text in default `field` mode.** *Now
  verified* with an oklab-aware, alpha-compositing contrast checker (resolves
  colours via canvas). Two systemic patterns on session/index pages fail
  WCAG AA:
  - `.ts-n` throughline numerals ("01"–"04") — accent green on a tinted card,
    **1.75:1** at 11px.
  - `.sec-note` section meta ("for the debrief", "60–90 minutes", "featured
    live · then go deeper") — muted accent green, **3.05:1** at 12px.
  Both come from using the modality **accent colour for small meta text on light
  backgrounds**. Counter-intuitively the loud identities are *fine* — terminal
  ≈5.7, spectrum ≈5.0, acid ≈5.7 minimum — because they remap these tokens;
  it's the **default Field view** (the most-used one) that's weakest.
  *Readability · Med.* **✅ Fixed 2026-06-15 (batch 2):** re-anchored both on
  `--ink-soft` while keeping a skin tint — `.ts-n`
  `color-mix(--skin-accent 32%, --ink-soft)`, `.sec-note`
  `color-mix(--skin-muted 32%, --ink-soft)`. Verified with the oklab checker in
  default Field across all four session skins — every value now passes AA:

  | Skin | `.ts-n` before → after | `.sec-note` before → after |
  |---|---|---|
  | text-terminal | 1.75 → 5.12 | 3.05 → ~6.0 |
  | image-spectrum | — → 6.33 | — → 8.37 |
  | video-slitscan (tightest) | — → 6.91 | — → 5.25 |
  | studio-synthesis | — → 7.06 | (no `.sec-note`) |

  Identity modes were re-checked and only improved (terminal/spectrum/acid all
  ≥7 for `.ts-n`); no regression.
- **Di3 — Composition & hierarchy strong on the sample** (homepage,
  concept-bridge): clear h1→lede→body, consistent eyebrow/§ rhythm. *Good.*
- **Di4 — Tooling limit:** full responsive screenshot sweep blocked by the
  capture-size bug; overflow already cleared by the prior audit.

### Text — editorial

- **T1 — No lorem / TODO in visible copy**, but `packs/images/index.html` and
  `packs/video/index.html` each carry **3 `<!-- PLACEHOLDER -->` media
  comments** — the image/video assets are not yet final. (The many other
  "placeholder" matches across the site are `placeholder=` input attributes,
  which are legitimate.) *Editorial · Low — confirm the placeholder media is
  visibly marked to participants, not just in comments.*
- **T2 — Voice is consistent on the non-tool sample.** *Checked.* Ledes/intros
  on sessions, docs, packs, and support pages read in the demystifying-auditor
  voice ("isn't whether AI works — it's who gets to use it"; "predict, change
  one thing, compare, name"). No off-voice page found in the sample. *Good.*
- **T3 — Two invest-card patterns; the `.eg` standard documents only one.**
  *Checked across all 26 tool-detail pages.* Older tools (tokenizer, eliza,
  diffusion, evidence-wall) use the documented concrete-data `.eg` ("empty"
  71%; "step 3 → two regions, no subject yet") — exemplary. But ~13 newer tools
  (frame-coherence, latent-space-explorer/compressor, dataset-balance,
  default-test, metronome, network-truth-sieve, prompt-guidance, video-failure,
  cfg-scale, confidence-truth, classroom-activity-builder, concept-bridges) use
  a 4-step **Predict → Change → Compare → Name** card where `.eg` carries a
  step-appropriate guess/action/takeaway ("guess: hands and faces drift";
  "background holds; subject drifts"). That is arguably *better* pedagogy, but
  DESIGN-SYSTEM.md's `.eg` rule ("a concrete data example … not a
  meta-description") only describes the first pattern. *System drift /
  Editorial · Med.* → Document both invest-card patterns in the copy standard.

### Layout — spatial

- **L1 — Vertical rhythm is centralised** in `field.css` (`.section` /
  `.section-tight` clamps) and `.wrap` container discipline holds. *Good.*
- **L2 — The rounded-corner drift (D1) is the main visual-language
  inconsistency** at the layout level — the tool layer reads slightly softer
  than the square editorial shell. Accepted as intentional under Decision B.
- **L3 — No ad-hoc container widths or broken grids found** in the systematic
  sweep.

## Fix queue (Decision B — document the aesthetic, don't square up)

1. **DESIGN-SYSTEM.md update — ✅ applied 2026-06-15.** Added an "interactive
   tool canvas" exception (rounded corners, `body` self-styling, focus-ring
   shadows) scoped to the apps under `tools/<slug>/` and
   `concept-bridges/<slug>/`; kept the square/flat rule for the editorial shell;
   documented the worksheet print exception and `latent-space-compressor`'s
   `data-tone="slate"`. No tool code changed.
2. **Contrast fix (Di2) — ✅ applied & verified 2026-06-15.** Re-anchored
   `.ts-n` (`field-sub.css`) and `.sec-note` (`field.css`) on `--ink-soft`; all
   four session skins now pass AA in default Field (see Di2 table). One
   centralised change; fixes every session/index page.
3. **Copy-standard doc (T3):** document both invest-card patterns
   (concrete-data `.eg` and the 4-step Predict→Change→Compare→Name) in
   DESIGN-SYSTEM.md so the standard matches the shipped tools. *Med.*
4. **Pack media (T1):** replace or visibly mark the 6 placeholder media items in
   `packs/images` and `packs/video`. *Low.*
5. **Optional tidy (code, low):** drop genuinely decorative (non-focus)
   box-shadows like the tokenizer drop shadow (D4); remove the redundant
   `body{font-family: var(--font-body)}` overrides (D2) — cosmetic, safe to
   defer.

## Recommended next step

Batches 1 (DESIGN-SYSTEM.md exception) and 2 (default-Field contrast fix) are
done and verified. Remaining: batch 3 (document both invest-card patterns — a
doc edit) and batches 4–5 (low-priority cosmetic cleanups).
