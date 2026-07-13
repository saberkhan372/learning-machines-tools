/* Learning Machines — recap block renderer.

   Renders a session's after-the-fact recap into any element with
   data-recap-block="<session id>", reading from LM_SESSION_RUNS.

   Recap shape in session-runs.js:
     recap: {
       video:       <url|null>,       // gated recording link
       writtenHref: <path|null>,      // link to a longer recap page
       written:     <string|null>,    // short inline prose (paragraph breaks via \n\n)
       sections:    <object|null>     // structured template (see below)
     }

   sections shape:
     { summary, investigated[], mechanisms[], patterns[], hmse{}, classroom{}, next{} } */
(function () {
  function esc(str) {
    return String(str)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;")
      .replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }

  /* recap blocks live on pages in /pages/ — repo root is one level up */
  function resolve(href) {
    return /^https?:/i.test(href) ? href : new URL("../" + href, window.location.href).href;
  }

  /* ── Structured sections renderer ─────────────────────────────────────── */
  function renderStructured(rc) {
    var s = rc.sections;
    var out = "";

    /* header */
    out += '<div class="recap-head">';
    out += '<h2>Recap</h2>';
    out += '<span class="recap-note">registered participants \xb7 never used to train AI</span>';
    out += "</div>";

    if (rc.video) {
      out += '<a class="recap-watch" href="' + esc(rc.video) + '">▶ Watch the recording</a>';
    }

    /* summary prose */
    if (s.summary) {
      out += '<p class="recap-summary">' + esc(s.summary) + "</p>";
    }

    /* § 1 — What we investigated */
    if (s.investigated && s.investigated.length) {
      out += '<div class="recap-sec">';
      out += '<div class="recap-sec-hd"><span class="recap-sec-no">01</span><span class="recap-sec-title">What we investigated</span></div>';
      out += '<ul class="recap-list">';
      s.investigated.forEach(function (item) {
        out += "<li>" + esc(item) + "</li>";
      });
      out += "</ul></div>";
    }

    /* § 2 — Visible mechanisms */
    if (s.mechanisms && s.mechanisms.length) {
      out += '<div class="recap-sec">';
      out += '<div class="recap-sec-hd"><span class="recap-sec-no">02</span><span class="recap-sec-title">Visible mechanisms</span></div>';
      out += '<div class="recap-table-wrap"><table class="recap-table">';
      out += "<thead><tr><th>Mechanism</th><th>Where it showed up</th><th>What we observed</th></tr></thead><tbody>";
      s.mechanisms.forEach(function (m) {
        out += "<tr><td>" + esc(m.name) + "</td><td>" + esc(m.where) + "</td><td>" + esc(m.observed) + "</td></tr>";
      });
      out += "</tbody></table></div></div>";
    }

    /* § 3 — Defaults & patterns */
    if (s.patterns && s.patterns.length) {
      out += '<div class="recap-sec">';
      out += '<div class="recap-sec-hd"><span class="recap-sec-no">03</span><span class="recap-sec-title">Defaults &amp; patterns</span></div>';
      s.patterns.forEach(function (p) {
        out += '<div class="recap-pattern">';
        out += '<div class="recap-p-row"><span class="recap-p-tag">What happened</span><span>' + esc(p.what) + "</span></div>";
        out += '<div class="recap-p-row"><span class="recap-p-tag">Suggests</span><span>' + esc(p.suggests) + "</span></div>";
        out += '<div class="recap-p-row"><span class="recap-p-tag">Next step</span><span>' + esc(p.next) + "</span></div>";
        out += "</div>";
      });
      out += "</div>";
    }

    /* § 4 — Human · Machine · System · Ethics */
    if (s.hmse) {
      var h = s.hmse;
      out += '<div class="recap-sec">';
      out += '<div class="recap-sec-hd"><span class="recap-sec-no">04</span><span class="recap-sec-title">Human \xb7 Machine \xb7 System \xb7 Ethics</span></div>';
      out += '<div class="recap-hmse">';
      [
        ["rh-human",   "Human",   h.human],
        ["rh-machine", "Machine", h.machine],
        ["rh-system",  "System",  h.system],
        ["rh-ethics",  "Ethics",  h.ethics]
      ].forEach(function (row) {
        out += '<div class="recap-hmse-row">';
        out += '<span class="recap-hmse-tag ' + row[0] + '">' + row[1] + "</span>";
        out += "<span>" + esc(row[2]) + "</span></div>";
      });
      out += "</div></div>";
    }

    /* § 5 — Classroom translation */
    if (s.classroom) {
      var c = s.classroom;
      out += '<div class="recap-sec">';
      out += '<div class="recap-sec-hd"><span class="recap-sec-no">05</span><span class="recap-sec-title">Classroom translation</span></div>';
      out += '<div class="recap-classroom">';
      [
        ["Students could",        c.students],
        ["AI might short-circuit", c.shortCircuit],
        ["No-AI version",          c.noAI]
      ].forEach(function (row) {
        out += '<div class="recap-c-row"><span class="recap-c-tag">' + row[0] + "</span><span>" + esc(row[1]) + "</span></div>";
      });
      out += "</div></div>";
    }

    /* § 6 — What's next */
    if (s.next) {
      var nx = s.next;
      out += '<div class="recap-sec">';
      out += '<div class="recap-sec-hd"><span class="recap-sec-no">06</span><span class="recap-sec-title">What\'s next</span></div>';
      if (nx.prep) {
        out += '<p class="recap-next-prep">' + esc(nx.prep) + "</p>";
      }
      if (nx.asyncRoute) {
        var ar = nx.asyncRoute;
        out += '<div class="recap-async">';
        out += '<span class="recap-async-label">Async route</span>';
        out += "<p>" + esc(ar.prompt) + "</p>";
        if (ar.worksheetPath || ar.packPath) {
          out += '<div class="recap-async-links">';
          if (ar.worksheetPath) out += '<a href="' + esc(resolve(ar.worksheetPath)) + '">Worksheet →</a>';
          if (ar.packPath)      out += '<a href="' + esc(resolve(ar.packPath))      + '">Prompt pack →</a>';
          out += "</div>";
        }
        out += "</div>";
      }
      out += "</div>";
    }

    if (rc.writtenHref) {
      out += '<a class="recap-read" href="' + esc(resolve(rc.writtenHref)) + '">Read the full recap →</a>';
    }

    return '<div class="recap recap--structured">' + out + "</div>";
  }

  /* ── Plain written prose renderer ─────────────────────────────────────── */
  function renderWritten(rc) {
    var parts = [];
    if (rc.video) {
      parts.push('<a class="recap-watch" href="' + esc(rc.video) + '">▶ Watch the recording</a>');
    }
    if (rc.written) {
      var paragraphs = String(rc.written).split(/\n\s*\n/);
      var written = paragraphs.map(function (paragraph) {
        return "<p>" + esc(paragraph) + "</p>";
      }).join("");
      parts.push('<div class="recap-written">' + written + "</div>");
    }
    if (rc.writtenHref) {
      parts.push('<a class="recap-read" href="' + esc(resolve(rc.writtenHref)) + '">Read the full recap →</a>');
    }
    return '<div class="recap">' +
      '<div class="recap-head"><h2>Recap</h2>' +
      '<span class="recap-note">registered participants \xb7 never used to train AI</span></div>' +
      '<div class="recap-body">' + parts.join("") + "</div></div>";
  }

  /* ── Entry point ───────────────────────────────────────────────────────── */
  function render(el) {
    var id = el.getAttribute("data-recap-block");
    var run = (window.LM_SESSION_RUNS || []).filter(function (r) { return r.id === id; })[0];
    if (!run) { el.innerHTML = ""; return; }
    var rc = run.recap || {};

    if (rc.sections) {
      el.innerHTML = renderStructured(rc);
      return;
    }

    if (rc.video || rc.written || rc.writtenHref) {
      el.innerHTML = renderWritten(rc);
      return;
    }

    el.innerHTML =
      '<div class="recap is-pending"><h2>Recap</h2>' +
      "<p>A video recording and a short written recap will be posted here after the session — " +
      "shared with registered participants, and never used to train AI models.</p></div>";
  }

  function init() {
    var blocks = document.querySelectorAll("[data-recap-block]");
    Array.prototype.forEach.call(blocks, render);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
