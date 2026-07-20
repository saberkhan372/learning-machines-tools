(function () {
  "use strict";

  const FRAME_TARGET = 5;
  const CANVAS_BACKGROUND = "rgb(255, 254, 249)";
  const COLORS = [
    { name: "Ink", value: "rgb(31, 34, 39)" },
    { name: "Red", value: "rgb(190, 55, 52)" },
    { name: "Blue", value: "rgb(38, 95, 167)" },
    { name: "Green", value: "rgb(45, 125, 83)" },
    { name: "Orange", value: "rgb(211, 111, 42)" },
    { name: "Violet", value: "rgb(117, 75, 157)" }
  ];
  const BRUSH_SIZES = [
    { name: "Fine", value: 3 },
    { name: "Medium", value: 7 },
    { name: "Broad", value: 14 }
  ];

  const elements = {
    canvas: document.getElementById("drawCanvas"),
    canvasWrap: document.getElementById("canvasWrap"),
    canvasMode: document.getElementById("canvasMode"),
    canvasTitle: document.getElementById("canvasTitle"),
    canvasSummary: document.getElementById("canvasSummary"),
    playbackStamp: document.getElementById("playbackStamp"),
    referenceBadges: document.getElementById("referenceBadges"),
    drawingToolbar: document.getElementById("drawingToolbar"),
    colorControls: document.getElementById("colorControls"),
    sizeControls: document.getElementById("sizeControls"),
    eraserBtn: document.getElementById("eraserBtn"),
    undoBtn: document.getElementById("undoBtn"),
    clearBtn: document.getElementById("clearBtn"),
    guideTitle: document.getElementById("guideTitle"),
    guideCopy: document.getElementById("guideCopy"),
    promptInput: document.getElementById("promptInput"),
    lockBtn: document.getElementById("lockBtn"),
    resumeBtn: document.getElementById("resumeBtn"),
    unlockBtn: document.getElementById("unlockBtn"),
    resetBtn: document.getElementById("resetBtn"),
    sharedFrameSlot: document.getElementById("sharedFrameSlot"),
    runASlots: document.getElementById("runASlots"),
    runBSlots: document.getElementById("runBSlots"),
    timelineStatus: document.getElementById("timelineStatus"),
    comparePanel: document.getElementById("comparePanel"),
    featureInput: document.getElementById("featureInput"),
    playRunA: document.getElementById("playRunA"),
    playRunB: document.getElementById("playRunB"),
    prevFrameBtn: document.getElementById("prevFrameBtn"),
    playBtn: document.getElementById("playBtn"),
    nextFrameBtn: document.getElementById("nextFrameBtn"),
    fpsInput: document.getElementById("fpsInput"),
    fpsOutput: document.getElementById("fpsOutput"),
    guidedBtn: document.getElementById("guidedBtn"),
    statusRegion: document.getElementById("statusRegion"),
    selfTest: document.getElementById("selfTest")
  };

  const context = elements.canvas.getContext("2d", { alpha: false });
  const draftCanvas = document.createElement("canvas");
  const draftContext = draftCanvas.getContext("2d");

  const state = {
    phase: "anchor",
    activeRun: "a",
    sharedAnchor: null,
    runs: { a: [], b: [] },
    color: COLORS[0].value,
    brushSize: BRUSH_SIZES[1].value,
    erasing: false,
    hasInk: false,
    undoStack: [],
    viewing: null,
    activePointer: null,
    lastPoint: null,
    restoringDraft: false,
    fps: 6,
    playbackRun: "a",
    playbackIndex: 0,
    playing: false,
    guidedPlaying: false,
    guidedLabel: "",
    playbackTimer: null,
    guidedQueue: [],
    renderLoopStarts: 0,
    resizeCount: 0
  };

  function announce(message) {
    elements.statusRegion.textContent = message;
  }

  function makeFrame(dataUrl, draftDataUrl) {
    const image = new Image();
    const frame = { dataUrl: dataUrl, draftDataUrl: draftDataUrl, image: image };
    image.addEventListener("load", renderFrame);
    image.src = dataUrl;
    return frame;
  }

  function resizeCanvas() {
    const oldWidth = draftCanvas.width;
    const oldHeight = draftCanvas.height;
    const snapshot = document.createElement("canvas");
    snapshot.width = oldWidth;
    snapshot.height = oldHeight;
    if (oldWidth > 0 && oldHeight > 0) {
      snapshot.getContext("2d").drawImage(draftCanvas, 0, 0);
    }

    const bounds = elements.canvasWrap.getBoundingClientRect();
    const cssWidth = Math.max(280, Math.round(bounds.width));
    const cssHeight = Math.max(168, Math.round(bounds.height));
    const pixelRatio = Math.max(1, Math.min(2, window.devicePixelRatio || 1));
    const width = Math.round(cssWidth * pixelRatio);
    const height = Math.round(cssHeight * pixelRatio);

    if (elements.canvas.width === width && elements.canvas.height === height) {
      return;
    }

    elements.canvas.width = width;
    elements.canvas.height = height;
    draftCanvas.width = width;
    draftCanvas.height = height;
    if (oldWidth > 0 && oldHeight > 0) {
      draftContext.drawImage(snapshot, 0, 0, oldWidth, oldHeight, 0, 0, width, height);
    }
    state.resizeCount += 1;
    renderFrame();
  }

  function fillCanvasBackground(targetContext, targetCanvas) {
    targetContext.save();
    targetContext.globalAlpha = 1;
    targetContext.globalCompositeOperation = "source-over";
    targetContext.fillStyle = CANVAS_BACKGROUND;
    targetContext.fillRect(0, 0, targetCanvas.width, targetCanvas.height);
    targetContext.restore();
  }

  function drawFrameImage(frame, alpha) {
    if (!frame || !frame.image.complete || frame.image.naturalWidth === 0) {
      return;
    }
    context.save();
    context.globalAlpha = alpha;
    context.drawImage(frame.image, 0, 0, elements.canvas.width, elements.canvas.height);
    context.restore();
  }

  function currentReferences() {
    if (state.phase === "run-a") {
      return [state.runs.a[state.runs.a.length - 1]];
    }
    if (state.phase === "run-b") {
      const previous = state.runs.b[state.runs.b.length - 1];
      if (previous && state.sharedAnchor && previous.dataUrl === state.sharedAnchor.dataUrl) {
        return [state.sharedAnchor];
      }
      return [state.sharedAnchor, previous].filter(Boolean);
    }
    return [];
  }

  function frameForViewing() {
    if (!state.viewing) {
      return null;
    }
    if (state.viewing.type === "shared") {
      return state.sharedAnchor;
    }
    return state.runs[state.viewing.run][state.viewing.index] || null;
  }

  function renderFrame() {
    fillCanvasBackground(context, elements.canvas);

    if (state.phase === "compare") {
      const frames = state.runs[state.playbackRun];
      const frame = frames[state.playbackIndex];
      drawFrameImage(frame, 1);
      return;
    }

    const previewFrame = frameForViewing();
    if (previewFrame) {
      drawFrameImage(previewFrame, 1);
      return;
    }

    const references = currentReferences();
    references.forEach(function (frame, index) {
      let alpha = 0.18;
      if (state.phase === "run-b" && index === references.length - 1) {
        alpha = 0.26;
      }
      drawFrameImage(frame, alpha);
    });
    context.drawImage(draftCanvas, 0, 0);
  }

  function startRenderLoop() {
    state.renderLoopStarts += 1;
    function renderLoop() {
      renderFrame();
      window.requestAnimationFrame(renderLoop);
    }
    window.requestAnimationFrame(renderLoop);
  }

  function pointerPosition(event) {
    const bounds = elements.canvas.getBoundingClientRect();
    return {
      x: (event.clientX - bounds.left) * (elements.canvas.width / bounds.width),
      y: (event.clientY - bounds.top) * (elements.canvas.height / bounds.height)
    };
  }

  function saveUndoSnapshot() {
    state.undoStack.push({
      dataUrl: draftCanvas.toDataURL("image/png"),
      hasInk: draftHasInk()
    });
    if (state.undoStack.length > 20) {
      state.undoStack.shift();
    }
    elements.undoBtn.disabled = false;
  }

  function beginStroke(event) {
    if (state.phase === "compare" || state.viewing || state.restoringDraft || state.activePointer !== null) {
      return;
    }
    event.preventDefault();
    saveUndoSnapshot();
    state.activePointer = event.pointerId;
    state.lastPoint = pointerPosition(event);
    elements.canvas.setPointerCapture(event.pointerId);
    drawStroke(state.lastPoint, state.lastPoint);
  }

  function continueStroke(event) {
    if (event.pointerId !== state.activePointer || !state.lastPoint) {
      return;
    }
    event.preventDefault();
    const point = pointerPosition(event);
    drawStroke(state.lastPoint, point);
    state.lastPoint = point;
  }

  function endStroke(event) {
    if (event.pointerId !== state.activePointer) {
      return;
    }
    if (elements.canvas.hasPointerCapture(event.pointerId)) {
      elements.canvas.releasePointerCapture(event.pointerId);
    }
    state.activePointer = null;
    state.lastPoint = null;
    state.hasInk = draftHasInk();
    updateInterface();
  }

  function drawStroke(from, to) {
    const pixelRatio = elements.canvas.width / Math.max(1, elements.canvas.clientWidth);
    draftContext.save();
    draftContext.lineCap = "round";
    draftContext.lineJoin = "round";
    draftContext.lineWidth = state.brushSize * pixelRatio;
    if (state.erasing) {
      draftContext.globalCompositeOperation = "destination-out";
      draftContext.strokeStyle = "rgb(0, 0, 0)";
    } else {
      draftContext.globalCompositeOperation = "source-over";
      draftContext.strokeStyle = state.color;
      state.hasInk = true;
    }
    draftContext.beginPath();
    draftContext.moveTo(from.x, from.y);
    if (from.x === to.x && from.y === to.y) {
      draftContext.lineTo(to.x + 0.01, to.y + 0.01);
    } else {
      draftContext.lineTo(to.x, to.y);
    }
    draftContext.stroke();
    draftContext.restore();
    renderFrame();
  }

  function draftHasInk() {
    if (draftCanvas.width === 0 || draftCanvas.height === 0) {
      return false;
    }
    const pixels = draftContext.getImageData(0, 0, draftCanvas.width, draftCanvas.height).data;
    for (let index = 3; index < pixels.length; index += 4) {
      if (pixels[index] > 0) {
        return true;
      }
    }
    return false;
  }

  function clearDraftWithoutHistory() {
    draftContext.clearRect(0, 0, draftCanvas.width, draftCanvas.height);
    state.hasInk = false;
    state.undoStack = [];
    state.viewing = null;
    renderFrame();
  }

  function clearDraft() {
    if (!draftHasInk()) {
      return;
    }
    saveUndoSnapshot();
    draftContext.clearRect(0, 0, draftCanvas.width, draftCanvas.height);
    state.hasInk = false;
    announce("Current unlocked drawing cleared. Locked frames are unchanged.");
    updateInterface();
  }

  function restoreUndo() {
    const snapshot = state.undoStack.pop();
    if (!snapshot) {
      return;
    }
    const image = new Image();
    image.addEventListener("load", function () {
      draftContext.clearRect(0, 0, draftCanvas.width, draftCanvas.height);
      draftContext.drawImage(image, 0, 0, draftCanvas.width, draftCanvas.height);
      state.hasInk = snapshot.hasInk;
      announce("Last stroke restored.");
      updateInterface();
    });
    image.src = snapshot.dataUrl;
  }

  function captureDraft() {
    const output = document.createElement("canvas");
    output.width = draftCanvas.width;
    output.height = draftCanvas.height;
    const outputContext = output.getContext("2d");
    fillCanvasBackground(outputContext, output);
    outputContext.drawImage(draftCanvas, 0, 0);
    return output.toDataURL("image/png");
  }

  function captureTransparentDraft() {
    return draftCanvas.toDataURL("image/png");
  }

  function lockCurrentFrame() {
    if (state.viewing) {
      announce("Return to the current drawing before locking a frame.");
      return;
    }
    if (!draftHasInk()) {
      state.hasInk = false;
      announce("Blank frames cannot be locked. Add a drawing first.");
      updateInterface();
      return;
    }

    const dataUrl = captureDraft();
    const draftDataUrl = captureTransparentDraft();
    if (state.phase === "anchor") {
      state.sharedAnchor = makeFrame(dataUrl, draftDataUrl);
      state.runs.a = [makeFrame(dataUrl, draftDataUrl)];
      state.runs.b = [makeFrame(dataUrl, draftDataUrl)];
      state.phase = "run-a";
      state.activeRun = "a";
      clearDraftWithoutHistory();
      announce("Shared Frame 1 locked. Run A now sees only the previous locked drawing.");
      updateInterface();
      return;
    }

    if (state.phase === "run-a") {
      state.runs.a.push(makeFrame(dataUrl, draftDataUrl));
      const lockedNumber = state.runs.a.length;
      clearDraftWithoutHistory();
      if (state.runs.a.length === FRAME_TARGET) {
        state.phase = "run-b";
        state.activeRun = "b";
        announce("Run A complete at exactly five frames. Run B begins from the same opening frame.");
      } else {
        announce("Run A Frame " + lockedNumber + " locked. Draw the next frame from the previous ghost.");
      }
      updateInterface();
      return;
    }

    if (state.phase === "run-b") {
      state.runs.b.push(makeFrame(dataUrl, draftDataUrl));
      const lockedNumber = state.runs.b.length;
      clearDraftWithoutHistory();
      if (state.runs.b.length === FRAME_TARGET) {
        enterComparePhase();
        announce("Both runs are locked at five frames. Choose one feature before comparing them.");
      } else {
        announce("Run B Frame " + lockedNumber + " locked. The opening anchor and previous frame remain visible.");
      }
      updateInterface();
    }
  }

  function restoreUnlockedFrame(frame, message) {
    state.restoringDraft = true;
    draftContext.clearRect(0, 0, draftCanvas.width, draftCanvas.height);
    state.hasInk = false;
    state.undoStack = [];
    state.viewing = null;
    announce("Restoring the unlocked frame as an editable drawing…");
    updateInterface();

    const image = new Image();
    image.addEventListener("load", function () {
      draftContext.clearRect(0, 0, draftCanvas.width, draftCanvas.height);
      draftContext.drawImage(image, 0, 0, draftCanvas.width, draftCanvas.height);
      state.hasInk = draftHasInk();
      state.restoringDraft = false;
      announce(message);
      updateInterface();
    });
    image.addEventListener("error", function () {
      state.restoringDraft = false;
      announce("That frame could not be restored. The remaining locked frames are unchanged.");
      updateInterface();
    });
    image.src = frame.draftDataUrl || frame.dataUrl;
  }

  function unlockLastFrame() {
    if (state.phase === "anchor" || state.restoringDraft) {
      return;
    }
    stopAllPlayback();
    state.guidedLabel = "";
    let frame = null;
    let message = "";

    if (state.phase === "compare") {
      frame = state.runs.b.pop();
      state.phase = "run-b";
      state.activeRun = "b";
      state.playbackRun = "b";
      state.playbackIndex = Math.max(0, state.runs.b.length - 1);
      elements.comparePanel.hidden = true;
      message = "Run B Frame 5 reopened. Edit it, then lock it again to return to comparison.";
    } else if (state.phase === "run-b" && state.runs.b.length > 1) {
      const frameNumber = state.runs.b.length;
      frame = state.runs.b.pop();
      message = "Run B Frame " + frameNumber + " reopened as the current editable drawing.";
    } else if (state.phase === "run-b") {
      frame = state.runs.a.pop();
      state.phase = "run-a";
      state.activeRun = "a";
      message = "Run A Frame 5 reopened. Run B is still waiting at the shared opening frame.";
    } else if (state.phase === "run-a" && state.runs.a.length > 1) {
      const frameNumber = state.runs.a.length;
      frame = state.runs.a.pop();
      message = "Run A Frame " + frameNumber + " reopened as the current editable drawing.";
    } else if (state.phase === "run-a") {
      frame = state.sharedAnchor;
      state.sharedAnchor = null;
      state.runs = { a: [], b: [] };
      state.phase = "anchor";
      state.activeRun = "a";
      message = "Shared Frame 1 reopened. Editing it will change the starting point for both runs when you lock it again.";
    }

    if (frame) {
      restoreUnlockedFrame(frame, message);
    }
  }

  function enterComparePhase() {
    state.phase = "compare";
    state.activeRun = "b";
    state.playbackRun = "a";
    state.playbackIndex = 0;
    state.viewing = null;
    elements.comparePanel.hidden = false;
    window.setTimeout(function () {
      elements.comparePanel.scrollIntoView({ behavior: "smooth", block: "start" });
      elements.featureInput.focus({ preventScroll: true });
    }, 100);
  }

  function setPreview(type, run, index) {
    stopAllPlayback();
    if (state.phase === "compare") {
      if (type === "shared") {
        state.playbackIndex = 0;
      } else {
        state.playbackRun = run;
        state.playbackIndex = index;
      }
      updateInterface();
      return;
    }
    state.viewing = { type: type, run: run, index: index };
    announce("Previewing a locked frame. Return to the current drawing to continue.");
    updateInterface();
  }

  function resumeDrawing() {
    state.viewing = null;
    announce("Returned to the current unlocked frame.");
    updateInterface();
  }

  function setPlaybackRun(run) {
    stopAllPlayback();
    state.playbackRun = run;
    state.playbackIndex = Math.min(state.playbackIndex, state.runs[run].length - 1);
    announce("Showing Run " + run.toUpperCase() + " at the shared playback speed.");
    updateInterface();
  }

  function stepPlayback(direction) {
    stopAllPlayback();
    const frames = state.runs[state.playbackRun];
    state.playbackIndex = (state.playbackIndex + direction + frames.length) % frames.length;
    updateInterface();
  }

  function playbackInterval() {
    return Math.round(1000 / state.fps);
  }

  function toggleManualPlayback() {
    if (state.guidedPlaying) {
      return;
    }
    if (state.playing) {
      stopManualPlayback();
      announce("Playback paused.");
      updateInterface();
      return;
    }
    state.playing = true;
    state.playbackTimer = window.setInterval(function () {
      const frames = state.runs[state.playbackRun];
      state.playbackIndex = (state.playbackIndex + 1) % frames.length;
      updateInterface();
    }, playbackInterval());
    announce("Playing Run " + state.playbackRun.toUpperCase() + " at " + state.fps + " frames per second.");
    updateInterface();
  }

  function stopManualPlayback() {
    if (state.playbackTimer !== null) {
      window.clearInterval(state.playbackTimer);
    }
    state.playbackTimer = null;
    state.playing = false;
  }

  function buildGuidedQueue() {
    const queue = [];
    function addPass(run) {
      for (let index = 0; index < FRAME_TARGET; index += 1) {
        queue.push({ type: "frame", run: run, index: index });
      }
    }
    addPass("a");
    queue.push({ type: "pause", label: "Run A · watch again", delay: 600 });
    addPass("a");
    queue.push({ type: "pause", label: "Switching to Run B…", delay: 1200 });
    addPass("b");
    queue.push({ type: "pause", label: "Run B · watch again", delay: 600 });
    addPass("b");
    return queue;
  }

  function scheduleGuidedStep(delay) {
    if (!state.guidedPlaying) {
      return;
    }
    state.playbackTimer = window.setTimeout(advanceGuidedPlayback, delay);
  }

  function toggleGuidedPlayback() {
    if (state.guidedPlaying) {
      stopGuidedPlayback();
      announce("Guided comparison stopped.");
      updateInterface();
      return;
    }
    const feature = elements.featureInput.value.trim();
    if (!feature) {
      announce("Name one feature to watch before starting the guided comparison.");
      elements.featureInput.focus();
      return;
    }
    stopManualPlayback();
    state.guidedPlaying = true;
    state.guidedQueue = buildGuidedQueue();
    state.guidedLabel = "";
    announce("Guided comparison started. Follow “" + feature + "” through Run A twice, then Run B twice.");
    advanceGuidedPlayback();
    updateInterface();
  }

  function advanceGuidedPlayback() {
    const next = state.guidedQueue.shift();
    if (!next) {
      stopGuidedPlayback();
      announce("Guided comparison complete. Toggle A → B → A while naming what changed.");
      updateInterface();
      return;
    }
    if (next.type === "pause") {
      state.guidedLabel = next.label;
      announce(next.label);
      updateInterface();
      scheduleGuidedStep(next.delay);
      return;
    }
    state.guidedLabel = "";
    state.playbackRun = next.run;
    state.playbackIndex = next.index;
    updateInterface();
    scheduleGuidedStep(playbackInterval());
  }

  function stopGuidedPlayback() {
    if (state.playbackTimer !== null) {
      window.clearTimeout(state.playbackTimer);
    }
    state.playbackTimer = null;
    state.guidedPlaying = false;
    state.guidedQueue = [];
    state.guidedLabel = "";
  }

  function stopAllPlayback() {
    stopManualPlayback();
    stopGuidedPlayback();
  }

  function restartPlaybackForSpeedChange() {
    const wasManual = state.playing;
    const wasGuided = state.guidedPlaying;
    if (!wasManual && !wasGuided) {
      return;
    }
    if (state.playbackTimer !== null) {
      if (wasGuided) {
        window.clearTimeout(state.playbackTimer);
      } else {
        window.clearInterval(state.playbackTimer);
      }
    }
    if (wasGuided) {
      scheduleGuidedStep(playbackInterval());
    } else {
      state.playbackTimer = window.setInterval(function () {
        const frames = state.runs[state.playbackRun];
        state.playbackIndex = (state.playbackIndex + 1) % frames.length;
        updateInterface();
      }, playbackInterval());
    }
  }

  function resetAll() {
    const hasWork = state.sharedAnchor !== null || draftHasInk();
    if (hasWork && !window.confirm("Reset both runs and erase every frame? This cannot be undone.")) {
      return;
    }
    stopAllPlayback();
    state.phase = "anchor";
    state.activeRun = "a";
    state.sharedAnchor = null;
    state.runs = { a: [], b: [] };
    state.viewing = null;
    state.restoringDraft = false;
    state.playbackRun = "a";
    state.playbackIndex = 0;
    state.erasing = false;
    state.guidedLabel = "";
    elements.promptInput.disabled = false;
    elements.comparePanel.hidden = true;
    elements.featureInput.value = "";
    clearDraftWithoutHistory();
    announce("All frames reset. Draw a new shared opening frame.");
    updateInterface();
  }

  function createDrawingControls() {
    COLORS.forEach(function (color, index) {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "color-choice";
      button.setAttribute("aria-label", color.name + " drawing color");
      if (index === 0) {
        button.setAttribute("aria-pressed", "true");
      } else {
        button.setAttribute("aria-pressed", "false");
      }
      button.style.setProperty("--choice-color", color.value);
      button.addEventListener("click", function () {
        state.color = color.value;
        state.erasing = false;
        updateInterface();
      });
      elements.colorControls.appendChild(button);
    });

    BRUSH_SIZES.forEach(function (size, index) {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "size-choice";
      button.setAttribute("aria-label", size.name + " brush, " + size.value + " pixels");
      if (index === 1) {
        button.setAttribute("aria-pressed", "true");
      } else {
        button.setAttribute("aria-pressed", "false");
      }
      button.style.setProperty("--choice-size", size.value + "px");
      button.addEventListener("click", function () {
        state.brushSize = size.value;
        updateInterface();
      });
      elements.sizeControls.appendChild(button);
    });
  }

  function makeTimelineSlot(run, frameIndex) {
    const frame = state.runs[run][frameIndex];
    const button = document.createElement("button");
    button.type = "button";
    button.className = "frame-slot";
    const frameNumber = frameIndex + 1;
    if (frame) {
      button.classList.add("locked");
      const image = document.createElement("img");
      image.src = frame.dataUrl;
      image.alt = "";
      button.appendChild(image);
      button.addEventListener("click", function () {
        setPreview("run", run, frameIndex);
      });
      button.setAttribute("aria-label", "Preview Run " + run.toUpperCase() + " Frame " + frameNumber);
    } else {
      button.disabled = true;
      button.classList.add("pending");
      button.setAttribute("aria-label", "Run " + run.toUpperCase() + " Frame " + frameNumber + ", pending");
    }
    if (state.phase === "run-" + run && state.runs[run].length === frameIndex) {
      button.classList.add("current");
    }
    const number = document.createElement("span");
    number.className = "slot-number";
    number.textContent = String(frameNumber);
    const label = document.createElement("span");
    label.className = "slot-state";
    if (frame) {
      label.textContent = "locked";
    } else {
      label.textContent = "pending";
    }
    button.appendChild(number);
    button.appendChild(label);
    return button;
  }

  function updateTimeline() {
    elements.runASlots.replaceChildren();
    elements.runBSlots.replaceChildren();
    for (let index = 1; index < FRAME_TARGET; index += 1) {
      elements.runASlots.appendChild(makeTimelineSlot("a", index));
      elements.runBSlots.appendChild(makeTimelineSlot("b", index));
    }

    elements.sharedFrameSlot.replaceChildren();
    const number = document.createElement("span");
    number.className = "slot-number";
    number.textContent = "1";
    const label = document.createElement("span");
    label.className = "slot-state";
    if (state.sharedAnchor) {
      label.textContent = "locked";
    } else {
      label.textContent = "opening";
    }
    if (state.sharedAnchor) {
      const image = document.createElement("img");
      image.src = state.sharedAnchor.dataUrl;
      image.alt = "";
      elements.sharedFrameSlot.appendChild(image);
      elements.sharedFrameSlot.disabled = false;
      elements.sharedFrameSlot.classList.add("locked");
      elements.sharedFrameSlot.setAttribute("aria-label", "Preview shared Frame 1");
    } else {
      elements.sharedFrameSlot.disabled = true;
      elements.sharedFrameSlot.classList.remove("locked");
      elements.sharedFrameSlot.setAttribute("aria-label", "Shared Frame 1, not locked");
    }
    elements.sharedFrameSlot.appendChild(number);
    elements.sharedFrameSlot.appendChild(label);

    if (!state.sharedAnchor) {
      elements.timelineStatus.textContent = "Draw and lock the shared opening frame to create both branches.";
    } else if (state.phase === "run-a") {
      elements.timelineStatus.textContent = "Run A: " + state.runs.a.length + " of 5 locked. Run B is waiting at the shared anchor.";
    } else if (state.phase === "run-b") {
      elements.timelineStatus.textContent = "Run A complete. Run B: " + state.runs.b.length + " of 5 locked.";
    } else {
      elements.timelineStatus.textContent = "Comparison ready: both runs contain exactly five frames.";
    }
  }

  function updatePhases() {
    const order = ["anchor", "run-a", "run-b", "compare"];
    const currentIndex = order.indexOf(state.phase);
    document.querySelectorAll(".phase-step").forEach(function (step) {
      const stepIndex = order.indexOf(step.dataset.phase);
      const isActive = stepIndex === currentIndex;
      const isComplete = stepIndex < currentIndex;
      step.classList.toggle("active", isActive);
      step.classList.toggle("is-active", isActive);
      step.classList.toggle("complete", isComplete);
      step.classList.toggle("is-complete", isComplete);
      if (isActive) {
        step.setAttribute("aria-current", "step");
      } else {
        step.removeAttribute("aria-current");
      }
    });
  }

  function updateReferences() {
    elements.referenceBadges.replaceChildren();
    const labels = [];
    if (state.phase === "anchor") {
      labels.push("No ghost yet");
    } else if (state.phase === "run-a") {
      labels.push("Previous frame");
    } else if (state.phase === "run-b") {
      labels.push("Opening anchor");
      if (state.runs.b.length > 1) {
        labels.push("Previous frame");
      }
    } else {
      labels.push("Locked playback only");
    }
    labels.forEach(function (label) {
      const badge = document.createElement("span");
      badge.className = "reference-badge active";
      badge.textContent = label;
      elements.referenceBadges.appendChild(badge);
    });
  }

  function updateGuide() {
    let title = "Draw one shared starting point";
    let copy = "Use the vague prompt as a starting condition. Decide the person, setting, object, camera, and pose. This exact drawing will begin both runs.";
    let mode = "Shared opening frame";
    let canvasTitle = "Draw Frame 1";
    let lockLabel = "Lock shared Frame 1";
    let summary = "Opening frame. No frames locked yet. Draw on the blank canvas.";

    if (state.phase === "run-a") {
      const nextFrame = state.runs.a.length + 1;
      title = "Continue motion with the previous frame";
      copy = "Run A gives you one ghost: the drawing you just locked. Redraw the full scene, then change what needs to move.";
      mode = "Run A · previous only";
      canvasTitle = "Draw Frame " + nextFrame + " of 5";
      lockLabel = "Lock Run A · Frame " + nextFrame;
      summary = "Run A has " + state.runs.a.length + " of 5 frames locked. Only the previous frame is ghosted.";
    }
    if (state.phase === "run-b") {
      const nextFrame = state.runs.b.length + 1;
      title = "Continue motion with two references";
      copy = "Run B keeps the shared opening anchor visible while also showing the previous frame. Redraw the full scene under that changed reference condition.";
      mode = "Run B · anchor + previous";
      canvasTitle = "Draw Frame " + nextFrame + " of 5";
      lockLabel = "Lock Run B · Frame " + nextFrame;
      summary = "Run B has " + state.runs.b.length + " of 5 frames locked. The opening anchor and previous frame are ghosted.";
    }
    if (state.phase === "compare") {
      title = "Compare one feature, sequentially";
      copy = "Both runs are fixed at five frames and use one global speed. Choose one feature, then watch A twice and B twice before making a claim.";
      mode = "Comparison playback";
      canvasTitle = "Run " + state.playbackRun.toUpperCase() + " · Frame " + (state.playbackIndex + 1);
      lockLabel = "All frames locked";
      summary = "Run " + state.playbackRun.toUpperCase() + ", Frame " + (state.playbackIndex + 1) + " of 5. Both runs play at " + state.fps + " fps.";
    }
    if (state.viewing && state.phase !== "compare") {
      mode = "Locked-frame preview";
      title = "Inspecting a locked frame";
      copy = "This preview cannot be edited. Return to the current drawing when you are ready to continue the run.";
      if (state.viewing.type === "shared") {
        canvasTitle = "Shared Frame 1";
      } else {
        canvasTitle = "Run " + state.viewing.run.toUpperCase() + " · Frame " + (state.viewing.index + 1);
      }
      summary = "Previewing " + canvasTitle + ". Locked frames are preserved.";
    }

    elements.guideTitle.textContent = title;
    elements.guideCopy.textContent = copy;
    elements.canvasMode.textContent = mode;
    elements.canvasTitle.textContent = canvasTitle;
    elements.lockBtn.textContent = lockLabel;
    elements.canvasSummary.textContent = summary;
    elements.promptInput.disabled = state.phase !== "anchor";
    elements.resumeBtn.hidden = !state.viewing || state.phase === "compare";
    elements.unlockBtn.hidden = state.phase === "anchor" || state.viewing !== null;
    elements.unlockBtn.disabled = state.restoringDraft;
    if (state.phase === "compare") {
      elements.unlockBtn.textContent = "Reopen Run B · Frame 5";
    } else if (state.phase === "run-b" && state.runs.b.length > 1) {
      elements.unlockBtn.textContent = "Unlock Run B · Frame " + state.runs.b.length;
    } else if (state.phase === "run-b") {
      elements.unlockBtn.textContent = "Return to Run A · unlock Frame 5";
    } else if (state.phase === "run-a" && state.runs.a.length > 1) {
      elements.unlockBtn.textContent = "Unlock Run A · Frame " + state.runs.a.length;
    } else if (state.phase === "run-a") {
      elements.unlockBtn.textContent = "Unlock shared Frame 1";
    }
    elements.drawingToolbar.hidden = state.phase === "compare";
    elements.playbackStamp.hidden = state.phase !== "compare";
    if (state.phase === "compare") {
      if (state.guidedLabel) {
        elements.playbackStamp.textContent = state.guidedLabel;
      } else {
        elements.playbackStamp.textContent = "Run " + state.playbackRun.toUpperCase() + " · " + (state.playbackIndex + 1) + "/5";
      }
    }
    elements.canvas.setAttribute("aria-label", summary);
  }

  function updateDrawingControls() {
    const drawingDisabled = state.phase === "compare" || state.viewing !== null || state.restoringDraft;
    document.querySelectorAll(".color-choice").forEach(function (button, index) {
      const selected = COLORS[index].value === state.color && !state.erasing;
      if (selected) {
        button.setAttribute("aria-pressed", "true");
      } else {
        button.setAttribute("aria-pressed", "false");
      }
      button.disabled = drawingDisabled;
    });
    document.querySelectorAll(".size-choice").forEach(function (button, index) {
      if (BRUSH_SIZES[index].value === state.brushSize) {
        button.setAttribute("aria-pressed", "true");
      } else {
        button.setAttribute("aria-pressed", "false");
      }
      button.disabled = drawingDisabled;
    });
    if (state.erasing) {
      elements.eraserBtn.setAttribute("aria-pressed", "true");
    } else {
      elements.eraserBtn.setAttribute("aria-pressed", "false");
    }
    elements.eraserBtn.disabled = drawingDisabled;
    elements.undoBtn.disabled = drawingDisabled || state.undoStack.length === 0;
    elements.clearBtn.disabled = drawingDisabled || !state.hasInk;
    elements.lockBtn.disabled = drawingDisabled || !state.hasInk;
  }

  function updateCompareControls() {
    const runASelected = state.playbackRun === "a";
    elements.playRunA.classList.toggle("active", runASelected);
    if (runASelected) {
      elements.playRunA.setAttribute("aria-pressed", "true");
    } else {
      elements.playRunA.setAttribute("aria-pressed", "false");
    }
    elements.playRunB.classList.toggle("active", !runASelected);
    if (runASelected) {
      elements.playRunB.setAttribute("aria-pressed", "false");
    } else {
      elements.playRunB.setAttribute("aria-pressed", "true");
    }
    if (state.playing) {
      elements.playBtn.textContent = "❚❚ Pause";
    } else {
      elements.playBtn.textContent = "▶ Play";
    }
    elements.playBtn.disabled = state.guidedPlaying;
    elements.prevFrameBtn.disabled = state.guidedPlaying;
    elements.nextFrameBtn.disabled = state.guidedPlaying;
    elements.playRunA.disabled = state.guidedPlaying;
    elements.playRunB.disabled = state.guidedPlaying;
    elements.fpsInput.disabled = state.guidedPlaying;
    elements.guidedBtn.disabled = state.phase !== "compare" || (!elements.featureInput.value.trim() && !state.guidedPlaying);
    if (state.guidedPlaying) {
      elements.guidedBtn.textContent = "Stop guided comparison";
    } else {
      elements.guidedBtn.textContent = "Play A twice, then B twice";
    }
    elements.fpsOutput.textContent = String(state.fps);
  }

  function updateInterface() {
    updatePhases();
    updateGuide();
    updateReferences();
    updateTimeline();
    updateDrawingControls();
    updateCompareControls();
    renderFrame();
  }

  function runSelfTests() {
    const checks = [
      { label: "Two canvas contexts available", pass: Boolean(context && draftContext) },
      { label: "Exactly five frames required per run", pass: FRAME_TARGET === 5 },
      { label: "Six visible drawing colors", pass: elements.colorControls.children.length === COLORS.length },
      { label: "Three keyboard-reachable brush sizes", pass: elements.sizeControls.children.length === BRUSH_SIZES.length },
      { label: "One shared speed control", pass: Boolean(elements.fpsInput && elements.fpsOutput) },
      { label: "One-step frame recovery control", pass: Boolean(elements.unlockBtn) },
      { label: "Single persistent render loop", pass: state.renderLoopStarts === 1 }
    ];
    const list = document.createElement("ul");
    list.className = "self-test-list";
    checks.forEach(function (check) {
      const item = document.createElement("li");
      if (check.pass) {
        item.dataset.result = "pass";
        item.textContent = "Pass · " + check.label;
      } else {
        item.dataset.result = "fail";
        item.textContent = "Fail · " + check.label;
      }
      list.appendChild(item);
    });
    const passed = checks.filter(function (check) { return check.pass; }).length;
    elements.selfTest.replaceChildren(list);
    if (passed === checks.length) {
      elements.selfTest.setAttribute("data-result", "pass");
    } else {
      elements.selfTest.setAttribute("data-result", "fail");
    }
  }

  function bindEvents() {
    elements.canvas.addEventListener("pointerdown", beginStroke);
    elements.canvas.addEventListener("pointermove", continueStroke);
    elements.canvas.addEventListener("pointerup", endStroke);
    elements.canvas.addEventListener("pointercancel", endStroke);
    elements.canvas.addEventListener("contextmenu", function (event) { event.preventDefault(); });
    elements.eraserBtn.addEventListener("click", function () {
      state.erasing = !state.erasing;
      updateInterface();
    });
    elements.undoBtn.addEventListener("click", restoreUndo);
    elements.clearBtn.addEventListener("click", clearDraft);
    elements.lockBtn.addEventListener("click", lockCurrentFrame);
    elements.resumeBtn.addEventListener("click", resumeDrawing);
    elements.unlockBtn.addEventListener("click", unlockLastFrame);
    elements.resetBtn.addEventListener("click", resetAll);
    elements.sharedFrameSlot.addEventListener("click", function () {
      if (state.sharedAnchor) {
        setPreview("shared", "a", 0);
      }
    });
    elements.playRunA.addEventListener("click", function () { setPlaybackRun("a"); });
    elements.playRunB.addEventListener("click", function () { setPlaybackRun("b"); });
    elements.prevFrameBtn.addEventListener("click", function () { stepPlayback(-1); });
    elements.nextFrameBtn.addEventListener("click", function () { stepPlayback(1); });
    elements.playBtn.addEventListener("click", toggleManualPlayback);
    elements.guidedBtn.addEventListener("click", toggleGuidedPlayback);
    elements.featureInput.addEventListener("input", updateCompareControls);
    elements.fpsInput.addEventListener("input", function () {
      state.fps = Number(elements.fpsInput.value);
      restartPlaybackForSpeedChange();
      updateInterface();
    });
    window.addEventListener("resize", resizeCanvas);
    window.addEventListener("beforeunload", function (event) {
      if (!state.sharedAnchor && !draftHasInk()) {
        return;
      }
      event.preventDefault();
      event.returnValue = "";
    });
  }

  function exposeTestSurface() {
    window.CoherenceAnimatorTest = {
      snapshot: function () {
        return {
          phase: state.phase,
          runALength: state.runs.a.length,
          runBLength: state.runs.b.length,
          hasSharedAnchor: Boolean(state.sharedAnchor),
          sharedFramesMatch: Boolean(state.runs.a[0] && state.runs.b[0] && state.runs.a[0].dataUrl === state.runs.b[0].dataUrl),
          fps: state.fps,
          playbackRun: state.playbackRun,
          playbackIndex: state.playbackIndex,
          playing: state.playing,
          guidedPlaying: state.guidedPlaying,
          guidedLabel: state.guidedLabel,
          restoringDraft: state.restoringDraft,
          renderLoopStarts: state.renderLoopStarts,
          resizeCount: state.resizeCount,
          draftHasInk: draftHasInk()
        };
      },
      rerunSelfTests: runSelfTests
    };
  }

  function initialize() {
    createDrawingControls();
    bindEvents();
    resizeCanvas();
    startRenderLoop();
    updateInterface();
    exposeTestSurface();
    window.setTimeout(runSelfTests, 50);
  }

  initialize();
}());
