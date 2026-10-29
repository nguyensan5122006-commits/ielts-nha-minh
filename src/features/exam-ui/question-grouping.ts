/**
 * question-grouping.ts
 * ----------------------------------------------------------------------------
 * HÀM THUẦN (không có giao diện) giúp HIỂN THỊ câu hỏi đề IELTS cho đúng kiểu.
 *
 * Nội dung bài (ListeningTask / ReadingTask / ExamPart) chỉ có:
 *   - 1 chuỗi `instructions` dài, VD "Questions 1–5: … Questions 6–8: …"
 *   - danh sách `questions` (choice / true-false-not-given / gap-fill)
 * File này biến chúng thành các NHÓM câu như đề thật:
 *   splitInstructions()   cắt chuỗi hướng dẫn thành từng nhóm "Questions 1–5"
 *   buildQuestionGroups() gắn câu hỏi vào nhóm + chọn cách vẽ (danh sách / viên chọn / bảng nối)
 *   optionLabel()         tách nhãn có sẵn "A." / "iv." ở đầu phương án (KHÔNG tự đánh chữ lại)
 *   classifyQuestionType() xếp câu vào DẠNG câu hỏi (TFNG, matching headings, form…) để
 *                          thống kê "% đúng theo dạng" ở màn kết quả
 *   parseWordLimit()      đọc giới hạn từ "NO MORE THAN TWO WORDS AND/OR A NUMBER"
 *
 * Quy ước nội dung (02-CONTENT-GUIDE, cuối file):
 *   - options của câu matching ĐÃ có chữ cái ("A. …", "i. …") -> không thêm chữ, không xáo.
 *   - YES/NO/NOT GIVEN là kind 'choice' với options ['YES','NO','NOT GIVEN'].
 *   - instructions có "\n" -> hiển thị white-space: pre-line.
 * ----------------------------------------------------------------------------
 */
import type { ExamQuestion } from '../../content/content-types'

/* ============================================================================
 * 1. CẮT HƯỚNG DẪN THÀNH NHÓM
 * ========================================================================== */

export interface InstructionGroup {
  /** số câu đầu / cuối của nhóm (VD 1 và 5) */
  from: number
  to: number
  /** tiêu đề nhóm, VD "Questions 1–5" */
  heading: string
  /** phần hướng dẫn còn lại sau tiêu đề (có thể rỗng) */
  body: string
}

/**
 * "Questions 1–5" / "Questions 6-8" / "Question 6" — chữ Q viết hoa, đứng đầu câu
 * (đầu chuỗi, sau xuống dòng, hoặc sau dấu chấm/hai chấm) để không bắt nhầm
 * "answer questions 1–13" nằm giữa câu.
 */
const GROUP_HEADING = /(^|[\n.:;]\s*)(Questions?\s+(\d+)(?:\s*(?:–|—|-|to|and)\s*(\d+))?)\s*[.:]?/g

export function splitInstructions(instructions: string, questionNumbers: number[]): { intro: string; groups: InstructionGroup[] } {
  const matches = [...instructions.matchAll(GROUP_HEADING)]
  const minNumber = Math.min(...questionNumbers)
  const maxNumber = Math.max(...questionNumbers)
  if (matches.length === 0) {
    return { intro: '', groups: [{ from: minNumber, to: maxNumber, heading: '', body: instructions.trim() }] }
  }
  const firstStart = (matches[0].index ?? 0) + matches[0][1].length
  const intro = instructions.slice(0, firstStart).trim()
  const groups = matches.map((match, index) => {
    const start = (match.index ?? 0) + match[1].length
    const bodyStart = (match.index ?? 0) + match[0].length
    const next = matches[index + 1]
    const end = next ? (next.index ?? 0) + next[1].length : instructions.length
    const from = Number(match[3])
    const to = match[4] ? Number(match[4]) : from
    return { from, to, heading: instructions.slice(start, start + match[2].length).trim(), body: instructions.slice(bodyStart, end).trim() }
  })
  return { intro, groups }
}

/* ============================================================================
 * 2. NHÃN PHƯƠNG ÁN CÓ SẴN ("A. …", "iv. …")
 * ========================================================================== */

const OPTION_LABEL = /^\s*([A-Z]|[ivx]{1,5}|[IVX]{1,5})[.)]\s+/

