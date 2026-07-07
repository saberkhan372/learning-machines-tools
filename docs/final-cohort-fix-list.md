---
layout: page
title: Final-Cohort Fix List (n=80)
---

# Final-Cohort Fix List (n=80)

Status: **proposed**
Date: 2026-07-07
Source: "Learning Machines — Interest Form v3" final responses, **80 prospective
participants** (form effectively closed 2026-07-03). Companion to
[Interest-Form Analysis & Site Support Plan](interest-form-site-support-analysis.html)
(n=58, 2026-06-16) and [Enriched-Cohort Design Pass](enriched-cohort-design-pass.html)
(n=74, 2026-06-23). Incorporates verified items from an external (Codex) review
of the same data; items it proposed that already exist on the site are listed in
§4 so they don't get rebuilt.

**Privacy:** aggregate only. No names, emails, locations, or identifiable
free-text quotes.

---

## 1. The data update that reprioritizes everything

Splitting the 80 responses at **June 12** (when outreach shifted toward
ITP / Processing / Are.na / DSA / livecode channels):

| Signal | Early (n=39) | Late (n=41) |
|---|---:|---:|
| Under-the-hood mechanics interest | 0% | **51%** |
| K–12 teacher | 54% | 32% |
| Artist or designer | 31% | 46% |
| Technologist or developer | 26% | 37% |
| First-ever CC Fest event | 41% | **80%** |
| "Excited" comfort level | 44% | 27% |
| Creative-piece end goal | 10% | 24% |
| Classroom-activities interest | 59% | 44% |

The 0% → 51% mechanics break almost certainly means the option was added to the
form ~June 12 — so the honest read is **"when people see the option, half take
it,"** not "26% niche." This supersedes the June 16 doc's §5 guidance ("deep
math drew only 14%, keep it off the front door"). Full-cohort constants: 61%
first-timers, 68% regular gen-AI users, 92% have text-tool access, 42% arrive
with reservations, "not sure yet" is still the plurality deliverable (38%).

A second cross-cutting finding: **questions the site already answers kept
arriving on the form** (recordings ×2 after the June 16 hero strip shipped;
train-from-scratch ×2 despite the Start Here scope line). People fill the form
before reading deeply — for them, the delivery vehicle is **email, not the
site** (fix F2).

---

## 2. Fixes, in priority order

### F1 · Retire the stale "interest form due July 4" deadline — **P0, do first**

The deadline passed on July 4; camp starts July 11. Four live locations still
show it:

- [ ] `pages/camp-2026.html:55` — deadline banner → replace with cohort-formed /
      waitlist language (e.g., *"The 2026 cohort is formed — join the waitlist /
      mailing list for recordings and the next cycle"*).
- [ ] `pages/camp-2026.html:185` — footer colophon line, same swap.
- [ ] `index.html:53` — hero dates line: drop "interest form due July 4," keep
      the three Saturdays.
- [ ] `index.html:277` — closing CTA block, same.
- [ ] Sweep for any other pre-deadline phrasing:
      `grep -rn "July 4\|interest form" index.html pages/`.

*Evidence: calendar. Effort: low. This is recruitment-facing and wrong today.*

### F2 · Welcome / confirmation email — **P1, higher-leverage than any page edit**

Draft one email (as `docs/welcome-email.md`) to registered participants
covering, in order:

- [ ] Recordings + async policy (asked repeatedly on the form *after* the site
      strip shipped): every session recorded, shared with registered
      participants only, async route is a full path — link
      `pages/camp-2026.html` §B–C.
- [ ] Scope line, verbatim from Start Here: *"We investigate how models behave —
      we don't train them from scratch."* (2 more train-your-own-model asks in
      the late wave.)
- [ ] Prep expectations: nothing required, no accounts, no installs; optional
      pre-reads are optional. Link `pages/start-here.html`.
- [ ] Vocabulary Field Guide link as the "words we'll use" primer.
- [ ] Timezone table link + the two hardest conversions spelled out (see F4).

*Evidence: §1 second finding. Effort: low–medium. Owner: program, not site.*

### F3 · Expand the Vocabulary Field Guide — **P1**

`pages/vocabulary-field-guide.html` currently has **zero** entries for terms the
cohort asked about by name and that the mechanics-heavy late wave needs:

- [ ] red-teaming (asked verbatim on the form)
- [ ] training data / dataset
- [ ] eval / evaluation
- [ ] context window
- [ ] attention
- [ ] embedding
- [ ] model card (mentioned twice in passing — give it a proper entry that
      links the Model Card Builder)

Keep entries in the guide's existing plain-language register.

- [ ] Also: link the guide from `pages/start-here.html` — it's linked from ten
      pages but not the orientation page where first-timers (61%) land.

*Evidence: direct free-text ask + 51% late-wave mechanics interest. Effort: low.*

### F4 · Add the two hardest rows to the timezone table — **P1**

`pages/camp-2026.html:108–118` runs Honolulu → Tokyo but skips two zones with
actual registrants:

