/* Learning Machines — Field Manual tool index.
   Renders LM_TOOLS as ruled index rows; wires filters + search + count. */
(function () {
  var grid = document.querySelector("[data-tool-index]");
  if (!grid || !window.LM_TOOLS) return;
  var hrefPrefix = grid.getAttribute("data-tool-prefix") || "";
  var limit = parseInt(grid.getAttribute("data-tool-limit") || "", 10);
  var tools = window.LM_TOOLS;
  if (Number.isFinite(limit) && limit > 0) {
    tools = tools.slice(0, limit);
  }

  var MOD_LABEL = { text: "Text", image: "Images", video: "Video", cross: "Cross" };

  function rowHTML(t, i) {
    var no = String(i + 1).padStart(2, "0");
    var sess = t.session === "cross" ? "All"
      : t.session === "studio" ? "Studio"
      : "S" + t.session;
    /* "ready" is the baseline \u2014 only statuses that differ get a stamp */
    var stamp = t.status === "ready"
      ? ""
      : '<span class="stamp ' + t.status + '">' + t.statusLabel + "</span>";
    return (
      '<a class="ix-row" data-mod="' + t.modality + '" data-status="' + t.status + '" href="' + hrefPrefix + t.href + '">' +
        '<span class="ix-no mono">' + no + '</span>' +
        '<span class="ix-name">' + t.name + '</span>' +
        '<span class="ix-blurb">' + t.blurb + '</span>' +
        '<span class="ix-mod"><i class="modsq"></i>' + MOD_LABEL[t.modality] + ' \u00b7 ' + sess + '</span>' +
        '<span class="ix-stamp-cell">' + stamp + '</span>' +
      '</a>'
    );
  }

  grid.innerHTML = tools.map(rowHTML).join("");

  /* keep ledger stats in sync with the catalog so they can't go stale */
  document.querySelectorAll("[data-tool-total]").forEach(function (n) {
    n.textContent = window.LM_TOOLS.length;
  });

  var rows = Array.prototype.slice.call(grid.querySelectorAll(".ix-row"));
  var countEl = document.querySelector("[data-count]");
  var searchEl = document.querySelector("[data-search]");
  var filterBtns = Array.prototype.slice.call(document.querySelectorAll(".filter-btn"));
  var activeFilter = "all";
  var query = "";
  var emptyEl = null;

  function matches(t) {
    var okMod = activeFilter === "all" || t.modality === activeFilter;
    if (!okMod) return false;
    if (!query) return true;
    var hay = (t.name + " " + t.blurb + " " + (t.tags || []).join(" ")).toLowerCase();
    return hay.indexOf(query) !== -1;
  }

  function applyFilters() {
    var shown = 0;
    tools.forEach(function (t, i) {
      var on = matches(t);
      rows[i].style.display = on ? "" : "none";
      if (on) shown++;
    });
    if (countEl) countEl.textContent = shown + " / " + tools.length + " tools";
    if (!emptyEl) {
      emptyEl = document.createElement("div");
      emptyEl.className = "ix-empty mono";
      emptyEl.textContent = "No tools match. Clear the search or pick another modality.";
      grid.appendChild(emptyEl);
    }
    emptyEl.style.display = shown === 0 ? "" : "none";
  }

  filterBtns.forEach(function (btn) {
    btn.addEventListener("click", function () {
      filterBtns.forEach(function (b) { b.classList.remove("on"); });
      btn.classList.add("on");
      activeFilter = btn.getAttribute("data-f");
      applyFilters();
    });
  });

  if (searchEl) {
    searchEl.addEventListener("input", function () {
      query = searchEl.value.trim().toLowerCase();
      applyFilters();
    });
  }

  applyFilters();
})();
