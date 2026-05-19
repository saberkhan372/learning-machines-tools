# Launch QA Checklist

Use this before publishing or sharing the repo.

## Link QA

- Open `index.html`.
- Open every launch tool from the homepage.
- Open every worksheet and project doc link.
- Use each tool's "Back to tools" link.
- Confirm second-wave and stretch tools are labeled "Coming later."

## Tool QA

- Tokenizer + Temperature Visualizer: run self-tests, try token examples, step next token, run auto, reset, switch greedy/sample.
- ELIZA Simulator: run self-tests, click example prompts, inspect matched rule, review comparison examples.
- Diffusion Step-Through Viewer: switch sequences, move slider from 0 to final, read prompt and annotation cards.
- Feature Extraction / Pixel Resolution: switch image types, change detail level, switch Pixels/Edges/Features.
- Temporal Telephone: draw frames, save, switch previous/anchor mode, play sequence, clear and reset.

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
