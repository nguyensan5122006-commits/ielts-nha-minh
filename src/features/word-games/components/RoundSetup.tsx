/**
 * RoundSetup.tsx — MÀN "CHỌN VÁN CHƠI" CỦA 2 TRÒ MỚI (Nhìn ảnh đoán từ, Điền chữ còn thiếu)
 * ----------------------------------------------------------------------------
 *   <RoundSetup
 *     difficulty={d} onDifficulty={setD}
 *     timed={false} onTimed={setTimed}
 *     metCount={7}            // số từ "đã gặp" dùng được ở độ khó này (null = đang chuẩn bị)
 *     preview={<…/>}          // hình minh hoạ cách chơi (mỗi trò 1 kiểu)
 *     onStart={start}
 *   />
 * Mặc định: độ khó "Dễ", nhịp "Thong thả" (không đồng hồ). Enter = bắt đầu.
 * ----------------------------------------------------------------------------
 */
import { useEffect, type ReactNode } from 'react'
import { Button, Kbd, SegmentedControl } from '../../../design-system'
import { GameArt } from '../../playground/components/GameArt'
import { DIFFICULTIES, ROUND_SIZE, TIMED_SECONDS, type Difficulty } from '../round-rules'
import { useWordGamesText, type WordGamesTextKey } from '../word-games-text'

const DIFFICULTY_LABEL: Record<Difficulty, WordGamesTextKey> = { easy: 'diffEasy', medium: 'diffMedium', hard: 'diffHard' }
const DIFFICULTY_HINT: Record<Difficulty, WordGamesTextKey> = { easy: 'diffEasyHint', medium: 'diffMediumHint', hard: 'diffHardHint' }

export interface RoundSetupProps {
  difficulty: Difficulty
  onDifficulty: (value: Difficulty) => void
  timed: boolean
  onTimed: (value: boolean) => void
  /** null = kho từ đang chuẩn bị */
  metCount: number | null
  preview?: ReactNode
  onStart: () => void
}

export function RoundSetup({ difficulty, onDifficulty, timed, onTimed, metCount, preview, onStart }: RoundSetupProps) {
  const text = useWordGamesText()
  const ready = metCount !== null

  // Enter = bắt đầu (trừ khi đang đứng ở 1 nút khác — để Enter bấm đúng nút đó)
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null
      if (event.key !== 'Enter' || !ready || (target && ['INPUT', 'TEXTAREA', 'BUTTON', 'A'].includes(target.tagName))) return
      event.preventDefault()
      onStart()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [ready, onStart])

  return (
    <section className="pg-panel wk-setup" aria-labelledby="round-setup-title">
      {preview && <div className="wk-setup__preview">{preview}</div>}

      <div className="wk-setup__body">
        <h2 id="round-setup-title" className="pg-panel__title">
          {text('setupTitle')}
          <span className="pg-panel__aside">{text('setupWords', { n: ROUND_SIZE })}</span>
        </h2>

        <div className="pg-field">
          <span className="pg-field__label">{text('setupDifficulty')}</span>
          <SegmentedControl<Difficulty>
            label={text('setupDifficulty')}
            value={difficulty}
            onChange={onDifficulty}
            options={DIFFICULTIES.map((value) => ({ value, label: text(DIFFICULTY_LABEL[value]) }))}
          />
          <span className="pg-field__hint">{text(DIFFICULTY_HINT[difficulty])}</span>
        </div>

        <div className="pg-field">
          <span className="pg-field__label">{text('setupPace')}</span>
          <SegmentedControl<'relaxed' | 'timed'>
            label={text('setupPace')}
            value={timed ? 'timed' : 'relaxed'}
            onChange={(value) => onTimed(value === 'timed')}
            options={[
              { value: 'relaxed', label: text('paceRelaxed') },
              { value: 'timed', label: text('paceTimed') },
            ]}
          />
          <span className="pg-field__hint">{timed ? text('paceTimedHint', { n: TIMED_SECONDS }) : text('paceRelaxedHint')}</span>
        </div>

        <p className={`wk-setup__source ${metCount ? 'is-met' : ''}`}>
          <GameArt slug={metCount ? 'books' : 'open-book'} size={28} />
          <span>
            {!ready ? text('setupLoading') : metCount ? text('setupFromLessons', { n: Math.min(metCount, ROUND_SIZE) }) : text('setupFromLevel')}
          </span>
        </p>

        <div className="wk-setup__footer">
          <span className="wk-setup__keys">{text('setupKeys')}</span>
          <Button size="lg" onClick={onStart} disabled={!ready} loading={!ready} iconLeft={ready ? 'play-fill' : undefined}>
            {text('setupStart')} {ready && <Kbd onColor>Enter</Kbd>}
          </Button>
        </div>
      </div>
    </section>
  )
}
