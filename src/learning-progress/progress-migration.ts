/**
 * progress-migration.ts
 * ----------------------------------------------------------------------------
 * NÂNG CẤP DỮ LIỆU TIẾN ĐỘ: version 1 (bản cũ) -> version 2 (redesign v3).
 *
 * migrateProgress(raw) nhận BẤT KỲ thứ gì đọc được từ máy chủ / localStorage
 * (null, bản v1, bản v2 thiếu trường...) và luôn trả về 1 LearningProgressV2 đầy đủ.
 *
 * Giữ nguyên từ v1:
 *   XP (xpTotal, xpByDay), chuỗi ngày (streak), bài đã học (id cũ không đổi),
 *   mini-test, test cuối level, sổ lỗi sai, nhiệm vụ / huy hiệu / level tài khoản.
 * Chuyển đổi:
 *   - Thẻ ôn Leitner (box 0..5)  -> thẻ FSRS (độ bền ước lượng theo hộp)
 *     key "exercise:<id>" đổi thành "item:<id>"; "word:<id>" giữ nguyên
 *   - Level cũ 1..6 (xếp lớp / đã mở khoá) -> level mới (xem content/legacy-levels.ts)
 *   - Mục tiêu ngày bằng XP -> mục tiêu bằng phút (30 XP ≈ 10 phút)
 *   - Tặng sẵn freeze cho chuỗi đang có: 1 cái / 7 ngày, tối đa 2 (luật mới tính lùi)
 *   - Ngày có XP (60 ngày gần nhất) -> danh sách ngày học (studyDates)
 * ----------------------------------------------------------------------------
 */
import type { LevelId, TrackId } from '../content/content-types'
import { levelIdFromLegacyOrder, parseBandRange, unlockedLevelsFromLegacyOrder } from '../content/legacy-levels'
import { srsCardFromLeitnerBox } from './fsrs-scheduler'
import {
  createEmptyKidsProgress,
  createEmptyProgress,
  createEmptySkillStats,
  type LearningProgressV1,
  type LearningProgressV2,
  type LessonRecord,
  type SerializedFsrsCard,
} from './progress-types'
import { FREEZE_EVERY_STREAK_DAYS, MAX_FREEZES } from './streak-rules'

const LEVELS: LevelId[] = ['level-1', 'level-2', 'level-3']
const TRACKS: TrackId[] = ['general', 'ielts']

const isObject = (value: unknown): value is Record<string, unknown> => typeof value === 'object' && value !== null && !Array.isArray(value)
const asArray = <T>(value: unknown): T[] => (Array.isArray(value) ? (value as T[]) : [])
const asRecord = <T>(value: unknown): Record<string, T> => (isObject(value) ? (value as Record<string, T>) : {})
const asNumber = (value: unknown, fallback = 0) => (typeof value === 'number' && isFinite(value) ? value : fallback)

/** Dữ liệu thô này là bản cũ (v1)? (bản v1 không có trường version = 2) */
export function isProgressV1(raw: unknown): boolean {
  return isObject(raw) && raw.version !== 2
}

/** Chuyển bất kỳ dữ liệu tiến độ nào thành bản v2 đầy đủ. */
export function migrateProgress(raw: unknown): LearningProgressV2 {
  if (!isObject(raw)) return createEmptyProgress()
  if (raw.version === 2) return normalizeV2(raw as Partial<LearningProgressV2>)
  return migrateV1(raw as Partial<LearningProgressV1>)
}

/* ============================================================================
 * v1 -> v2
 * ========================================================================== */

/** Mục tiêu ngày: XP -> phút, làm tròn 5 phút, trong khoảng 5..30. */
function goalMinutesFromXp(dailyGoalXp: number | undefined): number {
  const minutes = Math.round(asNumber(dailyGoalXp, 30) / 3 / 5) * 5
  return Math.max(5, Math.min(30, minutes))
}

