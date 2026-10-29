/**
 * validate-content.ts — KIỂM TRA NỘI DUNG BÀI HỌC / ĐỀ THI CÓ LỖI DỮ LIỆU KHÔNG
 * Chạy: npm run validate
 *
 * LỖI (làm script thất bại — giao diện sẽ hỏng nếu để vậy):
 *   - id trùng (bài, bài tập, từ vựng, câu hỏi, đề thi, chặng)
 *   - đáp án nằm ngoài danh sách, câu điền thiếu "___", passageId sai
 *   - (v3) chặng trỏ tới bài không tồn tại, level/track sai, bài cũ bị "rơi" khỏi lộ trình
 *   - (v3) câu hỏi nghe trỏ segmentId không có, câu hỏi đọc trỏ paragraphLabel không có
 *   - (v3) bài mode 'listening' mà không có listeningTask..., task Writing/Speaking thiếu bài mẫu
 *   - (v3) bài chưa khai báo trong lesson-sources.ts, mục lục nhẹ (generated/lesson-index-data.ts) đã cũ
 * CẢNH BÁO (chỉ in ra — nên sửa theo docs/redesign-v3/02-CONTENT-GUIDE.md):
 *   - chặng không đủ 5–7 bài, task thiếu đủ 3 bài mẫu band, bài chưa nằm trong chặng nào...
 */
import { existsSync, readFileSync } from 'node:fs'
import { ALL_EXAMS } from '../src/content/all-exams'
import { ALL_FUN_TOPICS } from '../src/content/all-fun-topics'
import { ALL_LEVELS_V3, LEVEL_ORDER, allUnits } from '../src/content/all-levels'
import type { Exercise, ExamQuestion, Lesson, TrackId } from '../src/content/content-types'
import { ALL_LESSONS, LEGACY_LESSONS } from '../src/content/lesson-registry'
import { buildLessonIndex, renderLessonIndexFile } from '../src/content/lesson-index-builder'
import { LESSON_SOURCE_IDS, LESSON_SOURCES, type LessonSourceId } from '../src/content/lesson-sources'
import { generateSpellingQuestions, listGameTopics } from '../src/game-questions/question-bank'
import { GRAMMAR_TOPICS } from '../src/content/grammar/grammar-topics'

const problems: string[] = []
const warnings: string[] = []
const seenIds = new Set<string>()
const checkId = (id: string, where: string) => {
  if (!id) problems.push(`Thiếu id (${where})`)
  if (seenIds.has(id)) problems.push(`Trùng id ${id} (${where})`)
  seenIds.add(id)
}
const SKILLS = ['vocabulary', 'listening', 'reading', 'speaking', 'writing']
const TRACKS: TrackId[] = ['general', 'ielts']
const MODES = ['practice', 'listening', 'reading', 'writing', 'speaking']

/* ============================================================================
 * 1. BÀI TẬP + CÂU HỎI
 * ========================================================================== */

function checkExercise(exercise: Exercise, passageIds: Set<string>, where: string) {
  checkId(exercise.id, where)
  if (exercise.passageId && !passageIds.has(exercise.passageId)) problems.push(`${exercise.id}: passageId không tồn tại`)
  switch (exercise.type) {
    case 'multiple-choice':
    case 'listen-choose':
      if (exercise.correctIndex < 0 || exercise.correctIndex >= exercise.options.length) problems.push(`${exercise.id}: correctIndex ngoài phạm vi`)
      if (new Set(exercise.options).size !== exercise.options.length) problems.push(`${exercise.id}: đáp án bị trùng`)
      break
    case 'fill-blank':
      if (exercise.sentence.split('___').length !== 2) problems.push(`${exercise.id}: cần đúng 1 chỗ "___"`)
      if (!exercise.acceptedAnswers.length) problems.push(`${exercise.id}: thiếu acceptedAnswers`)
      break
    case 'arrange-words':
      if (/\s{2,}/.test(exercise.correctSentence)) problems.push(`${exercise.id}: có 2 dấu cách liền nhau`)
      break
    case 'match-pairs':
      if (new Set(exercise.pairs.map((p) => p.right)).size !== exercise.pairs.length) problems.push(`${exercise.id}: vế phải bị trùng`)
      if (new Set(exercise.pairs.map((p) => p.left)).size !== exercise.pairs.length) problems.push(`${exercise.id}: vế trái bị trùng`)
      break
    case 'listen-type':
      if (!exercise.acceptedAnswers.length) problems.push(`${exercise.id}: thiếu acceptedAnswers`)
      break
  }
}

