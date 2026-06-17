---
layout: page
title: Participant Support Plan
---

# Participant Support Plan

Status: **largely implemented — 2026-06-16**
Date: 2026-06-16 (revised)
Source: aggregate interest-form responses from 58 prospective participants.

**Implementation note (2026-06-16):** Built `pages/start-here.html` (four routes:
Classroom Activity, Creative Maker, Critical/Cautious/No-AI, Mechanism Curious;
undecided users pointed to the first two), with the recordings/async/time-zone
message restated in its hero and a scope-clarifier line. Added the
"Recorded · async-friendly · global time zones welcome" strip to `index.html`
and `pages/this-saturday.html`; added a "Start here" CTA to the homepage hero and
linked the homepage §00 section and `pages/materials.html` to the new page;
pointed `pages/camp-2026.html` §C "Before Session 1" at Start Here while keeping
its timezone/recording detail. **Plan §C (free / open / local-model guidance) was
already implemented** on `pages/ai-access.html` (§C "Free & low-cost ways in"
covers browser training, Ollama/LM Studio, and free API tiers) and
`pages/hands-on.html`, so it was not duplicated. Polish (2026-06-16): added a
"For the classroom specifically" free/student-safe-tools callout to ai-access
§C, and added `[data-gc-event]` custom-event tracking in `assets/analytics.js`
with the four Start Here route links tagged (`start-here-route-{classroom,
creative,critical,mechanism}`) so the routing success signal is measurable.
Outstanding: only the post-launch GoatCounter *observation* itself (needs live
traffic).

This plan uses cohort-interest data to decide how the site should support
everyone who lands on it interested in the camp — as they explore, orient, and
decide whether and how to take part. (It applies before camp, but is not limited
to that window.) It is not a raw spreadsheet analysis and does not include
individual names, emails, or identifiable response text. For the full data
breakdown and themes, see
[Interest-Form Analysis & Site Support Plan](interest-form-site-support-analysis.md).

The main recommendation is simple: keep the site rich, but give people a
shorter first path through it. The current site already has the right materials;
the next improvement is **orientation plus logistics confidence**.

Two framing corrections from the data drive this revision:

- **This is not a beginner cohort.** 71% use generative AI regularly and only
  ~10% are novices. Orientation should *route* people quickly, not reassure them
  at length. Reassurance ("no account, no install, no required reading") belongs
  as a short secondary note, not the headline.
- **Logistics is the most-repeated worry.** "Will sessions be recorded?" and
  time-zone conflicts came up more than any content question. Recordings and
  async access should be a **prominent, site-wide message**, not a buried prep
  step.

## Data Snapshot

The audience is educator-heavy and mixed in comfort level:

| Signal | Aggregate |
|---|---:|
| Total responses reviewed | 58 |
| K-12 teachers | 32 / 58 (55%) |
| Curriculum designers or instructional coaches | 19 / 58 (33%) |
| Artists or designers | 18 / 58 (31%) |
| Technologists or developers | 15 / 58 (26%) |
| Students | 10 / 58 (17%) |
| College / university educators | 9 / 58 (16%) |
| First-time CC Fest / Coding Camp participants | 29 / 58 (50%) |

Most respondents have some AI access and experience, but not all are
comfortable with direct use:

| Signal | Aggregate |
|---|---:|
| Use generative AI regularly | 41 / 58 (71%) |
| Tried a few things, still figuring it out | 10 / 58 (17%) |
| Barely used / unsure / actively choose not to use AI | 7 / 58 (12%) |
| Excited | 24 / 58 (41%) |
| Curious but cautious | 14 / 58 (24%) |
| Mixed feelings | 13 / 58 (22%) |
| Skeptical or opposed in their context | 7 / 58 (12%) |
| Have free or paid access to an AI text tool | 54 / 58 (93%) |

Top interests suggest the site should emphasize classroom translation,
creative practice, critique, and mechanism:

| Interest | Aggregate |
|---|---:|
| Designing classroom activities about AI | 34 / 58 (59%) |
| Making creative work with AI tools | 28 / 58 (48%) |
| Ethics of generative AI | 27 / 58 (47%) |
| How image generators work | 26 / 58 (45%) |
| Understanding AI well enough to have informed opinions | 25 / 58 (43%) |
| Bias, defaults, and model assumptions | 23 / 58 (40%) |
| How video generation handles time and motion | 20 / 58 (34%) |
| How language models generate text | 14 / 58 (24%) |
| Under-the-hood mechanics (attention, embeddings, CFG) | 8 / 58 (14%) |

Two planning clues stand out:

- **40% (23 / 58) are not sure yet** what they want to make or share. The site
  should help them choose a path before asking them to browse the full archive.
- **Deep mechanics is the smallest interest (14%).** Do not route undecided
  people there by default — send them toward classroom activities or creative
  making, the two largest interests.

