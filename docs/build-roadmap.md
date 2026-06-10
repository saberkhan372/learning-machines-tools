---
layout: page
title: Build Roadmap
---

# Build Roadmap

## Current Phase

Pilot readiness and first-cohort QA.

Target launch: **Summer 2026**

The first repo goal is to create a static, GitHub Pages-ready tool ecosystem with no build step and no live model dependency for core teaching moments.

## Launch MVP

| Priority | Item | Current Repo Status | Needed Next |
| --- | --- | --- | --- |
| 1 | Worksheets + AI Use / Consent Checklist | Launch ready interactive boards (localStorage persistence, Print / Save as PDF, Copy as Markdown); printable Markdown mirrors kept | Manual browser QA before session |
| 2 | Tokenizer + Temperature Visualizer | Launch ready | Manual browser QA before session |
| 3 | ELIZA Simulator | Launch ready | Manual browser QA before session |
| 4 | Diffusion Step-Through Viewer | Launch ready | Add pre-generated PNG sequences later if curated assets become available |
| 5 | Feature Extraction / Pixel Resolution Tool | Launch ready | Replace generated teaching images with curated assets later if desired |
| 6 | Temporal Telephone | Launch ready | Use as the Session 3 centerpiece and pilot with facilitators before live run |
| 7 | Facilitation docs | Pilot scripts ready | Expand after first cohort feedback |
| 8 | Pilot checklist + feedback template | Ready for pilot | Convert to form only if needed |

Canonical tool folders now exist for every launch, second-wave, and stretch tool. See [`../tools/README.html`](../tools/README.html).

## Critical Path

### 0. Run a Small Pilot

Before adding second-wave tools, run a 60-90 minute pilot using one session script, one worksheet, and the Pilot Feedback Form.

Classify feedback as:

- launch blocker
- pilot caveat
- later polish
- second-wave tool idea

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

## Tool Status and Next Passes

Use pilot evidence before turning simulated examples into public galleries or adding heavier interactive features.

| Tool | Current Direction |
| --- | --- |
| A/B/C Comparison Board | Launch-ready; use it to collect structured pilot evidence across text, image, and video |
| Model Card Builder | Launch-ready; use for the critical/no-AI pathway and optional studio showcase preparation |
| Classroom Activity Builder | Launch-ready; use it to turn camp concepts into printable teacher-facing activities |
| Concept Bridge Pages | Launch-ready; use during debriefs, recaps, showcase prep, and classroom adaptation |
| Default Test Comparison Viewer | Launch-ready static comparison viewer; future pass can replace simulated scenes with reviewed participant examples |
| Failure Gallery Viewer | Launch-ready static gallery; future pass can add real curated clips and screenshots |
| Prompt Guidance Word-by-Word Reveal | Launch-ready bridge activity; future pass can swap in generated image assets |
| Frame-by-Frame Coherence Viewer | Launch-ready frame overlay tool with sample frames and upload support |
| Next-Token Prediction Game | Launch-ready Zoom paste version; parser handles Zoom's saved/copied chat format |
| Count the Next Token | Launch-ready; makes the count → divide → predict arithmetic of a bigram model fully visible |
| Evidence Wall | Launch-ready Zoom paste aggregation with consent banner and URL-hash sharing |
| Access Tiers | Launch-ready; compares the same task across paid, free, and unplugged access |
| Confidence Is Not Truth Explorer | Launch-ready; participants rate confidence vs. correctness, then reveal evidence |
| Latent Space Explorer | Launch-ready; uses a lens-based map metaphor to discuss learned similarity and representation limits |
| Dataset Balance Simulator | Launch-ready; uses simplified sliders and presets to discuss data composition, defaults, and caution |

## Timeline

| Phase | Details |
| --- | --- |
| May-June 2026 | Complete launch tools, polish existing tools, build worksheets and consent materials |
| June 2026 | Finalize dates, confirm guest speakers, open registration, promote to Coding Camp alumni |
| July-August 2026 | Run three core sessions plus optional studio, record sessions, produce recaps |
| September 2026 | Connect participants to CC Fest 10th Anniversary event |
| October-November 2026 | Build second-wave tools from cohort feedback and prepare Fall 2026 Coding Camp connection |

## Open Questions

- Four consecutive Saturdays, or a break between sessions?
- Same 9-11 AM PT slot as Coding Camp?
- Open registration or capped cohort?
- Which guest speakers for language, image generation, video, and community connection?
- What pre-generated output sets are needed for participants without model access?
- Which pre-generated diffusion image sequences should replace or supplement the canvas fallback?

## Answered Questions

- ~~Should worksheets stay as Markdown, become printable PDFs, or become interactive boards?~~ They became interactive boards with localStorage persistence, print, and Copy-as-Markdown; the Markdown versions remain as printable mirrors.
