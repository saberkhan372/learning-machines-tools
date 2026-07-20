---
layout: page
title: "Session 3 Feedback Form"
---

# Session 3 Feedback: How Machines Move

This is the source-of-truth question set for the Session 3 Google Form and eventual site-native feedback page. Every question is optional. Do not collect email addresses or require sign-in. Responses are facilitator-only and are never quoted publicly without permission.

The runnable Google Apps Script is [make-session-3-feedback-form.gs](make-session-3-feedback-form.gs). After it creates the form, use the logged prefilled URL to map the generated `entry.N` ids into `pages/session-3-feedback.html`.

## About you

- Name or display name — short answer; optional / anonymous by default
- How did you attend? — live, recording, or some of each
- How did you participate today? — checkboxes: spoke, chat, drew / used tools, private writing / poll, watched / listened

## The session

- Which parts made something click? — checkboxes; includes synthesis, point correspondence, Temporal Telephone, failure hunt, system map, studio, guest, Q&A, and “nothing yet”
- Five-row clarity grid:
  - Tracking existing frames is different from generating new ones
  - Coherence depends on relationships staying consistent across time
  - A visible failure supports an observation but does not prove its cause
  - Smooth video is not evidence that an event happened
  - Provenance documents a chain but does not itself establish consent
- What does a video model have to keep coherent across time? — paragraph
- Complete the sentence: “Smooth video is not evidence because…” — paragraph
- What is still fuzzy or worth testing next? — paragraph

## Activities and tools

- Which tools or routes did you use? — checkboxes, so participants are not forced into one answer
- Could you compare saved Run A and Run B sequences in Temporal Telephone? — single operational check
- What did you finish? — checkboxes: exact-break observation, bounded claim, missing provenance evidence, classroom adaptation, A / B comparison, or watch / listen route
- Any tool friction? — paragraph with tool / device prompt

## Guest spotlight

- What idea or question from Dr. Emily Thomforde’s talk stayed with you? — paragraph

## Format, access, and consent

- Pace — single choice
- Could you participate in the way you wanted? — single choice
- Anything facilitators should know about? — paragraph

## Optional Studio / Showcase

- Which follow-up would you actually use? — single choice: downloadable classroom pack, recording + notes, live studio, short office hour, or none / not sure
- Would you present something at an August Studio / Showcase? — yes / maybe / attend only / no
- What might you bring or develop? — paragraph
- What would help you participate? — checkboxes, not a single-answer commitment

## Anything else

- What should we keep?
- What should we change?
- Would you recommend Learning Machines?
- Anything else?

## Wiring status

- [x] Question set written
- [x] Google Apps Script builder written
- [ ] Form created in the facilitator’s Google account
- [ ] Prefilled URL returned and `entry.N` ids mapped
- [ ] `pages/session-3-feedback.html` created and browser-tested
- [ ] Feedback link added to `pages/session-video.html`
