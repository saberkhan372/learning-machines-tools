---
layout: page
title: Advanced Concept Extensions
---

# Advanced Concept Extensions

Status: **planning reference / not a shipped tool list**

This document captures deeper backend concepts that could extend *Learning
Machines* after the launch-ready field manual. It is meant to guide future
tools, concept bridges, prompt packs, and unplugged activities without
confusing proposed work with what already exists.

The core standard still applies:

> What is the machine actually doing?

Every proposed extension should make one hidden mechanism visible, preserve the
participation pathways, and remain account-free for the core teaching moment.

## Current Baseline

The repo already has launch-ready tools for the main investigation arc:

| Area | Existing coverage |
|---|---|
| Text | Tokenization, temperature, next-token prediction, bigram counting, ELIZA, confidence vs. truth |
| Images | Diffusion step-through, feature extraction, default testing, prompt guidance, latent-space exploration, dataset balance |
| Video | Temporal Telephone, video failure gallery, frame-by-frame coherence |
| Cross-session | A/B/C comparison, model cards, access tiers, evidence wall, concept bridges, classroom activity builder |

`tools/latent-space-explorer/` is already launch-ready. Future embedding work
should extend or reference that tool rather than duplicate it.

## Proposed Concept Gaps

| Modality | Concept | Why it matters | Best format |
|---|---|---|---|
| Text | Backpropagation / training | Shows where probabilities come from and how error changes future behavior | Unplugged activity or board-game simulator |
| Text / cross | Attention and context windows | Makes selective focus and forgetting visible | Small interactive map plus Zoom memory activity |
| Images | Forward diffusion | Explains why reverse denoising training works by first destroying images | Slider or paired forward/reverse viewer |
| Images | VAE / latent compression | Shows why image models operate in compressed latent space rather than raw pixels | Interactive compressor |
| Images | Classifier-free guidance (CFG) | Image analogue to prompt-following strength; high values can create artifacts | Continuous slider visualizer |
| Video | Temporal attention / cross-frame consistency | Shows how video tries to keep identity, physics, and scene layout stable | Frame scrubber / attention-window visualizer |
| Video | Optical flow | Makes motion vectors and frame-to-frame displacement visible | Vector-field overlay |
| Text / cross | Custom embedding data | Lets learners load a small local CSV of their own items into the latent map, showing embeddings are data, not magic | Stretch extension of `tools/latent-space-explorer/` (local file read; stays offline) |

## Proposed Tools

These are next-wave candidates, not launch-ready repo tools.

| Candidate | Working name | Session | Core interaction | Notes |
|---|---|---|---|---|
| Tool 21 | Latent Space Compressor / VAE Simulator | 2 · Images | Choose an image preset, compress it into a small latent grid, then reconstruct it | Should use image presets, visible reconstruction loss, and optional random latent sampling |
| Tool 22 | CFG Scale Visualizer | 2 · Images | Move a guidance slider from loose/default to stable/prompt-aligned to overcooked/artifacted | Needs continuous interpolation and an explicit “too much guidance breaks” explanation |
| Tool 23 | Temporal Attention Tracker | 3 · Video | Scrub frames while changing the attention window / memory span | Avoid autoplay assumptions; make any audio user-triggered and optional |
| Tool 24 | Forward Diffusion Trainer | 2 · Images | Move one slider forward into noise and backward into reconstruction | Should pair training direction with generation direction |
| Tool 25 | Backpropagation Role-Play | 1 · Text / cross | Human model predicts, receives error, updates a visible rule or weight | Better as printable or Zoom activity than a screen-first tool |
| Tool 26 | Optical Flow Field Viewer | 3 · Video | Compare two frames and show arrows for motion displacement | Can be simulated with simple inline SVG/canvas frames |

## Tool Design Rules

Future advanced tools should follow the current Field Manual system, not the
archived v1 design.

- Use `assets/field.css`, `assets/field-tool.css`, and `assets/field-theme.js`.
- Use the current Field tokens: `--bg`, `--surface`, `--ink`, `--muted`,
  `--rule`, and modality inks.
- Do not reintroduce `lm.css`, React, Babel, npm, or live model dependencies.
- Keep the core mechanism inline, simulated, or precomputed.
- Prefer one meaningful slider or control over many decorative controls.
- Include evidence logging only when it supports the investigation loop.
- Keep controls keyboard-operable with visible focus states.
- Respect `prefers-reduced-motion`; motion should explain mechanism, not carry
  the whole meaning.

## Teaching Analogies

The “Grand Kitchen Stadium” metaphor is useful as optional facilitation
language, especially for quick spoken explanations. It should not replace the
Field Manual identity or become the site-wide metaphor.

| Concept | Kitchen analogy | Use carefully because... |
|---|---|---|
| Tokenization | Chopping ingredients into mise en place cups | Tokens are not always meaningful pieces like ingredients |
| Next-token prediction | A relay team adding one ingredient at a time | Real models use much more context than a simple blind relay |
| Temperature | A risk dial between predictable and chaotic choices | Temperature affects sampling, not truth or creativity by itself |
| Attention | A tasting spoon that checks important flavors | Attention is weighted computation, not human attention |
| Context window | A small countertop where old bowls get pushed off | Context can be compressed or summarized by surrounding systems |
| Embeddings | A flavor chart where similar tastes sit near each other | Real embedding spaces have many dimensions and learned biases |
| Backpropagation | Post-dinner error correction that changes instincts | Training changes parameters mathematically, not by reflection |
| Forward diffusion | Dissolving a sugar sculpture into cloudy water | Diffusion adds structured noise according to a schedule |
| VAE compression | Turning a dish into a compact recipe sketch | Latents are learned numeric representations, not human sketches |
| CFG | A strictness dial between ignoring and over-obeying a recipe | CFG is guidance arithmetic, not obedience or intent |
| Temporal attention | A light-box for tracing frame continuity | Video systems differ; this is a teaching simplification |

## Zoom vs. Interactive HTML

| Better as Zoom / unplugged activity | Better as interactive HTML |
|---|---|
| Backpropagation role-play | CFG slider |
| Human memory/context-window game | VAE compressor |
| Group prediction and discussion | Forward/reverse diffusion slider |
| ELIZA vs. LLM role-play | Temporal attention frame scrubber |
| Ethics/access discussion | Optical-flow overlay |

## Recommended Order

1. **CFG Scale Visualizer**
   Fastest conceptual win for Session 2 because it pairs naturally with
   temperature and prompt guidance.
2. **VAE / Latent Compressor**
   Deepens the existing Latent Space Explorer and diffusion tools.
3. **Temporal Attention Tracker**
   Strong fit for Session 3, especially after Temporal Telephone and
   Frame-by-Frame Coherence Viewer.
4. **Forward Diffusion Trainer**
   Useful if learners need the training direction separated from generation.
5. **Backpropagation Role-Play**
   Important, but likely strongest as a printable/Zoom activity before an HTML
   simulator.
6. **Optical Flow Field Viewer**
   Valuable stretch tool if Session 3 needs a more technical motion layer.

## Acceptance Bar

An advanced concept extension is ready only when:

- The invisible mechanism is visible in the first screen.
- The user can change exactly one meaningful variable and compare evidence.
- No account, API key, build step, or live AI service is required.
- The page works offline apart from allowed fonts.
- It fits the Field Manual design system and modality colors.
- Reduced-motion mode remains complete.
- It is usable at narrow phone, tablet, and desktop widths.
- It includes one plain-language bridge to classroom, creative, or critical use.
