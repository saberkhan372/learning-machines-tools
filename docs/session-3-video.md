# Session 3: Video
## Why is video generation harder than image generation, and what does that tell us about how models work?

**Learning Machines: Text, Images, Video — CC Fest**
**Duration:** 2 hours | **Format:** Virtual, Zoom

---

## What We'll Do

In Session 3 we investigate video generation. Video adds time to the image problem — and time breaks things in ways that images never do. We start with a drawing game that makes temporal coherence tangible, then investigate real video generation failures. We finish with a structured investigation using the Video Test Report.

By the end of this session you will be able to:
- Explain why video generation is harder than image generation
- Name specific failure modes (identity drift, body distortion, physics breaks)
- Describe what temporal coherence is and why it is difficult to maintain computationally
- Run a controlled A/B/C video prompt test and document what broke

**Tool:** [Temporal Telephone](https://saberkhan372.github.io/learning-machines-tools/tools/temporal-telephone/)
**Worksheet:** [Video Test Report](../worksheets/video-test-report/) ([printable Markdown](../worksheets/video-test-report.md))

---

## Session Flow

| Time | Block | Format |
|---|---|---|
| 0:00–0:10 | Welcome + framing | Facilitator-led |
| 0:10–0:25 | Unplugged: drawing telephone | Whole group |
| 0:25–1:05 | Temporal Telephone tool | Pairs or solo |
| 1:05–1:35 | Video investigation: failure modes | Solo |
| 1:35–1:50 | Share + debrief | Whole group |
| 1:50–2:00 | Final project intro + assignment | Facilitator-led |

---

## Opening (0:00–0:10)

> *[Scripted framing]*

Over the last two sessions we found that language models predict without understanding, and image models fill in underspecified prompts with assumptions you can see. Today we add one more dimension: time.

Video is not a series of independent images. It is a claim that the same thing persists across frames — that the person in frame 1 is the same person in frame 100, that the hand that reaches for the cup will still be a hand when it arrives.

That claim is very hard for a model to keep.

The failures in video generation are not random. They are structurally meaningful. When a face slowly becomes a different face, when fingers multiply, when a background teleports — those are not bugs. They are a window into what the model is actually modeling and what it is not.

Our job today is to look at those failures as evidence.

---

## Unplugged: Drawing Telephone (0:10–0:25)

**Goal:** Make temporal drift tangible before we see it computationally.

> *[This works in Zoom with collaborative whiteboard tools like Miro, Excalidraw, or Google Jamboard. Alternatively, use screen share with participants drawing sequentially.]*

**Instructions:**

1. One person draws a simple subject — a person, an animal, or an object. 15 seconds.
2. The next person can only see the previous person's drawing, not the original. They redraw it in 15 seconds.
3. Repeat for 5–6 rounds.
4. Reveal all drawings in order.

**Debrief:**

- Where did the identity drift? What changed first — color, shape, proportion, or context?
- What would have helped maintain coherence? (Seeing the original frame alongside the previous one.)
- Now: a video model generates each frame using the previous frame as context, with no guaranteed access to a stable "ground truth" anchor. What does that predict about its failure modes?

> *[Transition:] "That is the problem Temporal Telephone is designed to show. Let's try it with the tool."*

---

## Temporal Telephone (0:25–1:05)

**Tool:** [Temporal Telephone](https://saberkhan372.github.io/learning-machines-tools/tools/temporal-telephone/)

This tool runs the telephone experiment in two rounds with different reference conditions, then plays the results back.

### What to do (30 min)

**Round A: Telephone only**
1. Draw your starting frame. Keep it simple — a face, an animal, a scene with one clear subject.
2. Each subsequent frame: you can only see the frame immediately before. Draw it as faithfully as you can. 8 frames total.
3. Complete the round.

**Round B: Anchored**
1. Same subject as Round A.
2. Now you can see both the first frame (the anchor) and the previous frame simultaneously. Draw for 8 frames.
3. Complete the round.

**Playback**
1. Play both sequences. Watch what changed.
2. Toggle between "previous only" and "anchor + previous" ghost modes to see what reference information looks like during drawing.

### Questions during exploration

- At what frame did the subject become unrecognizable in Round A?
- Which elements drifted first — identity, proportion, background, or style?
- Did the anchor in Round B prevent drift, or only slow it?
- What does this suggest about the problem of maintaining identity over time in a generated video?

### Connection to video models

> *[Say something like:]*
>
> Video generation models face the same tradeoff you just experienced. Conditioning only on the previous frame is computationally cheaper but accumulates drift. Conditioning on the first frame or a keyframe adds coherence but costs more computation. The tradeoff is not solved — it is managed, imperfectly, in every video model you use.

---

## Video Investigation: Failure Modes (1:05–1:35)

**Worksheet:** [Video Test Report](../worksheets/video-test-report/) ([printable Markdown](../worksheets/video-test-report.md))

Participants investigate video generation failures using a video model (Sora, Runway, Kling, Pika, etc.) or analyze pre-generated examples.

### Protocol

1. Choose a subject that involves motion — a person, an animal, an action.
2. Generate three versions (A/B/C) or use pre-generated examples:
   - A: baseline prompt
   - B: isolate or intensify one variable (motion type, camera movement, duration)
   - C: try to correct a failure from A or B
3. For each video: mark failure categories that appeared.
4. Identify one failure and write a claim: "When [prompt], the model [failed in this way], which suggests [X about what it is modeling]."

### Failure categories to watch for

- **Identity drift:** the subject gradually becomes a different subject
- **Body distortion:** limbs, hands, or fingers deform
- **Physics break:** objects behave in ways that violate basic physics
- **Background teleport:** the setting changes suddenly
- **Object melting:** a solid object becomes amorphous
- **Camera inconsistency:** the implied camera position changes discontinuously
- **Text corruption:** any text in the frame degrades
- **Temporal jump:** a sudden discontinuity in the action or timeline
- **Style drift:** the visual style or rendering changes mid-clip

### Facilitator notes

> - Pre-generated failure examples are in the Notion workspace.
> - Encourage participants to pick the failure that interests them most, not to catalog every failure in their clip.
> - The investigation goal is a claim: "This failure suggests the model [does X instead of Y]." Not just "the model messed up."
> - If someone finds a video that mostly works, ask them to stress-test it: longer duration, more complex motion, more people in frame.

---

## Share + Debrief (1:35–1:50)

Ask 3–4 participants to share one failure they documented — the prompt, the failure, and what it suggests.

**Debrief questions:**

1. What was the most revealing failure you found? What does it tell you about what the model is modeling?
2. Video is harder than images. But harder in what specific ways — temporal consistency, physics, identity, or something else?
3. Which failure modes matter most for your context — education, creative practice, journalism, policy?
4. What would you need to trust a video model enough to use its output as evidence of something real?

> *[Close with something like:]*
>
> We have now seen all three modalities. Text generates fluent but unpredictable sequences. Images make assumptions visible. Video reveals what breaks when you add time. In Optional Studio we bring that together — what did you actually learn, and how do you share it?

---

## Final Project Intro + Assignment (1:50–2:00)

> *[Scripted — read this slowly, because it is the pivot point of the camp]*

For Optional Studio you will bring a project. The project is not about producing something impressive. It is about documenting something true — something you found, investigated, or made that shows what you understand about how these systems work.

Five pathways — pick the one that fits your practice:

| Pathway | What You Bring |
|---|---|
| **Make** | A creative text, image, or video artifact with process evidence and reflection |
| **Teach** | A classroom-ready activity, handout, or facilitation plan |
| **Investigate** | A model behavior experiment or Default Test with an evidence-based claim |
| **Explain** | A tool, poster, zine, or concept bridge |
| **Critical / No-AI** | A critique, consent checklist, model card, policy draft, or unplugged activity |

All pathways require two things:
1. Evidence that you iterated — at least three versions or variations
2. Reflection on what the model did, what you decided, and what the system assumed

The showcase is not a performance. It is a share-out. You have 8–10 minutes. You do not need slides.

**Before Optional Studio:**
- Choose your pathway
- Have your draft ready to show or describe
- Bring one question you still have that the camp didn't answer

---

## Facilitation Notes

**Common questions:**

- *"Why do hands always look wrong?"* — "Hands are computationally difficult because they are complex, highly variable, and critically important to get right. The model learned from images where hands were often blurry, occluded, or unlabeled. The failure is meaningful: the model learned a hand-shaped region, not a hand."
- *"Is video generation getting better?"* — "Yes, rapidly. But the failure modes are informative regardless. Knowing what breaks tells you what the model is actually modeling."
- *"Which video tool should I use?"* — "Use what you have access to. The failures are more similar across tools than the marketing suggests."

**If time is short:**
Cut the video investigation to 15 minutes of pre-generated example analysis. Make sure everyone still completes the Temporal Telephone playback — that is the core demonstration.

**If participants are ahead:**
Ask them to compare the same failure across two different video models. Are the failure modes the same? What does the difference tell you?