/** Câu hỏi kiểu đề thi (dùng trong đề thi và trong listeningTask / readingTask của bài v3). */
function checkExamQuestion(question: ExamQuestion, where: string) {
  checkId(question.id, where)
  if (question.kind === 'choice') {
    if (question.correctIndex < 0 || question.correctIndex >= question.options.length) problems.push(`${question.id}: correctIndex ngoài phạm vi`)
    if (new Set(question.options).size !== question.options.length) problems.push(`${question.id}: đáp án bị trùng`)
  }
  if (question.kind === 'gap-fill') {
    if (question.prompt.split('___').length !== 2) problems.push(`${question.id}: cần đúng 1 chỗ "___"`)
    if (!question.acceptedAnswers.length) problems.push(`${question.id}: thiếu acceptedAnswers`)
  }
}

/* ============================================================================
 * 2. BÀI HỌC (cũ + v3)
 * ========================================================================== */

let exerciseCount = 0
let taskCount = 0

function checkLesson(lesson: Lesson) {
  checkId(lesson.id, 'lesson')
  if (!SKILLS.includes(lesson.skill)) problems.push(`${lesson.id}: skill "${lesson.skill}" không hợp lệ`)
  if (!lesson.title?.vi || !lesson.title?.en) problems.push(`${lesson.id}: thiếu title vi/en`)
  const passageIds = new Set((lesson.readingPassages ?? []).map((p) => p.id))
  for (const word of lesson.words ?? []) checkId(word.id, lesson.id)
  for (const exercise of [...lesson.exercises, ...lesson.miniTest]) {
    exerciseCount++
    checkExercise(exercise, passageIds, lesson.id)
  }

  // ---- (v3) mode + task kỹ năng ----
  const mode = lesson.mode ?? 'practice'
  if (!MODES.includes(mode)) problems.push(`${lesson.id}: mode "${mode}" không hợp lệ`)
  const taskOfMode = { listening: lesson.listeningTask, reading: lesson.readingTask, writing: lesson.writingTask, speaking: lesson.speakingTask }
  if (mode !== 'practice' && !taskOfMode[mode as keyof typeof taskOfMode]) problems.push(`${lesson.id}: mode '${mode}' nhưng thiếu ${mode}Task`)
  if (mode === 'practice' && lesson.exercises.length === 0) problems.push(`${lesson.id}: bài practice không có bài tập nào`)

  if (lesson.listeningTask) {
    taskCount++
    const task = lesson.listeningTask
    const segmentIds = new Set<string>()
    for (const segment of task.segments) {
      if (segmentIds.has(segment.id)) problems.push(`${lesson.id}: segment id "${segment.id}" bị trùng`)
      segmentIds.add(segment.id)
      if (segment.lines.length === 0) problems.push(`${lesson.id}: segment "${segment.id}" không có lời thoại`)
    }
    if (task.segments.length === 0) problems.push(`${lesson.id}: listeningTask không có đoạn nghe`)
    if (task.questions.length === 0) problems.push(`${lesson.id}: listeningTask không có câu hỏi`)
    for (const question of task.questions) {
      checkExamQuestion(question, lesson.id)
      if (question.segmentId && !segmentIds.has(question.segmentId)) problems.push(`${question.id}: segmentId "${question.segmentId}" không có trong bài nghe`)
      if (!question.segmentId) warnings.push(`${question.id}: câu nghe nên có segmentId (nút "Nghe lại đoạn này")`)
    }
  }

  if (lesson.readingTask) {
    taskCount++
    const task = lesson.readingTask
    const labels = new Set(task.passage.paragraphs.map((p) => p.label).filter((label): label is string => !!label))
    if (task.passage.paragraphs.length === 0) problems.push(`${lesson.id}: readingTask không có đoạn văn`)
    if (task.questions.length === 0) problems.push(`${lesson.id}: readingTask không có câu hỏi`)
    for (const question of task.questions) {
      checkExamQuestion(question, lesson.id)
      if (question.paragraphLabel && !labels.has(question.paragraphLabel)) {
        problems.push(`${question.id}: paragraphLabel "${question.paragraphLabel}" không có trong bài đọc`)
      }
    }
  }

  if (lesson.writingTask) {
    taskCount++
    const task = lesson.writingTask
    checkId(task.id, lesson.id)
    if (!task.bandSamples?.length) problems.push(`${lesson.id}: writingTask thiếu bandSamples`)
    else if (task.bandSamples.length < 3) warnings.push(`${lesson.id}: writingTask nên có 3 bài mẫu (4.0 / 5.5 / 6.5), đang có ${task.bandSamples.length}`)
    if (!task.checklist?.length) problems.push(`${lesson.id}: writingTask thiếu checklist tự chấm`)
    // Task 1 dạng thư (General) / sơ đồ quy trình không cần bảng số; chỉ cảnh báo khi đề nói tới biểu đồ / bảng
    if (task.taskNumber === 1 && !task.chartData && /\b(chart|graph|table)\b/i.test(task.prompt)) warnings.push(`${lesson.id}: đề nhắc tới biểu đồ / bảng nhưng thiếu chartData`)
    if (task.chartData) {
      for (const series of task.chartData.series) {
        if (series.values.length !== task.chartData.labels.length) problems.push(`${lesson.id}: chartData "${series.name}" có ${series.values.length} số nhưng ${task.chartData.labels.length} nhãn`)
      }
    }
  }

  if (lesson.speakingTask) {
    taskCount++
    const task = lesson.speakingTask
    if (!task.bandSamples?.length) problems.push(`${lesson.id}: speakingTask thiếu bandSamples`)
    else if (task.bandSamples.length < 3) warnings.push(`${lesson.id}: speakingTask nên có 3 bài mẫu (4.0 / 5.5 / 6.5), đang có ${task.bandSamples.length}`)
    if (task.part === 2 && !task.cueCard) problems.push(`${lesson.id}: Speaking Part 2 thiếu cueCard`)
    if (task.questions.length === 0 && !task.cueCard) problems.push(`${lesson.id}: speakingTask không có câu hỏi`)
  }
}

