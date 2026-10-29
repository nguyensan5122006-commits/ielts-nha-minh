/**
 * lesson-session.ts — "BỘ NÃO" CỦA 1 BUỔI HỌC (hàm thuần, không React)
 * ----------------------------------------------------------------------------
 * 1 buổi học = 1 HÀNG ĐỢI các bước (queue), đi lần lượt bằng `stepIndex`:
 *
 *     'card:0'  'card:1'  'words'  'ex:<id>' …  'task:listening'   'retry:<id>:1' …
 *      └── thẻ dạy (≤ 3) ─┘ từ mới  └ bài tập ┘  └ task kỹ năng ┘   └ câu sai làm lại (nhãn "Câu sai lúc nãy")
 *
 * - Trả lời sai -> thêm 'retry:<id>:<lần>' vào CUỐI hàng đợi (tối đa 2 lần/câu
 *   để không bị kẹt mãi). Đã có task kỹ năng thì câu sai tự nằm sau task.
 * - Mỗi bài tập có 1 `ItemRecord`: lần đầu đúng/sai, dùng gợi ý tới nấc mấy,
 *   đã "xong" chưa… -> tính độ chính xác, XP, danh sách câu cần ôn.
 * - Toàn bộ trạng thái chuyển qua lại với `progress.resume` (03-DATA-LAYER):
 *     { lessonId, stepIndex, queue, answers }
 *   `answers` chứa: answers[<exerciseId>] = ItemRecord, cùng vài khoá đặc biệt
 *   bắt đầu bằng "$": $meta (thời gian, chuỗi đúng), $task (chỗ dở của task kỹ năng),
 *   $taskResult (kết quả task). Nhờ vậy mở lại bài là về ĐÚNG câu đang làm.
 * ----------------------------------------------------------------------------
 */
import type { Exercise, Lesson } from '../../../content/content-types'
import type { LessonResume } from '../../../learning-progress/progress-types'
import { AI_GRADED_TYPES, type CheckOutcome, type Verdict } from '../exercises/exercise-contract'
import type { HintLevel } from '../exercises/hint-ladder'
import type { SkillTaskMode, SkillTaskResult } from '../skill-task-registry'

/** Thẻ dạy tối đa (spec: ≤ 3) */
export const MAX_TEACHING_CARDS = 3
/** 1 câu sai được làm lại tối đa mấy lần ở cuối bài */
export const MAX_RETRIES_PER_ITEM = 2
/** Khoảng lặng dài nhất còn tính là "đang học" (đọc câu, suy nghĩ) */
const MAX_ACTIVE_GAP_MS = 90_000

/* ================================ KIỂU ================================ */

export type ParsedStep =
  | { kind: 'card'; index: number }
  | { kind: 'words' }
  | { kind: 'exercise'; exerciseId: string; retry: number }
  | { kind: 'task'; mode: SkillTaskMode }

export interface ItemRecord {
  /** số lần đã bấm Kiểm tra (kể cả các lần làm lại) */
  attempts: number
  /** kết quả lần ĐẦU (null = chưa trả lời) */
  firstTry: Verdict | null
  /** kết quả lần gần nhất */
  lastVerdict: Verdict | null
  /** nấc gợi ý cao nhất đã dùng (3 = xem lời giải) */
  hintsMax: HintLevel
  /** đã xem lời giải ở lần nào đó */
  sawSolution: boolean
  /** câu đã "xong": đúng, hoặc hết lượt làm lại, hoặc không tính điểm (bài nói không nghe rõ) */
  settled: boolean
  /** lần sai đầu tiên: để hiện ở "Câu cần ôn" */
  question?: string
  userAnswer?: string
  correctAnswer?: string
}

export interface SessionMeta {
  startedAt: string
  /** thời gian học thật (ms) — khoảng lặng > 90 giây chỉ tính 90 giây */
  activeMs: number
  /** mốc tương tác gần nhất (ms từ 1970) */
  lastAt: number
  /** số câu đúng liên tiếp hiện tại / cao nhất */
  combo: number
  bestCombo: number
}