function migrateV1(old: Partial<LearningProgressV1>): LearningProgressV2 {
  const empty = createEmptyProgress()

  // ---- level: lấy mức cao nhất trong các dấu hiệu cũ ----
  const oldLessons = asRecord<{ completedAt?: string; bestAccuracy?: number }>(old.lessons)
  const levelTests = asRecord<{ passedAt: string; percent: number }>(old.levelTests)
  const studiedLevel2 = Object.keys(oldLessons).some((id) => id.startsWith('l2-'))
  const legacyOrder = Math.max(
    asNumber(old.unlockedLevelOrder, 1),
    asNumber(old.placement?.recommendedLevelOrder, 1),
    studiedLevel2 || levelTests['level-1'] ? 2 : 1,
  )
  const currentLevel = levelIdFromLegacyOrder(legacyOrder)
  const unlocked = unlockedLevelsFromLegacyOrder(legacyOrder)

  // ---- bài đã học ----
  const lessons: Record<string, LessonRecord> = {}
  for (const [id, record] of Object.entries(oldLessons)) {
    lessons[id] = {
      completedAt: record?.completedAt ?? new Date().toISOString(),
      bestAccuracy: asNumber(record?.bestAccuracy, 0),
      attempts: 1, // bản cũ không đếm số lần học
    }
  }

  // ---- thẻ ôn Leitner -> FSRS ----
  const srs: Record<string, SerializedFsrsCard> = {}
  for (const [key, card] of Object.entries(asRecord<{ box?: number; dueDate?: string }>(old.reviewCards))) {
    if (!card) continue
    const newKey = key.startsWith('exercise:') ? 'item:' + key.slice('exercise:'.length) : key
    srs[newKey] = srsCardFromLeitnerBox(asNumber(card.box, 0), card.dueDate ?? '')
  }

  // ---- xếp lớp ----
  let placement: LearningProgressV2['placement'] = null
  if (old.placement) {
    const band = parseBandRange(old.placement.estimatedBand) ?? { low: 0, high: 2 }
    placement = {
      level: levelIdFromLegacyOrder(asNumber(old.placement.recommendedLevelOrder, 1)),
      track: 'general',
      bandLow: band.low,
      bandHigh: band.high,
      takenAt: old.placement.takenAt ?? new Date().toISOString(),
    }
  }

  // ---- chuỗi ngày ----
  const oldStreak = old.streak ?? { current: 0, longest: 0, lastStudyDate: null }
  const current = asNumber(oldStreak.current, 0)
  const xpByDay = asRecord<number>(old.xpByDay)

  return {
    ...empty,
    savedAt: '', // chưa từng lưu bằng bản mới
    profile: { ...empty.profile, dailyGoalMinutes: goalMinutesFromXp(old.dailyGoalXp) },
    currentLevel: { general: currentLevel, ielts: currentLevel },
    unlockedLevels: { general: [...unlocked], ielts: [...unlocked] },
    lessons,
    miniTests: asRecord(old.miniTests),
    levelTests,
    srs,
    mistakes: asArray(old.mistakes),
    streak: {
      current,
      longest: Math.max(asNumber(oldStreak.longest, 0), current),
      lastStudyDate: oldStreak.lastStudyDate ?? null,
      freezes: Math.min(MAX_FREEZES, Math.floor(current / FREEZE_EVERY_STREAK_DAYS)),
    },
    studyDates: Object.keys(xpByDay)
      .filter((day) => asNumber(xpByDay[day]) > 0)
      .sort(),
    xpTotal: asNumber(old.xpTotal, 0),
    xpByDay,
    placement,
    lifetimeStats: asRecord(old.lifetimeStats),
    questCounters: { ...empty.questCounters, ...(isObject(old.questCounters) ? old.questCounters : {}) },
    claimedRewards: asArray(old.claimedRewards),
    unlockedAchievements: asArray(old.unlockedAchievements),
    rewardedAccountLevel: Math.max(1, asNumber(old.rewardedAccountLevel, 1)),
  }
}

