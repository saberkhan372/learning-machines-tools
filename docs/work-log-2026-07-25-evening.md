---
layout: page
title: Work Log — July 25, 2026
---

# Work Log — July 25, 2026

> **Scope:** Session 3 work shipped earlier today, followed by the evening recap review and public-recap consent system. This is a public-safe technical record: it excludes participant contact information, response data, and the private consent-tracker URL.
>
> **Repository state at handoff:** `main` at `0144e1f`, with the recap and consent work below still uncommitted.

## Executive summary

Today moved Session 3 from a pre-class plan into a coherent post-session record.

The shipped workshop materials now center the Coherence Animator and use bounded language about what the activity can demonstrate. Tonight's work then added:

- a transcript-grounded Session 3 recap;
- the matching structured recap for the Session 3 overview;
- technical corrections to three overclaims in the recap;
- a single five-question consent process covering Sessions 1–3;
- a private per-person consent tracker created through Google Apps Script;
- a site-native consent page that submits to the new Google Form;
- consent links on all three recap pages, the Materials page, and the written protocol.

The main remaining work is one real end-to-end consent submission, final consent review of the recaps, and a clean commit/push of the pending files.

---

## 1. Session 3 materials shipped earlier today

Four commits reached `main` before the evening recap work.

### `ed1e83b` — Wire Session 3 feedback form and apply pre-class deck/guide edits

- Added the site-native Session 3 feedback page.
- Added the Google Apps Script feedback-form builder.
- Added a pre-class change plan.
- Updated the deck, facilitation source, Session 3 overview, and service-worker cache.

### `1978422` — Sync Session 3 feedback blueprint and revision-plan status

- Reconciled the feedback-form specification with the implemented form.
- Updated the Session 3 revision plan to reflect completed and remaining work.

### `0c17b81` — Clarify Session 3 facilitator language

- Added a complete Session 3 facilitator script.
- Tightened deck language about video generation and the limits of the classroom analogy.
- Bumped the offline cache.

### `0144e1f` — Center Session 3 on Coherence Animator

- Made Coherence Animator the Session 3 centerpiece across the deck, overview, assignment, facilitator guide, feedback form, and session data.
- Reworked the live arc around drawing, animation, comparison, inspection, and bounded claims.
- Updated the tool catalog, documentation, README files, and offline cache.
- Preserved Temporal Telephone as a supporting activity rather than the main route.

### Resulting Session 3 spine

The session's core argument is now:

- Fluent text is not necessarily true.
- Plausible images are not necessarily neutral.
- Smooth video is not evidence.

Coherence Animator provides the main participatory experience. Participants create two five-frame runs from a shared opening frame, compare what the changed reference condition preserves, follow one feature across time, and name what the comparison cannot prove about a real video model.

---

## 2. Session 3 recap created and reviewed tonight

### Long-form recap

Created:

- `pages/session-3-recap.html`

The page follows the Session 1–2 recap pattern and includes:

- session overview and start-here routes;
- participant and assignment-review sections;
- the Session 2 feedback bridge;
- the Coherence Animator activity;
- observations from the two drawing conditions;
- the room's animation and workflow hypotheses;
- Dr. Emily Thomforde's guest segment;
- teaching notes;
- action items;
- links and resources from the session;
- an AI-assistance and human-review colophon.

The recap deliberately distinguishes participant observations, facilitator interpretations, documented production patterns, and unresolved hypotheses.

### Structured recap

Updated:

- `assets/session-runs.js`

The Session 3 overview can now render:

- a summary;
- the investigation questions;
- six mechanism rows;
- observed patterns and next tests;
- the Human / Machine / System / Ethics frame;
- classroom translation;
- follow-up and optional-showcase information;
- a link to the full Session 3 recap.

The recording remains unset in structured data until the final Session 3 video URL is confirmed.

### Accuracy corrections

Three recap problems were reviewed and corrected in both the full recap and structured recap.

#### Run B is not "more hardware"

