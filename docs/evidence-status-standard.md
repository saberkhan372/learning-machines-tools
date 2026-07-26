---
layout: page
title: Evidence Status Standard for Recaps and Lessons
---

# Evidence Status Standard for Recaps and Lessons

> **Purpose:** Make the evidentiary status of every factual passage legible without turning Learning Machines into a formal academic course.
>
> **Applies to:** session recaps, lesson plans, decks, facilitation notes, tool explanations, activity debriefs, assignment pages, captions, and public program copy.
>
> **Default rule:** A reader should be able to tell what happened, who interpreted it, what is documented, what remains hypothetical, and what the activity cannot establish.

## The permanent standard

Every factual passage should identify its status as one or more of the following:

1. **Observed in the activity**
2. **Participant hypothesis**
3. **Facilitator interpretation**
4. **Guest's argument**
5. **Documented mechanism**
6. **Authored teaching simulation**
7. **Unknown or unverified**

These categories are not a ranking from weak to strong. They answer different questions.

- An observation can be precise without explaining a cause.
- A participant hypothesis can be intellectually valuable without being verified.
- A facilitator interpretation can organize the session without becoming a universal conclusion.
- A guest's argument can be important without becoming the program's official position.
- A documented mechanism can be reliable but limited to a particular architecture, model, interface, or date.
- A teaching simulation can make a relationship felt without reproducing a real system.
- An unknown can be the most honest and productive outcome of an investigation.

The editorial goal is not to eliminate interpretation. It is to preserve the chain from evidence to interpretation.

---

## 1. The seven evidence statuses

### 1. Observed in the activity

Use this status for something directly visible, audible, counted, recorded, or preserved in an artifact during the session.

Examples:

- A generated image included a white-coated doctor in a hospital setting.
- Four visible chat responses favored Team A.
- A participant's figure changed size between frames three and four.
- Run A contained five frames and Run B contained five frames.
- The browser displayed the participant-marked path across completed drawings.

An observation should describe what happened without quietly inserting a causal explanation.

Prefer:

> In the generated image, the doctor appeared older, male-presenting, and white.

Avoid:

> The training data made the model choose an older white man.

The first sentence is visible in the artifact. The second proposes a cause that the artifact alone cannot establish.

#### Language signals

- “We observed…”
- “The visible responses…”
- “In this output…”
- “At frame four…”
- “The transcript records…”
- “The saved artifact shows…”

#### Minimum evidence

At least one of:

- a timestamp;
- a frame number;
- a preserved output;
- a chat or transcript line;
- a count with a stated denominator;
- an activity state that can be reproduced.

---

### 2. Participant hypothesis

Use this status when a participant proposes an explanation, mechanism, implication, comparison, or next test.

Examples:

- A participant suggested that the anchor made the background easier to preserve.
- Shane connected held frames to implied intention in animation timing.
- Ryan wondered whether foreground/background separation mapped onto a model workflow.
- Judy proposed that the output relied on familiar stereotype references.

Participant hypotheses should remain attributed unless the claim is independently documented elsewhere.

Prefer:

> Ryan hypothesized that separating the foreground from the background might help explain the workflow.

Avoid:

> Video models separate the foreground from the background.

#### Language signals

- “[Name] suggested…”
- “One participant hypothesized…”
- “The room wondered whether…”
- “A possible explanation raised in discussion was…”
- “This prompted the question…”

#### Attribution rule

Use a participant's name, alias, or quotation only when the relevant consent covers that use. Otherwise use a bounded anonymous description such as “one participant” or “an animator in the room.”

Do not guess an identity when the transcript is ambiguous.

---

### 3. Facilitator interpretation

Use this status for the facilitator's synthesis, pedagogical reading, framing decision, or inference from multiple observations.

Examples:

- The facilitator interpreted the shared hallway compositions as evidence of familiar cultural conventions.
- The recap connects the Session 1 ELIZA discussion to the Session 3 claim that smoothness is not evidence.
- The lesson treats the activity's failure as a useful opening for discussing control and coherence.

A facilitator interpretation can be written in the site's voice, but it should be recognizable as interpretation rather than as a settled technical fact.

Prefer:

> Our interpretation was that the similar hallway compositions made a shared visual convention visible.

Avoid:

> The drawings proved that image models reproduce culture in exactly the same way humans do.

#### Language signals

- “Our interpretation…”
- “The recap reads this as…”
- “For teaching purposes, we used this to…”
- “The facilitator connected…”
- “This suggests a useful classroom question…”

