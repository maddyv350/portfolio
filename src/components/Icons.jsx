const base = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round', strokeLinejoin: 'round' }

export const icons = {
  home: (
    <>
      <rect x="3" y="5" width="18" height="13" rx="3" />
      <path d="M9 21h6M12 18v3" />
    </>
  ),
  experience: (
    <>
      <rect x="3" y="8" width="18" height="12" rx="2" />
      <path d="M3 8l3-4h4l-3 4M10 8l3-4h4l-3 4" />
    </>
  ),
  projects: (
    <>
      <rect x="3" y="4" width="18" height="16" rx="3" />
      <path d="M10 9v6l5-3z" />
    </>
  ),
  education: (
    <>
      <path d="M2 9l10-5 10 5-10 5z" />
      <path d="M6 11v5c3 2 9 2 12 0v-5M22 9v5" />
    </>
  ),
  skills: <path d="M4 6h10M18 6h2M4 12h4M12 12h8M4 18h12M20 18h0M14 4v4M8 10v4M16 16v4" />,
  extras: <path d="M12 3l2.6 5.6 6.1.7-4.5 4.2 1.2 6L12 16.6 6.6 19.5l1.2-6L3.3 9.3l6.1-.7z" />,
  contact: <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z" />,
  sun: (
    <>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
    </>
  ),
  moon: <path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5z" />,
  scan: (
    <>
      <rect x="3" y="4" width="18" height="16" rx="3" />
      <path d="M6 9h12M6 12h12M6 15h12" />
    </>
  ),
  power: <path d="M12 3v8M6.6 6.6a8 8 0 1 0 10.8 0" />,
  sound: <path d="M4 9h4l5-4v14l-5-4H4zM17 8.5a5 5 0 0 1 0 7M19.5 6a8.5 8.5 0 0 1 0 12" />,
  mute: <path d="M4 9h4l5-4v14l-5-4H4zM17 9l5 6M22 9l-5 6" />,
  arrow: <path d="M7 17L17 7M8 7h9v9" />,
  down: <path d="M12 4v13M6 12l6 6 6-6M5 21h14" />,
  copy: (
    <>
      <rect x="8" y="8" width="13" height="13" rx="2" />
      <path d="M16 8V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h3" />
    </>
  ),
  close: <path d="M6 6l12 12M18 6L6 18" />,
  play: <path d="M5 3.5v17l15-8.5z" />,
  globe: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" />
    </>
  ),
  github: (
    <path d="M9 19c-4 1.4-4-2-6-2.5M15 21v-3.5a3 3 0 0 0-.9-2.4c3-.3 6.1-1.5 6.1-6.6a5.2 5.2 0 0 0-1.4-3.6 4.8 4.8 0 0 0-.1-3.6s-1.1-.3-3.7 1.4a12.7 12.7 0 0 0-6.7 0C5.7 1 4.6 1.3 4.6 1.3a4.8 4.8 0 0 0-.1 3.6A5.2 5.2 0 0 0 3 8.5c0 5.1 3.1 6.3 6.1 6.6a3 3 0 0 0-.9 2.4V21" />
  ),
  apple: (
    <>
      <path d="M16.5 13.2c0-2.3 1.9-3.4 2-3.5-1.1-1.6-2.8-1.8-3.4-1.8-1.4-.1-2.8.9-3.5.9s-1.8-.9-3-.8C7 8 5.6 8.9 4.8 10.3c-1.6 2.8-.4 7 1.2 9.3.8 1.1 1.7 2.4 2.9 2.3 1.2 0 1.6-.7 3-.7s1.8.7 3 .7c1.3 0 2.1-1.1 2.8-2.3.9-1.3 1.3-2.6 1.3-2.7-.1 0-2.5-1-2.5-3.7z" />
      <path d="M14.3 6.2c.6-.8 1.1-1.9 1-3-.9 0-2.1.6-2.7 1.4-.6.7-1.1 1.8-1 2.9 1 .1 2.1-.5 2.7-1.3z" />
    </>
  ),
}

export function Icon({ name, className = 'size-5' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...base}>
      {icons[name]}
    </svg>
  )
}
