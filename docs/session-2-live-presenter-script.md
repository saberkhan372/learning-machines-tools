---
layout: page
title: "Session 2 Live Presenter Script: Human Image Model"
---

# Session 2: Human Image Model

**Live session:** Saturday, July 18, 2026, 9–11 am Pacific

**Deck:** [Session 2 live deck](../pages/session-2-deck.html)

**Session page:** [Session 2: Images](../pages/session-images.html)

**Core question:** When an image model generates a picture, what is it actually doing—and what does it decide when we leave details unspecified?

This is a speakable script and facilitation plan, not a transcript to follow word for word. It is designed from the actual Session 1 run, its chat, and the published recap.

## Why this follows Session 1

Session 1 worked best when the room performed a mechanism before receiving its name: participants predicted the next word, saw the distribution, changed one condition, and argued from the result. The most useful discussion came from concrete questions about attention, alignment, power, and classroom use—not from adding more terminology.

This lesson carries those moves forward:

- The room becomes an image model before anyone opens an image generator.
- Each round asks for a short chat action, shows a visible consequence, and names one mechanism.
- New terms are limited to **pixel, feature, diffusion, guidance, and default**.
- A room prediction is treated as a hypothesis; repeated frozen outputs are the evidence.
- Tool studio time is protected. One completed observation is better than a tour of every tool.
- Every activity has a no-account and no-live-generation route.
- Every live control has a chat, screenshot, or manual fallback.
- The critical questions—data, labor, consent, authorship, representation, and classroom boundaries—are part of the mechanism, not an ethics add-on.

The lesson also responds to two points raised in Session 1: beginners need unfamiliar terms defined at the moment of use, and educators want time to translate the mechanism into something they can use with learners.

## Learning goals

By the end of the session, participants should be able to:

1. Distinguish an image representation or recognition demo from an image-generation process.
2. Explain that an image enters a computer as numbers and is often processed through a compressed learned representation.
3. Narrate a simplified diffusion loop: begin with noise, predict an update, refine the whole field, and repeat under prompt guidance.
4. Identify details an image system supplied even though the prompt did not specify them.
5. Separate an observation about outputs from a hypothesis about training data or platform design.
6. Run one controlled A/B/C image comparison and write an evidence-based claim.
7. Name human decisions and hidden labor in an image-generation workflow.

## What counts as evidence

The session deliverable is one completed Image Default Test Board row or an equivalent note with five parts:

1. **Prompt:** What did you ask for?
2. **Unspecified:** What did the prompt leave open?
3. **Observation:** What appeared across the outputs?
4. **Claim:** What does that repeated pattern suggest?
5. **Revision:** What would you change, and why?

Use this sentence frame in the studio and close:

> Across ___ outputs for the prompt “___,” the system repeatedly filled in ___ even though I did not specify it. This suggests ___. I would test that claim next by ___.

One image can start a question. It is not enough to support “the model always does this.”

## Materials

- [Session 2 live deck](../pages/session-2-deck.html)
- [Session 1 recap](../pages/session-1-recap.html)
- [The Squint Test](../tools/feature-extraction-pixel-resolution/)
- [Human Diffusion Canvas](../tools/human-diffusion-canvas/)
- [Diffusion Step-Through Viewer](../tools/diffusion-step-through-viewer/)
- [Default Test Comparison Viewer](../tools/default-test-comparison-viewer/)
- [Prompt Pressure / CFG Scale](../tools/cfg-scale-visualizer/)
- [Dataset Balance Simulator](../tools/dataset-balance-simulator/)
- [Latent Space Compressor](../tools/latent-space-compressor/)
- [Image Prompt Pack](../packs/images/)
- [Image Default Test Board](../worksheets/image-default-test-board/)
- [AI Use + Consent Checklist](../worksheets/ai-use-consent-checklist/)
- Zoom chat and breakout rooms

No participant needs an image-generator account. The featured tools and frozen examples do not call a live model.

## Run of show

