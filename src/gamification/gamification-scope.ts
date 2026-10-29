/**
 * gamification-scope.ts — TRÒ CHƠI HOÁ CHỈ CÓ Ở TRACK "TIẾNG ANH TỔNG QUÁT"
 * ----------------------------------------------------------------------------
 * Quyết định của chủ nhà (29/10/2026):
 *   - XP, bảng xếp hạng, nhiệm vụ, huy hiệu, level tài khoản (Lv.N) -> CHỈ ở track 'general'.
 *   - Track 'ielts' (bài IELTS, task kỹ năng, phòng thi, đề thi thử) -> KHÔNG cộng XP,
 *     KHÔNG hiện XP / nhiệm vụ / huy hiệu / bảng xếp hạng. Người luyện thi cần cảm giác
 *     "đang luyện thật", không phải "đang chơi".
 *   - Chuỗi ngày học (streak) -> giữ cho CẢ 2 track.
 *   - Trò chơi chữ (/play, /games…) -> vẫn cộng XP như cũ (không qua file này).
 *   - XP đã lưu từ trước KHÔNG bị đụng tới: file này chỉ quyết định có CỘNG THÊM / có HIỆN hay không.
 *
 * App biết "đang ở track nào" bằng:
 *   - progress.profile.track = tab người học đang chọn ở /learn (hoặc trong Cài đặt).
 *   - Bài học: track của CHẶNG chứa bài (all-levels.ts). Chặng dùng chung cả 2 track
 *     -> theo tab đang chọn. Luật đầy đủ: xem lessonEarnsXp() và 03-DATA-LAYER.md mục 15.
 *   - Phòng thi (/exams) = luôn coi là IELTS -> không bao giờ cộng XP (exam-grading.ts).
 * ----------------------------------------------------------------------------
 */
import type { TrackId } from '../content/content-types'
import { findUnitOfLesson } from '../content/path-selectors'
import { useProgress } from '../learning-progress/progress-store'

/** Track này có trò chơi hoá (XP, nhiệm vụ, huy hiệu, bảng xếp hạng) không? */
export function isGamifiedTrack(track: TrackId): boolean {
  return track === 'general'
}

/**
 * Hết 1 bài học (hoặc mini-test của bài) có được cộng XP không?
 *
 *   bài tự ghi lesson.track (VD bài Ngữ pháp "gr-…": 'general') -> theo đúng track đó, BỎ QUA tab
 *                                                      ('general' -> CÓ, 'ielts' -> KHÔNG)
 *   tab đang chọn = 'ielts'                          -> KHÔNG (kể cả bài dùng chung)
 *   tab 'general' + bài thuộc chặng có 'general'     -> CÓ   (chặng riêng general hoặc chặng dùng chung)
 *   tab 'general' + bài chỉ nằm trong chặng IELTS    -> KHÔNG (VD mở thẳng link bài IELTS)
 *   tab 'general' + bài không nằm trong chặng nào    -> CÓ   (bài cũ / bài chưa gắn lộ trình — coi là tổng quát)
 *
 * findUnitOfLesson(id, 'general') trả chặng general nếu có; không có thì trả chặng bất kỳ chứa bài
 * (fallback) -> vì vậy phải kiểm tra lại unit.tracks.
 */
export function lessonEarnsXp(lessonId: string, profileTrack: TrackId, lessonTrack?: TrackId): boolean {
  if (lessonTrack) return isGamifiedTrack(lessonTrack) // bài tự khai track (bài Ngữ pháp) — không phụ thuộc tab
  if (!isGamifiedTrack(profileTrack)) return false
  const location = findUnitOfLesson(lessonId, 'general')
  if (!location) return true
  return location.unit.tracks.includes('general')
}

/** Các trang của Sân chơi (giống matchPrefixes mục "play" trong app/layout/nav-items.ts) — trò chơi chữ cộng XP ở MỌI track. */
const PLAYGROUND_PREFIXES = ['/play', '/games', '/daily-word', '/quests', '/leaderboard']

const startsWithPrefix = (pathname: string, prefix: string) => pathname === prefix || pathname.startsWith(`${prefix}/`)

/**
 * Ở trang `pathname`, với tab `track`, có hiện / báo trò chơi hoá (Lv.N, toast lên level, huy hiệu) không?
 *   phòng thi (/exams, /exam/…, /exam-result/…) -> KHÔNG (phòng thi = IELTS)
 *   Sân chơi (/play, /games/…)                  -> CÓ    (kể cả khi đang ở tab IELTS)
 *   còn lại                                     -> theo tab đang chọn
 */
export function gamificationVisibleAt(track: TrackId, pathname: string): boolean {
  if (pathname.startsWith('/exam')) return false
  if (PLAYGROUND_PREFIXES.some((prefix) => startsWithPrefix(pathname, prefix))) return true
  return isGamifiedTrack(track)
}

/** Hook cho giao diện: có hiện XP / nhiệm vụ / bảng xếp hạng / huy hiệu không (theo tab đang chọn). */
export function useGamificationVisible(): boolean {
  const { progress } = useProgress()
  return isGamifiedTrack(progress.profile.track)
}
