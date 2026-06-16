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
})();
