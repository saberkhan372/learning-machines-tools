---
layout: page
title: "Session 3 Script: Video"
---

# Session 3 Script — Video (How Machines Move)

A slide-by-slide facilitator script generated from the live deck
([`pages/session-3-deck.html`](../pages/session-3-deck.html)). It mirrors the on-screen content and
the presenter notes for each of the 15 slides. For the higher-level run-of-show, cut rules, and
mechanism-language guardrails, use the [facilitation guide](session-3-facilitation.md).

**Legend** — **On screen:** what the room sees · **Say:** verbatim lines · **Do:** your moves ·
**Room:** what participants do · **Watch:** the thing not to get wrong. Timings are cumulative
minutes and total exactly 120.

| # | Segment | Time |
|---|---|---|
| — | Welcome + re-entry | 0–5 |
| 00 | Two artifact shares | 5–12 |
| 01 | Synthesis: text → image → video | 12–17 |
| 02 | Point correspondence | 17–24 |
| 03 | Coherence Animator · solo A/B comparison | 24–47 |
| 04A | Failure hunt — identity | 47–52 |
| 04B | Failure hunt — physics | 52–57 |
| 05 | System map | 57–65 |
| 06 | One-tool studio | 65–83 |
| 07 | Two claims | 83–88 |
| 08 | Guest introduction | 88–90 |
| 09 | Guest talk | 90–108 |
| 10 | Q&A with Emily | 108–116 |
| 11 | Guest takeaway | 116–118 |
| 12 | Close + studio invitation | 118–120 |

---

## Welcome + re-entry · 0–5

**On screen:** *Across the camp, we've played the machine three ways* — Today we test one argument across text, images, and video.
*(The opening synthesis is already visible; the audience sees the camp journey before any recap begins.)*

**Say:**
> "You did not just hear explanations. Across the camp, we performed a simplified version of one constraint each system faces: continuation, spatial generation, and coherence across time."
>
> "Fluent is not the same as true. Plausible is not the same as neutral. Smooth is not the same as evidence."

**Do:**
- Screen-share the audience window only.
- Repeat the recording / likeness boundary and the camera-off, chat-only, private-writing, or watch-only participation choices.
- Welcome people back and name the 120-minute arc.
- Ask for an anonymous poll or private response before opening chat.
- Say the three lines once now; they return at the end.

**Room:**
- Choose camera, speech, chat, private writing, drawing, or watch-only participation.
- Respond privately or in the poll: text, image, or video — which modality feels least settled?

**Watch:** Do not turn this into a Session 1 lecture. The earlier sessions earned this argument; today tests its third line.

---

## 00 · Two artifact shares · 5–12

**On screen:** *What changed when you tested it?*
- Share 1 — show the artifact, then state one claim it supports.
- Share 2 — show the artifact, then name one boundary or surprise.
- Take-home: a finished claim, not a polished project, is the unit of progress.

**Say:**
> "Show us one thing we can point to, then tell us what it lets you claim."

**Do:**
- Invite the two pre-arranged participants; do not cold-call.
- Include one classroom-facing share, and do not choose only from the people most visible in chat.
- Give each person about three minutes: artifact, claim, boundary.
- Capture one phrase from each share for the next slide.

**Room:**
- Listen for the evidence behind each claim.
- Ask one clarifying question if time allows.

**Watch:** Hard stop at 12 minutes elapsed. Park technical troubleshooting in chat.

---

## 01 · Synthesis: text → image → video · 12–17

**On screen:** *One investigation, three warnings* — The output can feel convincing before it has earned your trust.
- Text: prior words → predict what comes next → fluent ≠ true.
- Image: prompt + references → make one still → plausible ≠ neutral.
- Video: prompt + references + time → keep frames consistent → smooth ≠ evidence.
- Task: which line did Session 1 or 2 make most concrete for you?
- Take-home: same investigation method — not one universal architecture.

**Say:**
> "The trilogy is how we earned the argument. These three lines are the argument."

