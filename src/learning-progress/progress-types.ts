/**
 * progress-types.ts
 * ----------------------------------------------------------------------------
 * HÌNH DẠNG DỮ LIỆU TIẾN ĐỘ HỌC của 1 người (phiên bản 2 — redesign v3).
 * Toàn bộ object này được lưu thành 1 cục JSON trong bảng learning_progress
 * (API /api/progress) và 1 bản sao trong localStorage của trình duyệt.
 *
 * Bản cũ (version 1) vẫn còn trong database của những người đã học trước đây.
 * Khi tải về, hàm migrateProgress() (file progress-migration.ts) tự chuyển sang
 * version 2 — người học không mất XP, chuỗi ngày, bài đã học, sổ lỗi sai.
 *
 * So với hợp đồng ở docs/redesign-v3/01-ARCHITECTURE.md mục 3, bản này THÊM:
 *   - savedAt      : thời điểm thay đổi cuối (so bản trong máy với bản máy chủ, bản nào mới hơn thì dùng)
 *   - studyDates   : danh sách ngày có học (tính "Tuần này x/7", lịch học)
 *   - miniTests, levelTests : giữ nguyên từ v1 (mini-test có tim + bài test cuối level)
 *   - streak.repairStreak / repairLessonsDone : cần để "sửa chuỗi trong 48 giờ"
 *   - profile.srsButtons : người học tự chọn 2 hay 4 nút khi ôn (không có = theo level/tuổi)
 *   - SerializedFsrsCard.addedOn / firstReviewOn : đếm "thẻ mới hôm nay"
 * (Ghi chú chi tiết trong docs/redesign-v3/03-DATA-LAYER.md.)
 * ----------------------------------------------------------------------------
 */
import type { ActivityMetric } from '../game-economy/quests-and-achievements'
import type { LevelId, SkillName, TrackId } from '../content/content-types'
import type { AgeGroup } from '../../backend-helpers/age-groups'

export type { AgeGroup } from '../../backend-helpers/age-groups'

/* ============================================================================
 * 1. CÁC KHỐI DÙNG CHUNG (v1 và v2 đều có)
 * ========================================================================== */

/** 1 mục trong Sổ lỗi sai. */
export interface MistakeEntry {
  id: string // mã duy nhất của mục lỗi
  source: 'lesson' | 'mini-test' | 'exam' | 'review'
  /** id bài tập (exercise) hoặc câu hỏi thi */
  itemId: string
  /** bài học hoặc đề thi chứa câu này (để mở lại) */
  parentId: string
  question: string
  userAnswer: string
  correctAnswer: string
  explanation?: string
  /** đoạn văn / kịch bản nghe liên quan, giúp AI giải thích đúng ngữ cảnh */
  context?: string
  createdAt: string // ISO
  timesWrong: number
  resolved: boolean // người học đánh dấu "đã hiểu"
}

/** Thông tin để ghi 1 lỗi sai mới (các trường còn lại kho tự điền). */
export type NewMistake = Omit<MistakeEntry, 'id' | 'createdAt' | 'timesWrong' | 'resolved'>

/** Các trường trò chơi hoá (nhiệm vụ, huy hiệu, level tài khoản) — giữ nguyên từ v1. */
export interface GamificationFields {
  /** Đếm trọn đời từng loại hoạt động (dùng cho huy hiệu, trang cá nhân) */
  lifetimeStats: Partial<Record<ActivityMetric, number>>
  /** Đếm trong ngày / tuần hiện tại (dùng cho nhiệm vụ). Sang ngày / tuần mới thì đếm lại từ 0. */
  questCounters: {
    day: string
    week: string
    daily: Partial<Record<ActivityMetric, number>>
    weekly: Partial<Record<ActivityMetric, number>>
  }
  /** Các phần thưởng đã nhận (để ẩn nút "Nhận"), VD "daily:2026-10-06:d-lessons-2" */
  claimedRewards: string[]
  /** Huy hiệu đã mở khoá */
  unlockedAchievements: string[]
  /** Level tài khoản cao nhất đã nhận thưởng */
  rewardedAccountLevel: number
}

/* ============================================================================
 * 2. VERSION 1 (CŨ) — chỉ dùng để đọc dữ liệu cũ rồi chuyển đổi
 * ========================================================================== */

/** Thẻ ôn tập kiểu Leitner của v1: box 0..5, dueDate "YYYY-MM-DD". */
export interface LeitnerCardV1 {
  box: number
  dueDate: string
}

