// Three letter-portrait (850×1100) poster concepts.

// ---------- Concept A — Signage type ----------
function PosterSignage({ tw }) {
  const vars = posterVars(tw);
  const spec = tw.world === "spectrum";
  const inks = posterInks(tw.tone, tw.energy, tw.world);
  const lead = tw.lead === "tri" ? null : inks[tw.lead];
  const words = [
    ["Text", inks.text], ["Images", inks.image], ["Video", inks.video],
  ];
  return (
    <div className={"poster ticks" + (spec ? " spectrum" : "")} style={{ ...vars, padding: "56px 60px 52px", display: "flex", flexDirection: "column" }}>
      {spec && <SpectrumWash animate={false} />}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
        <span className="eyebrow">CC Fest · Creative AI Camp</span>
        <span className="eyebrow" style={{ color: "var(--pink)" }}>Summer 2026</span>
      </div>
      <div className="rule-strong" style={{ margin: "16px 0 52px" }}></div>

      <h1 className={"display" + (spec ? " ghost" : "")} style={{ fontSize: 150, color: lead || "var(--pink)" }}>
        Learning<br />Machines
      </h1>

      <div className="display" style={{ fontSize: 58, marginTop: 30, display: "flex", gap: 18, alignItems: "baseline" }}>
        {words.map(([w, c], i) => (
          <span key={w} style={{ display: "flex", gap: 18, alignItems: "baseline" }}>
            {i > 0 && <span style={{ color: "var(--prule)", fontSize: 40 }}>·</span>}
            <span style={{ color: c }}>{w}</span>
          </span>
        ))}
      </div>

      <p style={{ fontSize: 24, lineHeight: 1.45, color: "var(--psoft)", maxWidth: "42ch", margin: "38px 0 0" }}>
        {P_SUBLINES[tw.subline]}
      </p>
      <p className="mono" style={{ fontSize: 16, color: "var(--pmuted)", margin: "16px 0 0" }}>
        Each session asks the same question: <i>what is the machine actually doing?</i>
      </p>

      <div style={{ flex: 1 }}></div>

      <TokenStrip
        inks={inks}
        pieces={[["learn", "#2814"], ["ing", "#778"], [" machines", "#9043"], [" 2026", "#311"]]}
      />
      <p className="diag-cap" style={{ margin: "12px 0 0" }}>fig. 0 — the camp name, the way a language model reads it: four tokens.</p>

      <div style={{ height: 48 }}></div>
      <InfoFooter />
    </div>
  );
}

// ---------- Concept B — Three sessions ----------
function PosterSessions({ tw }) {
  const vars = posterVars(tw);
  const spec = tw.world === "spectrum";
  const inks = posterInks(tw.tone, tw.energy, tw.world);
  const bands = [
    {
      no: "Session 01 · Sat July 11", word: "Text", ink: inks.text, tint: inks.textTint,
      q: "How do language models generate text that feels meaningful? Tokens, probability, temperature.",
      motif: <ProbBars ink={inks.text} />,
    },
    {
      no: "Session 02 · Sat July 18", word: "Images", ink: inks.image, tint: inks.imageTint,
      q: "What is an image model actually working with? Diffusion, defaults, and vague prompts.",
      motif: <NoiseGrid ink={inks.image} denoise cols={13} rows={7} cell={13} />,
    },
    {
      no: "Session 03 · Sat July 25", word: "Video", ink: inks.video, tint: inks.videoTint,
      q: "What changes when generation has to work across time? Drift, coherence, and motion.",
      motif: <FilmFrames ink={inks.video} tint={inks.videoTint} w={56} h={44} />,
    },
  ];
  return (
    <div className={"poster" + (spec ? " spectrum" : "")} style={{ ...vars, padding: "54px 60px 52px", display: "flex", flexDirection: "column" }}>
      {spec && <SpectrumWash animate={false} shift={40} />}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
        <span className="eyebrow">CC Fest · Summer 2026</span>
        <span className="eyebrow" style={{ color: "var(--pink)" }}>Free · Virtual · Beginner-friendly</span>
      </div>
      <div className="rule-strong" style={{ margin: "16px 0 0" }}></div>

      <h1 className={"display" + (spec ? " ghost" : "")} style={{ fontSize: 84, margin: "40px 0 14px" }}>Learning Machines</h1>
      <p style={{ fontSize: 20, lineHeight: 1.45, color: "var(--psoft)", maxWidth: "52ch", margin: 0 }}>
        {P_SUBLINES[tw.subline]}
      </p>

      <div style={{ height: 34 }}></div>

      {bands.map((b) => (
        <div className="band" key={b.word} style={{ "--band-ink": b.ink }}>
          <span className="bno">{String(b.no).slice(8, 10)}</span>
          <div>
            <h2 className="bword">{b.word}</h2>
            <p className="bq" style={{ margin: 0 }}>{b.q}</p>
            <p className="bdate" style={{ marginBottom: 0 }}>{b.no}</p>
          </div>
          <div style={{ justifySelf: "end" }}>{b.motif}</div>
        </div>
      ))}

      <div style={{ borderTop: "1px solid var(--prule)", padding: "16px 0 0" }}>
        <p className="mono" style={{ fontSize: 13.5, color: "var(--pmuted)", margin: 0 }}>
          + optional studio — showcase what you made, found, or critiqued. No coding required. No-AI pathways for every activity.
        </p>
      </div>

      <div style={{ flex: 1 }}></div>
      <InfoFooter />
    </div>
  );
}

