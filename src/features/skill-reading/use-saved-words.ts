/**
 * use-saved-words.ts
 * ----------------------------------------------------------------------------
 * "LƯU VÀO SỔ TỪ" khi bấm 1 từ trong bài đọc.
 *
 * Tầng dữ liệu (progress-store) CHƯA có hành động lưu từ tra nhanh (đã ghi yêu cầu
 * `saveWordToNotebook` trong docs/redesign-v3/REQUESTS.md). Trong lúc chờ:
 *   - nếu kho đã có `saveWordToNotebook` -> gọi nó (tự dùng ngay khi nhóm nền móng thêm);
 *   - đồng thời giữ 1 danh sách nhỏ trong localStorage của máy (theo tài khoản) để giao diện
 *     biết từ nào "Đã lưu" và để nhóm Sổ từ vựng có thể đọc sang (khoá ghi trong REQUESTS).
 * ----------------------------------------------------------------------------
 */
import { useCallback, useState } from 'react'
import { useProgress } from '../../learning-progress/progress-store'
import { useAuth } from '../../services/auth-context'

export interface SavedLookupWord {
  word: string
  meaningVi: string | null
  /** id từ vựng trong nội dung (nếu từ có trong bài học nào đó) */
  wordId?: string
  /** câu chứa từ (ngữ cảnh) */
  context: string
  lessonId: string
  savedAt: string
}

/** Hành động mong muốn ở kho tiến độ (chưa có — xem REQUESTS.md). */
type SaveWordAction = (entry: SavedLookupWord) => void

export const savedWordsStorageKey = (userId: number | string) => `ielts-saved-words-${userId}`
const MAX_SAVED = 300

function readList(key: string): SavedLookupWord[] {
  try {
    const parsed = JSON.parse(localStorage.getItem(key) ?? '[]')
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

export function useSavedWords() {
  const progressStore = useProgress() as ReturnType<typeof useProgress> & { saveWordToNotebook?: SaveWordAction }
  const { user } = useAuth()
  const key = savedWordsStorageKey(user?.id ?? 'guest')
  const [list, setList] = useState<SavedLookupWord[]>(() => readList(key))

  const isSaved = useCallback((word: string) => list.some((entry) => entry.word.toLowerCase() === word.toLowerCase()), [list])

  const save = useCallback(
    (entry: Omit<SavedLookupWord, 'savedAt'>) => {
      const full: SavedLookupWord = { ...entry, savedAt: new Date().toISOString() }
      progressStore.saveWordToNotebook?.(full)
      setList((current) => {
        const next = [full, ...current.filter((item) => item.word.toLowerCase() !== full.word.toLowerCase())].slice(0, MAX_SAVED)
        try {
          localStorage.setItem(key, JSON.stringify(next))
        } catch {
          /* hết chỗ: bỏ qua */
        }
        return next
      })
    },
    [progressStore, key],
  )

  return { list, isSaved, save }
}
