---
layout: page
title: Launch Readiness Plan — Tool Tiers & July Sessions
---

# Launch Readiness Plan — Tool Tiers & July Sessions

Status: **plan / not yet implemented**
Date: 2026-06-13
Camp: three core Saturdays — **July 11 (Text) · July 18 (Images) · July 25 (Video)** +
optional studio showcase · 9–11 am PT · free & virtual.

The site is **over-tooled** for a live session: 25 launch tools against a
~90-minute run-of-show that also carries a guest speaker and a participant
share. This plan splits the catalog into a **Tier 1 session spine** (demoed
live, in order) and a **Tier 2 explore/studio** layer, and lists everything
else needed to be session-ready next month.

It is modeled on how CC Fest Coding Camp sessions actually run (Spring 2026),
adapted for ML investigation activities rather than p5.js coding instruction.

## What a CC Fest session actually contains

From the Spring 2026 cohort (the operational template):

- **Two-hour Zoom**, but the tool time is a slice: a session also holds a
  **guest speaker (~20–30 min)**, a **returning-participant share (~8 min)**,
  intros, and live making time. The ML run-of-show is **~90 minutes** inside
  that window.
- **Each session featured only 2–4 purpose-built tools.** The rest were a
  browsable library.
- **Tools were built mid-cohort** in response to "magic moments," not all
  pre-loaded.
- **Three-tier assignments**: Foundation / Exploration / Classroom Adaptation —
  "same conversation, different depth."
- **A guest every session**, an **async catch-up prompt**, **recordings by
  Sunday**, a **community channel**, and **optional office hours**.
- **Sessions 3–5 were shaped by a participant poll after Session 1.**

The implication: feature a small spine live; keep the rest as library and
studio; let a Session-1 poll drive any deeper builds.

---

## Part A — The two-tier tool system — ✅ IMPLEMENTED 2026-06-13

All five mechanisms shipped and verified in preview: `tier: "essential"` on the
12 spine tools in `tools-data.js`; session pages split into "Featured this
session" + "Go deeper"; a "★ Session essentials" catalog filter with a
"Featured" stamp; the homepage preview now shows essentials only
(`data-tool-tier="essential"`); and the link sheet leads each session with its
essentials in paste order. The detail below is the as-built spec.

### Selection rule for Tier 1
One tool per *concept moment* in the run-of-show, favoring the tool that
(a) pairs with an unplugged activity, (b) teaches the most per click, and
(c) **never depends on a live network**. The two Truth Sieves call live
Wikipedia, so they are Tier 2 (studio / Investigate) — never the live spine.

### Session 1 · Text (Jul 11) — prediction → temperature → fluency ≠ understanding
| Tier 1 (demo live) | Why | Tier 2 (explore / studio) |
|---|---|---|
| Tokenizer + Temperature Visualizer | Core tool — tokens, prediction, temperature in one | Next-Token Prediction Game |
| Count the Next Token | "It's just division" — math-accessible unplugged→tool bridge | Confidence Is Not Truth |
| ELIZA Simulator | Visible rules vs. opaque LLM — discussion/history hook | Truth Sieves (Investigate) · Concept Bridges |

