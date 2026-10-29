/**
 * game-definition.ts — "THẺ CĂN CƯỚC" CỦA TRÒ BÓNG BAY CHỮ
 * game-registry.ts tự tìm file này -> sảnh tự hiện thẻ trò, /kids/play/balloon-pop tự chạy.
 *
 * needsPicture: false -> bóng mang CHỮ (không cần ảnh) nên dùng được cả 48 từ không có ảnh;
 * từ có ảnh thì ảnh hiện ở thẻ từ sau khi bấm đúng.
 */
import { lazy } from 'react'
import type { KidsGameDefinition } from '../game-registry'

export const gameDefinition: KidsGameDefinition = {
  id: 'balloon-pop',
  art: ['balloon', 'party-popper', 'sparkles'],
  accent: 'var(--skill-speaking)',
  needsPicture: false,
  skill: { vi: 'nghe + đọc nhanh', en: 'listening + quick reading' },
  Component: lazy(() => import('./BalloonPopGame').then((module) => ({ default: module.BalloonPopGame }))),
}
