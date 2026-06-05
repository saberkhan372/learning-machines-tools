/* Learning Machines — shared theme loader.
   Applies persisted theme/font/hero across all pages and reacts to Tweaks. */
(function () {
  var KEYS = { theme: "lm-theme", font: "lm-font", hero: "lm-hero" };
  var DEFAULTS = { theme: "dark", font: "lab", hero: "tokens" };

  function get(name) {
    try { return localStorage.getItem(KEYS[name]) || DEFAULTS[name]; }
    catch (e) { return DEFAULTS[name]; }
  }
  function apply() {
    var el = document.documentElement;
    el.setAttribute("data-theme", get("theme"));
    el.setAttribute("data-font", get("font"));
    el.setAttribute("data-hero", get("hero"));
  }
  // Apply immediately (script is in <head>, before paint).
  apply();

  // React to Tweaks panel changes (same-window CustomEvent from useTweaks).
  window.addEventListener("tweakchange", function (e) {
    var d = e.detail || {};
    try {
      if (d.theme) localStorage.setItem(KEYS.theme, d.theme);
      if (d.font)  localStorage.setItem(KEYS.font, d.font);
      if (d.hero)  localStorage.setItem(KEYS.hero, d.hero);
    } catch (err) {}
    apply();
    if (d.hero && window.LMHero) window.LMHero.restart();
  });

  window.LMTheme = { apply: apply, get: get };
})();
