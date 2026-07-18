# Claude handoff: July mechanism-lab batch and three-session audit

This note documents the four interactive teaching tools added in commit `13a6449` (`Add cross-session mechanism labs`). They are already implemented, integrated, tested, and pushed to `main`. It also records the three-session curriculum audit completed on 2026-07-17, including the already-shipped WordNet, ImageNet, and PoseNet additions and the recommended next conceptual pass.

This is a batch-specific handoff, not the repository contract. Before changing the tools, read:

- [`SHARED-CONTRACT.md`](SHARED-CONTRACT.md) for paths, Field tokens, navigation, teaching-code conventions, and the acceptance bar.
- [`DESIGN-SYSTEM.md`](DESIGN-SYSTEM.md) for interface and copy standards.
- [`qa-checklist.md`](qa-checklist.md) for pre-publish verification.

## Why this batch exists

The four labs fill missing mechanism steps in the three-session conceptual sequence:

1. **Session 1:** token → vector → context-sensitive representation → next-token probabilities → human preference signal.
2. **Session 2:** pixels → human-created labels → shared text/image representations → diffusion.
3. **Session 3:** frame → point or feature → correspondence across frames → coherence or drift.

Every lab follows the same classroom rhythm:

> Choose or predict → reveal an inspectable authored mechanism → change one variable → compare → write a bounded claim → name the evidence needed for a real model claim.

## WordNet, ImageNet, and PoseNet additions already shipped

Do not add these projects as though they are still missing. They are already integrated across the curriculum. Future work should tighten their placement and guardrails rather than duplicate them.

### WordNet

Current teaching role:

- A concrete example of a human-built lexical category system.
- Evidence that a category name and its relationships are designed rather than natural properties hidden inside pixels.
- The historical organizational backbone used by ImageNet.
- A prompt for asking who selected categories, what distinctions were encoded, and what did not fit.

Current integration surfaces:

- `docs/session-2-live-presenter-script.md` — materials, Round 0, The room's default, Whose picture, and the close.
- `docs/session-2-facilitation.md` and `pages/docs-session-2-facilitation.html`.
- `pages/session-2-deck.html` — defaults and contribution-map notes.
- `pages/session-images.html` — mechanism explanation, run of show, and readings.
- `pages/further-reading.html#seeing-machines`.
- `assets/session-runs.js` — Session 2 pixels/features and defaults blocks.

Preserve this guardrail: WordNet is part of the history and governance of classification. It is not a component that every image generator contains.

### ImageNet

Current teaching role:

- A real historical example of images collected and annotated under a human-created category hierarchy.
- A bridge from category design to dataset construction, labeling, benchmark definitions, and standards of correctness.
- A way to ask who supplied or appeared in images, who annotated them, who was represented or excluded, and what counted as a correct label.

Current integration surfaces are the same Session 2 script, facilitation, deck, overview, run-console, and further-reading surfaces listed for WordNet.

Preserve these guardrails:

- ImageNet is an influential classification dataset and benchmark, not a universal training set for current generators.
- WordNet → ImageNet is a real historical relationship.
- ImageNet, PoseNet, CLIP, and diffusion are separate projects or model families, not one literal pipeline.

### PoseNet

Current teaching role:

- A concrete answer to “what numerical output can a vision model produce from one frame?”
- One RGB frame goes in; estimated body keypoints such as shoulders, elbows, and knees come out with x/y coordinates and confidence scores.
- A Session 2 recognition/inference example and a Session 3 bridge from one-frame features to correspondence across time.

Current integration surfaces:

- `docs/session-2-live-presenter-script.md` and Session 2 facilitation/deck/page surfaces.
- `pages/session-images.html` — pixels/features explanation, reading, and Session 3 bridge.
- `docs/session-3-facilitation.md`, `pages/docs-session-3-facilitation.html`, `pages/session-3-deck.html`, and `pages/session-video.html`.
- `pages/further-reading.html#seeing-machines`.
- `assets/session-runs.js` — Session 2 representation move and Session 3 opening bridge.

Preserve these guardrails:

- PoseNet estimates pose keypoints; it does not identify the person.
- It is a recognition/inference model, not an image- or video-generation mechanism.
- CoTracker analyzes correspondence through frames that already exist. A generator has a different task: creating a sequence whose spatial, temporal, and semantic relationships remain coherent.

