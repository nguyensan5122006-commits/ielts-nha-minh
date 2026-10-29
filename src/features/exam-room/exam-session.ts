/**
 * exam-session.ts — TRẠNG THÁI 1 LẦN LÀM ĐỀ + TỰ LƯU / LÀM TIẾP (đóng tab mở lại vẫn đúng chỗ)
 * ----------------------------------------------------------------------------
 * Đề thi KHÔNG dùng `progress.resume` (ô đó dành cho bài học — xem 10-EXAM-UI mục 5),
 * nên phòng thi tự giữ trạng thái làm dở trong localStorage của máy, khoá theo người dùng + đề:
 *     ielts-exam-room:<userId>:<examId>
 * Đây chỉ là "nháp lúc đang thi". Kết quả + tiến độ học sau khi nộp vẫn đi qua useProgress()
 * và /api/exam-results như mọi nơi khác (03-DATA-LAYER). Bài viết Writing còn được gửi lên
 * máy chủ qua saveDraft() để không mất khi đổi máy.
 *
 * Bản ghi âm Speaking quá nặng để lưu -> chỉ nằm trong bộ nhớ; tải lại trang giữa phần Nói
 * thì làm lại phần Nói (màn hình nói rõ điều này).
 * ----------------------------------------------------------------------------
 */
import { useCallback, useEffect, useRef, useState } from 'react'
import type { Exam } from '../../content/content-types'
import type { UserMark } from '../exam-ui/HighlightNotesLayer'
import type { ExamRunMode } from './exam-catalog'

/** Đang ở màn nào: tổng quan đề -> giới thiệu phần -> làm phần -> chấm bài. */
export type ExamStage = 'overview' | 'section-intro' | 'section' | 'grading'

/** Trạng thái nghe của 1 Part: đã nghe mấy lần, đang dừng ở giây thứ mấy, đã nghe hết chưa. */
export interface PartAudioState {
  plays: number
  position: number
  finished: boolean
}

export interface ExamSession {
  version: 1
  examId: string
  mode: ExamRunMode
  stage: ExamStage
  /** chỉ số các phần sẽ làm theo thứ tự (thi thật = tất cả; luyện tập chọn bớt được) */
  sectionOrder: number[]
  /** đang ở phần thứ mấy trong sectionOrder */
  step: number
  /** id câu hỏi / id task Writing -> câu trả lời (choice = số thứ tự phương án, TFNG = chữ, gap = chữ gõ) */
  answers: Record<string, string>
  /** câu gắn cờ "xem lại sau" */
  flags: string[]
  /** tô vàng + ghi chú, theo Part (khoá partKey) */
  marks: Record<string, UserMark[]>
  /** số giây còn lại của từng phần có bấm giờ (khoá = chỉ số phần) */
  secondsLeft: Record<string, number>
  /** trạng thái nghe theo Part (khoá partKey) */
  audio: Record<string, PartAudioState>
  /** phần Nghe kiểu máy thi: đã hết audio -> còn bao nhiêu giây kiểm tra (null = chưa tới lúc) */
  listeningCheckLeft: number | null
  /** câu đang xem của từng phần (khoá = chỉ số phần) */
  currentId: Record<string, string | null>
  /** người học chọn bỏ qua phần Nói (không có micro…) */
  speakingSkipped: boolean
  /** thời gian làm thật của từng phần (giây) */
  spentSeconds: Record<string, number>
  startedAt: string
  updatedAt: string
}

export function createExamSession(exam: Exam, mode: ExamRunMode = 'exam'): ExamSession {
  const now = new Date().toISOString()
  return {
    version: 1,
    examId: exam.id,
    mode,
    stage: 'overview',
    sectionOrder: exam.sections.map((_, index) => index),
    step: 0,
    answers: {},
    flags: [],
    marks: {},
    secondsLeft: {},
    audio: {},
    listeningCheckLeft: null,
    currentId: {},
    speakingSkipped: false,
    spentSeconds: {},
    startedAt: now,
    updatedAt: now,
  }
}

/** Đã bắt đầu làm thật chưa (qua màn tổng quan)? Dùng để hiện "Làm tiếp" ở danh sách đề. */
export const hasStarted = (session: ExamSession | null): session is ExamSession => !!session && session.stage !== 'overview'

/* ============================================================================
 * LƯU TRONG MÁY (localStorage) — mọi lệnh đều bọc try/catch (chế độ ẩn danh, đầy bộ nhớ…)
 * ========================================================================== */

const KEY_PREFIX = 'ielts-exam-room:'
const storageKey = (userId: number | string, examId: string) => `${KEY_PREFIX}${userId}:${examId}`

