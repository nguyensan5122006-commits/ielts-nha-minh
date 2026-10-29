/**
 * colour-question.ts — BIẾN 1 TỪ CỦA LƯỢT CHƠI THÀNH 1 "LỆNH TÔ MÀU" + BỨC TRANH
 * ----------------------------------------------------------------------------
 * Động cơ chung (round-builder) đưa cho trò 1 từ mỗi câu (VD "cat", "red", "bus").
 * File này chọn lệnh tô màu để ÔN ĐÚNG TỪ ĐÓ:
 *
 *   1. Có lệnh soạn sẵn (content/kids/colour-commands.ts) dùng từ này — làm đồ vật cần tô,
 *      hoặc làm màu cần tô nếu từ là 1 màu — và hợp độ khó -> dùng lệnh đó + tranh vẽ sẵn
 *      (colour-scenes.ts). Lệnh soạn sẵn có file giọng đọc thật và luyện giới từ / so sánh.
 *   2. Không có -> GHÉP TỪ MẪU: "Colour the cat red." với tranh = từ đó + 2–3 đồ vật khác
 *      cùng chủ đề. Độ khó 3: "Colour the small cat red." (2 con mèo to / nhỏ).
 *      Từ không phải đồ vật (động từ "swim", tính từ "happy") dùng mẫu "Find "swim". Colour it red."
 *
 * Độ khó (plan.difficulty.level) quyết định:
 *   - bậc lệnh soạn sẵn được dùng: 1 = màu + đồ vật, to / nhỏ · 2 = + giới từ, so sánh, both / all
 *     · 3 = + mệnh đề "who / that is …", above / near
 *   - số lọ sơn trên khay: 4 / 6 / 8 · số đồ vật trong tranh mẫu: 3 / 4 / 4
 *
 * Lệnh soạn sẵn vừa dùng được nhớ trong localStorage (12 lệnh gần nhất) để lượt sau đổi lệnh khác.
 * ----------------------------------------------------------------------------
 */
import type { KidsWord } from '../../../../content/content-types'
import { KIDS_COLOUR_COMMANDS, type KidsColourCommand } from '../../../../content/kids'
import { shuffle } from '../../game-engine/round-builder'
import type { RoundItem, RoundPlan } from '../../game-engine/engine-types'
import { findKidsWord, hasPicture, topicOfWord } from '../../kids-data/kids-word-bank'
import { ALL_PAINTS, COMMAND_PAINTS, findPaint, inTrayOrder, isColourWord, type PaintColour } from './colour-palette'
import { COMMAND_SCENES, SKY_WORD_IDS, TEMPLATE_SLOTS, backdropForTopic, type SceneBackdrop, type ScenePlacement, type SceneProp } from './colour-scenes'

/** 1 vật trong tranh đã "giải" xong: có khoá riêng, tên ảnh, chữ tiếng Anh. */
export interface SceneThing extends ScenePlacement {
  key: string
  slug: string
  /** chữ tiếng Anh (vật trang trí: rỗng) */
  label: string
}

export interface ColourQuestion {
  commandEn: string
  commandVi: string
  /** id lệnh soạn sẵn (có file giọng đọc) — null = lệnh ghép từ mẫu */
  commandId: string | null
  /** màu đúng */
  colour: PaintColour
  /** các lọ sơn trên khay (đã gồm màu đúng, theo thứ tự khay) */
  palette: PaintColour[]
  backdrop: SceneBackdrop
  things: SceneThing[]
  props: SceneProp[]
}

/* ---------------------------------------------------------------------------
 * Bậc của 30 lệnh soạn sẵn (theo điểm ngữ pháp, dễ -> khó)
 * ------------------------------------------------------------------------- */
const COMMAND_TIER: Record<string, 1 | 2 | 3> = Object.fromEntries(
  KIDS_COLOUR_COMMANDS.map((command) => {
    const n = Number(command.id.slice(-2))
    return [command.id, n <= 6 ? 1 : n <= 19 ? 2 : 3]
  }),
)

