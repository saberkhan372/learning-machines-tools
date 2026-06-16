#!/usr/bin/env bash
# Build MP4s from the captured PNG frame-kits.
# Requires ffmpeg (https://ffmpeg.org).  macOS: `brew install ffmpeg`
#
# Run from the project root:   bash export/build-mp4.sh
# Output: export/mp4/<poster>.mp4  (H.264, yuv420p, web/social compatible)
#
# Each poster was captured at a specific cadence; the framerate below matches
# the GIF so the MP4 plays at the same real-time speed.

set -e
cd "$(dirname "$0")"          # -> export/
mkdir -p mp4

# poster_id : source-frame-rate (frames per second = 1000 / capture-delay-ms)
build () {
  local id="$1" fps="$2"
  if [ ! -d "frames/$id" ]; then echo "skip $id (no frames)"; return; fi
  echo "building mp4/$id.mp4  @ ${fps}fps"
  ffmpeg -y -loglevel error \
    -framerate "$fps" -i "frames/$id/f%02d.png" \
    -vf "scale=trunc(iw/2)*2:trunc(ih/2)*2,format=yuv420p" \
    -c:v libx264 -crf 18 -preset slow -movflags +faststart \
    "mp4/$id.mp4"
}

build mosh        5      # glitch / dropped keyframe
build slitscan    3.53   # slit-scan title
build signal      8.3    # raw signal columns
build forward     7.14   # forward pass (network)
build terminal    10     # terminal cursor blink
build zine        5      # zine chaos wash
build selfwriting 4.5    # writes itself (token reveal)
build wordbyword  5      # word by word
build square      5      # social square 1080
build story       5      # social story 9:16

echo "done -> export/mp4/"

# --- Optional: longer looped versions (e.g. 4 loops) -------------------------
# Append this after a build to repeat a clip 4x for a longer social video:
#   ffmpeg -y -stream_loop 3 -i mp4/mosh.mp4 -c copy mp4/mosh-loop.mp4
#
# --- Optional: higher-quality GIF re-encode via ffmpeg palette ---------------
# The GIFs in export/gifs/ are already encoded. To regenerate one from frames
# with ffmpeg's palette (sometimes smaller/cleaner):
#   ffmpeg -y -framerate 5 -i frames/mosh/f%02d.png \
#     -vf "split[s0][s1];[s0]palettegen[p];[s1][p]paletteuse" gifs/mosh.gif
