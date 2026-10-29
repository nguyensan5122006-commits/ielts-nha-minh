/**
 * theme.ts — CHẾ ĐỘ SÁNG / TỐI
 * ----------------------------------------------------------------------------
 * 3 lựa chọn: 'system' (theo máy), 'light', 'dark'. Lựa chọn được nhớ trong
 * localStorage ('ielts-theme') và áp lên thẻ <html data-theme="light|dark">.
 * tokens.css đọc thuộc tính đó để đổi toàn bộ bảng màu.
 *
 * Cách dùng trong component:
 *   const { preference, resolvedTheme, setPreference } = useTheme()
 *
 * Thiết kế: dùng một "kho" nhỏ ngoài React (useSyncExternalStore), nên useTheme()
 * chạy được cả khi KHÔNG có <ThemeProvider> (VD trang /design). <ThemeProvider>
 * chỉ để đảm bảo theme được áp ngay khi app khởi động — bọc ngoài cùng App.
 *
 * Chống "nháy trắng": index.html có 1 đoạn script nhỏ đặt data-theme trước khi
 * React chạy — phải dùng CÙNG khoá localStorage với file này.
 * ----------------------------------------------------------------------------
 */
import { useEffect, useSyncExternalStore, type ReactNode } from 'react'

export type ThemePreference = 'system' | 'light' | 'dark'
export type ResolvedTheme = 'light' | 'dark'

export const THEME_STORAGE_KEY = 'ielts-theme'

const listeners = new Set<() => void>()
const darkQuery = typeof window !== 'undefined' && window.matchMedia ? window.matchMedia('(prefers-color-scheme: dark)') : null

function readSavedPreference(): ThemePreference {
  try {
    const saved = localStorage.getItem(THEME_STORAGE_KEY)
    return saved === 'light' || saved === 'dark' ? saved : 'system'
  } catch {
    return 'system' // trình duyệt chặn lưu trữ
  }
}

let preference: ThemePreference = readSavedPreference()

function resolve(pref: ThemePreference): ResolvedTheme {
  if (pref === 'system') return darkQuery?.matches ? 'dark' : 'light'
  return pref
}

/** Đặt data-theme lên <html> để tokens.css đổi màu. */
function applyToDocument(): void {
  if (typeof document === 'undefined') return
  const root = document.documentElement
  root.dataset.theme = resolve(preference)
  root.dataset.themePreference = preference
}

function notify(): void {
  applyToDocument()
  listeners.forEach((listener) => listener())
}

// Máy đổi sáng/tối (VD tự tối lúc chiều) -> nếu đang "theo máy" thì đổi theo
darkQuery?.addEventListener('change', () => {
  if (preference === 'system') notify()
})

// Áp ngay khi file được nạp (trước cả khi React vẽ)
applyToDocument()

/** Đổi lựa chọn theme (và nhớ lại cho lần sau). */
export function setThemePreference(next: ThemePreference): void {
  preference = next
  try {
    if (next === 'system') localStorage.removeItem(THEME_STORAGE_KEY)
    else localStorage.setItem(THEME_STORAGE_KEY, next)
  } catch {
    /* không lưu được thì thôi, vẫn đổi trong phiên này */
  }
  notify()
}

function subscribe(listener: () => void): () => void {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

// Gộp 2 giá trị thành 1 chuỗi để useSyncExternalStore so sánh được (chuỗi so bằng ===)
function getSnapshot(): string {
  return `${preference}|${resolve(preference)}`
}

export function useTheme(): {
  preference: ThemePreference
  resolvedTheme: ResolvedTheme
  setPreference: (next: ThemePreference) => void
} {
  const snapshot = useSyncExternalStore(subscribe, getSnapshot, () => 'system|light')
  const [pref, resolved] = snapshot.split('|') as [ThemePreference, ResolvedTheme]
  return { preference: pref, resolvedTheme: resolved, setPreference: setThemePreference }
}

/**
 * Bọc ngoài App. Không bắt buộc (useTheme chạy được không cần), nhưng giữ cho
 * đúng mô hình "Provider" quen thuộc và để chắc chắn theme đã áp khi app mở.
 */
export function ThemeProvider({ children }: { children: ReactNode }): ReactNode {
  useEffect(() => {
    applyToDocument()
  }, [])
  return children
}
