// Compact GIF89a encoder — global palette (median cut) + Floyd–Steinberg dither + LZW.
// Exposes window.encodeGIF(frames, opts) -> Uint8Array
// frames: [{ rgba: Uint8ClampedArray (w*h*4) }], opts: { width, height, delayMs, loop }
(function () {
  // ---- Median-cut quantization to <=256 colors from sampled pixels ----
  function quantize(samples) {
    // samples: array of [r,g,b]
    function box(pixels) {
      let rmin = 255, rmax = 0, gmin = 255, gmax = 0, bmin = 255, bmax = 0;
      for (const p of pixels) {
        if (p[0] < rmin) rmin = p[0]; if (p[0] > rmax) rmax = p[0];
        if (p[1] < gmin) gmin = p[1]; if (p[1] > gmax) gmax = p[1];
        if (p[2] < bmin) bmin = p[2]; if (p[2] > bmax) bmax = p[2];
      }
      return { pixels, rmin, rmax, gmin, gmax, bmin, bmax };
    }
    function rangeOf(b) {
      return { r: b.rmax - b.rmin, g: b.gmax - b.gmin, b: b.bmax - b.bmin };
    }
    let boxes = [box(samples)];
    while (boxes.length < 256) {
      // find box with largest range
      let bi = -1, best = -1, axis = "r";
      for (let i = 0; i < boxes.length; i++) {
        if (boxes[i].pixels.length < 2) continue;
        const rg = rangeOf(boxes[i]);
        const m = Math.max(rg.r, rg.g, rg.b);
        if (m > best) { best = m; bi = i; axis = rg.r === m ? 0 : rg.g === m ? 1 : 2; }
      }
      if (bi < 0) break;
      const b = boxes[bi];
      b.pixels.sort((p, q) => p[axis] - q[axis]);
      const mid = b.pixels.length >> 1;
      const a = box(b.pixels.slice(0, mid));
      const c = box(b.pixels.slice(mid));
      boxes.splice(bi, 1, a, c);
    }
    const palette = boxes.map((b) => {
      let r = 0, g = 0, bl = 0;
      for (const p of b.pixels) { r += p[0]; g += p[1]; bl += p[2]; }
      const n = b.pixels.length || 1;
      return [Math.round(r / n), Math.round(g / n), Math.round(bl / n)];
    });
    while (palette.length < 256) palette.push([0, 0, 0]);
    return palette;
  }

  function nearest(palette, r, g, b) {
    let bi = 0, bd = Infinity;
    for (let i = 0; i < palette.length; i++) {
      const p = palette[i];
      const dr = r - p[0], dg = g - p[1], db = b - p[2];
      const d = dr * dr + dg * dg + db * db;
      if (d < bd) { bd = d; bi = i; }
    }
    return bi;
  }

  // ---- LZW (GIF variant) ----
  function lzwEncode(minCodeSize, indices) {
    const out = [];
    let cur = 0, curBits = 0;
    function emit(code, bits) {
      cur |= code << curBits; curBits += bits;
      while (curBits >= 8) { out.push(cur & 0xff); cur >>= 8; curBits -= 8; }
    }
    const clear = 1 << minCodeSize;
    const eoi = clear + 1;
    let dict = new Map();
    let next, codeSize;
    function reset() {
      dict = new Map();
      for (let i = 0; i < clear; i++) dict.set(String(i), i);
      next = eoi + 1; codeSize = minCodeSize + 1;
    }
    reset();
    emit(clear, codeSize);
    let prefix = String(indices[0]);
    for (let i = 1; i < indices.length; i++) {
      const k = indices[i];
      const combo = prefix + "," + k;
      if (dict.has(combo)) { prefix = combo; }
      else {
        emit(dict.get(prefix), codeSize);
        dict.set(combo, next++);
        if (next > (1 << codeSize) && codeSize < 12) codeSize++;
        if (next > 4095) { emit(clear, codeSize); reset(); }
        prefix = String(k);
      }
    }
    emit(dict.get(prefix), codeSize);
    emit(eoi, codeSize);
    if (curBits > 0) out.push(cur & 0xff);
    return out;
  }

  function encodeGIF(frames, opts) {
    const { width, height, delayMs = 100, loop = 0 } = opts;
    // Build global palette from sampled pixels across frames
    const samples = [];
    const step = Math.max(1, Math.floor((width * height) / 4000));
    for (const f of frames) {
      const d = f.rgba;
      for (let i = 0; i < width * height; i += step) {
        samples.push([d[i * 4], d[i * 4 + 1], d[i * 4 + 2]]);
      }
    }
    const palette = quantize(samples);

    // cache nearest lookups
    const cache = new Map();
    function near(r, g, b) {
      const key = (r >> 2) << 12 | (g >> 2) << 6 | (b >> 2);
      let v = cache.get(key);
      if (v === undefined) { v = nearest(palette, r, g, b); cache.set(key, v); }
      return v;
    }

    const bytes = [];
    function push(...b) { for (const x of b) bytes.push(x & 0xff); }
    function pushStr(s) { for (let i = 0; i < s.length; i++) bytes.push(s.charCodeAt(i)); }

    pushStr("GIF89a");
    push(width & 255, width >> 8, height & 255, height >> 8);
    push(0xf7, 0, 0); // global color table, 256 colors, 8 bpp
    for (const c of palette) push(c[0], c[1], c[2]);
    // Netscape loop extension
    push(0x21, 0xff, 11);
    pushStr("NETSCAPE2.0");
    push(3, 1, loop & 255, loop >> 8, 0);

    const delayCs = Math.max(2, Math.round(delayMs / 10));

    for (const f of frames) {
      // Graphic control extension
      push(0x21, 0xf9, 4, 0x04, delayCs & 255, delayCs >> 8, 0, 0);
      // Image descriptor
      push(0x2c, 0, 0, 0, 0, width & 255, width >> 8, height & 255, height >> 8, 0);
      // index pixels with Floyd-Steinberg dithering
      const d = f.rgba;
      const idx = new Uint8Array(width * height);
      const err = new Float32Array(width * height * 3);
      for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
          const p = y * width + x;
          let r = d[p * 4] + err[p * 3];
          let g = d[p * 4 + 1] + err[p * 3 + 1];
          let b = d[p * 4 + 2] + err[p * 3 + 2];
          r = r < 0 ? 0 : r > 255 ? 255 : r;
          g = g < 0 ? 0 : g > 255 ? 255 : g;
          b = b < 0 ? 0 : b > 255 ? 255 : b;
          const ci = near(r | 0, g | 0, b | 0);
          idx[p] = ci;
          const pc = palette[ci];
          const er = r - pc[0], eg = g - pc[1], eb = b - pc[2];
          function add(nx, ny, f) {
            if (nx < 0 || nx >= width || ny < 0 || ny >= height) return;
            const np = (ny * width + nx) * 3;
            err[np] += er * f; err[np + 1] += eg * f; err[np + 2] += eb * f;
          }
          add(x + 1, y, 7 / 16); add(x - 1, y + 1, 3 / 16);
          add(x, y + 1, 5 / 16); add(x + 1, y + 1, 1 / 16);
        }
      }
      const minCode = 8;
      push(minCode);
      const lzw = lzwEncode(minCode, idx);
      // sub-blocks
      for (let i = 0; i < lzw.length; i += 255) {
        const chunk = lzw.slice(i, i + 255);
        push(chunk.length);
        for (const b of chunk) push(b);
      }
      push(0);
    }
    push(0x3b);
    return new Uint8Array(bytes);
  }

  window.encodeGIF = encodeGIF;
})();
