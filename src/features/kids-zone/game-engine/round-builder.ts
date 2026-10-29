/**
 * round-builder.ts
 * ----------------------------------------------------------------------------
 * XẾP 1 LƯỢT CHƠI (8–12 câu) cho mọi trò trong khu trẻ em.
 *
 * Luật (07-KIDS-ZONE mục 3 + psych-kids luật 1, 9, 12, 35):
 *   1. Từ ĐẾN HẠN ÔN đi trước (hộp Leitner thấp = dễ quên nhất trước).
 *   2. Tối đa 3 TỪ MỚI / lượt, lấy từ chủ đề đang học; còn nhiều từ đến hạn (≥ 8) thì chỉ 2
 *      (giữ tỉ lệ mới : ôn ≈ 30 : 70). Mỗi ngày tối đa 8 từ mới (newWordsLeftToday do nơi gọi tính).
 *      Lượt mặc định 10 câu, kéo dài tới 12 câu nếu còn từ đến hạn.
 *   3. Từ mới được GẶP LẠI trong cùng lượt, cách ≥ 3 câu ("hộp 1 = gặp lại ngay trong buổi");
 *      từ hôm qua còn sai (hộp 0) cũng được gặp lại nếu lượt còn chỗ.
 *   4. Thiếu câu (bé mới, ít từ đến hạn) -> thêm lần gặp lại từ mới, rồi "luyện thêm"
 *      từ đã học nhưng chưa đến hạn (luyện thêm KHÔNG đổi hộp Leitner).
 *   5. Câu đầu tiên ưu tiên 1 từ bé đã khá chắc -> vào trò thấy tự tin.
 *
 * Hàm THUẦN (không đọc/ghi gì bên ngoài) — truyền `random` cố định là ra kết quả cố định,
 * tiện kiểm thử.
 * ----------------------------------------------------------------------------
 */
import type { KidsWord } from '../../../content/content-types'
import { KIDS_NEW_WORDS_PER_ROUND, kidsWordsDueToday, pickNewKidsWords } from '../../../learning-progress/kids-word-boxes'
import type { KidsProgress } from '../../../learning-progress/progress-types'
import { ALL_KIDS_WORDS, findKidsTopic, findKidsWord, hasPicture, pickActiveTopic, topicOfWord } from '../kids-data/kids-word-bank'
import type { DifficultySettings, KidsGameId, RoundItem, RoundItemKind, RoundPlan } from './engine-types'

export const ROUND_MIN_ITEMS = 8
export const ROUND_TARGET_ITEMS = 10
export const ROUND_MAX_ITEMS = 12

export interface BuildRoundOptions {
  gameId: KidsGameId
  kids: KidsProgress
  /** "YYYY-MM-DD" */
  today: string
  difficulty: DifficultySettings
  /** Ép chủ đề (bé chọn ở sảnh). Bỏ trống = chủ đề đang học. */
  topicId?: string
  /** Trò cần ảnh (chọn hình) -> chỉ dùng từ có ảnh. Mặc định true. */
  needsPicture?: boolean
  /**
   * Lọc thêm từ dùng được cho trò (khai trong game-definition.ts), VD Xếp chữ chỉ lấy từ ≤ 8 chữ cái,
   * Ghép câu chỉ lấy từ có câu mẫu. Bỏ trống = mọi từ (có ảnh nếu needsPicture).
   */
  wordFilter?: (word: KidsWord) => boolean
  /** Số từ mới còn được học hôm nay (trần 8 / buổi). Mặc định 3. */
  newWordsLeftToday?: number
  /** Số câu mong muốn (8–12). Mặc định 10. */
  targetSize?: number
  random?: () => number
}

/** Xáo trộn (Fisher–Yates) — trả mảng mới. */
export function shuffle<T>(items: readonly T[], random: () => number = Math.random): T[] {
  const result = [...items]
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1))
    ;[result[i], result[j]] = [result[j], result[i]]
  }
  return result
}

