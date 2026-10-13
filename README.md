# On Air

Personal portfolio of **Sachin Verma**, full-stack engineer. The site is a television: it sits on standby until
you press OK, warms up like a CRT, and the portfolio plays as a broadcast. Built with React, Vite and Tailwind CSS v4,
with GSAP for the intro timeline only. The TV, remote and room are SVG + CSS, the static is a small `<canvas>`, and
every sound is generated with the Web Audio API.

## Run locally

```bash
npm install
npm run dev      # http://localhost:5173 (pass --port 5180 if 5173 is taken)
npm run build    # production build in dist/
npm run preview  # serve the build
```

To see the full intro again, open the site in a new tab: within one tab session you only get the quick power-on.
`prefers-reduced-motion` skips the intro entirely.

## Editing content

Everything on the page lives in **`src/data.js`**. Edit that file and the site updates. Anything still marked
`[PLACEHOLDER]` needs your real details; setting a field to `null` hides it.

| Export | What it controls |
| --- | --- |
| `profile` | Name, role, city, email, the hero bio (`<b>` highlights a number), the two floating stat chips, socials (a social with `href: null` is hidden everywhere), resume path, "open to" line, contact headline, and the CH 00 fun fact. |
| `channels` | The sections, in order. Channel numbers (CH 01, CH 02 …), the nav's number keys and the digit shortcuts all follow this order. |
| `seasons` | Experience, newest first. `current: true` adds the live dot; `since: 'YYYY-MM'` drives the "x yr y mo on air" badge. Bullet groups are `shipped` ▶, `improved` ↑ and `recognised` ★. |
| `projects` | Featured projects. They also play on the hero TV as CH 3.1, 3.2 … See below. |
| `episodes` | The smaller "More episodes" cards (earlier work). `href: null` shows a card without a link. |
| `education` | Degree rows. `coursework` and `honours` are optional. |
| `skills` | The settings menu. `level`: 3 = Expert, 2 = Proficient, 1 = Familiar (shown as signal bars, never percentages). |
| `extras` | Bonus features: `certifications`, `achievements`, `talks`, `openSource`, `testimonials`. Empty lists are hidden, and if all are empty the whole section (and its channel) disappears. |
| `marquee` | The strip under the hero. |

### Projects

Each project has a `brand` colour (used for its glow and monogram), store `links` (`play`, `ios`, `web`, `github`, any of
which can be left out), a `role` line, `stack` pills and optional `meta` chips (e.g. install counts).

- **`icon`**: put a square image in `public/apps/` and reference it as `'/apps/name.webp'`, or use a full URL. Without
  one, a monogram tile in the brand colour is shown.
- **`art: 'shots'`** fans out three screenshots on grid paper. Add them to `public/apps/` and list them in `shots` with
  alt text; `small` is an optional ~240px-wide copy for small screens.
- **`art: 'tv'`** plays the project's animated scene inside a mini TV.
- **`scene`** picks the animated scene shown on the TV. The four scenes live in `src/components/tv/channels/` and are
  registered in `channels/index.js`. A project without a scene gets an animated title card in its brand colour, so new
  projects work straight away. To make a custom one, copy an existing scene: each is a one-shot ~4s storyboard whose
  resting styles are the final frame (keyframes only describe how it gets there), which is also what reduced-motion
  visitors see.

### Files

- **Resume:** replace `public/resume.pdf`.
- **Open Graph image:** `public/og.png` (1200×630). It's a screenshot of `og.html`: run the dev server, open
  `/og.html`, and capture it at 1200×630.
- **Favicon:** `public/favicon.svg`.

## Remote control (keyboard)

| Key | Does |
| --- | --- |
| Enter / Space / click | Press OK on the intro |
| Esc | Skip the intro, close the nav or the hidden channel |
| 1 – 7 | Jump to that channel (section) |
| ↑ / ↓ | Change channel while the nav's remote panel is open |
| 0 | The hidden channel |
| ↑ ↑ ↓ ↓ ← → ← → B A | Black-and-white broadcast |

Leave the page alone for a minute and the screensaver comes on. The power buttons (nav panel and footer) switch the set
off; press OK to turn it back on. Sound only starts after the OK press, and the mute and scanline choices are remembered.

## Deploy

The build is a static site, so any static host works.

**GitHub Pages:** `.github/workflows/deploy.yml` builds and deploys on every push to `main`. One-time setup: in the repo,
go to **Settings → Pages** and set **Source** to **GitHub Actions**. The workflow works out the base path itself, so a
project repo (`https://<user>.github.io/<repo>/`), a `<user>.github.io` repo and a custom domain all work without edits.
It also passes the site URL to the build so the Open Graph tags point at the right address (locally they fall back
to the value in `.env`).
