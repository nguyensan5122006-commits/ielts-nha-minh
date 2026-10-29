/**
 * StationRoute.tsx — ĐOẠN ĐƯỜNG TUẦN TRA CỦA 1 TRẠM (đường SVG + các nút bài + trang trí)
 * ----------------------------------------------------------------------------
 *  - Con đường uốn lượn mềm, có vạch kẻ đứt khúc ở giữa; phần đường đã đi qua có vạch vàng.
 *  - Nút bài = huy hiệu khiên (ShieldNode); tên bài + kỹ năng + số phút đặt phía ngoài khúc cua.
 *  - Bài "Học tiếp": mascot đứng cạnh, bong bóng "Học tiếp" bấm được.
 *  - Hai bên đường: ảnh emoji 3D nhỏ (cây, nhà, xe…) mờ 60% theo "khu vực" của level.
 * Vị trí tính trong road-geometry.ts (hàm thuần); file này chỉ vẽ.
 * ----------------------------------------------------------------------------
 */
import type { CSSProperties } from 'react'
import { preloadLesson } from '../../../content/lesson-loader'
import { Mascot } from '../../../design-system/components/Mascot'
import { useLanguage } from '../../../translations/language-context'
import { useLearningPathText } from '../learning-path-text'
import type { PathNode, PathStation } from '../path-view-model'
import { layoutStationRoad } from '../road-geometry'
import { LessonPopover } from './LessonPopover'
import { ShieldNode } from './ShieldNode'

/** Ảnh trang trí theo "khu vực" của từng level (ảnh có sẵn trong public/word-images) */
const DECOR_BY_LEVEL: Record<1 | 2 | 3, string[]> = {
  1: ['house-with-garden', 'deciduous-tree', 'potted-plant', 'bicycle', 'tulip', 'house', 'dog', 'sunflower', 'evergreen-tree', 'convenience-store'],
  2: ['office-building', 'evergreen-tree', 'bus', 'fountain', 'police-car', 'department-store', 'deciduous-tree', 'motor-scooter', 'post-office', 'cityscape'],
  3: ['national-park', 'airplane', 'snow-capped-mountain', 'high-speed-train', 'stadium', 'camping', 'classical-building', 'palm-tree', 'evergreen-tree', 'rocket'],
}

const NODE_SIZE = 72
const NEXT_NODE_SIZE = 90

export interface StationRouteProps {
  station: PathStation
  stationIndex: number
  levelNumber: 1 | 2 | 3
  width: number
  openNodeId: string | null
  onToggleNode: (lessonId: string | null) => void
  onStartLesson: (lessonId: string) => void
}

