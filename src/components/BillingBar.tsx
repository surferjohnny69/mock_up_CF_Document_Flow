import React from 'react'
import { useProfile } from '../store/profile'

const BillingBar: React.FC = () => {
  const { subscription } = useProfile()
  const isActive = subscription.status === 'active'
  const isDelinquent = subscription.status === 'delinquent'
  const style: React.CSSProperties = isActive
    ? { background: '#ecfdf5', border: '1px solid #a7f3d0', color: '#065f46' }
    : isDelinquent
    ? { background: '#fee2e2', border: '1px solid #fecaca', color: '#991b1b' }
    : { background: '#f1f5f9', border: '1px solid #e5e7eb', color: '#0f172a' }
  return (
    <div className="inline" style={{ padding: '8px 12px', borderRadius: 10, ...style }}>
      <span style={{ fontWeight: 700 }}>{subscription.plan}</span>
      <span aria-hidden>•</span>
      <span style={{ textTransform: 'capitalize' }}>{subscription.status}</span>
      {subscription.nextBillDate && <><span aria-hidden>•</span><span>Next bill {subscription.nextBillDate}</span></>}
    </div>
  )
}

export default BillingBar
