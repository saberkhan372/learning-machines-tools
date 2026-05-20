---
layout: page
title: Launch QA Checklist
---

# Launch QA Checklist

Use this before publishing or sharing the repo.

## Link QA

- Open `index.html`.
- Open the live GitHub Pages homepage.
- Open at least one rendered document URL ending in `.html`.
- Open every launch tool from the homepage.
- Open every worksheet and project doc link.
- Use each tool's "Back to tools" link.
- Confirm second-wave drafts are labeled "Second-wave draft" and parked stretch/gallery tools are labeled "Coming later."
- Confirm the Pilot Ready path links to the pilot checklist, feedback template, and three session scripts.
- Confirm Markdown pages render as styled HTML instead of raw Markdown.

## Tool QA

- Tokenizer + Temperature Visualizer: run self-tests, try token examples, step next token, run auto, reset, switch greedy/sample.
- ELIZA Simulator: run self-tests, click example prompts, inspect matched rule, review comparison examples.
- Diffusion Step-Through Viewer: confirm self-tests pass, switch sequences, move slider from 0 to final, read prompt, annotation, facilitator, and reflection cards.
- Feature Extraction / Pixel Resolution: switch image types, change detail level, switch Pixels/Edges/Features.
- Temporal Telephone: confirm self-tests pass, draw frames, save, switch previous/anchor/both modes, play sequence, use the failure bridge, clear and reset.
- A/B/C Comparison Board: load a starter template, edit fields, copy Markdown, export JSON, and reset only after export.
- Model Card Builder: load a starter template, edit fields, copy Markdown, export JSON, and confirm self-tests pass.
- Concept Bridges: open each bridge link and confirm the four bridge cards fit at desktop and mobile widths.

## Responsive QA

- Test desktop width.
- Test tablet width.
- Test narrow mobile width.
- Confirm text does not overlap controls.
- Confirm canvas tools remain usable or clearly stacked.

## Offline QA

- Confirm no launch tool requires an account, API key, npm install, build step, or live model.
- Confirm launch tools do not depend on external scripts, fonts, or images.

## Facilitation QA

- Each session has a tool sequence.
- Each session has a worksheet.
- Each session has low-AI/no-AI options.
- Consent and public attribution questions are explicit.
- Each session script includes timing, facilitator prompts, participant actions, and fallback notes.
- The pilot checklist explains how to classify feedback as launch blocker, pilot caveat, later polish, or second-wave idea.
