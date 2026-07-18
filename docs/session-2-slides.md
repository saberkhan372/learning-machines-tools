---
layout: page
title: Session 2 Slide Outline
---

# Session 2 — Images: Slide Outline

> **SUPERSEDED (2026-07-17) — do not run from this document.** It predates the final Session 2 plan: the schedule is outdated, some mechanism statements are misleading (image generation does not "predict pixels"), and its vague-prompt list includes "a criminal," which the current presenter script explicitly warns against using as a warm-up. The live sources are `docs/session-2-live-presenter-script.md`, `pages/session-2-deck.html`, and `assets/session-runs.js`. Kept for history only.

**Learning Machines: Text, Images, Video**
Slide-ready structure for presentation or screen share. Speaker notes in *italics*.

---

## SLIDE 1 — Title

**Session 2: Images**
*What is an image model actually working with when it sees or generates?*

Learning Machines: Text, Images, Video — CC Fest

---

## SLIDE 2 — Recall from Session 1

In Session 1, we left with this sentence:

> *"The doctor entered the room and —"*

We predicted the next **word**.

Today we give a model the prompt **"a doctor"** and it has to produce an **image**.

What will it assume?

*Speaker note: This is the conceptual bridge. Text generation predicts tokens. Image generation predicts pixels — guided by the same pattern-matching logic, but now the assumptions become visible as visual choices.*

---

## SLIDE 3 — Today's Agenda

| Time | Block |
|---|---|
| 0:00–0:10 | Opening + recall |
| 0:10–0:25 | Unplugged: pixel resolution |
| 0:25–0:50 | Feature Extraction / Pixel Resolution Tool |
| 0:50–1:20 | Diffusion Step-Through Viewer |
| 1:20–1:40 | Image Default Test investigation |
| 1:40–1:55 | Share + debrief |
| 1:55–2:00 | Assignment intro |

---

## SLIDE 4 — UNPLUGGED: What Does the Machine See?

Show a blurry or pixelated image.

**At what resolution does this become recognizable?**

*Speaker note: Use a pixelated face, animal, or object on screen. Ask participants to call out when they recognize it. The point: recognition happens well before full resolution. The model works with compressed representations, not full visual fidelity.*

---

## SLIDE 5 — Images Are Numbers

> The model doesn't see images. It processes **arrays of numbers**.

- A 640×400 image = 640 × 400 × 3 = **768,000 numbers**
- Each pixel = red, green, blue values from 0–255
- The model learned patterns in these number arrays from millions of images

**What the model "sees" is not what you see.**

*Speaker note: Bridge to Session 1: tokens are to text what pixel values are to images — both convert human-readable material into numerical structure the model can process.*

---

## SLIDE 6 — FEATURE EXTRACTION / PIXEL RESOLUTION TOOL

**Open the tool:**
https://saberkhan372.github.io/learning-machines-tools/tools/feature-extraction-pixel-resolution/

Try each image:
- When does the face first become recognizable?
- When does the landscape resolve?
- At what resolution is the digit readable?

*Speaker note: Push participants to name the exact resolution where recognition kicks in. That threshold is doing real cognitive work — and the model doesn't need the same information you do to classify or generate.*

---

## SLIDE 7 — Resolution → Feature → Pattern

Recognition works at different levels:

| Level | What it is |
|---|---|
| Pixel | Raw color values |
| Edge / texture | Spatial relationships between pixels |
| Feature | Eyes, curves, a horizon line |
| Pattern | "This arrangement of features → face" |

Image models learn at all these levels simultaneously.
**Diffusion models generate by reversing this process.**

---

## SLIDE 8 — DIFFUSION STEP-THROUGH VIEWER

**Open the tool:**
https://saberkhan372.github.io/learning-machines-tools/tools/diffusion-step-through-viewer/

*"Generation is not drawing from imagination. It is iterative denoising."*

Start at Step 0 — pure noise.
Step forward slowly.
**When does the subject first become recognizable to you?**

*Speaker note: 10 min exploration. Watch for the moment participants "see" something in the noise before it's fully resolved. That's the same cognitive process the model exploits — it learns what patterns are consistent with the prompt and removes noise in that direction.*

---

## SLIDE 9 — What Diffusion Does