/** Tách "A. at the far end" -> { label: 'A', text: 'at the far end' }. Không có nhãn -> label null. */
export function optionLabel(option: string): { label: string | null; text: string } {
  const match = option.match(OPTION_LABEL)
  if (!match) return { label: null, text: option }
  return { label: match[1], text: option.slice(match[0].length) }
}

/** Mọi phương án đều đã có nhãn riêng? */
export function optionsAreLabelled(options: string[]): boolean {
  return options.length > 0 && options.every((option) => optionLabel(option).label !== null)
}

/** Nhãn hiển thị cho phương án thứ `index`: nhãn có sẵn, nếu không có thì A, B, C… (chỉ cho MCQ thường). */
export function displayLabelForOption(options: string[], index: number): string {
  if (optionsAreLabelled(options)) return optionLabel(options[index]).label!
  return String.fromCharCode(65 + index)
}

/* ============================================================================
 * 3. NHÓM CÂU + CÁCH VẼ
 * ========================================================================== */

/**
 * Cách vẽ 1 câu / 1 nhóm:
 *   'list'     trắc nghiệm thường — mỗi phương án 1 hàng có nút tròn
 *   'pills'    phương án rất ngắn (TRUE/FALSE/NOT GIVEN, YES/NO, A–G, tên người) — viên chọn nằm ngang
 *   'matching' nhiều câu dùng CHUNG 1 danh sách có nhãn (matching headings, map, nối thông tin)
 *              -> danh sách hiện 1 lần trong khung, mỗi câu chỉ chọn nhãn
 *   'gap'      điền từ
 */
export type QuestionLayout = 'list' | 'pills' | 'matching' | 'gap'

export interface QuestionGroup {
  id: string
  heading: string
  /** hướng dẫn của nhóm (giữ nguyên chữ, giao diện in đậm từ khoá VIẾT HOA) */
  body: string
  layout: QuestionLayout
  questions: ExamQuestion[]
  /** chỉ với 'matching': danh sách phương án dùng chung */
  sharedOptions?: string[]
  /** phần đuôi giống nhau của mọi câu (VD "(Map: …)") — hiện 1 lần, cắt khỏi từng câu */
  sharedPromptSuffix?: string
  /** giới hạn số từ (nhóm điền từ) */
  wordLimit?: WordLimit | null
}

const SHORT_OPTION_MAX = 14

function questionLayout(question: ExamQuestion): QuestionLayout {
  if (question.kind === 'gap-fill') return 'gap'
  if (question.kind === 'true-false-not-given') return 'pills'
  return question.options.every((option) => option.length <= SHORT_OPTION_MAX) ? 'pills' : 'list'
}

const sameOptions = (a: ExamQuestion, b: ExamQuestion) =>
  a.kind === 'choice' && b.kind === 'choice' && a.options.length === b.options.length && a.options.every((option, i) => option === b.options[i])

/** Phần đuôi chung của nhiều câu, cắt từ dấu "(" hoặc " — " gần nhất để không cắt giữa từ. */
function commonPromptSuffix(prompts: string[]): string | undefined {
  if (prompts.length < 2) return undefined
  let suffix = prompts[0]
  for (const prompt of prompts.slice(1)) {
    let length = 0
    while (length < suffix.length && length < prompt.length && suffix[suffix.length - 1 - length] === prompt[prompt.length - 1 - length]) length++
    suffix = suffix.slice(suffix.length - length)
  }
  const cut = Math.max(suffix.indexOf('('), suffix.indexOf(' — ') >= 0 ? suffix.indexOf(' — ') : -1)
  if (cut < 0) return undefined
  const trimmed = suffix.slice(cut).trim()
  return trimmed.length >= 12 ? trimmed : undefined
}

/**
 * Gắn câu hỏi vào nhóm hướng dẫn và chọn cách vẽ.
 * Trong 1 nhóm hướng dẫn, các câu liền nhau cùng cách vẽ gộp chung; câu choice liền nhau có
 * CÙNG danh sách phương án ĐÃ CÓ NHÃN (>= 2 câu) -> nhóm 'matching'.
 */
