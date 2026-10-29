/**
 * Icon.tsx — BỘ BIỂU TƯỢNG NÉT TRÒN (SVG tự vẽ, không cần thư viện)
 * ----------------------------------------------------------------------------
 * Tất cả vẽ trên khung 24×24, nét 2px bo tròn đầu -> hợp phong cách "vinyl" mềm.
 * Màu lấy theo màu chữ hiện tại (currentColor), nên đổi màu bằng CSS `color`.
 *
 *   <Icon name="learn" />                      // trang trí (trình đọc màn hình bỏ qua)
 *   <Icon name="volume" label="Bật âm thanh" /> // có nghĩa -> đọc được nhãn
 *
 * Thêm icon mới: thêm 1 mục vào ICON_PATHS (chuỗi path SVG hoặc JSX).
 * ----------------------------------------------------------------------------
 */
import type { ReactNode } from 'react'

const ICON_PATHS = {
  // --- điều hướng ---
  learn: (
    <>
      <path d="M9 4.5 3.5 6.5v13l5.5-2 6 2 5.5-2v-13l-5.5 2-6-2z" />
      <path d="M9 4.5v13M15 6.5v13" />
    </>
  ),
  review: (
    <>
      <path d="M3.5 12a8.5 8.5 0 1 0 2.6-6.1" />
      <path d="M3.5 4.5V9H8" />
      <path d="M12 8v4.2l2.8 1.8" />
    </>
  ),
  exam: (
    <>
      <rect x="5" y="4.5" width="14" height="16.5" rx="3" />
      <path d="M9 3h6v3H9z" />
      <path d="m9 13.2 2.2 2.2L15.5 11" />
    </>
  ),
  play: (
    <>
      <path d="M7.5 8.5h9a4.5 4.5 0 0 1 4.4 5.4l-.3 1.4a2.7 2.7 0 0 1-4.8 1L14.5 14h-5l-1.3 2.3a2.7 2.7 0 0 1-4.8-1l-.3-1.4a4.5 4.5 0 0 1 4.4-5.4z" />
      <path d="M8.5 10.5v3M7 12h3" />
      <circle cx="15.5" cy="11.4" r=".6" fill="currentColor" />
      <circle cx="17.2" cy="13" r=".6" fill="currentColor" />
    </>
  ),
  chat: <path d="M20.5 11.5a8.3 8.3 0 0 1-12 7.4L4 20l1.3-4A8.3 8.3 0 1 1 20.5 11.5z" />,
  profile: (
    <>
      <circle cx="12" cy="8.2" r="4" />
      <path d="M4.5 20.5c1.4-3.5 4.3-5.4 7.5-5.4s6.1 1.9 7.5 5.4" />
    </>
  ),
  kids: (
    <>
      <path d="M12 3a6 6 0 0 1 6 6c0 3.9-3.1 7-6 7s-6-3.1-6-7a6 6 0 0 1 6-6z" />
      <path d="m11 16 1 1.6 1-1.6" />
      <path d="M12 17.6c0 1.8-1.6 2-1.6 3.6" />
      <path d="M9.3 7.6a3 3 0 0 1 2-2" />
    </>
  ),
  // --- công tắc ---
  sun: (
    <>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2.5v2M12 19.5v2M2.5 12h2M19.5 12h2M5.3 5.3l1.4 1.4M17.3 17.3l1.4 1.4M5.3 18.7l1.4-1.4M17.3 6.7l1.4-1.4" />
    </>
  ),
  moon: <path d="M20 14.5A8.2 8.2 0 0 1 9.5 4a8.2 8.2 0 1 0 10.5 10.5z" />,
  system: (
    <>
      <rect x="3" y="4.5" width="18" height="12" rx="2.5" />
      <path d="M8.5 20h7M12 16.5V20" />
    </>
  ),
  volume: (
    <>
      <path d="M4 9.5h3.5L12 5.8v12.4l-4.5-3.7H4z" />
      <path d="M15.5 9.2a4 4 0 0 1 0 5.6M18 6.6a7.6 7.6 0 0 1 0 10.8" />
    </>
  ),
  'volume-off': (
    <>
      <path d="M4 9.5h3.5L12 5.8v12.4l-4.5-3.7H4z" />
      <path d="m16 9.5 5 5M21 9.5l-5 5" />
    </>
  ),
  globe: (
    <>
      <circle cx="12" cy="12" r="8.8" />
      <path d="M3.5 12h17M12 3.2c2.3 2.4 3.4 5.4 3.4 8.8s-1.1 6.4-3.4 8.8c-2.3-2.4-3.4-5.4-3.4-8.8s1.1-6.4 3.4-8.8z" />
    </>
  ),
  // --- hành động ---
  close: <path d="M6.5 6.5l11 11M17.5 6.5l-11 11" />,
  check: <path d="m5 12.5 4.5 4.5L19 7.5" />,
  exit: (
    <>
      <path d="M14 4h3.5A2.5 2.5 0 0 1 20 6.5v11a2.5 2.5 0 0 1-2.5 2.5H14" />
      <path d="m10 8-4 4 4 4M6 12h9.5" />
    </>
  ),
  'arrow-right': <path d="M5 12h13.5M13 6.5l5.5 5.5-5.5 5.5" />,
  retry: (
    <>
      <path d="M4.5 12a7.5 7.5 0 1 0 2.3-5.4" />
      <path d="M4.5 4.5v4.2h4.2" />
    </>
  ),
  'chevron-down': <path d="m6 9.5 6 6 6-6" />,
  'chevron-right': <path d="m9.5 6 6 6-6 6" />,
  flag: (
    <>
      <path d="M5.5 21V4" />
      <path d="M5.5 4.5h11.5l-2.4 4.2 2.4 4.3H5.5" />
    </>
  ),
  'play-fill': <path d="M8 5.5v13l10.5-6.5z" fill="currentColor" stroke="none" />,
  pause: (
    <>
      <rect x="6.5" y="5.5" width="3.8" height="13" rx="1.4" fill="currentColor" stroke="none" />
      <rect x="13.7" y="5.5" width="3.8" height="13" rx="1.4" fill="currentColor" stroke="none" />
    </>
  ),
  turtle: (
    <>
      <path d="M3.5 15.5a8 6.5 0 0 1 16 0z" />
      <path d="M19.5 15.5c1.6 0 2.6-.8 2.6-2s-1-2-2.2-2" />
      <path d="M7 15.5v2.6M16 15.5v2.6M8 15.5l1.6-4.4h4.8l1.6 4.4" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12.5" r="8.5" />
      <path d="M12 8v4.5l3 2M9.5 2.5h5" />
    </>
  ),
  eye: (
    <>
      <path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12z" />
      <circle cx="12" cy="12" r="3" />
    </>
  ),
  'eye-off': (
    <>
      <path d="M10 5.7c.6-.1 1.3-.2 2-.2 6 0 9.5 6.5 9.5 6.5a17 17 0 0 1-2.6 3.5M6.6 6.6C4 8.3 2.5 12 2.5 12S6 18.5 12 18.5c1.8 0 3.4-.6 4.7-1.4" />
      <path d="M3.5 3.5l17 17M9.9 9.9a3 3 0 0 0 4.2 4.2" />
    </>
  ),
  sparkle: <path d="M12 3.5l1.9 5.6 5.6 1.9-5.6 1.9-1.9 5.6-1.9-5.6-5.6-1.9 5.6-1.9z" />,
  hint: (
    <>
      <path d="M9.2 17.5h5.6M10.2 21h3.6" />
      <path d="M12 3a6 6 0 0 0-3.6 10.8c.7.6 1 1.3 1 2.2h5.2c0-.9.3-1.6 1-2.2A6 6 0 0 0 12 3z" />
    </>
  ),
  star: <path d="m12 3.2 2.6 5.5 6 .8-4.4 4.2 1.1 6-5.3-2.9-5.3 2.9 1.1-6L3.4 9.5l6-.8z" fill="currentColor" stroke="none" />,
  'star-outline': <path d="m12 3.2 2.6 5.5 6 .8-4.4 4.2 1.1 6-5.3-2.9-5.3 2.9 1.1-6L3.4 9.5l6-.8z" />,
  lock: (
    <>
      <rect x="5" y="10.5" width="14" height="10" rx="3" />
      <path d="M8.5 10.5V8a3.5 3.5 0 0 1 7 0v2.5" />
    </>
  ),
  plus: <path d="M12 5v14M5 12h14" />,
  menu: <path d="M4.5 7h15M4.5 12h15M4.5 17h15" />,
  settings: (
    <>
      <circle cx="12" cy="12" r="3" />
      <path d="M12 2.8v2.4M12 18.8v2.4M2.8 12h2.4M18.8 12h2.4M5.5 5.5l1.7 1.7M16.8 16.8l1.7 1.7M5.5 18.5l1.7-1.7M16.8 7.2l1.7-1.7" />
    </>
  ),
} satisfies Record<string, ReactNode>

export type IconName = keyof typeof ICON_PATHS

export interface IconProps {
  /** tên icon trong bộ (xem ICON_PATHS) */
  name: IconName
  /** cỡ px (rộng = cao). Mặc định 20 */
  size?: number
  /** nhãn cho trình đọc màn hình. Bỏ trống = icon chỉ để trang trí */
  label?: string
  /** độ dày nét, mặc định 2 */
  strokeWidth?: number
  className?: string
}

export function Icon({ name, size = 20, label, strokeWidth = 2, className }: IconProps) {
  return (
    <svg
      className={className ? `ds-icon ${className}` : 'ds-icon'}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      role={label ? 'img' : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      focusable="false"
      style={{ flex: 'none' }}
    >
      {ICON_PATHS[name]}
    </svg>
  )
}
