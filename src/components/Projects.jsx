import { useState } from 'react'
import { projects, episodes } from '../data'
import { Icon } from './Icons'
import Section from './Section'
import MiniTV from './tv/MiniTV'
import { channelNumber } from './tv/TV'

// Paths like '/apps/x.webp' resolve against the deploy base (e.g. /portfolio/ on GitHub Pages).
const asset = (path) => (path.startsWith('/') ? import.meta.env.BASE_URL + path.slice(1) : path)

const initials = (name) =>
  name
    .replace(/&/g, '')
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join('')

// The real icon when there is one, otherwise (or if it fails to load) a monogram tile in the brand colour.
function AppIcon({ app, size = 'size-14', text = 'text-xl' }) {
  const [failed, setFailed] = useState(false)
  if (app.icon && !failed) {
    return (
      <img
        src={asset(app.icon)}
        alt=""
        width="56"
        height="56"
        loading="lazy"
        referrerPolicy="no-referrer"
        onError={() => setFailed(true)}
        className={`${size} shrink-0 rounded-[22%] object-cover shadow-[0_6px_16px_-6px_rgba(0,0,0,.4)]`}
      />
    )
  }
  return (
    <span
      aria-hidden="true"
      className={`${size} ${text} grid shrink-0 place-items-center rounded-[22%] font-display font-extrabold text-white shadow-[inset_0_1px_0_rgba(255,255,255,.25)]`}
      style={{ background: `linear-gradient(145deg, color-mix(in srgb, ${app.brand} 80%, #fff), color-mix(in srgb, ${app.brand} 70%, #000))` }}
    >
      {initials(app.name)}
    </span>
  )
}

const linkKinds = {
  play: { label: 'Google Play', icon: 'play', where: 'on Google Play' },
  ios: { label: 'App Store', icon: 'apple', where: 'on the App Store' },
  web: { label: 'Website', icon: 'globe', where: 'website' },
  github: { label: 'GitHub', icon: 'github', where: 'on GitHub' },
}

