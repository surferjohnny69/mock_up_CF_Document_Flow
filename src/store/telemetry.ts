import { create } from 'zustand'

export type TelemetryEvent =
  | 'doc.generate.clicked'
  | 'subscription.active'
  | 'subscription.failure'
  | 'execution.set'
  | 'fromAddress.confirmed'
  | 'label.created'
  | 'instructions.generated'
  | 'label.viewed'
  | 'ups.shipped'
  | 'ups.accepted'
  | 'doc.active'
  | 'doc.approved'
  | 'doc.deactivated'
  | 'mock.reset'

export type TelemetryRecord = {
  id: string
  event: TelemetryEvent
  ts: string
  actor: string
  memberId: string
  bundleId: string
  ua: string
  ip: string
  payload?: Record<string, any>
}

type TelemetryStore = {
  records: TelemetryRecord[]
  emit: (event: TelemetryEvent, payload?: Record<string, any>) => void
  clear: () => void
  reset: () => void
}

function nowIso() { return new Date().toISOString() }
function rid() { return Math.random().toString(36).slice(2) }

export const useTelemetry = create<TelemetryStore>((set, get) => ({
  records: [],
  emit: (event, payload={}) => {
    const rec: TelemetryRecord = {
      id: rid(),
      event,
      ts: nowIso(),
      actor: 'member',
      memberId: 'M-100045',
      bundleId: 'B-2001',
      ua: navigator.userAgent,
      ip: '0.0.0.0',
      payload
    }
    console.log('[telemetry]', rec)
    set({ records: [rec, ...get().records].slice(0, 250) })
  },
  clear: () => set({ records: [] }),
  reset: () => set({ records: [] }),
}))