| Time | Segment | Room action | Evidence produced |
| --- | --- | --- | --- |
| 0:00–0:05 | Welcome, consent, bridge | Say hello; choose how to participate | Participation choice |
| 0:05–0:10 | Session 1 retrieval | Share two artifacts or one remembered mechanism | Text-to-image bridge |
| 0:10–0:17 | Round 0: Pixels and features | Name the first cue that makes an image recognizable | Recognition threshold |
| 0:17–0:25 | Round 1: The room’s default | Describe the first picture prompted by “a doctor” | Room hypothesis |
| 0:25–0:36 | Round 2: Diffusion — performed, then watched | Draw the words in timed coarse-to-fine steps, then predict what is emerging from the machine’s noise | Human denoising trajectory + step-by-step observations |
| 0:36–0:44 | Round 3: Guidance and revision | Compare vague, specific, and revised prompts | A/B/C comparison |
| 0:44–0:52 | Round 4: Whose picture? | Map human, system, and hidden contributions | Labor/decision map |
| 0:52–1:00 | Mechanism debrief and studio launch | Synthesize the loop and choose a pathway | Shared synthesis |
| 1:00–1:30 | Student work studio | Complete one investigation; post a claim in the final five minutes | One board row and claim |
| 1:30–2:00 | Guest spotlight, Q&A, and close | Artist/educator perspective; final takeaway | New question or connection |

The three blocks are fixed: **60 minutes of facilitated lesson, 30 minutes of student work, and 30 minutes for the guest**. If the guest cancels, keep the 60-minute lesson intact and use the last block for participant sharing and classroom-design breakouts.

## Before participants arrive

1. Open the presenter view of the Session 2 deck.
2. Click **new session** once, before anyone contributes.
3. Open the audience window and plan to share only that window.
4. Keep the presenter window, Zoom chat, participant list, and timer visible to you.
5. Open the Image Prompt Pack and Image Default Test Board in backup tabs.
6. Confirm that the Squint Test, Human Diffusion Canvas, Diffusion Viewer, and Default Test Comparison Viewer work without a login.
7. Open the Human Diffusion Canvas, set **three steps** and **start from noise**, type the Round 2 words, and press **Copy setup link for the class**. Keep the link ready to paste at the start of Round 2 so everyone opens the identical setup.
8. Choose two Session 1 artifacts to invite at the opening, with the creators’ permission.
9. Put the guest’s preferred name, links, and introduction in your notes. Confirm the 30-minute spotlight and agree on the final two-minute handoff.
10. Keep a blank document ready for manual tallies. The Session 1 histogram failure showed that a visible chat count is enough.

Do not click **new session** after the live activity begins. Refreshing is safe; a new session intentionally clears the room’s tally and contribution map.

## Start: welcome, consent, and the bridge

### Do

- Ask for a quick hello in chat.
- Repeat the recording, camera, microphone, and public-recap choices.
- Name the direct-use and no-direct-use routes as equal forms of participation.

### Say

“Last week the room became a language model. We built text one choice at a time and separated prediction, temperature, attention, and human feedback. Today the room becomes an image model.”

“We are not here to get the prettiest picture or to become expert prompt writers. We are here to make a mechanism visible, change one thing, and support a claim with evidence.”

“Camera and microphone are optional. You can work entirely in chat. You do not need an image-generator account, and you can complete every investigation with frozen examples. You choose whether and how your work is named in any public recap.”

### Transition

“In text, the machine chose what came next. In an image, it has to make many spatial choices together—and every blank in the prompt has to become something visible.”

## Session 1 retrieval

### Do

- Invite two people to show or describe one Session 1 artifact in no more than 45 seconds each.
- If no one volunteers, display the recap’s orange-cat distribution and homework-apology comparison.
- Ask the room for the shared method, not a vocabulary quiz.

### Ask

“What was our investigation loop last week?”

Look for: **predict → change one condition → compare → make a claim → name the human decision**.

### Say

“Two ideas carry forward. A probability about language was not the same as truth. And human choices entered through the corpus, the learning setup, and the judgment of what counted as better. In images, those choices become spatial and visible.”

### Transition

“Before a system can generate an image, we need to be precise about what kind of information a computer can receive.”

## Round 0: pixels and features

### Vocabulary

- **Pixel:** one location in a digital image, stored as numerical color values.
- **Feature:** a learned visual pattern that helps a model distinguish or construct structure, such as an edge, texture, part, or arrangement.

