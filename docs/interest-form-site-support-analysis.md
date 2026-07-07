---
layout: page
title: Interest-Form Analysis & Site Support Plan
---

# Interest-Form Analysis & Site Support Plan

Status: **implemented — 2026-06-16**
Date: 2026-06-16
Source: "Learning Machines — Interest Form v3" responses, **58 prospective participants** (the
workbook's two hidden helper sheets inflate a raw row count to ~1,000; only the
`Form Responses 1` sheet holds real submissions).

This document is the data-grounded companion to
[Participant Support Plan](participant-support-plan.html). That plan proposes a
single `Start Here` orientation page; this one shows the cohort evidence behind
those recommendations and widens the scope to the rest of the site.

**Privacy:** aggregate only. No names, emails, locations, or identifiable
free-text quotes appear here. Open-ended responses are summarized as themes.

---

## 1. Who actually signed up

### Role (multi-select — totals exceed 100%)

| Role | Count | Share |
|---|---:|---:|
| K–12 teacher | 32 | 55% |
| Curriculum designer / instructional coach | 19 | 33% |
| Artist or designer | 18 | 31% |
| Technologist or developer | 15 | 26% |
| Student | 10 | 17% |
| College / university educator | 9 | 16% |
| "Curious learner — none of the above fits" | 9 | 16% |
| Community organizer | 5 | 9% |
| Parent or caregiver | 3 | 5% |

**Read:** educator-heavy, with a strong artist + technologist minority. Age
groups taught span TK / K–4 through college — including several who teach
learners **too young to use AI directly** (ages 6–12, TK–5).

### Geography

Global. Heavy New York and California clusters, plus participants across
Argentina, Spain (incl. Canary Islands), Italy, the Netherlands, France, Japan,
Brazil, Venezuela, India, Ireland, Scotland, Portugal, Mexico, and Hawaii.
**Many incompatible time zones** — this matters for logistics (§5).

### Experience & comfort

| Experience with generative AI | Count | Share |
|---|---:|---:|
| Use them regularly | 41 | 71% |
| Tried a few things, still figuring out | 10 | 17% |
| Barely used / unsure / actively don't use | 7 | 12% |

| Comfort level | Count | Share |
|---|---:|---:|
| Excited | 24 | 41% |
| Curious but cautious | 14 | 24% |
| Mixed feelings (depends on context) | 13 | 22% |
| Skeptical | 4 | 7% |
| Opposed in their context | 3 | 5% |

- **This is not a beginner audience** — 71% use gen-AI regularly; only ~10% are
  true novices.
- **~1 in 3 arrives with real reservations**, and 12% are skeptical or opposed.
  Critical framing is not optional for them.
- **93% already have access to an AI text tool**, so text-tool access is *not*
  the bottleneck — but image/video experience is patchier (21% have used no
  image/video tool at all; the most common is ChatGPT/DALL·E at 68%, Canva AI
  37%, Midjourney 25%).

### Top interests (pick up to 3)

| Interest | Share |
|---|---:|
| Designing classroom activities about AI | 59% |
| Making creative work with AI tools | 48% |
| Ethics (data, labor, consent, representation) | 47% |
| How image generators work (diffusion, prompts, defaults) | 45% |
| Understanding AI well enough to form informed opinions | 43% |
| Bias, defaults, and model assumptions | 40% |
| How video generation handles time and motion | 34% |
| How language models generate text | 24% |
| **Under-the-hood mechanics (attention, embeddings, CFG, latent space)** | **14%** |

**Read at the time:** pedagogy + ethics + image mechanics dominated. Deep math
looked like a real but **small** minority.

**Superseded 2026-07-07:** the final n=80 split in
[Final-Cohort Fix List](final-cohort-fix-list.html) shows the mechanics option was
almost certainly added mid-form: 0% of early respondents selected it, but **51%**
of late respondents did once they saw it. Do not cite the 14% line as the current
mechanics signal; treat under-the-hood interest as a visible go-deeper path, not
a niche appendix.

### Desired outcome

