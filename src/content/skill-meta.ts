/**
 * skill-meta.ts — THÔNG TIN HIỂN THỊ CỦA 5 KỸ NĂNG (thứ tự, icon, màu)
 * Dùng chung cho mọi trang khi cần vẽ nhãn / màu theo kỹ năng.
 * (Trước đây nằm trong learning-progress/unlock-rules.ts — file đó đã bỏ ở v3.)
 */
import type { SkillName } from './content-types'

/** Thứ tự kỹ năng trên giao diện. */
export const SKILL_ORDER: SkillName[] = ['vocabulary', 'listening', 'reading', 'speaking', 'writing']

/** Màu đại diện cho từng kỹ năng (khớp biến CSS --skill-...). */
export const SKILL_COLORS: Record<SkillName, string> = {
  vocabulary: 'var(--skill-vocabulary)',
  listening: 'var(--skill-listening)',
  reading: 'var(--skill-reading)',
  speaking: 'var(--skill-speaking)',
  writing: 'var(--skill-writing)',
}

/** Emoji tạm cho từng kỹ năng (ảnh 3D thật: public/art/skills/<skill>-256.webp). */
export const SKILL_ICONS: Record<SkillName, string> = {
  vocabulary: '📚',
  listening: '🎧',
  reading: '📖',
  speaking: '🗣️',
  writing: '✍️',
}
