/**
 * SpellingBeePage.tsx — SPELLING BEE CHƠI MỘT MÌNH: /games/spelling
 * ----------------------------------------------------------------------------
 * 1. Chọn chủ đề, số câu + nhịp chơi (Thong thả không đồng hồ / Tính giờ 15 giây mỗi câu)
 * 2. Chơi (SoloQuestionRunner): nghe từ -> gõ đúng chính tả
 * 3. Kết quả: màn kết quả chung của Trò chơi chữ (RoundResult — điểm, kỷ lục, từ cần ôn)
 * Cột phải: bảng kỷ lục chung (GameRecordsPanel — của bạn / cả nhà tuần này / kỷ lục nhà).
 * Khung trang, màn kết quả, bảng kỷ lục dùng chung với 4 trò còn lại (src/features/word-games/).
 * ----------------------------------------------------------------------------
 */
import { useCallback, useState } from 'react'
import { findWordImage } from '../content/word-image-catalog'
import { generateSpellingQuestions, type GameQuestion } from '../game-questions/question-bank'
import { SoloQuestionRunner, type SoloRunResult } from '../games/SoloQuestionRunner'
import { TopicSelect } from '../games/TopicSelect'
import { Button, fireConfetti, playSound, SegmentedControl } from '../design-system'
import { PlayPageHeader } from '../features/playground/components/PlayPageHeader'
import { wordGameInfo } from '../features/playground/game-catalog'
import { usePlayText } from '../features/playground/playground-text'
import { GameRecordsPanel } from '../features/word-games/components/GameRecordsPanel'
import { RoundResult, type SavedScore } from '../features/word-games/components/RoundResult'
import type { WordOutcome } from '../features/word-games/round-rules'
import { saveRoundScore } from '../features/word-games/save-round-score'
import { useGameBoard } from '../features/word-games/use-game-board'
import { useWordGamesText } from '../features/word-games/word-games-text'
import { useProgress } from '../learning-progress/progress-store'
import { useLanguage } from '../translations/language-context'
import '../features/playground/styles/play-kit.css'
import '../features/playground/styles/game.css'
import '../features/playground/styles/word-games.css'
import '../features/word-games/styles/word-games-kit.css'

/** Tên trò trong game-catalog.ts / bảng kỷ lục (backend-helpers/word-game-names.ts) */
const GAME_ID = 'spelling'
const SECONDS_PER_QUESTION = 15

export function SpellingBeePage() {
  const { t, pick } = useLanguage()
  const playText = usePlayText()
  const text = useWordGamesText()
  const { recordActivity } = useProgress()
  const [topicId, setTopicId] = useState('fun:animals')
  const [count, setCount] = useState(10)
  // Nhịp chơi: mặc định "Thong thả" (không đồng hồ) như 2 trò mới; "Tính giờ" = 15 giây / từ
  const [timed, setTimed] = useState(false)
  const [phase, setPhase] = useState<'setup' | 'playing' | 'result'>('setup')
  const [questions, setQuestions] = useState<GameQuestion[]>([])
  const [result, setResult] = useState<SoloRunResult | null>(null)
  const [saved, setSaved] = useState<SavedScore | null | undefined>(undefined)
  const [boardKey, setBoardKey] = useState(0)
  const board = useGameBoard(boardKey)
  const info = wordGameInfo(GAME_ID)!

  const start = useCallback(() => {
    const generated = generateSpellingQuestions(topicId, count, Math.floor(Math.random() * 2 ** 31))
    if (generated.length === 0) return
    setQuestions(generated)
    setResult(null)
    setSaved(undefined)
    setPhase('playing')
  }, [topicId, count])

  async function finish(run: SoloRunResult) {
    recordActivity('miniGames')
    setResult(run)
    setPhase('result')
    const savedScore = await saveRoundScore(GAME_ID, run.score)
    setSaved(savedScore)
    setBoardKey((key) => key + 1)
    playSound(savedScore?.isNewRecord ? 'levelUp' : 'complete')
    if (savedScore?.isNewRecord) fireConfetti()
  }

  // các từ sai -> danh sách "từ cần ôn" ở màn kết quả
  const wrongWords: WordOutcome[] = result
    ? questions
        .filter((question) => result.wrongIds.includes(question.id))
        .map((question) => ({ word: question.answer, meaningVi: question.meaningVi ?? '', imageSlug: findWordImage(question.answer), correct: false, points: 0 }))
    : []

  const enoughQuestions = generateSpellingQuestions(topicId, count, 1).length

  return (
    <main className="page pg-page word-games wk-page">
      <PlayPageHeader back={{ to: '/play', label: text('backToHub') }} art={info.art} artPlate={info.plate} title={pick(info.title)} intro={pick(info.description)} />

      <div className={`wg-solo-layout ${phase === 'playing' ? 'is-playing' : ''}`}>
        <div className="wk-main">
          {phase === 'setup' && (
            <section className="pg-panel wg-setup" aria-labelledby="solo-setup-title">
              <h2 id="solo-setup-title" className="pg-panel__title">
                {playText('soloSetup')}
              </h2>
              <div className="wg-setup__row">
                <div className="pg-field">
                  <label className="pg-field__label" htmlFor="solo-topic">
                    {t('topic')}
                  </label>
                  <TopicSelect id="solo-topic" value={topicId} onChange={setTopicId} />
                </div>
                <div className="pg-field">
                  <span className="pg-field__label">{t('questionCountLabel')}</span>
                  <SegmentedControl<number> label={t('questionCountLabel')} value={count} onChange={setCount} options={[5, 10, 20].map((n) => ({ value: n, label: String(n) }))} />
                </div>
                <div className="pg-field">
                  <span className="pg-field__label">{text('setupPace')}</span>
                  <SegmentedControl<'relaxed' | 'timed'>
                    label={text('setupPace')}
                    value={timed ? 'timed' : 'relaxed'}
                    onChange={(value) => setTimed(value === 'timed')}
                    options={[
                      { value: 'relaxed', label: text('paceRelaxed') },
                      { value: 'timed', label: text('paceTimed') },
                    ]}
                  />
                  <span className="pg-field__hint">{timed ? text('paceTimedHint', { n: SECONDS_PER_QUESTION }) : text('paceRelaxedHint')}</span>
                </div>
              </div>
              {enoughQuestions < count && <p className="pg-note pg-note--gold">{t('notEnoughQuestions', { n: enoughQuestions })}</p>}
              <div className="wg-setup__footer">
                <Button size="lg" disabled={enoughQuestions === 0} onClick={start} iconLeft="play-fill">
                  {t('start')}
                </Button>
              </div>
            </section>
          )}

          {phase === 'playing' && <SoloQuestionRunner questions={questions} secondsPerQuestion={timed ? SECONDS_PER_QUESTION : null} onFinish={(run) => void finish(run)} />}

          {phase === 'result' && result && (
            <RoundResult
              score={result.score}
              correct={result.correct}
              total={result.total}
              bestStreak={result.bestCombo}
              words={wrongWords}
              showReview
              saved={saved}
              onPlayAgain={start}
              onChangeSettings={() => setPhase('setup')}
            />
          )}
        </div>

        {phase !== 'playing' && <GameRecordsPanel game={GAME_ID} board={board} />}
      </div>
    </main>
  )
}
