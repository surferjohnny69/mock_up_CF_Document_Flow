import React, { useEffect, useRef } from 'react'
import { useTelemetry } from '../store/telemetry'

function useRouteA11y() {
  const ref = useRef<HTMLHeadingElement>(null)
  useEffect(()=>{ window.scrollTo(0,0); ref.current?.focus() },[])
  return ref
}

const DevEvents: React.FC = () => {
  const h1Ref = useRouteA11y()
  const { records, clear } = useTelemetry()
  return (
    <div className="panel">
      <h1 className="h1" tabIndex={-1} ref={h1Ref}>Dev Events</h1>
      <button className="btn" onClick={clear}>Clear</button>
      <table className="table" style={{ marginTop: 12 }}>
        <thead><tr><th>Time</th><th>Event</th><th>Payload</th></tr></thead>
        <tbody>
          {records.map(r => (
            <tr key={r.id}>
              <td>{new Date(r.ts).toLocaleTimeString()}</td>
              <td><code>{r.event}</code></td>
              <td><pre style={{ margin: 0, whiteSpace: 'pre-wrap' }}>{JSON.stringify(r.payload || {}, null, 2)}</pre></td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="help">All events include actor, memberId, bundleId, ts, ip (placeholder), ua. Redact PII in production.</p>
    </div>
  )
}
export default DevEvents
