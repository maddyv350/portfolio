import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react'
import { profile, projects } from '../../data'
import { createStatic } from '../../lib/static'
import { audio } from '../../lib/audio'
import { prefersReducedMotion, useOnScreen, usePointerVars } from '../../hooks'
import { scenes, TitleCard, ColourBars, Ident } from './channels'

const HOLD = 4200 // ms each channel stays on air
const FLICK = 190 // ms of static between channels

export const channelNumber = (i) => `3.${i + 1}`

// The set itself. `initial`: 'standby' waits for the intro (or a quick power-on); 'on' is already playing.
// The intro drives the warm-up through the handle: `nodes` for GSAP, `show()` for what's on screen.
const TV = forwardRef(function TV({ initial = 'standby', onChannel }, ref) {
  const root = useRef(null)
  const canvas = useRef(null)
  const dot = useRef(null)
  const line = useRef(null)
  const picture = useRef(null)
  const flash = useRef(null)
  const noise = useRef(null)
  const timers = useRef([])

  const [power, setPower] = useState(initial === 'on' ? 'on' : 'standby')
  const [show, setShow] = useState(initial === 'on' ? 'live' : 'off') // off | static | bars | ident | live
  const [ch, setCh] = useState(0)
  const [flicking, setFlicking] = useState(false)
  const [crt, setCrt] = useState(null)
  const onScreen = useOnScreen(root)
  usePointerVars(root)

  const later = (fn, ms) => timers.current.push(setTimeout(fn, ms))
  useEffect(() => () => timers.current.forEach(clearTimeout), [])

  useEffect(() => {
    noise.current = createStatic(canvas.current)
    return () => noise.current.stop()
  }, [])
  const staticOn = flicking || show === 'static'
  useEffect(() => {
    if (staticOn) noise.current?.start()
    else noise.current?.stop()
  }, [staticOn])

  // Change what's on screen behind a short burst of static.
  const switchTo = (fn, { sound = false, flick = FLICK } = {}) => {
    if (sound) audio.play('blip')
    if (!flick || prefersReducedMotion()) return fn()
    setFlicking(true)
    later(() => {
      fn()
      setFlicking(false)
    }, flick)
  }
  const step = (delta, opts) =>
    switchTo(() => {
      setShow('live')
      setCh((c) => (c + delta + projects.length) % projects.length)
    }, opts)

  // Channel surfing: each project holds for HOLD ms, paused while off screen or for reduced motion.
  useEffect(() => {
    if (show !== 'live' || !onScreen || prefersReducedMotion()) return
    const t = setTimeout(() => step(1), HOLD)
    return () => clearTimeout(t)
  }, [show, ch, onScreen])

  // Tell the page what's on, so the programme guide can mark it "ON NOW".
  useEffect(() => {
    onChannel?.(show === 'live' ? ch : null)
  }, [show, ch, onChannel])

  useImperativeHandle(
    ref,
    () => ({
      root: root.current,
      nodes: { dot: dot.current, line: line.current, picture: picture.current, flash: flash.current },
      setPower,
      show: (s, opts) => (s === 'static' ? setShow('static') : switchTo(() => setShow(s), opts)),
      // Quick CSS power-on (repeat visits, skipped intro).
      powerOn({ to = 'live' } = {}) {
        setPower('on')
        setShow(to)
        setCrt('on')
        later(() => setCrt(null), 700)
      },
      step,
    }),
    [],
  )

  const p = projects[ch]
  const live = show === 'live'
  const Scene = scenes[p.scene] || TitleCard
  const glow = live ? p.brand : 'var(--c-accent)'
  const label =
    show === 'off'
      ? 'A television on standby'
      : live
        ? `Television showing channel ${channelNumber(ch)}, ${p.name}. ${p.sceneLabel}`
        : `Television showing ${profile.name}'s broadcast ident`

  return (
    <div ref={root} className="tv-root tv-hero" data-power={power} style={{ '--glow': glow }}>
      <div className="tv-glow" aria-hidden="true" />
      <div className="tv-tilt">
        <div className="tv-body">
          <div className="tv-well">
            <div
              className={`scr ${onScreen ? '' : 'paused'}`}
              data-show={show}
              data-static={staticOn}
              data-crt={crt ?? undefined}
              role="img"
              aria-label={label}
            >
              <div ref={picture} className="scr-picture">
                <div className="scr-content">
                  {show === 'bars' && <ColourBars />}
                  {show === 'ident' && <Ident />}
                  {live && <Scene key={ch} p={p} />}
                </div>
                <canvas ref={canvas} className="scr-static" />
                <div className="scr-sync" />
                {(live || show === 'ident' || show === 'bars') && (
                  <div className="osd">
                    {show !== 'bars' && (
                      <span className="osd-live">
                        <i /> LIVE
                      </span>
                    )}
                    <span key={live ? ch : show} className="osd-ch">
                      <b>CH {live ? channelNumber(ch) : '01'}</b>
                      {live ? p.name : show === 'bars' ? 'Tuning' : 'On air'}
                    </span>
                  </div>
                )}
              </div>
              <div ref={flash} className="scr-flash" />
              <div ref={dot} className="scr-dot" />
              <div ref={line} className="scr-line" />
              <div className="scr-scan" />
              <div className="scr-glass" />
            </div>
          </div>
          <div className="tv-chin">
            <span className="tv-led" aria-hidden="true" />
            <span className="tv-brand" aria-hidden="true">
              {profile.initials}-01
            </span>
            <span className="flex-1" />
            <span className="tv-grille" aria-hidden="true" />
            <button
              type="button"
              className="tv-btn"
              disabled={power !== 'on'}
              onClick={() => step(-1, { sound: true })}
              aria-label="Previous channel"
            >
              CH−
            </button>
            <button
              type="button"
              className="tv-btn"
              disabled={power !== 'on'}
              onClick={() => step(1, { sound: true })}
              aria-label="Next channel"
            >
              CH+
            </button>
          </div>
        </div>
        <div className="tv-feet" aria-hidden="true" />
      </div>
    </div>
  )
})

export default TV
