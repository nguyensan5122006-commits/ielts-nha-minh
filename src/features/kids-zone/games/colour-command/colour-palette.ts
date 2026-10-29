/**
 * colour-palette.ts — HỘP MÀU CỦA TRÒ "NGHE LỆNH TÔ MÀU"
 * ----------------------------------------------------------------------------
 * 11 màu = 11 từ chỉ màu trong ngân hàng từ (chủ đề `colours`, nhãn 'color').
 * Mỗi màu có 2 mã màu:
 *   swatch : màu của "lọ sơn" trên khay (tươi, dễ nhận ra)
 *   paint  : màu phủ lên đồ vật. Đồ vật chưa tô là ảnh 3D xám nhạt; khi tô, 1 lớp màu
 *            có HÌNH DẠNG của ảnh (CSS mask) được "nhân" (mix-blend-mode: multiply) lên ảnh xám
 *            -> giữ nguyên bóng đổ / khối 3D, chỉ đổi màu. Riêng màu trắng nhân thì không thấy
 *            gì -> dùng 'screen' (làm sáng).
 * Thứ tự trong mảng = thứ tự lọ sơn trên khay (cầu vồng trước, rồi nâu / đen / xám / trắng)
 * -> bé quen vị trí, lần sau tìm nhanh hơn.
 * ----------------------------------------------------------------------------
 */
import type { KidsWord } from '../../../../content/content-types'
import { findKidsWord } from '../../kids-data/kids-word-bank'

export interface PaintColour {
  /** id từ chỉ màu, VD 'kids-colours-red' */
  wordId: string
  /** từ tiếng Anh (lấy từ ngân hàng từ), VD 'red' */
  word: KidsWord
  swatch: string
  paint: string
  blend: 'multiply' | 'screen'
}

const RAW: { wordId: string; swatch: string; paint: string; blend?: 'screen' }[] = [
  { wordId: 'kids-colours-red', swatch: '#ef3e36', paint: '#ee3a30' },
  { wordId: 'kids-colours-orange', swatch: '#ff8d1f', paint: '#ff8a17' },
  { wordId: 'kids-colours-yellow', swatch: '#ffd23a', paint: '#ffe03c' },
  { wordId: 'kids-colours-green', swatch: '#33c152', paint: '#2fc04f' },
  { wordId: 'kids-colours-blue', swatch: '#2f80f2', paint: '#2b7df3' },
  { wordId: 'kids-colours-purple', swatch: '#9353e6', paint: '#9150e8' },
  { wordId: 'kids-colours-pink', swatch: '#ff70b6', paint: '#ff6cb4' },
  { wordId: 'kids-colours-brown', swatch: '#965f2d', paint: '#93602e' },
  { wordId: 'kids-colours-black', swatch: '#2f2f3a', paint: '#3a3a46' },
  { wordId: 'kids-colours-grey', swatch: '#99a0aa', paint: '#8f969f' },
  { wordId: 'kids-colours-white', swatch: '#ffffff', paint: '#ffffff', blend: 'screen' },
]

/** Cả hộp màu (11 màu, đúng thứ tự khay). */
export const ALL_PAINTS: PaintColour[] = RAW.flatMap((raw) => {
  const word = findKidsWord(raw.wordId)
  return word ? [{ wordId: raw.wordId, word, swatch: raw.swatch, paint: raw.paint, blend: raw.blend ?? 'multiply' }] : []
})

/**
 * Màu dùng được cho lệnh ghép từ mẫu: bỏ trắng (đồ vật chưa tô đã gần trắng -> tô trắng
 * nhìn như không đổi gì) — trắng vẫn có thể xuất hiện khi chính từ "white" đang được ôn.
 */
export const COMMAND_PAINTS = ALL_PAINTS.filter((paint) => paint.wordId !== 'kids-colours-white')

export const findPaint = (wordId: string) => ALL_PAINTS.find((paint) => paint.wordId === wordId)

export const isColourWord = (word: KidsWord) => ALL_PAINTS.some((paint) => paint.wordId === word.id)

/** Sắp lại 1 nhóm màu theo đúng thứ tự trên khay. */
export const inTrayOrder = (paints: PaintColour[]) => [...paints].sort((a, b) => ALL_PAINTS.indexOf(a) - ALL_PAINTS.indexOf(b))
