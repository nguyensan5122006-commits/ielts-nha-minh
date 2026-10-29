/**
 * use-lesson.ts
 * ----------------------------------------------------------------------------
 * HOOK REACT: tải nội dung 1 bài học (bọc loadLesson của lesson-loader.ts).
 *
 *   const { lesson, status, retry } = useLesson(lessonId)
 *   status: 'loading'   -> hiện khung chờ (Skeleton)
 *           'ready'     -> lesson có nội dung đầy đủ
 *           'not-found' -> id không tồn tại (link sai) -> về /learn
 *           'error'     -> tải thất bại (mạng) -> nút "Thử lại" gọi retry()
 * Bài đã tải trước đó (VD rê chuột lên nút bài ở lộ trình) -> 'ready' ngay lần vẽ đầu.
 * ----------------------------------------------------------------------------
 */
import { useCallback, useEffect, useState } from 'react'
import type { Lesson } from './content-types'
import { getLoadedLesson, loadLesson } from './lesson-loader'

export type LessonLoadStatus = 'loading' | 'ready' | 'not-found' | 'error'

interface LessonState {
  lessonId: string | undefined
  lesson: Lesson | undefined
  status: LessonLoadStatus
}

function initialState(lessonId: string | undefined): LessonState {
  const cached = lessonId ? getLoadedLesson(lessonId) : undefined
  return { lessonId, lesson: cached, status: cached ? 'ready' : lessonId ? 'loading' : 'not-found' }
}

export function useLesson(lessonId: string | undefined): { lesson: Lesson | undefined; status: LessonLoadStatus; retry: () => void } {
  const [state, setState] = useState<LessonState>(() => initialState(lessonId))
  const [attempt, setAttempt] = useState(0)

  // đổi bài -> tính lại ngay trong lúc vẽ (không chờ effect, tránh nháy nội dung bài cũ)
  let current = state
  if (state.lessonId !== lessonId) {
    current = initialState(lessonId)
    setState(current)
  }

  useEffect(() => {
    if (!lessonId || getLoadedLesson(lessonId)) return
    let cancelled = false
    loadLesson(lessonId).then(
      (lesson) => !cancelled && setState({ lessonId, lesson, status: lesson ? 'ready' : 'not-found' }),
      () => !cancelled && setState({ lessonId, lesson: undefined, status: 'error' }),
    )
    return () => {
      cancelled = true
    }
  }, [lessonId, attempt])

  const retry = useCallback(() => {
    setState({ lessonId, lesson: undefined, status: 'loading' })
    setAttempt((n) => n + 1)
  }, [lessonId])

  return { lesson: current.lesson, status: current.status, retry }
}
