/* Learning Machines — shared worksheet export.
   Adds a "Copy as Markdown" button to the worksheet controls row so notes can
   be pasted straight into Zoom chat, the Evidence Wall, or a planning doc.
   Walks the same [data-key] fields the worksheet persists to localStorage. */
(function () {
  var controls = document.querySelector(".controls");
  if (!controls) { return; }

  function clean(s) { return String(s).replace(/\s+/g, " ").trim(); }

  function fieldLabel(el) {
    /* reflection rows label the question in a sibling span, not the aria-label */
    var item = el.closest(".reflect-item");
    if (item) {
      var q = item.querySelector(".reflect-q");
      if (q) { return clean(q.textContent); }
    }
    var aria = el.getAttribute("aria-label");
    if (aria) {
      aria = clean(aria).replace(/^Evidence footer\s+/i, "");
      return aria.charAt(0).toUpperCase() + aria.slice(1);
    }
    var lab = el.closest("label");
    if (lab) {
      var name = lab.querySelector(".norm-text, .pathway-name, .check-text");
      return clean((name || lab).textContent);
    }
    return el.getAttribute("data-key") || "Field";
  }

  function fieldLines(scope) {
    var lines = [];
    var seenRadio = {};
    scope.querySelectorAll("textarea[data-key], input[data-key]").forEach(function (el) {
      if (el.type === "radio") {
        if (!el.checked || seenRadio[el.dataset.key]) { return; }
        seenRadio[el.dataset.key] = true;
        var key = el.dataset.key.charAt(0).toUpperCase() + el.dataset.key.slice(1);
        lines.push("- **" + key + ":** " + fieldLabel(el));
      } else if (el.type === "checkbox") {
        lines.push("- [" + (el.checked ? "x" : " ") + "] " + fieldLabel(el));
      } else {
        var v = el.value.trim();
        if (v === "") { return; }
        var label = fieldLabel(el);
        /* question-style labels already end in punctuation */
        var sep = /[?!.]$/.test(label) ? "** " : ":** ";
        lines.push("- **" + label + sep + v.replace(/\n+/g, " / "));
      }
    });
    return lines;
  }

  function markdownExport() {
    var h1 = document.querySelector("h1");
    var eyebrow = document.querySelector(".eyebrow");
    var lines = ["# " + clean(h1 ? h1.textContent : document.title)];
    if (eyebrow) { lines.push("_" + clean(eyebrow.textContent) + "_"); }
    lines.push("");
    document.querySelectorAll(".section").forEach(function (sec) {
      var fl = fieldLines(sec);
      if (fl.length === 0) { return; }
      var t = sec.querySelector(".section-title, .claim-label");
      if (t) { lines.push("## " + clean(t.textContent)); }
      lines.push.apply(lines, fl);
      lines.push("");
    });
    var footer = document.querySelector(".evidence-footer");
    if (footer) {
      var fl = fieldLines(footer);
      if (fl.length > 0) {
        lines.push("## Evidence summary");
        lines.push.apply(lines, fl);
        lines.push("");
      }
    }
    return lines.join("\n").trim() + "\n";
  }

  function fallbackCopy(text) {
    var ta = document.createElement("textarea");
    ta.value = text;
    document.body.appendChild(ta);
    ta.select();
    document.execCommand("copy");
    document.body.removeChild(ta);
  }

  var btn = document.createElement("button");
  btn.type = "button";
  btn.className = "btn";
  btn.id = "copyMarkdownBtn";
  btn.textContent = "Copy as Markdown";
  var printBtn = controls.querySelector(".btn-print");
  controls.insertBefore(btn, printBtn ? printBtn.nextSibling : controls.firstChild);

  btn.addEventListener("click", function () {
    var text = markdownExport();
    function done() {
      var prev = btn.textContent;
      btn.textContent = "Copied ✓";
      setTimeout(function () { btn.textContent = prev; }, 1400);
    }
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(done).catch(function () {
        fallbackCopy(text);
        done();
      });
    } else {
      fallbackCopy(text);
      done();
    }
  });

  /* expose for self-checks in the console */
  window.LM_WORKSHEET_EXPORT = markdownExport;
})();
