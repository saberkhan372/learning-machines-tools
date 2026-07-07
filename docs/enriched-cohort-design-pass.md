---
layout: page
title: Enriched-Cohort Design Pass
---

# Enriched-Cohort Design Pass

**Status:** planning · created 2026-06-23 · refreshed 2026-07-07

**Source & privacy:** refreshed against the final n=80 interest-form responses
and reconciled with the private per-applicant enrichment pass. **This document is
intentionally name-free.** Individual names, emails, institutions, and profile
notes live only in the private working file kept outside the repo. Refer to that
file for specifics; never copy names, institutions, or profile claims onto the
site or into committed docs unless the person has opted in.

## Framing

The enriched applicant data is evidence for a **second design pass, not a
tool-building sprint**. The shift: the site should stop sounding like it mainly
helps beginners enter, and start sounding like it convenes a serious mixed room —
educators, artists, technologists, researchers, policy/governance people,
nonprofit/school implementers, and cautious critics. Beginners still belong; they
should not set the altitude.

The axis the data revealed (and the site does not yet address): **participant vs.
contributor/adopter.** Everyone enters as a participant; *some* should also see a
path to adopt, collaborate, or amplify. Not a binary, not a fifth Start Here route
— an additive band.

Positioning promise (serious first, accessible second):

> Learning Machines is a browser-based camp for investigating how generative AI
> actually works — serious enough for educators, artists, and researchers to bring
> real questions, accessible enough that beginners can enter and skeptics can opt
> out of direct use.

The site does **not** need more core tools. It needs a sharper invitation.

## Final-cohort update (2026-07-07)

The n=80 closeout changes the weight, not the mission:

- **Mechanics is no longer a niche read.** The form appears to have added the
  under-the-hood option around June 12: 0% of early respondents selected it,
  while **51%** of late respondents did once they saw it. Surface the mechanics
  tools where peers first look; do not bury them as a secondary lane.
- **Critical inquiry rises.** **42%** arrive with reservations and the full-cohort
  "excited" share fell to **35%**, so critical/no-AI copy should read as serious
  inquiry, not accommodation.
- **Governance and audio both gained concrete private-profile evidence.** Keep
  the site aggregate and name-free, but stop treating those as purely hypothetical
  office-hour topics.

## Done (this pass)

- Interest-form analysis (n=80 final cohort); per-applicant enrichment (2 web
  waves, reconciled with the final closeout).
- Completed the private prep file: confirmed institutions propagated, source URLs
  added (`web_sources`), one district inference flagged for confirmation.
- `.gitignore` applicant-PII safety net.
- License decision: **CC BY 4.0** (content) + **MIT** (code).
- License foundation: `LICENSE`, `LICENSE-CONTENT.md`, `CITATION.cff`, README
  "License, Citation & Reuse" section.
- "Session 4" → "Optional Showcase" cleanup (3 files renamed, 17 updated, no stale
  refs).

## Blocked on decision

- [ ] Confirm license placeholders — copyright holder and repo URL — across the 4
  license files.
- [ ] Branch (off `main`) + commit the 3 change-sets separately: `.gitignore` PII
  net · license foundation · showcase cleanup.
- [ ] Confirm one respondent's district inference (`scusd.net` / Santa Clara) in
  the private CSV — fetch timed out; currently location-inferred with a confirm flag.

## Site design pass

1. **Reposition the front door.** Replace beginner-first language with the
   positioning promise in `index.html`, `docs/program-copy.md`,
   `docs/project-brief.md`. Add a brief "what this is / is not" altitude line so a
   researcher can tell in ten seconds it isn't a prompt-engineering webinar. Keep
   the "three core sessions + optional studio" shape consistent. *(No "01 of 04" /
   "Session 1 of 4" cleanup needed — verified absent.)*
2. **Critical / No-AI as serious inquiry, not accommodation.** Rewrite the No-AI
   pathway copy and the Critical/Cautious Start Here route so they read as a
   first-class critical-inquiry strand (labor, consent, authorship, refusal), not a
   fallback for the wary. *(Evidence: 42% arrive with reservations; "excited"
   fell to 35%; several applicants hold developed critical positions — see private
   CSV.)*
3. **Mechanics visibility, not hidden secondary lane.** Name tokenizer,
   diffusion step-through, CFG scale, latent-space explorer, and latent-space
   compressor where participants first look — the mechanics route card and/or a
   homepage row. Keep this as surfacing of existing tools, not a fifth Start Here
   route and not a new tool build. *(Evidence: 51% of late respondents selected
   mechanics once the option was visible.)*