export function buildQuestionGroups(instructions: string, questions: ExamQuestion[]): { intro: string; groups: QuestionGroup[] } {
  const sorted = [...questions].sort((a, b) => a.number - b.number)
  const { intro, groups: instructionGroups } = splitInstructions(instructions, sorted.map((q) => q.number))
  const result: QuestionGroup[] = []

  // câu nằm ngoài mọi nhóm hướng dẫn -> nhóm "trống" cuối cùng
  const covered = new Set<string>()
  const bucketFor = (group: InstructionGroup) => sorted.filter((q) => q.number >= group.from && q.number <= group.to && !covered.has(q.id))
  const buckets = instructionGroups.map((group) => {
    const items = bucketFor(group)
    items.forEach((q) => covered.add(q.id))
    return { group, items }
  })
  const leftovers = sorted.filter((q) => !covered.has(q.id))
  if (leftovers.length) buckets.push({ group: { from: leftovers[0].number, to: leftovers.at(-1)!.number, heading: '', body: '' }, items: leftovers })

  /** câu thứ i mở đầu 1 dãy matching (choice có nhãn, câu sau dùng chung danh sách)? */
  const startsMatchingRun = (items: ExamQuestion[], i: number) => {
    const question = items[i]
    return question.kind === 'choice' && optionsAreLabelled(question.options) && i + 1 < items.length && sameOptions(question, items[i + 1])
  }

  for (const { group, items } of buckets) {
    const wordLimit = parseWordLimit(group.body)
    let first = true
    let index = 0
    while (index < items.length) {
      const question = items[index]
      // nhóm matching: các câu choice liền nhau dùng chung danh sách đã có nhãn
      if (startsMatchingRun(items, index) && question.kind === 'choice') {
        let end = index + 1
        while (end < items.length && sameOptions(question, items[end])) end++
        const members = items.slice(index, end)
        result.push({
          id: `g-${members[0].id}`,
          heading: first ? group.heading : '',
          body: first ? group.body : '',
          layout: 'matching',
          questions: members,
          sharedOptions: question.options,
          sharedPromptSuffix: commonPromptSuffix(members.map((m) => m.prompt)),
          wordLimit: null,
        })
        first = false
        index = end
        continue
      }
      // gộp các câu liền nhau cùng cách vẽ
      const layout = questionLayout(question)
      let end = index + 1
      while (end < items.length && questionLayout(items[end]) === layout && !startsMatchingRun(items, end)) end++
      const members = items.slice(index, end)
      result.push({
        id: `g-${members[0].id}`,
        heading: first ? group.heading : '',
        body: first ? group.body : '',
        layout,
        questions: members,
        wordLimit: layout === 'gap' ? wordLimit : null,
      })
      first = false
      index = end
    }
  }
  return { intro, groups: result }
}

/** Bỏ phần đuôi chung khỏi câu hỏi (nếu có). */
export function promptWithoutSuffix(prompt: string, suffix?: string): string {
  if (!suffix || !prompt.endsWith(suffix)) return prompt
  return prompt.slice(0, prompt.length - suffix.length).trim()
}

/* ============================================================================
 * 4. GIỚI HẠN SỐ TỪ (điền từ)
 * ========================================================================== */

export interface WordLimit {
  maxWords: number
  allowNumber: boolean
}

const NUMBER_WORDS: Record<string, number> = { ONE: 1, TWO: 2, THREE: 3, FOUR: 4 }

/** "NO MORE THAN TWO WORDS AND/OR A NUMBER" -> { maxWords: 2, allowNumber: true } */
export function parseWordLimit(text: string): WordLimit | null {
  const upper = text.toUpperCase()
  const noMore = upper.match(/NO MORE THAN (ONE|TWO|THREE|FOUR) WORDS?( AND\/OR A NUMBER)?/)
  if (noMore) return { maxWords: NUMBER_WORDS[noMore[1]], allowNumber: !!noMore[2] }
  const exact = upper.match(/\b(ONE|TWO|THREE) WORDS?( ONLY| AND\/OR A NUMBER)?/)
  if (exact) return { maxWords: NUMBER_WORDS[exact[1]], allowNumber: exact[2] === ' AND/OR A NUMBER' }
  if (/\bA NUMBER\b/.test(upper)) return { maxWords: 0, allowNumber: true }
  return null
}

/** Câu trả lời có vượt giới hạn không? (số được phép thì không tính là "từ") */
export function exceedsWordLimit(answer: string, limit: WordLimit | null | undefined): boolean {
  if (!limit || !answer.trim()) return false
  const tokens = answer.trim().split(/\s+/)
  const words = tokens.filter((token) => /[a-z]/i.test(token) && !(limit.allowNumber && /^\d/.test(token)))
  if (limit.maxWords === 0) return words.length > 0
  return words.length > limit.maxWords
}

