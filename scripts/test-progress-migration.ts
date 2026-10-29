/**
 * test-progress-migration.ts — KIỂM THỬ KHO TIẾN ĐỘ v2 (không cần trình duyệt)
 * Chạy: npm run test:progress
 *
 * Kiểm tra:
 *   1. Chuyển 1 tiến độ v1 "giống thật" sang v2: giữ XP, chuỗi, bài đã học, sổ lỗi, nhiệm vụ...
 *   2. Chuyển lần 2 không đổi gì (idempotent); dữ liệu rỗng / thiếu trường không làm sập
 *   3. Luật chuỗi: freeze tự kiếm + tự dùng, chuỗi đứt -> sửa trong 48 giờ bằng 2 bài
 *   4. Hoàn thành bài: thẻ từ vựng, xoá chỗ đang làm, tự mở level sau khi học hết level
 *   5. Trả lời câu hỏi -> thống kê kỹ năng, sổ lỗi, thẻ "item:"; ôn thẻ FSRS
 *   6. Hàng đợi ôn: giới hạn thẻ mới theo level, nợ ôn > 150 thì dừng thẻ mới
 *   7. Khu trẻ em: 5 hộp Leitner
 *   8. Lộ trình: "Học tiếp" (bài dở trước), tiến độ level, "còn N bài tới mốc"
 *   9. Chọn bản mới hơn giữa localStorage và máy chủ
 */
import assert from 'node:assert/strict'
import { findLevelInfo } from '../src/content/all-levels'
import { LEGACY_LESSONS } from '../src/content/lesson-registry'
import { findNextLesson, levelProgress, pathLessonIds, unitProgress, unitsFor } from '../src/content/path-selectors'
import { BACKLOG_PAUSE_THRESHOLD, createSrsCard, dueCards, newCardsPerDayLimit, reviewCard, srsQueueInfo } from '../src/learning-progress/fsrs-scheduler'
import { answerKidsWord, kidsWordsDueToday } from '../src/learning-progress/kids-word-boxes'
import { chooseNewerProgress, migrateProgress } from '../src/learning-progress/progress-migration'
import type { LearningProgress, LearningProgressV1 } from '../src/learning-progress/progress-types'
import * as update from '../src/learning-progress/progress-updates'
import { settleStreak, streakSummary } from '../src/learning-progress/streak-rules'
import { addDays, todayString } from '../src/learning-progress/study-calendar'

let passed = 0
function test(name: string, run: () => void) {
  try {
    run()
    passed++
    console.log(`  ✓ ${name}`)
  } catch (error) {
    console.error(`  ✗ ${name}`)
    throw error
  }
}

/** Thời điểm giả: 10h sáng của 1 ngày "YYYY-MM-DD" (giờ máy). */
const at = (day: string, hour = 10) => new Date(`${day}T${String(hour).padStart(2, '0')}:00:00`)
const TODAY = todayString()
const daysAgo = (n: number) => addDays(TODAY, -n)

/* ============================================================================
 * Dữ liệu v1 "giống thật": học 12 ngày liền, xong 14 bài Level 1 + 2 bài Level 2
 * ========================================================================== */
