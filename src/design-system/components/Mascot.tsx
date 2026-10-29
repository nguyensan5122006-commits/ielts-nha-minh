/**
 * Mascot.tsx — CHÚ CORGI CẢNH SÁT "Ki" (ảnh 2D render từ Blender)
 * ----------------------------------------------------------------------------
 *   <Mascot pose="salute" placement="hero" size={280} speech="Chào bạn! Mình là {mascot}." />
 *   <Mascot pose="happy" placement="peek-top" size={120} />   // ló đầu lên mép khung (khung cần position: relative)
 *   <Mascot pose="thumbs-up" placement="corner" size={140} /> // đứng góc phải-dưới, tràn ra khỏi mép thẻ
 *   <Mascot pose="thinking" size={64} />                     // nằm trong dòng (inline)
 *
 * Mỗi tình huống dùng 1 pose cố định (spec mục 5) để người học hiểu "ngôn ngữ" của mascot:
 *   chào: salute · đúng: happy · sai: comfort · gợi ý: thinking · xong bài: celebrate
 *   cổ vũ: thumbs-up · chưa học hôm nay: sleepy · còn câu trống: surprised
 *   kỹ năng: listening / reading / writing / speaking · vẫy chào: wave
 *
 * ẢNH (hợp đồng 01-ARCHITECTURE mục 6): /mascot/poses/<pose>-<256|512|1024>.webp
 * Nếu ảnh chưa có -> thử ảnh đầu /mascot/head/head-192.png -> nếu vẫn không có thì
 * vẽ "cún tạm" bằng CSS (đầu tròn cam + chữ "Ki"). Khung luôn giữ đúng kích thước
 * nên KHÔNG BAO GIỜ làm vỡ bố cục.
 * ----------------------------------------------------------------------------
 */
import { useState, type CSSProperties } from 'react'
import { useDsText } from '../design-system-text'
import { fillMascotName, MASCOT_INITIALS } from '../mascot-name'
import './Mascot.css'

export type MascotPose =
  | 'salute'
  | 'happy'
  | 'wave'
  | 'thumbs-up'
  | 'celebrate'
  | 'surprised'
  | 'comfort'
  | 'thinking'
  | 'sleepy'
  | 'listening'
  | 'reading'
  | 'writing'
  | 'speaking'

export const MASCOT_POSES: MascotPose[] = [
  'salute',
  'happy',
  'wave',
  'thumbs-up',
  'celebrate',
  'surprised',
  'comfort',
  'thinking',
  'sleepy',
  'listening',
  'reading',
  'writing',
  'speaking',
]

export type MascotPlacement = 'inline' | 'peek-top' | 'corner' | 'hero'

/** Emoji gợi ý pose — chỉ hiện trên "cún tạm" để biết đang dùng pose nào. */
const POSE_HINT: Record<MascotPose, string> = {
  salute: '🫡',
  happy: '😄',
  wave: '👋',
  'thumbs-up': '👍',
  celebrate: '🎉',
  surprised: '😮',
  comfort: '🤗',
  thinking: '🤔',
  sleepy: '😴',
  listening: '🎧',
  reading: '📖',
  writing: '✍️',
  speaking: '🎤',
}

export interface MascotProps {
  pose: MascotPose
  /** cỡ hiển thị (px, khung vuông). Mặc định 160 */
  size?: number
  /** inline (mặc định) · peek-top (ló đầu trên mép khung) · corner (góc phải-dưới) · hero (to, giữa, lơ lửng) */
  placement?: MascotPlacement
  /** câu trong bong bóng thoại (hỗ trợ token {mascot}) */
  speech?: string
  /** bong bóng nằm bên nào (mặc định tự chọn theo placement) */
  speechSide?: 'left' | 'right' | 'top'
  /** mô tả ảnh cho trình đọc màn hình. Bỏ trống = ảnh trang trí */
  label?: string
  /** peek-top: chờ bao lâu mới ló đầu (ms). Spec: 350ms sau khi khung trượt lên */
  peekDelayMs?: number
  /** peek-top: phần trăm chiều cao lộ ra trên mép (0..1), mặc định 0.62 */
  peekRatio?: number
  /** chỉ dùng ảnh ĐẦU mascot (logo, avatar nhỏ): /mascot/head/head-<64|128|192|512>.png */
  headOnly?: boolean
  className?: string
  style?: CSSProperties
}

/* Ghi nhớ ảnh nào đã lỗi (chưa có file) để các mascot sau khỏi thử lại -> không nháy */
const failedSources = new Set<string>()
type ImageStage = 'pose' | 'head' | 'placeholder'

function poseSource(pose: MascotPose, fileSize: 256 | 512 | 1024) {
  return `/mascot/poses/${pose}-${fileSize}.webp`
}
/** Ảnh đầu dự phòng khi thiếu ảnh pose (hợp đồng tài sản: head-192.png) */
const HEAD_FALLBACK_SOURCE = '/mascot/head/head-192.png'

