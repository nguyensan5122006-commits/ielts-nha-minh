/**
 * fsrs-scheduler.ts
 * ----------------------------------------------------------------------------
 * ÔN TẬP NGẮT QUÃNG BẰNG THUẬT TOÁN FSRS (thư viện ts-fsrs, mô hình FSRS-7).
 *
 * Ý tưởng: mỗi thẻ (1 từ vựng hoặc 1 câu từng làm sai) có "độ bền trí nhớ"
 * (stability, tính bằng ngày). Ôn đúng lúc sắp quên thì trí nhớ bền thêm nhiều nhất.
 * FSRS tự tính lần ôn tiếp theo sao cho xác suất còn nhớ ≈ 90% (retention 0.90).
 *
 * Cấu hình (theo _research/notes/psych-adult.md mục A2 + D8):
 *   - desiredRetention 0.90, maximumInterval 365 ngày, fuzz bật (tránh dồn thẻ vào 1 ngày)
 *   - 2 nút "Quên / Nhớ"  = Again / Good  (Level 1–2)
 *   - 4 nút "Quên / Khó / Nhớ / Dễ" = Again / Hard / Good / Easy (Level 3)
 *   - Thẻ mới mỗi ngày theo band (D1): level-1: 5, level-2: 10, level-3: 15
 *   - Nợ ôn > 150 thẻ -> tạm dừng thẻ mới ("Ôn hết thẻ cũ trước để không quên")
 *   - Ôn tối đa ~100 thẻ / ngày
 *
 * File này KHÔNG dùng React — chỉ là các hàm "thuần" nhận dữ liệu, trả dữ liệu mới.
 * ----------------------------------------------------------------------------
 */
import {
  dateChrono,
  defineScheduler,
  Rating,
  type Grade,
  schedulerDesiredRetentionMiddleware,
  schedulerFuzzingMiddleware,
  schedulerLearningStepsMiddleware,
  schedulerMaximumIntervalMiddleware,
  schedulerMonotonicIntervalMiddleware,
  schedulerScheduledDaysMiddleware,
  schedulerStatsMiddleware,
} from 'ts-fsrs'
import { FSRS7_DEFAULT_WEIGHTS, FSRS7Model } from 'ts-fsrs/models/fsrs-7'
import type { LearningProgress, SerializedFsrsCard } from './progress-types'
import { todayString } from './study-calendar'

/* ============================================================================
 * 1. CẤU HÌNH + TẠO "MÁY XẾP LỊCH"
 * ========================================================================== */

export const FSRS_SETTINGS = {
  desiredRetention: 0.9,
  maximumInterval: 365,
  enableFuzz: true,
  /** Bước học ngắn trong ngày: sai thì hỏi lại sau 1 phút, rồi 10 phút */
  learningSteps: ['1m', '10m'] as const,
  relearningSteps: ['10m'] as const,
} as const

/** Ngưỡng nợ ôn: quá số này thì tạm dừng thẻ mới. */
export const BACKLOG_PAUSE_THRESHOLD = 150
/** Số lượt ôn tối đa mỗi ngày (mềm). */
export const MAX_REVIEWS_PER_DAY = 100
/** Thẻ có độ bền ≥ số ngày này coi là "nhớ chắc" (dùng cho sổ từ vựng). */
export const KNOWN_STABILITY_DAYS = 21

/*
 * Ghép máy xếp lịch giống hệt DefaultScheduler() của thư viện, nhưng tạo ĐỒNG BỘ
 * (DefaultScheduler() là hàm async vì nó tải mô hình động — không tiện trong React).
 * Thứ tự các "middleware" (bộ luật phụ) lấy đúng theo mã nguồn ts-fsrs v6.
 */
const schedulerDefinition = defineScheduler({ model: FSRS7Model, chrono: dateChrono }).use(
  schedulerDesiredRetentionMiddleware,
  schedulerFuzzingMiddleware,
  schedulerStatsMiddleware,
  schedulerScheduledDaysMiddleware,
  schedulerLearningStepsMiddleware,
  schedulerMaximumIntervalMiddleware,
  schedulerMonotonicIntervalMiddleware,
)