export interface SessionState {
  queue: string[]
  stepIndex: number
  items: Record<string, ItemRecord>
  meta: SessionMeta
  /** chỗ dở của task kỹ năng (player tự định dạng) */
  taskResume: unknown | null
  taskResult: SkillTaskResult | null
}

/* ============================ HÀNG ĐỢI BƯỚC ============================ */

export function parseStep(key: string): ParsedStep | null {
  if (key === 'words') return { kind: 'words' }
  const [kind, ...rest] = key.split(':')
  if (kind === 'card') return { kind: 'card', index: Number(rest[0]) || 0 }
  if (kind === 'ex') return { kind: 'exercise', exerciseId: rest.join(':'), retry: 0 }
  if (kind === 'retry') {
    const retry = Number(rest.at(-1)) || 1
    return { kind: 'exercise', exerciseId: rest.slice(0, -1).join(':'), retry }
  }
  if (kind === 'task') return { kind: 'task', mode: rest[0] as SkillTaskMode }
  return null
}

/** Hàng đợi ban đầu của 1 bài. */
export function buildInitialQueue(lesson: Lesson, taskMode: SkillTaskMode | null): string[] {
  const cards = lesson.teachingCards.slice(0, MAX_TEACHING_CARDS).map((_, index) => `card:${index}`)
  const words = lesson.words?.length ? ['words'] : []
  const exercises = lesson.exercises.map((exercise) => `ex:${exercise.id}`)
  const task = taskMode ? [`task:${taskMode}`] : []
  return [...cards, ...words, ...exercises, ...task]
}

/** Bỏ các bước không còn tồn tại (nội dung bài vừa được sửa) — mở lại không bị lỗi. */
function sanitizeQueue(queue: string[], lesson: Lesson, taskMode: SkillTaskMode | null): string[] {
  const exerciseIds = new Set(lesson.exercises.map((exercise) => exercise.id))
  return queue.filter((key) => {
    const step = parseStep(key)
    if (!step) return false
    if (step.kind === 'card') return step.index < Math.min(MAX_TEACHING_CARDS, lesson.teachingCards.length)
    if (step.kind === 'words') return !!lesson.words?.length
    if (step.kind === 'exercise') return exerciseIds.has(step.exerciseId)
    return step.mode === taskMode
  })
}

export function createSession(lesson: Lesson, taskMode: SkillTaskMode | null, now = Date.now()): SessionState {
  return {
    queue: buildInitialQueue(lesson, taskMode),
    stepIndex: 0,
    items: {},
    meta: { startedAt: new Date(now).toISOString(), activeMs: 0, lastAt: now, combo: 0, bestCombo: 0 },
    taskResume: null,
    taskResult: null,
  }
}

/* ======================= CHUYỂN ĐỔI VỚI progress.resume ======================= */

export function toResume(lessonId: string, state: SessionState): Omit<LessonResume, 'updatedAt'> {
  const answers: Record<string, unknown> = { ...state.items, $meta: state.meta }
  if (state.taskResume !== null) answers.$task = state.taskResume
  if (state.taskResult) answers.$taskResult = state.taskResult
  return { lessonId, stepIndex: state.stepIndex, queue: state.queue, answers }
}

export function fromResume(resume: LessonResume, lesson: Lesson, taskMode: SkillTaskMode | null, now = Date.now()): SessionState {
  const fresh = createSession(lesson, taskMode, now)
  const queue = sanitizeQueue(resume.queue, lesson, taskMode)
  if (queue.length === 0) return fresh
  // bước đang làm có thể đã bị lọc -> giữ đúng vị trí tương đối
  const currentKey = resume.queue[resume.stepIndex]
  const foundIndex = currentKey ? queue.indexOf(currentKey) : -1
  const stepIndex = foundIndex >= 0 ? foundIndex : Math.min(resume.stepIndex, queue.length - 1)

  const items: Record<string, ItemRecord> = {}
  for (const [key, value] of Object.entries(resume.answers ?? {})) {
    if (key.startsWith('$') || !value || typeof value !== 'object') continue
    items[key] = value as ItemRecord
  }
  const savedMeta = (resume.answers?.$meta ?? null) as Partial<SessionMeta> | null
  return {
    queue,
    stepIndex,
    items,
    // mở lại sau nhiều giờ: lastAt = bây giờ (không cộng khoảng nghỉ vào thời gian học)
    meta: { ...fresh.meta, ...savedMeta, lastAt: now },
    taskResume: (resume.answers?.$task ?? null) as unknown,
    taskResult: (resume.answers?.$taskResult ?? null) as SkillTaskResult | null,
  }
}

