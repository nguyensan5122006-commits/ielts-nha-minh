/**
 * game-definition.ts — "THẺ CĂN CƯỚC" CỦA TRÒ NGHE LỆNH TÔ MÀU
 * game-registry.ts tự tìm file này (mỗi trò 1 file cùng tên trong thư mục của trò).
 * needsPicture = true: đồ vật trong tranh là ảnh 3D của từ -> chỉ lấy từ có ảnh.
 */
import { lazy } from 'react'
import type { KidsGameDefinition } from '../game-registry'

export const gameDefinition: KidsGameDefinition = {
  id: 'colour-command',
  art: ['artist-palette', 'paintbrush', 'crayon'],
  accent: 'var(--skill-writing)',
  needsPicture: true,
  // Chỉ lấy đồ vật tô màu được (nhãn 'colorable') và từ chỉ màu (nhãn 'color') — bỏ "gia đình", "hành động"
  wordFilter: (word) => !!word.tags?.some((tag) => tag === 'colorable' || tag === 'color'),
  skill: { vi: 'nghe lệnh, màu, giới từ', en: 'instructions, colours, prepositions' },
  Component: lazy(() => import('./ColourCommandGame').then((module) => ({ default: module.ColourCommandGame }))),
}