### Do

- Start the deck’s image at very low detail.
- Raise detail slowly.
- Ask participants to type the first cue that changes their answer: color, outline, texture, location, or context.
- Toggle from pixels to the simplified feature view.

### Say

“A computer receives an image as numbers. The word *cat* is not stored inside the pixels. During training, a model learns numerical patterns that can function as useful features.”

“This is a representation and recognition demonstration. It is not a literal camera into a diffusion model’s mind. Many current generators do much of their work in a compressed learned space rather than directly editing every final pixel.”

“Notice that you recognized the subject before every detail returned. Which cue did the most work for you?”

### Watch for

Do not say that a generator “sees exactly what you see” or that it stores objects as neat labeled parts. The tool is a teaching model for the path from numerical input to learned visual structure.

### Transition

“We have a numerical image and learned visual patterns. Now let us ask what happens when the prompt does not specify enough to determine one picture.”

## Round 1: the room’s default

### Vocabulary

- **Default:** a detail the system supplies when the prompt leaves it unspecified.

### Do

- Display the prompt **a doctor**.
- Ask for the first picture that comes to mind, in a few words. Speed matters; there is no correct answer.
- Paste 12–20 responses into the deck tally, or count repeated descriptors manually.
- Group only visible conventions: setting, clothing, props, pose, lighting, camera angle, and apparent representation.
- Ask, “What or who is missing from this collective picture?”
- Then open several frozen outputs for the same vague prompt.

### Say

“The room’s response is a hypothesis about a cultural default. It is not evidence of what an image model will do.”

“Now we can compare that hypothesis with outputs. We need more than one image because a single seed can be unusual. We are looking for repetition across a small set.”

“A repeated default can reflect many layers: the images and captions in training data, what was filtered or weighted, the training objective, platform tuning, safety systems, and random sampling. ‘It saw this most’ may be one hypothesis, but it is not the only explanation.”

### Safety note

Ask participants to describe what the image visibly presents and to name uncertainty. Do not require anyone to assign race, gender identity, disability, class, or other identities from appearance. With younger learners, begin with setting, props, pose, and visual style before discussing representation.

Avoid using “a criminal,” “a safe neighborhood,” or similarly loaded prompts as a warm-up. Those prompts can reproduce dehumanizing associations and require a more deliberate safety frame.

### Transition

“Defaults tell us what appeared. Diffusion helps us describe the generation process that produced a particular output.”

## Round 2: diffusion — performed, then watched

### Vocabulary

- **Diffusion:** a family of generation methods that learns to reverse a noise-adding process through many small prediction steps.

This round has two parts: the room performs an analogy by hand (about six minutes), then watches a simplified machine-denoising sequence (about five minutes).

### Part 1 — the room is the denoiser

### Do

- Paste the prepared [Human Diffusion Canvas](../tools/human-diffusion-canvas/) setup link into chat: three steps, starting from noise, with the round’s words already set.
- Use neutral, visual words such as “a cat asleep on a red chair.” Round 1 already carries the loaded-defaults work; this round is about process.
- Say the words aloud once per step. Run three timed steps of roughly 60 seconds: biggest shapes, then forms, then details. The brush shrinks automatically each step.
- Commit together between steps. Each commit drops a veil of noise; point at the noise-remaining meter as it falls on schedule.
- Chat fallback: anyone who cannot draw types what they would commit this step, in a few words.

### Say

“You are the denoiser. There is noise on your canvas and words in your ear. Find the biggest shapes the words suggest and commit to them.”

“Commit means commit in this activity, so we can compare a visible trajectory. A sampler moves forward through timesteps, but later updates can still revise the current image state; our locked rounds are a teaching constraint, not a literal model rule.”

“The veil between steps is the noise you have not yet resolved. It thins on a fixed schedule. So does the model’s.”

### Part 2 — the machine runs an analogous denoising sequence

### Do

- Open the Diffusion Step-Through Viewer at pure noise. Do not reveal its prompt immediately.
- Advance slowly through four checkpoints: composition, subject, edges, and texture/detail.
- Before each advance, ask what participants predict will stabilize next.
- Reveal the prompt after the room has an early hypothesis.

