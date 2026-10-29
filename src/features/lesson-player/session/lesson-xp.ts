/**
 * lesson-xp.ts — TÍNH XP CỦA 1 BÀI HỌC (theo "Luật XP" psych-adult D10)
 * ----------------------------------------------------------------------------
 * XP chỉ thưởng cho HÀNH ĐỘNG HỌC THẬT, không thưởng cho bấm qua màn hình:
 *   - xong bài                         : 5
 *   - câu đúng ngay lần đầu, tự nhớ    : 2 / câu
 *   - câu đúng nhờ gợi ý nấc 1–2       : 1 / câu
 *   - bài nói / viết tự do (AI)        : 4 / bài   (nói, viết > trắc nghiệm: kéo về kỹ năng yếu)
 *   - task kỹ năng: câu đúng           : 2 / câu ; task Writing/Speaking xong: +8
 * Chống "cày" XP:
 *   - học lại bài đã xong: chỉ 30%
 *   - đã học ≥ 60 phút trong ngày: XP giảm dần về 0 ở phút 120 (chống học dồn)
 * XP không đổi được ra quà và không báo trước như "khoản thưởng" — chỉ hiện nhỏ ở cuối màn kết quả.
 * ----------------------------------------------------------------------------
 */
import type { SessionSummary } from './lesson-session'
import type { SkillTaskMode, SkillTaskResult } from '../skill-task-registry'

export interface XpInput {
  summary: SessionSummary
  taskMode: SkillTaskMode | null
  taskResult: SkillTaskResult | null
  /** bài này đã từng xong trước đây */
  isRepeat: boolean
  /** số phút đã học hôm nay TRƯỚC bài này */
  minutesTodayBefore: number
}

export function calculateLessonXp({ summary, taskMode, taskResult, isRepeat, minutesTodayBefore }: XpInput): number {
  let xp = 5
  xp += summary.firstTryClean * 2
  xp += summary.hintedCorrect * 1
  xp += summary.aiDone * 4
  if (taskResult) {
    xp += taskResult.correct * 2
    if (taskMode === 'writing' || taskMode === 'speaking') xp += 8
  }
  if (isRepeat) xp *= 0.3
  // học dồn: sau 60 phút, mỗi phút thêm giảm dần, tới 120 phút thì không còn XP
  if (minutesTodayBefore >= 60) xp *= Math.max(0, 1 - (minutesTodayBefore - 60) / 60)
  return Math.max(0, Math.min(200, Math.round(xp)))
}
