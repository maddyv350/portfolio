import { useEffect, useRef } from 'react'

// The set is off: the page has collapsed to a line, then a dot. Any OK (click, Enter, Space) turns it back on.
export default function PowerOff({ onOn }) {
  const button = useRef(null)

  useEffect(() => {
    button.current?.focus({ preventScroll: true })
    const onKey = (e) => {
      if (e.key === 'Enter' || e.key === ' ' || e.key === 'Escape') {
        e.preventDefault()
        onOn()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onOn])

  return (
    <div className="power-off" onClick={onOn} role="dialog" aria-modal="true" aria-label="The TV is off">
      <span className="po-line" aria-hidden="true" />
      <span className="po-dot" aria-hidden="true" />
      <div className="po-prompt">
        <button
          ref={button}
          type="button"
          onClick={(e) => {
            e.stopPropagation()
            onOn()
          }}
        >
          PRESS <kbd>OK</kbd> TO TURN BACK ON
          <i className="cursor" aria-hidden="true" />
        </button>
        <small>Thanks for watching</small>
      </div>
    </div>
  )
}
