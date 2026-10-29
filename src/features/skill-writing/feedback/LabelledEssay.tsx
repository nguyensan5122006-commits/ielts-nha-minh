/**
 * LabelledEssay.tsx — HIỆN 1 BÀI VIẾT KÈM NHÃN VAI TRÒ TỪNG ĐOẠN (kiểu "timeline" của Writing9)
 * ----------------------------------------------------------------------------
 * Dùng cho: bài của người học (bước Tự chấm, So bài mẫu) và bài mẫu theo band.
 * Nhãn đoạn (Mở bài / Overview / Thân bài 1… / Một khối — chưa chia đoạn) do
 * writing-metrics.paragraphRoles() đoán theo vị trí + câu mở đoạn.
 * Cũng xuất SampleNotes: nhận xét giám khảo của bài mẫu, tách theo tiêu chí.
 * ----------------------------------------------------------------------------
 */
import type { ReactNode } from 'react'
import { CRITERIA, splitNotesByCriterion } from '../band-scale'
import { paragraphRoles, splitParagraphs, type ParagraphRole, type WritingKind } from '../writing-metrics'
import { useWritingText, type WritingText } from '../skill-writing-text'
import './feedback.css'

export function roleLabel(role: ParagraphRole, text: WritingText): string {
  switch (role.kind) {
    case 'title':
      return text.roleTitle
    case 'greeting':
      return text.roleGreeting
    case 'intro':
      return text.roleIntro
    case 'overview':
      return text.roleOverview
    case 'conclusion':
      return text.roleConclusion
    case 'opening':
      return text.roleOpening
    case 'closing':
      return text.roleClosing
    case 'signoff':
      return text.roleSignoff
    case 'block':
      return text.roleBlock
    case 'body':
      return text.roleBody(role.index)
    case 'point':
      return text.rolePoint(role.index)
  }
}

interface LabelledEssayProps {
  essay: string
  kind: WritingKind
  /** dòng nhỏ trên cùng (VD "182 từ · 4 đoạn") */
  meta?: ReactNode
  className?: string
}

export function LabelledEssay({ essay, kind, meta, className }: LabelledEssayProps) {
  const text = useWritingText()
  const paragraphs = splitParagraphs(essay)
  const roles = paragraphRoles(paragraphs, kind)
  return (
    <div className={['labelled-essay', className].filter(Boolean).join(' ')}>
      {meta && <div className="labelled-essay__meta">{meta}</div>}
      <ol className="labelled-essay__list">
        {paragraphs.map((paragraph, index) => {
          const role = roles[index]
          const isWarning = role.kind === 'block'
          return (
            <li key={index} className={`labelled-essay__item${isWarning ? ' is-warning' : ''}`}>
              <span className="labelled-essay__role">{roleLabel(role, text)}</span>
              <p className="labelled-essay__text">{paragraph}</p>
            </li>
          )
        })}
      </ol>
    </div>
  )
}

/** Nhận xét giám khảo của 1 bài mẫu, mỗi tiêu chí 1 dòng có nhãn. */
export function SampleNotes({ notes }: { notes: string }) {
  const parts = splitNotesByCriterion(notes)
  return (
    <ul className="sample-notes">
      {parts.map((part, index) => (
        <li key={index} className="sample-notes__item">
          {part.criterion && (
            <abbr className="criterion-tag" title={CRITERIA[part.criterion].name.en}>
              {CRITERIA[part.criterion].short}
            </abbr>
          )}
          <span>{part.text}</span>
        </li>
      ))}
    </ul>
  )
}