const v1Lessons: LearningProgressV1['lessons'] = {}
for (const id of ['l1-vocab-01', 'l1-vocab-02', 'l1-vocab-03', 'l1-listen-01', 'l1-listen-02', 'l1-read-01', 'l1-read-02', 'l1-speak-01', 'l1-speak-02', 'l1-write-01', 'l1-write-02', 'l1-vocab-04', 'l1-listen-03', 'l1-read-03', 'l2-vocab-01', 'l2-read-01']) {
  v1Lessons[id] = { completedAt: `${daysAgo(3)}T09:00:00.000Z`, bestAccuracy: 0.85 }
}
const v1: LearningProgressV1 = {
  version: 1,
  xpTotal: 1234,
  xpByDay: { [daysAgo(2)]: 40, [daysAgo(1)]: 55, [TODAY]: 0, [daysAgo(5)]: 30 },
  dailyGoalXp: 50,
  streak: { current: 12, longest: 15, lastStudyDate: daysAgo(1) },
  lessons: v1Lessons,
  miniTests: { 'l1-vocab-01': { passedAt: '2026-10-01T10:00:00.000Z', stars: 3, attempts: 2 } },
  levelTests: { 'level-1': { passedAt: '2026-10-10T10:00:00.000Z', percent: 82 } },
  placement: { recommendedLevelOrder: 3, estimatedBand: '3.0 – 4.0', takenAt: '2026-09-01T10:00:00.000Z' },
  unlockedLevelOrder: 3,
  reviewCards: {
    'word:l1-family-mother': { box: 3, dueDate: daysAgo(1) },
    'word:l1-family-father': { box: 5, dueDate: addDays(TODAY, 20) },
    'exercise:l1-vocab-01-ex03': { box: 0, dueDate: TODAY },
  },
  mistakes: [
    {
      id: 'l1-vocab-01-ex03-1700000000000',
      source: 'lesson',
      itemId: 'l1-vocab-01-ex03',
      parentId: 'l1-vocab-01',
      question: 'She ___ a teacher.',
      userAnswer: 'are',
      correctAnswer: 'is',
      createdAt: '2026-10-05T10:00:00.000Z',
      timesWrong: 2,
      resolved: false,
    },
  ],
  lifetimeStats: { lessons: 16, xp: 1234, studyDays: 20, reviews: 40 },
  questCounters: { day: '2026-10-28', week: '2026-W44', daily: { lessons: 1 }, weekly: { lessons: 4 } },
  claimedRewards: ['daily:2026-10-28:d-lessons-2'],
  unlockedAchievements: ['lessons-1', 'streak-7'],
  rewardedAccountLevel: 4,
}

console.log('\n1. Chuyển đổi v1 -> v2')
const v2 = migrateProgress(JSON.parse(JSON.stringify(v1)))

test('version 2, giữ XP và XP theo ngày', () => {
  assert.equal(v2.version, 2)
  assert.equal(v2.xpTotal, 1234)
  assert.deepEqual(v2.xpByDay, v1.xpByDay)
})
test('giữ chuỗi + tặng freeze theo chuỗi (12 ngày -> 1 freeze)', () => {
  assert.equal(v2.streak.current, 12)
  assert.equal(v2.streak.longest, 15)
  assert.equal(v2.streak.lastStudyDate, daysAgo(1))
  assert.equal(v2.streak.freezes, 1)
})
test('giữ bài đã học theo id cũ (attempts = 1), mini-test, test level', () => {
  assert.equal(Object.keys(v2.lessons).length, 16)
  assert.equal(v2.lessons['l1-vocab-01'].bestAccuracy, 0.85)
  assert.equal(v2.lessons['l1-vocab-01'].attempts, 1)
  assert.equal(v2.miniTests['l1-vocab-01'].stars, 3)
  assert.equal(v2.levelTests['level-1'].percent, 82)
})
test('thẻ Leitner -> FSRS: word giữ key, exercise -> item; hộp -> độ bền', () => {
  const mother = v2.srs['word:l1-family-mother']
  assert.equal(mother.state, 2)
  assert.equal(mother.stability, 7)
  assert.equal(v2.srs['word:l1-family-father'].stability, 30)
  const item = v2.srs['item:l1-vocab-01-ex03']
  assert.ok(item, 'thiếu thẻ item:')
  assert.equal(item.state, 0)
  assert.equal(v2.srs['exercise:l1-vocab-01-ex03'], undefined)
})
test('level cũ 3 -> level-2 (mở level-1, level-2), xếp lớp có band dạng khoảng', () => {
  assert.equal(v2.currentLevel.general, 'level-2')
  assert.equal(v2.currentLevel.ielts, 'level-2')
  assert.deepEqual(v2.unlockedLevels.general, ['level-1', 'level-2'])
  assert.deepEqual(v2.placement && { level: v2.placement.level, low: v2.placement.bandLow, high: v2.placement.bandHigh }, { level: 'level-2', low: 3, high: 4 })
})
test('giữ sổ lỗi sai + các trường trò chơi hoá', () => {
  assert.equal(v2.mistakes.length, 1)
  assert.equal(v2.mistakes[0].timesWrong, 2)
  assert.deepEqual(v2.lifetimeStats, v1.lifetimeStats)
  assert.deepEqual(v2.claimedRewards, v1.claimedRewards)
  assert.deepEqual(v2.unlockedAchievements, v1.unlockedAchievements)
  assert.equal(v2.rewardedAccountLevel, 4)
})
test('mục tiêu 50 XP -> 15 phút; ngày có XP -> studyDates; trường mới có mặc định', () => {
  assert.equal(v2.profile.dailyGoalMinutes, 15)
  assert.deepEqual(v2.studyDates, [daysAgo(5), daysAgo(2), daysAgo(1)])
  assert.equal(v2.resume, null)
  assert.equal(v2.kids, null)
  assert.equal(v2.skillStats.reading.answered, 0)
  assert.equal(v2.savedAt, '')
})