**Do:**
- Give 30 seconds for private writing.
- Take one anonymous poll or precise chat response, then invite two voluntary spoken responses.
- Anchor fluent ≠ true in a Session 1 moment: the room split toward "walks" while the model matched the corpus.
- Anchor plausible ≠ neutral in the Session 2 default test: the underspecified prompt "a doctor" still produced specific choices about gender, race, setting, and camera.
- Name smooth ≠ evidence as today's hypothesis.

**Room:**
- Choose one line and name the prior activity that supports it, through any offered channel.

**Watch:** End retrieval at 17 minutes even if the conversation is lively; promise to return to the lines after the guest.

---

## 02 · Point correspondence · 17–24

**On screen:** *From a point to a path* — A tracker links evidence across existing frames. A generator must create new frames whose features still agree.
- Task: pick the ball's center — where did it go next, and what relation had to stay coherent?
- Definition: correspondence = finding the same point across different frames.

**In plain terms:** a tracker points at a dot that is already in the footage and follows it; a generator has to invent the next frame and make every dot still line up.

**Say:**
> "Point correspondence just means: which dot in the next frame is the same dot as this one?"
>
> "A still only has to be convincing once. A video has to keep agreeing with itself, frame after frame — so the relation between frames becomes part of the evidence."

**Do:**
- Open the Point Correspondence Lab; select the ball center.
- Take one prediction before revealing the route.
- Distinguish analysis from generation: a tracker estimates correspondence in existing frames; a generator produces new frames.

**Room:**
- Predict the point's destination.
- Name one relation that has to persist: position, size, identity, lighting, or camera.

**Watch:** Keep the mechanism bridge to seven minutes. It sets up the activity; it is not the main event.

---

## 03 · Coherence Animator · solo A/B comparison · 24–47

**On screen:** *One opening frame, two reference conditions* — Run A shows only the previous frame. Run B shows the shared opening anchor and the previous frame. The comparison is the lesson.
- Prompt: *a person at work*
- Task: draw nine times. Choose one feature. Play A twice, then B twice. Record what changed and what the analogy cannot prove.
- Take-home: small inconsistencies can compound when a sequence does not preserve the same relations across time.
- *Every participant opens Coherence Animator and completes the same guided solo A/B sequence.*

**In plain terms:** the fewer references each step can see, the faster small changes compound into drift; a steadier reference holds more in place. The activity shows that pressure — it does not reproduce any one system's architecture.

**Say:**
> "The tool changes one thing: what visual references stay available while you draw."
>
> "Run A gives you only the previous drawing. Run B also keeps the shared opening visible. Compare what those two conditions keep stable."
>
> "Real systems use many different architectures and controls. This human drawing comparison shows why references can matter; it does not reveal how one particular model works."

**Do:**
- Paste the Coherence Animator link and give a 60-second interface demo with prepared frames.
- Ask everyone to keep the tab open; the current build resets on refresh.
- Draw and lock the shared opening once. Run A then adds Frames 2–5 from the previous-frame ghost.
- Run B adds Frames 2–5 while the shared opening anchor and previous frame remain visible.
- Before playback, choose one feature. Use the guided button: A twice, then B twice at one speed.
- Collect one observation and one limit of the analogy.

**Room:**
- Complete the nine-drawing sequence individually.
- Choose and follow one feature across both runs.
- Record one exact change and one limit of the analogy.

**Watch:** Protect the full 23 minutes. Use Temporal Telephone only as the paper or facilitator-led fallback if the Animator cannot run.

---

## 04A · Failure hunt — identity · 47–52

**On screen:** *Find where identity breaks* — Scrub one short sequence and track a single relation instead of judging the whole clip by vibe.
- Task: vote on the first frame where the hand stops being structurally consistent.
- Take-home: drift is visible when small inconsistencies compound across time; "forgetting" is only a classroom shorthand.

**In plain terms:** "drift" is just small frame-to-frame inconsistencies piling up until a feature — like finger count — stops matching itself. We can see it happen; we cannot read its cause off the clip.

**Say:**
> "We can observe inconsistency here. Explaining its cause would require evidence about the particular model and workflow."

