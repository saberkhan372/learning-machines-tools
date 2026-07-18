/* Learning Machines — local continuity state.
   Local-only, synchronous, and intentionally small: notes, page flags,
   export/import, and legacy worksheet aggregation for the Field Notebook. */
(function () {
  var VERSION = 1;
  var PREFIX = "lm:v1:";
  var PAGE_SCOPE = "pages";
  var NOTE_SCOPE = "notes";
  var META_SCOPE = "meta";
  var ARTIFACT_SCOPE = "artifacts";
  var DB_NAME = "learning-machines-continuity";
  var DB_VERSION = 1;
  var ARTIFACT_STORE = "artifacts";
  var LEGACY_WORKSHEETS = [
    { key: "lm-ai-consent", title: "AI Use + Consent Checklist", session: "Cross", path: "worksheets/ai-use-consent-checklist/" },
    { key: "lm-text-experiment", title: "Text Experiment Board", session: "Session 1", path: "worksheets/text-experiment-board/" },
    { key: "lm-image-default-test", title: "Image Default Test Board", session: "Session 2", path: "worksheets/image-default-test-board/" },
    { key: "lm-video-test-report", title: "Video Test Report", session: "Session 3", path: "worksheets/video-test-report/" },
    { key: "lm-model-investigation", title: "Model Investigation Journal", session: "Studio", path: "worksheets/model-investigation-journal/" }
  ];
  var LEGACY_TOOL_KEYS = [
    { key: "lm-abc-comparison-board", title: "A / B / C Comparison Board", session: "Studio", path: "tools/abc-comparison-board/" },
    { key: "lm-model-card-builder", title: "Model Card Builder", session: "Studio", path: "tools/model-card-builder/" },
    { key: "lm-cfg-scale", title: "Prompt Pressure (CFG scale)", session: "Session 2", path: "tools/cfg-scale-visualizer/" },
    { key: "lm-tool21", title: "Latent Space Compressor", session: "Session 2", path: "tools/latent-space-compressor/" },
    { key: "lm-tool23", title: "Metronome Frame-Scrubber", session: "Session 3", path: "tools/metronome-frame-scrubber/" }
  ];

  var available = true;
  var lastError = null;

  function markUnavailable(err) {
    available = false;
    lastError = err || null;
  }

  function storageGet(key) {
    try { return localStorage.getItem(key); }
    catch (err) { markUnavailable(err); return null; }
  }

  function storageSet(key, value) {
    try { localStorage.setItem(key, value); available = true; return true; }
    catch (err) { markUnavailable(err); return false; }
  }

  function storageRemove(key) {
    try { localStorage.removeItem(key); return true; }
    catch (err) { markUnavailable(err); return false; }
  }

  function storageKeys() {
    try {
      var keys = [];
      for (var i = 0; i < localStorage.length; i += 1) keys.push(localStorage.key(i));
      available = true;
      return keys;
    } catch (err) {
      markUnavailable(err);
      return [];
    }
  }

  function scopedKey(scope, key) {
    return PREFIX + encodeURIComponent(scope) + ":" + encodeURIComponent(key);
  }

  function parseScopedKey(fullKey) {
    if (fullKey.indexOf(PREFIX) !== 0) return null;
    var rest = fullKey.slice(PREFIX.length);
    var split = rest.indexOf(":");
    if (split < 0) return null;
    return {
      scope: decodeURIComponent(rest.slice(0, split)),
      key: decodeURIComponent(rest.slice(split + 1))
    };
  }

  function readJson(fullKey, fallback) {
    var raw = storageGet(fullKey);
    if (raw === null || raw === undefined) return fallback;
    try { return JSON.parse(raw); }
    catch (err) { return fallback; }
  }

  function writeJson(fullKey, value) {
    return storageSet(fullKey, JSON.stringify(value));
  }

  function get(scope, key, fallback) {
    var val = readJson(scopedKey(scope, key), undefined);
    return val === undefined ? fallback : val;
  }

  function set(scope, key, value) {
    return writeJson(scopedKey(scope, key), value);
  }

  function remove(scope, key) {
    return storageRemove(scopedKey(scope, key));
  }

  function list(scope) {
    var prefix = PREFIX + encodeURIComponent(scope) + ":";
    var out = {};
    storageKeys().forEach(function (key) {
      if (key.indexOf(prefix) !== 0) return;
      var parsed = parseScopedKey(key);
      if (!parsed) return;
      out[parsed.key] = readJson(key, null);
    });
    return out;
  }

  function clearScope(scope) {
    var prefix = PREFIX + encodeURIComponent(scope) + ":";
    storageKeys().forEach(function (key) {
      if (key.indexOf(prefix) === 0) storageRemove(key);
    });
  }

  function clearAll() {
    storageKeys().forEach(function (key) {
      if (key.indexOf(PREFIX) === 0) storageRemove(key);
    });
    LEGACY_WORKSHEETS.concat(LEGACY_TOOL_KEYS).forEach(function (meta) {
      storageRemove(meta.key);
    });
    return clearArtifacts();
  }

  function openDB() {
    return new Promise(function (resolve, reject) {
      if (!("indexedDB" in window)) {
        reject(new Error("IndexedDB is not available in this browser."));
        return;
      }
      var req;
      try { req = indexedDB.open(DB_NAME, DB_VERSION); }
      catch (err) { reject(err); return; }
      req.onupgradeneeded = function () {
        var db = req.result;
        if (!db.objectStoreNames.contains(ARTIFACT_STORE)) {
          db.createObjectStore(ARTIFACT_STORE, { keyPath: "id" });
        }
      };
      req.onsuccess = function () { resolve(req.result); };
      req.onerror = function () { reject(req.error || new Error("Could not open artifact storage.")); };
    });
  }

  function withArtifactStore(mode, fn) {
    return openDB().then(function (db) {
      return new Promise(function (resolve, reject) {
        var tx = db.transaction(ARTIFACT_STORE, mode);
        var store = tx.objectStore(ARTIFACT_STORE);
        var value;
        tx.oncomplete = function () { db.close(); resolve(value); };
        tx.onerror = function () { db.close(); reject(tx.error || new Error("Artifact storage failed.")); };
        try { value = fn(store); }
        catch (err) { db.close(); reject(err); }
      });
    });
  }

  function requestPromise(req) {
    return new Promise(function (resolve, reject) {
      req.onsuccess = function () { resolve(req.result); };
      req.onerror = function () { reject(req.error || new Error("Artifact request failed.")); };
    });
  }

  function makeArtifactId() {
    return "artifact-" + Date.now().toString(36) + "-" + Math.random().toString(36).slice(2, 9);
  }

  function rootBase() {
    var script = document.currentScript || document.getElementById("lm-state-js");
    if (script && script.src) return script.src.replace(/assets\/lm-state\.js.*$/, "");
    return new URL(".", window.location.href).toString();
  }

  function notebookHref() {
    return new URL("pages/notebook.html", rootBase()).toString();
  }

  function pageId(url) {
    var u;
    try { u = new URL(url || window.location.href, window.location.href); }
    catch (err) { return String(url || window.location.href); }
    var path = u.pathname.replace(/\/index\.html$/, "/");
    return path + u.search;
  }

  function titleForPage() {
    var h1 = document.querySelector("h1");
    var title = h1 ? h1.textContent : document.title;
    return String(title || "Untitled page").replace(/\s+/g, " ").trim();
  }

  function sessionForPage() {
    var mod = document.documentElement.getAttribute("data-mod") || "";
    var path = window.location.pathname;
    if (path.indexOf("session-text") >= 0 || path.indexOf("text-experiment") >= 0) return "Session 1";
    if (path.indexOf("session-images") >= 0 || path.indexOf("image-default") >= 0) return "Session 2";
    if (path.indexOf("session-video") >= 0 || path.indexOf("video-test") >= 0) return "Session 3";
    if (path.indexOf("showcase") >= 0 || path.indexOf("model-investigation") >= 0) return "Studio";
    if (mod === "text") return "Session 1";
    if (mod === "image") return "Session 2";
    if (mod === "video") return "Session 3";
    return "Cross";
  }

  function markPage(url, flags) {
    var id = pageId(url);
    var current = get(PAGE_SCOPE, id, {});
    if (!current || typeof current !== "object") current = {};
    var next = {};
    Object.keys(current).forEach(function (k) { next[k] = current[k]; });
    Object.keys(flags || {}).forEach(function (k) { next[k] = flags[k]; });
    next.url = id;
    next.href = window.location.href;
    next.title = next.title || titleForPage();
    next.session = next.session || sessionForPage();
    next.updatedAt = new Date().toISOString();
    set(PAGE_SCOPE, id, next);
    return next;
  }

  function getPage(url) {
    return get(PAGE_SCOPE, pageId(url), null);
  }

  function saveNote(url, text) {
    var id = pageId(url);
    var note = {
      url: id,
      href: window.location.href,
      title: titleForPage(),
      session: sessionForPage(),
      text: String(text || ""),
      updatedAt: new Date().toISOString()
    };
    set(NOTE_SCOPE, id, note);
    if (note.text.trim()) markPage(url, { saved: true });
    return note;
  }

  function getNote(url) {
    return get(NOTE_SCOPE, pageId(url), null);
  }

  function hasValue(value) {
    if (value === true) return true;
    if (typeof value === "string") return value.trim() !== "";
    return value !== false && value !== null && value !== undefined && value !== "";
  }

  function readLegacyJson(key) {
    var raw = storageGet(key);
    if (!raw) return null;
    try { return JSON.parse(raw); }
    catch (err) { return null; }
  }

  function legacyEntries() {
    var entries = [];
    LEGACY_WORKSHEETS.forEach(function (meta) {
      var data = readLegacyJson(meta.key);
      if (!data) return;
      var filled = Object.keys(data).filter(function (key) { return hasValue(data[key]); });
      if (!filled.length) return;
      entries.push({
        kind: "worksheet",
        legacyKey: meta.key,
        title: meta.title,
        session: meta.session,
        path: meta.path,
        data: data,
        filled: filled.length
      });
    });
    LEGACY_TOOL_KEYS.forEach(function (meta) {
      var data = readLegacyJson(meta.key);
      if (!data) return;
      entries.push({
        kind: "tool",
        legacyKey: meta.key,
        title: meta.title,
        session: meta.session,
        path: meta.path,
        data: data,
        filled: Object.keys(data).length
      });
    });
    return entries;
  }

  function artifactMetadataList() {
    var data = list(ARTIFACT_SCOPE);
    return Object.keys(data).map(function (id) { return data[id]; }).filter(Boolean)
      .sort(function (a, b) { return String(b.createdAt || "").localeCompare(String(a.createdAt || "")); });
  }

  function allContinuityEntries() {
    return {
      pages: list(PAGE_SCOPE),
      notes: list(NOTE_SCOPE),
      legacy: legacyEntries(),
      artifacts: artifactMetadataList()
    };
  }

  function saveArtifact(input) {
    input = input || {};
    var blob = input.blob;
    if (!blob || typeof blob.size !== "number") {
      return Promise.reject(new Error("saveArtifact requires a Blob."));
    }
    var id = input.id || makeArtifactId();
    var now = new Date().toISOString();
    var meta = {
      id: id,
      type: input.type || blob.type || "artifact",
      title: input.title || "Captured artifact",
      mime: blob.type || input.mime || "",
      size: blob.size,
      tool: input.tool || (input.meta && input.meta.tool) || "",
      page: pageId(window.location.href),
      href: window.location.href,
      session: sessionForPage(),
      meta: input.meta || {},
      createdAt: now,
      updatedAt: now
    };
    return withArtifactStore("readwrite", function (store) {
      store.put({ id: id, blob: blob, meta: meta });
    }).then(function () {
      set(ARTIFACT_SCOPE, id, meta);
      markPage(window.location.href, { saved: true });
      return meta;
    }).catch(function (err) {
      lastError = err;
      throw err;
    });
  }

  function getArtifact(id) {
    return withArtifactStore("readonly", function (store) {
      return requestPromise(store.get(id));
    });
  }

  function listArtifacts() {
    var metas = artifactMetadataList();
    if (!metas.length) return Promise.resolve([]);
    return openDB().then(function (db) {
      return Promise.all(metas.map(function (meta) {
        return new Promise(function (resolve) {
          var tx = db.transaction(ARTIFACT_STORE, "readonly");
          var req = tx.objectStore(ARTIFACT_STORE).get(meta.id);
          req.onsuccess = function () {
            var row = req.result || {};
            resolve(Object.assign({}, meta, { blob: row.blob || null }));
          };
          req.onerror = function () { resolve(Object.assign({}, meta, { blob: null })); };
        });
      })).then(function (items) { db.close(); return items; });
    }).catch(function () {
      return metas.map(function (meta) { return Object.assign({}, meta, { blob: null }); });
    });
  }

  function deleteArtifact(id) {
    remove(ARTIFACT_SCOPE, id);
    return withArtifactStore("readwrite", function (store) {
      store.delete(id);
    }).catch(function (err) {
      lastError = err;
      return false;
    });
  }

  function clearArtifacts() {
    clearScope(ARTIFACT_SCOPE);
    return withArtifactStore("readwrite", function (store) {
      store.clear();
    }).catch(function (err) {
      lastError = err;
      return false;
    });
  }

  function exportAll() {
    var scoped = {};
    storageKeys().forEach(function (key) {
      if (key.indexOf(PREFIX) !== 0) return;
      scoped[key] = storageGet(key);
    });
    var legacy = {};
    LEGACY_WORKSHEETS.concat(LEGACY_TOOL_KEYS).forEach(function (meta) {
      var raw = storageGet(meta.key);
      if (raw) legacy[meta.key] = raw;
    });
    return {
      schema: "learning-machines-continuity",
      version: VERSION,
      exportedAt: new Date().toISOString(),
      source: document.title || "Learning Machines",
      scoped: scoped,
      legacy: legacy
    };
  }

  function previewImport(payload) {
    var parsed = typeof payload === "string" ? JSON.parse(payload) : payload;
    if (!parsed || parsed.schema !== "learning-machines-continuity") {
      throw new Error("This is not a Learning Machines continuity export.");
    }
    if (parsed.version > VERSION) {
      throw new Error("This export was made by a newer Notebook version.");
    }
    return {
      version: parsed.version,
      scopedCount: parsed.scoped ? Object.keys(parsed.scoped).length : 0,
      legacyCount: parsed.legacy ? Object.keys(parsed.legacy).length : 0,
      exportedAt: parsed.exportedAt || ""
    };
  }

  function importAll(payload, options) {
    var parsed = typeof payload === "string" ? JSON.parse(payload) : payload;
    var preview = previewImport(parsed);
    var mode = options && options.mode;
    if (mode !== "merge" && mode !== "replace") throw new Error("Choose merge or replace before importing.");
    if (mode === "replace") clearAll();
    Object.keys(parsed.scoped || {}).forEach(function (key) {
      if (key.indexOf(PREFIX) === 0) storageSet(key, parsed.scoped[key]);
    });
    Object.keys(parsed.legacy || {}).forEach(function (key) {
      var known = LEGACY_WORKSHEETS.concat(LEGACY_TOOL_KEYS).some(function (meta) { return meta.key === key; });
      if (known) storageSet(key, parsed.legacy[key]);
    });
    return preview;
  }

  function escapeHtml(str) {
    return String(str || "").replace(/[&<>"']/g, function (ch) {
      return ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[ch];
    });
  }

  function shouldSuppressAffordance() {
    if (document.documentElement.hasAttribute("data-no-notebook")) return true;
    if (document.documentElement.getAttribute("data-projection") === "on") return true;
    if (window.self !== window.top) return true;
    if (document.fullscreenElement) return true;
    return false;
  }

  function injectStyles() {
    if (document.getElementById("lm-notebook-style")) return;
    var style = document.createElement("style");
    style.id = "lm-notebook-style";
    style.textContent = [
      ".lm-notebook-widget{position:fixed;right:16px;bottom:72px;z-index:940;display:flex;flex-direction:column;align-items:flex-end;gap:8px;font-family:var(--font-body);}",
      ".lm-notebook-widget[hidden]{display:none!important}",
      ".lm-notebook-toggle,.lm-notebook-panel button,.lm-notebook-panel a{border:1px solid var(--line);background:var(--surface);color:var(--ink);border-radius:2px;font:600 12px var(--font-mono);padding:8px 10px;text-decoration:none;cursor:pointer}",
      ".lm-notebook-toggle:hover,.lm-notebook-panel button:hover,.lm-notebook-panel a:hover{border-color:var(--accent);color:var(--accent)}",
      ".lm-notebook-panel{width:min(320px,calc(100vw - 28px));border:1px solid var(--line);background:var(--surface);box-shadow:0 12px 30px rgba(0,0,0,.16);padding:12px;display:grid;gap:10px}",
      ".lm-notebook-panel[hidden]{display:none!important}",
      ".lm-notebook-panel h2{font-size:15px;margin:0}.lm-notebook-panel p{margin:0;color:var(--muted);font-size:12px;line-height:1.45}",
      ".lm-notebook-panel textarea{width:100%;min-height:88px;resize:vertical;border:1px solid var(--line);background:var(--surface-2);color:var(--ink);padding:8px;font:14px var(--font-body)}",
      ".lm-notebook-actions{display:flex;flex-wrap:wrap;gap:6px}.lm-notebook-danger{color:#b42318!important}",
      "@media (max-width:520px){.lm-notebook-widget{right:10px;bottom:0;}}",
      "@media print{.lm-notebook-widget{display:none!important}}",
      "html[data-projection='on'] .lm-notebook-widget{display:none!important}"
    ].join("\n");
    document.head.appendChild(style);
  }

  function buildAffordance() {
    if (!document.body || document.getElementById("lm-notebook-widget")) return;
    if (document.documentElement.hasAttribute("data-no-notebook")) return;
    /* Embedded frames (e.g. tool previews) suppress the affordance forever,
       so skip building the widget and its observer there entirely. */
    if (window.self !== window.top) return;
    injectStyles();
    var id = pageId(window.location.href);
    var note = getNote(window.location.href);
    var page = getPage(window.location.href) || {};
    var root = document.createElement("div");
    root.id = "lm-notebook-widget";
    root.className = "lm-notebook-widget";
    root.innerHTML =
      '<div class="lm-notebook-panel" hidden>' +
        '<h2>Notes in this browser</h2>' +
        '<p>Saved locally on this device. Nothing is uploaded or synced.</p>' +
        '<textarea aria-label="Notebook note for this page"></textarea>' +
        '<div class="lm-notebook-actions">' +
          '<button type="button" data-lm-save-note>Save note</button>' +
          '<button type="button" data-lm-save-page>Save page</button>' +
          '<button type="button" data-lm-later>Bring back later</button>' +
          '<a data-lm-open-notebook href="' + escapeHtml(notebookHref()) + '">Open Notebook</a>' +
          '<button class="lm-notebook-danger" type="button" data-lm-clear-page>Clear this page</button>' +
        '</div>' +
        '<p data-lm-note-status></p>' +
      '</div>' +
      '<button class="lm-notebook-toggle" type="button" aria-expanded="false">Notebook</button>';
    document.body.appendChild(root);
    var panel = root.querySelector(".lm-notebook-panel");
    var toggle = root.querySelector(".lm-notebook-toggle");
    var textarea = root.querySelector("textarea");
    var status = root.querySelector("[data-lm-note-status]");
    textarea.value = note && note.text ? note.text : "";
    if (page.saved || page.bringBackLater) toggle.textContent = page.bringBackLater ? "Notebook *" : "Notebook";

    function syncHidden() { root.hidden = shouldSuppressAffordance(); }
    function say(msg) { status.textContent = msg; }
    toggle.addEventListener("click", function () {
      var open = panel.hasAttribute("hidden");
      if (open) panel.removeAttribute("hidden");
      else panel.setAttribute("hidden", "");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    root.querySelector("[data-lm-save-note]").addEventListener("click", function () {
      saveNote(window.location.href, textarea.value);
      say("Saved note for this page.");
    });
    root.querySelector("[data-lm-save-page]").addEventListener("click", function () {
      markPage(window.location.href, { saved: true, title: titleForPage(), session: sessionForPage() });
      say("Saved this page.");
    });
    root.querySelector("[data-lm-later]").addEventListener("click", function () {
      markPage(window.location.href, { bringBackLater: true, title: titleForPage(), session: sessionForPage() });
      say("Marked to bring back later.");
      toggle.textContent = "Notebook *";
    });
    root.querySelector("[data-lm-clear-page]").addEventListener("click", function () {
      if (!confirm("Clear Notebook note and flags for this page on this device?")) return;
      remove(NOTE_SCOPE, id);
      remove(PAGE_SCOPE, id);
      textarea.value = "";
      say("Cleared this page from the Notebook.");
      toggle.textContent = "Notebook";
    });
    document.addEventListener("fullscreenchange", syncHidden);
    syncHidden();
    /* Guarded: one review environment saw observe() reject the target on a
       cold load. Degrade to no auto-hide on projection toggle, not a break. */
    try {
      var observer = new MutationObserver(syncHidden);
      observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-projection"] });
    } catch (err) {}
  }

  function markVisited() {
    if (document.documentElement.hasAttribute("data-no-notebook")) return;
    var path = window.location.pathname;
    if (!path || path.indexOf("/assets/") >= 0) return;
    markPage(window.location.href, { visited: true, title: titleForPage(), session: sessionForPage() });
    set(META_SCOPE, "lastVisited", {
      url: pageId(window.location.href),
      href: window.location.href,
      title: titleForPage(),
      session: sessionForPage(),
      updatedAt: new Date().toISOString()
    });
  }

  function ready(fn) {
    if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", fn);
    else fn();
  }

  var api = {
    version: VERSION,
    get available() { return available; },
    get lastError() { return lastError; },
    get: get,
    set: set,
    remove: remove,
    list: list,
    clearScope: clearScope,
    clearAll: clearAll,
    markPage: markPage,
    getPage: getPage,
    saveNote: saveNote,
    getNote: getNote,
    exportAll: exportAll,
    previewImport: previewImport,
    importAll: importAll,
    saveArtifact: saveArtifact,
    getArtifact: getArtifact,
    listArtifacts: listArtifacts,
    deleteArtifact: deleteArtifact,
    clearArtifacts: clearArtifacts,
    pageId: pageId,
    entries: allContinuityEntries,
    legacyEntries: legacyEntries,
    notebookHref: notebookHref,
    escapeHtml: escapeHtml
  };

  window.LMState = api;
  ready(function () {
    markVisited();
    buildAffordance();
    window.dispatchEvent(new CustomEvent("lmstate:ready", { detail: api }));
  });
})();
