/**
 * Confetti.tsx — PHÁO GIẤY NHỎ (hoàn thành bài, lên level)
 * ----------------------------------------------------------------------------
 * Cách 1 — gọi hàm:     fireConfetti()   hoặc   fireConfetti({ origin: { x: 0.5, y: 0.35 } })
 * Cách 2 — component:   <Confetti fireKey={finishedCount} />   (đổi fireKey là bắn 1 lần)
 *
 * - Vẽ bằng 1 thẻ <canvas> phủ màn hình, tự xoá sau <= 1.2 giây (spec: ăn mừng ngắn).
 * - Màu thương hiệu: cam Corgi, vàng cầu vai, navy, ô-liu, đỏ ve áo.
 * - Người dùng bật "giảm chuyển động" -> KHÔNG bắn (spec mục 4).
 * - Không chặn chuột (pointer-events: none), không cần thư viện ngoài.
 * ----------------------------------------------------------------------------
 */
import { useEffect } from 'react'
import { prefersReducedMotion } from '../use-reduced-motion'

export interface ConfettiOptions {
  /** điểm bắn, tính theo tỉ lệ màn hình (0..1). Mặc định giữa, hơi cao */
  origin?: { x: number; y: number }
  /** số mảnh giấy, mặc định 80 */
  particleCount?: number
  /** thời gian (ms), tối đa 1200 */
  durationMs?: number
}

const BRAND_COLORS = ['#ff8a2a', '#f5b82e', '#2b3a8f', '#7e8f4e', '#e2453c', '#ffd3a1']

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  rotation: number
  spin: number
  color: string
  shape: 'rect' | 'circle' | 'star'
}

/** Vẽ 1 ngôi sao 4 cánh nhỏ (lấp lánh) */
function drawStar(ctx: CanvasRenderingContext2D, size: number) {
  ctx.beginPath()
  for (let i = 0; i < 8; i++) {
    const radius = i % 2 === 0 ? size : size * 0.38
    const angle = (Math.PI / 4) * i
    ctx.lineTo(Math.cos(angle) * radius, Math.sin(angle) * radius)
  }
  ctx.closePath()
  ctx.fill()
}

export function fireConfetti({ origin = { x: 0.5, y: 0.4 }, particleCount = 80, durationMs = 1200 }: ConfettiOptions = {}): void {
  if (typeof document === 'undefined' || prefersReducedMotion()) return
  const duration = Math.min(1200, durationMs)

  // Canvas phủ toàn màn hình, nét theo độ phân giải màn (devicePixelRatio)
  const canvas = document.createElement('canvas')
  const ratio = Math.min(2, window.devicePixelRatio || 1)
  const width = window.innerWidth
  const height = window.innerHeight
  canvas.width = width * ratio
  canvas.height = height * ratio
  Object.assign(canvas.style, { position: 'fixed', inset: '0', width: `${width}px`, height: `${height}px`, pointerEvents: 'none', zIndex: '70' })
  canvas.setAttribute('aria-hidden', 'true')
  document.body.appendChild(canvas)
  const ctx = canvas.getContext('2d')
  if (!ctx) {
    canvas.remove()
    return
  }
  ctx.scale(ratio, ratio)

  const startX = origin.x * width
  const startY = origin.y * height
  const particles: Particle[] = Array.from({ length: particleCount }, () => {
    // bắn toả hình nón hướng lên trên (góc -90° ± 60°)
    const angle = -Math.PI / 2 + (Math.random() - 0.5) * (Math.PI / 1.5)
    const speed = 7 + Math.random() * 9
    const roll = Math.random()
    return {
      x: startX,
      y: startY,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      size: 5 + Math.random() * 6,
      rotation: Math.random() * Math.PI,
      spin: (Math.random() - 0.5) * 0.35,
      color: BRAND_COLORS[Math.floor(Math.random() * BRAND_COLORS.length)],
      shape: roll < 0.55 ? 'rect' : roll < 0.85 ? 'circle' : 'star',
    }
  })

  const start = performance.now()
  const tick = (now: number) => {
    const elapsed = now - start
    const life = elapsed / duration
    ctx.clearRect(0, 0, width, height)
    // 30% thời gian cuối: mờ dần
    ctx.globalAlpha = life > 0.7 ? Math.max(0, 1 - (life - 0.7) / 0.3) : 1
    for (const p of particles) {
      p.vy += 0.32 // trọng lực
      p.vx *= 0.985 // lực cản không khí
      p.vy *= 0.985
      p.x += p.vx
      p.y += p.vy
      p.rotation += p.spin
      ctx.save()
      ctx.translate(p.x, p.y)
      ctx.rotate(p.rotation)
      ctx.fillStyle = p.color
      if (p.shape === 'rect') {
        // mảnh giấy dẹt, "lật" bằng cách co chiều cao theo cos -> trông như đang xoay 3D
        ctx.fillRect(-p.size / 2, -p.size / 4, p.size, (p.size / 2) * Math.abs(Math.cos(p.rotation * 2)) + 1)
      } else if (p.shape === 'circle') {
        ctx.beginPath()
        ctx.arc(0, 0, p.size / 2.6, 0, Math.PI * 2)
        ctx.fill()
      } else {
        drawStar(ctx, p.size / 1.6)
      }
      ctx.restore()
    }
    if (elapsed < duration) requestAnimationFrame(tick)
    else canvas.remove()
  }
  requestAnimationFrame(tick)
}

export interface ConfettiProps extends ConfettiOptions {
  /** đổi giá trị này (VD tăng 1) để bắn; 0/undefined = không bắn */
  fireKey?: number | string
}

/** Phiên bản component: bắn mỗi khi fireKey đổi. Không vẽ gì vào trang. */
export function Confetti({ fireKey, origin, particleCount, durationMs }: ConfettiProps) {
  useEffect(() => {
    if (!fireKey) return
    fireConfetti({ origin, particleCount, durationMs })
  }, [fireKey]) // chỉ bắn lại khi fireKey đổi (đổi origin/số lượng thì không bắn)
  return null
}