console.log('\n2. Chuyển lại / dữ liệu lạ')
test('chuyển bản v2 lần nữa không đổi gì', () => {
  assert.deepEqual(migrateProgress(JSON.parse(JSON.stringify(v2))), v2)
})
test('null / chuỗi / object rỗng / v1 thiếu trường không làm sập', () => {
  assert.equal(migrateProgress(null).version, 2)
  assert.equal(migrateProgress('abc').xpTotal, 0)
  const partial = migrateProgress({ xpTotal: 50, streak: { current: 3 } })
  assert.equal(partial.xpTotal, 50)
  assert.equal(partial.streak.current, 3)
  assert.equal(partial.currentLevel.general, 'level-1')
  const brokenV2 = migrateProgress({ version: 2, currentLevel: { general: 'level-3' }, skillStats: null, srs: [] })
  assert.deepEqual(brokenV2.unlockedLevels.general, ['level-1', 'level-3'])
  assert.deepEqual(brokenV2.srs, {})
})

console.log('\n3. Luật chuỗi ngày')
test('học 7 ngày liền -> chuỗi 7 + kiếm 1 freeze; tối đa 2', () => {
  let p: LearningProgress = migrateProgress(null)
  const start = '2026-03-02'
  for (let i = 0; i < 7; i++) p = update.markStudyDay(p, 'lesson', at(addDays(start, i)))
  assert.equal(p.streak.current, 7)
  assert.equal(p.streak.freezes, 1)
  for (let i = 7; i < 21; i++) p = update.markStudyDay(p, 'lesson', at(addDays(start, i)))
  assert.equal(p.streak.current, 21)
  assert.equal(p.streak.freezes, 2)
  assert.equal(p.lifetimeStats.studyDays, 21)
})
test('học 2 lần trong 1 ngày không tăng chuỗi', () => {
  let p = update.markStudyDay(migrateProgress(null), 'lesson', at('2026-03-02', 8))
  p = update.markStudyDay(p, 'review', at('2026-03-02', 20))
  assert.equal(p.streak.current, 1)
  assert.equal(p.studyDates.length, 1)
})
test('lỡ 1 ngày có freeze -> tự dùng freeze, chuỗi giữ nguyên rồi +1', () => {
  let p: LearningProgress = migrateProgress(null)
  for (let i = 0; i < 7; i++) p = update.markStudyDay(p, 'lesson', at(addDays('2026-03-02', i)))
  // ngày 8 (03-09) bỏ học; ngày 9 (03-10) quay lại
  const settled = settleStreak(p.streak, at('2026-03-10'))
  assert.equal(settled.current, 7)
  assert.equal(settled.freezes, 0)
  p = update.markStudyDay(p, 'lesson', at('2026-03-10'))
  assert.equal(p.streak.current, 8)
})
test('chuỗi đứt -> mở cửa sổ sửa 48 giờ; học 2 bài -> trả lại chuỗi cũ', () => {
  let p: LearningProgress = migrateProgress(null)
  for (let i = 0; i < 5; i++) p = update.markStudyDay(p, 'lesson', at(addDays('2026-03-02', i))) // 02..06: chuỗi 5, chưa có freeze
  const back = at('2026-03-09') // vắng 07, 08
  const summary = streakSummary(p, back)
  assert.equal(summary.current, 0)
  assert.equal(summary.repairAvailable, true)
  assert.equal(summary.repairLessonsLeft, 2)
  p = update.markStudyDay(p, 'lesson', back)
  assert.equal(p.streak.current, 1)
  assert.equal(p.streak.repairLessonsDone, 1)
  p = update.markStudyDay(p, 'lesson', at('2026-03-09', 11))
  assert.equal(p.streak.current, 6) // 5 cũ + 1 hôm nay
  assert.equal(p.streak.repairUntil, undefined)
})
test('cửa sổ sửa hết hạn sau 48 giờ; vắng quá lâu thì không có cửa sổ', () => {
  let p: LearningProgress = migrateProgress(null)
  for (let i = 0; i < 5; i++) p = update.markStudyDay(p, 'lesson', at(addDays('2026-03-02', i)))
  const broken = settleStreak(p.streak, at('2026-03-09'))
  assert.ok(broken.repairUntil)
  assert.equal(settleStreak(broken, at('2026-03-12')).repairUntil, undefined)
  assert.equal(settleStreak(p.streak, at('2026-03-20')).repairUntil, undefined)
})
test('"Tuần này x/7" và tổng ngày học không bao giờ reset', () => {
  let p: LearningProgress = migrateProgress(null)
  for (const day of ['2026-03-02', '2026-03-03', '2026-03-05']) p = update.markStudyDay(p, 'lesson', at(day)) // thứ 2, 3, 5
  const summary = streakSummary(p, at('2026-03-08'))
  assert.equal(summary.thisWeekDays, 3)
  assert.equal(summary.totalStudyDays, 3)
  assert.equal(summary.current, 0) // đã đứt nhưng 2 số kia vẫn còn
})
test('XP không còn tự tăng chuỗi', () => {
  const p = update.addXp(migrateProgress(null), 30, at('2026-03-02'))
  assert.equal(p.xpTotal, 30)
  assert.equal(p.streak.current, 0)
  assert.equal(p.lifetimeStats.xp, 30)
})

