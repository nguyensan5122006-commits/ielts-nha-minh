/**
 * use-task-session.ts
 * ----------------------------------------------------------------------------
 * "BỘ NHỚ" CỦA 1 LẦN LÀM TASK Listening/Reading (hook React, không vẽ gì).
 *
 *   const session = useTaskSession(resumeData, onSaveResume, { defaultMode: 'practice' })
 *   session.state.answers / flags / phase / mode / marks / secondsLeft / replaysUsed
 *   session.setAnswer(id, value) · toggleFlag(id) · start(mode) · submit() · retryWrong(ids) · patch({...})
 *
 * - Trạng thái là JSON thuần -> đưa thẳng vào onSaveResume (trình học gói vào progress.resume).
 * - Tự lưu: gõ chữ thì đợi 600ms im lặng mới lưu; đổi pha (bắt đầu / nộp) thì lưu ngay.
 * - Đếm thời gian làm bài THẬT (chỉ khi tab đang mở và đang làm) -> số phút học.
 * Dữ liệu lưu có `version` để sau này đổi cấu trúc vẫn đọc được bản cũ.
 * ----------------------------------------------------------------------------
 */
import { useCallback, useEffect, useRef, useState } from 'react'
import type { UserMark } from './HighlightNotesLayer'

export type TaskPhase = 'intro' | 'answering' | 'review'
export type TaskMode = 'practice' | 'exam'

export interface TaskSessionState {
  version: 1
  phase: TaskPhase
  mode: TaskMode
  answers: Record<string, string>
  flags: string[]
  /** tô vàng + ghi chú (Reading; Listening dùng cho lời thoại sau khi nộp) */
  marks: UserMark[]
  /** thi thật: số giây còn lại (để mở lại bài vẫn đúng giờ) */
  secondsLeft: number | null
  /** Listening: số lần đã phát mỗi đoạn */
  replaysUsed: Record<string, number>
  /** số giây đã làm bài thật sự */
  activeSeconds: number
  /** câu đang xem (mở lại bài quay về đúng câu) */
  currentId: string | null
  /** "Làm lại câu sai": chỉ các câu này được sửa */
  retryIds: string[] | null
  /** số lần nộp (lần 2 trở đi là làm lại câu sai — không ghi tiến độ 2 lần) */
  submitCount: number
  /** điểm LẦN NỘP ĐẦU (band ước tính + kết quả báo trình học tính theo lần này) */
  firstScore: { correct: number; total: number; mode: TaskMode } | null
  /** đã báo xong cho trình học (onComplete) chưa */
  completed: boolean
}

export function createTaskSession(mode: TaskMode = 'practice'): TaskSessionState {
  return {
    version: 1,
    phase: 'intro',
    mode,
    answers: {},
    flags: [],
    marks: [],
    secondsLeft: null,
    replaysUsed: {},
    activeSeconds: 0,
    currentId: null,
    retryIds: null,
    submitCount: 0,
    firstScore: null,
    completed: false,
  }
}

/** Đọc dữ liệu resume (có thể là bất cứ thứ gì) -> trạng thái hợp lệ. */
export function readTaskSession(raw: unknown, fallbackMode: TaskMode): TaskSessionState {
  const base = createTaskSession(fallbackMode)
  if (!raw || typeof raw !== 'object') return base
  const saved = raw as Partial<TaskSessionState>
  if (saved.version !== 1) return base
  return {
    ...base,
    ...saved,
    answers: saved.answers && typeof saved.answers === 'object' ? saved.answers : {},
    flags: Array.isArray(saved.flags) ? saved.flags : [],
    marks: Array.isArray(saved.marks) ? saved.marks : [],
    replaysUsed: saved.replaysUsed && typeof saved.replaysUsed === 'object' ? saved.replaysUsed : {},
  }
}

const TEXT_SAVE_DELAY_MS = 600
const ACTIVE_TICK_SECONDS = 5

