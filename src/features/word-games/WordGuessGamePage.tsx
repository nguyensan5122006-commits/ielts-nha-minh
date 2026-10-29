/**
 * WordGuessGamePage.tsx — KHUNG TRANG CHUNG CHO 2 TRÒ MỚI
 *   /games/picture-word     Nhìn ảnh đoán từ     (mode="picture")
 *   /games/missing-letters  Điền chữ còn thiếu   (mode="missing")
 * ----------------------------------------------------------------------------
 * 3 màn: chọn ván (RoundSetup) -> chơi 10 từ (WordGuessRound) -> kết quả (RoundResult).
 * Cột phải luôn là bảng kỷ lục của trò (GameRecordsPanel); ẩn khi đang chơi cho tập trung.
 *
 * Kho từ (word-pool.ts) dựng 1 lần khi mở trang: cần tiến độ học (useProgress) +
 * catalog ảnh (public/word-images/catalog.json, ~220KB, tải 1 lần) để đổi emoji thẻ Học vui sang ảnh 3D.
 * Hết ván: gửi điểm (save-round-score.ts) + recordActivity('miniGames') giống các trò cũ
 * (XP / nhiệm vụ do nhóm khác quyết định từ chỉ số này — trang này không tự cộng XP).
 * ----------------------------------------------------------------------------
 */
import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react'
import { fireConfetti, playSound } from '../../design-system'
import { loadWordImageCatalog, type WordImageCatalog } from '../../content/word-image-catalog'
import { useProgress } from '../../learning-progress/progress-store'
import { useLanguage } from '../../translations/language-context'
import { PlayPageHeader } from '../playground/components/PlayPageHeader'
import { wordGameInfo, type MiniGameId } from '../playground/game-catalog'
import { GameRecordsPanel } from './components/GameRecordsPanel'
import { RoundResult, type SavedScore } from './components/RoundResult'
import { RoundSetup } from './components/RoundSetup'
import { WordGuessRound } from './components/WordGuessRound'
import { ROUND_SIZE, type Difficulty, type PuzzleMode, type RoundSummary } from './round-rules'
import { saveRoundScore } from './save-round-score'
import { useGameBoard } from './use-game-board'
import { buildWordPool, countMetWords, pickRoundWords, type PoolWord } from './word-pool'
import { useWordGamesText } from './word-games-text'
import '../playground/styles/play-kit.css'
import '../playground/styles/game.css'
import '../playground/styles/word-games.css'
import './styles/word-games-kit.css'
import './styles/word-guess.css'

/** Nhớ lựa chọn lần trước (độ khó, nhịp) — chỉ là tiện ích, lỗi localStorage thì bỏ qua */
function readSetupMemory(game: string): { difficulty: Difficulty; timed: boolean } {
  try {
    const saved = JSON.parse(localStorage.getItem(`ielts-word-game-setup-${game}`) ?? 'null') as { difficulty?: Difficulty; timed?: boolean } | null
    return { difficulty: saved?.difficulty ?? 'easy', timed: saved?.timed ?? false }
  } catch {
    return { difficulty: 'easy', timed: false }
  }
}
function writeSetupMemory(game: string, value: { difficulty: Difficulty; timed: boolean }) {
  try {
    localStorage.setItem(`ielts-word-game-setup-${game}`, JSON.stringify(value))
  } catch {
    /* bỏ qua */
  }
}

export interface WordGuessGamePageProps {
  gameId: Extract<MiniGameId, 'picture-word' | 'missing-letters'>
  mode: PuzzleMode
  /** hình minh hoạ cách chơi trên màn chọn ván */
  preview: ReactNode
}

export function WordGuessGamePage({ gameId, mode, preview }: WordGuessGamePageProps) {
  const text = useWordGamesText()
  const { pick } = useLanguage()
  const { progress, isLoaded, recordActivity } = useProgress()
  const info = wordGameInfo(gameId)!

  const [catalog, setCatalog] = useState<WordImageCatalog | null | undefined>(undefined)
  const [{ difficulty, timed }, setSetup] = useState(() => readSetupMemory(gameId))
  const [phase, setPhase] = useState<'setup' | 'playing' | 'result'>('setup')
  const [roundWords, setRoundWords] = useState<PoolWord[]>([])
  const [seed, setSeed] = useState(1)
  const [summary, setSummary] = useState<RoundSummary | null>(null)
  const [saved, setSaved] = useState<SavedScore | null | undefined>(undefined)
  const [boardKey, setBoardKey] = useState(0)
  const board = useGameBoard(boardKey)

  useEffect(() => {
    loadWordImageCatalog().then(setCatalog, () => setCatalog(null)) // không tải được catalog vẫn chơi (tra ảnh theo chữ)
  }, [])

  // kho từ: dựng lại khi tiến độ tải xong / catalog về. Không dựng lại giữa ván.
  const pool = useMemo(() => (catalog === undefined || !isLoaded ? null : buildWordPool(progress, catalog ?? undefined)), [catalog, isLoaded, progress])
  const metCount = pool ? countMetWords(pool, { difficulty, needImage: mode === 'picture' }) : null

  const updateSetup = (patch: Partial<{ difficulty: Difficulty; timed: boolean }>) => {
    setSetup((current) => {
      const value = { ...current, ...patch }
      writeSetupMemory(gameId, value)
      return value
    })
  }

  const start = useCallback(() => {
    if (!pool) return
    const newSeed = Math.floor(Math.random() * 2 ** 31)
    const words = pickRoundWords(pool, { difficulty, needImage: mode === 'picture', count: ROUND_SIZE, seed: newSeed })
    if (words.length === 0) return
    setSeed(newSeed)
    setRoundWords(words)
    setSummary(null)
    setSaved(undefined)
    setPhase('playing')
    playSound('tap')
  }, [pool, difficulty, mode])

  const finish = useCallback(
    async (result: RoundSummary) => {
      setSummary(result)
      setPhase('result')
      recordActivity('miniGames')
      const savedScore = await saveRoundScore(gameId, result.score)
      setSaved(savedScore)
      setBoardKey((key) => key + 1) // tải lại bảng kỷ lục
      playSound(savedScore?.isNewRecord ? 'levelUp' : 'complete')
      if (savedScore?.isNewRecord) fireConfetti()
    },
    [gameId, recordActivity],
  )

  return (
    <main className="page pg-page word-games wk-page">
      <PlayPageHeader back={{ to: '/play', label: text('backToHub') }} art={info.art} artPlate={info.plate} title={pick(info.title)} intro={pick(info.description)} />

      <div className={`wg-solo-layout ${phase === 'playing' ? 'is-playing' : ''}`}>
        <div className="wk-main">
          {phase === 'setup' && (
            <RoundSetup
              difficulty={difficulty}
              onDifficulty={(value) => updateSetup({ difficulty: value })}
              timed={timed}
              onTimed={(value) => updateSetup({ timed: value })}
              metCount={metCount}
              preview={preview}
              onStart={start}
            />
          )}

          {phase === 'playing' && (
            <WordGuessRound words={roundWords} mode={mode} difficulty={difficulty} timed={timed} seed={seed} onFinish={(result) => void finish(result)} onQuit={() => setPhase('setup')} />
          )}

          {phase === 'result' && summary && (
            <RoundResult
              score={summary.score}
              correct={summary.correct}
              total={summary.total}
              bestStreak={summary.bestStreak}
              words={summary.words}
              saved={saved}
              onPlayAgain={start}
              onChangeSettings={() => setPhase('setup')}
            />
          )}
        </div>

        {phase !== 'playing' && <GameRecordsPanel game={gameId} board={board} />}
      </div>
    </main>
  )
}