## Non-negotiable evidence boundary

All four pages are **authored teaching simulations**. Their token IDs, vectors, illustrations, labels, weights, scores, rater profiles, tracks, confidence values, and failure cases are not outputs from live models.

Preserve that distinction in headings, buttons, copied investigations, presenter language, and any new data. Safe wording includes:

- “In this authored simulation…”
- “This illustrates the hypothesis that…”
- “Testing that on a real model would require…”

Do not change this to “the model learned,” “CLIP scored,” “the tracker found,” “people prefer,” or similar model- or population-level claims unless genuine outputs are added with the model, version, date, settings, and method documented.

## The four tools

### 1. Contextual Vector Lab

**Path:** [`tools/contextual-vector-lab/index.html`](../tools/contextual-vector-lab/index.html)  
**Session:** 1 — Text  
**Teaching job:** Connect a token lookup to a context-sensitive representation without suggesting that a 2D embedding plot is a literal map of meaning.

Participant flow:

1. Choose an ambiguous token: `bank`, `bat`, `cell`, or `pitch`.
2. Choose one of three sentences containing that same token.
3. Inspect an illustrative token ID and an authored eight-value starting lookup vector.
4. Predict which contextual neighborhood the token will move toward.
5. Reveal the authored 2D projection, switch contexts, and compare what stayed fixed with what moved.
6. Complete and copy a bounded investigation claim.

Important guardrails:

- A token ID is an address in a vocabulary table, not a definition.
- The starting vector is the same for the selected token across the examples; the contextual position changes.
- Nearby points may reflect meaning, usage, or repeated cultural association—not necessarily synonymy.
- The 2D axes have no fixed semantic meaning and dimensionality reduction can distort distance.
- This is not a view into a real transformer's full internal state.

Implementation notes:

- Single-file HTML/CSS/JavaScript app; all teaching data is inline in `WORDS`.
- Browser state key: `lm-contextual-vector-lab`.
- Core interaction is offline and requires no account, API, or downloaded embeddings.
- Provides “Copy investigation”; it does not provide a print button.

### 2. Whose Preference? Lab

**Path:** [`tools/whose-preference-lab/index.html`](../tools/whose-preference-lab/index.html)  
**Session:** 1 — Text / human feedback  
**Teaching job:** Show how a candidate set, rater panel, priorities, and aggregation rule turn judgments into a preference signal.

Participant flow:

1. Choose one of three authored prompts.
2. Rank three fluent responses before seeing the panel.
3. Include or exclude authored rater perspectives: learner, teacher, editor, accessibility advocate, and school policy team.
4. Compare two aggregation rules: average weighted scores or one-rater/one-first-choice vote.
5. Reveal the aggregate signal, change the panel or rule, and watch the winner or strength move.
6. Write, copy, or print a bounded claim.

Important guardrails:

- The rater profiles are priority profiles, not claims that every member of a named group thinks alike.
- The feature values and response rankings are authored.
- A preference signal records choices under a selected rule; it does not prove truth, universal quality, or consensus.
- Labels do not directly rewrite an answer. A real alignment pipeline still needs data collection, policy decisions, modeling, optimization, evaluation, and governance.
- This is not an RLHF run or reward-model output.

Implementation notes:

- Single-file app; scenarios, features, and rater weights are inline in `SCENARIOS`, `FEATURES`, and `RATERS`.
- Browser state key: `lm-whose-preference-lab`.
- The page contains internal disagreement checks so panel/rule changes are not merely cosmetic.
- Provides copy and print/save actions.

### 3. Image–Caption Match Lab

**Path:** [`tools/image-caption-match-lab/index.html`](../tools/image-caption-match-lab/index.html)  
**Session:** 2 — Images  
**Teaching job:** Make simplified text/image matching inspectable while connecting CLIP-style comparison to the human-created category and label layer represented historically by WordNet and ImageNet.

Participant flow:

1. Choose one of four authored scenes: cat, bicycle, community garden, or water-sampling fieldwork.
2. Predict which candidate caption will land closest.
3. Reveal the authored ranking and inspect the named cues and weights that produced it.
4. Write a revised caption and see which mapped, foreign, or unmapped terms change the teaching score.
5. Ask who chose the cue vocabulary, illustrations, captions, weights, candidate set, and excluded information.
6. Complete and copy a bounded claim.