### Say

“A simplified generation loop is: start with noise, use the current image state and the prompt to predict an update, apply a small correction, and repeat. You just did a slow-motion version by hand.”

“Two honest differences. You added marks; the model removes noise everywhere at once, updating the whole field each step. And you know what a cat is; the model has statistics about images that co-occur with these words — not intentions.”

“Many modern systems do this denoising in a compressed latent representation and decode it into pixels near the end. Our viewer makes the sequence visible; it does not reproduce every detail of a commercial system.”

### Ask

- “When did your canvas commit its composition — and when did the machine’s?”
- “Everyone drew the same words. Why do the drawings differ?” Different initial noise is analogous to different seeds. Different hands add human choices the model does not have. Either way, one output is never enough evidence.
- “What changed late that did not change early?”
- “Which early choice constrained everything that followed?”

### Watch for

Do not let the drawing analogy imply the model adds marks or paints strokes. Keep the export moment out of the lesson; participants can save their PNG and trajectory GIF at the start of the studio block.

### Transition

“The prompt pulls the process in a direction, but the strength and wording of that pull are human-set choices.”

## Round 3: guidance and responsible revision

### Vocabulary

- **Guidance:** how strongly a diffusion process is pushed toward the prompt rather than an unguided prediction.

### Do

- Show an A/B/C series using the same seed or frozen comparison whenever possible:
  - **A — vague:** “a doctor”
  - **B — specific:** add one observable context detail
  - **C — responsible revision:** address one default while preserving the task’s purpose
- If time permits, move the CFG slider from low to middle to high.
- Ask what improves and what becomes brittle or artifact-heavy.

### Say

“Adding prompt words and changing CFG are related but different. The words change the condition. CFG changes how hard the system follows that condition.”

“Guidance is not image temperature, and more guidance is not more intelligence. It is a human-set tradeoff. Very low guidance can wander; very high guidance can create artifacts or sameness.”

“A responsible revision is not simply a longer prompt. It names the context or representation that matters to the task. It also gives us a test: did the change affect the default we observed?”

### Ask

- “What stayed constant across A, B, and C?”
- “Which change did the work?”
- “Did the revision change a default or merely route around it?”
- “Who should bear the burden of specifying what the system routinely leaves out?”

### Transition

“Prompting and selection are visible human contributions. They are not the only human contributions in the output.”

## Round 4: whose picture?

### Do

- Fill the deck’s three-column contribution map from Zoom chat.
- Keep the categories distinct:
  - **Human/user:** chose the goal, prompt, constraints, seed or settings, selected an output, cropped, revised, and decided to share.
  - **System/platform:** supplied learned associations, sampled an output, applied filters and product defaults, and rendered the image.
  - **Hidden people/institutions:** image makers, subjects, annotators, data workers, dataset builders, model trainers, safety teams, and communities represented or omitted.
- Ask for one credit, consent, or disclosure decision before moving on.

### Say

“A generated image is not authorless. The user made choices, the system made computational selections, and many people’s work and representation sit behind the training process.”

“We do not have to settle every authorship question today. We do need to avoid describing the output as if no people, institutions, or prior images shaped it.”

“Before public display, ask whether participant work may be shown, how it should be named, and what generated or source material should be disclosed or credited.”

### Transition

“Let us step out of the machine and name what each round made visible.”

## Mechanism debrief

### Do

- Take chat responses first, then one or two spoken responses.
- Prioritize questions 1, 3, and 5 if time is short.

### Ask

1. “What is one thing the Squint Test showed—and one thing it did not show?”
2. “When did composition commit — on your canvas and in the diffusion viewer? What stabilized first?”
3. “What did the prompt leave unspecified, and what repeatedly filled the gap?”
4. “What did guidance improve, and what did it break?”
5. “Which human decision had the most power over the final image?”
6. “What evidence would you need before making a claim about the model rather than one output?”

### Close the mechanism tour

“An image system receives and produces numerical representations. Training teaches it associations among visual patterns and language. Generation begins from noise and uses repeated prompt-conditioned updates. Human-set controls and selection shape the result. Any detail left open is filled from learned patterns and product choices.”

