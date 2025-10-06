import { create } from 'zustand'

export type Address = {
  name: string
  street1: string
  street2?: string
  city: string
  state: string
  zip: string
}

export type Subscription = {
  status: 'none' | 'active' | 'delinquent'
  plan: '$99/mo' | '$999/yr' | 'custom'
  nextBillDate?: string
}

type ProfileState = {
  memberId: string
  name: string
  email: string
  subscription: Subscription
  shippingFrom: Address
  setSubscription: (s: Subscription) => void
  setShippingFrom: (a: Address) => void
  reset: () => void
}

export const useProfile = create<ProfileState>((set) => ({
  memberId: 'M-100045',
  name: 'Avery Member',
  email: 'avery.member@example.com',
  subscription: { status: 'none', plan: '$99/mo' },
  shippingFrom: {
    name: 'Avery Member',
    street1: '123 Market Street',
    city: 'San Francisco',
    state: 'CA',
    zip: '94105',
  },
  setSubscription: (s) => set({ subscription: s }),
  setShippingFrom: (a) => set({ shippingFrom: a }),
  reset: () => set({
    subscription: { status: 'none', plan: '$99/mo' },
    shippingFrom: {
      name: 'Avery Member',
      street1: '123 Market Street',
      city: 'San Francisco',
      state: 'CA',
      zip: '94105',
    }
  })
}))
