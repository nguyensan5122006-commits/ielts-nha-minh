/**
 * SignupForm.tsx — FORM TẠO TÀI KHOẢN (dùng chung cho /start/result và /signup)
 * ----------------------------------------------------------------------------
 *   <SignupForm
 *     submitLabel="Lưu lộ trình & học ngay"
 *     beforeSubmit={() => apply.request()}         // VD đặt cờ "đăng ký xong thì áp kết quả xếp lớp"
 *     onRegistered={() => …}                       // tài khoản đã tạo + đã đăng nhập
 *     busy={apply.status !== 'idle'}               // giữ nút ở trạng thái "đang xử lý" tới khi chuyển trang
 *   />
 *
 * 1 form, 4 ô: tên gọi trong nhà · tên đăng nhập (tự gợi ý từ tên gọi) · mật khẩu (có nút hiện/ẩn)
 * · mã gia đình (chỉ hiện khi máy chủ có đặt INVITE_CODE). Gửi API `register()`.
 * Mọi tài khoản như nhau — không hỏi nhóm tuổi.
 * Kiểm tra tại chỗ trước khi gửi (đúng luật của functions/api/auth/register.ts) để báo lỗi ngay cạnh ô.
 * ----------------------------------------------------------------------------
 */
import { useEffect, useId, useState, type FormEvent, type ReactNode } from 'react'
import { Button, Icon } from '../../design-system'
import { callApi } from '../../services/api-client'
import { useAuth } from '../../services/auth-context'
import { useAuthText } from './auth-text'
import './auth.css'

/** Luật tên đăng nhập — giống hệt máy chủ (functions/api/auth/register.ts) */
const USERNAME_PATTERN = /^[a-zA-Z0-9_.]{3,20}$/

/**
 * Gợi ý tên đăng nhập từ tên gọi: bỏ dấu tiếng Việt, đ -> d, bỏ khoảng trắng, chữ thường.
 * VD "Bé Na" -> "bena", "Thảo" -> "thao". Ngắn quá (< 3 ký tự) thì thêm 2 số.
 */
export function suggestUsername(displayName: string): string {
  const base = displayName
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '') // bỏ dấu
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D')
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '')
    .slice(0, 18)
  if (!base) return ''
  return base.length >= 3 ? base : `${base}${String(Math.floor(Math.random() * 90) + 10)}`
}

type FieldName = 'displayName' | 'username' | 'password' | 'inviteCode'

export interface SignupFormProps {
  /** chữ trên nút gửi */
  submitLabel: string
  /** chạy ngay trước khi gửi (sau khi dữ liệu hợp lệ) */
  beforeSubmit?: () => void
  /** đã tạo tài khoản và đăng nhập xong */
  onRegistered?: () => void
  /** trang cha đang xử lý tiếp (áp kết quả, chuyển trang) -> nút vẫn quay */
  busy?: boolean
  /** ô thêm chèn trước nút gửi (VD chọn track ở /signup) */
  extraFields?: ReactNode
  /** id để nút ở chỗ khác (VD thanh dưới) gửi form này */
  formId?: string
}

