/* Learning Machines — session run-of-show data (single source of truth).

   This drives BOTH the live Run Console (pages/run-console.html) and the
   Session Link Sheet (pages/session-links.html). Edit a session's spine here
   once and both surfaces update.

   Each step is one run-of-show block: a time window, the facilitator move, the
   participant action, and the tool(s)/worksheet(s) that block runs live. Paths
   are repo-relative from the site root; absolute URLs are computed per host so
   the data is correct on GitHub Pages, localhost, or a school mirror.

   tool fields: { name, path, optional?, worksheet? } */
window.LM_SESSION_RUNS = [
  {
    id: "1", num: "01", mod: "text",
    title: "Session 1 — Text", kicker: "How machines write",
    when: "Sat July 11 · 9–11 am PT", date: "2026-07-11",
    explore: "Tokens, prediction, and temperature — and why fluent output isn't the same as understanding.",
    asyncPrompt: "Pick one sentence stem in the Text Experiment Board (or a frozen example), predict the next word yourself, then compare it to the model's top choice. Share what you disagreed on and name one reason why.",
    recap: { video: "https://youtu.be/zulcCbYdvwc", written: "We started with some genuine ambivalence — mine included. This is a fraught topic, but there's a lot of fun and learning underneath it, and I wanted us to hold both. If you came in worried, I hoped you'd leave more fluent about why. If you came in excited, I hoped you'd pick up some of the concern.\n\nWe spent the first chunk being the model ourselves. I dropped a passage about an orange cat in a bookshop and asked everyone: what's the next word? The room leaned toward 'walks' — the literal first verb in the corpus — with 'jumps,' 'reads,' and 'looks' among the alternatives. That's prediction: pattern-matching on what it's seen. Not wrong, just not interesting yet. Temperature is what opens it up — and the counterintuitive part is that you have to add uncertainty to get something useful.\n\nThe trophy-case exercise landed for a lot of people. 'The trophy didn't fit in the case because it was too big' versus 'too small' — one word flip, and the pronoun points somewhere completely different. That's attention: the model holding the whole sentence in relation to itself. That's the transformer breakthrough.\n\nThen we compared two homework apologies. Team A took responsibility with a new timeline. Team B said 'I was really busy, hope that's okay.' Almost everyone chose A. There's no pure machine answer for that — that's alignment, and it takes enormous human effort.\n\nELIZA is still my favorite illustration. A few dozen rules, keyword-matching, and it holds a conversation. But the contrast is the whole point: you can see exactly how ELIZA works. An LLM takes the opposite approach — instead of writing rules, it studies the entire language through a neural net and uses that to respond to anything, even nonsense. Shane made the connection late in the session: it's like vibe coding where you let go of the mental model because the output looks stable. That's also why even the people who built these things can't fully explain them.\n\nAngela's question is the one I want to carry into every session: who made the model, and what's baked into it? It connects the technical to the social. Dr. Tiffany Tseng closed with work from her Design Tools Lab at Barnard — tools that let non-experts create with ML. I left with a reframe: move away from asking whether AI replaces creativity and toward asking how it changes creative work. That's worth carrying forward.", writtenHref: null },
    facilitation: "pages/docs-session-1-facilitation.html",
    overview: "pages/session-text.html",
    deck: "pages/session-1-deck.html",
    steps: [
      { time: "0–5", segment: "Welcome & norms",
        move: "Name the question. Remind everyone direct AI use is optional.",
        action: "Choose a participation pathway.",
        tools: [] },
      { time: "5–15", segment: "Unplugged prediction",
        move: "Show a sentence stem; collect guesses in Zoom chat, then paste the chat block into the Prediction Game to tally the room beside the model's top-k. Follow with Count the Next Token to show the arithmetic.",
        action: "Predict next words; compare the room's distribution with the model's, then watch count → divide → predict.",
        tools: [
          { name: "Next-Token Prediction Game", path: "tools/next-token-prediction-game/" },
          { name: "Count the Next Token", path: "tools/count-the-next-token/" }
        ] },
      { time: "15–35", segment: "Tokenizer + Temperature",
        move: "Show token chunks, then run one prompt at low and high temperature.",
        action: "Notice token boundaries, probability bars, greedy vs. sampled.",
        tools: [ { name: "Tokenizer + Temperature Visualizer", path: "tools/tokenizer-temperature-visualizer/" } ] },
      { time: "35–55", segment: "ELIZA vs. LLM",
        move: "Inspect the matched rule, pattern, and response template.",
        action: "Compare visible rule-matching with pre-generated LLM examples.",
        tools: [ { name: "ELIZA Simulator", path: "tools/eliza-simulator/" } ] },
      { time: "55–75", segment: "Investigation",
        move: "Assign one Text Experiment Board section.",
        action: "Run or analyse a default test, prompt variation, or comparison.",
        tools: [ { name: "Text Experiment Board", path: "worksheets/text-experiment-board/", worksheet: true } ] },
      { time: "75–90", segment: "Debrief",
        move: "Use the frame: human, machine, system, ethics, pedagogy. Optionally have one group log a baseline + change in the A/B/C board.",
        action: "Share one evidence-based claim and one question.",
        tools: [ { name: "A / B / C Comparison Board", path: "tools/abc-comparison-board/", optional: true } ] }
    ]
  },
  {
    id: "2", num: "02", mod: "image",
    title: "Session 2 — Images", kicker: "How machines imagine",
    when: "Sat July 18 · 9–11 am PT", date: "2026-07-18",
    explore: "Pixels, features, and diffusion — and the visual defaults a model fills in when you don't.",
    asyncPrompt: "Using the Image Default Test Board (or a frozen example), choose one vague prompt and note what the image fills in without being asked. Share one default you spotted and name what you think it reveals.",
    recap: { video: null, written: null, writtenHref: null },
    facilitation: "pages/docs-session-2-facilitation.html",
    overview: "pages/session-images.html",
    deck: "pages/session-2-deck.html",
    steps: [
      { time: "0–5", segment: "Welcome & bridge",
        move: "Connect Session 1 to Session 2: text becomes tokens; images become pixels, features, and learned patterns.",
        action: "Choose a participation pathway.",
        tools: [] },
      { time: "5–25", segment: "Feature / pixel activity",
        move: "Open Feature Extraction. Switch image types and reduce detail until recognition becomes difficult.",
        action: "Identify which cues return first: colour, outline, texture, context, or location.",
        tools: [ { name: "The Squint Test (feature extraction)", path: "tools/feature-extraction-pixel-resolution/" } ] },
      { time: "25–45", segment: "Diffusion step-through",
        move: "Open the Diffusion Viewer. Move slowly from pure noise to final image and read the prompt guidance.",
        action: "Describe what appears at each stage: composition, subject, edges, texture, details.",
        tools: [ { name: "Diffusion Step-Through Viewer", path: "tools/diffusion-step-through-viewer/" } ] },
      { time: "45–70", segment: "Default Test",
        move: "Introduce a vague prompt such as “a doctor,” “a classroom,” or “a beautiful home,” then compare against specific and revised prompts.",
        action: "Generate, observe, or critique outputs and fill the Image Default Test Board.",
        tools: [
          { name: "Default Test Comparison Viewer", path: "tools/default-test-comparison-viewer/" },
          { name: "Image Default Test Board", path: "worksheets/image-default-test-board/", worksheet: true }
        ] },
      { time: "70–90", segment: "Debrief",
        move: "Ask what the system filled in without being asked and where those defaults may come from.",
        action: "Share one observed default and one responsible revision.",
        tools: [ { name: "A / B / C Comparison Board", path: "tools/abc-comparison-board/", optional: true } ] }
    ]
  },
  {
    id: "3", num: "03", mod: "video",
    title: "Session 3 — Video", kicker: "How machines move",
    when: "Sat July 25 · 9–11 am PT", date: "2026-07-25",
    explore: "Time, drift, and coherence — and why moving images are harder than single frames.",
    asyncPrompt: "Open the Video Failure Gallery Viewer (or watch a frozen clip) and find one failure mode in a sequence — identity drift, physics break, or style drift. Describe exactly where it first appears and what you think triggered it.",
    recap: { video: null, written: null, writtenHref: null },
    facilitation: "pages/docs-session-3-facilitation.html",
    overview: "pages/session-video.html",
    deck: "pages/session-3-deck.html",
    steps: [
      { time: "0–5", segment: "Welcome & bridge",
        move: "Connect Session 2 to Session 3: a good frame is not enough; video must stay coherent across time.",
        action: "Choose a participation pathway.",
        tools: [] },
      { time: "5–35", segment: "Temporal Telephone · round 1",
        move: "Open Temporal Telephone in previous-frame-only mode. Use “a person at work” as the vague prompt, then check motion defaults after playback.",
        action: "Draw/save frames or observe where defaults and small changes accumulate into drift.",
        tools: [ { name: "Temporal Telephone", path: "tools/temporal-telephone/" } ] },
      { time: "35–50", segment: "Temporal Telephone · round 2",
        move: "Switch to anchor mode and repeat with the same basic subject or motion.",
        action: "Compare whether identity, layout, and motion stay more stable.",
        tools: [ { name: "Temporal Telephone (anchor mode)", path: "tools/temporal-telephone/" } ] },
      { time: "50–70", segment: "Failure analysis",
        move: "Scrub curated clips and still frames. Name failure modes precisely.",
        action: "Mark identity drift, physics breaks, camera inconsistency, style drift, or temporal jumps.",
        tools: [ { name: "Video Failure Gallery Viewer", path: "tools/video-failure-gallery-viewer/" } ] },
      { time: "70–90", segment: "Video Test Report",
        move: "Ask participants to complete one A/B/C or failure-analysis section.",
        action: "Share one coherence claim and one responsible-use boundary.",
        tools: [ { name: "Video Test Report", path: "worksheets/video-test-report/", worksheet: true } ] }
    ]
  },
  {
    id: "studio", num: "04", mod: "cross",
    title: "Studio — Showcase", kicker: "Human in the loop",
    when: "Optional studio · presentation format", date: null,
    explore: "Show what you made, document the evidence behind it, and adapt it for a classroom.",
    asyncPrompt: null,
    recap: { video: null, written: null, writtenHref: null },
    facilitation: "pages/docs-showcase-facilitation.html",
    overview: "pages/session-showcase.html",
    toolkit: [
      { name: "Evidence Wall", path: "tools/evidence-wall/" },
      { name: "Model Card Builder", path: "tools/model-card-builder/" },
      { name: "Classroom Activity Builder", path: "tools/classroom-activity-builder/" },
      { name: "A / B / C Comparison Board", path: "tools/abc-comparison-board/" }
    ],
    steps: [
      { time: "0:00–0:10", segment: "Welcome + framing",
        move: "Facilitator-led. Set the share norms and the consent recap.",
        action: "Settle in; confirm what may be shown.",
        tools: [] },
      { time: "0:10–1:25", segment: "Presentations",
        move: "Participants present, ~10 min each. Capture shared claims on the Evidence Wall.",
        action: "Show one artifact and the evidence behind it.",
        tools: [ { name: "Evidence Wall", path: "tools/evidence-wall/" } ] },
      { time: "1:25–1:50", segment: "Collective reflection",
        move: "Whole group. Document durable claims and responsible-use limits.",
        action: "Name one thing you'll carry into a classroom.",
        tools: [
          { name: "Model Card Builder", path: "tools/model-card-builder/", optional: true },
          { name: "Classroom Activity Builder", path: "tools/classroom-activity-builder/", optional: true }
        ] },
      { time: "1:50–2:00", segment: "Closing",
        move: "Facilitator-led. Point to async catch-up and next steps.",
        action: "Pick one next action.",
        tools: [] }
    ]
  }
];
