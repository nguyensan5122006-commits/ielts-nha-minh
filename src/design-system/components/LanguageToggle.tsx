/**
 * LanguageToggle.tsx — CÔNG TẮC NGÔN NGỮ VI / EN
 * ----------------------------------------------------------------------------
 *   <LanguageToggle />                    // 2 ô "VI | EN" có viên trượt
 *   <LanguageToggle variant="compact" />  // 1 nút tròn nhỏ "VI", bấm để đổi
 * Dùng LanguageProvider có sẵn (src/translations/language-context.tsx).
 * Chỉ đổi chữ HƯỚNG DẪN/giao diện; nội dung học luôn là tiếng Anh.
 * ----------------------------------------------------------------------------
 */
import { useLanguage, type Language } from '../../translations/language-context'
import { useDsText } from '../design-system-text'
import { SegmentedControl } from './SegmentedControl'
import './Toggles.css'

export interface LanguageToggleProps {
  variant?: 'segmented' | 'compact'
  className?: string
}

export function LanguageToggle({ variant = 'segmented', className }: LanguageToggleProps) {
  const { language, toggleLanguage } = useLanguage()
  const dsText = useDsText()

  if (variant === 'compact') {
    return (
      <button
        type="button"
        className={['ds-toggle-compact', 'ds-toggle-compact--text', className].filter(Boolean).join(' ')}
        onClick={toggleLanguage}
        aria-label={`${dsText('language')}: ${language === 'vi' ? 'Tiếng Việt' : 'English'}`}
        title="Tiếng Việt / English"
      >
        {language === 'vi' ? 'VI' : 'EN'}
      </button>
    )
  }
  return (
    <SegmentedControl<Language>
      className={className}
      size="sm"
      label={dsText('language')}
      value={language}
      onChange={(next) => next !== language && toggleLanguage()}
      options={[
        { value: 'vi', label: 'VI', ariaLabel: 'Tiếng Việt' },
        { value: 'en', label: 'EN', ariaLabel: 'English' },
      ]}
    />
  )
}