| What they want to make/share | Share |
|---|---:|
| Not sure yet — want to see the sessions first | 40% |
| A classroom activity or lesson plan | 28% |
| A model-behavior investigation | 22% |
| A creative piece | 10% |

The 40% "not sure yet" is the biggest planning clue: **help people choose a path
before asking them to browse the full archive.**

---

## 2. Recurring themes in the open-ended answers

Summarized as patterns (no individual quotes):

1. **Critical / intersectional reading list.** Multiple requests for readings
   that are *critical, intersectional, philosophical, or science-fiction* —
   explicitly contrasted with engineer-led workshops that offer "only technical"
   bibliographies.
2. **Affordability & global access.** Raised repeatedly and with feeling:
   subscriptions are unaffordable, APIs are expensive with no free tier, no
   hardware to run models locally, and a worry about being "left helpless" in a
   world that assumes AI access. This is the emotional core for several
   respondents.
3. **Free / open / local models.** Direct asks about hosting local LLMs, using
   models outside the paywalled big three, and tools like ComfyUI / Stable
   Diffusion — both for personal use and for **free student-safe tools**.
4. **Critical understanding vs. just using.** A consistent pedagogical worry:
   how to let students use AI to *augment* learning "without short-circuiting
   their understanding," framed around agency, identity, and constructionist
   making.
5. **Logistics confidence.** Repeated questions: *"Will sessions be recorded?"*
   and *"Do we need to read anything beforehand?"* Several flagged time-zone
   conflicts and a preference for recordings / async review.
6. **Applied niches** (lower frequency): building an "AI & Social Impact" course,
   AI & entrepreneurship, math visualizations, animation pipelines, game/music
   audio, speculative "physics via video prompts." Fascinating but too specific
   to build dedicated pages for.

---

## 3. What works — keep, and surface harder

The site already matches the dominant signals; the gap is mostly
**discoverability**, not content.

- **Mechanism-first / tool-first approach** maps directly to the top interests
  (image mechanics 45%, bias/defaults 40%, informed opinions 43%). This is the
  spine — keep it.
- **[AI Access & Inequality](../pages/ai-access.html)** is a near-perfect answer
  to the #1 ethical concern (affordability/inequality) — but it's buried.
  Promote it into primary nav and link from the homepage hero.
- **[Further Reading](../pages/further-reading.html)** answers the reading-list
  request and is already weighted toward critique, fiction, philosophy, labor,
  and representation — exactly what was asked for. Surface it.
- **[No-AI Pathway](../pages/no-ai-pathway.html)** and
  **[Younger Learners](../pages/younger-learners.html)** serve real, sized
  audiences here (12% skeptical/opposed; multiple TK–K4 teachers). Keep and link
  prominently.
- **Recordings already exist** ([Camp 2026](../pages/camp-2026.html) states
  sessions are recorded for registered participants) — but people are still
  asking, so the message isn't landing (see §5).
- **Classroom-activity tools** (Classroom Activity Builder, Model Card Builder)
  match the #1 interest and the #2 deliverable. Make them a headline path.

---

## 4. What to add (priority order, by evidence strength)

| # | Addition | Why (evidence) | Effort | Impact |
|---|---|---|---|---|
| 1 | **Prominent "Recordings & time zones" note** on homepage + This Saturday | Global cohort; 17% flag the time; repeated "will it be recorded?" The info exists but is buried on one page. | Low | High |
| 2 | **Surface `ai-access` + `further-reading` into primary nav / homepage** | Answer the two most-repeated worries (affordability, critical readings) with content you already have. | Low | High |
| 3 | **"Before the camp" / orientation page** (the `Start Here` page from the companion plan) | 50% are first-timers; several asked what to prepare; 40% "not sure yet." | Medium | High |
| 4 | **Free / open / local-model guidance** (extend `ai-access.html`) | Repeated, passionate asks: free tiers, free student-safe tools, local models (ComfyUI/SD/Ollama), API free tiers. Currently unanswered. | Medium | High |
| 5 | **Elevate a lesson-plan / investigation deliverable path** | 28% want a lesson plan, 22% an investigation, 40% want to "see first." | Medium | Medium |
| 6 | **Image-generation on-ramp** in `session-images.html` | 45% want image mechanics, but 21% have never used an image tool — open gently before going deep. | Low–Med | Medium |

