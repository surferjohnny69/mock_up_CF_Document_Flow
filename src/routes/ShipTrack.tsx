import React, { useEffect, useRef } from 'react'
import TrackingWidget from '../components/TrackingWidget'
import MyCarePrompt from '../components/MyCarePrompt'
import { useBundle } from '../store/bundle'
import { useToast } from '../components/Toast'
import { Link } from 'react-router-dom'

function useRouteA11y() {
  const ref = useRef<HTMLHeadingElement>(null)
  useEffect(()=>{ window.scrollTo(0,0); ref.current?.focus() },[])
  return ref
}

const ShipTrack: React.FC = () => {
  const h1Ref = useRouteA11y()
  const { bundle } = useBundle()
  const toast = useToast()
  useEffect(()=> {
    if (bundle.status === 'SHIPPED' && !bundle.upsAccepted) {
      toast.show(`UPS has your package — in transit as of ${new Date().toLocaleDateString()}.`)
    }
    if (bundle.status === 'SHIPPED' && bundle.upsAccepted) {
      toast.show('UPS accepted your package. Awaiting Welon upload to activate.')
    }
    if (bundle.status === 'ACTIVE') {
      toast.show(`You’re covered. Welon uploaded your signed documents on ${new Date().toLocaleDateString()}.`)
    }
  }, [bundle.status, bundle.upsAccepted])
  return (
    <div className="panel">
      <h1 className="h1" tabIndex={-1} ref={h1Ref}>Track Your Shipment</h1>
      {bundle.label ? (
        <>
          <TrackingWidget />
          <div className="hr"></div>
          <MyCarePrompt />
        </>
      ) : (
        <div role="region" aria-label="No shipment yet" style={{ paddingTop: 8 }}>
          <p className="help">No UPS shipment yet. Create your UPS label to start tracking.</p>
          <Link className="btn btn-primary" to="/document-execution/print-pack">Create UPS Label</Link>
        </div>
      )}
    </div>
  )
}
export default ShipTrack