export function buildRound(options: BuildRoundOptions): RoundPlan {
  const { gameId, kids, today, difficulty, needsPicture = true, random = Math.random } = options
  const targetSize = Math.min(ROUND_MAX_ITEMS, Math.max(ROUND_MIN_ITEMS, options.targetSize ?? ROUND_TARGET_ITEMS))
  const usable = makeUsable(needsPicture, options.wordFilter)

  const topic = (options.topicId && findKidsTopic(options.topicId)) || pickActiveTopic(kids, needsPicture)

  /* ---------- 1. Từ đến hạn ôn (hộp thấp trước; từ của chủ đề bé chọn lên đầu) ---------- */
  const due = kidsWordsDueToday(kids, today)
    .map(findKidsWord)
    .filter(usable)
  const dueSorted = options.topicId
    ? [...due.filter((w) => topicOfWord(w.id)?.id === topic.id), ...due.filter((w) => topicOfWord(w.id)?.id !== topic.id)]
    : due

  /* ---------- 2. Từ mới: 3 từ; nhưng nếu nhiều từ đến hạn (≥ 8) thì chỉ 2 để giữ tỉ lệ mới : ôn ≈ 30 : 70 ---------- */
  const maxNew = Math.max(0, Math.min(due.length >= 8 ? 2 : KIDS_NEW_WORDS_PER_ROUND, options.newWordsLeftToday ?? KIDS_NEW_WORDS_PER_ROUND))
  const topicCandidates = topic.words.filter(usable).map((word) => word.id)
  const newWords = pickNewKidsWords(kids, topicCandidates, maxNew).map((id) => findKidsWord(id)!)

  // Mỗi từ mới chiếm 2 câu (câu đầu + 1 lần gặp lại); mỗi từ ôn 1 câu.
  // Còn từ đến hạn thì lượt được dài tới 12 câu (không để từ đến hạn phải chờ).
  const size = Math.max(targetSize, Math.min(ROUND_MAX_ITEMS, newWords.length * 2 + due.length))
  const reviews = dueSorted.slice(0, Math.max(0, size - newWords.length * 2))

  /* ---------- 3. Luyện thêm khi thiếu câu ---------- */
  const inRound = new Set([...newWords, ...reviews].map((w) => w.id))
  const plannedCount = newWords.length * 2 + reviews.length
  const practice: KidsWord[] = []
  if (plannedCount < ROUND_MIN_ITEMS) {
    const candidates = Object.entries(kids.words)
      .filter(([id, state]) => !inRound.has(id) && state.box < 5 && state.due > today)
      .map(([id, state]) => ({ word: findKidsWord(id), state }))
      .filter((c): c is { word: KidsWord; state: (typeof c)['state'] } => usable(c.word))
      // cùng chủ đề trước, rồi hộp thấp (chưa chắc) trước
      .sort(
        (a, b) =>
          Number(topicOfWord(b.word.id)?.id === topic.id) - Number(topicOfWord(a.word.id)?.id === topic.id) ||
          a.state.box - b.state.box,
      )
    for (const { word } of candidates) {
      if (plannedCount + practice.length >= ROUND_MIN_ITEMS) break
      practice.push(word)
    }
  }

  /* ---------- 4. Xếp thứ tự ---------- */
  let keyCounter = 0
  const makeItem = (word: KidsWord, kind: RoundItemKind, showIntro = false): RoundItem => ({
    key: `${word.id}#${keyCounter++}`,
    word,
    kind,
    showIntro,
  })

  // Câu ôn xáo trộn, nhưng câu ĐẦU là từ bé chắc nhất (hộp cao nhất) để khởi động
  const reviewItems = shuffle(reviews, random).map((w) => makeItem(w, 'review'))
  const practiceItems = shuffle(practice, random).map((w) => makeItem(w, 'practice'))
  const easyPool = [...reviewItems, ...practiceItems]
  easyPool.sort((a, b) => (kids.words[b.word.id]?.box ?? 0) - (kids.words[a.word.id]?.box ?? 0))
  const warmUp = easyPool.length ? [easyPool[0]] : []
  const others = shuffle(
    easyPool.filter((item) => item !== warmUp[0]),
    random,
  )

  // Từ mới chen vào ở vị trí 1, 4, 7… (không dồn cục) để còn chỗ gặp lại phía sau
  const base: RoundItem[] = [...warmUp]
  const newQueue = newWords.map((w) => makeItem(w, 'new', true))
  while (others.length || newQueue.length) {
    const wantsNew = newQueue.length > 0 && (base.length % 3 === 1 || others.length === 0)
    base.push(wantsNew ? newQueue.shift()! : others.shift()!)
  }

  /* ---------- 5. Gặp lại trong lượt ---------- */
  // Từ mới luôn được gặp lại 1 lần; từ hôm qua còn sai (hộp 0) gặp lại nếu lượt còn chỗ
  const repeats = base.filter((item) => item.kind === 'new').map((item) => makeItem(item.word, 'repeat'))
  for (const item of base) {
    if (base.length + repeats.length >= size) break
    if (item.kind === 'review' && kids.words[item.word.id]?.box === 0) repeats.push(makeItem(item.word, 'repeat'))
  }
  // Bé mới tinh (ít câu): từ mới được gặp thêm lần thứ 3 cho đủ 8 câu
  for (const word of newWords) {
    if (base.length + repeats.length >= ROUND_MIN_ITEMS) break
    repeats.push(makeItem(word, 'repeat'))
  }
  const sequence = scheduleWithGaps(base, repeats)

  return {
    gameId,
    topicId: topic.id,
    items: sequence.slice(0, ROUND_MAX_ITEMS),
    distractorPool: buildDistractorPool(kids, topic.id, sequence, usable),
    newWordIds: newWords.map((w) => w.id),
    difficulty,
    mode: 'calm',
  }
}

