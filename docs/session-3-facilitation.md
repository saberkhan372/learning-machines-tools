---
layout: page
title: "Session 3 Facilitation: Video"
---

# Session 3 Facilitation: Video

Use this guide for the full 120-minute Session 3 run. Treat it as a re-entry and synthesis session, not an advanced graduation test: participants may have attended both earlier sessions, one, or neither. The session turns the first two meetings into one argument, tests its video version through comparison, protects one finished participant claim, and hands the final half hour to guest Dr. Emily Thomforde.

## Session spine

**Camp journey:** participants have been the machine three times.

- Session 1, text: fluent output is not necessarily true.
- Session 2, images: plausible output is not necessarily neutral.
- Session 3, video: smooth output is not evidence.

**Core question:** what changes when generation has to preserve relationships across time?

**Mechanism bridge:** a tracker estimates correspondence across frames that already exist. A generator produces new frames whose subjects, objects, setting, camera, and motion must remain mutually coherent. Tracking is a useful contrast, not a literal description of one universal generation pipeline.

## Before the session

- Arrange two participant artifact shares in advance. Ask each person to show one artifact, make one claim, and name one boundary in about three minutes. Include at least one classroom-facing share, and do not select only from the people most visible in chat.
- Send Dr. Emily Thomforde the Session 1 and Session 2 recaps, the three-line session argument, the remaining-question list, the 18-minute talk / 8-minute Q&A timing, and the private time signal. Brief her that the likely room includes people who are still figuring the tools out, that bias and learned defaults have been a strong live interest, and that many registrants want classroom transfer. Ask for one beginner-readable example and one practical implication for educators.
- Prepare one anonymous poll or private-writing prompt for the opening. Make chat an option, not the only visible participation channel.
- Open and test the [Session 3 live deck](../pages/session-3-deck.html), [Point Correspondence Lab](../tools/point-correspondence-lab/), and [Temporal Telephone](../tools/temporal-telephone/) in the same browser and at the same Zoom share size you will use live.
- Build two short, frozen failure examples into the run: one identity or object-consistency break and one physics, text, or camera-continuity break. Do not rely on live generation.
- Put the [Video Test Report](../worksheets/video-test-report/) and default / advanced studio links in one paste-ready chat message.
- Confirm the guest's preferred introduction, name pronunciation, and whether the recording may include her segment.

## Materials

