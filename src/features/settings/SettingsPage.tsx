/**
 * SettingsPage.tsx — TRANG /settings "CÀI ĐẶT"
 * ----------------------------------------------------------------------------
 * 4 nhóm, mỗi thay đổi lưu ngay (không có nút "Lưu"):
 *   1. Hiển thị & âm thanh : ngôn ngữ VI/EN · giao diện sáng/tối/theo máy · hiệu ứng âm thanh
 *   2. Mục tiêu & giờ học  : mục tiêu phút/ngày · hẹn "Sau khi … lúc …" (chỉ nhắc trong web)
 *   3. Cách học            : lộ trình General/IELTS · 2 hay 4 nút khi ôn thẻ · giọng đọc Anh-Anh/Anh-Mỹ
 *   4. Tài khoản           : tên, nhóm tuổi (chỉ xem), đăng xuất
 * Nơi lưu:
 *   - ngôn ngữ  -> LanguageProvider (localStorage)
 *   - giao diện -> design-system/theme.ts (localStorage) + progress.profile.theme (đồng bộ máy khác)
 *   - âm thanh  -> design-system/sound-kit.ts (localStorage)
 *   - còn lại   -> progress.profile qua useProgress().setProfile / setTrack (tự lưu lên máy chủ)
 * ----------------------------------------------------------------------------
 */
import { useEffect, useId, useState, type ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Icon, playSound, SegmentedControl, useSoundSettings, useTheme, type ThemePreference } from '../../design-system'
import { srsButtonModeFor } from '../../learning-progress/fsrs-scheduler'
import { useProgress } from '../../learning-progress/progress-store'
import type { StudyProfile } from '../../learning-progress/progress-types'
import { playAudioLine } from '../../services/text-to-speech'
import { useAuth } from '../../services/auth-context'
import { useLanguage } from '../../translations/language-context'
import { SETTINGS_TEXT, useSettingsText, type SettingsTextKey } from './settings-text'
import './SettingsPage.css'

const GOAL_OPTIONS = [5, 10, 15, 20, 30] as const
const CUE_KEYS: SettingsTextKey[] = ['cueDinner', 'cueWork', 'cueSchool', 'cueBreakfast', 'cueBed']

/* ----------------------------------------------------------------------------
 * Khối giao diện nhỏ dùng trong trang
 * -------------------------------------------------------------------------- */

/** 1 nhóm cài đặt (thẻ có tiêu đề) */
function SettingsGroup({ icon, title, children, wide = false }: { icon: ReactNode; title: string; children: ReactNode; wide?: boolean }) {
  const headingId = useId()
  return (
    <section className={`st-group ${wide ? 'st-group--wide' : ''}`} aria-labelledby={headingId}>
      <h2 id={headingId} className="st-group__title">
        <span className="st-group__icon" aria-hidden>
          {icon}
        </span>
        {title}
      </h2>
      <div className="st-group__rows">{children}</div>
    </section>
  )
}

/** 1 dòng cài đặt: nhãn + giải thích bên trái, điều khiển bên phải (hoặc bên dưới nếu wide) */
function SettingRow({ label, hint, children, wide = false, labelFor }: { label: string; hint?: string; children: ReactNode; wide?: boolean; labelFor?: string }) {
  return (
    <div className={`st-row ${wide ? 'st-row--wide' : ''}`}>
      <div className="st-row__text">
        {labelFor ? (
          <label className="st-row__label" htmlFor={labelFor}>
            {label}
          </label>
        ) : (
          <span className="st-row__label">{label}</span>
        )}
        {hint && <p className="st-row__hint">{hint}</p>}
      </div>
      <div className="st-row__control">{children}</div>
    </div>
  )
}

