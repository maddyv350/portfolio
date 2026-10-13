import { useId } from 'react'

// Propkee: a property video tour plays; one tap opens a glance card, then what's nearby.
const Icon = ({ d }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d={d} />
  </svg>
)
const nearby = [
  ['Café', '4 min', 'M4 9h13v5a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5zM17 10h1.5a2.5 2.5 0 0 1 0 5H17M8 3v3M12 3v3'],
  ['Gym', '6 min', 'M6 8v8M18 8v8M3 10v4M21 10v4M6 12h12'],
  ['School', '9 min', 'M2 9l10-5 10 5-10 5zM6 11v5c3 2 9 2 12 0v-5'],
]

export default function PropkeeScene() {
  const id = useId().replace(/:/g, '')
  return (
    <div className="scene pk">
      <svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" className="pk-video" aria-hidden="true">
        <defs>
          <linearGradient id={`${id}-pk-sky`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#18223F" />
            <stop offset=".5" stopColor="#47467A" />
            <stop offset=".78" stopColor="#D98E72" />
            <stop offset="1" stopColor="#F2BF8C" />
          </linearGradient>
          <linearGradient id={`${id}-pk-warm`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#FFD796" />
            <stop offset="1" stopColor="#F3A158" />
          </linearGradient>
          <radialGradient id={`${id}-pk-sun`}>
            <stop offset="0" stopColor="#FFE3B0" stopOpacity=".85" />
            <stop offset="1" stopColor="#FFE3B0" stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect width="400" height="300" fill={`url(#${id}-pk-sky)`} />
        <circle cx="318" cy="196" r="70" fill={`url(#${id}-pk-sun)`} />
        {[[40, 40], [96, 22], [170, 52], [250, 30], [356, 58], [300, 18]].map(([x, y]) => (
          <circle key={x} cx={x} cy={y} r="1" fill="#fff" opacity=".7" />
        ))}
        <path d="M0 192C60 172 120 186 180 170S300 160 400 178V300H0z" fill="#2B3456" />
        <path d="M0 214C80 196 150 210 230 198S340 200 400 208V300H0z" fill="#1C2340" />
        {/* the house: two cantilevered boxes with the lights on */}
        <g transform="translate(-38 0)">
        <rect x="96" y="214" width="236" height="10" fill="#262C44" />
        <rect x="120" y="168" width="180" height="46" fill="#D8D1C4" />
        <rect x="128" y="174" width="164" height="34" fill={`url(#${id}-pk-warm)`} />
        <path d="M169 174v34M210 174v34M251 174v34" stroke="#3B3326" strokeWidth="1.6" />
        <rect x="150" y="124" width="168" height="5" fill="#F6F2EA" />
        <rect x="158" y="129" width="150" height="39" fill="#ECE6DA" />
        <rect x="166" y="135" width="96" height="27" fill={`url(#${id}-pk-warm)`} />
        <path d="M198 135v27M230 135v27" stroke="#3B3326" strokeWidth="1.6" />
        <rect x="268" y="135" width="32" height="27" fill="#8A5A3C" />
        <path d="M274 135v27M280 135v27M286 135v27M292 135v27" stroke="#6E4630" strokeWidth="1.2" />
        <rect x="104" y="224" width="198" height="9" fill="#5FC3D6" />
        <rect x="132" y="226" width="86" height="2.5" fill="#FFD08A" opacity=".55" />
        </g>
        {/* pines */}
        {[[58, 232, 1], [78, 236, 0.8], [350, 230, 1.1], [372, 238, 0.8]].map(([x, y, s]) => (
          <path key={x} d={`M${x} ${y}l${-14 * s} 0 ${10 * s}-${18 * s}h${-6 * s}l${10 * s}-${18 * s}h${-5 * s}l${5 * s}-${14 * s} ${5 * s} ${14 * s}h${-5 * s}l${10 * s} ${18 * s}h${-6 * s}l${10 * s} ${18 * s}z`} fill="#121A30" />
        ))}
        <rect y="240" width="400" height="60" fill="#121A30" />
      </svg>
      <div className="pk-shade" />

      <span className="pk-progress" />
      <span className="pk-tap" />

      <div className="pk-card">
        <span className="pk-kicker">Villa · Dubai Hills</span>
        <b className="pk-price">AED 4.8M</b>
        <span className="pk-sub">≈ ₹10.9 Cr · 4 BHK · 3,900 sqft</span>
        <span className="pk-roi">
          <span>ROI</span>
          <i>
            <i />
          </i>
          <span>6.8%</span>
        </span>
        <span className="pk-verified">✓ Verified seller</span>
      </div>

      <div className="pk-near">
        {nearby.map(([name, time, d], k) => (
          <span key={name} style={{ '--k': k }}>
            <Icon d={d} />
            {name} <em>{time}</em>
          </span>
        ))}
      </div>
    </div>
  )
}
