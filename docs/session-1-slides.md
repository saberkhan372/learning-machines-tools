---
layout: page
title: Session 1 Slide Outline
---

# Session 1 — Text: Slide Outline

**Learning Machines: Text, Images, Video**
Slide-ready structure for presentation or screen share. Each slide block is one screen. Speaker notes in *italics*.

---

## SLIDE 1 — Title

**Session 1: Text**
*How do language models generate text that feels meaningful?*

Learning Machines: Text, Images, Video — CC Fest

---

## SLIDE 2 — The Repeated Question

**What is the machine actually doing?**

*(not: is it good or bad)*
*(not: how do I use it better)*
*(not: will it replace us)*

> This is the question we bring to every session.

*Speaker note: Set the investigation frame. We are here to collect evidence and build claims, not to evaluate or celebrate.*

---

## SLIDE 3 — Today's Agenda

| Time | Block |
|---|---|
| 0:00–0:10 | Opening + framing |
| 0:10–0:25 | Unplugged: next-word prediction |
| 0:25–0:50 | ELIZA Simulator |
| 0:50–1:20 | Tokenizer + Temperature Visualizer |
| 1:20–1:40 | Structured investigation |
| 1:40–1:55 | Share + debrief |
| 1:55–2:00 | Assignment intro |

---

## SLIDE 4 — Participation Pathways

You choose how to participate. Every pathway is valid.

| Pathway | What It Means |
|---|---|
| **Use** | Try a tool directly and document what happens |
| **Observe / Critique** | Analyze pre-generated examples |
| **Teach / Design** | Design a classroom activity |
| **Build / Code** | Make a small tool or explainer |
| **Critical / No-AI** | Write a critique, policy, or consent document |

*Opting out of direct AI use never means opting out of the camp.*

---

## SLIDE 5 — UNPLUGGED: Next-Word Prediction

**Finish this sentence — don't overthink it:**

> *"The coffee was hot, so she —"*

Type your answer in chat.

*Speaker note: Collect 5–6 responses. Ask: what word did most people choose? Why? This is exactly what a language model does — at scale, for every token, using patterns from billions of sentences.*

---

## SLIDE 6 — Now Try This One

> *"The coffee was hot, so the programmer —"*

What changed? Why?

*Speaker note: The added word shifted the prediction. Context shapes probability. This is the core of next-token prediction.*

---

## SLIDE 7 — And This One (Hold It)

> *"The doctor entered the room and —"*

What appeared in your head? Hold that image.

*Speaker note: We will return to this sentence in Session 2 — where the model has to draw the doctor, not describe one.*

---

## SLIDE 8 — ELIZA SIMULATOR

**Open the tool:**
https://saberkhan372.github.io/learning-machines-tools/tools/eliza-simulator/

ELIZA was built in 1966. No model. No training data. No understanding.

It matches keywords and fills templates.

**Try:**
1. "I feel really sad today" — watch the Rule Inspector
2. "I feel like the concept of mother is overrated" — which rule wins?
3. "The weather is nice today" — what happens when nothing matches?

*Speaker note: 10–12 min exploration. Point out the Rule Inspector column — that's the machine's entire reasoning process, visible.*

---

## SLIDE 9 — ELIZA: The Key Contrast

| ELIZA (1966) | LLM (now) |
|---|---|
| Dozens of keyword rules | Billions of learned patterns |
| Rule is visible | Rule is not directly inspectable |
| Fails visibly | Fails fluently |
| Cannot learn | Trained on text, not on understanding |

**Neither one understands you.**
The failure modes are just very different.

*Speaker note: This is the conceptual hinge. LLMs are not ELIZA-scale, but they share the same fundamental limitation: pattern matching without meaning.*

---

## SLIDE 10 — TOKENIZER + TEMPERATURE VISUALIZER

**Open the tool:**
https://saberkhan372.github.io/learning-machines-tools/tools/tokenizer-temperature-visualizer/