for (const lesson of ALL_LESSONS) checkLesson(lesson)

/* ============================================================================
 * 3. LỘ TRÌNH v3: LEVEL -> CHẶNG -> ID BÀI
 * ========================================================================== */

const lessonIds = new Set(ALL_LESSONS.map((lesson) => lesson.id))
const examIds = new Set(ALL_EXAMS.map((exam) => exam.id))
const lessonsInUnits = new Set<string>()
let unitCount = 0

if (ALL_LEVELS_V3.map((level) => level.id).join() !== LEVEL_ORDER.join()) problems.push('ALL_LEVELS_V3 phải gồm đúng level-1, level-2, level-3 theo thứ tự')

for (const level of ALL_LEVELS_V3) {
  if (level.levelTestId && !examIds.has(level.levelTestId)) problems.push(`${level.id}: levelTestId "${level.levelTestId}" không có trong ALL_EXAMS`)
  for (const unit of level.units) {
    unitCount++
    checkId(`unit:${unit.id}`, level.id)
    if (unit.levelId !== level.id) problems.push(`Chặng ${unit.id}: levelId "${unit.levelId}" nhưng nằm trong ${level.id}`)
    if (!unit.tracks.length || unit.tracks.some((track) => !TRACKS.includes(track))) problems.push(`Chặng ${unit.id}: tracks không hợp lệ`)
    if (!unit.title?.vi || !unit.title?.en) problems.push(`Chặng ${unit.id}: thiếu title vi/en`)
    if (!unit.canDo?.vi || !unit.canDo?.en) problems.push(`Chặng ${unit.id}: thiếu canDo vi/en`)
    if (!unit.icon?.trim()) problems.push(`Chặng ${unit.id}: thiếu icon`)
    if (unit.checkpointExamId && !examIds.has(unit.checkpointExamId)) problems.push(`Chặng ${unit.id}: checkpointExamId "${unit.checkpointExamId}" không có trong ALL_EXAMS`)
    if (unit.lessonIds.length < 5 || unit.lessonIds.length > 7) warnings.push(`Chặng ${unit.id}: có ${unit.lessonIds.length} bài (nên 5–7)`)
    if (new Set(unit.lessonIds).size !== unit.lessonIds.length) problems.push(`Chặng ${unit.id}: 1 bài bị lặp trong chặng`)
    for (const id of unit.lessonIds) {
      if (!lessonIds.has(id)) problems.push(`Chặng ${unit.id}: bài "${id}" không có trong lesson-registry`)
      lessonsInUnits.add(id)
    }
  }
  // trong 1 track của 1 level: 1 bài chỉ được xuất hiện 1 lần, thứ tự chặng không trùng
  for (const track of TRACKS) {
    const units = level.units.filter((unit) => unit.tracks.includes(track))
    const seen = new Map<string, string>()
    for (const unit of units) {
      for (const id of unit.lessonIds) {
        if (seen.has(id)) problems.push(`${level.id}/${track}: bài "${id}" nằm ở 2 chặng (${seen.get(id)}, ${unit.id})`)
        seen.set(id, unit.id)
      }
    }
    const orders = units.map((unit) => unit.order)
    if (new Set(orders).size !== orders.length) warnings.push(`${level.id}/${track}: có 2 chặng trùng số order`)
  }
}

