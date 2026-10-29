/**
 * path-selectors.ts
 * ----------------------------------------------------------------------------
 * CÁC HÀM "HỎI ĐÁP" VỀ LỘ TRÌNH — ghép nội dung (all-levels, lesson-registry)
 * với tiến độ của người học. Giao diện chỉ cần gọi các hàm này, không phải tự
 * duyệt cây Level -> Unit -> Lesson.
 *
 *   unitsFor(track, levelId)          các chặng của 1 level theo track, đúng thứ tự
 *   lessonsOfUnit(unit)               các bài (tóm tắt: tên, kỹ năng, số phút) của 1 chặng
 *   unitProgress(unit, progress)      chặng đã xong bao nhiêu bài
 *   levelProgress(track, level, p)    level đã xong bao nhiêu + "còn N bài tới mốc"
 *   findNextLesson(progress, track)   bài "Học tiếp": bài đang dở trước, rồi bài chưa học đầu tiên
 *   lessonPathState(...)              trạng thái 1 bài trên đường đi: done / next / open / locked
 *
 * Tất cả là hàm thuần (không React), dùng được ở mọi trang và trong script kiểm thử.
 * Bài học ở đây là LessonSummary (mục lục nhẹ); cần nội dung đầy đủ -> await loadLesson(id).
 * ----------------------------------------------------------------------------
 */
import type { LevelId, LevelInfo, TrackId, Unit } from './content-types'
import { ALL_LEVELS_V3, findLevelInfo, LEVEL_ORDER } from './all-levels'
// Chỉ dùng MỤC LỤC NHẸ (lesson-index) — không import lesson-registry ở đây, vì file này nằm trong
// gói JS đầu tiên (kho tiến độ dùng nó). Nội dung đầy đủ của bài: loadLesson() trong lesson-loader.ts.
import { findLessonSummary, type LessonSummary } from './lesson-index'
import type { LearningProgress, LessonResume } from '../learning-progress/progress-types'

/** Bài test cuối level mở khi đã học xong tỉ lệ này số bài của level. */
export const LEVEL_TEST_UNLOCK_RATIO = 0.8

/* ============================================================================
 * 1. CẤU TRÚC LỘ TRÌNH
 * ========================================================================== */

/** Các chặng của 1 level dành cho 1 track (chặng dùng chung + chặng riêng), sắp theo `order`. */
export function unitsFor(track: TrackId, levelId: LevelId): Unit[] {
  const level = findLevelInfo(levelId)
  if (!level) return []
  return level.units.filter((unit) => unit.tracks.includes(track)).sort((a, b) => a.order - b.order)
}

/** Các bài (tóm tắt) của 1 chặng (bỏ qua id chưa có bài — validate-content sẽ báo). */
export function lessonsOfUnit(unit: Unit): LessonSummary[] {
  return unit.lessonIds.map(findLessonSummary).filter((lesson): lesson is LessonSummary => !!lesson)
}

/** Toàn bộ id bài trên đường đi của 1 level, theo đúng thứ tự. */
export function pathLessonIds(track: TrackId, levelId: LevelId): string[] {
  return unitsFor(track, levelId).flatMap((unit) => unit.lessonIds.filter((id) => !!findLessonSummary(id)))
}

/** Tìm chặng + level chứa 1 bài. Có track thì ưu tiên chặng thuộc track đó. */
export function findUnitOfLesson(lessonId: string, track?: TrackId): { unit: Unit; level: LevelInfo } | undefined {
  let fallback: { unit: Unit; level: LevelInfo } | undefined
  for (const level of ALL_LEVELS_V3) {
    for (const unit of level.units) {
      if (!unit.lessonIds.includes(lessonId)) continue
      if (!track || unit.tracks.includes(track)) return { unit, level }
      fallback ??= { unit, level }
    }
  }
  return fallback
}

/** Level kế tiếp (level-3 -> null). */
export function nextLevelId(levelId: LevelId): LevelId | null {
  const index = LEVEL_ORDER.indexOf(levelId)
  return index >= 0 && index < LEVEL_ORDER.length - 1 ? LEVEL_ORDER[index + 1] : null
}

/** Level phù hợp với 1 band ước tính (dùng cho bài xếp lớp). */
export function levelForBand(band: number): LevelId {
  if (band < 2) return 'level-1'
  if (band < 4) return 'level-2'
  return 'level-3'
}

/* ============================================================================
 * 2. TIẾN ĐỘ THEO CHẶNG / LEVEL
 * ========================================================================== */

export const isLessonDone = (progress: LearningProgress, lessonId: string) => !!progress.lessons[lessonId]

export function isLevelUnlocked(track: TrackId, levelId: LevelId, progress: LearningProgress): boolean {
  return progress.unlockedLevels[track]?.includes(levelId) ?? levelId === 'level-1'
}

export interface UnitProgress {
  unitId: string
  done: number
  total: number
  /** 0..100 */
  percent: number
  isComplete: boolean
  /** Bài chưa học đầu tiên trong chặng (null = xong hết) */
  nextLessonId: string | null
}

export function unitProgress(unit: Unit, progress: LearningProgress): UnitProgress {
  const ids = unit.lessonIds.filter((id) => !!findLessonSummary(id))
  const done = ids.filter((id) => isLessonDone(progress, id)).length
  return {
    unitId: unit.id,
    done,
    total: ids.length,
    percent: ids.length ? Math.round((done / ids.length) * 100) : 0,
    isComplete: ids.length > 0 && done === ids.length,
    nextLessonId: ids.find((id) => !isLessonDone(progress, id)) ?? null,
  }
}

