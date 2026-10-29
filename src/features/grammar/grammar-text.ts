/**
 * grammar-text.ts — CHỮ GIAO DIỆN CỦA KHU "NGỮ PHÁP" (/grammar và /grammar/:topicId)
 * ----------------------------------------------------------------------------
 *   const text = useGrammarText()
 *   text.title                    -> "Ngữ pháp" / "Grammar"
 *   text.lessonsDone(1, 3)        -> "1/3 bài" / "1/3 lessons"
 *
 * Theo nút VI/EN của web (useLanguage). Nội dung học (công thức, câu ví dụ) luôn là tiếng Anh.
 * Luật viết (04-DESIGN-SYSTEM mục 11): xưng "bạn", câu ngắn, tiêu đề ≤ 6 từ, không gây áp lực.
 * ----------------------------------------------------------------------------
 */
import { useMemo } from 'react'
import { fillMascotName } from '../../design-system/mascot-name'
import { useLanguage } from '../../translations/language-context'

const VI = {
  /* ---------- trang danh sách /grammar ---------- */
  eyebrow: 'Ngữ pháp',
  title: 'Ngữ pháp từ gốc tới 6.5',
  intro: 'Mỗi điểm ngữ pháp có lý thuyết ngắn và bài luyện. Học theo thứ tự, hoặc chọn đúng điểm bạn còn yếu.',
  levelTabsLabel: 'Chọn trình độ ngữ pháp',
  levelTab: (level: number) => `Level ${level}`,
  levelHeading: (level: number, name: string) => `Level ${level} · ${name}`,
  levelMeta: (cefr: string, band: string) => `CEFR ${cefr} · band ${band}`,
  topicsLearned: (done: number, total: number) => `${done}/${total} điểm đã học`,
  overallLabel: 'Đã học',
  overallUnit: (total: number) => `/${total} điểm`,
  lessonsDone: (done: number, total: number) => `${done}/${total} bài`,
  statusDone: 'Đã học',
  statusStarted: 'Đang học',
  newLessonBadge: 'Bài mới',
  openTopic: 'Xem',
  /* cột phải */
  nextTitle: 'Học tiếp ngữ pháp',
  nextText: 'Điểm nên học tiếp theo ở trình độ này:',
  nextAllDone: 'Bạn đã học hết các điểm ở trình độ này. Thử Level tiếp theo nhé!',
  nextButton: 'Học điểm này',
  howTitle: 'Học thế nào cho nhớ?',
  howSteps: [
    'Đọc lý thuyết 2 phút, nghe câu ví dụ.',
    'Làm bài luyện — sai cũng không sao, câu sai sẽ vào sổ ôn.',
    'Dùng ngay điểm đó khi nói hoặc viết hôm nay.',
  ],

  /* ---------- trang 1 điểm /grammar/:topicId ---------- */
  backToList: 'Ngữ pháp',
  patternLabel: 'Công thức',
  exampleLabel: 'Ví dụ',
  lessonsTitle: 'Bài học',
  lessonsIntro: (count: number) => (count > 1 ? `${count} bài dạy điểm này. Nên học theo thứ tự từ trên xuống.` : '1 bài dạy điểm này.'),
  grammarLessonTag: 'Bài ngữ pháp',
  pathLessonTag: (levelOrder: number, unitTitle: string) => `Trên lộ trình · Level ${levelOrder} · ${unitTitle}`,
  minutes: (n: number) => `${n} phút`,
  exercises: (n: number) => `${n} câu`,
  bestScore: (percent: number) => `Tốt nhất ${percent}%`,
  startLesson: 'Học',
  redoLesson: 'Học lại',
  cheatTitle: 'Xem nhanh lý thuyết',
  cheatIntro: 'Tóm tắt từ bài đầu tiên — đọc lại trước khi nói hoặc viết.',
  cheatLoading: 'Đang tải lý thuyết…',
  cheatError: 'Chưa tải được lý thuyết.',
  retry: 'Thử lại',
  prevTopic: 'Điểm trước',
  nextTopic: 'Điểm sau',
  notFoundTitle: 'Không tìm thấy điểm ngữ pháp này',
  notFoundText: 'Có thể đường dẫn đã cũ. {mascot} đưa bạn về danh sách nhé.',
}

type GrammarText = typeof VI

const EN: GrammarText = {
  eyebrow: 'Grammar',
  title: 'Grammar from zero to 6.5',
  intro: 'Each grammar point has a short explanation and practice. Follow the order, or pick the points you find hard.',
  levelTabsLabel: 'Choose a grammar level',
  levelTab: (level) => `Level ${level}`,
  levelHeading: (level, name) => `Level ${level} · ${name}`,
  levelMeta: (cefr, band) => `CEFR ${cefr} · band ${band}`,
  topicsLearned: (done, total) => `${done}/${total} points learned`,
  overallLabel: 'Learned',
  overallUnit: (total) => `/${total} points`,
  lessonsDone: (done, total) => `${done}/${total} lessons`,
  statusDone: 'Learned',
  statusStarted: 'In progress',
  newLessonBadge: 'New lesson',
  openTopic: 'Open',
  nextTitle: 'Next grammar point',
  nextText: 'The point to study next at this level:',
  nextAllDone: "You've studied every point at this level. Try the next level!",
  nextButton: 'Study this point',
  howTitle: 'How to make it stick',
  howSteps: [
    'Read the explanation for 2 minutes and listen to the examples.',
    "Do the practice — mistakes are fine, they go to your review deck.",
    'Use the point when you speak or write today.',
  ],

  backToList: 'Grammar',
  patternLabel: 'Pattern',
  exampleLabel: 'Example',
  lessonsTitle: 'Lessons',
  lessonsIntro: (count) => (count > 1 ? `${count} lessons teach this point. Work from top to bottom.` : 'One lesson teaches this point.'),
  grammarLessonTag: 'Grammar lesson',
  pathLessonTag: (levelOrder, unitTitle) => `On your path · Level ${levelOrder} · ${unitTitle}`,
  minutes: (n) => `${n} min`,
  exercises: (n) => `${n} questions`,
  bestScore: (percent) => `Best ${percent}%`,
  startLesson: 'Start',
  redoLesson: 'Redo',
  cheatTitle: 'Quick review',
  cheatIntro: 'A summary from the first lesson — reread it before you speak or write.',
  cheatLoading: 'Loading the explanation…',
  cheatError: "Couldn't load the explanation.",
  retry: 'Try again',
  prevTopic: 'Previous point',
  nextTopic: 'Next point',
  notFoundTitle: "We couldn't find this grammar point",
  notFoundText: '{mascot} will take you back to the list.',
}

/** Chữ giao diện khu Ngữ pháp theo ngôn ngữ đang chọn ({mascot} đã được thay tên). */
export function useGrammarText(): GrammarText {
  const { language } = useLanguage()
  return useMemo(() => {
    const base = language === 'en' ? EN : VI
    return { ...base, notFoundText: fillMascotName(base.notFoundText) }
  }, [language])
}
