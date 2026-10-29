/**
 * lesson-loader.ts
 * ----------------------------------------------------------------------------
 * TẢI NỘI DUNG ĐẦY ĐỦ CỦA 1 BÀI HỌC KHI CẦN (thay cho findLessonById ở trình duyệt).
 *
 *   const lesson = await loadLesson('l1-vocab-01')   // Lesson | undefined
 *   preloadLesson('l1-vocab-02')                      // tải trước, không chờ (VD khi rê chuột lên nút bài)
 *   getLoadedLesson('l1-vocab-01')                    // đã tải rồi -> trả ngay (đồng bộ), chưa -> undefined
 *
 * Cách chạy:
 *   1. Tra mục lục nhẹ (lesson-index.ts) xem bài nằm ở nguồn (file) nào.
 *   2. Tải file đó bằng import() động (LESSON_SOURCES) — mỗi file ~50–150 KB, chỉ tải 1 lần.
 *   3. Ghi nhớ kết quả -> lần sau mở bài cùng file là có ngay.
 * Tải lỗi (mất mạng, web vừa cập nhật phiên bản mới): xoá khỏi bộ nhớ đệm để lần sau
 * thử lại, và ném lỗi ra cho trang tự hiện "Thử lại".
 *
 * KHÔNG import lesson-registry.ts / content-lookup.ts trong code chạy ở trang chính:
 * 2 file đó import toàn bộ nội dung (~2,3 MB) vào gói JS đầu tiên.
 * ----------------------------------------------------------------------------
 */
import type { Lesson } from './content-types'
import { findLessonSummary } from './lesson-index'
import { LESSON_SOURCES, type LessonSourceId } from './lesson-sources'

/** Mỗi nguồn: lời hứa trả về bảng id -> bài (dùng chung cho mọi lần gọi). */
const sourceCache = new Map<LessonSourceId, Promise<Map<string, Lesson>>>()
/** Bài đã tải xong (tra đồng bộ cho getLoadedLesson). */
const loadedLessons = new Map<string, Lesson>()

function loadSource(source: LessonSourceId): Promise<Map<string, Lesson>> {
  let pending = sourceCache.get(source)
  if (!pending) {
    pending = LESSON_SOURCES[source]()
      .then((lessons) => {
        const byId = new Map<string, Lesson>()
        for (const lesson of lessons) {
          byId.set(lesson.id, lesson)
          loadedLessons.set(lesson.id, lesson)
        }
        return byId
      })
      .catch((error: unknown) => {
        sourceCache.delete(source) // lần sau gọi lại sẽ tải lại từ đầu
        throw error
      })
    sourceCache.set(source, pending)
  }
  return pending
}

/**
 * Tải nội dung đầy đủ của 1 bài.
 * - Trả `undefined` nếu id không có trong mục lục (bài đã bị xoá / gõ sai link).
 * - Ném lỗi nếu tải file thất bại (mạng) -> trang hiện nút "Thử lại".
 */
export async function loadLesson(lessonId: string): Promise<Lesson | undefined> {
  const already = loadedLessons.get(lessonId)
  if (already) return already
  const summary = findLessonSummary(lessonId)
  if (!summary) return undefined
  const lessons = await loadSource(summary.source)
  return lessons.get(lessonId)
}

/** Tải nhiều bài cùng lúc (giữ thứ tự, bỏ id không có). */
export async function loadLessons(lessonIds: string[]): Promise<Lesson[]> {
  const lessons = await Promise.all(lessonIds.map((id) => loadLesson(id)))
  return lessons.filter((lesson): lesson is Lesson => !!lesson)
}

/** Bắt đầu tải trước (không chờ, nuốt lỗi) — gọi khi người học sắp mở bài. */
export function preloadLesson(lessonId: string): void {
  loadLesson(lessonId).catch(() => {
    /* lỗi sẽ được báo lại khi thật sự mở bài */
  })
}

/** Bài đã nằm sẵn trong bộ nhớ chưa? Có -> trả ngay (không cần chờ). */
export function getLoadedLesson(lessonId: string): Lesson | undefined {
  return loadedLessons.get(lessonId)
}