### Session 2 · Images (Jul 18) — most over-tooled (8 → 3 live)
| Tier 1 | Why | Tier 2 |
|---|---|---|
| Feature Extraction / Pixel Resolution | Opener: an image is numbers; recognition returns cue by cue | Prompt Guidance Word-by-Word |
| Diffusion Step-Through Viewer | The headline "how image generation works" | CFG Scale Visualizer |
| Default Test Comparison Viewer | The ethics/bias headline (#1 interest; "draw a doctor") | Latent Space Explorer · Latent Space Compressor (VAE) · Dataset Balance Simulator |

### Session 3 · Video (Jul 25)
| Tier 1 | Why | Tier 2 |
|---|---|---|
| Temporal Telephone | Signature unplugged→tool (telephone game = drift) | Frame-by-Frame Coherence Viewer |
| Video Failure Gallery Viewer | Label failure modes → evidence-based claim | Metronome Frame-Scrubber (advanced temporal attention) |

### Studio / cross-session (showcase)
- **Tier 1 (make artifacts):** Model Card Builder · Classroom Activity Builder ·
  Evidence Wall · A/B/C Comparison Board
- **Tier 2 (Investigate):** Access Tiers · Confidence Is Not Truth · both Truth
  Sieves · Concept Bridges

Total Tier 1: ~3 / 3 / 2 / 4 — within the CC Fest "2–4 featured" budget, with
the advanced and network-dependent tools pushed to Tier 2.

### How to implement the tiers on the site
1. **Add `tier: "essential"` to the spine tools in `assets/tools-data.js`**
   (all others default to `"explore"`). One field drives everything below.
2. **Session pages (`§ B Tools for this session`)** → split the `ix-row` list
   into **"Featured this session"** (numbered, full weight) and a quieter
   **"Go deeper"** group. Biggest single de-overwhelming move.
3. **Catalog (`pages/tools.html`)** → a "Featured" stamp on essentials and a
   **"Session essentials"** filter chip beside the modality filters.
4. **Homepage preview** → change the 6-row preview from "first 6" to
   "essentials only," so newcomers meet the spine, not the firehose.
5. **`pages/session-links.html`** → lead each session with its 2–3 essentials in
   **paste order** (what goes in Zoom chat live); deeper tools below a rule.

---

## Part B — Everything else to be session-ready

### P0 — must land before July 11
| Item | Why | Status |
|---|---|---|
| Ship the tiering (Part A) | Directly fixes over-tooling | ✅ done |
| Map Tier-1 tools to each `§ C Run of show` | CC Fest named "the session tool" and where it lands | ✅ done — run-of-shows now name the featured tools; S1 brings in Count the Next Token, S3 names the Video Failure Gallery |
| QA the Tier-1 tools only — projection view, mobile, reduced-motion, zero console errors | They get screen-shared live and cannot break | ✅ done — all 12 essentials load at 375px with no uncaught errors; full visual projection pass still worth a manual look |
| Register CTA + Jul 4 interest-form deadline prominent on the homepage hero | Public visitors need the action, not "Run a session" | ✅ done — hero primary is now "Register — it's free" → ccfest.rocks/ccfest-camp; deadline in the eyebrow |

### P1 — strongly improves the live session
| Item | Why | Effort |
|---|---|---|
| Confirm + surface a guest speaker per session (`guest-speaker-showcase-plan.md`) | Every p5 session had a guest (~⅓ of the time) | content + a "Guest" block per session page |
| One async catch-up prompt per session ("try one small thing, share it") | CC Fest's async glue; ~10 of 48 have schedule conflicts | ~2 hrs |
| Community channel link (Slack/Discord) on the site | CC Fest kept one live; "cohort connection" was a recurring interest-form ask | infra + a link |
| Session-1 interest poll ("which under-the-hood topic next?") | p5 shaped sessions 3–5 by a post-S1 poll; drives the advanced-tool backlog | ~1 hr |
| Three-tier quick assignment per session (Foundation / Exploration / Classroom Adaptation) | Proven CC Fest framing; maps to #1 interest (classroom activities, 31/48) | content per session |

### P2 — polish / further de-overwhelming
| Item | Why | Effort |
|---|---|---|
| Language pass (mono-caps budget, ledes ≤25 words) | Audit overwhelm findings; faster scanning | ~half-day |
| Full pilot dry-run of one session | `pilot-checklist.md` exists; surfaces timing/tool issues | 90 min |
| Truth Sieves live-network safety note in studio framing | The only network-dependent tools; keep off the live spine | ~30 min |

---

## Part C — Suggested sequence

1. **Tiering (P0 #1–2)** — add the `tier` field, split session-page tool lists,
   mark the catalog, reorder the link sheet. Highest-leverage, mostly mechanical.
2. **QA the 8 Tier-1 tools** for projection + mobile.
3. **P1 content** (guest blocks, async prompts, poll) — lighter, and partly
   gated on decisions below.

## Decisions only the organizer can make
- **Exact Tier-1 picks.** The sets above are defensible defaults; adjust per
  cohort knowledge. Individual picks are vetoable without changing the system.
- **Guest / community / poll infrastructure.** Booking guests, Discord vs.
  Slack, and the poll form are off-site decisions the site only needs to link.

## Acceptance — "session-ready"
- Every session page shows ≤3 featured tools, in run-of-show order, with the
  rest under "Go deeper."
- The catalog and homepage no longer present 25 undifferentiated tools.
- The 8 Tier-1 tools pass projection + mobile QA with no console errors.
- A guest, an async prompt, and a community link exist for each session.
- The register action and interest-form deadline are unmissable on the homepage.
