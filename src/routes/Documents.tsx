import React, { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useBundle } from '../store/bundle'
import { useTelemetry } from '../store/telemetry'
import { useProfile } from '../store/profile'
import PaymentModal from '../components/PaymentModal'

function useRouteA11y() {
  const ref = useRef<HTMLHeadingElement>(null)
  useEffect(()=>{ window.scrollTo(0,0); ref.current?.focus() },[])
  return ref
}

const Documents: React.FC = () => {
  const h1Ref = useRouteA11y()
  const nav = useNavigate()
  const { bundle, regenerateDocuments } = useBundle()
  const { subscription } = useProfile()
  const telemetry = useTelemetry()
  const [showPay, setShowPay] = useState(false)

  function onGenerate() {
    telemetry.emit('doc.generate.clicked')
    if (subscription.status !== 'active') {
      setShowPay(true)
      return
    }
    regenerateDocuments()
    nav('/document-execution/preview')
  }

  function onPaymentSuccess() {
    setShowPay(false)
    regenerateDocuments()
    nav('/document-execution/preview')
  }

  const active = bundle.status === 'ACTIVE'
  const shipped = bundle.status === 'SHIPPED'
  const eta = bundle.trackingEta ? new Date(bundle.trackingEta).toLocaleDateString() : 'TBD'
  const lastScan = bundle.lastScanAt ? new Date(bundle.lastScanAt).toLocaleString() : 'Awaiting scan'
  const approved = !!bundle.approvedAt

  if (active) {
    return (
      <div className="panel">
        <h1 className="h1" tabIndex={-1} ref={h1Ref}>My Dashboard</h1>
        <p className="help">Your documents are active. Quick status and recent items are below.</p>

        <div className="grid" style={{ marginBottom: 12 }}>
          <div className="panel" style={{ gridColumn: 'span 4' }}>
            <div className="inline" style={{ justifyContent: 'space-between', width: '100%', marginBottom: 8 }}>
              <div className="h2" style={{ margin: 0 }}>Document Status</div>
              <span className="badge" style={{ background: '#ecfdf5', borderColor: '#a7f3d0', color: '#065f46' }}>Active</span>
            </div>
            <p className="help">Your documents are legally active and on file.</p>
          </div>

          <div className="panel" style={{ gridColumn: 'span 4' }}>
            <div className="inline" style={{ justifyContent: 'space-between', width: '100%', marginBottom: 8 }}>
              <div className="h2" style={{ margin: 0 }}>Welon Review</div>
              <span className="badge" style={{ background: '#eff6ff', borderColor: '#bfdbfe', color: '#1d4ed8' }}>{approved ? 'Approved' : 'In Review'}</span>
            </div>
            <p className="help">Documents {approved ? 'reviewed and approved by Welon.' : 'awaiting Welon review.'}</p>
          </div>

          <div className="panel" style={{ gridColumn: 'span 4' }}>
            <div className="h2">Subscription Status</div>
            <div style={{ fontSize: 16, fontWeight: 700, textTransform: 'capitalize' }}>{subscription.status}</div>
            <div className="help">Billing details appear when you check out with Stripe.</div>
          </div>
        </div>

        <div className="panel" style={{ marginBottom: 12 }}>
          <div className="h2">Healthcare Agents</div>
          <div style={{ marginTop: 8 }}>
            <div className="inline" style={{ justifyContent: 'space-between', width: '100%', padding: '10px 12px', background: 'var(--badge)', borderRadius: 8, border: '1px solid var(--border)', marginTop: 8 }}>
              <div>
                <div style={{ fontWeight: 600 }}>Primary Agent</div>
                <div className="help">John Smith • (555) 123‑4567</div>
              </div>
              <button className="btn">Edit</button>
            </div>
            <div className="inline" style={{ justifyContent: 'space-between', width: '100%', padding: '10px 12px', background: 'var(--badge)', borderRadius: 8, border: '1px solid var(--border)', marginTop: 8 }}>
              <div>
                <div style={{ fontWeight: 600 }}>Secondary Agent</div>
                <div className="help">Sarah Johnson • (555) 987‑6543</div>
              </div>
              <button className="btn">Edit</button>
            </div>
          </div>
        </div>

        <div className="panel">
          <div className="h2">Recent Documents</div>
          <div style={{ marginTop: 8 }}>
            {bundle.docs.map(d => (
              <div key={d.docId} className="inline" style={{ justifyContent: 'space-between', width: '100%', padding: '10px 12px', background: 'var(--badge)', borderRadius: 8, border: '1px solid var(--border)', marginTop: 8 }}>
                <div>
                  <div style={{ fontWeight: 600 }}>{d.type}</div>
                  <div className="help">{d.status} • Last updated {new Date().toLocaleDateString()}</div>
                </div>
                <button className="btn">Download</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (shipped) {
    return (
      <div className="panel">
        <h1 className="h1" tabIndex={-1} ref={h1Ref}>My Dashboard</h1>
        <p className="help">Your package is with UPS. Coverage begins after Welon uploads your signed documents.</p>

        <div className="grid" style={{ marginBottom: 12 }}>
          <div className="panel" style={{ gridColumn: 'span 4' }}>
            <div className="inline" style={{ justifyContent: 'space-between', width: '100%', marginBottom: 8 }}>
              <div className="h2" style={{ margin: 0 }}>Document Status</div>
              <span className="badge" style={{ background: '#e0f2fe', borderColor: '#bae6fd', color: '#0c4a6e' }}>{bundle.upsAccepted ? 'UPS Accepted' : 'In Transit'}</span>
            </div>
            <p className="help">{bundle.upsAccepted
              ? 'UPS accepted your package. Welon will upload the signed documents to activate coverage.'
              : 'Drop-off recorded. We’re waiting on the first UPS acceptance scan.'}</p>
          </div>

          <div className="panel" style={{ gridColumn: 'span 4' }}>
            <div className="inline" style={{ justifyContent: 'space-between', width: '100%', marginBottom: 8 }}>
              <div className="h2" style={{ margin: 0 }}>Welon Review</div>
              <span className="badge" style={{ background: '#fef9c3', borderColor: '#fde68a', color: '#854d0e' }}>Awaiting Upload</span>
            </div>
            <p className="help">Welon activates your documents once the signed packet is received and uploaded.</p>
          </div>

          <div className="panel" style={{ gridColumn: 'span 4' }}>
            <div className="h2">Subscription Status</div>
            <div style={{ fontSize: 16, fontWeight: 700, textTransform: 'capitalize' }}>{subscription.status}</div>
            <div className="help">Billing details appear when you check out with Stripe.</div>
          </div>
        </div>

        <div className="panel" style={{ marginBottom: 12 }}>
          <div className="h2">Shipment Snapshot</div>
          <div className="help">Tracking #{bundle.label?.trackingNumber}</div>
          <p className="help">Last scan: {lastScan}</p>
          <p className="help">Estimated delivery: {eta}</p>
          <Link className="btn btn-primary" to="/document-execution/ship-track">View full tracking</Link>
        </div>

        <div className="panel">
          <div className="h2">Recent Documents</div>
          <div style={{ marginTop: 8 }}>
            {bundle.docs.map(d => (
              <div key={d.docId} className="inline" style={{ justifyContent: 'space-between', width: '100%', padding: '10px 12px', background: 'var(--badge)', borderRadius: 8, border: '1px solid var(--border)', marginTop: 8 }}>
                <div>
                  <div style={{ fontWeight: 600 }}>{d.type}</div>
                  <div className="help">{bundle.upsAccepted ? 'IN TRANSIT' : 'PENDING'} • Last updated {new Date().toLocaleDateString()}</div>
                </div>
                <span className="help">Download available after activation</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="panel">
      <h1 className="h1" tabIndex={-1} ref={h1Ref}>Your Documents Are Ready</h1>
      <p className="help">You've completed the interview. Generate your legal documents to continue.</p>

      <div className="panel" style={{ marginTop: 12 }} aria-label="Document Bundle">
        <div className="h2">Document Bundle</div>
        <div>
          {bundle.docs.map(d => (
            <div key={d.docId} className="inline" style={{ justifyContent: 'space-between', width: '100%', padding: '10px 12px', background: 'var(--badge)', borderRadius: 8, border: '1px solid var(--border)', marginTop: 8 }}>
              <div className="inline" style={{ gap: 10 }}>
                <span style={{ fontWeight: 600 }}>{d.type}</span>
                <span className="help">v{d.version}</span>
              </div>
              <span className="help">Included</span>
            </div>
          ))}
        </div>
      </div>

      {subscription.status !== 'active' && (
        <div className="panel" style={{ marginTop: 12, background: '#f8fafc', borderColor: '#e2e8f0' }}>
          <div className="h2" style={{ margin: 0, color: '#0f172a' }}>A subscription is required</div>
          <p className="help">You’ll complete payment securely through Stripe the moment you generate your documents.</p>
        </div>
      )}

      <div className="footer-sticky">
        <div className="sticky-actions">
          <div className="inline help">When ready, generate watermarked previews to review.</div>
          <button className="btn btn-primary" onClick={onGenerate}>Generate Documents</button>
        </div>
      </div>
      {showPay && <PaymentModal onClose={()=> setShowPay(false)} onSuccess={onPaymentSuccess} />}
    </div>
  )
}
export default Documents
