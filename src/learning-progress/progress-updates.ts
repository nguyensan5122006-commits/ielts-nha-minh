/**
 * progress-updates.ts
 * ----------------------------------------------------------------------------
 * CÁC PHÉP BIẾN ĐỔI TIẾN ĐỘ — mỗi hàm nhận tiến độ cũ, trả tiến độ MỚI (không sửa cái cũ).
 *
 * Vì sao tách khỏi progress-store.tsx?
 *   - Kho (store) chỉ lo việc React: giữ state, lưu localStorage, gửi máy chủ.
 *   - Luật nghiệp vụ nằm hết ở đây -> đọc 1 chỗ là hiểu, và chạy được trong script
 *     kiểm thử (scripts/test-progress-migration.ts) mà không cần trình duyệt.
 *
 * Quy ước: tham số `now` (thời điểm hiện tại) luôn để cuối, mặc định new Date(),
 * nhờ vậy kiểm thử có thể "giả" ngày giờ.
 * ----------------------------------------------------------------------------
 */
import type { LevelId, SkillName, TrackId } from '../content/content-types'
import { levelIdFromLegacyOrder, parseBandRange, unlockedLevelsFromLegacyOrder } from '../content/legacy-levels'
import { levelProgress, nextLevelId, pathLessonIds } from '../content/path-selectors'
import type { ActivityMetric } from '../gamification/quests-and-achievements'
import { vietnamDay, vietnamWeekId } from '../../backend-helpers/vietnam-time'
import { createSrsCard, isCardDue, reviewCard, type SrsRating } from './fsrs-scheduler'
import {
  type BandEstimate,
  type LearningProgress,
  type LessonResume,
  type MistakeEntry,
  type NewMistake,
  type StudyProfile,
  type WritingLogEntry,
} from './progress-types'
import { addStudyDate, registerStudy, settleStreak, type StudyKind } from './streak-rules'
import { addDays, keepRecentDays, todayString } from './study-calendar'

export const MAX_MISTAKES = 300
export const MAX_DRAFTS = 30
export const MAX_DRAFT_CHARS = 20_000
export const MAX_WRITING_LOG = 200
export const RECENT_ANSWERS_KEPT = 40
export const XP_DAYS_KEPT = 60
export const MINUTES_DAYS_KEPT = 90
const LEVELS: LevelId[] = ['level-1', 'level-2', 'level-3']
const TRACKS: TrackId[] = ['general', 'ielts']

/* ============================================================================
 * 0. TIỆN ÍCH CHUNG
 * ========================================================================== */

/**
 * Cộng `amount` vào bộ đếm hoạt động `metric`: đếm trọn đời + đếm ngày + đếm tuần.
 * Sang ngày / tuần mới thì bộ đếm ngày / tuần được làm mới về 0 trước.
 */
export function bumpActivity(progress: LearningProgress, metric: ActivityMetric, amount = 1, now = new Date()): LearningProgress {
  const day = vietnamDay(now)
  const week = vietnamWeekId(now)
  const counters = progress.questCounters
  const daily = counters.day === day ? counters.daily : {}
  const weekly = counters.week === week ? counters.weekly : {}
  return {
    ...progress,
    lifetimeStats: { ...progress.lifetimeStats, [metric]: (progress.lifetimeStats[metric] ?? 0) + amount },
    questCounters: {
      day,
      week,
      daily: { ...daily, [metric]: (daily[metric] ?? 0) + amount },
      weekly: { ...weekly, [metric]: (weekly[metric] ?? 0) + amount },
    },
  }
}

/** Đầu ngày mai (0h giờ máy) — thẻ từ vừa học hẹn ôn từ lúc này. */
function startOfTomorrow(now: Date): Date {
  return new Date(addDays(todayString(now), 1) + 'T00:00:00')
}

/** Thêm level vào danh sách đã mở (giữ đúng thứ tự level-1, 2, 3). */
function withUnlocked(list: LevelId[], ...levels: LevelId[]): LevelId[] {
  return LEVELS.filter((level) => list.includes(level) || levels.includes(level))
}

/* ============================================================================
 * 1. CHUỖI NGÀY, XP, PHÚT HỌC
 * ========================================================================== */

