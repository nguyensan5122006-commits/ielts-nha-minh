/**
 * band-scale.ts — CÁC PHÉP TÍNH VỀ BAND DÙNG CHUNG CHO WRITING + SPEAKING
 * ----------------------------------------------------------------------------
 * Không có giao diện ở đây, chỉ hàm thuần (dễ đọc, dễ kiểm thử):
 *   - bandDisplayFor()      : bài này hiện SỐ band (track IELTS) hay NHÃN "Cơ bản / Tốt / Rất tốt" (track general)
 *   - sampleBands()         : các mốc band của bài mẫu, VD [4, 5.5, 6.5]
 *   - selfBandFromChecklist : công thức tự chấm minh bạch (psych-adult D9 luật 37)
 *   - aiBandRange()         : band AI -> khoảng ±0.5
 *   - CRITERIA              : tên 7 tiêu chí IELTS (Writing: TA/TR, CC, LR, GRA · Speaking: FC, LR, GRA, P)
 *   - splitNotesByCriterion : tách nhận xét bài mẫu "TA: … CC: …" thành từng dòng theo tiêu chí
 *   - criterionOfMistake    : đoán 1 lỗi AI tìm ra thuộc tiêu chí nào (để xếp vào đúng thẻ "Nâng cấp")
 * ----------------------------------------------------------------------------
 */
import type { BandSample, BilingualText, SpeakingCriterion, TrackId, WritingCriterion } from '../../content/content-types'
import { findUnitOfLesson } from '../../content/path-selectors'

export type CriterionCode = WritingCriterion | SpeakingCriterion

/** 'numbers' = hiện "band 5.5" (track IELTS) · 'labels' = hiện "Cơ bản / Tốt / Rất tốt" (track general) */
export type BandDisplay = 'numbers' | 'labels'

/* ============================================================================
 * 1. Bài thuộc track nào -> cách hiện band
 * ========================================================================== */

/**
 * Chặng chỉ thuộc track general -> nhãn chữ; chỉ thuộc IELTS -> số.
 * Chặng dùng chung cả 2 track -> theo track người học đang chọn.
 */
export function bandDisplayFor(lessonId: string, profileTrack: TrackId): BandDisplay {
  const ieltsUnit = findUnitOfLesson(lessonId, 'ielts')
  const generalUnit = findUnitOfLesson(lessonId, 'general')
  // Level 1–2 (band 0–4.0): psych-adult D1 — chưa hiện số band, chỉ mô tả theo tiêu chí
  const level = (ieltsUnit ?? generalUnit)?.level.id
  if (level === 'level-1' || level === 'level-2') return 'labels'
  const inIelts = ieltsUnit?.unit.tracks.includes('ielts') ?? false
  const inGeneral = generalUnit?.unit.tracks.includes('general') ?? false
  if (inIelts && !inGeneral) return 'numbers'
  if (inGeneral && !inIelts) return 'labels'
  if (!inIelts && !inGeneral && /^(l3-g-|l2b-g-)/.test(lessonId)) return 'labels' // bài chưa gắn vào lộ trình
  return profileTrack === 'general' ? 'labels' : 'numbers'
}

/** 3 nhãn thay cho số band ở track general (thấp -> cao). */
export const LEVEL_LABELS: BilingualText[] = [
  { vi: 'Cơ bản', en: 'Basic' },
  { vi: 'Tốt', en: 'Good' },
  { vi: 'Rất tốt', en: 'Very good' },
]

/* ============================================================================
 * 2. Mốc bài mẫu
 * ========================================================================== */

/** Bài mẫu sắp từ band thấp -> cao (nội dung có thể viết lộn thứ tự). */
export function sortedSamples(samples: BandSample[]): BandSample[] {
  return [...samples].sort((a, b) => parseFloat(a.band) - parseFloat(b.band))
}

/** Các mốc band (số), từ thấp -> cao. VD ["4.0","5.5","6.5"] -> [4, 5.5, 6.5]. Không có bài mẫu -> [4, 5.5, 6.5]. */
export function sampleBands(samples: BandSample[]): number[] {
  const bands = sortedSamples(samples)
    .map((sample) => parseFloat(sample.band))
    .filter((band) => Number.isFinite(band))
  return bands.length >= 2 ? bands : [4, 5.5, 6.5]
}

/** Band bất kỳ -> vị trí nhãn gần nhất (0 = Cơ bản, 1 = Tốt, 2 = Rất tốt), dựa trên điểm giữa các mốc bài mẫu. */
export function levelIndexForBand(band: number, bands: number[]): number {
  for (let i = 0; i < bands.length - 1; i++) {
    if (band < (bands[i] + bands[i + 1]) / 2) return Math.min(i, LEVEL_LABELS.length - 1)
  }
  return Math.min(bands.length - 1, LEVEL_LABELS.length - 1)
}

/** Nhãn của bài mẫu thứ i (sau khi sắp thấp -> cao) ở track general. */
export function levelLabelOfSample(index: number): BilingualText {
  return LEVEL_LABELS[Math.min(index, LEVEL_LABELS.length - 1)]
}

