/**
 * question-bank.ts
 * ----------------------------------------------------------------------------
 * NGÂN HÀNG CÂU HỎI CHO THI ĐẤU, MINI GAME, GIẢI TUẦN, BOSS.
 * Dùng chung cho trang web (chơi 1 mình) và máy chủ realtime (đấu trực tiếp),
 * nên KHÔNG được dùng thứ gì của trình duyệt (window, document...).
 *
 * 1. Chủ đề (GameTopic): mỗi chủ đề Học vui + từ vựng / bài học của từng level + "Tổng hợp".
 * 2. Từ một chủ đề, tạo câu hỏi theo kiểu game:
 *      quiz     : trắc nghiệm (nhìn hình chọn từ, nghĩa của từ, nghe chọn từ, cờ -> nước...)
 *      spelling : nghe từ rồi gõ đúng chính tả (Spelling Bee)
 *      sentence : xếp các thẻ từ thành câu đúng (Đua xếp câu)
 * 3. Dùng "seed" (hạt giống ngẫu nhiên): cùng seed -> cùng bộ câu hỏi, nên mọi người
 *    trong 1 phòng đấu nhận đúng cùng câu.
 * ----------------------------------------------------------------------------
 */
import { ALL_FUN_TOPICS, findFunTopic } from '../content/all-fun-topics'
import { ALL_LEVELS_V3 } from '../content/all-levels'
import type { BilingualText, Exercise, FunCardImage, Lesson } from '../content/content-types'
import { findLessonById } from '../content/lesson-registry'

export type GameType = 'quiz' | 'spelling' | 'sentence'

export interface GameTopic {
  id: string
  title: BilingualText
  icon: string
  group: 'fun' | 'lessons' | 'mixed'
}

export interface GameQuestion {
  id: string
  kind: 'choice' | 'type' | 'arrange'
  /** câu hỏi hiển thị (đã gồm cả tiếng Việt khi cần) */
  prompt: string
  image?: FunCardImage
  /** câu máy đọc to (bài nghe, spelling) */
  audioText?: string
  options?: string[]
  correctIndex?: number // chỉ máy chủ biết khi đấu trực tiếp
  answer?: string // đáp án gõ / câu xếp đúng
  tiles?: string[] // các thẻ từ đã xáo (dạng arrange)
}

/** Một "mục từ" chung cho mọi nguồn (thẻ Học vui hoặc từ vựng bài học). */
interface WordEntry {
  id: string
  word: string
  meaningVi: string
  image?: FunCardImage
  examples: { en: string; vi: string }[]
  capital?: string
  nationality?: string
}

/* ---------------------- số ngẫu nhiên có hạt giống ---------------------- */

/** Thuật toán mulberry32: cùng seed -> cùng dãy số. */
export function createRandom(seed: number): () => number {
  let state = seed >>> 0
  return () => {
    state = (state + 0x6d2b79f5) >>> 0
    let t = state
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

function shuffleWith<T>(items: T[], random: () => number): T[] {
  const copy = [...items]
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1))
    ;[copy[i], copy[j]] = [copy[j], copy[i]]
  }
  return copy
}

/* ------------------------------- chủ đề -------------------------------- */

/** Mọi bài học của 1 level v3 (gom từ các chặng của cả 2 track, không trùng). */
function lessonsOfLevel(levelId: string): Lesson[] {
  const level = ALL_LEVELS_V3.find((l) => l.id === levelId)
  const ids = [...new Set((level?.units ?? []).flatMap((unit) => unit.lessonIds))]
  return ids.map(findLessonById).filter((lesson): lesson is Lesson => !!lesson)
}

/** Level đã có bài học (level chưa có nội dung thì không thành chủ đề thi đấu). */
const levelsWithLessons = () => ALL_LEVELS_V3.filter((level) => lessonsOfLevel(level.id).length > 0)


export function listGameTopics(): GameTopic[] {
  const topics: GameTopic[] = ALL_FUN_TOPICS.map((topic) => ({ id: `fun:${topic.id}`, title: topic.title, icon: topic.icon, group: 'fun' }))
  for (const level of levelsWithLessons()) {
    topics.push({
      id: `level-words:${level.id}`,
      title: { vi: `Từ vựng Level ${level.order}`, en: `Level ${level.order} words` },
      icon: '📚',
      group: 'lessons',
    })
    topics.push({
      id: `level-lessons:${level.id}`,
      title: { vi: `Bài học Level ${level.order} (ngữ pháp, nghe...)`, en: `Level ${level.order} lessons` },
      icon: '📘',
      group: 'lessons',
    })
  }
  topics.push({ id: 'mix:all', title: { vi: 'Tổng hợp tất cả', en: 'Everything mixed' }, icon: '🎲', group: 'mixed' })
  return topics
}

