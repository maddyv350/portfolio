// Every sound on the site is synthesised here with the Web Audio API: oscillators, filtered noise and
// gain envelopes. Nothing plays until unlock() runs inside a user gesture (the OK press).

const KEY = 'onair:muted'
const VOLUME = 0.55

let ctx = null
let master = null
let noiseBuf = null
let muted = (() => {
  try {
    return localStorage.getItem(KEY) === '1'
  } catch {
    return false
  }
})()
const listeners = new Set()

const t0 = () => ctx.currentTime

function gain(peak, at, attack, decay) {
  const g = ctx.createGain()
  g.gain.setValueAtTime(0.0001, at)
  g.gain.exponentialRampToValueAtTime(peak, at + attack)
  g.gain.exponentialRampToValueAtTime(0.0001, at + attack + decay)
  return g
}

function filter(type, freq, q = 0.7) {
  const f = ctx.createBiquadFilter()
  f.type = type
  f.frequency.value = freq
  f.Q.value = q
  return f
}

function osc(type, freq) {
  const o = ctx.createOscillator()
  o.type = type
  o.frequency.value = freq
  return o
}

function noise() {
  if (!noiseBuf) {
    noiseBuf = ctx.createBuffer(1, ctx.sampleRate, ctx.sampleRate)
    const d = noiseBuf.getChannelData(0)
    for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1
  }
  const s = ctx.createBufferSource()
  s.buffer = noiseBuf
  s.loop = true
  return s
}

const chain = (...nodes) => nodes.reduce((a, b) => (a.connect(b), b))

function play(src, at, dur) {
  src.start(at)
  src.stop(at + dur)
}

const sounds = {
  // Plastic remote button: a bright tick on the way down, a softer one on release.
  click() {
    const t = t0()
    for (const [at, peak, f] of [[0, 0.5, 3400], [0.09, 0.22, 2600]]) {
      const n = noise()
      chain(n, filter('bandpass', f, 1.4), gain(peak, t + at, 0.002, 0.03), master)
      play(n, t + at, 0.06)
    }
    const body = osc('triangle', 190)
    body.frequency.exponentialRampToValueAtTime(80, t + 0.06)
    chain(body, gain(0.22, t, 0.002, 0.06), master)
    play(body, t, 0.09)
  },
  // The relay inside the set closing as the LED goes green.
  relay() {
    const t = t0()
    const n = noise()
    chain(n, filter('bandpass', 1500, 5), gain(0.3, t, 0.001, 0.025), master)
    play(n, t, 0.05)
  },
  // CRT power-on: a degauss "bwoom" under a rising flyback whine.
  powerOn() {
    const t = t0()
    const hum = osc('sawtooth', 56)
    const wobble = osc('sine', 9)
    const depth = ctx.createGain()
    depth.gain.value = 6
    chain(wobble, depth)
    depth.connect(hum.frequency)
    chain(hum, filter('lowpass', 260), gain(0.42, t, 0.03, 0.95), master)
    play(hum, t, 1.1)
    play(wobble, t, 1.1)

    const whine = osc('sine', 260)
    whine.frequency.exponentialRampToValueAtTime(7600, t + 1.15)
    const g = ctx.createGain()
    g.gain.setValueAtTime(0.0001, t)
    g.gain.exponentialRampToValueAtTime(0.035, t + 0.35)
    g.gain.setValueAtTime(0.035, t + 0.95)
    g.gain.exponentialRampToValueAtTime(0.0001, t + 1.5)
    chain(whine, g, master)
    play(whine, t, 1.55)
  },
  // A burst of static.
  hiss({ dur = 0.7 } = {}) {
    const t = t0()
    const n = noise()
    chain(n, filter('highpass', 700), filter('lowpass', 9000), gain(0.18, t, 0.02, dur), master)
    play(n, t, dur + 0.1)
  },
  // The 1 kHz line-up tone that plays under colour bars.
  tone({ dur = 0.45 } = {}) {
    const t = t0()
    const o = osc('sine', 1000)
    const g = ctx.createGain()
    g.gain.setValueAtTime(0.0001, t)
    g.gain.exponentialRampToValueAtTime(0.06, t + 0.02)
    g.gain.setValueAtTime(0.06, t + dur - 0.04)
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur)
    chain(o, g, master)
    play(o, t, dur + 0.02)
  },
  // Changing channel: a short static flick with a tick on top.
  blip() {
    const t = t0()
    const n = noise()
    chain(n, filter('bandpass', 2400, 0.6), gain(0.14, t, 0.004, 0.11), master)
    play(n, t, 0.14)
    const o = osc('square', 1320)
    chain(o, filter('lowpass', 3000), gain(0.03, t, 0.002, 0.03), master)
    play(o, t, 0.05)
  },
  // The TV settling into place in the hero.
  thunk() {
    const t = t0()
    const o = osc('sine', 150)
    o.frequency.exponentialRampToValueAtTime(52, t + 0.2)
    chain(o, gain(0.28, t, 0.005, 0.22), master)
    play(o, t, 0.26)
  },
  // CRT power-off: falling whine and a soft pop.
  powerOff() {
    const t = t0()
    const o = osc('sine', 5200)
    o.frequency.exponentialRampToValueAtTime(110, t + 0.4)
    chain(o, gain(0.04, t, 0.01, 0.4), master)
    play(o, t, 0.45)
    const n = noise()
    chain(n, filter('lowpass', 700), gain(0.35, t + 0.32, 0.003, 0.08), master)
    play(n, t + 0.32, 0.12)
  },
}

export const audio = {
  // Call from inside a click/key handler: browsers only allow audio after a gesture.
  unlock() {
    if (!ctx) {
      const AC = window.AudioContext || window.webkitAudioContext
      if (!AC) return
      ctx = new AC()
      master = ctx.createGain()
      master.gain.value = muted ? 0 : VOLUME
      master.connect(ctx.destination)
    }
    if (ctx.state === 'suspended') ctx.resume()
    listeners.forEach((f) => f())
  },
  get unlocked() {
    return !!ctx
  },
  get muted() {
    return muted
  },
  setMuted(m) {
    muted = m
    try {
      localStorage.setItem(KEY, m ? '1' : '0')
    } catch {}
    if (master) master.gain.setTargetAtTime(m ? 0 : VOLUME, ctx.currentTime, 0.02)
    listeners.forEach((f) => f())
  },
  subscribe(f) {
    listeners.add(f)
    return () => listeners.delete(f)
  },
  play(name, opts) {
    if (!ctx || muted) return
    try {
      sounds[name]?.(opts)
    } catch {}
  },
}