“A coherent picture is not evidence that the system understands the subject. A likely picture is not a neutral picture. And a generated picture is not an authorless picture.”

## Transition into student work

### Say

“That completes the 60-minute lesson. For the next 30 minutes, choose one instrument and complete one observation. You do not need to visit every tool.”

Leave the five-part evidence frame visible while participants choose a pathway.

## Student work studio — 30 minutes

### Do

- Paste the tool links and the worksheet into Zoom chat.
- Remind canvas users to export their PNG and trajectory GIF now if they want to keep them.
- Offer a quiet room, a discussion room, and a classroom-design room if breakout rooms are useful.
- Protect 25 minutes for investigation and use the final five minutes for posting claims.
- Require only one board row and one claim.

### Route by pathway

- **Use:** Run a vague/specific/revised A/B/C series in the Default Test Comparison Viewer or in a live generator you already choose to use.
- **Observe / Critique:** Analyze at least three frozen outputs in the Image Prompt Pack. Separate observation from hypothesis.
- **Teach / Design:** Adapt the Squint Test, Default Test, or Human Diffusion Canvas for a classroom. Write the prompt, collection method, safety frame, and debrief question. The canvas also runs unplugged: paper, thick-to-thin pens, and tracing-paper veils.
- **Build / Code:** Use the Dataset Balance Simulator, Latent Space Compressor, or CFG visualizer to test how one parameter changes the output representation — or rerun the Human Diffusion Canvas and explain what its veil schedule models and where the analogy lies.
- **Critical / No-AI:** Use frozen examples and the consent checklist to audit representation, labor, disclosure, and the limits of the available evidence.

### Say

“Pick one tool. The goal is not a pretty image and not a tour. The goal is one defensible sentence about what changed or what the system filled in.”

“If you are using a live generator, keep the prompt and settings with the output. If you are using frozen examples, note which examples you compared. Either route produces valid evidence.”

### Circulate with

- “What did you predict?”
- “What one variable changed?”
- “How many outputs are you comparing?”
- “What can you observe directly?”
- “What part is still a hypothesis?”
- “What would count as a responsible next test?”
- “How would you run this safely with your learners?”

At 1:25, say:

“Finish the comparison you are in. Put one claim in chat using the frame: ‘Across ___ outputs, the system repeatedly ___, which suggests ___. I would test that next by ___.’”

### Final five minutes: claim share

### Do

- Read two contrasting claims aloud.
- Prefer claims that used different pathways or reached different conclusions.
- For each claim, ask one question only: “What is the evidence?”
- Do not open a new full-group debate or let the share run past 1:30.

### Say

“Notice that disagreement is useful when we can point to the prompt, outputs, and comparison. Our aim is not one verdict on image generation. It is a stronger method for investigating it.”

## Guest spotlight

The Session 1 close announced artist and educator Aurora Mititelu for the image session. The guest block runs from **1:30 to 2:00** and includes the session close.

### Thirty-minute guest arc

- **1:30–1:32 — Introduction:** Welcome the guest and restate the listening prompt.
- **1:32–1:50 — Examples:** The guest shares creative process, authorship, or teaching examples.
- **1:50–1:58 — Q&A:** Take participant questions; use the prepared prompts if needed.
- **1:58–2:00 — Final takeaway and close:** Ask the guest for one practice they want participants to carry forward, then thank them and end.

### Suggested guest frame

Invite the guest to respond through examples rather than a general talk:

1. Show one moment where an image tool changed a creative decision or material process.
2. Show one output that raises a question about authorship, style, consent, or labor.
3. Name one practice artists or learners can use to keep their own judgment visible.

### Transition into the guest

“We have looked at the mechanism through teaching models. Aurora brings the view of an artist and educator working with the medium. As you listen, track one place where a human decision becomes more visible and one place where the system hides a decision.”

### Q&A prompts if the room is quiet

- “Where in your process do you want surprise, and where do you want control?”
- “What do image tools make easier while making something else harder to see?”
- “How do you talk with learners about influence, imitation, and credit?”
- “What would responsible refusal or non-use look like in an art classroom?”

### Close inside the guest block

