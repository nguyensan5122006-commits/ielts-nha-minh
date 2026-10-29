/**
 * WordChainSoloPage.tsx — NỐI TỪ VỚI MÁY (chơi một mình)
 * ----------------------------------------------------------------------------
 * Luật: từ sau phải bắt đầu bằng chữ cái cuối của từ trước (apple -> egg -> green...).
 *   - Từ phải có trong từ điển tiếng Anh (~125.000 từ), ít nhất 3 chữ, chưa dùng.
 *   - Mỗi lượt 15 giây. Hết giờ = thua. Máy hết từ = bạn thắng (+50 điểm).
 *   - Điểm mỗi từ: 10 + 2 × (số chữ - 3) -> từ dài nhiều điểm hơn.
 * Máy chỉ dùng từ trong bài học & Học vui (từ quen thuộc), nên học càng nhiều càng dễ thắng máy.
 * (v3) Giao diện làm lại: chữ cái bắt buộc to ở giữa, chuỗi từ dạng viên kẹo, mascot khi kết thúc.
 * ----------------------------------------------------------------------------
 */
import { useCallback, useEffect, useMemo, useRef, useState, type FormEvent } from 'react'
import { allFunCards } from '../content/all-fun-topics'
import { allLessonWords } from '../content/lesson-registry'
import { TimerBar, TimerBarIdle } from '../games/GameQuestionView'
import { Button, Mascot, playSound } from '../design-system'
import { BananaPill } from '../features/playground/components/BananaPill'
import { GameArt } from '../features/playground/components/GameArt'
import { PlayPageHeader } from '../features/playground/components/PlayPageHeader'
import { usePlayText } from '../features/playground/playground-text'
import { useProgress } from '../learning-progress/progress-store'
import { useWallet } from '../player-wallet/wallet-store'
import { api } from '../services/api-client'
import { speak } from '../services/text-to-speech'
import { useLanguage } from '../translations/language-context'
import '../features/playground/styles/play-kit.css'
import '../features/playground/styles/game.css'
import '../features/playground/styles/battle.css'
import '../features/playground/styles/events.css'

const TURN_MS = 15_000
const COMPUTER_THINK_MS = 1200
const STARTING_WORDS = ['apple', 'house', 'water', 'happy', 'green', 'music', 'tiger', 'river', 'school', 'family']

let dictionaryPromise: Promise<Set<string>> | null = null
/** Tải từ điển 1 lần (file ~1MB, trình duyệt tự nén khi tải). */
export function loadDictionary(): Promise<Set<string>> {
  dictionaryPromise ??= fetch('/dictionary/english-words.txt')
    .then((response) => response.text())
    .then((text) => new Set(text.split('\n').map((w) => w.trim()).filter(Boolean)))
  return dictionaryPromise
}

/** Từ quen thuộc máy được dùng: từ đơn trong Học vui + từ vựng bài học. */
function computerVocabulary(): string[] {
  const words = [
    ...allFunCards().map((c) => c.word),
    ...allLessonWords().map((w) => w.word),
  ]
  return [...new Set(words.map((w) => w.toLowerCase()).filter((w) => /^[a-z]{3,}$/.test(w)))]
}

const wordPoints = (word: string) => 10 + Math.max(0, word.length - 3) * 2

