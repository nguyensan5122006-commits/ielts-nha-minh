/**
 * story-plan.ts — BIẾN 1 CHƯƠNG TRUYỆN THÀNH 1 "LƯỢT CHƠI" CỦA ĐỘNG CƠ
 * ----------------------------------------------------------------------------
 * Động cơ chung (round-builder) xếp lượt theo TỪ (8–12 từ đến hạn / từ mới). Trò truyện lại đi theo
 * CHƯƠNG: 5 cảnh cố định, mỗi cảnh 1 câu hỏi. Nên trò này tự xếp lượt (buildStoryPlan) rồi vẫn dùng
 * đúng "trọng tài" chung useRoundSession(plan) -> Leitner, sao, khen, kỷ lục, sticker y như mọi trò.
 *
 *   1 cảnh = 1 câu (RoundItem) · từ của câu = question.wordId (từ trong ngân hàng từ)
 *   kind:  từ đó ĐẾN HẠN ÔN hôm nay -> 'review' (trả lời đúng/sai ĐỔI hộp Leitner — ôn trong ngữ cảnh truyện)
 *          còn lại                  -> 'practice' (không đổi hộp — truyện là đọc hiểu, không phải nơi dạy từ mới)
 *   Không có thẻ giới thiệu từ mới giữa truyện (luật 27: không chèn gì vào giữa các cảnh).
 *   Cảnh phải xem đáp án sẽ quay lại cuối chương thành câu "Nhớ lại" (useRoundSession tự lo).
 *
 * TIẾN ĐỘ TRUYỆN: kho tiến độ có sẵn `kids.storyChapter` = số chương đã xong (đi theo thứ tự).
 *   Chương k mở khi đã xong chương k-1; chương đã xong chơi lại được.
 * ----------------------------------------------------------------------------
 */
import type { KidsStoryChapter, KidsWord } from '../../../../content/content-types'
import { KIDS_STORIES } from '../../../../content/kids'
import type { DifficultySettings, RoundItem, RoundPlan } from '../../game-engine/engine-types'
import { findKidsWord, topicOfWord } from '../../kids-data/kids-word-bank'
import type { KidsProgress } from '../../../../learning-progress/progress-types'

export type StoryScene = KidsStoryChapter['scenes'][number]

/** Huy hiệu của từng chương (ảnh 3D trong public/word-images). */
export const CHAPTER_BADGE_ART: Record<string, string> = {
  'kids-story-01-lost-kitten': 'cat-face',
  'kids-story-02-lost-backpack': 'backpack',
  'kids-story-03-rainy-day': 'umbrella-with-rain-drops',
  'kids-story-04-sports-day': 'trophy',
  'kids-story-05-picnic': 'basket',
  'kids-story-06-birthday-surprise': 'birthday-cake',
}

export const chapterNumber = (chapter: KidsStoryChapter) => KIDS_STORIES.indexOf(chapter) + 1
export const findChapter = (chapterId: string) => KIDS_STORIES.find((chapter) => chapter.id === chapterId)

/** Chương nên chơi tiếp: chương đầu tiên chưa xong (xong hết -> chương 1, chơi lại từ đầu). */
export function nextChapter(chaptersDone: number): KidsStoryChapter {
  return chaptersDone < KIDS_STORIES.length ? KIDS_STORIES[Math.max(0, chaptersDone)] : KIDS_STORIES[0]
}

/** Chương này đã mở chưa (xong chương trước) */
export const isChapterOpen = (chapter: KidsStoryChapter, chaptersDone: number) => chapterNumber(chapter) <= chaptersDone + 1

/** Khoá của câu = "<id chương>#<số cảnh>" (câu quay lại cuối chương có thêm đuôi "-again"). */
export function sceneIndexOfItem(item: RoundItem): number {
  return Number.parseInt(item.key.split('#')[1] ?? '0', 10) || 0
}

/** Từ của 1 cảnh. Cảnh không gắn từ -> "từ tạm" (luyện thêm, không bao giờ vào hộp Leitner). */
function wordOfScene(chapter: KidsStoryChapter, scene: StoryScene, index: number): KidsWord {
  const linked = scene.question.wordId ? findKidsWord(scene.question.wordId) : undefined
  if (linked) return linked
  return {
    id: `story:${chapter.id}:${index}`,
    word: scene.question.options[scene.question.correctIndex],
    meaningVi: '',
    level: 'starters',
    image: scene.image,
  }
}

export function buildStoryPlan(chapter: KidsStoryChapter, kids: KidsProgress, today: string, difficulty: DifficultySettings): RoundPlan {
  const items: RoundItem[] = chapter.scenes.map((scene, index) => {
    const word = wordOfScene(chapter, scene, index)
    const state = kids.words[word.id]
    const due = !!state && state.box < 5 && state.due <= today
    return { key: `${chapter.id}#${index}`, word, kind: due ? 'review' : 'practice', showIntro: false }
  })
  const firstWord = items[0]?.word
  return {
    gameId: 'patrol-adventure',
    topicId: (firstWord && topicOfWord(firstWord.id)?.id) || 'story',
    items,
    distractorPool: [],
    newWordIds: [],
    difficulty,
    mode: 'calm',
  }
}