- [ ] India (IST): **9:30 – 11:30 pm Saturday**
- [ ] Manila / Philippines (PHT): **12:00 – 2:00 am Sunday**

Showing the brutal rows honestly is what makes the adjacent "async is a full
path, not a consolation" note (line 120) credible. Don't soften them.

*Evidence: one registrant in each zone; one flagged the midnight start on the
form. Effort: trivial.*

### F5 · Give the mechanics route more visible weight — **P2, surfacing only**

The route already exists (Start Here: "See what the machine is actually doing";
front door already leads with the same question). The fix is emphasis, not
content:

- [ ] Name the under-the-hood tools (tokenizer, diffusion step-through, CFG
      scale, latent-space explorer/compressor) where peers first look — the
      mechanics route card and/or a homepage row.
- [ ] Keep the four Start Here routes at parity (no fifth route — per the
      design-pass decision, the adopter band stays a band).

*Evidence: §1 wave table. Effort: low. Discipline: no new tools.*

### F6 · Session 2–3 facilitation: credit / labor prompts — **P2**

Add explicit discussion prompts to `docs/session-2-facilitation.md` and
`docs/session-3-facilitation.md` (and the showcase script if it fits):

- [ ] *What did the human do? What did the model do?*
- [ ] *What should be credited, and to whom?*
- [ ] *Whose work, data, or labor is hidden in this output?*

Wire to the existing AI Use + Consent Checklist rather than a new worksheet.

*Evidence: recurring free-text anxiety — credit, authorship, "stealing," labor —
concentrated in the artist half of the room (46% of late wave). Effort: low.*

### F7 · Refresh the analysis docs so future decisions don't cite stale reads — **P2**

- [ ] `docs/interest-form-site-support-analysis.md` §5: annotate "don't lead
      with deep math (14%)" as **superseded** by the n=80 wave finding; link
      this doc.
- [ ] `docs/enriched-cohort-design-pass.md`: update n=74 → n=80 and, more
      importantly, revise the "keep the deep tools as a secondary lane"
      conclusion (mechanics is 51% among respondents who saw the option).
      Re-weight item order: critical-inquiry copy rewrite rises (42% arrive
      with reservations; "excited" fell to 35%); audio pointers and governance
      lane each gained a named person in the private enrichment file.

*Effort: low. This is the "number swap" fix done properly — the conclusions are
what's stale, not just the counts.*

### F8 · Optional: aggregate "who's in the room" note — **P3**

One line on `pages/camp-2026.html` (the hero at `index.html:51` already carries
the framing): *"This cohort: educators, artists and designers, technologists,
students, curriculum designers, governance/legal folks, and
skeptical-or-opposed participants — from four continents."* Aggregate only; no
names, no counts that could identify individuals.

*Evidence: peer-convening reframe; 61% first-timers who don't know the
community yet. Effort: trivial. Genuinely optional.*

---

## 3. Explicitly not doing

- **No default final artifact.** Do not name "lesson/activity" as the default
  deliverable in facilitation — creative-piece goals rose 10% → 24% and the
  room is half artists/technologists. The four routes stay at parity.
- **Don't move the Saturdays.** 6 of 80 prefer weekdays/other days; recordings
  plus one weekday office hour (design-pass item 5) covers them.
- **No new tools or niche pages** (train-your-own-music-model, alt-text
  testing, animation pipelines). The alt-text ask becomes an example
  investigation prompt inside the existing investigation route; the rest are
  office-hour / guest-share material.
- **No beginner reframing.** 68% use gen-AI regularly; orientation teaches this
  camp's culture, not AI basics.

## 4. Already on the site — do not rebuild

Verified 2026-07-07 (items an external review proposed adding):

| Proposed | Already exists at |
|---|---|
| "Not sure yet is normal" copy | `pages/start-here.html:169` — "§ B · Not sure yet?" / "most people aren't — that's fine" |
| Async as designed pathway, not backup | `pages/camp-2026.html:120` — "a full path through the camp, not a consolation" |
| Who's-in-the-room framing | `index.html:51` hero (educators, artists, researchers, beginners, skeptics) |
| Classroom Activity Builder routing | Shipped in the June 16 pass (item #5) |
| Scope line ("we don't train from scratch") | `pages/start-here.html` §A |
| Free/local/open-model guidance | `pages/ai-access.html` §C + `pages/hands-on.html` |

---

## 5. Acceptance criteria

- No page shows a past deadline or pre-deadline CTA
  (`grep -rn "July 4" index.html pages/` returns nothing).
- The seven vocabulary terms resolve to entries; the guide is linked from
  Start Here.
- The timezone table includes IST and PHT rows with correct July conversions.
- Welcome email draft exists in `docs/` and covers recordings, scope, prep,
  vocabulary, timezones.
- Both analysis docs point at the n=80 finding; neither still asserts the
  14%/24% "mechanics is niche" conclusion unqualified.
- No individual form responses, names, emails, or identifiable comments appear
  in any committed file.
- Edited pages remain usable at 360px, 768px, and 1280px; all added links
  resolve; `git diff --check` passes.
