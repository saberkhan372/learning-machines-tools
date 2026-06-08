---
layout: page
title: Pilot Agenda
---

# Pilot Agenda — 60–90 Minutes

A condensed single-session pilot using only launch-ready tools. Use this to test the core investigation protocol, gather evidence, and identify launch blockers before the full run of three core sessions plus optional studio.

---

## Pilot Goal

Validate that the camp's core investigation protocol works with real participants:

> **Unplugged experience → tool mechanism → structured investigation → evidence-based claim → ethical reflection**

A successful pilot answers: does this work in 60–90 minutes, with mixed audiences, using only GitHub Pages tools and no live AI dependency?

---

## Participant Profile

This pilot is designed for:
- 4–12 participants
- Mixed backgrounds (educators, artists, students — no ML background assumed)
- Virtual (Zoom), with screen share
- Asynchronous access pathway available (recording + notes)

---

## Tools Required

All tools must be open and tested before participants arrive.

| Tool | URL | Session it supports |
|---|---|---|
| Tokenizer + Temperature Visualizer | https://saberkhan372.github.io/learning-machines-tools/tools/tokenizer-temperature-visualizer/ | Session 1 — Text |
| ELIZA Simulator | https://saberkhan372.github.io/learning-machines-tools/tools/eliza-simulator/ | Session 1 — Text |
| Diffusion Step-Through Viewer | https://saberkhan372.github.io/learning-machines-tools/tools/diffusion-step-through-viewer/ | Session 2 — Images |

No live AI model accounts required. All tools work offline after initial load.

---

## Agenda — 75 Minutes (recommended)

### 0:00–0:08 — Welcome and framing

Say:

> "This camp is about investigation. The question we ask every session is: what is the machine actually doing? We are not here to learn to prompt better. We are here to collect evidence."

Introduce participation pathways in one sentence:

> "Every activity today has a direct-use path, an observation path, and a no-AI path. You pick."

---

### 0:08–0:18 — Unplugged: Next-word prediction (10 min)

Put this sentence in the chat:

> *"The coffee was hot, so she —"*

Ask everyone to type their completion without overthinking. Collect 5–6 in chat.

Ask:
- What word did most people choose?
- Why that word?
- What changes if I say "so the programmer —" instead?

Key point: language models do this at scale, for every token. They are not deciding what is true — they are predicting what usually comes next.

Then show this sentence:

> *"The doctor entered the room and —"*

Hold it. We will come back to it.

---

### 0:18–0:35 — ELIZA Simulator (17 min)

