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
      { time: "35–55", segment: "ELIZA vs. frozen comparison text",
        move: "Inspect the matched rule, pattern, and response template.",
        action: "Compare visible rule-matching with frozen LLM-style text. Name its incomplete provenance; do not attribute it to a particular model.",
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
    recap: {
      video: "https://youtu.be/JBpEPsPMsJo", writtenHref: "pages/session-2-recap.html", written: null,
      sections: {
        summary: "We became the diffusion model: a gray field, a prompt arriving in pieces, and a room of drawings that converged on the same haunted hallway. Then we traced why — pixels, human labels, denoising, and the defaults a prompt fills in when you don't ask.",
        investigated: [
          "Why an image is a harder problem than a sentence: two-dimensional pixel data instead of a one-directional token stream.",
          "The human pre-work underneath generation — WordNet's map of English words and ImageNet's millions of human-labeled images.",
          "Diffusion as machine-learning-aided denoising: generation starts from noise; training adds known noise to examples and teaches the network to predict and remove it.",
          "Prompts as conditioning, not added dimensions — changing the words changes the representation that guides sampling, and one prompt can still yield many plausible images.",
          "Where defaults come from: prompt 'a doctor' with no other details and read off what the system decides for you."
        ],
        mechanisms: [
          { name: "Pixels & features", where: "Blurry-image walkthrough", observed: "The model processes numerical representations of pixels or latent features, not a cat or hallway in the human sense. Learned features organize patterns at different levels of detail." },
          { name: "The human label layer", where: "WordNet + ImageNet", observed: "Human-designed categories, labels, captions, and ratings shaped important datasets and many modern image systems — labor that is usually invisible in the output." },
          { name: "Diffusion / denoising", where: "Slides + live ChatGPT demo", observed: "Generation denoises a gray field toward the prompt. Asking for a 'half-diffused' image just drew blur — prompt words are content to depict, not process controls." },
          { name: "Prompt conditioning", where: "Ryan's layers question", observed: "Each clause changes the prompt representation; it does not add a layer or new embedding dimensions. The whole prompt guides each denoising step, and different samples can satisfy it differently." },
          { name: "Defaults / bias", where: "'A doctor' prompt", observed: "Unspecified gender, age, race, and setting get filled from training defaults — the image-layer version of Shelly's doctor riddle from Session 1." },
          { name: "Guidance / CFG", where: "Training-loop slides", observed: "During sampling, classifier-free guidance combines a prompt-conditioned prediction with an unconditioned prediction. More guidance usually increases prompt adherence while trading off diversity and, at extremes, image quality." }
        ],
        patterns: [
          { what: "Everyone drew the same prompt and produced strikingly similar images — figure centered, hallway receding, horror palette — and ChatGPT's version matched the room's composition.", suggests: "The room converged on culturally familiar defaults, not a single correct image; those defaults live in us as much as in the training data.", next: "Run one unspecified prompt across models and people, board the results, and ask where each shared reference comes from — Judy thought our hallway resembled imagery from the film Diabolique." },
          { what: "Plain re-prompting can redraw much of an image because a generated output is not a conventional editable scene graph, while masks, cross-attention, locked noise, and other controls can preserve or localize parts of an edit.", suggests: "Editing and consistency remain real workflow challenges, but their severity depends on which controls the system exposes.", next: "Compare workflows that add structure or control back: masks and cross-attention, ComfyUI model chains, Corridor Crew's locked initial noise, and licensed-data approaches like Adobe Firefly." }
        ],
        hmse: {
          human: "Participants chose what to draw for each phrase and judged which results felt right. Shelly worked in negative space so the pale figure could emerge — 'more like sculpture' — a move the averaging machine wouldn't make.",
          machine: "The model samples one possible image by repeatedly denoising under prompt conditioning. It is not choosing a single correct answer, and a base generated output is not a conventional layer-based scene file.",
          system: "Annotators, dataset builders, and preference raters shape many systems but rarely appear in the output. Gaming and ML use GPUs for different parallel computations, while cryptocurrency mining added separate demand for the same hardware market.",
          ethics: "Guest artist Aurora Mititelu distinguished hating corporate AI from hating algorithms, and connected AI images on social feeds to icon painting: community-circulated images that construct a shared reality. Shelly, a military veteran, showed how AI 'veteran influencer' propaganda amplifies biases already in the data."
        },
        classroom: {
          students: "The marker version of the Human Diffusion Canvas needs no screens: gray the paper, reveal the prompt phrase by phrase, add with a new color each round, then compare the room's drawings.",
          shortCircuit: "Jumping straight to generating real images skips the being-the-model experience — and remember to name the caveat that a real model gets all the words at once, not piecemeal.",
          noAI: "Full paper-and-marker run, then a printed set of model outputs for the convergence debrief. No accounts, no generation required."
        },
        next: {
          prep: "Session 3 — Video — Saturday July 25, with guest Dr. Emily Thomforde. Optional Week 4 session in August to be decided.",
          asyncRoute: {
            prompt: "Make one Session 2 artifact — a tool, webpage, activity, or set of questions about image generation that would help your students or your own learning — and share it before Session 3.",
            worksheetPath: "worksheets/image-default-test-board/",
            packPath: "packs/images/"
          }
        }
      }
    },
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
    explore: "You have been the machine three times: fluent is not necessarily true, plausible is not necessarily neutral, and smooth is not evidence. Session 3 tests what must stay coherent across time.",
    asyncPrompt: "Open the Video Failure Gallery Viewer (or use a frozen clip), find the first exact frame where one relation breaks, and write one observation plus one boundary: what does the clip show, and what can it not prove about the model?",
    recap: {
      video: "https://youtu.be/kn-3P3tjafY", writtenHref: "pages/session-3-recap.html", written: null,
      sections: {
        summary: "Participants used a human-drawing teaching analogy, creating short animations frame by frame under two reference conditions. They performed one simplified coherence constraint rather than operating or reproducing an image or video model. Guest Dr. Emily Thomforde then traced how the unexplainable core of these systems came to be treated as magic rather than a problem.",
        investigated: [
          "Why video is a harder problem than an image: frames have to cohere not only across X and Y but over time — coherence in a new, third direction.",
          "The camp's through-line, stated in one place: fluent text is not necessarily true, plausible images are not necessarily neutral, and smooth video is not evidence that an event happened.",
          "How relationships can persist or change across a hand-drawn sequence, and what that simplified comparison can and cannot suggest about temporal coherence.",
          "What human animators already know about that problem — timing, spacing, and foreground/background order — and how those concepts can generate questions to check against documented video workflows.",
          "Where the mystery inside neural networks comes from, and why (per Dr. Thomforde) its cultural acceptance, not the technology, is what changed."
        ],
        mechanisms: [
          { name: "Temporal coherence", where: "Coherence Animator setup", observed: "Participants used a human-drawing teaching analogy, creating short animations frame by frame under two reference conditions. The activity made one simplified coherence constraint tangible; it did not run a model or measure model memory, context, hardware, or architecture." },
          { name: "Reference conditions", where: "Run A vs Run B", observed: "Run A let participants see only the previous drawing; Run B added the fixed first drawing as an anchor. With more to refer back to, participants held some background elements steadier but had more to track — an observation about two human-drawing conditions, not a measurement of model memory, context, hardware, or architecture." },
          { name: "Keyframe interpolation", where: "Sharleen's start-and-end constraint", observed: "Fixing a start and end frame led Sharleen to rush the in-between frames toward the endpoint. That prompted a facilitator hypothesis — to check against documented workflows, not shown by the activity — that some systems rely on keyframes and interpolation, which could over-converge and flatten detail." },
          { name: "Foreground / background split", where: "Ryan's drawing order", observed: "Drawing the static scene first versus the character first changed line quality and attention. Separating foreground from background is a known human animation move; whether a given video pipeline splits work the same way is a question for documented workflows, not something the activity shows." },
          { name: "Timing as meaning", where: "Shane's timing-supervisor read", observed: "Holding a drawing a few extra frames implies thinking or intention and changes what the motion means — timing is semantically driven. In Shane's own experience giving an LLM the same timing rules, it followed them discretely, without a sense of the relativity of spacing, and overshot subtle moves." },
          { name: "Chained-model workflows", where: "ComfyUI / fuser.studio discussion", observed: "Because video is compute- and token-expensive and many relations must hold at once, some production workflows chain several specialized models — one holds the background, another the foreground, another composites — as discussed via ComfyUI and fuser.studio. This describes those workflows, not a universal architecture." }
        ],
        patterns: [
          { what: "With only the previous frame (Run A), participants made more vivid, active choices; with an anchor frame (Run B), some drifted toward replicating the opening — Yunseo compared Run B to a near-static 'Wimpy Kid' diary.", suggests: "In this activity, the added anchor sometimes steadied details but also constrained how much could change. This is an observation about two drawing conditions, not a measurement of model memory or compute.", next: "Ask what a model should be free to change versus must keep fixed, then check how documented workflows manage those constraints." },
          { what: "The room surfaced concepts human animators already use — foreground/background order, keyframes, and the meaning of a held beat.", suggests: "Those parallels give us useful questions to ask about video systems; they do not show that a model represents or solves the problems in the same way.", next: "Carry this into the showcase: take one animation constraint, imagine the software a model would need to satisfy it, then compare that hypothesis with what documented workflows (ComfyUI, node graphs) actually build." }
        ],
        hmse: {
          human: "Participants chose the action, the drawing order, the timing, and how much to change frame to frame. Ryan drew the background first in Run A and the character first in Run B; a professional animator (Shane) read held beats as intention; others caught themselves rushing toward an ending frame.",
          machine: "A video model has to keep a scene coherent across time, not just render one plausible still. The room's hypotheses — split foreground and background, lean on keyframes and interpolation, edit one part of a frame without regenerating the whole — name problems a video model has to contend with, and questions to check against real systems rather than mechanisms the activity proved.",
          system: "Some node-based production workflows, including workflows built with tools such as ComfyUI or fuser.studio, connect multiple stages such as generation, masking, and compositing. This is one production pattern, not a universal video-model architecture. Additional stages can increase computation, but resource use depends on the models, resolution, duration, and deployment.",
          ethics: "Dr. Emily Thomforde's talk, 'Artificial Intelligence and the Axiology of Mystery,' argued the explainability problem — neural nets keep no paper trail of why an output happened — was once disqualifying and is now marketed as wonder. She placed the shift in culture and economics, not technical progress, and warned that magical thinking (hope or fear) fills the space where evidence and expertise do not yet exist."
        },
        classroom: {
          students: "The Coherence Animator runs in the browser with no login: students animate a shared prompt twice — once seeing only the previous frame, once with an anchor frame — then compare and name one thing that changed. Performing one simplified coherence constraint makes the comparison tangible without claiming to reproduce a model.",
          shortCircuit: "Jumping directly to a polished AI video can hide the coherence question. The human-drawing comparison gives students a concrete constraint to inspect before they analyze finished clips.",
          noAI: "The in-person Temporal Telephone variant needs only paper: each person animates a frame and hands it on, and groups can receive different visual references — an unplugged, gamified way to observe how a reference condition affects a hand-drawn sequence."
        },
        next: {
          prep: "This was the last pre-planned session. An optional August Showcase — where participants present something they made — will be scheduled for a Saturday in August (the 8th or the 15th) based on the feedback form, and end-of-month August office hours will be emailed to every cohort.",
          asyncRoute: {
            prompt: "Make something for the optional August Showcase — a tool, activity, artifact, or set of questions drawn from any of the three sessions — and fill out the feedback form, including whether you would present and which August date works.",
            worksheetPath: "worksheets/video-test-report/",
            packPath: "packs/video/"
          }
        }
      }
    },
    facilitation: "pages/docs-session-3-facilitation.html",
    overview: "pages/session-video.html",
    deck: "pages/session-3-deck.html",
    steps: [
      { time: "0–5", segment: "Welcome + re-entry",
        move: "Repeat the recording / likeness boundary and participation choices. Put the mechanism map on screen: text / continuation / fluent ≠ true; images / conditioned sampling / plausible ≠ neutral; video / relationships across time / smooth ≠ evidence. Invite an anonymous poll or private response before chat.",
        action: "Choose a participation route and respond privately or in the poll; chat is optional.",
        tools: [] },
      { time: "5–12", segment: "Two artifact shares",
        move: "Invite two pre-arranged participants, including one classroom-facing share. Give each about three minutes: artifact, claim, boundary.",
        action: "Listen for the evidence behind each claim.",
        tools: [] },
      { time: "12–17", segment: "Active synthesis",
        move: "Retrieve rather than re-lecture: 30 seconds of private writing, one poll or precise chat response, then two voluntary spoken responses.",
        action: "Connect one Session 1 or 2 activity to the camp argument through any offered channel.",
        tools: [] },
      { time: "17–24", segment: "Point correspondence",
        move: "Predict and reveal a ball track, then distinguish tracking across existing frames from generating new ones.",
        action: "Predict one point’s destination and name one relation that must persist.",
        tools: [ { name: "Point Correspondence Lab", path: "tools/point-correspondence-lab/" } ] },
      { time: "24–47", segment: "Coherence Animator · solo A/B comparison",
        move: "Demo the nine-drawing flow, then let each participant build one shared opening, Run A with previous-only, and Run B with anchor + previous. Choose one feature and use the guided A twice → B twice playback.",
        action: "Complete the comparison individually, track one feature, and state one observation plus one limit.",
        tools: [ { name: "Coherence Animator", path: "tools/coherence-animator/" } ] },
      { time: "47–57", segment: "Curated failure hunt",
        move: "Use two frozen examples and the four-question protocol: what changed, what supports it, what would verify the source, and what can we not conclude?",
        action: "Name the first exact break, its evidence, missing provenance, and the claim boundary.",
        tools: [
          { name: "Video Failure Gallery Viewer", path: "tools/video-failure-gallery-viewer/" },
          { name: "Frame-by-Frame Coherence Viewer", path: "tools/frame-by-frame-coherence-viewer/", optional: true }
        ] },
      { time: "57–65", segment: "System map",
        move: "Map model, interface, training data, workers, prompter, subject, editor, and platform using the same four-question frame. Keep consent and provenance separate.",
        action: "Name one human decision, hidden contribution, consent question, and provenance question.",
        tools: [ { name: "AI Use + Consent Checklist", path: "worksheets/ai-use-consent-checklist/", worksheet: true } ] },
      { time: "65–83", segment: "One-tool studio",
        move: "Show the completed worked example. Default route: one frozen Failure Gallery example. Offer advanced routes only after one Video Test Report row; give a five-minute warning at 78.",
        action: "Finish one observation, bounded claim, missing source evidence, and classroom-use sentence.",
        tools: [
          { name: "Video Test Report", path: "worksheets/video-test-report/", worksheet: true },
          { name: "Video Failure Gallery Viewer", path: "tools/video-failure-gallery-viewer/" },
          { name: "Coherence Animator", path: "tools/coherence-animator/", optional: true },
          { name: "Frame-by-Frame Coherence Viewer", path: "tools/frame-by-frame-coherence-viewer/", optional: true },
          { name: "Point Correspondence Lab", path: "tools/point-correspondence-lab/", optional: true }
        ] },
      { time: "83–88", segment: "Two claims",
        move: "Invite two concise shares selected during the studio, not only through chat visibility. Include one classroom adaptation if available; ask what evidence supports each claim and where its boundary lies.",
        action: "Share or listen for the distinction between observation and explanation.",
        tools: [] },
      { time: "88–90", segment: "Guest introduction",
        move: "Introduce Dr. Emily Thomforde and ask what would count as evidence that a system understands rather than merely produces a convincing pattern.",
        action: "Close tool tabs and listen.",
        tools: [] },
      { time: "90–108", segment: "Guest talk",
        move: "Yield the floor and send the agreed private three-minute signal at 105.",
        action: "Capture one distinction or question.",
        tools: [] },
      { time: "108–116", segment: "Q&A",
        move: "Prioritize participant questions; use one prepared question only if needed.",
        action: "Ask a concise mechanism, evidence, learning, or consequence question.",
        tools: [] },
      { time: "116–118", segment: "Guest takeaway",
        move: "Ask Emily for one sentence the room should carry forward; thank her.",
        action: "Put one phrase in chat.",
        tools: [] },
      { time: "118–120", segment: "Close",
        move: "Return to the three-line argument and invite the optional Studio / Showcase.",
        action: "Save the session page and one next step.",
        tools: [] }
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
