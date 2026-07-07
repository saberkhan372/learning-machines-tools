---
layout: page
title: "Session 1: Text"
---

# Session 1: Text
## How do language models generate text that feels meaningful?

**Learning Machines: Text, Images, Video — CC Fest**
**Duration:** 2 hours | **Format:** Virtual, Zoom

---

## What We'll Do

In Session 1 we investigate text generation. We start with a simple game that reveals something the model is actually doing, then use two tools to see the mechanism up close. We finish with a structured investigation using real prompts.

By the end of this session you will be able to:
- Explain what a token is and why tokenization matters
- Describe what temperature does to next-token sampling
- Distinguish ELIZA-style pattern matching from LLM-style prediction
- Run a controlled A/B/C prompt experiment and make a claim based on evidence

**Tools:** [Next-Token Prediction Game](https://saberkhan372.github.io/learning-machines-tools/tools/next-token-prediction-game/) · [Tokenizer + Temperature Visualizer](https://saberkhan372.github.io/learning-machines-tools/tools/tokenizer-temperature-visualizer/) · [ELIZA Simulator](https://saberkhan372.github.io/learning-machines-tools/tools/eliza-simulator/)
**Worksheet:** [Text Experiment Board](../worksheets/text-experiment-board/) ([printable Markdown](../worksheets/text-experiment-board.html))

---

## Session Flow

| Time | Block | Format |
|---|---|---|
| 0:00–0:10 | Welcome + framing | Facilitator-led |
| 0:10–0:25 | Unplugged: next-word prediction | Whole group |
| 0:25–0:50 | ELIZA Simulator | Pairs or solo |
| 0:50–1:20 | Tokenizer + Temperature Visualizer | Pairs or solo |
| 1:20–1:40 | Structured investigation: Text Experiment Board | Solo |
| 1:40–1:55 | Share + debrief | Whole group |
| 1:55–2:00 | Assignment intro | Facilitator-led |

---

## Opening (0:00–0:10)

> *[Scripted framing — say something like this to open the session]*

Welcome to Learning Machines. This is a camp about investigation, not about learning to prompt better. We are going to ask the same question all summer: what is the machine actually doing?

We are not going to trust what the interface says. We are going to look for evidence.

Today is about text. Language models are the most fluent AI systems most people encounter, and that fluency is easy to mistake for understanding. Our job today is to get underneath the fluency and see what is actually happening.

Three things to keep in mind as we go:
- **The machine does not understand.** It predicts. Those are not the same thing.
- **Outputs are not neutral.** The training data, the interface, and the system choices all shape what you see.
- **You are always deciding something the machine does not.** We are going to name that at the end.

---

## Unplugged Activity: Next-Word Prediction (0:10–0:25)

**Goal:** Make the token-prediction mechanism intuitive before we see it in a tool.

> *[Run this as a fast group activity in Zoom chat or out loud]*

Ask everyone to finish this sentence without overthinking it:

> *"The coffee was hot, so she —"*

Collect responses in chat. Then copy the chat block and paste it into the
[Next-Token Prediction Game](https://saberkhan372.github.io/learning-machines-tools/tools/next-token-prediction-game/)
— it tallies the room's guesses into a live distribution and shows it beside a
precomputed model top-k for the same kind of stem. Then ask:

- What word did most people choose? Why?
- Where does the room's distribution agree with the model's? Where does it differ?
- What if I said this instead: *"The coffee was hot, so the programmer —"*
- How did the added word change your prediction?

**Key point to make:** Language models do this at scale, for every word, using patterns learned from billions of sentences. They are very good at predicting what usually comes next. They are not deciding what is true.

Then run one more:

> *"The doctor entered the room and —"*

Hold that sentence. We will come back to it in Session 2 when we look at image defaults.

---

## ELIZA Simulator (0:25–0:50)

**Tool:** [ELIZA Simulator](https://saberkhan372.github.io/learning-machines-tools/tools/eliza-simulator/)

ELIZA was built in 1966. It has no model, no training data, and no understanding of language. It matches patterns and fills in templates. It still sounds surprisingly coherent.

### What to do

1. Open the tool. Read the interface — notice the "Matched rule" and "Pattern" panels on the right.
2. Type a message. Watch which rule fired, what pattern it matched, and how the response was constructed.
3. Try to break it: say something that doesn't match any pattern.
4. Try to make it seem like it understands: what phrasing trips it up?

### Discussion prompts

- At what point did ELIZA feel like it understood you?
- What did it take to break the illusion?
- A modern LLM also does not understand — it predicts tokens. But it trained on billions more patterns. What changes? What stays the same?

> *[After 10–12 minutes of exploration, bring the group back for a quick share. Ask 2–3 people: "What did you find?"]*

---

## Tokenizer + Temperature Visualizer (0:50–1:20)

**Tool:** [Tokenizer + Temperature Visualizer](https://saberkhan372.github.io/learning-machines-tools/tools/tokenizer-temperature-visualizer/)

This tool shows what happens when a language model actually picks the next token. We can see the probability distribution, change the temperature, and watch what shifts.

### What to do — Part 1: Tokenization (10 min)

1. Type a sentence. Watch it get chunked into tokens.
2. Notice where the boundaries land. Common words are often single tokens. Rare words or names get split.
3. Try: a common word, a technical term, a name, a word with a suffix like *-tion* or *-ing*.

**Questions to hold:**
- Why does chunking matter? (The model processes tokens, not letters or words.)
- What gets distorted when a word spans multiple tokens?

### What to do — Part 2: Temperature (15 min)

1. Pick a scenario and run the next-token predictor.
2. Set temperature to 0. Watch which token wins. Run it several times — the output should be identical.
3. Slowly raise temperature to 1.0, then 1.5. Watch the distribution flatten.
4. At high temperature, which tokens become plausible that weren't before?

**Key idea to surface:**
- Low temperature → the top token dominates. Predictable, safe, repetitive.
- High temperature → the distribution flattens. Surprising, sometimes creative, sometimes nonsensical.
- Probability is not truth. The model can confidently predict something false.

### Discussion prompts

- What did greedy decoding feel like compared to sampling?
- When would you want low temperature? High temperature?
- If the model assigns a 70% probability to a token, does that mean it's 70% confident it's true?

> *[Bring the group back. Ask: "What surprised you? What confirmed what you expected?"]*

---

## Structured Investigation: Text Experiment Board (1:20–1:40)

**Worksheet:** [Text Experiment Board](../worksheets/text-experiment-board/) ([printable Markdown](../worksheets/text-experiment-board.html))

This is individual work time. Participants choose an LLM tool (ChatGPT, Claude, Gemini, etc.) and run a controlled prompt experiment, or they analyze pre-generated examples if they prefer not to use a tool directly.

### Protocol

1. Choose a prompt type: story, description, explanation, dialogue, or Default Test.
2. Write version A — your baseline prompt.
3. Write version B — change one thing deliberately.
4. Write version C — respond to something that surprised or bothered you in A or B.
5. Fill in the worksheet: what changed, what you learned, what the machine added that you didn't ask for.

### Facilitator notes

> - Circulate (in breakout rooms or in chat). The most common stall is picking a prompt. Suggest: "Start with something you would actually assign to students, or something you personally find interesting."
> - Watch for participants who get absorbed in chatting with the model instead of running a controlled test. Redirect: "What's your variable? What's staying constant?"
> - If someone hits a refusal or filter, that's valid data. Add it to the worksheet.

---

## Share + Debrief (1:40–1:55)

Ask 3–4 participants to share one thing from their Text Experiment Board — not a summary, a specific example: "My prompt was X. The model did Y. I was surprised by Z."

**Debrief questions:**

1. What did the model add to your prompt that you didn't specify?
2. What would you call what the model was doing — writing, predicting, imitating, or something else?
3. Where did human judgment enter the loop?
4. What concerned you?

> *[Close the debrief with something like:]*
>
> What we just did is the core protocol we'll use all summer. Hypothesis, controlled test, output comparison, claim, reflection. In Session 2 we apply the same protocol to images — and we'll see that what the model assumes becomes much more visible when it has to draw it.

---

## Assignment (1:55–2:00)

> *[Optional — assign based on participant interest level]*

Before Session 2, try one of these:

- **Light:** Run one more A/B/C experiment with a different prompt type. Add it to your Text Experiment Board.
- **Medium:** Find a case where the model's output surprised, disappointed, or concerned you. Write a short evidence-based claim: "When given [prompt], the model [did X], which suggests [Y]."
- **Deep:** Identify a bias, assumption, or default in a model output. Describe what training data or design decision might have produced it.

All work is optional. Pre-generated examples are always available if you do not want to use an AI tool directly.

---

## Facilitation Notes

**Common questions:**

- *"Is this model good or bad?"* — Redirect: "What is it doing? What does the evidence show?"
- *"Can the model actually understand?"* — Hold the question open: "What would understanding require that prediction doesn't?"
- *"Is it cheating to use AI?"* — Reference the consent checklist. AI use is always optional and always visible. The point is investigation, not output.

**If time is short:**
Skip the structured investigation and use the last 30 minutes for a full-group demo of the Tokenizer tool instead. Make sure everyone sees the temperature effect before the session ends.

**If participants are ahead:**
Ask them to write a one-sentence claim on their findings in the chat. Use those as opening material for the debrief.
