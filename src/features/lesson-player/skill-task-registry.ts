/**
 * skill-task-registry.ts — "BẢNG ĐĂNG KÝ" TRÌNH LUYỆN KỸ NĂNG CHO TRÌNH HỌC
 * ============================================================================
 *
 * Bài học có `lesson.mode` = 'listening' | 'reading' | 'writing' | 'speaking'
 * chạy theo luồng:
 *
 *    thẻ dạy (≤ 3)  →  bài tập khởi động  →  ★ TASK KỸ NĂNG ★  →  câu sai làm lại  →  kết quả
 *
 * Phần ★ do NHÓM KỸ NĂNG làm (skill-listening-reading, skill-writing-speaking).
 * Trình học (nhóm lesson-player) chỉ "nhường sân" cho component của bạn và nhận
 * lại kết quả. Hai bên nói chuyện qua HỢP ĐỒNG bên dưới — không import chéo gì khác.
 *
 * ----------------------------------------------------------------------------
 * 1. CÁCH ĐĂNG KÝ (2 bước, không cần sửa file của nhóm khác)
 * ----------------------------------------------------------------------------
 *   Tạo file  src/features/<thư-mục-nhóm-bạn>/register-skill-tasks.ts  (hoặc .tsx):
 *
 *     import { lazy } from 'react'
 *     import { registerSkillTask } from '../lesson-player/skill-task-registry'
 *
 *     // lazy(): chỉ tải code trình nghe khi người học tới phần task (web mở nhanh hơn)
 *     registerSkillTask('listening', lazy(() => import('./ListeningTaskPlayer')))
 *     registerSkillTask('reading',   lazy(() => import('./ReadingTaskPlayer')))
 *
 *   Trình học tự nạp MỌI file tên đúng `src/features/*\/register-skill-tasks.ts(x)`
 *   (xem skill-task-loader.ts — dùng import.meta.glob của Vite). Xong.
 *   Component lazy phải `export default`.
 *
 * ----------------------------------------------------------------------------
 * 2. PROPS component của bạn nhận được: `SkillTaskProps` (mục 3 trong code)
 * ----------------------------------------------------------------------------
 *   lesson        Toàn bộ bài học. Task nằm ở lesson.listeningTask / readingTask /
 *                 writingTask / speakingTask (kiểu trong src/content/content-types.ts).
 *   mode          'listening' | 'reading' | 'writing' | 'speaking' (= lesson.mode).
 *   resumeData    Thứ bạn đã đưa vào onSaveResume lần trước (người học thoát giữa
 *                 chừng rồi mở lại) — null nếu làm lần đầu. Dùng để quay về đúng câu.
 *   onSaveResume(data)
 *                 Gọi sau MỖI thao tác đáng lưu (trả lời 1 câu, đổi đoạn nghe, gõ nháp…).
 *                 `data` phải là JSON thuần (không hàm, không Date, < ~50KB).
 *                 Trình học gói nó vào progress.resume và tự gửi máy chủ (≤ 1,5 giây).
 *                 Nháp Writing dài: vẫn nên dùng useProgress().saveDraft như 03-DATA-LAYER.
 *   onComplete(result)
 *                 Gọi ĐÚNG 1 LẦN khi người học xong task (đã nộp + đã xem chữa).
 *                 Trình học chuyển sang phần "câu sai làm lại" rồi màn kết quả.
 *   onRequestExit()
 *                 Nếu player có nút thoát riêng thì gọi hàm này — trình học hiện hộp
 *                 thoại "Đã lưu chỗ bạn đang học" (KHÔNG tự navigate).
 *   layout        'normal' | 'wide' | 'full' do bạn khai lúc đăng ký (Reading 2 cột nên dùng 'full').
 *
 * ----------------------------------------------------------------------------
 * 3. AI GHI GÌ VÀO TIẾN ĐỘ (tránh ghi 2 lần)
 * ----------------------------------------------------------------------------
 *   BẠN (player):   useProgress().recordAnswer(skill, correct, question.id, mistake?)
 *                   cho từng câu chấm được — vì chỉ bạn biết id câu hỏi.
 *                   Writing: saveDraft / logWriting / updateBandEstimate như 03-DATA-LAYER.
 *   TRÌNH HỌC:      completeLessonV3 (phút học, thẻ từ, xoá resume), XP, chuối,
 *                   màn kết quả, "Ôn lại câu sai". KHÔNG gọi recordAnswer lại cho task.
 *
 * ----------------------------------------------------------------------------
 * 4. GIAO DIỆN
 * ----------------------------------------------------------------------------
 *   - Component được vẽ BÊN TRONG khung FocusLayout của trình học (đã có thanh trên:
 *     Thoát · thanh tiến độ · âm thanh). Đừng vẽ thêm thanh trên hay nút thoát thứ 2.
 *   - Phím Esc do trình học xử lý (mở hộp thoại thoát). Phím khác (Space, 1–4, Enter…)
 *     player tự xử lý trong phần của mình; trình học tắt phím tắt của nó khi đang ở task.
 *   - Nút chính của bạn đặt ở đáy (VD "Nộp bài", "Tiếp tục"). Dùng component trong
 *     src/design-system/components/* (Button, Sheet, AudioButton, Timer…).
 *   - Chữ giao diện song ngữ theo useLanguage(); nội dung học tiếng Anh.
 *
 * Ví dụ tối thiểu:
 *
 *     export default function ListeningTaskPlayer({ lesson, resumeData, onSaveResume, onComplete }: SkillTaskProps) {
 *       const task = lesson.listeningTask!
 *       const saved = resumeData as { answers: Record<string, string> } | null
 *       const [answers, setAnswers] = useState(saved?.answers ?? {})
 *       ...
 *       function answer(id: string, value: string) {
 *         const next = { ...answers, [id]: value }
 *         setAnswers(next)
 *         onSaveResume({ answers: next })
 *       }
 *       function submit() {
 *         // ...chấm, recordAnswer từng câu...
 *         onComplete({ correct: 4, total: 5, mistakes: [...] , summary: { vi: 'Bạn nghe ra 4/5 thông tin', en: '…' } })
 *       }
 *     }
 * ============================================================================
 */
