import { channel } from '../lib/lineup'

// The reference's header pattern: a mono label column (here the channel) and a big display h2
// whose second phrase is muted. Sections take focus when tuned to with the digit keys.
export default function Section({ id, children, className = '' }) {
  const c = channel[id]
  return (
    <section
      id={id}
      tabIndex={-1}
      aria-labelledby={`${id}-title`}
      className={`mx-auto max-w-[1180px] px-4 py-16 outline-none sm:px-6 md:py-24 ${className}`}
    >
      <div className="reveal mb-12 grid items-end gap-4 md:grid-cols-[220px_minmax(0,1fr)] md:gap-8">
        <span className="label">
          CH {c.num} · {c.name}
        </span>
        <h2 id={`${id}-title`} className="font-display text-[clamp(36px,4.8vw,62px)] leading-none font-extrabold tracking-[-0.03em]">
          {c.title} <span className="font-normal text-muted">{c.thin}</span>
        </h2>
      </div>
      {children}
    </section>
  )
}
