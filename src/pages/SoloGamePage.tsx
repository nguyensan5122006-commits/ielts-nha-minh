/**
 * SoloGamePage.tsx — CHƠI MỘT MÌNH: /games/quiz | /games/spelling | /games/sentence
 * ----------------------------------------------------------------------------
 * 1. Chọn chủ đề, số câu, thời gian mỗi câu
 * 2. Chơi (SoloQuestionRunner)
 * 3. Kết quả: điểm, có phá kỷ lục không, chuối thưởng, bảng kỷ lục cả nhà
 * (v3) Giao diện làm lại: cột trái chọn ván / chơi / kết quả (mascot ăn mừng khi phá kỷ lục),
 *      cột phải bảng kỷ lục cả nhà (dòng của mình tô nổi).
 * ----------------------------------------------------------------------------
 */
import { useEffect, useState } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import { generateQuestions, type GameQuestion, type GameType } from '../game-questions/question-bank'
import { SoloQuestionRunner, type SoloRunResult } from '../games/SoloQuestionRunner'
import { TopicSelect } from '../games/TopicSelect'
import { Button, fireConfetti, Mascot, playSound, SegmentedControl } from '../design-system'
import { BananaPill } from '../features/playground/components/BananaPill'
import { GameArt } from '../features/playground/components/GameArt'
import { PlayPageHeader } from '../features/playground/components/PlayPageHeader'
import { RankRow } from '../features/playground/components/RankRow'
import { miniGameInfo } from '../features/playground/game-catalog'
import { usePlayText } from '../features/playground/playground-text'
import { useFamily } from '../family-members/family-store'
import { useAuth } from '../services/auth-context'
import { useProgress } from '../learning-progress/progress-store'
import { useWallet } from '../player-wallet/wallet-store'
import { api } from '../services/api-client'
import { useLanguage } from '../translations/language-context'
import '../features/playground/styles/play-kit.css'
import '../features/playground/styles/game.css'
import '../features/playground/styles/events.css'

const GAME_INFO: Record<GameType, { icon: string; defaultSeconds: number }> = {
  quiz: { icon: '❓', defaultSeconds: 10 },
  spelling: { icon: '🐝', defaultSeconds: 15 },
  sentence: { icon: '🧩', defaultSeconds: 20 },
}

export function SoloGamePage() {
  const { gameType = '' } = useParams()
  const { t } = useLanguage()
  const playText = usePlayText()
  const { user } = useAuth()
  const { memberById } = useFamily()
  const { recordActivity } = useProgress()
  const { refreshWallet } = useWallet()
  const [topicId, setTopicId] = useState('fun:animals')
  const [count, setCount] = useState(10)
  const [phase, setPhase] = useState<'setup' | 'playing' | 'result'>('setup')
  const [questions, setQuestions] = useState<GameQuestion[]>([])
  const [result, setResult] = useState<(SoloRunResult & { isNewRecord: boolean; bananas: number }) | null>(null)
  const [records, setRecords] = useState<{ userId: number; displayName: string; bestScore: number }[]>([])

  const info = GAME_INFO[gameType as GameType]
  const seconds = info?.defaultSeconds ?? 10

  useEffect(() => {
    if (info) api.getGameRecords(gameType).then((data) => setRecords(data.records)).catch(() => {})
  }, [gameType, info, phase])

  if (!info) return <Navigate to="/arena" replace />

  function start() {
    const generated = generateQuestions(gameType as GameType, topicId, count, Math.floor(Math.random() * 2 ** 31))
    if (generated.length === 0) return
    setQuestions(generated)
    setPhase('playing')
  }

  async function finish(run: SoloRunResult) {
    recordActivity('miniGames')
    let isNewRecord = false
    let bananas = 0
    try {
      const saved = await api.submitGameScore(gameType, run.score)
      isNewRecord = saved.isNewRecord
      bananas = saved.bananas
      void refreshWallet()
    } catch {
      /* mất mạng: vẫn hiện điểm */
    }
    setResult({ ...run, isNewRecord, bananas })
    playSound(isNewRecord ? 'levelUp' : 'complete')
    if (isNewRecord) fireConfetti()
    setPhase('result')
  }

  const enoughQuestions = generateQuestions(gameType as GameType, topicId, count, 1).length
  const art = miniGameInfo(gameType)

  return (
    <main className="page pg-page events">
      <PlayPageHeader back art={art?.art} artPlate={art?.plate} title={t(`game_${gameType as GameType}`)} intro={t(`gameDesc_${gameType as GameType}`)} />

      <div className="ev-solo-layout">
        <div>
          {phase === 'setup' && (
            <section className="pg-panel ev-setup" aria-labelledby="solo-setup-title">
              <h2 id="solo-setup-title" className="pg-panel__title">
                {playText('soloSetup')}
              </h2>
              <div className="ev-setup__row">
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
              </div>
              {enoughQuestions < count && <p className="pg-note pg-note--gold">{t('notEnoughQuestions', { n: enoughQuestions })}</p>}
              <div className="ev-setup__footer">
                <Button variant="ghost" to="/play">
                  {playText('soloBackToPlay')}
                </Button>
                <Button size="lg" disabled={enoughQuestions === 0} onClick={start} iconLeft="play-fill">
                  {t('start')}
                </Button>
              </div>
            </section>
          )}

          {phase === 'playing' && <SoloQuestionRunner questions={questions} secondsPerQuestion={seconds} onFinish={finish} />}

          {phase === 'result' && result && (
            <section className="pg-panel ev-result">
              <Mascot pose={result.isNewRecord ? 'celebrate' : result.correct >= result.total / 2 ? 'happy' : 'thumbs-up'} size={140} />
              <h2>{result.isNewRecord ? t('newRecord') : t('gameOver')}</h2>
              <div className="ev-result__score">
                <strong className="ds-num">{result.score}</strong>
                <span>
                  {playText('soloCorrectOf', { n: result.correct, total: result.total })}
                  {result.bestCombo >= 3 && ` · ${playText('soloCombo', { n: result.bestCombo })}`}
                </span>
              </div>
              {result.isNewRecord && (
                <span className="ev-record">
                  <GameArt slug="trophy" size={24} /> {t('newRecord')}
                </span>
              )}
              {result.bananas > 0 && <BananaPill amount={result.bananas} signed size="lg" />}
              <div className="pg-actions">
                <Button variant="secondary" onClick={() => setPhase('setup')}>
                  {t('changeSettings')}
                </Button>
                <Button size="lg" onClick={start} iconLeft="review">
                  {t('playAgain')}
                </Button>
              </div>
              <Button variant="ghost" size="sm" to="/play" iconRight="arrow-right">
                {playText('soloBackToPlay')}
              </Button>
            </section>
          )}
        </div>

        {/* bảng kỷ lục cả nhà */}
        <section className="pg-panel pg-panel--tight">
          <h3 className="pg-panel__title">
            <GameArt slug="trophy" size={28} /> {t('familyRecords')}
          </h3>
          {records.length === 0 ? (
            <p className="ev-empty">{t('noRecordsYet')}</p>
          ) : (
            <ol className="pg-rank-list pg-rank-list--compact">
              {records.map((record, index) => (
                <RankRow
                  key={record.userId}
                  rank={index + 1}
                  name={record.displayName}
                  avatar={{ avatarItemId: memberById(record.userId)?.avatar, frameItemId: memberById(record.userId)?.frame }}
                  value={record.bestScore}
                  isMe={record.userId === user?.id}
                />
              ))}
            </ol>
          )}
        </section>
      </div>
    </main>
  )
}
