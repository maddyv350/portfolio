import { useCallback, useEffect, useRef, useState } from 'react'
import Nav from './components/Nav'
import Hero from './components/Hero'
import Experience from './components/Experience'
import Projects from './components/Projects'
import Education from './components/Education'
import Skills from './components/Skills'
import Extras from './components/Extras'
import Contact, { Footer } from './components/Contact'
import Intro from './components/intro/Intro'
import PowerOff from './components/eggs/PowerOff'
import HiddenChannel from './components/eggs/HiddenChannel'
import Screensaver from './components/eggs/Screensaver'
import Toast from './components/eggs/Toast'
import { lineup } from './lib/lineup'
import { audio } from './lib/audio'
import { prefersReducedMotion, themeColor, useIdle, useKonami, useReveal, useStoredFlag, useTheme } from './hooks'

const root = document.documentElement
// Decided in index.html before first paint: 'full' | 'quick' | 'none' (reduced motion).
const mode = root.dataset.intro || 'quick'

export default function App() {
  const tv = useRef(null)
  const lastFocus = useRef(null)
  const toastTimer = useRef(0)
  const [intro, setIntro] = useState(mode === 'full')
  const [live, setLive] = useState(mode !== 'full')
  const [power, setPower] = useState('on')
  const [nowShowing, setNowShowing] = useState(null)
  const [hidden, setHidden] = useState(false)
  const [bw, setBw] = useState(false)
  const [toast, setToast] = useState('')
  const [theme, toggleTheme] = useTheme()
  const [scan, toggleScan] = useStoredFlag('onair:scanlines', true)
  const idle = useIdle(60_000, !intro && power === 'on' && !prefersReducedMotion())
  useReveal()

  // Repeat visits get a 600ms power-on instead of the full intro.
  useEffect(() => {
    if (mode === 'quick') tv.current.powerOn()
  }, [])

  const endIntro = () => {
    setIntro(false)
    root.dataset.intro = 'done'
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', themeColor(root.dataset.theme))
    try {
      sessionStorage.setItem('onair:seen', '1')
    } catch {}
  }

  const flash = (message) => {
    setToast(message)
    clearTimeout(toastTimer.current)
    toastTimer.current = setTimeout(() => setToast(''), 2400)
  }

  // Tune to a section: scroll there, and move focus too when a key or tile asked for it.
  const tune = useCallback((id, { focus = false } = {}) => {
    const el = document.getElementById(id)
    if (!el) return
    audio.play('blip')
    el.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth', block: 'start' })
    if (focus) el.focus({ preventScroll: true })
  }, [])

  // Power: the page collapses to a line, then a dot (CSS keyed off html[data-power]).
  const powerOff = () => {
    lastFocus.current = document.activeElement
    root.style.setProperty('--po-y', `${window.scrollY + window.innerHeight / 2}px`)
    root.dataset.power = 'off'
    audio.play('powerOff')
    setHidden(false)
    setPower('off')
  }
  const powerOn = useCallback(() => {
    root.dataset.power = 'on'
    audio.play('powerOn')
    setPower('on')
    setTimeout(() => {
      if (root.dataset.power === 'on') delete root.dataset.power
    }, 700)
    requestAnimationFrame(() => lastFocus.current?.focus?.({ preventScroll: true }))
  }, [])

  // Digit keys change channel; 0 is the hidden one.
  useEffect(() => {
    const onKey = (e) => {
      if (intro || power === 'off' || e.metaKey || e.ctrlKey || e.altKey) return
      if (e.target.closest?.('input, textarea, select, [contenteditable="true"]')) return
      if (e.key === 'Escape' && hidden) return setHidden(false)
      if (!/^[0-9]$/.test(e.key)) return
      if (e.key === '0') {
        audio.play('blip')
        return setHidden((h) => !h)
      }
      const c = lineup[Number(e.key) - 1]
      if (c) tune(c.id, { focus: true })
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [intro, power, hidden, tune])

  // Konami code: black-and-white broadcast.
  useKonami(() => !intro && setBw((b) => !b))
  const firstBw = useRef(true)
  useEffect(() => {
    root.classList.toggle('bw', bw)
    if (firstBw.current) {
      firstBw.current = false
      return
    }
    flash(bw ? 'B&W BROADCAST · 1954 MODE' : 'COLOUR RESTORED')
  }, [bw])

  const offAir = intro || power === 'off'

  return (
    <>
      {!offAir && (
        <a
          href="#main"
          className="sr-only z-50 rounded-lg bg-accent px-4 py-2 text-accent-ink focus:not-sr-only focus:fixed focus:top-4 focus:left-4"
        >
          Skip to content
        </a>
      )}
      <div className="site" {...(offAir && { inert: '' })}>
        <Nav theme={theme} onTheme={toggleTheme} scan={scan} onScan={toggleScan} onPower={powerOff} onTune={tune} />
        <main id="main" tabIndex={-1} className={`outline-none ${mode === 'none' ? 'page-fade' : ''}`}>
          <Hero live={live} tv={tv} tvInitial={mode === 'none' ? 'on' : 'standby'} onChannel={setNowShowing} />
          <Experience />
          <Projects nowShowing={nowShowing} />
          <Education />
          <Skills />
          <Extras />
          <Contact />
        </main>
        <Footer onPower={powerOff} />
      </div>

      {scan && <div className="crt-lines" aria-hidden="true" />}
      <Toast message={toast} />
      <HiddenChannel open={hidden && power === 'on'} onClose={() => setHidden(false)} />
      {idle && <Screensaver />}
      {power === 'off' && <PowerOff onOn={powerOn} />}
      {intro && <Intro tv={tv} onLand={() => setLive(true)} onDone={endIntro} />}
    </>
  )
}