const PALETTE_SIZE: Record<1 | 2 | 3, number> = { 1: 4, 2: 6, 3: 8 }

/* ---------------------------------------------------------------------------
 * Nhớ lệnh vừa dùng (để lượt sau đổi lệnh khác)
 * ------------------------------------------------------------------------- */
const RECENT_KEY = 'kids-zone:colour-command:recent'
const RECENT_MAX = 12

function readRecentCommands(): string[] {
  try {
    const value = JSON.parse(localStorage.getItem(RECENT_KEY) ?? '[]') as unknown
    return Array.isArray(value) ? value.filter((id): id is string => typeof id === 'string') : []
  } catch {
    return []
  }
}
function rememberCommand(id: string) {
  try {
    const recent = [...readRecentCommands().filter((x) => x !== id), id].slice(-RECENT_MAX)
    localStorage.setItem(RECENT_KEY, JSON.stringify(recent))
  } catch {
    /* không lưu được cũng không sao */
  }
}

/* ---------------------------------------------------------------------------
 * Cách nói lệnh ghép từ mẫu theo loại từ
 * ------------------------------------------------------------------------- */
type TemplateFrame = 'noun' | 'number' | 'find'

/** Từ không phải đồ vật -> "Find "…". Colour it …" (tránh câu sai như "Colour the swim red.") */
const FIND_FRAME_WORD_IDS = new Set([
  'kids-body-happy',
  'kids-body-sad',
  'kids-body-angry',
  'kids-body-tired',
  'kids-body-hungry',
  'kids-body-headache',
  'kids-body-temperature',
  'kids-numbers-morning',
  'kids-numbers-evening',
  'kids-numbers-night',
  'kids-sports-fishing',
  'kids-sports-ice-skating',
  'kids-sports-roller-skating',
])

function frameOf(word: KidsWord): TemplateFrame {
  if (word.tags?.includes('action') || FIND_FRAME_WORD_IDS.has(word.id)) return 'find'
  if (word.id.startsWith('kids-numbers-')) return 'number'
  return 'noun'
}

function templateCommand(word: KidsWord, colour: PaintColour, size: 'big' | 'small' | null): { en: string; vi: string } {
  const colourEn = colour.word.word
  const colourVi = colour.word.meaningVi
  switch (frameOf(word)) {
    case 'find':
      return { en: `Find "${word.word}". Colour it ${colourEn}.`, vi: `Tìm hình "${word.meaningVi}" rồi tô ${colourVi}.` }
    case 'number':
      return { en: `Colour number ${word.word} ${colourEn}.`, vi: `Tô ${colourVi} cho số ${word.meaningVi}.` }
    default:
      if (size) {
        const sizeVi = size === 'big' ? 'to' : 'nhỏ'
        return { en: `Colour the ${size} ${word.word} ${colourEn}.`, vi: `Tô ${colourVi} cho ${word.meaningVi} ${sizeVi}.` }
      }
      return { en: `Colour the ${word.word} ${colourEn}.`, vi: `Tô ${colourVi} cho ${word.meaningVi}.` }
  }
}

/* ---------------------------------------------------------------------------
 * Đồ vật dự phòng cho câu ôn 1 MÀU (tranh cần đồ vật để tô)
 * ------------------------------------------------------------------------- */
const FALLBACK_OBJECT_IDS = [
  'kids-animals-cat',
  'kids-animals-dog',
  'kids-animals-fish',
  'kids-toys-ball',
  'kids-toys-kite',
  'kids-toys-teddy-bear',
  'kids-food-apple',
  'kids-transport-car',
  'kids-clothes-hat',
  'kids-weather-flower',
]

/* ---------------------------------------------------------------------------
 * Hàm chính
 * ------------------------------------------------------------------------- */
export interface BuildColourQuestionInput {
  item: RoundItem
  plan: RoundPlan
  /** lệnh soạn sẵn đã dùng trong lượt này (câu gặp lại không lặp y hệt câu trước) */
  usedInRound: Set<string>
  random?: () => number
}