Run A and Run B are now described as two human drawing conditions:

- Run A exposes the previous frame.
- Run B exposes the opening anchor and previous frame.

The additional reference is not described as a measurement of model memory, context-window size, compute, or hardware.

#### Classroom observations do not establish model architecture

Keyframes, interpolation, foreground/background separation, timing, and targeted editing are framed as useful questions to compare against documented workflows. The activity does not prove that a video model represents or solves these problems as a human animator does.

#### Specialized chaining is not universal

The HMSE system description now says that some node-based production workflows connect stages such as generation, masking, and compositing. It does not present specialized-model chaining as the universal structure of video systems. Resource use is explicitly described as dependent on model, resolution, duration, and deployment.

---

## 3. Consent audit and policy decisions

The three recaps were audited for named, quoted, linked, described, or visually represented people.

The private audit identified 29 people requiring a consent decision across Sessions 1–3: 26 participants and three guests. The names and per-person recap uses are kept in the private tracker and are intentionally omitted from this public work log.

### Consent boundary adopted

The new consent form covers only the selected public written recap or recaps. It does not authorize:

- public distribution of session recordings;
- promotional or social-media use;
- unrelated future reuse;
- AI training.

No response is treated as anonymous and no-share. Participants may request a later correction or removal.

### Four consent choices

For selected recaps, a participant can choose:

1. Yes, as currently presented.
2. Yes, but anonymously.
3. Yes, with changes or conditions.
4. No; remove identifying material.

Credit preferences and corrections remain separate fields so a participant can describe the exact public presentation they want.

### Protocol integration

Updated:

- `docs/consent-recap-protocol.md`

The protocol now links directly to the single public-recap consent page. Existing boundaries for recordings, screenshots, names, AI-assisted notes, public sharing, corrections, and removal remain in force.

---

## 4. Five-question Google Form and private tracker

Created:

- `scripts/create-recap-consent-form.gs`

The Apps Script can create:

- one five-question Google Form covering all three recaps;
- one private response spreadsheet;
- one private 29-person tracker tab;
- one form-submit trigger that reconciles responses with the tracker;
- logged participant, editor, and tracker links.

### Five questions

1. Name or alias currently used in the recap.
2. Which recap or recaps the response covers.
3. Overall consent choice.
4. Preferred public credit.
5. Changes, corrections, or conditions.

### Duplicate-form guard

The script distinguishes two workflows:

- `buildRecapConsentForm()` creates a new Form and tracker in a fresh Apps Script project.
- `simplifyExistingRecapConsentForm()` only modifies a previously recorded Form in the same project.

This distinction caused two setup errors during the first attempt:

- running `buildRecapConsentForm()` in a project that still recorded an earlier Form;
- running `simplifyExistingRecapConsentForm()` in a fresh project with no recorded Form ID.

The final successful path was a fresh Apps Script project followed by `buildRecapConsentForm()`.

### External assets created

- A new participant-facing Google Form was created successfully.
- A new Form editor was created.
- A new private consent tracker spreadsheet was created.

The private tracker URL and participant roster are not stored in this repository.

---

## 5. Site-native recap consent page

Created:

- `pages/recap-consent.html`

The page follows the existing Learning Machines feedback-form pattern rather than embedding a Google iframe.

It includes:

- the same five questions as the Google Form;
- direct links to review all three recaps;
- explicit scope and no-response language;
- required-field validation;
- accessible labels and keyboard-operable native controls;
- a direct Google Form fallback;
- a success state after submission;
- `noindex` metadata because the page is meant for known participants rather than search discovery.

### Current Google Form contract

The site page is wired to the new Form's public `formResponse` endpoint with these fields:

| Question | Google field |
|---|---|
| Name or alias | `entry.351602518` |
| Selected recaps | `entry.554638492` |
| Consent choice | `entry.272875372` |
| Public credit | `entry.1654572506` |
| Changes or conditions | `entry.173239348` |