// 100 bài cũ phải nằm trong lộ trình (tiến độ cũ của người học tính theo id các bài này)
for (const lesson of LEGACY_LESSONS) if (!lessonsInUnits.has(lesson.id)) problems.push(`Bài cũ ${lesson.id} chưa được gắn vào chặng nào`)
// bài khu Ngữ pháp (category 'grammar') cố ý KHÔNG nằm trong chặng nào — mở từ trang /grammar
for (const lesson of ALL_LESSONS) if (!lessonsInUnits.has(lesson.id) && !LEGACY_LESSONS.includes(lesson) && lesson.category !== 'grammar') warnings.push(`Bài ${lesson.id} chưa nằm trong chặng nào`)

/* ---- 3b. KHU NGỮ PHÁP (src/content/grammar/grammar-topics.ts) ---- */
const grammarLessonsInTopics = new Set<string>()
for (const topic of GRAMMAR_TOPICS) {
  checkId(`grammar:${topic.id}`, 'grammar-topics')
  if (topic.lessonIds.length === 0) problems.push(`Điểm ngữ pháp ${topic.id}: chưa có bài nào`)
  for (const id of topic.lessonIds) {
    if (!lessonIds.has(id)) problems.push(`Điểm ngữ pháp ${topic.id}: bài "${id}" không có trong lesson-registry`)
    grammarLessonsInTopics.add(id)
  }
}
for (const lesson of ALL_LESSONS) {
  if (lesson.category === 'grammar' && !grammarLessonsInTopics.has(lesson.id)) warnings.push(`Bài ngữ pháp ${lesson.id} chưa gắn vào điểm nào trong grammar-topics.ts (sẽ không hiện ở /grammar)`)
}

/* ============================================================================
 * 4. ĐỀ THI
 * ========================================================================== */

for (const exam of ALL_EXAMS) {
  checkId(exam.id, 'exam')
  if (exam.levelId && !LEVEL_ORDER.includes(exam.levelId as (typeof LEVEL_ORDER)[number])) warnings.push(`${exam.id}: levelId "${exam.levelId}" không phải level v3`)
  for (const section of exam.sections) {
    for (const part of section.parts ?? []) for (const q of part.questions) checkExamQuestion(q, exam.id)
    for (const task of section.writingTasks ?? []) checkId(task.id, exam.id)
  }
}