/* ============================================================================
 * 3. Làm tròn + công thức tự chấm
 * ========================================================================== */

/** Làm tròn kiểu IELTS tới 0.5: x.25 -> x.5, x.75 -> (x+1).0 */
export function roundToHalfBand(value: number): number {
  return Math.floor(value * 2 + 0.5) / 2
}

/** Trả lời 1 câu hỏi tự chấm: Có = 1 điểm, Một phần = ½, Chưa = 0. */
export type SelfCheckAnswer = 'yes' | 'partly' | 'no'
export const SELF_CHECK_POINTS: Record<SelfCheckAnswer, number> = { yes: 1, partly: 0.5, no: 0 }

export interface CriterionSelfScore {
  criterion: CriterionCode
  /** 0..1 — trung bình điểm các câu đã trả lời; null = chưa trả lời câu nào */
  fraction: number | null
  /** band của tiêu chí (theo công thức), null = chưa đủ dữ liệu */
  band: number | null
}

/**
 * CÔNG THỨC TỰ CHẤM (hiện nguyên văn cho người học xem, tránh "điểm tổng không khớp điểm thành phần"):
 *   band tiêu chí = mốc thấp nhất + điểm × (mốc cao nhất − mốc thấp nhất)    (điểm 0..1)
 *   band chung    = trung bình các tiêu chí, làm tròn 0.5 kiểu IELTS
 * VD mốc 4.0 / 5.5 / 6.5: tiêu chí trả lời "Có" hết = 6.5, một nửa = 5.25 -> 5.5, "Chưa" hết = 4.0.
 * Nghĩa là: đạt hết checklist = ngang bài mẫu cao nhất, không đạt gì = ngang bài mẫu thấp nhất.
 */
export function selfBandFromChecklist(
  checklist: { criterion: CriterionCode; questionsVi: string[] }[],
  answers: Record<string, SelfCheckAnswer>,
  bands: number[],
): { perCriterion: CriterionSelfScore[]; overall: number | null; answered: number; total: number } {
  const low = bands[0]
  const span = bands[bands.length - 1] - low
  let answered = 0
  let total = 0
  const perCriterion = checklist.map((group) => {
    const points: number[] = []
    group.questionsVi.forEach((_, index) => {
      total += 1
      const answer = answers[selfCheckKey(group.criterion, index)]
      if (answer) {
        answered += 1
        points.push(SELF_CHECK_POINTS[answer])
      }
    })
    const fraction = points.length ? points.reduce((a, b) => a + b, 0) / points.length : null
    const band = fraction === null ? null : roundToHalfBand(low + fraction * span)
    return { criterion: group.criterion, fraction, band }
  })
  const bandsGiven = perCriterion.map((c) => c.band).filter((b): b is number => b !== null)
  const overall = bandsGiven.length === perCriterion.length && bandsGiven.length > 0
    ? roundToHalfBand(bandsGiven.reduce((a, b) => a + b, 0) / bandsGiven.length)
    : null
  return { perCriterion, overall, answered, total }
}

/** Khoá lưu câu trả lời tự chấm: "CC-1" = câu thứ 2 của tiêu chí CC. */
export function selfCheckKey(criterion: CriterionCode, index: number): string {
  return `${criterion}-${index}`
}

/** Band AI -> khoảng ±0.5 (kẹp trong 0..9). */
export function aiBandRange(overall: number): { low: number; high: number } {
  const center = roundToHalfBand(overall)
  return { low: Math.max(0, center - 0.5), high: Math.min(9, center + 0.5) }
}

/** Vị trí 0..1 của band trên thang bài mẫu (dùng làm "accuracy" của task cho trình học). */
export function bandToFraction(band: number, bands: number[]): number {
  const low = bands[0]
  const high = bands[bands.length - 1]
  if (high <= low) return 1
  return Math.max(0, Math.min(1, (band - low) / (high - low)))
}

export function formatBand(band: number): string {
  return band.toFixed(1)
}

/* ============================================================================
 * 4. Tên tiêu chí
 * ========================================================================== */

export const CRITERIA: Record<CriterionCode, { name: BilingualText; short: string; plainVi: string; plainEn: string }> = {
  TA: { name: { vi: 'Task Achievement', en: 'Task Achievement' }, short: 'TA', plainVi: 'Làm đủ yêu cầu đề', plainEn: 'Covers the task' },
  TR: { name: { vi: 'Task Response', en: 'Task Response' }, short: 'TR', plainVi: 'Trả lời đúng câu hỏi', plainEn: 'Answers the question' },
  CC: { name: { vi: 'Coherence & Cohesion', en: 'Coherence & Cohesion' }, short: 'CC', plainVi: 'Mạch lạc, liên kết', plainEn: 'Organised and linked' },
  LR: { name: { vi: 'Lexical Resource', en: 'Lexical Resource' }, short: 'LR', plainVi: 'Vốn từ', plainEn: 'Vocabulary' },
  GRA: { name: { vi: 'Grammar Range & Accuracy', en: 'Grammar Range & Accuracy' }, short: 'GRA', plainVi: 'Ngữ pháp', plainEn: 'Grammar' },
  FC: { name: { vi: 'Fluency & Coherence', en: 'Fluency & Coherence' }, short: 'FC', plainVi: 'Trôi chảy, mạch lạc', plainEn: 'Fluency' },
  P: { name: { vi: 'Pronunciation', en: 'Pronunciation' }, short: 'P', plainVi: 'Phát âm', plainEn: 'Pronunciation' },
}

