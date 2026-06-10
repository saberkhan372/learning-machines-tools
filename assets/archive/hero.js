/* Learning Machines — hero visualizer.
   Renders one of three "invisible → visible" concepts into [data-hero-stage],
   chosen by html[data-hero] = "tokens" | "pixels" | "question".
   Restrained motion; respects prefers-reduced-motion. */
(function () {
  var stage = document.querySelector("[data-hero-stage]");
  if (!stage) return;
  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var timers = [];
  var raf = null;

  function clearAll() {
    timers.forEach(clearTimeout); timers = [];
    if (raf) cancelAnimationFrame(raf), raf = null;
    stage.innerHTML = "";
  }
  function after(ms, fn) { var t = setTimeout(fn, ms); timers.push(t); return t; }

  /* ---------- Concept 1: text → tokens → next-token prediction ---------- */
  var SENT = ["a", " machine", " learns", " to"];
  var PREDS = [
    { w: "write",   p: 0.38, c: 0 },
    { w: "imagine", p: 0.27, c: 4 },
    { w: "move",    p: 0.21, c: 2 },
    { w: "predict", p: 0.14, c: 1 }
  ];

  function renderTokens() {
    var root = el("div", "hero-tok");
    root.innerHTML =
      '<div class="hero-cap"><span class="dot"></span>live · text becomes tokens</div>' +
      '<div class="hero-line" data-line></div>' +
      '<div class="hero-pred-label">next token, ranked by probability</div>' +
      '<div class="hero-preds" data-preds></div>';
    stage.appendChild(root);
    var line = root.querySelector("[data-line]");
    var preds = root.querySelector("[data-preds]");

    // token chips
    SENT.forEach(function (w, i) {
      var s = document.createElement("span");
      s.className = "tok c" + (i % 6) + " hero-chip";
      s.textContent = w.replace(/^ /, "\u00a0");
      line.appendChild(s);
    });
    var blank = document.createElement("span");
    blank.className = "hero-blank";
    blank.textContent = "\u00a0?";
    line.appendChild(blank);

    // prediction bars
    PREDS.forEach(function (d) {
      var row = document.createElement("div");
      row.className = "hero-pred";
      row.innerHTML =
        '<span class="hero-pred-w tok c' + d.c + '">' + d.w + '</span>' +
        '<span class="hero-bar"><i style="--w:' + (d.p * 100) + '%"></i></span>' +
        '<span class="hero-pct">' + Math.round(d.p * 100) + '%</span>';
      preds.appendChild(row);
    });

    if (reduced) {
      stage.querySelectorAll(".hero-chip,.hero-pred").forEach(function (n) { n.classList.add("show"); });
      stage.querySelectorAll(".hero-bar i").forEach(function (n) { n.style.width = "var(--w)"; });
      blank.classList.add("show");
      return;
    }

    var chips = stage.querySelectorAll(".hero-chip");
    chips.forEach(function (c, i) { after(220 + i * 200, function () { c.classList.add("show"); }); });
    after(220 + chips.length * 200 + 120, function () { blank.classList.add("show"); });
    var predRows = stage.querySelectorAll(".hero-pred");
    var base = 220 + chips.length * 200 + 520;
    predRows.forEach(function (r, i) {
      after(base + i * 180, function () {
        r.classList.add("show");
        var bar = r.querySelector(".hero-bar i");
        if (bar) bar.style.width = "var(--w)";
      });
    });
    // gentle cycle of highlighted prediction
    var hi = 0;
    function cycle() {
      predRows.forEach(function (r, i) { r.classList.toggle("hot", i === hi); });
      hi = (hi + 1) % predRows.length;
      after(1500, cycle);
    }
    after(base + predRows.length * 180 + 500, cycle);
    // loop the whole thing slowly
    after(base + predRows.length * 180 + 9000, function () { renderRestart("tokens"); });
  }

  /* ---------- Concept 2: image → pixels → features ---------- */
  function renderPixels() {
    var root = el("div", "hero-pix");
    root.innerHTML =
      '<div class="hero-cap"><span class="dot"></span>live · image becomes pixels</div>' +
      '<canvas class="hero-canvas" width="520" height="300"></canvas>' +
      '<div class="hero-pix-scale"><span>2&times;2</span><span>blocks</span><span>features</span><span>sharp</span></div>';
    stage.appendChild(root);
    var cv = root.querySelector("canvas");
    var ctx = cv.getContext("2d");
    var W = cv.width, H = cv.height;

    // an abstract "subject": soft blobs + horizon, never a literal drawing
    function paintTarget(c) {
      var g = c.createLinearGradient(0, 0, 0, H);
      g.addColorStop(0, "#1b2740"); g.addColorStop(1, "#0c1320");
      c.fillStyle = g; c.fillRect(0, 0, W, H);
      var sun = c.createRadialGradient(W * 0.66, H * 0.42, 8, W * 0.66, H * 0.42, 150);
      sun.addColorStop(0, "rgba(94,234,212,0.95)");
      sun.addColorStop(0.5, "rgba(94,234,212,0.30)");
      sun.addColorStop(1, "rgba(94,234,212,0)");
      c.fillStyle = sun; c.fillRect(0, 0, W, H);
      var hz = c.createLinearGradient(0, H * 0.62, 0, H);
      hz.addColorStop(0, "rgba(192,132,252,0.0)");
      hz.addColorStop(1, "rgba(192,132,252,0.42)");
      c.fillStyle = hz; c.fillRect(0, H * 0.6, W, H * 0.4);
      var blob = c.createRadialGradient(W * 0.3, H * 0.7, 6, W * 0.3, H * 0.7, 110);
      blob.addColorStop(0, "rgba(246,189,96,0.8)");
      blob.addColorStop(1, "rgba(246,189,96,0)");
      c.fillStyle = blob; c.fillRect(0, 0, W, H);
    }
    // offscreen full-res target
    var off = document.createElement("canvas"); off.width = W; off.height = H;
    paintTarget(off.getContext("2d"));

    function drawAt(blocks) {
      ctx.imageSmoothingEnabled = false;
      var bw = Math.max(2, Math.round(W / blocks));
      var bh = Math.max(2, Math.round(H / blocks));
      ctx.clearRect(0, 0, W, H);
      ctx.drawImage(off, 0, 0, bw, bh);
      ctx.drawImage(cv, 0, 0, bw, bh, 0, 0, W, H);
    }
    function drawSharp() {
      ctx.imageSmoothingEnabled = true;
      ctx.clearRect(0, 0, W, H);
      ctx.drawImage(off, 0, 0);
    }

    if (reduced) { drawSharp(); return; }
    // resolution ladder, slow steps
    var steps = [3, 6, 11, 20, 40, 80];
    var i = 0;
    function step() {
      if (i < steps.length) { drawAt(steps[i]); i++; after(620, step); }
      else { drawSharp(); after(4200, function () { renderRestart("pixels"); }); }
    }
    drawAt(2); after(700, step);
  }

  /* ---------- Concept 3: the question, typographically ---------- */
  function renderQuestion() {
    var root = el("div", "hero-q");
    root.innerHTML =
      '<div class="hero-cap"><span class="dot"></span>the recurring question</div>' +
      '<div class="hero-q-text">' +
        '<span>What is the</span> ' +
        '<span class="hl">machine</span> ' +
        '<span>actually</span> ' +
        '<span class="hl2">doing</span><span>?</span>' +
      '</div>' +
      '<div class="hero-q-sub mono">every tool makes something invisible visible</div>';
    stage.appendChild(root);
    if (reduced) { root.querySelectorAll("span").forEach(function (s){ s.classList.add("show"); }); return; }
    var words = root.querySelectorAll(".hero-q-text > span");
    words.forEach(function (w, i) { after(180 + i * 260, function () { w.classList.add("show"); }); });
    after(180 + words.length * 260 + 7000, function () { renderRestart("question"); });
  }

  function renderRestart(kind) {
    clearAll();
    if (kind === "pixels") renderPixels();
    else if (kind === "question") renderQuestion();
    else renderTokens();
  }
  function el(tag, cls) { var n = document.createElement(tag); if (cls) n.className = cls; return n; }

  function start() {
    clearAll();
    var kind = document.documentElement.getAttribute("data-hero") || "tokens";
    if (kind === "pixels") renderPixels();
    else if (kind === "question") renderQuestion();
    else renderTokens();
  }

  window.LMHero = { restart: start };
  start();
})();
