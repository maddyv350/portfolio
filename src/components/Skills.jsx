import { useRef, useState } from 'react'
import { profile, skills } from '../data'
import Section from './Section'

const levels = { 3: 'Expert', 2: 'Proficient', 1: 'Familiar' }

// Signal strength instead of fake percentages: three bars, filled by level.
function Signal({ level }) {
  return (
    <span className="flex h-3.5 items-end gap-[3px]" aria-hidden="true">
      {[1, 2, 3].map((b) => (
        <i key={b} className={`w-[4px] rounded-[1px] ${b <= level ? 'bg-accent' : 'bg-line'}`} style={{ height: `${b * 33.3}%` }} />
      ))}
    </span>
  )
}

// A TV settings menu: categories on the left, the selected one's skills on the right (ARIA tabs).
export default function Skills() {
  const [cat, setCat] = useState(0)
  const tabs = useRef([])
  const select = (i) => {
    const n = (i + skills.length) % skills.length
    setCat(n)
    tabs.current[n]?.focus()
  }
  const onKey = (e) => {
    const step = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 }[e.key]
    if (step) {
      e.preventDefault()
      select(cat + step)
    } else if (e.key === 'Home' || e.key === 'End') {
      e.preventDefault()
      select(e.key === 'Home' ? 0 : skills.length - 1)
    }
  }
  const current = skills[cat]

  return (
    <Section id="skills">
      <div className="grid items-start gap-12 lg:grid-cols-[.8fr_1.2fr]">
        <div className="reveal min-w-0">
          <p className="max-w-[40ch] text-lg leading-relaxed text-muted">
            {profile.disciplines[0]} on the front, {profile.disciplines.slice(1).join(' and ')} behind it, Kafka and Redis in
            between. I care about the parts users never see: fast queries, real-time pipes and services that are easy to
            reason about.
          </p>
          <ul className="mt-8 grid gap-3 font-mono text-[13px] text-muted">
            {[3, 2, 1].map((l) => (
              <li key={l} className="flex items-center gap-3">
                <Signal level={l} />
                <span className="text-ink">{levels[l]}</span>
                <span>
                  {l === 3 ? 'daily, in production, deep' : l === 2 ? 'shipped with it, comfortable' : 'used it, can pick it up fast'}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="reveal min-w-0 overflow-hidden rounded-[20px] border border-line bg-surface">
          <div className="flex items-center gap-2 border-b border-line px-4 py-3 font-mono text-xs text-muted">
            <i className="size-2.5 rounded-full bg-[#F87171]/80" />
            <i className="size-2.5 rounded-full bg-[#FBBF24]/80" />
            <i className="size-2.5 rounded-full bg-[#4ADE80]/80" />
            <span className="ml-2">Settings › Stack</span>
            <span className="ml-auto tracking-[0.12em]">{profile.initials}-01</span>
          </div>

          <div className="grid sm:grid-cols-[210px_minmax(0,1fr)]">
            <div
              role="tablist"
              aria-label="Skill categories"
              aria-orientation="vertical"
              className="flex gap-1 overflow-x-auto border-b border-line p-2 sm:flex-col sm:border-r sm:border-b-0 sm:p-3"
            >
              {skills.map((c, i) => {
                const on = i === cat
                return (
                  <button
                    key={c.category}
                    ref={(el) => (tabs.current[i] = el)}
                    type="button"
                    role="tab"
                    id={`skill-tab-${i}`}
                    aria-selected={on}
                    aria-controls="skill-panel"
                    tabIndex={on ? 0 : -1}
                    onClick={() => setCat(i)}
                    onKeyDown={onKey}
                    className={`relative flex shrink-0 items-center justify-between gap-3 rounded-xl px-3.5 py-3 text-left text-sm font-semibold whitespace-nowrap transition-colors ${
                      on ? 'bg-accent/10 text-accent' : 'text-muted hover:bg-bg/60 hover:text-ink'
                    }`}
                  >
                    {on && <span className="absolute top-2.5 bottom-2.5 left-0 hidden w-[3px] rounded-full bg-accent sm:block" aria-hidden="true" />}
                    {c.category}
                    <span className="font-mono text-[11px] font-normal opacity-70">{c.items.length}</span>
                  </button>
                )
              })}
            </div>

            <div role="tabpanel" id="skill-panel" aria-labelledby={`skill-tab-${cat}`} tabIndex={0} className="p-2 outline-none sm:p-3">
              <ul key={cat}>
                {current.items.map((s, i) => (
                  <li
                    key={s.name}
                    className="settings-row flex items-center justify-between gap-4 rounded-xl px-3.5 py-3.5 transition-colors hover:bg-bg/60"
                    style={{ '--i': i }}
                  >
                    <span className="font-medium">{s.name}</span>
                    <span className="flex items-center gap-3">
                      <span className="font-mono text-xs text-muted">{levels[s.level]}</span>
                      <Signal level={s.level} />
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="flex flex-wrap justify-between gap-2 border-t border-line px-4 py-3 font-mono text-[11px] text-muted">
            <span>↑↓ select category</span>
            <span>
              {skills.reduce((n, c) => n + c.items.length, 0)} skills · {skills.length} categories
            </span>
          </div>
        </div>
      </div>
    </Section>
  )
}
