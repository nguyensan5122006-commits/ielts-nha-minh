/**
 * RichText.tsx — HIỆN CHỮ CÓ **ĐẬM** (quy ước của nội dung bài học, 02-CONTENT-GUIDE luật 7)
 * ----------------------------------------------------------------------------
 *   <RichText text="Danh từ nhấn đầu: **UP**grade." />  ->  Danh từ nhấn đầu: <strong>UP</strong>grade.
 * Chỉ hỗ trợ **đậm** (không dùng dangerouslySetInnerHTML -> an toàn).
 * ----------------------------------------------------------------------------
 */
import { Fragment } from 'react'

export function RichText({ text }: { text: string }) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g)
  return (
    <>
      {parts.map((part, index) =>
        part.startsWith('**') && part.endsWith('**') ? <strong key={index}>{part.slice(2, -2)}</strong> : <Fragment key={index}>{part}</Fragment>,
      )}
    </>
  )
}
