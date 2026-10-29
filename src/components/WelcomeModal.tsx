/**
 * WelcomeModal.tsx — BẢNG CHÀO MỪNG (tối đa 1 lần / ngày)
 * ----------------------------------------------------------------------------
 * Người mới đăng ký  -> "Chào mừng": 1 câu + quà 50 🍌 khởi đầu + nút "Vào học".
 * Lần mở web đầu tiên trong ngày -> "Mừng quay lại" (ngắn, bình tĩnh):
 *   - quà đăng nhập hằng ngày (tăng theo chuỗi ngày đăng nhập)
 *   - 3 con số nhỏ: chuỗi ngày, chuối, thẻ cần ôn
 *   - tối đa 3 tin lúc vắng: tin nhắn chưa đọc, lời thách đấu, ai vượt mình trên bảng xếp hạng
 *   - 1 nút chính "Học tiếp" (bài tiếp theo) + 1 nút phụ "Để sau"
 * Quà đăng nhập luôn được nhận tự động khi mở web (kể cả không hiện bảng).
 * (v3) Làm lại bằng <Modal> của hệ thiết kế (mascot ló đầu, Esc để đóng, bẫy Tab).
 *      Luật mới: chỉ hiện ≤ 1 bảng / ngày (đăng nhập lại trong ngày không hiện nữa);
 *      không hiện đè lên màn học / thi / bài xếp lớp (lần sau mở trang khác mới hiện).
 * ----------------------------------------------------------------------------
 */
import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { STARTING_BANANAS } from '../game-economy/banana-rewards'
import { Button, Modal } from '../design-system'
import { BananaPill } from '../features/playground/components/BananaPill'
import { GameArt } from '../features/playground/components/GameArt'
import { usePlayText } from '../features/playground/playground-text'
import { useFamily } from '../family-members/family-store'
import { useProgress } from '../learning-progress/progress-store'
import { findNextLesson } from '../content/path-selectors'
import { srsQueueInfo } from '../learning-progress/fsrs-scheduler'
import { todayString } from '../learning-progress/study-calendar'
import { useWallet } from '../player-wallet/wallet-store'
import { api, type WelcomeNews } from '../services/api-client'
import { useAuth } from '../services/auth-context'
import { useLanguage } from '../translations/language-context'
import '../features/playground/styles/play-kit.css'
import '../features/playground/styles/welcome.css'

/** Cờ đặt bởi trang đăng nhập / đăng ký để biết cần hiện bảng nào. */
export const JUST_REGISTERED_KEY = 'ielts-just-registered'
export const JUST_LOGGED_IN_KEY = 'ielts-just-logged-in'

/** Màn tập trung: không bật bảng chào đè lên */
const QUIET_PATHS = ['/lesson/', '/exam/', '/start', '/review/session', '/kids/play']

type ModalKind = 'new-user' | 'welcome-back' | null

function readFlag(key: string): boolean {
  try {
    const value = sessionStorage.getItem(key)
    sessionStorage.removeItem(key)
    return value === '1'
  } catch {
    return false
  }
}