/** Ghi nhận "hôm nay có học" (giữ chuỗi). Lần đầu trong ngày còn cộng chỉ số 'studyDays'. */
export function markStudyDay(progress: LearningProgress, kind: StudyKind, now = new Date()): LearningProgress {
  const { streak, isNewStudyDay } = registerStudy(progress.streak, kind, now)
  let updated: LearningProgress = { ...progress, streak, studyDates: addStudyDate(progress.studyDates, todayString(now)) }
  if (isNewStudyDay) updated = bumpActivity(updated, 'studyDays', 1, now)
  return updated
}

/** Cộng XP (chỉ XP — không đụng tới chuỗi; chuỗi do markStudyDay lo). */
export function addXp(progress: LearningProgress, amount: number, now = new Date()): LearningProgress {
  if (amount <= 0) return progress
  const today = todayString(now)
  const xpByDay = keepRecentDays({ ...progress.xpByDay, [today]: (progress.xpByDay[today] ?? 0) + amount }, XP_DAYS_KEPT)
  return bumpActivity({ ...progress, xpTotal: progress.xpTotal + amount, xpByDay }, 'xp', amount, now)
}

/** Cộng phút học hôm nay (vòng mục tiêu ngày). */
export function addStudyMinutes(progress: LearningProgress, minutes: number, now = new Date()): LearningProgress {
  if (!(minutes > 0)) return progress
  const today = todayString(now)
  const value = Math.round(((progress.minutesByDay[today] ?? 0) + minutes) * 10) / 10
  return { ...progress, minutesByDay: keepRecentDays({ ...progress.minutesByDay, [today]: value }, MINUTES_DAYS_KEPT) }
}

/* ============================================================================
 * 2. HỒ SƠ, TRACK, LEVEL, XẾP LỚP
 * ========================================================================== */

export function setProfile(progress: LearningProgress, patch: Partial<StudyProfile>): LearningProgress {
  return { ...progress, profile: { ...progress.profile, ...patch } }
}

export function setTrack(progress: LearningProgress, track: TrackId): LearningProgress {
  return setProfile(progress, { track })
}

/**
 * Xong 1 level (theo track) mà level sau đã có bài -> mở khoá + chuyển sang level sau.
 * Gọi sau mỗi bài học xong.
 */
export function advanceCompletedLevels(progress: LearningProgress): LearningProgress {
  let updated = progress
  for (const track of TRACKS) {
    const current = updated.currentLevel[track]
    const next = nextLevelId(current)
    if (!next || pathLessonIds(track, next).length === 0) continue
    if (!levelProgress(track, current, updated).isComplete) continue
    updated = {
      ...updated,
      currentLevel: { ...updated.currentLevel, [track]: next },
      unlockedLevels: { ...updated.unlockedLevels, [track]: withUnlocked(updated.unlockedLevels[track], next) },
    }
  }
  return updated
}

/** Kết quả bài xếp lớp v3: level + band dạng khoảng. Mở khoá tới level đó, đặt làm level hiện tại. */
export function setPlacement(
  progress: LearningProgress,
  result: { level: LevelId; track: TrackId; bandLow: number; bandHigh: number },
  now = new Date(),
): LearningProgress {
  const upTo = LEVELS.slice(0, LEVELS.indexOf(result.level) + 1)
  const currentLevel = { ...progress.currentLevel }
  const unlockedLevels = { ...progress.unlockedLevels }
  for (const track of TRACKS) {
    unlockedLevels[track] = withUnlocked(unlockedLevels[track], ...upTo)
    // không kéo người đang học level cao hơn xuống thấp
    if (LEVELS.indexOf(result.level) > LEVELS.indexOf(currentLevel[track])) currentLevel[track] = result.level
  }
  return {
    ...progress,
    placement: { ...result, takenAt: now.toISOString() },
    profile: { ...progress.profile, track: result.track },
    currentLevel,
    unlockedLevels,
  }
}

/** Bài xếp lớp CŨ (6 level): đổi level cũ -> level mới rồi dùng setPlacement. */
export function setLegacyPlacement(progress: LearningProgress, recommendedLevelOrder: number, estimatedBand: string, now = new Date()): LearningProgress {
  const band = parseBandRange(estimatedBand) ?? { low: 0, high: 2 }
  let updated = setPlacement(
    progress,
    { level: levelIdFromLegacyOrder(recommendedLevelOrder), track: progress.profile.track, bandLow: band.low, bandHigh: band.high },
    now,
  )
  // người giỏi (level cũ ≥ 4) được mở thêm level-3
  const extra = unlockedLevelsFromLegacyOrder(recommendedLevelOrder)
  for (const track of TRACKS) {
    updated = { ...updated, unlockedLevels: { ...updated.unlockedLevels, [track]: withUnlocked(updated.unlockedLevels[track], ...extra) } }
  }
  return updated
}

