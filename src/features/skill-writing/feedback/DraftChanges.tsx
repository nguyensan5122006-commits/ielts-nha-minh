/**
 * DraftChanges.tsx — TAB "THAY ĐỔI": so bản đã chấm với bản đang sửa (kiểu Write & Improve)
 * ----------------------------------------------------------------------------
 * Chữ bị bỏ: gạch ngang trên nền san hô nhạt · chữ mới thêm: nền xanh nhạt.
 * Người học thấy ngay công sức sửa bài của mình -> có động lực "Kiểm tra lại".
 * ----------------------------------------------------------------------------
 */
import { useMemo } from 'react'
import { diffWords } from '../word-diff'
import { useWritingText } from '../skill-writing-text'
import './feedback.css'

export function DraftChanges({ before, after }: { before: string; after: string }) {
  const text = useWritingText()
  const parts = useMemo(() => diffWords(before, after), [before, after])
  const changed = parts.some((part) => part.type !== 'same')

  if (!changed) return <p className="draft-changes__empty">{text.noChanges}</p>
  return (
    <div className="draft-changes">
      <p className="draft-changes__legend">{text.changesLegend}</p>
      <div className="draft-changes__text">
        {parts.map((part, index) =>
          part.type === 'same' ? (
            <span key={index}>{part.text}</span>
          ) : part.type === 'added' ? (
            <ins key={index} className="draft-changes__added">
              {part.text}
            </ins>
          ) : (
            <del key={index} className="draft-changes__removed">
              {part.text}
            </del>
          ),
        )}
      </div>
    </div>
  )
}
