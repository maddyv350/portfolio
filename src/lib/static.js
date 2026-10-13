// TV static: a handful of low-resolution noise frames, rendered once and cycled while active.
// CSS scales the canvas up, so each frame is only ~12k pixels.
export function createStatic(canvas, w = 128, h = 96) {
  canvas.width = w
  canvas.height = h
  const ctx = canvas.getContext('2d', { alpha: false })
  let frames = null
  let raf = 0
  let i = 0
  let last = 0

  const render = () => {
    frames = []
    for (let f = 0; f < 6; f++) {
      const img = ctx.createImageData(w, h)
      const d = img.data
      for (let y = 0; y < h; y++) {
        // Occasional bright rows read as interference bands.
        const band = Math.random() < 0.07 ? 70 : 0
        for (let x = 0; x < w; x++) {
          const p = (y * w + x) * 4
          const v = Math.min(255, ((Math.random() * 210) | 0) + band)
          d[p] = v
          d[p + 1] = v
          d[p + 2] = Math.min(255, v + 10)
          d[p + 3] = 255
        }
      }
      frames.push(img)
    }
  }

  const tick = (t) => {
    if (t - last > 42) {
      ctx.putImageData(frames[i++ % frames.length], 0, 0)
      last = t
    }
    raf = requestAnimationFrame(tick)
  }

  return {
    start() {
      if (raf) return
      if (!frames) render()
      ctx.putImageData(frames[0], 0, 0)
      raf = requestAnimationFrame(tick)
    },
    stop() {
      cancelAnimationFrame(raf)
      raf = 0
    },
  }
}
