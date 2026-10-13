// Renders the Open Graph card (see og.html). Not part of the production build.
import { useEffect, useRef } from 'react'
import { createRoot } from 'react-dom/client'
import TV from './components/tv/TV'
import { profile } from './data'
import './index.css'

function Card() {
  const tv = useRef(null)
  useEffect(() => {
    tv.current.show('ident', { flick: 0 })
  }, [])
  return (
    <div className="relative h-[630px] w-[1200px] overflow-hidden bg-[#070b14] text-[#e8eef7]">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            'repeating-linear-gradient(0deg, transparent 0 31px, #182235 31px 32px), repeating-linear-gradient(90deg, transparent 0 31px, #182235 31px 32px)',
          maskImage: 'radial-gradient(ellipse 60% 62% at 50% 44%, #000 20%, transparent 80%)',
        }}
      />
      <div className="absolute inset-x-0 top-[540px] bottom-0 bg-[linear-gradient(#0d1422,#05080f)] shadow-[inset_0_1px_0_rgba(255,255,255,.04)]" />
      <div className="absolute top-[34px] left-[315px] w-[570px]">
        <TV ref={tv} initial="on" />
      </div>
      <div className="absolute top-8 left-10 flex items-center gap-2.5 font-mono text-[15px] tracking-[0.12em] text-[#8392a9]">
        <span className="size-2.5 rounded-full bg-[#4ade80]" />
        ON AIR · CH 01
      </div>
      <div className="absolute right-10 bottom-8 font-mono text-[15px] tracking-[0.12em] text-[#8392a9]">
        {`${profile.stats[0].value} ${profile.stats[0].label}`.toUpperCase()}
      </div>
      <div className="absolute bottom-8 left-10 font-mono text-[15px] tracking-[0.12em] text-[#8392a9]">
        {profile.city.toUpperCase()} · PRESS OK
      </div>
    </div>
  )
}

createRoot(document.getElementById('og')).render(<Card />)
