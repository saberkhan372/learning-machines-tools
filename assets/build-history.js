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

  /* Before commit 1 — the lineage the git history can't show. Sourced from the
     CC Fest archive (Notion) and docs/project-brief.md. */
  prehistory: [
    { year: "2016", title: "CC Fest is founded",
      note: "Forty people at NYU ITP on a rainy October day. A free, community-run creative-coding festival — “you don't have to be a coder, you just have to be curious.” Ten years and 20+ countries later, that ethos is still the frame." },
    { year: "2020", title: "CC Fest goes virtual",
      note: "The first Zoom edition (July 11, 2020) reaches a global community — and sets the free / virtual / recorded model this camp still runs on." },
    { year: "2021–24", title: "AI & ML enter the festival",
      note: "Workshops on machine learning, ethics, and ml5.js join the p5.js core — the festival starts treating AI as something to investigate, not just use." },
    { year: "2024", title: "CC Fest Teacher Camp",
      note: "A multi-week cohort for educators — guests, assignment tiers, recaps, a showcase. This camp's run-of-show is modeled directly on it." },
    { year: "2025–26", title: "“Generative AI as a Creative Collaborator”",
      note: "Saber Khan & Danny Gámez's Campbell Hall course: language → image → video → final project. The exact arc, the inquiry method, and the first versions of these tools (ELIZA, Default Tests, Temporal Telephone) were built and tested with a class of sixteen students here first." },
    { year: "Spr 2026", title: "CC Fest Coding Camp",
      note: "The operational template — a two-hour Zoom with 2–4 featured tools, a guest, a participant share, and recordings by Sunday. Learning Machines adapts it from p5.js coding to ML investigation." },
    { year: "May 18", title: "Commit 1", bridge: true,
      note: "The course tools, rebuilt from scratch as a public field manual. This is where the git history — and § B below — picks up." }
  ],

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
      beat: "It began with the tools, not a website. In three days: eleven single-file HTML tools — ELIZA beside a modern model, a tokenizer with a temperature slider, the worksheet boards, the concept bridges — plus four facilitation guides. The order is the argument. The mechanism came first and the marketing later, and the one rule every tool still has to pass — make a single invisible thing visible — was fixed before a line of page design.",
      candid: "The log doesn't hide the speed: two back-to-back commits are titled “briges” and then “bridges.” The second one fixes the typo in the first."
    },
    {
      no: "02", title: "The quiet stretch", span: "2026-05-21", to: "2026-06-04",
      stat: "0 commits · ~2 weeks",
      beat: "Then the graph goes flat for two weeks. The build was never linear. This is the stretch where the tools were carried into a real classroom and a real camp — used, watched, and quietly rethought — before any of it became a public site. Most making-of pages delete the flat part. This one keeps it, because the pause is where the tools earned their place.",
      candid: "Left in on purpose. A two-week run of zero-commit days is the most honest mark on this whole page."
    },
    {
      no: "03", title: "Tools become a site", span: "2026-06-05", to: "2026-06-09",
      stat: "4 commits",
      beat: "The loose pieces became a participant-facing site: a first redesign, the tools wrapped in shared navigation, a cleanup and QA pass. Genuinely useful — but still a folder of pages rather than something with a spine.",
      candid: ""
    },
    {
      no: "04", title: "The Field Manual day", span: "2026-06-10", to: "2026-06-10",
      stat: "12 commits · one day",
      beat: "In a single day — twelve commits, each labelled “Phase N” — a five-phase redesign: a shared design system in assets/, the whole tool fleet migrated onto it, a new homepage, every subpage, and numbered §-wayfinding. This is the day it stopped being a website and became a field manual: one document you read in sections, not a pile of links.",
      candid: "Doing it as visible, numbered phases instead of one heroic commit is what kept every step reversible — you can read exactly where it could have been rolled back."
    },
    {
      no: "05", title: "A visual voice", span: "2026-06-11", to: "2026-06-12",
      stat: "17 commits",
      beat: "Identity arrived next: a five-board poster system, sampled colour washes behind the heroes, and a switcher that flips the entire site between four looks — field, terminal, spectrum, acid — remembered per visitor. A site about machines that generate variations became a site you can run variations on.",
      candid: "The acid look later failed a contrast check — two inks at 3.5 against WCAG's 4.5 minimum — and the fix didn't land until Act 6. Pretty isn't finished until it's legible."
    },
    {
      no: "06", title: "From site to camp instrument", span: "2026-06-13", to: "2026-06-14",
      stat: "10 commits",
      beat: "The last stretch turned a good website into something you run a live camp with. After a usability audit and a classroom projection view, the catalog was tiered to fight over-tooling, and then a cockpit layer landed: a per-session Run Console, a register-first front door, a date-aware participant home, and a recap system. The through-line is that the data finally drove the pages — one source of truth behind the link sheet, the console, and the participant home — instead of each page repeating itself.",
      candid: "Most of this was paired with Claude Code in a tight loop: audit, propose, confirm, build, commit. The session that wrote this very page is the tail end of Act 6 — which is its own small answer to “how was this made.”"
    }
  ],

  /* interesting ideas & methods worth naming, with the evidence for each */
  techniques: [
    { title: "Docs-first, in Markdown",
      body: "Almost everything started as a written plan before it was code — a brief, a spec, an audit, a readiness checklist. The repo carries 34 of these alongside a deep Notion planning hub. The plan is the real artifact; the build just executes it. When the over-tooling problem showed up, the fix was a launch-readiness plan in Markdown first, the tiering second." },
    { title: "Two LLMs, checked against each other",
      body: "Built with both Claude and ChatGPT, deliberately playing them off one another: one drafts, the other critiques; one writes the copy, the other audits it for contrast, bias, or overreach. Disagreements between the two models were often where the real problems were hiding. Because the camp studies AI, that assistance stays visible and reviewed, not hidden." },
    { title: "One readable file per tool",
      body: "No bundler, no framework, no build step. Every tool is a single self-contained HTML file you can open and read top to bottom. The constraint is pedagogical, not just technical: if you can read the file, you can teach the idea — and change one line and watch the output move." },
    { title: "Let the data drive the pages",
      body: "The session run-of-shows, the tool catalog, and even this timeline live in small JS data files (session-runs.js, tools-data.js, build-history.js). Edit one and every surface updates at once — the link sheet, the run console, and the participant home all read from the same source instead of repeating each other." },
    { title: "Audit → propose → build → commit",
      body: "A loop that repeats all over the commit log: write down what's actually wrong, lay out the options, confirm a direction, build it on a branch, and commit with a message that explains the why, not just the what. The honesty of the timeline is a side effect of that discipline." },
    { title: "Ship reversibly, degrade honestly",
      body: "Big changes land as visible phases, not one drop, so any step can be undone. Things that aren't ready yet — recaps, async prompts — render as labelled placeholders that point somewhere real instead of dead-ending. Nothing pretends to be finished before it is." }
  ]
};
