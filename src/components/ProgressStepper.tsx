import React from 'react'
import { useLocation } from 'react-router-dom'
import { useBundle, statusIndex } from '../store/bundle'

const steps = [
  'Draft', 'Execution', 'From Address', 'Print Pack', 'Ship/Track', 'Active', 'My Care'
]

function routeIndex(pathname: string): number {
  const map: Record<string, number> = {
    '/document-execution': 0,
    '/document-execution/': 0,
    '/document-execution/documents': 0,
    '/document-execution/preview': 0,
    '/document-execution/execution': 1,
    '/document-execution/from-address': 2,
    '/document-execution/print-pack': 3,
    '/document-execution/ship-track': 4,
    '/document-execution/active': 5,
    '/document-execution/my-care': 6,
    '/my-care': 6,
  }
  if (pathname in map) return map[pathname]
  if (pathname.startsWith('/document-execution/')) {
    const segments = pathname.split('/')
    const key = segments.slice(0, 4).join('/')
    if (key in map) return map[key]
  }
  return -1
}

export const ProgressStepper: React.FC = () => {
  const { bundle } = useBundle()
  const loc = useLocation()
  const statusStepIdx = statusIndex(bundle.status)
  const routeIdx = routeIndex(loc.pathname)
  const currentIdx = Math.max(statusStepIdx, routeIdx)
  return (
    <nav aria-label="Progress" className="stepper" style={{ flex: 1, minWidth: 0 }}>
      {steps.map((s, i) => {
        let state: 'done'|'active'|'idle'
        if (i < currentIdx) state = 'done'
        else if (i === currentIdx) state = 'active'
        else state = 'idle'
        if (s === 'Active' && bundle.approvedAt && i <= currentIdx) {
          state = 'done'
        }
        return (
          <div className="step-wrap" key={s} aria-current={i===currentIdx ? 'step' : undefined}>
            <div className="step-node">
              <div className={`step-dot ${state === 'done' ? 'done' : ''} ${state === 'active' ? 'active' : ''}`}>{state === 'done' ? '✓' : ''}</div>
              <div className="step-label">{s}</div>
            </div>
            {i < steps.length - 1 && (
              <div className={`step-conn ${i < currentIdx ? 'active' : ''}`} aria-hidden />
            )}
          </div>
        )
      })}
      {bundle.approvedAt ? (
        <span className="badge" title={`Approved on ${new Date(bundle.approvedAt).toLocaleDateString()}`}>Approved</span>
      ) : null}
    </nav>
  )
}
