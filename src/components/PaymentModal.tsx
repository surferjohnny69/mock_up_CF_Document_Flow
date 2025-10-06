import React from 'react'
import { useProfile } from '../store/profile'
import { useTelemetry } from '../store/telemetry'

type Props = { onClose: ()=>void, onSuccess: ()=>void }
const PaymentModal: React.FC<Props> = ({ onClose, onSuccess }) => {
  const { setSubscription } = useProfile()
  const telemetry = useTelemetry()
  function pay(success: boolean) {
    if (success) {
      setSubscription({ status: 'active', plan: '$99/mo', nextBillDate: new Date(Date.now()+28*86400000).toLocaleDateString() })
      telemetry.emit('subscription.active')
      onSuccess()
    } else {
      telemetry.emit('subscription.failure', { reason: 'card_declined' })
      alert('Payment failed: Your card was declined. Please try again or use another method.')
    }
  }
  return (
    <div role="dialog" aria-modal="true" className="panel" style={{ position: 'fixed', inset: '20% 25%', zIndex: 1000 }}>
      <div className="h2">Subscribe to generate your documents</div>
      <p>$99 per month. Billed by Stripe. You can cancel anytime.</p>
      <div className="inline" style={{ gap: 8 }}>
        <button className="btn btn-primary" onClick={()=> pay(true)}>Pay with Stripe (Success)</button>
        <button className="btn btn-danger" onClick={()=> pay(false)}>Simulate Failure</button>
        <button className="btn" onClick={onClose}>Cancel</button>
      </div>
      <p className="help" style={{ marginTop: 8 }}>Per spec: payment is requested at the first click of “Generate Documents.”</p>
    </div>
  )
}
export default PaymentModal
