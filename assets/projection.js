/* Learning Machines — projection view controller.
   Same-page classroom display mode, activated by button or ?project=1. */
(function () {
  var html = document.documentElement;
  var currentScript = document.currentScript;
  var button = null;
  var fallbackRoot = null;

  function assetRoot() {
    if (currentScript && currentScript.src) {
      return currentScript.src.replace(/assets\/projection\.js.*$/, "");
    }
    return new URL(".", window.location.href).toString();
  }

  function rootHref(path) {
    return new URL(path, assetRoot()).toString();
  }

  function path() {
    return window.location.pathname;
  }

  function inferLayout() {
    var p = path();
    var body = document.body;
    if (!body) return "doc";
    if (body.getAttribute("data-project-layout")) return body.getAttribute("data-project-layout");
    if (body.classList.contains("bridge-index-body") || p.indexOf("/concept-bridges/") !== -1) return "doc";
    if (p.indexOf("/worksheets/") !== -1) return "worksheet";
    if (p.indexOf("/packs/") !== -1) return "pack";
    if (p.indexOf("/tools/") !== -1) return "tool";
    if (p.indexOf("/pages/session-") !== -1) return "session";
    if (p.indexOf("/pages/tool-") !== -1) return "tool";
    if (p.indexOf("/camp-poster") !== -1 || p.indexOf("/subpages-remixed") !== -1) return "poster";
    if (p.indexOf("/pages/tools") !== -1 || p.indexOf("/pages/materials") !== -1 || p.indexOf("/session-links") !== -1) return "index";
    if (p.indexOf("/docs/") !== -1 || p.indexOf("/pages/docs-") !== -1 || p.indexOf("/facilitation") !== -1) return "doc";
    if (p === "/" || /\/index\.html$/.test(p) || p.slice(-1) === "/") return "index";
    return "doc";
  }

  function inferPage(layout) {
    var p = path();
    var body = document.body;
    if (!body) return "";
    if (body.getAttribute("data-project-page")) return body.getAttribute("data-project-page");
    if (body.classList.contains("bridge-index-body") || p.indexOf("/concept-bridges/") !== -1) return "bridge";
    if (layout === "worksheet") return "worksheet";
    if (layout === "pack") return "pack";
    if (layout === "index" && (p === "/" || p === "/index.html")) return "home";
    return "";
  }

  function stampPage() {
    var body = document.body;
    if (!body) return;
    var layout = inferLayout();
    var page = inferPage(layout);
    body.setAttribute("data-project-layout", layout);
    if (page) body.setAttribute("data-project-page", page);
  }

  function isOn() {
    return html.getAttribute("data-projection") === "on";
  }

  function labelForOffState() {
    return "Project";
  }

  function syncButton() {
    if (!button) return;
    var on = isOn();
    button.textContent = on ? "Exit projection" : labelForOffState();
    button.setAttribute("aria-pressed", on ? "true" : "false");
    button.setAttribute("aria-label", on ? "Exit projection view" : "Projection view — for Zoom and classroom");
    button.setAttribute("title", on ? "Exit projection view" : "Projection view — for Zoom and classroom");
  }

  function setUrlState(on) {
    var url = new URL(window.location.href);
    if (on) {
      url.searchParams.set("project", "1");
    } else {
      url.searchParams.delete("project");
    }
    window.history.replaceState({}, "", url.toString());
  }

  function setProjection(on, updateUrl) {
    if (on) {
      stampPage();
      html.setAttribute("data-projection", "on");
    } else {
      html.removeAttribute("data-projection");
    }
    if (updateUrl !== false) setUrlState(on);
    syncButton();
  }

  function addButtonToNav() {
    var navLinks = document.querySelector(".nav .nav-links");
    button = document.createElement("button");
    button.type = "button";
    button.className = "btn btn-sm lm-project-btn";
    button.setAttribute("aria-pressed", "false");
    button.addEventListener("click", function () {
      setProjection(!isOn(), true);
    });

    if (navLinks) {
      navLinks.appendChild(button);
    } else {
      fallbackRoot = document.createElement("div");
      fallbackRoot.className = "lm-project-fallback";
      fallbackRoot.appendChild(button);
      document.body.appendChild(fallbackRoot);
    }
    syncButton();
  }

  function replaceNavLinks() {
    var navLinks = document.querySelector(".nav .nav-links");
    if (!navLinks) return;

    navLinks.textContent = "";

    [
      ["Tool index", "pages/tools.html"],
      ["Sessions", "index.html#sessions"],
      ["Materials", "pages/materials.html"],
      ["Run console", "pages/run-console.html"]
    ].forEach(function (item) {
      var a = document.createElement("a");
      a.href = rootHref(item[1]);
      a.className = "hide-sm";
      a.textContent = item[0];
      navLinks.appendChild(a);
    });
  }

  function initFromQuery() {
    var params = new URLSearchParams(window.location.search);
    if (params.get("project") === "1") {
      setProjection(true, false);
    }
  }

  function init() {
    if (!document.body) return;
    replaceNavLinks();
    if (html.hasAttribute("data-no-projection")) return;
    stampPage();
    addButtonToNav();
    initFromQuery();
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && isOn()) setProjection(false, true);
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

  window.LMProjection = {
    enable: function () { setProjection(true, true); },
    disable: function () { setProjection(false, true); },
    toggle: function () { setProjection(!isOn(), true); },
    isOn: isOn,
    base: currentScript ? currentScript.src.replace(/projection\.js.*$/, "") : ""
  };
})();