console.log('\n4. Hoàn thành bài + mở level')
test('completeLesson: kết quả, thẻ từ (hẹn mai), xoá chỗ đang làm, chuỗi, phút học', () => {
  const now = at('2026-03-02')
  let p = update.startLesson(migrateProgress(null), 'l1-vocab-01', ['card-1', 'ex-1', 'ex-2'], now)
  p = update.saveResume(p, { lessonId: 'l1-vocab-01', stepIndex: 2, queue: ['card-1', 'ex-1', 'ex-2'], answers: { 'ex-1': 'is' } }, now)
  assert.equal(p.resume?.stepIndex, 2)
  p = update.completeLesson(p, { lessonId: 'l1-vocab-01', accuracy: 0.9, learnedWordIds: ['w1', 'w2'], minutes: 6 }, now)
  assert.equal(p.lessons['l1-vocab-01'].attempts, 1)
  assert.equal(p.resume, null)
  assert.equal(p.srs['word:w1'].state, 0)
  assert.ok(new Date(p.srs['word:w1'].due) > now)
  assert.equal(p.streak.current, 1)
  assert.equal(p.minutesByDay['2026-03-02'], 6)
  assert.equal(p.lifetimeStats.lessons, 1)
  p = update.completeLesson(p, { lessonId: 'l1-vocab-01', accuracy: 0.7, learnedWordIds: ['w1'], minutes: 4 }, now)
  assert.equal(p.lessons['l1-vocab-01'].attempts, 2)
  assert.equal(p.lessons['l1-vocab-01'].bestAccuracy, 0.9)
})
test('học hết Level 1 -> tự mở và chuyển sang Level 2 (cả 2 track vì chặng dùng chung)', () => {
  let p: LearningProgress = migrateProgress(null)
  const ids = pathLessonIds('general', 'level-1')
  assert.equal(ids.length, 50)
  for (const id of ids) p = update.completeLesson(p, { lessonId: id, accuracy: 1, learnedWordIds: [], minutes: 5 }, at('2026-03-02'))
  assert.equal(p.currentLevel.general, 'level-2')
  assert.equal(p.currentLevel.ielts, 'level-2')
  assert.ok(p.unlockedLevels.general.includes('level-2'))
})
test('qua test cuối level -> mở level sau', () => {
  const p = update.passLevelTest(migrateProgress(null), 'level-1', 85, at('2026-03-02'))
  assert.equal(p.currentLevel.general, 'level-2')
  assert.equal(p.levelTests['level-1'].percent, 85)
})
test('xếp lớp cũ 5 -> level-2, mở thêm level-3', () => {
  const p = update.setLegacyPlacement(migrateProgress(null), 5, '5.0 – 6.0')
  assert.equal(p.currentLevel.general, 'level-2')
  assert.deepEqual(p.unlockedLevels.general, ['level-1', 'level-2', 'level-3'])
})

