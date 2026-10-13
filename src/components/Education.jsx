import { education } from '../data'
import Section from './Section'

export default function Education() {
  return (
    <Section id="education">
      <div className="grid gap-6">
        {education.map((e) => (
          <article
            key={e.degree}
            className="reveal grid gap-x-8 gap-y-4 border-l-2 border-line py-3 pl-5 transition-colors hover:border-accent md:grid-cols-[minmax(0,1fr)_auto] md:pl-8"
          >
            <div className="min-w-0">
              <h3 className="font-display text-[clamp(23px,2.6vw,34px)] leading-tight font-semibold tracking-[-0.02em]">{e.degree}</h3>
              <p className="mt-1.5 text-[15px] text-muted">
                {e.school}
                {e.place && ` · ${e.place}`}
              </p>
              <dl className="mt-6 grid max-w-[70ch] gap-x-6 gap-y-3 text-[15px] leading-relaxed sm:grid-cols-[130px_minmax(0,1fr)]">
                {e.coursework && (
                  <>
                    <dt className="label pt-1">Coursework</dt>
                    <dd>{e.coursework}</dd>
                  </>
                )}
                {e.honours && (
                  <>
                    <dt className="label pt-1">Honours</dt>
                    <dd>{e.honours}</dd>
                  </>
                )}
              </dl>
            </div>
            <time className="order-first font-mono text-sm text-muted md:order-none md:text-right">{e.dates}</time>
          </article>
        ))}
      </div>
    </Section>
  )
}
