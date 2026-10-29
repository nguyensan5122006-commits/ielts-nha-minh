/**
 * GappedModelPassage.tsx — BÀI MẪU ĐỤC LỖ ("fading" nấc 2, psych-adult D9 luật 36)
 * ----------------------------------------------------------------------------
 * Bài Writing nấc 2 có bài mẫu khuyết trong `lesson.readingPassages` (chỗ trống viết "(1) ___"),
 * và các bài tập fill-blank trỏ tới nó bằng `passageId` (câu ghi "Gap 1: …").
 *
 * Xuất ra cho 2 nơi dùng:
 *   1. Trình học (lesson-player) — hiện bài mẫu CẠNH câu điền khuyết:
 *        <GappedModelPassage passage={p} activeGap={gapNumberOfExercise(exercise)} />
 *      (chỗ trống đang làm được tô sáng; các chỗ khác hiện số thứ tự)
 *   2. Trình Writing — hiện lại bài mẫu ĐÃ ĐIỀN để tham khảo khi tự viết:
 *        <GappedModelPassage passage={p} filled={gapAnswersFor(lesson, p.id)} />
 *
 *   findAnnotatedModel(lesson) : thẻ dạy chứa bài mẫu chú thích (nấc 1): mỗi example
 *                                là 1 câu mẫu, phần "vi" bắt đầu bằng vai trò IN HOA ("OVERVIEW – …").
 * ----------------------------------------------------------------------------
 */
import type { Exercise, Lesson, ReadingPassage, TeachingCard } from '../../content/content-types'
import './GappedModelPassage.css'

/** "Gap 2: …" -> 2. Không có -> null. */
export function gapNumberOfExercise(exercise: Exercise): number | null {
  if (exercise.type !== 'fill-blank') return null
  const match = exercise.sentence.match(/^\s*gap\s*(\d+)/i)
  return match ? Number(match[1]) : null
}

/** Đáp án từng chỗ trống của 1 bài mẫu khuyết: { 1: 'on', 2: 'respectively', … } (lấy đáp án đầu tiên). */
export function gapAnswersFor(lesson: Lesson, passageId: string): Record<number, string> {
  const answers: Record<number, string> = {}
  for (const exercise of lesson.exercises) {
    if (exercise.passageId !== passageId || exercise.type !== 'fill-blank') continue
    const gap = gapNumberOfExercise(exercise)
    if (gap !== null && exercise.acceptedAnswers[0]) answers[gap] = exercise.acceptedAnswers[0]
  }
  return answers
}

/** Thẻ dạy chứa bài mẫu có chú thích (≥ 3 câu mẫu, đa số có nhãn vai trò IN HOA ở phần vi). */
export function findAnnotatedModel(lesson: Lesson): TeachingCard | null {
  for (const card of lesson.teachingCards) {
    const examples = card.examples ?? []
    if (examples.length < 3) continue
    const labelled = examples.filter((example) => /^[\p{Lu}\d][\p{Lu}\d\s]+\s*[–-]/u.test(example.vi.trim()))
    if (labelled.length / examples.length >= 0.6) return card
  }
  return null
}

/** Tách "MỞ BÀI – viết lại đề…" -> { role: 'MỞ BÀI', note: 'viết lại đề…' } */
export function splitAnnotation(vi: string): { role: string | null; note: string } {
  const match = vi.match(/^([\p{Lu}\d][\p{Lu}\d\s]+?)\s*[–-]\s*(.*)$/su)
  return match ? { role: match[1].trim(), note: match[2].trim() } : { role: null, note: vi }
}

interface GappedModelPassageProps {
  passage: ReadingPassage
  /** chỗ trống đang làm (tô sáng) */
  activeGap?: number | null
  /** có đáp án -> điền vào (tô nhẹ), không có -> hiện ô trống đánh số */
  filled?: Record<number, string>
  /** ẩn tiêu đề (khi khung cha đã có tiêu đề) */
  hideTitle?: boolean
}

export function GappedModelPassage({ passage, activeGap = null, filled, hideTitle = false }: GappedModelPassageProps) {
  const paragraphs = passage.text.split(/\n\s*\n/)
  return (
    <article className="gapped-model">
      {!hideTitle && <h4 className="gapped-model__title">{passage.title}</h4>}
      {paragraphs.map((paragraph, index) => (
        <p key={index} className="gapped-model__paragraph">
          {renderGaps(paragraph, activeGap, filled)}
        </p>
      ))}
    </article>
  )
}

/** Thay mỗi "(n) ___" bằng 1 ô (trống hoặc đã điền). */
function renderGaps(paragraph: string, activeGap: number | null, filled?: Record<number, string>) {
  const pieces = paragraph.split(/(\(\d+\)\s*_{2,})/g)
  return pieces.map((piece, index) => {
    const match = piece.match(/^\((\d+)\)\s*_{2,}$/)
    if (!match) return <span key={index}>{piece}</span>
    const gap = Number(match[1])
    const answer = filled?.[gap]
    const classes = ['gapped-model__gap', answer && 'is-filled', gap === activeGap && 'is-active'].filter(Boolean).join(' ')
    return (
      <span key={index} className={classes}>
        <span className="gapped-model__gap-number">{gap}</span>
        {answer ?? ' '.repeat(8)}
      </span>
    )
  })
}
