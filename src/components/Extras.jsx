import { extras } from '../data'
import { channel } from '../lib/lineup'
import { Icon } from './Icons'
import Section from './Section'

const groups = [
  ['certifications', 'Certifications'],
  ['achievements', 'Achievements'],
  ['talks', 'Talks'],
  ['openSource', 'Open source'],
  ['testimonials', 'Testimonials'],
]

// One bonus-feature tile. Items can have: name, issuer / event / meta, year, description, href.
function Feature({ item }) {
  const meta = [item.issuer ?? item.event ?? item.meta, item.year].filter(Boolean).join(' · ')
  const Tag = item.href ? 'a' : 'div'
  const linkProps = item.href ? { href: item.href, target: '_blank', rel: 'noopener noreferrer' } : {}
  return (
    <Tag
      {...linkProps}
      className="group flex items-start gap-4 rounded-2xl border border-line p-5 transition-[border-color,transform] duration-300 hover:-translate-y-1 hover:border-accent"
    >
      <span className="grid size-10 shrink-0 place-items-center rounded-full bg-accent/12 text-accent" aria-hidden="true">
        <Icon name="play" className="size-3.5 translate-x-px" />
      </span>
      <span className="min-w-0">
        <b className="block font-display text-[17px] leading-snug font-semibold">{item.name}</b>
        {meta && <span className="mt-1.5 block font-mono text-xs text-muted">{meta}</span>}
        {item.description && <span className="mt-2 block text-[15px] leading-relaxed text-muted">{item.description}</span>}
      </span>
      {item.href && <Icon name="arrow" className="ml-auto size-4 shrink-0 text-muted transition-colors group-hover:text-accent" />}
    </Tag>
  )
}

function Quote({ item }) {
  return (
    <figure className="flex flex-col gap-4 rounded-2xl border border-line bg-surface p-6">
      <blockquote className="text-[17px] leading-relaxed">“{item.quote}”</blockquote>
      <figcaption className="mt-auto font-mono text-xs text-muted">
        <b className="text-ink">{item.name}</b>
        {item.role && ` · ${item.role}`}
      </figcaption>
    </figure>
  )
}

// "Bonus features": only categories with entries are shown, and the whole section disappears if all are empty.
export default function Extras() {
  if (!channel.extras) return null
  return (
    <Section id="extras">
      <div className="grid gap-12">
        {groups
          .filter(([key]) => extras[key]?.length)
          .map(([key, label]) => (
            <div key={key} className="reveal">
              <span className="label">
                {label} · {extras[key].length}
              </span>
              <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {extras[key].map((item, i) =>
                  key === 'testimonials' ? <Quote key={i} item={item} /> : <Feature key={i} item={item} />,
                )}
              </div>
            </div>
          ))}
      </div>
    </Section>
  )
}
