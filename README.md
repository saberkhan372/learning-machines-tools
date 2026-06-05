---
layout: page
title: Learning Machines Tools
---

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

### Launch-Ready Tools (11)

| Tool | Status | Session |
| --- | --- | --- |
| Tokenizer + Temperature Visualizer | Launch ready | 1 · Text |
| ELIZA Simulator | Launch ready | 1 · Text |
| Next-Token Prediction Game | Launch ready | 1 · Text |
| Count the Next Token | Launch ready | 1 · Text |
| Diffusion Step-Through Viewer | Launch ready | 2 · Image |
| Feature Extraction / Pixel Resolution | Launch ready | 2 · Image |
| Temporal Telephone | Launch ready | 3 · Video |
| A/B/C Comparison Board | Launch ready | Cross |
| Model Card Builder | Launch ready | Cross |
| Access Tiers | Launch ready | Cross |
| Evidence Wall | Launch ready | Cross |

### Second-Wave and Later Tools

- Concept Bridge pages — second-wave draft
- Default Test Comparison Viewer — coming later
- Video Failure Gallery Viewer — coming later
- Prompt Guidance Word-by-Word — coming later
- Frame-by-Frame Coherence Viewer — coming later
- Latent Space Explorer — coming later
- Dataset Balance Simulator — coming later

## Tool Folders

Canonical folders are listed in the [tool directory](tools/).

### Session 1: Text

- [`tools/tokenizer-temperature-visualizer/`](tools/tokenizer-temperature-visualizer/) — Launch ready
- [`tools/eliza-simulator/`](tools/eliza-simulator/) — Launch ready
- [`tools/next-token-prediction-game/`](tools/next-token-prediction-game/) — Launch ready
- [`tools/count-the-next-token/`](tools/count-the-next-token/) — Launch ready

### Session 2: Images

- [`tools/diffusion-step-through-viewer/`](tools/diffusion-step-through-viewer/) — Launch ready
- [`tools/feature-extraction-pixel-resolution/`](tools/feature-extraction-pixel-resolution/) — Launch ready
- [`tools/default-test-comparison-viewer/`](tools/default-test-comparison-viewer/) — Coming later
- [`tools/prompt-guidance-word-by-word/`](tools/prompt-guidance-word-by-word/) — Coming later
- [`tools/latent-space-explorer/`](tools/latent-space-explorer/) — Coming later
- [`tools/dataset-balance-simulator/`](tools/dataset-balance-simulator/) — Coming later

### Session 3: Video

- [`tools/temporal-telephone/`](tools/temporal-telephone/) — Launch ready
- [`tools/video-failure-gallery-viewer/`](tools/video-failure-gallery-viewer/) — Coming later
- [`tools/frame-by-frame-coherence-viewer/`](tools/frame-by-frame-coherence-viewer/) — Coming later

### Cross-Session

- [`tools/abc-comparison-board/`](tools/abc-comparison-board/) — Launch ready
- [`tools/model-card-builder/`](tools/model-card-builder/) — Launch ready
- [`tools/access-tiers/`](tools/access-tiers/) — Launch ready
- [`tools/evidence-wall/`](tools/evidence-wall/) — Launch ready
- [`tools/concept-bridges/`](tools/concept-bridges/) — Second-wave draft

### Prompt Packs

- [`packs/text/`](packs/text/) — Session 1 frozen examples
- [`packs/images/`](packs/images/) — Session 2 frozen examples
- [`packs/video/`](packs/video/) — Session 3 frozen examples

## Planning Docs

- [Project brief](docs/project-brief.html)
- [Build roadmap](docs/build-roadmap.html)
- [Pilot checklist](docs/pilot-checklist.html)
- [Pilot feedback form template](docs/pilot-feedback-form.html)
- [Pre-session check-in](docs/pre-session-checkin.html)
- [Human as Model (unplugged activity)](docs/unplugged-human-as-model.html)
- [Session 1 facilitation notes](docs/session-1-facilitation.html)
- [Session 2 facilitation notes](docs/session-2-facilitation.html)
- [Session 3 facilitation notes](docs/session-3-facilitation.html)
- [Launch QA checklist](docs/qa-checklist.html)

## Pilot Readiness

The repo is ready for a small live pilot. Start from the published homepage, use the pilot checklist, run one session script, collect feedback, and classify issues as launch blockers, pilot caveats, later polish, or second-wave ideas.

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
