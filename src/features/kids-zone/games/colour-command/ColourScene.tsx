/**
 * ColourScene.tsx — VẼ 1 BỨC TRANH ĐỂ TÔ MÀU (nền cảnh + đồ vẽ tay + ảnh 3D)
 * ----------------------------------------------------------------------------
 *   <ColourScene question={q} painted={…} onTapThing={…} … />
 *
 * - Nền cảnh (công viên / phòng / đường / biển / ao / trời đêm) vẽ bằng CSS (colour-command.css mục 3).
 * - Đồ vật BẤM ĐƯỢC hiện màu xám nhạt ("chưa tô"); bấm đúng thì 1 lớp sơn loang ra từ chỗ bấm
 *   (clip-path hình tròn lớn dần) — lớp sơn có hình dạng của chính ảnh (CSS mask) và được
 *   "nhân" lên ảnh xám nên vẫn giữ khối 3D (xem colour-palette.ts).
 * - Cảnh nền / vật làm mốc (giường, cây, đầu búp bê giấy…) giữ màu thật, không bấm được.
 * Toàn bộ trạng thái (đã tô, bị loại, đang lắc…) do ColourCommandGame giữ — file này chỉ vẽ.
 * ----------------------------------------------------------------------------
 */
import type { CSSProperties, MouseEvent } from 'react'
import { CorrectBurst } from '../../game-engine/components/CorrectBurst'
import { KidsPicture } from '../../game-engine/components/KidsPicture'
import { wordImageUrl } from '../../kids-data/kids-word-bank'
import type { PaintColour } from './colour-palette'
import type { ColourQuestion, SceneThing } from './colour-question'
import { SCENE_ASPECT, type SceneProp } from './colour-scenes'

/** 1 vật đã tô: màu + chỗ bấm (% trong ô của vật) để sơn loang ra từ đó. */
export interface PaintedThing {
  colour: PaintColour
  originX: number
  originY: number
}

export interface ColourSceneProps {
  question: ColourQuestion
  painted: Record<string, PaintedThing>
  /** vật bấm sai (đã bị loại, mờ đi) */
  eliminated: string[]
  /** vật vừa bấm sai (lắc nhẹ 1 lần) */
  wrongKey: string | null
  /** bậc 3 của thang gợi ý: vật cần tô sáng lên + bàn tay chỉ */
  revealTargets: boolean
  /** đã xong câu: khoá mọi vật */
  locked: boolean
  /** màu đang cầm (đổi con trỏ thành cọ màu đó) */
  brush: PaintColour | null
  /** vật vừa tô xong cuối cùng -> bùng sao ở đó */
  burstKey: string | null
  labelFor: (thing: SceneThing) => string
  onTapThing: (thing: SceneThing, originX: number, originY: number) => void
}

export function ColourScene({ question, painted, eliminated, wrongKey, revealTargets, locked, brush, burstKey, labelFor, onTapThing }: ColourSceneProps) {
  const style = brush ? ({ '--cc-cursor': brushCursor(brush) } as CSSProperties) : undefined
  return (
    <div className={`cc-scene cc-scene--${question.backdrop}`} style={style}>
      <SceneBackdropArt backdrop={question.backdrop} />
      {question.props.map((prop, index) => (
        <ScenePropArt key={index} prop={prop} />
      ))}
      {question.things.map((thing) => {
        const paint = painted[thing.key]
        const isTarget = thing.role === 'target'
        const placement = {
          left: `${thing.x}%`,
          top: `${thing.y}%`,
          width: `${thing.size / SCENE_ASPECT}%`,
          // cảnh nền nằm dưới; vật bấm được nằm trên (vật thấp hơn thì gần mắt hơn -> nằm trên)
          zIndex: thing.z ?? (thing.role === 'scenery' ? 2 : 4 + Math.round(thing.y / 25)),
        } as CSSProperties
        const artStyle = {
          '--cc-flip': thing.flip ? -1 : 1,
          '--cc-stretch': thing.stretch ?? 1,
          '--cc-rotate': `${thing.rotate ?? 0}deg`,
          '--cc-mask': `url("${wordImageUrl(thing.slug)}")`,
        } as CSSProperties

        // Cảnh nền: ảnh màu thật, không bấm được
        if (thing.role === 'scenery') {
          return (
            <span key={thing.key} className="cc-thing cc-thing--scenery" style={placement} aria-hidden>
              <span className="cc-thing__art" style={artStyle}>
                <KidsPicture slug={thing.slug} word={thing.label || thing.slug} size={256} className="cc-thing__img" decorative />
              </span>
            </span>
          )
        }

        const isEliminated = eliminated.includes(thing.key)
        const classes = [
          'cc-thing',
          paint && 'is-painted',
          isEliminated && 'is-eliminated',
          wrongKey === thing.key && 'is-wrong',
          revealTargets && isTarget && !paint && 'is-revealed',
          revealTargets && !isTarget && 'is-dimmed',
        ]
        const onClick = (event: MouseEvent<HTMLButtonElement>) => {
          // chỗ bấm tính theo % ô của vật (bấm bằng bàn phím -> giữa ô)
          const box = event.currentTarget.getBoundingClientRect()
          const fromPointer = event.detail > 0 && box.width > 0
          const originX = fromPointer ? ((event.clientX - box.left) / box.width) * 100 : 50
          const originY = fromPointer ? ((event.clientY - box.top) / box.height) * 100 : 50
          onTapThing(thing, originX, originY)
        }
        return (
          <button
            key={thing.key}
            type="button"
            className={classes.filter(Boolean).join(' ')}
            style={placement}
            onClick={onClick}
            disabled={locked || isEliminated || !!paint || (revealTargets && !isTarget)}
            aria-label={paint ? undefined : labelFor(thing)}
            // chỉ khi npm run dev: đánh dấu vật cần tô cho script kiểm thử tự động (QA)
            data-answer={import.meta.env.DEV && isTarget ? 'true' : undefined}
          >
            <span className="cc-thing__art" style={artStyle}>
              <KidsPicture slug={thing.slug} word={thing.label} size={256} className="cc-thing__img" decorative />
              {paint && (
                <span
                  className={`cc-thing__paint cc-thing__paint--${paint.colour.blend}`}
                  style={{ '--cc-paint': paint.colour.paint, '--cc-ox': `${paint.originX}%`, '--cc-oy': `${paint.originY}%` } as CSSProperties}
                />
              )}
            </span>
            {revealTargets && isTarget && !paint && (
              <span className={['cc-thing__pointer', thing.y < 30 && 'cc-thing__pointer--below'].filter(Boolean).join(' ')} aria-hidden>
                <KidsPicture slug="backhand-index-pointing-down" word="here" size={56} decorative />
              </span>
            )}
            {burstKey === thing.key && <CorrectBurst spread={0.7} />}
          </button>
        )
      })}
    </div>
  )
}

