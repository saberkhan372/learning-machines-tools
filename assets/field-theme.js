/* Learning Machines — Field Manual theme loader.
   Applies persisted tone/type/ink before paint; reacts to Tweaks. */
(function () {
  var KEYS = { tone: "lm-tone", type: "lm-type", ink: "lm-ink" };
  var DEFAULTS = { tone: "white", type: "signage", ink: "full" };

  function get(name) {
    try { return localStorage.getItem(KEYS[name]) || DEFAULTS[name]; }
    catch (e) { return DEFAULTS[name]; }
  }
  function apply() {
    var el = document.documentElement;
    el.setAttribute("data-tone", get("tone"));
    el.setAttribute("data-type", get("type"));
    el.setAttribute("data-ink", get("ink"));
  }
  apply();

  window.addEventListener("tweakchange", function (e) {
    var d = e.detail || {};
    try {
      if (d.tone) localStorage.setItem(KEYS.tone, d.tone);
      if (d.type) localStorage.setItem(KEYS.type, d.type);
      if (d.ink)  localStorage.setItem(KEYS.ink, d.ink);
    } catch (err) {}
    apply();
  });

  window.LMField = { apply: apply, get: get };
})();