export function buildColourQuestion({ item, plan, usedInRound, random = Math.random }: BuildColourQuestionInput): ColourQuestion {
  const level = plan.difficulty.level
  const word = item.word
  const wordIsColour = isColourWord(word)

  // 1. Lệnh soạn sẵn hợp với từ + độ khó
  const recent = readRecentCommands()
  const candidates = KIDS_COLOUR_COMMANDS.filter(
    (command) =>
      COMMAND_TIER[command.id] <= level &&
      COMMAND_SCENES[command.id] &&
      !usedInRound.has(command.id) &&
      (wordIsColour ? command.colourWordId === word.id : command.targetWordId === word.id),
  )
  if (candidates.length) {
    // ưu tiên lệnh lâu chưa gặp; ở độ khó cao ưu tiên lệnh bậc cao (khó hơn)
    const ranked = shuffle(candidates, random).sort(
      (a, b) => recentRank(recent, a.id) - recentRank(recent, b.id) || (level >= 2 ? COMMAND_TIER[b.id] - COMMAND_TIER[a.id] : 0),
    )
    const command = ranked[0]
    usedInRound.add(command.id)
    rememberCommand(command.id)
    return fromScriptedCommand(command, level, random)
  }

  // 2. Ghép từ mẫu
  return fromTemplate(item, plan, random)
}

/**
 * CHỈ KHI DEV: ép dùng lệnh soạn sẵn theo địa chỉ trang, để xem lại từng bức tranh.
 *   /kids-preview/play/colour-command?command=kids-colour-07   -> mọi câu dùng lệnh 07
 *   ?command=all                                                -> câu thứ n dùng lệnh thứ n (01, 02, …)
 * Bản build thật không có đoạn này (import.meta.env.DEV = false).
 */
export function devForcedQuestion(questionIndex: number, level: 1 | 2 | 3): ColourQuestion | null {
  if (!import.meta.env.DEV) return null
  const wanted = new URLSearchParams(window.location.search).get('command')
  if (!wanted) return null
  const command = wanted === 'all' ? KIDS_COLOUR_COMMANDS[questionIndex % KIDS_COLOUR_COMMANDS.length] : KIDS_COLOUR_COMMANDS.find((c) => c.id === wanted)
  return command ? fromScriptedCommand(command, level, Math.random) : null
}

/** Lệnh càng lâu chưa dùng thì số càng nhỏ (chưa từng dùng = -1). */
const recentRank = (recent: string[], id: string) => recent.indexOf(id)

function fromScriptedCommand(command: KidsColourCommand, level: 1 | 2 | 3, random: () => number): ColourQuestion {
  const layout = COMMAND_SCENES[command.id]
  const colour = findPaint(command.colourWordId) ?? COMMAND_PAINTS[0]
  return {
    commandEn: command.commandEn,
    commandVi: command.commandVi,
    commandId: command.id,
    colour,
    palette: pickPalette(colour, level, random),
    backdrop: layout.backdrop,
    things: resolveThings(layout.things),
    props: layout.props ?? [],
  }
}

