import { useEffect, useRef, useState } from 'react'

export const prefersReducedMotion = () => matchMedia('(prefers-reduced-motion: reduce)').matches

// Which section is under the top ~40% of the viewport.
export function useActiveSection(ids) {
  const [active, setActive] = useState(ids[0])
  useEffect(() => {
    const onScroll = () => {
      let cur = ids[0]
      for (const id of ids) {
        const el = document.getElementById(id)
        if (el && el.getBoundingClientRect().top < window.innerHeight * 0.4) cur = id
      }
      if (window.innerHeight + window.scrollY >= document.body.scrollHeight - 4) cur = ids[ids.length - 1]
      setActive(cur)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [ids])
  return active
}

// Slides `.reveal` elements in once, only if they start below the fold.
export function useReveal() {
  useEffect(() => {
    const els = [...document.querySelectorAll('.reveal')]
    const below = els.filter((el) => el.getBoundingClientRect().top > window.innerHeight)
    below.forEach((el) => el.classList.add('pending'))
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.remove('pending')
            io.unobserve(e.target)
          }
        }),
      { rootMargin: '0px 0px -10% 0px' },
    )
    below.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])
}

export const themeColor = (theme) => (theme === 'light' ? '#EEF2F7' : '#0A0F1A')

export function useTheme() {
  const [theme, setTheme] = useState(() => document.documentElement.dataset.theme || 'dark')
  useEffect(() => {
    document.documentElement.dataset.theme = theme
    // The intro is always dark; it sets its own theme-color until it ends.
    if (document.documentElement.dataset.intro !== 'full') {
      document.querySelector('meta[name="theme-color"]')?.setAttribute('content', themeColor(theme))
    }
    try {
      localStorage.setItem('theme', theme)
    } catch {}
  }, [theme])
  return [theme, () => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))]
}

export function useClock(timeZone) {
  const fmt = () => new Date().toLocaleTimeString('en-GB', { timeZone, hour: '2-digit', minute: '2-digit' })
  const [time, setTime] = useState(fmt)
  useEffect(() => {
    const t = setInterval(() => setTime(fmt()), 10000)
    return () => clearInterval(t)
  }, [])
  return time
}

// Fraction of the page scrolled, 0 → 1.
export function useScrollProgress() {
  const [p, setP] = useState(0)
  useEffect(() => {
    let raf = 0
    const read = () => {
      raf = 0
      const max = document.documentElement.scrollHeight - window.innerHeight
      setP(max > 0 ? Math.min(1, window.scrollY / max) : 0)
    }
    const onScroll = () => raf || (raf = requestAnimationFrame(read))
    read()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      cancelAnimationFrame(raf)
    }
  }, [])
  return p
}

// Writes the pointer position (-0.5 → 0.5) to --px / --py on an element, for CSS-only tilt and parallax.
export function usePointerVars(ref) {
  useEffect(() => {
    const el = ref.current
    if (!el || matchMedia('(pointer: coarse), (prefers-reduced-motion: reduce)').matches) return
    let raf = 0
    let x = 0
    let y = 0
    const write = () => {
      raf = 0
      el.style.setProperty('--px', x.toFixed(3))
      el.style.setProperty('--py', y.toFixed(3))
    }
    const onMove = (e) => {
      x = e.clientX / window.innerWidth - 0.5
      y = e.clientY / window.innerHeight - 0.5
      raf ||= requestAnimationFrame(write)
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => {
      window.removeEventListener('pointermove', onMove)
      cancelAnimationFrame(raf)
    }
  }, [ref])
}

// True while the element is on screen and the tab is visible.
export function useOnScreen(ref) {
  const [on, setOn] = useState(true)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    let inView = true
    const update = () => setOn(inView && !document.hidden)
    const io = new IntersectionObserver(([e]) => {
      inView = e.isIntersecting
      update()
    })
    io.observe(el)
    document.addEventListener('visibilitychange', update)
    return () => {
      io.disconnect()
      document.removeEventListener('visibilitychange', update)
    }
  }, [ref])
  return on
}

// '2025-07' → "1 yr 4 mo", counted up to today (inclusive, like LinkedIn).
export function durationSince(ym) {
  const [y, m] = ym.split('-').map(Number)
  const now = new Date()
  const months = (now.getFullYear() - y) * 12 + (now.getMonth() + 1 - m) + 1
  const yrs = Math.floor(months / 12)
  const mos = months % 12
  return [yrs && `${yrs} yr`, mos && `${mos} mo`].filter(Boolean).join(' ') || '1 mo'
}

// True after `ms` with no input at all.
export function useIdle(ms, enabled = true) {
  const [idle, setIdle] = useState(false)
  useEffect(() => {
    setIdle(false)
    if (!enabled) return
    let t
    const reset = () => {
      setIdle(false)
      clearTimeout(t)
      t = setTimeout(() => setIdle(true), ms)
    }
    const events = ['pointermove', 'pointerdown', 'keydown', 'wheel', 'touchstart', 'scroll']
    events.forEach((e) => window.addEventListener(e, reset, { passive: true }))
    reset()
    return () => {
      clearTimeout(t)
      events.forEach((e) => window.removeEventListener(e, reset))
    }
  }, [ms, enabled])
  return idle
}

// ↑ ↑ ↓ ↓ ← → ← → B A
const KONAMI = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'].join()
export function useKonami(onMatch) {
  const cb = useRef(onMatch)
  cb.current = onMatch
  useEffect(() => {
    let keys = []
    const onKey = (e) => {
      keys = [...keys, e.key.length === 1 ? e.key.toLowerCase() : e.key].slice(-10)
      if (keys.join() === KONAMI) {
        keys = []
        cb.current()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])
}

// A boolean preference remembered in localStorage.
export function useStoredFlag(key, initial) {
  const [on, setOn] = useState(() => {
    try {
      const v = localStorage.getItem(key)
      return v == null ? initial : v === '1'
    } catch {
      return initial
    }
  })
  useEffect(() => {
    try {
      localStorage.setItem(key, on ? '1' : '0')
    } catch {}
  }, [key, on])
  return [on, () => setOn((v) => !v)]
}
