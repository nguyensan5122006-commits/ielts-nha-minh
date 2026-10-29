/**
 * MascotSays.tsx — MASCOT KI NÓI 1 CÂU: giọng + bong bóng phụ đề chạy theo + nút nghe lại
 * ----------------------------------------------------------------------------
 *   <MascotSays pose="wave" text="Chào Thảo! Hôm nay chơi gì nào?" mascotSize={180} />
 *   <MascotSays pose="sleepy" text={...} onHeard={() => setCanGoOn(true)} />
 *
 * onHeard: gọi 1 lần khi bé đã nghe hết câu lần đầu -> màn hình bật sáng nút "Tiếp".
 * Chữ đã đọc tới thì đậm, chữ chưa đọc thì nhạt (phụ đề chạy theo giọng).
 * ----------------------------------------------------------------------------
 */
import { useEffect, useRef } from 'react'
import { Icon } from '../../../../design-system/components/Icon'
import { useKidsText } from '../../kids-text'
import { useSpokenLine } from '../use-spoken-line'
import { KidsMascot, type MascotPose } from './KidsMascot'
import './MascotSays.css'

export interface MascotSaysProps {
  pose: MascotPose
  text: string
  /** id câu trong kho lời thoại (kids-voice-lines.ts) -> phát file mp3 tạo sẵn thay vì giọng máy */
  lineId?: string
  mascotSize?: number
  autoPlay?: boolean
  onHeard?: () => void
  /** bong bóng nằm bên phải mascot (mặc định) hoặc phía trên */
  layout?: 'side' | 'above'
  outfitId?: string
  /** chỉ hiện bong bóng (mascot đã có ở chỗ khác trên màn hình) */
  hideMascot?: boolean
  className?: string
}

export function MascotSays({ pose, text, lineId, mascotSize = 160, autoPlay = true, onHeard, layout = 'side', outfitId, hideMascot = false, className }: MascotSaysProps) {
  const kidsText = useKidsText()
  const line = useSpokenLine(text, { autoPlay, lineId })

  // Báo "đã nghe" đúng lúc heard đổi sang true. onHeard để trong ref vì nơi gọi
  // hay truyền hàm mới mỗi lần vẽ — không muốn vì thế mà báo lại.
  const onHeardRef = useRef(onHeard)
  onHeardRef.current = onHeard
  useEffect(() => {
    if (line.heard) onHeardRef.current?.()
  }, [line.heard])

  return (
    <div className={['kz-says', `kz-says--${layout}`, hideMascot && 'kz-says--bubble-only', className].filter(Boolean).join(' ')}>
      {!hideMascot && <KidsMascot pose={pose} size={mascotSize} outfitId={outfitId} />}
      <div className={['kz-bubble', 'kz-says__bubble', layout === 'above' && 'kz-bubble--tail-bottom'].filter(Boolean).join(' ')} key={text} aria-live="polite">
        <p className="kz-says__text">
          {line.words.map((word, index) => (
            <span key={index} className={index < line.spokenWords || !line.playing ? 'is-spoken' : undefined}>
              {word}{' '}
            </span>
          ))}
        </p>
        <button type="button" className={['kz-says__replay', line.playing && 'is-playing'].filter(Boolean).join(' ')} onClick={line.replay} aria-label={kidsText.listenAgain} title={kidsText.listenAgain}>
          <Icon name="volume" size={20} />
        </button>
      </div>
    </div>
  )
}
