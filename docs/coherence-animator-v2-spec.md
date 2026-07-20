# Coherence Animator — Development Specification

**Working title:** Coherence Animator — Draw it. Move it. Inspect it.<br>
**Target:** August Studio / post-cohort development<br>
**Status:** Phase 1 development build implemented; not published or wired into Session 3<br>
**Path:** `tools/coherence-animator/index.html`

## Decision

Build Coherence Animator as a new, isolated tool. Do not turn the current
Temporal Telephone file into this application or replace that activity before
the July 25 session.

Temporal Telephone remains the stable, embodied group activity. Coherence
Animator becomes the deeper animation-and-evidence environment: participants
draw two related sequences, compare them, inspect one relationship across time,
and export a carefully bounded claim.

The new tool may reuse visual language and interaction lessons from Temporal
Telephone, but it should have its own file, state model, tests, and development
cycle. The existing 1,200+ line tool should not become the foundation for a
second set of tightly coupled subsystems.

## Current build checkpoint — July 19, 2026

The first usable slice now implements Phases 1–4:

- one human-drawn opening frame duplicated byte-for-byte into both runs;
- Run A with the previous locked frame as its only drawing reference;
- Run B with the opening anchor and previous locked frame as references;
- exactly five locked frames enforced in each run;
- nine participant drawings represented in ten run-frame records because the
  byte-identical shared opening occupies Frame 1 of both runs;
- locked-frame previews without losing either timeline;
- one-step recovery that reopens only the most recently locked drawing;
- drawing undo, clear, reset confirmation, and unfinished-draft preservation
  through resize;
- one global playback speed; and
- the paced guided comparison sequence: Run A twice, then Run B twice, with a
  visible replay cue and an explicit pause before the run changes.

The build remains deliberately unlinked. Phases 5–7—manual feature paths,
difference inspection, bounded claims, provenance and consent records, and
exports—remain gated on a focused Zoom pilot of the animation core.

## Product statement

> Draw two short animations from the same opening frame. Change the reference
> condition, inspect what stays coherent, and make a claim that says both what
> the comparison shows and what it cannot prove.

The tool should feel like a small animation studio first and an evidence
worksheet second. Drawing and playback create the energy; inspection and claim
building turn that experience into transferable media literacy.

## Main ideas

Coherence Animator should make these ideas experiential:

1. Animation requires relationships to persist across time.
2. A stable reference can help without guaranteeing consistency.
3. Tracking completed frames is different from generating new frames.
4. Smooth playback can conceal frame-level inconsistencies.
5. A visible failure supports an observation but does not automatically explain
   its cause.
6. The participant's decisions shape every frame and must remain visible in the
   exported artifact.
7. Provenance can document how an animation was made; it does not by itself
   establish consent or truth.
8. A strong investigation ends with a bounded claim, a next test, and a
   responsible-use boundary.

## Required framing

The tool is a human-drawing comparison, not a simulator of a universal video
model architecture.

Place this statement near the comparison and in the exported artifact:

> This activity changes which visual references a human animator can see. Real
> video systems use varied combinations of temporal context, reference
> conditioning, spatiotemporal processing, masks, cross-attention controls, and
> editing workflows. This comparison does not reveal one universal architecture.

Feature-path language must be equally explicit:

> You are manually annotating correspondence in completed drawings. The browser
> displays the path you marked; it does not discover, track, or generate motion.

Avoid these claims:

- “Drift is the model forgetting.”
- “Every frame is generated from only the previous frame.”
- “Generated motion is interpolation, not physics.”
- “The feature path shows what the model tracked.”
- “A visible glitch proves that a clip is synthetic.”

## Core participant flow

### Phase 1 — Draw the shared opening frame

Start from a deliberately underspecified prompt such as **“a person at work.”**

The participant draws one opening frame. That exact frame becomes:

- Frame 1 of Run A;
- Frame 1 of Run B;
- the fixed visual reference used in the comparison;
- the source for the feature that will later be annotated.

