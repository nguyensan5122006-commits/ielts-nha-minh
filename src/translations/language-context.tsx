/**
 * language-context.tsx
 * ----------------------------------------------------------------------------
 * SONG NGỮ VIỆT / ANH.
 *  - LanguageProvider: bọc toàn bộ app, nhớ ngôn ngữ đang chọn (lưu localStorage).
 *  - useLanguage(): trong component gọi để lấy:
 *       t('key')        -> chữ giao diện theo ngôn ngữ hiện tại (từ ui-text.ts)
 *       pick({vi, en})  -> chọn 1 bản trong văn bản song ngữ của nội dung bài học
 *       language, toggleLanguage
 * ----------------------------------------------------------------------------
 */
import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import type { BilingualText } from '../content/content-types'
import { UI_TEXT, type UiTextKey } from './ui-text'

export type Language = 'vi' | 'en'

interface LanguageContextValue {
  language: Language
  toggleLanguage: () => void
  t: (key: UiTextKey, variables?: Record<string, string | number>) => string
  pick: (text: BilingualText | undefined) => string
}

const LanguageContext = createContext<LanguageContextValue | null>(null)
const STORAGE_KEY = 'ielts-language'

function readSavedLanguage(): Language {
  try {
    return localStorage.getItem(STORAGE_KEY) === 'en' ? 'en' : 'vi'
  } catch {
    return 'vi'
  }
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>(readSavedLanguage)

  // Báo cho trình duyệt / trình đọc màn hình biết trang đang ở ngôn ngữ nào (<html lang="vi|en">)
  // -> giọng đọc màn hình, gạch lỗi chính tả, tách âm tiết đúng ngôn ngữ.
  useEffect(() => {
    document.documentElement.lang = language
  }, [language])

  const toggleLanguage = useCallback(() => {
    setLanguage((current) => {
      const next = current === 'vi' ? 'en' : 'vi'
      try {
        localStorage.setItem(STORAGE_KEY, next)
      } catch {
        /* trình duyệt chặn lưu trữ -> bỏ qua */
      }
      return next
    })
  }, [])

  const value = useMemo<LanguageContextValue>(
    () => ({
      language,
      toggleLanguage,
      // Thay {tên} trong câu bằng giá trị, VD t('xpEarned', { xp: 10 })
      t: (key, variables) => {
        let text: string = UI_TEXT[key][language]
        for (const [name, value] of Object.entries(variables ?? {})) text = text.replaceAll(`{${name}}`, String(value))
        return text
      },
      pick: (text) => (text ? text[language] || text.vi : ''),
    }),
    [language, toggleLanguage],
  )

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLanguage(): LanguageContextValue {
  const context = useContext(LanguageContext)
  if (!context) throw new Error('useLanguage phải dùng bên trong <LanguageProvider>')
  return context
}