| Step | What's happening |
|---|---|
| 0 | Pure random noise |
| ~3–6 | Large color regions form |
| ~6–10 | Subject becomes identifiable |
| ~10–16 | Edges sharpen, shapes define |
| ~16–20 | Fine detail, lighting, texture |
| 20 | Final image — all assumptions baked in |

**Color resolves before detail. Composition before texture. Low-frequency before high-frequency.**

---

## SLIDE 10 — The Prompt Doesn't Specify Everything

The prompt "a flooded golden city at sunset" specifies:
- subject ✓
- mood ✓

But not: exact composition, building height, angle, water level, sky gradient, presence of people...

**The model fills every gap. Those gap-fillers come from training data.**

*Speaker note: This sets up the Default Test. When the prompt is vague — just "a doctor" — the model still produces something specific. Every specificity is a decision the model made.*

---

## SLIDE 11 — DEFAULT TEST: "A doctor"

Switch to the **"A doctor"** sequence.

Step from 0 to 20.

**What did the model decide without being asked?**
- Skin tone
- Gender expression
- Age
- Setting
- Props (stethoscope, clipboard)
- Pose

*Speaker note: Don't answer for them. Let participants name what they see. The goal is to observe that defaults are specific and that specificity comes from somewhere.*

---

## SLIDE 12 — Where Defaults Come From

> A model's default output is not neutral.

Defaults emerge from:
- **Training data** — what images were in the dataset, in what proportions
- **Platform decisions** — what was filtered, curated, or weighted
- **Prompt ambiguity** — vague prompts activate the most common patterns
- **Cultural defaults** in the data source

**This is not a bug. It is the system working as designed.**

---

## SLIDE 13 — INVESTIGATION: Image Default Test Board

**Open:** https://saberkhan372.github.io/learning-machines-tools/worksheets/image-default-test-board/

1. Choose a vague prompt: "a teacher," "a family dinner," "a beautiful home," "a criminal," "a scientist"
2. Generate (or analyze a pre-generated example)
3. Document: what appeared by default — race, gender, age, setting, props, style
4. Ask: what would you need to specify to get a different default?

*20 min. Pre-generated examples available. Observe / Critique pathway: analyze examples without generating.*

---

## SLIDE 14 — ETHICS REFLECTION

| Lens | Question |
|---|---|
| **Human** | What prompt did you choose? What did you add to shift the default? What did you leave to the model? |
| **Machine** | What appeared? What would have required explicit specification to change? |
| **System** | What training data produces these defaults? What curation decisions might have shaped them? |
| **Ethics** | Who is underrepresented, stereotyped, or erased by these defaults? Who is harmed? |
| **Pedagogy** | How would you use this Default Test investigation safely with students? |

---

## SLIDE 15 — SHARE OUT

Share one thing from your Image Default Test Board:

> *"My prompt was X. The model defaulted to Y. I was surprised / not surprised by Z because ___."*

*Speaker note: Push for specificity. "The model defaulted to a white male doctor in a Western hospital setting" is more useful than "the model showed bias."*

---

## SLIDE 16 — Debrief Questions

1. What did the model assume that the prompt never specified?
2. Where do those assumptions come from?
3. A more specific prompt can shift the default — is that the user's responsibility? The platform's? Both?
4. How does this compare to what happened in Session 1? (text defaults vs. image defaults)

---

## SLIDE 17 — Bridge to Session 3

In Sessions 1 and 2 we asked about single outputs:
- A token
- A frame

**In Session 3, we ask: what happens across time?**

Video generation requires the model to produce not one image but thousands — and keep them coherent.

Same mechanism. Wildly harder problem.

---

## SLIDE 18 — ASSIGNMENT OPTIONS

Before Session 3, try one:

**Light:** Run a Default Test on two different vague prompts. Document what appeared.

**Medium:** Compare the defaults from the same prompt across two different image generation tools. What varies? What stays the same?

**Deep:** Find a case where a model default caused real harm (news article, research paper, or community report). Write an evidence-based claim about what training or design decision produced it.

All work is optional. Pre-generated examples are always available.

---

## SLIDE 19 — See You in Session 3

**Session 3: Video**
*What changes when generation has to work across time?*

Same mechanisms — prediction from learned patterns.
New constraint — coherence across hundreds of frames.

**What breaks, and why?**
