/**
 * CorrectBurst.tsx — "BÙNG SAO" KHI BẤM ĐÚNG
 * ----------------------------------------------------------------------------
 *   <CorrectBurst />   // đặt trong 1 khung position: relative; tự toả ra từ tâm rồi biến mất (~0.7s)
 *
 * 18 hạt (sao vàng, chấm cam, chấm trắng) bay toả tròn với góc / khoảng cách / độ trễ
 * hơi khác nhau -> nhìn tự nhiên, không đều tăm tắp. Thuần CSS (transform + opacity)
 * nên mượt cả trên máy yếu. Giảm chuyển động -> không hiện.
 * ----------------------------------------------------------------------------
 */
import { useMemo, type CSSProperties } from 'react'
import './CorrectBurst.css'

const PARTICLE_COUNT = 18

export function CorrectBurst({ spread = 1 }: { spread?: number }) {
  // Tính 1 lần cho mỗi lần bùng (component được tạo mới mỗi lần đúng)
  const particles = useMemo(
    () =>
      Array.from({ length: PARTICLE_COUNT }, (_, index) => {
        const angle = (index / PARTICLE_COUNT) * 360 + (Math.random() * 18 - 9)
        const distance = (140 + Math.random() * 110) * spread
        const kind = index % 3 === 0 ? 'star' : index % 3 === 1 ? 'dot' : 'spark'
        return {
          kind,
          style: {
            '--angle': `${angle}deg`,
            '--distance': `${distance}px`,
            '--delay': `${Math.round(Math.random() * 70)}ms`,
            '--size': `${kind === 'star' ? 22 + Math.random() * 14 : 9 + Math.random() * 7}px`,
          } as CSSProperties,
        }
      }),
    [spread],
  )
  return (
    <span className="kz-burst" aria-hidden>
      <span className="kz-burst__ring" />
      {particles.map((particle, index) => (
        <span key={index} className={`kz-burst__p kz-burst__p--${particle.kind}`} style={particle.style} />
      ))}
    </span>
  )
}
