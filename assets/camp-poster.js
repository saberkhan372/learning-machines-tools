(function () {
  "use strict";

  /* ---- palette logic (ported verbatim from the handoff prototype) ---- */
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

  /* ---- motif builders (deterministic, ported) ---- */
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
      + '<div class="cell"><span class="k">Register</span><span class="v">ccfest.rocks<small>interest form due July 4</small></span></div>'
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

  /* ---- boards ---- */
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

  function boardSessions() {
    var bands = [
      { no: "01", label: "Session 01 · Sat July 11", word: "Text", ink: "--itext",
        q: "How do language models generate text that feels meaningful? Tokens, probability, temperature.",
        motif: probBars("--itext") },
      { no: "02", label: "Session 02 · Sat July 18", word: "Images", ink: "--iimage",
        q: "What is an image model actually working with? Diffusion, defaults, and vague prompts.",
        motif: noiseGrid("--iimage", 13, 7, 13) },
      { no: "03", label: "Session 03 · Sat July 25", word: "Video", ink: "--ivideo",
        q: "What changes when generation has to work across time? Drift, coherence, and motion.",
        motif: filmFrames("--ivideo", "--ivideo-tint", 56, 44) }
    ];
    var html = '<div class="poster" data-shift="40" style="padding:54px 60px 52px; display:flex; flex-direction:column;">'
      + '<div class="wash"></div>'
      + '<div style="display:flex; justify-content:space-between; align-items:baseline;">'
      + '<span class="eyebrow">CC Fest · Summer 2026</span><span class="eyebrow" style="color:var(--pink);">Free · Virtual · Beginner-friendly</span></div>'
      + '<div class="rule-strong" style="margin:16px 0 0;"></div>'
      + '<h1 class="display ghostable" style="font-size:84px; margin:40px 0 14px;">Learning Machines</h1>'
      + '<p class="p-subline" style="font-size:20px; line-height:1.45; color:var(--psoft); max-width:52ch; margin:0;"></p>'
      + '<div style="height:34px;"></div>';
    bands.forEach(function (b) {
      html += '<div class="band" style="--band-ink: var(' + b.ink + ');">'
        + '<span class="bno">' + b.no + "</span><div>"
        + '<h2 class="bword">' + b.word + "</h2>"
        + '<p class="bq">' + b.q + "</p>"
        + '<p class="bdate">' + b.label + " · 9–11 am PT</p></div>"
        + '<div style="justify-self:end;">' + b.motif + "</div></div>";
    });
    html += '<div style="border-top:1px solid var(--prule); padding:16px 0 0;">'
      + '<p class="mono" style="font-size:13.5px; color:var(--pmuted); margin:0;">+ optional studio — showcase what you made, found, or critiqued. No coding required. No-AI pathways for every activity.</p></div>'
      + '<div style="flex:1;"></div>' + infoFooter() + "</div>";
    return html;
  }

  function boardDiagram() {
    var dist = [["machines", 41], ["models", 23], ["minds", 14], ["magic", 8]];
    return '<div class="poster" data-shift="300" style="padding:54px 60px 52px; display:flex; flex-direction:column;">'
      + '<div class="wash"></div>'
      + '<div style="display:flex; justify-content:space-between; align-items:baseline;">'
      + '<span class="eyebrow">CC Fest · Creative AI Camp · Summer 2026</span><span class="eyebrow" style="color:var(--pink);">Field Notes №1</span></div>'
      + '<div class="rule-strong" style="margin:16px 0 40px;"></div>'
      + '<div class="plate-c" style="padding:46px 42px 32px;">'
      + '<div style="display:flex; align-items:center; gap:20px;">'
      + '<span class="diag-chip" style="--chip-ink: var(--psoft); --chip-tint: transparent; font-size:17px;">learning</span>'
      + '<span class="diag-arrow" style="font-size:22px;">→</span>'
      + '<span class="diag-chip" style="--chip-ink: var(--icross); --chip-tint: var(--icross-tint); padding:18px 22px; font-size:19px;">model\n<span style="font-weight:400; font-size:13px; opacity:0.8;">(learned patterns)</span></span>'
      + '<span class="diag-arrow" style="font-size:22px;">→</span>'
      + '<div style="flex:1; min-width:300px;">' + probBars("--itext", dist, true) + "</div></div>"
      + '<div class="rule" style="margin:32px 0 14px;"></div>'
      + '<p class="diag-cap" style="margin:0; font-size:13px;">fig. 1 — prediction from learned patterns. the same logic writes text, paints images, and moves video — with different failure modes each time.</p></div>'
      + '<h1 class="display ghostable" style="font-size:96px; margin:48px 0 0;">What is the machine <span style="color:var(--icross);">actually</span> doing?</h1>'
      + '<p style="font-size:21px; line-height:1.5; color:var(--psoft); max-width:50ch; margin:26px 0 0;"><b style="color:var(--pink);">Learning Machines: Text, Images, Video</b> — <span class="p-subline-inline"></span></p>'
      + '<div style="display:flex; gap:10px; margin:26px 0 0;">'
      + ["text", "image", "video"].map(function (k, i) {
          var w = ["Text", "Images", "Video"][i];
          return '<span class="mono" style="font-size:13.5px; font-weight:600; letter-spacing:0.08em; text-transform:uppercase; color:var(--i' + k + "); background:var(--i" + k + '-tint); border:1px solid var(--i' + k + '); padding:7px 12px;">' + w + "</span>";
        }).join("")
      + "</div>"
      + '<div style="flex:1;"></div>' + infoFooter() + "</div>";
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
      + '<span class="mono" style="font-size:15.5px; color:var(--pmuted); text-align:right; line-height:1.65; white-space:nowrap;">free · virtual · beginner-friendly<br>register → ccfest.rocks · form due July 4</span></div></div>';
  }

  function boardTemperature() {
    var rows = [
      { t: "T = 0.1", s: "Learning Machines", c: "var(--pink)", cls: "" },
      { t: "T = 0.5", s: "Learning Machnies", c: "var(--itext)", cls: "" },
      { t: "T = 0.9", s: "Learnig Mashines", c: "var(--ivideo)", cls: " hot" },
      { t: "T = 1.3", s: "Laerning Machines", c: "var(--iimage)", cls: "" },
      { t: "T = 1.7", s: "L3arning M4chines", c: "var(--icross)", cls: "" },
      { t: "T = 2.0", s: "Lrn1ng_M%ch!n3s", c: "oklch(0.62 0.26 350)", cls: "" }
    ];
    var html = '<div class="poster" data-shift="90" style="padding:54px 60px 52px; display:flex; flex-direction:column;">'
      + '<div class="wash"></div>'
      + '<div style="display:flex; justify-content:space-between; align-items:baseline;">'
      + '<span class="eyebrow">CC Fest · Creative AI Camp · Summer 2026</span><span class="eyebrow" style="color:var(--pink);">sampling, temperature rising</span></div>'
      + '<div class="rule-strong" style="margin:16px 0 48px;"></div>'
      + '<div class="poster-temp-stack">';
    rows.forEach(function (r) {
      html += '<div class="poster-temp-row' + r.cls + '"><span class="tlabel">' + r.t + '</span>'
        + '<span class="display" style="font-size:64px;color:' + r.c + ';white-space:nowrap;">' + r.s + "</span></div>";
    });
    html += "</div>"
      + '<p class="diag-cap" style="margin:26px 0 0;">fig. 4 — the same model, sampled at rising temperature. too cold is boring; too hot is noise. we will be working around T = 0.9.</p>'
      + '<div style="flex:1;"></div>'
      + '<p style="font-size:22px; line-height:1.45; color:var(--psoft); max-width:46ch; margin:0;"><span class="p-subline-inline"></span> <b style="color:var(--pink);">Text · Images · Video.</b></p>'
      + '<div style="height:40px;"></div>' + infoFooter() + "</div>";
    return html;
  }

  function boardSelfWriting() {
    var title = [
      { t: "Learn", p: ".41", ink: "--itext", d: "0s" },
      { t: "ing", p: ".87", ink: "--iimage", d: "0.18s" },
      { t: " Mach", p: ".34", ink: "--ivideo", d: "0.36s" },
      { t: "ines", p: ".92", ink: "--icross", d: "0.54s" }
    ];
    var body = "a free creative AI camp - text, images, video - for educators, artists, students &amp; curious learners.".split(" ");
    var html = '<div class="poster risk-motion-board" data-shift="180" style="padding:54px 60px 52px; display:flex; flex-direction:column;">'
      + '<div class="wash"></div>'
      + '<div style="display:flex; justify-content:space-between; align-items:baseline;">'
      + '<span class="eyebrow">CC Fest · Summer 2026</span><span class="eyebrow" style="color:var(--itext);">generating... · done loop · temp 0.9</span></div>'
      + '<div class="rule-strong" style="margin:16px 0 56px;"></div>'
      + '<div class="selfwrite-title">';
    title.forEach(function (tok) {
      html += '<span class="selfwrite-token" style="--wd:' + tok.d + ';"><span class="display" style="font-size:124px;color:var(' + tok.ink + ');">' + tok.t + '</span><span class="prob">p=' + tok.p + "</span></span>";
    });
    html += "</div>"
      + '<div style="height:40px;"></div>'
      + '<p class="selfwrite-body">';
    body.forEach(function (word, i) {
      html += '<span class="word" style="--wd:' + (0.9 + i * 0.13).toFixed(2) + 's;">' + word + " </span>";
    });
    html += '<span class="selfwrite-cursor" aria-hidden="true"></span></p>'
      + '<p class="diag-cap" style="margin:26px 0 0; color:var(--itext);">fig. 7 — this poster, generating itself one token at a time. each word: a guess with a probability attached.</p>'
      + '<div style="flex:1;"></div>' + infoFooter() + "</div>";
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
      + '<span class="mono" style="font-size:22px; color:var(--pmuted); text-align:right; line-height:1.7; white-space:nowrap;">free · virtual · beginner-friendly<br>register → ccfest.rocks</span></div></div>';
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
      + '<p class="mono" style="font-size:27px; font-weight:600; margin:0;">Register → ccfest.rocks</p>'
      + '<p class="mono" style="font-size:20px; color:var(--pmuted); margin:12px 0 0;">interest form due July 4 · no coding required</p></div></div>';
    return html;
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

  function boardTerminal() {
    return '<div class="poster risk-motion-board" data-shift="0" style="background:#0a0f0a;color:#46ff7d;padding:52px 56px;display:flex;flex-direction:column;">'
      + '<div class="term-scan"></div>'
      + '<p class="mono" style="font-family:\'IBM Plex Mono\',monospace;font-size:27px;line-height:1.35;margin:0;color:rgba(70,255,125,0.55);">ccfest@summer:~$ run learning-machines --year 2026</p>'
      + '<p class="mono" style="font-family:\'IBM Plex Mono\',monospace;font-size:27px;line-height:1.35;margin:0;color:rgba(70,255,125,0.55);">loading curriculum .......... ok</p>'
      + '<div style="flex:0.8;"></div>'
      + '<h1 class="term-glow" style="font-family:\'IBM Plex Mono\',monospace;font-size:130px;line-height:0.92;margin:0;letter-spacing:0.01em;">LEARNING<br>MACHINES<span class="cursor" style="margin-left:14px;"></span></h1>'
      + '<div style="flex:0.8;"></div>'
      + '<p class="mono" style="font-size:24px;line-height:1.45;margin:0;color:rgba(70,255,125,0.55);">&gt; a free creative AI camp. no coding required.</p>'
      + '<div style="height:22px;"></div>'
      + '<p class="mono" style="font-size:25px;line-height:1.35;margin:0;">[01] TEXT&nbsp;&nbsp;&nbsp;&nbsp;jul 11&nbsp;&nbsp;tokens, probability, temperature</p>'
      + '<p class="mono" style="font-size:25px;line-height:1.35;margin:0;">[02] IMAGES&nbsp;&nbsp;jul 18&nbsp;&nbsp;diffusion, noise, defaults</p>'
      + '<p class="mono" style="font-size:25px;line-height:1.35;margin:0;">[03] VIDEO&nbsp;&nbsp;&nbsp;jul 25&nbsp;&nbsp;motion, drift, coherence</p>'
      + '<div style="height:26px;"></div>'
      + '<p class="mono term-glow" style="font-size:34px;line-height:1.35;margin:0;">&gt;&gt; register: ccfest.rocks&nbsp;&nbsp;[form due jul 4]</p>'
      + "</div>";
  }

  function boardZine() {
    return '<div class="poster spectrum risk-motion-board" data-shift="120" style="background:#f2ebdc;color:#1c0e24;padding:52px 56px;display:flex;flex-direction:column;">'
      + '<div class="wash"></div>'
      + '<div style="display:flex;justify-content:space-between;align-items:flex-start;">'
      + '<span class="sticker mono" style="--rot:-3deg;background:#1c0e24;color:#f2ebdc;font-size:16px;font-weight:600;letter-spacing:0.12em;">CC FEST · SUMMER 2026</span>'
      + '<span class="sticker" style="--rot:4deg;background:oklch(0.9 0.22 125);color:#1c0e24;font-family:\'Archivo\',sans-serif;font-size:34px;font-weight:800;">FREE</span></div>'
      + '<div style="flex:1;"></div>'
      + '<h1 class="ghostable" style="font-family:\'Archivo\',sans-serif;font-size:132px;font-weight:800;line-height:0.98;margin:0;transform:rotate(-2deg);color:#1c0e24;">LEARNING<br>MACHINES</h1>'
      + '<div style="height:30px;"></div>'
      + '<div style="display:flex;gap:18px;flex-wrap:wrap;">'
      + '<span class="sticker mono" style="--rot:-2deg;background:#fff;font-size:19px;font-weight:600;">TEXT — JUL 11</span>'
      + '<span class="sticker mono" style="--rot:3deg;background:#fff;font-size:19px;font-weight:600;">IMAGES — JUL 18</span>'
      + '<span class="sticker mono" style="--rot:-4deg;background:#fff;font-size:19px;font-weight:600;">VIDEO — JUL 25</span></div>'
      + '<div style="flex:1;"></div>'
      + '<p class="p-subline" style="font-family:\'Archivo\',sans-serif;font-size:22px;font-weight:600;line-height:1.4;max-width:36ch;margin:0;transform:rotate(-1deg);"></p>'
      + '<div style="height:26px;"></div>'
      + '<div style="display:flex;justify-content:space-between;align-items:flex-end;">'
      + '<span class="sticker mono" style="--rot:2deg;background:#1c0e24;color:#f2ebdc;font-size:21px;font-weight:600;">SATURDAYS 9–11 AM PT</span>'
      + '<span class="sticker mono" style="--rot:-3deg;background:oklch(0.62 0.26 350);color:#fff;font-size:21px;font-weight:600;">CCFEST.ROCKS →</span></div></div>';
  }

  function boardTokenReveal() {
    var words = "Free creative AI camp for people who want to inspect the machine, not just prompt it.".split(" ");
    var html = '<div class="poster risk-motion-board token-reveal-board" data-shift="180" style="padding:54px 60px 52px;display:flex;flex-direction:column;">'
      + '<div class="wash"></div>'
      + '<div style="display:flex;justify-content:space-between;align-items:baseline;">'
      + '<span class="eyebrow">CC Fest · Summer 2026</span><span class="eyebrow" style="color:var(--itext);">token reveal · deterministic</span></div>'
      + '<div class="rule-strong" style="margin:16px 0 52px;"></div>'
      + '<h1 class="display ghostable" style="font-size:118px;margin:0;color:var(--plead);">Learning<br>Machines</h1>'
      + '<div style="height:36px;"></div><p class="selfwrite-body" style="font-size:32px;max-width:34ch;">';
    words.forEach(function (word, i) {
      html += '<span class="word" data-step="' + i + '">' + word + " </span>";
    });
    html += '<span class="selfwrite-cursor" aria-hidden="true"></span></p>'
      + '<p class="diag-cap" style="margin:26px 0 0;color:var(--itext);">fig. 9 — words arrive as a sequence of confident guesses.</p>'
      + '<div style="flex:1;"></div>' + tokenStrip() + '<div style="height:34px;"></div>' + infoFooter() + "</div>";
    return html;
  }

  var ANIMATED_EXPORTS = [
    { id: "mosh", code: "D", name: "Dropped keyframe", aspect: "letter", desc: "Glitch slices over the datamosh wash.", dims: "GIF 417×540 · MP4 416×540 · 2x 834×1080", cls: "", editable: true, downloads: { gif: "../export/gifs/mosh.gif", gif2x: "../export/gifs-2x/mosh.gif", mp4: "../export/mp4/mosh.mp4", mp42x: "../export/mp4-2x/mosh.mp4" } },
    { id: "slitscan", code: "H", name: "Slit-scan", aspect: "letter", desc: "Title pulled apart as frame columns.", dims: "GIF 417×540 · MP4 416×540 · 2x 834×1080", cls: "", editable: false, downloads: { gif: "../export/gifs/slitscan.gif", gif2x: "../export/gifs-2x/slitscan.gif", mp4: "../export/mp4/slitscan.mp4", mp42x: "../export/mp4-2x/slitscan.mp4" } },
    { id: "signal", code: "I", name: "Raw signal", aspect: "letter", desc: "Color signal columns under a slow hue cycle.", dims: "GIF 417×540 · MP4 416×540 · 2x 834×1080", cls: "", editable: false, downloads: { gif: "../export/gifs/signal.gif", gif2x: "../export/gifs-2x/signal.gif", mp4: "../export/mp4/signal.mp4", mp42x: "../export/mp4-2x/signal.mp4" } },
    { id: "forward", code: "M", name: "Forward pass", aspect: "letter", desc: "Network nodes and edges firing in sequence.", dims: "GIF 417×540 · MP4 416×540 · 2x 834×1080", cls: "", editable: true, downloads: { gif: "../export/gifs/forward.gif", gif2x: "../export/gifs-2x/forward.gif", mp4: "../export/mp4/forward.mp4", mp42x: "../export/mp4-2x/forward.mp4" } },
    { id: "terminal", code: "K", name: "Terminal", aspect: "letter", desc: "Phosphor command line with cursor pulse.", dims: "GIF 417×540 · MP4 416×540 · 2x 834×1080", cls: "", editable: true, downloads: { gif: "../export/gifs/terminal.gif", gif2x: "../export/gifs-2x/terminal.gif", mp4: "../export/mp4/terminal.mp4", mp42x: "../export/mp4-2x/terminal.mp4" } },
    { id: "zine", code: "L", name: "Zine chaos", aspect: "letter", desc: "Sticker collage over spectrum motion.", dims: "GIF 417×540 · MP4 416×540 · 2x 834×1080", cls: "", editable: true, downloads: { gif: "../export/gifs/zine.gif", gif2x: "../export/gifs-2x/zine.gif", mp4: "../export/mp4/zine.mp4", mp42x: "../export/mp4-2x/zine.mp4" } },
    { id: "selfwriting", code: "N", name: "Writes itself", aspect: "letter", desc: "Poster copy generated token by token.", dims: "GIF 417×540 · MP4 416×540 · 2x 834×1080", cls: "", editable: true, downloads: { gif: "../export/gifs/selfwriting.gif", gif2x: "../export/gifs-2x/selfwriting.gif", mp4: "../export/mp4/selfwriting.mp4", mp42x: "../export/mp4-2x/selfwriting.mp4" } },
    { id: "wordbyword", code: "DD", name: "Word by word", aspect: "letter", desc: "Prompt guidance revealed one word at a time.", dims: "GIF 417×540 · MP4 416×540 · 2x 834×1080", cls: "", editable: true, downloads: { gif: "../export/gifs/wordbyword.gif", gif2x: "../export/gifs-2x/wordbyword.gif", mp4: "../export/mp4/wordbyword.mp4", mp42x: "../export/mp4-2x/wordbyword.mp4" } },
    { id: "square", code: "IG", name: "Social square", aspect: "square", desc: "Instagram square with animated spectrum wash.", dims: "540×540 · 1080×1080", cls: "square", editable: true, downloads: { gif: "../export/gifs/square.gif", gif2x: "../export/gifs-2x/square.gif", mp4: "../export/mp4/square.mp4", mp42x: "../export/mp4-2x/square.mp4" } },
    { id: "story", code: "9:16", name: "Social story", aspect: "story", desc: "Vertical story format with animated wash.", dims: "304×540 · 608×1080", cls: "tall", editable: true, downloads: { gif: "../export/gifs/story.gif", gif2x: "../export/gifs-2x/story.gif", mp4: "../export/mp4/story.mp4", mp42x: "../export/mp4-2x/story.mp4" } }
  ];

  var GIF_TEMPLATES = [
    { id: "clean", label: "Field Letter", code: "A", aspect: "letter", editable: true, w: 850, h: 1100, webW: 417, webH: 540, x2W: 834, x2H: 1080, shortFrames: 8, standardFrames: 14, delayMs: 110, render: boardSignage },
    { id: "mosh", label: "Dropped Keyframe", code: "D", aspect: "letter", editable: true, w: 850, h: 1100, webW: 417, webH: 540, x2W: 834, x2H: 1080, shortFrames: 8, standardFrames: 14, delayMs: 110, render: boardDroppedKeyframe },
    { id: "forward", label: "Forward Pass", code: "M", aspect: "letter", editable: true, w: 850, h: 1100, webW: 417, webH: 540, x2W: 834, x2H: 1080, shortFrames: 8, standardFrames: 14, delayMs: 110, render: boardForwardPass },
    { id: "terminal", label: "Terminal", code: "K", aspect: "letter", editable: true, w: 850, h: 1100, webW: 417, webH: 540, x2W: 834, x2H: 1080, shortFrames: 8, standardFrames: 14, delayMs: 110, render: boardTerminal },
    { id: "zine", label: "Zine Chaos", code: "L", aspect: "letter", editable: true, w: 850, h: 1100, webW: 417, webH: 540, x2W: 834, x2H: 1080, shortFrames: 8, standardFrames: 14, delayMs: 110, render: boardZine },
    { id: "token", label: "Token Reveal", code: "T", aspect: "letter", editable: true, w: 850, h: 1100, webW: 417, webH: 540, x2W: 834, x2H: 1080, shortFrames: 8, standardFrames: 14, delayMs: 110, render: boardTokenReveal },
    { id: "square", label: "Social Square", code: "IG", aspect: "square", editable: true, w: 1080, h: 1080, webW: 540, webH: 540, x2W: 1080, x2H: 1080, shortFrames: 8, standardFrames: 14, delayMs: 110, render: boardSquare },
    { id: "story", label: "Social Story", code: "9:16", aspect: "story", editable: true, w: 1080, h: 1920, webW: 304, webH: 540, x2W: 608, x2H: 1080, shortFrames: 8, standardFrames: 14, delayMs: 110, render: boardStory }
  ];

  var currentTemplateId = "forward";

  function fileStem(s) {
    return String(s || "learning-machines")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "") || "learning-machines";
  }

  function renderExportCards() {
    var grid = document.getElementById("animated-export-grid");
    if (!grid) return;
    grid.innerHTML = "";
    ANIMATED_EXPORTS.forEach(function (item) {
      var card = document.createElement("article");
      card.className = "anim-card" + (item.cls ? " " + item.cls : "");
      card.innerHTML =
        '<div class="anim-preview"><img loading="lazy" src="' + item.downloads.gif + '" alt="' + item.name + ' animated poster preview"></div>'
        + '<div class="anim-body">'
        + '<h3 class="anim-title"><span class="anim-code">' + item.code + '</span><span>' + item.name + '</span></h3>'
        + '<p class="anim-desc">' + item.desc + '</p>'
        + '<p class="anim-meta">' + item.dims + '</p>'
        + '<div class="download-row">'
        + '<a download href="' + item.downloads.gif + '">GIF</a>'
        + '<a download href="' + item.downloads.gif2x + '">GIF 2x</a>'
        + '<a download href="' + item.downloads.mp4 + '">MP4</a>'
        + '<a download href="' + item.downloads.mp42x + '">MP4 2x</a>'
        + "</div></div>";
      grid.appendChild(card);
    });
  }

  function templateById(id) {
    for (var i = 0; i < GIF_TEMPLATES.length; i++) {
      if (GIF_TEMPLATES[i].id === id) return GIF_TEMPLATES[i];
    }
    return GIF_TEMPLATES[0];
  }

  function selectedTemplate() {
    var sel = document.getElementById("gif-design");
    return templateById(sel && sel.value ? sel.value : currentTemplateId);
  }

  function outputSizeFor(template) {
    var size = document.getElementById("gif-size").value;
    if (size === "x2") return { key: "2x", w: template.x2W, h: template.x2H };
    return { key: "web", w: template.webW, h: template.webH };
  }

  function frameSpec(template) {
    template = template || selectedTemplate();
    var length = document.getElementById("gif-length").value;
    if (length === "short") return { frames: template.shortFrames, delay: template.delayMs + 10 };
    return { frames: template.standardFrames, delay: template.delayMs };
  }

  function fillMakerSelects() {
    var sel = document.getElementById("gif-design");
    if (sel) {
      sel.innerHTML = "";
      GIF_TEMPLATES.forEach(function (template) {
        var option = document.createElement("option");
        option.value = template.id;
        option.textContent = template.label;
        sel.appendChild(option);
      });
      sel.value = currentTemplateId;
    }
    renderTemplateRail();
  }

  function renderTemplateRail() {
    var rail = document.getElementById("template-rail");
    if (!rail) return;
    rail.innerHTML = "";
    GIF_TEMPLATES.forEach(function (template) {
      var btn = document.createElement("button");
      btn.type = "button";
      btn.className = "template-chip" + (template.id === currentTemplateId ? " on" : "");
      btn.dataset.template = template.id;
      btn.innerHTML = '<span>' + template.code + '</span><b>' + template.label + '</b><small>' + template.aspect + "</small>";
      rail.appendChild(btn);
    });
  }

  function fitBoards() {
    document.querySelectorAll(".stage").forEach(function (st) {
      var w = st.clientWidth;
      var scale = w / Number(st.dataset.w);
      st.style.height = Number(st.dataset.h) * scale + "px";
      st.querySelector(".art").style.transform = "scale(" + scale + ")";
    });
  }
  window.addEventListener("resize", fitBoards);

  /* ---- state + controls ---- */
  var tw = { tone: "paper", voice: "signage", energy: "bright", lead: "tri", subline: "camp", world: "spectrum", motion: "on" };

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
    p.querySelectorAll(".cursor").forEach(function (cursor) {
      cursor.style.opacity = Math.floor(progress * 10) % 2 ? "0" : "1";
    });
    var words = Array.prototype.slice.call(p.querySelectorAll(".token-reveal-board .word"));
    if (words.length) {
      var visible = Math.max(1, Math.ceil(progress * words.length));
      words.forEach(function (word, i) {
        var on = i < visible;
        word.style.opacity = on ? "1" : "0.12";
        word.style.transform = on ? "translateY(0)" : "translateY(5px)";
      });
    }
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

  function renderTemplateInto(target, template, frameIndex, frameCount, deterministic) {
    target.style.width = template.w + "px";
    target.style.height = template.h + "px";
    target.innerHTML = template.render();
    var poster = target.querySelector(".poster");
    if (poster) applyPosterState(poster, tw, frameIndex, frameCount, deterministic);
    return poster;
  }

  function renderPrimaryPreview() {
    var art = document.getElementById("poster-preview-art");
    var stage = document.getElementById("poster-preview-stage");
    if (!art || !stage) return;
    var template = templateById(currentTemplateId);
    var out = outputSizeFor(template);
    stage.dataset.w = template.w;
    stage.dataset.h = template.h;
    document.getElementById("poster-preview-label").textContent = template.label;
    document.getElementById("poster-preview-size").textContent = out.w + "×" + out.h;
    renderTemplateInto(art, template, null, null, false);
  }

  function renderMakerPreview() {
    var art = document.getElementById("gif-preview-art");
    var stage = document.getElementById("gif-preview-stage");
    if (!art || !stage) return;
    var template = selectedTemplate();
    var out = outputSizeFor(template);
    stage.dataset.w = template.w;
    stage.dataset.h = template.h;
    document.getElementById("gif-preview-label").textContent = template.label;
    document.getElementById("gif-preview-size").textContent = out.w + "×" + out.h;
    renderTemplateInto(art, template, 0, frameSpec(template).frames, true);
    fitBoards();
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
    for (var i = 0; i < cs.length; i++) {
      txt += cs[i] + ":" + cs.getPropertyValue(cs[i]) + ";";
    }
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
          canvas.width = outW;
          canvas.height = outH;
          var ctx = canvas.getContext("2d", { willReadFrequently: true });
          ctx.drawImage(img, 0, 0, outW, outH);
          resolve(ctx.getImageData(0, 0, outW, outH).data);
        };
        img.onerror = function () { reject(new Error("Could not rasterize poster frame.")); };
        img.src = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg);
      } catch (err) {
        reject(err);
      }
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
    if (!window.encodeGIF) {
      setGifStatus("Error: GIF encoder did not load.");
      return;
    }
    var btn = document.getElementById("gif-generate");
    var template = selectedTemplate();
    var out = outputSizeFor(template);
    var spec = frameSpec(template);
    var baseName = fileStem(document.getElementById("gif-name").value);
    var filename = baseName + "-" + template.id + "-" + out.key + ".gif";
    var bin = document.getElementById("gif-capture-bin");
    var art = document.createElement("div");
    art.className = "capture-art";
    bin.innerHTML = "";
    bin.appendChild(art);
    btn.disabled = true;
    try {
      if (document.fonts && document.fonts.ready) await document.fonts.ready;
      var frames = [];
      for (var i = 0; i < spec.frames; i++) {
        setGifStatus("Capturing frame " + (i + 1) + " of " + spec.frames + "…");
        var poster = renderTemplateInto(art, template, i, spec.frames, true);
        await new Promise(function (resolve) { requestAnimationFrame(function () { requestAnimationFrame(resolve); }); });
        var rgba = await rasterizePoster(poster, template.w, template.h, out.w, out.h);
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
      btn.disabled = false;
      bin.innerHTML = "";
    }
  }

  function render() {
    document.querySelectorAll(".poster").forEach(function (p) {
      if (p.closest(".capture-bin")) return;
      applyPosterState(p, tw, null, null, false);
    });
    renderPrimaryPreview();
    renderMakerPreview();
    renderTemplateRail();
  }

  document.getElementById("controls").addEventListener("click", function (e) {
    var btn = e.target.closest("button[data-v]");
    if (!btn) { return; }
    var seg = btn.closest(".seg");
    tw[seg.dataset.k] = btn.dataset.v;
    seg.querySelectorAll("button").forEach(function (b) { b.classList.toggle("on", b === btn); });
    render();
  });
  document.querySelectorAll("#controls select").forEach(function (sel) {
    sel.addEventListener("change", function () { tw[sel.dataset.k] = sel.value; render(); });
  });

  var rail = document.getElementById("template-rail");
  if (rail) {
    rail.addEventListener("click", function (e) {
      var btn = e.target.closest("button[data-template]");
      if (!btn) return;
      currentTemplateId = btn.dataset.template;
      var sel = document.getElementById("gif-design");
      if (sel) sel.value = currentTemplateId;
      render();
    });
  }

  ["gif-design", "gif-size", "gif-length"].forEach(function (id) {
    var el = document.getElementById(id);
    if (el) el.addEventListener("change", function () {
      if (id === "gif-design") currentTemplateId = el.value;
      render();
    });
  });
  var generateBtn = document.getElementById("gif-generate");
  if (generateBtn) generateBtn.addEventListener("click", generateGif);

  renderExportCards();
  fillMakerSelects();
  render();
  fitBoards();
  window.addEventListener("load", fitBoards);
  window.LMCampPoster = {
    renderPrimaryPreview: renderPrimaryPreview,
    renderMakerPreview: renderMakerPreview,
    generateGif: generateGif,
    exports: ANIMATED_EXPORTS,
    templates: GIF_TEMPLATES
  };
})();