export function WelcomeModal() {
  const { user } = useAuth()
  const { t, pick } = useLanguage()
  const playText = usePlayText()
  const navigate = useNavigate()
  const location = useLocation()
  const { progress, isLoaded, visibleStreak } = useProgress()
  const { bananas, setBalance } = useWallet()
  const { members } = useFamily()
  const [kind, setKind] = useState<ModalKind>(null)
  const [loginReward, setLoginReward] = useState<{ reward: number; loginStreak: number } | null>(null)
  const [news, setNews] = useState<WelcomeNews | null>(null)
  const [overtakenBy, setOvertakenBy] = useState<string[]>([])
  const quietHere = QUIET_PATHS.some((path) => location.pathname.startsWith(path))

  /* ---------- 1. nhận quà đăng nhập (mỗi lần mở web, máy chủ tự chặn trùng trong ngày) ---------- */
  useEffect(() => {
    if (!user || !isLoaded) return
    void api
      .claimDailyLogin()
      .then((result) => {
        setBalance(result.balance)
        setLoginReward(result)
      })
      .catch(() => {})
  }, [user, isLoaded, setBalance])

  /* ---------- 2. quyết định có hiện bảng không (≤ 1 lần / ngày, không đè màn tập trung) ---------- */
  const [decided, setDecided] = useState(false)
  useEffect(() => {
    if (!user || !isLoaded || decided || quietHere) return
    setDecided(true)
    const justRegistered = readFlag(JUST_REGISTERED_KEY)
    readFlag(JUST_LOGGED_IN_KEY) // xoá cờ cũ; đăng nhập lại trong ngày không hiện thêm bảng
    const dayKey = `ielts-welcome-day-${user.id}`
    let shownToday = false
    try {
      shownToday = localStorage.getItem(dayKey) === todayString()
      localStorage.setItem(dayKey, todayString())
    } catch {
      /* bỏ qua */
    }
    if (justRegistered) setKind('new-user')
    else if (!shownToday) {
      setKind('welcome-back')
      void api.getWelcomeNews().then(setNews).catch(() => {})
    }
  }, [user, isLoaded, decided, quietHere])

  /* ---------- 3. ai vượt mình trên bảng xếp hạng tuần (so với lần trước) ---------- */
  useEffect(() => {
    if (!user || members.length === 0) return
    const ranked = [...members].sort((a, b) => b.weekXp - a.weekXp)
    const myRank = ranked.findIndex((m) => m.id === user.id)
    const key = `ielts-ahead-of-${user.id}`
    try {
      const previouslyBehind: number[] = JSON.parse(localStorage.getItem(key) ?? '[]')
      const nowAhead = ranked.slice(0, myRank).map((m) => m.id)
      // người trước đây xếp sau mình, giờ xếp trên
      setOvertakenBy(ranked.filter((m) => nowAhead.includes(m.id) && previouslyBehind.includes(m.id)).map((m) => m.displayName))
      localStorage.setItem(key, JSON.stringify(ranked.slice(myRank + 1).map((m) => m.id)))
    } catch {
      /* bỏ qua */
    }
  }, [user, members])

  if (!kind || !user) return null
  const close = () => setKind(null)
  const goTo = (path: string) => {
    close()
    navigate(path)
  }
  const isKid = user.ageGroup === 'kid'

  /* ======================= NGƯỜI MỚI ======================= */
  if (kind === 'new-user') {
    return (
      <Modal
        open
        onClose={close}
        size="sm"
        mascotPose="salute"
        title={playText('welcomeNewTitle', { name: user.displayName })}
        footer={
          <>
            <Button variant="secondary" onClick={close}>
              {playText('welcomeLookAround')}
            </Button>
            <Button onClick={() => goTo(isKid ? '/kids' : '/learn')} iconRight="arrow-right">
              {playText('welcomeStartLearning')}
            </Button>
          </>
        }
      >
        <div className="welcome">
          <p className="welcome__lead">{playText('welcomeNewText', { n: STARTING_BANANAS })}</p>
          <BananaPill amount={STARTING_BANANAS} signed size="lg" />
        </div>
      </Modal>
    )
  }

  /* ======================= MỪNG QUAY LẠI ======================= */
  const dueCards = srsQueueInfo(progress).sessionSize
  const next = isKid ? null : findNextLesson(progress)
  const unreadTotal = Object.values(news?.unread ?? {}).reduce((sum, n) => sum + n, 0)
  // tối đa 3 tin để bảng ngắn gọn
  const newsItems: { key: string; art: string; text: string; action: string; to: string }[] = []
  if (unreadTotal > 0) newsItems.push({ key: 'chat', art: 'speech-balloon', text: t('newsUnread', { n: unreadTotal }), action: playText('chatTitle'), to: '/chat' })
  for (const challenge of news?.challenges ?? [])
    newsItems.push({
      key: `c${challenge.id}`,
      art: 'crossed-swords',
      text: t('newsChallenge', { name: challenge.fromName }) + (challenge.bet > 0 && !isKid ? ` · ${challenge.bet} 🍌` : ''),
      action: t('challengeBack'),
      to: `/arena?challenge=${challenge.fromUserId}`,
    })
  if (overtakenBy.length > 0) newsItems.push({ key: 'board', art: 'crown', text: t('newsOvertaken', { names: overtakenBy.join(', ') }), action: playText('boardOpen'), to: '/leaderboard' })

  return (
    <Modal
      open
      onClose={close}
      size="md"
      mascotPose="happy"
      title={playText('welcomeBack', { name: user.displayName })}
      footer={
        <>
          <Button variant="secondary" onClick={close}>
            {playText('welcomeLater')}
          </Button>
          <Button onClick={() => goTo(isKid ? '/kids' : next ? `/lesson/${next.lesson.id}` : '/learn')} iconRight="arrow-right">
            {playText('welcomeContinue')}
          </Button>
        </>
      }
    >
      <div className="welcome">
        {loginReward && loginReward.reward > 0 && (
          <div className="welcome__gift">
            <GameArt slug="wrapped-gift" size={48} />
            <div>
              <strong>{playText('welcomeGift', { n: loginReward.reward })}</strong>
              <span>{playText('welcomeGiftStreak', { n: loginReward.loginStreak })}</span>
            </div>
          </div>
        )}

        <ul className="welcome__stats">
          <li>
            <GameArt slug="fire" size={24} />
            <strong className="ds-num">{visibleStreak}</strong>
            <span>{t('streakTooltip')}</span>
          </li>
          <li>
            <GameArt slug="banana" size={24} />
            <strong className="ds-num">{bananas}</strong>
            <span>{t('bananas')}</span>
          </li>
          {!isKid && (
            <li>
              <GameArt slug="repeat-button" size={24} />
              <strong className="ds-num">{dueCards}</strong>
              <span>{t('dueToday')}</span>
            </li>
          )}
        </ul>

        {newsItems.length > 0 && (
          <div className="welcome__news">
            <span className="welcome__label">{playText('welcomeNews')}</span>
            <ul>
              {newsItems.slice(0, 3).map((item) => (
                <li key={item.key}>
                  <GameArt slug={item.art} size={26} />
                  <span>{item.text}</span>
                  <Button variant="ghost" size="sm" onClick={() => goTo(item.to)}>
                    {item.action}
                  </Button>
                </li>
              ))}
            </ul>
          </div>
        )}

        {next && (
          <p className="welcome__next">
            <span className="welcome__label">{playText('welcomeNext')}</span>
            <strong>{pick(next.lesson.title)}</strong>
          </p>
        )}
      </div>
    </Modal>
  )
}
