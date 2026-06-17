/* Learning Machines — shareable state via URL hash.

   Generalizes the one-off Evidence Wall hash pattern into a reusable helper so a
   tool's public CONFIG (a prompt, a temperature, a frame index — never private
   notes) can travel in a link. A facilitator pastes one URL in Zoom chat and
   everyone lands on the identical setup.

   Encoding matches the established Evidence Wall pattern:
     JSON -> encodeURIComponent -> btoa   (Unicode-safe; silent fail on garbage).
   Hash, not query string, keeps it static-host friendly (GitHub Pages, Notion).

   See docs/SHARED-CONTRACT.md (URL-hash state is explicitly allowed; localStorage
   as cross-participant sync is not) and docs/browser-power-plan.md. */
(function () {
  var PREFIX = "s="; /* hash payload marker: #s=<encoded> */

  function encode(obj) {
    try { return btoa(encodeURIComponent(JSON.stringify(obj))); }
    catch (e) { return null; }
  }
  function decode(str) {
    try { return JSON.parse(decodeURIComponent(atob(str))); }
    catch (e) { return null; }
  }

  function payload() {
    var h = location.hash || "";
    if (h.charAt(0) === "#") { h = h.slice(1); }
    if (h.indexOf(PREFIX) !== 0) { return null; }
    return h.slice(PREFIX.length);
  }

  var LMUrl = {
    /* Read the state object from the current URL hash, or null. */
    read: function () {
      var p = payload();
      if (!p || p.length < 4) { return null; }
      return decode(p);
    },

    /* Write a state object into the hash without adding a history entry.
       Pass null/undefined to clear it. Returns the encoded payload or null. */
    write: function (obj) {
      var enc = obj == null ? null : encode(obj);
      var base = location.pathname + location.search;
      var url = enc ? base + "#" + PREFIX + enc : base;
      try { history.replaceState(null, "", url); }
      catch (e) { location.hash = enc ? PREFIX + enc : ""; }
      return enc;
    },

    /* Build a full shareable URL string for the given state. */
    link: function (obj) {
      var enc = encode(obj);
      var base = location.origin + location.pathname + location.search;
      return enc ? base + "#" + PREFIX + enc : base;
    },

    /* Copy a shareable link to the clipboard. Returns Promise<boolean>. */
    copy: function (obj) {
      var url = LMUrl.link(obj);
      if (navigator.clipboard && navigator.clipboard.writeText) {
        return navigator.clipboard.writeText(url).then(
          function () { return true; },
          function () { return false; }
        );
      }
      try {
        var ta = document.createElement("textarea");
        ta.value = url;
        ta.setAttribute("readonly", "");
        ta.style.position = "absolute";
        ta.style.left = "-9999px";
        document.body.appendChild(ta);
        ta.select();
        var ok = document.execCommand("copy");
        document.body.removeChild(ta);
        return Promise.resolve(ok);
      } catch (e) {
        return Promise.resolve(false);
      }
    },

    /* Convenience wiring: rehydrate from the URL on load, then bind a
       "Copy share link" button to a tool's getState().
       opts: { button, getState, applyState, onShare(ok), onApply(state) }
       Returns the initial state read from the URL (or null). */
    wire: function (opts) {
      opts = opts || {};
      var initial = LMUrl.read();
      if (initial && typeof opts.applyState === "function") {
        opts.applyState(initial);
        if (typeof opts.onApply === "function") { opts.onApply(initial); }
      }
      if (opts.button && typeof opts.getState === "function") {
        opts.button.addEventListener("click", function () {
          LMUrl.copy(opts.getState()).then(function (ok) {
            if (typeof opts.onShare === "function") { opts.onShare(ok); }
          });
        });
      }
      return initial;
    }
  };

  window.LMUrl = LMUrl;
})();
