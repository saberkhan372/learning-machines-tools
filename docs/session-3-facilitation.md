---
layout: page
title: "Session 3 Pilot Script: Video"
---

# Session 3 Pilot Script: Video

Use this script for a 60-90 minute pilot focused on temporal coherence, drift, anchoring, and why video generation is harder than generating a single image.

Core question: what changes when generation has to work across time?

Conceptual sequence: **frame → keypoints/features → correspondence across frames → coherence or drift**.

## Materials

- Temporal Telephone
- Video Test Report
- Optional: A/B/C Comparison Board for coherence tests
- AI Use + Consent Checklist
- Optional: curated video clips or still-frame sequences showing drift and failure modes
- Optional reference: [CoTracker](https://github.com/facebookresearch/co-tracker) for point correspondence across existing frames

## Run of Show

| Time | Segment | Facilitator Move | Participant Action |
| --- | --- | --- | --- |
| 0-5 min | Welcome and bridge | PoseNet can locate an elbow in one frame; CoTracker asks where that point went in later frames. Contrast that analysis task with a generator creating later frames that remain coherent. | Choose a participation pathway. |
| 5-35 min | Temporal Telephone round 1 | Open Temporal Telephone in previous-frame-only mode. Use "a person at work" as the vague prompt, then check motion defaults after playback: job, body, setting, tool, pace, gesture. | Draw/save frames or observe where defaults and small changes accumulate into drift. |
| 35-50 min | Temporal Telephone round 2 | Switch to anchor mode and repeat with the same basic subject or motion. | Compare whether identity, layout, and motion stay more stable. |
| 50-70 min | Failure analysis | Use curated clips, still frames, or optional generated video examples. Name failure modes precisely. | Mark identity drift, physics breaks, camera inconsistency, style drift, or temporal jumps. |
| 70-90 min | Video Test Report | Ask participants to complete one A/B/C or failure-analysis section. | Share one coherence claim and one responsible-use boundary. |

Optional pilot evidence move: use the A/B/C Comparison Board to document a hypothesis, one changed variable, a baseline motion prompt, one continuity anchor, and a stronger anchor or stress test. Keep real-person likeness and consent concerns visible before exporting. Debrief shares collected in chat can also be pasted into the Evidence Wall to put the round's observations on one screen (the consent banner applies before anything is shown or exported).

For credit, attribution, likeness, and recap decisions, use the existing [AI Use + Consent Checklist](../worksheets/ai-use-consent-checklist/) rather than creating a new worksheet.

## Facilitator Prompts

- "Where did the sequence first begin to drift?"
- "PoseNet found an elbow in frame 1. What evidence would support calling a point in frame 2 the same elbow?"
- "For the vague prompt 'a person at work,' what job, body, setting, tool, pace, or gesture appeared by default?"
- "What stayed consistent when only the previous frame was visible?"
- "What did the anchor preserve?"
- "What does video require that a single image does not?"
- "Which failure type is easiest to spot frame by frame?"
- "What would you need to specify to keep identity, motion, and setting stable?"
- "What did the human do? What did the model do?"
- "What should be credited, and to whom?"
- "Whose work, data, or labor is hidden in this output?"

## Investigation Prompt

Compare a baseline motion prompt with one revision that adds an anchor: a consistent subject, fixed camera, repeated setting, or explicit continuity constraint. What improves, and what still breaks?

## Low-AI / No-AI Pathway

Participants can complete the session using Temporal Telephone and curated clips only. No one needs to generate video to investigate temporal coherence.

## Fallback Plan

- If drawing with the tool is awkward, have one facilitator draw while participants direct changes verbally.
- If playback is too fast or hard to see, step through thumbnails manually.
- If no curated clips are available, use Temporal Telephone outputs as the failure gallery.
- If participants do not want to analyze AI video, focus on continuity, consent, and classroom-safe critique protocols.

## Pilot QA Notes

During the pilot, note:

- Whether participants understood previous-frame-only versus anchor mode.
- Whether the Save frame and Play controls were discoverable.
- Whether thumbnails were large enough for discussion.
- Which failure categories participants used naturally.
- Any ethical concerns around generating motion, simulating people, or using real likenesses.
