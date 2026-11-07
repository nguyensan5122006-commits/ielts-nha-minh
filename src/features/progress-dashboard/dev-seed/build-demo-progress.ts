/**
 * build-demo-progress.ts — (CHỈ DÙNG KHI PHÁT TRIỂN) TẠO TIẾN ĐỘ "TRÔNG NHƯ THẬT" ĐỂ XEM GIAO DIỆN
 * ----------------------------------------------------------------------------
 * Trang /review, /words, /mistakes, /progress chỉ đẹp/đúng khi có dữ liệu thật: hàng trăm thẻ
 * FSRS ở đủ 5 cấp nhớ, sổ lỗi đủ kỹ năng, chuỗi ngày có ngày nghỉ, nhật ký bài viết…
 * File này MÔ PHỎNG một người học qua nhiều tuần bằng CHÍNH các hàm thuần của tầng dữ liệu
 * (progress-updates.ts — cùng luật mà kho tiến độ dùng), chỉ "giả" đồng hồ (tham số `now`).
 * Vì vậy dữ liệu tạo ra hợp lệ 100%: thẻ FSRS do thư viện ts-fsrs tính, chuỗi ngày do streak-rules tính.
 *
 * KHÔNG được import vào trang thật. Chạy bằng script node (esbuild) trong thư mục nháp của nhóm,
 * rồi gửi lên API local (PUT /api/progress) của tài khoản test.
 *
 * 2 hồ sơ mẫu:
 *   'ielts-learner'    — luyện IELTS, xếp lớp Level 2 (band 3.5–4.0), học ~7 tuần,
 *                        xong Level 2 -> đang ở Level 3 (4 nút chấm), có đề thi thử + bài viết.
 *   'general-beginner' — track tổng quát, Level 1, mới học 2 tuần (ít dữ liệu: band ẩn).
 * ----------------------------------------------------------------------------
 */
import { ALL_EXAMS } from '../../../content/all-exams'
import type { Exercise, Lesson, LevelId, SkillName, TrackId } from '../../../content/content-types'
import { findExercise } from '../../../content/content-lookup'
import { findLessonById } from '../../../content/lesson-registry'
import { pathLessonIds } from '../../../content/path-selectors'
import { checkExerciseAnswer } from '../../../services/exercise-shared'
import { autoRating, createSrsCard, dueCards, type SrsRating } from '../../../learning-progress/fsrs-scheduler'
import { createEmptyProgress, type LearningProgress, type NewMistake } from '../../../learning-progress/progress-types'
import * as update from '../../../learning-progress/progress-updates'

export type DemoProfile = 'ielts-learner' | 'general-beginner'

