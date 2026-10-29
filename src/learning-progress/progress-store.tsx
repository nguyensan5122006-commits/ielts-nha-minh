/**
 * progress-store.tsx
 * ----------------------------------------------------------------------------
 * "KHO" TIẾN ĐỘ HỌC — nơi duy nhất được phép thay đổi tiến độ (React Context).
 *
 * Luồng dữ liệu:
 *   1. Đăng nhập xong -> hiện ngay bản trong máy (localStorage), rồi tải bản máy chủ
 *      (GET /api/progress). Bản nào mới hơn (trường savedAt) thì dùng bản đó.
 *      Dữ liệu cũ (version 1) được tự nâng cấp bằng migrateProgress().
 *   2. Component gọi các hàm hành động (completeLessonV3, recordAnswer, saveResume...).
 *      Mỗi hành động gọi 1 hàm thuần trong progress-updates.ts để tính tiến độ mới.
 *   3. Tiến độ mới được ghi NGAY vào localStorage (mất mạng / đóng tab vẫn còn),
 *      cập nhật state -> giao diện tự vẽ lại.
 *   4. Sau 1,5 giây không có thay đổi mới -> gửi cả cục lên máy chủ (PUT /api/progress).
 *      Gửi lỗi -> thử lại sau 15 giây / khi có mạng lại / khi ẩn tab.
 *
 * Các trang không phải học (đấu trường, cửa hàng, nhiệm vụ...) vẫn dùng các hàm cũ
 * (addXp, recordActivity, markRewardClaimed...) với đúng chữ ký cũ.
 * Tài liệu đầy đủ cho các nhóm giao diện: docs/redesign-v3/03-DATA-LAYER.md
 * ----------------------------------------------------------------------------
 */
import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import type { LevelId, SkillName, TrackId } from '../content/content-types'
import type { ActivityMetric } from '../game-economy/quests-and-achievements'
import { api } from '../services/api-client'
import { useAuth } from '../services/auth-context'
import { normalizeAgeGroup } from '../../backend-helpers/age-groups'
import type { SrsRating } from './fsrs-scheduler'
import { chooseNewerProgress, migrateProgress } from './progress-migration'
import {
  createEmptyProgress,
  type BandEstimate,
  type KidsWordState,
  type LearningProgress,
  type LessonResume,
  type NewMistake,
  type StudyProfile,
  type WritingLogEntry,
} from './progress-types'
import * as update from './progress-updates'
import { streakSummary, type StreakSummary } from './streak-rules'
import { todayString } from './study-calendar'

const SAVE_DELAY_MS = 1500
const RETRY_DELAY_MS = 15_000

export type SaveStatus = 'saved' | 'saving' | 'error'

export interface ProgressActions {
  /* ---------- giữ từ bản cũ (các trang không phải học đang dùng) ---------- */
  /** Cộng XP (kèm ghi XP cho bảng xếp hạng). Không còn tự tăng chuỗi ngày. */
  addXp: (amount: number) => void
  /** (cũ) Hoàn thành bài — giống completeLessonV3 với minutes = 0 */
  completeLesson: (lessonId: string, accuracy: number, learnedWordIds: string[]) => void
  recordMiniTestAttempt: (lessonId: string, passed: boolean, stars: number) => void
  /** Qua bài test cuối level -> mở level sau. levelOrder giữ cho tương thích, không còn dùng. */
  passLevelTest: (levelId: string, levelOrder: number, percent: number) => void
  /** (cũ) Kết quả bài xếp lớp 6 level -> tự đổi sang level mới */
  setPlacementResult: (recommendedLevelOrder: number, estimatedBand: string) => void
  recordMistake: (mistake: NewMistake) => void
  setMistakeResolved: (mistakeId: string, resolved: boolean) => void
  /** Ghi nhận 1 hoạt động cho nhiệm vụ / huy hiệu (VD xem thẻ Học vui, chơi game, thắng trận) */
  recordActivity: (metric: ActivityMetric, amount?: number) => void
  markRewardClaimed: (rewardKey: string) => void
  unlockAchievements: (achievementIds: string[]) => void
  setRewardedAccountLevel: (level: number) => void
  /** Dùng món "Bảo vệ chuỗi" mua ở cửa hàng */
  applyStreakFreeze: () => void

  /* ---------- v3: hồ sơ, track, xếp lớp ---------- */
  setProfile: (patch: Partial<StudyProfile>) => void
  setTrack: (track: TrackId) => void
  setPlacementV3: (result: { level: LevelId; track: TrackId; bandLow: number; bandHigh: number }) => void

