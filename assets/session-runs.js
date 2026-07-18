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
    explore: "Token → vector → next-token probabilities → human feedback — and why fluent output isn't the same as understanding.",
    asyncPrompt: "Pick one sentence stem in the Text Experiment Board (or a frozen example), predict the next word yourself, then compare it to the model's top choice. Share what you disagreed on and name one reason why.",
    recap: {
      video: "https://youtu.be/zulcCbYdvwc", writtenHref: "pages/session-1-recap.html", written: null,
      sections: {
        summary: "We started with genuine ambivalence — mine included — and separated several mechanisms that are often collapsed into one idea: prediction, temperature, attention, and human feedback. Here's what we actually looked at.",
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
          { name: "Temperature", where: "Tokenizer + Temperature Visualizer", observed: "Lower values sharpen the probability distribution; higher values make lower-probability tokens more available." },
          { name: "Attention", where: "Trophy-case pronoun flip", observed: "'Too big' → 'too small' — one word flipped which object the pronoun referred to. The model held the whole sentence in relation to itself." },
          { name: "Alignment / human feedback", where: "Homework apology comparison", observed: "Almost everyone chose Team A; the activity used their reasons to make human scoring and judgment visible." }
        ],
        patterns: [
          { what: "A next-token probability describes a language pattern, not whether the resulting statement is true.", suggests: "Prediction and verification are separate classroom moves.", next: "Ask learners to name the evidence they would need before treating an output as factual." },
          { what: "Human choices enter through the corpus, the learning setup, and judgments about which responses are better.", suggests: "A model's behavior cannot be separated from the people and institutions that shaped it.", next: "Carry this into Session 2: what defaults does an image model fill in when the prompt leaves details unspecified?" }
        ],
        hmse: {
          human: "Participants preferred Team A because it took responsibility and gave a concrete commitment. The activity made the human judgment behind alignment visible.",
          machine: "Both apologies were generated text. The comparison did not reveal a mechanical 'correct' answer; people supplied the criteria for what counted as better.",
          system: "In the tiny paragraph used for the activity, 'walks' follows 'the orange cat,' so a corpus-based predictor favors it. Angela asked who makes a model, what biases it may contain, and how that knowledge should shape students' boundaries.",
          ethics: "Dr. Tiffany Tseng presented tools that keep data, code, and iteration visible: PlushPal, Co-ML, Keyframer, and Flowcode. The common design question was how to support creation without hiding the material learners are trying to understand."
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
      { time: "15–35", segment: "Tokens, vectors + Temperature",
        move: "Show token chunks, then use the Contextual Vector Lab for one predict → reveal cycle: same token ID and starting vector, different contextual neighbors. Ask what nearby means before running one prompt at low and high temperature.",
        action: "Connect token → base vector → contextual representation → next-token probabilities, then compare greedy and sampled output.",
        tools: [
          { name: "Contextual Vector Lab", path: "tools/contextual-vector-lab/" },
          { name: "Tokenizer + Temperature Visualizer", path: "tools/tokenizer-temperature-visualizer/" }
        ] },
      { time: "35–55", segment: "ELIZA vs. LLM",
        move: "Inspect the matched rule, pattern, and response template.",
        action: "Compare visible rule-matching with pre-generated LLM examples.",
        tools: [ { name: "ELIZA Simulator", path: "tools/eliza-simulator/" } ] },
      { time: "55–75", segment: "Investigation",
        move: "Assign one Text Experiment Board section. Offer the Whose Preference? Lab for participants investigating how a panel and aggregation rule turn judgments into an authored preference signal.",
        action: "Run or analyse a default test, prompt variation, comparison, or preference-panel change.",
        tools: [
          { name: "Text Experiment Board", path: "worksheets/text-experiment-board/", worksheet: true },
          { name: "Whose Preference? Lab", path: "tools/whose-preference-lab/", optional: true }
        ] },
      { time: "75–90", segment: "Debrief",
        move: "Use the frame: human, machine, system, ethics, pedagogy. Ask whose definition of ‘better’ entered the preference signal. Optionally have one group log a baseline + change in the A/B/C board.",
        action: "Share one evidence-based claim and one question.",
        tools: [ { name: "A / B / C Comparison Board", path: "tools/abc-comparison-board/", optional: true } ] }
    ]
  },
  {
    id: "2", num: "02", mod: "image",
    title: "Session 2 — Images", kicker: "How machines imagine",
    when: "Sat July 18 · 9–11 am PT", date: "2026-07-18",
    explore: "Pixels → human-created labels → shared text/image representations → diffusion — plus a method for testing visual-default hypotheses.",
    asyncPrompt: "Use a documented real output with the Image Default Test Board, or use an authored teaching simulation to practice the method. Share one observed pattern or illustrated hypothesis, then name the real-world test needed next.",
    recap: { video: null, written: null, writtenHref: null },
    facilitation: "pages/docs-session-2-facilitation.html",
    overview: "pages/session-images.html",
    deck: "pages/session-2-deck.html",
    steps: [
      { time: "0–5", segment: "Welcome & bridge",
        move: "Repeat consent and participation choices, then connect Session 1 to Session 2: text choices become spatial image choices.",
        action: "Choose a participation pathway.",
        tools: [] },
      { time: "5–10", segment: "Session 1 retrieval",
        move: "Share two participant artifacts or revisit the orange-cat tally and apology comparison from the recap.",
        action: "Name the investigation loop: predict, change one thing, compare, make a claim, name the human decision.",
        tools: [] },
      { time: "10–17", segment: "Pixels & features",
        move: "Open the Squint Test and raise detail slowly; use PoseNet for pixels → keypoints, then open the Image–Caption Match Lab to predict, reveal, and revise one match while naming the WordNet/ImageNet human-label layer.",
        action: "Identify the first cue, justify one caption match, change one phrase, and distinguish representation or inference from generation.",
        tools: [
          { name: "The Squint Test (feature extraction)", path: "tools/feature-extraction-pixel-resolution/" },
          { name: "Image–Caption Match Lab", path: "tools/image-caption-match-lab/" }
        ] },
      { time: "17–25", segment: "The room's default",
        move: "Collect first-picture descriptions for “a doctor.” Introduce WordNet as a human-built category system and ImageNet as labeled images organized with that hierarchy, then use authored simulations to rehearse a default test.",
        action: "Name who designed the category and labels, what the simulations illustrate, and which documented real outputs would be needed for a model-level claim.",
        tools: [ { name: "Default Test Comparison Viewer", path: "tools/default-test-comparison-viewer/" } ] },
      { time: "25–36", segment: "Diffusion — performed, then watched",
        move: "Share one Human Diffusion Canvas setup link (three timed steps, veil between, no undo across activity steps), then advance the step-through viewer from noise and name the analogy without implying a hidden finished image or locked model structure.",
        action: "Draw the words coarse-to-fine as the veil thins, then predict what the machine's run will stabilise next.",
        tools: [
          { name: "Human Diffusion Canvas", path: "tools/human-diffusion-canvas/" },
          { name: "Diffusion Step-Through Viewer", path: "tools/diffusion-step-through-viewer/" }
        ] },
      { time: "36–44", segment: "Guidance & revision",
        move: "Compare a vague, specific, and responsible revision; distinguish prompt wording from CFG strength.",
        action: "Name what stayed constant, what changed, and whether the revision changed or routed around a default.",
        tools: [
          { name: "Default Test Comparison Viewer", path: "tools/default-test-comparison-viewer/" },
          { name: "Prompt Pressure (CFG scale)", path: "tools/cfg-scale-visualizer/", optional: true }
        ] },
      { time: "44–52", segment: "Whose picture?",
        move: "Build a contribution map that includes category designers, image makers and subjects, collectors, annotators, evaluators, model builders, users, and platforms.",
        action: "Ask who defined correctness, who was represented or excluded, and name one credit, consent, or disclosure decision.",
        tools: [ { name: "AI Use + Consent Checklist", path: "worksheets/ai-use-consent-checklist/", worksheet: true } ] },
      { time: "52–60", segment: "Mechanism debrief & studio launch",
        move: "Separate recognition from generation, observation from hypothesis, and coherence from neutrality or authorship.",
        action: "Answer three focused questions, then choose a student-work pathway.",
        tools: [] },
      { time: "60–90", segment: "Student work studio",
        move: "Protect 25 minutes for investigation and the final five for posting claims. Stop at 1:30 for the guest.",
        action: "Choose one of five routes, then post one observation, one appropriately framed claim, and one next test.",
        tools: [
          { name: "Image Prompt Pack", path: "packs/images/" },
          { name: "Default Test Comparison Viewer", path: "tools/default-test-comparison-viewer/" },
          { name: "Image Default Test Board", path: "worksheets/image-default-test-board/", worksheet: true },
          { name: "The Squint Test", path: "tools/feature-extraction-pixel-resolution/", optional: true },
          { name: "Image–Caption Match Lab", path: "tools/image-caption-match-lab/", optional: true },
          { name: "Human Diffusion Canvas", path: "tools/human-diffusion-canvas/", optional: true },
          { name: "Dataset Balance Simulator", path: "tools/dataset-balance-simulator/", optional: true },
          { name: "Latent Space Compressor", path: "tools/latent-space-compressor/", optional: true },
          { name: "Annotated diffusion loop", path: "pages/session-images.html#build-code", optional: true },
          { name: "AI Use + Consent Checklist", path: "worksheets/ai-use-consent-checklist/", worksheet: true, optional: true }
        ] },
      { time: "90–120", segment: "Guest spotlight, Q&A & close",
        move: "Give the artist/educator guest the full 30-minute block: two-minute introduction, 18-minute example-led talk, eight-minute Q&A, and two-minute guest takeaway and close.",
        action: "Track one visible human decision and one hidden system decision; close by bridging PoseNet’s one-frame keypoints to Session 3 tracking and coherence across time.",
        tools: [] }
    ]
  },
  {
    id: "3", num: "03", mod: "video",
    title: "Session 3 — Video", kicker: "How machines move",
    when: "Sat July 25 · 9–11 am PT", date: "2026-07-25",
    explore: "Frame → keypoints/features → correspondence across frames → coherence or drift — and why moving images are harder than single frames.",
    asyncPrompt: "Open the Video Failure Gallery Viewer (or watch a frozen clip) and find one failure mode in a sequence — identity drift, physics break, or style drift. Describe exactly where it first appears and what you think triggered it.",
    recap: { video: null, written: null, writtenHref: null },
    facilitation: "pages/docs-session-3-facilitation.html",
    overview: "pages/session-video.html",
    deck: "pages/session-3-deck.html",
    steps: [
      { time: "0–5", segment: "Welcome & bridge",
        move: "Open the Point Correspondence Lab on Ball arc. Select the ball, take a destination prediction, and reveal the clean track. Return to PoseNet’s one-frame keypoints, then name CoTracker’s contrasting task—follow selected points across existing frames.",
        action: "Predict one point’s destination, distinguish point correspondence from generation, then choose a participation pathway.",
        tools: [ { name: "Point Correspondence Lab", path: "tools/point-correspondence-lab/" } ] },
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
