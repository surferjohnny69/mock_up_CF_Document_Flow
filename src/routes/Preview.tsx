import React, { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useBundle } from '../store/bundle'

function useRouteA11y() {
  const ref = useRef<HTMLHeadingElement>(null)
  useEffect(()=>{ window.scrollTo(0,0); ref.current?.focus() },[])
  return ref
}

const Preview: React.FC = () => {
  const h1Ref = useRouteA11y()
  const nav = useNavigate()
  const { bundle } = useBundle()
  const PREVIEW_SNIPPETS: Record<string, string[]> = {
    'Trust': [
      'DECLARATION OF TRUST — I, the undersigned, establish the Childfree Revocable Living Trust and transfer to the Trustee all property listed on Schedule A.',
      'ARTICLE I — The Trustee shall manage and invest trust property with reasonable care for my benefit during my lifetime.',
      'ARTICLE II — Upon my death, the Trustee shall distribute the remaining trust property as specified in my Distribution Memo.',
      'ARTICLE III — This Trust is revocable and may be amended by signed writing delivered to the Trustee.'
    ],
    'Will': [
      'LAST WILL AND TESTAMENT — I revoke all prior wills and codicils and declare this to be my last will.',
      'ARTICLE I — I am of sound mind and over eighteen years of age.',
      'ARTICLE II — I appoint the Personal Representative named in my records to administer my estate without bond.',
      'ARTICLE III — I give my property as listed in my memorandum; the residue passes to the beneficiaries named in my records.'
    ],
    'Medical POA': [
      'MEDICAL POWER OF ATTORNEY — I designate my Healthcare Agent named in my records to make medical decisions for me if I cannot.',
      'My Agent may consent to, refuse, or withdraw treatment and access my records under HIPAA.',
      'Preferences — My Agent shall honor the instructions stated in my advance directive and living will.'
    ],
    'Financial POA': [
      'FINANCIAL POWER OF ATTORNEY — I appoint my Financial Agent named in my records to act for me in financial and property matters.',
      'This durable power is effective immediately and includes banking, investments, taxes, real property, and insurance.',
      'The Agent may obtain information protected by privacy law as needed to carry out these powers.'
    ]
  }
  return (
    <div className="panel">
      <h1 className="h1" tabIndex={-1} ref={h1Ref}>Preview (Draft)</h1>
      <p className="help">Watermarked previews for all selected docs.</p>
      <div className="grid">
        {bundle.docs.map(d => (
          <div className="col-6" key={d.docId}>
            <div className="watermark">
              <div><strong>{d.type}</strong> — v{d.version}</div>
              <p className="help">Times New Roman 12pt, double‑spaced, 1″ margins (final PDFs).</p>
              <div style={{
                fontFamily: '"Times New Roman", Times, serif',
                fontSize: 12,
                lineHeight: 2,
                color: '#111',
                background: '#fff',
                padding: '4px 2px',
                borderRadius: 4
              }}>
                {(PREVIEW_SNIPPETS[d.type] || ['DRAFT PREVIEW TEXT']).map((line, idx) => (
                  <p key={idx} style={{ margin: 0 }}>{line}</p>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="footer-sticky">
        <div className="sticky-actions">
          <span />
          <button className="btn btn-primary" onClick={()=> nav('/document-execution/execution')}>Continue</button>
        </div>
      </div>
    </div>
  )
}
export default Preview
