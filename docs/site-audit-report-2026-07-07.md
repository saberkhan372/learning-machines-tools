---
layout: page
title: Site Audit Report — 2026-07-07
---

# Site Audit Report — 2026-07-07

Status: **audit complete — no blocking issues; 4 minor findings resolved in fix pass**
Previous full audit: [All Pages Audit Report — 2026-06-15](all-pages-audit-report-2026-06-15.html)

This pass checked the full public surface four days before Session 1
(July 11), immediately after the final-cohort fixes landed (commit
`f13a51a`, from [Final-Cohort Fix List](final-cohort-fix-list.html)).

## Method & scope

- **Static pass (scripted, full coverage):** all 100 public HTML routes +
  56 Markdown docs. Internal links and anchors (with Jekyll `.md → .html`
  conversion modeled), `<title>` / `lang` / viewport / `h1`, `img alt`,
  duplicate ids, front matter, stale date strings, PII scan against the
  (untracked) interest-form roster, `sw.js` precache integrity, manifest
  icons, analytics coverage, orphan detection.
- **Browser pass (local server, 375 px):** 91 routes loaded via iframe
  harness (load success, horizontal overflow, rendered self-test status);
  8 key routes fully navigated with console monitoring (homepage, Start
  Here, Camp 2026, Participant Welcome, Vocabulary Field Guide, This
  Saturday, Tokenizer, Evidence Wall); rendered self-tests verified on 8
  tools.
- External links (40 unique) inventoried, not fetched — offline audit,
  same convention as June 15.

## Summary

| Check | Result |
|---|---:|
| Broken internal links on live routes | **0** |
| Missing anchors / fragments | 0 (incl. the 3 new `participant-welcome` → `camp-2026` anchors) |
| Local load failures (91 routes) | 0 |
| Console errors on navigated routes | 0 |
| Horizontal overflow at 375 px | 0 |
| Tool self-test failures (rendered) | 0 |
| Missing title / lang / viewport / alt / duplicate ids | 0 |
| MD docs missing front matter | 0 (excluding repo-facing `AGENTS.md`, `LICENSE-CONTENT.md`, archived plan) |
| `sw.js` precache entries missing | 0 |
| Manifest icons missing | 0 |
| Analytics (`assets/analytics.js`, localhost-gated) | 100 / 100 routes |
| Stale "July 4 / interest form due" strings on live routes | **0** (fixed in `f13a51a`; remaining mentions are historical logs) |
| Tracked CSV / roster files | 0 (PII `.gitignore` net holding) |

Fix-list crosscheck: **F1, F3, F4, F5, F6, F7, F8 verified shipped** in
`f13a51a`. F2's content shipped as `pages/participant-welcome.html`
(loads clean; covers recordings, scope, prep, vocabulary, timezones; all
links and anchors resolve) — the remaining F2 step is *sending* it, which
is a program task, not a site task.

## Findings

### A1 · `.md` cross-links 404 on the built site — P2, resolved

Jekyll converts front-mattered `.md` files to `.html`, so links that
target the `.md` filename break on GitHub Pages (they work only in the
GitHub repo view). 13 occurrences:

- `docs/interest-form-site-support-analysis.md` → `participant-support-plan.md` (×2), `final-cohort-fix-list.md`
- `docs/participant-support-plan.md` → `interest-form-site-support-analysis.md`
- `docs/final-cohort-fix-list.md` → `interest-form-site-support-analysis.md`, `enriched-cohort-design-pass.md`
- `docs/session-1-text.md` → `../worksheets/text-experiment-board.md` (×2)
- `docs/session-2-images.md` → `../worksheets/image-default-test-board.md` (×2)
- `docs/session-3-video.md` → `../worksheets/video-test-report.md` (×2)
- `tools/README.md` → `../docs/advanced-concept-extensions.md`
- `LICENSE-CONTENT.md` → `README.md#participation-norms` (README has no
  front matter, so it's served raw — the anchor won't resolve)

**Fix:** change the hrefs to `.html` (the June audit report already
follows this convention). The session-doc → worksheet links matter most:
those pages are participant-facing during sessions.

**Resolution:** all listed cross-links now target the built `.html`
versions.

### A2 · Real respondent name in tool self-test fixtures — P3, resolved

`tools/evidence-wall/index.html` and
`tools/next-token-prediction-game/index.html` use a real interest-form
respondent's full name in their Zoom saved-chat parsing fixtures
("14:32:05 From … to Everyone"). Verified **source-only** — the name
never renders in the UI — but the files are public in the repo and in
view-source. If this came from a real past-camp chat log, it may fall
outside what the consent protocol covers (participants choose how
they're named in public artifacts). **Fix:** swap for a fictional name
in both fixtures (self-tests assert on the string, so update both
sides).

**Resolution:** both fixtures now use a fictional classroom name, and
both parser self-tests still pass in-browser.

### A3 · Floating chips overlap hero text at 375 px — P3, resolved

On the homepage at mobile width, the floating "Notebook" chip sits over
the "global time zones welcome" hero line (screenshot taken 2026-07-07).
No overflow, purely stacking. Consider nudging the chip stack below the
hero block at narrow widths.

**Resolution:** the mobile Notebook chip now sits flush to the bottom
edge at narrow widths; rechecked at 375 × 667, 375 × 812, and 375 × 900.

### A4 · Housekeeping — P3, resolved

- Empty untracked `index/` directory at repo root — delete to avoid
  confusion with `index.html`.
- `docs/SHARED-CONTRACT.md` and `AGENTS.md` still reference
  `assets/lm.css` in illustrative snippets; the live sheet is
  `field.css`. Contributor-facing only, but the contract doc is the
  first thing a contributor copies from.
- `pages/docs-facilitation.html` remains an intentional noindex redirect
  stub (accepted in the June 15 report; unchanged).

**Resolution:** the empty directory is gone, contributor-facing snippets
now point at the Field CSS stack, and the redirect stub remains accepted.

## Notes

- The `?tweaks=1` React/Babel author scaffold on the homepage is
  correctly gated (never fetched without the query param) and carries
  SRI integrity hashes — checked, not a finding.
- `pages/this-saturday.html` correctly points at Session 1 / July 11 as
  of today.
- External registration links (`ccfest.rocks/ccfest-camp`, 11
  occurrences) now carry "Join waitlist" labels; the *target page's*
  framing can't be verified offline — worth one manual click before
  Saturday.
- No form-respondent emails, no tracked spreadsheets, and no identifiable
  free-text quotes anywhere in tracked files (A2 is the single name-level
  exception).

## Acceptance criteria for the fix pass

- All 13 `.md` cross-links updated to `.html` and re-checked.
- Both self-test fixtures use a fictional name; both tools' self-tests
  still pass in-browser.
- `git diff --check` passes; re-run the static link pass clean.
