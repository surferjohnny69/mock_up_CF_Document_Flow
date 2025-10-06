import React from 'react'

const PrintInstructions: React.FC = () => {
  return (
    <div className="print">
      <div className="no-print" style={{ position: 'fixed', right: 20, top: 20 }}>
        <button className="btn btn-primary" onClick={()=> window.print()}>Print</button>
      </div>
      <h1>Childfree Trust — Next Steps Checklist</h1>
      <p>Follow these steps to make your documents legally valid and ensure they are safely received by Welon Trust.</p>
      <ol>
        <li>
          <strong>Download &amp; Print</strong>
          <ul>
            <li>Download your full document packet.</li>
            <li>Print all pages (do not skip any).</li>
            <li>Keep the documents in the order they were generated.</li>
          </ul>
        </li>
        <li>
          <strong>Confirm Shipping Address</strong>
          <ul>
            <li>Your From address is pre-filled from your profile.</li>
            <li>Review it on screen before creating your label.</li>
            <li>Edit if needed and choose “Save to profile” for future updates.</li>
          </ul>
        </li>
        <li>
          <strong>Create &amp; Print UPS Label</strong>
          <ul>
            <li>In Next Steps, click Create UPS Label.</li>
            <li>The label is prepaid and addressed to Welon Trust – New Document Intake.</li>
            <li>Print the label.</li>
          </ul>
        </li>
        <li>
          <strong>Go to UPS Store (Notarization)</strong>
          <ul>
            <li>Bring your printed documents and a government-issued photo ID.</li>
            <li>Ask for notary services.</li>
            <li>Sign each document in front of the notary; the notary will apply their seal/stamp.</li>
          </ul>
        </li>
        <li>
          <strong>Prepare Package</strong>
          <ul>
            <li>Place the signed and notarized documents into an envelope.</li>
            <li>Attach the prepaid UPS label.</li>
          </ul>
        </li>
        <li>
          <strong>Ship to Welon Trust</strong>
          <ul>
            <li>Hand the envelope to UPS staff.</li>
            <li>Keep your receipt—it has the tracking number.</li>
          </ul>
        </li>
        <li>
          <strong>Track &amp; Confirm</strong>
          <ul>
            <li>Track your package in your dashboard (Current Status, Last Scan, Estimated Delivery, UPS link).</li>
            <li>Once UPS scans your package Accepted / In-Transit, your documents become Active and your Childfree Trust coverage begins.</li>
            <li>Welon may later add an Approved badge after processing; no further action is required.</li>
          </ul>
        </li>
      </ol>
      <p><strong>Remember:</strong> All documents in this packet follow the same process. Manual notarization at UPS is the only supported execution method right now (no e-signature).</p>
    </div>
  )
}
export default PrintInstructions