/* ============================================================================
 * 5. DẠNG CÂU HỎI (để thống kê % đúng theo dạng)
 * ========================================================================== */

export type QuestionTypeId =
  | 'tfng'
  | 'ynng'
  | 'matching-headings'
  | 'matching-information'
  | 'map'
  | 'matching'
  | 'mcq'
  | 'form'
  | 'table'
  | 'note'
  | 'flow-chart'
  | 'summary'
  | 'sentence'
  | 'short-answer'
  | 'word-meaning'
  | 'gap'

const isAnswerSet = (options: string[], set: string[]) => options.length === set.length && options.every((option, i) => option.toUpperCase() === set[i])

/** Xếp 1 câu vào dạng câu hỏi IELTS, dựa vào kiểu câu + hướng dẫn của nhóm chứa nó. */
export function classifyQuestionType(question: ExamQuestion, group: Pick<QuestionGroup, 'body' | 'layout'>): QuestionTypeId {
  const instruction = group.body.toLowerCase()
  if (question.kind === 'true-false-not-given') return 'tfng'
  if (question.kind === 'choice') {
    if (isAnswerSet(question.options, ['YES', 'NO', 'NOT GIVEN'])) return 'ynng'
    if (isAnswerSet(question.options, ['TRUE', 'FALSE', 'NOT GIVEN']) || isAnswerSet(question.options, ['TRUE', 'FALSE'])) return 'tfng'
    if (instruction.includes('heading')) return 'matching-headings'
    if (instruction.includes('which paragraph')) return 'matching-information'
    if (/\b(map|plan)\b/.test(instruction)) return 'map'
    if (group.layout === 'matching' || instruction.includes('from the list') || instruction.includes('which person')) return 'matching'
    return 'mcq'
  }
  if (instruction.includes('form')) return 'form'
  if (instruction.includes('table')) return 'table'
  if (instruction.includes('flow chart') || instruction.includes('flow-chart')) return 'flow-chart'
  if (instruction.includes('summary')) return 'summary'
  if (instruction.includes('note')) return 'note'
  if (instruction.includes('sentence')) return 'sentence'
  if (instruction.includes('answer the question')) return 'short-answer'
  if (instruction.includes('meaning')) return 'word-meaning'
  return 'gap'
}

/** Câu choice có phải dạng TRUE/FALSE/NOT GIVEN hoặc YES/NO/NOT GIVEN không (để vẽ như TFNG). */
export function isJudgementChoice(question: ExamQuestion): boolean {
  if (question.kind !== 'choice') return question.kind === 'true-false-not-given'
  return isAnswerSet(question.options, ['YES', 'NO', 'NOT GIVEN']) || isAnswerSet(question.options, ['TRUE', 'FALSE', 'NOT GIVEN'])
}

/** Danh sách phương án để vẽ của 1 câu (TFNG không có options trong dữ liệu). */
export function choicesOf(question: ExamQuestion): string[] {
  if (question.kind === 'choice') return question.options
  if (question.kind === 'true-false-not-given') return ['TRUE', 'FALSE', 'NOT GIVEN']
  return []
}

/** Giá trị lưu cho phương án thứ i: choice lưu số thứ tự ("2"), TFNG lưu chữ ("FALSE") — khớp exam-scoring.ts */
export function answerValueFor(question: ExamQuestion, index: number): string {
  if (question.kind === 'true-false-not-given') return ['TRUE', 'FALSE', 'NOT GIVEN'][index]
  return String(index)
}

/** Ngược lại: câu trả lời đã lưu -> vị trí phương án (-1 nếu chưa chọn) */
export function selectedIndexOf(question: ExamQuestion, answer: string | undefined): number {
  if (answer === undefined || answer === '') return -1
  if (question.kind === 'true-false-not-given') return ['TRUE', 'FALSE', 'NOT GIVEN'].indexOf(answer)
  if (question.kind === 'choice') return Number(answer)
  return -1
}

/** Vị trí phương án đúng */
export function correctIndexOf(question: ExamQuestion): number {
  if (question.kind === 'true-false-not-given') return ['TRUE', 'FALSE', 'NOT GIVEN'].indexOf(question.answer)
  if (question.kind === 'choice') return question.correctIndex
  return -1
}
