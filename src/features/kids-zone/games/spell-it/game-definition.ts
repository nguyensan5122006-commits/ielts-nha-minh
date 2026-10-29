/**
 * game-definition.ts — "THẺ CĂN CƯỚC" CỦA TRÒ XẾP CHỮ THÀNH TỪ
 * game-registry.ts tự tìm file này -> sảnh tự hiện thẻ trò, /kids/play/spell-it tự chạy.
 *
 * needsPicture: false -> dùng được cả 48 từ không có ảnh (trò hiện nghĩa tiếng Việt thay ảnh).
 */
import { lazy } from 'react'
import type { KidsGameDefinition } from '../game-registry'

export const gameDefinition: KidsGameDefinition = {
  id: 'spell-it',
  art: ['input-latin-lowercase', 'memo', 'pencil'],
  accent: 'var(--skill-writing)',
  needsPicture: false,
  skill: { vi: 'chính tả', en: 'spelling' },
  Component: lazy(() => import('./SpellItGame').then((module) => ({ default: module.SpellItGame }))),
}
