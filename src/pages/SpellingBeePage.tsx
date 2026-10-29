/**
 * SpellingBeePage.tsx — SPELLING BEE CHƠI MỘT MÌNH: /games/spelling
 * ----------------------------------------------------------------------------
 * 1. Chọn chủ đề, số câu (mỗi câu 15 giây)
 * 2. Chơi (SoloQuestionRunner): nghe từ -> gõ đúng chính tả
 * 3. Kết quả: điểm, có phá kỷ lục không, bảng kỷ lục cả nhà
 * (v3) Giao diện làm lại: cột trái chọn ván / chơi / kết quả (mascot ăn mừng khi phá kỷ lục),
 *      cột phải bảng kỷ lục cả nhà (dòng của mình tô nổi).
 * ----------------------------------------------------------------------------
 */
import { useEffect, useState } from 'react'
import { generateSpellingQuestions, type GameQuestion } from '../game-questions/question-bank'
import { SoloQuestionRunner, type SoloRunResult } from '../games/SoloQuestionRunner'
import { TopicSelect } from '../games/TopicSelect'
import { Button, fireConfetti, Mascot, playSound, SegmentedControl } from '../design-system'
import { GameArt } from '../features/playground/components/GameArt'
import { PlayPageHeader } from '../features/playground/components/PlayPageHeader'
import { RankRow } from '../features/playground/components/RankRow'
import { miniGameInfo } from '../features/playground/game-catalog'
import { usePlayText } from '../features/playground/playground-text'
import { useFamily } from '../family-members/family-store'
import { useAuth } from '../services/auth-context'
import { useProgress } from '../learning-progress/progress-store'
import { api } from '../services/api-client'
import { useLanguage } from '../translations/language-context'
import '../features/playground/styles/play-kit.css'
import '../features/playground/styles/game.css'
import '../features/playground/styles/word-games.css'

/** Tên trò trong game-catalog.ts / bảng kỷ lục (functions/api/games/records.ts) */
const GAME_ID = 'spelling'
const SECONDS_PER_QUESTION = 15

export function SpellingBeePage() {
  const { t } = useLanguage()
  const playText = usePlayText()
  const { user } = useAuth()
  const { memberById } = useFamily()
  const { recordActivity } = useProgress()
  const [topicId, setTopicId] = useState('fun:animals')
  const [count, setCount] = useState(10)
  const [phase, setPhase] = useState<'setup' | 'playing' | 'result'>('setup')
  const [questions, setQuestions] = useState<GameQuestion[]>([])
  const [result, setResult] = useState<(SoloRunResult & { isNewRecord: boolean }) | null>(null)
  const [records, setRecords] = useState<{ userId: number; displayName: string; bestScore: number }[]>([])

  useEffect(() => {
    api.getGameRecords(GAME_ID).then((data) => setRecords(data.records)).catch(() => {})
  }, [phase])

  function start() {
    const generated = generateSpellingQuestions(topicId, count, Math.floor(Math.random() * 2 ** 31))
    if (generated.length === 0) return
    setQuestions(generated)
    setPhase('playing')
  }

  async function finish(run: SoloRunResult) {
    recordActivity('miniGames')
    let isNewRecord = false
    try {
      const saved = await api.submitGameScore(GAME_ID, run.score)
      // 0 điểm không tính là "kỷ lục mới" (tránh pháo giấy khi sai hết)
      isNewRecord = saved.isNewRecord && run.score > 0
    } catch {
      /* mất mạng: vẫn hiện điểm */
    }
    setResult({ ...run, isNewRecord })
    playSound(isNewRecord ? 'levelUp' : 'complete')
    if (isNewRecord) fireConfetti()
    setPhase('result')
  }

  const enoughQuestions = generateSpellingQuestions(topicId, count, 1).length
  const art = miniGameInfo(GAME_ID)

  return (
    <main className="page pg-page word-games">
      <PlayPageHeader back art={art?.art} artPlate={art?.plate} title={t('game_spelling')} intro={t('gameDesc_spelling')} />

      <div className="wg-solo-layout">
        <div>
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
              </div>
              {enoughQuestions < count && <p className="pg-note pg-note--gold">{t('notEnoughQuestions', { n: enoughQuestions })}</p>}
              <div className="wg-setup__footer">
                <Button variant="ghost" to="/play">
                  {playText('soloBackToPlay')}
                </Button>
                <Button size="lg" disabled={enoughQuestions === 0} onClick={start} iconLeft="play-fill">
                  {t('start')}
                </Button>
              </div>
            </section>
          )}

          {phase === 'playing' && <SoloQuestionRunner questions={questions} secondsPerQuestion={SECONDS_PER_QUESTION} onFinish={finish} />}

          {phase === 'result' && result && (
            <section className="pg-panel wg-result">
              <Mascot pose={result.isNewRecord ? 'celebrate' : result.correct >= result.total / 2 ? 'happy' : 'thumbs-up'} size={140} />
              <h2>{result.isNewRecord ? t('newRecord') : t('gameOver')}</h2>
              <div className="wg-result__score">
                <strong className="ds-num">{result.score}</strong>
                <span>
                  {playText('soloCorrectOf', { n: result.correct, total: result.total })}
                  {result.bestCombo >= 3 && ` · ${playText('soloCombo', { n: result.bestCombo })}`}
                </span>
              </div>
              {result.isNewRecord && (
                <span className="wg-record">
                  <GameArt slug="trophy" size={24} /> {t('newRecord')}
                </span>
              )}
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
            <p className="wg-empty">{t('noRecordsYet')}</p>
          ) : (
            <ol className="pg-rank-list pg-rank-list--compact">
              {records.map((record, index) => (
                <RankRow
                  key={record.userId}
                  rank={index + 1}
                  name={record.displayName}
                  avatar={{ avatarItemId: memberById(record.userId)?.avatar }}
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
