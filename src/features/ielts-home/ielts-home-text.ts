/**
 * ielts-home-text.ts — CHỮ GIAO DIỆN TRANG "LUYỆN THI IELTS" (/ielts)
 * ----------------------------------------------------------------------------
 * Giọng văn khu IELTS: nghiêm túc, rõ ràng như một kế hoạch ôn thi — không mascot,
 * không XP, không "trạm tuần tra". Theo nút VI/EN của web (useLanguage).
 * ----------------------------------------------------------------------------
 */
import { useMemo } from 'react'
import type { LessonMode, SkillName } from '../../content/content-types'
import { useLanguage } from '../../translations/language-context'

const VI = {
  eyebrow: 'Chế độ luyện thi IELTS',
  title: 'Kế hoạch luyện thi',
  intro: 'Luyện từng dạng đề theo kỹ năng, chấm theo band, rồi thi thử có giờ. Học theo module từ trên xuống.',
  targetLabel: 'Mục tiêu',
  targetBand: 'Band 6.5',
  mockTest: 'Vào phòng thi thử',
  switchToGeneral: 'Sang Tiếng Anh tổng quát',
  skillsTitle: 'Band ước tính theo kỹ năng',
  skillName: { listening: 'Listening', reading: 'Reading', writing: 'Writing', speaking: 'Speaking', vocabulary: 'Vocabulary' } as Record<SkillName, string>,
  bandRange: (low: number, high: number) => (low === high ? `Band ${low}` : `Band ${low} – ${high}`),
  noBand: 'Chưa có band',
  accuracy: (percent: number, answered: number) => `${percent}% đúng · ${answered} câu`,
  noAnswers: 'Làm đủ 20 câu để ước tính band',
  nextTitle: 'Bài tiếp theo trong kế hoạch',
  nextResume: 'Đang làm dở',
  nextStart: 'Làm bài',
  allDone: 'Bạn đã làm hết các bài đang mở. Vào phòng thi thử để kiểm tra band.',
  levelTabs: 'Chọn giai đoạn',
  levelTab: (n: number, band: string) => `Giai đoạn ${n} · band ${band}`,
  locked: 'Giai đoạn này mở khi bạn qua bài kiểm tra cuối giai đoạn trước (hoặc bài xếp lớp cho kết quả cao hơn).',
  moduleLabel: (n: number) => `Module ${n}`,
  moduleProgress: (done: number, total: number) => `${done}/${total} bài`,
  colLesson: 'Bài',
  colType: 'Dạng',
  colTime: 'Thời gian',
  colResult: 'Kết quả',
  mode: { practice: 'Luyện tập', listening: 'Bài nghe', reading: 'Bài đọc', writing: 'Bài viết', speaking: 'Bài nói' } as Record<LessonMode, string>,
  minutes: (n: number) => `${n} phút`,
  best: (percent: number) => `${percent}%`,
  notYet: '—',
  doLesson: 'Làm',
  redoLesson: 'Làm lại',
  lockedShort: 'Chưa mở',
}

type IeltsHomeText = typeof VI

const EN: IeltsHomeText = {
  eyebrow: 'IELTS prep mode',
  title: 'Your study plan',
  intro: 'Practise each question type skill by skill, check your band, then sit a timed mock test. Work through the modules from the top.',
  targetLabel: 'Target',
  targetBand: 'Band 6.5',
  mockTest: 'Go to mock tests',
  switchToGeneral: 'Switch to General English',
  skillsTitle: 'Estimated band by skill',
  skillName: { listening: 'Listening', reading: 'Reading', writing: 'Writing', speaking: 'Speaking', vocabulary: 'Vocabulary' },
  bandRange: (low, high) => (low === high ? `Band ${low}` : `Band ${low} – ${high}`),
  noBand: 'No band yet',
  accuracy: (percent, answered) => `${percent}% correct · ${answered} questions`,
  noAnswers: 'Answer 20 questions to get a band estimate',
  nextTitle: 'Next in your plan',
  nextResume: 'In progress',
  nextStart: 'Start',
  allDone: "You've done every open lesson. Take a mock test to check your band.",
  levelTabs: 'Choose a stage',
  levelTab: (n, band) => `Stage ${n} · band ${band}`,
  locked: 'This stage opens when you pass the previous stage test (or your placement result is higher).',
  moduleLabel: (n) => `Module ${n}`,
  moduleProgress: (done, total) => `${done}/${total} lessons`,
  colLesson: 'Lesson',
  colType: 'Type',
  colTime: 'Time',
  colResult: 'Result',
  mode: { practice: 'Practice', listening: 'Listening task', reading: 'Reading task', writing: 'Writing task', speaking: 'Speaking task' },
  minutes: (n) => `${n} min`,
  best: (percent) => `${percent}%`,
  notYet: '—',
  doLesson: 'Start',
  redoLesson: 'Redo',
  lockedShort: 'Locked',
}

export function useIeltsHomeText(): IeltsHomeText {
  const { language } = useLanguage()
  return useMemo(() => (language === 'en' ? EN : VI), [language])
}
