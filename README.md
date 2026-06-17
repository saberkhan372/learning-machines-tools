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

### Launch-Ready Tools (25)

| Tool | Status | Session |
| --- | --- | --- |
| Tokenizer + Temperature Visualizer | Launch ready | 1 · Text |
| ELIZA Simulator | Launch ready | 1 · Text |
| Next-Token Prediction Game | Launch ready | 1 · Text |
| Count the Next Token | Launch ready | 1 · Text |
| Diffusion Step-Through Viewer | Launch ready | 2 · Image |
| The Squint Test (feature extraction) | Launch ready | 2 · Image |
| Default Test Comparison Viewer | Launch ready | 2 · Image |
| Prompt Guidance Word-by-Word | Launch ready | 2 · Image |
| Prompt Pressure (CFG scale) | Launch ready | 2 · Image |
| Latent Space Explorer | Launch ready | 2 · Image |
| Latent Space Compressor | Launch ready | 2 · Image |
| Dataset Balance Simulator | Launch ready | 2 · Image |
| Temporal Telephone | Launch ready | 3 · Video |
| Metronome Frame-Scrubber | Launch ready | 3 · Video |
| Video Failure Gallery Viewer | Launch ready | 3 · Video |
| Frame-by-Frame Coherence Viewer | Launch ready | 3 · Video |
| A/B/C Comparison Board | Launch ready | Cross |
| Concept Bridges | Launch ready | Cross |
| Model Card Builder | Launch ready | Studio |
| Classroom Activity Builder | Launch ready | Studio |
| Confidence Is Not Truth Explorer | Launch ready | Cross |
| Network-Grounded Truth Sieve | Launch ready · live Wikipedia | Cross |
| Relational Co-Occurrence Sieve | Launch ready · live Wikipedia | Cross |
| Access Tiers | Launch ready | Cross |
| Evidence Wall | Launch ready | Cross |

## Tool Folders

Use the published [tool index](pages/tools.html) for the filterable catalog, or
the source [tool directory](tools/) for canonical folders. The full public
materials directory lives at [pages/materials.html](pages/materials.html); the
homepage keeps only a short preview.

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
- [`tools/cfg-scale-visualizer/`](tools/cfg-scale-visualizer/) — Launch ready
- [`tools/latent-space-explorer/`](tools/latent-space-explorer/) — Launch ready
- [`tools/latent-space-compressor/`](tools/latent-space-compressor/) — Launch ready
- [`tools/dataset-balance-simulator/`](tools/dataset-balance-simulator/) — Launch ready

### Session 3: Video

- [`tools/temporal-telephone/`](tools/temporal-telephone/) — Launch ready
- [`tools/metronome-frame-scrubber/`](tools/metronome-frame-scrubber/) — Launch ready
- [`tools/video-failure-gallery-viewer/`](tools/video-failure-gallery-viewer/) — Launch ready
- [`tools/frame-by-frame-coherence-viewer/`](tools/frame-by-frame-coherence-viewer/) — Launch ready

### Cross-Session & Studio

- [`tools/abc-comparison-board/`](tools/abc-comparison-board/) — Launch ready
- [`tools/model-card-builder/`](tools/model-card-builder/) — Launch ready
- [`tools/classroom-activity-builder/`](tools/classroom-activity-builder/) — Launch ready
- [`tools/confidence-is-not-truth-explorer/`](tools/confidence-is-not-truth-explorer/) — Launch ready
- [`tools/network-grounded-truth-sieve/`](tools/network-grounded-truth-sieve/) — Launch ready (live Wikipedia)
- [`tools/relational-co-occurrence-sieve/`](tools/relational-co-occurrence-sieve/) — Launch ready (live Wikipedia)
- [`tools/access-tiers/`](tools/access-tiers/) — Launch ready
- [`tools/evidence-wall/`](tools/evidence-wall/) — Launch ready
- [`tools/concept-bridges/`](tools/concept-bridges/) — Launch ready

### Prompt Packs

- [`packs/text/`](packs/text/) — Session 1 frozen examples
- [`packs/images/`](packs/images/) — Session 2 frozen examples
- [`packs/video/`](packs/video/) — Session 3 frozen examples

## Planning Docs

