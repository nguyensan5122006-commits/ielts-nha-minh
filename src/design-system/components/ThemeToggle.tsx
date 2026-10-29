/**
 * ThemeToggle.tsx — CÔNG TẮC SÁNG / TỐI / THEO MÁY
 * ----------------------------------------------------------------------------
 *   <ThemeToggle />                    // 3 ô: ☀ sáng · ☾ tối · 🖥 theo máy
 *   <ThemeToggle variant="compact" />  // 1 nút tròn, bấm xoay vòng theo máy → sáng → tối
 * Lưu lựa chọn và đặt <html data-theme> qua src/design-system/theme.ts.
 * ----------------------------------------------------------------------------
 */
import { useDsText } from '../design-system-text'
import { useTheme, type ThemePreference } from '../theme'
import { Icon } from './Icon'
import { SegmentedControl } from './SegmentedControl'
import './Toggles.css'

export interface ThemeToggleProps {
  variant?: 'segmented' | 'compact'
  className?: string
}

const CYCLE: ThemePreference[] = ['system', 'light', 'dark']

export function ThemeToggle({ variant = 'segmented', className }: ThemeToggleProps) {
  const { preference, resolvedTheme, setPreference } = useTheme()
  const dsText = useDsText()
  const names: Record<ThemePreference, string> = { system: dsText('themeSystem'), light: dsText('themeLight'), dark: dsText('themeDark') }

  if (variant === 'compact') {
    const next = CYCLE[(CYCLE.indexOf(preference) + 1) % CYCLE.length]
    return (
      <button
        type="button"
        className={['ds-toggle-compact', className].filter(Boolean).join(' ')}
        onClick={() => setPreference(next)}
        aria-label={`${dsText('theme')}: ${names[preference]}`}
        title={`${dsText('theme')}: ${names[preference]}`}
      >
        <Icon name={preference === 'system' ? 'system' : resolvedTheme === 'dark' ? 'moon' : 'sun'} size={18} />
      </button>
    )
  }
  return (
    <SegmentedControl<ThemePreference>
      className={className}
      size="sm"
      label={dsText('theme')}
      value={preference}
      onChange={setPreference}
      options={[
        { value: 'light', label: <Icon name="sun" size={16} />, ariaLabel: names.light },
        { value: 'dark', label: <Icon name="moon" size={16} />, ariaLabel: names.dark },
        { value: 'system', label: <Icon name="system" size={16} />, ariaLabel: names.system },
      ]}
    />
  )
}
