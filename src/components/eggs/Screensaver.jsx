import { useEffect, useRef } from 'react'
import { profile } from '../../data'

const colours = ['#FF6B57', '#4ADE80', '#F5B94A', '#E8EEF7', '#8EA2FF', '#E7A6C2']

// After a minute idle, the initials drift around like the old DVD screensaver.
// Any input ends it (the App unmounts it). Off entirely for reduced motion.
export default function Screensaver() {
  const logo = useRef(null)

  useEffect(() => {
    const el = logo.current
    let x = Math.random() * (innerWidth - el.offsetWidth)
    let y = Math.random() * (innerHeight - el.offsetHeight)
    let vx = 140
    let vy = 110
    let c = 0
    let last = performance.now()
    let raf
    const tick = (now) => {
      const dt = Math.min(0.05, (now - last) / 1000)
      last = now
      const w = innerWidth - el.offsetWidth
      const h = innerHeight - el.offsetHeight
      x += vx * dt
      y += vy * dt
      let hits = 0
      if (x <= 0 || x >= w) {
        vx = -vx
        x = Math.max(0, Math.min(w, x))
        hits++
      }
      if (y <= 0 || y >= h) {
        vy = -vy
        y = Math.max(0, Math.min(h, y))
        hits++
      }
      if (hits) {
        c = (c + 1) % colours.length
        el.style.color = colours[c]
        // The famous corner hit gets a little flash.
        if (hits === 2) el.animate([{ filter: 'brightness(2)' }, { filter: 'none' }], 600)
      }
      el.style.transform = `translate(${x}px, ${y}px)`
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [])

  return (
    <div className="screensaver" aria-hidden="true">
      <span ref={logo} className="screensaver-logo" style={{ color: colours[0] }}>
        {profile.initials}
        <small>ON AIR</small>
      </span>
    </div>
  )
}
