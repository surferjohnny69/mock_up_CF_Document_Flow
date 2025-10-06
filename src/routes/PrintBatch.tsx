import React from 'react'

const Block = ({ title, children }: { title: string, children: React.ReactNode }) => (
  <div style={{ pageBreakAfter: 'always' }}>
    <h2 style={{ textAlign: 'center', textTransform: 'uppercase' }}>{title}</h2>
    {children}
  </div>
)

const SigLines = () => (
  <>
    <br/>
    <p>Signed this ____ day of __________________, 20____.</p>
    <p>______________________________  (Member)</p>
    <p>______________________________  (Witness)</p>
    <p>______________________________  (Witness)</p>
  </>
)

const PrintBatch: React.FC = () => {
  return (
    <div className="print">
      <div className="no-print" style={{ position: 'fixed', right: 20, top: 20 }}>
        <button className="btn btn-primary" onClick={()=> window.print()}>Print / Save as PDF</button>
      </div>
      <h1 style={{ textAlign: 'center' }}>Batch Print — Legal Documents (Draft)</h1>
      <p>(Each document begins on a new page. Content is for mock‑up only.)</p>

      <Block title="Revocable Living Trust">
        <p>DECLARATION OF TRUST. I, the undersigned Member (the “Grantor”), hereby create the <strong>Childfree Revocable Living Trust</strong> (the “Trust”), and transfer to the Trustee all property listed on the attached Schedule A, together with any additions hereafter made.</p>
        <p>ARTICLE I — TRUSTEE AND SUCCESSOR. The initial Trustee is the Grantor. If the Grantor is unable or unwilling to serve, the successor trustee shall be the person designated in the Member’s records. The Trustee shall manage, invest, and reinvest trust property with reasonable care.</p>
        <p>ARTICLE II — BENEFICIAL USES. During my lifetime, the Trustee shall hold the trust for my benefit. Upon my death, the Trustee shall distribute the remaining trust property in the manner specified in the Distribution Memo kept with my records.</p>
        <p>ARTICLE III — REVOCABILITY. This Trust is revocable. I may amend or revoke it at any time by signed writing delivered to the Trustee.</p>
        <p>ARTICLE IV — POWERS OF TRUSTEE. The Trustee shall have all powers granted by law to manage trust assets, including buying, selling, and voting securities; opening accounts; and hiring advisors.</p>
        <p>ARTICLE V — GOVERNING LAW. This Trust is governed by the laws of my state of residence.</p>
        <SigLines />
        <p>Notary acknowledgment: ______________________________</p>
      </Block>

      <Block title="Last Will & Testament">
        <p>I, the undersigned, declare this to be my <strong>Last Will and Testament</strong>. I revoke all prior wills and codicils.</p>
        <p>ARTICLE I — IDENTIFICATION. I am of sound mind and over eighteen years of age. I am not married and have no minor children under my care.</p>
        <p>ARTICLE II — PERSONAL REPRESENTATIVE. I appoint the person named in my records as Personal Representative to serve without bond, with full authority to administer my estate.</p>
        <p>ARTICLE III — DISPOSITION. I give my tangible personal property as listed in my memorandum. The residue of my estate shall pass to the beneficiaries identified in my records, per stirpes if not otherwise stated.</p>
        <p>ARTICLE IV — GUARDIANSHIP. If I have pets or dependents, I nominate the caregivers listed in my records.</p>
        <p>ARTICLE V — DIGITAL ASSETS. My Personal Representative may access, manage, and close digital accounts as necessary.</p>
        <p>ARTICLE VI — GOVERNING LAW. This Will is governed by the laws of my state of residence.</p>
        <SigLines />
      </Block>

      <Block title="Medical Power of Attorney">
        <p>I designate my <strong>Healthcare Agent</strong> named in my records to make medical decisions for me if I am unable to do so. This authority includes consent, refusal, or withdrawal of medical treatment, access to medical records under HIPAA, and decisions regarding placement, care, and services.</p>
        <p>LIMITS AND PREFERENCES. My Agent shall honor the preferences stated in my advance directive and instructions kept with my records. Life‑sustaining treatment preferences are as stated in my Living Will, if any.</p>
        <p>EFFECTIVE DATE. This power is effective immediately and continues during any incapacity until revoked.</p>
        <p>ALTERNATES. If my primary Agent is unwilling or unable to serve, the alternate Agent listed in my records shall serve.</p>
        <SigLines />
        <p>Notary acknowledgment: ______________________________</p>
      </Block>

      <Block title="Financial Power of Attorney">
        <p>I appoint my <strong>Financial Agent</strong> named in my records as my true and lawful attorney‑in‑fact to act for me in financial and property matters, including banking, investments, taxes, real property, insurance, benefits, and claims.</p>
        <p>DURABILITY. This power is durable and is not terminated by my subsequent incapacity. My Agent may act alone with full authority and may obtain information protected by privacy law as needed to carry out these powers.</p>
        <p>EFFECTIVE DATE AND REVOCATION. This power is effective immediately and remains in effect until I revoke it in writing.</p>
        <p>GOVERNING LAW. This document is governed by the laws of my state of residence.</p>
        <SigLines />
        <p>Notary acknowledgment: ______________________________</p>
      </Block>
    </div>
  )
}

export default PrintBatch