The opening frame must be duplicated as data, not recreated by the participant.
The participant therefore draws nine times total. The tool stores ten run-frame
records because the shared opening belongs to both five-frame runs, while the
branching timeline can display that shared image once at the branch point.

### Phase 2 — Animate Run A

Reference condition: **previous frame only**.

- The participant sees a faint onion skin of the previous frame.
- The shared opening anchor is not visible after Frame 2.
- The participant draws four additional frames.
- Run A ends with exactly five locked frames.

### Phase 3 — Animate Run B

Reference condition: **shared opening anchor + previous frame**.

- Run B begins with the already-locked shared Frame 1.
- The participant draws four additional frames.
- Both reference ghosts remain available while drawing.
- Run B ends with exactly five locked frames.

The first release should enforce equal frame counts. The comparison should not
depend on facilitator discipline.

### Phase 4 — Compare playback

The participant chooses one feature from the shared opening frame before any
comparison playback: hand, face, tool, doorway, text, background edge, or an
open category.

Default comparison protocol:

1. Play Run A twice.
2. Play Run B twice at the same frames-per-second value.
3. Toggle A → B → A.
4. Record one observation before opening inspection tools.

The guided player should visibly cue the second viewing of each run and pause
before switching from A to B. The pacing is part of the observation protocol,
not decorative playback polish.

Synchronized side-by-side playback is a later enhancement. Sequential playback
is the required first implementation because it focuses attention and is easier
to make reliable and accessible.

### Phase 5 — Inspect one relationship

Inspection mode operates on completed frames and never alters drawings.

Required controls:

- frame-by-frame scrubber;
- previous-frame onion skin;
- shared-anchor overlay;
- A/B toggle;
- slow playback;
- manual feature point on each frame;
- feature path drawn through the participant's points;
- exact first-break marker;
- failure labels: identity, object shape, position, text, camera, background,
  style, motion continuity, physics, or other.

The feature path should show both runs with distinguishable, accessible styles.
Do not automatically score the participant's drawing or label a frame as wrong.

### Phase 6 — Build a bounded claim

The claim builder should prefill factual fields from the tool while leaving
interpretation to the participant.

Required sentence frame:

> In Run ___, ___ first changed at frame ___. The fixed reference did / did not
> preserve ___. This comparison suggests ___, but it cannot prove ___ about a
> real video model. My next test would be ___. I would / would not use this
> output for ___ because ___.

The tool may prefill:

- active run;
- chosen feature;
- first-break frame;
- reference condition;
- selected failure label.

It must not generate the explanation automatically. “Suggests,” “cannot prove,”
“next test,” and the responsible-use boundary remain participant-authored.

### Phase 7 — Export the artifact

Minimum exports:

- Run A animated GIF;
- Run B animated GIF;
- A/B comparison sheet as PNG;
- frame strip with feature annotations as PNG;
- claim and provenance card as Markdown;
- complete investigation bundle as a single Markdown copy action.

Side-by-side GIF or video export is optional after the individual exports are
stable.

## Provenance card

Every export should carry a compact creation record:

### Human work

- drew the shared opening frame;
- drew every subsequent frame;
- chose the motion and what to preserve;
- selected and annotated the feature;
- identified the first break;
- wrote the interpretation and responsible-use boundary.

### Browser work

- stored the frame sequences locally in memory;
- displayed the permitted reference ghosts;
- assembled drawings into playback and exports;
- connected participant-marked points into a visible path;
- formatted the claim and provenance record.

### System statement

- No generative model was used for the core drawing or animation.
- No participant drawing is uploaded by the core tool.
- No frame is used for model training.
- The selected reference condition is recorded.
- Sharing permission is a separate participant decision.

### Consent fields

- Does the drawing depict or reference a real person?
- Did that person consent to the proposed use?
- May this artifact be shown in the Studio?
- May it appear in a public recap?
- Preferred name or anonymous attribution.

