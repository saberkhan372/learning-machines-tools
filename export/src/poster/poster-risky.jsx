// RISKY boards — the motifs pushed to their extreme.

// Title cut into displaced slices, like a dropped keyframe.
function GlitchTitle({ children, moving, fontSize, color }) {
  const slices = [
    { top: 6, h: 12, dx: -0.16, c: "oklch(0.68 0.26 350)", d: "0s" },
    { top: 27, h: 8, dx: 0.12, c: "oklch(0.78 0.16 230)", d: "-0.6s" },
    { top: 47, h: 11, dx: -0.09, c: "oklch(0.85 0.23 125)", d: "-1.1s" },
    { top: 71, h: 9, dx: 0.15, c: "oklch(0.7 0.19 305)", d: "-1.5s" },
  ];
  return (
    <span className="glitch display" style={{ fontSize, color }}>
      <span className="gbase">{children}</span>
      {slices.map((s, i) => (
        <span
          key={i}
          aria-hidden="true"
          className={"gslice" + (moving ? " animate" : "")}
          style={{
            "--ctop": s.top + "%",
            "--cbot": 100 - s.top - s.h + "%",
            "--dx": s.dx + "em",
            "--gd": s.d,
            color: s.c,
          }}
        >{children}</span>
      ))}
    </span>
  );
}

