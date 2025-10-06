import React, { useEffect, useRef } from 'react'

function useRouteA11y() {
  const ref = useRef<HTMLHeadingElement>(null)
  useEffect(()=>{ window.scrollTo(0,0); ref.current?.focus() },[])
  return ref
}

const MyInfo: React.FC = () => {
  const h1Ref = useRouteA11y()
  return (
    <div className="panel">
      <h1 className="h1" tabIndex={-1} ref={h1Ref}>My Info</h1>
      <p className="help">Personal & legal details (placeholder view for the mock).</p>
    </div>
  )
}

export default MyInfo

