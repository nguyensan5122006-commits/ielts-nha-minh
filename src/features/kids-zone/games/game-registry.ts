/**
 * game-registry.ts
 * ----------------------------------------------------------------------------
 * DANH SÁCH 8 TRÒ CHƠI + TRÒ NÀO ĐÃ CHƠI ĐƯỢC.
 *
 * Mỗi trò sống trong 1 thư mục games/<id>/ và có 1 file `game-definition.ts`:
 *
 *   export const gameDefinition: KidsGameDefinition = {
 *     id: 'memory-match',
 *     art: ['card-index-dividers', 'cat', 'dog'],   // 3 ảnh 3D cho thẻ trò ở sảnh
 *     accent: 'var(--skill-reading)',
 *     needsPicture: true,
 *     skill: { vi: 'nhận diện chữ', en: 'word recognition' },
 *     Component: lazy(() => import('./MemoryMatchGame').then((m) => ({ default: m.MemoryMatchGame }))),
 *   }
 *
 * File này TỰ TÌM mọi games/<id>/game-definition.ts (import.meta.glob của Vite) —
 * nhóm làm trò mới KHÔNG cần sửa file này, chỉ cần tạo thư mục của mình.
 * Trò chưa có file định nghĩa -> sảnh hiện thẻ "Sắp có" (không bấm vào chơi được).
 * ----------------------------------------------------------------------------
 */
import type { ComponentType, LazyExoticComponent } from 'react'
import type { BilingualText, KidsWord } from '../../../content/content-types'
import { KIDS_GAMES } from '../../../content/kids'
import type { KidsGameId } from '../game-engine/engine-types'
import type { KidsGameProps } from '../game-engine/GameRoundShell'

export interface KidsGameDefinition {
  id: KidsGameId
  /** 3 slug ảnh 3D (public/word-images) xếp chồng làm "bìa" thẻ trò ở sảnh */
  art: [string, string, string]
  /** màu nhấn của thẻ trò (biến CSS) */
  accent: string
  /** trò cần ảnh cho mỗi từ (chọn hình)? -> round-builder chỉ lấy từ có ảnh */
  needsPicture: boolean
  /**
   * (Không bắt buộc) lọc thêm từ hợp với trò, VD Tô màu chỉ lấy đồ vật tô được + từ chỉ màu.
   * Chủ đề không còn từ nào qua bộ lọc -> round-builder tự đổi sang chủ đề khác.
   */
  wordFilter?: (word: KidsWord) => boolean
  /** kỹ năng luyện, VD "nghe hiểu từ" */
  skill: BilingualText
  /** Component trò chơi — nên dùng lazy() để sảnh tải nhanh */
  Component: LazyExoticComponent<ComponentType<KidsGameProps>> | ComponentType<KidsGameProps>
}

/** Bìa tạm cho trò chưa làm (sảnh vẫn hiện đủ 8 trò, ghi "Sắp có"). */
const PLACEHOLDER_ART: Record<KidsGameId, [string, string, string]> = {
  'listen-tap': ['headphone', 'cat', 'dog'],
  'memory-match': ['card-index-dividers', 'joker', 'flower-playing-cards'],
  'spell-it': ['input-latin-lowercase', 'memo', 'pencil'],
  'balloon-pop': ['balloon', 'balloon', 'sparkles'],
  'sentence-builder': ['puzzle-piece', 'open-book', 'speech-balloon'],
  'colour-command': ['artist-palette', 'crayon', 'paintbrush'],
  'speak-unlock': ['microphone', 'old-key', 'locked'],
  'patrol-adventure': ['world-map', 'police-car', 'compass'],
}

// Vite gom mọi file định nghĩa lúc build (eager = nạp ngay; Component bên trong vẫn lazy)
const definitionModules = import.meta.glob<{ gameDefinition: KidsGameDefinition }>('./*/game-definition.ts', { eager: true })

const READY: Partial<Record<KidsGameId, KidsGameDefinition>> = Object.fromEntries(
  Object.values(definitionModules).map((module) => [module.gameDefinition.id, module.gameDefinition]),
)

export interface KidsGameCard {
  id: KidsGameId
  title: BilingualText
  art: [string, string, string]
  accent: string
  ready: boolean
  definition: KidsGameDefinition | undefined
}

/** Đủ 8 trò theo thứ tự trong nội dung, đánh dấu trò nào đã chơi được. */
export const KIDS_GAME_CARDS: KidsGameCard[] = KIDS_GAMES.map((game) => {
  const definition = READY[game.id]
  return {
    id: game.id,
    title: game.title,
    art: definition?.art ?? PLACEHOLDER_ART[game.id],
    accent: definition?.accent ?? 'var(--c-navy)',
    ready: !!definition,
    definition,
  }
})

export const findGameDefinition = (id: string | undefined) => (id ? READY[id as KidsGameId] : undefined)

export const READY_GAME_IDS = KIDS_GAME_CARDS.filter((card) => card.ready).map((card) => card.id)