/* ================================ HÀNH ĐỘNG ================================ */

/** Ghi nhận 1 tương tác: cộng thời gian học thật. */
export function touch(state: SessionState, now = Date.now()): SessionState {
  const gap = Math.max(0, now - state.meta.lastAt)
  return { ...state, meta: { ...state.meta, activeMs: state.meta.activeMs + Math.min(gap, MAX_ACTIVE_GAP_MS), lastAt: now } }
}

const EMPTY_RECORD: ItemRecord = { attempts: 0, firstTry: null, lastVerdict: null, hintsMax: 0, sawSolution: false, settled: false }

export function recordOf(state: SessionState, exerciseId: string): ItemRecord {
  return state.items[exerciseId] ?? EMPTY_RECORD
}

/**
 * Ghi kết quả 1 lần Kiểm tra.
 *  - đúng -> câu "xong", chuỗi đúng +1 (nếu không dùng gợi ý)
 *  - sai  -> thêm lượt làm lại vào cuối hàng đợi (nếu còn lượt), chuỗi đúng về 0
 *  - máy chưa nghe rõ (vàng) -> không tính đúng/sai, câu "xong", chuỗi giữ nguyên
 */
export function recordCheck(state: SessionState, exercise: Exercise, outcome: CheckOutcome, hintLevel: HintLevel, retry: number): SessionState {
  const previous = recordOf(state, exercise.id)
  const verdict = outcome.verdict
  const record: ItemRecord = {
    ...previous,
    attempts: previous.attempts + 1,
    // "máy chưa nghe rõ" không khoá kết quả lần đầu: nói lại mà rõ thì tính là đúng ngay
    firstTry: previous.firstTry === null || previous.firstTry === 'unclear' ? verdict : previous.firstTry,
    lastVerdict: verdict,
    hintsMax: Math.max(previous.hintsMax, hintLevel) as HintLevel,
    sawSolution: previous.sawSolution || !!outcome.sawSolution,
    settled: verdict !== 'wrong' || retry >= MAX_RETRIES_PER_ITEM,
  }
  if (verdict === 'wrong' && !previous.question) {
    record.question = outcome.questionText
    record.userAnswer = outcome.userAnswerText
    record.correctAnswer = outcome.correctAnswerText
  }

  let queue = state.queue
  if (verdict === 'wrong' && retry < MAX_RETRIES_PER_ITEM) queue = [...queue, `retry:${exercise.id}:${retry + 1}`]

  const cleanCorrect = verdict === 'correct' && hintLevel === 0 && !outcome.sawSolution
  const combo = verdict === 'unclear' ? state.meta.combo : cleanCorrect ? state.meta.combo + 1 : 0
  return {
    ...state,
    queue,
    items: { ...state.items, [exercise.id]: record },
    meta: { ...state.meta, combo, bestCombo: Math.max(state.meta.bestCombo, combo) },
  }
}

/** Sang bước kế tiếp. */
export function advance(state: SessionState): SessionState {
  return { ...state, stepIndex: state.stepIndex + 1 }
}

/** Lùi 1 bước (chỉ dùng giữa các thẻ dạy). */
export function goBack(state: SessionState): SessionState {
  return { ...state, stepIndex: Math.max(0, state.stepIndex - 1) }
}

/** Bỏ qua phần lý thuyết: nhảy tới bước bài tập đầu tiên. */
export function skipTheory(state: SessionState): SessionState {
  const firstPractice = state.queue.findIndex((key) => {
    const step = parseStep(key)
    return step?.kind === 'exercise' || step?.kind === 'task'
  })
  return firstPractice > state.stepIndex ? { ...state, stepIndex: firstPractice } : state
}

export function isFinished(state: SessionState): boolean {
  return state.stepIndex >= state.queue.length
}

/* ================================ THỐNG KÊ ================================ */

