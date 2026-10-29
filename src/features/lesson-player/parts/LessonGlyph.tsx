/**
 * LessonGlyph.tsx — VÀI ICON RIÊNG CỦA TRÌNH HỌC (bộ Icon chung chưa có)
 * ----------------------------------------------------------------------------
 *   <LessonGlyph name="mic" />   mic · mic-off · ear · replay · robot · lightbulb · target · timer
 * Vẽ cùng phong cách với src/design-system/components/Icon.tsx: khung 24×24,
 * nét 2px bo tròn, màu theo currentColor. (Đã ghi đề nghị thêm vào bộ Icon chung
 * trong docs/redesign-v3/REQUESTS.md — khi có thì đổi sang Icon.)
 * ----------------------------------------------------------------------------
 */
import type { ReactNode } from 'react'

const GLYPHS = {
  mic: (
    <>
      <rect x="8.5" y="3" width="7" height="12" rx="3.5" />
      <path d="M5 11.5a7 7 0 0 0 14 0" />
      <path d="M12 18.5V21M9 21h6" />
    </>
  ),
  'mic-off': (
    <>
      <path d="M15.5 10.5V6.5a3.5 3.5 0 0 0-6.6-1.6" />
      <path d="M8.5 9v2.5a3.5 3.5 0 0 0 5.6 2.8" />
      <path d="M5 11.5a7 7 0 0 0 11.3 5.5M19 11.5c0 .9-.2 1.8-.5 2.6" />
      <path d="M12 18.5V21M9 21h6M3.5 3.5l17 17" />
    </>
  ),
  ear: (
    <>
      <path d="M7 9.5a5 5 0 0 1 10 0c0 3-2.5 3.8-3.2 5.6-.6 1.6-.9 4.4-3.6 4.4A2.7 2.7 0 0 1 7.5 17" />
      <path d="M10 10a2 2 0 0 1 4 0c0 1.2-1 1.6-1.5 2.3" />
    </>
  ),
  replay: (
    <>
      <path d="M4 12a8 8 0 1 0 2.4-5.7" />
      <path d="M4 4.5V9h4.5" />
    </>
  ),
  robot: (
    <>
      <rect x="4.5" y="8" width="15" height="11" rx="4" />
      <path d="M12 8V4.5M9.5 4.5h5" />
      <circle cx="9.3" cy="13.2" r="1.2" fill="currentColor" stroke="none" />
      <circle cx="14.7" cy="13.2" r="1.2" fill="currentColor" stroke="none" />
      <path d="M2.5 12.5v3M21.5 12.5v3" />
    </>
  ),
  lightbulb: (
    <>
      <path d="M9 17.5h6M10 21h4" />
      <path d="M12 3a6 6 0 0 0-3.6 10.8c.6.5 1 1.2 1 2V17h5.2v-1.2c0-.8.4-1.5 1-2A6 6 0 0 0 12 3z" />
    </>
  ),
  target: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <circle cx="12" cy="12" r="4.5" />
      <circle cx="12" cy="12" r="1" fill="currentColor" stroke="none" />
    </>
  ),
  timer: (
    <>
      <circle cx="12" cy="13.5" r="7.5" />
      <path d="M12 9.5v4l2.5 1.5M9.5 3h5" />
    </>
  ),
} satisfies Record<string, ReactNode>

export type LessonGlyphName = keyof typeof GLYPHS

export function LessonGlyph({ name, size = 20, strokeWidth = 2, className }: { name: LessonGlyphName; size?: number; strokeWidth?: number; className?: string }) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      focusable="false"
      style={{ flex: 'none' }}
    >
      {GLYPHS[name]}
    </svg>
  )
}
