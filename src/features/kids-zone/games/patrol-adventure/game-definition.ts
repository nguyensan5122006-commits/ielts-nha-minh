/**
 * game-definition.ts — "THẺ CĂN CƯỚC" CỦA TRÒ PHIÊU LƯU CÙNG KI
 * game-registry.ts tự tìm file này. Đặc tả 07 gọi trò này là `patrol-story`; nội dung + động cơ dùng `patrol-adventure`.
 * Trò này tự xếp lượt theo CHƯƠNG truyện (story-plan.ts) — needsPicture chỉ ảnh hưởng lượt "theo từ"
 * mà vỏ chung tự tạo (trò không dùng lượt đó, xem PatrolAdventureGame.tsx).
 */
import { lazy } from 'react'
import type { KidsGameDefinition } from '../game-registry'

export const gameDefinition: KidsGameDefinition = {
  id: 'patrol-adventure',
  art: ['world-map', 'police-car', 'compass'],
  accent: 'var(--skill-reading)',
  needsPicture: true,
  skill: { vi: 'đọc hiểu, nghe truyện', en: 'story reading & listening' },
  Component: lazy(() => import('./PatrolAdventureGame').then((module) => ({ default: module.PatrolAdventureGame }))),
}
