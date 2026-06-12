---
layout: page
title: Site Usability Audit — Design, Language, and Structure
---

# Site Usability Audit — Design, Language, and Structure

Status: **audit complete / recommendations not yet implemented**
Date: 2026-06-12
Scope: all 69 public routes — measured (words, mobile page height, heading
counts, links, controls) via a 375px browser sweep, plus close reading of the
homepage, session pages, pathway/reading pages, and navigation across the six
page families.

This audit is about **ease of use and understanding**, not visual QA (that
lives in [`full-page-design-audit.md`](full-page-design-audit.html)). The
question throughout: can a first-time educator, artist, or student find what
they need, read it without fatigue, and know what to do next?

## Headline numbers

| Metric | Value | Reading |
|---|---|---|
| Median page | ~440 words, ~4.2k px tall on mobile | Healthy — most pages are one idea long. |
| Homepage | 1,065 words, **10.6k px on mobile**, 61 links | ~13 phone screens; by far the longest page on the site. |
| Longest prose pages | further-reading 977w · younger-learners 971w · hands-on 936w | All scannable-list pages with weak or no heading structure. |
| Pages with **zero `<h2>`** | 31 of 69 | Section heads are styled `<span>`s, invisible to screen readers and reader modes. |
| Nav variants | 6+ different link sets | First two slots are stable (Tool index / Sessions); the rest drifts, and labels drift too ("Tools" vs "Tool index"). |
| Tool detail pages (`pages/tool-*`) | uniformly 420–550w | Consistent and right-sized — the best-behaved family on the site. |

## Findings

### 1 · The homepage is doing four jobs

At 10.6k px on mobile it is a campaign poster **and** the sessions overview
**and** the complete 20-tool catalog **and** the materials directory. Each is
good; stacked, they bury each other — the materials list starts ~9 screens
down, and the audit's earlier "late H1" fixes can't help content that simply
has too many predecessors.

**Recommendation (the one structural split worth making):**

- Keep the homepage to: hero · the three-modality figure · sessions · **a
  "start here" row** (see finding 2) · a *preview* of the tool index (first
  4–6 rows + "Browse all 20 →") · footer.
- Move the full filterable catalog to a dedicated **`pages/tools.html`**
  ("Tool index" nav slot already exists and would point there instead of an
  anchor). `field-app.js` already renders the catalog as a component, so this
  is mostly a move, not a rebuild.
- Move the materials directory to a dedicated **`pages/materials.html`**,
  grouped by audience (see finding 4).

### 2 · There is no "start here" for any of the three audiences

The lede names "educators, artists, students, and curious learners," but every
visitor gets the same firehose. The site already *has* the right destinations
— they're just not surfaced as paths:

| Visitor | Their actual first page | Clicks to find it today |
|---|---|---|
| Educator planning a class | `docs-facilitation.html` (run of show) | 2–3, via Materials, 9 screens down |
| Artist / curious learner | any tool, probably the Tokenizer | 1–2, must pick from 20 unexplained rows |
| Skeptic / no-AI participant | `no-ai-pathway.html` | buried in Materials |
| Camp registrant | `camp-2026.html` | findable via Register button only |

