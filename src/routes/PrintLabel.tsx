import React, { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useBundle } from '../store/bundle'

const PrintLabel: React.FC = () => {
  const [sp] = useSearchParams()
  const track = sp.get('tracking') || '1ZMOCKTRACK'
  const expires = sp.get('expires') ? new Date(sp.get('expires')!) : new Date(Date.now()+90*86400000)
  const { markLabelViewed } = useBundle()

  useEffect(()=> { markLabelViewed() }, [])

  return (
    <div className="print">
      <div className="no-print" style={{ position: 'fixed', right: 20, top: 20 }}>
        <button className="btn btn-primary" onClick={()=> window.print()}>Print Label</button>
      </div>
      <h1 style={{ marginBottom: '0.2in' }}>UPS Shipping Label (Demo)</h1>
      <p><strong>Tracking #:</strong> {track}</p>
      <p><strong>Expires:</strong> {expires.toLocaleDateString()}</p>
      <div style={{ border: '2px solid #000', padding: '0.5in', marginTop: '0.5in' }}>
        <p>Welon Trust<br/>Attn: New Document Intake<br/>123 Welon Street<br/>Anytown, ST 12345</p>
        <hr />
        <p><strong>FROM:</strong> Member’s confirmed “From” address</p>
        <p className="help">This is a demo rendering for the mock flow.</p>
      </div>
    </div>
  )
}
export default PrintLabel
