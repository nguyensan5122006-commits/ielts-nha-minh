/**
 * LoginPage.tsx — TRANG /login (làm lại giao diện, GIỮ NGUYÊN API: useAuth().login)
 * ----------------------------------------------------------------------------
 * Thay cho src/pages/LoginPage.tsx cũ (trang cũ gộp cả đăng ký; giờ đăng ký nằm ở /signup
 * và ngay trên màn kết quả xếp lớp).
 *
 *  - Đã đăng nhập -> về "/" (cổng landing tự chuyển: bé -> /kids, người khác -> /learn).
 *  - Đến từ màn kết quả xếp lớp ("Đã có tài khoản? Đăng nhập"): hiện dòng "kết quả sẽ được lưu",
 *    đăng nhập xong thì useApplyPlacement chép kết quả vào tài khoản rồi đi thẳng vào học.
 *  - Đăng nhập thường: đặt cờ JUST_LOGGED_IN_KEY để bảng "Mừng quay lại" (WelcomeModal) hiện như cũ.
 * Lỗi máy chủ dạng "VI / EN" được tách đúng ngôn ngữ (useAuthText().serverError).
 * ----------------------------------------------------------------------------
 */
import { useEffect, useId, useState, type FormEvent } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { JUST_LOGGED_IN_KEY } from '../../components/WelcomeModal'
import { Button, Icon } from '../../design-system'
import { useAuth } from '../../services/auth-context'
import { loadResult } from '../placement-test/placement-storage'
import { formatBandRange } from '../placement-test/study-plan'
import { useApplyPlacement } from '../placement-test/use-apply-placement'
import { AuthShell } from './AuthShell'
import { useAuthText } from './auth-text'

export function LoginPage() {
  const text = useAuthText()
  const navigate = useNavigate()
  const { user, login } = useAuth()
  const apply = useApplyPlacement()
  const idPrefix = useId()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  // kết quả xếp lớp đang chờ lưu (khách bấm "Đăng nhập" từ màn kết quả)
  const pendingResult = apply.isRequested ? loadResult() : null
  const pendingSummary = pendingResult
    ? pendingResult.setup.ageGroup === 'kid'
      ? 'Level 1'
      : `Level ${pendingResult.estimate.recommendedLevel.slice(-1)} · ${formatBandRange(pendingResult.estimate.bandLow, pendingResult.estimate.bandHigh)}`
    : ''

  // áp kết quả xong -> vào học luôn
  useEffect(() => {
    if (apply.status === 'done' && apply.destination) navigate(apply.destination, { replace: true })
  }, [apply.status, apply.destination, navigate])

  if (user && !apply.isRequested) return <Navigate to="/" replace />

  async function handleSubmit(event: FormEvent) {
    event.preventDefault() // chặn trình duyệt tải lại trang
    setError('')
    if (!username.trim() || !password) {
      setError(text.required)
      return
    }
    setIsSubmitting(true)
    try {
      if (!apply.isRequested) {
        try {
          sessionStorage.setItem(JUST_LOGGED_IN_KEY, '1') // bảng "Mừng quay lại" như cũ
        } catch {
          /* bỏ qua */
        }
      }
      await login(username.trim(), password)
      // có kết quả chờ lưu: giữ nút quay tới khi useApplyPlacement chuyển trang
      if (!apply.isRequested) setIsSubmitting(false)
    } catch (e) {
      setError(text.serverError((e as Error).message))
      setIsSubmitting(false)
    }
  }

  const fieldId = (name: string) => `${idPrefix}-${name}`

  return (
    <AuthShell
      title={text.loginTitle}
      subtitle={text.loginSub}
      notice={
        pendingResult && (
          <p className="au-notice" role="status">
            <Icon name="sparkle" size={18} />
            {text.pendingPlacement(pendingSummary)}
          </p>
        )
      }
      footer={
        <>
          <span className="au-card__footer-title">{text.noAccountTitle}</span>
          <div className="au-card__footer-links">
            <Button variant="secondary" size="md" to="/start" iconRight="arrow-right">
              {text.noAccountTest}
            </Button>
            <Link to="/signup" className="ob-text-link">
              {text.noAccountSignup}
            </Link>
          </div>
        </>
      }
    >
      <form className="au-form" onSubmit={handleSubmit} noValidate>
        <div className="au-field">
          <label className="au-label" htmlFor={fieldId('username')}>
            {text.username}
          </label>
          <input
            id={fieldId('username')}
            className="au-input"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            autoComplete="username"
            autoCapitalize="none"
            spellCheck={false}
            autoFocus
            required
          />
        </div>
        <div className="au-field">
          <label className="au-label" htmlFor={fieldId('password')}>
            {text.password}
          </label>
          <div className="au-password">
            <input
              id={fieldId('password')}
              className="au-input"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              autoComplete="current-password"
              required
            />
            <button
              type="button"
              className="au-password__toggle"
              onClick={() => setShowPassword((shown) => !shown)}
              aria-label={showPassword ? text.hidePassword : text.showPassword}
              aria-pressed={showPassword}
            >
              <Icon name={showPassword ? 'eye-off' : 'eye'} size={18} />
            </button>
          </div>
        </div>

        {error && (
          <div className="au-alert" role="alert">
            {error}
          </div>
        )}

        <Button type="submit" size="lg" fullWidth loading={isSubmitting} iconRight="arrow-right">
          {text.loginButton}
        </Button>
      </form>
    </AuthShell>
  )
}