console.log('\n5. Trả lời câu hỏi, sổ lỗi, thẻ ôn FSRS')
test('trả lời sai có itemKey -> thống kê + sổ lỗi + thẻ item; đúng lại khi đến hạn -> chấm Good', () => {
  const now = at('2026-03-02')
  let p = update.recordAnswer(
    migrateProgress(null),
    {
      skill: 'reading',
      correct: false,
      itemKey: 'l1-read-01-ex01',
      mistake: { source: 'lesson', itemId: 'l1-read-01-ex01', parentId: 'l1-read-01', question: 'Q', userAnswer: 'A', correctAnswer: 'B' },
    },
    now,
  )
  assert.deepEqual(p.skillStats.reading, { answered: 1, correct: 0, recent: [0] })
  assert.equal(p.mistakes.length, 1)
  const card = p.srs['item:l1-read-01-ex01']
  assert.equal(card.state, 0)
  p = update.recordAnswer(p, { skill: 'reading', correct: true, itemKey: 'l1-read-01-ex01' }, at('2026-03-02', 11))
  assert.equal(p.skillStats.reading.correct, 1)
  assert.notEqual(p.srs['item:l1-read-01-ex01'].state, 0)
})
test('chỉ giữ 40 câu gần nhất', () => {
  let p: LearningProgress = migrateProgress(null)
  for (let i = 0; i < 50; i++) p = update.recordAnswer(p, { skill: 'listening', correct: i % 2 === 0 })
  assert.equal(p.skillStats.listening.recent.length, 40)
  assert.equal(p.skillStats.listening.answered, 50)
})
test('ôn thẻ: Good đẩy lịch ra xa, Again giữ gần; đếm "reviews"', () => {
  const now = at('2026-03-02')
  const card = createSrsCard(now)
  const good = reviewCard(card, 'good', 'word:x', now)
  const again = reviewCard(card, 'again', 'word:x', now)
  assert.ok(new Date(good.due).getTime() - now.getTime() > 86_400_000, 'Good phải hẹn ≥ 1 ngày')
  assert.ok(new Date(again.due).getTime() - now.getTime() < 3_600_000, 'Again phải hỏi lại trong ngày')
  assert.equal(good.firstReviewOn, '2026-03-02')
  const p = update.reviewSrsCard(migrateProgress(null), 'word:x', 'good', now)
  assert.equal(p.lifetimeStats.reviews, 1)
})
test('thẻ lạ không làm sập: "lần ôn trước" ở tương lai, ngày giờ hỏng, ôn sớm trước hạn', () => {
  const now = at('2026-03-02')
  const futureReview = { ...createSrsCard(now), state: 2 as const, stability: 5, stabilityFast: 5, difficulty: 5, reps: 2, lastReview: '2030-01-01T00:00:00.000Z' }
  assert.ok(new Date(reviewCard(futureReview, 'good', 'word:e', now).due) > now)
  const garbage = { ...createSrsCard(now), due: 'xx', lastReview: 'yy', stability: NaN }
  assert.ok(new Date(reviewCard(garbage, 'good', 'word:f', now).due) > now)
  const scheduledTomorrow = createSrsCard(now, at('2026-03-03', 0))
  assert.ok(new Date(reviewCard(scheduledTomorrow, 'good', 'word:g', now).due) > now)
})
test('thẻ cũ chuyển từ Leitner ôn tiếp được', () => {
  const next = reviewCard(v2.srs['word:l1-family-mother'], 'good', 'word:l1-family-mother', new Date())
  assert.ok(next.stability > 7)
})