const scheduler = schedulerDefinition.create({
  config: {
    fractionalDays: true, // FSRS-7 tính theo ngày lẻ
    weights: FSRS7_DEFAULT_WEIGHTS, // bộ trọng số mặc định (không chỉnh tay — wiki FSRS khuyên vậy)
    enableShortTerm: true,
    desiredRetention: FSRS_SETTINGS.desiredRetention,
    learningSteps: [...FSRS_SETTINGS.learningSteps],
    relearningSteps: [...FSRS_SETTINGS.relearningSteps],
    allowModelOverride: true,
    enableFuzz: FSRS_SETTINGS.enableFuzz,
    maximumInterval: FSRS_SETTINGS.maximumInterval,
  },
})

/** Kiểu thẻ mà thư viện dùng (có Date thật). */
type LibraryCard = Parameters<typeof scheduler.review>[0]['card']

/* ============================================================================
 * 2. CHUYỂN QUA LẠI: thẻ của thư viện <-> JSON lưu trong tiến độ
 * ========================================================================== */

const STATUS_BY_STATE = ['new', 'learning', 'review', 'relearning'] as const

/** Làm tròn 4 chữ số thập phân — đủ chính xác, JSON gọn hơn (mỗi người có thể có hàng nghìn thẻ). */
const round4 = (value: number) => Math.round(value * 10_000) / 10_000

function toLibraryCard(card: SerializedFsrsCard, cardKey: string): LibraryCard {
  return {
    stability: card.stability,
    stabilityFast: card.stabilityFast,
    difficulty: card.difficulty,
    state: card.state,
    scheduleStatus: STATUS_BY_STATE[card.state],
    dueAt: new Date(card.due),
    lastReviewAt: card.lastReview ? new Date(card.lastReview) : null,
    cardId: cardKey, // key của thẻ là duy nhất -> dùng làm "hạt giống" cho fuzz
    reps: card.reps,
    lapses: card.lapses,
    scheduledDays: card.scheduledDays,
    learningStep: card.learningStep,
  } as LibraryCard
}

function fromLibraryCard(libraryCard: ReturnType<typeof scheduler.newCard>, extra: Pick<SerializedFsrsCard, 'addedOn' | 'firstReviewOn'>): SerializedFsrsCard {
  return {
    due: new Date(libraryCard.dueAt).toISOString(),
    stability: round4(libraryCard.stability),
    stabilityFast: round4(libraryCard.stabilityFast),
    difficulty: round4(libraryCard.difficulty),
    state: libraryCard.state as SerializedFsrsCard['state'],
    reps: libraryCard.reps,
    lapses: libraryCard.lapses,
    scheduledDays: libraryCard.scheduledDays,
    learningStep: libraryCard.learningStep,
    lastReview: libraryCard.lastReviewAt ? new Date(libraryCard.lastReviewAt).toISOString() : null,
    ...extra,
  }
}

/* ============================================================================
 * 3. TẠO THẺ / ÔN THẺ
 * ========================================================================== */

export type SrsRating = 'again' | 'hard' | 'good' | 'easy'

const LIBRARY_RATING: Record<SrsRating, Grade> = {
  again: Rating.Again,
  hard: Rating.Hard,
  good: Rating.Good,
  easy: Rating.Easy,
}

/**
 * Thẻ mới (chưa ôn lần nào).
 * @param dueAt lúc bắt đầu được đưa vào hàng ôn (mặc định: ngay bây giờ)
 */
export function createSrsCard(now = new Date(), dueAt: Date = now): SerializedFsrsCard {
  const card = fromLibraryCard(scheduler.newCard({ now }), { addedOn: todayString(now) })
  return { ...card, due: dueAt.toISOString() }
}

/** Ôn 1 thẻ: trả về thẻ mới với lịch ôn tiếp theo (không sửa thẻ cũ). */
export function reviewCard(card: SerializedFsrsCard, rating: SrsRating, cardKey: string, now = new Date()): SerializedFsrsCard {
  // Ôn sớm (thẻ hẹn ngày mai mà ôn hôm nay) thì thư viện vẫn chấp nhận. Nhưng nếu "lần ôn trước" nằm
  // SAU thời điểm hiện tại (đồng hồ 2 máy lệch nhau, dữ liệu cũ lạ) thư viện sẽ báo lỗi -> kéo về `now`.
  const lastReview = card.lastReview && new Date(card.lastReview).getTime() > now.getTime() ? now.toISOString() : card.lastReview
  const extra = { addedOn: card.addedOn || todayString(now), firstReviewOn: card.firstReviewOn ?? todayString(now) }
  try {
    const result = scheduler.review({ card: toLibraryCard({ ...card, lastReview }, cardKey), grade: LIBRARY_RATING[rating], now })
    return fromLibraryCard(result.card, extra)
  } catch {
    // thẻ hỏng (VD ngày giờ không đọc được): làm lại như thẻ mới để người học không bị kẹt
    const result = scheduler.review({ card: scheduler.newCard({ now }), grade: LIBRARY_RATING[rating], now })
    return fromLibraryCard(result.card, extra)
  }
}

