/**
 * game-definition.ts — "THẺ CĂN CƯỚC" CỦA TRÒ NGHE VÀ CHẠM
 * game-registry.ts tự tìm file này (mỗi trò 1 file cùng tên trong thư mục của trò).
 */
import { lazy } from 'react'
import type { KidsGameDefinition } from '../game-registry'

export const gameDefinition: KidsGameDefinition = {
  id: 'listen-tap',
  art: ['headphone', 'cat', 'red-apple'],
  accent: 'var(--skill-listening)',
  needsPicture: true,
  skill: { vi: 'nghe hiểu từ', en: 'listening for words' },
  Component: lazy(() => import('./ListenTapGame').then((module) => ({ default: module.ListenTapGame }))),
}
