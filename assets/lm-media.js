/* Learning Machines — local media + capture helpers.

   Two browser powers, both fully client-side (nothing is ever uploaded):

   1. Import — read a participant's own image files in the browser via
      createObjectURL, generalizing the pattern already used in
      frame-by-frame-coherence-viewer.

   2. Capture — save what a tool is showing as a PNG the participant keeps.
      The download IS the portable artifact (works offline, no storage limits).
      If the Continuity Layer exposes an artifact API (LMState.saveArtifact),
      the capture is also handed to it; otherwise it degrades to a clean
      download. We deliberately do NOT stuff image blobs into localStorage.

   See docs/browser-power-plan.md. */
(function () {
  function download(filename, blob) {
    var url = URL.createObjectURL(blob);
    var a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(function () { URL.revokeObjectURL(url); }, 1000);
  }

  var LMMedia = {
    /* Read local image files entirely in the browser. Calls onImage with
       { file, name, url } for each image; never uploads anything. */
    readImages: function (fileList, onImage) {
      Array.prototype.forEach.call(fileList || [], function (file) {
        if (!file || !/^image\//.test(file.type)) { return; }
        onImage({ file: file, name: file.name, url: URL.createObjectURL(file) });
      });
    },

    /* Wire a file input and/or a drop zone to import local images.
       opts: { input, dropZone, onImage } */
    wireImport: function (opts) {
      opts = opts || {};
      if (opts.input) {
        opts.input.addEventListener("change", function () {
          LMMedia.readImages(opts.input.files, opts.onImage);
        });
      }
      var dz = opts.dropZone;
      if (dz) {
        ["dragenter", "dragover"].forEach(function (ev) {
          dz.addEventListener(ev, function (e) {
            e.preventDefault();
            dz.classList.add("lm-dragover");
          });
        });
        ["dragleave", "drop"].forEach(function (ev) {
          dz.addEventListener(ev, function (e) {
            e.preventDefault();
            dz.classList.remove("lm-dragover");
          });
        });
        dz.addEventListener("drop", function (e) {
          if (e.dataTransfer && e.dataTransfer.files) {
            LMMedia.readImages(e.dataTransfer.files, opts.onImage);
          }
        });
      }
    },

    /* Capture a canvas as a PNG the participant keeps. Always downloads; also
       hands off to the notebook artifact API if one exists. Promise<boolean>. */
    capture: function (canvas, filename, meta) {
      filename = filename || ("learning-machines-" + Date.now() + ".png");
      return new Promise(function (resolve) {
        if (!canvas || !canvas.toBlob) { resolve(false); return; }
        canvas.toBlob(function (blob) {
          if (!blob) { resolve(false); return; }
          download(filename, blob);
          var handoff = Promise.resolve();
          try {
            if (window.LMState && typeof window.LMState.saveArtifact === "function") {
              handoff = window.LMState.saveArtifact({ type: "image", title: filename, blob: blob, meta: meta || {} }).catch(function () {});
            }
          } catch (e) {}
          handoff.then(function () { resolve(true); });
        }, "image/png");
      });
    }
  };

  window.LMMedia = LMMedia;
})();