/* ---------- số ngẫu nhiên "có hạt giống": chạy lại ra đúng dữ liệu cũ ---------- */
function seededRandom(seed: number) {
  let state = seed >>> 0
  return () => {
    state = (state + 0x6d2b79f5) >>> 0
    let t = state
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

const MINUTE = 60_000
const DAY = 86_400_000

/** Câu trả lời SAI trông hợp lý cho 1 bài tập (để sổ lỗi có chữ thật). */
function plausibleWrongAnswer(exercise: Exercise, random: () => number): string {
  switch (exercise.type) {
    case 'multiple-choice':
    case 'listen-choose': {
      const wrong = exercise.options.map((_, index) => index).filter((index) => index !== exercise.correctIndex)
      return String(wrong[Math.floor(random() * wrong.length)] ?? 0)
    }
    case 'true-false':
      return exercise.answer === 'TRUE' ? (exercise.allowNotGiven && random() < 0.5 ? 'NOT GIVEN' : 'FALSE') : 'TRUE'
    case 'fill-blank': {
      const right = exercise.acceptedAnswers[0] ?? ''
      // lỗi điển hình của người Việt: quên -s / -ed, dùng dạng nguyên mẫu
      return right.replace(/(es|s|ed|ing)$/, '') || `${right}s`
    }
    case 'listen-type': {
      const words = (exercise.acceptedAnswers[0] ?? '').split(' ')
      // nghe sót phụ âm cuối
      return words.map((word, index) => (index === words.length - 1 ? word.replace(/[sdt](?=\W*$)/, '') : word)).join(' ')
    }
    case 'arrange-words': {
      const words = exercise.correctSentence.split(' ')
      if (words.length > 2) [words[0], words[1]] = [words[1], words[0]]
      return words.join(' ')
    }
    case 'match-pairs':
      return '2'
    default:
      return ''
  }
}

/** Dạng bài được chấm máy trong bài học (bài nói/viết AI chấm luôn tính hoàn thành). */
const AUTO_GRADED: Exercise['type'][] = ['multiple-choice', 'listen-choose', 'true-false', 'fill-blank', 'listen-type', 'arrange-words', 'match-pairs']

/** Kỹ năng khó hơn thì tỉ lệ đúng thấp hơn chút (người Việt yếu nghe + nói nhất — psych-adult B1). */
const SKILL_DIFFICULTY: Record<SkillName, number> = { vocabulary: 0.04, reading: 0, listening: -0.07, writing: -0.05, speaking: -0.06 }

interface ProfileRecipe {
  track: TrackId
  dailyGoalMinutes: number
  placement: { level: LevelId; bandLow: number; bandHigh: number } | null
  /** số ngày mô phỏng (tính lùi từ hôm qua) */
  days: number
  /** các ngày (tính từ ngày 0) KHÔNG học */
  skipDays: number[]
  lessonsPerDay: (dayIndex: number, random: () => number) => number
  /** tỉ lệ đúng theo tiến trình 0..1 */
  accuracyAt: (progress01: number, level: LevelId) => number
  levels: LevelId[]
}

const RECIPES: Record<DemoProfile, ProfileRecipe> = {
  'ielts-learner': {
    track: 'ielts',
    dailyGoalMinutes: 15,
    placement: { level: 'level-2', bandLow: 3.5, bandHigh: 4 },
    days: 52,
    // nghỉ lẻ tẻ + 2 ngày liền (ngày 22–23, có "bảo vệ chuỗi") + 1 lần đứt chuỗi (ngày 9)
    skipDays: [9, 15, 22, 23, 29, 30, 31, 40, 46],
    lessonsPerDay: (day, random) => (day < 2 ? 1 : random() < 0.35 ? 3 : 2),
    accuracyAt: (t, level) => (level === 'level-3' ? 0.72 + 0.1 * t : 0.77 + 0.14 * t),
    levels: ['level-2', 'level-3'],
  },
  'general-beginner': {
    track: 'general',
    dailyGoalMinutes: 10,
    placement: null,
    days: 13,
    skipDays: [4, 9],
    lessonsPerDay: (_day, random) => (random() < 0.3 ? 2 : 1),
    accuracyAt: (t) => 0.74 + 0.1 * t,
    levels: ['level-1'],
  },
}

/** Ôn mọi thẻ đến hạn lúc `time` như một người học thật (đa số nhớ, đôi khi quên). */
function simulateReviewSession(progress: LearningProgress, time: Date, random: () => number): { progress: LearningProgress; minutes: number } {
  let updated = progress
  const queue = dueCards(updated, time)
  if (queue.length === 0) return { progress: updated, minutes: 0 }
  let clock = time.getTime()
  for (const item of queue) {
    clock += 12_000
    const roll = random()
    let rating: SrsRating
    if (item.key.startsWith('item:')) rating = autoRating(roll > 0.25, { seconds: roll > 0.85 ? 14 : 6 })
    else if (item.isNew) rating = roll < 0.22 ? 'again' : roll < 0.34 ? 'hard' : roll < 0.92 ? 'good' : 'easy'
    else rating = roll < 0.1 ? 'again' : roll < 0.2 ? 'hard' : roll < 0.93 ? 'good' : 'easy'
    updated = update.reviewSrsCard(updated, item.key, rating, new Date(clock))
    // quên -> hỏi lại cuối phiên (học lại trong phiên) và lần này nhớ
    if (rating === 'again') updated = update.reviewSrsCard(updated, item.key, 'good', new Date(clock + 6 * MINUTE))
  }
  const minutes = Math.max(1, Math.round((queue.length * 12) / 60))
  updated = update.completeReviewSession(updated, minutes, new Date(clock + 6 * MINUTE))
  return { progress: updated, minutes }
}

/** Làm 1 bài học: trả lời từng bài tập (ghi thống kê + sổ lỗi + thẻ item:), câu sai làm lại cuối bài, rồi hoàn thành. */
function simulateLesson(progress: LearningProgress, lesson: Lesson, time: Date, accuracy: number, random: () => number): LearningProgress {
  let updated = progress
  let clock = time.getTime()
  let correctCount = 0
  const wrong: Exercise[] = []
  const exercises = lesson.exercises.length ? lesson.exercises : lesson.miniTest
  for (const exercise of exercises) {
    clock += 25_000
    const autoGraded = AUTO_GRADED.includes(exercise.type)
    const correct = !autoGraded || random() < Math.min(0.97, accuracy + SKILL_DIFFICULTY[lesson.skill])
    let mistake: NewMistake | undefined
    if (!correct) {
      const check = checkExerciseAnswer(exercise, plausibleWrongAnswer(exercise, random))
      mistake = {
        source: 'lesson',
        itemId: exercise.id,
        parentId: lesson.id,
        question: check.questionText,
        userAnswer: check.userAnswerText,
        correctAnswer: check.correctAnswerText,
        explanation: exercise.explanation?.vi,
      }
      wrong.push(exercise)
    } else correctCount++
    updated = update.recordAnswer(updated, { skill: lesson.skill, correct, itemKey: autoGraded ? exercise.id : undefined, mistake }, new Date(clock))
  }
  // câu sai quay lại cuối bài (psych-adult D3 luật 9): phần lớn làm đúng ở lần 2
  for (const exercise of wrong) {
    clock += 25_000
    const correct = random() < 0.7
    updated = update.recordAnswer(updated, { skill: lesson.skill, correct, itemKey: exercise.id }, new Date(clock))
  }
  const minutes = lesson.estimatedMinutes ?? Math.round(5 + random() * 5)
  updated = update.completeLesson(
    updated,
    { lessonId: lesson.id, accuracy: exercises.length ? correctCount / exercises.length : 1, learnedWordIds: (lesson.words ?? []).map((word) => word.id), minutes },
    new Date(clock),
  )
  return update.addXp(updated, 10 + correctCount * 2, new Date(clock))
}

/** Làm 1 đề thi thử: ghi vài câu sai vào sổ lỗi (nguồn 'exam') đúng định dạng phòng thi. */
function simulateMockExam(progress: LearningProgress, time: Date, random: () => number): LearningProgress {
  let updated = progress
  const exam = ALL_EXAMS.find((candidate) => candidate.kind === 'mock-ielts')
  if (!exam) return updated
  for (const section of exam.sections) {
    for (const part of section.parts ?? []) {
      for (const question of part.questions) {
        if (random() > 0.32) continue // ~1/3 số câu sai
        const correctAnswer = question.kind === 'choice' ? question.options[question.correctIndex] : question.kind === 'true-false-not-given' ? question.answer : question.acceptedAnswers[0]
        const userAnswer =
          question.kind === 'choice'
            ? question.options[(question.correctIndex + 1) % question.options.length]
            : question.kind === 'true-false-not-given'
              ? question.answer === 'NOT GIVEN'
                ? 'FALSE'
                : 'NOT GIVEN'
              : ''
        updated = update.recordMistake(
          updated,
          {
            source: 'exam',
            itemId: question.id,
            parentId: exam.id,
            question: `[${exam.id} · ${section.skill} · Q${question.number}] ${question.prompt}`,
            userAnswer,
            correctAnswer,
            explanation: question.explanation?.vi,
            context: (part.passage?.text ?? part.audioScript ?? '').slice(0, 1500),
          },
          time,
        )
      }
    }
  }
  return update.markStudyDay(update.addStudyMinutes(updated, 40, time), 'exam', time)
}

/**
 * Tạo tiến độ mẫu. `now` = thời điểm "hiện tại" của dữ liệu (ngày học cuối = hôm qua lúc 20:30,
 * để mở web hôm nay là có thẻ đến hạn và thấy trạng thái "chưa học hôm nay").
 */
export function buildDemoProgress(profile: DemoProfile, now = new Date(), seed = 2026): LearningProgress {
  const recipe = RECIPES[profile]
  const random = seededRandom(seed)
  const yesterdayEvening = new Date(now)
  yesterdayEvening.setDate(yesterdayEvening.getDate() - 1)
  yesterdayEvening.setHours(20, 30, 0, 0)
  const firstDay = new Date(yesterdayEvening.getTime() - (recipe.days - 1) * DAY)

  let progress: LearningProgress = createEmptyProgress()
  progress = update.setProfile(progress, {
    track: recipe.track,
    dailyGoalMinutes: recipe.dailyGoalMinutes,
    studyTime: '20:30',
    studyCue: 'Sau khi ăn tối',
  })
  if (recipe.placement) progress = update.setPlacement(progress, { ...recipe.placement, track: recipe.track }, new Date(firstDay.getTime() - 30 * MINUTE))

  const path = recipe.levels.flatMap((level) => pathLessonIds(recipe.track, level))
  let pathIndex = 0
  let writingCount = 0
  let savedWordCount = 0
  const writingBands = [
    { selfBand: 6, aiLow: 4.5, aiHigh: 5 },
    { selfBand: 6, aiLow: 5, aiHigh: 5.5 },
    { selfBand: 5.5, aiLow: 5, aiHigh: 5.5 },
    { selfBand: 5.5, aiLow: 5, aiHigh: 6 },
    { selfBand: 6, aiLow: 5.5, aiHigh: 6 },
  ]

  for (let day = 0; day < recipe.days; day++) {
    if (recipe.skipDays.includes(day)) continue
    // giờ học dao động quanh 20:30 (±40 phút)
    const start = new Date(firstDay.getTime() + day * DAY + Math.round((random() - 0.5) * 80) * MINUTE)
    const t01 = day / Math.max(1, recipe.days - 1)

    // 1) ôn thẻ đến hạn trước (như nút "Ôn ngay" ở cột phải)
    const review = simulateReviewSession(progress, start, random)
    progress = review.progress
    let clock = start.getTime() + (review.minutes + 2) * MINUTE

    // 2) học bài mới theo đúng thứ tự lộ trình
    const lessonCount = recipe.lessonsPerDay(day, random)
    for (let n = 0; n < lessonCount && pathIndex < path.length; n++) {
      const lesson = findLessonById(path[pathIndex++])
      if (!lesson) continue
      const level = progress.currentLevel[recipe.track]
      progress = simulateLesson(progress, lesson, new Date(clock), recipe.accuracyAt(t01, level), random)
      clock += (lesson.estimatedMinutes ?? 8) * MINUTE
      // bài viết (Writing) có nhật ký: tự chấm trước, AI chấm sau (khoảng lệch thu hẹp dần)
      if (lesson.skill === 'writing' && (lesson.writingTask || level === 'level-3') && writingCount < writingBands.length) {
        const band = writingBands[writingCount++]
        progress = update.logWriting(progress, { taskId: lesson.writingTask?.id ?? lesson.id, words: 170 + Math.round(random() * 110), ...band }, new Date(clock))
        if (writingCount >= 2) progress = update.updateBandEstimate(progress, 'writing', band.aiLow, band.aiHigh, writingCount >= 4 ? 'medium' : 'low', new Date(clock))
      }
    }

    // 3) thỉnh thoảng làm lại câu sai ở sổ lỗi (đúng -> "lỗi đã sửa")
    if (day % 2 === 1) {
      const open = progress.mistakes.filter((mistake) => !mistake.resolved && mistake.source !== 'exam').slice(-8)
      for (const mistake of open) {
        clock += 40_000
        if (random() < 0.75) {
          const skill = findExercise(mistake.itemId)?.lesson.skill ?? 'vocabulary'
          progress = update.recordAnswer(progress, { skill, correct: true, itemKey: mistake.itemId }, new Date(clock))
          progress = update.setMistakeResolved(progress, mistake.id, true)
        }
      }
    }

    // 4) hồ sơ IELTS: 1 đề thi thử sau ~6 tuần -> band Nghe/Đọc từ đề thi
    if (profile === 'ielts-learner' && day === recipe.days - 9) {
      progress = simulateMockExam(progress, new Date(clock + 10 * MINUTE), random)
      progress = update.updateBandEstimate(progress, 'listening', 4.5, 5.5, 'medium', new Date(clock + 60 * MINUTE))
      progress = update.updateBandEstimate(progress, 'reading', 5, 5.5, 'medium', new Date(clock + 60 * MINUTE))
    }

    // 5) hồ sơ IELTS, 6 ngày cuối: "Lưu vào sổ từ" vài từ gặp khi đọc bài (thẻ mới, hẹn ôn từ hôm sau)
    if (profile === 'ielts-learner' && day >= recipe.days - 6) {
      const extraWords = SAVED_WORD_LESSONS.flatMap((lessonId) => findLessonById(lessonId)?.words ?? [])
      for (const word of extraWords.slice(savedWordCount, savedWordCount + 5)) {
        const key = `word:${word.id}`
        if (progress.srs[key]) continue
        const tomorrow = new Date(clock)
        tomorrow.setDate(tomorrow.getDate() + 1)
        tomorrow.setHours(0, 0, 0, 0)
        progress = { ...progress, srs: { ...progress.srs, [key]: createSrsCard(new Date(clock), tomorrow) } }
      }
      savedWordCount += 5
    }
  }
  return progress
}

/** Bài từ vựng B1–B2 (level-3 general) — nguồn từ "lưu vào sổ" của hồ sơ IELTS. */
const SAVED_WORD_LESSONS = ['l3-g-u1-vocab', 'l3-g-u2-vocab', 'l3-g-u3-vocab', 'l3-g-u4-vocab', 'l3-g-u5-vocab']
