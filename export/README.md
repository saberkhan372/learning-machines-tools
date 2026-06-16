# Animated poster exports

Finished **animated GIFs** plus **MP4 frame-kits** for the 10 posters that actually move.
(The other ~35 boards are static prints — a still as "video" would just be a frozen frame, so they're not included here.)

## What's in this folder

```
export/
├─ gifs/                ← FINISHED animated GIFs (use these directly)
│   ├─ mosh.gif         glitch / dropped keyframe
│   ├─ slitscan.gif     slit-scan title
│   ├─ signal.gif       raw signal columns
│   ├─ forward.gif      forward pass (network)
│   ├─ terminal.gif     terminal cursor
│   ├─ zine.gif         zine chaos
│   ├─ selfwriting.gif  writes itself (token reveal)
│   ├─ wordbyword.gif   word by word
│   ├─ square.gif       social square 1080×1080
│   └─ story.gif        social story 9:16
│
├─ frames/<poster>/     ← PNG frame-kits (one folder per poster) → for MP4
├─ build-mp4.sh         ← run this to turn frame-kits into MP4s
├─ mp4/                 ← MP4s land here after you run build-mp4.sh
└─ Animated Posters.html ← preview gallery of every GIF
```

## GIFs — ready now
Everything in `gifs/` is a real, finished animated GIF. Drag them straight into
Slack, a doc, social, email, a web page — done.

## MP4s — one command
MP4/H.264 has to be encoded with a video codec, which isn't available in the
design environment — so the frames are captured for you and ffmpeg finishes the job:

1. Install ffmpeg if you don't have it — macOS: `brew install ffmpeg`
   (Windows: https://ffmpeg.org/download.html, or `winget install ffmpeg`).
2. From the project root, run:  `bash export/build-mp4.sh`
3. MP4s appear in `export/mp4/`.

Each clip's framerate is already set to match its GIF so it plays at the right speed.

## Notes on quality
- **Resolution** is 417×540 (and 540² / 304×540 for the social pair) — sized to the
  capture viewport. Great for web/social. If you need full-resolution 850×1100,
  that's the one thing this in-environment pipeline can't do — use the standalone
  HTML + a headless recorder (timecut / Puppeteer) for native-res output.
- **Looping**: these animations are slow/ambient with long, non-matching periods
  (glitch 3.8 s, hue wash 14 s, drift 46 s), so a couple don't loop *perfectly* —
  there may be a tiny jump at the wrap. mosh / slit-scan / forward loop cleanly.
- The token-reveal posters (writes-itself, word-by-word) were captured in real time,
  so their pacing is approximate rather than frame-exact.
