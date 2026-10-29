/**
 * design-system/index.ts — "CỬA CHÍNH" CỦA HỆ THIẾT KẾ
 * ----------------------------------------------------------------------------
 * Các nhóm làm tính năng chỉ cần import từ đây:
 *   import { Button, Card, Mascot, ProgressBar, playSound } from '../design-system'
 *
 * CSS chung (biến màu, font, chuyển động) đã được nạp sẵn qua
 * src/styles/global.css -> @import '../design-system/index.css'.
 * CSS của từng component tự nạp khi component được import.
 * Hướng dẫn dùng từng component: docs/redesign-v3/05-COMPONENTS.md · xem trực tiếp: /design
 * ----------------------------------------------------------------------------
 */

// --- nền tảng ---
export { ThemeProvider, useTheme, setThemePreference, type ThemePreference, type ResolvedTheme } from './theme'
export { playSound, useSoundSettings, setSoundMuted, isSoundMuted, setSoundVolume, SOUND_NAMES, type SoundName } from './sound-kit'
export { MASCOT_NAME, fillMascotName } from './mascot-name'
export { useDsText, DS_TEXT, type DsTextKey } from './design-system-text'
export { useReducedMotion, prefersReducedMotion } from './use-reduced-motion'
export { useImageFallback } from './use-image-fallback'

// --- component ---
export { Icon, type IconName } from './components/Icon'
export { Button, buttonClassName, type ButtonProps, type ButtonVariant, type ButtonSize } from './components/Button'
export { IconButton } from './components/IconButton'
export { Card, CardHeader } from './components/Card'
export { Chip } from './components/Chip'
export { Badge, type BadgeTone } from './components/Badge'
export { ProgressBar } from './components/ProgressBar'
export { ProgressRing } from './components/ProgressRing'
export { StreakFlame } from './components/StreakFlame'
export { XpCounter } from './components/XpCounter'
export { Mascot, MASCOT_POSES, type MascotPose, type MascotPlacement } from './components/Mascot'
export { MascotModel } from './components/MascotModel'
export { SkillIcon } from './components/SkillIcon'
export { WordImage } from './components/WordImage'
export { LevelBadge } from './components/LevelBadge'
export { AudioButton } from './components/AudioButton'
export { Kbd } from './components/Kbd'
export { Modal } from './components/Modal'
export { Sheet, type SheetTone } from './components/Sheet'
export { Tabs, type TabItem } from './components/Tabs'
export { SegmentedControl, type SegmentOption } from './components/SegmentedControl'
export { Tooltip } from './components/Tooltip'
export { ToastProvider, useToast, type ToastOptions } from './components/Toast'
export { EmptyState } from './components/EmptyState'
export { Skeleton } from './components/Skeleton'
export { Confetti, fireConfetti } from './components/Confetti'
export { Avatar } from './components/Avatar'
export { LanguageToggle } from './components/LanguageToggle'
export { ThemeToggle } from './components/ThemeToggle'
export { SoundToggle } from './components/SoundToggle'
export { Stepper } from './components/Stepper'
export { Timer, useCountdown, formatClock } from './components/Timer'