export interface LevelProgress {
  levelId: LevelId
  track: TrackId
  done: number
  total: number
  /** 0..100 */
  percent: number
  isComplete: boolean
  unitsDone: number
  unitsTotal: number
  /** Chặng đang học (chặng đầu tiên chưa xong); null = xong level */
  currentUnit: Unit | null
  /** "Còn N bài tới mốc": số bài còn lại để xong chặng đang học (hoặc 0 nếu xong level) */
  lessonsToNextMilestone: number
  /** Mốc kế tiếp: xong chặng `unit`, hoặc (chặng cuối) xong cả level */
  nextMilestone: { kind: 'unit'; unit: Unit } | { kind: 'level'; unit: Unit } | null
  /** Số bài còn lại để xong level */
  lessonsToLevelEnd: number
}

export function levelProgress(track: TrackId, levelId: LevelId, progress: LearningProgress): LevelProgress {
  const units = unitsFor(track, levelId)
  let done = 0
  let total = 0
  let unitsDone = 0
  let currentUnit: Unit | null = null
  let currentUnitLeft = 0
  for (const unit of units) {
    const stats = unitProgress(unit, progress)
    done += stats.done
    total += stats.total
    if (stats.isComplete) unitsDone++
    else if (!currentUnit && stats.total > 0) {
      currentUnit = unit
      currentUnitLeft = stats.total - stats.done
    }
  }
  const isLastUnit = !!currentUnit && units.filter((u) => u.lessonIds.length > 0).at(-1)?.id === currentUnit.id
  return {
    levelId,
    track,
    done,
    total,
    percent: total ? Math.round((done / total) * 100) : 0,
    isComplete: total > 0 && done === total,
    unitsDone,
    unitsTotal: units.length,
    currentUnit,
    lessonsToNextMilestone: currentUnitLeft,
    nextMilestone: currentUnit ? { kind: isLastUnit ? 'level' : 'unit', unit: currentUnit } : null,
    lessonsToLevelEnd: total - done,
  }
}

/** Bài test cuối level đã được mở chưa (đã học ≥ 80% số bài của level theo track đang chọn). */
export function isLevelTestUnlocked(levelId: string, progress: LearningProgress, track: TrackId = progress.profile.track): boolean {
  if (!findLevelInfo(levelId)) return false
  const stats = levelProgress(track, levelId as LevelId, progress)
  return stats.total > 0 && stats.done / stats.total >= LEVEL_TEST_UNLOCK_RATIO
}

/* ============================================================================
 * 3. "HỌC TIẾP" — BÀI KẾ TIẾP
 * ========================================================================== */

export interface NextLesson {
  /** Tóm tắt bài (id, tên, kỹ năng, số phút). Nội dung đầy đủ: loadLesson(lesson.id) */
  lesson: LessonSummary
  /** Chặng chứa bài (null nếu bài đang dở không nằm trong lộ trình — VD mở từ sổ lỗi) */
  unit: Unit | null
  levelId: LevelId | null
  track: TrackId
  /** 'resume' = bài đang làm dở (quay về đúng câu), 'next' = bài chưa học đầu tiên */
  reason: 'resume' | 'next'
  resume: LessonResume | null
}

/**
 * Bài cho nút "Học tiếp":
 *   1. Bài đang làm dở (resume) nếu còn tồn tại.
 *   2. Bài chưa học đầu tiên của level hiện tại (theo track).
 *   3. Level hiện tại xong rồi -> các level đã mở khoá phía sau, rồi phía trước (bài bị bỏ qua).
 * Học hết mọi bài đã mở -> null.
 */
export function findNextLesson(progress: LearningProgress, track: TrackId = progress.profile.track): NextLesson | null {
  if (progress.resume) {
    const lesson = findLessonSummary(progress.resume.lessonId)
    if (lesson) {
      const location = findUnitOfLesson(lesson.id, track)
      return { lesson, unit: location?.unit ?? null, levelId: location?.level.id ?? null, track, reason: 'resume', resume: progress.resume }
    }
  }
  const current = progress.currentLevel[track] ?? 'level-1'
  const currentIndex = LEVEL_ORDER.indexOf(current)
  const searchOrder = [...LEVEL_ORDER.slice(currentIndex), ...LEVEL_ORDER.slice(0, currentIndex)]
  for (const levelId of searchOrder) {
    if (levelId !== current && !isLevelUnlocked(track, levelId, progress)) continue
    for (const unit of unitsFor(track, levelId)) {
      const lessonId = unit.lessonIds.find((id) => findLessonSummary(id) && !isLessonDone(progress, id))
      if (lessonId) return { lesson: findLessonSummary(lessonId)!, unit, levelId, track, reason: 'next', resume: null }
    }
  }
  return null
}

/** Trạng thái 1 bài trên đường đi. */
export type LessonPathState = 'done' | 'next' | 'open' | 'locked'

/**
 * - done   : đã học xong
 * - next   : bài "Học tiếp" (nổi bật trên đường đi)
 * - open   : học được (level đã mở) nhưng chưa tới lượt — người học vẫn được chọn tự do
 * - locked : level chưa mở khoá
 */
export function lessonPathState(track: TrackId, levelId: LevelId, lessonId: string, progress: LearningProgress): LessonPathState {
  if (isLessonDone(progress, lessonId)) return 'done'
  if (!isLevelUnlocked(track, levelId, progress)) return 'locked'
  return findNextLesson(progress, track)?.lesson.id === lessonId ? 'next' : 'open'
}
