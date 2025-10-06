import React from 'react'
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom'
import { ProgressStepper } from './ProgressStepper'
import Toast from './Toast'
import { useProfile } from '../store/profile'
import { useBundle } from '../store/bundle'
import { useTelemetry } from '../store/telemetry'
import { useToast } from './Toast'
import Sidebar from './Sidebar'

export const Layout: React.FC = () => {
  const loc = useLocation()
  const nav = useNavigate()
  const name = useProfile(s => s.name)
  const resetProfile = useProfile(s => s.reset)
  const resetBundle = useBundle(s => s.reset)
  const emitTelemetry = useTelemetry(s => s.emit)
  const resetTelemetry = useTelemetry(s => s.reset)
  const hideToast = useToast(s => s.hide)
  const homePaths = ['/', '/document-execution', '/document-execution/documents']
  const showBack = !homePaths.includes(loc.pathname)
  const initials = name.split(' ').map(p=>p[0]).slice(0,2).join('').toUpperCase()

  function onReset() {
    const ok = window.confirm('Reset the mock flow back to the start?')
    if (!ok) return
    emitTelemetry('mock.reset')
    resetProfile()
    resetBundle()
    resetTelemetry()
    hideToast()
    nav('/document-execution/documents')
  }
  return (
    <div>
      <header className="header" role="banner">
        <div className="header-inner container" aria-label="Header">
          <div className="logo" aria-label="Childfree Trust">
            <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>Childfree Trust</Link>
          </div>
          <ProgressStepper />
          <div style={{ marginLeft: 'auto' }} />
          <button type="button" className="btn btn-accent" onClick={onReset}>Reset Mock-Up</button>
          <div aria-label="Profile" title={name} style={{ width: 32, height: 32, borderRadius: 999, background: '#2563eb', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700 }}>
            {initials}
          </div>
        </div>
      </header>
      <main className="container" role="main">
        <div className="app-grid">
          <Sidebar />
          <div>
            {showBack && (
              <div className="breadcrumb" aria-label="Breadcrumb">
                <Link to="/document-execution/documents">← Back to My Documents</Link>
              </div>
            )}
            <Outlet />
          </div>
        </div>
      </main>
      <Toast />
    </div>
  )
}
