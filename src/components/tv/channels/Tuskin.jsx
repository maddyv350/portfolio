import { useId } from 'react'

// Tuskin Coffee: the order moves from placed to brewing to ready while the glass fills; then the pickup QR.

// A fixed, QR-looking pattern: three finder squares and seeded noise. Decorative only.
const N = 21
const qr = (() => {
  let s = 7
  const rand = () => ((s = (s * 16807) % 2147483647) / 2147483647)
  const cells = []
  const finder = (x, y) => x < 7 && y < 7
  for (let y = 0; y < N; y++)
    for (let x = 0; x < N; x++) {
      const f = finder(x, y) || finder(N - 1 - x, y) || finder(x, N - 1 - y)
      if (f) continue
      if (rand() > 0.52) cells.push([x, y])
    }
  return cells
})()
const Finder = ({ x, y }) => (
  <g>
    <rect x={x} y={y} width="7" height="7" fill="#0E2A47" />
    <rect x={x + 1} y={y + 1} width="5" height="5" fill="#fff" />
    <rect x={x + 2} y={y + 2} width="3" height="3" fill="#0E2A47" />
  </g>
)

const steps = ['Placed', 'Brewing', 'Ready']

export default function TuskinScene() {
  const id = useId().replace(/:/g, '')
  return (
    <div className="scene tk">
      <div className="tk-glass">
        <svg viewBox="0 0 120 150" aria-hidden="true">
          <defs>
            <clipPath id={`${id}-cup`}>
              <path d="M22 30h76l-8 104a8 8 0 0 1-8 7H38a8 8 0 0 1-8-7z" />
            </clipPath>
          </defs>
          <g className="tk-steam" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" opacity=".7">
            <path d="M46 22c-6-6 6-10 0-18" />
            <path d="M62 22c-6-6 6-10 0-18" />
            <path d="M78 22c-6-6 6-10 0-18" />
          </g>
          <g clipPath={`url(#${id}-cup)`}>
            <rect x="0" y="30" width="120" height="120" fill="rgba(255,255,255,.08)" />
            <g className="tk-fill">
              <rect x="0" y="44" width="120" height="110" fill="#5A3220" />
              <rect x="0" y="44" width="120" height="30" fill="#C99A72" />
              <rect x="0" y="44" width="120" height="9" fill="#F3E4CF" />
            </g>
          </g>
          <path d="M22 30h76l-8 104a8 8 0 0 1-8 7H38a8 8 0 0 1-8-7z" fill="none" stroke="#fff" strokeOpacity=".75" strokeWidth="2.5" />
          <path d="M28 40l6 86" stroke="#fff" strokeOpacity=".35" strokeWidth="3" strokeLinecap="round" />
        </svg>
        <span>Java Choco Chip</span>
      </div>

      <div className="tk-card">
        <span className="tk-order">Order #T-2481 · Pickup</span>
        <span className="tk-eta">
          <b className="tk-eta-a">Ready in 4 min</b>
          <b className="tk-eta-b">Ready for pickup</b>
        </span>
        <ol className="tk-steps">
          {steps.map((s, k) => (
            <li key={s} className={`tk-step-${k}`}>
              <i />
              {s}
            </li>
          ))}
        </ol>
        <div className="tk-qr">
          <svg viewBox={`-1 -1 ${N + 2} ${N + 2}`} aria-hidden="true">
            <rect x="-1" y="-1" width={N + 2} height={N + 2} fill="#fff" />
            {qr.map(([x, y]) => (
              <rect key={`${x}-${y}`} x={x} y={y} width="1.02" height="1.02" fill="#0E2A47" />
            ))}
            <Finder x={0} y={0} />
            <Finder x={N - 7} y={0} />
            <Finder x={0} y={N - 7} />
          </svg>
          <span>Scan at the counter</span>
        </div>
      </div>
    </div>
  )
}