- [Camp 2026 dates & logistics](pages/camp-2026.html) — Saturdays July 11/18/25, timezones, recordings, on-ramp
- [Camp Poster 2026](pages/camp-poster.html) — print, riskier identity, and social poster boards with tweakable color worlds
- [Session link sheet](pages/session-links.html) — one canonical link per tool, per session
- [Field Notebook](pages/notebook.html) — local-only notes, saved pages, worksheet work, export/import
- [Consent and recap protocol](docs/consent-recap-protocol.html)
- [Field Manual redesign rollout plan](docs/FIELD-MANUAL-REDESIGN.html)
- [Riskier Identity Page Audit](docs/riskier-identity-audit.html) — page-by-page visual QA and next-pass plan
- [Advanced Concept Extensions](docs/advanced-concept-extensions.html) — audit response, shipped CFG tool, and proposed next-wave tools for positional encoding, prompt alignment, VAE, temporal attention, training, and optical flow
- [Site Identity Switcher Plan](docs/site-identity-switcher-plan.html) — proposal to make the EE/FF/GG skins user-selectable site-wide
- [Browser Power Layer](docs/browser-power-plan.html) — share-links, offline PWA shell, and local media/capture/projection powers that orbit the participant notebook
- [Site Usability Audit](docs/site-usability-audit.html) — design, language, and structure audit with prioritized recommendations
- [Site Audit Fixes Plan](docs/site-audit-fixes-plan.html) — structural follow-ups (skin-demo noindex, footer nav, facilitation rename, detail-page family, vocab anchors)
- [Launch Readiness Plan](docs/launch-readiness-plan.html) — Tier 1/Tier 2 tool split for the Zoom sessions + July session-readiness checklist
- [Browser Continuity Layer Plan](docs/browser-continuity-layer-plan.html) — Codex-owned local storage, Field Notebook, resume, export/import, and clear controls
- [Project brief](docs/project-brief.html)
- [Build roadmap](docs/build-roadmap.html)
- [Pilot checklist](docs/pilot-checklist.html)
- [Pilot feedback form template](docs/pilot-feedback-form.html)
- [Pre-session check-in](docs/pre-session-checkin.html)
- [Vocabulary Field Guide](pages/vocabulary-field-guide.html)
- [Further Reading](pages/further-reading.html) — critical & intersectional texts, fiction, philosophy
- [Hands-On: Run Real Models](pages/hands-on.html) — Teachable Machine, ml5.js, TensorFlow Playground, Ollama, Hugging Face, free API tiers & agents
- [AI Access & Inequality](pages/ai-access.html) — who can use this at all; ties together Access Tiers, free/local tools, and the access readings
- [How These Tools Were Made](pages/colophon.html) — participant-facing colophon: principle, constraints, lineage, and how to build your own
- [Adapting for Younger Learners](pages/younger-learners.html) — ages 6–12, per-session notes
- [No-AI pathway](pages/no-ai-pathway.html) — participant-facing route without direct generation
- [No-AI pathway facilitation](pages/no-ai-pathway-facilitation.html) — facilitator language, tool list, and session plan
- [Human as Model (unplugged activity)](docs/unplugged-human-as-model.html)
- [Session 1 facilitation notes](docs/session-1-facilitation.html)
- [Session 2 facilitation notes](docs/session-2-facilitation.html)
- [Session 3 facilitation notes](docs/session-3-facilitation.html)
- [Session 4 showcase script](docs/session-4-showcase.html)
- [Launch QA checklist](docs/qa-checklist.html)

## Pilot Readiness

The repo is ready for a small live pilot. Start from the published homepage, use the pilot checklist, run one session script, collect feedback, and classify issues as launch blockers, pilot caveats, later polish, or second-wave ideas.

## Participation Norms

1. Human learning comes first.
2. AI use is optional, visible, and discussable.
3. No one has to use a tool they object to.
   See the [No-AI pathway](pages/no-ai-pathway.html) for the participant route, and [No-AI pathway facilitation](pages/no-ai-pathway-facilitation.html) for implementation notes.
4. AI outputs are not neutral.
5. We name labor, consent, data, and bias concerns.
6. We avoid casual imitation of living artists by name.
7. We do not generate or simulate real people without consent.
8. We review public summaries carefully.
9. We preserve room for uncertainty, refusal, and disagreement.

## Local Use

Open `index.html` in a browser for the static tools and participant pages. Markdown-backed docs under `docs/` render as `.html` on GitHub Pages; when browsing locally without Jekyll, open the corresponding `.md` file instead. Each tool is a static page under `tools/`. Launch-critical tools do not require accounts, API keys, npm, a build step, or live model access.
