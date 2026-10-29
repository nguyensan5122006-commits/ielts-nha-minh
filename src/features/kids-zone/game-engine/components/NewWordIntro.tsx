/**
 * NewWordIntro.tsx — THẺ GIỚI THIỆU TỪ MỚI (lần đầu bé gặp 1 từ)
 * ----------------------------------------------------------------------------
 *   <NewWordIntro word={kidsWord} onDone={session.finishIntro} />
 *
 * Kịch bản ~5 giây (07-KIDS-ZONE mục 3):
 *   1. Ảnh 3D nảy ra giữa thẻ.
 *   2. Từng chữ cái bay từ chỗ ngẫu nhiên vào "khuôn" của từ, mỗi chữ kêu 1 nốt nhạc
 *      (nốt cao dần -> cả từ như 1 câu nhạc đi lên).
 *   3. Đủ chữ: khuôn sáng lên + giọng đọc từ tiếng Anh.
 *   4. Nghĩa tiếng Việt hiện ra + được đọc.
 *   5. Nút "Tiếp" sáng lên (chỉ sau khi nghe xong lần đầu). Luôn có "Bỏ qua".
 * Câu ví dụ có nút loa riêng (không tự đọc, để thẻ không dài quá 8 giây).
 * Phím: Enter = Tiếp · R = nghe lại.
 * ----------------------------------------------------------------------------
 */
import { useEffect, useMemo, useRef, useState, type CSSProperties } from 'react'
import type { KidsWord } from '../../../../content/content-types'
import { Button } from '../../../../design-system/components/Button'
import { Icon } from '../../../../design-system/components/Icon'
import { Kbd } from '../../../../design-system/components/Kbd'
import { useReducedMotion } from '../../../../design-system/use-reduced-motion'
import { useKidsText } from '../../kids-text'
import { saySentence, sayWord, speakSequence, stopVoice } from '../kids-audio'
import { playLetterNote, playSound } from '../kids-sounds'
import { useGameKeys } from '../use-game-keys'
import { KidsPicture } from './KidsPicture'
import './NewWordIntro.css'

type Phase = 'letters' | 'word' | 'meaning' | 'ready'

const LETTER_INTERVAL_MS = 230
const START_DELAY_MS = 420

export function NewWordIntro({ word, onDone }: { word: KidsWord; onDone: () => void }) {
  const text = useKidsText()
  const reduceMotion = useReducedMotion()
  const letters = useMemo(() => word.word.split(''), [word.word])
  const [landed, setLanded] = useState(0)
  const [phase, setPhase] = useState<Phase>('letters')
  const [heard, setHeard] = useState(false)
  const doneRef = useRef(false)

  // Điểm xuất phát ngẫu nhiên của từng chữ (tính 1 lần cho mỗi từ)
  const startOffsets = useMemo(
    () =>
      letters.map(() => ({
        x: Math.round((Math.random() - 0.5) * 520),
        y: Math.round(-140 - Math.random() * 160),
        r: Math.round((Math.random() - 0.5) * 70),
      })),
    [letters],
  )

  /** Đọc từ rồi đọc nghĩa; xong lần đầu -> sáng nút Tiếp */
  const speakWordAndMeaning = async () => {
    setPhase('word')
    await sayWord(word)
    setPhase('meaning')
    await speakSequence([{ kind: 'meaning', word }])
    setPhase('ready')
    setHeard(true)
  }

  // Ref giữ bản mới nhất của hàm đọc -> effect bên dưới gọi được mà không phải chạy lại
  const speakRef = useRef(speakWordAndMeaning)
  speakRef.current = speakWordAndMeaning

  // Chữ cái bay vào lần lượt (chạy 1 lần cho mỗi từ)
  useEffect(() => {
    let cancelled = false
    const timers: number[] = []
    const step = reduceMotion ? 120 : LETTER_INTERVAL_MS
    playSound('pop')
    letters.forEach((char, index) => {
      timers.push(
        window.setTimeout(() => {
          if (cancelled) return
          setLanded(index + 1)
          if (char !== ' ') playLetterNote(index)
        }, START_DELAY_MS + index * step),
      )
    })
    timers.push(
      window.setTimeout(() => {
        if (!cancelled) void speakRef.current()
      }, START_DELAY_MS + letters.length * step + 260),
    )
    return () => {
      cancelled = true
      timers.forEach(window.clearTimeout)
      stopVoice()
    }
  }, [letters, reduceMotion])

  const finish = () => {
    if (doneRef.current) return
    doneRef.current = true
    stopVoice()
    onDone()
  }

  useGameKeys({
    onEnter: () => heard && finish(),
    onReplay: () => phase === 'ready' && void speakWordAndMeaning(),
  })

  const slotSize = Math.max(34, Math.min(62, Math.floor(560 / Math.max(1, letters.length))))
  const allLanded = landed >= letters.length

  return (
    <div className="kz-overlay kz-overlay--light" role="dialog" aria-modal="true" aria-label={`${text.newWordBadge}: ${word.word}`}>
      <div className="kz-intro kz-card">
        <div className="kz-intro__top">
          <span className="kz-chip kz-chip--new">
            <Icon name="sparkle" size={16} /> {text.newWordBadge}
          </span>
          <button type="button" className="kz-intro__skip" onClick={finish}>
            {text.skip}
          </button>
        </div>

        <div className="kz-intro__picture">
          <span className="kz-intro__glow" aria-hidden />
          <KidsPicture slug={word.image} word={word.word} size={168} decorative />
        </div>

        {/* khuôn chữ: mỗi ô 1 chữ cái; chữ bay vào khi "landed" */}
        <div className={['kz-intro__mold', allLanded && 'is-complete', phase === 'word' && 'is-speaking'].filter(Boolean).join(' ')} style={{ '--slot': `${slotSize}px` } as CSSProperties} aria-label={word.word}>
          {letters.map((char, index) =>
            char === ' ' ? (
              <span key={index} className="kz-intro__space" />
            ) : (
              <span key={index} className="kz-intro__slot" aria-hidden>
                <span
                  className={['kz-intro__letter', index < landed && 'is-landed'].filter(Boolean).join(' ')}
                  style={{ '--from-x': `${startOffsets[index].x}px`, '--from-y': `${startOffsets[index].y}px`, '--from-r': `${startOffsets[index].r}deg` } as CSSProperties}
                >
                  {char}
                </span>
              </span>
            ),
          )}
        </div>

        <p className={['kz-intro__meaning', (phase === 'meaning' || phase === 'ready') && 'is-visible'].filter(Boolean).join(' ')}>{word.meaningVi}</p>

        {word.example && (
          <button type="button" className={['kz-intro__example', phase === 'ready' && 'is-visible'].filter(Boolean).join(' ')} onClick={() => void saySentence(word.example!.en)}>
            <Icon name="volume" size={18} />
            <span>
              <span className="kz-intro__example-en">{word.example.en}</span>
              <span className="kz-intro__example-vi">{word.example.vi}</span>
            </span>
          </button>
        )}

        <div className="kz-intro__actions">
          <button type="button" className="kz-round-btn kz-intro__replay" onClick={() => void speakWordAndMeaning()} disabled={phase !== 'ready'} aria-label={text.listenAgain} title={text.listenAgain}>
            <Icon name="volume" size={24} />
          </button>
          <Button size="xl" className={['kz-intro__next', heard && 'is-lit'].filter(Boolean).join(' ')} onClick={finish} disabled={!heard} iconRight={<Kbd onColor>Enter</Kbd>}>
            {text.next}
          </Button>
        </div>
      </div>
    </div>
  )
}