The card must state: provenance documents the creation chain; it does not itself
establish consent, accuracy, or truth.

## Interface model

Use four stable regions rather than separate pages for every small action.

### 1. Animation canvas

- largest element on screen;
- brush, color, size, eraser, clear-current-frame;
- visible current run and frame number;
- reference ghosts with explicit labels and opacity controls;
- no global reset adjacent to frame-lock controls.

### 2. Branching timeline

- shared Frame 1 displayed once at the branch point;
- Run A and Run B shown as parallel rows;
- five required frame slots in each run;
- locked, active, incomplete, and annotated states;
- keyboard-operable thumbnails;
- no deletion without a confirmation and recoverable undo when practical.

### 3. Playback and inspection bar

- Run A, Run B, and toggle controls;
- shared FPS control;
- play, pause, previous, next;
- onion skin and anchor overlay toggles;
- feature-annotation mode;
- first-break marker;
- optional difference view after the base workflow is stable.

### 4. Evidence notebook

- visually quiet during drawing;
- opens after the first comparison observation;
- stores feature, break frame, label, observation, explanation, limitation, next
  test, responsible-use boundary, provenance, and consent choices;
- shows what was filled automatically versus written by the participant.

## Technical architecture

### Delivery constraints

- Static HTML, CSS, and JavaScript.
- No backend.
- No Firebase, websocket, or account requirement.
- No network request for core function.
- All teaching-critical data inline.
- Works from GitHub Pages and a local static server.
- Core drawing remains functional offline after the page loads.

### Recommended file structure

Start with a small module boundary even if the first release remains dependency
free:

```text
tools/coherence-animator/
  index.html
  coherence-animator.css
  coherence-animator.js
  export.js
  README.md
```

If project conventions require a single HTML file at launch, keep clearly
separated internal modules and extract them before adding GIF export or feature
annotation. Do not allow the new file to grow into another unstructured
1,000-line script.

### State model

Suggested shape:

```js
const state = {
  phase: "draw-anchor",
  activeRun: "a",
  activeFrame: 0,
  fps: 6,
  prompt: "A person at work",
  sharedAnchor: null,
  runs: {
    a: { referenceMode: "previous", frames: [] },
    b: { referenceMode: "anchor-and-previous", frames: [] }
  },
  feature: {
    label: "",
    points: { a: [], b: [] },
    firstBreak: { run: null, frame: null },
    failureMode: ""
  },
  claim: {
    observation: "",
    interpretation: "",
    limitation: "",
    nextTest: "",
    useBoundary: ""
  },
  provenance: {
    realPersonReference: "unspecified",
    consentForUse: "unspecified",
    studioShare: "unspecified",
    publicRecap: "unspecified",
    attribution: ""
  }
};
```

Store frame drawings as canvas data URLs or image blobs initially. Measure
memory use on mobile before choosing twelve-frame or higher limits. The core
five-frame-per-run protocol should remain the default even if a later free-play
mode allows more frames.

### Drawing and resize behavior

- Use Pointer Events with pointer capture.
- Preserve unfinished drawing across responsive resize.
- Run exactly one render loop.
- Keep the drawing buffer separate from ghost and playback compositing.
- Block empty frame locking.
- Do not mutate a locked frame from inspection mode.
- Provide explicit recovery after an accidental clear or run switch.

### Feature annotation

- A point is participant-authored for every completed frame.
- Store coordinates normalized from 0 to 1 so paths survive resize.
- Allow missing points; display a broken path rather than inventing a location.
- Never label the path “model tracking.”
- Provide keyboard placement or a non-pointer coordinate alternative.

### Difference view

Difference view is a second-stage feature. It should compare completed frame
pixels and clearly label itself as a visual overlay, not a semantic judgment.

Possible implementation:

1. draw two adjacent frames into hidden canvases;
2. compare RGBA values;
3. display changed pixels with adjustable opacity;
4. keep the original frames available for context;
5. explain that pixel difference can highlight change but cannot decide whether
   the change is intentional, coherent, or meaningful.