/**
 * Chuyển 1 thẻ Leitner của tiến độ v1 sang thẻ FSRS (dùng khi nâng cấp dữ liệu).
 * Hộp càng cao = đã nhớ càng lâu -> độ bền (stability) ước lượng bằng khoảng ôn của hộp đó.
 *   hộp 0 -> thẻ mới;  hộp 1..5 -> đang ôn, stability ≈ 1 / 3 / 7 / 14 / 30 ngày
 */
const LEITNER_INTERVAL_DAYS = [0, 1, 3, 7, 14, 30]
export function srsCardFromLeitnerBox(box: number, dueDate: string): SerializedFsrsCard {
  const safeBox = Math.max(0, Math.min(5, Math.floor(box || 0)))
  const due = new Date(dueDate + 'T08:00:00')
  const dueIso = isNaN(due.getTime()) ? new Date().toISOString() : due.toISOString()
  const today = todayString()
  if (safeBox === 0) {
    return {
      due: dueIso,
      stability: 0,
      stabilityFast: 0,
      difficulty: 0,
      state: 0,
      reps: 0,
      lapses: 0,
      scheduledDays: 0,
      learningStep: 0,
      lastReview: null,
      addedOn: today,
    }
  }
  const interval = LEITNER_INTERVAL_DAYS[safeBox]
  // lần ôn trước = ngày đến hạn - khoảng của hộp (không được ở tương lai)
  const lastReview = new Date(Math.min(new Date(dueIso).getTime() - interval * 86_400_000, Date.now()))
  return {
    due: dueIso,
    stability: interval,
    stabilityFast: interval,
    difficulty: 5, // độ khó trung bình (không có dữ liệu cũ)
    state: 2,
    reps: safeBox,
    lapses: 0,
    scheduledDays: interval,
    learningStep: 0,
    lastReview: lastReview.toISOString(),
    addedOn: today,
    firstReviewOn: todayString(lastReview),
  }
}

/* ============================================================================
 * 4. TRẠNG THÁI THẺ
 * ========================================================================== */

export const isNewCard = (card: SerializedFsrsCard) => card.state === 0
export const isCardDue = (card: SerializedFsrsCard, now = new Date()) => new Date(card.due).getTime() <= now.getTime()

/** Nhãn cho Sổ từ vựng: mới / đang học / đang ôn / nhớ chắc. */
export type CardMemoryLabel = 'new' | 'learning' | 'reviewing' | 'known'
export function cardMemoryLabel(card: SerializedFsrsCard): CardMemoryLabel {
  if (card.state === 0) return 'new'
  if (card.state === 1 || card.state === 3) return 'learning'
  return card.stability >= KNOWN_STABILITY_DAYS ? 'known' : 'reviewing'
}

/* ============================================================================
 * 5. LUẬT THEO NGƯỜI HỌC: số nút, số thẻ mới / ngày
 * ========================================================================== */

/** Số nút khi ôn: người học tự chọn, nếu không: level-3 = 4 nút, còn lại 2 nút. */
export function srsButtonModeFor(progress: LearningProgress): 2 | 4 {
  if (progress.profile.srsButtons) return progress.profile.srsButtons
  const level = progress.currentLevel[progress.profile.track]
  return level === 'level-3' ? 4 : 2
}

/** Các mức chấm ứng với từng nút (theo thứ tự hiển thị trái -> phải). */
export function ratingsForButtonMode(mode: 2 | 4): SrsRating[] {
  return mode === 2 ? ['again', 'good'] : ['again', 'hard', 'good', 'easy']
}

/** Hệ thống tự chấm (bài gõ / chọn): sai -> Again; đúng nhưng chậm > 10s hoặc dùng gợi ý -> Hard; đúng -> Good. */
export function autoRating(correct: boolean, options: { seconds?: number; usedHint?: boolean } = {}): SrsRating {
  if (!correct) return 'again'
  if (options.usedHint || (options.seconds ?? 0) > 10) return 'hard'
  return 'good'
}

