/* Learning Machines — recap block renderer.

   Renders a session's after-the-fact recap (video recording + short written
   summary) into any element with data-recap-block="<session id>", reading from
   LM_SESSION_RUNS (session-runs.js — the single source of truth). Until the
   recap fields are filled, it shows a pending placeholder so the "watch the
   recording" pointers elsewhere on the site never dead-end.

   Recap shape in session-runs.js:
     recap: { video: <url|null>, written: <string|null>, writtenHref: <path|null> }
   - video: full URL to the gated recording (Zoom/Drive); registered-only.
   - written: a short inline summary, OR
   - writtenHref: repo-relative path to a longer recap page. */
(function () {
  function esc(str) {
    return String(str).replace(/&/g, "&amp;").replace(/</g, "&lt;")
      .replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }

  /* recap blocks live on pages in /pages/, so repo root is one level up */
  function resolve(href) {
    return /^https?:/i.test(href) ? href : new URL("../" + href, window.location.href).href;
  }

  function render(el) {
    var id = el.getAttribute("data-recap-block");
    var runs = window.LM_SESSION_RUNS || [];
    var run = runs.filter(function (r) { return r.id === id; })[0];
    if (!run) { el.innerHTML = ""; return; }
    var rc = run.recap || {};

    if (!rc.video && !rc.written && !rc.writtenHref) {
      el.innerHTML = '<div class="recap is-pending">' +
        "<h2>Recap</h2>" +
        "<p>A video recording and a short written recap will be posted here after the session — " +
        "shared with registered participants, and never used to train AI models.</p>" +
        "</div>";
      return;
    }

    var parts = [];
    if (rc.video) {
      parts.push('<a class="recap-watch" href="' + esc(rc.video) + '">▶ Watch the recording</a>');
    }
    if (rc.written) {
      var paras = rc.written.split(/\n\n+/).map(function (p) {
        return '<p class="recap-written">' + esc(p.trim()) + "</p>";
      }).join("");
      parts.push(paras);
    }
    if (rc.writtenHref) {
      parts.push('<a class="recap-read" href="' + esc(resolve(rc.writtenHref)) + '">Read the full recap →</a>');
    }
    el.innerHTML = '<div class="recap">' +
      '<div class="recap-head"><h2>Recap</h2>' +
      '<span class="recap-note">registered participants · never used to train AI</span></div>' +
      '<div class="recap-body">' + parts.join("") + "</div>" +
      "</div>";
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