Open the [ELIZA Simulator](https://saberkhan372.github.io/learning-machines-tools/tools/eliza-simulator/) on screen. Walk through one example as a group:

1. Type "I feel really sad today" — point to the Rule Inspector
2. Show: keyword found → rule selected → pattern matched → template filled
3. Ask: at what point did this feel like it understood you?

Then 8 minutes independent exploration. Suggested prompts in the chat:
- "I feel like the concept of mother is overrated"
- "The weather is nice today"
- "What is the capital of France?"

Bring back together. Ask: "What broke the illusion? What kept it?"

Key contrast to introduce: ELIZA fails visibly; LLMs fail fluently. Neither understands. The failure modes are just different.

---

### 0:35–0:55 — Diffusion Step-Through Viewer (20 min)

Open the [Diffusion Step-Through Viewer](https://saberkhan372.github.io/learning-machines-tools/tools/diffusion-step-through-viewer/).

**Part 1 — Mechanism (5 min):**
Start at Step 0 (noise). Step slowly to 20 together. Ask: when did you first recognize the subject? What appeared first — color, shape, or detail?

Key point: generation is not drawing from imagination. It is iterative denoising. Color (low frequency) before detail (high frequency).

**Part 2 — Default Test (10 min):**
Switch to "A doctor" sequence. Start at Step 0. Step to 20 together.

Ask participants to name what they see before you name it:
- What skin tone?
- What gender expression?
- What setting?
- What props?

Ask: "Where do those defaults come from?"

Key point: the prompt never specified any of this. The model filled every gap. Those gap-fillers come from training data.

Remember the sentence from the opening: "The doctor entered the room and —"
In Session 1 the model predicted a word. Here it predicted an image. Same mechanism. Different modality.

**Observation / no-AI pathway:** Analyze the pre-generated sequences instead of generating anything. The mechanism is visible in the tool regardless.

---

### 0:55–1:10 — Short investigation: Text or Image Default Test (15 min)

Participants choose:

**Option A — Text Default Test (no tools, no account needed):**
Write a vague prompt. Predict what a language model would produce by default. Then compare to a pre-generated example or generate yourself. Fill the claim box: "When given [prompt], the model defaulted to [X], which suggests [Y]."

**Option B — Image Default Test (using the Diffusion viewer):**
Pick one of the available sequences. Document what appeared by default. Name: subject, setting, representation choices. Write a one-sentence claim.

**Option C — No-AI pathway:**
Choose any pre-generated example from the session. Write a one-sentence claim about what the model assumed.

---

### 1:10–1:20 — Share out (10 min)

3–4 participants share one specific example:

> *"My prompt was X. The model did Y. I was surprised / not surprised by Z because ___."*

Facilitator captures in shared notes: one claim per participant.

---

### 1:20–1:28 — Ethics reflection (8 min)

Quick group reflection. Ask two questions:

1. What did the machine assume that no one asked it to assume?
2. Where did human judgment enter the loop?

Optional: run the Human / Machine / System / Ethics frame quickly:
- Human: what did you decide?
- Machine: what did it predict or assume?
- System: what training data or design choice produced that?
- Ethics: who might be affected by that default?

---

### 1:28–1:35 — Close + feedback (7 min)

Announce what comes next in the full camp:
- Session 1 goes deeper on text: tokenization, temperature, probability
- Session 2 goes deeper on images: full diffusion, feature extraction, Default Test board
- Session 3 adds video: temporal drift, coherence, failure modes
- The optional studio is the showcase

Invite participants to fill out the post-session feedback form.

---

## Evidence to Collect During the Pilot

**Facilitator records:**

| What to observe | What to write down |
|---|---|
| Which participation pathway did participants naturally gravitate toward? | Direct use / Observe / No-AI — count |
| At which tool did participants first seem genuinely engaged? | Tool name + what they were doing |
| Which moment produced the most conversation? | Time + what was said |
| Did any participant express discomfort or concern? | What was the concern? How was it handled? |
| Were there any tool failures or load issues? | Tool, error, impact |
| What claims did participants make in the share-out? | Quote them directly |
| What questions did participants leave with? | Quote them directly |

**Post-session feedback to collect:**

- Did the tools work on your device?
- Which activity was most useful?
- Which activity was least useful?
- What would you change?
- Would you attend the full camp with three core sessions plus optional studio?
- What would have made this a better pilot?

---

## Launch Blockers

**Do not launch the full camp if:**

| Blocker | Threshold |
|---|---|
| Tool failure rate | Any tool fails to load on more than 1 participant's device |
| Participation pathway gap | No-AI participants have nothing to do during tool segments |
| Consent / comfort issue | Any participant expresses discomfort that was not anticipated or handled well |
| Mechanism clarity | Fewer than half of participants can articulate one claim from the investigation |
| Time overrun | The 75-minute agenda requires more than 90 minutes to complete |

**Address before launch:**

| Issue | Response |
|---|---|
| Tool load time | Pre-cache all tools in facilitator's browser; provide direct links in chat at each transition |
| No-AI pathway gap | Prepare 3–5 printed or PDF pre-generated examples participants can analyze offline |
| Participant comfort | Review interest form responses before the pilot; follow up individually if someone flagged concerns |

---

## Optional: 60-Minute Version

Drop the independent investigation and run a full-group demo of the Diffusion viewer Default Test instead.

| Block | Time |
|---|---|
| Welcome + framing | 5 min |
| Next-word prediction | 8 min |
| ELIZA Simulator | 12 min |
| Diffusion Step-Through Viewer | 20 min |
| Share out + ethics reflection | 10 min |
| Close + feedback | 5 min |