console.log('\n6. Hàng đợi ôn hôm nay')
test('giới hạn thẻ mới theo level (level-1: 5/ngày)', () => {
  const now = at('2026-03-02')
  let p: LearningProgress = migrateProgress(null)
  const srs: LearningProgress['srs'] = {}
  for (let i = 0; i < 20; i++) srs[`word:n${i}`] = createSrsCard(at('2026-03-01'))
  p = { ...p, srs }
  assert.equal(newCardsPerDayLimit(p), 5)
  assert.equal(dueCards(p, now).length, 5)
  p = update.reviewSrsCard(p, 'word:n0', 'good', now)
  assert.equal(dueCards(p, now).filter((item) => item.isNew).length, 4)
})
test(`nợ ôn > ${BACKLOG_PAUSE_THRESHOLD} -> dừng thẻ mới, tối đa 100 lượt / ngày`, () => {
  const now = at('2026-06-01')
  const srs: LearningProgress['srs'] = {}
  for (let i = 0; i < 160; i++) srs[`word:old${i}`] = { ...reviewCard(createSrsCard(at('2026-03-01')), 'good', `word:old${i}`, at('2026-03-01')) }
  for (let i = 0; i < 10; i++) srs[`word:new${i}`] = createSrsCard(at('2026-03-01'))
  const p: LearningProgress = { ...migrateProgress(null), srs }
  const info = srsQueueInfo(p, now)
  assert.equal(info.dueReviews, 160)
  assert.equal(info.backlogPaused, true)
  const queue = dueCards(p, now)
  assert.equal(queue.length, 100)
  assert.ok(queue.every((item) => !item.isNew))
})

console.log('\n7. Khu trẻ em (Leitner 5 hộp)')
test('đúng lên hộp, gợi ý giữ hộp, sai ở hộp ≥ 2 lùi 2 hộp, sai ở hộp thấp về 0', () => {
  const day = '2026-03-02'
  let state = answerKidsWord(undefined, 'right', day)
  assert.equal(state.box, 1)
  assert.equal(state.due, '2026-03-03')
  state = answerKidsWord(state, 'right-with-hint', day)
  assert.equal(state.box, 1)
  for (let i = 0; i < 4; i++) state = answerKidsWord(state, 'right', day)
  assert.equal(state.box, 5) // đã thuộc
  state = answerKidsWord(state, 'wrong', day)
  assert.equal(state.box, 3)
  state = answerKidsWord({ ...state, box: 1 }, 'wrong', day)
  assert.equal(state.box, 0)
  assert.equal(state.due, day)
})
test('kidsAnswerWord trong kho + cờ "vừa thuộc"; trần ôn 30 / ngày', () => {
  let p: LearningProgress = migrateProgress(null)
  let before = p
  for (let i = 0; i < 5; i++) {
    before = p
    p = update.kidsAnswerWord(p, 'kids-animals-cat', true, false, at('2026-03-02'))
  }
  assert.equal(p.kids?.words['kids-animals-cat'].box, 5)
  assert.equal(update.kidsWordJustMastered(before, p, 'kids-animals-cat'), true)
  const words: Record<string, ReturnType<typeof answerKidsWord>> = {}
  for (let i = 0; i < 40; i++) words[`w${i}`] = { box: (i % 3) as 0 | 1 | 2, due: '2026-03-01', seen: 1, right: 1, wrong: 0 }
  const due = kidsWordsDueToday({ ...p.kids!, words }, '2026-03-02')
  assert.equal(due.length, 30)
  assert.equal(words[due[0]].box, 0)
})
test('lượt chơi: kỷ lục, đếm lượt, tem tuần; trang phục phải mở khoá mới mặc được', () => {
  let p = update.kidsRecordBestScore(migrateProgress(null), 'listen-tap', 8, at('2026-03-02'))
  p = update.kidsRecordBestScore(p, 'listen-tap', 5, at('2026-03-03'))
  assert.equal(p.kids?.bestScores['listen-tap'], 8)
  assert.equal(p.kids?.weeklyStamps['2026-03-02']?.length, 2)
  p = update.kidsEquipOutfit(p, 'pilot')
  assert.equal(p.kids?.equippedOutfit, 'classic')
  p = update.kidsEquipOutfit(update.kidsUnlockOutfit(p, 'pilot'), 'pilot')
  assert.equal(p.kids?.equippedOutfit, 'pilot')
})

