---
layout: page
title: "Session 2: Images"
---

# Session 2: Images
## How do image models turn words into pictures, and what defaults appear when prompts are vague?

**Learning Machines: Text, Images, Video — CC Fest**
**Duration:** 2 hours | **Format:** Virtual, Zoom

---

## What We'll Do

In Session 2 we investigate image generation. We start by guessing what a model will draw from an underspecified prompt, then use two tools to see what's actually happening computationally — how pixel grids represent visual information and how diffusion pulls structure out of noise. We finish with a Default Test investigation.

By the end of this session you will be able to:
- Explain how a model represents an image as numbers
- Describe what diffusion denoising does step by step
- Identify defaults — assumed bodies, settings, aesthetics — in generated images
- Run a controlled Default Test and name what the model assumed

**Tools:** [Feature Extraction / Pixel Resolution](https://saberkhan372.github.io/learning-machines-tools/tools/feature-extraction-pixel-resolution/) · [Diffusion Step-Through Viewer](https://saberkhan372.github.io/learning-machines-tools/tools/diffusion-step-through-viewer/)
**Worksheet:** [Image Default Test Board](../worksheets/image-default-test-board/) ([printable Markdown](../worksheets/image-default-test-board.md))

---

## Session Flow

| Time | Block | Format |
|---|---|---|
| 0:00–0:10 | Welcome + framing | Facilitator-led |
| 0:10–0:20 | Unplugged: Default Test guess | Whole group |
| 0:20–0:45 | Feature Extraction / Pixel Resolution | Pairs or solo |
| 0:45–1:15 | Diffusion Step-Through Viewer | Pairs or solo |
| 1:15–1:40 | Structured investigation: Image Default Test Board | Solo |
| 1:40–1:55 | Share + debrief | Whole group |
| 1:55–2:00 | Assignment intro | Facilitator-led |

---

## Opening (0:00–0:10)

> *[Scripted framing]*

Last session we looked at text generation and found that the model predicts without understanding. Today we look at images — and something new becomes visible.

When a language model makes a wrong assumption, you often have to look carefully to notice. When an image model makes a wrong assumption, you can see it. The assumption gets drawn.

We have a term for this: a **Default Test**. You give the model an underspecified prompt — a doctor, a CEO, a family home — and you look at what fills in. The defaults are not random. They are patterns, inherited from training data, shaped by design decisions, and reflecting whose images were in the dataset, whose were not, and how they were labeled.

Today we are going to make those defaults visible.

---

## Unplugged: Default Test Guess (0:10–0:20)

**Goal:** Activate intuition about model defaults before we see them in a tool.

> *[Share your screen with a blank document or whiteboard. Run this as a fast group activity.]*

Ask everyone to type into chat — without overthinking — what they picture when they see this prompt:

> *"Generate an image of a doctor examining a patient."*

Collect responses. Then ask:
- What race, gender, age, and setting appeared most often in your mental image?
- Where does that image come from?
- Now: what do you think an image model trained on internet data will produce?

Don't reveal the model output yet — hold it until the investigation block. The point is to surface the prediction before the evidence arrives.

> *[Optional — if you have time, run one more:]*
>
> *"A CEO giving a presentation."*
>
> *"A safe neighborhood."*

Each of these has a documented pattern. We will see that in the investigation.

---

## Feature Extraction / Pixel Resolution (0:20–0:45)

**Tool:** [Feature Extraction / Pixel Resolution](https://saberkhan372.github.io/learning-machines-tools/tools/feature-extraction-pixel-resolution/)

Before we look at how images are generated, we need to understand how images are represented. A model does not see a picture — it sees a grid of numbers.

### What to do — Pixels mode (10 min)

1. Open the tool. The left canvas shows the original image. The right canvas shows the pixel-reduced representation.
2. Drag the slider left toward "fewer pixels." Watch the right canvas lose detail.
3. Look at the pixel values panel: each cell shows the R, G, B average for a region of the image.
4. Try to find the minimum grid size at which you can still recognize the subject.

**Questions to hold:**
- At what resolution did recognition become difficult? What visual cue survived longest — color, outline, or texture?
- The model works with numbers like these. It never sees "a face" — it sees R:245, G:203, B:160 across a grid.

### What to do — Edges mode (8 min)

1. Switch to Edges. The right canvas now shows only boundaries — where neighboring pixel values differ sharply.
2. Compare the edge map to the original. What does it preserve? What does it discard?
3. Move the slider. At low resolution, do edges still survive?

**Key idea:** Early convolutional layers in image models learn similar edge-detection operations automatically. The model builds up structure by stacking these detectors.

### What to do — Features mode (5 min)

1. Switch to Features. The right canvas now shows coarser regions — the model's "chunks" of the image.
2. Each block represents a region the model might process together: a region of color, a patch of texture, a local pattern.

**Key idea:** Deeper layers look at larger regions. Recognition emerges from combining regional patterns, not from reading the image like text.

### Discussion prompts

- If you only had the R, G, B numbers in the sample panel, could you name what the image shows?
- What would you need to add to the number grid to make recognition reliable?
- What does this suggest about why image models fail in specific ways?

> *[Bring the group back for a 2-minute share before moving to the diffusion tool.]*

---

## Diffusion Step-Through Viewer (0:45–1:15)

**Tool:** [Diffusion Step-Through Viewer](https://saberkhan372.github.io/learning-machines-tools/tools/diffusion-step-through-viewer/)

Now we look at how an image model generates from a prompt. Diffusion models work by starting with pure noise and progressively removing it — guided by the prompt at every step.

### What to do (20 min)

1. Start at Step 0: pure noise. Nothing is there yet.
2. Advance step by step using the next button or arrow keys.
3. Watch when the subject first becomes recognizable. Note the step number.
4. Continue to the final image. Notice what changed in the last few steps.
5. Switch to a different sequence and repeat.

> *[Suggested order: Golden City → Classroom → "A doctor" (the Default Test sequence)]*

### Facilitator notes for "A doctor"

> The third sequence uses a Default Test prompt. It is marked with a red badge as a "default test." Use this transition explicitly:
>
> *"This is the same prompt we discussed at the start of the session. Notice what the model draws — not just the subject, but the setting, the lighting, the race, the gender, and what the doctor is doing. That is the default."*

### Discussion prompts

1. At what step did you first recognize the subject? What information made recognition possible?
2. The model does not draw from top to bottom — it refines the whole image at once. What does that tell you about how it represents the image?
3. Look at the final image of "A doctor." What did the model assume? What would a different assumption require?
4. If you ran this prompt 100 times, which elements do you think would vary and which would stay consistent? Why?

> *[After discussion, bring the group to the investigation block.]*

---

## Structured Investigation: Image Default Test Board (1:15–1:40)

**Worksheet:** [Image Default Test Board](../worksheets/image-default-test-board/) ([printable Markdown](../worksheets/image-default-test-board.md))

Participants run a Default Test using an image model (Midjourney, DALL-E, Stable Diffusion, Adobe Firefly, etc.) or analyze pre-generated examples.

### Protocol

1. Choose 3–4 underspecified prompts from the worksheet, or write your own.
2. Generate images or use pre-generated examples.
3. For each image: record what appeared, what was assumed, and what could be changed.
4. Run one A/B/C series: a basic prompt, a more specified version, and a revision that addresses something that bothered you.
5. Write a one-sentence claim: "When given [prompt], this model assumed [X], which I believe reflects [Y]."

### Facilitator notes

> - Pre-generated examples are in the Notion workspace for participants who do not want to generate images directly.
> - The goal is a claim based on evidence, not a verdict on the tool. "This model defaults to X" is a legitimate claim. "AI is racist" is a verdict — push for the specific evidence.
> - Watch for participants who generate one image and stop. Encourage multiple examples before a claim.

---

## Share + Debrief (1:40–1:55)

Ask 3–4 participants to share one claim from their investigation — the prompt, the output, and the assumption.

**Debrief questions:**

1. What did the model assume that you didn't specify?
2. Which assumptions surprised you? Which did you predict?
3. Where do these defaults come from — training data, curation, labeling, platform choices?
4. What would it take to change the default? Is that the right question to ask?
5. Who benefits from the current defaults? Who doesn't?

> *[Close with something like:]*
>
> Image generation makes assumptions visible in a way that text generation often doesn't. In Session 3 we go to video — and we find that images have a version of default assumptions too, but over time they can drift, distort, and fail in ways that are genuinely strange. That strangeness is itself evidence.

---

## Assignment (1:55–2:00)

Before Session 3, try one of these:

- **Light:** Complete your Default Test Board with at least three prompts. Bring your evidence to Session 3.
- **Medium:** Pick one default you found and write a short evidence-based claim about what it suggests about the training data or platform design decisions.
- **Deep:** Find or generate an example where a more specific prompt successfully changed the default. Does that feel like a fix, or a workaround?

---

## Facilitation Notes

**Common questions:**

- *"Is the model racist?"* — Redirect to evidence: "What specifically did it produce? What prompts produced it consistently? That evidence is more useful than a verdict."
- *"Can you fix this with prompting?"* — Worth exploring: "Does prompting fix the default, or does it work around it? Is there a difference?"
- *"How does diffusion actually work mathematically?"* — Give the 30-second version: "It learns to reverse a noise-adding process. At each step it predicts which direction to move the pixels to make them more prompt-consistent. The math involves score matching and stochastic differential equations — but the key intuition is: the model never draws. It de-noises."

**If time is short:**
Cut the Feature Extraction exploration to pixels mode only (skip Edges and Features). Spend the saved time on the "A doctor" sequence in the Diffusion Viewer — that is the pedagogical core of this session.

**If participants are ahead:**
Ask them to run a second Default Test series with a prompt that matters to their teaching or practice. What defaults does the model produce for their subject area?
