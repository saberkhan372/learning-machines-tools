// RISKIER — round 2. Temperature ladder, slit-scan, raw signal.

// ---------- Concept G — Temperature ladder ----------
function PosterTemperature({ tw }) {
  const vars = posterVars(tw);
  const inks = posterInks(tw.tone, tw.energy, tw.world);
  const rows = [
    { t: "T = 0.1", s: "Learning Machines", c: "var(--pink)" },
    { t: "T = 0.5", s: "Learning Machnies", c: inks.text },
    { t: "T = 0.9", s: "Learnig Mashines", c: inks.video, hot: true },
    { t: "T = 1.3", s: "Laerning Mæchinse", c: inks.image },
    { t: "T = 1.7", s: "L3arnîng M4chinēs", c: inks.cross },
    { t: "T = 2.0", s: "Lrn1ng_M%ch!n∑s", c: "oklch(0.62 0.26 350)" },
  ];
  return (
    <div className="poster" style={{ ...vars, padding: "54px 60px 52px", display: "flex", flexDirection: "column" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
        <span className="eyebrow">CC Fest · Creative AI Camp · Summer 2026</span>
        <span className="eyebrow" style={{ color: "var(--pink)" }}>sampling, temperature rising</span>
      </div>
      <div className="rule-strong" style={{ margin: "16px 0 48px" }}></div>

      <div style={{ display: "flex", flexDirection: "column", gap: 26 }}>
        {rows.map((r) => (
          <div className="temprow" key={r.t} style={r.hot ? { background: inks.videoTint, margin: "-8px -14px", padding: "8px 14px" } : null}>
            <span className="tlabel" style={r.hot ? { color: r.c, fontWeight: 600 } : null}>{r.t}</span>
            <span className="display" style={{ fontSize: 64, color: r.c, whiteSpace: "nowrap" }}>{r.s}</span>
          </div>
        ))}
      </div>

      <p className="diag-cap" style={{ margin: "26px 0 0" }}>
        fig. 4 — the same model, sampled at rising temperature. too cold is boring; too hot is noise. we'll be working around T = 0.9.
      </p>

      <div style={{ flex: 1 }}></div>

      <p style={{ fontSize: 22, lineHeight: 1.45, color: "var(--psoft)", maxWidth: "46ch", margin: 0 }}>
        {P_SUBLINES[tw.subline]} <b style={{ color: "var(--pink)" }}>Text · Images · Video.</b>
      </p>

      <div style={{ height: 40 }}></div>
      <InfoFooter />
    </div>
  );
}

// ---------- Concept H — Slit-scan ----------
function SlitTitle({ moving, width, height, fontSize, color }) {
  const N = 16;
  const w = width / N;
  const slices = [];
  for (let i = 0; i < N; i++) {
    const dya = Math.sin(i * 0.65) * 30;
    const dyb = Math.sin(i * 0.65 + 2.4) * 30;
    slices.push(
      <span className="sl" key={i} style={{ width: w, height }}>
        <span className="slin" style={{
          width: width, height,
          "--sx": -i * w + "px",
          "--dya": dya + "px",
          "--dyb": dyb + "px",
          "--sd": -(i * 0.18) + "s",
        }}>
          <span className="display ghost" style={{ fontSize, color, display: "block", lineHeight: 0.94 }}>
            Learning<br />Machines
          </span>
        </span>
      </span>
    );
  }
  return <span className={"slit" + (moving ? " animate" : "")} style={{ width, height }}>{slices}</span>;
}

function PosterSlitscan({ tw }) {
  const vars = posterVars(tw);
  const inks = posterInks(tw.tone, tw.energy, tw.world);
  const moving = tw.motion !== "off";
  return (
    <div className="poster" style={{ ...vars, padding: "54px 60px 52px", display: "flex", flexDirection: "column" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
        <span className="eyebrow">CC Fest · Summer 2026</span>
        <span className="eyebrow" style={{ color: inks.video }}>frame interpolation error</span>
      </div>
      <div className="rule-strong" style={{ margin: "16px 0 0" }}></div>

      <div style={{ flex: 1 }}></div>

      <SlitTitle moving={moving} width={730} height={330} fontSize={150} color="var(--pink)" />

      <p className="diag-cap" style={{ margin: "30px 0 0", color: inks.video }}>
        fig. 5 — video is just images that have to agree with each other. sometimes they don't.
      </p>

      <div style={{ flex: 1 }}></div>

      <p style={{ fontSize: 22, lineHeight: 1.45, color: "var(--psoft)", maxWidth: "44ch", margin: 0 }}>
        {P_SUBLINES[tw.subline]}
      </p>
      <div className="display" style={{ fontSize: 46, margin: "24px 0 0", display: "flex", gap: 16, alignItems: "baseline" }}>
        <span style={{ color: inks.text }}>Text</span>
        <span style={{ color: "var(--prule)", fontSize: 34 }}>·</span>
        <span style={{ color: inks.image }}>Images</span>
        <span style={{ color: "var(--prule)", fontSize: 34 }}>·</span>
        <span style={{ color: inks.video }}>Video</span>
      </div>

      <div style={{ height: 42 }}></div>
      <InfoFooter />
    </div>
  );
}

// ---------- Concept I — Raw signal ----------
function PosterSignal({ tw }) {
  const vars = posterVars(tw);
  const moving = tw.motion !== "off";
  const HUES = [350, 230, 125, 305, 105, 250, 45];
  const cols = [];
  for (let c = 0; c < 56; c++) {
    const segs = [];
    const n = 3 + Math.floor(pr(c * 13) * 4);
    let rem = 100;
    for (let s = 0; s < n; s++) {
      const h = HUES[Math.floor(pr(c * 7 + s * 3) * HUES.length)];
      const L = 0.55 + pr(c + s * 11) * 0.38;
      const frac = s === n - 1 ? rem : Math.min(rem, 8 + pr(c * 3 + s) * 34);
      rem -= frac;
      segs.push(<i key={s} style={{ height: frac + "%", background: `oklch(${L} ${0.16 + pr(s * 5 + c) * 0.09} ${h})` }}></i>);
    }
    cols.push(<span className="sigcol" key={c}>{segs}</span>);
  }
  return (
    <div className="poster" style={{ ...vars, padding: 0, display: "flex", flexDirection: "column" }}>
      <div className={"signal" + (moving ? " animate" : "")} aria-hidden="true">{cols}</div>

      <div style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", height: "100%", padding: "0" }}>
        <div style={{ background: "rgba(252,250,244,0.92)", padding: "26px 44px", display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
          <span className="eyebrow" style={{ color: "#23201a" }}>CC Fest · Creative AI Camp</span>
          <span className="eyebrow" style={{ color: "#23201a" }}>raw signal · summer 2026</span>
        </div>

        <div style={{ flex: 1 }}></div>

        <div style={{ background: "#1d1a16", color: "#f2ebdc", padding: "44px 44px 40px" }}>
          <h1 className="display" style={{ fontSize: 96, margin: 0 }}>Learning Machines</h1>
          <p style={{ fontFamily: '"Archivo", system-ui, sans-serif', fontSize: 20, lineHeight: 1.45, color: "rgba(242,235,220,0.75)", maxWidth: "46ch", margin: "18px 0 0" }}>
            {P_SUBLINES[tw.subline]} Before meaning, it's all just signal — come learn how the meaning gets added.
          </p>
          <div className="rule" style={{ background: "rgba(242,235,220,0.3)", margin: "28px 0 18px" }}></div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", flexWrap: "wrap", gap: 10 }}>
            <span className="mono" style={{ fontSize: 16, fontWeight: 600 }}>Text · Images · Video — July 11 · 18 · 25, Sat 9–11 am PT</span>
            <span className="mono" style={{ fontSize: 14.5, color: "rgba(242,235,220,0.65)" }}>free · virtual · ccfest.rocks · form due July 4</span>
          </div>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { PosterTemperature, PosterSlitscan, PosterSignal, SlitTitle });