**Part 1 — Tokenization (10 min):**
Type a sentence. Watch it chunk into tokens.

- Where does a common word become one token?
- Where does an unusual word get split?
- Try: *unhappiness*, *telecommunications*, your name

*Speaker note: The model never reads words. It reads token IDs — integers. What we write as text is translated into a sequence of numbers before the model sees it.*

---

## SLIDE 11 — What Is a Token?

> The model doesn't read words. It reads **token IDs**.

"unhappiness" → `un` + `happi` + `ness` → three token IDs

Common words: usually one token.
Rare words, names, code: often split.

**128K token context window ≈ 100K English words** (but less for code, names, non-English text).

---

## SLIDE 12 — Part 2: Temperature

Set temperature to **0.1**. Run Auto. What happens?

Set temperature to **1.5**. Run again. What changed?

Toggle **Greedy / Sample** at the same temperature. Same model — different text. Why?

*Speaker note: Temperature reshapes the probability distribution. Greedy always picks the top token. Sampling rolls a weighted die. Both are valid uses — the choice depends on the task.*

---

## SLIDE 13 — What Temperature Does

| Low temperature (0.1) | High temperature (1.5+) |
|---|---|
| Top token dominates | Distribution flattens |
| Predictable, repetitive | Surprising, sometimes incoherent |
| Same text every run (greedy) | Different text each run (sample) |

**Probability is not truth.**
A 70% token probability means "fits the pattern" — not "is correct."

---

## SLIDE 14 — INVESTIGATION: Text Experiment Board

**Open:** https://saberkhan372.github.io/learning-machines-tools/worksheets/text-experiment-board/

Choose a prompt type: story, description, explanation, dialogue, or Default Test.

1. **Version A** — baseline prompt
2. **Version B** — change one thing deliberately
3. **Version C** — respond to something that surprised or bothered you

Fill in: what changed, what you learned, what the machine added that you didn't ask for.

*20 min individual work. Pre-generated examples available if you prefer not to use a live model.*

---

## SLIDE 15 — ETHICS REFLECTION

**After your investigation:**

| Lens | Question |
|---|---|
| **Human** | What did you decide, frame, select, revise, or reject? |
| **Machine** | What did the system predict, complete, or distort? |
| **System** | What defaults, training data, or interface choices shaped the output? |
| **Ethics** | Who might be misrepresented, erased, or stereotyped in outputs like this? |
| **Pedagogy** | How would you adapt this investigation for students or community learners? |

---

## SLIDE 16 — SHARE OUT

Share one thing from your Text Experiment Board.

Not a summary — a specific example:

> *"My prompt was X. The model did Y. I was surprised by Z."*

---

## SLIDE 17 — Debrief Questions

1. What did the model add that you didn't ask for?
2. Would you call what it was doing *writing*, *predicting*, *imitating*, or something else?
3. Where did human judgment enter the loop?
4. What concerned you?

---

## SLIDE 18 — Bridge to Session 2

Remember the sentence from the opening:

> *"The doctor entered the room and —"*

In Session 1, the model predicted the next word.

In Session 2, we give a model the prompt **"a doctor"** — and it has to generate an image.

**What will it assume?**

---

## SLIDE 19 — ASSIGNMENT OPTIONS

Before Session 2, try one:

**Light:** Run one more A/B/C experiment with a different prompt type.

**Medium:** Find a case where the model surprised, disappointed, or concerned you. Write one evidence-based claim: *"When given [prompt], the model [did X], which suggests [Y]."*

**Deep:** Identify a bias, assumption, or default in a model output. Describe what training data or design decision might have produced it.

All work is optional. Pre-generated examples are always available.

---

## SLIDE 20 — See You in Session 2

**Session 2: Images**
*What is an image model actually working with when it sees or generates?*

Same question. Different modality.
The defaults become much harder to ignore when the model has to draw them.