Important guardrails:

- The SVG scenes, cue vocabulary, weights, and scores are authored; they are not CLIP outputs.
- The score is a transparent classroom rule over a small cue vocabulary, not cosine similarity from a real shared embedding space.
- Matching does not mean human understanding and does not search a database for the finished image.
- Recognition or representation is not generation, and not every image generator uses CLIP.
- WordNet and ImageNet are referenced to expose human category-making and labeling; the lab does not reproduce either project.

Implementation notes:

- Single-file app; all scene SVGs, captions, cue terms, and weights are inline in `SCENES` and `CONCEPTS`.
- `scoreCaption()` intentionally exposes a small, legible scoring rule. Preserve whole-term matching so strings such as `cat` do not match inside unrelated words.
- Browser state key: `lm-image-caption-match-lab`.
- Provides “Copy investigation”; it does not provide a print button.

### 4. Point Correspondence Lab

**Path:** [`tools/point-correspondence-lab/index.html`](../tools/point-correspondence-lab/index.html)  
**Session:** 3 — Video  
**Teaching job:** Bridge PoseNet's one-frame keypoints to tracking/correspondence across frames, then separate tracking existing frames from generating new ones.

Participant flow:

1. Choose an eight-frame scene: clean ball arc, occlusion, crossing runners, or off-screen motion.
2. Select a visible point and predict its frame-eight destination.
3. Reveal the precomputed route.
4. Step through frames while comparing the actual authored route, simulated estimate, confidence, and first failure.
5. Name occlusion, identity switch, point loss, or a clean correspondence case precisely.
6. Write, copy, or print a bounded claim.

Important guardrails:

- Routes, confidence values, and failures are authored; they are not PoseNet or CoTracker outputs.
- Confidence is not proof that a point identity is correct.
- During occlusion or after a point leaves the frame, an estimate is not new visual evidence.
- PoseNet-style keypoint inference analyzes one frame; tracking asks where selected points went across existing frames.
- Generative video has the harder inverse problem of creating each next frame while maintaining identity, geometry, motion, camera, and scene coherence. Tracking is not generation.

Implementation notes:

- Single-file app; eight-frame scenes and tracks are inline in `SCENES`.
- Browser state key: `lm-point-correspondence-lab`.
- Built-in validation checks track length, destinations, confidence range, and failure metadata.
- Provides copy and print/save actions.

## Where the batch is integrated

### Shared catalog and run console

- `assets/tools-data.js` registers all four as **Launch ready** tools.
- `assets/session-runs.js` places:
  - Contextual Vector Lab in Session 1, minutes 15–35.
  - Whose Preference? Lab as an optional Session 1 investigation tool, minutes 55–75.
  - Image–Caption Match Lab in Session 2, minutes 10–17, and as an optional studio tool.
  - Point Correspondence Lab at the Session 3 bridge, minutes 0–5.

### Session 1 surfaces

- `pages/session-text.html`
- `pages/session-1-deck.html`
- `pages/session-1-assignment.html`
- `pages/session-1-feedback.html`
- `docs/session-1-facilitation.md`
- `docs/session-1-live-presenter-script.md`
- `pages/docs-session-1-facilitation.html`

### Session 2 surfaces

- `pages/session-images.html`
- `pages/session-2-deck.html`
- `docs/session-2-facilitation.md`
- `docs/session-2-live-presenter-script.md`
- `pages/docs-session-2-facilitation.html`

### Session 3 surfaces

- `pages/session-video.html`
- `pages/session-3-deck.html`
- `docs/session-3-facilitation.md`
- `pages/docs-session-3-facilitation.html`

### Offline shell and QA

- `sw.js` currently uses cache `lm-shell-v13` and precaches all four tool routes.
- `docs/qa-checklist.md` contains batch-specific checks.

If a deployment changes a precached tool or session surface, follow the repository's deploy convention and bump the service-worker cache version once for that release. Returning visitors otherwise may keep cache-first copies of older files until the worker changes.

## Shared implementation pattern

All four tools deliberately use the same architecture:

- One `index.html` file per tool with inline, authored teaching data and interaction code.
- Shared Field assets loaded from `../../assets/field.css`, `../../assets/field-tool.css`, and `../../assets/field-theme.js`.
- No model API, backend, Firebase, websocket, or participant-data upload.
- State remains in browser `localStorage` under a tool-specific key.
- Native controls, visible focus states, `aria-live` status messages, and responsive layouts.
- An editable claim frame and a copy fallback using `document.execCommand("copy")` when the Clipboard API is unavailable.
- A visible evidence-limit notice near the top and the same boundary repeated in copied investigation text.

Do not consolidate these pages into a framework or shared runtime unless asked. Their single-file structure is intentional: it keeps workshop deployment, offline use, inspection, and emergency editing simple.

## Safe change checklist for Claude

When modifying one of these tools:

1. Preserve the authored-simulation notice and the bounded-claim language.
2. Keep the core function offline; all teaching-critical data should remain local.
3. Use Field tokens rather than hard-coded theme backgrounds or text colors.
4. Use `let`, explicit `if/else`, and comments that explain why in teaching-facing code.
5. Keep buttons disabled until prerequisite choices are made; do not reveal before prediction.
6. Validate restored `localStorage` state when adding scenarios, options, or fields.
7. Update every linked lesson surface if the classroom flow or name changes.
8. Update `assets/tools-data.js`, `assets/session-runs.js`, and `docs/qa-checklist.md` when catalog, timing, or acceptance behavior changes.
9. Bump the `sw.js` cache version when deploying changes to precached files.
10. Test at 360, 768, and 1280 pixels; use keyboard-only navigation; check all themes; confirm zero console errors.

Minimum command-line checks:

```sh
git diff --check
node --check assets/session-runs.js
node --check assets/tools-data.js
node --check sw.js
```

Then serve the repository over HTTP and click through every tool's full predict → reveal → revise/compare → claim path. Also open the relevant presenter deck and run console; a tool page passing alone is not enough if its live-session route or copied links are stale.

## Already verified for the baseline batch

The baseline commit passed:

- JavaScript syntax checks for shared assets, the four labs' inline scripts, and Sessions 1–3 decks.
- Contiguous run timing: Session 1 = 90 minutes, Session 2 = 120 minutes, Session 3 = 90 minutes.
- Local-link resolution and service-worker route coverage.
- Full Playwright interaction paths with zero page or console errors.
- Responsive checks at 360, 768, and 1280 pixels.
- Accessible control labels and keyboard-operable interaction paths.
- Presenter-deck fit checks at 1280 × 720.
- Preference-panel cases in which different panels or rules can select A, B, or C, confirming that the aggregation controls have meaningful effects.

Treat `13a6449` as the known-good comparison point if a later edit introduces a regression.

---

## Three-session curriculum audit

### Overall judgment

The course is already unusually strong at teaching people how to investigate generative AI responsibly. Its clearest strengths are:

- prediction before reveal;
- one-variable comparisons;
- observation versus hypothesis;
- authored simulation versus real model evidence;
- probability versus truth;
- human decisions, labor, consent, defaults, and representation;
- direct-use and no-AI pathways with equal standing;
- transfer into classroom and creative practice.

The central gap is that the course currently explains **generative inference behavior** more completely than it explains **machine learning**. Participants see representations, controls, generation, and output analysis, but the learning process that produced the model remains mostly implicit.

The existing backlog already states this accurately in `docs/advanced-concept-extensions.md`: the launch set is strongest at inference behavior and does not yet fully expose the training and representation machinery underneath modern generative systems.

The highest-value next move is not another catalog of projects. It is one repeated explanatory spine shared by all three sessions.

### The missing common spine

Use the same seven-part frame every week:

| Layer | Question |
|---|---|
| Data | What examples entered, who selected them, and what was absent? |
| Representation | How was the material converted into numbers—tokens, vectors, patches, or latents? |
| Objective | What was the system trained to predict, match, denoise, or rank? |
| Learning | How did error change the model's parameters? |
| Inference | Given a prompt or condition, how was one output sampled and decoded? |
| Product | What instructions, filters, retrieval, tools, UI defaults, or policies surrounded the model? |
| Evaluation | What evidence supports the claim, who defined success, and what harms or exclusions matter? |

Also state the scope explicitly near the beginning of Session 1:

> This course focuses on generative machine learning. Classification, recommendation, ranking, forecasting, clustering, and control are other forms of ML.

Without that sentence, participants may leave with the impression that machine learning means chatbots, diffusion, and generated video.

## Highest-priority conceptual fixes

### 1. Make learning visible

Session 1 moves effectively through token → vector → next-token probabilities → sampling → human feedback. The probabilities' training origin remains a black box.

Add one small, modality-independent training loop:

1. The model predicts.
2. A training example supplies the target or comparison.
3. A loss measures the difference.
4. Backpropagation distributes credit or blame through the network.
5. An optimizer slightly changes many weights.
6. Repeating this across many examples produces learned statistical behavior.

No calculus is needed. A five-minute role-play with one visible weight update would be enough. This connects ethics directly to mechanism: data determines which examples and errors appear; the objective determines which errors count; optimization changes what becomes likely.

Highest-value future tool or unplugged activity: **Loss-to-Weights Training Loop**.

### 2. Correct the Session 3 architecture analogy

The current video materials come too close to claiming that contemporary generators create every frame from only the preceding frame. Specific phrases to revise in `pages/session-3-deck.html` include:

- “If each frame is made only from the one before it…”
- “Drift is the model forgetting.”
- “Models fake motion by filling in plausible in-between frames.”
- “Generated motion is interpolation, not physics.”
- “Hands and text break first.”

These can be useful diagnostic analogies, but they are not a general architecture description. Many modern video systems compress clips into spatiotemporal latent representations, divide them into space-time patches, and use transformer-based diffusion or related processes to update many positions across time.

Recommended Session 3 mechanism chain:

> video, images, captions, and optional audio → compressed space-time representation → spatial and temporal conditioning → iterative generation across patches → decoded frames/audio → coherence evaluation

Keep PoseNet, CoTracker, the Point Correspondence Lab, and Temporal Telephone, but define their roles precisely:

- PoseNet extracts one kind of feature from one existing frame.
- CoTracker estimates correspondence across frames that already exist.
- Point Correspondence Lab makes that analysis question inspectable.
- Temporal Telephone is an analogy for accumulated inconsistency and anchoring.
- A generator must create or transform a spatiotemporal representation while keeping many relationships plausible.

Safe replacement language:

- “Drift is a failure to maintain consistent relationships across generated time.”
- “Generated motion reflects learned visual dynamics; visual plausibility does not prove a physical simulation.”
- “Let the tested outputs reveal which structures fail rather than announcing one universal failure order.”

