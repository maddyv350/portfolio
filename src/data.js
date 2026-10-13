// All portfolio content lives here. Edit this file to update the site.
// Anything marked [PLACEHOLDER] still needs your real details. `null` hides a field.

export const profile = {
  name: 'Sachin Verma',
  initials: 'SV',
  role: 'Full-stack engineer',
  disciplines: ['Flutter', 'Node.js', 'Go'],
  city: 'Bengaluru',
  country: 'IN',
  timeZone: 'Asia/Kolkata',
  tzLabel: 'IST',
  email: 'vermas7008@gmail.com',
  company: 'Monkhub Innovations',
  // Shown under the contact headline.
  openTo: 'Open to full-stack roles · SDE-1 / SDE-2 · Gurugram, Bengaluru, Remote',
  // Served from /public. Replace public/resume.pdf to update it.
  resume: '/resume.pdf',
  // Links with `href: null` are hidden everywhere.
  socials: [
    { label: 'LinkedIn', handle: 'in/sachinv26', href: 'https://www.linkedin.com/in/sachinv26' },
    { label: 'GitHub', handle: '[PLACEHOLDER]', href: null },
  ],
  // Hero bio. <b> marks the numbers that should stand out.
  bio: 'Full-stack engineer building Flutter apps and the backends behind them. <b>6+ production apps</b> shipped, database queries made <b>40–45% faster</b>, and real-time features on <b>Kafka and WebSockets</b>.',
  // Floating chips beside the hero TV.
  stats: [
    { value: '6+', label: 'apps shipped' },
    { value: '−45%', label: 'DB query time' },
  ],
  // The contact headline: first line in ink, second muted.
  contactLines: ['Lines are open.', "Let's make something."],
  // CH 00, the hidden channel (press 0).
  funFact: '[PLACEHOLDER: one fun fact about you]',
}

// Sections, in order. They're numbered like TV channels (CH 01, CH 02 …) by position, so reordering
// here renumbers the nav, the digit keys and the section labels. A section with no content is skipped.
export const channels = [
  { id: 'home', name: 'On Air', caption: 'Start here', icon: 'home' },
  { id: 'experience', name: 'Seasons', caption: 'S5 airing', icon: 'experience', title: 'Experience,', thin: 'in seasons.' },
  { id: 'projects', name: 'Now Showing', caption: '4 titles', icon: 'projects', title: 'Projects,', thin: 'now showing.' },
  { id: 'education', name: 'Origins', caption: 'B.Tech', icon: 'education', title: 'Education,', thin: 'where it started.' },
  { id: 'skills', name: 'Settings', caption: 'Stack', icon: 'skills', title: 'What I work', thin: 'with.' },
  { id: 'extras', name: 'Bonus', caption: 'Extras', icon: 'extras', title: 'Bonus', thin: 'features.' },
  { id: 'contact', name: 'Lines Open', caption: 'Say hi', icon: 'contact' },
]

