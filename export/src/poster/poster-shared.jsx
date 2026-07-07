// Shared palette helpers + motif components for the camp posters.

const P_TONES = {
  paper: { bg: "#f2ebdc", surface: "#f9f4e7", ink: "#23201a", soft: "#454034", muted: "#6e6757", rule: "#cfc2a6" },
  white: { bg: "#fcfcfa", surface: "#ffffff", ink: "#191a1c", soft: "#3c3e42", muted: "#67696e", rule: "#d4d4cc" },
  slate: { bg: "#1a1b1e", surface: "#202125", ink: "#e9e6dd", soft: "#c9c6bc", muted: "#94917f", rule: "#45443d" },
};

const P_HUES = { text: 250, image: 45, video: 150, cross: 310 };

function posterInks(tone, energy, world) {
  const spec = world === "spectrum";
  const dark = tone === "slate" && !spec;
  const L = dark ? (energy === "bright" ? 0.8 : 0.78) : spec ? 0.45 : energy === "bright" ? 0.56 : 0.48;
  const C = spec ? 0.19 : energy === "bright" ? (dark ? 0.14 : 0.17) : dark ? 0.09 : 0.1;
  const out = {};
  for (const k of Object.keys(P_HUES)) {
    out[k] = `oklch(${L} ${C} ${P_HUES[k]})`;
    out[k + "Tint"] = `oklch(${L} ${C} ${P_HUES[k]} / ${dark ? 0.16 : 0.11})`;
  }
  return out;
}

// Inline CSS vars for a .poster root
function posterVars(tw) {
  let t = P_TONES[tw.tone] || P_TONES.paper;
  if (tw.world === "spectrum") {
    // bright wash behind everything — force dark print ink + translucent plates
    t = {
      bg: t.bg, surface: "rgba(255,255,255,0.55)", ink: "#211823",
      soft: "#352b3a", muted: "rgba(28,14,36,0.62)", rule: "rgba(28,14,36,0.32)",
    };
  }
  const ink = posterInks(tw.tone, tw.energy, tw.world);
  const field = tw.voice === "field";
  return {
    "--pbg": t.bg, "--psurface": t.surface, "--pink": t.ink, "--psoft": t.soft,
    "--pmuted": t.muted, "--prule": t.rule,
    "--itext": ink.text, "--iimage": ink.image, "--ivideo": ink.video, "--icross": ink.cross,
    "--itext-tint": ink.textTint, "--iimage-tint": ink.imageTint,
    "--ivideo-tint": ink.videoTint, "--icross-tint": ink.crossTint,
    "--pfont-display": field ? '"Newsreader", Georgia, serif' : '"Archivo", system-ui, sans-serif',
    "--pdisplay-weight": field ? 500 : 800,
    "--pdisplay-track": field ? "-0.01em" : "-0.025em",
  };
}

const P_SUBLINES = {
  camp: "A free creative AI camp for educators, artists, students, and curious learners.",
  investigation: "An investigation, not a tutorial — how generative systems actually work.",
  question: "How do machines write, imagine, and move? Find out what they're actually doing.",
};

// ---- Motifs ----

function SpectrumWash({ animate, shift }) {
  const deg = shift || 0;
  const style = animate
    ? { animationDelay: `${-(deg / 360) * 14}s, 0s` }
    : { filter: `hue-rotate(${deg}deg)` };
  return <div className={animate ? "wash animate" : "wash"} style={style}></div>;
}

function ProbBars({ ink, rows }) {
  const data = rows || [
    ["machines", 41], ["models", 23], ["minds", 14], ["magic", 8], ["mistakes", 5],
  ];
  const max = data[0][1];
  return (
    <div className="bars" style={{ "--bar-ink": ink }}>
      {data.map(([w, p], i) => (
        <div className="barrow" key={w}>
          <span className="blabel">{w}</span>
          <span className="btrack"><span className="bfill" style={{ width: (p / max) * 100 + "%", opacity: i === 0 ? 1 : 0.55 }}></span></span>
          <span className="bpct">{p}%</span>
        </div>
      ))}
    </div>
  );
}

// deterministic pseudo-random
function pr(n) { const x = Math.sin(n * 127.1 + 311.7) * 43758.5453; return x - Math.floor(x); }

function NoiseGrid({ ink, cols, rows, cell, denoise }) {
  const C = cols || 10, R = rows || 6, S = cell || 13;
  const cells = [];
  for (let r = 0; r < R; r++) for (let c = 0; c < C; c++) {
    const t = c / (C - 1); // left = noise, right = resolved
    const rnd = pr(r * C + c);
    const on = denoise ? (rnd < 0.25 + t * 0.7 ? 1 : 0) : rnd > 0.5 ? 1 : 0;
    const op = on ? 0.25 + t * 0.75 : 0.08;
    cells.push(<i key={r + "-" + c} style={{ width: S, height: S, opacity: op }}></i>);
  }
  return (
    <div className="noise" style={{ "--noise-ink": ink, gridTemplateColumns: `repeat(${C}, ${S}px)` }}>
      {cells}
    </div>
  );
}

function FilmFrames({ ink, tint, w, h }) {
  const W = w || 62, H = h || 46;
  // a blob that drifts and degrades across frames — temporal drift
  const pos = [[14, 14, 12], [22, 16, 12], [32, 22, 13], [40, 14, 16]];
  return (
    <div className="frames" style={{ "--frame-ink": ink, "--frame-tint": tint }}>
      {pos.map(([x, y, d], i) => (
        <div className="frame" key={i} style={{ width: W, height: H, opacity: 1 - i * 0.13 }}>
          <span className="blob" style={{ left: x * (W / 62), top: y * (H / 62), width: d, height: d, borderRadius: i === 3 ? "32%" : "50%" }}></span>
          <span className="fno">t{i}</span>
        </div>
      ))}
    </div>
  );
}

function TokenStrip({ pieces, inks }) {
  const order = ["text", "image", "video", "cross"];
  return (
    <div className="tok-strip">
      {pieces.map((p, i) => {
        const k = order[i % order.length];
        return (
          <span className="tok" key={i} style={{ "--tok-ink": inks[k], "--tok-tint": inks[k + "Tint"] }}>
            <span className="t">{p[0]}</span>
            <span className="id">{p[1]}</span>
          </span>
        );
      })}
    </div>
  );
}

function InfoFooter({ compact }) {
  return (
    <div className="p-info">
      <div className="cell"><span className="k">Dates</span><span className="v">July 11 · 18 · 25<small>three Saturdays</small></span></div>
      <div className="cell"><span className="k">Time</span><span className="v">9 – 11 am PT<small>live · virtual</small></span></div>
      <div className="cell"><span className="k">Cost</span><span className="v">Free<small>beginner-friendly</small></span></div>
      <div className="cell"><span className="k">Waitlist</span><span className="v">ccfest.rocks<small>recordings + next cycle</small></span></div>
    </div>
  );
}

Object.assign(window, {
  P_TONES, P_SUBLINES, posterInks, posterVars,
  ProbBars, NoiseGrid, FilmFrames, TokenStrip, InfoFooter, SpectrumWash,
});
