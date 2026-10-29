/**
 * PlacementRunner.tsx — BƯỚC 2 CỦA /start: BÀI XẾP LỚP THÍCH ỨNG (mỗi màn 1 câu)
 * ----------------------------------------------------------------------------
 * Làm đúng đặc tả ở đầu src/content/exams/placement-v3.ts (mục 0, 1, 6):
 *   - câu tiếp theo do nextPlacementItem(answers) chọn (cầu thang lên/xuống theo đúng/sai);
 *     null = dừng (lý do: placementStopReason). Kết quả = estimatePlacement(answers).
 *   - KHÔNG báo đúng/sai từng câu; chỉ cún động viên nhẹ. Không đồng hồ.
 *   - luôn có nút "Mình chưa biết câu này" (= trả lời sai, nhưng kết quả chính xác hơn đoán bừa)
 *   - câu nghe: tự phát 1 lần + nghe lại thêm 1 lần (tổng 2), tốc độ 1×, không hiện chữ
 *     (PlacementAudio.tsx: phát đúng giọng của câu bằng playAudioLine — 06-AUDIO.md)
 *   - lưu danh sách câu trả lời vào localStorage SAU MỖI CÂU (tải lại trang -> làm tiếp đúng câu)
 *   - 2 trong 3 câu đầu chưa đúng -> 1 lần duy nhất mời nhẹ "bắt đầu Level 1"
 *   - bé: bài kiểm tra mini 4–6 câu (dừng ở 6 câu, hoặc từ câu 4 nếu đã có 2 câu chưa đúng)
 *
 * Phím tắt: 1–4 chọn đáp án · Enter = Tiếp · 0 = Mình chưa biết · R = nghe lại · Esc = Lưu & thoát
 * ----------------------------------------------------------------------------
 */
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import {
  PLACEMENT_KIND_INSTRUCTIONS,
  estimatePlacement,
  nextPlacementItem,
  type PlacementAnswer,
  type PlacementEstimate,
  type PlacementItem,
} from '../../content/exams/index-v3'
import { Button, IconButton, Kbd, Mascot, type MascotPose, Modal, playSound, ProgressBar, useReducedMotion } from '../../design-system'
import { stableOptionOrder } from '../../exercise-types/exercise-shared'
import { useLanguage } from '../../translations/language-context'
import { PlacementAudio } from './PlacementAudio'
import { saveDraft, type PlacementDraft } from './placement-storage'
import { usePlacementText } from './placement-text'

/** Bé: kiểm tra mini (4–6 câu) — đủ để chọn điểm bắt đầu, không làm bé mệt. */
const KID_MAX_ITEMS = 6
const KID_MIN_ITEMS = 4
const ADULT_MAX_ITEMS = 12
const MAX_PLAYS = 2

export type RunnerFinish = { estimate: PlacementEstimate; answers: PlacementAnswer[]; via: 'test' | 'early' }

export interface PlacementRunnerProps {
  draft: PlacementDraft
  /** bài xong (tự dừng, hoặc người học chọn "xem kết quả luôn" / "bắt đầu Level 1") */
  onFinish: (finish: RunnerFinish) => void
  /** bấm "Thoát" trong hộp thoại Lưu & thoát (bài vẫn được lưu) */
  onLeave: () => void
}

/** Bé đã làm đủ bài mini chưa? */
function kidCheckDone(answers: PlacementAnswer[]): boolean {
  const wrong = answers.filter((answer) => !answer.correct).length
  return answers.length >= KID_MAX_ITEMS || (answers.length >= KID_MIN_ITEMS && wrong >= 2)
}

/** Pose cún theo dạng câu (đúng "ngôn ngữ" mascot của design system mục 5). */
function poseFor(item: PlacementItem | null): MascotPose {
  if (item?.kind === 'listen-choose') return 'listening'
  if (item?.kind === 'read-choose') return 'reading'
  return 'thumbs-up'
}

