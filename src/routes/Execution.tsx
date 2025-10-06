import React, { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import ExecutionMethodSelector from '../components/ExecutionMethodSelector'
import { useBundle } from '../store/bundle'

function useRouteA11y() {
  const ref = useRef<HTMLHeadingElement>(null)
  useEffect(()=>{ window.scrollTo(0,0); ref.current?.focus() },[])
  return ref
}

const Execution: React.FC = () => {
  const h1Ref = useRouteA11y()
  const nav = useNavigate()
  const { bundle } = useBundle()
  return (
    <div className="panel">
      <h1 className="h1" tabIndex={-1} ref={h1Ref}>Execution Method</h1>
      <p className="help">One choice applies to the entire document bundle.</p>
      <ExecutionMethodSelector />
      <div className="footer-sticky">
        <div className="sticky-actions">
          <span className="help">E‑Notary is feature‑flagged and disabled until enabled.</span>
          <button className="btn btn-primary" onClick={()=> nav('/document-execution/from-address')}>Continue</button>
        </div>
      </div>
    </div>
  )
}
export default Execution