export function loadExamSession(userId: number | string, exam: Exam): ExamSession | null {
  try {
    const raw = localStorage.getItem(storageKey(userId, exam.id))
    if (!raw) return null
    const parsed = JSON.parse(raw) as ExamSession
    // dữ liệu hỏng / đề đã đổi số phần -> bỏ, làm lại từ đầu
    if (parsed?.version !== 1 || parsed.examId !== exam.id || !Array.isArray(parsed.sectionOrder)) return null
    if (parsed.sectionOrder.some((index) => !exam.sections[index])) return null
    return { ...createExamSession(exam, parsed.mode), ...parsed }
  } catch {
    return null
  }
}

export function saveExamSession(userId: number | string, session: ExamSession): boolean {
  try {
    localStorage.setItem(storageKey(userId, session.examId), JSON.stringify(session))
    return true
  } catch {
    return false
  }
}

export function clearExamSession(userId: number | string, examId: string): void {
  try {
    localStorage.removeItem(storageKey(userId, examId))
  } catch {
    /* bỏ qua */
  }
}

/** Các đề đang làm dở của người dùng: examId -> phiên (cho danh sách /exams). */
export function listStartedSessions(userId: number | string): Record<string, ExamSession> {
  const found: Record<string, ExamSession> = {}
  try {
    const prefix = `${KEY_PREFIX}${userId}:`
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i)
      if (!key?.startsWith(prefix)) continue
      const parsed = JSON.parse(localStorage.getItem(key) ?? 'null') as ExamSession | null
      if (parsed?.version === 1 && hasStarted(parsed)) found[parsed.examId] = parsed
    }
  } catch {
    /* bỏ qua */
  }
  return found
}

/* ============================================================================
 * HOOK: giữ phiên trong React + tự lưu
 *   - thay đổi thường (gõ chữ, chọn đáp án): lưu sau 400 ms im lặng
 *   - đổi màn / nộp phần: lưu ngay (immediate = true)
 *   - ẩn tab / đóng trang: lưu ngay bản đang chờ
 * ========================================================================== */

export type SaveState = 'saved' | 'saving' | 'local-error'

export function useExamSession(userId: number | string, exam: Exam) {
  const [session, setSession] = useState<ExamSession>(() => loadExamSession(userId, exam) ?? createExamSession(exam))
  const [saveState, setSaveState] = useState<SaveState>('saved')
  const latest = useRef(session)
  const timer = useRef<number | undefined>(undefined)

  const persist = useCallback(() => {
    window.clearTimeout(timer.current)
    timer.current = undefined
    setSaveState(saveExamSession(userId, latest.current) ? 'saved' : 'local-error')
  }, [userId])

  /**
   * Gộp thay đổi vào phiên. Truyền hàm để tính từ bản mới nhất (an toàn khi gọi liên tiếp).
   * immediate = lưu ngay · quiet = thay đổi chạy ngầm (đồng hồ, vị trí audio…) -> không nháy chữ "Đang lưu…".
   */
  const update = useCallback(
    (change: Partial<ExamSession> | ((current: ExamSession) => Partial<ExamSession>), immediate = false, quiet = false) => {
      const patch = typeof change === 'function' ? change(latest.current) : change
      const next = { ...latest.current, ...patch, updatedAt: new Date().toISOString() }
      latest.current = next
      setSession(next)
      if (immediate) persist()
      else {
        if (!quiet) setSaveState('saving')
        window.clearTimeout(timer.current)
        timer.current = window.setTimeout(persist, 400)
      }
    },
    [persist],
  )

  /** Bắt đầu lại từ đầu (xoá bản làm dở). */
  const reset = useCallback(
    (mode: ExamRunMode = latest.current.mode) => {
      const fresh = createExamSession(exam, mode)
      latest.current = fresh
      setSession(fresh)
      clearExamSession(userId, exam.id)
    },
    [exam, userId],
  )

  /** Nộp xong -> xoá bản làm dở khỏi máy. */
  const discard = useCallback(() => {
    window.clearTimeout(timer.current)
    timer.current = undefined
    clearExamSession(userId, exam.id)
  }, [exam.id, userId])

  // ẩn tab / đóng trang -> lưu ngay phần đang chờ
  useEffect(() => {
    const flush = () => {
      if (timer.current !== undefined) persist()
    }
    const onVisibility = () => document.visibilityState === 'hidden' && flush()
    window.addEventListener('pagehide', flush)
    document.addEventListener('visibilitychange', onVisibility)
    return () => {
      window.removeEventListener('pagehide', flush)
      document.removeEventListener('visibilitychange', onVisibility)
      flush()
    }
  }, [persist])

  return { session, update, reset, discard, saveState, latest }
}

export type ExamSessionHandle = ReturnType<typeof useExamSession>