// Career as TV seasons, newest first. `since` (YYYY-MM) drives the live "x yr y mo on air" badge.
// Bullet groups: shipped ▶, improved ↑, recognised ★. <b> highlights a number.
export const seasons = [
  {
    season: 5,
    current: true,
    tag: 'Now airing',
    dates: 'Jul 2025 → now',
    since: '2025-07',
    title: 'Software Engineer',
    company: 'Monkhub Innovations',
    scope: 'Gurugram · Flutter apps and their backends',
    groups: [
      {
        type: 'shipped',
        items: [
          'Propkee, a short-form video platform for real estate, on Android and iOS.',
          'Tuskin Coffee, an order-ahead coffee app with QR pickup.',
          '[PLACEHOLDER: your biggest contribution here, with a number]',
        ],
      },
    ],
  },
  {
    season: 4,
    dates: 'Feb 2024 → Mar 2025',
    title: 'Software Engineer',
    company: 'Srijana Healthcare Solutions',
    scope: 'Bengaluru · Healthtech',
    groups: [
      {
        type: 'shipped',
        items: [
          'CDC Pragyan: booking and progress tracking for child-development therapy.',
          '[PLACEHOLDER: what you built or improved, with a number]',
        ],
      },
    ],
  },
  {
    season: 3,
    dates: 'Nov 2023 → Jan 2024',
    title: 'Flutter Developer',
    company: 'Ritual Softech',
    scope: 'Android and iOS',
    groups: [
      {
        type: 'shipped',
        items: [
          'An E-School mobile app in Flutter for Android and iOS.',
          'App state managed with Provider; third-party APIs and services integrated.',
        ],
      },
    ],
  },
  {
    season: 2,
    dates: 'Jun 2023 → Jul 2023',
    title: 'Flutter Developer Intern',
    company: 'Unio Labs',
    scope: 'Internship',
    groups: [
      {
        type: 'improved',
        items: [
          'A reusable base screen class that generates UI components and handles navigation, <b>cutting duplicated code</b> across screens.',
        ],
      },
      { type: 'shipped', items: ['Authentication, data models and API integration.'] },
    ],
  },
  {
    season: 1,
    tag: 'Pilot',
    dates: 'Apr 2022 → Jun 2022',
    title: 'Software Engineer, Product Development',
    company: 'Toycel',
    scope: 'Internship',
    groups: [
      {
        type: 'shipped',
        items: [
          'A real-estate app built from scratch in Flutter for Android and iOS, connecting builders, channel partners and authorities in one system.',
        ],
      },
    ],
  },
]

const play = (id) => `https://play.google.com/store/apps/details?id=${id}`