export function findGameTopic(topicId: string): GameTopic | undefined {
  return listGameTopics().find((topic) => topic.id === topicId)
}

function levelWords(levelId: string): WordEntry[] {
  return lessonsOfLevel(levelId).flatMap((lesson) =>
    (lesson.words ?? []).map((w) => ({ id: w.id, word: w.word, meaningVi: w.meaningVi, examples: w.examples })),
  )
}

/** Bài tập trắc nghiệm trong bài học dùng được làm câu thi đấu (không cần đoạn văn). */
function levelChoiceExercises(levelId: string): Exercise[] {
  return lessonsOfLevel(levelId).flatMap((lesson) =>
    [...lesson.exercises, ...lesson.miniTest].filter((e) => (e.type === 'multiple-choice' || e.type === 'listen-choose') && !e.passageId),
  )
}

function topicWords(topicId: string): WordEntry[] {
  const [source, key] = topicId.split(':')
  if (source === 'fun') return findFunTopic(key)?.cards ?? []
  if (source === 'level-words' || source === 'level-lessons') return levelWords(key)
  // tổng hợp: mọi thẻ Học vui + từ vựng mọi level
  return [...ALL_FUN_TOPICS.flatMap((t) => t.cards), ...ALL_LEVELS_V3.flatMap((l) => levelWords(l.id))]
}

function topicExercises(topicId: string): Exercise[] {
  const [source, key] = topicId.split(':')
  if (source === 'level-lessons') return levelChoiceExercises(key)
  if (source === 'mix') return ALL_LEVELS_V3.flatMap((l) => levelChoiceExercises(l.id))
  return []
}

/* --------------------------- tạo câu hỏi --------------------------- */

/** Lấy 3 đáp án nhiễu khác `correct` từ danh sách giá trị. */
function pickDistractors(correct: string, pool: string[], random: () => number, count = 3): string[] {
  const unique = [...new Set(pool.filter((value) => value && value.toLowerCase() !== correct.toLowerCase()))]
  return shuffleWith(unique, random).slice(0, count)
}

function choiceQuestion(id: string, prompt: string, correct: string, distractors: string[], random: () => number, extra: Partial<GameQuestion> = {}): GameQuestion {
  const options = shuffleWith([correct, ...distractors], random)
  return { id, kind: 'choice', prompt, options, correctIndex: options.indexOf(correct), ...extra }
}

function quizQuestionFromWord(entry: WordEntry, pool: WordEntry[], random: () => number, index: number): GameQuestion {
  const id = `q${index}-${entry.id}`
  const words = pool.map((w) => w.word)
  const meanings = pool.map((w) => w.meaningVi)
  // các kiểu câu hỏi có thể dùng cho mục từ này
  const styles: string[] = ['word-to-meaning', 'meaning-to-word', 'listen-to-word']
  if (entry.image) styles.push('image-to-word', 'image-to-word')
  if (entry.capital) styles.push('country-to-capital')
  if (entry.nationality) styles.push('country-to-nationality')
  const style = styles[Math.floor(random() * styles.length)]

  switch (style) {
    case 'image-to-word':
      return choiceQuestion(id, entry.image?.kind === 'flag' ? 'Đây là cờ nước nào? / Which country?' : 'Đây là gì? / What is this?', entry.word, pickDistractors(entry.word, words, random), random, { image: entry.image })
    case 'meaning-to-word':
      return choiceQuestion(id, `Từ nào nghĩa là "${entry.meaningVi}"?`, entry.word, pickDistractors(entry.word, words, random), random)
    case 'listen-to-word':
      return choiceQuestion(id, '🔊 Nghe và chọn từ đúng / Listen and choose', entry.word, pickDistractors(entry.word, words, random), random, { audioText: entry.word })
    case 'country-to-capital':
      return choiceQuestion(id, `Thủ đô của ${entry.word} là? / Capital of ${entry.word}?`, entry.capital!, pickDistractors(entry.capital!, pool.map((w) => w.capital ?? ''), random), random, { image: entry.image })
    case 'country-to-nationality':
      return choiceQuestion(id, `Người ${entry.meaningVi} gọi là? / People from ${entry.word} are...`, entry.nationality!, pickDistractors(entry.nationality!, pool.map((w) => w.nationality ?? ''), random), random)
    default:
      return choiceQuestion(id, `"${entry.word}" nghĩa là gì?`, entry.meaningVi, pickDistractors(entry.meaningVi, meanings, random), random, { audioText: entry.word })
  }
}

function quizQuestionFromExercise(exercise: Exercise, index: number): GameQuestion | null {
  if (exercise.type !== 'multiple-choice' && exercise.type !== 'listen-choose') return null
  return {
    id: `q${index}-${exercise.id}`,
    kind: 'choice',
    prompt: exercise.type === 'listen-choose' ? `🔊 ${exercise.question}` : exercise.question,
    audioText: exercise.type === 'listen-choose' ? exercise.audioText : undefined,
    options: exercise.options,
    correctIndex: exercise.correctIndex,
  }
}

