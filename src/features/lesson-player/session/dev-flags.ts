/**
 * dev-flags.ts — CÔNG CỤ CHỈ DÙNG KHI PHÁT TRIỂN (npm run dev): NHẢY TỚI CÂU BẤT KỲ
 * ----------------------------------------------------------------------------
 * Thêm vào đường dẫn bài học (bản build thật bỏ qua hết các cờ này):
 *   /lesson/l1-vocab-01?devFresh=1            làm lại từ đầu (bỏ chỗ đang dở)
 *   /lesson/l1-vocab-01?devStep=4             nhảy tới bước thứ 4 (đếm từ 0, gồm cả thẻ dạy)
 *   /lesson/l1-vocab-01?devItem=l1-vocab-01-ex04   nhảy tới đúng 1 bài tập
 *   /lesson/l2b-g-01-listen?devTask=1         nhảy thẳng tới task kỹ năng
 *   /lesson/l1-vocab-01?devResults=1          giả lập làm xong bài (vài câu sai) -> màn kết quả
 *   /lesson/l1-vocab-01?devRetry=1            giả lập 2 câu sai -> nhảy tới phần "Câu sai lúc nãy"
 * Danh sách mọi bài + link nhảy nhanh: trang /dev/lessons (chỉ có khi dev).
 * ----------------------------------------------------------------------------
 */
import type { Lesson } from '../../../content/content-types'
import { correctAnswerOf, questionTextOf } from '../exercises/exercise-contract'
import type { SessionState } from './lesson-session'

export interface DevFlags {
  fresh: boolean
  step: number | null
  item: string | null
  task: boolean
  results: boolean
  retry: boolean
}

const OFF: DevFlags = { fresh: false, step: null, item: null, task: false, results: false, retry: false }

export const DEV_TOOLS_ENABLED = import.meta.env.DEV

export function readDevFlags(params: URLSearchParams): DevFlags {
  if (!DEV_TOOLS_ENABLED) return OFF
  const step = params.get('devStep')
  const flags: DevFlags = {
    fresh: params.has('devFresh'),
    step: step !== null && Number.isFinite(Number(step)) ? Number(step) : null,
    item: params.get('devItem'),
    task: params.has('devTask'),
    results: params.has('devResults'),
    retry: params.has('devRetry'),
  }
  // nhảy tới đâu đó = tự hiểu là làm mới
  if (flags.step !== null || flags.item || flags.task || flags.results || flags.retry) flags.fresh = true
  return flags
}

export function isDevJump(flags: DevFlags): boolean {
  return flags.step !== null || !!flags.item || flags.task || flags.results || flags.retry
}

/** Áp cờ nhảy vào phiên học vừa tạo. */
export function applyDevJump(state: SessionState, flags: DevFlags, lesson: Lesson): SessionState {
  if (!isDevJump(flags)) return state
  if (flags.results || flags.retry) return simulateAnswers(state, lesson, flags.retry)
  let stepIndex = state.stepIndex
  if (flags.item) stepIndex = state.queue.indexOf(`ex:${flags.item}`)
  else if (flags.task) stepIndex = state.queue.findIndex((key) => key.startsWith('task:'))
  else if (flags.step !== null) stepIndex = flags.step
  return { ...state, stepIndex: Math.max(0, Math.min(stepIndex, state.queue.length - 1)) }
}

/** Giả lập đã làm hết bài: mỗi câu thứ 4 sai lần đầu (để xem "Câu cần ôn"). */
function simulateAnswers(state: SessionState, lesson: Lesson, stopAtRetries: boolean): SessionState {
  const items: SessionState['items'] = {}
  const retries: string[] = []
  lesson.exercises.forEach((exercise, index) => {
    const wrong = index % 4 === 1
    items[exercise.id] = {
      attempts: wrong ? 2 : 1,
      firstTry: wrong ? 'wrong' : 'correct',
      lastVerdict: wrong && !stopAtRetries ? (index % 8 === 1 ? 'correct' : 'wrong') : 'correct',
      hintsMax: index === 2 ? 1 : 0,
      sawSolution: false,
      settled: !(wrong && stopAtRetries),
      ...(wrong ? { question: questionTextOf(exercise), userAnswer: '…', correctAnswer: correctAnswerOf(exercise) } : {}),
    }
    if (wrong) retries.push(`retry:${exercise.id}:1`)
  })
  const queue = [...state.queue, ...retries]
  const firstRetry = state.queue.length
  return {
    ...state,
    queue,
    items,
    taskResult: state.queue.some((key) => key.startsWith('task:')) ? { correct: 3, total: 4 } : null,
    meta: { ...state.meta, activeMs: 4.4 * 60_000, combo: 0, bestCombo: 4 },
    stepIndex: stopAtRetries ? firstRetry : queue.length,
  }
}
