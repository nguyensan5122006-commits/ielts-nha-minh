/**
 * KidsHubPage.tsx — SẢNH KHU VUI CHƠI (/kids) — trang chủ của tài khoản bé
 * ----------------------------------------------------------------------------
 * Từ trên xuống (07-KIDS-ZONE mục 2):
 *   Đầu trang : ảnh đại diện + tên · thẻ "Tem tuần" (7 ô, mục tiêu 4/7 — không phải chuỗi)
 *               · "Hôm nay 14 phút" (mờ, ở góc) · nút âm thanh · về trang chính
 *   Giữa      : Ki chào bằng giọng + phụ đề · thẻ to "Chơi tiếp" · chọn mục tiêu 1/2/3 lượt
 *   "Hôm nay chọn 1 trong 3": 3 thẻ trò × chủ đề, mỗi thẻ "≈ 3 phút"
 *   Dưới      : Sổ sticker · Tủ đồ của Ki · Học bài · Thử thách cả nhà · Tất cả trò chơi (8 trò)
 * ----------------------------------------------------------------------------
 */
import { useMemo, useState, type CSSProperties } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import type { KidsTopic, KidsWord } from '../../../content/content-types'
import { KIDS_OUTFITS } from '../../../content/kids'
import { kidsWordsDueToday } from '../../../learning-progress/kids-word-boxes'
import { Avatar } from '../../../design-system/components/Avatar'
import { Icon } from '../../../design-system/components/Icon'
import { fillMascotName } from '../../../design-system/mascot-name'
import { useSoundSettings } from '../../../design-system/sound-kit'
import { addDays, todayString, weekIdOf, weekStartDay } from '../../../learning-progress/study-calendar'
import { useLanguage } from '../../../translations/language-context'
import { KidsPicture } from '../game-engine/components/KidsPicture'
import { MascotSays } from '../game-engine/components/MascotSays'
import { SkyWorld } from '../game-engine/components/SkyWorld'
import { DEFAULT_DAILY_GOAL, getDailyGoal, setDailyGoal } from '../game-engine/kids-day-log'
import { playSound } from '../game-engine/kids-sounds'
import { DAILY_SOFT_LIMIT_SECONDS, usePlayTime } from '../game-engine/play-time'
import { KIDS_GAME_CARDS, READY_GAME_IDS } from '../games/game-registry'
import { useKidsData } from '../kids-data/kids-data-context'
import { albumTotals, equippedOutfitId, isOutfitOwned, topicStickerProgress } from '../kids-data/kids-rewards'
import { findKidsWord, hasPicture, pickActiveTopic } from '../kids-data/kids-word-bank'
import { useKidsText } from '../kids-text'
import type { KidsGameId } from '../game-engine/engine-types'
import { pickContinueChoice, pickTodayChoices, type GameChoice } from './today-choices'
import './kids-hub.css'

const STAMP_GOAL = 4
const FAMILY_WEEK_GOAL = 15

/** Trò có từ nào dùng được trong chủ đề không (đúng luật chọn từ của round-builder: cần ảnh? + bộ lọc của trò). */
function gameFitsTopic(gameId: KidsGameId, topic: KidsTopic): boolean {
  // Phiêu lưu cùng Ki chơi theo CHƯƠNG TRUYỆN, không theo chủ đề -> không ghép vào thẻ "trò × chủ đề"
  if (gameId === 'patrol-adventure') return false
  const definition = KIDS_GAME_CARDS.find((card) => card.id === gameId)?.definition
  if (!definition) return true
  return topic.words.some((word) => (!definition.needsPicture || hasPicture(word)) && (!definition.wordFilter || definition.wordFilter(word)))
}