import { useSyncExternalStore, type ComponentType } from 'react'
import type { BilingualText, Lesson, LessonMode } from '../../content/content-types'

/* ============================================================================
 * 1. KIỂU DỮ LIỆU CỦA HỢP ĐỒNG
 * ========================================================================== */

/** Các mode có task kỹ năng (mọi mode trừ 'practice'). */
export type SkillTaskMode = Exclude<LessonMode, 'practice'>

/** 1 câu sai trong task — để màn kết quả liệt kê "Câu cần ôn". */
export interface SkillTaskMistake {
  /** id câu hỏi (VD question.id của ListeningTask) */
  itemId: string
  /** câu hỏi dạng chữ ngắn gọn */
  question: string
  userAnswer: string
  correctAnswer: string
  /** 1 dòng vì sao (theo ngôn ngữ giao diện hoặc song ngữ) */
  explanation?: BilingualText
}

/** Kết quả player trả về khi xong task. */
export interface SkillTaskResult {
  /** số câu đúng / tổng số câu CHẤM ĐƯỢC. Task không chấm đúng-sai (Writing, Speaking) → 0 / 0 */
  correct: number
  total: number
  /** câu sai (tối đa nên 3–5 câu quan trọng nhất) — hiện ở màn kết quả */
  mistakes?: SkillTaskMistake[]
  /** band ước tính dạng khoảng (chỉ level-3; level 1–2 không hiện số) */
  band?: { low: number; high: number }
  /** 1 câu tóm tắt cụ thể cho màn kết quả, VD "Bạn nghe ra 4/5 thông tin" */
  summary?: BilingualText
  /** số phút làm task nếu player tự đo (không có → trình học tự tính theo thời gian thật) */
  minutes?: number
}

