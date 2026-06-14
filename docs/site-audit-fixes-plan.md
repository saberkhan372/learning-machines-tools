---
layout: page
title: Site Audit — Fixes Plan
---

# Site Audit — Fixes Plan

Status: **in progress**
Date: 2026-06-13
Source: the three-axis audit (attendee needs · design plan · per-page task) run
after the advanced-ML tool additions (Latent Space Compressor, Metronome
Frame-Scrubber, two Truth Sieves) and the CFG consolidation.

This plan turns the audit's recommendations into concrete, sequenced work. It
covers structural/IA fixes only; the tool additions themselves are already
shipped and verified.

## Already done (during the audit)

- **Tool-count staleness.** Homepage and catalog said "Twenty-one small
  machines" / "21 / 21 tools" after the count grew to 25. Prose is now
  count-free ("Small machines, each exposing one mechanism") and numeric
  fallbacks read 25. Files: `index.html`, `pages/tools.html`.

## To do

### 1 · Contain the skin-demo pages — P1 · small — ✅ DONE

`doc-spectrum.html` (= Session 1 facilitation), `session-acid.html` (= Session 1
text), and `tool-terminal.html` (= Tokenizer) are alternate-skin clones of
canonical pages. They are already link-contained (only `subpages-remixed.html`
points to them), so the remaining risk is search engines surfacing a second
"Session 1" page.

- **Fix:** add `<meta name="robots" content="noindex">` to the three skin-demo
  pages so they stay design-lab-only and never compete with the canonical route.
- **Acceptance:** the three pages still render and remain reachable from the
  Subpages Remixed contact sheet; they carry a noindex tag; no canonical page
  is touched.

### 2 · Footer link trio on subpages — P2 · small — ✅ DONE

The audit's finding #8: the footer is a dead end on most subpages (brand +
colophon only). A three-link footer rescues anyone who scrolled to the bottom.

- **Fix:** insert `Home · Tool index · Materials` links into the footer of
  every standard subpage, above the existing colophon line, using one shared
  markup block.
- **Acceptance:** every participant/session/reference page has the trio; links
  resolve; the homepage (already has full nav) is left as-is.

### 3 · Facilitation page naming — P2 · small — ✅ DONE

Session 1's facilitation page is `docs-facilitation.html`; Sessions 2–4 are
`docs-session-N-facilitation.html`. Inconsistent.

- **Fix:** add `pages/docs-session-1-facilitation.html` as the canonical name
  and turn `docs-facilitation.html` into a redirect stub (keep the old URL
  working — it is linked from the homepage start-here card and others). Repoint
  internal links to the new name.
- **Acceptance:** both URLs resolve; all internal links use the new name; the
  old URL redirects.

### 4 · Tool-detail-page policy — P1 — ✅ DONE (decision: complete the family)

There are `pages/tool-*.html` detail/landing pages for 14 of 25 tools. The four
new tools and ~6 others have none; the catalog links straight to the apps, while
session/facilitation pages link to the detail pages where they exist.

Two coherent directions — this one needs a call before implementing:

- **(A) Complete the family.** Add detail pages for the 11 missing tools so the
  pattern is uniform. More surface to maintain, but keeps the framing layer the
  audit praised.
- **(B) Retire the family.** Point session/facilitation links straight at the
  apps (as the catalog already does) and remove the 14 detail pages. Less to
  maintain; the apps now carry their own hero/context.

Recommendation: **(A)** if the detail pages are used as pre-class reading;
**(B)** if they are mostly a redundant click. Pending decision.

### 5 · Remaining open audit items — P1–P2 · medium

Carried over from `site-usability-audit.md`, not yet done:

- **Vocabulary first-use links (P1).** ✅ DONE — added per-term `id` anchors to
  every glossary row and filled the gaps the audit flagged (latent, modality,
  spatiotemporal, CFG, greedy-vs-sampled). First use of a jargon term now links
  to its anchor on the three session ledes (temperature, diffusion, coherence).
  Further first-use links on tool-detail pages can extend this later.
- **Mono-caps budget + lede tightening (P2).** ⏳ remaining — one eyebrow per
  hero, one note per section rule; cap ledes near 25 words. Editorial; benefits
  from review.
- **Vocabulary compact layout, video-pack height cap (P2).** ⏳ remaining —
  visual polish.

## Sequence

1. Skin-demo noindex (§1) — fast, zero-risk.
2. Footer link trio (§2) — fast, high reach.
3. Facilitation rename + redirect (§3).
4. Decision on tool-detail policy (§4), then execute A or B.
5. Vocabulary anchors + first-use links (§5).
6. Polish pass: mono-caps, ledes, vocab layout, pack height (§5).
