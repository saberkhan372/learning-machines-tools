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
| Images | Diffusion step-through, feature extraction, default testing, prompt guidance, CFG scale, latent-space exploration, dataset balance |
| Video | Temporal Telephone, video failure gallery, frame-by-frame coherence |
| Cross-session | A/B/C comparison, model cards, access tiers, evidence wall, concept bridges, classroom activity builder |

`tools/latent-space-explorer/` is already launch-ready. Future embedding work
should extend or reference that tool rather than duplicate it.

## Audit Response: What the Launch Set Still Does Not Show

A June 2026 audit correctly identified that the public tool set is strongest at
showing inference behaviour: what changes when a learner edits a prompt,
temperature, example set, frame sequence, comparison board, or access tier. It
does not yet fully expose the training and representation machinery underneath
modern generative systems.

That gap is real, and it should stay visible. The launch set answers "what can
we observe and test in a browser workshop?" The next-wave layer should answer
"what mathematical bridge or training process made that behaviour possible?"

Participant interest data supports adding this layer as an optional extension,
not as a replacement for the current beginner path. In 43 interest-form
responses, the largest signals were:

- 27 respondents selected designing classroom activities about AI.
- 22 selected making creative work with AI tools.
- 21 selected ethics of generative AI.
- 20 selected how image generators work.
- 18 selected AI bias/defaults and 18 selected informed understanding.
- 14 selected how video generation handles time and motion.
- Open responses also asked for "nuts and bolts," math, local/free model
  access, and whether the camp would build any models from scratch.

The resulting design constraint is: keep the core sessions approachable and
account-free, but add optional "under the hood" extensions for learners who want
the machinery.

## Shipped Advanced Concepts

| Concept | Tool | What it adds |
|---|---|---|
| Classifier-free guidance (CFG) | `tools/cfg-scale-visualizer/` | Shows prompt pressure moving from loose to useful to over-forced, making it clear that guidance is not the same as quality |

## Proposed Concept Gaps

| Modality | Concept | Why it matters | Best format |
|---|---|---|---|
| Text | Positional encoding / sequence position | Clarifies the transformer distinction: a generation loop emits text one token at a time, while each forward pass computes over the available context positions using position information and causal masking | Interactive sentence scramble / position-stamp visualizer |
| Text | Backpropagation / training | Shows where probabilities come from and how error changes future behavior | Unplugged activity or board-game simulator |
| Text / cross | Attention and context windows | Makes selective focus and forgetting visible | Small interactive map plus Zoom memory activity |
| Image / video | Text encoder / cross-modal alignment | Shows that image and video systems need a bridge from human words into learned numeric prompt space, often taught through CLIP-like alignment | Prompt-to-vector map paired with image-neighbor retrieval |
| Images | Forward diffusion | Explains why reverse denoising training works by first destroying images | Slider or paired forward/reverse viewer |
| Images | VAE / latent compression | Shows why image models operate in compressed latent space rather than raw pixels | Interactive compressor |
| Video | Temporal attention / cross-frame consistency | Shows how video tries to keep identity, physics, and scene layout stable | Frame scrubber / attention-window visualizer |
| Video | Optical flow | Makes motion vectors and frame-to-frame displacement visible | Vector-field overlay |
| Text / cross | Custom embedding data | Lets learners load a small local CSV of their own items into the latent map, showing embeddings are data, not magic | Stretch extension of `tools/latent-space-explorer/` (local file read; stays offline) |
| Image / cross | User-supplied visual presets | Lets facilitators test edge cases and defaults with local classroom-safe images instead of only procedural examples | Local file drop zone with no upload and clear consent warning |

## Proposed Tools

These are next-wave candidates, not launch-ready repo tools.