export function SignupForm({ submitLabel, beforeSubmit, onRegistered, busy = false, extraFields, formId }: SignupFormProps) {
  const text = useAuthText()
  const { register } = useAuth()
  const idPrefix = useId()
  const [form, setForm] = useState({ displayName: '', username: '', password: '', inviteCode: '' })
  /** người học đã tự gõ tên đăng nhập -> thôi tự gợi ý */
  const [usernameTouched, setUsernameTouched] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [fieldErrors, setFieldErrors] = useState<Partial<Record<FieldName, string>>>({})
  const [formError, setFormError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  /**
   * Máy chủ có đòi mã gia đình không? (GET /api/auth/signup-options)
   * Mặc định true = hiện ô mã cho tới khi máy chủ trả lời "không cần" -> chủ nhà bỏ bí mật INVITE_CODE
   * là form tự ẩn ô này, không phải sửa code.
   */
  const [inviteRequired, setInviteRequired] = useState(true)
  useEffect(() => {
    let cancelled = false
    callApi<{ inviteRequired: boolean }>('/api/auth/signup-options')
      .then((options) => {
        if (!cancelled) setInviteRequired(options.inviteRequired)
      })
      .catch(() => {
        /* lỗi mạng -> giữ ô mã cho chắc */
      })
    return () => {
      cancelled = true
    }
  }, [])

  const fieldId = (name: string) => `${idPrefix}-${name}`

  function updateField(name: FieldName, value: string) {
    setForm((current) => {
      const next = { ...current, [name]: value }
      if (name === 'displayName' && !usernameTouched) next.username = suggestUsername(value)
      return next
    })
    if (name === 'username') setUsernameTouched(true)
    setFieldErrors((current) => ({ ...current, [name]: undefined }))
  }

  /** Kiểm tra tại chỗ — trả về lỗi theo từng ô (rỗng = hợp lệ) */
  function validate(): Partial<Record<FieldName, string>> {
    const errors: Partial<Record<FieldName, string>> = {}
    if (!USERNAME_PATTERN.test(form.username.trim())) errors.username = text.usernameInvalid
    if (form.password.length < 6) errors.password = text.passwordTooShort
    if (inviteRequired && !form.inviteCode.trim()) errors.inviteCode = text.inviteCodeMissing
    return errors
  }

  /** Lỗi máy chủ -> gắn vào đúng ô nếu nhận ra (mã mời / tên đăng nhập / mật khẩu) */
  function showServerError(message: string) {
    const friendly = text.serverError(message)
    if (/mã mời|invite/i.test(message)) setFieldErrors({ inviteCode: text.inviteCodeWrong })
    else if (/tên đăng nhập|username/i.test(message)) setFieldErrors({ username: friendly })
    else if (/mật khẩu|password/i.test(message)) setFieldErrors({ password: friendly })
    else setFormError(friendly)
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault() // chặn trình duyệt tải lại trang
    setFormError('')
    const errors = validate()
    setFieldErrors(errors)
    if (Object.keys(errors).length > 0) {
      // đưa con trỏ tới ô lỗi đầu tiên (người dùng bàn phím biết ngay sửa ở đâu)
      const first = (['username', 'password', 'inviteCode'] as FieldName[]).find((name) => errors[name])
      if (first) document.getElementById(fieldId(first))?.focus()
      return
    }
    setIsSubmitting(true)
    try {
      beforeSubmit?.()
      await register({
        username: form.username.trim(),
        displayName: form.displayName.trim() || form.username.trim(),
        password: form.password,
        inviteCode: form.inviteCode.trim(),
      })
      onRegistered?.()
    } catch (error) {
      showServerError((error as Error).message)
      setIsSubmitting(false)
    }
  }

  const errorId = (name: FieldName) => (fieldErrors[name] ? `${fieldId(name)}-error` : undefined)

  return (
    <form id={formId} className="au-form" onSubmit={handleSubmit} noValidate>
      <div className="au-field">
        <label className="au-label" htmlFor={fieldId('displayName')}>
          {text.displayName}
        </label>
        <input
          id={fieldId('displayName')}
          className="au-input"
          value={form.displayName}
          onChange={(event) => updateField('displayName', event.target.value)}
          placeholder={text.displayNamePlaceholder}
          autoComplete="nickname"
          maxLength={40}
        />
      </div>

      <div className="au-field">
        <label className="au-label" htmlFor={fieldId('username')}>
          {text.username}
        </label>
        <input
          id={fieldId('username')}
          className={['au-input', fieldErrors.username && 'is-invalid'].filter(Boolean).join(' ')}
          value={form.username}
          onChange={(event) => updateField('username', event.target.value)}
          autoComplete="username"
          autoCapitalize="none"
          spellCheck={false}
          maxLength={20}
          aria-invalid={!!fieldErrors.username}
          aria-describedby={errorId('username') ?? `${fieldId('username')}-hint`}
        />
        {fieldErrors.username ? (
          <span id={errorId('username')} className="au-error-text">
            {fieldErrors.username}
          </span>
        ) : (
          <span id={`${fieldId('username')}-hint`} className="au-hint">
            {text.usernameHint}
          </span>
        )}
      </div>

      {/* có ô mã gia đình -> mật khẩu + mã đứng chung 1 hàng; không có -> mật khẩu chiếm cả hàng */}
      <div className={inviteRequired ? 'au-field-row' : undefined}>
        <div className="au-field">
          <label className="au-label" htmlFor={fieldId('password')}>
            {text.password}
          </label>
          <div className="au-password">
            <input
              id={fieldId('password')}
              className={['au-input', fieldErrors.password && 'is-invalid'].filter(Boolean).join(' ')}
              type={showPassword ? 'text' : 'password'}
              value={form.password}
              onChange={(event) => updateField('password', event.target.value)}
              autoComplete="new-password"
              aria-invalid={!!fieldErrors.password}
              aria-describedby={errorId('password') ?? `${fieldId('password')}-hint`}
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
          {fieldErrors.password ? (
            <span id={errorId('password')} className="au-error-text">
              {fieldErrors.password}
            </span>
          ) : (
            <span id={`${fieldId('password')}-hint`} className="au-hint">
              {text.passwordHint}
            </span>
          )}
        </div>

        {inviteRequired && (
        <div className="au-field">
          <label className="au-label" htmlFor={fieldId('inviteCode')}>
            {text.inviteCode}
          </label>
          <input
            id={fieldId('inviteCode')}
            className={['au-input', fieldErrors.inviteCode && 'is-invalid'].filter(Boolean).join(' ')}
            value={form.inviteCode}
            onChange={(event) => updateField('inviteCode', event.target.value)}
            autoComplete="off"
            spellCheck={false}
            aria-invalid={!!fieldErrors.inviteCode}
            aria-describedby={errorId('inviteCode') ?? `${fieldId('inviteCode')}-hint`}
          />
          {fieldErrors.inviteCode ? (
            <span id={errorId('inviteCode')} className="au-error-text">
              {fieldErrors.inviteCode}
            </span>
          ) : (
            <span id={`${fieldId('inviteCode')}-hint`} className="au-hint">
              {text.inviteCodeHint}
            </span>
          )}
        </div>
        )}
      </div>

      {extraFields}

      {formError && (
        <div className="au-alert" role="alert">
          {formError}
        </div>
      )}

      <Button type="submit" size="lg" fullWidth loading={isSubmitting || busy} iconRight="arrow-right">
        {submitLabel}
      </Button>
    </form>
  )
}
