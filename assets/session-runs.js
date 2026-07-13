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
    recap: {
      video: null, writtenHref: null, written: null,
      sections: {
        summary: "We started with genuine ambivalence — mine included. Six things later, most people left with a more precise version of the concern and a better vocabulary for the mechanism. Here's what we actually looked at.",
        investigated: [
          "How a language model predicts the next word — token by token, probability not meaning.",
          "How temperature slides output from predictable to surprising, and why adding uncertainty is the point.",
          "What attention does: routes pronoun reference across the whole sentence, not just nearby words.",
          "How ELIZA's visible rule-matching contrasts with an LLM's opaque neural approach — and why that contrast matters.",
          "Where alignment lives: the human scoring and feedback that shapes what counts as a 'better' response."
        ],
        mechanisms: [
          { name: "Tokenization", where: "Orange-cat passage", observed: "Text splits at unexpected places — not how a human reader would cut a sentence." },
          { name: "Next-token prediction", where: "Room guessing game", observed: "Room split toward 'walks'; model's top choice matched the corpus. Pattern-matching, not understanding." },
          { name: "Temperature", where: "Tokenizer + Temperature Visualizer", observed: "Low temp: safe and repetitive. High temp: surprising, sometimes unstable. The dial adds uncertainty on purpose." },
          { name: "Attention", where: "Trophy-case pronoun flip", observed: "'Too big' → 'too small' — one word flipped which object the pronoun referred to. The model held the whole sentence in relation to itself." },
          { name: "Alignment (RLHF)", where: "Homework apology comparison", observed: "Almost everyone chose Team A. There's no pure machine answer for that — scoring better responses takes enormous human effort." }
        ],
        patterns: [
          { what: "Fluency consistently outran accuracy in first impressions — outputs felt more correct than they were.", suggests: "The gap between 'sounds right' and 'is right' is the central risk in classroom use.", next: "Build in a verification step before treating LLM output as factual." },
          { what: "ELIZA's responses felt warmer than expected even when the rule was fully visible.", suggests: "Fluency perception overrides mechanism knowledge — even when we can see exactly what's happening.", next: "Carry this into Session 2: what defaults does an image model fill in when you don't ask?" }
        ],
        hmse: {
          human: "RLHF teams scored which homework apology was better — Team A, with accountability and a new timeline. That judgment is now baked into the model.",
          machine: "Both apologies were fluent. The LLM couldn't distinguish the better one without alignment training — and even then, it can only reflect the scoring it received.",
          system: "Training corpus determines token probabilities. 'Walks' follows 'cat' more often than 'jumps' does — that's all the model knows. Angela asked: who built that corpus, and what's in it?",
          ethics: "Dr. Tiffany Tseng's closing question — 'how does AI change the work?' rather than 'does it replace creativity?' — reframes the whole thing. Shane's connection: it's like vibe coding. You let go of the mental model because the output looks stable."
        },
        classroom: {
          students: "The next-word prediction game works with any paragraph and paper/pencil — no login, no AI account, no generation required.",
          shortCircuit: "If students use AI to generate rather than predict, they skip the 'being the model' experience that makes the mechanism visible.",
          noAI: "Unplugged version: sentence stems on a slide, hands raised or chat tally, whiteboard distribution — then compare to the model's top-k side by side."
        },
        next: {
          prep: "Session 2 — Images — Saturday July 18. Core question: when an image model generates a picture, what is it actually deciding?",
          asyncRoute: {
            prompt: "Pick one sentence stem in the Text Experiment Board (or a frozen example), predict the next word yourself, then compare it to the model's top choice. Share what you disagreed on and name one reason why.",
            worksheetPath: "worksheets/text-experiment-board/",
            packPath: "packs/text/"
          }
        }
      }
    },
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