// ---------- Concept C — Field diagram ----------
function PosterDiagram({ tw }) {
  const vars = posterVars(tw);
  const spec = tw.world === "spectrum";
  const inks = posterInks(tw.tone, tw.energy, tw.world);
  const dist = [["machines", 41, true], ["models", 23], ["minds", 14], ["magic", 8]];
  return (
    <div className={"poster" + (spec ? " spectrum" : "")} style={{ ...vars, padding: "54px 60px 52px", display: "flex", flexDirection: "column" }}>
      {spec && <SpectrumWash animate={false} shift={300} />}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
        <span className="eyebrow">CC Fest · Creative AI Camp · Summer 2026</span>
        <span className="eyebrow" style={{ color: "var(--pink)" }}>Field Notes №1</span>
      </div>
      <div className="rule-strong" style={{ margin: "16px 0 40px" }}></div>

      <div className="plate-c" style={{ padding: "46px 42px 32px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <span className="diag-chip" style={{ "--chip-ink": "var(--psoft)", "--chip-tint": "transparent", fontSize: 17 }}>learning</span>
          <span className="diag-arrow" style={{ fontSize: 22 }}>→</span>
          <span className="diag-chip" style={{ "--chip-ink": inks.cross, "--chip-tint": inks.crossTint, padding: "18px 22px", fontSize: 19 }}>
            model{"\n"}<span style={{ fontWeight: 400, fontSize: 13, opacity: 0.8 }}>(learned patterns)</span>
          </span>
          <span className="diag-arrow" style={{ fontSize: 22 }}>→</span>
          <div style={{ flex: 1, minWidth: 300 }}>
            <div className="bars" style={{ "--bar-ink": inks.text }}>
              {dist.map(([w, p, hit]) => (
                <div className="barrow" key={w}>
                  <span className="blabel" style={hit ? { color: inks.text, fontWeight: 600 } : null}>{w}</span>
                  <span className="btrack"><span className="bfill" style={{ width: (p / 41) * 100 + "%", opacity: hit ? 1 : 0.45 }}></span></span>
                  <span className="bpct">{p}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="rule" style={{ margin: "32px 0 14px" }}></div>
        <p className="diag-cap" style={{ margin: 0, fontSize: 13 }}>
          fig. 1 — prediction from learned patterns. the same logic writes text, paints images, and moves video — with different failure modes each time.
        </p>
      </div>

      <h1 className={"display" + (spec ? " ghost" : "")} style={{ fontSize: 96, margin: "48px 0 0" }}>
        What is the machine <span style={{ color: inks.cross }}>actually</span> doing?
      </h1>

      <p style={{ fontSize: 21, lineHeight: 1.5, color: "var(--psoft)", maxWidth: "50ch", margin: "26px 0 0" }}>
        <b style={{ color: "var(--pink)" }}>Learning Machines: Text, Images, Video</b> — {P_SUBLINES[tw.subline]}
      </p>

      <div style={{ display: "flex", gap: 10, margin: "26px 0 0" }}>
        {[["Text", inks.text, inks.textTint], ["Images", inks.image, inks.imageTint], ["Video", inks.video, inks.videoTint]].map(([w, c, t]) => (
          <span key={w} className="mono" style={{ fontSize: 13.5, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: c, background: t, border: `1px solid ${c}`, padding: "7px 12px" }}>{w}</span>
        ))}
      </div>

      <div style={{ flex: 1 }}></div>
      <InfoFooter />
    </div>
  );
}

Object.assign(window, { PosterSignage, PosterSessions, PosterDiagram });