/** Qua bài test cuối level: ghi điểm, mở level sau cho cả 2 track. */
export function passLevelTest(progress: LearningProgress, levelId: string, percent: number, now = new Date()): LearningProgress {
  let updated: LearningProgress = {
    ...progress,
    levelTests: { ...progress.levelTests, [levelId]: { passedAt: now.toISOString(), percent } },
  }
  const next = LEVELS.includes(levelId as LevelId) ? nextLevelId(levelId as LevelId) : null
  if (next) {
    const currentLevel = { ...updated.currentLevel }
    const unlockedLevels = { ...updated.unlockedLevels }
    for (const track of TRACKS) {
      unlockedLevels[track] = withUnlocked(unlockedLevels[track], next)
      if (currentLevel[track] === levelId) currentLevel[track] = next
    }
    updated = { ...updated, currentLevel, unlockedLevels }
  }
  return markStudyDay(updated, 'exam', now)
}

/* ============================================================================
 * 3. BÀI HỌC: BẮT ĐẦU, LƯU CHỖ ĐANG LÀM, HOÀN THÀNH
 * ========================================================================== */

/** Bắt đầu 1 bài MỚI TỪ ĐẦU (xoá chỗ đang làm cũ nếu có). */
export function startLesson(progress: LearningProgress, lessonId: string, queue: string[], now = new Date()): LearningProgress {
  return { ...progress, resume: { lessonId, stepIndex: 0, queue, answers: {}, updatedAt: now.toISOString() } }
}

/** Lưu chỗ đang làm (gọi sau MỖI câu trả lời). */
export function saveResume(progress: LearningProgress, resume: Omit<LessonResume, 'updatedAt'>, now = new Date()): LearningProgress {
  return { ...progress, resume: { ...resume, updatedAt: now.toISOString() } }
}

export function clearResume(progress: LearningProgress): LearningProgress {
  return progress.resume ? { ...progress, resume: null } : progress
}

export interface CompleteLessonInput {
  lessonId: string
  /** Tỉ lệ đúng 0..1 */
  accuracy: number
  /** id các từ vựng vừa học -> tạo thẻ ôn "word:<id>" (hẹn ôn từ ngày mai) */
  learnedWordIds: string[]
  /** Số phút đã học bài này */
  minutes: number
}

/**
 * Hoàn thành 1 bài (v3): ghi kết quả, tạo thẻ từ vựng, xoá chỗ đang làm, giữ chuỗi,
 * cộng phút học, đếm nhiệm vụ, và tự mở level sau nếu vừa học xong cả level.
 * (XP KHÔNG cộng ở đây — trang kết quả tự gọi addXp.)
 */
export function completeLesson(progress: LearningProgress, input: CompleteLessonInput, now = new Date()): LearningProgress {
  const previous = progress.lessons[input.lessonId]
  const accuracy = Math.max(0, Math.min(1, input.accuracy))
  const srs = { ...progress.srs }
  for (const wordId of input.learnedWordIds) srs[`word:${wordId}`] ??= createSrsCard(now, startOfTomorrow(now))

  let updated: LearningProgress = {
    ...progress,
    srs,
    lessons: {
      ...progress.lessons,
      [input.lessonId]: {
        completedAt: now.toISOString(),
        bestAccuracy: Math.max(previous?.bestAccuracy ?? 0, accuracy),
        attempts: (previous?.attempts ?? 0) + 1,
      },
    },
    resume: progress.resume?.lessonId === input.lessonId ? null : progress.resume,
  }
  updated = bumpActivity(updated, 'lessons', 1, now)
  updated = markStudyDay(updated, 'lesson', now)
  updated = addStudyMinutes(updated, input.minutes, now)
  return advanceCompletedLevels(updated)
}

