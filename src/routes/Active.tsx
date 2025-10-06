import React, { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { useBundle } from '../store/bundle'

function useRouteA11y() {
  const ref = useRef<HTMLHeadingElement>(null)
  useEffect(()=>{ window.scrollTo(0,0); ref.current?.focus() },[])
  return ref
}

const Active: React.FC = () => {
  const h1Ref = useRouteA11y()
  const { bundle, setWelonApproval } = useBundle()
  return (
    <div className="panel">
      <h1 className="h1" tabIndex={-1} ref={h1Ref}>Active</h1>
      <p>Your documents are active. Welon approval is non‑blocking and will appear as a badge when complete.</p>
      <div className="inline" style={{ gap: 8 }}>
        <button className="btn" onClick={()=> setWelonApproval(true)}>Simulate Welon Approved</button>
        <Link className="btn btn-primary" to="/my-care">Go to My Care</Link>
      </div>
    </div>
  )
}
export default Active
