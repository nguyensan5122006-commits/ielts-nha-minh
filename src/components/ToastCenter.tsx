/**
 * ToastCenter.tsx — THÔNG BÁO NHỎ NỔI GÓC MÀN HÌNH ("+5 🍌", "Mở khoá huy hiệu!"...)
 * Dùng: const { showToast } = useToast(); showToast({ icon: '🍌', text: '+5 chuối' })
 * Thông báo tự biến mất sau vài giây. Có thể kèm 1 nút hành động (VD "Vào phòng").
 */
import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react'

export interface ToastOptions {
  icon?: string
  text: string
  /** thời gian hiện (ms), mặc định 3500 */
  durationMs?: number
  action?: { label: string; onClick: () => void }
}

interface ToastItem extends ToastOptions {
  id: number
}

const ToastContext = createContext<{ showToast: (toast: ToastOptions) => void } | null>(null)

let nextToastId = 1

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([])

  const dismiss = useCallback((id: number) => setToasts((list) => list.filter((t) => t.id !== id)), [])

  const showToast = useCallback(
    (toast: ToastOptions) => {
      const id = nextToastId++
      setToasts((list) => [...list.slice(-4), { ...toast, id }]) // tối đa 5 cái cùng lúc
      window.setTimeout(() => dismiss(id), toast.durationMs ?? 3500)
    },
    [dismiss],
  )

  const value = useMemo(() => ({ showToast }), [showToast])

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className="toast-stack" aria-live="polite">
        {toasts.map((toast) => (
          <div key={toast.id} className="toast">
            {toast.icon && <span className="toast__icon">{toast.icon}</span>}
            <span className="toast__text">{toast.text}</span>
            {toast.action && (
              <button
                type="button"
                className="button button--primary button--small"
                onClick={() => {
                  toast.action!.onClick()
                  dismiss(toast.id)
                }}
              >
                {toast.action.label}
              </button>
            )}
            <button type="button" className="toast__close" onClick={() => dismiss(toast.id)} aria-label="Đóng">
              ×
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  )
}

export function useToast() {
  const context = useContext(ToastContext)
  if (!context) throw new Error('useToast phải dùng bên trong <ToastProvider>')
  return context
}
