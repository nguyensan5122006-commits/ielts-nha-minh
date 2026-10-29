/**
 * game-definition.ts — "THẺ CĂN CƯỚC" CỦA TRÒ LẬT THẺ GHÉP CẶP
 * game-registry.ts tự tìm file này -> sảnh tự hiện thẻ trò, /kids/play/memory-match tự chạy.
 *
 * needsPicture: true -> mức 1–2 ghép ẢNH ↔ CHỮ nên mỗi từ phải có ảnh.
 */
import { lazy } from 'react'
import type { KidsGameDefinition } from '../game-registry'

export const gameDefinition: KidsGameDefinition = {
  id: 'memory-match',
  art: ['flower-playing-cards', 'joker', 'card-index-dividers'],
  accent: 'var(--skill-reading)',
  needsPicture: true,
  skill: { vi: 'nhận diện chữ', en: 'word recognition' },
  Component: lazy(() => import('./MemoryMatchGame').then((module) => ({ default: module.MemoryMatchGame }))),
}