/** Props mà trình học truyền cho component task của bạn. */
export interface SkillTaskProps {
  lesson: Lesson
  mode: SkillTaskMode
  /** dữ liệu đã lưu qua onSaveResume lần trước (mở lại bài) — null nếu lần đầu */
  resumeData: unknown | null
  /** lưu chỗ đang làm (JSON thuần). Gọi sau mỗi thao tác quan trọng. */
  onSaveResume: (data: unknown) => void
  /** gọi đúng 1 lần khi xong task */
  onComplete: (result: SkillTaskResult) => void
  /** player có nút thoát riêng → gọi hàm này (trình học hiện hộp thoại "Đã lưu chỗ") */
  onRequestExit: () => void
}

/** Tuỳ chọn khi đăng ký. */
export interface SkillTaskOptions {
  /** độ rộng vùng nội dung FocusLayout: normal 760px · wide 1080px · full (tràn màn, Reading 2 cột) */
  layout?: 'normal' | 'wide' | 'full'
  /** tên nhóm (hiện trong công cụ dev, ghi log) */
  owner?: string
}

export interface RegisteredSkillTask {
  mode: SkillTaskMode
  Component: ComponentType<SkillTaskProps>
  options: Required<Pick<SkillTaskOptions, 'layout'>> & SkillTaskOptions
}

/* ============================================================================
 * 2. BẢNG ĐĂNG KÝ (Map mode -> component) + báo cho React khi có đăng ký mới
 * ========================================================================== */

const registry = new Map<SkillTaskMode, RegisteredSkillTask>()
const listeners = new Set<() => void>()
/** tăng mỗi lần bảng đổi -> useSyncExternalStore biết để vẽ lại */
let version = 0

/**
 * Đăng ký component cho 1 mode. Đăng ký lại cùng mode = thay thế (hot reload khi dev).
 * Gọi ở cấp module trong file register-skill-tasks.ts của nhóm bạn.
 */
export function registerSkillTask(mode: SkillTaskMode, Component: ComponentType<SkillTaskProps>, options: SkillTaskOptions = {}): void {
  registry.set(mode, { mode, Component, options: { layout: 'normal', ...options } })
  version++
  listeners.forEach((listener) => listener())
}

/** Lấy component đã đăng ký cho mode (undefined = chưa có nhóm nào đăng ký). */
export function getSkillTask(mode: SkillTaskMode): RegisteredSkillTask | undefined {
  return registry.get(mode)
}

/** Danh sách mode đã có player (dùng cho trang dev). */
export function registeredSkillTaskModes(): SkillTaskMode[] {
  return [...registry.keys()]
}

function subscribe(listener: () => void) {
  listeners.add(listener)
  return () => {
    listeners.delete(listener)
  }
}

/** Hook: lấy player của 1 mode, tự vẽ lại nếu nhóm kỹ năng đăng ký muộn (VD hot reload). */
export function useSkillTask(mode: SkillTaskMode | null): RegisteredSkillTask | undefined {
  useSyncExternalStore(subscribe, () => version)
  return mode ? registry.get(mode) : undefined
}

/** Bài này có task kỹ năng không (mode khác 'practice' và có dữ liệu task tương ứng). */
export function skillTaskModeOf(lesson: Lesson): SkillTaskMode | null {
  const mode = lesson.mode ?? 'practice'
  if (mode === 'practice') return null
  const hasTaskData =
    (mode === 'listening' && !!lesson.listeningTask) ||
    (mode === 'reading' && !!lesson.readingTask) ||
    (mode === 'writing' && !!lesson.writingTask) ||
    (mode === 'speaking' && !!lesson.speakingTask)
  return hasTaskData ? mode : null
}
