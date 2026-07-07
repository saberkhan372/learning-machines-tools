// Social formats: square 1080×1080 + story 1080×1920.

// ---------- Square (Instagram) ----------
function PosterSquare({ tw }) {
  const vars = posterVars(tw);
  const spec = tw.world === "spectrum";
  const moving = spec && tw.motion !== "off";
  const inks = posterInks(tw.tone, tw.energy, tw.world);
  const lead = tw.lead === "tri" ? null : inks[tw.lead];
  return (
    <div className={"poster ticks" + (spec ? " spectrum" : "")} style={{ ...vars, padding: "70px 78px", display: "flex", flexDirection: "column" }}>
      {spec && <SpectrumWash animate={moving} />}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
        <span className="eyebrow" style={{ fontSize: 17 }}>CC Fest · Creative AI Camp</span>
        <span className="eyebrow" style={{ fontSize: 17, color: "var(--pink)" }}>Summer 2026</span>
      </div>
      <div className="rule-strong" style={{ margin: "20px 0 0" }}></div>

      <div style={{ flex: 1 }}></div>

      <h1 className={"display" + (spec ? (moving ? " ghost animate" : " ghost") : "")} style={{ fontSize: 168, color: lead || "var(--pink)" }}>
        Learning<br />Machines
      </h1>
      <div className="display" style={{ fontSize: 62, marginTop: 34, display: "flex", gap: 22, alignItems: "baseline" }}>
        <span style={{ color: inks.text }}>Text</span>
        <span style={{ color: "var(--prule)", fontSize: 44 }}>·</span>
        <span style={{ color: inks.image }}>Images</span>
        <span style={{ color: "var(--prule)", fontSize: 44 }}>·</span>
        <span style={{ color: inks.video }}>Video</span>
      </div>
      <p style={{ fontSize: 30, lineHeight: 1.42, color: "var(--psoft)", maxWidth: "36ch", margin: "36px 0 0" }}>
        {P_SUBLINES[tw.subline]}
      </p>

      <div style={{ flex: 1.4 }}></div>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", borderTop: "2px solid var(--pink)", paddingTop: 24 }}>
        <span className="mono" style={{ fontSize: 24, fontWeight: 600, lineHeight: 1.5 }}>July 11 · 18 · 25<br />Saturdays 9–11 am PT</span>
        <span className="mono" style={{ fontSize: 22, color: "var(--pmuted)", textAlign: "right", lineHeight: 1.7, whiteSpace: "nowrap" }}>free · virtual · beginner-friendly<br />join waitlist → ccfest.rocks</span>
      </div>
    </div>
  );
}

// ---------- Story (9:16) ----------
function PosterStory({ tw }) {
  const vars = posterVars(tw);
  const spec = tw.world === "spectrum";
  const moving = spec && tw.motion !== "off";
  const inks = posterInks(tw.tone, tw.energy, tw.world);
  const bands = [
    { no: "01", word: "Text", date: "Sat July 11", ink: inks.text, motif: <ProbBars ink={inks.text} rows={[["machines", 41], ["models", 23], ["minds", 14]]} /> },
    { no: "02", word: "Images", date: "Sat July 18", ink: inks.image, motif: <NoiseGrid ink={inks.image} denoise cols={12} rows={5} cell={16} /> },
    { no: "03", word: "Video", date: "Sat July 25", ink: inks.video, motif: <FilmFrames ink={inks.video} tint={inks.videoTint} w={66} h={50} /> },
  ];
  return (
    <div className={"poster" + (spec ? " spectrum" : "")} style={{ ...vars, padding: "92px 84px 84px", display: "flex", flexDirection: "column" }}>
      {spec && <SpectrumWash animate={moving} shift={210} />}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
        <span className="eyebrow" style={{ fontSize: 21 }}>CC Fest · Summer 2026</span>
        <span className="eyebrow" style={{ fontSize: 21, color: "var(--pink)" }}>Free · Virtual</span>
      </div>
      <div className="rule-strong" style={{ margin: "22px 0 0" }}></div>

      <h1 className={"display" + (spec ? (moving ? " ghost animate" : " ghost") : "")} style={{ fontSize: 148, margin: "72px 0 0" }}>Learning<br />Machines</h1>
      <div className="display" style={{ fontSize: 60, marginTop: 34, display: "flex", gap: 22, alignItems: "baseline" }}>
        <span style={{ color: inks.text }}>Text</span>
        <span style={{ color: "var(--prule)", fontSize: 42 }}>·</span>
        <span style={{ color: inks.image }}>Images</span>
        <span style={{ color: "var(--prule)", fontSize: 42 }}>·</span>
        <span style={{ color: inks.video }}>Video</span>
      </div>
      <p style={{ fontSize: 32, lineHeight: 1.42, color: "var(--psoft)", maxWidth: "33ch", margin: "44px 0 0" }}>
        {P_SUBLINES[tw.subline]}
      </p>
      <p className="mono" style={{ fontSize: 22, color: "var(--pmuted)", margin: "26px 0 0" }}>
        Each session asks: <i>what is the machine actually doing?</i>
      </p>

      <div style={{ flex: 1 }}></div>

      {bands.map((b) => (
        <div key={b.word} style={{ display: "grid", gridTemplateColumns: "72px 1fr auto", gap: 26, alignItems: "center", padding: "46px 0", borderTop: "1px solid var(--prule)" }}>
          <span className="mono" style={{ fontSize: 24, fontWeight: 600, color: b.ink }}>{b.no}</span>
          <div>
            <h2 className="display" style={{ fontSize: 84, color: b.ink }}>{b.word}</h2>
            <p className="mono" style={{ fontSize: 20, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--pmuted)", margin: "16px 0 0", whiteSpace: "nowrap" }}>{b.date} · 9–11 am PT</p>
          </div>
          <div style={{ transform: "scale(1.35)", transformOrigin: "right center" }}>{b.motif}</div>
        </div>
      ))}

      <div style={{ borderTop: "2px solid var(--pink)", paddingTop: 30, marginTop: 8 }}>
        <p className="mono" style={{ fontSize: 27, fontWeight: 600, margin: 0 }}>Join waitlist → ccfest.rocks</p>
        <p className="mono" style={{ fontSize: 20, color: "var(--pmuted)", margin: "12px 0 0" }}>recordings + next cycle · no coding required</p>
      </div>
    </div>
  );
}

Object.assign(window, { PosterSquare, PosterStory });
