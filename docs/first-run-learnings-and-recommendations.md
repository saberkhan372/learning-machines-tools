# Learning Machines — First-Run Learnings and Next-Run Recommendations

*Internal planning document · 2026-08-01 · Aggregate findings only; no participant names or identifiable quotations.*

**Status:** Recommended reference for planning the next Learning Machines cohort.

## Executive direction

The first run supports the program's central design: participants value learning
through simplified model constraints, making and comparing artifacts, discussing
what the evidence can support, and hearing from guests who connect technical work
to culture, power, identity, and purpose.

The next run does not need a wholesale redesign. It needs a clearer bridge between
three layers that participants sometimes experienced as one:

1. the activity they perform;
2. the model behavior or constraint the activity represents; and
3. the claims the activity cannot establish about a real model or generated output.

The most consistent demand is for **classroom-ready adaptation**. Participants do
not primarily want a larger catalog of tools. They want bounded activities they can
understand, teach, modify, and run with learners under different access conditions.

> **Next-run principle:** keep the embodied activities, peer comparison, guest
> voices, and flexible participation. Strengthen task instructions, analogy
> boundaries, evidence reasoning, and classroom transfer.

---

## Immediate follow-ups (August 2026)

These items come from the same feedback but cannot wait for next-run planning.
They concern the live site and the August Studio / Showcase, which fall in the
gap before any P0 work begins.

1. **Completed — verify and retain the ELIZA route's therapy framing.** A Session 1
   participant flagged that the ELIZA-versus-LLM comparison could imply that an
   LLM would make a better therapist, and asked for an explicit caution plus a
   sycophancy reading. The live tool now includes that warning and reading. Three
   respondents chose this route as their follow-up, so preserve the framing in
   future revisions and verify it during site QA.
2. **Use Saturday, August 15 as the feedback-supported Studio / Showcase
   candidate.** One respondent expressed a firm preference for August 15; every
   other respondent who answered said either date works. Confirm the date only
   after facilitator availability and the existing showcase-readiness gates are
   met.
3. **Send Studio / Showcase details before asking for commitment.** Provide a
   short slot description and an artifact template. One likely presenter answered
   "maybe" specifically because they wanted more detail first.
4. **Tell the pack requesters the pack exists.** Two Session 3 respondents chose
   "a downloadable classroom activity pack" as the follow-up they would actually
   use. The next-word pack is already published at
   [`pages/classroom-pack-next-word.html`](../pages/classroom-pack-next-word.html);
   point respondents to it in the recap or follow-up message.

---

## 1. Evidence base and limits

This document draws primarily on three session-feedback exports:

- **Session 1 — Human Language Model:** 6 substantive response records after
  excluding 2 clearly labeled test submissions.
- **Session 2 — How Machines Imagine:** 5 substantive response records.
- **Session 3 — How Machines Move:** 3 substantive response records after
  excluding blank and timestamp-only submissions. The usable responses came
  from a revised question set; the earlier question columns received no answers.

That produces **14 substantive response records**, not necessarily 14 unique
people. Two repeat names can be identified, but anonymous responses prevent a
reliable unique-participant count or longitudinal analysis.

These records are a small, self-selected sample. They are useful for finding
recurring design signals, specific friction, and hypotheses to test. They do not
establish response rates, causal effects, or representative learning outcomes.

Additional cautions:

- The three forms did not use identical questions.
- Session 3 did not collect the same direct mechanism-explanation prompt used in
  Sessions 1 and 2.
- "Clearer than before" is self-reported change, not a pre/post assessment.
- Session 1 included more respondents who said they already knew much of the
  material; this likely produced some ceiling effects.
- Recommendation and satisfaction measures should not be treated as substitutes
  for evidence of conceptual understanding.

---

## 2. What worked and should remain central

### 2.1 The program is valued

Across the 14 substantive response records:

- 12 respondents said they would **definitely** recommend the program;
- 1 said **probably**;
- 1 was **not sure yet**;
- no respondent selected a negative recommendation response.

Participation access was also strong:

- 12 reported participating in the way they wanted;
- 2 reported "mostly" being able to participate;
- camera-off, chat, watch-only, and recording-supported participation were
  generally treated as legitimate modes rather than lesser substitutes.

Pace was broadly successful. Session 1 received 5 "about right" responses and
1 "it varied" response; Session 2 received 5 of 5 "about right" responses.
Session 3 combined pace and access in a different question, so it should not be
compared as a separate pace measure.

**Implication:** do not slow or restructure the entire program based on isolated
comments. Add targeted scaffolding where participants lose the task or the
conceptual bridge.