### GIF export

GIF export is not part of the first functional milestone.

Before choosing a library:

- check whether an existing project dependency can be reused offline;
- verify licensing and bundled size;
- ensure export does not require a CDN;
- provide PNG frame-strip and Markdown exports as reliable fallbacks;
- test Safari, Chrome, and mobile memory behavior.

## Accessibility requirements

- All drawing tools, frame thumbnails, run controls, playback controls, and
  notebook fields are keyboard reachable.
- Visible focus states use shared Field tokens.
- Canvas has a descriptive accessible name and a non-canvas summary.
- Color is never the only distinction between Run A and Run B.
- Feature paths use line style, label, and color.
- Playback supports pause, manual stepping, and reduced-motion preference.
- No required interaction depends on a countdown.
- Instructions are readable at 200% zoom.
- Touch targets are at least 44×44 CSS pixels where practical.
- Exported comparison images contain meaningful text labels.

## Privacy and data handling

- Drawings remain in browser memory unless the participant explicitly exports.
- Do not store drawings in analytics, localStorage, or a remote service by
  default.
- Analytics may record only page-level use, never canvas content, text fields,
  prompts, names, or consent responses.
- Clearing or refreshing should warn when unsaved drawings would be lost.
- Public sharing is never the default export behavior.

## Development phases

### Phase 0 — Observe Session 3

- Watch how participants understand Run A and Run B.
- Record whether equal frame counts remain manageable.
- Note the features participants naturally track.
- Capture confusion around anchor, previous frame, drift, and mechanism claims.
- Do not copy participant drawings or quotes into development materials without
  the required permission.

### Phase 1 — Reliable animation core

- shared opening frame;
- enforced five-frame A/B timelines;
- previous-only and anchor-plus-previous drawing conditions;
- frame locking and recovery;
- one-step reopening of the last locked drawing without rewriting earlier
  timeline history;
- sequential playback at shared FPS;
- run toggling;
- responsive drawing and one render loop;
- automated state and interaction tests.

**Gate:** the full draw → lock → switch → return → playback → resize flow passes
on desktop and mobile without state loss or console errors.

### Phase 2 — Inspection

- choose one feature before playback;
- annotate the feature in every frame;
- display normalized feature paths;
- mark the first break;
- apply one failure label;
- onion-skin and anchor inspection toggles;
- participant-written first observation.

**Gate:** the tool never describes participant annotations as automated
tracking, and missing annotations remain visibly missing.

### Phase 3 — Evidence and provenance

- bounded claim builder;
- human / browser / system provenance card;
- consent and sharing fields;
- Markdown copy output;
- PNG comparison and annotated frame-strip exports.

**Gate:** every copied or exported artifact contains the activity limitation and
separates provenance from consent and truth.

### Phase 4 — Rich export and comparison

- individual Run A and Run B GIF export;
- optional synchronized side-by-side playback;
- optional side-by-side GIF;
- pixel difference overlay;
- printable teacher handoff.

**Gate:** rich export failures never block access to frame strips, PNGs, or
Markdown evidence.

### Phase 5 — Zoom pilot and revision

- facilitator dry run;
- 3–5 participant pilot;
- mouse, trackpad, touch, keyboard, resize, refresh, and recovery testing;
- test at the exact screen-share size used in Zoom;
- revise instructions based on where attention and timing break down.

## Acceptance tests

### Functional

- [ ] A blank frame cannot be locked.
- [ ] Run A and Run B share a byte-identical opening frame.
- [ ] Each run ends with exactly five locked frames in guided mode.
- [ ] Switching A → B → A preserves all drawings and annotations.
- [ ] Playback speed is shared across runs.
- [ ] Sequential playback follows the required A-twice / B-twice protocol.
- [ ] Guided playback visibly cues repeat viewings and pauses before switching
      from Run A to Run B.
- [ ] The last locked drawing can be reopened, edited, and relocked without
      changing earlier frames.
