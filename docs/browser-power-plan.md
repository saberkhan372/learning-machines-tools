---
layout: page
title: Browser Power Layer
---

# Browser Power Layer

Status: **in progress** · last reviewed 2026-06-17

Capabilities that orbit the participant notebook — shareable setups, offline
reliability, local media, capture, and live-session ergonomics. This is a **layer on
top of** the Continuity Layer (the storage + notebook that holds a participant's work),
not a replacement for it.

The thesis everything serves:

> Give each participant an account-free portfolio of their own work.

The storage and notebook that *are* that portfolio are built separately (see
[Division of work](#division-of-work)). This document covers the browser powers that the
notebook can use, while honouring the same constraints as the rest of the kit: no
accounts, no backend, no build step, Notion-embeddable, no-AI / low-AI pathways, and
"data stays on your machine."

## Why

The site already uses the browser lightly — theme persistence, per-worksheet autosave,
and a one-off URL-hash importer in the Evidence Wall. The modern browser can do far more
without a server: reproduce a tool setup from a link, run offline on flaky workshop
wifi, take in a participant's own media locally, and keep a projected screen awake. Used
carefully, these make the kit more reliable in live sessions and let participants carry
artifacts into the optional showcase — all client-side, all optional.

## Baseline (verified in-repo)

- **URL-hash state already exists but is not generalized.** Evidence Wall serializes to
  `location.hash` (`tools/evidence-wall/index.html`), and the
  [Shared Contract](SHARED-CONTRACT.html) explicitly approves URL-hash state
  ("Sharing the URL reproduces the view. Good for async / time-zone gaps").
- **Local media import already exists in one place but is not reusable.**
  `frame-by-frame-coherence-viewer` does multi-image upload via `createObjectURL`.
- **Theme keys** (`lm-tone` / `lm-type` / `lm-ink` / identity) run on the **pre-paint
  critical path** in `field-theme.js` and must stay direct synchronous `localStorage`
  reads — never routed through a shared store, never into IndexedDB.
- **No PWA / service worker, no Wake Lock, no Fullscreen API** in use today.

## Division of work

The **Continuity Layer** (separate plan) builds and owns the storage and notebook:

- `assets/lm-state.js` / `LMState` — versioned (`lm:v1:*`) localStorage helper,
  `get` / `set` / `remove`, `exportAll` / `importAll`, graceful no-storage fallback, and
  an **artifact-adapter API** (tools register what they contribute; the notebook does not
  scrape uneven schemas).
- The Field Notebook page, per-page / tool / session notes, route progress + "resume,"
  and the export / import + page-scoped "clear" controls.

**This plan consumes that API and does not re-implement it.** Coordination points:

- **Capture-to-notebook** (Tier 3) writes through `LMState`'s artifact API. It depends on
  the Continuity Layer landing first and **degrades gracefully if absent**.
- **Share-links** (Tier 1) **never** carry private notes into a URL hash (Shared Contract
  privacy rule) — they encode only public tool *configuration*.
- Naming defers to the Continuity Layer; this plan introduces no competing store.

## Tier 1 — Shareable state links

Generalize the existing one-off hash pattern into a reusable helper so a facilitator can
paste one link in Zoom chat and everyone lands on the identical setup.

- `assets/lm-state-url.js` (`window.LMUrl`): `read()` / `write(obj)` serializing a small
  *config* object to `#s=<encoded>` and rehydrating on load. Encoding matches the
  established Evidence Wall pattern (`btoa(encodeURIComponent(JSON.stringify(x)))`, silent
  fail on malformed input). Hash, not query, keeps it static-host-safe.
- Opt-in for **2–3 high-value synchronous-teaching tools**:
  `tokenizer-temperature-visualizer`, `cfg-scale-visualizer`,
  `metronome-frame-scrubber` — each gains a `getState` / `applyState` pair and a
  "Copy share link" button. They already persist similar state, so `getState` mostly
  reuses what exists.
- Evidence Wall's existing `importHash` / `exportHash` stay as-is.

## Tier 2 — Offline-first PWA shell

Make the kit installable and usable on flaky Zoom-day wifi.

- `manifest.webmanifest` (repo root): name, icons from existing favicon assets,
  baseurl-scoped `start_url` / `scope`, `display: standalone`, theme color from
  `field.css`. Referenced from `_layouts/page.html`.
- `sw.js` (repo root → served at `/learning-machines-tools/sw.js`, scope = baseurl):
  - **Tiny precache only**: app shell, core CSS / JS, homepage, Start Here, session
    pages, Tier-1 tools.
  - **Runtime-cache** heavy media / packs on first use; never precache the whole repo
    (22 mp4 + 329 png exist).
  - **Explicitly exclude** the live Wikipedia Truth Sieves
    (`network-grounded-truth-sieve`, `relational-co-occurrence-sieve`) from any offline
    claim — network-first, no stale fallback.
  - Versioned cache name + old-cache cleanup on `activate`.
- Registered from `field-theme.js` (single injection point already on ~97 pages),
  **guarded** to `https:` / `localhost` only (not `file:`), behind
  `'serviceWorker' in navigator`, and **never a requirement for any core tool**.

## Tier 3 — Local media + live-session ergonomics

- **Reusable local-media import**: extract the `frame-by-frame-coherence-viewer`
  `createObjectURL` pattern into `assets/lm-media.js` and reuse it in
  `default-test-comparison-viewer` and `feature-extraction-pixel-resolution`. Processed
  entirely client-side, never uploaded, with explicit on-screen copy saying so.
- **Capture-to-notebook**: "Save this frame/state" via `canvas.toBlob()` / `<video>`
  frame grab → `LMState` artifact API. Wire into `diffusion-step-through-viewer`,
  `latent-space-explorer`, `metronome-frame-scrubber`. (Image blobs are the trigger to
  revisit IndexedDB — a Continuity Layer decision, not this plan's.)
- **Wake Lock + Fullscreen** in `assets/projection.js` (+ `projection.css`): keep the
  screen awake during projected segments and a one-click fullscreen toggle.
  **Progressive enhancement only** — feature-detect, degrade silently; Safari / iOS
  behavior is uneven.

## Guardrails

- Do **not** touch theme / identity keys or route them through any store (pre-paint
  path).
- SW guarded to `https:` / `localhost`, never `file:`, never required for core function.
- **No ZIP export** in this pass — notebook export (MD + JSON) is the Continuity Layer's;
  `CompressionStream` ZIP is deferred / optional.
- Media import is **extracting an existing pattern**, not net-new.
- Wake Lock / Fullscreen are progressive enhancements.
- Precache stays tiny; heavy media is runtime-cached; never cache the whole repo.
- Share-links encode public config only — never private notes.

## Rollout

Camp runway is ~3–4 weeks (as of 2026-06-17), so order by smallest safe win first:

1. Committed planning doc (this file).
2. **Tier 1** — share-links (small, independent, high teaching value).
3. **Tier 2** — PWA / offline shell (reliability; independent of the storage layer).
4. **Tier 3** — media import, capture-to-notebook, Wake Lock, Fullscreen (capture waits
   on the Continuity Layer).

## Verification

- **Share-links**: set a tool's state, copy the link, open in a fresh / incognito tab →
  config rehydrates identically; no private note data appears in the hash.
- **PWA / offline**: load once online, go Offline → shell + Tier-1 tools + Start Here /
  session pages still load; Truth Sieves are *not* claimed offline; old caches purge on
  version bump; core tools still work with the SW unregistered; nothing registers on
  `file:`.
- **Media import**: drag a local image into a media tool → it renders with **no network
  request**.
- **Capture**: with the Continuity Layer present, a captured frame appears as a notebook
  artifact via `LMState`; with it absent, the button degrades gracefully.
- **Wake Lock / Fullscreen**: feature-detected; no console error where unsupported.
- **Responsive** at 360 / 768 / 1280; keyboard access for share / copy, import, capture,
  fullscreen controls.
- **Regression**: theme / identity persistence unaffected; Evidence Wall hash import
  still works; live sieves still work online.
