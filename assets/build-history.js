/* Learning Machines — build history (for pages/build-story.html).

   The daily series is real, generated from `git log --format=%ad --date=short`
   on 2026-06-14 (71 commits, 2026-05-18 → 2026-06-14, zero-days included so the
   two-week gap shows honestly). Regenerate with:
     node -e '<see build-story commit message>'
   The acts and narrative are hand-authored from the commit subjects and the
   process docs (project-brief.md, BUILD-LOG.md, FIELD-MANUAL-REDESIGN.md,
   launch-readiness-plan.md). */
window.LM_BUILD = {
  range: { start: "2026-05-18", end: "2026-06-14", days: 28, commits: 71 },

  /* [iso date, commit count] for every day in the range */
  daily: [
    ["2026-05-18", 1], ["2026-05-19", 13], ["2026-05-20", 14], ["2026-05-21", 0],
    ["2026-05-22", 0], ["2026-05-23", 0], ["2026-05-24", 0], ["2026-05-25", 0],
    ["2026-05-26", 0], ["2026-05-27", 0], ["2026-05-28", 0], ["2026-05-29", 0],
    ["2026-05-30", 0], ["2026-05-31", 0], ["2026-06-01", 0], ["2026-06-02", 0],
    ["2026-06-03", 0], ["2026-06-04", 0], ["2026-06-05", 1], ["2026-06-06", 0],
    ["2026-06-07", 1], ["2026-06-08", 2], ["2026-06-09", 0], ["2026-06-10", 12],
    ["2026-06-11", 6], ["2026-06-12", 11], ["2026-06-13", 3], ["2026-06-14", 7]
  ],

  numbers: [
    { n: "11 → 25", label: "tools — started with 11, shipped 25" },
    { n: "71", label: "commits" },
    { n: "27", label: "days, start to launch-ready" },
    { n: "53", label: "pages" },
    { n: "34", label: "process docs written alongside" },
    { n: "~976", label: "lines of shared JavaScript" },
    { n: "4", label: "visual identities, one switcher" },
    { n: "0", label: "build steps — static HTML, no bundler" }
  ],

  /* six acts, each over a stretch of the daily series above */
  acts: [
    {
      no: "01", title: "Tools first", span: "2026-05-18", to: "2026-05-20",
      stat: "28 commits in 3 days",
      beat: "It started with the tools, not a website. ELIZA, the Tokenizer + Temperature visualizer, the worksheet boards, the concept bridges, four facilitation guides — built in a three-day burst. The principle was set before any design: every tool has to make something invisible visible.",
      candid: "The log is honest about the speed: two commits are literally titled “briges” and “bridges” — the second fixes the typo in the first."
    },
    {
      no: "02", title: "The quiet stretch", span: "2026-05-21", to: "2026-06-04",
      stat: "0 commits · ~2 weeks",
      beat: "Then nothing, for two weeks. The build was not linear. This gap is where the tools got piloted and rethought before any of it became a public site — the unglamorous part most making-of pages quietly delete.",
      candid: "Left in on purpose. A flat two-week stretch in the timeline is the most honest thing on this page."
    },
    {
      no: "03", title: "Tools become a site", span: "2026-06-05", to: "2026-06-09",
      stat: "4 commits",
      beat: "The pieces became a participant-facing site: a first redesign, the tools wrapped in shared chrome, and a cleanup + QA pass. Still a collection of pages, not yet a publication.",
      candid: ""
    },
    {
      no: "04", title: "The Field Manual day", span: "2026-06-10", to: "2026-06-10",
      stat: "12 commits · one day",
      beat: "In a single day, a five-phase redesign: a shared design system in assets/, the entire tool fleet migrated onto it, a new homepage, every subpage, and numbered §-wayfinding. This is the day it stopped being a website and became a field manual — one coherent document you read in sections.",
      candid: "Twelve commits, each titled “Field Manual redesign — Phase N.” Doing it as visible phases instead of one giant commit is what kept it reversible."
    },
    {
      no: "05", title: "A visual voice", span: "2026-06-11", to: "2026-06-12",
      stat: "17 commits",
      beat: "Then identity: a five-board poster system, sampled color washes behind the heroes, a “riskier” identity pass, and the site-wide switcher that flips the whole site between four looks — field, terminal, spectrum, acid — persisted per visitor.",
      candid: "The acid identity later failed a contrast check (two inks at 3.5 against WCAG’s 4.5). That fix didn’t land until Act 6. Pretty isn’t done until it’s legible."
    },
    {
      no: "06", title: "From site to camp instrument", span: "2026-06-13", to: "2026-06-14",
      stat: "10 commits",
      beat: "Building on the prior day's usability audit and classroom projection view, the last stretch turned a good website into something you run a live camp with: catalog tiering to fight over-tooling, then a cockpit layer — a per-session Run Console, a register-first front door, a date-aware participant home, and a recap system. The data started driving the pages instead of the other way around.",
      candid: "Much of this was paired with Claude Code — audit, propose, confirm, build, commit. The session that wrote this very page is the tail end of Act 6."
    }
  ]
};
