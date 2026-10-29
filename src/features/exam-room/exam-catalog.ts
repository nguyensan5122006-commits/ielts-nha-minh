/**
 * exam-catalog.ts — DANH MỤC ĐỀ CỦA PHÒNG THI + LUẬT LÀM BÀI CỦA TỪNG ĐỀ (hàm thuần, không giao diện)
 * ----------------------------------------------------------------------------
 * Phòng thi đọc đề từ ALL_EXAMS (src/content/all-exams.ts). File này quyết định:
 *   1. Đề nào HIỆN trong danh sách /exams:
 *        - ẩn đề cũ đã có bản v3 thay thế: 'level-1-test', 'level-2-test' (thay bằng level-test-v3-*)
 *          và 'placement-test' (thay bằng bài xếp lớp thích ứng /start).
 *        - Đề cũ VẪN nằm trong ALL_EXAMS -> kết quả cũ trong "Lịch sử thi" vẫn mở được, link cũ vẫn chạy.
 *   2. LUẬT của mỗi lần làm (examRulesFor): có bấm giờ không, nghe mấy lần, được dừng/tua không…
 *        - Thi thử IELTS · "Thi thật": bấm giờ từng phần, mỗi Part nghe 1 lần, phát liền mạch như máy thi.
 *        - Thi thử IELTS · "Luyện tập": không giờ, nghe lại / tua / đổi tốc độ thoải mái, chọn phần muốn làm.
 *        - Test Level 1 (band 0–2.0): KHÔNG đồng hồ (psych-adult A15), nghe tối đa 2 lần, được dừng.
 *        - Test Level 2: bấm giờ, nghe tối đa 2 lần.  Test Level 3 (dạng IELTS): như thi thật.
 *   3. Vài con số tóm tắt cho thẻ đề (tổng phút, số câu, kỹ năng).
 * ----------------------------------------------------------------------------
 */
import { ALL_EXAMS, findExam } from '../../content/all-exams'
import type { Exam, ExamSection } from '../../content/content-types'

/** Đề cũ không hiện trong danh sách (vẫn mở được bằng link + kết quả cũ). */
export const HIDDEN_LEGACY_EXAM_IDS: ReadonlySet<string> = new Set(['placement-test', 'level-1-test', 'level-2-test'])

/** Cách làm bài: thi thật (giờ thật, nghe 1 lần) hoặc luyện tập (không giờ, chọn phần). */
export type ExamRunMode = 'exam' | 'practice'

export interface ExamRules {
  /** mỗi phần có đồng hồ đếm ngược (hết giờ tự nộp phần đó) */
  timed: boolean
  /** số lần được nghe mỗi Part (Infinity = không giới hạn) */
  listeningPlays: number
  /** được dừng / tua / đổi tốc độ khi nghe */
  audioControls: boolean
  /** phát các Part liền mạch tự động như máy thi (chỉ khi nghe 1 lần) — hết audio có 2 phút kiểm tra */
  autoPlayListening: boolean
  /** chip "Tối đa 2 từ" + cảnh báo gõ quá số từ */
  practiceHints: boolean
  /** cho chọn bớt phần (chỉ chế độ luyện tập của đề thi thử) */
  canPickSections: boolean
}

/** Thời gian kiểm tra lại sau khi hết audio phần Nghe (máy thi IELTS cho 2 phút). */
export const LISTENING_CHECK_SECONDS = 120

/** Luật làm bài của 1 đề theo chế độ đã chọn. */
export function examRulesFor(exam: Exam, mode: ExamRunMode): ExamRules {
  if (exam.kind === 'mock-ielts') {
    return mode === 'exam'
      ? { timed: true, listeningPlays: 1, audioControls: false, autoPlayListening: true, practiceHints: false, canPickSections: false }
      : { timed: false, listeningPlays: Infinity, audioControls: true, autoPlayListening: false, practiceHints: true, canPickSections: true }
  }
  if (exam.kind === 'level-test') {
    // Level 1 = band 0–2.0: không đồng hồ, nghe 2 lần, được dừng (người mới bắt đầu, cả các bé 9–11 tuổi)
    if (exam.levelId === 'level-1') return { timed: false, listeningPlays: 2, audioControls: true, autoPlayListening: false, practiceHints: true, canPickSections: false }
    if (exam.levelId === 'level-2') return { timed: true, listeningPlays: 2, audioControls: false, autoPlayListening: false, practiceHints: false, canPickSections: false }
    return { timed: true, listeningPlays: 1, audioControls: false, autoPlayListening: true, practiceHints: false, canPickSections: false }
  }
  // bài xếp lớp cũ (chỉ còn mở bằng link): không giờ, nghe 2 lần
  return { timed: false, listeningPlays: 2, audioControls: true, autoPlayListening: false, practiceHints: true, canPickSections: false }
}

/**
 * Nhãn chế độ trên đầu khung làm bài (ModeBadge):
 *   bài test cuối level -> "Kiểm tra" (không gọi là "Thi thật" — đó là chữ của đề thi thử IELTS)
 *   đề thi thử chế độ thi / có bấm giờ -> "Thi thật" · còn lại -> "Luyện tập"
 */
export function examBadgeMode(exam: Exam, mode: ExamRunMode, rules: ExamRules): 'exam' | 'practice' | 'test' {
  if (exam.kind === 'level-test') return 'test'
  return mode === 'exam' || rules.timed ? 'exam' : 'practice'
}

/** Đề này có cho chọn "Thi thật / Luyện tập" ở màn mở đầu không (chỉ đề thi thử IELTS). */
export const offersModeChoice = (exam: Exam) => exam.kind === 'mock-ielts'

/* ------------------------------------------------------------------ danh sách */

/** Các đề hiện trong danh sách /exams, giữ thứ tự của ALL_EXAMS. */
export function listedExams(): Exam[] {
  return ALL_EXAMS.filter((exam) => !HIDDEN_LEGACY_EXAM_IDS.has(exam.id))
}

export { findExam }

/* ------------------------------------------------------------------ con số tóm tắt */

/** Phần có câu tự chấm (Nghe / Đọc / Từ vựng). */
export const isObjectiveSection = (section: ExamSection) => section.skill === 'listening' || section.skill === 'reading' || section.skill === 'vocabulary'

/** Số câu tự chấm của 1 phần. */
export function sectionQuestionCount(section: ExamSection): number {
  return (section.parts ?? []).reduce((sum, part) => sum + part.questions.length, 0)
}

export interface ExamFacts {
  totalMinutes: number
  objectiveQuestions: number
  skills: ExamSection['skill'][]
}

export function examFacts(exam: Exam, sectionIndexes: number[] = exam.sections.map((_, index) => index)): ExamFacts {
  const sections = sectionIndexes.map((index) => exam.sections[index]).filter(Boolean)
  return {
    totalMinutes: sections.reduce((sum, section) => sum + section.durationMinutes, 0),
    objectiveQuestions: sections.filter(isObjectiveSection).reduce((sum, section) => sum + sectionQuestionCount(section), 0),
    skills: sections.map((section) => section.skill),
  }
}

/** Level của đề test level dạng số 1/2/3 (để vẽ LevelBadge). */
export function levelNumberOf(exam: Exam): 1 | 2 | 3 | null {
  const match = exam.levelId?.match(/level-(\d)/)
  const value = match ? Number(match[1]) : NaN
  return value === 1 || value === 2 || value === 3 ? value : null
}

/** Mã phần nhỏ (Part / Passage) để làm khoá lưu tô vàng, lượt nghe… */
export const partKey = (sectionIndex: number, partIndex: number) => `${sectionIndex}-${partIndex}`