export function KidsHubPage() {
  const text = useKidsText()
  const { pick } = useLanguage()
  const { kids, kidName, basePath } = useKidsData()
  const playTime = usePlayTime()
  const navigate = useNavigate()
  const sound = useSoundSettings()
  const today = todayString()

  const [goal, setGoal] = useState(getDailyGoal)
  const roundsToday = kids.roundsByDay[today] ?? 0

  const continueChoice = useMemo(() => pickContinueChoice(kids, today, READY_GAME_IDS), [kids, today])
  const choices = useMemo(() => pickTodayChoices(kids, today, READY_GAME_IDS, gameFitsTopic), [kids, today])
  const activeTopic = pickActiveTopic(kids)
  // Ảnh trên nút "Chơi tiếp": từ đến hạn ôn trước, thiếu thì lấy từ mới của chủ đề đang học
  const continueArt = useMemo(() => {
    const due = kidsWordsDueToday(kids, today).map(findKidsWord)
    const upcoming = activeTopic.words.filter((w) => !kids.words[w.id])
    return [...due, ...upcoming].filter((w): w is KidsWord => !!w && !!w.image).slice(0, 3)
  }, [kids, today, activeTopic])
  const album = albumTotals(kids)
  const ownedOutfits = KIDS_OUTFITS.filter((outfit) => isOutfitOwned(kids, outfit)).length

  // Tem tuần: 7 ô thứ Hai -> Chủ nhật
  const monday = weekStartDay(today)
  const stampedDays = kids.weeklyStamps[weekIdOf(today)] ?? []
  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(monday, i))
  const stampCount = weekDays.filter((day) => stampedDays.includes(day)).length
  const weekRounds = weekDays.reduce((sum, day) => sum + (kids.roundsByDay[day] ?? 0), 0)

  const minutesToday = Math.floor(playTime.secondsToday / 60)
  const playHref = (choice: GameChoice) => `${basePath}/play/${choice.gameId}${choice.topic ? `?topic=${choice.topic.id}` : ''}`
  // tên trò có thể chứa {mascot} (VD "Phiêu lưu cùng {mascot}")
  const gameTitle = (id: string) => fillMascotName(pick(KIDS_GAME_CARDS.find((card) => card.id === id)?.title))

  const chooseGoal = (value: number) => {
    playSound('tap')
    setDailyGoal(value)
    setGoal(value)
  }

  return (
    <SkyWorld className="kz-hub-world">
      <div className="kz-hub">
        {/* ---------------- đầu trang ---------------- */}
        <header className="kz-hub__header">
          <div className="kz-hub__me">
            <Avatar name={kidName} size={56} ring="primary" />
            <div>
              <p className="kz-hub__name">{kidName}</p>
              <p className="kz-hub__time" title={text.timeToday(minutesToday)}>
                <span className="kz-hub__time-bar" style={{ '--fill': `${Math.min(100, (playTime.secondsToday / DAILY_SOFT_LIMIT_SECONDS) * 100)}%` } as CSSProperties} />
                {text.timeToday(minutesToday)}
              </p>
            </div>
          </div>

          <div className="kz-stamps kz-glass" aria-label={`${text.stampCard}: ${text.stampGoal(stampCount, STAMP_GOAL)}`}>
            <span className="kz-stamps__title">{text.stampCard}</span>
            <ol className="kz-stamps__days">
              {weekDays.map((day, index) => (
                <li key={day} className={['kz-stamps__day', stampedDays.includes(day) && 'is-stamped', day === today && 'is-today'].filter(Boolean).join(' ')}>
                  <span className="kz-stamps__mark">{stampedDays.includes(day) ? <KidsPicture slug="paw-prints" word="stamp" size={26} decorative /> : null}</span>
                  <span className="kz-stamps__label">{text.weekdays[index]}</span>
                </li>
              ))}
            </ol>
            <span className={['kz-stamps__count', stampCount >= STAMP_GOAL && 'is-done'].filter(Boolean).join(' ')}>{text.stampGoal(stampCount, STAMP_GOAL)}</span>
          </div>

          <div className="kz-hub__tools">
            <button type="button" className="kz-round-btn" onClick={sound.toggleMuted} aria-pressed={sound.muted} aria-label={sound.muted ? text.soundOn : text.soundOff} title={sound.muted ? text.soundOn : text.soundOff}>
              <Icon name={sound.muted ? 'volume-off' : 'volume'} size={24} />
            </button>
            {/* QA: "/" với tài khoản bé tự quay về /kids -> nút không làm gì. Trang chính của web lớn = /learn
                (có thanh menu trái, mục "Khu vui chơi" để quay lại đây). */}
            <Link to="/learn" className="kz-hub__main-link">
              {text.mainSite}
            </Link>
          </div>
        </header>

        {/* ---------------- Ki chào + Chơi tiếp ---------------- */}
        <section className="kz-hub__hero">
          <MascotSays pose="wave" text={text.hubGreeting(kidName)} mascotSize={210} outfitId={equippedOutfitId(kids)} className="kz-hub__greeting" />

          <div className="kz-continue">
            {continueChoice && (
              <button type="button" className="kz-continue__card" onClick={() => navigate(playHref(continueChoice))}>
                {/* 3 từ đang chờ ôn (hoặc từ mới sắp học) xoè ra như bộ bài */}
                <span className="kz-continue__art" aria-hidden>
                  {continueArt.map((word, i) => (
                    <KidsPicture key={word.id} slug={word.image} word={word.word} size={i === 1 ? 96 : 74} className={`kz-continue__art-${i}`} decorative />
                  ))}
                </span>
                <span className="kz-continue__text">
                  <span className="kz-continue__title">
                    {text.playOn} <Icon name="arrow-right" size={34} strokeWidth={3} />
                  </span>
                  <span className="kz-continue__hint">{text.playOnHint(gameTitle(continueChoice.gameId), continueChoice.dueCount)}</span>
                </span>
              </button>
            )}
            <div className="kz-goal kz-glass">
              <span className="kz-goal__title">{text.goalTitle}</span>
              <div className="kz-goal__options" role="radiogroup" aria-label={text.goalTitle}>
                {[1, 2, 3].map((value) => (
                  <button key={value} type="button" role="radio" aria-checked={goal === value} className="kz-goal__option" onClick={() => chooseGoal(value)}>
                    {text.goalOption(value)}
                  </button>
                ))}
              </div>
              <span className={['kz-goal__progress', roundsToday >= goal && 'is-done'].filter(Boolean).join(' ')}>
                {roundsToday >= goal && <Icon name="check" size={18} strokeWidth={3} />}
                {text.goalProgress(roundsToday, goal || DEFAULT_DAILY_GOAL)}
              </span>
            </div>
          </div>
        </section>

        {/* ---------------- Hôm nay chọn 1 trong 3 ---------------- */}
        <section className="kz-hub__section" aria-labelledby="kz-picks-title">
          <h2 id="kz-picks-title" className="kz-hub__section-title">
            {text.todayPicks}
          </h2>
          <div className="kz-picks">
            {choices.map((choice, index) => {
              const card = KIDS_GAME_CARDS.find((c) => c.id === choice.gameId)!
              const topicWords = choice.topic?.words.filter((w) => w.image).slice(0, 3) ?? []
              return (
                <Link key={`${choice.gameId}-${choice.topic?.id}`} to={playHref(choice)} className="kz-pick kz-card" style={{ '--accent': card.accent, '--i': index } as CSSProperties}>
                  <span className="kz-pick__art" aria-hidden>
                    {(topicWords.length === 3 ? topicWords.map((w) => w.image) : card.art).map((slug, i) => (
                      <KidsPicture key={i} slug={slug} word={slug} size={i === 1 ? 96 : 72} className={`kz-pick__img kz-pick__img--${i}`} decorative />
                    ))}
                  </span>
                  <span className="kz-pick__body">
                    <span className="kz-pick__title">{gameTitle(card.id)}</span>
                    <span className="kz-pick__meta">
                      {choice.topic && <span className="kz-chip">{pick(choice.topic.title)}</span>}
                      {choice.dueCount > 0 && <span className="kz-chip kz-chip--up">↻ {choice.dueCount}</span>}
                      <span className="kz-pick__time">{text.aboutMinutes}</span>
                    </span>
                  </span>
                  <span className="kz-pick__play" aria-hidden>
                    <Icon name="play-fill" size={22} />
                  </span>
                </Link>
              )
            })}
          </div>
        </section>

        {/* ---------------- Sổ sticker · Tủ đồ · Học bài · Cả nhà ---------------- */}
        <section className="kz-tiles">
          <Link to={`${basePath}/album`} className="kz-tile kz-card">
            <span className="kz-tile__art kz-tile__art--album" aria-hidden>
              {kids.stickers.slice(-3).map((id, i) => {
                const word = findKidsWord(id)
                return word?.image ? <KidsPicture key={id} slug={word.image} word={word.word} size={46} className={`kz-tile__sticker kz-tile__sticker--${i}`} decorative /> : null
              })}
              {kids.stickers.length === 0 && <KidsPicture slug="framed-picture" word="album" size={56} decorative />}
            </span>
            <span className="kz-tile__title">{text.albumCard}</span>
            <span className="kz-tile__hint">{text.albumCardHint(album.collected, album.total)}</span>
            <span className="kz-tile__bar" style={{ '--fill': `${(topicStickerProgress(kids, activeTopic).collected / Math.max(1, activeTopic.words.length)) * 100}%` } as CSSProperties} />
          </Link>
          <Link to={`${basePath}/wardrobe`} className="kz-tile kz-card">
            <span className="kz-tile__art" aria-hidden>
              <KidsPicture slug="t-shirt" word="wardrobe" size={56} decorative />
            </span>
            <span className="kz-tile__title">{text.wardrobeCard}</span>
            <span className="kz-tile__hint">{text.wardrobeCardHint(ownedOutfits, KIDS_OUTFITS.length)}</span>
          </Link>
          <Link to="/learn" className="kz-tile kz-card">
            <span className="kz-tile__art" aria-hidden>
              <KidsPicture slug="books" word="learn" size={56} decorative />
            </span>
            <span className="kz-tile__title">{text.learnCard}</span>
            <span className="kz-tile__hint">{text.learnCardHint}</span>
          </Link>
          <div className="kz-tile kz-card kz-tile--static">
            <span className="kz-tile__art" aria-hidden>
              <KidsPicture slug="house-with-garden" word="family" size={56} decorative />
            </span>
            <span className="kz-tile__title">{text.familyCard}</span>
            <span className="kz-tile__hint">{text.familyCardHint(Math.min(weekRounds, FAMILY_WEEK_GOAL), FAMILY_WEEK_GOAL)}</span>
            <span className="kz-tile__bar" style={{ '--fill': `${Math.min(100, (weekRounds / FAMILY_WEEK_GOAL) * 100)}%` } as CSSProperties} />
          </div>
        </section>

        {/* ---------------- Tất cả trò chơi ---------------- */}
        <section className="kz-hub__section" aria-labelledby="kz-all-title">
          <h2 id="kz-all-title" className="kz-hub__section-title">
            {text.allGames}
          </h2>
          <div className="kz-all-games">
            {KIDS_GAME_CARDS.map((card) =>
              card.ready ? (
                <Link key={card.id} to={`${basePath}/play/${card.id}`} className="kz-game-tile kz-card" style={{ '--accent': card.accent } as CSSProperties}>
                  <KidsPicture slug={card.art[0]} word={card.id} size={56} decorative />
                  <span className="kz-game-tile__title">{gameTitle(card.id)}</span>
                </Link>
              ) : (
                <div key={card.id} className="kz-game-tile kz-card is-soon" aria-disabled="true">
                  <KidsPicture slug={card.art[0]} word={card.id} size={56} decorative />
                  <span className="kz-game-tile__title">{gameTitle(card.id)}</span>
                  <span className="kz-chip kz-game-tile__soon">{text.comingSoon}</span>
                </div>
              ),
            )}
          </div>
        </section>
      </div>
    </SkyWorld>
  )
}
