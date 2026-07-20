# Session 3 Revision Plan — Video

**Session:** Saturday July 25, 2026 · 9–11 am PT<br>
**Updated:** July 19, 2026<br>
**Status:** Core site revisions implemented; guest, share, clip, and Google Form confirmations remain.

This is the working brief for turning the old 60–90 minute pilot into the 120-minute closing session of the core arc. It is grounded in the Session 1–2 transcripts, the Session 1 survey, two review passes, and the July 19 reconciliation of registration, attendance, RSVP, Classroom, and participation signals. Downloads files labeled “Session 2 Feedback” from the separate p5.js workshop are not part of this evidence base.

## Engagement-informed design decisions

The reconciled data does not support treating Session 3 as an advanced graduation test. The live room includes committed returners and people who are still figuring the tools out; stated enthusiasm did not reliably predict attendance. Bias and learned defaults were a strong live interest, while classroom activities were the largest stated interest in the broader registration pool. Chat participation was also uneven enough that chat volume cannot stand in for understanding.

Therefore Session 3 now:

- opens as re-entry: text / continuation / fluent ≠ true; images / conditioned sampling / plausible ≠ neutral; video / relationships across time / smooth ≠ evidence;
- asks for private writing or an anonymous poll before chat, then uses a precise chat prompt and two voluntary spoken responses;
- protects a default frozen-example lane that requires no generation and ends in a classroom-use sentence;
- selects opening and closing shares in advance or during studio rather than treating the fastest chatters as the room;
- measures completed bounded claims, tracking-versus-generation understanding, missing provenance evidence, and default-lane completion—not chat volume.

## The argument

Session 3 is the payoff of Sessions 1 and 2, not a third mechanism tour.

> Fluent text is not necessarily true.<br>
> Plausible images are not necessarily neutral.<br>
> Smooth video is not evidence.

Participants have performed a simplified version of one constraint each system faces: predicting continuations in Session 1, drawing a prompt out of noise in Session 2, and keeping a sequence coherent in Session 3. That is how the room earned the argument; the three lines are the argument.

The opening and closing slides now carry the three lines. The synthesis slide compares conditioning and generation problems across modalities and says explicitly: **same investigation method — not one universal architecture.** Participant quotations are not included until their exact wording and public-use permission are confirmed.

## Mechanism corrections

The current live materials use these bounded claims:

- “Small inconsistencies can compound when a sequence does not preserve the same relationships across time.”
- “Motion learned from patterns does not guarantee physics.”
- “This sequence no longer preserves the hand’s structure.”
- “The activity changes a reference condition; it does not reproduce a universal video-model architecture.”
- “A visible failure supports an observation. A causal explanation needs evidence about the particular model and workflow.”

The current materials no longer present “no memory of the whole clip,” “drift is forgetting,” “motion is interpolation, not physics,” or “every frame is a new prediction” as literal universal explanations.

### Live-discussion rules

- **Anchor mode is not locked noise.** A stable visual reference, locked noise, masks, reference conditioning, cross-attention controls, and compositing are technically distinct controls.
- **Glitches are not authentication.** Verification needs provenance, source context, corroboration, and, where available, content credentials. A convincing synthetic clip may have no visible glitch; authentic compressed footage may look strange.
- **Bound sustainability claims.** Video often uses substantial spatial-temporal data and compute, but costs vary by architecture, workflow, resolution, duration, and hardware.
- **Do not assign intent to the generator.** Ask what inputs the system receives, how the interface represents them, which controls affect generation, and what the surrounding platform adds.

## Conversation → curriculum map

| Existing conversation | Session 3 payoff |
| --- | --- |
| Shelly’s probable-answer / logical-answer riddle | Believability alone is not evidence that an event occurred. |
| The Session 2 doctor default | Ask what motion, work, camera, body, and setting appear when a video prompt is underspecified. |
| Ryan and Shane on control workflows | Compare previous-frame and fixed-anchor classroom conditions; ask what the control preserved. |
| Ryan’s “tools in a trench coat” frame | Map prompt, reference media, generator, editor, platform, and human judgment. |
| Sharleen and Angela on data, judgment, art, and consent | Extend the question to likeness, voice, performance, reference footage, and editing labor. |
| Shelly on veteran-propaganda imagery | Ask what provenance and corroboration are needed before treating a clip as documentation. |
| Session 1 alignment discussion | More coherent does not mean better; a coherent deepfake can be more persuasive and harmful. |
| Session 1 ELIZA lesson | Sounds caring ≠ understands; looks continuous ≠ happened. |

## Exact run of show

