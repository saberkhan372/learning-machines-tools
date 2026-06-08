---
layout: page
title: Learning Machines Tools
---

# Learning Machines: Text, Images, Video

A CC Fest creative AI / machine learning camp tool ecosystem.

This repo holds single-file, browser-based tools and workshop materials for a camp framed as **three core sessions + optional studio**:

- **Session 1: Machines That Write** - text, tokens, prediction, temperature, and the illusion of meaning
- **Session 2: Machines That Imagine** - pixels, features, diffusion, prompts, and visual defaults
- **Session 3: Machines That Move** - time, drift, coherence, anchoring, and video failure
- **Optional Studio: Make, Teach, Investigate, Explain, or Critique** - final artifacts, classroom adaptation, model-behavior investigations, explainers, and reflective critique

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

### Launch-Ready Tools (20)

| Tool | Status | Session |
| --- | --- | --- |
| Tokenizer + Temperature Visualizer | Launch ready | 1 · Text |
| ELIZA Simulator | Launch ready | 1 · Text |
| Next-Token Prediction Game | Launch ready | 1 · Text |
| Count the Next Token | Launch ready | 1 · Text |
| Diffusion Step-Through Viewer | Launch ready | 2 · Image |
| Feature Extraction / Pixel Resolution | Launch ready | 2 · Image |
| Default Test Comparison Viewer | Launch ready | 2 · Image |
| Prompt Guidance Word-by-Word | Launch ready | 2 · Image |
| Latent Space Explorer | Launch ready | 2 · Image |
| Dataset Balance Simulator | Launch ready | 2 · Image |
| Temporal Telephone | Launch ready | 3 · Video |
| Video Failure Gallery Viewer | Launch ready | 3 · Video |
| Frame-by-Frame Coherence Viewer | Launch ready | 3 · Video |
| A/B/C Comparison Board | Launch ready | Cross |
| Concept Bridges | Launch ready | Cross |
| Model Card Builder | Launch ready | Cross |
| Classroom Activity Builder | Launch ready | Studio |
| Confidence Is Not Truth Explorer | Launch ready | Cross |
| Access Tiers | Launch ready | Cross |
| Evidence Wall | Launch ready | Cross |

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
- [`tools/default-test-comparison-viewer/`](tools/default-test-comparison-viewer/) — Launch ready
- [`tools/prompt-guidance-word-by-word/`](tools/prompt-guidance-word-by-word/) — Launch ready
- [`tools/latent-space-explorer/`](tools/latent-space-explorer/) — Launch ready
- [`tools/dataset-balance-simulator/`](tools/dataset-balance-simulator/) — Launch ready

### Session 3: Video

- [`tools/temporal-telephone/`](tools/temporal-telephone/) — Launch ready
- [`tools/video-failure-gallery-viewer/`](tools/video-failure-gallery-viewer/) — Launch ready
- [`tools/frame-by-frame-coherence-viewer/`](tools/frame-by-frame-coherence-viewer/) — Launch ready

### Cross-Session

- [`tools/abc-comparison-board/`](tools/abc-comparison-board/) — Launch ready
- [`tools/model-card-builder/`](tools/model-card-builder/) — Launch ready
- [`tools/classroom-activity-builder/`](tools/classroom-activity-builder/) — Launch ready
- [`tools/confidence-is-not-truth-explorer/`](tools/confidence-is-not-truth-explorer/) — Launch ready
- [`tools/access-tiers/`](tools/access-tiers/) — Launch ready
- [`tools/evidence-wall/`](tools/evidence-wall/) — Launch ready
- [`tools/concept-bridges/`](tools/concept-bridges/) — Launch ready

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
- [Vocabulary Field Guide](pages/vocabulary-field-guide.html)
- [No-AI pathway](pages/no-ai-pathway.html)
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
   See the [No-AI pathway](pages/no-ai-pathway.html) for a full route through the camp without direct generation.
4. AI outputs are not neutral.
5. We name labor, consent, data, and bias concerns.
6. We avoid casual imitation of living artists by name.
7. We do not generate or simulate real people without consent.
8. We review public summaries carefully.
9. We preserve room for uncertainty, refusal, and disagreement.

## Local Use

Open `index.html` in a browser for the static tools and participant pages. Markdown-backed docs under `docs/` render as `.html` on GitHub Pages; when browsing locally without Jekyll, open the corresponding `.md` file instead. Each tool is a static page under `tools/`. Launch-critical tools do not require accounts, API keys, npm, a build step, or live model access.
