/**
 * game-definition.ts — "THẺ CĂN CƯỚC" CỦA TRÒ GHÉP CÂU
 * game-registry.ts tự tìm file này -> sảnh tự hiện thẻ trò, /kids/play/sentence-builder tự chạy.
 *
 * needsPicture: false -> dùng được cả 48 từ không có ảnh (khi đó tranh = ảnh đại diện chủ đề).
 */
import { lazy } from 'react'
import type { KidsGameDefinition } from '../game-registry'

export const gameDefinition: KidsGameDefinition = {
  id: 'sentence-builder',
  art: ['puzzle-piece', 'open-book', 'speech-balloon'],
  accent: 'var(--skill-reading)',
  needsPicture: false,
  skill: { vi: 'ngữ pháp câu', en: 'sentence building' },
  Component: lazy(() => import('./SentenceBuilderGame').then((module) => ({ default: module.SentenceBuilderGame }))),
}
