/**
 * word-class.ts — ĐOÁN LOẠI TỪ (danh từ / động từ / tính từ) ĐỂ TÔ MÀU CÂU KHI BÉ GHÉP XONG
 * ----------------------------------------------------------------------------
 * 07-KIDS-ZONE mục 4: "xong câu thì cả câu được đọc + tô màu loại từ".
 *
 *   tagSentence(['The', 'monkey', 'is', 'eating', 'a', 'banana.'])
 *   -> ['other', 'noun', 'verb', 'verb', 'other', 'noun']
 *
 * Cách đoán (đơn giản, đủ cho câu mẫu Starters–Flyers ngắn):
 *   1. Từ nối / mạo từ / đại từ / giới từ… (danh sách FUNCTION_WORDS) -> 'other' (không tô màu)
 *   2. Tính từ quen (màu, to/nhỏ, vui/buồn, thời tiết…) + dạng so sánh (bigger, tallest) -> 'adjective'
 *   3. Động từ: be / have / can…, động từ thường gặp, đuôi -ing / -ed -> 'verb'
 *   4. Còn lại: có trong ngân hàng từ trẻ em, hoặc đứng sau mạo từ / tính từ / số đếm,
 *      hoặc viết hoa giữa câu (tên riêng) -> 'noun'; không chắc thì 'other'.
 * Thà "không tô" còn hơn tô sai: từ nào không chắc thì để 'other'.
 * ----------------------------------------------------------------------------
 */
import { ALL_KIDS_WORDS } from '../../kids-data/kids-word-bank'

export type WordClass = 'noun' | 'verb' | 'adjective' | 'other'

const words = (list: string) => new Set(list.split(/\s+/).filter(Boolean))

/** Từ chức năng: mạo từ, đại từ, giới từ, từ nối, trạng từ chỉ mức độ / thời gian, số đếm… */
const FUNCTION_WORDS = words(`
  a an the my your his her its our their this that these those some any every no
  i you he she it we they me him us them mine yours there here
  in on under at to from with of for by behind between near next opposite above below into onto front over
  and but or because so when if than then not very too also really just still again
  what where who which how many much why whose
  today tomorrow yesterday now always often sometimes never ever soon later o'clock
  all both each up down out off after before away home please
  one two three four five six seven eight nine ten eleven twelve thirteen fourteen fifteen
  sixteen seventeen eighteen nineteen twenty hundred first second third last
  let's i'm i've i'll you're we're they're it's he's she's that's there's what's where's
  fast far well
`)

const ADJECTIVES = words(`
  red blue green yellow orange pink purple brown black white grey gray gold silver
  big small little long short tall new old young happy sad angry hungry thirsty tired
  cold hot warm cool sunny rainy windy cloudy snowy foggy wet dry clean dirty
  beautiful pretty ugly good bad nice funny slow quiet loud noisy easy difficult hard
  favourite favorite best better worse worst great lovely kind friendly scary delicious
  sweet strong weak heavy dark fat thin round busy free ill sick careful bored excited
  sleepy naughty clever brave curly straight fair afraid full empty right wrong
  high low wide deep open closed fine sure special different same ready late early
`)

/** Danh từ đuôi -ing (không phải động từ): morning, evening… */
const NOUNS_ENDING_ING = words('morning evening something anything nothing everything ceiling king ring thing spring string wing building painting swing')

const VERBS = words(`
  am is are was were be been being have has had do does did don't doesn't didn't
  can can't could will won't would shall should must mustn't might may
  eat drink run jump swim fly sing dance play ride read write draw paint kick throw catch
  climb sleep walk sit stand go goes come see look watch listen hear like likes love want wants
  need get got make take give put open close help wash brush cook buy sell find found lose lost
  went saw ate drank bought learn finish arrive wear carry live lives work study think know
  say said tell ask answer clean tidy visit wait stop start begin fall hit bounce laugh cry
  smile shout call feel try use wake fix bring brought came took made gave sat ran swam flew
  sang wrote drew wore met meet keep kept leave left send sent show grow fall fell
  shall let lets spell count colour color move hold
`)

