import React from 'react'
import { flags } from '../store/featureFlags'
import { useBundle } from '../store/bundle'

const RadioCard: React.FC<{
  id: string, title: string, desc: string, checked: boolean, onChange: ()=>void, disabled?: boolean, badge?: string
}> = ({ id, title, desc, checked, onChange, disabled, badge }) => (
  <label htmlFor={id} className="panel" style={{ opacity: disabled ? 0.6 : 1 }}>
    <div className="inline" style={{ justifyContent: 'space-between', width: '100%' }}>
      <div className="inline" style={{ gap: 12 }}>
        <input id={id} type="radio" name="exec" checked={checked} onChange={onChange} disabled={disabled} aria-describedby={id+'-desc'} />
        <div>
          <div className="h2">{title}</div>
          <div id={id+'-desc'} className="help">{desc}</div>
        </div>
      </div>
      {badge ? <span className="badge">{badge}</span> : null}
    </div>
  </label>
)

const ExecutionMethodSelector: React.FC = () => {
  const { bundle, setExecutionMethod } = useBundle()
  const eNotaryEnabled = flags.E_NOTARY_ENABLED

  return (
    <div className="grid">
      <div className="col-12">
        <RadioCard
          id="manual-ups"
          title="Manual notarization at a UPS Store"
          desc="Sign & notarize at a UPS Store. We’ll create a prepaid UPS label."
          checked={bundle.executionMethod === 'MANUAL_UPS'}
          onChange={()=> setExecutionMethod('MANUAL_UPS')}
        />
      </div>
      <div className="col-12">
        <RadioCard
          id="e-notary"
          title="E‑Notarization — Coming Soon"
          desc="Remote online notarization (RON). Join the waitlist to be notified."
          checked={bundle.executionMethod === 'E_NOTARY'}
          onChange={()=> setExecutionMethod('E_NOTARY')}
          disabled={!eNotaryEnabled}
          badge={!eNotaryEnabled ? 'Coming Soon' : 'Enabled'}
        />
      </div>
    </div>
  )
}

export default ExecutionMethodSelector
