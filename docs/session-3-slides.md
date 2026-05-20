---
layout: page
title: Session 3 Slide Outline
---

# Session 3 — Video: Slide Outline

**Learning Machines: Text, Images, Video**
Slide-ready structure for presentation or screen share. Speaker notes in *italics*.

---

## SLIDE 1 — Title

**Session 3: Video**
*What changes when generation has to work across time?*

Learning Machines: Text, Images, Video — CC Fest

---

## SLIDE 2 — The Pattern So Far

| Session | Modality | Unit of prediction |
|---|---|---|
| 1 | Text | Next token |
| 2 | Images | Next denoising step |
| 3 | Video | Next frame (across hundreds) |

Same mechanism. Different constraint.

**Video adds time. Time requires memory and coherence.**

*Speaker note: The key move is showing continuity of mechanism across all three modalities. They're all prediction. Video just makes the failure modes more visible and more dramatic.*

---

## SLIDE 3 — Today's Agenda

| Time | Block |
|---|---|
| 0:00–0:10 | Opening + recall |
| 0:10–0:30 | Unplugged: Temporal Telephone — Round 1 |
| 0:30–0:50 | Temporal Telephone — Rounds 2 and 3 |
| 0:50–1:05 | Video failure mode analysis |
| 1:05–1:35 | Video Test Report investigation |
| 1:35–1:55 | Share + debrief |
| 1:55–2:00 | Assignment intro |

---

## SLIDE 4 — Why Video Is Harder

A good single frame is not enough.

The model must maintain across hundreds of frames:

- **Identity** — same face, body, clothing
- **Motion** — physically plausible movement
- **Camera logic** — consistent angle, no teleportation
- **Background** — the scene doesn't reset
- **Physics** — gravity, cloth, water behave correctly
- **Style** — consistent visual treatment

Every frame is a new prediction. The model has no persistent memory.

---

## SLIDE 5 — TEMPORAL TELEPHONE

**Open the tool:**
https://saberkhan372.github.io/learning-machines-tools/tools/temporal-telephone/

**Round 1 — Telephone (prompt hidden):**
Draw what happens next. You can see a ghost of the previous frame. Lock your frame when done.

*6–8 frames. Do not reveal the prompt. After locking all frames, go to Round 3 and play back.*

*Speaker note: The unplugged experience first. Let participants feel drift before naming it. The ghost mode bar is the key variable — "previous frame only" is analogous to how basic video generation models condition on the prior frame.*

---

## SLIDE 6 — After Round 1: What Happened?

Play back your sequence.

- Where did the drawing drift furthest from the original prompt?
- When did identity first break?
- What survived from frame 1?

*[Reveal the original prompt]*

---

## SLIDE 7 — Round 2: Conditioned

**The prompt is now visible.**

Switch to **Anchor (Frame 1)** or **Both** ghost mode.

Draw the same scenario again, 6–8 frames.

*Compare playbacks. Does anchoring help? What still drifts?*

---

## SLIDE 8 — What the Runs Demonstrate

| Ghost mode | Analogy |
|---|---|
| **Run A — Previous frame only** | Standard video generation: each frame conditioned on the last |
| **Run B — Anchor (Frame 1)** | Reference-image conditioning: a "key frame" keeps identity stable |
| **Run C — Both** | Hybrid: prior frame + reference, the strongest coherence strategy |

**The telephone game is not a metaphor for video generation. It is the same problem.**

---

## SLIDE 9 — VIDEO FAILURE MODES

These are the categories. Name what you saw.

| Failure Mode | What It Looks Like |
|---|---|
| **Identity drift** | Character's face, age, or appearance changes |
| **Motion break** | Object teleports between frames |
| **Physics break** | Gravity wrong, cloth ignores wind, water moves backwards |
| **Background teleport** | Scene resets without camera movement |
| **Style drift** | Visual treatment shifts across the sequence |
| **Text corruption** | Readable text becomes garbled |

*Speaker note: Ask participants to identify which failure modes appeared in their Round 1 playback. Name them precisely — not "it got weird" but "identity drift between frames 4 and 5."*

---

## SLIDE 10 — Why Each Failure Happens