// ---------- Concept D — Dropped keyframe ----------
function PosterMosh({ tw }) {
  const vars = posterVars({ ...tw, world: "spectrum" });
  const moving = tw.motion !== "off";
  return (
    <div className="poster spectrum" style={{ ...vars, padding: "56px 60px 52px", display: "flex", flexDirection: "column" }}>
      <SpectrumWash animate={moving} />
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
        <span className="eyebrow">CC Fest · Creative AI Camp</span>
        <span className="eyebrow" style={{ color: "var(--pink)" }}>Summer 2026</span>
      </div>
      <div className="rule-strong" style={{ margin: "16px 0 0" }}></div>

      <div style={{ flex: 1 }}></div>

      <GlitchTitle moving={moving} fontSize={164} color="var(--pink)">Learning<br />Machines</GlitchTitle>

      <p className="mono" style={{ fontSize: 19, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--pink)", margin: "44px 0 0" }}>
        Text · Images · Video — what is the machine actually doing?
      </p>
      <p style={{ fontSize: 21, lineHeight: 1.45, color: "var(--psoft)", maxWidth: "44ch", margin: "16px 0 0" }}>
        {P_SUBLINES[tw.subline]}
      </p>

      <div style={{ flex: 1.2 }}></div>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", borderTop: "2px solid var(--pink)", paddingTop: 18 }}>
        <span className="mono" style={{ fontSize: 17, fontWeight: 600, lineHeight: 1.55 }}>July 11 · 18 · 25<br />Saturdays 9–11 am PT</span>
        <span className="mono" style={{ fontSize: 15.5, color: "var(--pmuted)", textAlign: "right", lineHeight: 1.65, whiteSpace: "nowrap" }}>free · virtual · beginner-friendly<br />join waitlist → ccfest.rocks</span>
      </div>
    </div>
  );
}

// ---------- Concept E — Token wall ----------
function PosterTokens({ tw }) {
  const vars = posterVars(tw);
  const inks = posterInks(tw.tone, tw.energy, tw.world);
  const cyc = [inks.text, inks.image, inks.video, inks.cross];
  const cycT = [inks.textTint, inks.imageTint, inks.videoTint, inks.crossTint];
  const Tk = ({ t, id, size, i, solid }) => (
    <span className="tk" style={{
      fontSize: size, "--tk-ink": solid ? "var(--pbg)" : cyc[i % 4],
      "--tk-tint": solid ? cyc[i % 4] : cycT[i % 4],
      borderColor: cyc[i % 4],
    }}>
      {t}
      <span className="tid">{id}</span>
    </span>
  );
  const sent = [
    ["a", "#64"], [" free", "#2049"], [" creative", "#11097"], [" AI", "#15837"],
    [" camp", "#3155"], [" for", "#329"], [" educators", "#2213"], [",", "#11"],
    [" artists", "#7912"], [",", "#11"], [" students", "#4108"], [" &", "#286"],
    [" curious", "#16899"], [" learners", "#5077"], [".", "#13"],
  ];
  const info = [
    ["July", "#3070"], [" 11", "#352"], [" ·", "#847"], [" 18", "#413"], [" ·", "#847"], [" 25", "#510"],
    [" Sat", "#2202"], ["urdays", "#988"], [" 9", "#24"], ["–", "#782"], ["11", "#335"], [" am", "#321"], [" PT", "#1199"],
    [" free", "#2049"], [" ·", "#847"], [" virtual", "#8242"], [" ·", "#847"], [" ccfest", "#30100"], [".rocks", "#9714"],
  ];
  return (
    <div className="poster" style={{ ...vars, padding: "54px 60px 52px", display: "flex", flexDirection: "column" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
        <span className="eyebrow">CC Fest · Summer 2026</span>
        <span className="eyebrow" style={{ color: "var(--pink)" }}>tokenized announcement — 38 pieces</span>
      </div>
      <div className="rule-strong" style={{ margin: "16px 0 40px" }}></div>

      <div className="tokwall" style={{ gap: 12 }}>
        <Tk t="Learn" id="#2814" size={88} i={0} solid />
        <Tk t="ing" id="#778" size={88} i={1} solid />
        <Tk t=" Mach" id="#9043" size={88} i={2} solid />
        <Tk t="ines" id="#1276" size={88} i={3} solid />
      </div>

      <div style={{ height: 28 }}></div>
      <div className="tokwall">
        {sent.map((p, i) => <Tk key={"s" + i} t={p[0]} id={p[1]} size={35} i={i} />)}
      </div>

      <div style={{ height: 22 }}></div>
      <div className="tokwall">
        {info.map((p, i) => <Tk key={"i" + i} t={p[0]} id={p[1]} size={26} i={i + 2} />)}
      </div>

      <div style={{ flex: 1 }}></div>

      <p className="diag-cap" style={{ margin: "0 0 18px", maxWidth: "72ch" }}>
        fig. 2 — this poster, the way a language model reads it. every piece gets a number; meaning is yours to add. session 01 · text · july 11.
      </p>
      <InfoFooter />
    </div>
  );
}

// ---------- Concept F — Still resolving ----------
function PosterDissolve({ tw }) {
  const vars = posterVars(tw);
  const inks = posterInks(tw.tone, tw.energy, tw.world);
  // overlay grid: cells of bg color, density rises toward the bottom rows
  const C = 26, R = 9, cells = [];
  for (let r = 0; r < R; r++) for (let c = 0; c < C; c++) {
    const t = r / (R - 1);
    const rnd = pr(r * C + c + 999);
    const noisy = rnd < t * 0.92;
    const colored = noisy && pr(c * R + r + 31) < 0.22;
    cells.push(
      <i key={r + "-" + c} style={{
        background: colored ? [inks.image, inks.cross, inks.video][Math.floor(pr(r + c * 7) * 3)] : "var(--pbg)",
        opacity: noisy ? (colored ? 0.85 : 1) : 0,
      }}></i>
    );
  }
  return (
    <div className="poster" style={{ ...vars, padding: "54px 60px 52px", display: "flex", flexDirection: "column" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
        <span className="eyebrow">CC Fest · Creative AI Camp · Summer 2026</span>
        <span className="eyebrow" style={{ color: inks.image }}>denoising · step 14 / 50</span>
      </div>
      <div className="rule-strong" style={{ margin: "16px 0 56px" }}></div>

      <div className="dissolve">
        <h1 className="display" style={{ fontSize: 158, margin: 0 }}>Learning<br />Machines</h1>
        <span className="dgrid" aria-hidden="true" style={{ gridTemplateColumns: `repeat(${C}, 1fr)`, gridTemplateRows: `repeat(${R}, 1fr)` }}>
          {cells}
        </span>
      </div>

      <p className="diag-cap" style={{ margin: "24px 0 0", color: inks.image, fontSize: 14 }}>
        fig. 3 — an image model starts from pure noise and removes it, step by step. so will we.
      </p>

      <div style={{ flex: 1 }}></div>

      <p style={{ fontSize: 25, lineHeight: 1.45, color: "var(--psoft)", maxWidth: "40ch", margin: 0 }}>
        {P_SUBLINES[tw.subline]}
      </p>
      <div className="display" style={{ fontSize: 54, margin: "30px 0 0", display: "flex", gap: 18, alignItems: "baseline" }}>
        <span style={{ color: inks.text }}>Text</span>
        <span style={{ color: "var(--prule)", fontSize: 38 }}>·</span>
        <span style={{ color: inks.image }}>Images</span>
        <span style={{ color: "var(--prule)", fontSize: 38 }}>·</span>
        <span style={{ color: inks.video }}>Video</span>
      </div>

      <div style={{ height: 48 }}></div>
      <InfoFooter />
    </div>
  );
}

Object.assign(window, { GlitchTitle, PosterMosh, PosterTokens, PosterDissolve });
