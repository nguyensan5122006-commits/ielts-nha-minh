/**
 * auth-text.ts
 * ----------------------------------------------------------------------------
 * CHỮ GIAO DIỆN CỦA ĐĂNG NHẬP / ĐĂNG KÝ (/login, /signup, form lưu lộ trình) — 2 ngôn ngữ.
 *   const text = useAuthText()
 *   text.loginTitle                -> "Mừng bạn quay lại"
 *   text.serverError(message)      -> lấy đúng nửa tiếng Việt / tiếng Anh của lỗi máy chủ
 *
 * Máy chủ trả lỗi dạng "Tiếng Việt / English" (functions/api/auth/*.ts) -> serverError()
 * tách đôi theo " / " và chọn nửa hợp ngôn ngữ đang dùng.
 * {mascot} = tên mascot (đổi ở src/design-system/mascot-name.ts) — useAuthText tự thay.
 * ----------------------------------------------------------------------------
 */
import { useMemo } from 'react'
import { fillMascotName } from '../../design-system'
import { useLanguage } from '../../translations/language-context'

const VI = {
  /* ---------- /login ---------- */
  loginTitle: 'Mừng bạn quay lại',
  loginSub: 'Đăng nhập để học tiếp đúng chỗ bạn dừng.',
  loginButton: 'Đăng nhập',
  noAccountTitle: 'Chưa có tài khoản?',
  noAccountTest: 'Làm bài xếp lớp 5 phút',
  noAccountSignup: 'Tạo tài khoản luôn',
  pendingPlacement: (summary: string) => `Kết quả xếp lớp (${summary}) sẽ được lưu vào tài khoản sau khi đăng nhập.`,
  sidePanelTitle: 'Cả nhà học tiếng Anh',
  sidePanelLine: 'Mỗi ngày một chút — {mascot} giữ chỗ cho bạn.',
  sidePanelPoints: ['Học tiếp đúng câu đang làm', 'Ôn từ đúng lúc sắp quên', 'Bảng xếp hạng cả nhà'],

  /* ---------- /signup ---------- */
  signupTitle: 'Tạo tài khoản',
  signupSub: 'Một tài khoản cho mỗi người trong nhà. Cần mã gia đình để tham gia.',
  signupTestPromptTitle: 'Chưa biết bắt đầu từ đâu?',
  signupTestPromptBody: 'Làm bài xếp lớp 5 phút để vào đúng level — hoặc tạo tài khoản ngay và bắt đầu từ Level 1.',
  signupTestPromptCta: 'Làm bài xếp lớp',
  signupHasResult: (summary: string) => `Kết quả xếp lớp của bạn: ${summary}. Sẽ được lưu cùng tài khoản.`,
  trackLabel: 'Bạn học để làm gì?',
  trackGeneral: 'Tiếng Anh tổng quát',
  trackIelts: 'Luyện thi IELTS',
  signupButton: 'Tạo tài khoản & học ngay',
  haveAccount: 'Đã có tài khoản?',
  loginLink: 'Đăng nhập',

  /* ---------- các ô nhập ---------- */
  displayName: 'Tên gọi trong nhà',
  displayNamePlaceholder: 'VD: Thảo, Bố, Bé Na',
  username: 'Tên đăng nhập',
  usernameHint: '3–20 ký tự: chữ không dấu, số, dấu _ hoặc .',
  usernameInvalid: 'Tên đăng nhập chỉ gồm chữ không dấu, số, _ hoặc . (3–20 ký tự).',
  password: 'Mật khẩu',
  passwordHint: 'Ít nhất 6 ký tự',
  passwordTooShort: 'Mật khẩu cần ít nhất 6 ký tự.',
  showPassword: 'Hiện mật khẩu',
  hidePassword: 'Ẩn mật khẩu',
  inviteCode: 'Mã gia đình',
  inviteCodeHint: 'Hỏi người lập web trong nhà',
  inviteCodeMissing: 'Cần mã gia đình để tạo tài khoản.',
  // (QA) máy chủ báo "Mã mời không đúng" — đổi sang đúng tên ô "Mã gia đình" cho khỏi rối
  inviteCodeWrong: 'Mã gia đình chưa đúng — hỏi lại người lập web trong nhà.',
  required: 'Bắt buộc',
  genericError: 'Có lỗi xảy ra, thử lại nhé.',
  networkError: 'Không kết nối được máy chủ. Kiểm tra mạng rồi thử lại.',
}

