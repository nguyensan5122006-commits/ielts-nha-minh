/**
 * App.tsx
 * ----------------------------------------------------------------------------
 * KHUNG CHÍNH CỦA ỨNG DỤNG
 *  1. Bọc các "Provider" để mọi trang dùng chung dữ liệu. Thứ tự từ ngoài vào trong:
 *       Ngôn ngữ -> Thông báo nổi -> Đăng nhập -> Tiến độ học
 *       -> Thành viên gia đình -> (Router) -> Kết nối realtime (chat, ai online)
 *     (Provider trong dùng được Provider ngoài, không ngược lại.)
 *  2. Bảng định tuyến: đường dẫn URL nào -> mở trang (page) nào.
 *  3. Chưa đăng nhập -> chuyển về /login.
 *
 * Trang có khung menu: nằm trong <AppShellRoute> (src/app/layout/) — sidebar trái 240px,
 * nội dung giữa, cột phải (widget) 340px; màn < 1024px thì menu thành thanh tab dưới.
 * Trang toàn màn hình (đang học bài, đang thi): không có menu để tập trung (FocusLayout).
 * Chế độ sáng/tối: <ThemeProvider> (src/design-system/theme.ts) bọc ngoài cùng.
 * ----------------------------------------------------------------------------
 */
import { lazy, Suspense } from 'react'
import { BrowserRouter, Navigate, Outlet, Route, Routes } from 'react-router-dom'
import { ChatWidget } from '../chat/ChatWidget'
import { GameWatchers } from '../components/GameWatchers'
import { ToastProvider } from '../components/ToastCenter'
import { WelcomeModal } from '../components/WelcomeModal'
import { FamilyProvider } from '../family-members/family-store'
import { ProgressProvider, useProgress } from '../learning-progress/progress-store'
import { RealtimeProvider } from '../realtime/realtime-store'
import { AuthProvider, useAuth } from '../services/auth-context'
import { LanguageProvider, useLanguage } from '../translations/language-context'
import { ThemeProvider } from '../design-system/theme'
// (redesign v3) Khách: landing "/", bài xếp lớp /start, kết quả /start/result, /login, /signup
import { landingRoutes } from '../features/landing/landing-routes'
import { placementRoutes } from '../features/placement-test/placement-routes'
import { authRoutes } from '../features/auth/auth-routes'
// (redesign v3) Trang chủ, Lộ trình, Level, Bài học, Mini-test, Ôn tập, Sổ lỗi sai cũ đã chuyển vào
// src/_legacy-v2/ (chỉ để tham khảo) — mọi route đã có trang mới của từng nhóm.
import { vocabularyReviewRoutes } from '../features/vocabulary-review/vocabulary-review-routes'
import { mistakesNotebookRoutes } from '../features/mistakes-notebook/mistakes-notebook-routes'
import { progressDashboardRoutes } from '../features/progress-dashboard/progress-dashboard-routes'
import { playgroundRoutes } from '../features/playground/playground-routes'
import { settingsRoutes } from '../features/settings/settings-routes'
import { learningPathRoutes } from '../features/learning-path/learning-path-routes'
// (redesign v3) Khu Ngữ pháp: /grammar, /grammar/:topicId
import { grammarRoutes } from '../features/grammar/grammar-routes'
import { AppShellRoute } from './layout/AppShellRoute'
import { skillTaskRoutes } from '../features/skill-writing/skill-writing-routes'
import { lessonPlayerRoutes } from '../features/lesson-player/lesson-player-routes'
import { listeningReadingRoutes } from '../features/skill-reading/skill-reading-routes'
// (redesign v3) Phòng thi: /exams, /exam/:id, /exam-result/:id (+ /review) và mini-test /lesson/:id/mini-test
import { examRoomFocusRoutes, examRoomShellRoutes } from '../features/exam-room/exam-room-routes'