/* ============================================================================
 * v2 thiếu trường (bản lưu từ phiên bản code cũ hơn) -> điền mặc định
 * ========================================================================== */

function normalizeV2(raw: Partial<LearningProgressV2>): LearningProgressV2 {
  const empty = createEmptyProgress()
  const currentLevel = { ...empty.currentLevel, ...asRecord<LevelId>(raw.currentLevel) }
  const unlockedLevels = { ...empty.unlockedLevels }
  for (const track of TRACKS) {
    const list = asArray<LevelId>(raw.unlockedLevels?.[track]).filter((level) => LEVELS.includes(level))
    // level đang học luôn phải nằm trong danh sách đã mở
    unlockedLevels[track] = LEVELS.filter((level) => level === 'level-1' || list.includes(level) || level === currentLevel[track])
  }
  return {
    ...empty,
    ...raw,
    version: 2,
    savedAt: typeof raw.savedAt === 'string' ? raw.savedAt : '',
    profile: { ...empty.profile, ...asRecord(raw.profile) },
    currentLevel,
    unlockedLevels,
    lessons: asRecord(raw.lessons),
    miniTests: asRecord(raw.miniTests),
    levelTests: asRecord(raw.levelTests),
    resume: isObject(raw.resume) && typeof raw.resume.lessonId === 'string' ? raw.resume : null,
    drafts: asRecord(raw.drafts),
    skillStats: { ...createEmptySkillStats(), ...asRecord(raw.skillStats) },
    bandEstimates: asRecord(raw.bandEstimates),
    srs: asRecord(raw.srs),
    mistakes: asArray(raw.mistakes),
    streak: { ...empty.streak, ...asRecord(raw.streak) },
    studyDates: asArray(raw.studyDates),
    minutesByDay: asRecord(raw.minutesByDay),
    xpTotal: asNumber(raw.xpTotal, 0),
    xpByDay: asRecord(raw.xpByDay),
    placement: isObject(raw.placement) ? raw.placement : null,
    writingLog: asArray(raw.writingLog),
    kids: isObject(raw.kids) ? { ...createEmptyKidsProgress(), ...raw.kids } : null,
    lifetimeStats: asRecord(raw.lifetimeStats),
    questCounters: { ...empty.questCounters, ...asRecord(raw.questCounters) },
    claimedRewards: asArray(raw.claimedRewards),
    unlockedAchievements: asArray(raw.unlockedAchievements),
    rewardedAccountLevel: Math.max(1, asNumber(raw.rewardedAccountLevel, 1)),
  }
}

/* ============================================================================
 * Chọn bản mới hơn giữa bản trong máy (localStorage) và bản trên máy chủ
 * ========================================================================== */

/**
 * Mất mạng lúc đang học -> bản trong máy mới hơn bản máy chủ. Khi mở lại web phải
 * dùng bản trong máy rồi gửi lên lại, nếu không sẽ mất các câu vừa làm.
 * So bằng trường savedAt (bản v1 không có savedAt = cũ nhất).
 */
export function chooseNewerProgress(cachedRaw: unknown, serverRaw: unknown): { progress: LearningProgressV2; source: 'cache' | 'server'; needsUpload: boolean } {
  const savedAtOf = (raw: unknown) => (isObject(raw) && typeof raw.savedAt === 'string' ? raw.savedAt : '')
  const cacheTime = savedAtOf(cachedRaw)
  const serverTime = savedAtOf(serverRaw)
  if (isObject(cachedRaw) && cachedRaw.version === 2 && cacheTime > serverTime) {
    return { progress: migrateProgress(cachedRaw), source: 'cache', needsUpload: true }
  }
  // máy chủ đang giữ bản v1 (hoặc chưa có gì) -> nâng cấp rồi gửi bản v2 lên
  return { progress: migrateProgress(serverRaw), source: 'server', needsUpload: serverRaw !== null && serverRaw !== undefined && isProgressV1(serverRaw) }
}