console.log('\n8. Lộ trình')
test('Level 1 + Level 2 có 9 chặng mỗi level, chứa đủ 100 bài cũ', () => {
  assert.equal(unitsFor('general', 'level-1').length, 9)
  assert.ok(unitsFor('ielts', 'level-2').length >= 9)
  const inPath = new Set([...pathLessonIds('general', 'level-1'), ...pathLessonIds('general', 'level-2')])
  for (const lesson of LEGACY_LESSONS) assert.ok(inPath.has(lesson.id), `${lesson.id} không có trên lộ trình`)
  assert.equal(findLevelInfo('level-2')?.bandRange, '2.0 – 4.0')
})
test('"Học tiếp": bài đang dở trước, rồi bài chưa học đầu tiên của level hiện tại', () => {
  let p: LearningProgress = migrateProgress(null)
  assert.equal(findNextLesson(p)?.lesson.id, 'l1-vocab-01')
  p = update.completeLesson(p, { lessonId: 'l1-vocab-01', accuracy: 1, learnedWordIds: [], minutes: 5 })
  assert.equal(findNextLesson(p)?.lesson.id, unitsFor('general', 'level-1')[0].lessonIds[1])
  p = update.startLesson(p, 'l1-read-05', ['a'])
  const next = findNextLesson(p)
  assert.equal(next?.reason, 'resume')
  assert.equal(next?.lesson.id, 'l1-read-05')
  assert.equal(next?.unit?.id, 'u1-06-food')
})
test('tiến độ chặng / level + "còn N bài tới mốc"', () => {
  let p: LearningProgress = migrateProgress(null)
  const firstUnit = unitsFor('general', 'level-1')[0]
  p = update.completeLesson(p, { lessonId: firstUnit.lessonIds[0], accuracy: 1, learnedWordIds: [], minutes: 5 })
  const unit = unitProgress(firstUnit, p)
  assert.equal(unit.done, 1)
  assert.equal(unit.nextLessonId, firstUnit.lessonIds[1])
  const level = levelProgress('general', 'level-1', p)
  assert.equal(level.done, 1)
  assert.equal(level.total, 50)
  assert.equal(level.lessonsToNextMilestone, firstUnit.lessonIds.length - 1)
  assert.equal(level.nextMilestone?.kind, 'unit')
  assert.equal(level.currentUnit?.id, firstUnit.id)
})
test('tiến độ v1 đã chuyển: "Học tiếp" nằm ở Level 2', () => {
  const next = findNextLesson(v2)
  assert.equal(next?.levelId, 'level-2')
})

console.log('\n9. Bản trong máy vs máy chủ')
test('bản trong máy mới hơn -> dùng bản trong máy và gửi lên lại', () => {
  const local = { ...v2, xpTotal: 2000, savedAt: '2026-10-29T10:00:00.000Z' }
  const server = { ...v2, savedAt: '2026-10-29T09:00:00.000Z' }
  const chosen = chooseNewerProgress(local, server)
  assert.equal(chosen.source, 'cache')
  assert.equal(chosen.progress.xpTotal, 2000)
  assert.equal(chosen.needsUpload, true)
})
test('máy chủ còn bản v1 -> nâng cấp và gửi bản v2 lên; máy chủ mới hơn -> dùng máy chủ', () => {
  const fromV1 = chooseNewerProgress(null, v1)
  assert.equal(fromV1.progress.version, 2)
  assert.equal(fromV1.needsUpload, true)
  const serverNewer = chooseNewerProgress({ ...v2, savedAt: '2026-10-01T00:00:00.000Z' }, { ...v2, xpTotal: 5, savedAt: '2026-10-02T00:00:00.000Z' })
  assert.equal(serverNewer.source, 'server')
  assert.equal(serverNewer.progress.xpTotal, 5)
  assert.equal(serverNewer.needsUpload, false)
})
test('JSON tiến độ v2 của người học nhiều (1.500 thẻ + 300 lỗi) vẫn nhỏ hơn giới hạn 1,5MB của máy chủ', () => {
  let p: LearningProgress = v2
  const srs: LearningProgress['srs'] = {}
  for (let i = 0; i < 1500; i++) srs[`word:l1-some-long-word-id-${i}`] = createSrsCard()
  p = { ...p, srs, mistakes: Array.from({ length: 300 }, (_, i) => ({ ...v1.mistakes[0], id: `m${i}`, itemId: `i${i}` })) }
  const bytes = JSON.stringify(p).length
  assert.ok(bytes < 1_500_000, `JSON ${bytes} byte`)
})

console.log(`\nTất cả ${passed} kiểm thử đều qua ✓`)
