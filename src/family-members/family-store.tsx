/**
 * family-store.tsx — DANH SÁCH THÀNH VIÊN GIA ĐÌNH (tên, avatar, khung, màu tên, XP)
 * Tải 1 lần khi đăng nhập, tự làm mới mỗi phút. Chat, xếp hạng, thi đấu đều dùng.
 */
import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import { api, type FamilyMember } from '../services/api-client'
import { useAuth } from '../services/auth-context'

interface FamilyContextValue {
  members: FamilyMember[]
  memberById: (id: number) => FamilyMember | undefined
  refreshMembers: () => Promise<void>
}

const FamilyContext = createContext<FamilyContextValue | null>(null)

export function FamilyProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth()
  const [members, setMembers] = useState<FamilyMember[]>([])

  const refreshMembers = useCallback(async () => {
    try {
      setMembers((await api.getFamilyMembers()).users)
    } catch {
      /* bỏ qua */
    }
  }, [])

  useEffect(() => {
    if (!user) return
    void refreshMembers()
    const timer = window.setInterval(refreshMembers, 60_000)
    return () => window.clearInterval(timer)
  }, [user, refreshMembers])

  const value = useMemo<FamilyContextValue>(
    () => ({ members, memberById: (id) => members.find((m) => m.id === id), refreshMembers }),
    [members, refreshMembers],
  )
  return <FamilyContext.Provider value={value}>{children}</FamilyContext.Provider>
}

export function useFamily(): FamilyContextValue {
  const context = useContext(FamilyContext)
  if (!context) throw new Error('useFamily phải dùng bên trong <FamilyProvider>')
  return context
}
