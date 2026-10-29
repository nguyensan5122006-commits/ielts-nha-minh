/**
 * word-entries.ts — DỮ LIỆU CHO SỔ TỪ VỰNG (/words): gom, lọc, sắp xếp
 * ----------------------------------------------------------------------------
 * Mỗi thẻ 'word:<id>' trong progress.srs -> 1 "mục từ" gồm nội dung từ (findWord),
 * bài + chặng chứa từ, cấp độ nhớ, đã đến hạn chưa. Hàm thuần, không React.
 * ----------------------------------------------------------------------------
 */
import type { Lesson, SkillName, TrackId, Unit, VocabularyWord } from '../../../content/content-types'
import { findWord } from '../../../content/content-lookup'
import { findUnitOfLesson } from '../../../content/path-selectors'
import { isCardDue } from '../../../learning-progress/fsrs-scheduler'
import type { LearningProgress, SerializedFsrsCard } from '../../../learning-progress/progress-types'
import { memoryLevelOf, type MemoryLevel } from '../memory-levels'

export interface WordEntry {
  key: string
  card: SerializedFsrsCard
  word: VocabularyWord
  lesson: Lesson
  skill: SkillName
  unit?: Unit
  level: MemoryLevel
  isDue: boolean
  isNew: boolean
}

export type WordSort = 'due' | 'recent' | 'alpha' | 'weak'

export interface WordFilters {
  level: MemoryLevel | null
  skill: SkillName | null
  unitId: string | null
  search: string
  sort: WordSort
}

/** Gom mọi mục từ của người học. */
export function collectWordEntries(progress: LearningProgress, track: TrackId, now = new Date()): WordEntry[] {
  const entries: WordEntry[] = []
  for (const [key, card] of Object.entries(progress.srs)) {
    if (!key.startsWith('word:')) continue
    const found = findWord(key.slice(5))
    if (!found) continue
    entries.push({
      key,
      card,
      word: found.word,
      lesson: found.lesson,
      skill: found.lesson.skill,
      unit: findUnitOfLesson(found.lesson.id, track)?.unit,
      level: memoryLevelOf(card),
      // thẻ mới chưa ôn lần nào: "đến hạn" khi tới ngày được mở (hẹn từ hôm sau ngày học)
      isDue: isCardDue(card, now),
      isNew: card.state === 0,
    })
  }
  return entries
}

/** Bỏ dấu tiếng Việt + chữ thường để tìm "tre" ra "trẻ". */
export function foldText(text: string): string {
  return text
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D')
    .toLowerCase()
}

/** Lọc theo cấp nhớ / kỹ năng / chặng / ô tìm kiếm (KHÔNG sắp xếp). */
export function filterWordEntries(entries: WordEntry[], filters: Omit<WordFilters, 'sort'>): WordEntry[] {
  const query = foldText(filters.search.trim())
  return entries.filter(
    (entry) =>
      (filters.level === null || entry.level === filters.level) &&
      (filters.skill === null || entry.skill === filters.skill) &&
      (filters.unitId === null || entry.unit?.id === filters.unitId) &&
      (!query || foldText(entry.word.word).includes(query) || foldText(entry.word.meaningVi).includes(query)),
  )
}

export function sortWordEntries(entries: WordEntry[], sort: WordSort): WordEntry[] {
  const sorted = [...entries]
  switch (sort) {
    case 'due':
      // đến hạn trước (quá hạn lâu nhất lên đầu), rồi theo ngày hẹn
      return sorted.sort((a, b) => Number(b.isDue) - Number(a.isDue) || a.card.due.localeCompare(b.card.due))
    case 'recent':
      return sorted.sort((a, b) => b.card.addedOn.localeCompare(a.card.addedOn) || a.word.word.localeCompare(b.word.word))
    case 'alpha':
      return sorted.sort((a, b) => a.word.word.localeCompare(b.word.word, 'en'))
    case 'weak':
      return sorted.sort((a, b) => a.level - b.level || b.card.lapses - a.card.lapses || a.card.stability - b.card.stability)
  }
}
