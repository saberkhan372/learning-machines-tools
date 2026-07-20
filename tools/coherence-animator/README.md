# Coherence Animator

Development build for the proposed Session 3 / August Studio animation tool.

## Phase 1 implemented

- Draw one shared opening frame.
- Build Run A with the previous frame as the only visible reference.
- Build Run B with the shared opening anchor plus the previous frame.
- Enforce exactly five locked frames in each run.
- Make nine drawings total: one shared opening plus four new drawings per run; the tool stores ten run-frame records because Frame 1 appears in both runs.
- Preserve both runs while previewing and switching between them.
- Reopen only the most recently locked drawing, edit it safely, and relock it without discarding earlier work.
- Use one global playback speed for both runs.
- Run the facilitated comparison protocol with visible pauses: A twice, then B twice.
- Recover from drawing mistakes with undo and clear; warn before resetting or leaving with work in progress.
- Keep all frames in browser memory. There is no upload or generative model.

## Intentionally deferred until the core passes a Zoom pilot

- side-by-side and difference views
- manual feature points and path overlays
- bounded-claim generation
- provenance card export
- GIF export

The full staged plan and acceptance criteria live in [`../../docs/coherence-animator-v2-spec.md`](../../docs/coherence-animator-v2-spec.md).

## Local test

Serve the repository root and open:

```text
/tools/coherence-animator/
```

The page runs seven small boot-time checks. For browser automation, `window.CoherenceAnimatorTest.snapshot()` exposes only non-content state: phase, frame counts, playback state, frame equality, render-loop count, and resize count.