Primary technical reference: [Video generation models as world simulators](https://openai.com/index/video-generation-models-as-world-simulators/).

### 3. Reframe the Session 2 label sequence

The current public chain is:

> pixels → human-created labels → shared text/image representations → diffusion

It is pedagogically coherent but can imply that WordNet and ImageNet are stages inside a current image generator.

Recommended mechanism chain:

> pixels or image latents + paired text/metadata → learned visual and language representations → prompt conditioning → iterative latent generation → decoded pixels

Place WordNet and ImageNet in their strongest roles: classification history, category construction, dataset governance, representation, annotation, benchmark design, and standards of correctness.

CLIP remains the most useful bridge from words to comparable visual representations, but name it as one influential approach rather than a universal image-generator component. The original CLIP work learned from image-text pairs rather than a fixed ImageNet-style label set. See [Learning Transferable Visual Models From Natural Language Supervision](https://arxiv.org/abs/2103.00020).

### 4. Separate pretraining, post-training, inference, and product

Use this distinction consistently:

- **Pretraining:** learns broad statistical patterns from large datasets.
- **Post-training:** demonstrations, preference comparisons, safety policies, supervised tuning, reinforcement learning, or direct preference optimization shape behavior.
- **Inference:** trained parameters produce probabilities, updates, samples, and decoded outputs.
- **Product system:** system instructions, retrieval, tools, memory, moderation, filters, and interface defaults modify what users experience.

Human feedback is important but it is not part of the live next-token loop. RLHF is also not the only preference-tuning method. Relevant primary papers: [InstructGPT](https://arxiv.org/abs/2203.02155) and [Direct Preference Optimization](https://arxiv.org/abs/2305.18290).

Highest-value companion explainer: **Model vs Product Stack Inspector**.

### 5. Extend provenance and verification beyond text

Session 3 already asks whether generated video can be trusted as evidence, but participants need a practical method:

- identify the source and original;
- preserve prompt, model, version, date, settings, and generation history;
- inspect documented edits;
- check for Content Credentials or other provenance records;
- corroborate the depicted claim independently;
- distinguish verified provenance from verified truth.

C2PA Content Credentials can record cryptographically bound provenance. Their presence does not make the content true, and their absence does not prove the content false. References: [C2PA 2.2 specification](https://spec.c2pa.org/specifications/specifications/2.2/index.html) and [C2PA harms guidance](https://spec.c2pa.org/specifications/specifications/2.2/security/Harms_Modelling.html).

Do not make “AI detector” scores the core lesson. Provenance, corroboration, and source evaluation are more durable.

Highest-value companion tool: **Provenance Inspector**.

### 6. Add the model-experiment metadata currently missing from some pathways

Every real-output investigation should record:

- model and product name;
- version or access date;
- exact prompt and input assets;
- seed where available;
- sampler, guidance, temperature, duration, aspect ratio, or other relevant settings;
- number of outputs generated;
- selection rule—what was kept or discarded;
- direct observation;
- interpretation or hypothesis;
- next test;
- disclosure and consent status.

One output can start a question. It cannot establish a stable model-level pattern.

Highest-value cross-session utility: **Experiment Ledger**.

### 7. Add a model-versus-ML scope marker

The program should name the difference among:

- classification or detection;
- retrieval or similarity matching;
- ranking or recommendation;
- generation;
- sequential decision or control.

WordNet/ImageNet/AlexNet, PoseNet, CLIP, language models, diffusion, and CoTracker perform different kinds of tasks. The projects are most useful when they help participants compare these task types, not when they sound like one evolutionary pipeline.

## Session-by-session audit

### Session 1 — Text

Keep:

- human next-token prediction;
- tokenization;
- contextual vectors;
- probability distributions and sampling;
- the attention activity;
- human preference and power analysis;
- probability ≠ truth;
- authored-simulation evidence boundaries.

Add:

- position information and the causal constraint: future tokens are unavailable when predicting the next token;
- one visible loss-to-weight update;
- the pretraining/post-training/inference distinction;
- a model-versus-product diagram;
- a small generalization test using a sentence unlike the training examples.

Tighten:

- Replace “Creativity is sampling lower-probability tokens” with “Temperature changes diversity and risk; it does not measure creativity.”
- Replace categorical “language models predict without understanding” wording with “Next-token training does not by itself demonstrate human-like understanding; fluency is not sufficient evidence of it.”
- Do not imply attention is the whole transformer. Position information, feed-forward transformations, residual pathways, and repeated layers also matter. Primary reference: [Attention Is All You Need](https://arxiv.org/abs/1706.03762).

Time tradeoff:

- Shorten ELIZA from roughly 20 minutes to 8–10 in a future run.
- Use the recovered time for the training loop and model/product distinction.
- Keep the Whose Preference? activity, but label it as post-training/governance rather than the generation mechanism.

### Session 2 — Images

Keep:

- Squint Test;
- Image–Caption Match Lab;
- Default Test;
- Human Diffusion Canvas;
- Diffusion Step-Through Viewer;
- A/B/C comparison method;
- Whose picture contribution map;
- simulation-evidence honesty;
- the guest block.

Add or clarify:

- Training direction: clean examples are corrupted according to a schedule; the model learns an update or correction; generation begins from noise and applies learned updates.
- Pixel space versus latent space versus decoded pixels.
- Seed, sampler, model/version, and prompt as separate experimental variables.
- Diffusion as one major family, not the definition of all image generation.
- A one-sentence caveat that current systems may use latent diffusion, diffusion-transformer backbones, flow-matching objectives, or autoregressive visual generation.

Safer live wording:

> “The system iteratively updates a noisy image or latent representation under a condition. Different model families parameterize that update differently.”

Relevant primary references:

- [High-Resolution Image Synthesis with Latent Diffusion Models](https://arxiv.org/abs/2112.10752)
- [Scalable Diffusion Models with Transformers](https://arxiv.org/abs/2212.09748)
- [Flow Matching for Generative Modeling](https://arxiv.org/abs/2210.02747)

Reduce overload in the 10–17 minute block:

- CLIP and the Image–Caption Match Lab should carry the shared-representation explanation.
- WordNet and ImageNet should move mainly to The room's default and Whose picture.
- PoseNet can be one sentence in Session 2 and receive its fuller treatment at the Session 3 bridge.
- CFG is an optional two-minute coda and can be cut entirely if the room needs more time.

Do not add another Session 2 tool for this pass. The conceptual fix is wording and sequencing.

### Session 3 — Video

Keep:

- Point Correspondence Lab;
- PoseNet → CoTracker distinction;
- Temporal Telephone;
- previous-only versus anchor comparison;
- failure analysis;
- likeness, labor, and consent;
- Video Test Report.

Add:

- one actual mechanism slide using compressed video, space-time patches, conditioning, iterative generation, and decoding;
- a distinction among jointly generated clips, chunked generation, and sequence extension;
- audio coherence: voice identity, lip synchronization, ambient sound, dialogue, and music;
- provenance and disclosure;
- model/version/date/settings in every documented test.

Native synchronized audio is now part of major video systems, so video should no longer be taught as silent frames only. Current references: [Google DeepMind Veo](https://deepmind.google/technologies/veo/) and [Sora 2 system card](https://deploymentsafety.openai.com/sora-2/specific-risk-areas-mitigations).

Time tradeoff:

- Reduce the two Temporal Telephone rounds from 45 minutes total to roughly 20–25.
- Use the recovered time for actual generation mechanics, audio, provenance, and participant analysis.
- Collapse the failure taxonomy into four durable groups: identity/object persistence; motion/physics; camera/spatial continuity; audio/semantic synchronization.

Operational gaps to resolve before Session 3:

- `pages/session-3-deck.html` still labels itself a draft.
- There is no `docs/session-3-live-presenter-script.md` parallel to Sessions 1 and 2.
- `docs/session-3-video.md` is an older two-hour plan but is not marked superseded.
- The older document and current deck contain previous-frame-only claims that need the architecture guardrail above.

## Cross-session opportunities

### Use one recurring prompt

Run the same basic subject or situation through text, image, and video. Compare:

- what each modality must make explicit;
- what the prompt leaves unspecified;
- which details become defaults;
- what must remain stable over time;
- which human and platform decisions enter at each stage.

This creates stronger continuity than three unrelated demonstration prompts.

### Use one Model Lifecycle Card

Every session should complete the same card:

1. Data
2. Representation
3. Objective
4. Training update
5. Inference/generation
6. Product wrapper
7. Evaluation and human decisions

By Session 3, participants should be able to compare all three cards side by side.

### Add a multilingual and cultural comparison

One optional comparison should ask how tokenization, category systems, captions, prompts, and defaults change across languages or cultural contexts. WordNet is specifically an English lexical project; English-language category and caption systems should not silently stand in for language itself.

### End with multimodal convergence

The final synthesis should show that current systems increasingly connect text tokens, image patches, video patches, and audio representations through related transformer-like architectures. The modalities remain materially different, but the shared concepts are now visible:

- numerical representation;
- context or conditioning;
- learned objective;
- parameter update;
- sampling or iterative generation;
- decoding;
- evaluation and governance.

### Expand learner privacy beyond recap consent

The existing AI Use + Consent Checklist is strong on participation, public recap, attribution, likeness, and refusal. Educators also need a product-use checklist:

- Is the learner old enough under the product's terms and local policy?
- What personal, assignment, image, voice, or behavioral data is uploaded?
- Is input retained or used for training?
- Can data be deleted?
- Is an account required?
- Is the product institutionally approved?
- What is the no-upload alternative?

UNESCO's education guidance emphasizes privacy, age appropriateness, human agency, and institutional validation: [Guidance for generative AI in education and research](https://www.unesco.org/en/articles/guidance-generative-ai-education-and-research?hub=195885).

### Add sustainability as a recurring system question

One prompt is enough:

> “What computation, hardware, energy, water, and supply-chain infrastructure made this training run and this generation possible?”

This belongs in the system layer rather than as a separate guilt-oriented lecture. Current reference: [IEA 2026 energy and AI update](https://www.iea.org/news/data-centre-electricity-use-surged-in-2025-even-with-tightening-bottlenecks-driving-a-scramble-for-solutions).

## Events and technical landmarks worth mentioning

Use a compact timeline, not a history lecture:

1. **WordNet and ImageNet, 1980s–2009:** lexical hierarchy → large human-constructed image dataset and benchmark.
2. **AlexNet, 2012:** large labeled image benchmarks, GPUs, and deep convolutional networks produced a major vision inflection. [Original paper](https://proceedings.neurips.cc/paper/2012/hash/c399862d3b9d6b76c8436e924a68c45b-Abstract.html)
3. **Transformer, 2017:** scalable sequence modeling with attention, position information, and repeated transformer blocks.
4. **CLIP and latent diffusion, 2021–22:** natural-language image supervision and practical generation in compressed visual spaces.
5. **Space-time patch video, 2024 onward:** images and video represented as scalable spatial or spatiotemporal patches.
6. **2025–26:** synchronized video/audio, stronger multimodal products, provenance standards, and institutional AI-literacy/disclosure requirements.

Current policy and classroom context worth linking rather than lecturing about:

- [UNESCO AI competency framework for teachers](https://www.unesco.org/en/articles/ai-competency-framework-teachers?hub=195885)
- [UNESCO AI competency framework for students](https://www.unesco.org/en/articles/ai-competency-framework-students?hub=66973)
- [NIST Generative AI Profile](https://www.nist.gov/publications/artificial-intelligence-risk-management-framework-generative-artificial-intelligence)
- [EU AI Act—AI literacy and synthetic-media disclosure](https://eur-lex.europa.eu/eli/reg/2024/1689/oj?locale=en)
- [U.S. Copyright Office AI initiative](https://www.copyright.gov/ai/)

Teach participants how to ask questions about copyright, training data, digital replicas, and disclosure. Do not present a single current legal interpretation as permanent or universal.

## What is less important in limited live time

De-emphasize or move to studio/readings:

- memorizing WordNet, ImageNet, PoseNet, CLIP, or CoTracker as names;
- detailed CFG behavior;
- exact attention, backpropagation, diffusion, or flow-matching equations;
- U-Net versus DiT architecture comparisons;
- long product-brand lists;
- parameter counts and leaderboard scores;
- “Which model is best?” comparisons;
- repeated prompt-engineering demonstrations;
- nine separate video failure labels;
- a second long Temporal Telephone round;
- claims such as “hands always break first” that may age quickly;
- building every mechanism in the backlog as a live interactive.

Keep the project names as historical anchors and optional readings. The durable learning goals are:

> data → representation → objective → learning → conditioning/inference → evaluation → human and institutional power

## Recommended implementation order

### Before Session 2

1. Reword the prominent image chain so labels are not presented as a universal generator stage.
2. Add a 30-second training-direction explanation: corrupt clean examples, learn an update, start generation from noise.
3. Replace “removes noise everywhere” with “iteratively updates a noisy image or latent representation.”
4. Add one sentence that diffusion is one major family and architectures vary.
5. Do not add another live tool.

### Before Session 3

1. Finalize the draft deck.
2. Create `docs/session-3-live-presenter-script.md`.
3. Mark or reconcile the stale `docs/session-3-video.md`.
4. Replace previous-frame-only and interpolation claims.
5. Add one space-time latent/patch mechanism slide.
6. Add audio coherence and provenance.
7. Shorten Temporal Telephone and the failure taxonomy.

### After the cohort

1. Add the shared training loop and Model Lifecycle Card across all three sessions.
2. Build the Loss-to-Weights Training Loop before another advanced mechanism lab.
3. Add the Model vs Product Stack Inspector.
4. Add the Experiment Ledger and Provenance Inspector.
5. Consider multilingual and sustainability extensions.

## Final design direction

Do not broaden the camp much more. Deepen and unify it.

The distinctive achievement is already the investigation method:

> predict → change one thing → compare → make a bounded claim → name the human decision → identify the next test

The missing explanatory layer is:

> data → representation → objective → error → parameter update → inference → product → evaluation

Adding that shared layer, correcting the video architecture analogy, and tightening the role of WordNet/ImageNet/PoseNet would make the three sessions a coherent explanation of generative machine learning rather than three adjacent modality workshops.