export function WordChainSoloPage() {
  const { t } = useLanguage()
  const playText = usePlayText()
  const { recordActivity } = useProgress()
  const { refreshWallet } = useWallet()
  const vocabulary = useMemo(computerVocabulary, [])
  const [dictionary, setDictionary] = useState<Set<string> | null>(null)
  const [phase, setPhase] = useState<'ready' | 'playing' | 'over'>('ready')
  const [chain, setChain] = useState<{ by: 'me' | 'computer' | 'start'; word: string }[]>([])
  const [turn, setTurn] = useState<'me' | 'computer'>('me')
  const [turnStartedAt, setTurnStartedAt] = useState(0)
  const [input, setInput] = useState('')
  const [message, setMessage] = useState('')
  const [score, setScore] = useState(0)
  const [outcome, setOutcome] = useState<{ won: boolean; reason: string; isNewRecord: boolean; bananas: number } | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    void loadDictionary().then(setDictionary)
  }, [])

  const lastWord = chain[chain.length - 1]?.word ?? ''
  const requiredLetter = lastWord.slice(-1)
  const used = useMemo(() => new Set(chain.map((c) => c.word)), [chain])

  const endGame = useCallback(
    async (won: boolean, reason: string, finalScore: number) => {
      setPhase('over')
      playSound(won ? 'complete' : 'oops')
      recordActivity('miniGames')
      let isNewRecord = false
      let bananas = 0
      try {
        const saved = await api.submitGameScore('word-chain', finalScore)
        // 0 điểm (lượt đầu, hết giờ chưa gõ chữ nào) không phải "kỷ lục mới" dù máy chủ coi lượt đầu là kỷ lục
        isNewRecord = saved.isNewRecord && finalScore > 0
        bananas = saved.bananas
        void refreshWallet()
      } catch {
        /* bỏ qua */
      }
      setOutcome({ won, reason, isNewRecord, bananas })
    },
    [recordActivity, refreshWallet],
  )

  function start() {
    const first = STARTING_WORDS[Math.floor(Math.random() * STARTING_WORDS.length)]
    setChain([{ by: 'start', word: first }])
    setScore(0)
    setOutcome(null)
    setMessage('')
    setTurn('me')
    setTurnStartedAt(Date.now())
    setPhase('playing')
    window.setTimeout(() => inputRef.current?.focus(), 50)
  }

  // lượt của máy
  useEffect(() => {
    if (phase !== 'playing' || turn !== 'computer') return
    const timer = window.setTimeout(() => {
      const options = vocabulary.filter((w) => w.startsWith(requiredLetter) && !used.has(w))
      if (options.length === 0) {
        const finalScore = score + 50
        setScore(finalScore)
        void endGame(true, t('computerGaveUp'), finalScore)
        return
      }
      const word = options[Math.floor(Math.random() * options.length)]
      void speak(word)
      setChain((current) => [...current, { by: 'computer', word }])
      setTurn('me')
      setTurnStartedAt(Date.now())
      window.setTimeout(() => inputRef.current?.focus(), 50)
    }, COMPUTER_THINK_MS)
    return () => window.clearTimeout(timer)
  }, [phase, turn, vocabulary, requiredLetter, used, score, endGame, t])

  // hết giờ lượt của mình
  useEffect(() => {
    if (phase !== 'playing' || turn !== 'me') return
    const timer = window.setTimeout(() => void endGame(false, t('timeUp'), score), Math.max(0, turnStartedAt + TURN_MS - Date.now()))
    return () => window.clearTimeout(timer)
  }, [phase, turn, turnStartedAt, score, endGame, t])

  function submit(event: FormEvent) {
    event.preventDefault()
    const word = input.trim().toLowerCase()
    if (!dictionary || turn !== 'me') return
    if (!/^[a-z]{3,}$/.test(word)) return setMessage(t('chainRuleLetters'))
    if (word[0] !== requiredLetter) return setMessage(t('chainRuleStart', { letter: requiredLetter.toUpperCase() }))
    if (used.has(word)) return setMessage(t('chainRuleUsed'))
    if (!dictionary.has(word)) return setMessage(t('chainRuleDictionary'))
    setMessage('')
    setInput('')
    setScore((s) => s + wordPoints(word))
    playSound('correct')
    setChain((current) => [...current, { by: 'me', word }])
    setTurn('computer')
  }

  return (
    <main className="page pg-page pg-page--narrow events">
      <PlayPageHeader back art="link" artPlate="primary" title={t('game_word-chain')} intro={t('gameDesc_word-chain')} />

      {phase === 'ready' && (
        <section className="pg-panel ev-result">
          <Mascot pose="thinking" size={120} />
          <p className="ev-chain-start" aria-label="apple, egg, green, night">
            <span>apple</span>
            <i>→</i>
            <span>egg</span>
            <i>→</i>
            <span>green</span>
            <i>→</i>
            <span>night</span>
            <i>→ …</i>
          </p>
          <Button size="lg" disabled={!dictionary} loading={!dictionary} onClick={start} iconLeft={dictionary ? 'play-fill' : undefined}>
            {dictionary ? t('start') : t('loading')}
          </Button>
        </section>
      )}

      {phase !== 'ready' && (
        <section className={`gq-card bt-chain ${phase === 'playing' && turn === 'me' ? 'is-my-turn' : ''}`}>
          <div className="gq-stage__bar">
            <span className="gq-chip">{t('wordsInChain', { n: chain.length - 1 })}</span>
            <span className="gq-score">
              <span className="gq-score__label">{playText('soloScore')}</span>
              <strong className="ds-num" key={`score-${score}`}>
                {score}
              </strong>
            </span>
          </div>

          {phase === 'playing' && (
            <>
              {turn === 'me' ? <TimerBar key={turnStartedAt} startedAt={turnStartedAt} durationMs={TURN_MS} /> : <TimerBarIdle />}
              <div className="bt-chain__turn">
                {turn === 'me' ? (
                  <>
                    <span className="bt-chain__who">{t('yourTurnLetter')}</span>
                    <span className="bt-chain__letter" key={`letter-${requiredLetter}`}>
                      {requiredLetter.toUpperCase()}
                    </span>
                  </>
                ) : (
                  <span className="bt-chain__who ev-chain-thinking">
                    <span className="bt-waiting__dots" aria-hidden>
                      <i />
                      <i />
                      <i />
                    </span>
                    {t('computerThinking')}
                  </span>
                )}
              </div>
            </>
          )}

          <div className="bt-chain__words" aria-live="polite">
            {chain.map((item, index) => (
              <span key={index} className={`bt-chain__word ${item.by === 'me' ? 'is-me' : item.by === 'start' ? 'is-start' : ''}`}>
                {item.word}
              </span>
            ))}
          </div>

          {phase === 'playing' && (
            <>
              <form onSubmit={submit} className="gq-type">
                <input
                  ref={inputRef}
                  className="pg-input pg-input--big"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  disabled={turn !== 'me'}
                  autoComplete="off"
                  autoCapitalize="off"
                  spellCheck={false}
                  aria-label={t('yourTurnLetter')}
                />
                <Button type="submit" size="lg" disabled={turn !== 'me' || !input.trim()}>
                  {t('submit')}
                </Button>
              </form>
              {message && <p className="pg-note pg-note--oops">{message}</p>}
            </>
          )}

          {phase === 'over' && outcome && (
            <div className="ev-result">
              <Mascot pose={outcome.won ? 'celebrate' : 'comfort'} size={120} />
              <h2>{outcome.won ? t('youWin') : t('gameOver')}</h2>
              <p className="ev-empty">{outcome.reason}</p>
              <div className="ev-result__score">
                <strong className="ds-num">{score}</strong>
                {outcome.isNewRecord && (
                  <span className="ev-record">
                    <GameArt slug="trophy" size={24} /> {t('newRecord')}
                  </span>
                )}
              </div>
              {outcome.bananas > 0 && <BananaPill amount={outcome.bananas} signed size="lg" />}
              <div className="pg-actions">
                <Button variant="secondary" to="/play">
                  {playText('soloBackToPlay')}
                </Button>
                <Button size="lg" onClick={start} iconLeft="review">
                  {t('playAgain')}
                </Button>
              </div>
            </div>
          )}
        </section>
      )}
    </main>
  )
}