/** Ảnh đầu cho logo/avatar: chọn file nét gấp 2 cỡ hiển thị (32/64/128/192/512 có sẵn) */
function headSource(size: number) {
  const wanted = size * 2
  const file = [64, 128, 192, 512].find((n) => n >= wanted) ?? 512
  return `/mascot/head/head-${file}.png`
}

function firstStage(pose: MascotPose, headOnly: boolean, headSrc: string): ImageStage {
  if (!headOnly && !failedSources.has(poseSource(pose, 256))) return 'pose'
  if (!failedSources.has(headSrc)) return 'head'
  return 'placeholder'
}

export function Mascot({
  pose,
  size = 160,
  placement = 'inline',
  speech,
  speechSide,
  label,
  peekDelayMs = 350,
  peekRatio = 0.62,
  headOnly = false,
  className,
  style,
}: MascotProps) {
  const dsText = useDsText()
  const headSrc = headOnly ? headSource(size) : HEAD_FALLBACK_SOURCE
  // Bắt đầu từ ảnh pose; lỗi thì lùi dần: ảnh đầu -> cún tạm bằng CSS
  const [stageState, setStageState] = useState<{ pose: MascotPose; stage: ImageStage }>(() => ({ pose, stage: firstStage(pose, headOnly, headSrc) }))
  // đổi pose -> thử lại từ đầu (tính ngay trong lúc vẽ, không cần effect)
  const stage = stageState.pose === pose ? stageState.stage : firstStage(pose, headOnly, headSrc)
  if (stageState.pose !== pose) setStageState({ pose, stage })

  const fallBack = (failedUrl: string, next: ImageStage) => {
    failedSources.add(failedUrl)
    setStageState({ pose, stage: next })
  }

  const side = speechSide ?? (placement === 'corner' ? 'left' : placement === 'hero' ? 'right' : 'right')
  const decorative = !label
  const wrapperStyle = {
    ...style,
    '--mascot-size': `${size}px`,
    '--mascot-peek': peekRatio,
    '--mascot-delay': `${peekDelayMs}ms`,
  } as CSSProperties

  let picture
  if (stage === 'pose') {
    picture = (
      <img
        className="ds-mascot__img"
        // trình duyệt tự chọn file 256/512/1024 hợp với cỡ hiển thị × độ nét màn hình
        src={poseSource(pose, size > 256 ? 512 : 256)}
        srcSet={`${poseSource(pose, 256)} 256w, ${poseSource(pose, 512)} 512w, ${poseSource(pose, 1024)} 1024w`}
        sizes={`${size}px`}
        width={size}
        height={size}
        alt={decorative ? '' : label}
        loading={placement === 'hero' ? 'eager' : 'lazy'}
        decoding="async"
        draggable={false}
        onError={() => fallBack(poseSource(pose, 256), failedSources.has(headSrc) ? 'placeholder' : 'head')}
      />
    )
  } else if (stage === 'head') {
    picture = (
      <img
        className="ds-mascot__img ds-mascot__img--head"
        src={headSrc}
        width={size}
        height={size}
        alt={decorative ? '' : label}
        draggable={false}
        onError={() => fallBack(headSrc, 'placeholder')}
      />
    )
  } else {
    picture = (
      <span className="ds-mascot__placeholder" role={decorative ? undefined : 'img'} aria-label={decorative ? undefined : label}>
        <span className="ds-mascot__ear ds-mascot__ear--left" />
        <span className="ds-mascot__ear ds-mascot__ear--right" />
        <span className="ds-mascot__head">
          <span className="ds-mascot__eye ds-mascot__eye--left" />
          <span className="ds-mascot__eye ds-mascot__eye--right" />
          <span className="ds-mascot__muzzle">
            <span className="ds-mascot__nose" />
          </span>
          <span className="ds-mascot__initials">{MASCOT_INITIALS}</span>
        </span>
        <span className="ds-mascot__pose-hint" aria-hidden>
          {POSE_HINT[pose]}
        </span>
      </span>
    )
  }

  return (
    <div
      className={['ds-mascot', `ds-mascot--${placement}`, `is-${stage}`, size < 80 && 'is-small', headOnly && 'is-head-only', speech && `has-speech has-speech--${side}`, className]
        .filter(Boolean)
        .join(' ')}
      style={wrapperStyle}
      aria-hidden={decorative && !speech ? true : undefined}
      data-pose={pose}
    >
      <div className="ds-mascot__frame">
        <div className="ds-mascot__body">{picture}</div>
      </div>
      {speech && (
        <div className={`ds-mascot__bubble ds-mascot__bubble--${side}`}>
          <span className="ds-visually-hidden">{dsText('mascotSays')}: </span>
          {fillMascotName(speech)}
        </div>
      )}
    </div>
  )
}
