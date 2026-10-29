/**
 * speaking-plan.ts — CHIA BÀI NÓI THÀNH CÁC PHẦN + ĐỌC BÀI MẪU "Q: / A:"
 * ----------------------------------------------------------------------------
 *   buildSpeakingSections(task)  -> các phần sẽ làm lần lượt:
 *       - bài 1 part bình thường: Part 1 (hoặc 3) = 1 dãy câu hỏi; Part 2 = 1 cue card
 *       - bài thi thử (câu hỏi có nhãn "Part 1:", "Part 2:", "Part 3:" — 02-CONTENT-GUIDE cuối file):
 *         tách theo nhãn, chạy Part 1 -> cue card -> Part 3
 *   parseSampleLines(text)       -> các dòng bài mẫu: tiêu đề PART, Q:, A:, đoạn kể (Part 2)
 *   sampleSpeechLines(text)      -> chữ để máy đọc bài mẫu: CHỈ phần trả lời (A: + đoạn kể), bỏ "uh / um"
 *   removeFillers(text)          -> bỏ "uh… / um, / er" và dấu "…" thừa
 *   sampleAudioLines(text)       -> các AudioLine (giọng gb-female) cho playSegment đọc bài mẫu
 * ----------------------------------------------------------------------------
 */
import type { AudioLine, SpeakingTask } from '../../content/content-types'

export type SpeakingSection =
  | { kind: 'questions'; part: 1 | 3; questions: string[]; answerSeconds: number }
  | { kind: 'cue-card'; part: 2; topic: string; points: string[]; prepSeconds: number; speakSeconds: number }

/** Thời gian ghi tối đa mỗi câu: Part 1 ngắn, Part 3 dài hơn. */
const ANSWER_SECONDS = { 1: 45, 3: 75 } as const
const PART_LABEL = /^\s*part\s*([123])\s*:\s*/i

/** Khoá của 1 câu trả lời trong bảng bản ghi: "phần-câu". Cue card luôn là câu 0. */
export function answerKey(sectionIndex: number, questionIndex: number): string {
  return `${sectionIndex}-${questionIndex}`
}

export function buildSpeakingSections(task: SpeakingTask): SpeakingSection[] {
  const labelled = task.questions.filter((q) => PART_LABEL.test(q))
  if (labelled.length > 0) {
    // Bài thi thử: gom các câu liền nhau cùng nhãn Part
    const sections: SpeakingSection[] = []
    for (const raw of task.questions) {
      const part = Number(raw.match(PART_LABEL)?.[1] ?? task.part) as 1 | 2 | 3
      const question = raw.replace(PART_LABEL, '').trim()
      if (part === 2) {
        sections.push(cueCardSection(task, question))
        continue
      }
      const last = sections[sections.length - 1]
      if (last && last.kind === 'questions' && last.part === part) last.questions.push(question)
      else sections.push({ kind: 'questions', part, questions: [question], answerSeconds: ANSWER_SECONDS[part] })
    }
    return sections
  }
  if (task.part === 2 || task.cueCard) return [cueCardSection(task, task.questions[0] ?? '')]
  const part = task.part === 3 ? 3 : 1
  return [{ kind: 'questions', part, questions: task.questions, answerSeconds: ANSWER_SECONDS[part] }]
}

function cueCardSection(task: SpeakingTask, fallbackTopic: string): SpeakingSection {
  // Câu Part 2 trong bài thi thử thường kèm "You have one minute to prepare…" -> chỉ lấy câu đề
  const topic = task.cueCard?.topic ?? fallbackTopic.split(/(?<=\.)\s+You have/i)[0]
  return { kind: 'cue-card', part: 2, topic, points: task.cueCard?.points ?? [], prepSeconds: 60, speakSeconds: 120 }
}

/** Tên ngắn của 1 câu hỏi (để hiện trong danh sách bản ghi). */
export function sectionQuestions(section: SpeakingSection): string[] {
  return section.kind === 'questions' ? section.questions : [section.topic]
}

/* ============================================================================
 * Bài mẫu
 * ========================================================================== */

export type SampleLine =
  | { kind: 'heading'; text: string }
  | { kind: 'question'; text: string }
  | { kind: 'answer'; text: string }
  | { kind: 'talk'; text: string }

/** "PART 1\nQ: …\nA: …\n\nPART 2\nI'd like to…" -> các dòng có loại. */
export function parseSampleLines(text: string): SampleLine[] {
  return text
    .split(/\n+/)
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line): SampleLine => {
      if (/^part\s*[123]\s*$/i.test(line)) return { kind: 'heading', text: line.replace(/^part/i, 'Part') }
      if (/^q\s*:/i.test(line)) return { kind: 'question', text: line.replace(/^q\s*:\s*/i, '') }
      if (/^a\s*:/i.test(line)) return { kind: 'answer', text: line.replace(/^a\s*:\s*/i, '') }
      return { kind: 'talk', text: line }
    })
}

/** Bỏ từ đệm ngập ngừng: "I go there... uh... last year" -> "I go there last year". */
export function removeFillers(text: string): string {
  return text
    .replace(/(^|[\s,.…])(?:uh+|um+|er+|erm|hmm+|ah+)(?=[\s,.…!?]|$)[.…,]*/gi, '$1')
    .replace(/\.{3}|…/g, ' ')
    .replace(/\s+([,.!?])/g, '$1')
    .replace(/,\s*,/g, ',')
    .replace(/\s{2,}/g, ' ')
    .replace(/^[\s,]+/, '')
    .trim()
}

/** Chữ để máy đọc bài mẫu: chỉ câu trả lời (A:) và đoạn kể Part 2, đã bỏ "uh/um". */
export function sampleSpeechLines(text: string): string[] {
  return parseSampleLines(text)
    .filter((line) => line.kind === 'answer' || line.kind === 'talk')
    .map((line) => removeFillers(line.text))
    .filter((line) => /[a-z]/i.test(line))
}

/**
 * Bài mẫu -> các dòng audio cho playSegment (06-AUDIO.md): 1 giọng nữ Anh-Anh, mỗi câu trả lời 1 dòng.
 * Hiện bài mẫu Speaking CHƯA được tạo sẵn mp3 (06-AUDIO mục 5: không tạo, cố ý) -> trình duyệt đọc.
 * Nếu sau này nhóm âm thanh tạo sẵn bằng đúng các dòng này thì web tự dùng file (cùng segmentKey).
 */
export function sampleAudioLines(text: string): AudioLine[] {
  return sampleSpeechLines(text).map((line) => ({ text: line, voice: 'gb-female' }))
}