export function StationRoute({ station, stationIndex, levelNumber, width, openNodeId, onToggleNode, onStartLesson }: StationRouteProps) {
  const text = useLearningPathText()
  const { pick } = useLanguage()
  // đường "đã đi": tới bài Học tiếp (nếu có) hoặc qua các bài đã xong liên tiếp từ đầu trạm
  const nextIndex = station.nodes.findIndex((node) => node.state === 'next')
  let leadingDone = 0
  while (leadingDone < station.nodes.length && station.nodes[leadingDone].accuracy !== null) leadingDone++
  const traveledNodes = nextIndex >= 0 ? nextIndex + 1 : leadingDone
  const layout = layoutStationRoad({ count: station.nodes.length, width, stationIndex, traveledNodes, completed: station.isComplete })
  const decorSet = DECOR_BY_LEVEL[levelNumber]

  return (
    <div className="lp-route" style={{ height: layout.height } as CSSProperties}>
      <svg className="lp-route__road" width={layout.width} height={layout.height} viewBox={`0 0 ${layout.width} ${layout.height}`} aria-hidden>
        <path d={layout.roadPath} className="lp-road__edge" />
        <path d={layout.roadPath} className="lp-road__surface" />
        {layout.traveledPath && <path d={layout.traveledPath} className="lp-road__traveled" />}
        <path d={layout.roadPath} className="lp-road__lane" />
        {layout.traveledPath && <path d={layout.traveledPath} className="lp-road__lane lp-road__lane--traveled" />}
      </svg>

      {layout.decorations
        // chừa chỗ cho mascot đứng cạnh bài Học tiếp
        .filter((decoration) => !(nextIndex >= 0 && Math.abs(decoration.y - layout.nodes[nextIndex].y) < 80))
        .map((decoration, index) => (
        <img
          key={index}
          className="lp-route__decor"
          src={`/word-images/${decorSet[decoration.slot % decorSet.length]}.webp`}
          width={decoration.size}
          height={decoration.size}
          style={{ left: decoration.x - decoration.size / 2, top: decoration.y - decoration.size / 2 }}
          alt=""
          aria-hidden
          loading="lazy"
          decoding="async"
          draggable={false}
        />
      ))}

      {station.nodes.map((node, index) => {
        const place = layout.nodes[index]
        const isNext = node.state === 'next'
        const size = isNext ? NEXT_NODE_SIZE : NODE_SIZE
        const title = pick(node.summary.title)
        return (
          <div key={node.summary.id}>
            <button
              type="button"
              className={`lp-node is-${node.state}${openNodeId === node.summary.id ? ' is-open' : ''}`}
              style={{ left: place.x - size / 2, top: place.y - (size * 1.08) / 2 }}
              data-lesson-id={node.summary.id}
              data-current={isNext || undefined}
              aria-expanded={openNodeId === node.summary.id}
              aria-label={text.nodeLabel(title, stateLabel(node, text, levelNumber))}
              onClick={() => onToggleNode(openNodeId === node.summary.id ? null : node.summary.id)}
              onPointerEnter={() => node.state !== 'locked' && preloadLesson(node.summary.id)}
              onFocus={() => preloadLesson(node.summary.id)}
            >
              <ShieldNode state={node.state} skill={node.summary.skill} size={size} />
            </button>

            <NodeLabel node={node} title={title} side={place.labelSide} x={place.x} y={place.y} size={size} />

            {isNext && (
              <div className="lp-guide" style={{ left: place.x - place.labelSide * 162, top: place.y } as CSSProperties} data-side={place.labelSide}>
                <button type="button" className="lp-guide__bubble" onClick={() => onStartLesson(node.summary.id)}>
                  {text.mascotBubble}
                </button>
                <Mascot pose="salute" size={96} className="lp-guide__mascot" />
              </div>
            )}

            {openNodeId === node.summary.id && (
              <LessonPopover
                node={node}
                stationNumber={station.number}
                indexInStation={index}
                stationTotal={station.total}
                levelNumber={levelNumber}
                anchor={{ x: place.x, y: place.y + (isNext ? 8 : 0) }}
                containerWidth={layout.width}
                onStart={() => onStartLesson(node.summary.id)}
                onClose={() => onToggleNode(null)}
              />
            )}
          </div>
        )
      })}
    </div>
  )
}

function stateLabel(node: PathNode, text: ReturnType<typeof useLearningPathText>, levelNumber: number): string {
  if (node.state === 'done') return text.stateDone(Math.round((node.accuracy ?? 0) * 100))
  if (node.state === 'next') return node.isResume ? text.stateResume : text.stateNext
  if (node.state === 'locked') return text.levelLocked
  return levelNumber ? text.stateOpen : ''
}

/** Nhãn cạnh nút: tên bài (tối đa 2 dòng) + kỹ năng · số phút */
function NodeLabel({ node, title, side, x, y, size }: { node: PathNode; title: string; side: 1 | -1; x: number; y: number; size: number }) {
  const text = useLearningPathText()
  const { summary } = node
  const offset = size / 2 + 14
  const style = (side > 0 ? { left: x + offset, top: y } : { right: `calc(100% - ${x - offset}px)`, top: y }) as CSSProperties
  return (
    <div className={`lp-node-label is-${node.state} side-${side > 0 ? 'right' : 'left'}`} style={{ ...style, '--skill-color': `var(--skill-${summary.skill})` } as CSSProperties} aria-hidden>
      {node.state === 'next' && <span className="lp-node-label__eyebrow">{node.isResume ? text.stateResume.split(' — ')[0] : text.stateNext}</span>}
      <span className="lp-node-label__title">{title}</span>
      <span className="lp-node-label__meta">
        <span className="lp-node-label__dot" />
        {summary.mode === 'practice' ? text.skills[summary.skill] : text.modes[summary.mode]} · {text.minutes(summary.estimatedMinutes)}
      </span>
    </div>
  )
}