- [ ] Resize preserves completed frames, annotations, and unfinished drawing.
- [ ] Only one render loop runs.
- [ ] Feature points remain aligned after resize.
- [ ] Missing feature points are not synthesized.
- [ ] Exported claims include observation, limitation, next test, and use
      boundary.
- [ ] Exported provenance names human work and browser work separately.

### Accuracy

- [ ] Tracking existing drawings is distinguished from generating frames.
- [ ] The tool states that it is a human comparison, not a model simulator.
- [ ] Reference anchoring is not equated with locked noise or every model's
      architecture.
- [ ] Pixel difference is not described as semantic understanding.
- [ ] Visible glitches are not presented as authentication.
- [ ] Provenance is not presented as proof of consent or truth.

### Accessibility and responsive behavior

- [ ] Zero console errors on load and through the complete workflow.
- [ ] No horizontal overflow at 360, 768, or 1280 pixels.
- [ ] All non-canvas controls are keyboard operable.
- [ ] Canvas has an accessible description and non-canvas state summary.
- [ ] Reduced-motion users can complete every step manually.
- [ ] Run identity and feature paths remain distinguishable without color.
- [ ] Export buttons report success or failure through an accessible live region.

### Offline and privacy

- [ ] No network request is required for drawing, playback, inspection, or base
      exports.
- [ ] No participant content is sent to analytics or remote storage.
- [ ] The page remains usable when external fonts fail.
- [ ] Refresh warns before discarding unsaved work.

## Risks

### Scope expansion

Side-by-side playback, difference rendering, feature annotation, GIF encoding,
provenance, consent, and claim generation are separate subsystems. They should
not ship as one untested batch.

### Mobile memory

Two canvas sequences, inspection overlays, and GIF encoding can exhaust mobile
memory. Keep the guided protocol at five frames per run and treat rich export as
progressive enhancement.

### Drawing quality mistaken for model behavior

Participants may overgeneralize from human drawing drift. Repeat the activity
boundary before inspection and in every export.

### Tracking language

The manually annotated path could be mistaken for automated feature tracking.
Label the action as “mark the feature” and the result as “your annotated path.”

### Feature overload

The notebook and inspection controls must not crowd the drawing activity. Use
progressive disclosure and keep the canvas dominant until both runs are done.

## Open decisions

- Should the default prompt remain “a person at work,” or should participants
  choose from three motion prompts?
- Should guided mode permit five total frames or six?
- Should Run B show anchor and previous frame simultaneously, or offer a
  facilitator-controlled reference choice?
- Should the participant select the tracked feature before drawing or after both
  animations are complete but before playback?
- Which GIF encoder, if any, meets the offline, licensing, size, and mobile-memory
  requirements?
- Should consent fields appear for every drawing or only when a participant says
  it references a real person?
- Should a future classroom mode allow the facilitator to export an empty
  protocol without participant drawings?

## Integration plan

Do not link the tool from Session 3 until the Zoom pilot gate passes.

After launch:

1. add the tool to `assets/tools-data.js`;
2. add it to the Session 3 “Go deeper” area rather than replacing Temporal
   Telephone immediately;
3. add it to the optional Studio page as a build-and-reflect artifact;
4. add the path to the service-worker precache only after offline export has
   been verified;
5. keep Temporal Telephone available as the simpler group activity;
6. compare participant evidence before deciding whether Coherence Animator
   should become the next cohort's centerpiece.

## Definition of done

Coherence Animator is ready when a participant can:

1. draw a shared opening frame;
2. complete equal-length Run A and Run B animations;
3. compare them at one shared speed;
4. manually annotate one feature across both sequences;
5. identify the first visible break;
6. write a bounded claim and next test;
7. export the animations, evidence, provenance, and sharing decision;
8. explain what the comparison shows and what it cannot prove about a real
   video model;
9. complete the entire workflow on desktop or mobile without lost work,
   network dependence, or console errors.
