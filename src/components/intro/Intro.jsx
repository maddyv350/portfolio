import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { profile } from '../../data'
import { audio } from '../../lib/audio'
import { useClock, usePointerVars } from '../../hooks'
import Remote from './Remote'

export const Speaker = ({ muted, className = 'size-3.5' }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M4 9h4l5-4v14l-5-4H4z" />
    {muted ? <path d="M17 9l5 6M22 9l-5 6" /> : <path d="M17 8.5a5 5 0 0 1 0 7M19.5 6a8.5 8.5 0 0 1 0 12" />}
  </svg>
)

// GSAP is only needed for this timeline, so it's fetched here and nowhere else.
let gsapLib = null
const loadGsap = () => (gsapLib ? Promise.resolve(gsapLib) : import('gsap').then((m) => (gsapLib = m.gsap || m.default)))

// The first-visit intro. The room is an overlay; the TV is the real hero TV, lifted above the overlay
// and centred with the inverse half of a FLIP. Landing animates that transform back to identity.
export default function Intro({ tv, onLand, onDone }) {
  const root = useRef(null)
  const remoteWrap = useRef(null)
  const ok = useRef(null)
  const ir = useRef(null)
  const timeline = useRef(null)
  const flip = useRef({ x: 0, y: 0, scale: 1 })
  const stage = useRef('standby')
  const [step, setStep] = useState('standby') // standby → booting → landing
  const [caption, setCaption] = useState('')
  const [muted, setMuted] = useState(audio.muted)
  const time = useClock(profile.timeZone)
  usePointerVars(root)

  const go = (s) => {
    stage.current = s
    setStep(s)
  }

  useEffect(() => {
    loadGsap().catch(() => {})
    return audio.subscribe(() => setMuted(audio.muted))
  }, [])

  // Centre the TV over the room, sized to the viewport.
  useLayoutEffect(() => {
    history.scrollRestoration = 'manual'
    window.scrollTo(0, 0)
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', '#070B14')
    const el = tv.current.root
    const place = () => {
      if (stage.current === 'landing') return
      el.style.transform = ''
      const r = el.getBoundingClientRect()
      const vw = window.innerWidth
      const vh = window.innerHeight
      const narrow = vw < 640
      const w = Math.min(vw * (narrow ? 0.88 : 0.56), 820, (vh * (narrow ? 0.46 : 0.58) * r.width) / r.height)
      const scale = w / r.width
      const cy = vh * (narrow ? 0.4 : 0.43)
      const x = vw / 2 - (r.left + r.width / 2)
      const y = cy - (r.top + r.height / 2)
      flip.current = { x, y, scale }
      el.style.transform = `translate(${x}px, ${y}px) scale(${scale})`
      root.current.style.setProperty('--tv-bottom', `${cy + (r.height * scale) / 2}px`)
      root.current.style.setProperty('--tv-cy', `${(cy / vh) * 100}%`)
    }
    place()
    // Web fonts can shift the hero layout under us; re-centre once they're in.
    document.fonts?.ready.then(place)
    window.addEventListener('resize', place)
    return () => window.removeEventListener('resize', place)
  }, [tv])

  const finish = () => {
    const set = tv.current
    set.root.style.transform = ''
    onDone()
    setTimeout(() => set.show('live'), 1300)
  }

  // Glide the TV into its hero slot while the room fades away.
  const land = (fast = false) => {
    if (stage.current === 'landing') return
    go('landing')
    setCaption('')
    onLand()
    const gsap = gsapLib
    const el = tv.current.root
    if (!gsap) return finish()
    gsap.fromTo(
      el,
      { x: flip.current.x, y: flip.current.y, scale: flip.current.scale },
      {
        x: 0,
        y: 0,
        scale: 1,
        duration: fast ? 0.55 : 1,
        ease: fast ? 'power3.out' : 'power3.inOut',
        onComplete: () => {
          gsap.set(el, { clearProps: 'transform' })
          if (!fast) audio.play('thunk')
          finish()
        },
      },
    )
    gsap.to(root.current, { opacity: 0, duration: fast ? 0.35 : 0.85, delay: fast ? 0 : 0.1, ease: 'power1.inOut' })
    gsap.to(remoteWrap.current, { yPercent: 35, opacity: 0, duration: 0.7, ease: 'power2.in' })
  }

  // Standby → power on → static → colour bars → ident → land. About 4.4s.
  const boot = (gsap) => {
    const n = tv.current.nodes
    const t = gsap.timeline({ onComplete: () => land() })
    timeline.current = t
    t.set(n.picture, { scaleY: 0.006 }, 0)
      .call(() => audio.play('click'), null, 0)
      .to(ok.current, { scale: 0.88, y: 2, duration: 0.07, ease: 'power2.in' }, 0)
      .to(ok.current, { scale: 1, y: 0, duration: 0.4, ease: 'back.out(3)' }, 0.1)
      .fromTo(ir.current, { opacity: 0 }, { opacity: 1, duration: 0.05, repeat: 5, yoyo: true, ease: 'none' }, 0.04)
      .set(ir.current, { opacity: 0 }, 0.34)
      .call(
        () => {
          tv.current.setPower('on')
          audio.play('relay')
          setCaption('POWERING ON')
        },
        null,
        0.3,
      )
      .call(() => audio.play('powerOn'), null, 0.42)
      .fromTo(n.dot, { opacity: 1, scale: 0 }, { scale: 1, duration: 0.18, ease: 'back.out(2.5)' }, 0.42)
      .fromTo(n.line, { opacity: 1, scaleX: 0 }, { scaleX: 1, duration: 0.26, ease: 'power3.out' }, 0.62)
      .set(n.dot, { opacity: 0 }, 0.66)
      .call(() => tv.current.show('static'), null, 0.86)
      .to(n.picture, { scaleY: 1, duration: 0.34, ease: 'back.out(1.7)' }, 0.88)
      .to(n.line, { opacity: 0, duration: 0.18 }, 0.9)
      .fromTo(n.flash, { opacity: 0.85 }, { opacity: 0, duration: 0.6, ease: 'power2.out', immediateRender: false }, 0.88)
      .call(() => audio.play('hiss', { dur: 0.75 }), null, 0.88)
      .call(
        () => {
          tv.current.show('bars', { flick: 0 })
          audio.play('tone', { dur: 0.48 })
          setCaption('TUNING · CH 01')
        },
        null,
        1.72,
      )
      .call(() => tv.current.show('ident', { flick: 90 }), null, 2.26)
      .to({}, { duration: 1.2 }, 2.26)
  }

  const press = () => {
    if (stage.current === 'booting') return timeline.current?.timeScale(3) // impatient: fast-forward
    if (stage.current !== 'standby') return
    audio.unlock()
    go('booting')
    loadGsap().then(boot).catch(skip)
  }

  const skip = () => {
    if (stage.current === 'landing') return
    const fromStandby = stage.current === 'standby'
    timeline.current?.kill()
    const n = tv.current.nodes
    for (const node of [n.dot, n.line, n.flash, n.picture]) node.removeAttribute('style')
    gsapLib?.set(ok.current, { clearProps: 'all' })
    if (fromStandby) tv.current.powerOn({ to: 'ident' })
    else {
      tv.current.setPower('on')
      tv.current.show('ident', { flick: 0 })
    }
    land(true)
  }

  // Enter / Space presses OK (unless a button has focus); Escape skips.
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') return skip()
      if ((e.key === 'Enter' || e.key === ' ') && !e.target.closest?.('button, a')) {
        e.preventDefault()
        press()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  })

  const stop = (fn) => (e) => {
    e.stopPropagation()
    fn()
  }

  return (
    <div
      ref={root}
      className="intro"
      data-theme="dark"
      data-step={step}
      onClick={press}
      role="dialog"
      aria-modal="true"
      aria-label="Intro: a television on standby"
      style={step === 'landing' ? { pointerEvents: 'none' } : undefined}
    >
      <div className="intro-wall" aria-hidden="true" />
      <div className="intro-spill" aria-hidden="true" />
      <div className="intro-floor" aria-hidden="true" />
      <div className="intro-vignette" aria-hidden="true" />
      <div ref={remoteWrap} className="intro-remote" aria-hidden="true">
        <Remote okRef={ok} irRef={ir} />
      </div>

      <div className="intro-bar">
        <span className="flex items-center gap-2">
          <span
            className={`size-2 rounded-full ${step === 'standby' ? 'bg-[#FF4B3E]' : 'bg-[#4ADE80]'}`}
            aria-hidden="true"
          />
          {step === 'standby' ? 'STANDBY' : 'ON'} · <span className="tabular-nums">{time}</span> IST
        </span>
        <button type="button" className="intro-btn" onClick={stop(skip)}>
          Skip intro <span aria-hidden="true">→</span>
        </button>
      </div>

      <div className="intro-press">
        {step === 'standby' ? (
          <>
            <button type="button" onClick={stop(press)} aria-label="Press OK to turn on the TV">
              PRESS <kbd>OK</kbd>
              <i className="cursor" aria-hidden="true" />
            </button>
            <small aria-hidden="true">click · tap · enter · space</small>
          </>
        ) : (
          caption && (
            <span className="intro-caption" aria-live="polite">
              {caption}
              <i className="cursor" aria-hidden="true" />
            </span>
          )
        )}
      </div>

      {step !== 'standby' && audio.unlocked && (
        <button
          type="button"
          className="intro-btn intro-sound"
          aria-pressed={!muted}
          onClick={stop(() => audio.setMuted(!muted))}
        >
          <Speaker muted={muted} /> Sound {muted ? 'off' : 'on'}
        </button>
      )}
    </div>
  )
}