function Links({ app }) {
  const entries = Object.entries(linkKinds).filter(([k]) => app.links?.[k])
  return (
    <div className="mt-auto flex flex-wrap gap-3 pt-3">
      {entries.map(([k, kind], i) => (
        <a
          key={k}
          href={app.links[k]}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${app.name} ${kind.where}`}
          className={`group inline-flex items-center gap-2.5 rounded-xl px-5 py-3.5 text-[15px] font-semibold transition-[border-color,transform] hover:-translate-y-0.5 ${
            i === 0 ? 'bg-accent text-accent-ink' : 'border border-line hover:border-accent'
          }`}
        >
          <Icon name={kind.icon} className="size-4" />
          {kind.label}
          <Icon name="arrow" className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </a>
      ))}
    </div>
  )
}

// Real store screenshots fanned out on grid paper, lit in the app's brand colour.
function ShotsArt({ app }) {
  const [left, centre, right] = app.shots
  const img = 'relative rounded-2xl border border-line transition-transform duration-500'
  return (
    <div className="grid-paper relative flex h-full min-h-[380px] items-center justify-center overflow-hidden px-4 py-12 lg:min-h-[500px]">
      <div
        className="absolute inset-0"
        style={{ background: `radial-gradient(60% 65% at 50% 45%, color-mix(in srgb, ${app.brand} 38%, transparent), transparent 70%)` }}
      />
      <div className="relative flex items-center justify-center">
        {[
          [left, `${img} z-0 -mr-10 w-[38%] max-w-[200px] -rotate-6 shadow-[0_30px_60px_-25px_rgba(0,0,0,.6)] hover:-translate-y-2 hover:-rotate-3`],
          [centre, `${img} z-10 w-[48%] max-w-[270px] shadow-[0_40px_80px_-25px_rgba(0,0,0,.7)] hover:-translate-y-2`],
          [right, `${img} z-0 -ml-10 w-[38%] max-w-[200px] rotate-6 shadow-[0_30px_60px_-25px_rgba(0,0,0,.6)] hover:-translate-y-2 hover:rotate-3`],
        ].map(([s, cls], i) => (
          <img
            key={s.src}
            src={asset(s.src)}
            srcSet={s.small ? `${asset(s.small)} 240w, ${asset(s.src)} 460w` : undefined}
            sizes={i === 1 ? '(min-width: 1024px) 270px, 48vw' : '(min-width: 1024px) 200px, 38vw'}
            alt={s.alt}
            width="460"
            height="818"
            loading="lazy"
            decoding="async"
            className={cls}
          />
        ))}
      </div>
    </div>
  )
}

// The project's key feature, playing on a mini TV.
function TVArt({ app, index }) {
  return (
    <div className="grid-paper relative flex h-full min-h-[380px] items-center justify-center overflow-hidden px-6 py-14 lg:min-h-[500px]">
      <div
        className="absolute inset-0"
        style={{ background: `radial-gradient(60% 65% at 50% 48%, color-mix(in srgb, ${app.brand} 34%, transparent), transparent 70%)` }}
      />
      <div className="relative w-full max-w-[440px]">
        <MiniTV p={app} index={index} />
      </div>
      {app.meta?.map((m, i) => (
        <div
          key={m}
          className={`chip absolute ${i % 2 ? 'float-late right-[5%] bottom-[9%] sm:right-[8%]' : 'float top-[8%] left-[5%] sm:left-[8%]'}`}
        >
          <b className="font-display text-base leading-tight font-extrabold text-accent">{m}</b>
        </div>
      ))}
    </div>
  )
}

function FeaturedCard({ app, index }) {
  const flip = index % 2 === 1
  return (
    <article
      id={`p-${app.slug}`}
      tabIndex={-1}
      aria-labelledby={`p-${app.slug}-title`}
      className="reveal grid scroll-mt-24 overflow-hidden rounded-3xl border border-line bg-surface outline-none lg:grid-cols-2"
    >
      <div className={`flex min-w-0 flex-col gap-5 p-7 sm:p-11 ${flip ? 'lg:order-2' : ''}`}>
        <div className="flex items-center gap-4">
          <AppIcon app={app} />
          <span className="grid gap-1.5">
            <span className="label">
              CH {channelNumber(index)} · {app.kicker} · {app.year}
            </span>
            <span className="font-mono text-xs text-muted">{app.studio}</span>
          </span>
        </div>
        <h3
          id={`p-${app.slug}-title`}
          className="font-display text-[clamp(40px,4.6vw,60px)] leading-none font-extrabold tracking-[-0.035em]"
        >
          {app.name}
        </h3>
        <p className="max-w-[52ch] text-muted">{app.description}</p>
        <ul className="grid max-w-[60ch] gap-2.5">
          {app.points.map((p) => (
            <li key={p} className="relative pl-6 text-[15px] leading-relaxed">
              <span className="absolute left-0 font-mono text-accent" aria-hidden="true">
                →
              </span>
              {p}
            </li>
          ))}
        </ul>
        {app.role && (
          <p className="text-[15px] leading-relaxed">
            <span className="label mr-2">My part</span>
            {app.role}
          </p>
        )}
        <div className="flex flex-wrap gap-2">
          {app.stack.map((s) => (
            <span key={s} className="pill">
              {s}
            </span>
          ))}
        </div>
        <Links app={app} />
      </div>
      <div className={flip ? 'lg:order-1' : ''}>
        {app.art === 'shots' && app.shots?.length === 3 ? <ShotsArt app={app} /> : <TVArt app={app} index={index} />}
      </div>
    </article>
  )
}

// The programme guide: one row per title. Rows jump to the card; the one on the hero TV is marked.
function Guide({ nowShowing }) {
  const rows = [
    ...projects.map((p, i) => ({ key: p.slug, ch: `CH ${channelNumber(i)}`, year: p.year, name: p.name, tags: p.genres, href: `#p-${p.slug}`, live: nowShowing === i })),
    ...episodes.map((e) => ({ key: e.name, ch: 'RERUN', year: e.year, name: e.name, tags: [e.note.split(' · ')[0]], href: '#episodes' })),
  ]
  return (
    <div className="reveal mb-5 overflow-hidden rounded-3xl border border-line bg-surface">
      <div className="flex items-center justify-between gap-3 border-b border-line px-5 py-3.5 font-mono text-xs text-muted">
        <span className="flex items-center gap-2">
          <Icon name="projects" className="size-4" />
          PROGRAMME GUIDE
        </span>
        <span>
          {projects.length} titles · {episodes.length} reruns
        </span>
      </div>
      <ul>
        {rows.map((r) => (
          <li key={r.key} className="border-b border-line last:border-0">
            <a
              href={r.href}
              className="group grid grid-cols-[72px_minmax(0,1fr)_20px] items-center gap-x-4 gap-y-1.5 px-5 py-4 transition-colors hover:bg-accent/[.06] sm:grid-cols-[84px_52px_minmax(0,1fr)_auto_20px]"
            >
              <span className={`font-mono text-[13px] font-semibold ${r.ch === 'RERUN' ? 'text-muted' : 'text-accent'}`}>{r.ch}</span>
              <span className="hidden font-mono text-[13px] text-muted sm:block">{r.year}</span>
              <span className="flex min-w-0 items-center gap-3">
                <span className="truncate font-display text-lg font-semibold tracking-[-0.01em] transition-colors group-hover:text-accent">
                  {r.name}
                </span>
                {r.live && (
                  <span className="inline-flex shrink-0 items-center gap-1.5 rounded-md bg-accent px-1.5 py-1 font-mono text-[10px] leading-none font-semibold tracking-[0.1em] text-accent-ink">
                    <span className="size-1.5 rounded-full bg-current" aria-hidden="true" />
                    ON NOW
                  </span>
                )}
              </span>
              <span className="col-start-2 row-start-2 flex flex-wrap gap-1.5 sm:col-start-auto sm:row-start-auto sm:justify-end">
                {r.tags.map((t) => (
                  <span key={t} className="rounded-md border border-line px-2 py-1 font-mono text-[11px] leading-none text-muted">
                    {t}
                  </span>
                ))}
              </span>
              <Icon
                name="arrow"
                className="col-start-3 row-span-2 row-start-1 size-4 rotate-[135deg] text-muted transition-colors group-hover:text-accent sm:col-start-auto sm:row-span-1 sm:row-start-auto"
              />
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default function Projects({ nowShowing }) {
  return (
    <Section id="projects">
      <Guide nowShowing={nowShowing} />

      <div className="grid gap-5">
        {projects.map((p, i) => (
          <FeaturedCard key={p.slug} app={p} index={i} />
        ))}
      </div>

      <div id="episodes" className="reveal mt-14 scroll-mt-24">
        <span className="label">More episodes · earlier work</span>
        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {episodes.map((e) => {
            const Tag = e.href ? 'a' : 'article'
            const linkProps = e.href ? { href: e.href, target: '_blank', rel: 'noopener noreferrer' } : {}
            return (
              <Tag
                key={e.name}
                {...linkProps}
                className="group flex flex-col gap-3.5 rounded-2xl border border-line p-5 transition-[border-color,transform] duration-300 hover:-translate-y-1 hover:border-accent"
              >
                <div className="flex items-center gap-3.5">
                  <AppIcon app={e} size="size-11" text="text-base" />
                  <span className="min-w-0">
                    <b className="block truncate font-display text-[17px] font-semibold">{e.name}</b>
                    <span className="font-mono text-xs text-muted">{e.note}</span>
                  </span>
                  <span className="ml-auto self-start font-mono text-xs text-muted">{e.year}</span>
                </div>
                <p className="text-[15px] leading-relaxed text-muted">{e.description}</p>
              </Tag>
            )
          })}
        </div>
      </div>
    </Section>
  )
}
