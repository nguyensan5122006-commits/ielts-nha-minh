/**
 * road-geometry.ts
 * ----------------------------------------------------------------------------
 * TÍNH HÌNH CON ĐƯỜNG UỐN LƯỢN CỦA 1 TRẠM — hàm thuần, chỉ là toán.
 *
 * Mỗi trạm có 1 đoạn đường đi từ giữa mép trên (nối với biển trạm) xuống giữa mép dưới
 * (nối sang trạm sau). Các nút bài học nằm dọc đường, lệch trái/phải theo hình sin
 * -> đường cong mềm, KHÔNG zigzag gãy khúc.
 *
 *   layoutStationRoad({ count, width, stationIndex, traveledNodes, completed })
 *     -> vị trí từng nút, phía đặt nhãn, chuỗi SVG "d" của đường + phần đường "đã đi",
 *        vị trí các hình trang trí (cây, nhà…) hai bên đường.
 *
 * Đường cong vẽ bằng spline Catmull-Rom (đi qua đúng mọi điểm) đổi sang Bézier bậc 3
 * mà thẻ <path> của SVG hiểu được.
 * ----------------------------------------------------------------------------
 */

/** Khoảng cách dọc giữa 2 nút bài (px) */
export const NODE_SPACING = 116
/** Khoảng trống phía trên nút đầu / dưới nút cuối (px) */
const TOP_PADDING = 76
const BOTTOM_PADDING = 64

export interface Point {
  x: number
  y: number
}

export interface NodePlacement extends Point {
  /** phía đặt nhãn tên bài: phía "ngoài" của khúc cua (+1 = bên phải, -1 = bên trái) */
  labelSide: 1 | -1
}

export interface Decoration extends Point {
  /** chỉ số trong bộ ảnh trang trí của level */
  slot: number
  size: number
}

export interface StationRoadLayout {
  width: number
  height: number
  nodes: NodePlacement[]
  /** cả đoạn đường */
  roadPath: string
  /** phần đường đã đi qua (tô vàng), rỗng nếu chưa đi */
  traveledPath: string
  decorations: Decoration[]
}

/** Độ lệch ngang tối đa của nút so với trục giữa — thu nhỏ khi khung hẹp. */
export function swingAmplitude(width: number): number {
  return Math.max(48, Math.min(124, (width - 360) / 2.4))
}

/** Biến danh sách điểm thành các khúc Bézier bậc 3 (spline Catmull-Rom, độ căng 1/6). */
function catmullRomSegments(points: Point[]): string[] {
  const segments: string[] = []
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[i - 1] ?? points[i]
    const p1 = points[i]
    const p2 = points[i + 1]
    const p3 = points[i + 2] ?? p2
    const c1 = { x: p1.x + (p2.x - p0.x) / 6, y: p1.y + (p2.y - p0.y) / 6 }
    const c2 = { x: p2.x - (p3.x - p1.x) / 6, y: p2.y - (p3.y - p1.y) / 6 }
    segments.push(`C ${c1.x.toFixed(1)} ${c1.y.toFixed(1)}, ${c2.x.toFixed(1)} ${c2.y.toFixed(1)}, ${p2.x.toFixed(1)} ${p2.y.toFixed(1)}`)
  }
  return segments
}

export function layoutStationRoad({
  count,
  width,
  stationIndex,
  traveledNodes,
  completed,
}: {
  /** số nút bài trong trạm */
  count: number
  /** bề rộng khung (px) */
  width: number
  /** thứ tự trạm (0, 1, 2…) — trạm chẵn/lẻ uốn ngược chiều nhau cho đỡ đơn điệu */
  stationIndex: number
  /** số nút tính từ đầu đã "đi qua" (tô vàng tới nút đó) */
  traveledNodes: number
  /** cả trạm đã xong -> tô vàng tới tận cuối đoạn đường */
  completed: boolean
}): StationRoadLayout {
  const center = width / 2
  const amplitude = swingAmplitude(width)
  const height = TOP_PADDING + Math.max(0, count - 1) * NODE_SPACING + BOTTOM_PADDING
  // pha ban đầu: trạm chẵn cua sang phải trước, trạm lẻ sang trái trước
  const phase = stationIndex % 2 === 0 ? 0.55 : 0.55 + Math.PI

  const nodes: NodePlacement[] = []
  for (let i = 0; i < count; i++) {
    const swing = Math.sin(phase + i * 1.02)
    const x = center + amplitude * swing
    // nhãn đặt phía ngoài khúc cua; nút gần trục giữa thì xen kẽ trái/phải
    const labelSide: 1 | -1 = Math.abs(swing) < 0.25 ? (i % 2 === 0 ? 1 : -1) : swing > 0 ? 1 : -1
    nodes.push({ x, y: TOP_PADDING + i * NODE_SPACING, labelSide })
  }

  const start = { x: center, y: 0 }
  const end = { x: center, y: height }
  const points = [start, ...nodes, end]
  const segments = catmullRomSegments(points)
  const roadPath = `M ${start.x.toFixed(1)} 0 ${segments.join(' ')}`
  const traveledCount = completed ? segments.length : Math.min(traveledNodes, count)
  const traveledPath = traveledCount > 0 ? `M ${start.x.toFixed(1)} 0 ${segments.slice(0, traveledCount).join(' ')}` : ''

  // trang trí: khoảng 2/3 số nút có 1 hình ở phía đối diện nhãn, sát mép khung
  const decorations: Decoration[] = []
  nodes.forEach((node, i) => {
    if (i % 3 === 1) return
    const side = -node.labelSide
    const edgeX = side > 0 ? width - 34 : 34
    const towardRoad = center + side * (amplitude + 112)
    const x = side > 0 ? Math.min(edgeX, Math.max(towardRoad, node.x + 150)) : Math.max(edgeX, Math.min(towardRoad, node.x - 150))
    decorations.push({ x, y: node.y + (i % 2 === 0 ? 14 : -10), slot: stationIndex * 7 + i, size: i % 2 === 0 ? 46 : 38 })
  })

  return { width, height, nodes, roadPath, traveledPath, decorations }
}
