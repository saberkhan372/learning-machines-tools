/* Learning Machines — Field Manual theme loader.
   Applies persisted tone/type/ink/identity before paint; reacts to Tweaks.
   Also injects assets/field-identity.css + the identity display fonts and
   renders the site-wide "Skin" menu (see docs/site-identity-switcher-plan.md). */
(function () {
  var KEYS = { tone: "lm-tone", type: "lm-type", ink: "lm-ink", identity: "lm-identity" };
  var DEFAULTS = { tone: "white", type: "signage", ink: "full", identity: "field" };
  var IDENTITIES = ["field", "terminal", "spectrum", "acid"];
  var LABELS = { field: "Field", terminal: "Terminal", spectrum: "Spectrum", acid: "Acid" };

  /* asset paths derived from this script's own src so it works at any depth */
  var script = document.currentScript;
  var base = script ? script.src.replace(/field-theme\.js.*$/, "") : "assets/";
  var FONTS_HREF = "https://fonts.googleapis.com/css2?family=VT323&family=Rubik+Glitch&family=Anton&display=swap";

  function get(name) {
    try { return localStorage.getItem(KEYS[name]) || DEFAULTS[name]; }
    catch (e) { return DEFAULTS[name]; }
  }
  function set(name, value) {
    try { localStorage.setItem(KEYS[name], value); } catch (err) {}
  }

  function ensureLink(id, href) {
    var l = document.getElementById(id);
    if (l) return l;
    l = document.createElement("link");
    l.id = id;
    l.rel = "stylesheet";
    l.href = href;
    (document.head || document.documentElement).appendChild(l);
    return l;
  }

  function moveIdentityAssetsLast() {
    var head = document.head || document.documentElement;
    var fonts = document.getElementById("lm-identity-fonts");
    var css = document.getElementById("lm-identity-css");
    if (fonts) head.appendChild(fonts);
    if (css) head.appendChild(css);
  }

  function apply() {
    var el = document.documentElement;
    el.setAttribute("data-tone", get("tone"));
    el.setAttribute("data-type", get("type"));
    el.setAttribute("data-ink", get("ink"));
    var id = get("identity");
    if (IDENTITIES.indexOf(id) === -1) id = "field";
    el.setAttribute("data-identity", id);
    /* identity stylesheet + display fonts ship on every page. The fonts link
       is cheap for field-identity visitors: browsers fetch font binaries only
       when a rendered element actually uses the family. */
    ensureLink("lm-identity-css", base + "field-identity.css");
    ensureLink("lm-identity-fonts", FONTS_HREF);
    moveIdentityAssetsLast();
    refreshMenu();
  }

  /* ---- site-wide skin menu ---- */
  var menuRoot = null;
  function buildMenu() {
    if (menuRoot || !document.body || document.documentElement.hasAttribute("data-no-identity-menu")) return;
    menuRoot = document.createElement("div");
    menuRoot.className = "lm-skin-menu";
    var toggle = document.createElement("button");
    toggle.type = "button";
    toggle.className = "lm-skin-toggle";
    toggle.setAttribute("aria-haspopup", "listbox");
    toggle.setAttribute("aria-expanded", "false");
    var list = document.createElement("div");
    list.className = "lm-skin-list";
    list.setAttribute("role", "listbox");
    list.setAttribute("aria-label", "Site skin");
    IDENTITIES.forEach(function (id) {
      var opt = document.createElement("button");
      opt.type = "button";
      opt.className = "lm-skin-opt";
      opt.setAttribute("role", "option");
      opt.dataset.identity = id;
      opt.textContent = LABELS[id];
      opt.addEventListener("click", function () {
        set("identity", id);
        close();
        apply();
      });
      list.appendChild(opt);
    });
    function close() {
      menuRoot.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    }
    toggle.addEventListener("click", function () {
      var open = menuRoot.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    document.addEventListener("click", function (e) {
      if (!menuRoot.contains(e.target)) close();
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") close();
    });
    menuRoot.appendChild(list);
    menuRoot.appendChild(toggle);
    document.body.appendChild(menuRoot);
    refreshMenu();
  }
  function refreshMenu() {
    if (!menuRoot) return;
    var id = get("identity");
    menuRoot.querySelector(".lm-skin-toggle").textContent = "Skin: " + (LABELS[id] || id);
    [].forEach.call(menuRoot.querySelectorAll(".lm-skin-opt"), function (opt) {
      opt.setAttribute("aria-selected", opt.dataset.identity === id ? "true" : "false");
    });
  }

  apply();
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () {
      moveIdentityAssetsLast();
      buildMenu();
    });
  } else {
    moveIdentityAssetsLast();
    buildMenu();
  }

  window.addEventListener("tweakchange", function (e) {
    var d = e.detail || {};
    if (d.tone) set("tone", d.tone);
    if (d.type) set("type", d.type);
    if (d.ink)  set("ink", d.ink);
    if (d.identity) set("identity", d.identity);
    apply();
  });

  window.LMField = { apply: apply, get: get };
})();
