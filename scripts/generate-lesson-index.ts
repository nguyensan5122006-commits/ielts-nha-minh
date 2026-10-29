/**
 * generate-lesson-index.ts — TẠO "MỤC LỤC NHẸ" CỦA BÀI HỌC
 * ----------------------------------------------------------------------------
 * Chạy: npm run content:index          (ghi src/content/generated/lesson-index-data.ts)
 *       npm run content:index -- --check   (chỉ kiểm tra mục lục có cũ không, không ghi)
 *
 * Đọc mọi file bài học trong src/content/lesson-sources.ts, rút ra vài thông tin nhỏ
 * mỗi bài (id, chặng, tên, kỹ năng, số phút…) rồi ghi thành 1 file TypeScript.
 * Trang lộ trình chỉ cần mục lục này -> không phải tải ~2,3 MB nội dung lúc mở web.
 * Nội dung đầy đủ tải sau bằng loadLesson(id) (src/content/lesson-loader.ts).
 *
 * `npm run build` tự chạy script này trước khi build.
 * ----------------------------------------------------------------------------
 */
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { allUnits } from '../src/content/all-levels'
import { buildLessonIndex, renderLessonIndexFile } from '../src/content/lesson-index-builder'
import { LESSON_SOURCE_IDS, LESSON_SOURCES } from '../src/content/lesson-sources'

const OUTPUT_FILE = resolve(process.cwd(), 'src/content/generated/lesson-index-data.ts')
const checkOnly = process.argv.includes('--check')

const lessonsBySource = await Promise.all(LESSON_SOURCE_IDS.map(async (source) => [source, await LESSON_SOURCES[source]()] as const))
const index = buildLessonIndex(
  lessonsBySource.map(([source, lessons]) => [source, lessons]),
  allUnits(),
)
const text = renderLessonIndexFile(index)
const current = existsSync(OUTPUT_FILE) ? readFileSync(OUTPUT_FILE, 'utf8').replace(/\r\n/g, '\n') : ''

if (checkOnly) {
  if (current !== text) {
    console.error('✗ Mục lục bài học đã cũ. Chạy: npm run content:index')
    process.exit(1)
  }
  console.log(`✓ Mục lục bài học khớp nội dung (${index.length} bài)`)
} else if (current === text) {
  console.log(`✓ Mục lục bài học không đổi (${index.length} bài)`)
} else {
  mkdirSync(dirname(OUTPUT_FILE), { recursive: true })
  writeFileSync(OUTPUT_FILE, text, 'utf8')
  console.log(`✓ Đã ghi ${OUTPUT_FILE} (${index.length} bài, ${(text.length / 1024).toFixed(1)} KB)`)
}
