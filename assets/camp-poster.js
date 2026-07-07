(function () {
  "use strict";

  /* ====================================================================
     Consolidated Camp Poster studio.
     One flow: pick a design -> tune the look -> download.
     The download panel swaps between finished exports (default look)
     and an in-browser GIF generator (tuned look).
     Palette + motif engine ported verbatim from the handoff prototype.
     ==================================================================== */

  /* ---- palette logic ---- */
  var P_TONES = {
    paper: { bg: "#f2ebdc", surface: "#f9f4e7", ink: "#23201a", soft: "#454034", muted: "#6e6757", rule: "#cfc2a6" },
    white: { bg: "#fcfcfa", surface: "#ffffff", ink: "#191a1c", soft: "#3c3e42", muted: "#67696e", rule: "#d4d4cc" },
    slate: { bg: "#1a1b1e", surface: "#202125", ink: "#e9e6dd", soft: "#c9c6bc", muted: "#94917f", rule: "#45443d" }
  };
  var P_HUES = { text: 250, image: 45, video: 150, cross: 310 };
  var P_SUBLINES = {
    camp: "A free creative AI camp for educators, artists, students, and curious learners.",
    investigation: "An investigation, not a tutorial — how generative systems actually work.",
    question: "How do machines write, imagine, and move? Find out what they're actually doing."
  };

  function posterInks(tone, energy, world) {
    var spec = world === "spectrum";
    var dark = tone === "slate" && !spec;
    var L = dark ? (energy === "bright" ? 0.8 : 0.78) : spec ? 0.45 : energy === "bright" ? 0.56 : 0.48;
    var C = spec ? 0.19 : energy === "bright" ? (dark ? 0.14 : 0.17) : dark ? 0.09 : 0.1;
    var out = {};
    Object.keys(P_HUES).forEach(function (k) {
      out[k] = "oklch(" + L + " " + C + " " + P_HUES[k] + ")";
      out[k + "Tint"] = "oklch(" + L + " " + C + " " + P_HUES[k] + " / " + (dark ? 0.16 : 0.11) + ")";
    });
    return out;
  }

  function applyVars(el, tw) {
    var t = P_TONES[tw.tone] || P_TONES.paper;
    var bg = t.bg;
    if (tw.world === "spectrum") {
      t = { bg: bg, surface: "rgba(255,255,255,0.55)", ink: "#211823", soft: "#352b3a",
            muted: "rgba(28,14,36,0.62)", rule: "rgba(28,14,36,0.32)" };
    }
    var ink = posterInks(tw.tone, tw.energy, tw.world);
    var field = tw.voice === "field";
    var v = {
      "--pbg": t.bg, "--psurface": t.surface, "--pink": t.ink, "--psoft": t.soft,
      "--pmuted": t.muted, "--prule": t.rule,
      "--itext": ink.text, "--iimage": ink.image, "--ivideo": ink.video, "--icross": ink.cross,
      "--itext-tint": ink.textTint, "--iimage-tint": ink.imageTint,
      "--ivideo-tint": ink.videoTint, "--icross-tint": ink.crossTint,
      "--plead": tw.lead === "tri" ? t.ink : ink[tw.lead],
      "--pfont-display": field ? '"Newsreader", Georgia, serif' : '"Archivo", system-ui, sans-serif',
      "--pdisplay-weight": field ? 500 : 800,
      "--pdisplay-track": field ? "-0.01em" : "-0.025em"
    };
    Object.keys(v).forEach(function (k) { el.style.setProperty(k, v[k]); });
  }

  /* ---- motif builders (deterministic) ---- */
  function pr(n) { var x = Math.sin(n * 127.1 + 311.7) * 43758.5453; return x - Math.floor(x); }

  function probBars(inkVar, rows, hitFirst) {
    var data = rows || [["machines", 41], ["models", 23], ["minds", 14], ["magic", 8], ["mistakes", 5]];
    var max = data[0][1];
    var html = '<div class="bars" style="--bar-ink: var(' + inkVar + ');">';
    data.forEach(function (d, i) {
      var hit = hitFirst && i === 0;
      html += '<div class="barrow"><span class="blabel' + (hit ? " hit" : "") + '">' + d[0] + "</span>"
        + '<span class="btrack"><span class="bfill" style="width:' + (d[1] / max) * 100 + "%;opacity:" + (i === 0 ? 1 : (hitFirst ? 0.45 : 0.55)) + ';"></span></span>'
        + '<span class="bpct">' + d[1] + "%</span></div>";
    });
    return html + "</div>";
  }

  function noiseGrid(inkVar, cols, rows, cell) {
    var C = cols, R = rows, S = cell, html = "";
    for (var r = 0; r < R; r++) for (var c = 0; c < C; c++) {
      var t = c / (C - 1);
      var rnd = pr(r * C + c);
      var on = rnd < 0.25 + t * 0.7 ? 1 : 0;
      var op = on ? 0.25 + t * 0.75 : 0.08;
      html += '<i style="width:' + S + "px;height:" + S + "px;opacity:" + op.toFixed(3) + ';"></i>';
    }
    return '<div class="noise" style="--noise-ink: var(' + inkVar + '); grid-template-columns: repeat(' + C + ", " + S + 'px);">' + html + "</div>";
  }

  function filmFrames(inkVar, tintVar, W, H) {
    var pos = [[14, 14, 12], [22, 16, 12], [32, 22, 13], [40, 14, 16]];
    var html = '<div class="frames" style="--frame-ink: var(' + inkVar + '); --frame-tint: var(' + tintVar + ');">';
    pos.forEach(function (p, i) {
      html += '<div class="frame" style="width:' + W + "px;height:" + H + "px;opacity:" + (1 - i * 0.13) + ';">'
        + '<span class="blob" style="left:' + p[0] * (W / 62) + "px;top:" + p[1] * (H / 62) + "px;width:" + p[2] + "px;height:" + p[2] + "px;"
        + (i === 3 ? "border-radius:32%;" : "") + '"></span>'
        + '<span class="fno">t' + i + "</span></div>";
    });
    return html + "</div>";
  }

  function tokenStrip() {
    var pieces = [["learn", "#2814"], ["ing", "#778"], [" machines", "#9043"], [" 2026", "#311"]];
    var order = ["text", "image", "video", "cross"];
    var html = '<div class="tok-strip">';
    pieces.forEach(function (p, i) {
      var k = order[i % 4];
      html += '<span class="tok" style="--tok-ink: var(--i' + k + '); --tok-tint: var(--i' + k + '-tint);">'
        + '<span class="t">' + p[0] + '</span><span class="id">' + p[1] + "</span></span>";
    });
    return html + "</div>";
  }

  function infoFooter() {
    return '<div class="p-info">'
      + '<div class="cell"><span class="k">Dates</span><span class="v">July 11 · 18 · 25<small>three Saturdays</small></span></div>'
      + '<div class="cell"><span class="k">Time</span><span class="v">9 – 11 am PT<small>live · virtual</small></span></div>'
      + '<div class="cell"><span class="k">Cost</span><span class="v">Free<small>beginner-friendly</small></span></div>'
      + '<div class="cell"><span class="k">Waitlist</span><span class="v">ccfest.rocks<small>recordings + next cycle</small></span></div>'
      + "</div>";
  }

  function triLine(size, dotSize, gap) {
    return '<div class="display" style="font-size:' + size + "px; display:flex; gap:" + gap + 'px; align-items:baseline;">'
      + '<span style="color: var(--itext);">Text</span>'
      + '<span style="color: var(--prule); font-size:' + dotSize + 'px;">·</span>'
      + '<span style="color: var(--iimage);">Images</span>'
      + '<span style="color: var(--prule); font-size:' + dotSize + 'px;">·</span>'
      + '<span style="color: var(--ivideo);">Video</span>'
      + "</div>";
  }

  function glitchTitle(html, fontSize, color) {
    var slices = [
      { top: 6, h: 12, dx: "-0.16em", c: "oklch(0.68 0.26 350)", d: "0s" },
      { top: 27, h: 8, dx: "0.12em", c: "oklch(0.78 0.16 230)", d: "-0.6s" },
      { top: 47, h: 11, dx: "-0.09em", c: "oklch(0.85 0.23 125)", d: "-1.1s" },
      { top: 71, h: 9, dx: "0.15em", c: "oklch(0.7 0.19 305)", d: "-1.5s" }
    ];
    var out = '<span class="poster-glitch display" style="font-size:' + fontSize + "px;color:" + color + ';">'
      + '<span class="gbase">' + html + "</span>";
    slices.forEach(function (s) {
      out += '<span class="gslice" aria-hidden="true" style="--ctop:' + s.top + "%;--cbot:" + (100 - s.top - s.h) + "%;--dx:" + s.dx + ";--gd:" + s.d + ";color:" + s.c + ';">' + html + "</span>";
    });
    return out + "</span>";
  }

  /* ---- boards (the 5 curated designs) ---- */
  function boardSignage() {
    return '<div class="poster pticks" data-shift="0" style="padding:56px 60px 52px; display:flex; flex-direction:column;">'
      + '<div class="wash"></div>'
      + '<div style="display:flex; justify-content:space-between; align-items:baseline;">'
      + '<span class="eyebrow">CC Fest · Creative AI Camp</span><span class="eyebrow" style="color:var(--pink);">Summer 2026</span></div>'
      + '<div class="rule-strong" style="margin:16px 0 52px;"></div>'
      + '<h1 class="display ghostable" style="font-size:150px; color:var(--plead);">Learning<br>Machines</h1>'
      + '<div style="margin-top:30px;">' + triLine(58, 40, 18) + "</div>"
      + '<p class="p-subline" style="font-size:24px; line-height:1.45; color:var(--psoft); max-width:42ch; margin:38px 0 0;"></p>'
      + '<p class="mono" style="font-size:16px; color:var(--pmuted); margin:16px 0 0;">Each session asks the same question: <i>what is the machine actually doing?</i></p>'
      + '<div style="flex:1;"></div>'
      + tokenStrip()
      + '<p class="diag-cap" style="margin:12px 0 0;">fig. 0 — the camp name, the way a language model reads it: four tokens.</p>'
      + '<div style="height:48px;"></div>' + infoFooter() + "</div>";
  }

  function boardDroppedKeyframe() {
    return '<div class="poster pticks risk-motion-board" data-shift="0" style="padding:56px 60px 52px; display:flex; flex-direction:column;">'
      + '<div class="wash"></div>'
      + '<div style="display:flex; justify-content:space-between; align-items:baseline;">'
      + '<span class="eyebrow">CC Fest · Creative AI Camp</span><span class="eyebrow" style="color:var(--pink);">Summer 2026</span></div>'
      + '<div class="rule-strong" style="margin:16px 0 0;"></div>'
      + '<div style="flex:1;"></div>'
      + glitchTitle("Learning<br>Machines", 164, "var(--pink)")
      + '<p class="mono" style="font-size:19px; font-weight:600; letter-spacing:0.1em; text-transform:uppercase; color:var(--pink); margin:44px 0 0;">Text · Images · Video — what is the machine actually doing?</p>'
      + '<p class="p-subline" style="font-size:21px; line-height:1.45; color:var(--psoft); max-width:44ch; margin:16px 0 0;"></p>'
      + '<div style="flex:1.2;"></div>'
      + '<div style="display:flex; justify-content:space-between; align-items:flex-end; border-top:2px solid var(--pink); padding-top:18px;">'
      + '<span class="mono" style="font-size:17px; font-weight:600; line-height:1.55;">July 11 · 18 · 25<br>Saturdays 9–11 am PT</span>'
      + '<span class="mono" style="font-size:15.5px; color:var(--pmuted); text-align:right; line-height:1.65; white-space:nowrap;">free · virtual · beginner-friendly<br>join waitlist → ccfest.rocks</span></div></div>';
  }

  function boardForwardPass() {
    var nodes = [
      ["x1", 12, 24], ["x2", 12, 48], ["x3", 12, 72],
      ["h1", 44, 18], ["h2", 44, 38], ["h3", 44, 58], ["h4", 44, 78],
      ["y", 78, 48]
    ];
    var edges = [
      [18, 28, 44, 20], [18, 52, 44, 40], [18, 76, 44, 80],
      [50, 20, 78, 50], [50, 40, 78, 50], [50, 60, 78, 50], [50, 80, 78, 50]
    ];
    var html = '<div class="poster risk-motion-board" data-shift="240" style="padding:54px 60px 52px; display:flex; flex-direction:column;">'
      + '<div class="wash"></div>'
      + '<div style="display:flex; justify-content:space-between; align-items:baseline;">'
      + '<span class="eyebrow">CC Fest · Summer 2026</span><span class="eyebrow" style="color:var(--ivideo);">forward pass · activation path</span></div>'
      + '<div class="rule-strong" style="margin:16px 0 34px;"></div>'
      + '<h1 class="display ghostable" style="font-size:86px; margin:0 0 28px;">Learning Machines</h1>'
      + '<div class="forward-field">';
    edges.forEach(function (e, i) {
      var dx = e[2] - e[0];
      var dy = e[3] - e[1];
      var len = Math.sqrt(dx * dx + dy * dy);
      var deg = Math.atan2(dy, dx) * 180 / Math.PI;
      html += '<span class="forward-edge" data-step="' + i + '" style="left:' + e[0] + '%;top:' + e[1] + '%;width:' + len + '%;transform:rotate(' + deg + 'deg);"></span>';
    });
    nodes.forEach(function (n, i) {
      html += '<span class="forward-node" data-step="' + i + '" style="left:calc(' + n[1] + '% - 17px);top:calc(' + n[2] + '% - 17px);">' + n[0] + "</span>";
    });
    html += "</div>"
      + '<p class="diag-cap" style="margin:18px 0 0; color:var(--ivideo);">fig. 8 — signals move layer by layer. the answer looks sudden, but the path has structure.</p>'
      + '<div style="height:28px;"></div>'
      + '<p class="p-subline" style="font-size:22px; line-height:1.45; color:var(--psoft); max-width:44ch; margin:0;"></p>'
      + '<div style="flex:0.5;"></div>' + infoFooter() + "</div>";
    return html;
  }

  function boardSquare() {
    return '<div class="poster pticks social-board" data-shift="0" style="padding:70px 78px; display:flex; flex-direction:column;">'
      + '<div class="wash"></div>'
      + '<div style="display:flex; justify-content:space-between; align-items:baseline;">'
      + '<span class="eyebrow" style="font-size:17px;">CC Fest · Creative AI Camp</span><span class="eyebrow" style="font-size:17px; color:var(--pink);">Summer 2026</span></div>'
      + '<div class="rule-strong" style="margin:20px 0 0;"></div>'
      + '<div style="flex:1;"></div>'
      + '<h1 class="display ghostable" style="font-size:168px; color:var(--plead);">Learning<br>Machines</h1>'
      + '<div style="margin-top:34px;">' + triLine(62, 44, 22) + "</div>"
      + '<p class="p-subline" style="font-size:30px; line-height:1.42; color:var(--psoft); max-width:36ch; margin:36px 0 0;"></p>'
      + '<div style="flex:1.4;"></div>'
      + '<div style="display:flex; justify-content:space-between; align-items:flex-end; border-top:2px solid var(--pink); padding-top:24px;">'
      + '<span class="mono" style="font-size:24px; font-weight:600; line-height:1.5;">July 11 · 18 · 25<br>Saturdays 9–11 am PT</span>'
      + '<span class="mono" style="font-size:22px; color:var(--pmuted); text-align:right; line-height:1.7; white-space:nowrap;">free · virtual · beginner-friendly<br>join waitlist → ccfest.rocks</span></div></div>';
  }

  function boardStory() {
    var bands = [
      { no: "01", word: "Text", date: "Sat July 11", ink: "--itext", motif: probBars("--itext", [["machines", 41], ["models", 23], ["minds", 14]]) },
      { no: "02", word: "Images", date: "Sat July 18", ink: "--iimage", motif: noiseGrid("--iimage", 12, 5, 16) },
      { no: "03", word: "Video", date: "Sat July 25", ink: "--ivideo", motif: filmFrames("--ivideo", "--ivideo-tint", 66, 50) }
    ];
    var html = '<div class="poster social-board" data-shift="210" style="padding:92px 84px 84px; display:flex; flex-direction:column;">'
      + '<div class="wash"></div>'
      + '<div style="display:flex; justify-content:space-between; align-items:baseline;">'
      + '<span class="eyebrow" style="font-size:21px;">CC Fest · Summer 2026</span><span class="eyebrow" style="font-size:21px; color:var(--pink);">Free · Virtual</span></div>'
      + '<div class="rule-strong" style="margin:22px 0 0;"></div>'
      + '<h1 class="display ghostable" style="font-size:148px; margin:72px 0 0;">Learning<br>Machines</h1>'
      + '<div style="margin-top:34px;">' + triLine(60, 42, 22) + "</div>"
      + '<p class="p-subline" style="font-size:32px; line-height:1.42; color:var(--psoft); max-width:33ch; margin:44px 0 0;"></p>'
      + '<p class="mono" style="font-size:22px; color:var(--pmuted); margin:26px 0 0;">Each session asks: <i>what is the machine actually doing?</i></p>'
      + '<div style="flex:1;"></div>';
    bands.forEach(function (b) {
      html += '<div style="display:grid; grid-template-columns:72px 1fr auto; gap:26px; align-items:center; padding:46px 0; border-top:1px solid var(--prule);">'
        + '<span class="mono" style="font-size:24px; font-weight:600; color:var(' + b.ink + ');">' + b.no + "</span><div>"
        + '<h2 class="display" style="font-size:84px; color:var(' + b.ink + ');">' + b.word + "</h2>"
        + '<p class="mono" style="font-size:20px; letter-spacing:0.1em; text-transform:uppercase; color:var(--pmuted); margin:16px 0 0; white-space:nowrap;">' + b.date + ' · 9–11 am PT</p></div>'
        + '<div style="transform:scale(1.35); transform-origin:right center;">' + b.motif + "</div></div>";
    });
    html += '<div style="border-top:2px solid var(--pink); padding-top:30px; margin-top:8px;">'
      + '<p class="mono" style="font-size:27px; font-weight:600; margin:0;">Join waitlist → ccfest.rocks</p>'
      + '<p class="mono" style="font-size:20px; color:var(--pmuted); margin:12px 0 0;">recordings + next cycle · no coding required</p></div></div>';
    return html;
  }

  /* ---- curated design set ----
     files: finished GIF/MP4 exports that match the DEFAULT look.
     null files => generate-only (no pre-rendered asset). */
  var BASE_LETTER = { w: 850, h: 1100, webW: 417, webH: 540, x2W: 834, x2H: 1080, shortFrames: 8, standardFrames: 14, delayMs: 110 };
  function letterFiles(id) {
    return {
      gif: "../export/gifs/" + id + ".gif", gif2x: "../export/gifs-2x/" + id + ".gif",
      mp4: "../export/mp4/" + id + ".mp4", mp42x: "../export/mp4-2x/" + id + ".mp4",
      sizes: { gif: "417×540", gif2x: "834×1080", mp4: "416×540", mp42x: "834×1080" }
    };
  }

  var DESIGNS = [
    Object.assign({ id: "forward", label: "Forward Pass", code: "M", aspect: "Letter", group: "Motion",
      blurb: "Network nodes and edges firing in sequence.", render: boardForwardPass, files: letterFiles("forward") }, BASE_LETTER),
    Object.assign({ id: "clean", label: "Field Letter", code: "A", aspect: "Letter", group: "Print",
      blurb: "Clean signage — the canonical printed poster.", render: boardSignage, files: null }, BASE_LETTER),
    Object.assign({ id: "mosh", label: "Dropped Keyframe", code: "D", aspect: "Letter", group: "Motion",
      blurb: "Glitch slices over a datamosh wash.", render: boardDroppedKeyframe, files: letterFiles("mosh") }, BASE_LETTER),
    { id: "square", label: "Social Square", code: "IG", aspect: "1:1", group: "Social",
      blurb: "Instagram square with animated spectrum wash.", render: boardSquare,
      w: 1080, h: 1080, webW: 540, webH: 540, x2W: 1080, x2H: 1080, shortFrames: 8, standardFrames: 14, delayMs: 110,
      files: { gif: "../export/gifs/square.gif", gif2x: "../export/gifs-2x/square.gif", mp4: "../export/mp4/square.mp4", mp42x: "../export/mp4-2x/square.mp4",
        sizes: { gif: "540×540", gif2x: "1080×1080", mp4: "540×540", mp42x: "1080×1080" } } },
    { id: "story", label: "Social Story", code: "9:16", aspect: "9:16", group: "Social",
      blurb: "Vertical story format with animated wash.", render: boardStory,
      w: 1080, h: 1920, webW: 304, webH: 540, x2W: 608, x2H: 1080, shortFrames: 8, standardFrames: 14, delayMs: 110,
      files: { gif: "../export/gifs/story.gif", gif2x: "../export/gifs-2x/story.gif", mp4: "../export/mp4/story.mp4", mp42x: "../export/mp4-2x/story.mp4",
        sizes: { gif: "304×540", gif2x: "608×1080", mp4: "304×540", mp42x: "608×1080" } } }
  ];

  function designById(id) {
    for (var i = 0; i < DESIGNS.length; i++) if (DESIGNS[i].id === id) return DESIGNS[i];
    return DESIGNS[0];
  }

  /* ---- studio state ---- */
  var DEFAULTS = { tone: "paper", voice: "signage", energy: "bright", lead: "tri", subline: "camp", world: "spectrum", motion: "on" };
  var tw = Object.assign({}, DEFAULTS);
  var currentDesignId = "forward";
  var genState = { size: "web", length: "standard", name: "learning-machines", open: false };
  var busy = false;

  function isDefaultStyle() {
    return Object.keys(DEFAULTS).every(function (k) { return tw[k] === DEFAULTS[k]; });
  }

  function fileStem(s) {
    return String(s || "learning-machines").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "") || "learning-machines";
  }

  /* ---- preview fitting ---- */
  function fitBoards() {
    document.querySelectorAll(".stage").forEach(function (st) {
      var w = st.clientWidth;
      if (!w) return;
      var scale = w / Number(st.dataset.w);
      st.style.height = Number(st.dataset.h) * scale + "px";
      var art = st.querySelector(".art");
      if (art) art.style.transform = "scale(" + scale + ")";
    });
  }
  window.addEventListener("resize", fitBoards);

  /* ---- deterministic frame + state ---- */
  function frameProgress(frameIndex, frameCount) {
    if (frameIndex === null || frameIndex === undefined || !frameCount) return 0;
    return frameIndex / Math.max(1, frameCount - 1);
  }

  function applyDeterministicFrame(p, frameIndex, frameCount) {
    var progress = frameProgress(frameIndex, frameCount);
    var phase = progress * Math.PI * 2;
    var wash = p.querySelector(".wash");
    if (wash && tw.world === "spectrum") {
      var shift = Number(p.dataset.shift) || 0;
      wash.style.filter = "hue-rotate(" + (shift + progress * 360) + "deg)";
      wash.style.transform = "translate(" + (-2 + Math.sin(phase) * 2) + "%, " + (-1.5 + Math.cos(phase) * 1.5) + "%) scale(" + (1.04 + Math.sin(phase) * 0.03) + ")";
    }
    p.querySelectorAll(".poster-glitch .gslice").forEach(function (slice, i) {
      var dx = Math.sin(phase + i * 0.9) * (i % 2 ? 20 : -18);
      slice.style.transform = "translateX(" + dx.toFixed(2) + "px)";
    });
    p.querySelectorAll(".ghostable").forEach(function (el) {
      if (tw.world !== "spectrum") return;
      var a = Math.sin(phase) * 0.04;
      el.style.textShadow = a.toFixed(3) + "em 0.028em 0 oklch(0.72 0.24 350 / 0.55), " + (-a).toFixed(3) + "em -0.024em 0 oklch(0.8 0.16 230 / 0.55)";
    });
    var activeStep = Math.floor(progress * 8);
    p.querySelectorAll(".forward-node, .forward-edge").forEach(function (el) {
      el.classList.toggle("is-hot", Number(el.dataset.step) <= activeStep);
    });
  }

  function applyPosterState(p, state, frameIndex, frameCount, deterministic) {
    applyVars(p, state);
    var spec = state.world === "spectrum";
    p.classList.toggle("spectrum", spec);
    var social = p.classList.contains("social-board");
    var riskMotion = p.classList.contains("risk-motion-board");
    var moving = spec && (social || riskMotion) && state.motion !== "off";
    p.classList.toggle("moving", moving && !deterministic);
    var shift = Number(p.dataset.shift) || 0;
    var wash = p.querySelector(".wash");
    if (wash) {
      wash.classList.toggle("animate", moving && !deterministic);
      wash.style.transform = "";
      if (moving && !deterministic) {
        wash.style.filter = "";
        wash.style.animationDelay = (-(shift / 360) * 14) + "s, 0s";
      } else {
        wash.style.animationDelay = "";
        wash.style.filter = shift ? "hue-rotate(" + shift + "deg)" : "";
      }
    }
    p.querySelectorAll(".ghostable").forEach(function (g) {
      g.classList.toggle("ghost", spec);
      g.classList.toggle("animate", moving && !deterministic);
      if (!deterministic) g.style.textShadow = "";
    });
    p.querySelectorAll(".p-subline, .p-subline-inline").forEach(function (s) {
      s.textContent = P_SUBLINES[state.subline];
    });
    if (deterministic) applyDeterministicFrame(p, frameIndex || 0, frameCount || 1);
  }

  function renderTemplateInto(target, design, frameIndex, frameCount, deterministic) {
    target.style.width = design.w + "px";
    target.style.height = design.h + "px";
    target.innerHTML = design.render();
    var poster = target.querySelector(".poster");
    if (poster) applyPosterState(poster, tw, frameIndex, frameCount, deterministic);
    return poster;
  }

  /* ---- design rail ---- */
  function renderRail() {
    var rail = document.getElementById("template-rail");
    if (!rail) return;
    rail.innerHTML = "";
    DESIGNS.forEach(function (d) {
      var btn = document.createElement("button");
      btn.type = "button";
      btn.className = "template-chip" + (d.id === currentDesignId ? " on" : "");
      btn.dataset.design = d.id;
      btn.innerHTML = '<span class="tc-code">' + d.code + '</span>'
        + '<b>' + d.label + '</b>'
        + '<small>' + d.group + ' · ' + d.aspect + '</small>';
      rail.appendChild(btn);
    });
  }

  /* ---- live preview ---- */
  function renderPreview() {
    var art = document.getElementById("poster-preview-art");
    var stage = document.getElementById("poster-preview-stage");
    if (!art || !stage) return;
    var d = designById(currentDesignId);
    stage.dataset.w = d.w;
    stage.dataset.h = d.h;
    var lab = document.getElementById("poster-preview-label");
    var sz = document.getElementById("poster-preview-size");
    if (lab) lab.textContent = d.label;
    if (sz) sz.textContent = d.webW + "×" + d.webH;
    renderTemplateInto(art, d, null, null, false);
    fitBoards();
  }

  /* ---- download panel ---- */
  function generateMarkup(d) {
    return '<div class="gen-controls">'
      + '<div class="gen-row">'
      + '<label class="gen-field"><span>Size</span>'
      + '<select id="gif-size"><option value="web"' + (genState.size === "web" ? " selected" : "") + '>Web — ' + d.webW + '×' + d.webH + '</option>'
      + '<option value="x2"' + (genState.size === "x2" ? " selected" : "") + '>2× — ' + d.x2W + '×' + d.x2H + '</option></select></label>'
      + '<label class="gen-field"><span>Length</span>'
      + '<select id="gif-length"><option value="short"' + (genState.length === "short" ? " selected" : "") + '>Short — 8f</option>'
      + '<option value="standard"' + (genState.length === "standard" ? " selected" : "") + '>Standard — 14f</option></select></label>'
      + '</div>'
      + '<label class="gen-field"><span>File name</span><input id="gif-name" type="text" autocomplete="off" value="' + genState.name + '"></label>'
      + '<button class="btn btn-primary btn-sm" type="button" id="gif-generate">Generate GIF</button>'
      + '<p class="gen-status" id="gif-status" role="status" aria-live="polite">In-browser · no upload · downloads locally.</p>'
      + '</div>';
  }

  function downloadGrid(d) {
    var f = d.files, s = f.sizes;
    return '<div class="dl-grid">'
      + '<a class="dl-btn" download href="' + f.gif + '">GIF<small>' + s.gif + '</small></a>'
      + '<a class="dl-btn" download href="' + f.gif2x + '">GIF 2×<small>' + s.gif2x + '</small></a>'
      + '<a class="dl-btn" download href="' + f.mp4 + '">MP4<small>' + s.mp4 + '</small></a>'
      + '<a class="dl-btn" download href="' + f.mp42x + '">MP4 2×<small>' + s.mp42x + '</small></a>'
      + '</div>';
  }

  function renderDownload() {
    var host = document.getElementById("download-body");
    if (!host || busy) return;
    var d = designById(currentDesignId);
    var html = "";

    if (!d.files) {
      /* generate-only design */
      html = '<p class="dl-note">No pre-rendered file for this design — generate a GIF of the live preview.</p>'
        + generateMarkup(d);
    } else if (isDefaultStyle()) {
      /* finished files match the current (default) look */
      html = '<p class="dl-note"><b>Finished exports.</b> Ready-made files for this design — GIF &amp; MP4, web and 2× tiers.</p>'
        + downloadGrid(d);
      if (genState.open) {
        html += '<div class="gen-wrap">' + generateMarkup(d) + '</div>';
        html += '<button class="dl-toggle" type="button" id="gen-toggle" data-open="1">Hide custom GIF</button>';
      } else {
        html += '<button class="dl-toggle" type="button" id="gen-toggle" data-open="0">Make a custom GIF →</button>';
      }
    } else {
      /* tuned look — finished files no longer match */
      html = '<p class="dl-note dl-warn"><b>Tuned look.</b> The finished files match the default style, not your changes. Generate to capture this look — or <a href="#" id="reset-style">reset the style</a> to grab the ready-made files.</p>'
        + generateMarkup(d);
    }

    host.innerHTML = html;
    bindDownload();
  }

  function bindDownload() {
    var host = document.getElementById("download-body");
    if (!host) return;
    var sizeSel = host.querySelector("#gif-size");
    if (sizeSel) sizeSel.addEventListener("change", function () { genState.size = sizeSel.value; });
    var lenSel = host.querySelector("#gif-length");
    if (lenSel) lenSel.addEventListener("change", function () { genState.length = lenSel.value; });
    var nameInput = host.querySelector("#gif-name");
    if (nameInput) nameInput.addEventListener("input", function () { genState.name = nameInput.value; });
    var gen = host.querySelector("#gif-generate");
    if (gen) gen.addEventListener("click", generateGif);
    var toggle = host.querySelector("#gen-toggle");
    if (toggle) toggle.addEventListener("click", function () { genState.open = toggle.dataset.open !== "1"; renderDownload(); });
    var reset = host.querySelector("#reset-style");
    if (reset) reset.addEventListener("click", function (e) { e.preventDefault(); resetStyle(); });
  }

  function resetStyle() {
    tw = Object.assign({}, DEFAULTS);
    syncControlsUI();
    render();
  }

  /* ---- GIF generation ---- */
  function outputSizeFor(d) {
    if (genState.size === "x2") return { key: "2x", w: d.x2W, h: d.x2H };
    return { key: "web", w: d.webW, h: d.webH };
  }
  function frameSpec(d) {
    if (genState.length === "short") return { frames: d.shortFrames, delay: d.delayMs + 10 };
    return { frames: d.standardFrames, delay: d.delayMs };
  }
  function setGifStatus(text) {
    var el = document.getElementById("gif-status");
    if (el) el.textContent = text;
  }

  function cloneStyled(src) {
    if (src.nodeType === 3) return document.createTextNode(src.nodeValue);
    if (src.nodeType !== 1 || src.tagName === "SCRIPT") return document.createTextNode("");
    var dst = src.cloneNode(false);
    var cs = getComputedStyle(src);
    var txt = "";
    for (var i = 0; i < cs.length; i++) txt += cs[i] + ":" + cs.getPropertyValue(cs[i]) + ";";
    dst.setAttribute("style", txt + "animation:none!important;transition:none!important;");
    for (var c = src.firstChild; c; c = c.nextSibling) dst.appendChild(cloneStyled(c));
    return dst;
  }

  function rasterizePoster(node, sourceW, sourceH, outW, outH) {
    return new Promise(function (resolve, reject) {
      try {
        var clone = cloneStyled(node);
        clone.setAttribute("xmlns", "http://www.w3.org/1999/xhtml");
        var xml = new XMLSerializer().serializeToString(clone);
        var svg = '<svg xmlns="http://www.w3.org/2000/svg" width="' + outW + '" height="' + outH + '" viewBox="0 0 ' + sourceW + " " + sourceH + '"><foreignObject width="' + sourceW + '" height="' + sourceH + '">' + xml + "</foreignObject></svg>";
        var img = new Image();
        img.onload = function () {
          var canvas = document.createElement("canvas");
          canvas.width = outW; canvas.height = outH;
          var ctx = canvas.getContext("2d", { willReadFrequently: true });
          ctx.drawImage(img, 0, 0, outW, outH);
          resolve(ctx.getImageData(0, 0, outW, outH).data);
        };
        img.onerror = function () { reject(new Error("Could not rasterize poster frame.")); };
        img.src = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg);
      } catch (err) { reject(err); }
    });
  }

  function downloadBytes(filename, bytes, type) {
    var blob = new Blob([bytes], { type: type });
    var link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    link.remove();
    setTimeout(function () { URL.revokeObjectURL(link.href); }, 1000);
  }

  async function generateGif() {
    if (!window.encodeGIF) { setGifStatus("Error: GIF encoder did not load."); return; }
    var btn = document.getElementById("gif-generate");
    var d = designById(currentDesignId);
    var out = outputSizeFor(d);
    var spec = frameSpec(d);
    var filename = fileStem(genState.name) + "-" + d.id + "-" + out.key + ".gif";
    var bin = document.getElementById("gif-capture-bin");
    var art = document.createElement("div");
    art.className = "capture-art";
    bin.innerHTML = "";
    bin.appendChild(art);
    busy = true;
    if (btn) btn.disabled = true;
    try {
      if (document.fonts && document.fonts.ready) await document.fonts.ready;
      var frames = [];
      for (var i = 0; i < spec.frames; i++) {
        setGifStatus("Capturing frame " + (i + 1) + " of " + spec.frames + "…");
        var poster = renderTemplateInto(art, d, i, spec.frames, true);
        await new Promise(function (resolve) { requestAnimationFrame(function () { requestAnimationFrame(resolve); }); });
        var rgba = await rasterizePoster(poster, d.w, d.h, out.w, out.h);
        frames.push({ rgba: rgba });
      }
      setGifStatus("Encoding GIF…");
      await new Promise(function (resolve) { setTimeout(resolve, 20); });
      var bytes = window.encodeGIF(frames, { width: out.w, height: out.h, delayMs: spec.delay, loop: 0 });
      downloadBytes(filename, bytes, "image/gif");
      setGifStatus("Ready: downloaded " + filename + " (" + out.w + "×" + out.h + ").");
    } catch (err) {
      console.error(err);
      setGifStatus("Error: " + (err && err.message ? err.message : "GIF generation failed."));
    } finally {
      if (btn) btn.disabled = false;
      bin.innerHTML = "";
      busy = false;
    }
  }

  /* ---- controls UI sync ---- */
  function syncControlsUI() {
    document.querySelectorAll("#controls .seg, .adv-controls .seg").forEach(function (seg) {
      var k = seg.dataset.k;
      seg.querySelectorAll("button").forEach(function (b) { b.classList.toggle("on", b.dataset.v === tw[k]); });
    });
    document.querySelectorAll("#controls select[data-k], .adv-controls select[data-k]").forEach(function (sel) {
      sel.value = tw[sel.dataset.k];
    });
  }

  /* ---- master render ---- */
  function render() {
    renderRail();
    renderPreview();
    renderDownload();
  }

  /* ---- wiring ---- */
  function wireControls() {
    document.querySelectorAll("#controls, .adv-controls").forEach(function (group) {
      group.addEventListener("click", function (e) {
        var btn = e.target.closest("button[data-v]");
        if (!btn) return;
        var seg = btn.closest(".seg");
        tw[seg.dataset.k] = btn.dataset.v;
        seg.querySelectorAll("button").forEach(function (b) { b.classList.toggle("on", b === btn); });
        render();
      });
      group.querySelectorAll("select[data-k]").forEach(function (sel) {
        sel.addEventListener("change", function () { tw[sel.dataset.k] = sel.value; render(); });
      });
    });

    var rail = document.getElementById("template-rail");
    if (rail) rail.addEventListener("click", function (e) {
      var btn = e.target.closest("button[data-design]");
      if (!btn) return;
      currentDesignId = btn.dataset.design;
      genState.open = false;
      render();
    });

    /* layout switcher */
    var ls = document.getElementById("studio-layouts");
    var studio = document.getElementById("studio");
    if (ls && studio) ls.addEventListener("click", function (e) {
      var btn = e.target.closest("button[data-layout]");
      if (!btn) return;
      studio.dataset.layout = btn.dataset.layout;
      ls.querySelectorAll("button").forEach(function (b) { b.classList.toggle("on", b === btn); });
      try { localStorage.setItem("lm-poster-layout", btn.dataset.layout); } catch (err) {}
      requestAnimationFrame(fitBoards);
    });
  }

  function initLayout() {
    var studio = document.getElementById("studio");
    var ls = document.getElementById("studio-layouts");
    if (!studio) return;
    var saved = "split";
    try { saved = localStorage.getItem("lm-poster-layout") || "split"; } catch (e) {}
    studio.dataset.layout = saved;
    if (ls) ls.querySelectorAll("button").forEach(function (b) { b.classList.toggle("on", b.dataset.layout === saved); });
  }

  /* ---- boot ---- */
  initLayout();
  syncControlsUI();
  wireControls();
  render();
  fitBoards();
  window.addEventListener("load", fitBoards);

  window.LMCampPoster = { render: render, generateGif: generateGif, designs: DESIGNS };
})();