/** Từ đơn, chỉ chữ cái, 3-12 ký tự — dùng cho Spelling Bee. */
const isSpellableWord = (word: string) => /^[a-zA-Z]{3,12}$/.test(word)

/** Câu ví dụ 4-10 từ, dùng cho Đua xếp câu. */
const isArrangeableSentence = (sentence: string) => {
  const count = sentence.trim().split(/\s+/).length
  return count >= 4 && count <= 10
}

/**
 * TẠO BỘ CÂU HỎI.
 * @param seed  cùng seed + cùng tham số -> cùng bộ câu hỏi
 */
export function generateQuestions(gameType: GameType, topicId: string, count: number, seed: number): GameQuestion[] {
  const random = createRandom(seed)
  const words = topicWords(topicId)
  // nếu chủ đề quá ít từ để làm đáp án nhiễu thì mượn thêm từ "tổng hợp"
  const distractorPool = words.length >= 8 ? words : [...words, ...topicWords('mix:all')]

  if (gameType === 'spelling') {
    const spellable = shuffleWith(
      words.filter((w) => isSpellableWord(w.word)),
      random,
    ).slice(0, count)
    return spellable.map((entry, index) => ({
      id: `s${index}-${entry.id}`,
      kind: 'type',
      prompt: `Gõ từ bạn nghe được — gợi ý: "${entry.meaningVi}"`,
      audioText: entry.word,
      image: entry.image,
      answer: entry.word.toLowerCase(),
    }))
  }

  if (gameType === 'sentence') {
    const sentences = shuffleWith(
      words.flatMap((w) => w.examples).filter((example) => isArrangeableSentence(example.en)),
      random,
    ).slice(0, count)
    return sentences.map((example, index) => ({
      id: `a${index}`,
      kind: 'arrange',
      prompt: `Xếp thành câu: "${example.vi}"`,
      answer: example.en,
      tiles: shuffleWith(example.en.split(/\s+/), random),
      audioText: example.en,
    }))
  }

  // quiz: trộn câu từ vựng + câu trắc nghiệm bài học (nếu chủ đề là bài học)
  const exercises = shuffleWith(topicExercises(topicId), random)
  const pickedWords = shuffleWith(words, random)
  const questions: GameQuestion[] = []
  let wordIndex = 0
  let exerciseIndex = 0
  for (let i = 0; i < count; i++) {
    const useExercise = exercises.length > exerciseIndex && (wordIndex >= pickedWords.length || random() < 0.5)
    if (useExercise) {
      const question = quizQuestionFromExercise(exercises[exerciseIndex++], i)
      if (question) questions.push(question)
    } else if (wordIndex < pickedWords.length) {
      questions.push(quizQuestionFromWord(pickedWords[wordIndex++], distractorPool, random, i))
    }
  }
  return questions
}

/** Bản câu hỏi gửi cho người chơi khi đấu trực tiếp: bỏ đáp án. */
export function hideAnswer(question: GameQuestion): GameQuestion {
  const { correctIndex: _hiddenIndex, answer: _hiddenAnswer, ...visible } = question
  void _hiddenIndex
  void _hiddenAnswer
  return visible
}

/** Chuẩn hoá để so đáp án gõ: chữ thường, bỏ dấu câu và khoảng trắng thừa. */
export function normalizeTypedAnswer(text: string): string {
  return text
    .toLowerCase()
    .replace(/[’‘]/g, "'")
    .replace(/[.,!?;:"]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
}

/** Kiểm tra câu trả lời. answer: số thứ tự đáp án (choice) hoặc chữ (type / arrange). */
export function isGameAnswerCorrect(question: GameQuestion, answer: string): boolean {
  if (question.kind === 'choice') return Number(answer) === question.correctIndex
  return normalizeTypedAnswer(answer) === normalizeTypedAnswer(question.answer ?? '')
}

/** Đáp án đúng dạng chữ để hiện sau mỗi câu. */
export function correctAnswerText(question: GameQuestion): string {
  return question.kind === 'choice' ? (question.options?.[question.correctIndex ?? 0] ?? '') : (question.answer ?? '')
}

/**
 * Điểm 1 câu: đúng được 50 điểm + tối đa 50 điểm thưởng tốc độ
 * (trả lời ngay = 100, sát giờ = 50). Sai = 0.
 */
export function pointsForAnswer(isCorrect: boolean, timeUsedMs: number, timeLimitMs: number): number {
  if (!isCorrect) return 0
  const speedRatio = Math.max(0, 1 - timeUsedMs / timeLimitMs)
  return Math.round(50 + 50 * speedRatio)
}
