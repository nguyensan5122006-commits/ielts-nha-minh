/**
 * text-selection.ts
 * ----------------------------------------------------------------------------
 * HÀM LÀM VIỆC VỚI VÙNG CHỌN CHỮ TRÊN TRANG (DOM) — dùng cho tô vàng, ghi chú, bấm từ tra nghĩa.
 *
 * Ý tưởng: mỗi đoạn văn / dòng thoại được vẽ trong 1 phần tử có thuộc tính
 *   data-hl-block="<mã khối>"
 * Vị trí tô màu lưu bằng SỐ KÝ TỰ tính từ đầu khối (start, end) — không lưu nút DOM,
 * nên vẽ lại bao nhiêu lần cũng đúng và lưu được vào tiến độ (JSON).
 *
 * Phần tử phụ chèn vào giữa chữ (nhãn "Q5", nghĩa tiếng Việt phía trên từ…) phải có
 *   data-hl-ignore
 * để không bị đếm vào số ký tự.
 * ----------------------------------------------------------------------------
 */

export interface BlockRange {
  blockId: string
  start: number
  end: number
}

const BLOCK_SELECTOR = '[data-hl-block]'

/** Độ dài chữ của 1 đoạn DOM (bỏ qua phần tử data-hl-ignore). */
function textLengthOf(fragment: DocumentFragment): number {
  fragment.querySelectorAll('[data-hl-ignore]').forEach((node) => node.remove())
  return fragment.textContent?.length ?? 0
}

/** Vị trí (số ký tự từ đầu khối) của 1 điểm (node, offset) trong khối. */
export function offsetInBlock(block: Element, node: Node, offset: number): number {
  const range = document.createRange()
  range.setStart(block, 0)
  try {
    range.setEnd(node, offset)
  } catch {
    return 0
  }
  return textLengthOf(range.cloneContents())
}

/** Khối chứa 1 nút (hoặc null nếu nút nằm ngoài mọi khối). */
export function blockOf(node: Node | null): Element | null {
  const element = node instanceof Element ? node : node?.parentElement
  return element?.closest(BLOCK_SELECTOR) ?? null
}

/**
 * Vùng chọn hiện tại -> danh sách đoạn (blockId, start, end), chỉ tính các khối nằm trong `container`.
 * Chọn kéo qua nhiều đoạn văn -> mỗi đoạn 1 phần.
 */
export function selectionToBlockRanges(container: Element, selection: Selection | null = window.getSelection()): BlockRange[] {
  if (!selection || selection.rangeCount === 0 || selection.isCollapsed) return []
  const range = selection.getRangeAt(0)
  if (!container.contains(range.commonAncestorContainer)) return []
  const ranges: BlockRange[] = []
  for (const block of container.querySelectorAll(BLOCK_SELECTOR)) {
    if (!range.intersectsNode(block)) continue
    const blockId = block.getAttribute('data-hl-block')!
    const total = offsetInBlock(block, block, block.childNodes.length)
    const start = block.contains(range.startContainer) ? offsetInBlock(block, range.startContainer, range.startOffset) : 0
    const end = block.contains(range.endContainer) ? offsetInBlock(block, range.endContainer, range.endOffset) : total
    if (end > start) ranges.push({ blockId, start, end })
  }
  return ranges
}

/** Lấy (node, offset) dưới toạ độ chuột — Chrome/Edge dùng caretRangeFromPoint, Firefox dùng caretPositionFromPoint. */
function caretAt(x: number, y: number): { node: Node; offset: number } | null {
  const doc = document as Document & {
    caretPositionFromPoint?: (x: number, y: number) => { offsetNode: Node; offset: number } | null
    caretRangeFromPoint?: (x: number, y: number) => Range | null
  }
  if (doc.caretPositionFromPoint) {
    const position = doc.caretPositionFromPoint(x, y)
    if (position) return { node: position.offsetNode, offset: position.offset }
  }
  if (doc.caretRangeFromPoint) {
    const range = doc.caretRangeFromPoint(x, y)
    if (range) return { node: range.startContainer, offset: range.startOffset }
  }
  return null
}

const WORD_CHAR = /[A-Za-zÀ-ÿ'’-]/

/** Từ tiếng Anh dưới toạ độ chuột -> vị trí trong khối + chữ của từ (bỏ dấu nháy/gạch ở 2 đầu). */
export function wordAtPoint(x: number, y: number, blockText: (blockId: string) => string | undefined): (BlockRange & { word: string }) | null {
  const caret = caretAt(x, y)
  if (!caret) return null
  // bấm vào phần tử phụ (nhãn nghĩa, nhãn Q5) thì không tra
  const element = caret.node instanceof Element ? caret.node : caret.node.parentElement
  if (element?.closest('[data-hl-ignore]')) return null
  const block = blockOf(caret.node)
  if (!block) return null
  const blockId = block.getAttribute('data-hl-block')!
  const text = blockText(blockId)
  if (!text) return null
  const position = offsetInBlock(block, caret.node, caret.offset)
  let start = position
  let end = position
  while (start > 0 && WORD_CHAR.test(text[start - 1])) start--
  while (end < text.length && WORD_CHAR.test(text[end])) end++
  // bỏ dấu nháy / gạch ở 2 đầu ('word' -> word)
  while (start < end && /['’-]/.test(text[start])) start++
  while (end > start && /['’-]/.test(text[end - 1])) end--
  const word = text.slice(start, end)
  if (!/[A-Za-z]/.test(word)) return null
  return { blockId, start, end, word }
}

/** Cuộn tới khối (và nháy viền 1 lần) bên trong vùng cuộn `scroller`. */
export function scrollBlockIntoView(container: Element | null, blockId: string, options: { flash?: boolean } = {}): void {
  const block = container?.querySelector(`[data-hl-block="${CSS.escape(blockId)}"]`)
  if (!block) return
  const reduceMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
  block.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'center' })
  if (options.flash) {
    block.classList.remove('xm-flash')
    // ép trình duyệt vẽ lại để animation chạy lại từ đầu
    void (block as HTMLElement).offsetWidth
    block.classList.add('xm-flash')
  }
}
