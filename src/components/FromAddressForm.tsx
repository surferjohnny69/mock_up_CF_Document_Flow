import React, { useState } from 'react'
import { Address, useProfile } from '../store/profile'
import { useBundle } from '../store/bundle'

const FromAddressForm: React.FC<{ onConfirmed: ()=>void }> = ({ onConfirmed }) => {
  const { shippingFrom, setShippingFrom } = useProfile()
  const { confirmFromAddress } = useBundle()

  const [addr, setAddr] = useState<Address>(shippingFrom)
  const [saveToProfile, setSaveToProfile] = useState<boolean>(true)
  const [errors, setErrors] = useState<Record<string,string>>({})

  function validate(): boolean {
    const e: Record<string,string> = {}
    if(!addr.name) e.name = 'Full name required'
    if(!addr.street1) e.street1 = 'Street required'
    if(!addr.city) e.city = 'City required'
    if(!addr.state) e.state = 'State required'
    if(!addr.zip) e.zip = 'ZIP required'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  function submit() {
    if (!validate()) return
    confirmFromAddress(addr, saveToProfile)
    if (saveToProfile) setShippingFrom(addr)
    onConfirmed()
  }

  const onChange = (k: keyof Address) => (e: React.ChangeEvent<HTMLInputElement>) => setAddr({ ...addr, [k]: e.target.value })

  return (
    <form onSubmit={(e)=>{ e.preventDefault(); submit() }} aria-label="Confirm From Address">
      <div className="grid">
        <div className="col-12">
          <label htmlFor="name">Full Name</label>
          <input id="name" className="input" value={addr.name} onChange={onChange('name')} aria-invalid={!!errors.name} />
          {errors.name && <div className="help" role="alert">{errors.name}</div>}
        </div>
        <div className="col-12">
          <label htmlFor="street1">Street Address</label>
          <input id="street1" className="input" value={addr.street1} onChange={onChange('street1')} aria-invalid={!!errors.street1} />
          {errors.street1 && <div className="help" role="alert">{errors.street1}</div>}
        </div>
        <div className="col-12">
          <label htmlFor="street2">Street 2 (optional)</label>
          <input id="street2" className="input" value={addr.street2 ?? ''} onChange={onChange('street2')} />
        </div>
        <div className="col-6">
          <label htmlFor="city">City</label>
          <input id="city" className="input" value={addr.city} onChange={onChange('city')} aria-invalid={!!errors.city} />
          {errors.city && <div className="help" role="alert">{errors.city}</div>}
        </div>
        <div className="col-3">
          <label htmlFor="state">State</label>
          <input id="state" className="input" value={addr.state} onChange={onChange('state')} aria-invalid={!!errors.state} />
          {errors.state && <div className="help" role="alert">{errors.state}</div>}
        </div>
        <div className="col-3">
          <label htmlFor="zip">ZIP</label>
          <input id="zip" className="input" value={addr.zip} onChange={onChange('zip')} aria-invalid={!!errors.zip} />
          {errors.zip && <div className="help" role="alert">{errors.zip}</div>}
        </div>
        <div className="col-12 inline">
          <input id="save" type="checkbox" checked={saveToProfile} onChange={(e)=> setSaveToProfile(e.target.checked)} />
          <label htmlFor="save">Save to Profile</label>
        </div>
      </div>
      <div className="footer-sticky">
        <div className="sticky-actions">
          <span className="help">Your UPS “From” address will appear on the shipping label.</span>
          <button className="btn btn-primary" type="submit">Build Print Pack</button>
        </div>
      </div>
    </form>
  )
}

export default FromAddressForm