/** Tên tiêu chí AI trả về ("Coherence and Cohesion"…) -> mã ngắn. */
export function criterionCodeFromName(name: string): CriterionCode | null {
  const n = name.toLowerCase()
  if (n.includes('achievement')) return 'TA'
  if (n.includes('response')) return 'TR'
  if (n.includes('fluency')) return 'FC'
  if (n.includes('coherence') || n.includes('cohesion')) return 'CC'
  if (n.includes('lexical') || n.includes('vocab')) return 'LR'
  if (n.includes('grammar') || n.includes('grammatical')) return 'GRA'
  if (n.includes('pronunciation')) return 'P'
  return null
}

/* ============================================================================
 * 5. Nhận xét bài mẫu theo tiêu chí
 * ========================================================================== */

/**
 * "Khoảng 4.5. TA: … CC: …\nLR: …" -> [{ criterion: 'TA', text: '…' }, …]
 * Bỏ tiền tố "Khoảng 4.5." (track general không được lộ số band). Không tìm thấy nhãn -> 1 dòng criterion null.
 */
export function splitNotesByCriterion(notes: string): { criterion: CriterionCode | null; text: string }[] {
  const cleaned = notes.replace(/^\s*Khoảng\s+\d+(?:[.,]\d)?\.?\s*/i, '').trim()
  const pattern = /(?:^|\s)(TA|TR|CC|LR|GRA|FC|P):\s/g
  const marks: { criterion: CriterionCode; start: number; contentStart: number }[] = []
  for (const match of cleaned.matchAll(pattern)) {
    const offset = match[0].length - match[0].trimStart().length
    marks.push({ criterion: match[1] as CriterionCode, start: match.index! + offset, contentStart: match.index! + match[0].length })
  }
  if (marks.length === 0) return [{ criterion: null, text: cleaned }]
  const parts: { criterion: CriterionCode | null; text: string }[] = []
  const lead = cleaned.slice(0, marks[0].start).trim()
  if (lead) parts.push({ criterion: null, text: lead })
  marks.forEach((mark, i) => {
    const end = i + 1 < marks.length ? marks[i + 1].start : cleaned.length
    parts.push({ criterion: mark.criterion, text: cleaned.slice(mark.contentStart, end).trim() })
  })
  return parts
}

/* ============================================================================
 * 6. Xếp lỗi AI vào tiêu chí (máy chưa gắn sẵn -> đoán theo từ khoá trong lời giải thích)
 * ========================================================================== */

const MISTAKE_KEYWORDS: [CriterionCode, RegExp][] = [
  ['P', /pronunc|sound|stress|intonation|ending|syllable|phát âm|âm cuối|trọng âm|ngữ điệu|âm tiết/i],
  ['FC', /fluen|hesitat|pause|filler|repetition of ideas|ngập ngừng|trôi chảy|ngắt quãng/i],
  ['CC', /linking|connector|cohesi|paragraph|transition|refer|sequenc|từ nối|đoạn|liên kết|mạch lạc|chuyển ý/i],
  ['LR', /word choice|vocabular|collocat|spelling|word form|synonym|informal|register|lexical|từ vựng|chính tả|dùng từ|lặp từ|kết hợp từ|cách dùng từ|từ loại/i],
  ['TA', /overview|data|figure|number|trend|số liệu|xu hướng|tổng quan/i],
  ['TR', /position|opinion|argument|example|idea|off.topic|quan điểm|ý kiến|lập luận|ví dụ|lạc đề/i],
]

/**
 * Đoán tiêu chí của 1 lỗi. `allowed` = các tiêu chí của bài (Writing: TA hoặc TR, CC, LR, GRA).
 * Không khớp từ khoá nào -> GRA (đa số lỗi AI chỉ ra là ngữ pháp).
 */
export function criterionOfMistake(
  mistake: { explanationVi?: string; explanationEn?: string; criterion?: string },
  allowed: CriterionCode[],
): CriterionCode {
  if (mistake.criterion) {
    const given = criterionCodeFromName(mistake.criterion) ?? (mistake.criterion.toUpperCase() as CriterionCode)
    if (allowed.includes(given)) return given
  }
  const text = `${mistake.explanationEn ?? ''} ${mistake.explanationVi ?? ''}`
  for (const [criterion, pattern] of MISTAKE_KEYWORDS) {
    if (!pattern.test(text)) continue
    if (allowed.includes(criterion)) return criterion
    // TA/TR là 2 tên của cùng 1 ô -> đổi sang ô bài này có
    if ((criterion === 'TA' || criterion === 'TR') && allowed.some((c) => c === 'TA' || c === 'TR')) {
      return allowed.find((c) => c === 'TA' || c === 'TR')!
    }
  }
  return allowed.includes('GRA') ? 'GRA' : allowed[allowed.length - 1]
}
