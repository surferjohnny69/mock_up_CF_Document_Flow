import React from 'react'
import { Link, useLocation } from 'react-router-dom'

const legacyPrefix = '/document-execution'

const NavItem: React.FC<{ to: string, label: string, desc?: string, matchPrefix?: boolean, activeOverride?: boolean }>=({ to, label, desc, matchPrefix, activeOverride })=>{
  const loc = useLocation()
  const normalizedPath = loc.pathname.replace(/\/+$/, '') || '/'
  const normalizedTo = to.replace(/\/+$/, '') || '/'
  const computed = activeOverride ?? (matchPrefix ? normalizedPath.startsWith(normalizedTo) : normalizedPath === normalizedTo)
  return (
    <Link to={to} className={`nav-item ${computed ? 'active' : ''}`} aria-current={computed ? 'page' : undefined}>
      <div className="nav-label">{label}</div>
      {desc && <div className="nav-desc">{desc}</div>}
    </Link>
  )
}

const Sidebar: React.FC = () => {
  const loc = useLocation()
  const normalizedPath = loc.pathname.replace(/\/+$/, '') || '/'
  const legacyOpen = normalizedPath.startsWith(legacyPrefix)

  // Exclusive highlighting rules
  const execOverviewPath = '/document-execution/documents'
  const execWorkPaths = new Set([
    '/document-execution/preview',
    '/document-execution/execution',
    '/document-execution/from-address',
    '/document-execution/print-pack'
  ])
  const finalizePaths = new Set([
    '/document-execution/ship-track',
    '/document-execution/active'
  ])
  const myCarePaths = new Set([
    '/document-execution/my-care',
    '/my-care'
  ])

  const dashboardActive = normalizedPath === execOverviewPath
  const documentExecutionActive = execWorkPaths.has(normalizedPath)
  const finalizeActive = finalizePaths.has(normalizedPath)
  const myCareActive = myCarePaths.has(normalizedPath)
  return (
    <aside className="sidebar" aria-label="Member Navigation">
      <div className="sidebar-title">Member Dashboard</div>
      <nav className="side-nav">
        <NavItem to="/document-execution/documents" label="My Dashboard" desc="Overview & Actions" activeOverride={dashboardActive} />
        <NavItem to="/my-info" label="My Info" desc="Personal & Legal Details" />

        <div className={`nav-group ${legacyOpen ? 'open' : ''}`} aria-expanded={legacyOpen}>
          <div className="nav-group-header">
            <div className="nav-label">My Legacy</div>
            <div className="nav-desc">Manage Your Will, Trust & POA</div>
          </div>
          <div className="nav-sub">
            <NavItem to="/document-execution/documents" label="Document Execution" activeOverride={documentExecutionActive} />
            <NavItem to="/document-execution/ship-track" label="Finalize & Activate" desc="Sign, ship, and activate your documents." activeOverride={finalizeActive} />
          </div>
        </div>

        <NavItem to="/my-care" label="My Care" desc="Keep Us Up To Date" activeOverride={myCareActive} />
        <NavItem to="/wellness-checks" label="My Wellness Checks" desc="Automated Check-in Status" />
        <NavItem to="/education" label="Educational Content" desc="Videos, Articles & Guides" />
        <NavItem to="/document-execution/ship-track" label="Shipping & Tracking" desc="Save Address & Track Packages" activeOverride={false} />
        <NavItem to="/settings" label="Settings" desc="Account Settings" />
      </nav>
    </aside>
  )
}

export default Sidebar
