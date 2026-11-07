/**
 * DailyWordPage.tsx — THỬ THÁCH TỪ MỖI NGÀY (kiểu Wordle)
 * ----------------------------------------------------------------------------
 * Cả nhà cùng đoán 1 từ tiếng Anh 5 chữ cái mỗi ngày, tối đa 6 lượt.
 * Sau mỗi lượt đoán, từng ô đổi màu:
 *   🟩 xanh  : đúng chữ, đúng vị trí
 *   🟨 vàng  : có chữ này nhưng sai vị trí
 *   ⬜ xám   : từ bí ẩn không có chữ này
 * Đoán xong: so kết quả với cả nhà (chỉ hiện ô màu, không lộ từ).
 * Từ bí ẩn chọn từ các từ trong bài học & Học vui, theo ngày (giống nhau cho cả nhà).
 * (v3) Giao diện làm lại: ô chữ lật màu lần lượt, bàn phím ảo bo tròn, kết quả có mascot
 *      (đúng = ăn mừng, chưa ra = an ủi) + nghĩa + nút nghe; cột phải là kết quả cả nhà.
 * (Trò chơi chữ) Cột phải thêm bảng kỷ lục chung (GameRecordsPanel): số ngày đoán ra tuần này của cả nhà.
 * ----------------------------------------------------------------------------
 */
import { useCallback, useEffect, useMemo, useState, type CSSProperties } from 'react'
import { vietnamDay } from '../../../backend-helpers/vietnam-time'
import { allFunCards } from '../../content/all-fun-topics'
import { allLessonWords } from '../../content/lesson-registry'
import { CardImage } from '../../components/PlayerIdentity'
import { Button, Icon, IconButton, Mascot } from '../../design-system'
import { GameArt } from '../playground/components/GameArt'
import { PlayPageHeader } from '../playground/components/PlayPageHeader'
import { PLAY_ART } from '../playground/game-catalog'
import { usePlayText } from '../playground/playground-text'
import { GameRecordsPanel } from './components/GameRecordsPanel'
import { useGameBoard } from './use-game-board'
import { useWordGamesText } from './word-games-text'
import { useProgress } from '../../learning-progress/progress-store'
import { api, type DailyWordState } from '../../services/api-client'
import { speak } from '../../services/text-to-speech'
import { useLanguage } from '../../translations/language-context'
import { loadDictionary } from './WordChainSoloPage'
import '../playground/styles/play-kit.css'
import '../playground/styles/daily-word.css'
import './styles/word-games-kit.css'

const WORD_LENGTH = 5
const MAX_GUESSES = 6
type LetterState = 'correct' | 'present' | 'absent'
const STATE_EMOJI: Record<LetterState, string> = { correct: '🟩', present: '🟨', absent: '⬜' }

/** Danh sách từ 5 chữ có thể làm từ bí ẩn (kèm nghĩa để hiện sau khi chơi). */
function answerCandidates() {
  const entries = [
    ...allFunCards().map((c) => ({ word: c.word, meaningVi: c.meaningVi, image: c.image })),
    ...allLessonWords().map((w) => ({ word: w.word, meaningVi: w.meaningVi, image: undefined })),
  ]
  const seen = new Set<string>()
  return entries
    .map((e) => ({ ...e, word: e.word.toLowerCase() }))
    .filter((e) => /^[a-z]{5}$/.test(e.word) && !seen.has(e.word) && seen.add(e.word))
    .sort((a, b) => a.word.localeCompare(b.word))
}

/** Chọn từ theo ngày: băm chuỗi ngày ra 1 số rồi lấy phần dư. */
function wordOfDay(day: string, candidates: ReturnType<typeof answerCandidates>) {
  let hash = 0
  for (const char of day) hash = (Math.imul(hash, 31) + char.charCodeAt(0)) >>> 0
  return candidates[hash % candidates.length]
}

/** Tô màu 1 lượt đoán (xử lý đúng trường hợp chữ cái lặp lại). */
function scoreGuess(guess: string, answer: string): LetterState[] {
  const result: LetterState[] = Array(WORD_LENGTH).fill('absent')
  const remaining: Record<string, number> = {}
  for (let i = 0; i < WORD_LENGTH; i++) {
    if (guess[i] === answer[i]) result[i] = 'correct'
    else remaining[answer[i]] = (remaining[answer[i]] ?? 0) + 1
  }
  for (let i = 0; i < WORD_LENGTH; i++) {
    if (result[i] !== 'correct' && remaining[guess[i]]) {
      result[i] = 'present'
      remaining[guess[i]]--
    }
  }
  return result
}