| Candidate | Working name | Session | Core interaction | Notes |
|---|---|---|---|---|
| Tool 22 | Latent Space Compressor / VAE Simulator | 2 · Images | Choose an image preset, compress it into a small latent grid, then reconstruct it | Should use image presets, visible reconstruction loss, and optional random latent sampling |
| Tool 23 | Temporal Attention Tracker | 3 · Video | Scrub frames while changing the attention window / memory span | Avoid autoplay assumptions; make any audio user-triggered and optional |
| Tool 24 | Forward Diffusion Trainer | 2 · Images | Move one slider forward into noise and backward into reconstruction | Should pair training direction with generation direction |
| Tool 25 | Backpropagation Role-Play | 1 · Text / cross | Human model predicts, receives error, updates a visible rule or weight | Better as printable or Zoom activity than a screen-first tool |
| Tool 26 | Optical Flow Field Viewer | 3 · Video | Compare two frames and show arrows for motion displacement | Can be simulated with simple inline SVG/canvas frames |
| Tool 27 | Positional Encoding Line | 1 · Text | Stamp token cards with position values, then scramble/reorder to show why order must be represented numerically | Should avoid saying transformers "read like humans"; show generation loop vs. parallel context computation |
| Tool 28 | Prompt Alignment Bridge | 2 · Images / 3 · Video | Type a prompt, map its words into a small learned coordinate field, and retrieve nearest image/video concept cards | A teaching analogue for CLIP-style text encoders, not a claim about one exact production architecture |
| Tool 29 | Local Preset Bias Tester | 2 · Images / cross | Drop local images or choose preset families, then compare what features a simplified detector notices or misses | Must never upload files; include consent and classroom artifact warnings |

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
| Positional encoding | Numbered assembly-line stickers on cups that arrive together | The stickers are learned/math position signals, not literal numbers printed on words |
| Next-token prediction | A relay team adding one ingredient at a time | Real models use much more context than a simple blind relay |
| Temperature | A risk dial between predictable and chaotic choices | Temperature affects sampling, not truth or creativity by itself |
| Attention | A tasting spoon that checks important flavors | Attention is weighted computation, not human attention |
| Context window | A small countertop where old bowls get pushed off | Context can be compressed or summarized by surrounding systems |
| Embeddings | A flavor chart where similar tastes sit near each other | Real embedding spaces have many dimensions and learned biases |
| Text encoder / alignment bridge | Translating a written recipe into kitchen coordinates for the image station | Alignment models learn statistical associations; they do not understand language like a person |
| Backpropagation | Post-dinner error correction that changes instincts | Training changes parameters mathematically, not by reflection |
| Forward diffusion | Dissolving a sugar sculpture into cloudy water | Diffusion adds structured noise according to a schedule |
| VAE compression | Dehydrating a huge soup into bouillon cubes before reconstituting it | Latents are learned numeric representations, not human-readable recipes |
| CFG | A restaurant inspector's megaphone: too quiet, useful, then overbearing | CFG is guidance arithmetic, not obedience or intent |
| Temporal attention | A light-box for tracing frame continuity across animation cells | Video systems differ; this is a teaching simplification |

## Zoom vs. Interactive HTML

| Better as Zoom / unplugged activity | Better as interactive HTML |
|---|---|
| Backpropagation role-play | Positional encoding line |
| Human memory/context-window game | VAE compressor |
| Group prediction and discussion | Forward/reverse diffusion slider |
| ELIZA vs. LLM role-play | Temporal attention frame scrubber |
| Ethics/access discussion | Optical-flow overlay |
| Access/refusal discussion | Prompt alignment bridge |

## Recommended Order

1. **VAE / Latent Compressor**
   Deepens the existing Latent Space Explorer and diffusion tools.
2. **Positional Encoding Line**
   Smallest missing text-mechanics bridge: it clarifies why order has to become
   math before attention can use it.
3. **Prompt Alignment Bridge**
   Connects the text session to image/video generation by showing that prompts
   pass through learned representations before steering pixels or frames.
4. **Temporal Attention Tracker**
   Strong fit for Session 3, especially after Temporal Telephone and
   Frame-by-Frame Coherence Viewer.
5. **Forward Diffusion Trainer**
   Useful if learners need the training direction separated from generation.
6. **Backpropagation Role-Play**
   Important, but likely strongest as a printable/Zoom activity before an HTML
   simulator.
7. **Optical Flow Field Viewer**
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