## What Already Works

- **No-account core tools.** The homepage and README already state the right
  principle: no coding, no accounts, no live AI dependency for core teaching
  moments. That directly supports access, reliability, and cautious users.
- **Strong no-AI participation path.** The participant-facing
  [No-AI Pathway](../pages/no-ai-pathway.html) is useful for skeptical,
  access-limited, or classroom-restricted participants. It should stay short
  and reassuring.
- **Access and inequality framing.** [AI Access & Inequality](../pages/ai-access.html)
  answers the paywall/hardware concern and connects well to the Access Tiers
  tool. This is the single most emotionally charged theme in the responses — it
  should be promoted into primary nav, not buried in one route.
- **Recordings and async route.** [Camp 2026](../pages/camp-2026.html)
  already says sessions are recorded for registered participants and gives an
  async route by session. The *content* exists; the problem is that people are
  still asking, so the *message* isn't surfaced where they look (see below).
- **Younger learner adaptations.** [Adapting for Younger Learners](../pages/younger-learners.html)
  fits the K-12-heavy audience and the people who cannot ask students to use AI
  directly.
- **Critical readings.** [Further Reading](../pages/further-reading.html)
  is correctly weighted toward critique, fiction, philosophy, labor, data, and
  representation rather than another technical bibliography — exactly what
  respondents asked for. Surface and *invite* it; just keep it optional.
- **Hands-on extensions.** [Hands-On: Run Real Models](../pages/hands-on.html)
  is valuable for the build/code subgroup and people asking about local models,
  but it should remain optional.
- **Run support exists.** [This Saturday](../pages/this-saturday.html),
  [Session Link Sheet](../pages/session-links.html), and the
  [Run Console](../pages/run-console.html) are strong live-session support
  surfaces once people know they are participating.

## What Should Be Added

### A. Promote recordings & time zones to a site-wide message (highest priority)

This is the most-repeated worry and the cohort is globally distributed (~17%
flagged the time as difficult). The fix is surfacing, not new content:

- Add a one-line **"Recorded · async-friendly · global time zones welcome"**
  strip to the homepage hero and to [This Saturday](../pages/this-saturday.html).
- **Restate** the recording/async policy on the new Start Here page — do not
  only link to Camp 2026 for it, since that is exactly where it is currently
  buried.
- Keep the detailed recording/consent norms on [Camp 2026](../pages/camp-2026.html).

### B. Add a participant-first `Start Here` page

- **Path:** `pages/start-here.html`
- **Purpose:** help an interested person choose a route in three minutes.
- **Primary message (route-first):** "Pick the route that fits your situation
  now — you can switch later." Reassurance ("no account, install, coding, or
  final project idea required") sits below as a short secondary note, not the
  headline.
- **Tone:** practical and route-based; respects that most participants already
  use these tools. Avoid catalog language and avoid over-reassuring.

Recommended routes — **four** primary cards (down from six; younger-learners and
access are handled as cross-cutting notes rather than separate routes, to keep
the decision fast):

| Route | For people who... | Starter links | Cross-cutting note |
|---|---|---|---|
| **Classroom Activity** *(default for undecided educators)* | want a lesson, protocol, worksheet, or student-facing activity | Classroom Activity Builder · Younger Learners · No-AI Pathway | Works for ages 6–12 and restricted school settings |
| **Creative Maker** *(default for undecided makers)* | want images, video, prompts, or studio artifacts | Session 2 (Images) · Session 3 (Video) · Prompt Packs | Names the consent/labor/"is this stealing" tension and links AI Use + Consent + Further Reading |
| **Critical / Cautious / No-AI** | are skeptical, object to direct generation, lack access, or want critique first | No-AI Pathway · AI Access & Inequality · Further Reading | Covers the 12% skeptical/opposed and access-limited |
| **Mechanism Curious** *(the "go deeper" lane)* | want to understand what the machine is doing | Tokenizer · Count the Next Token · Diffusion Viewer | Smallest interest (14%) — keep available, not default |

Each route card should include:

- one sentence of fit text;
- three starter links maximum;
- the first tool or page to open;
- likely final artifact;
- one "skip for now" note.

**Default for the 40% who are unsure:** Classroom Activity (educators dominate)
or Creative Maker — the two largest interests. Do **not** default them to
Mechanism Curious.

### C. Add free / open / local-model guidance (don't just shelve it)

Affordability and free/local models were raised repeatedly and with feeling
(unaffordable subscriptions, no free API tier, no hardware, free student-safe
tools). Keep this **optional for onboarding** — but the need is real and should
be *answered as content*, not only deferred. Extend
[AI Access & Inequality](../pages/ai-access.html) with:

- genuinely free options and free tiers;
- free, student-safe tools for classroom use;
- a brief, clearly-optional pointer to local models (Ollama, ComfyUI/Stable
  Diffusion) for the build/code subgroup.

