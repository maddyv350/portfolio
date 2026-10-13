import { seasons } from '../data'
import { durationSince } from '../hooks'
import Section from './Section'

// ︎ keeps ▶ as text instead of an emoji on iOS.
const marks = {
  shipped: { sign: '▶︎', label: 'Shipped', cls: 'text-ok' },
  improved: { sign: '↑', label: 'Improved', cls: 'text-accent' },
  recognised: { sign: '★', label: 'Recognised', cls: 'text-warn' },
}

function Season({ s }) {
  return (
    <article className="reveal group grid gap-4 border-b border-line py-9 md:grid-cols-[220px_minmax(0,1fr)] md:gap-8">
      <div className="flex flex-row flex-wrap items-center gap-3 font-mono text-sm md:flex-col md:items-start">
        <span
          className={`inline-flex items-center gap-2 rounded-lg border px-2.5 py-1.5 font-semibold ${
            s.current ? 'border-accent text-accent' : 'border-line'
          }`}
        >
          {s.current && <span className="live-dot size-[7px] rounded-full bg-ok" aria-hidden="true" />}S{s.season}
          {s.tag && <span className="font-normal">· {s.tag}</span>}
        </span>
        <time className="text-[13px] text-muted">{s.dates}</time>
      </div>

      <div className="min-w-0">
        <h3 className="font-display text-[clamp(23px,2.4vw,30px)] leading-tight font-semibold tracking-[-0.02em] transition-colors group-hover:text-accent">
          {s.title}
        </h3>
        <p className="mt-1 text-[15px] text-muted">
          {s.company} · {s.scope}
        </p>
        {s.since && (
          <p className="mt-4 inline-flex items-center gap-2.5 rounded-lg bg-accent/10 px-3 py-2 text-sm">
            <span className="live-dot size-1.5 rounded-full bg-accent" style={{ '--dot': 'var(--c-accent)' }} aria-hidden="true" />
            <b className="font-display text-base font-extrabold">{durationSince(s.since)}</b>
            on air
          </p>
        )}
        {s.groups.map((g) => {
          const m = marks[g.type]
          return (
            <div key={g.type}>
              <div className={`mt-5 mb-2 font-mono text-xs font-semibold tracking-[0.1em] uppercase ${m.cls}`}>
                <span aria-hidden="true">{m.sign}</span> {m.label}
              </div>
              <ul className="grid max-w-[64ch] gap-2">
                {g.items.map((item) => (
                  <li key={item} className="relative pl-6 leading-relaxed">
                    <span className={`absolute left-0 font-mono ${m.cls}`} aria-hidden="true">
                      {m.sign}
                    </span>
                    <span className="[&_b]:font-semibold" dangerouslySetInnerHTML={{ __html: item }} />
                  </li>
                ))}
              </ul>
            </div>
          )
        })}
      </div>
    </article>
  )
}

export default function Experience() {
  return (
    <Section id="experience">
      <div className="border-t border-line">
        {seasons.map((s) => (
          <Season key={s.season} s={s} />
        ))}
      </div>
    </Section>
  )
}