At 1:58, ask:

“What is one practice you want artists or educators to carry into their next encounter with an image generator?”

While the guest answers, paste the Session 2 page, Image Default Test Board, and Image Prompt Pack into chat. Then say:

“Thank you, Aurora, and thank you, everyone. Next Saturday we move from one image to images across time: what has to stay stable from frame to frame for motion to feel coherent?”

End with the recap consent reminder. Do not add another discussion round after 2:00.

## Assignment options

All work is optional. One rough artifact counts.

- **Default · 15–20 minutes:** Complete one vague/specific/revised comparison and submit the prompt, three outputs, and one claim.
- **Go deeper · 30–45 minutes:** Step through a diffusion sequence and annotate when composition, subject, edges, and detail become stable.
- **Draw · 15–30 minutes:** Run the Human Diffusion Canvas on your own words. Export the PNG and trajectory GIF, note which step committed which decision, and name one place the analogy breaks.
- **Compare · 30–45 minutes:** Use the same prompt across two tools or two frozen sets. Name what varies and what persists.
- **Teach · 45–60 minutes:** Adapt the Squint Test or Default Test into a one-page classroom activity with a safety frame and debrief question.
- **Critical / No-AI · 20–30 minutes:** Annotate three frozen examples for defaults, missing context, labor, disclosure, and the limits of your evidence.

Ask participants to submit one thing they can point to: an annotated screenshot, worksheet row, short comparison, rough lesson, or question supported by examples.

## Pacing flexes

### If running behind

- Use one Session 1 artifact instead of two.
- Cut the Human Diffusion Canvas to two steps — structure and details — and keep the viewer comparison to two checkpoints.
- Demonstrate guidance in the A/B/C comparison and skip the separate CFG slider.
- Ask only debrief questions 3, 5, and 6.
- End the facilitated lesson at 1:00. Do not borrow time from the 30-minute student-work or guest blocks.

### If running ahead

- Run a second room-default prompt such as “a classroom.”
- Compare two seeds before changing the prompt.
- Ask the Dataset Balance Simulator group to explain how its result changes the room’s training-data hypothesis.

### If a live control fails

- Count the visible Zoom chat manually.
- If the drawing canvas stalls or devices cannot run it, ask participants to type what they would commit this step in chat, and continue with the Diffusion Step-Through Viewer alone.
- Advance with screenshots from the Image Prompt Pack.
- Describe a low/middle/high guidance comparison verbally and ask participants to predict the tradeoff.
- Continue with the worksheet. Every core claim can be built from frozen examples.

### If the discussion becomes too broad

Return to three questions:

1. What exactly was the prompt?
2. What exactly appeared across the outputs?
3. What next comparison would test the explanation?

### If participants are overwhelmed

Use only four terms: pixel, diffusion, prompt, default. Say which demos are teaching simplifications. Pair a mechanism explanation with one observable screen change before adding another term.

## After participants leave

1. Copy the deck log and save the room’s default tally, contribution map, and studio claims.
2. Record which tool participants chose and where they stalled.
3. Save claims as private recap notes until contributors have made an affirmative naming and sharing choice.
4. Distinguish participant observations from facilitator interpretation in the recap.
5. Note whether the recognition/generation distinction held, whether the diffusion explanation landed, and whether the studio produced finished evidence.
6. Preserve guest links and wording exactly enough for the guest to review their recap section.

## Facilitation guardrails

- Do not say that an image model literally “sees” objects as humans do.
- Do not say that diffusion reveals an image already hidden in noise.
- Do not let the drawing analogy imply the model adds marks; it updates the whole field at once by removing predicted noise.
- Do not imply that the activity's locked rounds mean model structure is locked; later denoising updates can still revise the current representation.
- Do not equate adding prompt detail with changing CFG.
- Do not call CFG “image temperature.”
- Do not infer personal identity as fact from appearance.
- Do not generalize from one output to an entire model or all image generators.
- Do not reduce defaults to training-data frequency alone; include curation, captions, filtering, objectives, tuning, safety systems, and sampling.
- Do not display participant work publicly without affirmative consent.
- Do not frame direct AI use as the advanced pathway and critique/non-use as secondary.