  /* ---------- v3: bài học ---------- */
  /** Bắt đầu bài từ đầu (xoá chỗ đang làm cũ) */
  startLesson: (lessonId: string, queue: string[]) => void
  /** Lưu chỗ đang làm — gọi sau MỖI câu trả lời */
  saveResume: (resume: Omit<LessonResume, 'updatedAt'>) => void
  clearResume: () => void
  /** Ghi 1 câu trả lời (thống kê kỹ năng + sổ lỗi + thẻ ôn "item:") */
  recordAnswer: (skill: SkillName, correct: boolean, itemKey?: string, mistake?: NewMistake) => void
  /** Hoàn thành bài: accuracy 0..1, từ vừa học, số phút */
  completeLessonV3: (lessonId: string, accuracy: number, learnedWordIds: string[], minutes: number) => void
  addStudyMinutes: (minutes: number) => void
  /** Ghi nhận hôm nay có học (VD vừa làm xong 1 bài thi) */
  markStudyDay: () => void

  /* ---------- v3: writing, band ---------- */
  saveDraft: (taskId: string, text: string) => void
  logWriting: (entry: Omit<WritingLogEntry, 'at'>) => void
  updateBandEstimate: (skill: SkillName, low: number, high: number, confidence: BandEstimate['confidence']) => void

  /* ---------- v3: ôn thẻ FSRS ---------- */
  reviewSrsCard: (key: string, rating: SrsRating) => void
  /** Xong 1 phiên ôn trọn vẹn (giữ chuỗi ngày) */
  completeReviewSession: (minutes?: number) => void

  /* ---------- v3: khu trẻ em ---------- */
  /** Trả về trạng thái mới của từ + cờ "vừa thuộc" (để trao sticker) */
  kidsAnswerWord: (wordId: string, correct: boolean, usedHint?: boolean) => { state: KidsWordState; justMastered: boolean }
  kidsAwardSticker: (stickerId: string) => void
  kidsUnlockOutfit: (outfitId: string) => void
  kidsEquipOutfit: (outfitId: string) => void
  kidsAddPlaySeconds: (seconds: number) => void
  kidsSetStoryChapter: (chapter: number) => void
  /** Gọi 1 lần cuối mỗi lượt chơi: kỷ lục + đếm lượt + tem tuần */
  kidsRecordBestScore: (gameId: string, score: number) => void

  /** Gửi ngay lên máy chủ (VD khi bấm Esc thoát bài) */
  flushSave: () => Promise<void>
}

export interface ProgressContextValue extends ProgressActions {
  progress: LearningProgress
  isLoaded: boolean
  saveStatus: SaveStatus
  /** Chuỗi hiển thị (đã tính freeze / chuỗi đứt tới hôm nay) */
  visibleStreak: number
  /** Đủ thông tin chuỗi: freeze, sửa chuỗi, "tuần này x/7", tổng ngày học */
  streak: StreakSummary
  todayXp: number
  todayMinutes: number
}

const ProgressContext = createContext<ProgressContextValue | null>(null)

const cacheKey = (userId: number) => `ielts-progress-${userId}`

function readCache(userId: number): unknown {
  try {
    const text = localStorage.getItem(cacheKey(userId))
    return text ? JSON.parse(text) : null
  } catch {
    return null
  }
}

function writeCache(userId: number, progress: LearningProgress) {
  try {
    localStorage.setItem(cacheKey(userId), JSON.stringify(progress))
  } catch {
    /* hết chỗ / chế độ riêng tư: bỏ qua, máy chủ vẫn lưu */
  }
}

