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
- Open the No-AI pathway from the homepage and from each session callout.
- Open the Vocabulary Field Guide and confirm each glossary tool connection resolves.
- Open every worksheet and project doc link.
- Use each tool's "Back to tools" link.
- Open the Session Link Sheet (`pages/session-links.html`), confirm every link resolves, and confirm each "Copy links" button copies a paste-ready block with absolute URLs.
- Confirm tool cards carry no status badge ("ready" is the baseline; only non-ready statuses such as "in development" render a badge).
- Confirm the Pilot Ready path links to the pilot checklist, feedback template, and three session scripts.
- Confirm Markdown pages render as styled HTML on GitHub Pages. When browsing locally without Jekyll, confirm the corresponding `.md` source opens instead.
- Confirm homepage credits name classroom origins without exposing private student work and link to the consent protocol.

## Tool QA

- Tokenizer + Temperature Visualizer: run self-tests, try token examples, step next token, run auto, reset, switch greedy/sample.
- ELIZA Simulator: run self-tests, click example prompts, inspect matched rule, review comparison examples.
- Next-Token Prediction Game: run self-tests, then paste a chat block saved from a real Zoom call (header + indented-message format); confirm guesses tally without timestamp fragments and the room's distribution renders beside the model top-k.
- Count the Next Token: pick a context word, watch the bigram table build, and follow the count → divide → predict arithmetic to a generated word.
- Evidence Wall: paste a saved real-Zoom chat block; confirm tiles attribute to participant names (not "14" or "Anonymous"), the consent banner is visible, and the URL-hash export reproduces the wall.
- Confidence Is Not Truth Explorer: rate confidence and correctness on several claims, reveal evidence, and confirm the gap between the two is made visible.
- Access Tiers: compare the same task across paid, free, and unplugged tiers; edit the exclusion panel and print it.
- Diffusion Step-Through Viewer: confirm self-tests pass, switch sequences, move slider from 0 to final, read prompt, annotation, facilitator, and reflection cards.
- Feature Extraction / Pixel Resolution: switch image types, change detail level, switch Pixels/Edges/Features.
- Default Test Comparison Viewer: switch vague prompts, compare A/B/C rows, review defaults, changes, and ethical questions, then copy or print a claim.
- Prompt Guidance Word-by-Word: step through each prompt word, confirm the simulated image and change list update, and copy prediction notes.
- CFG Scale Visualizer: switch prompt families, move CFG through 1/7/14/30 presets, confirm prompt match, model habit, and artifact pressure meters update, then copy notes.
- Latent Space Explorer: switch datasets and lenses, select map points, confirm nearest neighbors update, and copy visibility/risk notes.
- Dataset Balance Simulator: switch scenarios, move sliders, use balance/skew presets, confirm the default and likelihood bars update, and copy notes.
- Temporal Telephone: confirm self-tests pass, draw frames, save, switch previous/anchor/both modes, play sequence, use the failure bridge, clear and reset.
- Video Failure Gallery Viewer: switch clips, scrub frames, click failure labels, and copy the claim/evidence/classroom-question set.
- Frame-by-Frame Coherence Viewer: scrub sample frames, toggle onion-skin and difference highlight, upload a small still-frame set, and copy drift notes.
- A/B/C Comparison Board: load a starter template, edit fields, copy Markdown, export JSON, and reset only after export.
- Model Card Builder: load a starter template, edit fields, copy Markdown, export JSON, and confirm self-tests pass.
- Classroom Activity Builder: change grade band, subject, concept, pathway, tool, no-AI option, evidence artifact, and reflection question; confirm the printable skeleton updates and copy Markdown works.
- Concept Bridges: open the index and all six full bridge pages (Prediction Is Not Understanding, What Does the Machine See, Confidence Is Not Truth, Default Is a Design Decision, Time Makes Failure Visible, Current Is Not Known); confirm links, tabs/widgets, frame viewer, and bridge cards fit at desktop and mobile widths.

## Responsive QA

- Test desktop width.
- Test tablet width.
- Test narrow mobile width.
- Confirm text does not overlap controls.
- Confirm canvas tools remain usable or clearly stacked.

## Projection QA

- Confirm the `Project` button appears on the homepage, one session page, one interactive tool, one facilitation doc, one prompt pack, one worksheet, and one poster/design page.
- Confirm `?project=1` opens directly in projection mode and changes the button to `Exit projection`.
- Confirm Escape exits projection mode and removes `project=1` from the URL.
- Test projection mode at 1280x720, 1440x900, and 1920x1080; confirm the essential classroom content is visible and there is no horizontal overflow.
- Spot-check a narrow mobile width to confirm the exit control remains visible.
- Confirm worksheet projection hides page controls but preserves the paper worksheet structure; then confirm Print / Save as PDF still uses the original print layout.

## Visual Identity QA

- Confirm riskier identity changes follow the [Riskier Identity Page Audit](riskier-identity-audit.html).
- Confirm prompt packs are visually centered at desktop, tablet, and narrow mobile widths.
- Confirm lower sections on campaign-facing pages carry visible color, shape, or motif accents without reducing readability.
- Confirm motion is disabled or replaced with a complete static state under `prefers-reduced-motion`.
- Confirm no glitch treatment appears on body text, navigation, or long instructional copy.

## Worksheet QA

- For each of the five worksheets: fill a field, reload the page, and confirm the entry was restored from localStorage.
- Use Copy as Markdown and confirm the pasted block includes filled fields, checkbox states, and the evidence footer.
- Use Print / Save as PDF and confirm controls are hidden in the print layout.

## Offline QA

- Confirm no launch tool requires an account, API key, npm install, build step, or live model.
- Confirm launch tools load no external scripts and need no external images. Google Fonts is the one allowed external request; confirm tools remain fully usable when `fonts.googleapis.com` is blocked (system-ui fallback).

## Facilitation QA

- Each session has a tool sequence.
- Each session has a worksheet.
- Each session has low-AI/no-AI options.
- Consent and public attribution questions are explicit.
- Each session script includes timing, facilitator prompts, participant actions, and fallback notes.
- The pilot checklist explains how to classify feedback as launch blocker, pilot caveat, later polish, or second-wave idea.
