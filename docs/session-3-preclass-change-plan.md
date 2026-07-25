---
layout: page
title: "Session 3 Pre-Class Change Plan"
---

# Session 3 Pre-Class Change Plan

**Session:** Saturday July 25, 2026 · 9–11 am PT. **This is a scoped change list, not the whole
readiness gate** — Section 1 below is the actual go/no-go. Line numbers reflect the working tree
*after* the edits in Section 2 were applied.

---

## Section 1 — Readiness gate (do these first; class does not run without them)

The operational blockers live in [`docs/session-3-revision-plan.md`](session-3-revision-plan.md)
under **"Human confirmation or external setup still required"** and **"Ready-to-run gate."**
Surfaced here so this page is not mistaken for a complete checklist:

- [ ] **Guest confirmed** — Dr. Emily Thomforde: focus, 18-min talk / 8-min Q&A, name
  pronunciation, private 3-minute signal, and recording boundary.
- [ ] **Two participant opt-ins** — both shares voluntary and pre-arranged, **at least one
  classroom-facing**, and each person knows how their item will be labeled. *(See permission
  deadline + fallback in Section 3, item 1.)*
- [ ] **Source-checked failure clip** — one short, captioned/audio-independent clip, provenance
  checked, openable in one click; paper / facilitator-drawing fallback ready.
- [ ] **Paste-ready links** — all participant-facing links (tools + worksheet) in one prepared
  Zoom-chat message.
- [ ] **Recording / likeness boundary** — stated at 0–5 and honored in the guest segment.
- [ ] **Minute-88 hard stop** — cue set so the guest starts at minute 90.

If any share is unconfirmed, the guide's fallback applies: replace with two prepared recap
artifacts; do not cold-call ([facilitation.md:135](session-3-facilitation.md)).

---

## Section 2 — Change checklist (file edits: DONE / live moves: pending)

**File edits — applied and verified in the working tree (deck reloads with zero console errors):**

- [x] **2 — Inclusive phrasing.** "you have been the machine three times" → "Across the camp,
  we've played the machine three ways" at deck 254, deck 426, and
  [facilitation.md:12](session-3-facilitation.md:12).
- [x] **3 — Temporal Telephone demo + roles** (deck telephone notes ~306; run-of-show
  [facilitation.md:51](session-3-facilitation.md:51); protocol preamble under
  *Temporal Telephone protocol*). **Now uses the operational definition** — see item 4.
- [x] **4 — System map "from chat" → "from the room"** (deck system-map notes ~342).
- [x] **5 — Production path added to the system map**, as a **trace** (deck ~342;
  [facilitation.md:53](session-3-facilitation.md:53)) — see item 2 below for the wording.
- [x] **Inclusive sweep extended** past the three exact phrases to the semantic equivalents:
  deck 260 ("Across three sessions, you performed…" → "Across the camp, we performed…") and
  deck 261 ("The room earned the argument through the first two activities" → "The earlier
  sessions earned this argument"). Deck 283 ("the trilogy is how *we* earned…") was reviewed
  and left as-is: it is collective voice, not an individual-attendance claim.

**Live moves — yours to deliver (scripts in Section 3):**

- [ ] **1** — two artifact shares, with explicit permission + bounded claims
- [ ] **7** — one spoken slogan clarification
- [ ] **8** — one or two carried questions in synthesis
- [ ] **9** — cut-priority order

**Do NOT change:** the four verification questions
([facilitation.md:100](session-3-facilitation.md:100)); the on-screen "smooth ≠ evidence"
wording (it recurs in ~8 places — clarify by voice only).

---

## Section 3 — Live delivery scripts and corrected language

### 1. Two artifact shares — with permission, deadline, and fallback

The guide already calls for two pre-arranged shares including one classroom-facing
([facilitation.md:24](session-3-facilitation.md:24)). **No student artifact, name, or wording
goes up without explicit permission** ([facilitation.md:145](session-3-facilitation.md:145)).

**Permission deadline + fallback:** if the educator author of the fake-news lesson cannot be
identified and give use-permission **by 30 minutes before start (8:30 am PT)**, substitute a
**facilitator-written recap** of the access-tiers idea — do not show or quote the artifact.
Same rule for the frog if its author does not opt in.

**Share A — frog (Session 2 mechanism share):**
- *Claim:* "unsettling" shifted color, texture, proportions, and expression; the graphic style
  and center placement **stayed stubborn.**
- *Boundary (model disciplined uncertainty — do not assert "it was SVG"):* "It looks
  vector/code-generated rather than a photo — but without the file or a generation trace, we
  don't know how it was produced, and one pair can't establish a persistent default.
  **What evidence would we need to identify how it was actually made?**"
- *Bridge to video:* "If this frog moved through 60 frames, what would have to stay stable?"

**Share B — access-and-equity lesson (classroom-facing):**
- *Claim:* the same task can create different participation conditions across paid / free /
  no-generative-AI tiers.
- *Boundary:* paid access is not automatically more reliable, and **"no generative AI" is more
  precise than "no AI"** (a typical search engine still uses AI).

### 2. Production path — trace, not a flat list *(applied)*

The earlier "generator, tracker, editor, code-output, platform, or unknown" list was wrong on
two counts: those layers are not mutually exclusive, and listing **tracker** beside
**generator** blurs the session's central tracking-vs-generation distinction (a tracker
analyzes frames that exist; it does not *produce* a clip). Replaced with a **trace**:

> What tool or workflow produced this clip? Name any known stages —
> **source/reference → generator or code-rendering system → editor/interpolator/compositor →
> platform** — and mark unknown stages.

### 4. Temporal Telephone — operational definition *(applied)*

The block is **23 minutes (24–47)**, so the demo must be tight. Not "one full pass" (which
ends in a compare and eats time) — a **60-second interface demonstration using prepared
frames**, then three roles with concrete jobs:

- **Drawer** — adds and locks a frame.
- **Feature Tracker** — follows one named relation.
- **Evidence Recorder** — records the first exact change and its frame number.

Roles are legitimate upfront choices so drawing is never required.

### 7. Slogan clarification — spoken once

Leave "smooth ≠ evidence" on screen. Say aloud once (natural spot: deck ~332):

> "Smoothness is not proof that the depicted event happened. The output can still provide
> evidence about how a particular system behaved."

### 8. Carried questions — bounded, folded into synthesis (deck ~274)

Answer one or two here; move the rest to the failure-hunt handoff or guest Q&A.

- *Image vs. video:* **"Video is not adequately explained as independent image generation
  repeated. Workflows vary, but they must preserve relationships across time."**
- *Lighting:* the system isn't consciously deciding how to light a scene; lighting emerges from
  learned correlations, prompt conditioning, reference media, and workflow controls.
- *"Token burn":* don't reduce video cost to text tokens — compute varies with duration,
  resolution, architecture, workflow, and hardware.

### 9. Cut-priority order, if time slips

**Protect, in order:** guest start (minute 90) → Temporal Telephone comparison → one completed
participant claim → closing callback. **Compress first:** the second failure example, then the
system map ([facilitation.md:138](session-3-facilitation.md:138)).

---

## Deliberately left out

- **A "Mechanism / Default / Evidence" recurring device** — the production-path trace (item 2)
  plus the frog boundary carry the "how was this made?" question without a new device.
- **Any new tool, activity, or mechanism lecture** — keep the frozen default lane and
  one-bounded-claim-before-a-second-tool exactly as designed
  ([facilitation.md:54](session-3-facilitation.md:54)).
