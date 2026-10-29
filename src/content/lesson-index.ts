/**
 * lesson-index.ts
 * ----------------------------------------------------------------------------
 * "MỤC LỤC NHẸ" CỦA MỌI BÀI HỌC — đủ để vẽ lộ trình mà KHÔNG phải tải nội dung bài.
 *
 * Mỗi bài chỉ giữ vài thông tin nhỏ (LessonSummary): id, chặng, tên, kỹ năng,
 * kiểu bài, số phút, số câu. Cả mục lục chỉ vài chục KB, trong khi nội dung đầy đủ
 * (thẻ dạy, bài tập, bài đọc, audio…) ~2,3 MB -> nội dung đầy đủ được tải sau,
 * khi người học mở bài (xem lesson-loader.ts).
 *
 * Dữ liệu nằm trong generated/lesson-index-data.ts — file đó do MÁY TẠO:
 *     npm run content:index      (scripts/generate-lesson-index.ts)
 * `npm run build` tự chạy lệnh này trước; `npm run validate` báo lỗi nếu mục lục cũ.
 *
 * Hàm dùng:
 *   findLessonSummary(id)   -> LessonSummary | undefined
 *   allLessonSummaries()    -> LessonSummary[]
 *
 * Cách tạo mục lục từ nội dung đầy đủ: lesson-index-builder.ts (chỉ script dùng).
 * ----------------------------------------------------------------------------
 */
import type { BilingualText, LessonMode, SkillName } from './content-types'
import type { LessonSourceId } from './lesson-sources'
import { LESSON_INDEX_DATA } from './generated/lesson-index-data'

/** Thông tin tóm tắt 1 bài (không có nội dung học). */
export interface LessonSummary {
  id: string
  /** File chứa nội dung đầy đủ (khoá trong LESSON_SOURCES) */
  source: LessonSourceId
  /** Chặng đầu tiên chứa bài này (null = bài chưa gắn vào lộ trình) */
  unitId: string | null
  skill: SkillName
  /** Kiểu bài: 'practice' (mặc định) hoặc bài kỹ năng chuyên sâu */
  mode: LessonMode
  title: BilingualText
  /** Số phút ước tính: lấy từ bài, nếu bài không ghi thì tự ước lượng theo số thẻ dạy + bài tập */
  estimatedMinutes: number
  /** Số bài tập (câu luyện) trong bài */
  exerciseCount: number
  /** Số từ mới (chỉ bài từ vựng có) */
  wordCount: number
}

/* ------------------------- bảng tra (tạo 1 lần) ------------------------- */

const summariesById = new Map<string, LessonSummary>()
for (const summary of LESSON_INDEX_DATA) {
  if (!summariesById.has(summary.id)) summariesById.set(summary.id, summary)
}

/** Tóm tắt 1 bài theo id. Không có -> undefined. */
export function findLessonSummary(lessonId: string): LessonSummary | undefined {
  return summariesById.get(lessonId)
}

/** Mọi bài (đúng thứ tự trong LESSON_SOURCES). */
export function allLessonSummaries(): LessonSummary[] {
  return LESSON_INDEX_DATA
}
