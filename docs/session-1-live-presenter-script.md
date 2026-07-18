---
layout: page
title: "Session 1 Live Presenter Script"
---

# Session 1: Human Language Model

**Live session:** Saturday, July 11, 2026, 9-11 am Pacific

**Deck:** [Session 1 live deck](https://saberkhan372.github.io/learning-machines-tools/pages/session-1-deck.html)

**Audience view:** [Session 1 audience window](https://saberkhan372.github.io/learning-machines-tools/pages/session-1-deck.html#audience)

**Core question:** When a language model writes, what is it actually doing?

This is a speakable script, not a transcript to follow word for word. Keep the quoted language when it helps; otherwise use the action and transition cues to stay oriented.

## Run order

| Deck slide | Purpose |
|---|---|
| Start + roles | Welcome, consent, and the room-as-model frame |
| 00 - Training data + token vectors | Establish the tiny corpus and the token → vector bridge |
| 01 - Prediction | Build a sentence through repeated next-word votes |
| 02 - Temperature | Compare safe and surprising sampling |
| 03 - Attention | Show context changing what "it" refers to |
| 04 - Alignment | Add human judgment to fluent output |
| 05 - Debrief | Name where prediction, power, and usefulness entered |
| Reset | Short screen break |
| 06 - Tool studio | One tool, one experiment, one claim |
| 07 - Close | Recap, consent reminder, and next Saturday |

## Before participants arrive

1. Open the deck in the presenter window.
2. Click **new session** once to clear rehearsal state.
3. Click **open audience window** and screen-share only that window.
4. Keep the presenter window, Zoom chat, and participant list visible to you.
5. Confirm that changing slides in the presenter view changes the audience view.
6. Confirm the Contextual Vector Lab, Tokenizer + Temperature Visualizer, Count the Next Token, Prediction Game, and ELIZA load without an account. Keep the demo words available in case Zoom chat is slow or difficult to paste.

Do not click **new session** after the live activity begins. Refreshing is safe; starting a new session intentionally clears the room's sentence, tally, attention points, and scores.

## Start + roles

### Do

- Begin recording only after stating the recording and participation norms.
- Ask people to put a quick hello in chat.
- Keep everyone as a predictor. You can serve as sampler and scribe; recruit raters later.

### Say

"Welcome to Learning Machines. This is a camp about investigation, not about becoming better at prompting. Across text, images, and video, we are going to keep asking the same question: what is the machine actually doing?"

"A quick participation note before we begin: this session is recorded for registered participants. Camera and microphone are always optional. You can participate entirely through chat, and you choose whether and how you are named in any public recap. The recording is not used to train AI models."

"Today the Zoom room becomes a language model. You are not pretending to be one smart brain. You are pretending to be many small pieces of a system. Together we will build text one piece at a time, then ask what makes that text useful to a person."

"Our conceptual sequence is token → vector → next-token probabilities → human feedback. Temperature and attention help us inspect what happens inside that sequence; they do not replace it."

"You do not need an AI account for the shared activity. For now, your main tool is Zoom chat."

### Transition

"Before a model can predict anything, it needs a world of patterns to predict from. Let us make that world very small so we can see it."

## 00: Training data + token vectors

### Do

- Click **Copy corpus** and paste the paragraph into Zoom chat.
- Point to the illustrative splits `book / shop` and `after / noon`.
- Point to the illustrative `cat → [0.18, −0.42, 0.07, …]` mapping.
- Open the [Contextual Vector Lab](../tools/contextual-vector-lab/) and choose one ambiguous token. Keep the same token ID and starting vector visible, ask which neighborhood one sentence suggests, then reveal the authored move.
- Ask whether two nearby words might share meaning, occur in similar contexts, or reflect a cultural association in the training data.
- Ask people to notice repeated words and likely continuations.

### Say

"For the next two rounds, this paragraph is our stand-in model's entire world. Read it once. When I ask for a next word, you may only use a word that appears here."

"That restriction is a teaching simplification. A real language model is not limited to one paragraph. It can recombine patterns learned from enormous collections of text. But it is still shaped by what appeared in those collections, what was missing, and what was repeated."

"A model also does not receive text exactly as we see words on a page. It works with tokens: chunks that may be a whole word, punctuation, or part of a word. These splits are illustrative. Real tokenizers choose their own boundaries."

"A token ID then becomes a learned vector: a long list of numbers the system can operate on. If *cat* and *kitten* appear nearby, do not jump straight to ‘the model knows they mean the same thing.’ Their proximity might reflect shared contexts, related meanings, or a cultural association repeated in the training data."

Use one predict → reveal cycle in the Contextual Vector Lab, then ask:

> “Are these words nearby because they mean the same thing, occur in similar contexts, or carry a learned cultural association?”

Keep this move to one word, one sentence, and about two minutes. The lab’s token IDs, vectors, coordinates, and neighbors are authored teaching data. The [Embedding Projector](https://projector.tensorflow.org/) remains a useful real-project reference for static learned neighborhoods. A modern transformer changes a token’s representation according to context across many layers, so neither 2D view is a literal map of the complete model state.

If the lab stalls, keep the illustrative vector on the deck and run the neighborhood prediction verbally. Do not invent a model result; say that the missing reveal would have been an authored projection.

Ask in chat:

"Which words or patterns repeat enough that you would expect them to become likely choices?"

Take two or three responses, then say:

"Good. We are not trying to master embedding geometry. Hold onto the sequence: text becomes tokens, tokens become numerical representations, and context turns those representations into next-token probabilities."

### Transition

"Now let us generate. No one gets to plan the whole sentence. We only get to decide what comes next."

## 01: Prediction

### Do

- Start with **The orange cat**.
- Ask for exactly one next word per person in Zoom chat.
- Paste 10-20 answers into the tally and click **Tally -> audience**.
- Click **Append top word**.
- Repeat the cycle four to six times.

### Say

"Read the sentence exactly as it stands: 'The orange cat.' Type one next word in chat. One word only, and it must come from our paragraph. Do not explain yet."

After the tally appears:

"This bar chart is the room's distribution. We did not all choose the same word, but some choices became more likely than others. For this round our sampler uses a temperature-zero rule: always append the most common choice."

After appending:

"The context has changed. Read the whole sentence again and make a fresh one-word prediction."

Repeat. After the final cycle, ask:

"Did anyone plan this complete sentence? Where did its coherence come from?"

Take two brief responses, then say:

"The sentence emerged from a loop: read the context, propose the next piece, choose one, append it, and repeat. A language model performs a much larger version of that loop. Fluent text can emerge without a plan for the complete answer."

### Transition

"So far we have always taken the safest choice. Real systems can sample differently. Let us change the rule without changing the underlying prediction loop."

## 02: Temperature

### Do

- State that the displayed probabilities are preset and illustrative, not the room's live tally.
- Lower the temperature slider, then sample twice.
- Raise the slider and sample three or four times.
- Ask for one benefit and one risk in chat.

### Say

"These bars are an illustrative model distribution for 'the orange cat blank.' At low temperature, the tallest bar dominates. The model behaves conservatively and often repeats the safest choice."

Sample twice, then raise the temperature.

"Higher temperature flattens the distribution. Lower-probability choices get a better chance. The model is not thinking more deeply; it is taking more risk during sampling."

"In chat, give me one benefit and one risk of turning the temperature up."

After a few responses:

"Higher temperature can make output more varied or surprising. It can also make it unstable or incoherent. Creativity here is not magic. It is partly a willingness to sample a less likely continuation."

"One more distinction: probability is not truth. A token can be a very likely continuation of the text and still make a false claim."

### Transition

"Prediction depends on context. But context is more than the word immediately before the blank. The model has to work out which earlier pieces matter now."

## 03: Attention

### Do

- Show the sentence ending in **too big**.
- Ask whether **it** refers to the trophy or the case.
- Spend attention points on the words participants say matter, then reveal.
- Switch to **too small** and repeat.
- Ask one participant to explain the flip in a phrase.

### Say

"Read this sentence: 'The trophy did not fit in the case because it was too big.' In chat, vote with one word: trophy or case. What does 'it' refer to?"

After votes:

"Which words helped you decide? I am going to spend our ten attention points on the positions you think matter."

Allocate points and reveal. Then switch **too big** to **too small**.

"Now vote again. Nothing about the token 'it' changed. The surrounding context changed, so the route between tokens changed."

"Attention is a mechanism for weighting which positions matter when interpreting other positions. It is not a little person paying attention, and it is not the part that asks whether an answer is helpful or ethical."

Ask:

"What is the smallest change that flipped the meaning?"

### Transition

"Attention helps the model use context. It still does not decide what a person needs from an answer. That brings humans back into the system."

## 04: Alignment

### Do

- Read the apology prompt aloud.
- Split the room loosely into Team A and Team B.
- Ask each team for one complete sentence, prefixed `A:` or `B:` in chat.
- Put one response from each team into the deck.
- Ask raters to score clarity, responsibility, and usefulness.
- Click **Score round -> audience** and name the rewarded pattern.

### Say

"The prompt is: write a one-sentence apology to a teacher for turning in late work. Team A and Team B each get one sentence. We are not judging which sentence sounds fanciest. We are judging which one better serves the person and situation."

After both sentences are visible:

"Raters, score each response for clarity, responsibility, and usefulness. What does the stronger response do that the weaker one does not?"

After scoring:

"Nothing about next-token prediction disappeared. But human judgment now shapes which outputs are rewarded. In real systems this happens through far more data, people, policies, and training steps than our cartoon shows."

"The important idea is not that three sliders explain alignment. It is that 'useful' is not produced by probability alone. People and institutions define, demonstrate, and reward versions of usefulness. Those choices carry values and power."

If time permits, revise the losing sentence once using the named reward pattern.

For an individual or asynchronous follow-up, open the [Whose Preference? Lab](../tools/whose-preference-lab/). Rank the same three responses, reveal the authored panel, then include or exclude rater perspectives and switch the aggregation rule. Ask which definition of “better” became a signal. Keep the boundary explicit: this is a preference-data simulation, not an RLHF training run or a measurement of real groups.

### Transition

"We have played four different parts of the system. Let us step outside the machine and name what just happened."

## 05: Debrief

### Do

- Ask the first question in chat.
- Take one or two spoken responses.
- Prioritize questions 1, 3, and 5 from the deck.

### Say

"First: who had power over the final answer - predictors, sampler, scribe, or raters? Put one role in chat, then add a few words about why."

Then ask:

"When did the output become fluent? When did it become useful? Were those the same moment?"

"What did the attention round show us about context?"

Close the debrief with:

"Generation is the live loop: context, prediction, sampling, append, repeat. Training shaped that loop before we arrived: the available patterns, the likely continuations, and the kinds of answers the system has been rewarded for giving."

"That is why fluent is not the same as true, and fluent is not automatically the same as useful."

## Screen reset

### Say

"Let us take an eight-minute screen break. When we return, you will choose one instrument and test one claim for yourself. Leave the Zoom room open; there is nothing you need to prepare."

Keep the debrief slide visible during the break. Near the end of the break, move to **Tool studio**.

## 06: Tool studio

### Do

- Click **Copy links for chat** and paste the block into Zoom chat.
- Briefly route people by curiosity.
- Give a five-minute warning before regrouping.
- Ask everyone to post one claim in chat before regrouping.

### Say

"The deck activity was a deliberately simplified model. These are the instruments. Choose one tool, run one small experiment, and record one claim on the Text Experiment Board. One finished claim is the goal; visiting every tool is not."

Route participants:

- "Choose the **Contextual Vector Lab** if you want to keep one token fixed and inspect how its neighborhood changes with the sentence."
- "Choose **Tokenizer + Temperature** if you want to inspect token boundaries, probabilities, and sampling."
- "Choose **Count the Next Token** if you want to see training as arithmetic: count, divide, predict."
- "Choose the **Prediction Game** if you want to compare human guesses with a model's top choices."
- "Choose the **Whose Preference? Lab** if you want to see how panel composition and aggregation change which fluent response becomes preferred."
- "Choose **ELIZA** if you want to compare visible hand-written rules with learned statistical patterns."
- "Use the **Text Experiment Board** to capture what you predicted, what changed, and what the evidence supports."

"No account or live AI system is required. You can investigate the frozen examples and visualizers directly."

While circulating, ask:

- "What did you predict before you changed the control?"
- "What is the one variable you changed?"
- "What moved, and what stayed the same?"
- "What claim can you support with that evidence?"

At the five-minute warning, say:

"Five-minute warning. Finish the experiment you are in. Put one claim in chat using this shape: 'When I changed blank, blank changed or stayed the same, which suggests blank.'"

Just before the close, read two contrasting claims aloud without opening a new discussion.

### Transition

"Keep your worksheet open if you want to finish the thought later. Let us close by naming the loop you can now see."

## 07: Close + next week

### Say

"You can now narrate the conceptual sequence: token → vector → next-token probabilities → sample and append → repeat. You can also name the later human judgments that help shape which fluent responses count as useful."

"The session page is the map of everything we touched. The Vocabulary Field Guide has the terms in one place. The Text Experiment Board is there if you want to finish your claim, but this is an invitation, not homework pressure."

"A reminder about the recording: it is shared with registered participants. You choose whether and how your words or work are named in any public recap."

"Next Saturday we move from words to images. The question becomes more visible: what does a model fill in when you do not specify? Same time, same Zoom room. Thank you for making the machine with me today."

### After participants leave

1. Click **copy log** in the presenter bar.
2. Paste the room's sentence, tally, temperature stream, attention map, team outputs, scores, and reward pattern into the private recap notes.
3. Do not publish names, chat excerpts, or participant work without affirmative consent.
4. Note where the pacing stretched, which explanation landed, and which control caused friction.

## Pacing flexes

### If running behind

- Run three prediction cycles instead of six.
- Take two samples at low temperature and two at high temperature.
- Ask only the first and third debrief questions.
- Keep the full attention round.
- Protect the tool studio and the close.

### If running ahead

- Ask two people to justify the attention referent using different context words.
- Revise the weaker alignment sentence and rescore it.
- Let two participants read their tool-studio claims aloud.

### If a live control fails

- Use **Use demo words** for the prediction tally.
- Refresh the presenter and audience windows; session state should restore.
- If the audience window stops following, close it and click **open audience window** again.
- Continue verbally from the visible slide. Every conceptual round can run through Zoom chat without the control panel.