export interface LearningProgressV1 extends GamificationFields {
  version: 1
  xpTotal: number
  xpByDay: Record<string, number>
  dailyGoalXp: number
  streak: { current: number; longest: number; lastStudyDate: string | null }
  lessons: Record<string, { completedAt: string; bestAccuracy: number }>
  miniTests: Record<string, { passedAt: string; stars: number; attempts: number }>
  levelTests: Record<string, { passedAt: string; percent: number }>
  /** recommendedLevelOrder: level cũ 1..6 */
  placement: { recommendedLevelOrder: number; estimatedBand: string; takenAt: string } | null
  unlockedLevelOrder: number
  /** key "word:<wordId>" hoặc "exercise:<exerciseId>" */
  reviewCards: Record<string, LeitnerCardV1>
  mistakes: MistakeEntry[]
}

/* ============================================================================
 * 3. VERSION 2 (MỚI)
 * ========================================================================== */

/**
 * 1 thẻ ôn tập FSRS đã "phẳng hoá" thành JSON (ngày giờ là chuỗi ISO).
 * Thư viện ts-fsrs làm việc với object có Date; fsrs-scheduler.ts lo việc chuyển qua lại.
 */
export interface SerializedFsrsCard {
  /** Thời điểm đến hạn ôn (ISO) */
  due: string
  /** Độ bền trí nhớ (ngày): ở retention 0.9, khoảng ôn ≈ stability */
  stability: number
  /** FSRS-7 có thêm "trí nhớ ngắn hạn" (dấu vết nhanh) */
  stabilityFast: number
  /** Độ khó của thẻ 1..10 */
  difficulty: number
  /** 0 = mới, 1 = đang học, 2 = đang ôn, 3 = học lại (sau khi quên) */
  state: 0 | 1 | 2 | 3
  reps: number
  lapses: number
  scheduledDays: number
  learningStep: number
  /** Lần ôn gần nhất (ISO), null nếu chưa ôn */
  lastReview: string | null
  /** Ngày thẻ được tạo "YYYY-MM-DD" */
  addedOn: string
  /** Ngày ôn lần đầu — đếm số "thẻ mới" đã mở trong ngày */
  firstReviewOn?: string
}

/** Cài đặt cá nhân. */
export interface StudyProfile {
  track: TrackId
  ageGroup: AgeGroup
  dailyGoalMinutes: number
  /** "Sau khi … thì mình học" (implementation intention), tuỳ chọn */
  studyCue?: string
  /** Giờ học đã hẹn "HH:MM", tuỳ chọn */
  studyTime?: string
  voice: 'gb' | 'us'
  theme: 'system' | 'light' | 'dark'
  /** (thêm) Số nút khi ôn thẻ. Không đặt = tự chọn theo level / tuổi (xem fsrs-scheduler.ts) */
  srsButtons?: 2 | 4
}

export interface LessonRecord {
  completedAt: string
  bestAccuracy: number // 0..1
  attempts: number
}

/** Bài đang làm dở — mở lại web là quay về đúng câu. */
export interface LessonResume {
  lessonId: string
  /** Đang ở bước thứ mấy trong hàng đợi */
  stepIndex: number
  /** Thứ tự các bước (id thẻ dạy / bài tập; câu sai được đẩy xuống cuối) */
  queue: string[]
  /** Câu trả lời đã làm: id bước -> dữ liệu tuỳ trình học */
  answers: Record<string, unknown>
  updatedAt: string
}

export interface SkillStat {
  answered: number
  correct: number
  /** 0/1 của tối đa 40 câu gần nhất (1 = đúng) — tính "độ chính xác gần đây" */
  recent: number[]
}

export interface BandEstimate {
  low: number
  high: number
  confidence: 'low' | 'medium' | 'high'
  updatedAt: string
}

export interface StreakState {
  current: number
  longest: number
  /** Ngày học gần nhất được tính vào chuỗi "YYYY-MM-DD" */
  lastStudyDate: string | null
  /** Số "bảo vệ chuỗi" đang trang bị (tự kiếm: 1 cái / 7 ngày chuỗi, tối đa 2) */
  freezes: number
  /** Chuỗi vừa đứt: hạn chót (ISO) để "sửa chuỗi" bằng 2 bài học */
  repairUntil?: string
  /** (thêm) Độ dài chuỗi trước khi đứt — được trả lại khi sửa thành công */
  repairStreak?: number
  /** (thêm) Số bài đã học trong lúc sửa chuỗi */
  repairLessonsDone?: number
}

export interface PlacementResultV2 {
  level: LevelId
  track: TrackId
  bandLow: number
  bandHigh: number
  takenAt: string
}

export interface WritingLogEntry {
  taskId: string
  words: number
  selfBand?: number
  aiLow?: number
  aiHigh?: number
  at: string
}