export interface SessionProgress {
  /** đơn vị đã xong / tổng (thẻ dạy + từ mới + bài tập + task) — cho thanh tiến độ */
  done: number
  total: number
  /** riêng bài tập (+ task tính 1 câu): "3/10 câu" */
  itemsDone: number
  itemsTotal: number
}

export function sessionProgress(state: SessionState): SessionProgress {
  let done = 0
  let total = 0
  let itemsDone = 0
  let itemsTotal = 0
  state.queue.forEach((key, index) => {
    const step = parseStep(key)
    if (!step || (step.kind === 'exercise' && step.retry > 0)) return // lượt làm lại không thêm "đơn vị"
    total++
    if (step.kind === 'card' || step.kind === 'words') {
      if (index < state.stepIndex) done++
      return
    }
    itemsTotal++
    const finished = step.kind === 'task' ? !!state.taskResult : !!state.items[step.exerciseId]?.settled
    if (finished) {
      done++
      itemsDone++
    }
  })
  return { done, total, itemsDone, itemsTotal }
}

export type ItemStatus = 'first-try' | 'later' | 'review' | 'unscored'

export interface ItemSummary {
  exercise: Exercise
  status: ItemStatus
  record: ItemRecord
}

export interface SessionSummary {
  /** số câu chấm được (không tính câu "không tính điểm") */
  graded: number
  /** đúng ngay lần đầu, không xem lời giải */
  firstTryCorrect: number
  /** đúng ngay lần đầu, không dùng gợi ý nào */
  firstTryClean: number
  /** đúng lần đầu nhưng nhờ gợi ý nấc 1–2 */
  hintedCorrect: number
  /** bài nói/viết AI đã hoàn thành */
  aiDone: number
  /** 0..1 */
  accuracy: number
  items: ItemSummary[]
  /** câu cần ôn: sai lần đầu hoặc xem lời giải (sắp xếp: chưa bao giờ đúng trước) */
  toReview: ItemSummary[]
  activeMinutes: number
  bestCombo: number
}

export function summarizeSession(state: SessionState, lesson: Lesson): SessionSummary {
  const items: ItemSummary[] = []
  let graded = 0
  let firstTryCorrect = 0
  let firstTryClean = 0
  let hintedCorrect = 0
  let aiDone = 0
  for (const exercise of lesson.exercises) {
    const record = state.items[exercise.id]
    if (!record || record.firstTry === null) continue
    let status: ItemStatus
    if (record.firstTry === 'unclear') status = 'unscored'
    else if (record.firstTry === 'correct' && !record.sawSolution) status = 'first-try'
    else if (record.lastVerdict === 'correct') status = 'later'
    else status = 'review'
    items.push({ exercise, status, record })

    if (record.firstTry === 'unclear') continue
    graded++
    if (record.firstTry === 'correct' && !record.sawSolution) {
      firstTryCorrect++
      if (AI_GRADED_TYPES.includes(exercise.type)) aiDone++
      else if (record.hintsMax === 0) firstTryClean++
      else hintedCorrect++
    }
  }
  const task = state.taskResult
  const totalGraded = graded + (task?.total ?? 0)
  const totalCorrect = firstTryCorrect + (task?.correct ?? 0)
  const toReview = items
    .filter((item) => item.status === 'review' || item.status === 'later')
    .sort((a, b) => (a.status === b.status ? 0 : a.status === 'review' ? -1 : 1))
  return {
    graded: totalGraded,
    firstTryCorrect: totalCorrect,
    firstTryClean,
    hintedCorrect,
    aiDone,
    accuracy: totalGraded > 0 ? totalCorrect / totalGraded : 1,
    items,
    toReview,
    activeMinutes: state.meta.activeMs / 60_000,
    bestCombo: state.meta.bestCombo,
  }
}

/** Câu đang làm là câu thứ mấy (đếm cả lượt làm lại) — để nói "học tiếp từ câu N". 0 = đang ở thẻ dạy. */
export function currentQuestionNumber(state: SessionState): number {
  return state.queue.slice(0, state.stepIndex + 1).filter((key) => {
    const step = parseStep(key)
    return step?.kind === 'exercise' || step?.kind === 'task'
  }).length
}
