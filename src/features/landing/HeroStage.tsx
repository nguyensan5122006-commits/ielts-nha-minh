/**
 * HeroStage.tsx — "SÂN KHẤU" ĐẦU TRANG LANDING: cún 3D + các thẻ từ vựng bay vòng quanh
 * ----------------------------------------------------------------------------
 *   <HeroStage />
 *
 * - Giữa: <MascotModel> (file 3D /mascot/mascot.glb). Chưa có file 3D -> ảnh pose "salute",
 *   chưa có ảnh -> "cún tạm" vẽ bằng CSS (design-system tự lo, bố cục không vỡ).
 * - Xung quanh: 8 thẻ từ (ảnh Fluent Emoji 3D trong /word-images + chữ tiếng Anh) chạy theo
 *   1 quỹ đạo hình elip nghiêng. Thẻ ở nửa sau (phía xa) nhỏ hơn, mờ hơn và nằm SAU cún;
 *   nửa trước to hơn, rõ hơn và nằm TRƯỚC cún -> có cảm giác 3D mà không cần thư viện 3D.
 * - Bấm 1 thẻ -> nghe từ đó (giọng Anh-Anh). Nhỏ mà vui: khách thử ngay được 1 "bài học".
 *
 * Cách chạy quỹ đạo (dễ hiểu):
 *   mỗi khung hình (requestAnimationFrame) góc t tăng một chút;
 *   thẻ thứ i ở góc  a = t + i × (360° / số thẻ)
 *   x = cos(a) × bán kính ngang,  y = sin(a) × bán kính dọc
 *   "độ gần" = sin(a): > 0 là phía trước (z-index trên cún), < 0 là phía sau.
 * Bật "giảm chuyển động" (prefers-reduced-motion) -> thẻ đứng yên rải quanh cún.
 * Hero ra khỏi màn hình -> dừng vòng lặp (tiết kiệm pin).
 * ----------------------------------------------------------------------------
 */
import { useEffect, useRef } from 'react'
import { MascotModel, useReducedMotion, WordImage } from '../../design-system'
import { speak } from '../../services/text-to-speech'
import { useLandingText } from './landing-text'

/** Thẻ từ bay quanh cún: slug ảnh Fluent 3D + từ tiếng Anh (từ quen thuộc của Level 1 + khu trẻ em) */
const ORBIT_WORDS: { slug: string; word: string }[] = [
  { slug: 'red-apple', word: 'apple' },
  { slug: 'airplane', word: 'airplane' },
  { slug: 'headphone', word: 'headphones' },
  { slug: 'open-book', word: 'book' },
  { slug: 'dog', word: 'dog' },
  { slug: 'graduation-cap', word: 'graduation' },
  { slug: 'guitar', word: 'guitar' },
  { slug: 'house-with-garden', word: 'home' },
]

/** Một vòng quỹ đạo mất bao lâu (giây) — chậm để êm mắt */
const ORBIT_SECONDS = 46

export function HeroStage() {
  const text = useLandingText()
  const reduceMotion = useReducedMotion()
  const stageRef = useRef<HTMLDivElement>(null)
  const chipRefs = useRef<(HTMLButtonElement | null)[]>([])

  useEffect(() => {
    const stage = stageRef.current
    if (!stage) return
    const count = ORBIT_WORDS.length

    /** Đặt vị trí mọi thẻ theo góc t (radian). */
    const place = (t: number) => {
      const width = stage.clientWidth
      const height = stage.clientHeight
      const radiusX = width * 0.46
      const radiusY = height * 0.2
      const centerY = height * 0.52
      chipRefs.current.forEach((chip, i) => {
        if (!chip) return
        const angle = t + (i * Math.PI * 2) / count
        const depth = Math.sin(angle) // -1 (xa nhất) … 1 (gần nhất)
        const x = Math.cos(angle) * radiusX
        // nhấp nhô nhẹ theo từng thẻ cho "sống"
        const bob = Math.sin(t * 3 + i) * 6
        const y = centerY + depth * radiusY + bob
        const scale = 0.72 + 0.28 * ((depth + 1) / 2)
        chip.style.transform = `translate(-50%, -50%) translate(${x.toFixed(1)}px, ${y.toFixed(1)}px) scale(${scale.toFixed(3)})`
        chip.style.opacity = (0.5 + 0.5 * ((depth + 1) / 2)).toFixed(2)
        chip.style.zIndex = depth > 0 ? '3' : '1'
        chip.dataset.side = depth > 0 ? 'front' : 'back'
      })
    }

    if (reduceMotion) {
      place(0.35)
      const onResize = () => place(0.35)
      window.addEventListener('resize', onResize)
      return () => window.removeEventListener('resize', onResize)
    }

    let frame = 0
    let running = false
    let last = performance.now()
    let t = 0.35
    const tick = (now: number) => {
      t += ((now - last) / 1000) * ((Math.PI * 2) / ORBIT_SECONDS)
      last = now
      place(t)
      frame = requestAnimationFrame(tick)
    }
    const start = () => {
      if (running) return
      running = true
      last = performance.now()
      frame = requestAnimationFrame(tick)
    }
    const stop = () => {
      running = false
      cancelAnimationFrame(frame)
    }
    // chỉ chạy khi hero đang hiện trên màn hình
    const observer = new IntersectionObserver(([entry]) => (entry.isIntersecting ? start() : stop()), { threshold: 0.05 })
    observer.observe(stage)
    place(t)
    return () => {
      observer.disconnect()
      stop()
    }
  }, [reduceMotion])

  return (
    <div className="lp-stage" ref={stageRef}>
      {/* quầng sáng + vòng quỹ đạo vẽ mờ phía sau */}
      <div className="lp-stage__glow" aria-hidden />
      <div className="lp-stage__orbit-line" aria-hidden />

      <div className="lp-stage__mascot">
        <MascotModel size={380} posterPose="salute" />
      </div>

      {ORBIT_WORDS.map((item, i) => (
        <button
          key={item.slug}
          type="button"
          ref={(element) => {
            chipRefs.current[i] = element
          }}
          className="lp-chip"
          onClick={() => void speak(item.word)}
          aria-label={text.chipListen(item.word)}
          title={text.chipListen(item.word)}
        >
          <WordImage slug={item.slug} word={item.word} size={40} decorative />
          <span className="lp-chip__word">{item.word}</span>
        </button>
      ))}
    </div>
  )
}