/** Nhóm "thẻ chọn 1" (radio dạng thẻ có tiêu đề + ghi chú) — dùng input radio thật nên bàn phím chạy sẵn */
function ChoiceCards<Value extends string | number>({
  name,
  label,
  options,
  value,
  onChange,
  columns,
  compact = false,
}: {
  name: string
  label: string
  options: { value: Value; title: ReactNode; note?: ReactNode }[]
  value: Value
  onChange: (value: Value) => void
  columns?: number
  /** thẻ hẹp: bỏ dấu tích góc (viền + nền cam đã đủ cho biết đang chọn) */
  compact?: boolean
}) {
  return (
    <div className={`st-choices ${compact ? 'st-choices--compact' : ''}`} role="radiogroup" aria-label={label} style={columns ? { gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` } : undefined}>
      {options.map((option) => {
        const checked = option.value === value
        return (
          <label key={String(option.value)} className={`st-choice ${checked ? 'is-checked' : ''}`}>
            <input type="radio" name={name} checked={checked} onChange={() => onChange(option.value)} />
            <span className="st-choice__title">{option.title}</span>
            {option.note && <span className="st-choice__note">{option.note}</span>}
            <span className="st-choice__tick" aria-hidden>
              <Icon name="check" size={14} strokeWidth={3} />
            </span>
          </label>
        )
      })}
    </div>
  )
}

/* ----------------------------------------------------------------------------
 * Trang
 * -------------------------------------------------------------------------- */
export function SettingsPage() {
  const settingsText = useSettingsText()
  const { language, toggleLanguage } = useLanguage()
  const { preference, setPreference } = useTheme()
  const { muted, setMuted } = useSoundSettings()
  const { progress, saveStatus, setProfile, setTrack } = useProgress()
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const profile = progress.profile
  const autoButtons = srsButtonModeFor({ ...progress, profile: { ...profile, srsButtons: undefined } })

  /* ---------- hẹn giờ học ---------- */
  const presetCues = CUE_KEYS.map((key) => settingsText(key))
  const savedCue = profile.studyCue ?? ''
  // câu hẹn đã lưu có khớp 1 lựa chọn có sẵn (ở ngôn ngữ nào cũng được) không?
  const presetIndex = CUE_KEYS.findIndex((key) => [settingsTextIn('vi', key), settingsTextIn('en', key)].includes(savedCue))
  const [customCue, setCustomCue] = useState(presetIndex === -1 ? savedCue : '')
  const [cueMode, setCueMode] = useState<number | 'custom' | 'none'>(savedCue ? (presetIndex >= 0 ? presetIndex : 'custom') : 'none')
  const cueText = cueMode === 'custom' ? customCue.trim() : typeof cueMode === 'number' ? presetCues[cueMode] : ''

  // gõ câu tự ghi: lưu sau 600ms ngừng gõ (khỏi ghi tiến độ mỗi phím)
  useEffect(() => {
    if (cueMode !== 'custom') return
    const timer = window.setTimeout(() => {
      if ((profile.studyCue ?? '') !== customCue.trim()) setProfile({ studyCue: customCue.trim() || undefined })
    }, 600)
    return () => window.clearTimeout(timer)
  }, [customCue, cueMode, profile.studyCue, setProfile])

  function chooseCue(next: number | 'custom' | 'none') {
    setCueMode(next)
    if (next === 'none') setProfile({ studyCue: undefined, studyTime: undefined })
    else if (typeof next === 'number') setProfile({ studyCue: presetCues[next] })
    else setProfile({ studyCue: customCue.trim() || undefined })
  }

  function changeTheme(next: ThemePreference) {
    setPreference(next)
    setProfile({ theme: next })
  }

  function previewVoice(voice: StudyProfile['voice']) {
    playAudioLine({ text: 'Hello! Shall we practise a little English today?', voice: voice === 'gb' ? 'gb-female' : 'us-female' })
  }

  async function handleLogout() {
    await logout()
    navigate('/login', { replace: true })
  }

  const ageLabel = user?.ageGroup === 'kid' ? settingsText('ageKid') : user?.ageGroup === 'teen' ? settingsText('ageTeen') : settingsText('ageAdult')
  const saveText = saveStatus === 'saving' ? settingsText('saving') : saveStatus === 'error' ? settingsText('saveError') : settingsText('saved')

  return (
    <main className="page st-page">
      <header className="st-header">
        <div>
          <h1 className="st-header__title">{settingsText('title')}</h1>
          <p className="st-header__intro">{settingsText('intro')}</p>
        </div>
        <span className={`st-save st-save--${saveStatus}`} role="status">
          <span className="st-save__dot" aria-hidden />
          {saveText}
        </span>
      </header>

      <div className="st-grid">
        {/* ============ 1. HIỂN THỊ & ÂM THANH ============ */}
        <SettingsGroup icon={<Icon name="sun" size={20} />} title={settingsText('groupDisplay')}>
          <SettingRow label={settingsText('language')} hint={settingsText('languageHint')}>
            <SegmentedControl
              label={settingsText('language')}
              value={language}
              onChange={(next) => next !== language && toggleLanguage()}
              options={[
                { value: 'vi', label: 'Tiếng Việt' },
                { value: 'en', label: 'English' },
              ]}
            />
          </SettingRow>
          <SettingRow label={settingsText('theme')} hint={settingsText('themeHint')}>
            <SegmentedControl<ThemePreference>
              label={settingsText('theme')}
              value={preference}
              onChange={changeTheme}
              options={[
                { value: 'light', label: <span className="st-seg"><Icon name="sun" size={16} /> {settingsText('themeLight')}</span> },
                { value: 'dark', label: <span className="st-seg"><Icon name="moon" size={16} /> {settingsText('themeDark')}</span> },
                { value: 'system', label: <span className="st-seg"><Icon name="system" size={16} /> {settingsText('themeSystem')}</span> },
              ]}
            />
          </SettingRow>
          <SettingRow label={settingsText('sound')} hint={settingsText('soundHint')}>
            <div className="st-inline">
              <SegmentedControl<'on' | 'off'>
                label={settingsText('sound')}
                value={muted ? 'off' : 'on'}
                onChange={(next) => {
                  setMuted(next === 'off')
                  if (next === 'on') playSound('correct')
                }}
                options={[
                  { value: 'on', label: <span className="st-seg"><Icon name="volume" size={16} /> {settingsText('soundOn')}</span> },
                  { value: 'off', label: <span className="st-seg"><Icon name="volume-off" size={16} /> {settingsText('soundOff')}</span> },
                ]}
              />
              <Button variant="ghost" size="sm" onClick={() => playSound('complete')} disabled={muted}>
                {settingsText('soundTest')}
              </Button>
            </div>
          </SettingRow>
        </SettingsGroup>

        {/* ============ 2. TÀI KHOẢN (cạnh nhóm hiển thị) ============ */}
        <SettingsGroup icon={<Icon name="profile" size={20} />} title={settingsText('groupAccount')}>
          <dl className="st-account">
            <div>
              <dt>{settingsText('displayName')}</dt>
              <dd>{user?.displayName}</dd>
            </div>
            <div>
              <dt>{settingsText('username')}</dt>
              <dd>{user?.username}</dd>
            </div>
            <div>
              <dt>{settingsText('ageGroup')}</dt>
              <dd>
                <span className="st-age">{ageLabel}</span>
              </dd>
            </div>
          </dl>
          <p className="st-row__hint">{settingsText('ageGroupHint')}</p>
          <div className="st-account__actions">
            <Button variant="secondary" to={user ? `/profile/${user.id}` : '/play'} iconLeft="profile">
              {settingsText('profileLink')}
            </Button>
            <Button variant="ghost" iconLeft="exit" onClick={() => void handleLogout()}>
              {settingsText('logout')}
            </Button>
          </div>
          <p className="st-row__hint">{settingsText('logoutHint')}</p>
        </SettingsGroup>

        {/* ============ 3. MỤC TIÊU & GIỜ HỌC ============ */}
        <SettingsGroup icon={<Icon name="clock" size={20} />} title={settingsText('groupHabit')} wide>
          <SettingRow label={settingsText('goal')} hint={settingsText('goalHint')} wide>
            <ChoiceCards
              name="daily-goal"
              label={settingsText('goal')}
              value={(GOAL_OPTIONS as readonly number[]).includes(profile.dailyGoalMinutes) ? profile.dailyGoalMinutes : 10}
              onChange={(minutes) => setProfile({ dailyGoalMinutes: minutes })}
              columns={5}
              compact
              options={GOAL_OPTIONS.map((minutes) => ({
                value: minutes,
                title: (
                  <span className="st-goal">
                    <span className="ds-num">{minutes}</span> <small>{settingsText('minutesUnit')}</small>
                  </span>
                ),
                note: settingsText(`goalNote${minutes}` as SettingsTextKey),
              }))}
            />
          </SettingRow>

          <SettingRow label={settingsText('studyPlan')} hint={settingsText('studyPlanHint')} wide>
            <div className="st-plan">
              <div className="st-plan__cues" role="radiogroup" aria-label={settingsText('studyCue')}>
                <span className="st-plan__lead">{settingsText('studyCue')}</span>
                {presetCues.map((cue, index) => (
                  <button key={cue} type="button" role="radio" aria-checked={cueMode === index} className={`st-chip ${cueMode === index ? 'is-on' : ''}`} onClick={() => chooseCue(index)}>
                    {cue}
                  </button>
                ))}
                <button type="button" role="radio" aria-checked={cueMode === 'custom'} className={`st-chip ${cueMode === 'custom' ? 'is-on' : ''}`} onClick={() => chooseCue('custom')}>
                  {settingsText('studyCueCustom')}
                </button>
              </div>
              {cueMode === 'custom' && (
                <input
                  className="st-input"
                  value={customCue}
                  onChange={(event) => setCustomCue(event.target.value)}
                  placeholder={settingsText('studyCuePlaceholder')}
                  maxLength={60}
                  aria-label={settingsText('studyCue')}
                  autoFocus
                />
              )}
              <div className="st-plan__time">
                <label htmlFor="st-study-time">{settingsText('studyTime')}</label>
                <input
                  id="st-study-time"
                  className="st-input st-input--time"
                  type="time"
                  value={profile.studyTime ?? ''}
                  onChange={(event) => setProfile({ studyTime: event.target.value || undefined })}
                />
                {(profile.studyCue || profile.studyTime) && (
                  <Button variant="ghost" size="sm" onClick={() => chooseCue('none')}>
                    {settingsText('studyClear')}
                  </Button>
                )}
              </div>
              <p className="st-plan__sentence" aria-live="polite">
                <Icon name="hint" size={18} />
                {cueText
                  ? profile.studyTime
                    ? settingsText('studySentence', { cue: cueText, time: profile.studyTime })
                    : settingsText('studySentenceNoTime', { cue: cueText })
                  : settingsText('studyNone')}
              </p>
            </div>
          </SettingRow>
        </SettingsGroup>

        {/* ============ 4. CÁCH HỌC ============ */}
        <SettingsGroup icon={<Icon name="learn" size={20} />} title={settingsText('groupLearning')} wide>
          <SettingRow label={settingsText('track')} hint={settingsText('trackHint')} wide>
            <ChoiceCards
              name="track"
              label={settingsText('track')}
              value={profile.track}
              onChange={setTrack}
              columns={2}
              options={[
                { value: 'general', title: settingsText('trackGeneral'), note: settingsText('trackGeneralNote') },
                { value: 'ielts', title: settingsText('trackIelts'), note: settingsText('trackIeltsNote') },
              ]}
            />
          </SettingRow>
          <SettingRow label={settingsText('srs')} hint={settingsText('srsHint')} wide>
            <ChoiceCards<'auto' | 2 | 4>
              name="srs-buttons"
              label={settingsText('srs')}
              value={profile.srsButtons ?? 'auto'}
              onChange={(next) => setProfile({ srsButtons: next === 'auto' ? undefined : next })}
              columns={3}
              compact
              options={[
                { value: 'auto', title: settingsText('srsAuto'), note: settingsText('srsAutoNote', { n: autoButtons }) },
                { value: 2, title: settingsText('srsTwo'), note: settingsText('srsTwoNote') },
                { value: 4, title: settingsText('srsFour'), note: settingsText('srsFourNote') },
              ]}
            />
          </SettingRow>
          <SettingRow label={settingsText('voice')} hint={settingsText('voiceHint')} wide>
            <ChoiceCards<StudyProfile['voice']>
              name="voice"
              label={settingsText('voice')}
              value={profile.voice}
              onChange={(voice) => {
                setProfile({ voice })
                previewVoice(voice)
              }}
              columns={2}
              options={[
                { value: 'gb', title: <><img className="st-flag" src="/flags/gb.svg" alt="" width={22} height={16} /> {settingsText('voiceGb')}</>, note: settingsText('voiceDefault') },
                { value: 'us', title: <><img className="st-flag" src="/flags/us.svg" alt="" width={22} height={16} /> {settingsText('voiceUs')}</> },
              ]}
            />
            <Button variant="ghost" size="sm" iconLeft="volume" onClick={() => previewVoice(profile.voice)} className="st-sample">
              {settingsText('voiceSample')}
            </Button>
          </SettingRow>
        </SettingsGroup>

      </div>

      <div className="st-footer">
        <Button to="/learn" size="lg" iconRight="arrow-right">
          {settingsText('backToLearn')}
        </Button>
      </div>
    </main>
  )
}

/** Lấy chữ của 1 khoá ở ngôn ngữ chỉ định (để so câu hẹn đã lưu bằng tiếng Việt hay tiếng Anh) */
function settingsTextIn(language: 'vi' | 'en', key: SettingsTextKey): string {
  return SETTINGS_TEXT[key][language]
}