export function PlacementRunner({ draft: initialDraft, onFinish, onLeave }: PlacementRunnerProps) {
  const text = usePlacementText()
  const { pick } = useLanguage()
  const reduceMotion = useReducedMotion()
  const [draft, setDraft] = useState(initialDraft)
  const [selected, setSelected] = useState<number | null>(null)
  const [plays, setPlays] = useState(0)
  const [exitOpen, setExitOpen] = useState(false)
  const [offerOpen, setOfferOpen] = useState(false)
  const audioWrapRef = useRef<HTMLDivElement>(null)

  const isKid = draft.setup.ageGroup === 'kid'
  const maxItems = isKid ? KID_MAX_ITEMS : ADULT_MAX_ITEMS
  const answers = draft.answers

  // câu đang hỏi (hàm thuần -> tải lại trang ra đúng câu này)
  const item = useMemo<PlacementItem | null>(() => {
    if (isKid && kidCheckDone(answers)) return null
    return nextPlacementItem(answers)
  }, [answers, isKid])

  // thứ tự đáp án xáo nhưng CỐ ĐỊNH theo id câu (mở lại vẫn y như cũ)
  const order = useMemo(() => (item ? stableOptionOrder(item.id, item.options) : []), [item])
  const longOptions = !!item && item.options.some((option) => option.length > 26)

  /* ---------- hết câu -> báo trang cha (1 lần) ---------- */
  const finishedRef = useRef(false)
  useEffect(() => {
    if (item || finishedRef.current) return
    finishedRef.current = true
    onFinish({ estimate: estimatePlacement(answers), answers, via: 'test' })
  }, [item, answers, onFinish])

  /* ---------- ghi 1 câu trả lời ---------- */
  const answer = useCallback(
    (correct: boolean) => {
      if (!item) return
      const nextAnswers = [...answers, { itemId: item.id, correct }]
      // lời mời "bắt đầu Level 1": 2 trong 3 câu đầu chưa đúng (chỉ 1 lần, không áp dụng cho bé).
      // Bài sắp tự dừng (VD sai 2 câu mức dễ nhất) thì khỏi mời — kết quả hiện luôn.
      const testContinues = nextPlacementItem(nextAnswers) !== null
      const showOffer =
        !isKid &&
        testContinues &&
        !draft.levelOneOfferShown &&
        nextAnswers.length === 3 &&
        nextAnswers.filter((a) => !a.correct).length >= 2
      const nextDraft: PlacementDraft = { ...draft, answers: nextAnswers, levelOneOfferShown: draft.levelOneOfferShown || showOffer }
      saveDraft(nextDraft) // lưu NGAY sau mỗi câu
      setDraft(nextDraft)
      setSelected(null)
      setPlays(0)
      playSound('tap')
      if (showOffer) setOfferOpen(true)
    },
    [item, answers, draft, isKid],
  )

  const submitSelected = useCallback(() => {
    if (!item || selected === null) return
    answer(selected === item.correctIndex)
  }, [item, selected, answer])

  /* ---------- phím tắt ---------- */
  useEffect(() => {
    if (!item || exitOpen || offerOpen) return
    const onKey = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement
      if (target.closest('input, textarea, select')) return
      if (event.key >= '1' && event.key <= String(item.options.length)) {
        event.preventDefault()
        setSelected(order[Number(event.key) - 1])
      } else if (event.key === 'Enter') {
        // con trỏ đang ở 1 đáp án (vừa bấm chuột) -> Enter = Tiếp; ở nút khác -> để nút đó tự xử lý
        if (target.closest('button') && !target.closest('.pt-option')) return
        event.preventDefault()
        submitSelected()
      } else if (event.key === '0') {
        event.preventDefault()
        answer(false)
      } else if ((event.key === 'r' || event.key === 'R') && item.kind === 'listen-choose' && plays < MAX_PLAYS) {
        audioWrapRef.current?.querySelector<HTMLButtonElement>('.pt-audio__main:not(:disabled)')?.click()
      } else if (event.key === 'Escape') {
        setExitOpen(true)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [item, order, plays, exitOpen, offerOpen, submitSelected, answer])

  if (!item) {
    // màn "Xong rồi!" do trang cha vẽ — ở đây chỉ giữ chỗ
    return null
  }

  const questionNumber = answers.length + 1
  const encouragementList = isKid ? text.encouragementsKid : text.encouragements
  // đổi câu động viên thưa thớt (không làm phiền): câu 1, 3, 5, 8, 10
  const encouragementIndex = isKid
    ? Math.min(encouragementList.length - 1, Math.floor(answers.length / 2))
    : answers.length < 2
      ? 0
      : answers.length < 4
        ? 1
        : answers.length < 7
          ? 2
          : answers.length < 9
            ? 3
            : 4
  const encouragement = encouragementList[encouragementIndex]
  const playsLeft = Math.max(0, MAX_PLAYS - plays)

  return (
    <div className="pt-run">
      {/* ---------- thanh trên: thoát + tiến độ ---------- */}
      <header className="pt-run__bar">
        <IconButton icon="close" label={text.saveAndExit} onClick={() => setExitOpen(true)} variant="ghost" />
        <div className="pt-run__progress">
          <ProgressBar value={answers.length} max={maxItems} label={text.testTitle} size="md" />
        </div>
        <span className="pt-run__count ds-num">
          {text.questionNumber(questionNumber)} <span className="pt-run__count-max">· {isKid ? text.aboutMaxKid : text.aboutMax}</span>
        </span>
      </header>

      {/* ---------- câu hỏi (đổi key -> trượt nhẹ khi sang câu mới) ---------- */}
      <main className="pt-run__stage">
        <div key={item.id} className={['pt-q', reduceMotion ? '' : 'pt-q--animate'].join(' ')}>
          <p className="pt-q__instruction">{pick(PLACEMENT_KIND_INSTRUCTIONS[item.kind])}</p>

          {item.kind === 'listen-choose' && (
            <div className={['pt-q__listen', playsLeft === 0 && 'is-used-up'].filter(Boolean).join(' ')} ref={audioWrapRef}>
              {/* key = id câu -> sang câu nghe mới thì nút làm lại từ đầu (đếm lượt nghe, tự phát) */}
              <PlacementAudio key={item.id} text={item.audioText} voice={item.voice} maxPlays={MAX_PLAYS} autoPlay onPlaysChange={setPlays} label={text.listenPrompt} />
              <span className="pt-q__plays" aria-live="polite">
                {text.listenTimes(playsLeft)}
              </span>
            </div>
          )}

          {item.kind === 'read-choose' && (
            <figure className="pt-q__passage">
              <figcaption className="ds-visually-hidden">{text.passageLabel}</figcaption>
              <p className="ds-reading">{item.passage}</p>
            </figure>
          )}

          <h1 className="pt-q__question" lang="en">
            {item.question}
          </h1>

          <div className={['pt-options', longOptions ? 'pt-options--stack' : 'pt-options--grid'].join(' ')} role="radiogroup" aria-label={item.question}>
            {order.map((originalIndex, position) => (
              <button
                key={originalIndex}
                type="button"
                role="radio"
                aria-checked={selected === originalIndex}
                className={['pt-option', selected === originalIndex && 'is-selected'].filter(Boolean).join(' ')}
                onClick={() => setSelected(originalIndex)}
                onDoubleClick={() => answer(originalIndex === item.correctIndex)}
                lang="en"
              >
                <Kbd className="pt-option__key">{position + 1}</Kbd>
                <span className="pt-option__text">{item.options[originalIndex]}</span>
              </button>
            ))}
          </div>
        </div>

        <aside className="pt-run__coach" aria-live="polite">
          <Mascot pose={poseFor(item)} size={96} speech={encouragement} speechSide="right" />
        </aside>
      </main>

      {/* ---------- thanh hành động dưới đáy ---------- */}
      <footer className="pt-run__actions">
        <div className="pt-run__actions-inner">
          <Button variant="secondary" onClick={() => answer(false)}>
            {text.dontKnow}
            <Kbd className="pt-run__kbd">0</Kbd>
          </Button>
          <Button size="lg" iconRight="arrow-right" disabled={selected === null} onClick={submitSelected} className="pt-run__next">
            {text.next}
          </Button>
        </div>
      </footer>

      {/* ---------- hộp thoại Lưu & thoát ---------- */}
      <Modal
        open={exitOpen}
        onClose={() => setExitOpen(false)}
        title={text.exitTitle}
        mascotPose="comfort"
        footer={
          <>
            <Button variant="ghost" onClick={onLeave}>
              {text.exitLeave}
            </Button>
            {answers.length >= 3 && (
              <Button
                variant="secondary"
                onClick={() => {
                  setExitOpen(false)
                  finishedRef.current = true
                  onFinish({ estimate: estimatePlacement(answers), answers, via: 'early' })
                }}
              >
                {text.exitSeeResult}
              </Button>
            )}
            <Button onClick={() => setExitOpen(false)}>{text.exitKeepGoing}</Button>
          </>
        }
      >
        {text.exitBody}
      </Modal>

      {/* ---------- lời mời "bắt đầu Level 1" (2/3 câu đầu chưa đúng) ---------- */}
      <Modal
        open={offerOpen}
        onClose={() => setOfferOpen(false)}
        title={text.levelOneOfferTitle}
        mascotPose="comfort"
        footer={
          <>
            <Button
              variant="secondary"
              onClick={() => {
                setOfferOpen(false)
                finishedRef.current = true
                // người học tự chọn Level 1 -> giữ khoảng band ước lượng, nhưng level = 1
                onFinish({ estimate: { ...estimatePlacement(answers), recommendedLevel: 'level-1', stretchLevel: undefined }, answers, via: 'early' })
              }}
            >
              {text.levelOneOfferStart}
            </Button>
            <Button onClick={() => setOfferOpen(false)}>{text.levelOneOfferContinue}</Button>
          </>
        }
      >
        {text.levelOneOfferBody}
      </Modal>
    </div>
  )
}
