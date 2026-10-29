/**
 * WritingEditor.tsx — KHUNG VIẾT BÀI: yên tĩnh, không viền, giãn dòng thoáng
 * ----------------------------------------------------------------------------
 * Ý 4 trong _research/notes/ui-ielts-ai.md: thước đo ngay trong editor (không cần AI):
 *   - thanh số từ: cam khi còn thiếu -> XANH khi đạt minWords -> vàng nhắc khi quá dài
 *   - số đoạn · số từ nối (bấm xem đã dùng những từ nào) · top 3 từ lặp
 *   - "Đang lưu… / Đã lưu" (trình cha lưu nháp bằng useProgress().saveDraft)
 *   - đồng hồ gợi ý (suggestedMinutes): bấm mới chạy, ẩn được, hết giờ vẫn viết tiếp (chế độ luyện tập)
 * Phím: Ctrl/⌘ + Enter = nộp (onSubmitShortcut).
 * ----------------------------------------------------------------------------
 */
import { useEffect, useId, useLayoutEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import { Button } from '../../design-system/components/Button'
import { Icon } from '../../design-system/components/Icon'
import { Timer } from '../../design-system/components/Timer'
import { useWritingText } from './skill-writing-text'
import { countLinkingWords, countWords, splitParagraphs, topRepeatedWords } from './writing-metrics'

export type DraftSaveState = 'idle' | 'saving' | 'saved' | 'local'

interface WritingEditorProps {
  value: string
  onChange: (text: string) => void
  minWords: number
  suggestedMinutes: number
  saveState: DraftSaveState
  /** tiêu đề nhỏ trên khung (mặc định "Bài viết của bạn") */
  label?: string
  /** dòng gợi ý dưới tiêu đề (VD bước Sửa bài) */
  hint?: string
  showTimer?: boolean
  onSubmitShortcut?: () => void
  autoFocus?: boolean
  /** chiều cao tối thiểu của vùng gõ (px) */
  minHeight?: number
  footerExtra?: ReactNode
}

export function WritingEditor({
  value,
  onChange,
  minWords,
  suggestedMinutes,
  saveState,
  label,
  hint,
  showTimer = true,
  onSubmitShortcut,
  autoFocus,
  minHeight = 420,
  footerExtra,
}: WritingEditorProps) {
  const text = useWritingText()
  const editorId = useId()
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const words = countWords(value)
  const paragraphs = splitParagraphs(value).length
  const linking = useMemo(() => countLinkingWords(value), [value])
  const repeated = useMemo(() => topRepeatedWords(value), [value])

  // Ô gõ tự cao theo nội dung (trang cuộn, không có thanh cuộn lồng trong khung)
  useLayoutEffect(() => {
    const element = textareaRef.current
    if (!element) return
    element.style.height = 'auto'
    element.style.height = `${Math.max(minHeight, element.scrollHeight)}px`
  }, [value, minHeight])

  useEffect(() => {
    if (autoFocus) textareaRef.current?.focus({ preventScroll: true })
  }, [autoFocus])

  // ---------- thanh số từ ----------
  const longLimit = Math.round(minWords * 1.7)
  const wordState = words >= longLimit ? 'long' : words >= minWords ? 'enough' : 'short'
  const fill = Math.min(100, (words / minWords) * 100)
  const wordMessage = wordState === 'short' ? text.wordsLeft(minWords - words) : wordState === 'enough' ? text.wordsEnough : text.wordsLong

  return (
    <div className="writing-editor">
      <div className="writing-editor__head">
        <div className="writing-editor__title">
          <label htmlFor={editorId}>{label ?? text.editorLabel}</label>
          {hint && <span className="writing-editor__hint">{hint}</span>}
        </div>
        <div className="writing-editor__tools">
          <SaveIndicator state={saveState} />
          {showTimer && <SuggestedTimer minutes={suggestedMinutes} />}
        </div>
      </div>

      <textarea
        id={editorId}
        ref={textareaRef}
        className="writing-editor__input"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        onKeyDown={(event) => {
          if (event.key === 'Enter' && (event.ctrlKey || event.metaKey) && onSubmitShortcut) {
            event.preventDefault()
            onSubmitShortcut()
          }
        }}
        placeholder={text.editorPlaceholder}
        spellCheck={false}
        autoCapitalize="sentences"
        lang="en"
        style={{ minHeight }}
      />
      {value.trim() === '' && <p className="writing-editor__tip">{text.unikeyTip}</p>}

      <div className="writing-editor__meter" aria-live="polite">
        <div className="writing-editor__words">
          <div className={`writing-editor__bar is-${wordState}`} role="meter" aria-valuemin={0} aria-valuemax={minWords} aria-valuenow={Math.min(words, minWords)} aria-label={text.editorLabel}>
            <span style={{ width: `${fill}%` }} />
          </div>
          <span className="writing-editor__count ds-num">{text.wordsOf(words, minWords)}</span>
          <span className={`writing-editor__word-message is-${wordState}`}>
            {wordState === 'enough' && <Icon name="check" size={14} strokeWidth={3} />}
            {wordMessage}
          </span>
        </div>
        <div className="writing-editor__chips">
          <span className="writing-editor__chip">{text.paragraphs(paragraphs)}</span>
          <span className="writing-editor__chip" title={linking.found.length ? `${text.linkingTitle}: ${linking.found.join(', ')}` : undefined}>
            {text.linking(linking.total, linking.distinct)}
          </span>
          {repeated.length > 0 ? (
            <span className="writing-editor__chip writing-editor__chip--repeat" title={text.repeatedHint}>
              {text.repeated}:{' '}
              {repeated.map((item, index) => (
                <span key={item.word}>
                  {index > 0 && ', '}
                  <b>{item.word}</b> ×{item.count}
                </span>
              ))}
            </span>
          ) : (
            words > 40 && <span className="writing-editor__chip writing-editor__chip--quiet">{text.noRepeats}</span>
          )}
          {footerExtra}
        </div>
      </div>
    </div>
  )
}

function SaveIndicator({ state }: { state: DraftSaveState }) {
  const text = useWritingText()
  if (state === 'idle') return null
  const label = state === 'saving' ? text.saving : state === 'saved' ? text.saved : text.savedLocal
  return (
    <span className={`writing-editor__save is-${state}`} role="status">
      {state === 'saving' ? <span className="writing-editor__save-dot" /> : <Icon name="check" size={14} strokeWidth={2.5} />}
      {label}
    </span>
  )
}

/** Đồng hồ gợi ý: chưa bấm thì chỉ là 1 nút nhỏ; bấm rồi đếm ngược, ẩn/hiện được. */
function SuggestedTimer({ minutes }: { minutes: number }) {
  const text = useWritingText()
  const [endsAt, setEndsAt] = useState<number | null>(null)
  const [now, setNow] = useState(() => Date.now())

  useEffect(() => {
    if (endsAt === null) return
    const timer = window.setInterval(() => setNow(Date.now()), 1000)
    return () => window.clearInterval(timer)
  }, [endsAt])

  if (endsAt === null) {
    return (
      <Button
        variant="ghost"
        size="sm"
        iconLeft="clock"
        onClick={() => {
          setNow(Date.now())
          setEndsAt(Date.now() + minutes * 60_000)
        }}
      >
        {text.timerStart(minutes)}
      </Button>
    )
  }
  const secondsLeft = Math.max(0, Math.round((endsAt - now) / 1000))
  return (
    <span className="writing-editor__timer">
      <Timer secondsLeft={secondsLeft} warnAtSeconds={Math.min(300, minutes * 15)} />
      {secondsLeft === 0 && <span className="writing-editor__timer-up">{text.timerUp}</span>}
    </span>
  )
}