/* ============================================================================
 * 5. HỌC VUI + NGÂN HÀNG CÂU HỎI THI ĐẤU
 * ========================================================================== */

let cardCount = 0
for (const topic of ALL_FUN_TOPICS) {
  checkId(`topic:${topic.id}`, 'fun')
  for (const card of topic.cards) {
    cardCount++
    checkId(card.id, topic.id)
    if (!/^[A-Za-z][A-Za-z \-]*$/.test(card.word)) problems.push(`${card.id}: word "${card.word}" có ký tự lạ`)
    if (card.examples.length < 1) problems.push(`${card.id}: thiếu câu ví dụ`)
    if (card.image.kind === 'flag' && !existsSync(`public/flags/${card.image.countryCode}.svg`)) problems.push(`${card.id}: thiếu file cờ ${card.image.countryCode}`)
    if (card.image.kind === 'emoji' && !card.image.value.trim()) problems.push(`${card.id}: thiếu emoji`)
  }
}

// chủ đề nào của Spelling Bee cũng phải ra được câu
for (const topic of listGameTopics()) {
  const questions = generateSpellingQuestions(topic.id, 10, 42)
  if (questions.length < 5) problems.push(`Chủ đề ${topic.id} chỉ tạo được ${questions.length} câu Spelling Bee`)
}

/* ============================================================================
 * 6. MỤC LỤC NHẸ + NGUỒN TẢI BÀI (lesson-sources.ts, generated/lesson-index-data.ts)
 *    Trang web chỉ tải mục lục lúc mở; nội dung bài tải sau theo nguồn -> 2 nơi phải khớp registry.
 * ========================================================================== */

const lessonsBySource: [LessonSourceId, Lesson[]][] = await Promise.all(
  LESSON_SOURCE_IDS.map(async (source): Promise<[LessonSourceId, Lesson[]]> => [source, await LESSON_SOURCES[source]()]),
)
const sourcedIds = new Set(lessonsBySource.flatMap(([, lessons]) => lessons.map((lesson) => lesson.id)))
for (const lesson of ALL_LESSONS) {
  if (!sourcedIds.has(lesson.id)) problems.push(`Bài ${lesson.id}: có trong lesson-registry.ts nhưng chưa khai báo nguồn trong lesson-sources.ts (sẽ không mở được)`)
}
for (const id of sourcedIds) if (!lessonIds.has(id)) problems.push(`Bài ${id}: có trong lesson-sources.ts nhưng thiếu ở lesson-registry.ts`)
const indexFile = 'src/content/generated/lesson-index-data.ts'
const expectedIndex = renderLessonIndexFile(buildLessonIndex(lessonsBySource, allUnits()))
if (!existsSync(indexFile) || readFileSync(indexFile, 'utf8').replace(/\r\n/g, '\n') !== expectedIndex) {
  problems.push('Mục lục bài học (src/content/generated/lesson-index-data.ts) đã cũ so với nội dung — chạy: npm run content:index')
}

/* ============================================================================
 * KẾT QUẢ
 * ========================================================================== */

console.log(
  `${ALL_LESSONS.length} bài học (${LEGACY_LESSONS.length} bài cũ), ${exerciseCount} bài tập, ${taskCount} task kỹ năng, ` +
    `${unitCount} chặng, ${ALL_EXAMS.length} đề thi, ${ALL_FUN_TOPICS.length} chủ đề Học vui (${cardCount} thẻ).`,
)
if (warnings.length) console.log(`\n${warnings.length} cảnh báo (không chặn):\n` + warnings.slice(0, 60).join('\n') + (warnings.length > 60 ? `\n… và ${warnings.length - 60} cảnh báo nữa` : ''))
if (problems.length) {
  console.log(`\n${problems.length} lỗi:\n` + problems.join('\n'))
  process.exit(1)
}
console.log('\nNội dung hợp lệ ✓')
