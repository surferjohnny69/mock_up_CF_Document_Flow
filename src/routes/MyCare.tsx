import React, { useEffect, useRef } from 'react'
import { useBundle } from '../store/bundle'
import { useProfile } from '../store/profile'

function useRouteA11y() {
  const ref = useRef<HTMLHeadingElement>(null)
  useEffect(()=>{ window.scrollTo(0,0); ref.current?.focus() },[])
  return ref
}

const MyCare: React.FC = () => {
  const h1Ref = useRouteA11y()
  return (
    <div className="panel">
      <h1 className="h1" tabIndex={-1} ref={h1Ref}>My Care</h1>
      <p className="help">This section is intentionally blank for this mock‑up.</p>
    </div>
  )
}
export default MyCare