/** "Từ này trò dùng được không?" = có ảnh (nếu trò cần ảnh) + qua bộ lọc riêng của trò. */
function makeUsable(needsPicture: boolean, wordFilter?: (word: KidsWord) => boolean) {
  return (word: KidsWord | undefined): word is KidsWord => !!word && (!needsPicture || hasPicture(word)) && (!wordFilter || wordFilter(word))
}

/* ============================================================================
 * CHẾ ĐỘ "ĐUA TỐC ĐỘ" (07-KIDS-ZONE mục 3, psych-kids luật 28)
 *   - Chỉ dùng từ bé ĐÃ CHẮC: hộp Leitner ≥ 3.
 *   - Đồng hồ 75 giây (đặc tả: 60–90 giây); trả lời được bao nhiêu thì bấy nhiêu.
 *   - Mọi câu là 'practice' -> không đổi hộp Leitner, không có thẻ giới thiệu từ mới.
 * ========================================================================== */

export const RACE_MIN_BOX = 3
/** Cần ít nhất chừng này từ đã chắc thì mới mở chế độ đua (ít hơn thì lặp lại quá nhiều) */
export const RACE_MIN_WORDS = 4
export const RACE_SECONDS = 75
/** Hàng câu đủ dài cho 75 giây (bé nhanh nhất ~1,5 giây/câu) */
const RACE_QUEUE_LENGTH = 60

/** Các từ dùng được cho lượt đua của 1 trò (hộp ≥ 3, có ảnh nếu cần, qua bộ lọc của trò). */
export function raceWords(kids: KidsProgress, needsPicture = true, wordFilter?: (word: KidsWord) => boolean): KidsWord[] {
  const usable = makeUsable(needsPicture, wordFilter)
  return Object.entries(kids.words)
    .filter(([, state]) => state.box >= RACE_MIN_BOX)
    .map(([id]) => findKidsWord(id))
    .filter(usable)
}

export interface BuildRaceOptions {
  gameId: KidsGameId
  kids: KidsProgress
  difficulty: DifficultySettings
  needsPicture?: boolean
  wordFilter?: (word: KidsWord) => boolean
  random?: () => number
}

/**
 * Xếp 1 lượt đua: các từ đã chắc xáo trộn, hết vòng thì xáo lại (không để 1 từ đứng 2 câu liền).
 * Chưa đủ RACE_MIN_WORDS từ -> nơi gọi không nên mở chế độ đua (KidsPlayPage tự lùi về Thong thả).
 */
