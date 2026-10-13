import { useEffect, useRef, useState } from 'react'
import { profile } from '../../data'
import { createStatic } from '../../lib/static'
import { prefersReducedMotion, useOnScreen } from '../../hooks'
import { scenes, TitleCard } from './channels'
import { channelNumber } from './TV'

const LOOP = 6200

// A smaller set for project cards: one channel, replayed behind a flick of static while on screen.
export default function MiniTV({ p, index }) {
  const root = useRef(null)
  const canvas = useRef(null)
  const noise = useRef(null)
  const onScreen = useOnScreen(root)
  const [take, setTake] = useState(0)
  const [flick, setFlick] = useState(false)
  const Scene = scenes[p.scene] || TitleCard

  useEffect(() => {
    noise.current = createStatic(canvas.current, 96, 72)
    return () => noise.current.stop()
  }, [])

  useEffect(() => {
    if (!onScreen || prefersReducedMotion()) return
    let inner
    const t = setTimeout(() => {
      setFlick(true)
      noise.current.start()
      inner = setTimeout(() => {
        setTake((k) => k + 1)
        setFlick(false)
        noise.current.stop()
      }, 200)
    }, LOOP)
    return () => {
      clearTimeout(t)
      clearTimeout(inner)
    }
  }, [take, onScreen])

  return (
    <div ref={root} className="tv-root" data-power="on">
      <div className="tv-body">
        <div className="tv-well">
          <div
            className={`scr ${onScreen ? '' : 'paused'}`}
            data-show="live"
            data-static={flick}
            role="img"
            aria-label={`${p.name}: ${p.sceneLabel}`}
          >
            <div className="scr-picture">
              <div className="scr-content">
                <Scene key={take} p={p} />
              </div>
              <canvas ref={canvas} className="scr-static" />
              <div className="scr-sync" />
              <div className="osd">
                <span className="osd-live">
                  <i /> LIVE
                </span>
                <span className="osd-ch">
                  <b>CH {channelNumber(index)}</b>
                  {p.name}
                </span>
              </div>
            </div>
            <div className="scr-scan" />
            <div className="scr-glass" />
          </div>
        </div>
        <div className="tv-chin">
          <span className="tv-led" aria-hidden="true" />
          <span className="tv-brand" aria-hidden="true">
            {profile.initials}-0{index + 2}
          </span>
          <span className="flex-1" />
          <span className="tv-grille" aria-hidden="true" />
        </div>
      </div>
      <div className="tv-feet" aria-hidden="true" />
    </div>
  )
}