type AuthText = typeof VI

const EN: AuthText = {
  loginTitle: 'Welcome back',
  loginSub: 'Log in to continue right where you stopped.',
  loginButton: 'Log in',
  noAccountTitle: 'No account yet?',
  noAccountTest: 'Take the 5-minute placement test',
  noAccountSignup: 'Create an account now',
  pendingPlacement: (summary: string) => `Your placement result (${summary}) will be saved to your account after you log in.`,
  sidePanelTitle: 'English for the whole family',
  sidePanelLine: 'A little every day — {mascot} keeps your place.',
  sidePanelPoints: ['Continue at the exact question', 'Review words right before you forget', 'Family leaderboard'],

  signupTitle: 'Create an account',
  signupSub: 'One account per family member. You need the family code to join.',
  signupTestPromptTitle: 'Not sure where to start?',
  signupTestPromptBody: 'Take the 5-minute placement test to start at the right level — or create an account now and begin at Level 1.',
  signupTestPromptCta: 'Take the placement test',
  signupHasResult: (summary: string) => `Your placement result: ${summary}. It will be saved with your account.`,
  trackLabel: 'Why are you learning?',
  trackGeneral: 'General English',
  trackIelts: 'IELTS preparation',
  signupButton: 'Create account & start',
  haveAccount: 'Have an account?',
  loginLink: 'Log in',

  displayName: 'Family name to show',
  displayNamePlaceholder: 'e.g. Thao, Dad, Little Na',
  username: 'Username',
  usernameHint: '3–20 characters: letters, digits, _ or .',
  usernameInvalid: 'Username: letters without accents, digits, _ or . (3–20 characters).',
  password: 'Password',
  passwordHint: 'At least 6 characters',
  passwordTooShort: 'Password needs at least 6 characters.',
  showPassword: 'Show password',
  hidePassword: 'Hide password',
  inviteCode: 'Family code',
  inviteCodeHint: 'Ask whoever set up the site',
  inviteCodeMissing: 'You need the family code to create an account.',
  inviteCodeWrong: 'That family code is not right — ask whoever set up the site.',
  required: 'Required',
  genericError: 'Something went wrong — please try again.',
  networkError: 'Cannot reach the server. Check your connection and try again.',
}

function withMascotName(text: AuthText): AuthText {
  const fill = (value: unknown): unknown =>
    typeof value === 'string' ? fillMascotName(value) : Array.isArray(value) ? value.map(fill) : value
  return Object.fromEntries(Object.entries(text).map(([key, value]) => [key, fill(value)])) as AuthText
}

const BY_LANGUAGE = { vi: withMascotName(VI), en: withMascotName(EN) }

/** Chữ trang đăng nhập / đăng ký theo ngôn ngữ đang chọn. */
export function useAuthText(): AuthText & { serverError: (message: string) => string } {
  const { language } = useLanguage()
  return useMemo(() => {
    const text = BY_LANGUAGE[language]
    return {
      ...text,
      // "Mã mời không đúng / Wrong invite code" -> chọn nửa đúng ngôn ngữ
      serverError: (message: string) => {
        if (!message) return text.genericError
        if (message.startsWith('Không kết nối được máy chủ')) return text.networkError
        const parts = message.split(' / ')
        if (parts.length === 2) return language === 'vi' ? parts[0] : parts[1]
        return message
      },
    }
  }, [language])
}
