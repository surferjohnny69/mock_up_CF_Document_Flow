import React from 'react'
import { create } from 'zustand'

type ToastState = { msg?: string, show: (m: string)=>void, hide: ()=>void }
export const useToast = create<ToastState>((set)=> ({
  msg: undefined, show: (m)=> set({ msg: m }), hide: ()=> set({ msg: undefined })
}))

const Toast: React.FC = () => {
  const { msg, hide } = useToast()
  if (!msg) return null
  return (
    <div className="toast" role="status" aria-live="polite">
      <div style={{ marginBottom: 8 }}>{msg}</div>
      <button className="btn btn-primary" onClick={hide}>Dismiss</button>
    </div>
  )
}
export default Toast
