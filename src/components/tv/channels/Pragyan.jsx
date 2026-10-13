// CDC Pragyan: pick a day, pick a slot, confirm; then the child's goals fill up.
const days = [
  ['Mon', 14],
  ['Tue', 15],
  ['Wed', 16],
  ['Thu', 17],
  ['Fri', 18],
  ['Sat', 19],
]
const slots = ['9:30', '10:30', '12:00', '15:00', '16:30', '17:30']
const goals = [
  ['Speech', 72],
  ['Motor skills', 58],
  ['Social', 81],
]

export default function PragyanScene() {
  return (
    <div className="scene pg">
      <div className="pg-card pg-book">
        <div className="pg-head">
          <b>Book a session</b>
          <span className="pg-pill">Speech therapy</span>
        </div>
        <div className="pg-days">
          {days.map(([d, n]) => (
            <span key={d} className={d === 'Thu' ? 'pg-on pg-day-pick' : ''}>
              {d}
              <b>{n}</b>
            </span>
          ))}
        </div>
        <div className="pg-slots">
          {slots.map((s) => (
            <span key={s} className={s === '10:30' ? 'pg-on pg-slot-pick' : s === '12:00' ? 'pg-full' : ''}>
              {s}
            </span>
          ))}
        </div>
        <span className="pg-confirm">
          <span className="pg-confirm-a">Confirm booking</span>
          <span className="pg-confirm-b">✓ Booked · Thu 17, 10:30</span>
        </span>
      </div>

      <div className="pg-card pg-progress">
        <div className="pg-head">
          <b>Progress</b>
          <span className="pg-muted">This month</span>
        </div>
        {goals.map(([g, v], k) => (
          <div key={g} className="pg-goal" style={{ '--v': `${v}%`, '--k': k }}>
            <span>
              {g}
              <em>{v}%</em>
            </span>
            <i>
              <i />
            </i>
          </div>
        ))}
        <span className="pg-star">★ New milestone</span>
      </div>
    </div>
  )
}
