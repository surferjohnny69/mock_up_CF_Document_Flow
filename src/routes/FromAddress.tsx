import React, { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import FromAddressForm from '../components/FromAddressForm'

function useRouteA11y() {
  const ref = useRef<HTMLHeadingElement>(null)
  useEffect(()=>{ window.scrollTo(0,0); ref.current?.focus() },[])
  return ref
}

const FromAddress: React.FC = () => {
  const h1Ref = useRouteA11y()
  const nav = useNavigate()
  return (
    <div className="panel">
      <h1 className="h1" tabIndex={-1} ref={h1Ref}>Confirm your “From” address</h1>
      <FromAddressForm onConfirmed={()=> nav('/document-execution/print-pack')} />
    </div>
  )
}
export default FromAddress