// Các trang ít dùng / nặng (chủ đề Học vui, trò chơi chữ, chat…) chỉ tải khi mở tới -> web mở nhanh hơn
const FunTopicsPage = lazy(() => import('../pages/FunTopicsPage').then((m) => ({ default: m.FunTopicsPage })))
const FunFlashcardsPage = lazy(() => import('../pages/FunFlashcardsPage').then((m) => ({ default: m.FunFlashcardsPage })))
const QuestsPage = lazy(() => import('../pages/QuestsPage').then((m) => ({ default: m.QuestsPage })))
const ProfilePage = lazy(() => import('../pages/ProfilePage').then((m) => ({ default: m.ProfilePage })))
const ChatPage = lazy(() => import('../pages/ChatPage').then((m) => ({ default: m.ChatPage })))
// 3 trò chơi chữ: Spelling Bee, Nối từ (chơi với máy), Thử thách từ mỗi ngày (kiểu Wordle)
const SpellingBeePage = lazy(() => import('../pages/SpellingBeePage').then((m) => ({ default: m.SpellingBeePage })))
const WordChainSoloPage = lazy(() => import('../pages/WordChainSoloPage').then((m) => ({ default: m.WordChainSoloPage })))
const DailyWordPage = lazy(() => import('../pages/DailyWordPage').then((m) => ({ default: m.DailyWordPage })))
const LeaderboardPage = lazy(() => import('../pages/LeaderboardPage').then((m) => ({ default: m.LeaderboardPage })))
// Sổ tay giao diện sống (/design) — xem mọi component của hệ thiết kế, không cần đăng nhập
const StyleGuidePage = lazy(() => import('../design-system/StyleGuidePage').then((m) => ({ default: m.StyleGuidePage })))

/** Màn hình chờ trong lúc kiểm tra đăng nhập / tải tiến độ. */
function FullPageLoading() {
  const { t } = useLanguage()
  return (
    <div className="auth-page">
      <div className="row muted">
        <span className="spinner" /> {t('loading')}
      </div>
    </div>
  )
}

/** Chặn trang nếu chưa đăng nhập; đã đăng nhập thì bật realtime + "người gác" lên level / huy hiệu. */
function RequireLogin() {
  const { user, isCheckingLogin } = useAuth()
  const { isLoaded } = useProgress()
  if (isCheckingLogin) return <FullPageLoading />
  if (!user) return <Navigate to="/login" replace />
  if (!isLoaded) return <FullPageLoading />
  return (
    <RealtimeProvider>
      <GameWatchers />
      <WelcomeModal />
      <ChatWidget />
      <Suspense fallback={<FullPageLoading />}>
        <Outlet />
      </Suspense>
    </RealtimeProvider>
  )
}

export function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <ToastProvider>
          <AuthProvider>
            <ProgressProvider>
              <FamilyProvider>
                <BrowserRouter>
                  <Routes>
                    {/* khách (không cần đăng nhập). "/" đứng TRƯỚC khối RequireLogin nên được ưu tiên:
                        khách -> landing; đã đăng nhập -> /learn */}
                    {landingRoutes()}
                    {placementRoutes()}
                    {authRoutes()}
                    <Route
                      path="/design/*"
                      element={
                        <Suspense fallback={<FullPageLoading />}>
                          <StyleGuidePage />
                        </Suspense>
                      }
                    />
                    <Route element={<RequireLogin />}>
                      {/* các trang có khung v3 (sidebar trái + cột phải). Trang cũ (chat, trò chơi chữ, Học vui…)
                          giữ nguyên markup — giao diện mới đến từ biến CSS trong styles/global.css */}
                      <Route element={<AppShellRoute />}>
                        {learningPathRoutes()}
                        {vocabularyReviewRoutes()}
                        {grammarRoutes()}
                        {mistakesNotebookRoutes()}
                        {progressDashboardRoutes()}
                        {examRoomShellRoutes()}
                        <Route path="/leaderboard" element={<LeaderboardPage />} />
                        <Route path="/fun" element={<FunTopicsPage />} />
                        <Route path="/fun/:topicId" element={<FunFlashcardsPage />} />
                        <Route path="/quests" element={<QuestsPage />} />
                        <Route path="/profile/:userId" element={<ProfilePage />} />
                        <Route path="/chat" element={<ChatPage />} />
                        <Route path="/games/spelling" element={<SpellingBeePage />} />
                        <Route path="/games/word-chain" element={<WordChainSoloPage />} />
                        <Route path="/daily-word" element={<DailyWordPage />} />
                        {playgroundRoutes()}
                        {settingsRoutes()}
                      </Route>
                      {/* toàn màn hình */}
                      {lessonPlayerRoutes()}
                      {examRoomFocusRoutes()}
                      {skillTaskRoutes()}
                      {listeningReadingRoutes()}
                    </Route>
                    <Route path="*" element={<Navigate to="/" replace />} />
                  </Routes>
                </BrowserRouter>
              </FamilyProvider>
            </ProgressProvider>
          </AuthProvider>
        </ToastProvider>
      </LanguageProvider>
    </ThemeProvider>
  )
}
