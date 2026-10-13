import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { profile } from '../data'
import { lineup, ids } from '../lib/lineup'
import { createStatic } from '../lib/static'
import { audio } from '../lib/audio'
import { prefersReducedMotion, useActiveSection, useClock, useScrollProgress } from '../hooks'
import { Icon } from './Icons'

const total = String(lineup.length).padStart(2, '0')

// Scroll progress, drawn around the channel number.
function Ring({ value }) {
  const r = 14
  const c = 2 * Math.PI * r
  return (
    <svg viewBox="0 0 32 32" className="absolute inset-0 size-full -rotate-90" aria-hidden="true">
      <circle cx="16" cy="16" r={r} fill="none" stroke="rgba(255,255,255,.14)" strokeWidth="2.5" />
      <circle
        cx="16"
        cy="16"
        r={r}
        fill="none"
        stroke="#FF6B57"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeDasharray={c}
        strokeDashoffset={c * (1 - value)}
      />
    </svg>
  )
}

const RecDot = ({ className = 'size-1.5' }) => (
  <span className={`live-dot shrink-0 rounded-full bg-[#FF4B3E] ${className}`} style={{ '--dot': '#FF4B3E' }} aria-hidden="true" />
)

function Control({ icon, label, pressed, onClick, tabIndex, className = '' }) {
  return (
    <button
      type="button"
      onClick={onClick}
      tabIndex={tabIndex}
      aria-label={label}
      aria-pressed={pressed}
      title={label}
      className={`grid size-10 place-items-center rounded-full transition-colors ${
        pressed === false ? 'bg-white/5 text-white/45 hover:bg-white/12' : 'bg-white/10 hover:bg-white/20'
      } ${className}`}
    >
      <Icon name={icon} className="size-[18px]" />
    </button>
  )
}

