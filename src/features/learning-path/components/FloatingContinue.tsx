/**
 * FloatingContinue.tsx — NÚT "HỌC TIẾP" NỔI Ở ĐÁY MÀN HÌNH
 * ----------------------------------------------------------------------------
 * Chỉ hiện khi nút bài "Học tiếp" trên đường đã trôi ra khỏi màn hình (cuộn quá xa
 * lên/xuống) — để nút Học tiếp LUÔN thấy được. Gồm:
 *   [▶ Học tiếp · Tên bài]  [↑ về chỗ đang học]
 * Dùng `position: sticky; bottom` trong khung lộ trình -> không cần tính toạ độ.
 * Theo dõi nút bằng IntersectionObserver (không tốn CPU khi cuộn).
 * ----------------------------------------------------------------------------
 */
import { useEffect, useState } from 'react'
import { Icon } from '../../../design-system/components/Icon'
import { Kbd } from '../../../design-system/components/Kbd'
import { useLearningPathText } from '../learning-path-text'

export interface FloatingContinueProps {
  /** id bài Học tiếp (null = không có -> không hiện) */
  lessonId: string | null
  lessonTitle: string
  /** đổi giá trị này khi danh sách nút được vẽ lại (đổi level / track) để theo dõi lại */
  watchKey: string
  onContinue: () => void
}

export function FloatingContinue({ lessonId, lessonTitle, watchKey, onContinue }: FloatingContinueProps) {
  const text = useLearningPathText()
  // 'above' = nút ở phía trên màn hình (đã cuộn qua), 'below' = còn ở phía dưới, null = đang thấy
  const [offscreen, setOffscreen] = useState<'above' | 'below' | null>(null)
  // nút bài có nằm trên trang không (bài Học tiếp ở level khác -> không có nút để cuộn tới)
  const [hasTarget, setHasTarget] = useState(false)

  useEffect(() => {
    if (!lessonId) return
    const target = document.querySelector(`.lp-node[data-lesson-id="${CSS.escape(lessonId)}"]`)
    setHasTarget(!!target)
    if (!target) {
      setOffscreen('below') // nút nằm ở level khác -> vẫn mời học tiếp
      return
    }
    const observer = new IntersectionObserver(
      ([entry]) => setOffscreen(entry.isIntersecting ? null : entry.boundingClientRect.top < 0 ? 'above' : 'below'),
      { threshold: 0.4 },
    )
    observer.observe(target)
    // cuộn thật nhanh qua nút (không lúc nào thấy nút) thì IntersectionObserver không báo ->
    // tự kiểm tra lại hướng (trên/dưới) mỗi khung hình khi đang cuộn, để mũi tên chỉ đúng
    let frame = 0
    const onScroll = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        const rect = target.getBoundingClientRect()
        const visible = rect.bottom > 0 && rect.top < window.innerHeight
        setOffscreen(visible ? null : rect.top < 0 ? 'above' : 'below')
      })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      observer.disconnect()
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
    }
  }, [lessonId, watchKey])

  if (!lessonId) return null

  function scrollToCurrent() {
    const target = document.querySelector(`.lp-node[data-lesson-id="${CSS.escape(lessonId!)}"]`)
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    target?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'center' })
  }

  const visible = offscreen !== null
  return (
    <div className={`lp-float${visible ? ' is-visible' : ''}`} aria-hidden={!visible}>
      <div className="lp-float__bar">
        <button type="button" className="lp-float__go" onClick={onContinue} tabIndex={visible ? 0 : -1}>
          <span className="lp-float__icon" aria-hidden>
            <Icon name="play-fill" size={16} />
          </span>
          <span className="lp-float__label">{text.continue}</span>
          <span className="lp-float__title">{lessonTitle}</span>
          <Kbd className="lp-float__kbd">Enter</Kbd>
        </button>
        {hasTarget && (
          <button type="button" className="lp-float__jump" onClick={scrollToCurrent} aria-label={text.scrollToCurrent} title={text.scrollToCurrent} tabIndex={visible ? 0 : -1}>
            <Icon name="chevron-down" size={20} className={offscreen === 'above' ? 'is-up' : undefined} />
          </button>
        )}
      </div>
    </div>
  )
}
