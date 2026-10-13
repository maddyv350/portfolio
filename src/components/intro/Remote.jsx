// The remote on the table. Drawn in SVG like the TV; the intro animates `ok` (press) and `ir` (signal).
const Chevron = ({ d }) => <path d={d} stroke="#8392A9" strokeWidth="2.4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
const keys = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '', '0', '']

export default function Remote({ okRef, irRef }) {
  return (
    <div className="remote">
      <svg viewBox="0 0 140 460">
        <defs>
          <linearGradient id="rm-body" x1="0" x2="1">
            <stop offset="0" stopColor="#273044" />
            <stop offset=".45" stopColor="#171E2C" />
            <stop offset="1" stopColor="#0D121C" />
          </linearGradient>
          <radialGradient id="rm-ok" cx=".4" cy=".32" r=".75">
            <stop offset="0" stopColor="#FF9A88" />
            <stop offset="1" stopColor="#E14E3B" />
          </radialGradient>
          <radialGradient id="rm-ir">
            <stop offset="0" stopColor="#FFFFFF" />
            <stop offset=".3" stopColor="#FFC2CF" stopOpacity=".9" />
            <stop offset="1" stopColor="#B86BFF" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* IR signal from the tip */}
        <g ref={irRef} className="remote-ir">
          <circle cx="70" cy="14" r="30" fill="url(#rm-ir)" />
          <path
            d="M52 -6a26 26 0 0 1 36 0M42 -20a42 42 0 0 1 56 0M32 -34a58 58 0 0 1 76 0"
            stroke="#FFD3DD"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
          />
        </g>

        <rect x="6" y="6" width="128" height="448" rx="48" fill="url(#rm-body)" stroke="rgba(255,255,255,.08)" />
        <rect x="11" y="40" width="3" height="380" rx="1.5" fill="rgba(255,255,255,.06)" />
        <rect x="50" y="13" width="40" height="9" rx="4.5" fill="#2B0D14" />

        {/* power */}
        <circle cx="104" cy="52" r="11" fill="#2A1418" stroke="rgba(255,107,87,.35)" />
        <path d="M104 46v6M99.4 48.4a6.5 6.5 0 1 0 9.2 0" stroke="#FF6B57" strokeWidth="2" fill="none" strokeLinecap="round" />
        <text x="26" y="56" fill="#5B6A82" fontSize="10" fontFamily="JetBrains Mono, monospace" letterSpacing="2">
          SV
        </text>

        {/* d-pad */}
        <circle cx="70" cy="140" r="50" fill="#1B2333" stroke="rgba(255,255,255,.06)" />
        <Chevron d="M64 106l6-6 6 6" />
        <Chevron d="M64 174l6 6 6-6" />
        <Chevron d="M36 134l-6 6 6 6" />
        <Chevron d="M104 134l6 6-6 6" />
        <circle cx="70" cy="143" r="23" fill="#000" opacity=".4" />
        <g ref={okRef} className="remote-ok">
          <circle cx="70" cy="140" r="22" fill="url(#rm-ok)" />
          <path d="M53 132a19 19 0 0 1 34 0" stroke="rgba(255,255,255,.35)" strokeWidth="2" fill="none" strokeLinecap="round" />
          <text x="70" y="145" textAnchor="middle" fontSize="13" fontWeight="700" fontFamily="JetBrains Mono, monospace" fill="#1A0705">
            OK
          </text>
        </g>

        {/* back · home · menu */}
        {[34, 70, 106].map((x) => (
          <circle key={x} cx={x} cy="214" r="11" fill="#1B2333" />
        ))}
        <path d="M38 210l-6 4 6 4M32 214h8" stroke="#8392A9" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M65 216l5-5 5 5v4h-10z" stroke="#8392A9" strokeWidth="1.8" fill="none" strokeLinejoin="round" />
        <path d="M101 210h10M101 214h10M101 218h10" stroke="#8392A9" strokeWidth="1.8" strokeLinecap="round" />

        {/* volume and channel rockers */}
        {[
          [20, 'VOL', '+', '−'],
          [86, 'CH', '▲', '▼'],
        ].map(([x, label, up, down]) => (
          <g key={label} fontFamily="JetBrains Mono, monospace" fill="#9AA8BD" textAnchor="middle">
            <rect x={x} y="244" width="34" height="80" rx="17" fill="#1B2333" />
            <text x={x + 17} y="266" fontSize="13">
              {up}
            </text>
            <text x={x + 17} y="288" fontSize="7" fill="#5B6A82" letterSpacing="1">
              {label}
            </text>
            <text x={x + 17} y="312" fontSize="13">
              {down}
            </text>
          </g>
        ))}

        {/* number keys */}
        {keys.map((k, i) =>
          k ? (
            <g key={i}>
              <rect x={22 + (i % 3) * 34} y={342 + Math.floor(i / 3) * 27} width="28" height="20" rx="7" fill="#1B2333" />
              <text
                x={36 + (i % 3) * 34}
                y={356 + Math.floor(i / 3) * 27}
                textAnchor="middle"
                fontSize="10"
                fontFamily="JetBrains Mono, monospace"
                fill="#9AA8BD"
              >
                {k}
              </text>
            </g>
          ) : null,
        )}
      </svg>
    </div>
  )
}
