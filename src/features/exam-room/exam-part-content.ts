/**
 * exam-part-content.ts — ĐỔI NỘI DUNG 1 PART CỦA ĐỀ THI SANG DẠNG MÀ BỘ KHUNG exam-ui CẦN (hàm thuần)
 * ----------------------------------------------------------------------------
 * Đề thi (ExamPart) lưu bài đọc là 1 chuỗi dài và kịch bản nghe là "Tên: lời" từng dòng.
 * Bộ khung thi dùng chung (exam-ui) + trình bài đọc (skill-reading/ReadingPassageView) cần:
 *   - bài đọc tách đoạn, có nhãn A/B/C nếu đề có ("A  Coral reefs…" -> nhãn 'A')  -> passageForView
 *   - "khối chữ" có mã để tô vàng / tô bằng chứng / tìm đáp án                    -> passageBlocks, transcriptBlocks
 *   - đoạn ngữ cảnh ngắn cho sổ câu sai (đoạn chứa đáp án, không phải cả bài)      -> contextForQuestion
 * (10-EXAM-UI mục 5: "Reading: passage.text tách \n\n thành khối para-<n>".)
 * ----------------------------------------------------------------------------
 */
import type { ExamPart, ExamQuestion, ReadingTask } from '../../content/content-types'
import { splitIntoSpeakerTurns } from '../../services/text-to-speech'
import { findEvidence, type TextBlock } from '../exam-ui/evidence-finder'
import { paragraphBlockId } from '../skill-reading/ReadingPassageView'

/** Nhãn đoạn ở đầu đoạn: 1 chữ in hoa + ít nhất 2 dấu cách (hoặc tab), VD "B  Bleaching is not new…" */
const PARAGRAPH_LABEL = /^([A-Z])(?:\s{2,}|\t)/

export type PassageView = ReadingTask['passage']

/** Bài đọc của đề -> { title, paragraphs: [{ label?, text }] } cho ReadingPassageView. */
export function passageForView(part: ExamPart): PassageView | null {
  if (!part.passage) return null
  const paragraphs = part.passage.text
    .split(/\n\s*\n/)
    .map((chunk) => chunk.trim())
    .filter(Boolean)
    .map((chunk) => {
      const match = chunk.match(PARAGRAPH_LABEL)
      return match ? { label: match[1], text: chunk.slice(match[0].length).trim() } : { text: chunk }
    })
  return { title: part.passage.title, paragraphs }
}

/** Khối chữ của bài đọc (mã giống hệt ReadingPassageView: para-A hoặc para-3). */
export function passageBlocks(passage: PassageView | null): TextBlock[] {
  if (!passage) return []
  return passage.paragraphs.map((paragraph, index) => ({ id: paragraphBlockId(paragraph.label, index), text: paragraph.text, group: paragraph.label }))
}

export interface TranscriptLine {
  id: string
  speaker: string | null
  text: string
}

/** Kịch bản nghe "Sarah: Hi.\nTom: Hello." -> từng lượt nói (mã khối line-<part>-<n>). */
export function transcriptLines(script: string | undefined, key: string): TranscriptLine[] {
  if (!script) return []
  return script
    .split(/\n+/)
    .flatMap((line) => splitIntoSpeakerTurns(line))
    .filter((turn) => turn.text.trim())
    .map((turn, index) => ({ id: `line-${key}-${index}`, speaker: turn.speaker, text: turn.text }))
}

export const transcriptBlocks = (lines: TranscriptLine[]): TextBlock[] => lines.map((line) => ({ id: line.id, text: line.text }))

/** Khối chữ của 1 Part (bài đọc hoặc lời thoại) — dùng tìm bằng chứng. */
export function partBlocks(part: ExamPart, key: string): TextBlock[] {
  if (part.passage) return passageBlocks(passageForView(part))
  if (part.audioScript) return transcriptBlocks(transcriptLines(part.audioScript, key))
  return []
}

/**
 * Ngữ cảnh ngắn cho sổ câu sai / "Hỏi AI vì sao": đoạn văn (hoặc 3 dòng thoại) chứa đáp án.
 * Không gửi cả bài (bài đọc ~5.000 ký tự × 40 câu sẽ làm tiến độ quá nặng).
 */
export function contextForQuestion(part: ExamPart, question: ExamQuestion, key: string, maxLength = 1200): string | undefined {
  const blocks = partBlocks(part, key)
  if (blocks.length === 0) return undefined
  const found = findEvidence({ question, blocks, preferredGroup: question.paragraphLabel })
  const index = found.blockId ? blocks.findIndex((block) => block.id === found.blockId) : -1
  let text: string
  if (index < 0) text = blocks.map((block) => block.text).join('\n')
  else if (part.passage) {
    const label = blocks[index].group
    text = `${label ? `[${label}] ` : ''}${blocks[index].text}`
  } else {
    const lines = transcriptLines(part.audioScript, key)
    text = lines
      .slice(Math.max(0, index - 1), index + 2)
      .map((line) => (line.speaker ? `${line.speaker}: ${line.text}` : line.text))
      .join('\n')
  }
  return text.length > maxLength ? `${text.slice(0, maxLength - 1)}…` : text
}

/**
 * Hướng dẫn đề thi thử hay mở đầu bằng 1 dòng "ô dù": "Questions 1–13. Questions 1–5: … Questions 6–9: …".
 * Bộ cắt nhóm của exam-ui (splitInstructions) nuốt mất dấu chấm sau "1–13" nên nhóm "1–5" không được tách
 * (đã báo nhóm exam-ui trong REQUESTS.md). Bỏ dòng ô dù đó + xuống dòng trước mỗi "Questions X–Y:" -> mỗi nhóm câu hiện đúng tiêu đề.
 */
export function cleanInstructions(instructions: string): string {
  return (
    instructions
      .replace(/^\s*Questions?\s+\d+\s*[–—-]\s*\d+\s*\.\s+(?=Questions?\s+\d)/, '')
      // tiêu đề nhóm đứng sau dấu "?" ("…following information? Questions 19–22: …") cũng không được nhận -> xuống dòng trước nó
      .replace(/(\S)\s+(?=Questions?\s+\d+(?:\s*[–—-]\s*\d+)?\s*:)/g, '$1\n')
  )
}