// Featured projects, in order. They also play as channels on the hero TV (CH 3.1, 3.2 …).
// `scene` picks the animated TV scene in src/components/tv/channels (falls back to a title card).
// `art`: 'tv' plays that scene in a mini TV on the card; 'shots' fans out three `shots` on grid paper
// (`small` is an optional ~240px-wide copy the browser uses where the screenshot shows small).
// `icon`: a path in /public or a full URL. Without one, a monogram tile in `brand` is shown.
// `meta` becomes the floating chips beside the art. `links`: play, ios, web, github (any may be left out).
export const projects = [
  {
    slug: 'swifflyy',
    name: 'Swifflyy',
    kicker: 'Premiere',
    year: 2026,
    genres: ['Dating', 'Location', 'Real-time chat'],
    studio: 'Swifflyy Labs',
    brand: '#D94F3A',
    icon: '/apps/swifflyy.webp',
    links: { play: play('com.swifflyy.app'), web: 'https://swifflyy.com' },
    scene: 'swifflyy',
    sceneLabel: 'A pin drops on a map, a one-kilometre radius opens around it and nearby people appear until two of them match.',
    art: 'shots',
    shots: [
      { src: '/apps/swifflyy-1.webp', small: '/apps/swifflyy-1-240.webp', alt: 'Swifflyy map screen: drop a pin where you are, visible for one hour' },
      { src: '/apps/swifflyy-2.webp', small: '/apps/swifflyy-2-240.webp', alt: 'Swifflyy discover deck showing a person within one kilometre' },
      { src: '/apps/swifflyy-3.webp', small: '/apps/swifflyy-3-240.webp', alt: "Swifflyy match screen: it's a match, say hello" },
    ],
    description:
      'A dating app for right now. Instead of swiping through people 40 km away, you drop a pin where you actually are, and for the next hour you are visible to the people around that spot.',
    points: [
      'Place-based, not GPS-tracked: you opt in one pin at a time, and every pin expires on its own after exactly an hour.',
      'A deck of people within 1 km of the pin. A mutual like opens a real-time chat, and you are already in the same place.',
      'Selfie face verification earns a verified badge, with a verified-only filter on the deck.',
      'Mock-location apps are detected and rejected, so a pin is always where you really are.',
    ],
    stack: ['Flutter', '1 km geo-matching', 'Real-time chat', 'Face verification', 'Play Billing'],
    role: '[PLACEHOLDER: your role on Swifflyy]',
  },
  {
    slug: 'propkee',
    name: 'Propkee',
    kicker: 'Real estate',
    year: 2025,
    genres: ['Real estate', 'Short video', 'Global'],
    studio: 'Monkhub Innovations',
    brand: '#C59459',
    icon: '/apps/propkee.webp',
    links: {
      play: play('com.app.propkee'),
      ios: 'https://apps.apple.com/in/app/propkee-global-real-estate/id6747972743',
      web: 'https://www.propkee.com/',
    },
    meta: ['10K+ installs', '★ 4.4'],
    scene: 'propkee',
    sceneLabel: 'A property video tour plays; one tap slides up a glance card with price, size, ROI and what is nearby.',
    art: 'tv',
    description:
      'A short-form video platform for real estate. Buyers explore homes, communities and whole neighbourhoods through video tours instead of static photos, from India to Dubai and beyond.',
    points: [
      'Property reels that open a full glance card in one tap: price, size, layout and ROI-focused insights.',
      'Explore the area: cafés, gyms, schools and attractions around every listing, before you visit.',
      'Tell it your intent (buy, rent or invest) and your locations, and the feed only shows what matters.',
      'Verified developers and brokers only.',
    ],
    stack: ['Flutter', 'Short-form video', 'Smart filters', 'Android + iOS'],
    role: '[PLACEHOLDER: your role on Propkee]',
  },
  {
    slug: 'cdc-pragyan',
    name: 'CDC Pragyan',
    kicker: 'Healthtech',
    year: 2024,
    genres: ['Healthtech', 'Booking'],
    studio: 'Srijana Healthcare Solutions',
    brand: '#1E9B45',
    icon: '/apps/cdc-pragyan.webp',
    links: { play: play('com.pragyan.pragyan_cdc'), web: 'https://pragyancdc.com/' },
    meta: ['1K+ installs', '★ 4.0'],
    scene: 'pragyan',
    sceneLabel: 'A parent picks a therapy slot on a weekly calendar, the booking is confirmed and progress bars for each goal fill up.',
    art: 'tv',
    description:
      'Scheduling and managing child-development therapy (speech, occupational and behavioural) with centres near you, built for parents.',
    points: [
      'Book a therapy session in a few taps, by service and branch.',
      'Personalised therapy plans with progress tracking, so parents can follow every milestone.',
      'Round-the-clock support, doctors and grievance contacts inside the app.',
      'Family and health data kept secure and confidential.',
    ],
    stack: ['Flutter', 'Appointments', 'Progress tracking', 'Healthtech'],
    role: '[PLACEHOLDER: your role on CDC Pragyan]',
  },
  {
    slug: 'tuskin-coffee',
    name: 'Tuskin Coffee',
    kicker: 'Food & drink',
    year: 2025,
    genres: ['Food & drink', 'Order ahead'],
    studio: 'Monkhub Innovations',
    brand: '#1F5A93',
    icon: '/apps/tuskin-coffee.webp',
    links: { play: play('com.app.tuskincoffee'), web: 'https://tuskincoffee.com/' },
    scene: 'tuskin',
    sceneLabel: 'A cup fills while the order moves from placed to brewing to ready, then a QR code appears for pickup.',
    art: 'shots',
    shots: [
      { src: '/apps/tuskin-coffee-3.webp', small: '/apps/tuskin-coffee-3-240.webp', alt: 'Tuskin Coffee cart with a ready-time estimate' },
      { src: '/apps/tuskin-coffee-1.webp', small: '/apps/tuskin-coffee-1-240.webp', alt: 'Tuskin Coffee home screen with offers and categories' },
      { src: '/apps/tuskin-coffee-4.webp', small: '/apps/tuskin-coffee-4-240.webp', alt: 'Tuskin Coffee pickup QR code to show at the counter' },
    ],
    description:
      'Order-ahead coffee for busy mornings: build your order, skip the line, and collect it with a QR scan the moment it is ready.',
    points: [
      'Order ahead with a ready-time estimate, then pick up without queueing.',
      'A cart you can edit any time, with nutrition and allergen details on every item.',
      'Scan-to-collect QR at the counter.',
    ],
    stack: ['Flutter', 'Ordering', 'QR pickup'],
    role: '[PLACEHOLDER: your role on Tuskin Coffee]',
  },
]