### 2.2 Making and comparing artifacts is the pedagogical engine

The strongest activities gave participants something observable to make,
manipulate, compare, or discuss:

- **Session 1:** temperature, attention, alignment, and the debrief discussion;
- **Session 2:** diffusion as denoising, staged drawing, exports, and comparison;
- **Session 3:** assignment reviews, participant projects, Run A/Run B animation,
  and group comparison.

By Session 3, assignment reviews and participant projects were the only activity
selected by all three respondents as producing a useful insight or question.

**Implication:** participant work is not preliminary administration. It is part of
the curriculum. Preserve time for showing, comparing, and interpreting artifacts.

### 2.3 Session 2 produced the clearest artifact-completion evidence

All five Session 2 respondents reported exporting an artifact. All five selected
diffusion as denoising as a point that clicked, and four of five reported greater
clarity on the diffusion concept.

This does not prove that the Human Diffusion Canvas was the program's "best"
activity, because the sessions and assignments were not equivalent. It does show
that a concrete artifact, visible sequence, and explicit export can support high
completion.

**Implication:** design every core activity around an observable result and a
clearly named completion state.

### 2.4 Guest voices are part of the curriculum

Guest-response prompts consistently produced thoughtful writing about identity,
purpose, uncertainty, social structure, gender, relationships with AI, and the
human values surrounding technical systems.

The guest segments appear to provide a form of reflection that the mechanism
activities do not produce on their own.

**Implication:** keep the interdisciplinary guest model. After each guest segment,
add a short bridge back to the session's investigation:

- What changed in how we interpret the activity?
- What new value, power, labor, or evidence question does the guest raise?
- What would we test or teach differently because of it?

### 2.5 The access design is working

Participants successfully used live Zoom, chat, watching, camera-off participation,
and recordings or recaps. Feedback indicates that watch-only and camera-off routes
supported participation, including accessibility needs.

**Implication:** retain multiple legitimate participation modes and say explicitly
that observing, chatting, using the recording, or participating without a camera
all count as full routes through the program.

---

## 3. Recurring learning pattern

### 3.1 Concrete processes land more readily than surrounding claims

The strongest self-reported clarity tended to concern a visible or manipulable
process:

| Session | Stronger signals | Weaker or unresolved signals |
|---|---|---|
| Text | Attention and temperature | Prompt interpretation, context/memory, and converting partial understanding into a confident explanation |
| Images | Pixel data and diffusion as denoising | Human labeling beneath generation and how text guides decisions during denoising |
| Video | Coherence across time and stable references | Analogy boundaries and why smooth output is not evidence that an event happened |

The cross-session gap is therefore not simply "later modalities are harder."
It is that participants more readily grasp a process they can perform or observe
than the human infrastructure, causal uncertainty, and evidentiary limits around
that process.

This distinction matters because the program's ethical and critical goals depend
on those surrounding layers.

### 3.2 An engaging analogy does not guarantee model understanding

The simulations are teaching analogies, not reproductions of model architecture.
Most respondents appeared to understand at least part of that distinction, but it
was not equally secure across the cohort.

One Session 3 respondent reported clearer understanding of coherence and stable
references while also saying the activity did not substantially improve their
understanding of the models. That is not contradictory. It distinguishes learning
an observation vocabulary from learning a mechanism.

**Implication:** every activity needs an explicit transition from analogy to model:

1. **What we performed or manipulated**
2. **What real constraint or behavior this helps us notice**
3. **What the real system does differently**
4. **What additional evidence would be needed to support a mechanism claim**

### 3.3 Conceptual uncertainty and task confusion are separate problems

Some participants understood the task but remained uncertain about the concept.
Others lost the task because instructions or expected outputs were unclear.

Conceptual uncertainty included:

- how prompts and conversation context affect generation;
- how text influences denoising at each step;
- the role of human labels and datasets;
- the difference between a visible artifact and evidence about its cause;
- uncertainty about many moving parts even after participating.

Task confusion included:

- undefined prompt-set language in the Text Experiment Board;
- uncertainty about what "Copy as markdown" copied or where it should be pasted;
- misunderstanding what the Human Diffusion Canvas would automate;
- not knowing what to compare in the spatial-reasoning investigation;
- difficulty thinking during a breakout structure with competing conversation.

**Implication:** clearer instructions will not solve every conceptual problem, but
they will prevent operational ambiguity from consuming the attention needed for
conceptual learning.

---

## 4. Session-specific lessons

### Session 1 — Human Language Model

**Keep**

- Temperature and attention activities
- Alignment discussion
- Hands-on browser tools
- Technical concepts connected to social and political structures
- ELIZA comparison as a critical discussion route