export function ProgressProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth()
  const [progress, setProgress] = useState<LearningProgress>(createEmptyProgress)
  const [isLoaded, setIsLoaded] = useState(false)
  const [saveStatus, setSaveStatus] = useState<SaveStatus>('saved')

  /** Bản mới nhất (luôn đúng ngay cả khi React chưa kịp vẽ lại) */
  const progressRef = useRef(progress)
  const userIdRef = useRef<number | null>(null)
  /** Có thay đổi chưa gửi lên máy chủ */
  const dirty = useRef(false)
  /** Được phép gửi lên máy chủ (đã tải được bản máy chủ, hoặc có bản trong máy để dựa vào) */
  const canUpload = useRef(false)
  const saveTimer = useRef<number | undefined>(undefined)

  /** Đặt tiến độ mới: ref + localStorage + state. `markDirty` = cần gửi lên máy chủ. */
  const applyProgress = useCallback((next: LearningProgress, markDirty: boolean) => {
    progressRef.current = next
    if (userIdRef.current !== null) writeCache(userIdRef.current, next)
    if (markDirty) dirty.current = true
    setProgress(next)
  }, [])

  /**
   * Cách DUY NHẤT các hành động thay đổi tiến độ: tính bản mới từ bản mới nhất,
   * đóng dấu thời gian savedAt, lưu ngay. Trả về bản mới (để hành động trả kết quả).
   */
  const commit = useCallback(
    (change: (current: LearningProgress) => LearningProgress): LearningProgress => {
      const current = progressRef.current
      const next = change(current)
      if (next === current) return current
      const stamped = { ...next, savedAt: new Date().toISOString() }
      applyProgress(stamped, true)
      return stamped
    },
    [applyProgress],
  )

  /* ---------- gửi lên máy chủ ---------- */
  const sendNow = useCallback(async () => {
    window.clearTimeout(saveTimer.current)
    if (!dirty.current || !canUpload.current || userIdRef.current === null) return
    const snapshot = progressRef.current
    dirty.current = false
    setSaveStatus('saving')
    try {
      await api.saveProgress(snapshot)
      setSaveStatus(dirty.current ? 'saving' : 'saved')
    } catch {
      dirty.current = true
      setSaveStatus('error')
      saveTimer.current = window.setTimeout(() => void sendNow(), RETRY_DELAY_MS)
    }
  }, [])

  /* ---------- 1. Tải tiến độ khi đăng nhập ---------- */
  useEffect(() => {
    window.clearTimeout(saveTimer.current)
    dirty.current = false
    canUpload.current = false
    if (!user) {
      userIdRef.current = null
      progressRef.current = createEmptyProgress()
      setProgress(progressRef.current)
      setIsLoaded(false)
      return
    }
    userIdRef.current = user.id
    const ageGroup = normalizeAgeGroup(user.ageGroup)
    /** Chuẩn bị bản vừa tải: đồng bộ nhóm tuổi + chốt sổ chuỗi tới hôm nay */
    const prepare = (loaded: LearningProgress) => update.settleOnLoad(update.syncAgeGroup(loaded, ageGroup))
    let cancelled = false

    // hiện ngay bản trong máy (nếu có) cho nhanh
    const cached = readCache(user.id)
    if (cached) {
      progressRef.current = prepare(migrateProgress(cached))
      setProgress(progressRef.current)
    }

    const loadFromServer = () =>
      api
        .loadProgress()
        .then(({ progress: serverRaw }) => {
          if (cancelled) return
          // đọc lại bản trong máy: có thể người học đã làm thêm vài câu trong lúc chờ
          const latestLocal = dirty.current ? progressRef.current : readCache(user.id)
          const chosen = chooseNewerProgress(latestLocal, serverRaw)
          const prepared = prepare(chosen.progress)
          const changed = prepared !== chosen.progress
          canUpload.current = true
          applyProgress(changed ? { ...prepared, savedAt: new Date().toISOString() } : prepared, chosen.needsUpload || changed)
          setIsLoaded(true)
        })
        .catch(() => {
          if (cancelled) return
          // mất mạng: vẫn cho học bằng bản trong máy. Chỉ gửi lên máy chủ khi bản trong máy
          // có thật (không có thì chờ tải được bản máy chủ, tránh ghi đè dữ liệu thật bằng bản trống).
          canUpload.current = !!cached
          setIsLoaded(true)
        })
    void loadFromServer()

    // có mạng lại: chưa tải được thì tải lại, có thay đổi chờ gửi thì gửi
    const onOnline = () => {
      if (!canUpload.current) void loadFromServer()
      else void sendNow()
    }
    // ẩn tab / đóng tab: gửi ngay phần chưa lưu
    const onHide = () => {
      if (document.visibilityState === 'hidden') void sendNow()
    }
    window.addEventListener('online', onOnline)
    document.addEventListener('visibilitychange', onHide)
    window.addEventListener('pagehide', onHide)
    return () => {
      cancelled = true
      window.removeEventListener('online', onOnline)
      document.removeEventListener('visibilitychange', onHide)
      window.removeEventListener('pagehide', onHide)
    }
  }, [user, applyProgress, sendNow])

  /* ---------- 4. Tự động gửi sau 1,5 giây im lặng ---------- */
  useEffect(() => {
    if (!user || !isLoaded || !dirty.current || !canUpload.current) return
    setSaveStatus('saving')
    window.clearTimeout(saveTimer.current)
    saveTimer.current = window.setTimeout(() => void sendNow(), SAVE_DELAY_MS)
  }, [progress, user, isLoaded, sendNow])

  /* ---------- 2. Các hàm hành động ---------- */
  const actions = useMemo<ProgressActions>(() => {
    const run = (change: (current: LearningProgress) => LearningProgress) => void commit(change)
    return {
      // ----- cũ -----
      addXp: (amount) => {
        if (amount <= 0) return
        api.addXp(Math.min(amount, 200)).catch(() => {}) // ghi cho bảng xếp hạng
        run((p) => update.addXp(p, amount))
      },
      completeLesson: (lessonId, accuracy, learnedWordIds) => run((p) => update.completeLesson(p, { lessonId, accuracy, learnedWordIds, minutes: 0 })),
      recordMiniTestAttempt: (lessonId, passed, stars) => run((p) => update.recordMiniTestAttempt(p, lessonId, passed, stars)),
      passLevelTest: (levelId, _levelOrder, percent) => run((p) => update.passLevelTest(p, levelId, percent)),
      setPlacementResult: (order, band) => run((p) => update.setLegacyPlacement(p, order, band)),
      recordMistake: (mistake) => run((p) => update.recordMistake(p, mistake)),
      setMistakeResolved: (mistakeId, resolved) => run((p) => update.setMistakeResolved(p, mistakeId, resolved)),
      recordActivity: (metric, amount = 1) => run((p) => update.bumpActivity(p, metric, amount)),
      markRewardClaimed: (rewardKey) => run((p) => update.markRewardClaimed(p, rewardKey)),
      unlockAchievements: (ids) => run((p) => update.unlockAchievements(p, ids)),
      setRewardedAccountLevel: (level) => run((p) => update.setRewardedAccountLevel(p, level)),
      applyStreakFreeze: () => run((p) => update.applyStreakFreeze(p)),
      // ----- v3 -----
      setProfile: (patch) => run((p) => update.setProfile(p, patch)),
      setTrack: (track) => run((p) => update.setTrack(p, track)),
      setPlacementV3: (result) => run((p) => update.setPlacement(p, result)),
      startLesson: (lessonId, queue) => run((p) => update.startLesson(p, lessonId, queue)),
      saveResume: (resume) => run((p) => update.saveResume(p, resume)),
      clearResume: () => run((p) => update.clearResume(p)),
      recordAnswer: (skill, correct, itemKey, mistake) => run((p) => update.recordAnswer(p, { skill, correct, itemKey, mistake })),
      completeLessonV3: (lessonId, accuracy, learnedWordIds, minutes) =>
        run((p) => update.completeLesson(p, { lessonId, accuracy, learnedWordIds, minutes })),
      addStudyMinutes: (minutes) => run((p) => update.addStudyMinutes(p, minutes)),
      markStudyDay: () => run((p) => update.markStudyDay(p, 'exam')),
      saveDraft: (taskId, text) => run((p) => update.saveDraft(p, taskId, text)),
      logWriting: (entry) => run((p) => update.logWriting(p, entry)),
      updateBandEstimate: (skill, low, high, confidence) => run((p) => update.updateBandEstimate(p, skill, low, high, confidence)),
      reviewSrsCard: (key, rating) => run((p) => update.reviewSrsCard(p, key, rating)),
      completeReviewSession: (minutes = 0) => run((p) => update.completeReviewSession(p, minutes)),
      kidsAnswerWord: (wordId, correct, usedHint = false) => {
        const before = progressRef.current
        const after = commit((p) => update.kidsAnswerWord(p, wordId, correct, usedHint))
        return { state: after.kids!.words[wordId], justMastered: update.kidsWordJustMastered(before, after, wordId) }
      },
      kidsAwardSticker: (stickerId) => run((p) => update.kidsAwardSticker(p, stickerId)),
      kidsUnlockOutfit: (outfitId) => run((p) => update.kidsUnlockOutfit(p, outfitId)),
      kidsEquipOutfit: (outfitId) => run((p) => update.kidsEquipOutfit(p, outfitId)),
      kidsAddPlaySeconds: (seconds) => run((p) => update.kidsAddPlaySeconds(p, seconds)),
      kidsSetStoryChapter: (chapter) => run((p) => update.kidsSetStoryChapter(p, chapter)),
      kidsRecordBestScore: (gameId, score) => run((p) => update.kidsRecordBestScore(p, gameId, score)),
      flushSave: () => sendNow(),
    }
  }, [commit, sendNow])

  const value = useMemo<ProgressContextValue>(() => {
    const today = todayString()
    const streak = streakSummary(progress)
    return {
      ...actions,
      progress,
      isLoaded,
      saveStatus,
      visibleStreak: streak.current,
      streak,
      todayXp: progress.xpByDay[today] ?? 0,
      todayMinutes: progress.minutesByDay[today] ?? 0,
    }
  }, [actions, progress, isLoaded, saveStatus])

  return <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>
}

export function useProgress(): ProgressContextValue {
  const context = useContext(ProgressContext)
  if (!context) throw new Error('useProgress phải dùng bên trong <ProgressProvider>')
  return context
}