| Failure | Why |
|---|---|
| Identity drift | No persistent face representation across frames; each frame re-predicts |
| Motion break | Physical law isn't in the training signal — trajectory is inferred from patterns |
| Background teleport | Background and subject are predicted semi-independently |
| Text corruption | Text is predicted pixel-by-pixel, not as symbols with meaning |
| Style drift | Style emerges from local prediction, not a global style "lock" |

**The model never "knows" it made a consistent character in frame 1. It predicts frame 2 from a compressed representation of frame 1.**

---

## SLIDE 11 — INVESTIGATION: Video Test Report

**Open:** https://saberkhan372.github.io/learning-machines-tools/worksheets/video-test-report/

Options:
1. **Analyze** curated AI video clips — identify and name failure modes with timestamps
2. **Test** a video generation tool with a baseline, one variable changed, and one stress test
3. **Design** a classroom activity around one video failure mode

*Speaker note: Curated clips will be available if participants don't want to generate directly. The key evidence is: what failed, when, and what the likely mechanism is.*

---

## SLIDE 12 — Investigation Protocol

1. **Baseline prompt** — observe what appears
2. **Change one variable** — motion instruction, style, character detail
3. **Stress test** — push the model toward a known failure mode
4. **Document** — what failed, at what frame, why you think it failed
5. **Claim** — "When given [prompt type], this model tends to [failure], which suggests [mechanism]"

---

## SLIDE 13 — ETHICS REFLECTION

| Lens | Question |
|---|---|
| **Human** | What decisions did you make at each frame or prompt? What did you leave to the model? |
| **Machine** | Where did coherence break? What information would the model need to maintain identity? |
| **System** | What platform decisions — training data, conditioning approach, output filtering — affect these failure modes? |
| **Ethics** | If a model generates a real person's likeness and it drifts — different age, expression, skin tone — who is affected? What consent is required? |
| **Pedagogy** | How would you show video failure modes to students safely, without generating harmful content? |

---

## SLIDE 14 — SHARE OUT

Share one thing from your Video Test Report:

> *"I tested [prompt]. At frame [N], [failure mode] appeared. I think this happened because ___."*

*Speaker note: Push for mechanistic claims. "The model lost the face" is less useful than "identity drift began at frame 6 when the camera angle changed, which suggests the model's face representation is view-sensitive."*

---

## SLIDE 15 — Debrief Questions

1. Which failure mode was most surprising? Which confirmed what you expected?
2. Run A stayed most coherent / Run B stayed most coherent — why do you think that is?
3. What would a video model need to remember, across 60 seconds of output, to maintain a consistent character?
4. We've now seen defaults in text (Session 1), images (Session 2), and video (Session 3). What do all three have in common?

---

## SLIDE 16 — The Pattern, Complete

| Modality | Mechanism | Key Failure |
|---|---|---|
| Text | Predict next token from distribution | Confident wrong answers |
| Images | Iterative denoising from noise | Default outputs reflect training data |
| Video | Frame-by-frame prediction | Drift, incoherence, physics breaks |

**All three: prediction from learned patterns. All three: defaults from training data. All three: human judgment still required.**

---

## SLIDE 17 — Bridge to Session 4

In Sessions 1–3 we investigated.

In Session 4, you show what you found.

**Start thinking now about your final project.**

Choose one pathway:
- Make (creative artifact with process evidence)
- Teach (classroom-ready activity)
- Investigate (experiment or Default Test)
- Explain (tool, poster, zine, or concept bridge)
- Critical / No-AI (critique, consent checklist, model card, policy)

---

## SLIDE 18 — ASSIGNMENT OPTIONS

Before Session 4, bring something to share:

**Light:** Annotate 3–5 frames from an AI video with failure mode labels. Add a one-sentence claim.

**Medium:** Run a full A/B/C video prompt test. Document what failed, when, and why.

**Deep:** Write a classroom activity that uses video failure modes to teach something about how video models work. Include facilitation notes and a low-AI pathway.

All work is optional. Curated examples are always available.

---

## SLIDE 19 — See You in Session 4

**Session 4: Showcase**
*What did we learn by making, testing, critiquing, or teaching these systems?*

No new tools. No new concepts.

**You show what you found.**
