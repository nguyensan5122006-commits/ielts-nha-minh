/**
 * AnswerTokens.tsx — HIỆN ĐÁP ÁN ĐÚNG, TÔ NỔI ĐÚNG NHỮNG TỪ KHÁC BIỆT
 * ----------------------------------------------------------------------------
 *   <AnswerTokens tokens={[{text:'I',differs:false},{text:'am',differs:true},...]} />
 *   -> "I [am] a student."  (từ "am" được tô nền + gạch chân mềm)
 * Không chỉ dựa vào màu: từ khác biệt còn được gạch chân (người mù màu vẫn thấy).
 * ----------------------------------------------------------------------------
 */
import type { DiffToken } from '../exercises/answer-diff'

export function AnswerTokens({ tokens }: { tokens: DiffToken[] }) {
  return (
    <p className="lp-answer-tokens" lang="en">
      {tokens.map((token, index) => (
        <span key={index}>
          {index > 0 && !/^[.,!?;:]/.test(token.text) ? ' ' : ''}
          {token.differs ? <mark className="lp-diff">{token.text}</mark> : token.text}
        </span>
      ))}
    </p>
  )
}
