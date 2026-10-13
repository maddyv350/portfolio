import { useRef, useState } from 'react'
import { profile } from '../data'
import { channel } from '../lib/lineup'
import { Icon } from './Icons'

const asset = (path) => import.meta.env.BASE_URL + path.replace(/^\//, '')

export default function Contact() {
  const [copied, setCopied] = useState(false)
  const mail = useRef(null)
  const [first, second] = profile.contactLines

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch {
      window.getSelection()?.selectAllChildren(mail.current)
    }
  }

  const cards = [
    ...profile.socials.filter((s) => s.href).map((s) => ({ ...s, icon: 'arrow' })),
    { label: 'Resume', handle: 'PDF · download', href: asset(profile.resume), icon: 'down', download: true },
  ]

  return (
    <section
      id="contact"
      tabIndex={-1}
      aria-labelledby="contact-title"
      className="mx-auto max-w-[1180px] border-t border-line px-4 pt-24 pb-16 outline-none sm:px-6 md:pt-32"
    >
      <div className="reveal flex flex-wrap items-center gap-x-5 gap-y-2">
        <span className="label">
          CH {channel.contact.num} · {channel.contact.name}
        </span>
        <span className="flex items-center gap-2 font-mono text-xs font-semibold tracking-[0.08em] text-ok">
          <span className="live-dot size-1.5 rounded-full bg-ok" aria-hidden="true" />
          {profile.openTo}
        </span>
      </div>
      <h2
        id="contact-title"
        className="reveal mt-6 font-display text-[clamp(50px,9.4vw,132px)] leading-[0.9] font-extrabold tracking-[-0.045em]"
      >
        {first}
        <br />
        <span className="font-normal text-muted">{second}</span>
      </h2>

      <div className="reveal mt-11 flex flex-wrap items-center gap-4">
        <a
          ref={mail}
          href={`mailto:${profile.email}`}
          className="border-b-2 border-accent pb-2 font-mono text-[clamp(18px,2.8vw,32px)] leading-none font-medium break-all transition-colors hover:text-accent"
        >
          {profile.email}
        </a>
        <button
          type="button"
          onClick={copy}
          className="inline-flex items-center gap-2 rounded-lg border border-line px-3 py-2 font-mono text-[13px] leading-none text-muted transition-colors hover:border-accent hover:text-ink"
        >
          <Icon name="copy" className="size-3.5" />
          <span aria-live="polite">{copied ? 'copied ✓' : 'copy'}</span>
        </button>
      </div>

      <div className={`reveal mt-11 grid gap-3 ${cards.length >= 3 ? 'sm:grid-cols-3' : 'sm:grid-cols-2'}`}>
        {cards.map((s) => (
          <a
            key={s.label}
            href={s.href}
            {...(s.download ? { download: 'Sachin-Verma-Resume.pdf' } : { target: '_blank', rel: 'noopener noreferrer' })}
            className="group flex items-center justify-between rounded-2xl border border-line px-5 py-5 transition-[border-color,transform] duration-300 hover:-translate-y-1 hover:border-accent"
          >
            <span>
              <b className="block font-display text-lg leading-none font-semibold">{s.label}</b>
              <span className="mt-2 block font-mono text-[13px] text-muted">{s.handle}</span>
            </span>
            <Icon
              name={s.icon}
              className={`size-5 text-muted transition-all group-hover:text-accent ${
                s.download ? 'group-hover:translate-y-0.5' : 'group-hover:translate-x-0.5 group-hover:-translate-y-0.5'
              }`}
            />
          </a>
        ))}
      </div>
    </section>
  )
}

export function Footer({ onPower }) {
  return (
    <footer className="mx-auto flex max-w-[1180px] flex-wrap items-center justify-between gap-x-6 gap-y-4 border-t border-line px-4 pt-7 pb-10 font-mono text-xs text-muted sm:px-6">
      <span>
        © {new Date().getFullYear()} · {profile.name} · {profile.city}
      </span>
      <span className="flex items-center gap-2">
        <span className="size-1.5 rounded-full bg-accent" aria-hidden="true" />
        Thanks for watching
      </span>
      <button
        type="button"
        onClick={onPower}
        className="group inline-flex items-center gap-2.5 rounded-full border border-line py-1.5 pr-3.5 pl-1.5 transition-colors hover:border-accent hover:text-ink"
      >
        <span className="grid size-7 place-items-center rounded-full bg-[#E5483A] text-white transition-transform group-hover:scale-105">
          <Icon name="power" className="size-3.5" />
        </span>
        Power off
      </button>
    </footer>
  )
}