- [Session 3 live deck](../pages/session-3-deck.html)
- [Point Correspondence Lab](../tools/point-correspondence-lab/)
- [Temporal Telephone](../tools/temporal-telephone/)
- [Video Failure Gallery Viewer](../tools/video-failure-gallery-viewer/)
- [Frame-by-Frame Coherence Viewer](../tools/frame-by-frame-coherence-viewer/)
- [Video Test Report](../worksheets/video-test-report/)
- [AI Use + Consent Checklist](../worksheets/ai-use-consent-checklist/)
- Optional reference: [CoTracker](https://github.com/facebookresearch/co-tracker), for point correspondence across existing frames

## Run of show

| Time | Segment | Facilitator move | Participant action |
| --- | --- | --- | --- |
| 0–5 | Welcome + re-entry | Repeat the recording / likeness boundary and camera-off, chat-only, private-writing, or watch-only choices. Put the three-line argument on screen: text / continuation / fluent ≠ true; images / conditioned sampling / plausible ≠ neutral; video / relationships across time / smooth ≠ evidence. | Respond first through the anonymous poll or private writing. Chat is optional. |
| 5–12 | Two artifact shares | Invite the two pre-arranged participants, including one classroom-facing share. Give each about three minutes: artifact, claim, boundary. | Listen for the evidence and ask at most one clarifying question. |
| 12–17 | Active synthesis | Retrieve, do not re-lecture. Give 30 seconds of private writing, take one poll response or precise chat response, then invite two voluntary spoken responses. | Match one prior activity to one line using any offered channel. |
| 17–24 | Point correspondence | Use the Ball arc in Point Correspondence Lab. Predict, reveal, then distinguish tracking existing frames from generating new ones. | Predict one point's destination and name one relationship that must persist. |
| 24–47 | Temporal Telephone | Lock exactly five frames in each run. Play A twice, ask everyone to choose one feature, play B twice, then toggle A / B while collecting observations. | Draw, track the chosen feature, then name one observation and one limit of the analogy. |
| 47–57 | Curated failure hunt | Use two short frozen examples. Track one feature at a time and use the four-question protocol: what changed, what supports it, what would verify the source, and what can we not conclude? | Mark the first exact break and separate observation, explanation, verification, and boundary. |
| 57–65 | System map | Map model, interface, training data, workers, prompter, subject, editor, and platform. Add consent and provenance as separate questions. | Name one human decision, one hidden contribution, one consent question, and one provenance question using the same four-question frame. |
| 65–83 | One-tool studio | Show the completed worked example before releasing the room. Offer a nearly impossible-to-fail default lane and an advanced lane. Require one worksheet row before a second tool. Give a five-minute warning at 78. | Finish one observation, one bounded claim, one missing piece of provenance evidence, and one sentence about classroom use. |
| 83–88 | Two claims | Invite two concise shares selected during the studio, using more than chat visibility as the selection signal. Include one classroom adaptation if available. Ask only what evidence supports each claim and where its boundary lies. | Share or listen for observation versus explanation. |
| 88–90 | Guest introduction | Introduce Dr. Emily Thomforde and the listening question; hand over cleanly. | Close tool tabs and listen. |
| 90–108 | Guest talk | Yield the floor. Send the agreed private three-minute signal at minute 105. | Capture one distinction or question. |
| 108–116 | Q&A | Prioritize participant questions; use one prepared question only if needed. | Ask concise mechanism, evidence, learning, or consequence questions. |
| 116–118 | Guest takeaway | Ask Emily for one sentence the room should carry forward; thank her. | Put one phrase in chat. |
| 118–120 | Close | Return to the three lines and invite the optional Studio / Showcase. | Save the session page and one next step. |

## Temporal Telephone protocol

1. **Run A — previous frame:** lock exactly five frames, keep the prompt hidden, and ask each drawer to work from the previous-frame ghost. Play the saved sequence twice.
2. **Choose one feature:** before showing Run B, ask everyone to name one feature they will follow: a hand, face, object edge, position, scale, or camera relationship.
3. **Run B — anchor:** reveal the prompt. The tool seeds Run B with the exact same first frame as Run A, then holds that frame as the fixed reference. Lock exactly five frames and play the sequence twice. Playback speed is shared by the tool.
4. **Compare:** toggle between the saved Run A and Run B playbacks while collecting observations about the chosen feature. Ask what held, what drifted, and what changed when the reference condition changed.
5. **State the limit:** this is a controlled classroom comparison. Contemporary systems vary in their use of temporal context, reference conditioning, spatiotemporal processing, masking, cross-attention, and editing controls. The activity does not reproduce a universal video-model architecture.

## Mechanism language to keep

- Say: "Small inconsistencies can compound when a sequence does not preserve the same relationships across time."
- Do not say: "Drift is the model forgetting." If you use forgetting as a cartoon, label it as a cartoon.
- Say: "Motion learned from patterns does not guarantee physics."
- Do not say: "Generated motion is interpolation, not physics." Some workflows interpolate; the category is broader than that.
- Say: "This sequence no longer preserves the hand's structure."
- Do not infer a hidden architecture from one visible failure. Observation supports a failure claim; causal explanation requires model- and workflow-specific evidence.

## Framing rules for live discussion

- **Anchor mode is not locked noise.** The activity tests one simplified control: a stable visual reference. Locked noise, reference conditioning, masks, cross-attention controls, and compositing are distinct ways that workflows may add control.
- **Glitches are not authentication.** Close observation can find a failure; it cannot verify a clip. Verification needs provenance, source context, corroboration, and, where available, content credentials. A convincing synthetic clip may have no visible glitch, while authentic compressed footage may look strange.
- **Bound the sustainability claim.** Video often introduces much more spatial-temporal data and substantial compute, but costs vary by architecture, workflow, duration, resolution, and hardware. Ask what evidence would support a responsible comparison.
- **Do not assign intent to the generator.** Ask what inputs the system receives, how the interface represents prompt/reference/mask controls, which inputs affect generation, and what the surrounding platform adds.

## Studio lanes

Show this worked example before the studio begins:

> At frame 4, the cup handle disappears. Comparing frames 3 and 4 supports that observation, but it does not prove what caused the change. Before treating the clip as evidence, I would need its source and corroborating context. With learners, I would pause between the two frames and ask them to separate observation from explanation.

**Default lane:** use one frozen example in the Video Failure Gallery Viewer. Identify the first exact break, capture the frame or timestamp, complete the bounded claim, name one piece of source evidence still needed, and add one sentence beginning “With learners, I would…”. This route requires no generation and no second tool.

**Advanced lane:** use Temporal Telephone, Point Correspondence Lab, or an accessible video tool. Change one reference, camera, duration, motion, or subject constraint; compare the result and state what the comparison cannot prove.

**No-AI lane:** analyze frozen frames or run Temporal Telephone on paper. No account or generation is required to make a defensible coherence claim.

## Four-question verification handoff

Use the same reusable questions in the failure hunt, system map, studio, and final claims:

1. What exactly changed?
2. What evidence supports that observation?
3. What would verify the clip's source?
4. What can we not conclude?

These questions turn visible failure analysis into a classroom protocol. They also block a common mistake: a glitch is not proof that a clip is synthetic, and a clean clip is not proof that it is authentic.

## What success looks like

- Participants complete bounded claims, even if they use the default or watch-and-write lane.
- Participants can distinguish tracking evidence in existing frames from generating new frames.
- Participants can name at least one missing piece of provenance evidence.
- Participants who are still figuring the tools out can finish the default lane.
- Participation is visible across private writing, polls, drawing / tools, chat, and speech.
- Chat volume is not used as a proxy for understanding or engagement.

## Facilitator prompts

- "What exact frame or comparison is your evidence?"
- "What changed, what stayed constant, and what can this test not prove?"
- "A tracker follows evidence that already exists. What is different about generating the next frame?"
- "What did the anchor preserve? What did it fail to preserve?"
- "What would you need to learn before claiming that a real generator works like this activity?"
- "Is this an observation about the output, or an explanation of the mechanism?"
- "What makes the clip look convincing? What would make it trustworthy evidence?"
- "Whose labor, likeness, or data is hidden in the output?"
- "What provenance record would help someone inspect where this clip came from?"
- "Would that record establish consent, or only document a chain?"

## Fallbacks and cut rules

- If the artifact shares are not confirmed, replace them with two prepared recap artifacts; do not cold-call.
- If Point Correspondence Lab fails, use the deck's fallback ball strip and take one chat prediction.
- If Temporal Telephone drawing fails, have one facilitator draw while the room directs changes, or switch to paper. Preserve the Run A / Run B reference comparison.
- If time slips before the guest, shorten the failure hunt to one example and the system map to four minutes. Do not take time from the guest block.
- If the guest has a technical problem, move directly into the one-tool studio extension and the prepared Q&A prompts; preserve the 118-minute closing callback.
- If participants finish early, ask them to strengthen the boundary of the claim rather than open another tool.

## After the session

- Save the deck log and Zoom chat with the recording, captions, and transcript.
- Capture the two participant claims as source notes, but do not publish names, quotes, screenshots, or work without the required permission.
- Send the Session 3 feedback link. Include the Week 4 / Optional Studio commitment, participation-mode, follow-up-format, and “Smooth video is not evidence because…” questions.
- Record what failed operationally, especially guest timing, tool handoffs, whether participants finished one claim, and whether the default lane worked for people with uneven prior experience.
