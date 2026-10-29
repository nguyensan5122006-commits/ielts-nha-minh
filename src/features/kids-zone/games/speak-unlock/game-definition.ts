/**
 * game-definition.ts — "THẺ CĂN CƯỚC" CỦA TRÒ NÓI ĐỂ MỞ KHOÁ
 * game-registry.ts tự tìm file này. Đặc tả 07 gọi trò này là `say-it`; nội dung + động cơ dùng id `speak-unlock`.
 * needsPicture = true: bé nhìn ảnh (và chữ) để biết phải nói từ nào — ở độ khó 3 chữ bị ẩn, chỉ còn ảnh.
 */
import { lazy } from 'react'
import type { KidsGameDefinition } from '../game-registry'

export const gameDefinition: KidsGameDefinition = {
  id: 'speak-unlock',
  art: ['microphone', 'old-key', 'locked'],
  accent: 'var(--skill-speaking)',
  needsPicture: true,
  skill: { vi: 'phát âm', en: 'pronunciation' },
  Component: lazy(() => import('./SpeakUnlockGame').then((module) => ({ default: module.SpeakUnlockGame }))),
}
