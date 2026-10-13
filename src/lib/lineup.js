import { channels, extras } from '../data'

// The channel line-up: sections from data.js, minus any with nothing to show, numbered by position.
const hasExtras = Object.values(extras).some((list) => list.length > 0)

export const lineup = channels
  .filter((c) => c.id !== 'extras' || hasExtras)
  .map((c, i) => ({ ...c, ch: i + 1, num: String(i + 1).padStart(2, '0') }))

export const channel = Object.fromEntries(lineup.map((c) => [c.id, c]))
export const ids = lineup.map((c) => c.id)
