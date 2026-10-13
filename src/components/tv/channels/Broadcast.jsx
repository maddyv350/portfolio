import { profile } from '../../../data'

// Colour bars in the site palette, laid out like a SMPTE test card.
const top = ['#E8EEF7', '#F5B94A', '#8392A9', '#4ADE80', '#FF8A75', '#FF6B57', '#2B3A55']
const mid = ['#2B3A55', '#0A0F1A', '#FF8A75', '#0A0F1A', '#8392A9', '#0A0F1A', '#E8EEF7']
const low = [
  ['#111827', 5],
  ['#E8EEF7', 4],
  ['#1F2A3C', 5],
  ['#05080F', 3],
  ['#0A0F1A', 2],
  ['#111827', 2],
]

export function ColourBars() {
  return (
    <div className="scene bars">
      <div className="flex h-[67%]">
        {top.map((c) => (
          <i key={c} className="flex-1" style={{ background: c }} />
        ))}
      </div>
      <div className="flex h-[8%]">
        {mid.map((c, i) => (
          <i key={i} className="flex-1" style={{ background: c }} />
        ))}
      </div>
      <div className="flex h-[25%]">
        {low.map(([c, f], i) => (
          <i key={i} style={{ background: c, flex: f }} />
        ))}
      </div>
      <span className="bars-tag">
        {profile.initials} · CH 01 · 1 kHz
      </span>
    </div>
  )
}

// The broadcast ident: the name, a coral rule and the disciplines.
export function Ident() {
  return (
    <div className="scene ident">
      <span className="ident-kicker">{profile.role}</span>
      <span className="ident-name">{profile.name}</span>
      <span className="ident-rule" />
      <span className="ident-sub">{profile.disciplines.join(' · ')}</span>
    </div>
  )
}

// Fallback for projects without a custom scene: a title card in the brand colour.
export function TitleCard({ p }) {
  const initials = p.name
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
  return (
    <div className="scene title-card" style={{ '--brand': p.brand }}>
      <span className="title-card-icon">{initials}</span>
      <span className="title-card-name">{p.name}</span>
      <span className="title-card-meta">{p.genres.join(' · ')}</span>
    </div>
  )
}