/* ============================ nền cảnh ============================ */

/** Các mảng trang trí của nền (mặt trời, mây, đồi, cửa sổ…) — chỉ là hình, không bấm được. */
function SceneBackdropArt({ backdrop }: { backdrop: ColourQuestion['backdrop'] }) {
  switch (backdrop) {
    case 'room':
      return (
        <span className="cc-bg" aria-hidden>
          <span className="cc-bg__window" />
          <span className="cc-bg__frame" />
          <span className="cc-bg__floor" />
        </span>
      )
    case 'night':
      return (
        <span className="cc-bg" aria-hidden>
          <span className="cc-bg__twinkles" />
          <span className="cc-bg__hill cc-bg__hill--night" />
        </span>
      )
    case 'sea':
      return (
        <span className="cc-bg" aria-hidden>
          <span className="cc-bg__sun" />
          <span className="cc-bg__cloud cc-bg__cloud--a" />
          <span className="cc-bg__water" />
        </span>
      )
    case 'road':
      return (
        <span className="cc-bg" aria-hidden>
          <span className="cc-bg__sun" />
          <span className="cc-bg__cloud cc-bg__cloud--a" />
          <span className="cc-bg__cloud cc-bg__cloud--b" />
          <span className="cc-bg__grass" />
          <span className="cc-bg__road" />
        </span>
      )
    case 'pond':
      return (
        <span className="cc-bg" aria-hidden>
          <span className="cc-bg__sun" />
          <span className="cc-bg__cloud cc-bg__cloud--a" />
          <span className="cc-bg__grass" />
          <span className="cc-bg__pond" />
        </span>
      )
    default:
      return (
        <span className="cc-bg" aria-hidden>
          <span className="cc-bg__sun" />
          <span className="cc-bg__cloud cc-bg__cloud--a" />
          <span className="cc-bg__cloud cc-bg__cloud--b" />
          <span className="cc-bg__hill" />
          <span className="cc-bg__grass" />
        </span>
      )
  }
}

/** Đồ vẽ tay bằng SVG cho thứ ngân hàng từ chưa có ảnh: cái bàn, cái ao. */
function ScenePropArt({ prop }: { prop: SceneProp }) {
  if (prop.kind === 'table') {
    // mặt bàn ở prop.y, chân bàn chạm sàn (≈ 90% chiều cao tranh)
    const height = 90 - prop.y
    return (
      <svg
        className="cc-prop cc-prop--table"
        style={{ left: `${prop.x - prop.w / 2}%`, top: `${prop.y}%`, width: `${prop.w}%`, height: `${height}%`, zIndex: prop.z ?? 2 }}
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        aria-hidden
      >
        <rect x="9" y="8" width="7" height="92" rx="2" className="cc-prop__wood-dark" />
        <rect x="84" y="8" width="7" height="92" rx="2" className="cc-prop__wood-dark" />
        <rect x="0" y="0" width="100" height="13" rx="4" className="cc-prop__wood" />
        <rect x="2" y="1.5" width="96" height="3" rx="1.5" className="cc-prop__shine" />
      </svg>
    )
  }
  const height = prop.h ?? 30
  return (
    <svg
      className="cc-prop cc-prop--pond"
      style={{ left: `${prop.x - prop.w / 2}%`, top: `${prop.y - height / 2}%`, width: `${prop.w}%`, height: `${height}%`, zIndex: prop.z ?? 0 }}
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      aria-hidden
    >
      <ellipse cx="50" cy="50" rx="49" ry="48" className="cc-prop__water" />
      <ellipse cx="38" cy="38" rx="20" ry="6" className="cc-prop__ripple" />
    </svg>
  )
}

/** Con trỏ chuột hình cọ vẽ chấm sơn đang cầm (SVG nhúng thẳng vào CSS). */
function brushCursor(paint: PaintColour): string {
  const svg =
    `<svg xmlns='http://www.w3.org/2000/svg' width='36' height='36' viewBox='0 0 36 36'>` +
    `<path d='M30 3 L17 18' stroke='%238a5a2b' stroke-width='5' stroke-linecap='round'/>` +
    `<path d='M17 17 L19 19 C17 25 12 29 5 31 C7 24 11 19 17 17 Z' fill='${paint.swatch.replace('#', '%23')}' stroke='%231e2347' stroke-width='1.6' stroke-linejoin='round'/>` +
    `</svg>`
  return `url("data:image/svg+xml;utf8,${svg}") 5 31, pointer`
}
