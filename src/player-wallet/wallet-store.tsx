/**
 * wallet-store.tsx — VÍ CỦA NGƯỜI CHƠI (chuối 🍌, túi đồ, đồ đang dùng)
 * ----------------------------------------------------------------------------
 * Số chuối thật nằm trên máy chủ. Kho này chỉ giữ bản sao để hiển thị và gọi API:
 *   earnBananas(reason)   : nhận chuối khi học (máy chủ quyết định số lượng)
 *   claimReward(...)      : nhận thưởng nhiệm vụ / huy hiệu / lên level
 *   buy / equip / useItem : cửa hàng
 *   setBalance(n)         : máy chủ realtime báo số dư mới (sau khi cược / thắng trận)
 * Mỗi lần nhận chuối hiện 1 thông báo nhỏ "+5 🍌".
 * ----------------------------------------------------------------------------
 */
import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import { FREE_ITEM_IDS } from '../game-economy/shop-catalog'
import type { BananaReason } from '../game-economy/banana-rewards'
import { useToast } from '../components/ToastCenter'
import { api, type EconomyState } from '../services/api-client'
import { useAuth } from '../services/auth-context'
import { useLanguage } from '../translations/language-context'

interface WalletContextValue {
  economy: EconomyState | null
  bananas: number
  /** món đã sở hữu (kể cả món miễn phí) */
  owns: (itemId: string) => boolean
  quantityOf: (itemId: string) => number
  refreshWallet: () => Promise<void>
  setBalance: (balance: number) => void
  earnBananas: (reason: BananaReason) => Promise<number>
  claimReward: (kind: string, id: string) => Promise<number>
  buy: (itemId: string, quantity?: number) => Promise<void>
  equip: (slot: string, itemId: string | null) => Promise<void>
  useItem: (itemId: string) => Promise<boolean>
}

const WalletContext = createContext<WalletContextValue | null>(null)

export function WalletProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth()
  const { showToast } = useToast()
  const { t } = useLanguage()
  const [economy, setEconomy] = useState<EconomyState | null>(null)

  const refreshWallet = useCallback(async () => {
    try {
      setEconomy(await api.getEconomy())
    } catch {
      /* mất mạng: giữ số cũ */
    }
  }, [])

  useEffect(() => {
    if (user) void refreshWallet()
    else setEconomy(null)
  }, [user, refreshWallet])

  const setBalance = useCallback((balance: number) => setEconomy((current) => (current ? { ...current, bananas: balance } : current)), [])

  const earnBananas = useCallback(
    async (reason: BananaReason) => {
      try {
        const { granted, balance } = await api.earnBananas(reason)
        setBalance(balance)
        if (granted > 0) showToast({ icon: '🍌', text: t('bananasEarned', { n: granted }) })
        return granted
      } catch {
        return 0
      }
    },
    [setBalance, showToast, t],
  )

  const claimReward = useCallback(
    async (kind: string, id: string) => {
      const { granted, balance } = await api.claimReward(kind, id)
      setBalance(balance)
      if (granted > 0) showToast({ icon: '🍌', text: t('bananasEarned', { n: granted }) })
      return granted
    },
    [setBalance, showToast, t],
  )

  const buy = useCallback(
    async (itemId: string, quantity = 1) => {
      const { balance, inventory } = await api.buyItem(itemId, quantity)
      setEconomy((current) => (current ? { ...current, bananas: balance, inventory } : current))
    },
    [],
  )

  const equip = useCallback(
    async (slot: string, itemId: string | null) => {
      await api.equipItem(slot, itemId)
      await refreshWallet()
    },
    [refreshWallet],
  )

  const useItem = useCallback(async (itemId: string) => {
    try {
      const { inventory } = await api.useItem(itemId)
      setEconomy((current) => (current ? { ...current, inventory } : current))
      return true
    } catch {
      return false
    }
  }, [])

  const value = useMemo<WalletContextValue>(
    () => ({
      economy,
      bananas: economy?.bananas ?? 0,
      owns: (itemId) => FREE_ITEM_IDS.includes(itemId) || (economy?.inventory[itemId] ?? 0) > 0,
      quantityOf: (itemId) => economy?.inventory[itemId] ?? 0,
      refreshWallet,
      setBalance,
      earnBananas,
      claimReward,
      buy,
      equip,
      useItem,
    }),
    [economy, refreshWallet, setBalance, earnBananas, claimReward, buy, equip, useItem],
  )
  return <WalletContext.Provider value={value}>{children}</WalletContext.Provider>
}

export function useWallet(): WalletContextValue {
  const context = useContext(WalletContext)
  if (!context) throw new Error('useWallet phải dùng bên trong <WalletProvider>')
  return context
}