**Do:**
- Collect votes before revealing.
- Toggle onion-skin.
- Ask what evidence supports the word *drift*.

**Room:**
- Track one feature: finger count.
- Vote on the first break frame.

**Watch:** Do not imply every system generates independently frame by frame.

---

## 04B · Failure hunt — physics · 52–57

**On screen:** *Smooth motion can still be wrong* — Learned motion patterns can look continuous without obeying object permanence, anatomy, or physics.
- Task: name the first exact break. Then ask: what verifies the source, and what can we not conclude?
- Take-home: motion learned from patterns does not guarantee physics.
- *A teaching cartoon of common failure patterns, not measured model scores.*

**In plain terms:** motion can look perfectly smooth and still break object permanence or anatomy — learned motion patterns are not a physics engine. Smoothness is a look, not a proof.

**Say:**
> "Some systems interpolate or transform representations; others generate with temporal or spatiotemporal context. None of that makes visual smoothness proof of physical correctness."

**Do:**
- Ask which target the room would inspect first: hands, text, faces, or physics.
- Reveal physics as this example's inspection target; do not imply a score or ranking.
- Use the four-question protocol: what changed, what supports it, what would verify the source, and what can we not conclude?
- Connect the result to smooth ≠ evidence.

**Room:**
- Predict, reveal, then name the exact failure rather than saying "weird."

**Watch:** Avoid "the model has no physics." The defensible claim is that generated motion does not guarantee physical consistency.

---

## 05 · System map · 57–65

**On screen:** *A clip is also a system* — Describe only the parts this workflow lets us support; mark the rest unknown.
- Human: chose the prompt, references, clip, and edits.
- System: generated or transformed frames in this workflow.
- Not visible from the clip: source material and contributors.
- Production path: source/reference → generator or code → editor/compositor → platform.
- Provenance: what documents the chain? Consent: who gave permission?
- Take-home: a documented chain can improve provenance; it does not itself create permission.

**In plain terms:** the clip is the last visible step of a longer production chain. Mark any unseen source material or contributors as unknown rather than inferring them. Provenance records the chain; consent asks whether the people involved gave permission.

**Say:**
> "A provenance record — a trail of where a clip came from and who touched it — can document a chain. It cannot retroactively supply consent."

**Do:**
- Fill human action, machine action, and hidden contribution from the room.
- **Trace the production path aloud:** source/reference → generator or code-rendering system → editor/interpolator/compositor → platform; mark unknown stages.
- Add provenance aloud: what record would help someone inspect where the clip came from?
- Hold consent and provenance apart: documentation does not itself create permission.

**Room:**
- Name one human choice, one supported system action, and one part of the chain that remains unknown.

**Watch:** Eight minutes is enough because the room has already discussed labor and defaults in Sessions 1 and 2.

---

## 06 · One-tool studio · 65–83

**On screen:** *Start here: Video Failure Gallery* — Finish one claim before opening another tool.
- **Worked example** · Frame 4: the cup handle disappears. Evidence: frames 3 → 4. Boundary: cause unproven. Classroom move: pause and separate observation from explanation.
- Task: finish — exact break + evidence + bounded claim + missing source evidence + "With learners, I would…".

**Say:**
> "One finished claim beats ten open tabs."

**Do:**
- Read the worked example before releasing the room.
- Paste the tool links in chat.
- Default route: one frozen Failure Gallery example; no generation and no second tool required. Advanced only after the claim is complete: Coherence Animator, Point Lab, or Coherence Viewer.
- At minute 13 (of the studio), give a five-minute warning.
- Circulate with the four questions: what changed, what supports it, what verifies the source, and what can you not conclude?

**Room:**
- Choose one route.
- Finish one worksheet row before touring another tool.
- Add one sentence about how you could use the protocol with learners.

**Watch:** Do not extend the studio beyond 83 minutes; the guest handoff needs a calm runway.

---

## 07 · Two claims · 83–88