| Time | Block |
| --- | --- |
| 0–5 | Welcome, recording / likeness boundary, participation choices, and re-entry map |
| 5–12 | Two pre-arranged artifact shares, including one classroom-facing example |
| 12–17 | Private retrieval, poll or precise chat response, and two voluntary responses |
| 17–24 | Point Correspondence prediction |
| 24–47 | Temporal Telephone: five frames per run, A twice, one feature, B twice, then toggle |
| 47–57 | Curated failure hunt using the four-question verification protocol |
| 57–65 | System, labor, consent, and provenance map |
| 65–83 | One-tool studio: worked example, default frozen route, then optional advanced lane |
| 83–88 | Two participant claims selected during studio, including classroom transfer if available |
| 88–90 | Introduce Dr. Emily Thomforde |
| 90–108 | Guest talk |
| 108–116 | Q&A |
| 116–118 | Guest takeaway |
| 118–120 | Camp synthesis and optional Studio invitation |

The live deck timers total exactly 120 minutes. The facilitation source, rendered facilitation page, Session 3 overview, and `assets/session-runs.js` all use this same schedule.

## Participant deliverable

1. One observed failure with a timestamp, frame number, or exact comparison.
2. One carefully limited claim about what it might indicate.
3. One piece of source or provenance evidence still needed.
4. One responsible-use or causal boundary.
5. One sentence about how the protocol could be used with learners.

Sentence frame:

> At frame/time ___, ___ changed after ___. This suggests ___, although we would need ___ to test that explanation. I would / would not use this output for ___ because ___. Before treating the clip as evidence, I would need ___. With learners, I would ___.

Reusable questions:

1. What exactly changed?
2. What evidence supports that observation?
3. What would verify the clip’s source?
4. What can we not conclude?

## Guest segment — Dr. Emily Thomforde

Frame the segment around teaching complex systems honestly, not a general AI overview.

Send Emily:

- the Session 1 and Session 2 recaps;
- the three-line argument and comparison slide;
- the “still fuzzy” / standing-question list;
- the audience brief: the likely room includes people still figuring the tools out, bias / learned defaults are a strong live interest, and classroom transfer is a major stated need;
- a request for one beginner-readable example and one practical educator implication;
- the request for an 18-minute talk, eight-minute Q&A, and one-sentence takeaway;
- the private three-minute time signal and recording boundary.

Suggested listening question: **What would count as evidence that a system understands, rather than merely produces a convincing pattern?**

## Implementation status

### Complete in the repo

- [x] Temporal Telephone preserves separate Run A, B, and C sequences.
- [x] Run B and Run C begin from the exact same first-frame anchor as Run A.
- [x] Empty frames are blocked; in-progress drawing survives resize; resize no longer creates duplicate render loops.
- [x] Mouse / pointer drawing, run switching, playback, reset, and resize recovery pass an end-to-end browser test.
- [x] The deck opens and closes with the camp argument.
- [x] The synthesis slide compares modalities without claiming one architecture.
- [x] The deck totals exactly 120 minutes and introduces the guest at minute 88 for a minute-90 start.
- [x] The facilitation source and rendered page contain exact timing, mechanism language, prep, cut rules, studio lanes, guest handoff, and fallbacks.
- [x] The opening uses a re-entry map and private / poll participation before chat or speech.
- [x] Temporal Telephone uses exactly five frames per run, play-twice observation, one tracked feature, and A / B toggling.
- [x] The failure hunt, studio, assignment, and final claims use the four-question verification protocol.
- [x] The studio opens with a worked example and protects a no-generation default route ending in a classroom-use sentence.
- [x] `assets/session-runs.js` and the Session 3 overview use the new spine.
- [x] A six-route Session 3 assignment page is linked from the overview and deck.
- [x] A Session 3 Google Form builder and question blueprint include participation mode, completed outcome, central-claim retrieval, follow-up format, and August Studio questions.
- [x] The service-worker cache is bumped and includes the core Session 3 pages and tools.
- [x] Changed participant-facing pages pass 360 / 768 / 1280 browser checks with zero console errors and no horizontal overflow.

### Human confirmation or external setup still required

- [ ] Emily confirms the focus, 18-minute talk, eight-minute Q&A, name pronunciation, time signal, and recording boundary.
- [ ] Two participants opt in privately to the opening shares, at least one share is classroom-facing, and both know how their item will be labeled.
- [ ] One short, captioned or audio-independent failure clip is chosen, source-checked, and ready in one click.
- [ ] The Google Apps Script is run in the facilitator’s account; the returned prefilled URL is used to wire the site-native Session 3 feedback page.
- [ ] The feedback link is added to the Session 3 overview after the form endpoint and `entry.N` ids are known.
- [ ] A hard-stop cue is set for minute 88.

## Ready-to-run gate

The session is ready when all external confirmations above are complete and:

- the guest begins at minute 90;
- the two shares are voluntary and pre-arranged;
- the curated clip supports a provenance discussion without implying that glitches authenticate media;
- all participant-facing links are in one prepared chat message;
- the feedback form contains participation-mode, follow-up-format, “Smooth video is not evidence because…”, and August Studio questions;
- the frozen failure example and paper / facilitator-drawing fallback can be opened immediately.
