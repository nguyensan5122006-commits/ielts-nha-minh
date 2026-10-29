/**
 * ExamsPage.tsx — PHÒNG THI (danh sách đề + lịch sử thi)
 * Nhóm đề: Kiểm tra level | Thi thử IELTS (+ thẻ "Làm lại bài xếp lớp" -> /start). Bên dưới là các lần thi trước.
 * (v3) Giao diện làm lại + chỉ liệt kê đề v3:
 *   - ẨN đề cũ đã có bản v3 thay thế: 'placement-test' (thay bằng bài xếp lớp thích ứng /start),
 *     'level-1-test', 'level-2-test' (thay bằng level-test-v3-*). Các đề cũ VẪN nằm trong ALL_EXAMS
 *     nên kết quả cũ trong "Lịch sử thi" vẫn mở được (theo REQUESTS.md).
 *   - Trình làm bài (/exam/:id) do nhóm phòng thi làm lại — trang này chỉ là danh sách.
 */
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ALL_EXAMS, findExam } from '../content/all-exams'
import type { Exam } from '../content/content-types'
import { Badge, Button, EmptyState, Icon, Skeleton } from '../design-system'
import { GameArt } from '../features/playground/components/GameArt'
import { PlayPageHeader } from '../features/playground/components/PlayPageHeader'
import { usePlayText } from '../features/playground/playground-text'
import { useProgress } from '../learning-progress/progress-store'
import { isLevelTestUnlocked } from '../content/path-selectors'
import { api } from '../services/api-client'
import { useLanguage } from '../translations/language-context'
import '../features/playground/styles/play-kit.css'
import '../features/playground/styles/exams.css'

type HistoryItem = { id: number; examId: string; createdAt: string; overallBand: number | null; percent: number | null }

/** Đề cũ đã có bản v3 thay thế -> không hiện trong danh sách (vẫn mở được kết quả cũ) */
const HIDDEN_LEGACY_EXAMS = new Set(['placement-test', 'level-1-test', 'level-2-test'])
const KIND_ORDER: Exam['kind'][] = ['level-test', 'mock-ielts']
const KIND_ART: Record<Exam['kind'], string> = { placement: 'compass', 'level-test': 'chequered-flag', 'mock-ielts': 'graduation-cap' }
const LEVEL_PLATE = { 'level-1': 'olive', 'level-2': 'navy', 'level-3': 'primary' } as const

export function ExamsPage() {
  const { t, pick, language } = useLanguage()
  const playText = usePlayText()
  const { progress } = useProgress()
  const [history, setHistory] = useState<HistoryItem[] | null>(null)

  useEffect(() => {
    api
      .listExamResults()
      .then((data) => setHistory(data.results))
      .catch(() => setHistory([]))
  }, [])

  const visibleExams = ALL_EXAMS.filter((exam) => !HIDDEN_LEGACY_EXAMS.has(exam.id))

  return (
    <main className="page pg-page exams">
      <PlayPageHeader art="memo" artPlate="navy" title={playText('examsHeroTitle')} intro={playText('examsHeroText')} />

      {KIND_ORDER.map((kind) => {
        const exams = visibleExams.filter((exam) => exam.kind === kind)
        if (exams.length === 0) return null
        return (
          <section key={kind} className="exams-group" aria-labelledby={`exams-${kind}`}>
            <h2 id={`exams-${kind}`} className="pg-section-title">
              <GameArt slug={KIND_ART[kind]} size={30} /> {t(`kind_${kind}`)}
            </h2>
            <ul className="exams-grid">
              {exams.map((exam) => {
                const minutes = exam.sections.reduce((sum, s) => sum + s.durationMinutes, 0)
                const passed = exam.levelId ? progress.levelTests[exam.levelId] : undefined
                // bài test level chỉ mở khi đã học ≥ 80% số bài của level (theo track đang chọn)
                const locked = exam.kind === 'level-test' && !!exam.levelId && !isLevelTestUnlocked(exam.levelId, progress) && !passed
                const plate = exam.levelId && exam.levelId in LEVEL_PLATE ? LEVEL_PLATE[exam.levelId as keyof typeof LEVEL_PLATE] : 'navy'
                return (
                  <li key={exam.id} className={`exam-card ${locked ? 'is-locked' : ''}`}>
                    <div className="exam-card__top">
                      <GameArt slug={KIND_ART[exam.kind]} size={40} plate={plate} />
                      {passed ? (
                        <Badge tone="success" icon="check" size="sm">
                          {playText('examsPassed', { n: passed.percent })}
                        </Badge>
                      ) : locked ? (
                        <Badge tone="neutral" icon="lock" size="sm">
                          {t('locked')}
                        </Badge>
                      ) : null}
                    </div>
                    <h3 className="exam-card__title">{pick(exam.title)}</h3>
                    <p className="exam-card__desc">{pick(exam.description)}</p>
                    <ul className="exam-card__meta">
                      <li>
                        <Icon name="clock" size={14} /> {t('minutes', { n: minutes })}
                      </li>
                      <li>{playText('examsSections', { n: exam.sections.length })}</li>
                    </ul>
                    <ul className="exam-card__parts">
                      {exam.sections.map((s) => (
                        <li key={s.title}>{s.title}</li>
                      ))}
                    </ul>
                    <div className="exam-card__action">
                      {locked ? (
                        <span className="exam-card__hint">{playText('examsLockedHint')}</span>
                      ) : (
                        <Button to={`/exam/${exam.id}`} variant={passed ? 'secondary' : 'navy'} fullWidth iconRight="arrow-right">
                          {t('start')}
                        </Button>
                      )}
                    </div>
                  </li>
                )
              })}
            </ul>
          </section>
        )
      })}

      {/* bài xếp lớp v3 (thích ứng, ≤ 12 câu) thay cho đề xếp lớp cũ */}
      <Link to="/start" className="exams-placement">
        <GameArt slug="compass" size={48} plate="gold" tilt={-6} />
        <span className="exams-placement__text">
          <strong>{t('kind_placement')}</strong>
          <span>{playText('examsPlacementText')}</span>
        </span>
        <Icon name="arrow-right" size={22} />
      </Link>

      <section className="exams-group" aria-labelledby="exams-history">
        <h2 id="exams-history" className="pg-section-title">
          <GameArt slug="scroll" size={30} /> {t('examHistory')}
        </h2>
        <div className="pg-panel exams-history">
          {history === null && <Skeleton variant="text" lines={3} />}
          {history?.length === 0 && <EmptyState pose="reading" mascotSize={110} title={t('noExamHistory')} text={playText('examsHistoryEmpty')} />}
          {history && history.length > 0 && (
            <ul className="exams-history__list">
              {history.map((item) => {
                const exam = findExam(item.examId)
                return (
                  <li key={item.id}>
                    {exam && <GameArt slug={KIND_ART[exam.kind]} size={32} />}
                    <span className="exams-history__name">
                      <strong>{exam ? pick(exam.title) : item.examId}</strong>
                      <span>{new Date(item.createdAt + 'Z').toLocaleString(language === 'vi' ? 'vi-VN' : 'en-GB')}</span>
                    </span>
                    {item.overallBand !== null && <Badge tone="navy">Band {Number(item.overallBand).toFixed(1)}</Badge>}
                    {item.percent !== null && <Badge tone="neutral">{item.percent}%</Badge>}
                    <Button to={`/exam-result/${item.id}`} variant="secondary" size="sm">
                      {t('viewResult')}
                    </Button>
                  </li>
                )
              })}
            </ul>
          )}
        </div>
      </section>
    </main>
  )
}