export function useTaskSession(resumeData: unknown, onSaveResume: (data: unknown) => void, options: { defaultMode?: TaskMode } = {}) {
  const [state, setState] = useState<TaskSessionState>(() => readTaskSession(resumeData, options.defaultMode ?? 'practice'))
  const stateRef = useRef(state)
  stateRef.current = state
  const saveRef = useRef(onSaveResume)
  saveRef.current = onSaveResume
  const timer = useRef<number | undefined>(undefined)

  const saveNow = useCallback(() => {
    window.clearTimeout(timer.current)
    saveRef.current(stateRef.current)
  }, [])

  /** đổi trạng thái; immediate = lưu ngay (đổi pha), không thì lưu sau 600ms im lặng */
  const update = useCallback(
    (change: (current: TaskSessionState) => TaskSessionState, immediate = false) => {
      // tính bản mới NGAY từ bản mới nhất (ref) để lưu được liền, không chờ React vẽ lại
      const next = change(stateRef.current)
      stateRef.current = next
      setState(next)
      window.clearTimeout(timer.current)
      if (immediate) saveRef.current(stateRef.current)
      else timer.current = window.setTimeout(() => saveRef.current(stateRef.current), TEXT_SAVE_DELAY_MS)
    },
    [],
  )

  // rời trang / unmount: lưu phần còn chờ
  useEffect(() => () => window.clearTimeout(timer.current), [])

  // đếm thời gian làm bài thật (tab đang hiện + đang làm)
  useEffect(() => {
    if (state.phase !== 'answering') return
    const id = window.setInterval(() => {
      if (document.visibilityState !== 'visible') return
      const next = { ...stateRef.current, activeSeconds: stateRef.current.activeSeconds + ACTIVE_TICK_SECONDS }
      stateRef.current = next
      setState(next)
    }, ACTIVE_TICK_SECONDS * 1000)
    return () => window.clearInterval(id)
  }, [state.phase])

  const setAnswer = useCallback(
    (questionId: string, value: string) => update((current) => ({ ...current, answers: { ...current.answers, [questionId]: value }, currentId: questionId }), false),
    [update],
  )
  const toggleFlag = useCallback(
    (questionId: string) =>
      update((current) => ({ ...current, flags: current.flags.includes(questionId) ? current.flags.filter((id) => id !== questionId) : [...current.flags, questionId] }), true),
    [update],
  )
  const setCurrent = useCallback((questionId: string) => {
    if (stateRef.current.currentId === questionId) return
    update((current) => ({ ...current, currentId: questionId }))
  }, [update])
  const start = useCallback(
    (mode: TaskMode, examSeconds: number | null) => update((current) => ({ ...current, phase: 'answering', mode, secondsLeft: mode === 'exam' ? (current.secondsLeft ?? examSeconds) : null }), true),
    [update],
  )
  /** Nộp bài. `score` = điểm lần nộp này (chỉ lần đầu được giữ làm firstScore). */
  const submit = useCallback(
    (score: { correct: number; total: number }) =>
      update(
        (current) => ({
          ...current,
          phase: 'review',
          submitCount: current.submitCount + 1,
          retryIds: null,
          firstScore: current.firstScore ?? { ...score, mode: current.mode },
        }),
        true,
      ),
    [update],
  )
  /** Làm lại câu sai: xoá đáp án các câu đó, quay về làm bài (chế độ luyện tập) */
  const retryWrong = useCallback(
    (questionIds: string[]) =>
      update((current) => {
        const answers = { ...current.answers }
        for (const id of questionIds) delete answers[id]
        return { ...current, phase: 'answering', mode: 'practice', answers, retryIds: questionIds, currentId: questionIds[0] ?? null, secondsLeft: null }
      }, true),
    [update],
  )
  const patch = useCallback((values: Partial<TaskSessionState>, immediate = false) => update((current) => ({ ...current, ...values }), immediate), [update])

  return { state, setAnswer, toggleFlag, setCurrent, start, submit, retryWrong, patch, saveNow }
}
