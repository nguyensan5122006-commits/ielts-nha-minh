/**
 * path-view-model.ts
 * ----------------------------------------------------------------------------
 * GOM DỮ LIỆU CHO TRANG LỘ TRÌNH — hàm thuần (không React), dễ đọc, dễ kiểm thử.
 *
 *   buildPathView(track, levelId, progress) -> mọi thứ trang /learn cần vẽ 1 level:
 *     - các "trạm" (chặng) theo đúng thứ tự, mỗi trạm có màu chủ đề + các "nút" bài học
 *     - trạng thái từng nút: done (đã xong) / next (bài Học tiếp) / open (học được) / locked (level chưa mở)
 *     - tiến độ level, mốc kế tiếp ("còn N bài tới mốc"), bài kiểm tra cuối level
 *
 * Chỉ dùng mục lục nhẹ (lesson-index) — không tải nội dung bài.
 * ----------------------------------------------------------------------------
 */
import { findLevelInfo } from '../../content/all-levels'
import type { LevelId, LevelInfo, TrackId, Unit } from '../../content/content-types'
import { findLessonSummary, type LessonSummary } from '../../content/lesson-index'
import {
  findNextLesson,
  isLevelUnlocked,
  LEVEL_TEST_UNLOCK_RATIO,
  levelProgress,
  nextLevelId,
  unitsFor,
  type LevelProgress,
  type NextLesson,
} from '../../content/path-selectors'
import type { LearningProgress } from '../../learning-progress/progress-types'

export type PathNodeState = 'done' | 'next' | 'open' | 'locked'

export interface PathNode {
  summary: LessonSummary
  state: PathNodeState
  /** bài đang làm dở (mở lại là về đúng câu) */
  isResume: boolean
  /** độ chính xác tốt nhất 0..1 (bài đã xong), null nếu chưa học */
  accuracy: number | null
  /** thứ tự bài trong cả level (1, 2, 3…) */
  numberInLevel: number
}

export interface PathStation {
  unit: Unit
  /** "Trạm 3" — thứ tự trong level của track đang chọn (1, 2, 3…) */
  number: number
  /** màu chủ đề của trạm (biến CSS) */
  color: string
  nodes: PathNode[]
  done: number
  total: number
  isComplete: boolean
  /** trạm chứa bài "Học tiếp" */
  hasNext: boolean
}

export interface LevelTestInfo {
  examId: string | null
  /** đã học đủ 80% số bài -> mở */
  unlocked: boolean
  /** còn bao nhiêu bài nữa mới mở */
  lessonsToUnlock: number
  /** đã qua (điểm %) hay chưa */
  passedPercent: number | null
}

export interface PathLevelView {
  track: TrackId
  levelId: LevelId
  level: LevelInfo
  /** 1 | 2 | 3 */
  levelNumber: 1 | 2 | 3
  isUnlocked: boolean
  stations: PathStation[]
  stats: LevelProgress
  /** bài "Học tiếp" của cả lộ trình (có thể nằm ở level khác level đang xem) */
  next: NextLesson | null
  /** bài "Học tiếp" nằm trong level đang xem */
  nextIsHere: boolean
  /** số thứ tự trạm đang học (trạm đầu tiên chưa xong), null = xong level */
  currentStationNumber: number | null
  levelTest: LevelTestInfo
  nextLevel: LevelInfo | null
}

/**
 * Màu chủ đề của các trạm — xoay vòng theo thứ tự trạm. Dùng biến màu của hệ thiết kế
 * để tự đổi theo chế độ sáng/tối.
 */
export const STATION_COLORS = [
  'var(--c-primary)',
  'var(--skill-listening)',
  'var(--skill-speaking)',
  'var(--skill-reading)',
  'var(--skill-writing)',
  'var(--c-olive)',
  'var(--c-navy)',
  'var(--skill-vocabulary)',
]

export function buildPathView(track: TrackId, levelId: LevelId, progress: LearningProgress): PathLevelView {
  const level = findLevelInfo(levelId)!
  const isUnlocked = isLevelUnlocked(track, levelId, progress)
  const next = findNextLesson(progress, track)
  const nextId = next?.lesson.id ?? null
  const resumeId = progress.resume?.lessonId ?? null

  let numberInLevel = 0
  const stations: PathStation[] = []
  for (const [index, unit] of unitsFor(track, levelId).entries()) {
    const nodes: PathNode[] = []
    for (const lessonId of unit.lessonIds) {
      const summary = findLessonSummary(lessonId)
      if (!summary) continue // bài chưa có nội dung — validate-content sẽ báo
      numberInLevel++
      const record = progress.lessons[lessonId]
      // bài "Học tiếp" luôn nổi bật — kể cả khi đó là bài đã xong đang được học lại dở dang
      const state: PathNodeState = lessonId === nextId ? 'next' : record ? 'done' : !isUnlocked ? 'locked' : 'open'
      nodes.push({ summary, state, isResume: lessonId === resumeId, accuracy: record ? record.bestAccuracy : null, numberInLevel })
    }
    if (nodes.length === 0) continue
    const done = nodes.filter((node) => node.accuracy !== null).length
    stations.push({
      unit,
      number: stations.length + 1,
      color: STATION_COLORS[index % STATION_COLORS.length],
      nodes,
      done,
      total: nodes.length,
      isComplete: done === nodes.length,
      hasNext: nodes.some((node) => node.state === 'next'),
    })
  }

  const stats = levelProgress(track, levelId, progress)
  const currentStation = stations.find((station) => !station.isComplete) ?? null
  const needed = Math.ceil(stats.total * LEVEL_TEST_UNLOCK_RATIO)
  const passed = progress.levelTests[levelId]
  const nextLevel = nextLevelId(levelId)

  return {
    track,
    levelId,
    level,
    levelNumber: level.order as 1 | 2 | 3,
    isUnlocked,
    stations,
    stats,
    next,
    nextIsHere: stations.some((station) => station.hasNext),
    currentStationNumber: currentStation?.number ?? null,
    levelTest: {
      examId: level.levelTestId ?? null,
      unlocked: stats.total > 0 && stats.done >= needed,
      lessonsToUnlock: Math.max(0, needed - stats.done),
      passedPercent: passed ? passed.percent : null,
    },
    nextLevel: nextLevel ? (findLevelInfo(nextLevel) ?? null) : null,
  }
}

/**
 * Level nên mở sẵn khi vào trang: level chứa bài "Học tiếp", nếu không có thì level hiện tại của track.
 */
export function defaultLevelFor(track: TrackId, progress: LearningProgress): LevelId {
  return findNextLesson(progress, track)?.levelId ?? progress.currentLevel[track] ?? 'level-1'
}