export function buildRaceRound(options: BuildRaceOptions): RoundPlan {
  const { gameId, kids, difficulty, needsPicture = true, random = Math.random } = options
  const usable = makeUsable(needsPicture, options.wordFilter)
  const words = raceWords(kids, needsPicture, options.wordFilter)

  const sequence: RoundItem[] = []
  let keyCounter = 0
  while (words.length && sequence.length < RACE_QUEUE_LENGTH) {
    const cycle = shuffle(words, random)
    // đầu vòng mới trùng từ cuối vòng trước -> đổi chỗ với từ kế bên
    if (cycle.length > 1 && cycle[0].id === sequence[sequence.length - 1]?.word.id) [cycle[0], cycle[1]] = [cycle[1], cycle[0]]
    for (const word of cycle) sequence.push({ key: `race:${word.id}#${keyCounter++}`, word, kind: 'practice', showIntro: false })
  }

  const topic = pickActiveTopic(kids, needsPicture)
  return {
    gameId,
    topicId: topic.id,
    items: sequence.slice(0, RACE_QUEUE_LENGTH),
    distractorPool: buildDistractorPool(kids, topic.id, sequence, usable),
    newWordIds: [],
    difficulty,
    mode: 'race',
    raceSeconds: RACE_SECONDS,
  }
}

/**
 * Ghép câu chính + câu "gặp lại" thành 1 hàng, sao cho mỗi lần gặp lại cách lần trước
 * của cùng từ ÍT NHẤT 3 câu (đủ xa để phải nhớ lại, đủ gần để chưa quên).
 * Cách làm "tham lam": ở mỗi chỗ, câu gặp lại nào đã đủ xa thì xếp trước;
 * không có thì lấy câu chính tiếp theo; hết câu chính thì lấy câu gặp lại đã chờ lâu nhất.
 */
function scheduleWithGaps(base: RoundItem[], repeats: RoundItem[]): RoundItem[] {
  const MIN_GAP = 3
  const result: RoundItem[] = []
  const lastIndex = new Map<string, number>()
  const mainQueue = [...base]
  const waiting = [...repeats]
  const gapOf = (item: RoundItem) => result.length - (lastIndex.get(item.word.id) ?? -100)

  while (mainQueue.length || waiting.length) {
    let next: RoundItem
    const readyIndex = waiting.findIndex((r) => lastIndex.has(r.word.id) && gapOf(r) >= MIN_GAP)
    if (readyIndex >= 0) next = waiting.splice(readyIndex, 1)[0]
    else if (mainQueue.length) next = mainQueue.shift()!
    else {
      // chỉ còn câu gặp lại chưa đủ xa: chọn câu chờ lâu nhất, tránh đứng sát cùng từ
      const previousWordId = result[result.length - 1]?.word.id
      const sorted = [...waiting].sort((a, b) => gapOf(b) - gapOf(a))
      next = sorted.find((r) => r.word.id !== previousWordId) ?? sorted[0]
      waiting.splice(waiting.indexOf(next), 1)
    }
    lastIndex.set(next.word.id, result.length)
    result.push(next)
  }
  return result
}

/** Kho đáp án nhiễu: từ cùng chủ đề + từ bé đã gặp (ưu tiên vừa học) + các từ trong lượt. */
function buildDistractorPool(
  kids: KidsProgress,
  topicId: string,
  sequence: RoundItem[],
  usable: (word: KidsWord | undefined) => word is KidsWord,
): KidsWord[] {
  const pool = new Map<string, KidsWord>()
  const add = (word: KidsWord | undefined) => usable(word) && pool.set(word.id, word)
  findKidsTopic(topicId)?.words.forEach(add)
  sequence.forEach((item) => {
    add(item.word)
    topicOfWord(item.word.id)?.words.forEach(add)
  })
  Object.keys(kids.words).forEach((id) => add(findKidsWord(id)))
  // Kho quá nhỏ (chủ đề ít ảnh) -> bù bằng từ Starters dễ
  for (const word of ALL_KIDS_WORDS) {
    if (pool.size >= 12) break
    if (word.level === 'starters') add(word)
  }
  return [...pool.values()]
}
