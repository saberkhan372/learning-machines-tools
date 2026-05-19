# Build Roadmap

## Current Phase

Launch MVP ready for first-cohort QA.

Target launch: **Summer 2026**

The first repo goal is to create a static, GitHub Pages-ready tool ecosystem with no build step and no live model dependency for core teaching moments.

## Launch MVP

| Priority | Item | Current Repo Status | Needed Next |
| --- | --- | --- | --- |
| 1 | Worksheets + AI Use / Consent Checklist | Launch ready Markdown | Optional printable/PDF versions later |
| 2 | Tokenizer + Temperature Visualizer | Launch ready | Manual browser QA before session |
| 3 | ELIZA Simulator | Launch ready | Manual browser QA before session |
| 4 | Diffusion Step-Through Viewer | Launch ready draft | Add pre-generated PNG sequences when available |
| 5 | Feature Extraction / Pixel Resolution Tool | Launch ready | Replace generated teaching images with curated assets later if desired |
| 6 | Temporal Telephone | Launch ready | Pilot with facilitators before Session 3 |
| 7 | Facilitation docs | Launch ready | Expand after first cohort feedback |

Canonical tool folders now exist for every launch, second-wave, and stretch tool. See [`../tools/README.md`](../tools/README.md).

## Critical Path

### 1. Maintain Tokenizer + Temperature Visualizer

The report identifies this as the highest-value Session 1 tool.

Required behavior:

- text input
- BPE-like token chunks
- deterministic fake token IDs
- scenario selector
- probability distribution display
- temperature slider
- greedy vs. sample mode
- next-token stepping
- auto-run
- generated text stream
- teaching notes
- self-tests with visible failure details

Teaching insight to preserve:

- Low temperature makes top tokens dominate.
- Higher temperature flattens the distribution.
- Probability is not truth.
- Sampling can produce surprise without understanding.

### 2. Maintain ELIZA Simulator

Current draft already supports:

- local rule engine
- visible matched pattern
- rule name
- response template
- chat interface
- comparison notes panel

Launch behavior includes a fixed prompt set, pre-written LLM comparison examples, facilitator notes, and visible rule inspection.

### 3. Upgrade Diffusion Viewer

Current launch version uses canvas-generated teaching states and includes hooks for future pre-generated PNG steps.

Next version should support:

- 20-30 pre-generated PNG steps per sequence
- sequence selector
- slider labels: pure noise, rough composition, major color regions, subject emerges, edges sharpen, textures appear, fine detail, final image
- annotations connecting prompt guidance to denoising

Launch sequences:

1. realistic photo prompt
2. illustrated/stylized prompt
3. abstract prompt
Optional next step: add a carefully framed Default Test sequence after collecting or generating appropriate assets.

## Later Tools

Build after the first cohort, using real participant examples.

| Tool | Why Later |
| --- | --- |
| Default Test Comparison Viewer | More useful after collecting real examples |
| Failure Gallery Viewer | Needs curated video clips and failure labels |
| A/B/C Comparison Board | Worksheets are enough for pilot |
| Model Card Builder | Strong showcase and critical-pathway tool |
| Concept Bridge Pages | Better once camp language stabilizes |
| Prompt Guidance Word-by-Word Reveal | Useful after the diffusion activity language stabilizes |
| Frame-by-Frame Coherence Viewer | Needs curated video/image sequences |
| Next-Token Prediction Game | Zoom version is enough for pilot |
| Latent Space Explorer | Needs a careful visual metaphor and dataset |
| Dataset Balance Simulator | Better once age/audience needs are clearer |

## Timeline

| Phase | Details |
| --- | --- |
| May-June 2026 | Complete launch tools, polish existing tools, build worksheets and consent materials |
| June 2026 | Finalize dates, confirm guest speakers, open registration, promote to Coding Camp alumni |
| July-August 2026 | Run four-session workshop, record sessions, produce recaps |
| September 2026 | Connect participants to CC Fest 10th Anniversary event |
| October-November 2026 | Build second-wave tools from cohort feedback and prepare Fall 2026 Coding Camp connection |

## Open Questions

- Four consecutive Saturdays, or a break between sessions?
- Same 9-11 AM PT slot as Coding Camp?
- Open registration or capped cohort?
- Which guest speakers for language, image generation, video, and community connection?
- What pre-generated output sets are needed for participants without model access?
- Should worksheets stay as Markdown, become printable PDFs, or become interactive boards?
- Which pre-generated diffusion image sequences should replace or supplement the canvas fallback?
