import React from 'react'
import { useBundle } from '../store/bundle'

const TrackingWidget: React.FC = () => {
  const { bundle, simulateUpsDropoff, simulateUpsAccepted, setWelonApproval } = useBundle()
  if (!bundle.label) return null
  const deep = `https://www.ups.com/track?loc=null&tracknum=${bundle.label.trackingNumber}`
  const statusLabel = (() => {
    switch (bundle.status) {
      case 'ACTIVE':
        return 'Active — Welon uploaded signed documents'
      case 'SHIPPED':
        return bundle.upsAccepted
          ? 'In Transit — UPS Accepted (Awaiting Welon Upload)'
          : 'In Transit — Drop-Off Recorded'
      case 'LABEL_CREATED':
        return 'Label Created'
      default:
        return bundle.status
    }
  })()
  const lastScan = bundle.lastScanAt ? new Date(bundle.lastScanAt).toLocaleString() : 'Awaiting first scan'
  const eta = bundle.trackingEta ? new Date(bundle.trackingEta).toLocaleDateString() : (bundle.status === 'LABEL_CREATED' ? 'TBD' : 'Pending')
  return (
    <div className="panel">
      <div className="inline" style={{ justifyContent: 'space-between', width: '100%', marginBottom: 8 }}>
        <div className="h2" style={{ margin: 0 }}>Tracking Status</div>
        {bundle.status === 'ACTIVE' && (
          <span className="badge" style={{ background: '#ecfdf5', borderColor: '#a7f3d0', color: '#065f46' }}>Active</span>
        )}
      </div>
      <table className="table" aria-label="Tracking summary">
        <tbody>
          <tr><th>Tracking #</th><td>{bundle.label.trackingNumber}</td></tr>
          <tr><th>Status</th><td>{statusLabel}</td></tr>
          <tr><th>Last Scan</th><td>{lastScan}</td></tr>
          <tr><th>Estimated Delivery</th><td>{eta}</td></tr>
          <tr><th>UPS</th><td><a href={deep} target="_blank" rel="noreferrer">Open full tracking</a></td></tr>
        </tbody>
      </table>
      <div className="hr"></div>
      <div className="inline" style={{ gap: 8, flexWrap: 'wrap' }}>
        <button className="btn" onClick={simulateUpsDropoff} disabled={!bundle.label || bundle.status !== 'LABEL_CREATED'}>Simulate UPS Drop-Off</button>
        <button className="btn btn-success" onClick={simulateUpsAccepted} disabled={bundle.status !== 'SHIPPED' || !!bundle.upsAccepted}>Simulate UPS “Accepted / In‑Transit”</button>
        <button className="btn btn-accent" onClick={()=> setWelonApproval(true)} disabled={bundle.status !== 'SHIPPED' || !bundle.upsAccepted || !!bundle.approvedAt}>Simulate Welon Upload</button>
        {bundle.approvedAt && (
          <button className="btn" onClick={()=> setWelonApproval(false)}>Reset Welon Approval</button>
        )}
      </div>
      <div className="help" style={{ marginTop: 8 }}>For demo only — use these actions to simulate shipment progress and Welon review.</div>
    </div>
  )
}

export default TrackingWidget
