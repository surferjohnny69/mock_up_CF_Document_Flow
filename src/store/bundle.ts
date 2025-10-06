import { create } from 'zustand'
import { addDays } from 'date-fns'
import { useTelemetry } from './telemetry'
import { useProfile } from './profile'

export type Doc = { docId: string, type: 'Trust'|'Will'|'Medical POA'|'Financial POA', version: number, status: 'DRAFT'|'ACTIVE'|'SUPERSEDED' }
export type ExecutionMethod = 'MANUAL_UPS'|'E_NOTARY'
export type BundleStatus = 'DRAFT'|'GENERATED'|'EXECUTION_SELECTED'|'LABEL_CREATED'|'SHIPPED'|'ACTIVE'

export type Label = { url: string, expiresAt: string, trackingNumber: string }
export type Tracking = { status: 'Label Created'|'In Transit'|'Delivered', lastScan?: string, eta?: string, upsDeepLink?: string }

export type Bundle = {
  bundleId: string
  executionMethod: ExecutionMethod
  fromAddress: import('./profile').Address
  label?: Label
  instructionsUrl?: string
  status: BundleStatus
  approvedAt?: string | null
  approvedBy?: string | null
  hasViewedLabel: boolean
  lastScanAt?: string | null
  trackingEta?: string | null
  upsAccepted?: boolean
  docs: Doc[]
}

type BundleStore = {
  bundle: Bundle
  setExecutionMethod: (m: ExecutionMethod) => void
  confirmFromAddress: (addr: import('./profile').Address, saveToProfile: boolean) => void
  regenerateDocuments: () => void
  createPrintPack: () => void
  markLabelViewed: () => void
  setWelonApproval: (approved: boolean) => void
  simulateUpsDropoff: () => void
  simulateUpsAccepted: () => void
  reset: () => void
}

function nextTrackingNumber() {
  const n = Math.floor(Math.random()*1e10).toString().padStart(10,'0')
  return '1Z' + n
}

function initialBundle(): Bundle {
  return {
    bundleId: 'B-2001',
    executionMethod: 'MANUAL_UPS',
    fromAddress: useProfile.getState().shippingFrom,
    status: 'DRAFT',
    approvedAt: null,
    approvedBy: null,
    hasViewedLabel: false,
    lastScanAt: null,
    trackingEta: null,
    upsAccepted: false,
    docs: [
      { docId: 'D-T-1', type: 'Trust', version: 1, status: 'DRAFT' },
      { docId: 'D-W-1', type: 'Will', version: 1, status: 'DRAFT' },
      { docId: 'D-M-1', type: 'Medical POA', version: 1, status: 'DRAFT' },
      { docId: 'D-F-1', type: 'Financial POA', version: 1, status: 'DRAFT' },
    ]
  }
}

export const useBundle = create<BundleStore>((set, get) => ({
  bundle: initialBundle(),
  setExecutionMethod: (m) => {
    set((s)=>({ bundle: { ...s.bundle, executionMethod: m, status: 'EXECUTION_SELECTED' }}))
    useTelemetry.getState().emit('execution.set', { method: m })
  },
  confirmFromAddress: (addr, saveToProfile) => {
    if (saveToProfile) {
      useProfile.getState().setShippingFrom(addr)
    }
    set((s)=>({ bundle: { ...s.bundle, fromAddress: addr }}))
    useTelemetry.getState().emit('fromAddress.confirmed', { saveToProfile })
  },
  regenerateDocuments: () => {
    set((s)=>({ bundle: { ...s.bundle, status: 'GENERATED', docs: s.bundle.docs.map(d=>({ ...d, version: d.version+1 })) }}))
  },
  createPrintPack: () => {
    const tracking = nextTrackingNumber()
    const expiresAt = addDays(new Date(), 90).toISOString()
    const labelUrl = `/print/label?tracking=${tracking}&expires=${encodeURIComponent(expiresAt)}`
    const instructionsUrl = `/print/instructions?bundle=B-2001`
    set((s)=>({ bundle: { ...s.bundle, label: { url: labelUrl, expiresAt, trackingNumber: tracking }, instructionsUrl, status: 'LABEL_CREATED', lastScanAt: null, trackingEta: null, upsAccepted: false }}))
    useTelemetry.getState().emit('label.created', { trackingNumber: tracking, expiresAt })
    useTelemetry.getState().emit('instructions.generated', { url: instructionsUrl })
  },
  markLabelViewed: () => {
    set((s)=>({ bundle: { ...s.bundle, hasViewedLabel: true }}))
    useTelemetry.getState().emit('label.viewed')
  },
  setWelonApproval: (approved: boolean) => {
    if (approved) {
      const approvedAt = new Date().toISOString()
      set((s)=>({ bundle: { ...s.bundle, approvedAt, approvedBy: 'welon.user', status: 'ACTIVE', docs: s.bundle.docs.map(d=>({ ...d, status: 'ACTIVE' })) }}))
      useTelemetry.getState().emit('doc.approved')
      useTelemetry.getState().emit('doc.active')
    } else {
      set((s)=>({ bundle: { ...s.bundle, approvedAt: null, approvedBy: null }}))
    }
  },
  simulateUpsDropoff: () => {
    const scanAt = new Date().toISOString()
    const eta = addDays(new Date(), 3).toISOString()
    set((s)=>({ bundle: { ...s.bundle, status: 'SHIPPED', lastScanAt: scanAt, trackingEta: eta, upsAccepted: false }}))
    useTelemetry.getState().emit('ups.shipped', { at: scanAt, eta })
  },
  simulateUpsAccepted: () => {
    const acceptedAt = new Date().toISOString()
    const eta = addDays(new Date(), 2).toISOString()
    set((s)=>({ bundle: { ...s.bundle, status: 'SHIPPED', lastScanAt: acceptedAt, trackingEta: eta, upsAccepted: true }}))
    useTelemetry.getState().emit('ups.accepted', { at: acceptedAt })
  },
  reset: () => {
    set({ bundle: initialBundle() })
  }
}))

export function statusIndex(status: BundleStatus): number {
  switch (status) {
    case 'DRAFT': return 0
    case 'GENERATED': return 1
    case 'EXECUTION_SELECTED': return 2
    case 'LABEL_CREATED': return 3
    case 'SHIPPED': return 4
    case 'ACTIVE': return 5
  }
}
