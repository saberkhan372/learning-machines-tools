(function () {
  "use strict";

  var host = window.location.hostname;
  var isLocal =
    !host ||
    host === "localhost" ||
    host === "127.0.0.1" ||
    host === "::1";

  if (isLocal || document.querySelector("script[data-goatcounter]")) {
    return;
  }

  var script = document.createElement("script");
  script.async = true;
  script.src = "https://gc.zgo.at/count.js";
  script.setAttribute("data-goatcounter", "https://learningmachines.goatcounter.com/count");
  document.head.appendChild(script);

  // Lightweight custom-event tracking. Any element with [data-gc-event] fires a
  // GoatCounter event on click — used to measure whether Start Here actually
  // routes people. No-ops until count.js has loaded (clicks happen well after).
  document.addEventListener("click", function (e) {
    var el = e.target.closest("[data-gc-event]");
    if (!el) return;
    if (window.goatcounter && typeof window.goatcounter.count === "function") {
      window.goatcounter.count({
        path: el.getAttribute("data-gc-event"),
        title: "event: " + el.getAttribute("data-gc-event"),
        event: true
      });
    }
  });
})();