// The nav is the TV's on-screen display: a compact channel pill that springs open into a remote.
export default function Nav({ theme, onTheme, scan, onScan, onPower, onTune }) {
  const active = useActiveSection(ids)
  const progress = useScrollProgress()
  const time = useClock(profile.timeZone)
  const [open, setOpen] = useState(false)
  const [bump, setBump] = useState(false)
  const [muted, setMuted] = useState(audio.muted)
  const [panelH, setPanelH] = useState(260)
  const island = useRef(null)
  const panel = useRef(null)
  const canvas = useRef(null)
  const noise = useRef(null)
  const closeTimer = useRef(0)
  const cursor = useRef(0)
  const current = lineup.find((c) => c.id === active) ?? lineup[0]

  useEffect(() => audio.subscribe(() => setMuted(audio.muted)), [])
  useEffect(() => {
    noise.current = createStatic(canvas.current, 64, 16)
    return () => noise.current.stop()
  }, [])

  // A small bump and a flicker of static whenever the channel changes.
  const first = useRef(true)
  useEffect(() => {
    if (first.current) {
      first.current = false
      return
    }
    if (prefersReducedMotion()) return
    setBump(true)
    noise.current.start()
    const a = setTimeout(() => noise.current.stop(), 240)
    const b = setTimeout(() => setBump(false), 460)
    return () => {
      clearTimeout(a)
      clearTimeout(b)
      noise.current.stop()
    }
  }, [active])

  // The island grows to exactly the panel's height.
  useLayoutEffect(() => {
    const ro = new ResizeObserver(() => panel.current && setPanelH(panel.current.offsetHeight))
    ro.observe(panel.current)
    return () => ro.disconnect()
  }, [])

  // Escape or a tap outside closes it. While open, ↑/↓ change channel like a remote.
  useEffect(() => {
    if (!open) return
    cursor.current = ids.indexOf(active)
    const onKey = (e) => {
      if (e.key === 'Escape') {
        setOpen(false)
        island.current.querySelector('.island-compact')?.focus()
      } else if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        e.preventDefault()
        const n = lineup.length
        cursor.current = (cursor.current + (e.key === 'ArrowDown' ? 1 : -1) + n) % n
        const next = lineup[cursor.current]
        onTune(next.id)
        panel.current.querySelector(`[data-id="${next.id}"]`)?.focus({ preventScroll: true })
      }
    }
    const onDown = (e) => island.current && !island.current.contains(e.target) && setOpen(false)
    window.addEventListener('keydown', onKey)
    window.addEventListener('pointerdown', onDown)
    return () => {
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('pointerdown', onDown)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open])

  const hoverable = () => matchMedia('(hover: hover) and (pointer: fine)').matches
  const enter = () => {
    clearTimeout(closeTimer.current)
    if (hoverable()) setOpen(true)
  }
  const leave = () => {
    if (hoverable()) closeTimer.current = setTimeout(() => setOpen(false), 200)
  }
  const tab = open ? 0 : -1

  return (
    <header className="sticky top-[env(safe-area-inset-top,0px)] z-40 h-[72px]">
      <div className="relative mx-auto flex h-full max-w-[1180px] items-center justify-between px-4 sm:px-6">
        <a
          href="#home"
          className="hidden items-center gap-2.5 rounded-full border border-line bg-bg/70 py-2 pr-4 pl-2 font-display text-lg leading-none font-extrabold tracking-tight backdrop-blur md:flex"
        >
          <span className="rounded-[5px] border border-accent px-1.5 py-[5px] font-mono text-[10px] leading-none font-semibold tracking-[0.14em] text-accent">
            ON AIR
          </span>
          <span>
            sachin<span className="text-muted">.verma</span>
          </span>
        </a>
        <a
          href="#contact"
          className="ml-auto hidden rounded-full border border-line bg-bg/70 px-4 py-2.5 text-sm leading-none font-semibold backdrop-blur transition-colors hover:border-accent md:block"
        >
          Contact
        </a>
      </div>

      <div
        ref={island}
        onMouseEnter={enter}
        onMouseLeave={leave}
        onFocus={(e) => e.target.matches(':focus-visible') && setOpen(true)}
        onBlur={(e) => !e.currentTarget.contains(e.relatedTarget) && setOpen(false)}
        data-open={open}
        style={{ '--panel-h': `${panelH}px` }}
        className={`island absolute top-3 left-1/2 -translate-x-1/2 overflow-hidden bg-black text-white shadow-[0_18px_50px_-12px_rgba(0,0,0,.65),inset_0_0_0_1px_rgba(255,255,255,.08)] ${
          bump && !open ? 'island-bump' : ''
        }`}
      >
        {/* compact: channel pill */}
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-controls="osd-panel"
          aria-label={`Channel ${current.num}, ${current.name}. Open the channel guide`}
          className="island-compact absolute inset-0 flex items-center gap-2.5 pr-3.5 pl-1.5"
        >
          <span className="relative grid size-8 shrink-0 place-items-center font-mono text-[10px] font-semibold tabular-nums">
            <Ring value={progress} />
            {current.num}
          </span>
          <span key={current.id} className="island-label flex-1 truncate text-left text-[13px] font-semibold">
            {current.name}
          </span>
          <span className="flex items-center gap-1.5 font-mono text-[11px] text-white/75 tabular-nums">
            <RecDot />
            {time}
          </span>
          <canvas ref={canvas} className="island-static" aria-hidden="true" />
        </button>

        {/* open: the remote */}
        <nav ref={panel} id="osd-panel" aria-label="Channels" className="island-panel absolute inset-x-0 top-0 p-4 sm:p-5">
          <div className="mb-4 flex items-center justify-between gap-3 font-mono text-[11px] text-white/60">
            <span className="flex min-w-0 items-center gap-2">
              <RecDot />
              <span className="truncate">
                REC · {profile.city} · <span className="tabular-nums">{time}</span> {profile.tzLabel}
              </span>
            </span>
            <span className="shrink-0 text-[#7dffa2] tabular-nums">
              CH {current.num}/{total}
            </span>
          </div>

          <ul className="grid grid-cols-4 gap-1.5 sm:grid-cols-7 sm:gap-2">
            {lineup.map((c, i) => {
              const on = active === c.id
              return (
                <li key={c.id} className="island-tile" style={{ '--i': i }}>
                  <a
                    href={`#${c.id}`}
                    data-id={c.id}
                    tabIndex={tab}
                    onClick={(e) => {
                      e.preventDefault()
                      onTune(c.id, { focus: true })
                      setOpen(false)
                    }}
                    aria-current={on ? 'true' : undefined}
                    aria-label={`${c.ch}: ${c.name}`}
                    className={`group flex h-full flex-col gap-1.5 rounded-2xl p-2.5 transition-colors sm:p-3 ${
                      on ? 'bg-[#FF6B57] text-[#1A0705]' : 'bg-white/[.06] hover:bg-white/12'
                    }`}
                  >
                    <span className="flex items-center justify-between">
                      <span className="font-mono text-lg leading-none font-semibold">{c.ch}</span>
                      <Icon name={c.icon} className="size-4 opacity-80" />
                    </span>
                    <span className="mt-auto text-[11px] leading-tight font-semibold sm:text-xs">{c.name}</span>
                    <span className={`hidden font-mono text-[10px] leading-none sm:block ${on ? 'text-[#1A0705]/70' : 'text-white/45'}`}>
                      {c.caption}
                    </span>
                  </a>
                </li>
              )
            })}
          </ul>

          <div className="mt-4 flex items-center gap-2 border-t border-white/10 pt-4">
            <Control
              icon={muted ? 'mute' : 'sound'}
              label="Sound"
              pressed={!muted}
              tabIndex={tab}
              onClick={() => {
                audio.unlock()
                audio.setMuted(!muted)
              }}
            />
            <Control icon={theme === 'dark' ? 'sun' : 'moon'} label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`} tabIndex={tab} onClick={onTheme} />
            <Control icon="scan" label="CRT scanlines" pressed={scan} tabIndex={tab} onClick={onScan} />
            <span className="min-w-0 flex-1 truncate font-mono text-[11px] text-white/50">
              <span className="hidden sm:inline">↑↓ channel · </span>
              {Math.round(progress * 100)}% watched
            </span>
            <button
              type="button"
              onClick={onPower}
              tabIndex={tab}
              aria-label="Power off"
              title="Power off"
              className="grid size-10 place-items-center rounded-full bg-[#E5483A] text-white transition-transform hover:scale-105"
            >
              <Icon name="power" className="size-[18px]" />
            </button>
          </div>
        </nav>
      </div>
    </header>
  )
}
