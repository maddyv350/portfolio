import { profile } from '../../data'
import { Icon } from '../Icons'

// CH 00: press 0 anywhere. A small OSD panel with a fun fact; 0 or Escape tunes away again.
export default function HiddenChannel({ open, onClose }) {
  if (!open) return null
  return (
    <aside className="hidden-ch" data-theme="dark" role="status" aria-label="Hidden channel">
      <div className="flex items-center justify-between gap-3 font-mono text-[11px] tracking-[0.12em] text-[#7dffa2]">
        <span className="flex items-center gap-2">
          <b className="text-lg leading-none tracking-normal">CH 00</b> HIDDEN
        </span>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close hidden channel"
          className="grid size-8 place-items-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
        >
          <Icon name="close" className="size-4" />
        </button>
      </div>
      <p className="mt-4 font-display text-xl leading-snug font-extrabold tracking-[-0.02em] text-white">
        You found the hidden channel.
      </p>
      <p className="mt-2 text-[15px] leading-relaxed text-white/75">{profile.funFact}</p>
      <p className="mt-4 font-mono text-[11px] text-white/45">Press 0 again or Esc to tune away</p>
    </aside>
  )
}