// Từ trong ngân hàng từ trẻ em (chữ thường) -> nhận ra danh từ như "banana", "kite", "Ha Noi"…
const KIDS_NOUNS = new Set(
  ALL_KIDS_WORDS.filter((word) => !word.tags?.includes('action') && !word.tags?.includes('color')).map((word) => word.word.toLowerCase()),
)

/** Bỏ dấu câu dính ở đầu / cuối: "banana." -> "banana", "Where's" giữ nguyên dấu nháy giữa từ */
export const bareWord = (token: string) => token.replace(/^[^a-z0-9']+|[^a-z0-9']+$/gi, '')

/** "bigger" -> "big", "tallest" -> "tall", "happier" -> "happy" (để nhận dạng so sánh hơn / nhất) */
function comparativeStem(word: string): string | null {
  const match = word.match(/^(.+?)(er|est)$/)
  if (!match) return null
  const stem = match[1]
  const candidates = [stem, stem.replace(/i$/, 'y'), stem.replace(/(.)\1$/, '$1'), `${stem}e`]
  return candidates.find((candidate) => ADJECTIVES.has(candidate)) ?? null
}

/** Số nhiều -> số ít để tra ngân hàng từ: "ducks" -> "duck", "boxes" -> "box", "butterflies" -> "butterfly" */
function singularForms(word: string): string[] {
  const forms = [word]
  if (word.endsWith('ies')) forms.push(`${word.slice(0, -3)}y`)
  if (word.endsWith('es')) forms.push(word.slice(0, -2))
  if (word.endsWith('s')) forms.push(word.slice(0, -1))
  return forms
}

function classOfOne(token: string, index: number, previous: WordClass | null, previousWord: string): WordClass {
  const raw = bareWord(token)
  const word = raw.toLowerCase()
  if (!word) return 'other'
  if (FUNCTION_WORDS.has(word)) return 'other'
  if (ADJECTIVES.has(word) || comparativeStem(word)) return 'adjective'
  if (VERBS.has(word)) return 'verb'
  if (word.endsWith('ing') && word.length > 4 && !NOUNS_ENDING_ING.has(word) && !KIDS_NOUNS.has(word)) return 'verb'
  if (word.endsWith('ed') && word.length > 4 && !KIDS_NOUNS.has(word)) return 'verb'
  if (singularForms(word).some((form) => KIDS_NOUNS.has(form))) return 'noun'
  // viết hoa giữa câu = tên riêng (Lan, Ha Noi, Monday…)
  if (index > 0 && /^[A-Z]/.test(raw)) return 'noun'
  // đứng ngay sau mạo từ / sở hữu / tính từ / số đếm -> thường là danh từ
  const determinerBefore = /^(a|an|the|my|your|his|her|our|their|this|that|these|those|some|any)$/.test(previousWord)
  if (determinerBefore || previous === 'adjective') return 'noun'
  return 'other'
}

/** Loại từ cho từng khối chữ của 1 câu. */
export function tagSentence(tokens: string[]): WordClass[] {
  const result: WordClass[] = []
  tokens.forEach((token, index) => {
    const previousWord = index > 0 ? bareWord(tokens[index - 1]).toLowerCase() : ''
    result.push(classOfOne(token, index, result[index - 1] ?? null, previousWord))
  })
  return result
}

/**
 * Loại từ của 1 khối có thể gồm nhiều từ (mức dễ gộp "the cat" thành 1 khối):
 * lấy loại "nặng ký" nhất trong khối (danh từ > động từ > tính từ > khác).
 */
export function classOfChunk(chunkClasses: WordClass[]): WordClass {
  for (const wanted of ['noun', 'verb', 'adjective'] as const) if (chunkClasses.includes(wanted)) return wanted
  return 'other'
}
