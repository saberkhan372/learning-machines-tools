# Learning Machines: Text, Images, Video

A CC Fest creative AI / machine learning camp tool ecosystem.

This repo holds single-file, browser-based tools and workshop materials for a four-session camp:

1. **Machines That Write** - text, tokens, prediction, temperature, and the illusion of meaning
2. **Machines That Imagine** - pixels, features, diffusion, prompts, and visual defaults
3. **Machines That Move** - time, drift, coherence, anchoring, and video failure
4. **Human in the Loop** - showcase, classroom adaptation, critique, and reflection

The repeated question is:

> What is the machine actually doing?

The tool principle is:

> Every tool should make something invisible visible.

## Design Constraints

- Single-file HTML whenever possible
- Vanilla JavaScript
- No required accounts
- No live model dependency for core teaching moments
- Static/precomputed examples when reliability matters
- GitHub Pages friendly
- Embeddable in Notion
- Low-AI and no-AI participation pathways

## Launch Roadmap

### MVP Tools

| Priority | Tool | Status | Purpose |
| --- | --- | --- | --- |
| 1 | Tokenizer + Temperature Visualizer | Launch ready | Make tokenization, probability, and sampling visible |
| 2 | ELIZA Simulator | Launch ready | Make rule-based AI legible |
| 3 | Diffusion Step-Through Viewer | Launch ready draft | Make denoising visible with canvas fallback and future image-sequence support |
| 4 | Feature Extraction / Pixel Resolution Tool | Launch ready | Make image representation visible |
| 5 | Temporal Telephone | Launch ready | Make temporal drift and anchoring visible |

### Later Tools

- Default Test Comparison Viewer
- Video Failure Gallery Viewer
- A/B/C Comparison Board
- Model Card Builder
- Concept Bridge pages
- Prompt Guidance Word-by-Word Reveal
- Frame-by-Frame Coherence Viewer
- Next-Token Prediction Game
- Latent Space Explorer
- Dataset Balance Simulator

## Tool Folders

Canonical folders live under [`tools/`](tools/).

### Session 1: Text

- [`tools/tokenizer-temperature-visualizer/`](tools/tokenizer-temperature-visualizer/)
- [`tools/eliza-simulator/`](tools/eliza-simulator/)
- [`tools/next-token-prediction-game/`](tools/next-token-prediction-game/)

### Session 2: Images

- [`tools/feature-extraction-pixel-resolution/`](tools/feature-extraction-pixel-resolution/)
- [`tools/diffusion-step-through-viewer/`](tools/diffusion-step-through-viewer/)
- [`tools/default-test-comparison-viewer/`](tools/default-test-comparison-viewer/)
- [`tools/prompt-guidance-word-by-word/`](tools/prompt-guidance-word-by-word/)
- [`tools/latent-space-explorer/`](tools/latent-space-explorer/)
- [`tools/dataset-balance-simulator/`](tools/dataset-balance-simulator/)

### Session 3: Video

- [`tools/temporal-telephone/`](tools/temporal-telephone/)
- [`tools/video-failure-gallery-viewer/`](tools/video-failure-gallery-viewer/)
- [`tools/frame-by-frame-coherence-viewer/`](tools/frame-by-frame-coherence-viewer/)

### Cross-Session

- [`tools/abc-comparison-board/`](tools/abc-comparison-board/)
- [`tools/model-card-builder/`](tools/model-card-builder/)
- [`tools/concept-bridges/`](tools/concept-bridges/)

## Planning Docs

- [Project brief](docs/project-brief.md)
- [Build roadmap](docs/build-roadmap.md)
- [Session 1 facilitation notes](docs/session-1-facilitation.md)
- [Session 2 facilitation notes](docs/session-2-facilitation.md)
- [Session 3 facilitation notes](docs/session-3-facilitation.md)
- [Launch QA checklist](docs/qa-checklist.md)

## Participation Norms

1. Human learning comes first.
2. AI use is optional, visible, and discussable.
3. No one has to use a tool they object to.
4. AI outputs are not neutral.
5. We name labor, consent, data, and bias concerns.
6. We avoid casual imitation of living artists by name.
7. We do not generate or simulate real people without consent.
8. We review public summaries carefully.
9. We preserve room for uncertainty, refusal, and disagreement.

## Local Use

Open `index.html` in a browser. Each tool is a static page under `tools/`. Launch-critical tools do not require accounts, API keys, npm, a build step, or live model access.
