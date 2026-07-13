---
layout: page
title: Session Follow-up and Publishing Workflow
---

# Session Follow-up and Publishing Workflow

Use this workflow after Session 2, Session 3, and the possible fourth-session showcase. It turns the recording, captions, transcript, chat, facilitator notes, and links into a consistent public recap, assignment, feedback form, video package, and Notion mirror.

Session 1 is the reference implementation:

- `pages/session-1-recap.html`
- `pages/session-1-assignment.html`
- `pages/session-1-feedback.html`
- `docs/consent-recap-protocol.md`

## 1. Deliverables for every session

| Deliverable | Canonical location | Purpose |
|---|---|---|
| Session overview | `pages/session-<n-or-slug>.html` | Agenda, pathways, tools, and live-session materials |
| Recap | `pages/session-<n>-recap.html` | Public, human-reviewed account of what happened |
| Assignment | `pages/session-<n>-assignment.html` | Several equally valid ways to continue |
| Feedback page | `pages/session-<n>-feedback.html` | Site-native front end for the session's Google Form |
| Recording | YouTube plus responsive embed on the recap | Async access and chapter navigation |
| Notion recap | `Learning Machines / Session <n> Recap` | Workspace mirror with links back to the canonical site |
| Notion assignment | `Learning Machines / Session <n> Assignment` | Workspace mirror for participants and facilitators |
| Response data | One Google Form per session, linked to the shared response workbook | Separate response tab per session without mixing schemas |

## 2. Source bundle and handoff

Before drafting, collect the complete source bundle in one place:

- Zoom or local recording
- caption `.vtt`
- transcript `.vtt` and/or plain-text transcript
- chat export
- facilitator notes and run-of-show
- links shared during the session
- assignment expectations announced aloud
- guest links and approved public biography, if applicable
- participant consent or display-name decisions

Record the session date, duration, public video URL, Form URL, response spreadsheet URL, and the person responsible for final review. Do not begin public copy from a partial transcript unless the missing portion is explicitly noted.

## 3. Transcript and timestamp pass

1. Compare the caption VTT, transcript VTT, and plain-text transcript.
2. Resolve obvious speaker-label and transcription errors without rewriting what people meant.
3. Build a timestamp outline of the major instructional beats, tool demonstrations, questions, guest segment, assignment, and closing.
4. Mark passages that contain participant names, personal details, quoted chat, student information, or identifiable work for the privacy pass.
5. Keep a source note for every quote or specific claim used in the recap.

The timestamp outline becomes the common source for the recap structure and YouTube chapters. The first YouTube chapter must start at `0:00`; use concise, descriptive chapter titles and keep chapters in chronological order.

## 4. Privacy and consent gate

Apply `docs/consent-recap-protocol.md` before publishing to the site, Notion, or YouTube.

- Refer to participants by first name only when naming is appropriate: `Shane`, `Angela`, `Meghan`, `Megan`, and so on. Never infer or restore a last name from Zoom, chat, email, filenames, or prior drafts.
- Prefer `a participant`, `one educator`, or another role-based description when the person did not affirmatively consent to being named.
- Do not publish email addresses, phone numbers, Zoom display-name metadata, attendance lists, private chat, school or employer details, or identifying student information.
- Do not publish a participant quote, screenshot, prompt, output, or project without explicit permission for that use.
- A publicly announced guest may be credited by their approved professional name and biography. Confirm the guest's links and the scope of permission before publishing.
- Apply the same redactions to the site, Notion, YouTube description, chapters, screenshots, and alt text.
- Add the disclosure: *This summary was drafted with AI assistance and reviewed by a human facilitator.*

Run a final repository search for every participant last name and other sensitive string discovered during the source review. A clean search is required before release.

## 5. Build the recap

Use `pages/session-1-recap.html` as the structural reference while matching the session's modality.

The recap should include:

1. A short lede stating the session's core question and approach.
2. A responsive 16:9 YouTube embed using `https://www.youtube-nocookie.com/embed/<video-id>` plus a plain recording link.
3. The session arc in chronological order, grounded in the transcript.
4. Major ideas, demonstrations, and questions, with evidence rather than invented interpretation.
5. Guest segment, when applicable.
6. Participant contributions only after the privacy and consent gate.
7. Resources shared during the session, grouped by purpose.
8. Clear next steps linking to the assignment and feedback page.
9. The AI-assistance and human-review disclosure.

The Action Items section must contain participant-facing actions only. Remove internal notes such as `update session-runs.js`, placeholder tokens, and production TODOs. Use ordinary list text and links—not code-styled fragments—and visually check wrapping at 360, 768, and 1280 pixels.

## 6. Prepare the YouTube package

Draft and review:

- a three-paragraph description: core question, learning approach, and session arc;
- chapters for every major beat, based on the verified timestamp outline;
- a resources section grouped into session pages, tools, readings, and guest links;
- a link to the recap, assignment, and feedback page;
- the same privacy treatment used on the recap page.

After the video is published, update the recap embed and all recording links. Test playback and the plain YouTube fallback on desktop and mobile.

## 7. Build the assignment

Create five comparable options so that time, account access, bandwidth, and comfort with AI do not determine whether someone can participate:

| Route | Expected pattern |
|---|---|
| Default / async share | 15–20 minute observation-and-compare task |
| Go deeper / tool | 30–45 minute structured experiment |
| Go deeper / contrast | 25–35 minute comparison across mechanisms or outputs |
| Teach / design | 45–60 minute classroom adaptation |
| Critical / no-AI | 20–30 minute analysis of frozen material |

Each option needs an exact title, time estimate, steps, evidence to collect, and direct links to the relevant tool, worksheet, or frozen pack. End with one shared expectation: bring or post one artifact, however rough. The exact assignment option titles must also appear in the Google Form and site feedback page.

## 8. Create and connect the feedback form

Use one Google Form per session and link each Form to the existing shared response workbook:

`https://docs.google.com/spreadsheets/d/1_kcofOjBWhFdc9qzlAA4_KDFKQ0O3m_oY6oLbkUXJZ4/edit`

Let Google Forms create a separate response tab for each new Form. Do not manually post data to the spreadsheet or reuse a response tab with a different schema.

### Form workflow

1. Duplicate the prior session Form or run a complete, idempotent Apps Script update against the new Form ID.
2. Update the title, session-specific questions, assignment choices, next-session question, and guest question.
3. In Google Forms, select **Responses → Link to Sheets → Select existing spreadsheet**, then choose the shared workbook above.
4. Confirm the new response tab exists and its headers match every Form question.
5. Open the public Form and capture the real `entry.<number>` ID for every question.
6. Copy the exact choice values from the public Form. Punctuation, dashes, spacing, and time estimates must match exactly.
7. Update `pages/session-<n>-feedback.html` with the public `formResponse` endpoint, real entry IDs, and exact choice values. Never use placeholder IDs such as `entry.ASSIGNMENT_OPTION`.
8. Keep the site form's empty-payload guard compatible with `URLSearchParams`, for example `if (!payload.toString())`.
9. Keep a visible fallback link to the public Google Form.

### Required end-to-end test

1. Submit from the deployed GitHub Pages feedback page, not only from the Google Form editor.
2. Use an unmistakable marker such as `[TEST] Session 2 live-site verification — <commit>`.
3. Include at least one text field, one multiple-choice field, the assignment choice, and the guest field when present.
4. Confirm the page shows its sent state.
5. Find the marker in the expected response tab of the shared workbook.
6. Verify the timestamp and every tested answer landed in the correct columns.
7. Leave the row labeled as a test; delete it only with the workbook owner's approval.

The feedback route is not done until the spreadsheet readback succeeds.

## 9. Create the Notion mirrors

Under the existing `Learning Machines` page, create or update:

- `Session <n> Recap`
- `Session <n> Assignment`

The site remains canonical. Each Notion page should include the public site URL, recording or assignment links, a concise version of the content, and a `Last reviewed` date. Apply the same first-name-only and consent rules to Notion. After editing, search the page for participant last names and compare all links with the live site.

## 10. Integrate the session pages

Update the relevant session overview and navigation so participants can move among:

- overview;
- recap and recording;
- assignment;
- feedback;
- tools, worksheets, and frozen packs;
- next session or optional showcase.

Check that labels are consistent everywhere. `Recap`, `Assignment`, and `Feedback` should not point to placeholders or draft branches.

## 11. QA and publish

Before committing:

- run `git diff --check`;
- search for `[EDIT]`, `PLACEHOLDER`, fake `entry.*` IDs, internal TODOs, and participant last names;
- confirm all local links and asset paths resolve;
- confirm the video iframe has a title and responsive 16:9 sizing;
- test keyboard navigation and visible focus states;
- test 360, 768, and 1280 pixel widths;
- check paper, white, and slate themes;
- check the browser console for errors;
- run the criteria in `docs/qa-checklist.md`.

Then:

1. Commit the scoped changes with a session-specific message.
2. Push through the normal review path, or directly to `main` only when that publishing route has been explicitly authorized.
3. Wait for the GitHub Pages deployment for the exact commit SHA to succeed.
4. Open every live URL and repeat the high-risk checks: privacy, video, Action Items layout, assignment links, and feedback submission.
5. Verify Notion after the site is live so its canonical links are final.

## 12. Session-specific plan

### Session 2 — Images

**Core question:** How do image models turn words into pictures, and what defaults appear when prompts are vague?

**Primary sources:**

- `docs/session-2-images.md`
- `docs/session-2-facilitation.md`
- `docs/session-2-slides.md`
- `pages/session-images.html`

**Recap emphasis:** default-test predictions, pixel and feature representations, diffusion as structure emerging from noise, image assumptions and bias, and participant evidence from the Image Default Test Board.

**Assignment emphasis:** complete or extend a default test, compare prompt revisions, adapt the test for teaching, or analyze frozen images without live AI. The feedback form should ask what changed in participants' understanding of pixels, features, diffusion, defaults, and evidence.

### Session 3 — Video

**Core question:** Why is video generation harder than image generation, and what does that reveal about how models work?

**Primary sources:**

- `docs/session-3-video.md`
- `docs/session-3-facilitation.md`
- `docs/session-3-slides.md`
- `pages/session-video.html`

**Recap emphasis:** temporal coherence, drawing or temporal telephone, frame-to-frame failure modes, identity and camera drift, physics breaks, and evidence recorded in the Video Test Report.

**Assignment emphasis:** document one true finding for the optional showcase; compare frames or clips, annotate a failure mode, create a teaching adaptation, or analyze the frozen video pack. The feedback form should also collect optional-studio interest and access needs.

### Possible Session 4 — Optional Studio / Showcase

**Core question:** What did we learn across text, images, and video, and how can we support the claim with evidence?

**Primary source:**

- `pages/session-showcase.html`

**Recap emphasis:** cross-modality patterns, participant projects with explicit share consent, claims supported by prompts/outputs/frames, and reflections on access, teaching transfer, and future investigations.

**Assignment or continuation:** replace a between-session assignment with a contribution menu: revise the artifact, publish with approved attribution, adapt it for a classroom, add it anonymously to the evidence wall, or keep it private and submit a reflection only.

The final feedback form should include the end-of-camp consent review from `docs/consent-recap-protocol.md`: preferred credit, permission to describe or link the project, permission for screenshots or clips, and interest in future programs. No response means anonymous and no-share by default.

## 13. Copyable release checklist

```text
[ ] Complete source bundle collected
[ ] Transcript and timestamp outline verified
[ ] Privacy and consent pass complete
[ ] Participant last-name search is clean
[ ] Recap written and human-reviewed
[ ] Video description, chapters, resources, and embed complete
[ ] Five assignment routes published
[ ] Google Form linked to the shared response workbook
[ ] Site entry IDs and choice values match the public Form
[ ] Live-site test row verified in the correct response tab
[ ] Notion recap and assignment updated under Learning Machines
[ ] Navigation and cross-links updated
[ ] Mobile, desktop, theme, keyboard, and console QA passed
[ ] Exact commit deployed successfully to GitHub Pages
[ ] All live URLs opened and verified
```