**Improve**

- Give the Text Experiment Board a worked example and explicit definitions for
  every prompt-set field.
- Rename ambiguous actions such as "Copy as markdown" to say what is copied and
  where the participant should use it.
- Add a visible completion state: draft a claim, attach evidence, and name a
  limitation.
- Include the requested safety framing around AI therapy, anthropomorphism, and
  sycophancy in the ELIZA-versus-LLM route.
- Add a confidence-calibration moment. Some responses demonstrated more partial
  understanding than the respondent believed they had.

### Session 2 — How Machines Imagine

**Keep**

- Diffusion as denoising
- The Human Diffusion Canvas
- Exporting a concrete artifact
- Comparing participants' drawings with one another and with model output
- The connection between image generation and social or cultural defaults

**Improve**

- State exactly what the participant must draw at each stage and what the tool
  will or will not do automatically.
- Provide one completed miniature example before the live activity.
- Make the comparison target explicit: what feature, default, failure, or change
  should the participant inspect?
- Strengthen the human-infrastructure layer: WordNet, ImageNet, labeling, data
  labor, and the difference between pixels and socially named categories.
- Explain more directly how prompt information conditions a denoising process
  without suggesting that the teaching activity reproduces that architecture.

### Session 3 — How Machines Move

**Keep**

- Participant-project and assignment review
- Run A / Run B comparison
- Sharing and comparing animations
- Text-to-image-to-video synthesis
- Timing, keyframes, layers, and foreground/background as observation vocabulary
- The interdisciplinary guest discussion

**Improve**

- Add a concise explanation of where Coherence Animator stops being a model of
  video generation.
- Use one generated-video example to distinguish observation, possible cause,
  and supported evidence.
- Revisit the claim "smooth video is not evidence" with a worked case rather
  than a statement alone.
- Give participants more scaffolded transfer from animation concepts to classroom
  use, especially for younger learners.
- Restore a mechanism-oriented exit prompt so Session 3 produces evidence
  comparable to Sessions 1 and 2.

---

## 5. The strongest demand: help participants teach this

Classroom adaptation appears across all three sessions and across several kinds
of questions:

- requests for coding examples appropriate for students;
- interest in adapting the prediction game;
- interest in building an ELIZA comparison;
- plans to adapt the marker/diffusion activity;
- requests for useful student exercises;
- demand for a downloadable classroom activity pack;
- proposed lesson plans, professional development, curriculum integration, and
  work with younger learners.

This is stronger than a general request for more content. Participants want a
translation layer between experiencing an activity and facilitating it.

A first pack already exists: the next-word classroom pack published after the
camp ([`pages/classroom-pack-next-word.html`](../pages/classroom-pack-next-word.html)).
The gap is coverage, not existence — the image (marker/diffusion) and video
activities drew explicit classroom-adaptation interest but have no equivalent
pack yet. New packs should follow the published pack's structure.

### Required components for each classroom-ready activity

Every activity intended for transfer should include:

- target audience and adaptation range;
- learning objective;
- materials and setup;
- exact facilitation sequence;
- a worked example;
- estimated 15-, 30-, and 60-minute routes where appropriate;
- what the activity models;
- what it does not model;
- discussion and debrief questions;
- an observation/evidence/limitation sentence frame;
- No-AI or no-account route;
- access, privacy, consent, and age considerations;
- a printable participant artifact;
- optional technical extension for participants who want to build or inspect code.

---

## 6. Next-run activity standard

Every core tool or activity should answer the following before a participant
begins:

### What you will do

Use a concrete verb: predict, sort, draw, compare, label, animate, or test.

### What you will produce

Name the artifact: a distribution, claim, drawing, comparison, animation,
annotation, or classroom adaptation.

### What to compare

Identify the exact variable or relationship participants should inspect.

### What this activity helps model

State the simplified constraint or behavior in plain language.

### What this activity does not establish

Name architecture, training, causation, understanding, truth, consent, or other
claims the activity cannot support.

### One worked example

Show a small complete example before asking participants to improvise.

### What counts as finished

Make completion visible and attainable within the live session.

The shared participant claim frame should remain:

> I observed ___. The evidence is ___. This suggests ___, but it does not
> establish ___. My next test would be ___.

Both the "does not establish" panel and the claim frame should use the applicable
evidence statuses and terminology already defined in
[`evidence-status-standard.md`](evidence-status-standard.md) rather than
introducing a parallel vocabulary.

---

## 7. Recommended next-run learning sequence

Use the same investigation rhythm across modalities so participants learn the
method as well as the content:

| Phase | Purpose | Participant output |
|---|---|---|
| Orient | Name the question, access routes, and completion target | Chosen route or prediction |
| Perform | Experience one simplified constraint | Small artifact |
| Compare | Put two or more outcomes beside one another | Observation notes |
| Explain | Connect the activity to the real model behavior | Bounded mechanism statement |
| Limit | Name what the analogy or output cannot prove | Limitation statement |
| Contextualize | Connect the mechanism to labor, data, power, identity, or consent | Critical question |
| Transfer | Adapt the activity or insight for another audience | Classroom or practice plan |
| Reflect | Capture what changed and what remains unresolved | Exit response |

This sequence can be distributed across the session rather than presented as a
single lecture. The important change is that **Explain** and **Limit** must not be
left implicit after an engaging activity.

---

## 8. Priority recommendations

### P0 — Before recruiting the next cohort

1. **Adopt the next-run activity standard** across all core tools and worksheets.
2. **Add analogy-boundary and evidence panels** to the three anchor activities.
3. **Extend the published next-word pack to the image and video activities**,
   dry-running each pack before it is promised during recruitment.
4. **Create a stable cross-session evaluation core** before building new forms.

(The completed ELIZA therapy/sycophancy framing fix is recorded in the immediate
follow-ups at the top and should remain part of site QA.)

### P1 — Before each session

1. Test every activity using only its visible instructions.
2. Confirm one worked example and one clear completion state.
3. Prepare the observation → explanation → limitation debrief.
4. Select one participant artifact or facilitator-created example for comparison,
   applying the consent rules in
   [`consent-recap-protocol.md`](consent-recap-protocol.md).
5. Prepare the guest-to-investigation bridge question.
6. Publish the recap and classroom-transfer route in a predictable format.

### P2 — During and immediately after the cohort

1. Treat assignment review as a recurring learning segment.
2. Offer observer, chat, camera-off, live, and async routes without ranking them.
3. Track where participants stop: orientation, activity, comparison, claim, or
   transfer.
4. Review feedback after every session while the next session can still change.
5. Record implementation notes separately from participant outcome claims.

---

## 9. Feedback and evaluation redesign

Create a fresh response destination or normalized dataset for the next run rather
than allowing form-version columns to accumulate in one export.

### Stable core questions for every session

Keep these wordings and response scales identical across sessions:

1. Could you participate in the way you wanted?
2. How was the pace?
3. Which activity produced a useful insight or question?
4. What did you observe?
5. What is one possible explanation?
6. What does the evidence not establish?
7. How ready would you feel adapting one activity for another audience?
8. Which follow-up would you actually use?
9. Would you recommend the session?
10. What remains fuzzy or worth testing next?

Add no more than three modality-specific clarity items per session. A shorter,
stable instrument will produce more comparable evidence than a long form whose
questions change substantially between sessions.

### Longitudinal option

If cross-session learning matters, invite participants to create a private,
non-identifying repeat code. Do not infer identity from names or email addresses
in the analysis.

### Measures to review after the next run

- substantive feedback count and known session attendance denominator;
- activity start and completion counts;
- clarity by concept, with baseline familiarity;
- quality of observation/explanation/limitation responses using a simple rubric;
- classroom-adaptation confidence and actual follow-up use;
- participation mode and access barriers;
- tool or instruction drop-off point;
- guest-segment connection to the session investigation;
- recommendation as a satisfaction measure, reported separately from learning.

---

## 10. Decisions not supported by the current feedback

Do not claim from this first-round dataset that:

- later sessions were objectively less effective;
- the cohort became progressively less familiar through Session 3;
- a particular activity caused higher learning;
- general pacing was too fast;
- the response-count decline proves attendance attrition or survey fatigue;
- all participants understood the model mechanisms;
- recommendation rates demonstrate learning outcomes;
- the feedback represents the full registered cohort.

Treat these as questions for the next run, not conclusions from the first.

---

## 11. Definition of a successful next run

The next run should preserve the first cohort's enthusiasm while producing
stronger evidence that participants can:

- perform and explain one simplified constraint in each modality;
- distinguish a teaching analogy from a literal architecture claim;
- separate observation, possible cause, and supported evidence;
- identify human decisions, labor, defaults, and ethical concerns around a model;
- complete a visible artifact without losing the task to unclear instructions;
- adapt at least one activity for a classroom, studio, community, or critical
  no-AI setting;
- participate through a mode that fits their access needs;
- leave with a meaningful next step rather than an undifferentiated resource list.

> **Bottom line:** the first run validates the method and the audience need. The
> next run should make the method more explicit, the activities easier to enter,
> the evidence claims more disciplined, and the classroom-transfer path more
> complete.