**On screen:** *What does your evidence let you say?*
- Claim 1 — observation, exact evidence, boundary.
- Claim 2 — observation, exact evidence, boundary.
- Take-home: strong claims name both the observed pattern and the boundary of the test.

**Say:**
> "A clip can support an observation without proving why the system produced it."

**Do:**
- Choose two volunteers during the studio instead of opening a general debrief. Do not rely only on chat visibility.
- Include one classroom adaptation if available.
- After each, ask only: what is the boundary?
- Thank the room and pivot to the guest at minute 88.

**Room:**
- Listen for the difference between observation and explanation.

**Watch:** Choose volunteers from the studio instead of opening a general debrief.

---

## 08 · Guest introduction · 88–90

**On screen:** *Dr. Emily Thomforde* — AI researcher and educator · PhD in Artificial Intelligence, University of Edinburgh · Reach University.
- Listening question: what would count as evidence that a system understands, rather than merely produces a convincing pattern?

**Say:**
> "Emily, we have been testing where convincing output outruns the evidence. We would love for you to take us from here."

**Do:**
- Give a two-minute introduction.
- Name the listening question, then hand over cleanly.

**Room:**
- Close tool tabs and listen with the evidence question in mind.

**Watch:** Pronounce *Thomforde* as confirmed with the guest before the session.

---

## 09 · Guest talk · 90–108

**On screen:** *Guest lens — intelligence, evidence, and education* — Listen for one idea that changes how you would test, teach, or describe an AI system.
- Task: write down one sentence you want to bring into the Q&A.
- Prompts to hold: What distinction is Emily asking us to make? What evidence would that distinction require?

**Say:**
> "We will hold questions for an eight-minute Q&A."

**Do:**
- Yield the floor.
- At 15 minutes, send a private three-minute signal if arranged.
- Capture two possible Q&A threads from chat.

**Room:**
- Listen and collect one question.

**Watch:** Do not interrupt to connect every point back to the deck; save synthesis for the final two minutes.

---

## 10 · Q&A with Emily · 108–116

**On screen:** *Questions that move the inquiry forward* — Ask about mechanisms, evidence, learning, or consequences — not a prediction contest.
- Backup questions: What did the text → image → video sequence make you reconsider? What would you want learners to test next? What evidence is usually missing when people claim that a model understands?

**Say:**
> "Let's take questions that help us investigate, not just forecast."

**Do:**
- Take participant questions first.
- Use one backup only if the room is quiet.
- Hard stop Q&A at minute 116.

**Room:**
- Ask one concise question.

**Watch:** Protect a final guest takeaway and closing callback.

---

## 11 · Guest takeaway · 116–118

**On screen:** *One sentence to carry forward* — What should this room keep testing after today?
- Emily: one closing thought · Room: one phrase in chat.

**Say:**
> "Emily, what is the one sentence you hope this room carries into its own work?"

**Do:**
- Invite Emily's takeaway.
- Thank her explicitly.
- Ask for one phrase in chat while moving to the close.

**Room:**
- Add one phrase you want to remember.

**Watch:** Keep this to two minutes; it creates the material for the final callback.

---

## 12 · Close + studio invitation · 118–120

**On screen:** *Convincing is not the same as trustworthy* — Fluent ≠ necessarily true · Plausible ≠ necessarily neutral · Smooth ≠ evidence.
- Take-home: keep the method — predict, change one thing, compare, name the human decision, and state what your evidence cannot prove.

**Say:**
> "Across the camp, we've played the machine three ways. Keep the investigation, not the mystique."

**Do:**
- Thank Emily and the participants.
- Invite people to the optional Studio / Showcase.
- Point to the session page and Video Test Report.
- After the call, copy the deck log into recap notes.

**Room:**
- Bookmark the session page.
- Bring one artifact and its evidence to the optional Studio if useful.

**Watch:** This is a callback, not a new synthesis. End at minute 120.

---

*This script is generated from the deck's slide data. If you change a slide's wording in
[`pages/session-3-deck.html`](../pages/session-3-deck.html), update the matching section here so
the two stay in sync.*