For full design of item #3 (route cards, universal prep checklist, acceptance
criteria), see [Participant Support Plan](participant-support-plan.html).

### Implementation status (2026-06-16) — all six shipped

- **#1 Recordings & time zones** — "Recorded · async-friendly · global time zones
  welcome" strip added to `index.html` hero and `pages/this-saturday.html` hero;
  restated in the `pages/start-here.html` hero. Detail still lives on
  `pages/camp-2026.html`.
- **#2 Surface `ai-access` + `further-reading`** — `further-reading` was already
  in the homepage §05 materials; added an **AI Access & Inequality** row there
  too. (Kept out of the top nav bar to avoid crowding; it's now reachable from
  the homepage, the Start Here Critical route, and Materials.)
- **#3 Orientation page** — built `pages/start-here.html` (four routes), linked
  from the homepage hero CTA + §00 section, `pages/materials.html`, and
  `pages/camp-2026.html` §C.
- **#4 Free / open / local models** — already implemented on `pages/ai-access.html`
  §C and `pages/hands-on.html` (browser training, Ollama/LM Studio, free API
  tiers); not duplicated. Polish: a "For the classroom specifically"
  free/student-safe-tools callout was added to ai-access §C.
- **#5 Deliverable path** — handled via Start Here's per-route "you'll leave
  with" lines (lesson plan, investigation, critique, creative piece), pointing
  to the Classroom Activity Builder and the session/worksheet deliverables.
- **#6 Image-generation on-ramp** — added a "New to image generators? Start
  gently" callout near the top of `pages/session-images.html` pointing first to
  the Diffusion Step-Through Viewer.

§5 note: the design-experiment pages (`redesigns-index`, `subpages-remixed`,
`doc-spectrum`, `session-acid`, `run-console`) were already absent from primary
nav — they live only in the Materials "Design lab" group — so no nav change was
needed. `run-console` is intentionally kept as a facilitator surface.

---

## 5. What is not helpful right now — trim or de-emphasize

- **Mechanics note superseded.** This section originally said "Don't lead with
  deep math" because attention / embeddings / positional encoding / CFG drew
  only **14%** in the June 16 read. The final n=80 wave finding supersedes that:
  among respondents who saw the mechanics option, **51%** selected it. Keep
  mechanics visible in the front-door pathway and tool surfacing, while still
  avoiding a fifth required route or a new pre-camp tool sprint.
- **Don't pitch the landing page at beginners.** Only ~10% are novices; "what is
  generative AI" framing under-serves the 71% who use it regularly.
- **Consolidate the design-experiment pages.** `redesigns-index`,
  `subpages-remixed`, `doc-spectrum`, `session-acid`, `run-console` read as
  internal explorations — for the public audience they dilute the path. Hide
  from primary nav (the same consolidation move applied to the poster page).
- **Don't make readings or AI setup required.** Keep readings optional; do not
  make onboarding depend on paid tools, API keys, local installs, or hardware.
- **Don't build pages for one-off niches** (game music, animation
  vector-mapping, "new physics via video prompts"). Serve those via office hours
  or a discussion space, not site real estate.
- **Set scope expectations once.** A couple asked about "building models from
  scratch." A single FAQ line — *"we investigate how models behave, not train
  them from scratch"* — prevents mismatch.

---

## 6. Highest-leverage next steps

1. **Items #1 + #2** — surface recordings/time-zones and promote
   `ai-access` + `further-reading` into nav. Quick, high-impact, uses existing
   content.
2. **Item #3** — draft the "Before the camp" orientation / Start Here page.
3. **Item #4** — extend `ai-access.html` with free / open / local-model guidance.

### Acceptance criteria

- A first-time participant can find a recommended path and the recordings/async
  policy from the homepage in one click.
- `ai-access` and `further-reading` are reachable from primary nav.
- No individual form responses, names, emails, or identifiable comments appear
  in any committed file.
- Added/edited pages are usable at 360px, 768px, and 1280px.
- All added links resolve; `git diff --check` passes.
