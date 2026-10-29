/**
 * auth-context.tsx
 * ----------------------------------------------------------------------------
 * QUẢN LÝ ĐĂNG NHẬP cho toàn app.
 *  - Khi mở web: hỏi máy chủ "/api/auth/me" xem đã đăng nhập chưa.
 *  - useAuth() trả về: user (null nếu chưa đăng nhập), login, register, logout.
 *  - Mọi tài khoản như nhau (không chia nhóm tuổi).
 * ----------------------------------------------------------------------------
 */
import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import { api, type RegisterInput, type UserAccount } from './api-client'

interface AuthContextValue {
  user: UserAccount | null
  isCheckingLogin: boolean // đang hỏi máy chủ, chưa biết kết quả
  login: (username: string, password: string) => Promise<void>
  register: (input: RegisterInput) => Promise<void>
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserAccount | null>(null)
  const [isCheckingLogin, setIsCheckingLogin] = useState(true)

  // Chạy 1 lần khi mở web
  useEffect(() => {
    api
      .getCurrentUser()
      .then((data) => setUser(data.user))
      .catch(() => setUser(null))
      .finally(() => setIsCheckingLogin(false))
  }, [])

  const login = useCallback(async (username: string, password: string) => {
    const data = await api.login(username, password)
    setUser(data.user)
  }, [])

  const register = useCallback(async (input: Parameters<AuthContextValue['register']>[0]) => {
    const data = await api.register(input)
    setUser(data.user)
  }, [])

  const logout = useCallback(async () => {
    await api.logout().catch(() => {})
    setUser(null)
  }, [])

  const value = useMemo(
    () => ({ user, isCheckingLogin, login, register, logout }),
    [user, isCheckingLogin, login, register, logout],
  )
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth phải dùng bên trong <AuthProvider>')
  return context
}
