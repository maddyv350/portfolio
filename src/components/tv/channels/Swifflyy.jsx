// Swifflyy: drop a pin, a 1 km radius opens, people nearby appear, two of them match.
const people = [
  { x: 150, y: 112, c: '#F4B183', n: 'A' },
  { x: 206, y: 80, c: '#C9B6F2', n: 'R' },
  { x: 258, y: 112, c: '#9CC5A1', n: 'M' },
  { x: 142, y: 194, c: '#8EB8E5', n: 'K' },
  { x: 248, y: 194, c: '#E7A6C2', n: 'D' },
]

export default function SwifflyyScene() {
  return (
    <div className="scene sw">
      <svg viewBox="0 0 400 300" className="sw-map" aria-hidden="true">
        <rect width="400" height="300" fill="#F6EDE3" />
        <g fill="#EEE1D2">
          <rect x="10" y="8" width="96" height="76" rx="8" />
          <rect x="140" y="8" width="148" height="72" rx="8" />
          <rect x="314" y="8" width="80" height="94" rx="8" />
          <rect x="10" y="112" width="98" height="92" rx="8" />
          <rect x="140" y="232" width="148" height="62" rx="8" />
          <rect x="314" y="232" width="80" height="62" rx="8" />
        </g>
        <rect x="312" y="112" width="84" height="104" rx="10" fill="#D6E7C8" />
        {[[330, 132], [352, 150], [374, 128], [338, 182], [368, 196], [384, 166]].map(([x, y]) => (
          <circle key={`${x}-${y}`} cx={x} cy={y} r="7" fill="#C1DAAE" />
        ))}
        <path d="M0 238C40 232 74 250 96 300H0z" fill="#D5E7EF" />
        <g fill="none" strokeLinecap="round">
          <g stroke="#E6D6C5" strokeWidth="15">
            <path d="M-10 96C120 88 260 104 410 92" />
            <path d="M-10 216L410 226" />
            <path d="M124 -10L128 310" />
            <path d="M300 -10C292 100 306 200 296 310" />
            <path d="M40 310L360 -10" />
          </g>
          <g stroke="#FFFFFF" strokeWidth="12">
            <path d="M-10 96C120 88 260 104 410 92" />
            <path d="M-10 216L410 226" />
            <path d="M124 -10L128 310" />
            <path d="M300 -10C292 100 306 200 296 310" />
            <path d="M40 310L360 -10" />
          </g>
        </g>
        <g fill="#B8A693" fontFamily="JetBrains Mono, monospace" fontSize="7" letterSpacing="2">
          <text x="14" y="91">MG ROAD</text>
          <text transform="translate(92 266) rotate(-45)">CHURCH ST</text>
          <text x="322" y="226" fill="#93AE84">CUBBON PARK</text>
        </g>

        {/* the 1 km radius */}
        <circle className="sw-pulse" cx="200" cy="150" r="92" fill="none" stroke="#D94F3A" strokeWidth="2" />
        <circle
          className="sw-ring"
          cx="200"
          cy="150"
          r="92"
          fill="#D94F3A"
          fillOpacity=".07"
          stroke="#D94F3A"
          strokeOpacity=".6"
          strokeWidth="1.5"
          strokeDasharray="5 5"
        />
        <text className="sw-km" x="200" y="52" textAnchor="middle" fill="#D94F3A" fontFamily="JetBrains Mono, monospace" fontSize="8" fontWeight="600">
          1 km
        </text>

        {/* the match */}
        <path className="sw-link" d="M200 150L248 194" stroke="#D94F3A" strokeWidth="2.5" strokeLinecap="round" />
        {people.map((p, k) => (
          <g key={p.n} className="sw-person" style={{ '--k': k }}>
            <circle cx={p.x} cy={p.y} r="12.5" fill="#fff" />
            <circle cx={p.x} cy={p.y} r="10.5" fill={p.c} />
            <text x={p.x} y={p.y + 3.6} textAnchor="middle" fill="#fff" fontSize="10" fontWeight="700" fontFamily="Geist, sans-serif">
              {p.n}
            </text>
          </g>
        ))}
        <path
          className="sw-heart"
          d="M224 178s-7-4.4-7-9a4 4 0 0 1 7-2.4 4 4 0 0 1 7 2.4c0 4.6-7 9-7 9z"
          fill="#D94F3A"
          stroke="#fff"
          strokeWidth="1.5"
        />

        {/* the pin */}
        <ellipse className="sw-shadow" cx="200" cy="152" rx="7" ry="2.5" fill="#000" opacity=".18" />
        <g className="sw-pin">
          <path d="M200 152c-9-12-14-19-14-26a14 14 0 0 1 28 0c0 7-5 14-14 26z" fill="#D94F3A" />
          <circle cx="200" cy="126" r="5.5" fill="#fff" />
        </g>
      </svg>

      <span className="sw-tag">
        Church St <span className="sw-timer" />
      </span>

      <div className="sw-toast">
        <span className="sw-toast-dot">D</span>
        <span className="min-w-0">
          <b>It's a match</b>
          Dev · 180 m away
        </span>
        <span className="sw-toast-btn">Say hi</span>
      </div>
    </div>
  )
}