// Smaller cards under the featured ones. `href: null` shows the card without a link.
export const episodes = [
  {
    name: 'E-School',
    year: 2023,
    note: 'Ritual Softech · Flutter',
    description: 'A school app for Android and iOS, with Provider state management and third-party API integrations.',
    href: null,
    brand: '#7C6CF0',
  },
  {
    name: 'Base Screen Kit',
    year: 2023,
    note: 'Unio Labs · Flutter',
    description: 'A reusable base screen class that generates UI components and handles navigation for every screen.',
    href: null,
    brand: '#2BB3A3',
  },
  {
    name: 'Real-estate Network',
    year: 2022,
    note: 'Toycel · Flutter',
    description: 'Built from scratch: builders, channel partners and authorities working in one system.',
    href: null,
    brand: '#E0913A',
  },
]

export const education = [
  {
    degree: 'B.Tech, Computer Science & Engineering',
    school: 'Jaypee University of Engineering and Technology',
    place: 'Guna, Madhya Pradesh',
    dates: 'Sep 2020 → May 2024',
    coursework: '[PLACEHOLDER: e.g. Data Structures, DBMS, Operating Systems, Computer Networks]',
    honours: '[PLACEHOLDER: CGPA, awards or projects, or set to null]',
  },
]

// Shown as a TV settings menu. Levels: 3 = Expert, 2 = Proficient, 1 = Familiar.
export const skills = [
  {
    category: 'Mobile',
    items: [
      { name: 'Flutter', level: 3 },
      { name: 'Dart', level: 3 },
      { name: 'Provider', level: 2 },
      { name: 'Android + iOS release', level: 2 },
    ],
  },
  {
    category: 'Backend',
    items: [
      { name: 'Node.js', level: 2 },
      { name: 'Go', level: 1 },
      { name: 'TypeScript', level: 1 },
      { name: 'Microservices', level: 2 },
      { name: 'REST APIs', level: 3 },
    ],
  },
  {
    category: 'Real-time & data',
    items: [
      { name: 'Kafka', level: 2 },
      { name: 'WebSockets', level: 2 },
      { name: 'Redis', level: 2 },
      { name: 'PostgreSQL', level: 2 },
      { name: 'MongoDB', level: 2 },
    ],
  },
  {
    category: 'Cloud & DevOps',
    items: [
      { name: 'Docker', level: 2 },
      { name: 'Kubernetes', level: 1 },
      { name: 'AWS', level: 1 },
      { name: 'GitHub Actions', level: 2 },
    ],
  },
  {
    category: 'Practice',
    items: [
      { name: 'Query optimisation', level: 2 },
      { name: 'Code review', level: 2 },
      { name: 'Clean architecture', level: 2 },
    ],
  },
]

// "Bonus features". Empty lists are hidden automatically.
export const extras = {
  certifications: [
    { name: 'The Complete Flutter Development Bootcamp with Dart', issuer: null, year: '2021' },
    { name: 'Full Stack Mobile App Developer Course (Flutter & TypeScript Backend)', issuer: null, year: null },
    { name: 'DSA Self Paced', issuer: null, year: null },
  ],
  achievements: [],
  talks: [],
  openSource: [],
  testimonials: [],
}

export const marquee = [
  'Flutter', 'Dart', 'Node.js', 'Go', 'Kafka', 'WebSockets', 'Redis', 'PostgreSQL',
  'MongoDB', 'Docker', 'Kubernetes', 'AWS', 'GitHub Actions', 'Microservices',
]