### D. One-line scope clarifier

A few respondents asked whether camp builds models from scratch. Add a single
FAQ-style line (Start Here and/or Camp 2026): *"We investigate how models
behave — we don't train them from scratch."* This prevents expectation mismatch.

### E. Update existing entry points

- **Homepage:** make "Start here" the primary participant CTA near Register /
  Browse tools, and add the recordings/async strip (§A).
- **Camp 2026:** point the "Before Session 1" section to Start Here, but **keep**
  the recording/timezone/async details on the page (Start Here restates the
  headline, Camp 2026 holds the detail).
- **Materials Directory:** add Start Here at the top of participant materials,
  before the full list.

## What Is Not Helpful Right Now

- **More tools.** The site already has 25 launch-ready tools. The
  interest data is broad, but the problem to solve is orientation, not tool
  coverage.
- **Required readings.** Readings are useful and explicitly requested, but should
  stay optional and *invited*, not mandatory. The site should not make cautious
  or busy teachers feel behind before Session 1.
- **Making onboarding depend on paid or live AI setup.** Do not require ChatGPT,
  Claude, Gemini, image generators, API keys, local model installs, or hardware
  to participate. *(Note: this is different from addressing free/local models as
  optional content — see §C. Don't require it; do answer it.)*
- **Beginner-pitched framing as the default tone.** Only ~10% are novices.
  "What is generative AI" framing under-serves the 71% who use it regularly.
  Keep reassurance available, but not as the headline.
- **Deep mechanics as a default route.** Attention, embeddings, CFG, and
  latent-space tools drew 14%. Keep them as an opt-in "go deeper" lane, not the
  first choice for undecided people.
- **Foregrounding internal docs.** Design audits, build logs, identity plans,
  and poster/design-lab pages are useful to contributors, but noisy for a
  first-time participant. Hide design-experiment pages (redesigns-index,
  subpages-remixed, doc-spectrum, session-acid, run-console) from primary nav.
- **The full tool grid as the first decision.** The catalog is excellent for
  exploration after orientation. It is too much as the first choice surface for
  someone who is not sure what they want to make.

## Implementation Plan

This is a static-site copy and navigation pass. No tool behavior, public API,
data schema, or participant-data handling changes are needed.

### 1. Surface recordings & time zones (do first — highest impact, lowest effort)

- Add the "Recorded · async-friendly · global time zones welcome" strip to
  `index.html` and `pages/this-saturday.html`.
- Ensure the recording/async headline is restated on the Start Here page.

### 2. Create `pages/start-here.html`

Build a concise participant onboarding page using the existing page chrome and
Field visual system.

Required sections:

1. **Hero (route-first):** "Start here: choose your route through camp."
2. **Recordings/async/time-zone line** (restated, not only linked).
3. **Four route cards:** the route table above, max three links per card, with
   younger-learners and access as cross-cutting notes.
4. **If you are unsure:** recommend Classroom Activity or Creative Maker as the
   default routes (not Mechanism).
5. **Scope clarifier:** "We investigate how models behave — we don't train them
   from scratch."
6. **Short reassurance note (secondary):** no account, install, coding
   background, required reading, or final project idea needed.

### 3. Extend `pages/ai-access.html` with free / open / local-model guidance

Add the free-tier / free student-safe tools / optional local-model content from
§C, clearly marked optional.

### 4. Update entry points

- `index.html`: add the recordings strip and a primary "Start here" CTA.
- `pages/camp-2026.html`: point "Before Session 1" to Start Here while
  preserving the timezone, recording, and async sections; add the scope line.
- `pages/materials.html`: put Start Here first under participant materials.

### 5. Keep existing support surfaces intact

Do not remove the full tool catalog, materials directory, readings, access
page, hands-on page, younger-learners page, or no-AI pages. The goal is to
make them easier to enter, not reduce the library.

### Acceptance Criteria

- A first-time participant can find a recommended path **and** the
  recordings/async policy from the homepage in one click.
- Start Here offers four clear routes; no route has more than three starter
  links; undecided users are pointed to Classroom Activity or Creative Maker.
- The recordings/async/time-zone message appears on the homepage and Start Here,
  not only on Camp 2026.
- `ai-access.html` includes at least one genuinely free option and one
  free student-safe classroom tool; any local-model pointer is marked optional.
- The page explicitly states that direct AI use, paid tools, installs, and a
  final project idea are not required.
- No individual form responses, names, emails, or identifiable comments appear
  anywhere in the plan or implementation.
- The Start Here, homepage, Camp 2026, and Materials pages are usable at 360px,
  768px, and 1280px.
- All added links resolve; `git diff --check` passes.
- **Success signal (post-launch):** using the existing GoatCounter analytics,
  confirm that Start Here visitors click through to at least one route page —
  i.e., the page routes people rather than dead-ending.