/** Số thẻ MỚI được mở mỗi ngày (psych-adult D1). */
export function newCardsPerDayLimit(progress: LearningProgress): number {
  const level = progress.currentLevel[progress.profile.track]
  return level === 'level-1' ? 5 : level === 'level-2' ? 10 : 15
}

/* ============================================================================
 * 6. HÀNG ĐỢI ÔN HÔM NAY
 * ========================================================================== */

export interface SrsQueueItem {
  key: string
  card: SerializedFsrsCard
  isNew: boolean
}

export interface SrsQueueInfo {
  /** Thẻ đã đến hạn (không tính thẻ mới) */
  dueReviews: number
  /** Thẻ mới còn trong kho (chưa ôn lần nào) */
  newWaiting: number
  /** Thẻ mới đã mở hôm nay / giới hạn */
  newOpenedToday: number
  newLimitToday: number
  /** Nợ ôn quá nhiều -> tạm dừng thẻ mới */
  backlogPaused: boolean
  /** Số lượt ôn còn lại trong ngày */
  reviewsLeftToday: number
  /** Tổng số thẻ sẽ có trong phiên ôn bây giờ (= độ dài dueCards) */
  sessionSize: number
}

function countReviewedToday(progress: LearningProgress, today: string): number {
  let count = 0
  for (const card of Object.values(progress.srs)) if (card.lastReview && todayString(new Date(card.lastReview)) === today) count++
  return count
}

/**
 * Danh sách thẻ cần ôn BÂY GIỜ: thẻ đến hạn trước (quá hạn lâu nhất lên đầu),
 * sau đó thẻ mới (cũ nhất trước) trong giới hạn thẻ mới của ngày.
 */
export function dueCards(progress: LearningProgress, now = new Date()): SrsQueueItem[] {
  const today = todayString(now)
  const reviews: SrsQueueItem[] = []
  const newCards: SrsQueueItem[] = []
  for (const [key, card] of Object.entries(progress.srs)) {
    if (!isCardDue(card, now)) continue
    if (isNewCard(card)) newCards.push({ key, card, isNew: true })
    else reviews.push({ key, card, isNew: false })
  }
  reviews.sort((a, b) => a.card.due.localeCompare(b.card.due))
  newCards.sort((a, b) => a.card.addedOn.localeCompare(b.card.addedOn) || a.card.due.localeCompare(b.card.due))

  const reviewsLeft = Math.max(0, MAX_REVIEWS_PER_DAY - countReviewedToday(progress, today))
  const backlogPaused = reviews.length > BACKLOG_PAUSE_THRESHOLD
  const newOpenedToday = Object.values(progress.srs).filter((card) => card.firstReviewOn === today).length
  const newAllowed = backlogPaused ? 0 : Math.max(0, newCardsPerDayLimit(progress) - newOpenedToday)

  const chosenReviews = reviews.slice(0, reviewsLeft)
  const chosenNew = newCards.slice(0, Math.min(newAllowed, Math.max(0, reviewsLeft - chosenReviews.length)))
  return [...chosenReviews, ...chosenNew]
}

/** Các con số tóm tắt cho màn hình (VD "12 thẻ cần ôn", "Tạm dừng thẻ mới"). */
export function srsQueueInfo(progress: LearningProgress, now = new Date()): SrsQueueInfo {
  const today = todayString(now)
  let dueReviews = 0
  let newWaiting = 0
  let newOpenedToday = 0
  for (const card of Object.values(progress.srs)) {
    if (isNewCard(card)) newWaiting++
    else if (isCardDue(card, now)) dueReviews++
    if (card.firstReviewOn === today) newOpenedToday++
  }
  return {
    dueReviews,
    newWaiting,
    newOpenedToday,
    newLimitToday: newCardsPerDayLimit(progress),
    backlogPaused: dueReviews > BACKLOG_PAUSE_THRESHOLD,
    reviewsLeftToday: Math.max(0, MAX_REVIEWS_PER_DAY - countReviewedToday(progress, today)),
    sessionSize: dueCards(progress, now).length,
  }
}

/** Đếm thẻ theo nhãn (sổ từ vựng). prefix "word:" = chỉ từ vựng. */
export function countCardsByLabel(progress: LearningProgress, prefix = 'word:'): Record<CardMemoryLabel, number> {
  const counts: Record<CardMemoryLabel, number> = { new: 0, learning: 0, reviewing: 0, known: 0 }
  for (const [key, card] of Object.entries(progress.srs)) if (key.startsWith(prefix)) counts[cardMemoryLabel(card)]++
  return counts
}
