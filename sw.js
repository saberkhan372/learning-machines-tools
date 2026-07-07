/* Learning Machines — service worker (offline shell).

   Progressive enhancement only. The site works fully without this; the worker
   just makes the shell + Tier-1 tools usable on flaky workshop wifi. Registered
   from field-theme.js, guarded to secure contexts (never file:), and never a
   requirement for any core tool.

   Strategy:
   - Tiny precache: shell, core CSS/JS, homepage, Start Here, session pages,
     Tier-1 tools. Never the whole repo (heavy media is runtime-cached on first
     use instead).
   - The live Wikipedia "Truth Sieve" tools are network-first with NO offline
     fallback — they must never appear to work offline.
   - Bump CACHE on deploy; old caches are purged on activate.

   Paths are relative to the worker's own location (the site root, under any
   GitHub Pages baseurl). */

var CACHE = "lm-shell-v3";

/* Resolved against the SW scope (the site root). */
var PRECACHE = [
  "./",
  "index.html",
  "favicon.svg",
  "assets/field.css",
  "assets/field-sub.css",
  "assets/field-tool.css",
  "assets/field-theme.js",
  "assets/lm-state-url.js",
  "pages/start-here.html",
  "pages/session-text.html",
  "pages/session-1-deck.html",
  "pages/session-images.html",
  "pages/session-2-deck.html",
  "pages/session-video.html",
  "pages/session-3-deck.html",
  "tools/tokenizer-temperature-visualizer/",
  "tools/cfg-scale-visualizer/",
  "tools/metronome-frame-scrubber/"
];

/* Same-origin paths that must never be served stale. */
var NETWORK_ONLY = [
  "network-grounded-truth-sieve",
  "relational-co-occurrence-sieve"
];

self.addEventListener("install", function (event) {
  event.waitUntil(
    caches.open(CACHE).then(function (cache) {
      /* Resilient precache: one bad path must not fail the whole install. */
      return Promise.allSettled(
        PRECACHE.map(function (url) { return cache.add(new Request(url, { cache: "reload" })); })
      );
    }).then(function () { return self.skipWaiting(); })
  );
});

self.addEventListener("activate", function (event) {
  event.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(keys.map(function (k) {
        if (k !== CACHE) { return caches.delete(k); }
      }));
    }).then(function () { return self.clients.claim(); })
  );
});

function isNetworkOnly(url) {
  for (var i = 0; i < NETWORK_ONLY.length; i++) {
    if (url.pathname.indexOf(NETWORK_ONLY[i]) !== -1) { return true; }
  }
  return false;
}

self.addEventListener("fetch", function (event) {
  var req = event.request;
  if (req.method !== "GET") { return; }

  var url = new URL(req.url);

  /* Leave cross-origin (fonts, Wikipedia API, analytics) to the network. */
  if (url.origin !== self.location.origin) { return; }

  /* Live tools: always network, no offline pretence. */
  if (isNetworkOnly(url)) {
    event.respondWith(fetch(req));
    return;
  }

  /* Everything else: cache-first, fall back to network and runtime-cache it
     (this is how heavy media gets cached only on first use). */
  event.respondWith(
    caches.match(req).then(function (cached) {
      if (cached) { return cached; }
      return fetch(req).then(function (resp) {
        if (resp && resp.status === 200 && resp.type === "basic") {
          var copy = resp.clone();
          caches.open(CACHE).then(function (cache) { cache.put(req, copy); });
        }
        return resp;
      }).catch(function () {
        /* Offline and uncached: for a page navigation, offer the cached home. */
        if (req.mode === "navigate") { return caches.match("index.html"); }
        return Response.error();
      });
    })
  );
});