4. **Aggregate "who's in the room" note** near Start Here or `pages/camp-2026.html`:
   K–12 and university educators · artists/designers · technologists/creative coders
   · policy/legal/governance people · nonprofit/school implementers · cautious/no-AI
   participants. **Roles only — no names or institutions unless consented.**
5. **Contributor/adopter lane.** A **band below the four Start Here routes** (not a
   fifth route) → a new "Bring this to your school or organization" page or
   Materials section. It answers: how to cite/fork/reuse the tools · what works
   without accounts or student logins · what runs offline / from static files · how
   to adapt for PD, a class, or a school-policy conversation · where teachers,
   admins, and facilitators each start. Links to README, `LICENSE-CONTENT.md`,
   Classroom Activity Builder, AI Access, No-AI Pathway, Consent Protocol.
6. **Creative-ethics strand (its own beat — do not fold into governance).**
   `pages/session-images.html`: after the Default Test, add creative-credit /
   visual-labor / consent prompts. `pages/session-video.html`: a "synthetic
   likeness, motion, authorship" checkpoint. Optional Studio Make-pathway: name
   "what the human did / what the model did / what should be credited." *(Evidence:
   working artists, an animator, and a choreographer in the cohort — see private CSV.)*
7. **Governance as an Optional Studio artifact (no "Session 4").** Add explicit
   examples — school AI-use policy, consent protocol, access audit, governance memo,
   classroom-tool model card — wired through `pages/session-showcase.html`,
   `pages/docs-showcase-facilitation.html`, Access Tiers, Model Card Builder, and the
   AI Use + Consent Checklist. *(Evidence: a policy/legal/governance cluster plus
   at least one concrete private-profile match — keep names private.)*
8. **Expand the Vocabulary Field Guide** (`pages/vocabulary-field-guide.html`):
   add red-teaming, embedding, attention, context window, model card (cross-link to
   Model Card Builder), training data / dataset, evaluation / evals. Confirm
   embedding/attention aren't already present — expand, don't duplicate. Keep the
   tone: shared language for a serious mixed room, not remedial definitions.
9. **Audio/music pointer section** in `pages/hands-on.html` ("Sound, music & live
   visuals"): sound classification, gesture-to-sound mappings, audio-reactive
   creative tools, and "training on your own music" as a rights-sensitive advanced
   question. No new tool — a pointer layer. *(Evidence: a small musicians /
   live-visuals cluster plus at least one concrete private-profile match — keep
   names private.)*

## Docs hygiene

- [ ] **`docs/advanced-concept-extensions.md`** — refresh the stale mechanics
  figures (14% / 8-of-58 / "2 of 48" and the interim 18-of-74 read) to the final
  n=80 wave finding: **51% of late respondents selected mechanics once the option
  was visible**. Keep advanced concepts as a poll-driven backlog, but do not
  describe mechanics as niche.
- [ ] **`docs/participant-support-plan.md`** — add the enriched-cohort lens
  (participant→adopter axis, n=80 numbers) so there's one coherent plan.

## Program moves (track separately — NOT site promises, NOT named on the site)

- [ ] Private guest shortlist from the enriched profiles; map each to a lane
  (creative coding / interactive media · artist labor & tooling · governance /
  privacy / school policy · audio, music & live visuals). Governance and audio now
  each have concrete private-profile evidence. Names stay in the private CSV only.
- [ ] Optional office hour for audio / local models / governance.
- [ ] Peer lightning talks — only with explicit consent.
- [ ] Post-Session-1 poll to pick advanced-mechanics topics.

## Implementation order

License placeholders + commits → 1 (positioning) → 2 (critical inquiry) →
3 (mechanics surfacing) → 4 (who's-in-the-room) → 5 (adopter band + page) →
6 (creative ethics) → 7 (governance artifacts) → 8 (glossary) →
9 (audio pointer) → program planning.

## Mechanics signal (for reference)

Under-the-hood mechanics should no longer be described as niche. The final n=80
split shows **0% early / 51% late**, likely because the mechanics option was
added around June 12. The honest read is: when people saw the option, about half
chose it. Site implication: make the existing mechanics tools visible in Start
Here and on the homepage/tool index, but do not create a fifth route or a new
pre-camp tool sprint.
