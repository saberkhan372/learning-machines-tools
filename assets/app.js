/* Learning Machines — homepage interactions: tool browser, reveal, motifs. */
(function () {
  /* ---------- tiny per-modality visual motif ---------- */
  function motif(m) {
    if (m === "text") {
      return '<div class="motif motif-text">' +
        '<span class="tok c0">to</span><span class="tok c4">ken</span>' +
        '<span class="tok c2">ize</span><span class="tok c1">·d</span></div>';
    }
    if (m === "image") {
      var cells = "";
      for (var i = 0; i < 24; i++) cells += '<i style="--d:' + (i % 7) + '"></i>';
      return '<div class="motif motif-image">' + cells + "</div>";
    }
    if (m === "video") {
      return '<div class="motif motif-video"><i></i><i></i><i></i><i></i></div>';
    }
    return '<div class="motif motif-cross"><b></b><b></b><b></b><svg viewBox="0 0 60 40">' +
      '<line x1="12" y1="10" x2="48" y2="20"/><line x1="12" y1="10" x2="20" y2="32"/>' +
      '<line x1="48" y1="20" x2="20" y2="32"/></svg></div>';
  }
  var MOD_LABEL = { text: "Text", image: "Image", video: "Video", cross: "Cross-session" };

  function card(t) {
    var ses = t.session === "cross" ? "All sessions" : "Session " + t.session;
    var tags = t.tags.map(function (x) { return '<span class="chip">' + x + "</span>"; }).join("");
    var cta = t.status === "future"
      ? '<span class="tool-cta muted mono">in development →</span>'
      : '<span class="tool-cta mono">open tool →</span>';
    var collab = t.collab ? '<span class="chip collab-chip">Collaborative</span>' : "";
    return '<a class="tool-card reveal" href="' + t.href + '" data-mod="' + t.modality +
      '" data-status="' + t.status + '">' +
      '<div class="tool-top">' + motif(t.modality) +
        '<span class="status ' + t.status + '">' + t.statusLabel + "</span></div>" +
      '<div class="tool-meta mono">' + ses + ' · ' + MOD_LABEL[t.modality] + "</div>" +
      "<h3>" + t.name + "</h3>" +
      "<p>" + t.blurb + "</p>" +
      '<div class="tool-tags">' + tags + collab + "</div>" +
      cta + "</a>";
  }

  var grid = document.querySelector("[data-tool-grid]");
  var filterRow = document.querySelector("[data-filters]");
  var countEl = document.querySelector("[data-count]");
  var state = { mod: "all", q: "" };

  function matches(t) {
    if (state.mod !== "all" && t.modality !== state.mod) return false;
    if (state.q) {
      var hay = (t.name + " " + t.blurb + " " + t.tags.join(" ")).toLowerCase();
      if (hay.indexOf(state.q.toLowerCase()) === -1) return false;
    }
    return true;
  }
  function render() {
    var list = window.LM_TOOLS.filter(matches);
    grid.innerHTML = list.length
      ? list.map(card).join("")
      : '<p class="empty mono">No tools match that filter.</p>';
    if (countEl) countEl.textContent = list.length + " / " + window.LM_TOOLS.length + " tools";
    observe();
  }

  if (filterRow) {
    filterRow.addEventListener("click", function (e) {
      var b = e.target.closest("[data-f]");
      if (!b) return;
      state.mod = b.getAttribute("data-f");
      filterRow.querySelectorAll("[data-f]").forEach(function (n) {
        n.classList.toggle("on", n === b);
      });
      render();
    });
  }
  var search = document.querySelector("[data-search]");
  if (search) search.addEventListener("input", function () { state.q = search.value; render(); });

  /* ---------- scroll reveal (scroll-based, bulletproof) ---------- */
  function observe() {
    var h = window.innerHeight || 800;
    document.querySelectorAll(".reveal:not(.in)").forEach(function (n) {
      var r = n.getBoundingClientRect();
      if (r.top < h * 0.94 && r.bottom > -40) n.classList.add("in");
    });
  }
  var ticking = false;
  function onScroll() {
    if (ticking) return;
    ticking = true;
    setTimeout(function () { observe(); ticking = false; }, 80);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll, { passive: true });
  // safety net: poll briefly so content reveals even without scroll events
  // (programmatic scroll, deep-links, anchor jumps) and never stays hidden.
  var polls = 0;
  var pollId = setInterval(function () {
    observe();
    if (++polls > 60) clearInterval(pollId);
  }, 280);
  setTimeout(observe, 400);
  window.addEventListener("load", observe);

  if (grid) render();
  observe();
})();