const KEYBOARD_ROWS = ['qwertyuiop', 'asdfghjkl', '↵zxcvbnm⌫']

export function DailyWordPage() {
  const { t } = useLanguage()
  const playText = usePlayText()
  const wordGamesText = useWordGamesText()
  const { recordActivity } = useProgress()
  const day = vietnamDay()
  const candidates = useMemo(answerCandidates, [])
  const target = useMemo(() => wordOfDay(day, candidates), [day, candidates])
  const storageKey = `ielts-daily-word-${day}`

  const [dictionary, setDictionary] = useState<Set<string> | null>(null)
  const [guesses, setGuesses] = useState<string[]>(() => {
    try {
      return JSON.parse(localStorage.getItem(storageKey) ?? '[]') as string[]
    } catch {
      return []
    }
  })
  const [current, setCurrent] = useState('')
  const [message, setMessage] = useState('')
  const [server, setServer] = useState<DailyWordState | null>(null)
  /** đã gửi kết quả hôm nay lên máy chủ (chỉ gửi 1 lần) */
  const [submitted, setSubmitted] = useState(false)
  /** đổi số này -> tải lại bảng kỷ lục (sau khi gửi kết quả hôm nay) */
  const [boardKey, setBoardKey] = useState(0)
  const board = useGameBoard(boardKey)

  const solved = guesses.includes(target.word)
  const finished = solved || guesses.length >= MAX_GUESSES || !!server?.mine

  useEffect(() => {
    void loadDictionary().then(setDictionary)
    api.getDailyWord().then(setServer).catch(() => {})
  }, [])

  useEffect(() => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(guesses))
    } catch {
      /* bỏ qua */
    }
  }, [guesses, storageKey])

  // chơi xong lần đầu -> gửi kết quả lên máy chủ
  useEffect(() => {
    if (!(solved || guesses.length >= MAX_GUESSES) || server?.mine || submitted) return
    setSubmitted(true)
    const pattern = guesses.map((g) => scoreGuess(g, target.word).map((s) => STATE_EMOJI[s]).join('')).join('\n')
    void api
      .submitDailyWord({ guesses: guesses.length, solved, pattern })
      .then(() => {
        if (solved) recordActivity('dailyWords')
        setBoardKey((key) => key + 1)
        return api.getDailyWord().then(setServer)
      })
      .catch(() => {})
  }, [solved, guesses, server, submitted, target.word, recordActivity])

  const submitGuess = useCallback(() => {
    if (finished) return
    if (current.length !== WORD_LENGTH) return setMessage(t('wordleNeed5'))
    if (current !== target.word && !dictionary?.has(current) && !candidates.some((c) => c.word === current)) return setMessage(t('wordleNotWord'))
    setMessage('')
    setGuesses((list) => [...list, current])
    setCurrent('')
  }, [finished, current, target.word, dictionary, candidates, t])

  const pressKey = useCallback(
    (key: string) => {
      if (finished) return
      if (key === '↵' || key === 'Enter') submitGuess()
      else if (key === '⌫' || key === 'Backspace') setCurrent((c) => c.slice(0, -1))
      else if (/^[a-zA-Z]$/.test(key)) setCurrent((c) => (c.length < WORD_LENGTH ? c + key.toLowerCase() : c))
    },
    [finished, submitGuess],
  )

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.ctrlKey || event.metaKey || event.altKey) return
      // đang gõ trong ô nhập khác (VD bong bóng chat) -> không tính là đoán chữ
      const focused = event.target as HTMLElement | null
      if (focused && (focused.tagName === 'INPUT' || focused.tagName === 'TEXTAREA' || focused.isContentEditable)) return
      pressKey(event.key)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [pressKey])

  // màu từng phím trên bàn phím ảo
  const keyStates: Record<string, LetterState> = {}
  for (const guess of guesses) {
    scoreGuess(guess, target.word).forEach((state, i) => {
      const letter = guess[i]
      if (keyStates[letter] === 'correct' || (keyStates[letter] === 'present' && state === 'absent')) return
      keyStates[letter] = state
    })
  }

  const rows = Array.from({ length: MAX_GUESSES }, (_, i) => guesses[i] ?? (i === guesses.length ? current : ''))
  const solvedInfo = solved ? playText('dailySolved', { n: guesses.indexOf(target.word) + 1 }) : server?.mine && guesses.length === 0 ? t('wordlePlayedElsewhere') : playText('dailyFailed')

  return (
    <main className="page pg-page wordle">
      <PlayPageHeader back={{ to: '/play', label: wordGamesText('backToHub') }} art={PLAY_ART.dailyWord} artPlate="gold" title={t('dailyWordTitle')} intro={t('dailyWordShort')} />

      <div className="wordle__layout">
        <section className="pg-panel wordle__board" aria-label={t('dailyWordTitle')}>
          <div className="wordle-grid2" role="grid">
            {rows.map((row, rowIndex) => {
              const states = guesses[rowIndex] ? scoreGuess(guesses[rowIndex], target.word) : null
              const isCurrent = !finished && rowIndex === guesses.length
              return (
                <div key={rowIndex} className={`wordle-row2 ${isCurrent ? 'is-current' : ''} ${isCurrent && message ? 'is-shake' : ''}`} role="row">
                  {Array.from({ length: WORD_LENGTH }, (_, i) => (
                    <span
                      key={i}
                      role="gridcell"
                      className={`wordle-cell2 ${states ? `is-${states[i]}` : row[i] ? 'is-filled' : ''}`}
                      style={states ? ({ animationDelay: `${i * 90}ms` } as CSSProperties) : undefined}
                    >
                      {row[i] ?? ''}
                    </span>
                  ))}
                </div>
              )
            })}
          </div>
          <p className={`wordle__message ${message ? 'is-visible' : ''}`} role="status">
            {message}
          </p>

          {!finished && (
            <div className="wordle-keys">
              {KEYBOARD_ROWS.map((row) => (
                <div key={row} className="wordle-keys__row">
                  {[...row].map((key) => (
                    <button
                      key={key}
                      type="button"
                      className={`wordle-key2 ${keyStates[key] ? `is-${keyStates[key]}` : ''} ${key === '↵' || key === '⌫' ? 'is-wide' : ''}`}
                      onClick={() => pressKey(key)}
                      aria-label={key === '↵' ? 'Enter' : key === '⌫' ? 'Backspace' : key}
                    >
                      {key === '↵' ? <Icon name="check" size={18} strokeWidth={2.5} /> : key}
                    </button>
                  ))}
                </div>
              ))}
            </div>
          )}

          {finished && (
            <div className={`wordle-result ${solved ? 'is-solved' : ''}`}>
              <Mascot pose={solved ? 'celebrate' : 'comfort'} size={120} />
              <div className="wordle-result__text">
                <p className="wordle-result__status">{solvedInfo}</p>
                <div className="wordle-result__word">
                  {target.image && <CardImage image={target.image} size={44} />}
                  <strong>{target.word.toUpperCase()}</strong>
                  <IconButton icon="volume" label={t('listenNormal')} size="sm" onClick={() => speak(target.word)} />
                </div>
                <p className="wordle-result__meaning">
                  {playText('wordleMeaning')}: {target.meaningVi}
                </p>
              </div>
              <div className="pg-actions wordle-result__actions">
                <Button to="/play" iconRight="arrow-right">
                  {playText('soloBackToPlay')}
                </Button>
              </div>
            </div>
          )}
        </section>

        <aside className="wordle__side">
          <section className="pg-panel pg-panel--tight">
            <h2 className="pg-panel__title">
              <GameArt slug="house-with-garden" size={28} /> {t('familyToday')}
            </h2>
            {(server?.results ?? []).length === 0 && <p className="wordle__nobody">{playText('dailyNobody')}</p>}
            <ul className="wordle-family">
              {server?.results.map((result) => (
                <li key={result.userId}>
                  <span className="pg-wordle-mini" aria-hidden>
                    {result.pattern
                      .split('\n')
                      .filter(Boolean)
                      .map((line, lineIndex) => (
                        <span key={lineIndex} className="pg-wordle-mini__row">
                          {[...line].map((cell, cellIndex) => (
                            <i key={cellIndex} className={cell === '🟩' ? 'is-correct' : cell === '🟨' ? 'is-present' : 'is-absent'} />
                          ))}
                        </span>
                      ))}
                  </span>
                  <span className="wordle-family__who">
                    <strong>{result.displayName}</strong>
                    <span className={result.solved ? 'is-solved' : ''}>{result.solved ? `${result.guesses}/6` : 'X/6'}</span>
                  </span>
                </li>
              ))}
            </ul>
          </section>
          <GameRecordsPanel game="daily-word" board={board} />
          <section className="pg-panel pg-panel--tight wordle-legend">
            <span className="wordle-legend__cells" aria-hidden>
              <i className="is-correct">A</i>
              <i className="is-present">B</i>
              <i className="is-absent">C</i>
            </span>
            <p>{playText('wordleHowTo')}</p>
          </section>
        </aside>
      </div>
    </main>
  )
}
