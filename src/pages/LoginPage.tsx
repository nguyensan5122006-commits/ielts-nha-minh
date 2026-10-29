/**
 * LoginPage.tsx — TRANG ĐĂNG NHẬP / ĐĂNG KÝ
 * 1 trang, 2 chế độ (bấm link dưới form để đổi). Đăng ký cần mã mời gia đình.
 */
import { useState, type FormEvent } from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../services/auth-context'
import { JUST_LOGGED_IN_KEY, JUST_REGISTERED_KEY } from '../components/WelcomeModal'
import { useLanguage } from '../translations/language-context'

export function LoginPage() {
  const { t, language, toggleLanguage } = useLanguage()
  const { user, login, register } = useAuth()
  const [mode, setMode] = useState<'login' | 'register'>('login')
  const [form, setForm] = useState({ username: '', displayName: '', password: '', inviteCode: '' })
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  if (user) return <Navigate to="/" replace /> // đã đăng nhập thì về trang chủ

  const updateField = (field: keyof typeof form) => (event: { target: { value: string } }) =>
    setForm((current) => ({ ...current, [field]: event.target.value }))

  async function handleSubmit(event: FormEvent) {
    event.preventDefault() // chặn trình duyệt tải lại trang
    setError('')
    setIsSubmitting(true)
    try {
      // đánh dấu để bảng Chào mừng / Mừng quay lại biết cần hiện
      try {
        sessionStorage.setItem(mode === 'login' ? JUST_LOGGED_IN_KEY : JUST_REGISTERED_KEY, '1')
      } catch {
        /* bỏ qua */
      }
      if (mode === 'login') await login(form.username, form.password)
      else await register(form)
    } catch (e) {
      setError((e as Error).message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="row row--between" style={{ marginBottom: 24 }}>
          <div className="brand">
            <span className="brand__logo">6.5</span>
            {t('appName')}
          </div>
          <button type="button" className="language-toggle" onClick={toggleLanguage}>
            {language === 'vi' ? 'VI' : 'EN'}
          </button>
        </div>

        <form className="card stack" onSubmit={handleSubmit} style={{ padding: 28 }}>
          <div>
            <h1 style={{ marginBottom: 4 }}>{mode === 'login' ? t('loginTitle') : t('registerTitle')}</h1>
            <p className="muted" style={{ marginBottom: 0 }}>
              {t('appTagline')}
            </p>
          </div>

          <div className="form-field">
            <label htmlFor="username">{t('username')}</label>
            <input id="username" className="text-input" autoComplete="username" value={form.username} onChange={updateField('username')} required />
            {mode === 'register' && <span className="small muted">{t('usernameHint')}</span>}
          </div>

          {mode === 'register' && (
            <div className="form-field">
              <label htmlFor="displayName">{t('displayName')}</label>
              <input id="displayName" className="text-input" value={form.displayName} onChange={updateField('displayName')} placeholder="VD: Thảo" />
            </div>
          )}

          <div className="form-field">
            <label htmlFor="password">{t('password')}</label>
            <input
              id="password"
              type="password"
              className="text-input"
              autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
              value={form.password}
              onChange={updateField('password')}
              required
              minLength={mode === 'register' ? 6 : undefined}
            />
          </div>

          {mode === 'register' && (
            <div className="form-field">
              <label htmlFor="inviteCode">{t('inviteCode')}</label>
              <input id="inviteCode" className="text-input" value={form.inviteCode} onChange={updateField('inviteCode')} required />
            </div>
          )}

          {error && <div className="alert">{error}</div>}

          <button type="submit" className="button button--primary button--large button--wide" disabled={isSubmitting}>
            {isSubmitting ? <span className="spinner" /> : mode === 'login' ? t('loginTitle') : t('registerTitle')}
          </button>

          <button
            type="button"
            className="button button--ghost"
            onClick={() => {
              setMode(mode === 'login' ? 'register' : 'login')
              setError('')
            }}
          >
            {mode === 'login' ? t('noAccount') : t('haveAccount')}
          </button>
        </form>
      </div>
    </div>
  )
}