#### Revision rule

Facilitator interpretations are revisable. If later evidence changes the reading, update the recap or add a visible correction note.

---

### 4. Guest's argument

Use this status for a guest's claims, framework, opinion, disciplinary position, or interpretation.

The guest segment is part of the workshop record, but it is not automatically the program's conclusion.

Prefer:

> Thomforde argued that there is not yet an evidence base showing that AI tools benefit students.

Prefer:

> She described symbolic processing as necessary for logic and reasoning and proposed neuro-symbolic systems as a likely next frontier.

Avoid:

> There is no evidence that AI benefits students.

Avoid:

> Symbolic systems are necessary for reasoning.

The avoided versions remove the speaker, scope, and argumentative status.

#### Language signals

- “[Guest] argued…”
- “[Guest] proposed…”
- “In [guest's] account…”
- “[Guest] described…”
- “[Guest] interpreted…”
- “A diagnostic [guest] offered was…”

#### Quotation rule

Use a short direct quotation when the wording itself matters. Otherwise paraphrase and attribute. Do not use a quotation to imply broader agreement than the session established.

When a guest cites research, distinguish among:

1. what the cited source documents;
2. how the guest interprets it;
3. how the facilitator connects it to the workshop.

---

### 5. Documented mechanism

Use this status for a technical or factual claim supported by primary documentation, a research paper, source code, a model card, a dataset card, or another appropriate authoritative source.

Examples:

- Classifier-free guidance combines conditioned and unconditioned predictions during sampling.
- A particular tool sends a request to the Wikipedia API when the user runs a search.
- A documented video-diffusion architecture processes spatial and temporal dimensions together.
- The site-native feedback page submits to a specified Google Forms `entry.N` field.

#### Required scope

A documented mechanism should identify, when relevant:

- the system or architecture being described;
- the version or date;
- whether the statement is general or model-specific;
- the primary source;
- the boundary of what the source establishes.

Prefer:

> In the original Video Diffusion Models paper, the authors extend image diffusion with spatial-temporal components for video.

Avoid:

> Every video model generates the whole clip jointly.

#### Source hierarchy

Prefer sources in this order:

1. source code or direct behavior inspection;
2. official technical documentation;
3. original research paper;
4. model card or dataset card;
5. authoritative institutional documentation;
6. high-quality secondary explanation.

Do not use an LLM's explanation as the sole source for another model's architecture.

#### Time sensitivity

Claims about products, prices, free tiers, interfaces, institutional roles, policies, and hosted services require a date or fresh verification. “Current as of…” is often more honest than a timeless sentence.

---

### 6. Authored teaching simulation

Use this status for a role-play, interactive tool, frozen example, drawing protocol, analogy, or constructed comparison designed to expose one relationship.

Examples:

- Count the Next Token is a small authored probability model.
- Human Diffusion Canvas is a drawing activity, not a diffusion model.
- Coherence Animator compares two human reference conditions; it does not reproduce a universal video architecture.
- A frozen failure clip is authored evidence for observation practice, not a benchmark result from a named model.

Every core simulation should state three things:

> **What this models**<br>
> The relationship or constraint the activity helps make visible.
>
> **What it does not model**<br>
> The ways the activity differs from a real system.
>
> **What would verify the claim**<br>
> The documentation, source inspection, or controlled experiment needed.

#### Language signals

- “This authored simulation…”
- “This teaching cartoon…”
- “The activity simplifies…”
- “The comparison makes ___ tangible, but does not reproduce…”
- “The browser displays the path the participant marked; it does not discover the motion.”

#### Simulation rule

Never allow a memorable activity sentence to become an unqualified architecture claim in the recap.

If participants “became the model,” immediately specify the narrower truth:

> Participants performed a simplified version of one constraint the system faces.

---

### 7. Unknown or unverified

Use this status when the evidence does not support a conclusion, the source is ambiguous, a technical detail has not been checked, or different explanations remain possible.

Examples:

- The transcript does not identify the speaker with enough confidence.
- The output does not reveal which training examples influenced it.
- The activity cannot distinguish practice effects from the anchor condition.
- A visual glitch does not establish whether a clip is synthetic.
- The current institution or title has not been confirmed.

Unknown is not a failure of the recap. It is often the point at which a good investigation begins.

#### Language signals

- “We could not verify…”
- “The source does not establish…”
- “This remains unknown…”
- “Several explanations remain possible…”
- “The activity cannot distinguish…”
- “We would need ___ to test that claim.”

#### Never fill gaps by confidence

Do not resolve an ambiguous speaker, cause, architecture, institutional affiliation, or consent condition by choosing the most plausible answer.

---

### Model-output provenance

“Pre-generated” is not a sufficient source label. It says when an output was used, not where it came from, what changed after generation, or whether it contains participant material.

For every genuine generated example, record:

1. **Product and model, if known.** Name both the interface or service and the model version when the provider exposes them.
2. **Date.** Record the generation date separately from the date the example was added to the repository.
3. **Exact prompt.** Preserve the complete input, including system instructions or prior context when they materially shaped the result.
4. **Relevant settings.** Record temperature, seed, aspect ratio, duration, reference media, tool mode, or other controls that affected the output. Use “not exposed” or “not recorded” rather than guessing.
5. **Completeness.** State whether the output is complete, excerpted, cropped, selected from multiple attempts, or one part of a longer exchange.
6. **Facilitator editing.** State whether spelling, formatting, wording, order, imagery, timing, or other content was changed after generation.
7. **Participant material.** State whether the prompt or output contains participant words, images, voice, likeness, work, or session records, and identify the applicable consent boundary.

Use one of these visible labels:

- **Authored teaching simulation** — rules, data, examples, or behavior were constructed by the facilitator; no claim is being made that the output came from a real model.
- **Frozen real-model output · model/date documented** — the original output is preserved and the model, product, date, prompt, relevant settings, completeness, editing status, and participant-material status are recorded.
- **Edited or excerpted model output** — a real-model output was shortened, selected, reformatted, composited, annotated, or otherwise changed; document both the source and the edit.
- **AI-assisted text · human-reviewed** — AI helped draft, organize, revise, or critique text that a human then reviewed and accepted responsibility for.
- **Participant-created artifact** — a participant made or supplied the artifact; identify any model use they disclosed and follow their credit and consent instructions.
- **Live external model** — the instrument sends material to an external model at use time; name the service, describe what is transmitted, and link to the provider’s terms or privacy information.

When the required record cannot be recovered, use the fallback label:

- **Provenance incomplete · do not attribute to a named model** — identify what is known, list the missing fields, and do not use the example as evidence about a particular product or model.

#### Interface rule

The provenance label must be visible where the output appears, not only in a README, source comment, or facilitator note. A details panel may hold the longer record, but the short label belongs beside the example.

#### Historical examples

Do not repair a historical provenance gap by inference. A repository commit date is evidence that text existed by that date; it is not the generation date. Fluent “LLM-like” prose is not evidence that a real model produced it. If the model, prompt history, editing status, or completeness is unknown, say so.

---

## 2. The basic writing sequence

When a passage moves from evidence to explanation, use this order:

1. **Observation:** What exactly happened?
2. **Status:** Who is proposing the explanation?
3. **Interpretation or mechanism:** What might or does explain it?
4. **Boundary:** What can this evidence not establish?
5. **Next verification:** What source or test would help?

Template:

> At frame/time ___, ___ changed. **[Observed in the activity]**
>
> ___ suggested that this might reflect ___. **[Participant hypothesis]**
>
> The activity cannot determine whether the cause was ___. **[Unknown or unverified]**
>
> Documentation of ___ or a controlled comparison of ___ would help test the explanation. **[Documented mechanism needed]**

The status labels do not need to appear literally in every public paragraph. The prose must nevertheless preserve the same distinctions.

---

## 3. How visible should the labels be?

Use three levels of visibility.

### Level A: explicit label

Use a visible chip, eyebrow, margin label, or bold phrase when:

- the claim is technically important;
- a simulation could be mistaken for a real model;
- a guest makes a contested or strong claim;
- the causal explanation is uncertain;
- the distinction is itself part of the lesson.

Suggested labels:

- `Observed`
- `Participant hypothesis`
- `Facilitator interpretation`
- `Guest argument`
- `Documented mechanism`
- `Teaching simulation`
- `Unknown / unverified`

### Level B: grammatical attribution

Use ordinary prose when attribution is enough:

> Shane observed…

> Thomforde argued…

> The original paper describes…

> Our interpretation was…

### Level C: section-level declaration

A whole section can declare its status once when all items share it:

> **What participants hypothesized**

> The ideas below came from the debrief. They are questions and possible explanations, not verified descriptions of model architecture.

Do not repeat a chip on every bullet when the shared status remains obvious.

---

## 4. Mixed-status passages

A single paragraph often contains more than one status. Split it when the transitions are easy to miss.

### Too compressed

> Run B's background was more stable because the anchor gave the model more memory, which is how video generators maintain coherence.

This sentence merges an observation, a causal interpretation, an anthropomorphic metaphor, and a universal mechanism claim.

### Status-preserving version

> Shane described the background in his Run B drawing as slightly more stable. **[Observed / participant observation]** He suggested that the opening-frame anchor helped him preserve details. **[Participant hypothesis]** Coherence Animator tests a human reference condition; it does not establish how a particular video generator represents or uses temporal context. **[Authored teaching simulation / unknown]** Architecture documentation would be needed to make that model-specific claim. **[Documented mechanism needed]**

### Editorial rule

If one sentence requires more than two evidence statuses, split it.

---

## 5. Recap workflow

### Step 1: Build an evidence inventory

Before drafting, list the available sources:

- recording;
- transcript or captions;
- chat log;
- participant artifacts;
- deck and presenter notes;
- tool state or exported data;
- feedback responses;
- guest slides;
- external technical sources;
- roster or consent records.

Record limitations beside each source. Automatic captions may miss names. Chat omits spoken participation. A transcript does not prove attendance by silent participants. A screenshot may omit what happened before or after it.

### Step 2: Create a claim ledger

Use a private working table:

| Draft claim | Status | Evidence/source | Scope | Attribution/consent | What it cannot establish | Action |
|---|---|---|---|---|---|---|
| Background appeared steadier in Run B | Observed / participant observation | Recording 1:12:00; participant share | One participant's drawing | Confirmed name use | Cause or general model behavior | Include with boundary |
| Anchor improves video coherence | Unknown as a general claim | Activity alone | Not architecture-specific | N/A | Model mechanism | Reframe or source |
| CFG combines conditioned and unconditioned predictions | Documented mechanism | Original paper | CFG-based diffusion sampling | N/A | All guidance methods | Cite and scope |

No factual passage should enter the public recap without a row or an equivalent editorial check.

### Step 3: Draft observations first

Write what the room did and saw before writing what it meant.

This reduces the temptation to retrofit every artifact into the planned lesson.

### Step 4: Add interpretations with owners

Name whether an interpretation belongs to:

- a participant;
- the facilitator;
- a guest;
- a cited source.

### Step 5: Add the simulation boundary

Every centerpiece activity needs at least one sentence stating what it does not reproduce.

### Step 6: Verify technical claims

Check architecture, terminology, affiliations, dates, titles, tool behavior, and external links against appropriate sources.

### Step 7: Audit quantifiers

Words such as these require explicit evidence:

- everyone;
- nobody;
- universally;
- most;
- all;
- never;
- always;
- proved;
- caused;
- safe;
- private;
- anonymous;
- offline;
- no data collected.

Replace them with a bounded description when the source is incomplete:

- “the visible responses favored…”;
- “participants who shared…”;
- “in this output…”;
- “the camp tools do not intentionally request…”;
- “prompts can remain local when configured…”

### Step 8: Publish corrections visibly

If the live explanation or an earlier recap was wrong, say what changed and why. Corrections model the workshop's method.

Recommended format:

> **Correction after source review:** During the session, CFG was described as a form of human-feedback alignment. It is a sampling method that combines conditioned and unconditioned predictions. The recap and lesson materials now use the corrected explanation.

---

## 6. Lesson-planning workflow

### Before the lesson

For every central claim, complete:

| Planning question | Answer |
|---|---|
| What will learners directly observe? | |
| What may they hypothesize? | |
| What interpretation will the facilitator offer? | |
| What mechanism is documented? | |
| What is authored or simulated? | |
| What must remain unknown? | |
| What source supports the mechanism? | |
| What sentence names the analogy's limit? | |

### During the activity

Use a four-stage prompt:

1. What did you notice?
2. What do you think might explain it?
3. What evidence supports that explanation?
4. What would you need to verify it?

Do not ask “What did the model learn?” when the activity cannot reveal training history.

### During the debrief

Sort contributions aloud or visually:

- **Observed:** “The hand became larger at frame four.”
- **Hypothesis:** “Maybe the previous frame pulled attention toward the hand.”
- **Mechanism needed:** “We would need system documentation or a controlled test.”
- **Unknown:** “This drawing activity cannot identify a model cause.”

This makes evidence status a participation structure rather than a disclaimer added afterward.

### In presenter notes

Use internal tags:

```text
[OBSERVED]
[PARTICIPANT HYPOTHESIS]
[FACILITATOR INTERPRETATION]
[GUEST ARGUMENT]
[DOCUMENTED MECHANISM]
[TEACHING SIMULATION]
[UNKNOWN / UNVERIFIED]
```

These tags can remain in speaker notes even when the audience slide uses plain language.

### On audience slides

Keep the text short but preserve status:

Instead of:

> Drift is the model forgetting.

Use:

> Drift is inconsistency across time.<br>
> This activity shows one simplified way changes can accumulate.

Instead of:

> The anchor gives the model more memory.

Use:

> A stable reference changes what participants can compare while drawing.<br>
> Real systems use different forms of temporal conditioning.

---

## 7. Reusable activity card

Every core activity or tool should answer:

### Status

`Authored teaching simulation` / `Frozen example` / `Real model` / `Worksheet` / `Role-play`

### Guiding question

What relationship is the activity designed to investigate?

### What participants can observe

List only visible or recordable evidence.

### What participants may hypothesize

List plausible questions without presenting them as answers.

### Documented mechanism

State the sourced technical bridge, including architecture and scope.

### What this does not model

Name the mismatch between the activity and a real system.

### What remains unknown

Name what the output or activity cannot reveal.

### What would verify the claim

Name the source, code inspection, model documentation, or controlled comparison required.

### Human decision

What must a learner, educator, creator, or institution decide after examining the evidence?

---

## 8. Modality examples

### Session 1: text and alignment

#### Observation

> The visible responses favored Team A, and participants named responsibility, specificity, and usefulness as reasons.

#### Facilitator interpretation

> The activity made human preference criteria visible.

#### Documented mechanism

> In systems trained with human preference data, human judgments can shape optimization targets. The exact process varies by model and training pipeline.

#### Unknown

> The activity does not reveal the preference-training process of a particular commercial chatbot.

### Session 2: image defaults

#### Observation

> An underspecified “doctor” prompt produced an image with particular choices of gender presentation, age, race, setting, camera angle, and wall text.

#### Participant hypothesis

> Participants connected those choices to familiar stereotypes and visual conventions.

#### Facilitator interpretation

> The output provided a useful default map: what was requested versus what the system supplied.

#### Documented-mechanism boundary

> Learned training patterns may influence the output, while tuning, filtering, interface defaults, prompt rewriting, and sampling may also contribute. One output cannot identify the causal contribution of each layer.

### Session 3: temporal coherence

#### Observation

> Participants created two five-frame sequences from the same opening drawing under different visible-reference conditions.

#### Participant hypothesis

> Some participants suggested that the anchor helped stabilize background details; others reported little improvement or different tradeoffs.

#### Authored teaching simulation

> Coherence Animator compares human drawing conditions. It is not a controlled model experiment and does not reproduce a universal video architecture.

#### Facilitator interpretation

> The activity made the cost of preserving relationships across time physically noticeable.

#### Unknown

> Because Run B came second, the comparison cannot separate the reference condition from practice, changed drawing strategy, or fatigue.

### Guest segment

#### Guest's argument

> Thomforde argued that gaps in evidence, technical understanding, and domain expertise allow hope or fear to become magical thinking.

#### Facilitator connection

> The recap connects that argument to the workshop's repeated distinction between persuasive output and warranted conclusion.

#### Boundary

> The guest's position is part of the session record; it is not presented as a settled conclusion shared by every participant or researcher.

---

## 9. Common failure patterns

### Observation promoted into cause

Bad:

> The face changed because the model forgot the character.

Better:

> The face changed between frames. Limited or inconsistent conditioning is one possible explanation; the clip alone does not establish the cause.

### Participant comment promoted into architecture

Bad:

> Models build the background before the character.

Better:

> One participant changed his own drawing order between runs and wondered whether foreground/background separation might appear in model workflows. That would require pipeline documentation to verify.

### Guest position promoted into consensus

Bad:

> Symbolic systems are required for reasoning.

Better:

> Thomforde argued that symbolic processing is required for logic and reasoning and described neuro-symbolic systems as a likely next frontier.

### Simulation promoted into literal mechanism

Bad:

> The model sees only the previous frame.

Better:

> Run A lets the participant see only the previous drawing. Real video systems differ in how they condition and process time.

### Platform behavior erased

Bad:

> No login means no student data is collected.

Better:

> The tool does not intentionally request a student account or identifying information. Hosting, fonts, analytics, and optional network services must be evaluated separately.

### Local inference made absolute

Bad:

> Nothing is sent anywhere.

Better:

> Prompts can remain local when the application is configured for local inference; downloads, update checks, telemetry, and integrations depend on the application and settings.

### Incomplete attendance made universal

Bad:

> Everyone chose Team A.

Better:

> The visible responses favored Team A.

---

## 10. Consent and evidence status

Evidence status and consent are separate checks.

A statement can be accurately observed and still be inappropriate to publish with a name. A participant can consent to recap inclusion without consenting to promotional use. An anonymous quotation can still be identifiable through context.

For every participant-related passage, verify:

1. Is the statement accurate?
2. Is the speaker identity certain?
3. Is the evidence status clear?
4. Does the consent cover this use?
5. Does the surrounding context reveal more than the participant approved?

“No response” should never be interpreted as affirmative permission.

---

## 11. Editorial language bank

| Status | Strong default verbs | Avoid unless demonstrated |
|---|---|---|
| Observed | showed, appeared, changed, selected, recorded, displayed | proved, caused, revealed the model's reasoning |
| Participant hypothesis | suggested, wondered, proposed, connected, hypothesized | established, demonstrated universally |
| Facilitator interpretation | interpreted, framed, connected, used as | proved, confirmed for all systems |
| Guest's argument | argued, proposed, described, contended, offered | is, proves, settles |
| Documented mechanism | documents, specifies, implements, reports, defines | always, every model, all AI |
| Teaching simulation | models, simplifies, makes visible, approximates | reproduces, is the same as |
| Unknown | remains unclear, cannot establish, could not verify | obviously, must be, probably is |

---

## 12. Pre-publication audit

### Evidence

- [ ] Every factual passage has a clear status.
- [ ] Observations are separated from causal explanations.
- [ ] Counts include a defensible denominator or are described as visible responses.
- [ ] Technical mechanisms are sourced and scoped.
- [ ] Product, policy, price, role, and affiliation claims were freshly verified.
- [ ] Unknowns remain visible rather than being resolved by guesswork.

### Attribution

- [ ] Participant hypotheses remain attributed.
- [ ] Guest arguments remain attributed.
- [ ] Facilitator interpretations are not presented as group consensus.
- [ ] Automatic-transcription names and quotations were checked.
- [ ] Ambiguous speakers remain anonymous.

### Simulations and metaphors

- [ ] Every authored simulation identifies itself.
- [ ] “What this models” is stated.
- [ ] “What it does not model” is stated.
- [ ] The recap does not silently promote the metaphor into architecture.
- [ ] A verification route is named for the central mechanism claim.

### Consent and trust

- [ ] Naming and quotation use match recorded consent.
- [ ] Promotional permission is not inferred from recap permission.
- [ ] No-response defaults are conservative.
- [ ] Privacy, locality, safety, and data-collection claims identify the actor and scope.
- [ ] Hosting and third-party services are not erased by site-level promises.

### Tone

- [ ] The prose remains readable and informal.
- [ ] Status is conveyed through attribution rather than excessive labels when possible.
- [ ] Corrections are direct and non-defensive.
- [ ] Uncertainty is framed as an invitation to investigate, not an embarrassment.

---

## 13. Minimum viable standard

When time is limited, every recap or lesson must still include:

1. one exact observation;
2. one explicitly owned interpretation;
3. one documented mechanism with scope;
4. one sentence naming the teaching simulation's limit;
5. one unknown or next verification step;
6. attribution and consent checks for participant or guest material.

If those six elements are present, the material can remain informal while still being trustworthy.

---

## 14. Short form for working notes

Use this shorthand while drafting:

```text
O — Observed in the activity
P — Participant hypothesis
F — Facilitator interpretation
G — Guest's argument
M — Documented mechanism
S — Authored teaching simulation
U — Unknown or unverified
```

Example:

```text
O: Run B's background line remained closer to the opening frame in one shared animation.
P: The participant thought the anchor helped preserve unimportant details.
S: The activity changes a human reference condition; it is not a video-model implementation.
U: Practice and drawing-order effects were not controlled.
M: Check the documented conditioning method before making a model-specific comparison.
```

---

## Final principle

> Learning Machines should not only teach people to question machine output. Its own recaps and lessons should demonstrate the same discipline.

The standard is successful when a reader can answer:

- What happened?
- Who thinks it means this?
- What is documented?
- What was simulated?
- What remains unknown?
- What would we need to verify next?

That chain is the project's central practice: perform the mechanism, inspect the evidence, bound the claim, and decide what humans do next.
