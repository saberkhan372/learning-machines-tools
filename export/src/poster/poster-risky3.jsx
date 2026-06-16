// ROUND 3 — off the grid. New fonts, new layouts, no allegiance to the site.

// ---------- Concept J — Brutalist vertical (Anton, acid paper) ----------
function PosterBrutalist({ tw }) {
  const acid = "oklch(0.93 0.21 110)";
  const ink = "#141312";
  const hot = "oklch(0.62 0.26 350)";
  return (
    <div className="poster" style={{ background: acid, color: ink, padding: "44px 48px", display: "flex", gap: 40 }}>
      <div style={{ display: "flex", gap: 10 }}>
        <h1 style={{ fontFamily: '"Anton", sans-serif', fontSize: 218, lineHeight: 0.88, margin: 0, letterSpacing: "0.01em", display: "flex", flexDirection: "row", gap: 10 }}>
          <span className="vert" style={{ display: "block" }}>LEARNING</span>
          <span className="vert" style={{ display: "block", color: hot }}>MACHINES</span>
        </h1>
      </div>

      <div style={{ flex: 1, display: "flex", flexDirection: "column", borderLeft: `4px solid ${ink}`, paddingLeft: 36 }}>
        <p className="mono" style={{ fontSize: 15, fontWeight: 600, letterSpacing: "0.16em", textTransform: "uppercase", margin: 0 }}>
          CC Fest<br />Creative AI Camp<br />Summer 2026
        </p>

        <div style={{ flex: 1 }}></div>

        {[
          ["01", "TEXT", "JUL 11"],
          ["02", "IMAGES", "JUL 18"],
          ["03", "VIDEO", "JUL 25"],
        ].map(([n, w, d]) => (
          <div key={n} style={{ borderTop: `4px solid ${ink}`, padding: "18px 0 22px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
              <span style={{ fontFamily: '"Anton", sans-serif', fontSize: 64, lineHeight: 1 }}>{w}</span>
              <span className="mono" style={{ fontSize: 17, fontWeight: 600 }}>{d}</span>
            </div>
          </div>
        ))}

        <div style={{ background: ink, color: acid, padding: "24px 22px", marginTop: 6 }}>
          <p className="mono" style={{ fontSize: 16.5, fontWeight: 600, lineHeight: 1.6, margin: 0 }}>
            SATURDAYS 9–11 AM PT<br />
            FREE · VIRTUAL · ALL LEVELS<br />
            <span style={{ color: "oklch(0.85 0.21 110)" }}>CCFEST.ROCKS</span>
          </p>
          <p className="mono" style={{ fontSize: 12.5, color: "rgba(232,255,0,0.55)", margin: "12px 0 0" }}>
            interest form due July 4 — what is the machine actually doing?
          </p>
        </div>
      </div>
    </div>
  );
}

// ---------- Concept K — Terminal (VT323 phosphor) ----------
function PosterTerminal({ tw }) {
  const moving = tw.motion !== "off";
  const grn = "#46ff7d";
  const dim = "rgba(70,255,125,0.55)";
  const Row = ({ c, children, style, className }) => (
    <p className={className} style={{ fontFamily: '"VT323", monospace', fontSize: 27, lineHeight: 1.35, margin: 0, color: c || grn, ...style }}>{children}</p>
  );
  return (
    <div className="poster" style={{ background: "#0a0f0a", color: grn, padding: "52px 56px" , display: "flex", flexDirection: "column"}}>
      <div className="term-scan"></div>

      <Row c={dim}>ccfest@summer:~$ run learning-machines --year 2026</Row>
      <Row c={dim}>loading curriculum .......... ok</Row>

      <div style={{ flex: 0.8 }}></div>

      <h1 className="term-glow" style={{ fontFamily: '"VT323", monospace', fontSize: 148, lineHeight: 0.92, margin: 0, letterSpacing: "0.01em" }}>
        LEARNING<br />MACHINES<span className={"cursor" + (moving ? " animate" : "")} style={{ marginLeft: 14 }}></span>
      </h1>

      <div style={{ flex: 0.8 }}></div>

      <Row c={dim}>&gt; a free creative AI camp. no coding required.</Row>
      <div style={{ height: 22 }}></div>
      <Row>[01] TEXT&nbsp;&nbsp;&nbsp;&nbsp;jul 11&nbsp;&nbsp;tokens, probability, temperature</Row>
      <Row>[02] IMAGES&nbsp;&nbsp;jul 18&nbsp;&nbsp;diffusion, noise, defaults</Row>
      <Row>[03] VIDEO&nbsp;&nbsp;&nbsp;jul 25&nbsp;&nbsp;motion, drift, coherence</Row>
      <div style={{ height: 22 }}></div>
      <Row c={dim}>&gt; when: saturdays 9-11am PT&nbsp;&nbsp;cost: $0</Row>
      <Row c={dim}>&gt; where: virtual&nbsp;&nbsp;audience: educators, artists, students</Row>
      <div style={{ height: 26 }}></div>
      <Row style={{ fontSize: 34 }} className="term-glow">&gt;&gt; register: ccfest.rocks&nbsp;&nbsp;[form due jul 4]</Row>
    </div>
  );
}

// ---------- Concept L — Zine chaos (Rubik Glitch stickers) ----------
function PosterZine({ tw }) {
  const moving = tw.motion !== "off";
  const ink = "#1c0e24";
  return (
    <div className="poster spectrum" style={{ background: "#f2ebdc", color: ink, padding: "52px 56px", display: "flex", flexDirection: "column" }}>
      <SpectrumWash animate={moving} shift={120} />

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <span className="sticker mono" style={{ "--rot": "-3deg", background: ink, color: "#f2ebdc", fontSize: 16, fontWeight: 600, letterSpacing: "0.12em" }}>CC FEST · SUMMER 2026</span>
        <span className="sticker" style={{ "--rot": "4deg", background: "oklch(0.9 0.22 125)", color: ink, fontFamily: '"Bungee Shade", cursive', fontSize: 34 }}>FREE</span>
      </div>

      <div style={{ flex: 1 }}></div>

      <h1 style={{ fontFamily: '"Rubik Glitch", cursive', fontSize: 132, lineHeight: 0.98, margin: 0, transform: "rotate(-2deg)", color: ink }}>
        LEARNING<br />MACHINES
      </h1>

      <div style={{ height: 30 }}></div>

      <div style={{ display: "flex", gap: 18, flexWrap: "wrap" }}>
        <span className="sticker mono" style={{ "--rot": "-2deg", background: "#fff", fontSize: 19, fontWeight: 600 }}>TEXT — JUL 11</span>
        <span className="sticker mono" style={{ "--rot": "3deg", background: "#fff", fontSize: 19, fontWeight: 600 }}>IMAGES — JUL 18</span>
        <span className="sticker mono" style={{ "--rot": "-4deg", background: "#fff", fontSize: 19, fontWeight: 600 }}>VIDEO — JUL 25</span>
      </div>

      <div style={{ flex: 1 }}></div>

      <p style={{ fontFamily: '"Archivo", sans-serif', fontSize: 22, fontWeight: 600, lineHeight: 1.4, maxWidth: "36ch", margin: 0, transform: "rotate(-1deg)" }}>
        {P_SUBLINES[tw.subline]}
      </p>

      <div style={{ height: 26 }}></div>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
        <span className="sticker mono" style={{ "--rot": "2deg", background: ink, color: "#f2ebdc", fontSize: 21, fontWeight: 600 }}>SATURDAYS 9–11 AM PT</span>
        <span className="sticker mono" style={{ "--rot": "-3deg", background: "oklch(0.62 0.26 350)", color: "#fff", fontSize: 21, fontWeight: 600 }}>CCFEST.ROCKS →</span>
      </div>
    </div>
  );
}

Object.assign(window, { PosterBrutalist, PosterTerminal, PosterZine });
