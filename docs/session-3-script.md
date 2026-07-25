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
| 03 | Temporal Telephone | 24–47 |
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
- Task: which line did Session 1 or 2 make most concrete for you?
- Take-home: same investigation method — not one universal architecture.
- *Three compact statements on screen: fluent ≠ true, plausible ≠ neutral, smooth ≠ evidence.*

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
- Take-home: correspondence asks what matches; coherence asks whether a generated sequence keeps those relations believable.

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

## 03 · Temporal Telephone · 24–47

**On screen:** *Change one visibility condition* — Run A shows only the previous frame. Run B keeps the same first frame as an anchor. The comparison is the lesson.
- Prompt: *a person waving*
- Task: lock exactly five frames in each run. Follow one feature, compare A / B, then name the analogy's limit.
- Take-home: small inconsistencies can compound when a sequence does not preserve the same relations across time.
- *Use the full Temporal Telephone tool in a separate tab; the deck strip is only a fallback.*

**In plain terms:** the fewer references each step can see, the faster small changes compound into drift; a steadier reference holds more in place. The activity shows that pressure — it does not reproduce any one system's architecture.

**Say:**
> "Run A gives each drawer only the previous frame. Run B also keeps the first frame visible as a fixed reference. You are comparing what those two reference conditions keep stable."
>
> "This activity deliberately restricts the references available to each drawer. Real systems vary: some use more frames of context (temporal context), some are held to a reference image (reference conditioning), some process space and time jointly (spatiotemporal processing), and some add editing controls."
>
> "The comparison shows why references can matter; it does not reveal one universal video architecture."

**Do:**
- **Give a 60-second interface demo with prepared frames**, then assign roles: **Drawer** locks a frame, **Feature Tracker** follows one named relation, **Evidence Recorder** logs the first exact change and frame number.
- Run A: prompt hidden, previous frame only, exactly five locked frames.
- Play A twice, then ask everyone to choose one feature to follow.
- Run B: reveal the prompt, use the fixed first-frame anchor, and lock exactly five frames.
- Play B twice. Toggle A / B while collecting observations about the chosen feature.
- Ask what this classroom constraint leaves out. Playback speed is already shared by the tool.

**Room:**
- Take a role — draw a frame and pass, track the chosen feature, or record evidence.
- Watch one chosen feature across both runs.
- Name one observation and one limit of the analogy.

**Watch:** Protect the energy here. If the room is engaged, keep the full 23 minutes and compress commentary inside the failure hunt.

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
- Ask for predictions before reveal.
- Name the meters as a discussion device, not benchmark data.
- Use the four-question protocol: what changed, what supports it, what would verify the source, and what can we not conclude?
- Connect the result to smooth ≠ evidence.

**Room:**
- Predict, reveal, then name the exact failure rather than saying "weird."

**Watch:** Avoid "the model has no physics." The defensible claim is that generated motion does not guarantee physical consistency.

---

## 05 · System map · 57–65

**On screen:** *A clip is also a system* — Model, interface, training data, workers, prompter, subject, editor, and platform all shape what appears.
- Task: map one human decision and hidden contribution. Then ask what would verify the source and what the clip cannot establish.
- Take-home: the output hides a chain of labor and decisions; provenance makes that chain easier to inspect.

**In plain terms:** the clip is the last step of a chain — prompter, model, editor, platform, and the uncredited people whose footage taught it to move. Provenance is the paper trail of that chain; it records who and what, not whether anyone consented.

**Say:**
> "A provenance record — a trail of where a clip came from and who touched it — can document a chain. It cannot retroactively supply consent."

**Do:**
- Fill human action, machine action, and hidden contribution from the room.
- **Trace the production path aloud:** source/reference → generator or code-rendering system → editor/interpolator/compositor → platform; mark unknown stages.
- Add provenance aloud: what record would help someone inspect where the clip came from?
- Hold consent and provenance apart: documentation does not itself create permission.

**Room:**
- Name a worker, subject, dataset contributor, editor, or platform decision that the clip hides.

**Watch:** Eight minutes is enough because the room has already discussed labor and defaults in Sessions 1 and 2.

---

## 06 · One-tool studio · 65–83

**On screen:** *One tool, one finished claim* — Start with the frozen default route; choose an advanced comparison only if the first claim is complete.
- **Worked example** · Frame 4: the cup handle disappears. Evidence: frames 3 → 4. Boundary: cause unproven. Classroom move: pause and separate observation from explanation.
- Task: finish — exact break + evidence + bounded claim + missing source evidence + "With learners, I would…".

**Say:**
> "One finished claim beats ten open tabs."

**Do:**
- Read the worked example before releasing the room.
- Paste the tool links in chat.
- Default route: one frozen Failure Gallery example; no generation and no second tool required. Advanced route: Temporal Telephone, Point Lab, or Coherence Viewer after one claim is complete.
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