/** Trạng thái 1 từ trong khu trẻ em (Leitner 5 hộp — xem kids-word-boxes.ts). */
export interface KidsWordState {
  /** 0..4 = 5 hộp Leitner (gặp lại trong buổi -> 1 ngày -> 3 ngày -> 7 ngày -> 14 ngày); 5 = ĐÃ THUỘC */
  box: 0 | 1 | 2 | 3 | 4 | 5
  /** Ngày đến hạn ôn "YYYY-MM-DD" */
  due: string
  seen: number
  right: number
  wrong: number
}

export interface KidsProgress {
  words: Record<string, KidsWordState>
  stickers: string[]
  outfits: string[]
  equippedOutfit: string
  playSecondsByDay: Record<string, number>
  roundsByDay: Record<string, number>
  storyChapter: number
  bestScores: Record<string, number>
  /** weekId (ngày thứ Hai đầu tuần) -> các ngày có chơi. Thẻ tem tuần, không dùng chuỗi liên tục. */
  weeklyStamps: Record<string, string[]>
}

export interface LearningProgressV2 extends GamificationFields {
  version: 2
  /** (thêm) Thời điểm thay đổi cuối (ISO). "" = chưa từng lưu bằng bản mới. */
  savedAt: string
  profile: StudyProfile
  currentLevel: Record<TrackId, LevelId>
  unlockedLevels: Record<TrackId, LevelId[]>
  lessons: Record<string, LessonRecord>
  /** Mini-test (có tim) đã qua: lessonId -> số sao */
  miniTests: Record<string, { passedAt: string; stars: number; attempts: number }>
  /** Bài test cuối level đã qua: levelId -> % */
  levelTests: Record<string, { passedAt: string; percent: number }>
  resume: LessonResume | null
  /** Bản nháp Writing: taskId -> nội dung */
  drafts: Record<string, { text: string; updatedAt: string }>
  skillStats: Record<SkillName, SkillStat>
  bandEstimates: Partial<Record<SkillName, BandEstimate>>
  /** Thẻ ôn tập: key "word:<wordId>" | "item:<exerciseId>" */
  srs: Record<string, SerializedFsrsCard>
  mistakes: MistakeEntry[]
  streak: StreakState
  /** (thêm) Các ngày có học, sắp xếp tăng dần, giữ ~400 ngày */
  studyDates: string[]
  /** Phút học theo ngày (90 ngày gần nhất) */
  minutesByDay: Record<string, number>
  xpTotal: number
  /** XP theo ngày (60 ngày gần nhất) */
  xpByDay: Record<string, number>
  placement: PlacementResultV2 | null
  writingLog: WritingLogEntry[]
  kids: KidsProgress | null
}

/** Tên ngắn gọn dùng khắp nơi: luôn là bản mới nhất. */
export type LearningProgress = LearningProgressV2

/* ============================================================================
 * 4. GIÁ TRỊ MẶC ĐỊNH
 * ========================================================================== */

export const ALL_SKILLS: SkillName[] = ['vocabulary', 'listening', 'reading', 'speaking', 'writing']

export function createEmptySkillStats(): Record<SkillName, SkillStat> {
  const stats = {} as Record<SkillName, SkillStat>
  for (const skill of ALL_SKILLS) stats[skill] = { answered: 0, correct: 0, recent: [] }
  return stats
}

export function createEmptyKidsProgress(): KidsProgress {
  return {
    words: {},
    stickers: [],
    outfits: [],
    equippedOutfit: 'classic', // trang phục mặc định của mascot
    playSecondsByDay: {},
    roundsByDay: {},
    storyChapter: 0,
    bestScores: {},
    weeklyStamps: {},
  }
}

/** Tiến độ trống cho người mới. */
export function createEmptyProgress(): LearningProgressV2 {
  return {
    version: 2,
    savedAt: '',
    profile: { track: 'general', ageGroup: 'adult', dailyGoalMinutes: 10, voice: 'gb', theme: 'system' },
    currentLevel: { general: 'level-1', ielts: 'level-1' },
    unlockedLevels: { general: ['level-1'], ielts: ['level-1'] },
    lessons: {},
    miniTests: {},
    levelTests: {},
    resume: null,
    drafts: {},
    skillStats: createEmptySkillStats(),
    bandEstimates: {},
    srs: {},
    mistakes: [],
    streak: { current: 0, longest: 0, lastStudyDate: null, freezes: 0 },
    studyDates: [],
    minutesByDay: {},
    xpTotal: 0,
    xpByDay: {},
    placement: null,
    writingLog: [],
    kids: null,
    lifetimeStats: {},
    questCounters: { day: '', week: '', daily: {}, weekly: {} },
    claimedRewards: [],
    unlockedAchievements: [],
    rewardedAccountLevel: 1,
  }
}
