/**
 * RichText.tsx — HIỂN THỊ VĂN BẢN CÓ ĐỊNH DẠNG ĐƠN GIẢN
 * Hỗ trợ: **chữ đậm** và xuống dòng. (Không dùng thư viện markdown cho nhẹ.)
 */
import { Fragment } from 'react'

export function RichText({ text, className }: { text: string; className?: string }) {
  const lines = text.split('\n')
  return (
    <div className={className}>
      {lines.map((line, lineIndex) => (
        <Fragment key={lineIndex}>
          {/* tách theo **...**: phần lẻ là chữ thường, phần chẵn (trong dấu **) là chữ đậm */}
          {line.split(/\*\*(.+?)\*\*/g).map((piece, pieceIndex) =>
            pieceIndex % 2 === 1 ? <strong key={pieceIndex}>{piece}</strong> : <Fragment key={pieceIndex}>{piece}</Fragment>,
          )}
          {lineIndex < lines.length - 1 && <br />}
        </Fragment>
      ))}
    </div>
  )
}
