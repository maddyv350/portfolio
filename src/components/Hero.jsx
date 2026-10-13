import { profile, marquee } from '../data'
import { useClock } from '../hooks'
import TV from './tv/TV'

const asset = (path) => import.meta.env.BASE_URL + path.replace(/^\//, '')

export default function Hero({ live, tv, tvInitial, onChannel }) {
  const time = useClock(profile.timeZone)
  const links = [
    ...profile.socials.filter((s) => s.href),
    { label: 'Resume', href: asset(profile.resume), download: true },
  ]

  return (
    <section id="home" tabIndex={-1} aria-label="Introduction" className={`relative overflow-x-clip outline-none ${live ? 'is-live' : ''}`}>
      <div className="mx-auto grid max-w-[1180px] items-center gap-14 px-4 pt-8 pb-16 sm:px-6 md:pt-14 md:pb-20 lg:grid-cols-[1.08fr_.92fr] lg:gap-12">
        <div className="min-w-0">
          <div className="rise mb-7 flex flex-wrap gap-x-5 gap-y-2 font-mono text-[13px] text-muted" style={{ '--i': 0 }}>
            <span className="flex items-center gap-2 text-ok">
              <span className="live-dot size-2 rounded-full bg-ok" aria-hidden="true" />
              Currently at {profile.company}
            </span>
            <span>
              {profile.city}, {profile.country} · <span className="tabular-nums">{time}</span> {profile.tzLabel}
            </span>
            <span>{profile.disciplines.join(' · ')}</span>
          </div>

          <h1 className="mb-7 font-display text-[clamp(48px,7.4vw,100px)] leading-[0.92] font-extrabold tracking-[-0.035em]">
            <span className="rise block" style={{ '--i': 1 }}>
              {profile.name}
            </span>
          </h1>

          <p
            className="rise mb-8 max-w-[34em] text-[clamp(17px,1.6vw,20px)] leading-relaxed text-muted [&_b]:font-medium [&_b]:text-ink"
            style={{ '--i': 2 }}
            dangerouslySetInnerHTML={{ __html: profile.bio }}
          />

          <div className="rise flex flex-wrap items-center gap-3" style={{ '--i': 3 }}>
            <a
              href="#projects"
              className="group inline-flex items-center gap-2.5 rounded-xl bg-accent px-5 py-3.5 text-[15px] font-semibold text-accent-ink transition-transform hover:-translate-y-0.5"
            >
              Watch my work <span className="transition-transform group-hover:translate-x-1">→</span>
            </a>
            <a
              href={`mailto:${profile.email}`}
              className="inline-flex items-center rounded-xl border border-line px-5 py-3.5 font-mono text-sm break-all transition-colors hover:border-accent"
            >
              {profile.email}
            </a>
          </div>

          <div className="rise mt-7 flex flex-wrap gap-5" style={{ '--i': 4 }}>
            {links.map((s) => (
              <a
                key={s.label}
                href={s.href}
                {...(s.download ? { download: 'Sachin-Verma-Resume.pdf' } : { target: '_blank', rel: 'noopener noreferrer' })}
                className="border-b border-line pb-1 font-mono text-[13px] text-muted transition-colors hover:border-accent hover:text-accent"
              >
                {s.label} {s.download ? '↓' : '↗'}
              </a>
            ))}
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-[520px] sm:px-6 lg:px-0">
          <TV ref={tv} initial={tvInitial} onChannel={onChannel} />
          {profile.stats.map((s, i) => (
            <div
              key={s.label}
              className={`rise absolute z-10 ${i === 0 ? '-bottom-6 left-[10%] sm:left-[16%]' : '-top-7 right-[20%] sm:right-[26%]'}`}
              style={{ '--i': 5 + i }}
            >
              <div className={`chip ${i === 0 ? 'float' : 'float-late'}`}>
                <b className="mb-1 block font-display text-xl leading-none font-extrabold text-accent">{s.value}</b>
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="overflow-hidden border-y border-line py-[18px]" aria-hidden="true">
        <div className="marquee flex w-max">
          {[...marquee, ...marquee].map((m, i) => (
            <span key={i} className="flex items-center font-display text-[15px] font-semibold whitespace-nowrap text-muted">
              <span className="mx-12 text-accent">✦</span>
              {m}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
