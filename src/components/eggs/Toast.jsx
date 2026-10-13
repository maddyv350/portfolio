// A one-line OSD message under the nav, e.g. when the Konami code flips the picture to black and white.
export default function Toast({ message }) {
  return (
    <div className="pointer-events-none fixed inset-x-0 top-[72px] z-50 flex justify-center px-4" role="status" aria-live="polite">
      {message && (
        <span key={message} className="osd-toast">
          {message}
        </span>
      )}
    </div>
  )
}
