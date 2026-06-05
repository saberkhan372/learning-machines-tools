# Integration Queue

> **Maintained by Agent B.** After completing any task, append a section here.
> **Consumed by Agent A** during the final integration pass (AGENTS.md §7).
>
> Agent B never edits `index.html`, `README.md`, or `tools/README.md` directly.
> Report here; Agent A wires it.

---

## Template (copy for each new entry)

```
## <Tool or Page Name>

- **Path:** <relative path from repo root, e.g. tools/evidence-wall/index.html>
- **Session:** <1 | 2 | 3 | 4 | cross>
- **Modality:** <text | image | video | cross>
- **tools-data.js entry:**
  { name: "...", session: "...", modality: "...", status: "ready", statusLabel: "Launch ready",
    blurb: "...", tags: ["...", "..."], href: "tools/<slug>/", collab: false }
- **Session page link:** add to pages/session-X.html — <section> <exact anchor text>
- **index.html note:** <any special wiring, or "standard tool-grid — tools-data.js handles it">
- **README note:** <what to add / reclassify, or "none">
```

---

<!-- Agent B: append your entries below this line -->

## Text Prompt Pack

- **Path:** packs/text/index.html
- **Session:** 1
- **Modality:** text
- **tools-data.js entry:** none - static pack page, not a tool-grid card unless Agent A wants pack cards in a later pass
- **Session page link:** add to pages/session-text.html - materials section - `Text Prompt Pack`
- **index.html note:** optional pack link from Session 1 arc or supporting materials
- **README note:** add under session packs/materials

## Image Prompt Pack

- **Path:** packs/images/index.html
- **Session:** 2
- **Modality:** image
- **tools-data.js entry:** none - static pack page, not a tool-grid card unless Agent A wants pack cards in a later pass
- **Session page link:** add to pages/session-images.html - materials section - `Image Prompt Pack`
- **index.html note:** optional pack link from Session 2 arc or supporting materials
- **README note:** add under session packs/materials

## Video Prompt Pack

- **Path:** packs/video/index.html
- **Session:** 3
- **Modality:** video
- **tools-data.js entry:** none - static pack page, not a tool-grid card unless Agent A wants pack cards in a later pass
- **Session page link:** add to pages/session-video.html - materials section - `Video Prompt Pack`
- **index.html note:** optional pack link from Session 3 arc or supporting materials
- **README note:** add under session packs/materials

## Access Tiers

- **Path:** tools/access-tiers/index.html
- **Session:** cross
- **Modality:** cross
- **tools-data.js entry:**
  { name: "Access Tiers", session: "cross", modality: "cross", status: "ready", statusLabel: "Launch ready",
    blurb: "Compare the same classroom AI task across paid, free, and unplugged/local access tiers.",
    tags: ["Access", "Equity", "Classroom"], href: "tools/access-tiers/", collab: false }
- **Session page link:** add to pages/session-showcase.html - tools or pathway materials - `Access Tiers`
- **index.html note:** standard tool-grid - tools-data.js handles it
- **README note:** add under cross-session tools

## Pre-session Check-in

- **Path:** docs/pre-session-checkin.html
- **Session:** cross
- **Modality:** cross
- **tools-data.js entry:** none - static docs page, not a tool-grid card
- **Session page link:** none - add from index.html docs/worksheets strip or facilitator materials
- **index.html note:** add `Pre-session Check-in` link to the docs/worksheets strip
- **README note:** add under facilitator/pre-session materials