The checkbox and radio values match the live Google Form exactly.

### Site wiring

Updated:

- `pages/materials.html`
- `pages/session-1-recap.html`
- `pages/session-2-recap.html`
- `pages/session-3-recap.html`
- `docs/consent-recap-protocol.md`

Each recap now presents the same visible invitation to approve the recap, remain anonymous, request changes, or ask to be removed. The Materials directory lists the single five-question form under participant materials.

---

## 6. Verification completed

### Live Google Form

Verified against the published Form:

- correct title and description;
- exactly five questions;
- Sessions 1–3 options;
- four consent choices;
- optional credit and correction fields;
- no mandatory sign-in;
- written-recap-only scope;
- confirmation message;
- all five public field IDs.

### Site page

Verified from a local web origin:

- page and assets load successfully;
- all five fields render;
- recap-review links resolve;
- Google fallback link targets the new Form;
- local field selections map to the expected `entry.*` values;
- the endpoint targets the new Form;
- zero browser console warnings or errors;
- `git diff --check` passes.

No fake consent response was submitted during verification.

---

## 7. Current uncommitted repository scope

### Modified

- `.gitignore`
- `assets/session-runs.js`
- `docs/consent-recap-protocol.md`
- `pages/materials.html`
- `pages/session-1-recap.html`
- `pages/session-2-recap.html`

### New

- `pages/session-3-recap.html`
- `pages/recap-consent.html`
- `docs/work-log-2026-07-25-evening.md`

### Private — never committed

- `scripts/create-recap-consent-form.gs` — embeds the 29-person participant roster (`TRACKER_PEOPLE`). Kept in a private Apps Script project and excluded via `.gitignore`; must not be added to the public repo.

### Older uncommitted planning document

- `docs/learning-machines-long-term-design-update.md`

That long-term design document predates tonight's recap and consent work. It should be committed separately so the operational recap/consent change remains easy to review.

---

## 8. Recommended commit structure

### Commit 1 — Session 3 recap

Suggested message:

> `Publish Session 3 recap`

Include:

- `assets/session-runs.js`
- `pages/session-3-recap.html`

### Commit 2 — Public recap consent system

Suggested message:

> `Add public recap consent workflow`

Include:

- `docs/consent-recap-protocol.md`
- `pages/materials.html`
- `pages/session-1-recap.html`
- `pages/session-2-recap.html`
- the consent callout in `pages/session-3-recap.html`, if not kept entirely in Commit 1;
- `pages/recap-consent.html`
- `.gitignore` (adds the consent-script ignore rule)
- this work log.

The form-builder script `scripts/create-recap-consent-form.gs` is **not** committed — it embeds the private roster and is gitignored. Keep it in a private Apps Script project only.

### Commit 3 — Long-term design direction

Suggested message:

> `Document long-term Learning Machines design direction`

Include:

- `docs/learning-machines-long-term-design-update.md`

If the Session 3 recap and its consent callout make a clean split awkward, combine Commits 1–2 into one recap-and-consent commit and retain the long-term design document as a separate commit.

---

## 9. Remaining actions

1. Submit one real test response using a clearly labeled facilitator test identity.
2. Confirm that the raw Form response and the private per-person tracker both update.
3. Remove or mark the test response after verification.
4. Review every named, quoted, linked, described, or visually represented contribution against the returned consent choices.
5. Anonymize or remove material when consent has not been received.
6. Confirm the Session 3 recording URL before enabling the recording link in structured recap data.
7. Confirm optional-showcase and office-hour dates before treating them as firm promises.
8. Run final multi-width recap and consent-page QA.
9. Bump the service-worker cache with the final deployment if needed to prevent returning visitors from receiving stale recap pages.
10. Commit and push the reviewed changes.

---

## Final state

The Session 3 story and the consent process now reinforce the same principle taught throughout Learning Machines: a plausible account is not enough. Claims, attributions, links, and public representations require evidence, bounded language, human review, and permission from the people involved.