/** Mini-test (có tim) của 1 bài. Trượt: chỉ tăng số lần thử. */
export function recordMiniTestAttempt(progress: LearningProgress, lessonId: string, passed: boolean, stars: number, now = new Date()): LearningProgress {
  const previous = progress.miniTests[lessonId]
  const attempts = (previous?.attempts ?? 0) + 1
  if (!passed) {
    return previous ? { ...progress, miniTests: { ...progress.miniTests, [lessonId]: { ...previous, attempts } } } : progress
  }
  let updated: LearningProgress = {
    ...progress,
    miniTests: { ...progress.miniTests, [lessonId]: { passedAt: now.toISOString(), stars: Math.max(previous?.stars ?? 0, stars), attempts } },
  }
  updated = bumpActivity(updated, 'miniTests', 1, now)
  if (stars === 3) updated = bumpActivity(updated, 'perfectMiniTests', 1, now)
  return markStudyDay(updated, 'exam', now)
}

/* ============================================================================
 * 4. TRẢ LỜI CÂU HỎI, SỔ LỖI SAI, THẺ ÔN
 * ========================================================================== */

/** Thêm 1 mục vào sổ lỗi sai (sai lại câu cũ -> tăng đếm, đưa lên đầu). Không đụng SRS. */
export function addMistakeEntry(progress: LearningProgress, mistake: NewMistake, now = new Date()): LearningProgress {
  const existing = progress.mistakes.find((m) => m.itemId === mistake.itemId)
  const createdAt = now.toISOString()
  let mistakes: MistakeEntry[]
  if (existing) {
    const updated = { ...existing, ...mistake, timesWrong: existing.timesWrong + 1, resolved: false, createdAt }
    mistakes = [updated, ...progress.mistakes.filter((m) => m.id !== existing.id)]
  } else {
    const entry: MistakeEntry = { ...mistake, id: `${mistake.itemId}-${now.getTime()}`, createdAt, timesWrong: 1, resolved: false }
    mistakes = [entry, ...progress.mistakes].slice(0, MAX_MISTAKES)
  }
  return { ...progress, mistakes }
}

/**
 * Ghi lỗi sai kiểu cũ (dùng ở phòng thi): thêm vào sổ lỗi; câu trong bài học / mini-test
 * còn được tạo thẻ ôn "item:<id>" (câu thi thì không, vì không có dạng bài tập để ôn).
 */
export function recordMistake(progress: LearningProgress, mistake: NewMistake, now = new Date()): LearningProgress {
  const updated = addMistakeEntry(progress, mistake, now)
  if (mistake.source === 'exam') return updated
  const key = `item:${mistake.itemId}`
  return updated.srs[key] ? updated : { ...updated, srs: { ...updated.srs, [key]: createSrsCard(now) } }
}

export function setMistakeResolved(progress: LearningProgress, mistakeId: string, resolved: boolean): LearningProgress {
  return { ...progress, mistakes: progress.mistakes.map((m) => (m.id === mistakeId ? { ...m, resolved } : m)) }
}

export interface AnswerInput {
  skill: SkillName
  correct: boolean
  /** id bài tập / câu hỏi -> thẻ ôn "item:<itemKey>" */
  itemKey?: string
  /** Chi tiết để ghi sổ lỗi khi trả lời sai (không có = không ghi sổ) */
  mistake?: NewMistake
}

/**
 * Ghi 1 câu trả lời:
 *   - thống kê kỹ năng (số câu, số đúng, 40 câu gần nhất)
 *   - sai + có `mistake` -> sổ lỗi sai
 *   - có itemKey: sai -> thẻ "item:" mới (hoặc chấm Again nếu đã có);
 *                 đúng mà thẻ đang đến hạn -> chấm Good (câu sai cũ đã nhớ lại)
 */
export function recordAnswer(progress: LearningProgress, input: AnswerInput, now = new Date()): LearningProgress {
  const stat = progress.skillStats[input.skill] ?? { answered: 0, correct: 0, recent: [] }
  let updated: LearningProgress = {
    ...progress,
    skillStats: {
      ...progress.skillStats,
      [input.skill]: {
        answered: stat.answered + 1,
        correct: stat.correct + (input.correct ? 1 : 0),
        recent: [...stat.recent, input.correct ? 1 : 0].slice(-RECENT_ANSWERS_KEPT),
      },
    },
  }
  if (!input.correct && input.mistake) updated = addMistakeEntry(updated, input.mistake, now)

  if (input.itemKey) {
    const key = `item:${input.itemKey}`
    const card = updated.srs[key]
    if (!input.correct) {
      const next = card ? reviewCard(card, 'again', key, now) : createSrsCard(now)
      updated = { ...updated, srs: { ...updated.srs, [key]: next } }
    } else if (card && isCardDue(card, now)) {
      updated = { ...updated, srs: { ...updated.srs, [key]: reviewCard(card, 'good', key, now) } }
    }
  }
  return updated
}