function fromTemplate(item: RoundItem, plan: RoundPlan, random: () => number): ColourQuestion {
  const level = plan.difficulty.level
  const word = item.word
  const wordIsColour = isColourWord(word)

  // Màu: từ đang ôn là màu -> chính màu đó; không thì chọn ngẫu nhiên (không trắng)
  const colour = (wordIsColour && findPaint(word.id)) || COMMAND_PAINTS[Math.floor(random() * COMMAND_PAINTS.length)]

  // Đồ vật cần tô: từ đang ôn (hoặc 1 đồ vật quen nếu từ đang ôn là màu)
  const objectPool = plan.distractorPool.filter((w) => hasPicture(w) && !isColourWord(w) && w.id !== word.id)
  const target: KidsWord = wordIsColour
    ? (shuffle(
        objectPool.filter((w) => w.tags?.includes('colorable')),
        random,
      )[0] ??
      findKidsWord(FALLBACK_OBJECT_IDS[Math.floor(random() * FALLBACK_OBJECT_IDS.length)]) ??
      word)
    : word

  // Độ khó 3 (và đồ vật là danh từ thường): 2 bản to / nhỏ của cùng đồ vật
  const sizeTwist = level === 3 && frameOf(target) === 'noun' && !wordIsColour ? (random() < 0.5 ? 'big' : 'small') : null
  const decoyCount = sizeTwist ? 2 : level === 1 ? 2 : 3
  // Đồ vật nhiễu: cùng chủ đề + cùng "loại từ"; thiếu thì lấy thêm đồ vật quen (chủ đề Màu sắc ít đồ vật)
  const sameKind = objectPool.filter((w) => w.id !== target.id && frameOf(w) === frameOf(target))
  const backup = FALLBACK_OBJECT_IDS.map((id) => findKidsWord(id)).filter((w): w is KidsWord => !!w && w.id !== target.id)
  const decoyPool = sameKind.length >= decoyCount ? sameKind : [...sameKind, ...shuffle(backup, random)]
  const decoys = shuffle(decoyPool.slice(0, Math.max(decoyCount, sameKind.length)), random)
    .filter((w, index, list) => list.findIndex((x) => x.id === w.id) === index)
    .slice(0, decoyCount)

  const slots = shuffle(TEMPLATE_SLOTS[decoys.length + 1 >= 4 ? 4 : 3], random)
  const placements: ScenePlacement[] = []
  const place = (w: KidsWord, role: 'target' | 'other', slot: { x: number; y: number; size: number }, scale = 1) => {
    const inSky = SKY_WORD_IDS.has(w.id)
    placements.push({ wordId: w.id, role, x: slot.x, y: inSky ? 30 : slot.y, size: Math.round(slot.size * scale * (inSky ? 0.8 : 1)) })
  }

  if (sizeTwist) {
    // slot 0, 1 cho cặp to / nhỏ; đồ vật nhỏ đứng thấp hơn 1 chút cho cùng "mặt đất"
    const [bigSlot, smallSlot, ...rest] = slots
    place(target, sizeTwist === 'big' ? 'target' : 'other', bigSlot, 1.15)
    place(target, sizeTwist === 'small' ? 'target' : 'other', { ...smallSlot, y: smallSlot.y + 8 }, 0.55)
    decoys.forEach((decoy, index) => rest[index] && place(decoy, 'other', rest[index]))
  } else {
    place(target, 'target', slots[0])
    decoys.forEach((decoy, index) => slots[index + 1] && place(decoy, 'other', slots[index + 1]))
  }

  const command = templateCommand(target, colour, sizeTwist)
  return {
    commandEn: command.en,
    commandVi: command.vi,
    commandId: null,
    colour,
    palette: pickPalette(colour, level, random),
    backdrop: backdropForTopic(topicOfWord(target.id)?.id),
    things: resolveThings(placements),
    props: [],
  }
}

/** Khay màu: màu đúng + vài màu khác (ngẫu nhiên), xếp theo thứ tự khay. */
function pickPalette(colour: PaintColour, level: 1 | 2 | 3, random: () => number): PaintColour[] {
  const others = shuffle(
    ALL_PAINTS.filter((paint) => paint.wordId !== colour.wordId && paint.wordId !== 'kids-colours-white'),
    random,
  ).slice(0, PALETTE_SIZE[level] - 1)
  return inTrayOrder([colour, ...others])
}

/** Gắn khoá riêng + tên ảnh + chữ cho từng vật trong tranh. */
function resolveThings(placements: ScenePlacement[]): SceneThing[] {
  return placements.map((placement, index) => {
    const word = placement.wordId ? findKidsWord(placement.wordId) : undefined
    return {
      ...placement,
      key: `${placement.wordId ?? placement.slug}#${index}`,
      slug: placement.slug ?? word?.image ?? '',
      label: word?.word ?? '',
    }
  })
}
