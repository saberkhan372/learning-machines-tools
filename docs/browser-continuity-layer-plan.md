---
layout: page
title: Browser Continuity Layer Plan
---

# Browser Continuity Layer Plan

Status: **in progress / Codex-owned / V1 foundation started**
Date: 2026-06-17

Implementation note, 2026-06-17: V1 foundation work has started. The repo now
has `assets/lm-state.js`, a dedicated `pages/notebook.html`, universal
injection through `assets/field-theme.js`, Notebook links in the participant
materials surfaces, and a Start Here resume panel. Existing worksheet/tool
localStorage keys are read into the Notebook without forcing a risky migration
of every worksheet script in the first pass.

Artifact note, 2026-06-17: `LMState.saveArtifact()`, `listArtifacts()`,
`deleteArtifact()`, and `clearArtifacts()` now exist. Blobs are stored in
IndexedDB while artifact metadata stays in the versioned `lm:v1:*` export. This
lets Claude-owned capture buttons flow into the Notebook without putting image
bytes in `localStorage`.

This plan defines the storage-facing continuity layer for Learning Machines:
local saved work, a Field Notebook, freeform notes, route resume, visited /
saved / bring-back-later state, export/import, and clear controls.

It deliberately avoids the adjacent Browser Power work that Claude Code will
implement. Claude's scope is share links, PWA/offline shell, local media import,
capture-to-notebook, Wake Lock, and Fullscreen. That work should consume the
`window.LMState` API defined here instead of creating a competing storage layer.

## Goal

The camp spans multiple Saturdays, async gaps, drop-in/drop-out attendance, and
many tools. The browser should help participants carry their work across that
arc without accounts, servers, or sync.

The continuity layer should answer:

- Where was I?
- What did I save?
- What do I want to return to?
- What can I export for the showcase or my own planning?
- How do I clear this browser on a shared device?

It should **not** turn the site into a completion tracker. `start-here.html`
promises that participants can wander across routes. The continuity layer must
support that wandering rather than imply a checklist obligation.

## Ownership Boundary

### Codex owns in this plan

- `assets/lm-state.js`
- `pages/notebook.html`
- Field Notebook aggregation
- Freeform per-page notes
- Route resume
- `visited`, `saved`, and `bring-back-later` state
- Markdown / JSON export
- Import with version gate and merge / replace choice
- Page-scoped clear and "clear everything on this device"
- Drawer or small notebook affordance, with suppression rules

### Claude Code owns elsewhere

- Share-link helper and hash-state tooling
- PWA manifest, service worker, and offline caching
- Local media import
- Capture-to-notebook from canvas / media tools
- Wake Lock
- Fullscreen / projection polish

Claude-owned features may write artifacts through `window.LMState` after this
plan lands. They should not introduce a second store, second notebook, or
parallel export system.

## LMState API

Create `assets/lm-state.js` and expose `window.LMState`.

V1 uses synchronous `localStorage` for small text state and IndexedDB only for
captured artifact blobs. Do **not** move theme keys (`lm-tone`, `lm-type`,
`lm-ink`, `lm-identity`) behind an async API; `field-theme.js` needs those
values before first paint. Keep image bytes out of `localStorage`.

Recommended key shape:

```text
lm:v1:<scope>:<key>
```

Recommended API:

```js
window.LMState = {
  version: 1,
  available: true,
  get(scope, key, fallback),
  set(scope, key, value),
  remove(scope, key),
  list(scope),
  clearScope(scope),
  clearAll(),
  markPage(url, flags),
  getPage(url),
  saveNote(url, text),
  exportAll(),
  previewImport(payload),
  importAll(payload, options)
};
```

`options` for `importAll()` must include an explicit mode:

- `merge`: keep existing local work and add imported work, with imported values
  winning only when the same scoped key is present.
- `replace`: clear existing `lm:v1:*` continuity data first, then import. This
  path must require a confirmation before clobbering existing work.

If storage is unavailable or throws, `LMState.available` should become `false`
and pages should keep functioning. The UI may show a small warning, but tools
must not require storage to operate.

## Field Notebook

Create `pages/notebook.html` as the single participant-owned continuity surface.
This is not a parallel freeform notebook. It is the umbrella over existing work:

- Worksheet saved data
- Tool saved state where a tool opts in
- Freeform notes attached to pages
- `visited`, `saved`, and `bring-back-later` state
- Claude-captured artifacts stored as IndexedDB blobs with `lm:v1:*` metadata

The Notebook should group work by session / route where possible, but avoid
counts, percentages, completion badges, streaks, or "done" language. Preferred
copy:

- "Where you left off"
- "Things you saved"
- "Bring back later"
- "Notes in this browser"

Avoid:

- "Completed"
- "Progress"
- "3 of 8 done"
- Percentages or checklist scoring

The existing worksheets remain the structured work surfaces. The Notebook reads
from them and exports them; it should not duplicate their full UI.

## Page Affordance

After the full Notebook page exists, add a small shared affordance for notes and
save-state actions. It can be injected through `field-theme.js`, but it must be
quiet and suppress itself in contexts where clean chrome matters.

Suppress the drawer / affordance when:

- `document.documentElement` has `data-projection="on"`
- The page is printing (`@media print`)
- The document is in fullscreen
- The page is inside an iframe or obvious embed context
- The page opts out with a `data-no-notebook` attribute

The dedicated `pages/notebook.html` remains available even when the drawer is
suppressed elsewhere.

## Privacy And Shared Devices

Local-first means private from the network, not private from everyone who can
use the same browser profile. The UI must say this plainly:

> Notes and saved work live in this browser, on this device. Nothing is uploaded
> or synced. If this is a shared computer, clear your work before you leave.

Required controls:

- Clear this page
- Clear this route or scope, where useful
- Clear everything on this device
- Export before clearing

Any destructive clear action must confirm first.

## Import / Export

Export should produce:

- Markdown for participant-readable notes and showcase prep
- JSON for backup / restore

Do not implement ZIP in Codex v1.

JSON export should include:

- Export schema version
- Export timestamp
- Source site title
- Stored scopes and keys
- Page flags
- Notes

Import must:

- Reject unsupported future versions with a readable message
- Preview what will be imported
- Ask for `merge` or `replace`
- Confirm before replace clears existing local data
- Avoid importing unknown non-`lm:v1:*` browser data

## Implementation Sequence

1. Build `assets/lm-state.js` with safe synchronous localStorage wrappers,
   versioned keys, page flags, notes, export/import, and clear APIs.
2. Add `pages/notebook.html` with grouped local work, Markdown export, JSON
   export, JSON import, and clear controls.
3. Add a small notebook affordance through `field-theme.js`, with suppression
   rules.
4. Connect worksheets to the Notebook by reading their existing saved JSON and
   `data-key` fields. Preserve current worksheet behavior.
5. Migrate selected tool state into `LMState` only where it improves continuity.
   Preserve old keys during migration so existing saved work is not lost.
6. Add route resume to `pages/start-here.html` and optionally the homepage:
   last visited page, saved pages, and bring-back-later items.

## Test Plan

- Fill data in a worksheet, reload, and confirm the Notebook shows it without
  duplicating the worksheet interface.
- Save a page note, mark a page saved, and mark another bring-back-later; reload
  and confirm all three persist.
- Export JSON, open a clean profile, import it, and confirm notes / flags /
  worksheet data return.
- Test both import modes: merge and replace. Replace must warn before
  clobbering existing work.
- Confirm "clear this page" affects only the current page.
- Confirm "clear everything on this device" removes all `lm:v1:*` continuity
  data and leaves theme / identity preferences alone.
- Simulate blocked storage or localStorage exceptions and confirm pages still
  load and tools still work.
- Confirm the notebook affordance is hidden in projection mode, print,
  fullscreen, iframe/embed contexts, and pages with `data-no-notebook`.
- Verify keyboard access and visible focus states for notes, export, import,
  save, bring-back-later, and clear controls.
- Verify no new network calls are required for continuity.

## Acceptance

- Participants have one local Notebook surface for saved work and notes.
- Existing worksheets remain the structured writing surfaces.
- The site tracks `visited`, `saved`, and `bring-back-later`; it does not claim
  completion.
- Export/import round trips work with version checks and clobber protection.
- Shared-device privacy is explicit and actionable.
- Claude-owned browser features can consume `window.LMState` without rebuilding
  storage.
