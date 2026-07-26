---
layout: page
title: "Session 3 Feedback Form"
---

# Session 3 Feedback: How Machines Move

This is the source-of-truth question set for the Session 3 Google Form and site-native feedback page. It was revised after the session to match what actually happened rather than the planned run-of-show.

Every question is optional. Do not collect email addresses or require sign-in. Responses are facilitator-only and are not quoted or attributed publicly without separate permission.

The runnable Google Apps Script is [make-session-3-feedback-form.gs](make-session-3-feedback-form.gs). Run `updateExistingSession3FeedbackForm()` from the existing form's Apps Script project. The updater:

- preserves the existing participant URL and response destination;
- makes a timestamped copy of the form;
- exports any existing responses to a private backup spreadsheet;
- replaces the planned-session questions with the delivered-session set below;
- logs a new prefilled URL for remapping `entry.N` fields in `pages/session-3-feedback.html`.

## About you

- Name or display name — short answer; optional / anonymous by default
- How did you attend or participate? — checkboxes covering live / recording, speaking, chat, drawing, sharing, private work, and watching / listening

## What happened in Session 3

- Which parts made something click or gave you a useful question? — checkboxes grounded in the delivered session: assignment reviews, Session 2 feedback, synthesis, Coherence Animator, animation sharing, timing/keyframes/layers, tools tour, guest, Q&A, and “nothing yet”
- Five-row clarity grid:
  - Coherence concerns relationships staying consistent across time
  - A stable reference may help but does not guarantee consistency
  - Coherence Animator is a teaching analogy, not a literal architecture
  - Animation concepts can guide observation without proving model internals
  - Smooth video is not evidence that an event happened
- What did Coherence Animator or the animation discussion help you notice, and what is still fuzzy? — paragraph

## Guest spotlight

- What idea or question from Dr. Emily Thomforde's “Axiology of Mystery” talk stayed with you? — paragraph

## Format and access

- Could you participate in the way you wanted? — single choice that distinguishes pace, tool/access friction, and a valid watch/listen route
- Anything facilitators should know about? — paragraph covering tool friction, access, recording, likeness, consent, or other participation conditions

## What comes next

- Which follow-up would you actually use? — single choice: downloadable classroom pack, recording + recap, live Studio, short office hour, or none / not sure
- Would you join an August Studio / Showcase? — present / maybe / attend only / no
- Which Saturday works better? — August 8, August 15, either, neither, or not attending
- What might you bring, develop, or need in order to participate? — paragraph

## Last word

- What should we keep, change, or carry into the next version?
- Would you recommend Learning Machines?

## Wiring status

- [x] Delivered-session question set written
- [x] Google Apps Script create/update workflow written
- [x] Existing Google Form and site-native page exist
- [x] Run `updateExistingSession3FeedbackForm()` in the existing form project
- [x] Return the logged prefilled URL and remap `entry.N` ids
- [x] Update `pages/session-3-feedback.html`
- [ ] Re-run browser interaction QA when the browser task's URL scope permits it
- [x] Feedback link added to `pages/session-video.html`