**Recommendation:** a three-card "Which one are you?" band on the homepage
(I teach → Session 1 facilitation · I want to play → Tokenizer + Temperature ·
I'm not using AI → No-AI pathway). One band, three links, placed right after
the hero — the highest usability return available for one afternoon of work.

### 3 · Long list-pages need structure, not subpages

`further-reading` (977w), `younger-learners` (971w), and `hands-on` (936w) are
long but **linear lists** — splitting them into subpages would add clicks
without adding clarity. The fix is scaffolding:

- **On-page TOC** at the top (the `doc-spectrum` demo's sticky TOC pattern is
  already built and could be extracted into `field-sub.css`).
- Real `<h2>`s per section (finding 6) so reader mode and screen readers get
  the same structure sighted users see.
- `further-reading` specifically: the "Start with these three" section is
  excellent — move it *above* the fold and collapse the remaining sections
  behind their headings on mobile (`<details>` is fine here; no JS).

**Where subpages ARE warranted:**

- **`no-ai-pathway.html` (6.5k px mobile).** It serves two readers: the
  *participant* deciding whether this camp respects their refusal (needs the
  first 2 screens: the promise, the six "what you can do instead" cards) and
  the *facilitator* implementing it (needs the tool list, scripts, policy
  language). Split the facilitator half into
  `pages/no-ai-pathway-facilitation.html`, keep the participant page short
  and reassuring.
- **`session-showcase.html` (5.9k px).** Session 4 carries showcase logistics
  *and* the whole reflection/critique apparatus. The "run a showcase" half
  (consent, schedule, formats) is a facilitator artifact; the reflection
  prompts belong with the session. Same split pattern.

### 4 · The materials list mixes audiences — including us

The homepage/README "Facilitation & planning" list interleaves three
different kinds of document:

1. **Facilitator-facing**: session guides, link sheet, consent protocol,
   pre-session check-in, vocabulary.
2. **Project-internal**: design audits, redesign rollout plan, identity
   switcher plan, build roadmap, integration queue — useful to contributors,
   noise to a teacher.
3. **Design lab**: camp poster, Subpages Remixed, the three skin demos.

**Recommendation:** three labeled groups (For facilitators · Design lab ·
Project docs), and the project-internal docs should drop off the homepage
entirely — README + a single "Colophon / project docs" link is enough.

### 5 · Navigation drifts after the second slot

"Tool index · Sessions" then anything: Method, Materials, Vocabulary, Link
sheet, Register, Tool notes, ← All tools. The *pattern* (stable pair +
contextual action) is actually right; the problem is it's accidental rather
than designed, and labels wobble ("Tools" on worksheets vs "Tool index"
everywhere else).

**Recommendation:** codify in `DESIGN-SYSTEM.md`: slots 1–2 are always
`Tool index · Sessions` with those exact labels; slot 3 is the page family's
home (Materials for docs, the session for tools); slot 4 is the page's one
action (Launch tool, Register, Print). Then sweep the ~12 deviating pages.

### 6 · Section heads are invisible to assistive tech

The signature `§ A · What we make visible` rules are `<span
class="sec-no">`s inside `<div>`s — 31 routes have **zero `<h2>` elements**.
Screen-reader users navigating by heading get nothing between the H1 and the
footer on most session and tool-detail pages.

**Recommendation:** change `.sec-no` markup from `<span>` to `<h2>` (CSS
already targets the class, not the tag, so this is a markup-only sweep), and
the session-page `h4`s inside throughline cards should become `h3`s to keep
the outline. No visual change; large a11y and reader-mode win.

### 7 · Language: strong voice, three repeatable issues

The voice ("What is the machine actually doing?", "No guessing. The machine
is doing division.") is the site's best asset. The issues are local:

- **Unexplained jargon at first contact.** "Spatiotemporal," "top-k,"
  "greedy vs. sampled," "modality," "latent" appear on first-contact pages
  without their plain-language gloss, even though
  `vocabulary-field-guide.html` defines most of them. Recommendation: first
  use of a vocabulary term on session/tool-detail pages links to its anchor
  in the field guide (`vocabulary-field-guide.html#temperature`); add anchors
  per term to the guide.
- **Mono-caps density on mobile.** Eyebrows, stamps, crumbs, tags, section
  notes — on a phone some screens are majority uppercase mono, which reads as
  shouting and slows scanning. Recommendation: a one-pass budget — one
  eyebrow per hero, one note per section rule; demote remaining caps labels
  to sentence-case body small.
- **Lede sentences run long.** The homepage lede is 54 words with three
  clause pivots; session ledes average ~35. These are the most-read sentences
  on the site. Recommendation: cap ledes at ~25 words; spillover becomes a
  second sentence. ("A field manual for taking generative systems apart.
  Browser tools, session plans, and worksheets — no coding, no accounts, no
  live AI needed.")

### 8 · Smaller observations

- **`vocabulary-field-guide.html`** is only 380 words but 4.9k px tall —
  each term carries heavy card chrome. A compact two-column ruled-list layout
  (like `.doc-rows`) would halve the height and make it feel like the
  reference card it is. Add per-term `id`s regardless (needed by finding 7).
- **Skin menu label.** "Skin: Field" is designer vocabulary. "Look" or
  "Style" tests better with non-designers; also consider the menu listing a
  one-word hint per option (Terminal — dark).
- **`packs/video/` (6.3k px)** is twice the height of the other packs at the
  same word count — frame-strip motifs are eating vertical space on mobile;
  cap their height under 480px.
- **Duplicate path confusion:** a session's tools are reachable via session
  page, tool-detail page, link sheet, and catalog — fine — but the
  tool-detail pages and session pages disagree on *order* in places, and the
  link sheet is the only one a facilitator can paste from. Cross-link the
  link sheet from each session's § B header ("Need paste-ready links?").
- **Footer is a dead end** on most subpages (brand + colophon only). A
  three-link footer (Home · Tool index · Materials) costs nothing and
  rescues anyone who scrolled to the bottom without finding their thing.

## Priorities

| P | Item | Effort | Findings |
|---|---|---|---|
| P0 | Homepage "start here" band for the three audiences | half-day | 2 |
| P0 | `<h2>` semantic sweep for section rules | half-day, mechanical | 6 |
| P0 | Materials list regrouped; internal docs off the homepage | hour | 4 |
| P1 | Split tool catalog + materials onto their own pages; shorten homepage | 1–2 days | 1 |
| P1 | TOC + heading structure for the three long list-pages | day | 3 |
| P1 | Vocabulary anchors + first-use term links on session pages | day | 7 |
| P1 | Nav slot contract + label sweep | half-day | 5 |
| P2 | Split no-ai-pathway and session-showcase facilitator halves | day | 3 |
| P2 | Mono-caps budget pass, lede tightening | day | 7 |
| P2 | Vocabulary compact layout, pack motif height caps, footer links, skin menu label | day | 8 |

## What NOT to change

- Tool-detail pages: uniform, right-sized, well-patterned. Use them as the
  template others converge toward.
- Tool apps themselves: word counts 105–780 with controls dominating — they
  are tools, not pages, and they read that way. Correct.
- Worksheets: tall and control-dense (up to 61 inputs) by design; print-first
  is the right call.
- The voice. Tighten sentences, never flatten the register.