/** Ôn 1 thẻ (trang /review). Thẻ chưa có -> tạo rồi chấm luôn. */
export function reviewSrsCard(progress: LearningProgress, key: string, rating: SrsRating, now = new Date()): LearningProgress {
  const card = progress.srs[key] ?? createSrsCard(now)
  const updated = { ...progress, srs: { ...progress.srs, [key]: reviewCard(card, rating, key, now) } }
  return bumpActivity(updated, 'reviews', 1, now)
}

/** Xong 1 phiên ôn trọn vẹn -> tính là ngày có học (giữ chuỗi). */
export function completeReviewSession(progress: LearningProgress, minutes = 0, now = new Date()): LearningProgress {
  return addStudyMinutes(markStudyDay(progress, 'review', now), minutes, now)
}

/* ============================================================================
 * 5. WRITING: BẢN NHÁP, NHẬT KÝ BÀI VIẾT; BAND ƯỚC TÍNH
 * ========================================================================== */

/** Lưu nháp (text rỗng = xoá nháp). Giữ tối đa 30 nháp mới nhất. */
export function saveDraft(progress: LearningProgress, taskId: string, text: string, now = new Date()): LearningProgress {
  const drafts = { ...progress.drafts }
  if (!text.trim()) delete drafts[taskId]
  else drafts[taskId] = { text: text.slice(0, MAX_DRAFT_CHARS), updatedAt: now.toISOString() }
  const ids = Object.keys(drafts).sort((a, b) => drafts[b].updatedAt.localeCompare(drafts[a].updatedAt))
  for (const id of ids.slice(MAX_DRAFTS)) delete drafts[id]
  return { ...progress, drafts }
}

export function logWriting(progress: LearningProgress, entry: Omit<WritingLogEntry, 'at'>, now = new Date()): LearningProgress {
  return { ...progress, writingLog: [...progress.writingLog, { ...entry, at: now.toISOString() }].slice(-MAX_WRITING_LOG) }
}

export function updateBandEstimate(
  progress: LearningProgress,
  skill: SkillName,
  low: number,
  high: number,
  confidence: BandEstimate['confidence'],
  now = new Date(),
): LearningProgress {
  const estimate: BandEstimate = { low: Math.min(low, high), high: Math.max(low, high), confidence, updatedAt: now.toISOString() }
  return { ...progress, bandEstimates: { ...progress.bandEstimates, [skill]: estimate } }
}

/* ============================================================================
 * 6. TRÒ CHƠI HOÁ: nhiệm vụ (thưởng XP), huy hiệu, level tài khoản
 * ========================================================================== */

export function markRewardClaimed(progress: LearningProgress, rewardKey: string): LearningProgress {
  if (progress.claimedRewards.includes(rewardKey)) return progress
  return { ...progress, claimedRewards: [...progress.claimedRewards, rewardKey].slice(-500) }
}

/**
 * Nhận thưởng 1 nhiệm vụ: cộng XP + ghi "đã nhận" (rewardKey VD "daily:2026-10-06:d-lessons-2").
 * Đã nhận rồi thì không cộng lần nữa.
 */
export function claimQuestReward(progress: LearningProgress, rewardKey: string, xp: number, now = new Date()): LearningProgress {
  if (progress.claimedRewards.includes(rewardKey)) return progress
  return markRewardClaimed(addXp(progress, xp, now), rewardKey)
}

export function unlockAchievements(progress: LearningProgress, achievementIds: string[]): LearningProgress {
  return { ...progress, unlockedAchievements: [...new Set([...progress.unlockedAchievements, ...achievementIds])] }
}

export function setRewardedAccountLevel(progress: LearningProgress, level: number): LearningProgress {
  return { ...progress, rewardedAccountLevel: Math.max(progress.rewardedAccountLevel, level) }
}

/* ============================================================================
 * 7. KHI MỞ WEB
 * ========================================================================== */

/** Chốt sổ chuỗi tới hôm nay (dùng freeze / mở cửa sổ sửa chuỗi). */
export function settleOnLoad(progress: LearningProgress, now = new Date()): LearningProgress {
  const streak = settleStreak(progress.streak, now)
  return streak === progress.streak ? progress : { ...progress, streak }
}
