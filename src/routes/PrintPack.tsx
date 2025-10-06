import React, { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { useBundle } from '../store/bundle'

function useRouteA11y() {
  const ref = useRef<HTMLHeadingElement>(null)
  useEffect(()=>{ window.scrollTo(0,0); ref.current?.focus() },[])
  return ref
}

const PrintPack: React.FC = () => {
  const h1Ref = useRouteA11y()
  const { bundle, createPrintPack } = useBundle()
  const hasLabel = !!bundle.label

  return (
    <div className="panel">
      <h1 className="h1" tabIndex={-1} ref={h1Ref}>Your Print Package</h1>
      <p className="help">Download everything you need to complete your documents.</p>

      <div className="panel" style={{ marginTop: 8 }}>
        <div className="h2">What You'll Get</div>
        <div>
          <div className="inline" style={{ gap: 12, padding: '10px 12px', background: 'var(--badge)', borderRadius: 8, border: '1px solid var(--border)', marginTop: 8 }}>
            <span style={{ color: 'var(--accent)' }}>▣</span>
            <div>
              <div style={{ fontWeight: 600 }}>UPS Shipping Label</div>
              <div className="help">Prepaid return label (expires in 90 days)</div>
            </div>
          </div>
          <div className="inline" style={{ gap: 12, padding: '10px 12px', background: 'var(--badge)', borderRadius: 8, border: '1px solid var(--border)', marginTop: 8 }}>
            <span style={{ color: 'var(--accent)' }}>▣</span>
            <div>
              <div style={{ fontWeight: 600 }}>Instructions Sheet</div>
              <div className="help">Step‑by‑step checklist for completion</div>
            </div>
          </div>
        </div>

        <div style={{ marginTop: 12, display: 'flex', flexDirection: 'column', gap: 8 }}>
          <a className="btn btn-secondary btn-wide" href="/print/batch" target="_blank" rel="noreferrer">Download All Documents (PDF bundle)</a>
          <button className="btn btn-primary btn-wide" onClick={createPrintPack}>Generate Label & Instructions</button>
        </div>
      </div>

      <div className="panel" style={{ marginTop: 12 }}>
        <div className="h2">Steps to Complete</div>
        <ol style={{ paddingLeft: 18 }}>
          <li>
            <strong>Download</strong> your full packet — use “Download All Documents (PDF bundle)” above.
          </li>
          <li>
            <strong>{hasLabel ? 'Open' : 'Generate'}</strong> your UPS shipping label and Instructions Sheet
            {hasLabel ? ' — links are available below.' : ' — click “Generate Label & Instructions.”'}
          </li>
          <li>
            <strong>Print</strong> the packet and the one‑page Instructions Sheet.
          </li>
          <li>
            <strong>Notarize at UPS</strong> — bring a government‑issued ID; sign in front of the notary.
          </li>
          <li>
            <strong>Prepare the package</strong> — place signed documents in an envelope and affix the prepaid label.
          </li>
          <li>
            <strong>Ship</strong> at UPS and keep the receipt (it includes your tracking number).
          </li>
          <li>
            <strong>Track & Activate</strong> in Ship/Track — coverage becomes Active once UPS scans Accepted / In‑Transit.
          </li>
        </ol>
      </div>

      {bundle.label && (
        <div className="panel" style={{ marginTop: 12, background: '#fffbeb', borderColor: '#fde68a' }}>
          <div className="inline" style={{ gap: 10 }}>
            <span style={{ color: '#b45309' }}>⚠</span>
            <div>
              <div className="h2" style={{ margin: 0 }}>Label Expiration</div>
              <div className="help">Your UPS label expires on <strong>{new Date(bundle.label.expiresAt).toLocaleDateString()}</strong>. Please ship before the expiration date.</div>
              <div className="inline" style={{ gap: 8, marginTop: 8 }}>
                <a className="btn btn-accent" href={bundle.label.url} target="_blank" rel="noreferrer">Generate &amp; Open UPS Label</a>
                {bundle.instructionsUrl && <a className="btn" href={bundle.instructionsUrl} target="_blank" rel="noreferrer">Open Instructions Sheet</a>}
                <Link className="btn" to="/document-execution/ship-track">Go to Ship/Track</Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
export default PrintPack
